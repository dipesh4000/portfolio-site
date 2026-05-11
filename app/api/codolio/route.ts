import { NextResponse } from "next/server";
import {
  codioStatsFilePath,
  fetchCodolioSiteStats,
  getDefaultUserKey,
  readCodolioStatsFile,
  writeCodolioStatsFile,
} from "@/lib/codolio-stats";

/**
 * Codolio stats API (uses https://api.codolio.com — no HTML scraper).
 *
 * GET  — Serves `public/data/codio-stats.json` when present (matches the static import in
 *        `components/stats.tsx`). If the file is missing, fetches live from Codolio and returns
 *        JSON. On failure, returns a small hard-coded fallback. Cache headers allow CDN reuse.
 *
 * POST — Refetches from Codolio and **rewrites** `public/data/codio-stats.json`. Use locally
 *        (`npm run dev`) or in CI **before** `next build` when the runner can write `public/data/`.
 *        Many serverless hosts cannot persist this file at runtime.
 *
 * Env: `CODOLIO_USER_KEY` (default `dipesh4000`). If `CODOLIO_CRON_SECRET` is set, POST must send
 *      `Authorization: Bearer <CODOLIO_CRON_SECRET>` or the request returns 401.
 */
const CACHE_DURATION = 48 * 60 * 60;

const FALLBACK_STATS = {
  totalQuestions: 166,
  totalActiveDays: 102,
  submissions: 203,
  maxStreak: 24,
  currentStreak: 1,
  awards: 2,
  dsa: { total: 155, easy: 72, medium: 75, hard: 8, other: 0 },
  fundamentals: { total: 9, gfg: 1, hackerrank: 8 },
  topics: [
    { name: "Arrays", count: 85 },
    { name: "Binary Search", count: 38 },
    { name: "HashMap & Set", count: 28 },
    { name: "Two Pointers", count: 27 },
    { name: "String", count: 25 },
    { name: "Linked Lists", count: 23 },
  ],
  github: {
    stars: 0,
    commits: 0,
    contributions: 0,
    pullRequests: 0,
    issues: 0,
    activeDays: 0,
  },
  lastUpdated: new Date().toISOString(),
};

const cacheHeaders = {
  "Cache-Control": `public, s-maxage=${CACHE_DURATION}, stale-while-revalidate=${CACHE_DURATION * 2}`,
};

function unauthorizedPost() {
  return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
}

export async function GET() {
  try {
    const fromFile = await readCodolioStatsFile();
    if (fromFile) {
      return NextResponse.json(fromFile, { headers: cacheHeaders });
    }

    const live = await fetchCodolioSiteStats(getDefaultUserKey());
    return NextResponse.json(live, { headers: cacheHeaders });
  } catch (error) {
    console.error("Error fetching Codolio stats:", error);
    return NextResponse.json(
      { ...FALLBACK_STATS, lastUpdated: new Date().toISOString() },
      { headers: cacheHeaders },
    );
  }
}

export async function POST(request: Request) {
  const secret = process.env.CODOLIO_CRON_SECRET?.trim();
  if (secret) {
    const auth = request.headers.get("authorization");
    if (auth !== `Bearer ${secret}`) {
      return unauthorizedPost();
    }
  }

  try {
    const userKey = getDefaultUserKey();
    const stats = await fetchCodolioSiteStats(userKey);
    await writeCodolioStatsFile(stats);

    return NextResponse.json({
      success: true,
      message: "Stats refreshed from Codolio API and written to public/data/codio-stats.json",
      lastUpdated: stats.lastUpdated,
      path: codioStatsFilePath(),
    });
  } catch (error) {
    console.error("Codolio refresh error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
