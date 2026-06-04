# Portfolio Site — Architecture

A Next.js 15 (App Router) portfolio for Dipesh Kumar. Single-page layout with automated DSA/GitHub stats synced from the Codolio API daily via GitHub Actions.

---

## Project Structure

```
portfolio-site/
├── app/
│   ├── layout.tsx              # Root layout — metadata, JSON-LD, Vercel Analytics
│   ├── page.tsx                # Single page — composes all sections
│   └── api/
│       └── codolio/
│           └── route.ts        # GET/POST endpoint for stats
├── components/
│   ├── hero.tsx                # Animated intro section
│   ├── navbar.tsx              # Top navigation
│   ├── bento-grid.tsx          # About Me — skills, projects, education grid
│   ├── stats.tsx               # Coding Stats — reads from codio-stats.json at build time
│   ├── ContestStats.tsx        # Contest Stats — fetches codio-stats.json at runtime
│   ├── sections.tsx            # Projects, Experience, Contact sections
│   ├── footer.tsx
│   ├── tech-cube.tsx           # 3D rotating tech cube
│   ├── json-ld-script.tsx      # Injects Person + WebSite schema into <head>
│   └── ui/                     # shadcn/ui primitives
├── lib/
│   ├── codolio-stats.ts        # Codolio API client + file read/write helpers
│   ├── json-ld.ts              # Schema.org generators (Person, WebSite, Breadcrumb, Project)
│   └── utils.ts                # Tailwind cn() helper
├── public/
│   ├── data/
│   │   └── codio-stats.json    # Cached stats file — the single source of truth for all stats
│   ├── sitemap.xml
│   ├── robots.txt
│   └── og-image.png
├── scripts/
│   ├── update-stats.ts         # Standalone script — calls fetchCodolioSiteStats and writes file
│   └── seo-check.js            # Validates SEO assets (sitemap, robots, OG image, metadata)
└── .github/
    └── workflows/
        ├── update-stats.yml    # Daily cron — runs update-stats.ts and commits the JSON
        └── seo-check.yml       # On push/PR to main — runs seo-check.js
```

---

## Page Layout

`app/page.tsx` stacks these components top-to-bottom:

```
Navbar
Hero          ← animated greeting sequence
BentoGrid     ← About Me (photo, bio, skills, education, projects)
CodingStats   ← DSA progress, GitHub stats, topic analysis
ContestStats  ← Contest rating, count, best rank
ProjectsSection
ExperienceSection
ContactSection
Footer
```

---

## Stats Data Flow

