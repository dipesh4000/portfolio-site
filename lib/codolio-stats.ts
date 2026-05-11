import { promises as fs } from "fs";
import path from "path";

const CODOLIO_API = "https://api.codolio.com";

export type CodioSiteStats = {
  totalQuestions: number;
  totalActiveDays: number;
  submissions: number;
  maxStreak: number;
  currentStreak: number;
  awards: number;
  /** `total` = Codolio card aggregate; difficulties summed across platforms; `other` = remainder on card. */
  dsa: { total: number; easy: number; medium: number; hard: number; other: number };
  fundamentals: { total: number; gfg: number; hackerrank: number };
  topics: { name: string; count: number }[];
  /** Synced from Codolio GitHub integration (not the public GitHub API). */
  github: {
    stars: number;
    commits: number;
    contributions: number;
    pullRequests: number;
    issues: number;
    activeDays: number;
  };
  lastUpdated: string;
};

type ApiEnvelope<T> = { status?: { success?: boolean }; data?: T };

function utcDayStartMs(tsSec: number): number {
  const d = new Date(tsSec * 1000);
  return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
}

function submissionStatsFromCalendar(
  calendar: Record<string, unknown> | null | undefined,
): { submissions: number; maxStreak: number; currentStreak: number } {
  if (!calendar || typeof calendar !== "object") {
    return { submissions: 0, maxStreak: 0, currentStreak: 0 };
  }

  const byDay = new Map<number, number>();
  for (const [key, raw] of Object.entries(calendar)) {
    const n = Number(raw);
    if (!Number.isFinite(n) || n <= 0) continue;
    const ts = Number(key);
    if (!Number.isFinite(ts)) continue;
    const day = utcDayStartMs(ts);
    byDay.set(day, (byDay.get(day) ?? 0) + n);
  }

  let submissions = 0;
  for (const v of byDay.values()) submissions += v;

  const dayKeys = [...byDay.keys()].sort((a, b) => a - b);
  if (dayKeys.length === 0) {
    return { submissions: 0, maxStreak: 0, currentStreak: 0 };
  }

  let best = 1;
  let run = 1;
  for (let i = 1; i < dayKeys.length; i++) {
    const prev = dayKeys[i - 1]!;
    const cur = dayKeys[i]!;
    if (cur - prev === 86400000) {
      run += 1;
      best = Math.max(best, run);
    } else {
      run = 1;
    }
  }

  let current = 1;
  for (let i = dayKeys.length - 1; i > 0; i--) {
    const prev = dayKeys[i - 1]!;
    const cur = dayKeys[i]!;
    if (cur - prev === 86400000) current += 1;
    else break;
  }

  return { submissions, maxStreak: best, currentStreak: current };
}

function countBadges(platforms: unknown): number {
  if (!Array.isArray(platforms)) return 0;
  let n = 0;
  for (const p of platforms) {
    if (!p || typeof p !== "object") continue;
    const badgeStats = (p as { badgeStats?: { badgeList?: unknown[] } }).badgeStats;
    const list = badgeStats?.badgeList;
    if (Array.isArray(list)) n += list.length;
  }
  return n;
}

function getPlatform(
  profileData: Record<string, unknown> | undefined,
  name: string,
): Record<string, unknown> | null {
  const root = profileData?.platformProfiles as { platformProfiles?: unknown[] } | undefined;
  const list = root?.platformProfiles;
  if (!Array.isArray(list)) return null;
  for (const p of list) {
    if (p && typeof p === "object" && (p as { platform?: string }).platform === name) {
      return p as Record<string, unknown>;
    }
  }
  return null;
}

function nint(v: unknown): number {
  const x = Number(v);
  return Number.isFinite(x) ? Math.trunc(x) : 0;
}

function listPlatformProfiles(profile: Record<string, unknown>): Record<string, unknown>[] {
  const root = profile.platformProfiles as { platformProfiles?: unknown[] } | undefined;
  const list = root?.platformProfiles;
  if (!Array.isArray(list)) return [];
  return list.filter((p): p is Record<string, unknown> => !!p && typeof p === "object") as Record<
    string,
    unknown
  >[];
}

function topicTop6Merged(platforms: Record<string, unknown>[]): { name: string; count: number }[] {
  const merged = new Map<string, number>();
  for (const p of platforms) {
    const dist = (p.topicAnalysisStats as { topicWiseDistribution?: Record<string, unknown> } | undefined)
      ?.topicWiseDistribution;
    if (!dist || typeof dist !== "object") continue;
    for (const [name, raw] of Object.entries(dist)) {
      merged.set(name, (merged.get(name) ?? 0) + nint(raw));
    }
  }
  const rows = [...merged.entries()].map(([name, count]) => ({ name, count }));
  rows.sort((a, b) => b.count - a.count);
  return rows.slice(0, 6);
}

function aggregateDifficultyAcrossPlatforms(platforms: Record<string, unknown>[]): {
  easy: number;
  medium: number;
  hard: number;
} {
  let easy = 0;
  let medium = 0;
  let hard = 0;
  for (const p of platforms) {
    const t = p.totalQuestionStats as Record<string, unknown> | undefined;
    if (!t) continue;
    easy += nint(t.easyQuestionCounts) + nint(t.basicQuestionCounts) + nint(t.schoolQuestionCounts);
    medium += nint(t.mediumQuestionCounts);
    hard += nint(t.hardQuestionCounts);
  }
  return { easy, medium, hard };
}