This is the core dynamic part of the site. All stats originate from the [Codolio API](https://api.codolio.com) and are cached in a single JSON file.

### The Data File — `public/data/codio-stats.json`

```json
{
  "totalQuestions": 218,
  "totalActiveDays": 124,
  "submissions": 477,
  "maxStreak": 24,
  "currentStreak": 1,
  "awards": 2,
  "dsa": {
    "total": 218,
    "easy": 94,
    "medium": 88,
    "hard": 9,
    "other": 27
  },
  "fundamentals": {
    "total": 50,
    "gfg": 41,
    "hackerrank": 9
  },
  "topics": [
    { "name": "Arrays", "count": 92 },
    { "name": "Binary Search", "count": 39 },
    ...
  ],
  "github": {
    "stars": 10,
    "commits": 421,
    "contributions": 453,
    "pullRequests": 3,
    "issues": 2,
    "activeDays": 112
  },
  "contest": {
    "rating": 1850,
    "contests": 42,
    "bestRank": "#12"
  },
  "lastUpdated": "2026-05-29T08:54:21.885Z"
}
```

### How Stats Are Fetched — `lib/codolio-stats.ts`

Three Codolio API endpoints are called in parallel:

| Endpoint | Data extracted |
|---|---|
| `GET /user/details?userKey=...` | `codolioCardDetails` → totalQuestions, totalActiveDays |
| `GET /profile?userKey=...` | `platformProfiles` → per-platform difficulty counts, topic distribution, submission calendar, GFG/HackerRank fundamentals |
| `GET /github/profile?userKey=...` | stars, commits, contributions, PRs, issues, activeDays |

Processing steps:
- Difficulty counts (easy/medium/hard) are **aggregated across all platforms** (LeetCode, GFG, HackerRank, etc.)
- Submission calendars from all platforms are **merged** to compute `submissions`, `maxStreak`, `currentStreak`
- Topic distribution is **merged and top-6 returned**
- `other = cardTotal - (easy + medium + hard)` handles any platform discrepancy

### How Stats Are Updated

```
Codolio API
    │
    ▼
lib/codolio-stats.ts  (fetchCodolioSiteStats)
    │
    ├── via GitHub Actions (daily)
    │       scripts/update-stats.ts
    │           └── writes → public/data/codio-stats.json
    │               └── git commit + push
    │
    └── via API endpoint (manual / local)
            POST /api/codolio
                └── writes → public/data/codio-stats.json
```

### How Stats Are Consumed

| Component | Method | Notes |
|---|---|---|
| `components/stats.tsx` | Static `import statsData from "@/public/data/codio-stats.json"` | Bundled at build time — zero runtime fetch |
| `components/ContestStats.tsx` | `fetch('/data/codio-stats.json')` on mount | Runtime fetch from public directory |

> `stats.tsx` uses a static import so the data is embedded in the JS bundle — no loading state needed. `ContestStats.tsx` fetches at runtime, so it shows `-` until the file loads.

---

## API Endpoint — `app/api/codolio/route.ts`

**GET `/api/codolio`**
- Reads `public/data/codio-stats.json` if it exists
- Falls back to a live Codolio fetch if the file is missing
- Falls back to hardcoded fallback stats on any error
- Cache headers: `public, s-maxage=172800, stale-while-revalidate=345600` (48h CDN cache)

**POST `/api/codolio`**
- Optional auth: if `CODOLIO_CRON_SECRET` env var is set, requires `Authorization: Bearer <secret>`
- Fetches fresh stats from Codolio and overwrites `public/data/codio-stats.json`
- Returns `{ success, message, lastUpdated, path }`

---

## GitHub Actions

### `update-stats.yml` — Daily Stats Sync

Runs every day at 00:00 UTC (and on manual trigger):

1. Checkout repo
2. `npm ci`
3. `npx tsx scripts/update-stats.ts` — calls `fetchCodolioSiteStats` and writes the JSON
4. `git add public/data/codio-stats.json` + commit + push (skipped if no changes)

Commit message: `chore: auto-update Codolio stats [skip ci]`

Required secrets: `CODOLIO_USER_KEY`, `CODOLIO_CRON_SECRET`

### `seo-check.yml` — SEO Validation

Runs on every push/PR to `main`:

1. `node scripts/seo-check.js`
2. Validates: sitemap.xml, robots.txt, og-image.png, metadata in layout.tsx, JSON-LD schemas, image alt text, semantic HTML, canonical URLs

---

## SEO Architecture

### Metadata — `app/layout.tsx`

Exports a Next.js `Metadata` object with:
- Title template: `%s | Dipesh Kumar`
- Open Graph (type, image, locale, siteName)
- Twitter Card (`summary_large_image`)
- Robots: `index: true, follow: true`
- Google Search Console verification via `GOOGLE_SITE_VERIFICATION` env var
- Theme-aware favicons (light/dark 32×32 PNG + SVG + Apple icon)

### Structured Data — `lib/json-ld.ts` + `components/json-ld-script.tsx`

Four schema generators:
- `generatePersonSchema` — name, jobTitle, sameAs (GitHub/LinkedIn/Twitter), knowsAbout, email
- `generateWebsiteSchema` — site name, URL, SearchAction
- `generateBreadcrumbSchema` — navigation hierarchy
- `generateProjectSchema` — CreativeWork with technologies

`JsonLdScript` injects Person + WebSite as a combined `@graph` into `<head>` on every page.

### Static SEO Files

| File | Purpose |
|---|---|
| `public/sitemap.xml` | URL list for search engine crawlers |
| `public/robots.txt` | Crawler directives + sitemap reference |
| `public/og-image.png` | 1200×630px social preview image |

---

## Environment Variables

| Variable | Required | Default | Purpose |
|---|---|---|---|
| `CODOLIO_USER_KEY` | No | `dipesh4000` | Codolio username for API calls |
| `CODOLIO_CRON_SECRET` | No | — | Protects POST `/api/codolio` with Bearer auth |
| `NEXT_PUBLIC_BASE_URL` | No | `https://dipeshkumar.com` | Canonical URL for metadata and JSON-LD |
| `GOOGLE_SITE_VERIFICATION` | No | — | Google Search Console verification token |

---

## Key Dependencies

| Package | Role |
|---|---|
| `next` 15 | Framework (App Router, Image optimization, API routes) |
| `framer-motion` | All animations (scroll-triggered, counters, particles) |
| `lucide-react` | Icons |
| `@vercel/analytics` | Page view analytics (production only) |
| `shadcn/ui` | UI primitives in `components/ui/` |
| `tsx` | Runs `scripts/update-stats.ts` in GitHub Actions |

---

## Local Development

```bash
npm run dev
```

To manually refresh stats:

```powershell
# Without auth
Invoke-RestMethod -Method POST -Uri "http://localhost:3000/api/codolio"

# With auth
Invoke-RestMethod -Method POST -Uri "http://localhost:3000/api/codolio" `
  -Headers @{ "Authorization" = "Bearer YOUR_SECRET_HERE" }
```