function mergeSubmissionCalendars(
  platforms: Record<string, unknown>[],
): Record<string, unknown> | undefined {
  const merged: Record<string, number> = {};
  for (const p of platforms) {
    const cal = (p.dailyActivityStatsResponse as { submissionCalendar?: Record<string, unknown> } | undefined)
      ?.submissionCalendar;
    if (!cal || typeof cal !== "object") continue;
    for (const [k, raw] of Object.entries(cal)) {
      const n = nint(raw);
      if (n <= 0) continue;
      merged[k] = (merged[k] ?? 0) + n;
    }
  }
  return Object.keys(merged).length > 0 ? merged : undefined;
}

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    cache: "no-store",
    headers: { Accept: "application/json", "User-Agent": "portfolio-site/1.0" },
  });
  if (!res.ok) throw new Error(`Codolio API ${res.status}: ${url}`);
  return (await res.json()) as T;
}

async function fetchJsonOptional<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, {
      cache: "no-store",
      headers: { Accept: "application/json", "User-Agent": "portfolio-site/1.0" },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export function getDefaultUserKey(): string {
  return process.env.CODOLIO_USER_KEY?.trim() || "dipesh4000";
}

export function codioStatsFilePath(): string {
  return path.join(process.cwd(), "public", "data", "codio-stats.json");
}

export async function fetchCodolioSiteStats(userKey: string): Promise<CodioSiteStats> {
  const enc = encodeURIComponent(userKey);
  const [detailsRes, profileRes, githubRes] = await Promise.all([
    fetchJson<ApiEnvelope<Record<string, unknown>>>(`${CODOLIO_API}/user/details?userKey=${enc}`),
    fetchJson<ApiEnvelope<Record<string, unknown>>>(`${CODOLIO_API}/profile?userKey=${enc}`),
    fetchJsonOptional<ApiEnvelope<Record<string, unknown>>>(`${CODOLIO_API}/github/profile?userKey=${enc}`),
  ]);

  const details = detailsRes.data;
  const profile = profileRes.data;
  if (!details || !profile) {
    throw new Error("Codolio API returned empty profile or details");
  }

  const card = details.codolioCardDetails as
    | { totalQuestionsSolved?: unknown; totalActiveDays?: unknown }
    | undefined;

  const gfg = getPlatform(profile, "geeksforgeeks");
  const hr = getPlatform(profile, "hackerrank");

  const gfgT = gfg?.totalQuestionStats as { totalQuestionCounts?: unknown } | undefined;
  const hrT = hr?.totalQuestionStats as { totalQuestionCounts?: unknown } | undefined;

  const gfgN = nint(gfgT?.totalQuestionCounts);
  const hrN = nint(hrT?.totalQuestionCounts);

  const platformList = listPlatformProfiles(profile);
  const mergedCalendar = mergeSubmissionCalendars(platformList);
  const { submissions, maxStreak, currentStreak } = submissionStatsFromCalendar(mergedCalendar);

  const platforms = (profile.platformProfiles as { platformProfiles?: unknown[] } | undefined)
    ?.platformProfiles;

  const cardTotalQuestions = nint(card?.totalQuestionsSolved);
  const { easy: aggEasy, medium: aggMedium, hard: aggHard } = aggregateDifficultyAcrossPlatforms(platformList);
  const difficultySum = aggEasy + aggMedium + aggHard;
  const otherProblems = Math.max(0, cardTotalQuestions - difficultySum);

  const gh = githubRes?.data as
    | {
        stars?: unknown;
        commitCounts?: unknown;
        totalContributions?: unknown;
        pushRequestsCount?: unknown;
        issues?: unknown;
        totalActiveDays?: unknown;
      }
    | undefined;

  const stats: CodioSiteStats = {
    totalQuestions: nint(card?.totalQuestionsSolved),
    totalActiveDays: nint(card?.totalActiveDays),
    submissions,
    maxStreak,
    currentStreak,
    awards: countBadges(platforms),
    dsa: {
      total: cardTotalQuestions,
      easy: aggEasy,
      medium: aggMedium,
      hard: aggHard,
      other: otherProblems,
    },
    fundamentals: {
      total: gfgN + hrN,
      gfg: gfgN,
      hackerrank: hrN,
    },
    topics: topicTop6Merged(platformList),
    github: {
      stars: nint(gh?.stars),
      commits: nint(gh?.commitCounts),
      contributions: nint(gh?.totalContributions),
      pullRequests: nint(gh?.pushRequestsCount),
      issues: nint(gh?.issues),
      activeDays: nint(gh?.totalActiveDays),
    },
    lastUpdated: new Date().toISOString(),
  };

  return stats;
}

export async function writeCodolioStatsFile(stats: CodioSiteStats): Promise<void> {
  const fp = codioStatsFilePath();
  await fs.mkdir(path.dirname(fp), { recursive: true });
  await fs.writeFile(fp, JSON.stringify(stats, null, 2), "utf-8");
}

export async function readCodolioStatsFile(): Promise<CodioSiteStats | null> {
  try {
    const raw = await fs.readFile(codioStatsFilePath(), "utf-8");
    return JSON.parse(raw) as CodioSiteStats;
  } catch {
    return null;
  }
}
