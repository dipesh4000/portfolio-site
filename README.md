# portfolio-site

This is a [Next.js](https://nextjs.org) project bootstrapped with [v0](https://v0.app).

## Built with v0

This repository is linked to a [v0](https://v0.app) project. You can continue developing by visiting the link below -- start new chats to make changes, and v0 will push commits directly to this repo. Every merge to `main` will automatically deploy.

[Continue working on v0 →](https://v0.app/chat/projects/prj_ltjgh1L9M6n4FCxfRqAZoX0aVEbH)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Updating Statistics

This project automatically syncs **DSA Progress**, **Fundamentals**, and **GitHub Stats** from the [Codolio API](https://codolio.com). Stats are stored in `public/data/codio-stats.json` and displayed on the portfolio.

### Setup Requirements

Before using automated stats updates, you need to configure these **GitHub Secrets** in your repository:

1. **`CODOLIO_USER_KEY`** — Your Codolio username (e.g., `dipesh4000`)
2. **`CODOLIO_CRON_SECRET`** — A secure token to protect the API endpoint (generate a random string, e.g., using `openssl rand -hex 32`)

**How to add secrets:**
1. Go to your GitHub repository → **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Add the secrets listed above

### Automated Updates (Daily)

A GitHub Actions workflow automatically updates your stats **every day at 12:00 AM UTC**. 

The workflow:
- Builds your Next.js project
- Calls the `POST /api/codolio` endpoint to fetch fresh stats
- Commits updated stats to the repository
- Optionally creates a pull request for review

**To disable or modify the schedule:**
- Edit `.github/workflows/update-stats.yml`
- Change the `cron` value in the `schedule` section
  - Examples: `"0 6 * * *"` = 6 AM UTC daily, `"0 0 * * 0"` = Sunday midnight

**Manual trigger:**
1. Go to your GitHub repository → **Actions** → **Update Codolio Stats**
2. Click **Run workflow** → **Run workflow** (green button)
3. Stats will update within minutes

### Manual Updates (Local)

To update stats manually on your computer:

```bash
npm run dev
```

In another terminal:

```bash
curl -X POST http://localhost:3000/api/codolio \
  -H "Authorization: Bearer $CODOLIO_CRON_SECRET" \
  -H "Content-Type: application/json"
```

Replace `$CODOLIO_CRON_SECRET` with your actual secret from GitHub Secrets.

**Success response:**
```json
{
  "success": true,
  "message": "Stats refreshed from Codolio API and written to public/data/codio-stats.json",
  "lastUpdated": "2024-05-21T10:30:45.123Z"
}
```

**Without auth (if `CODOLIO_CRON_SECRET` is not set):**
```bash
curl -X POST http://localhost:3000/api/codolio
```

### How It Works

1. **Codolio API Integration** (`lib/codolio-stats.ts`)
   - Fetches DSA problems solved (by difficulty: easy, medium, hard)
   - Retrieves fundamentals progress (GeeksforGeeks, HackerRank)
   - Aggregates topic-wise problem distribution
   - Syncs GitHub stats from your Codolio profile

2. **API Endpoint** (`app/api/codolio/route.ts`)
   - **GET** — Returns cached stats from `public/data/codio-stats.json` or fetches live
   - **POST** — Fetches fresh stats and overwrites the JSON file (requires secret auth)

3. **Stats File** (`public/data/codio-stats.json`)
   - Contains your latest DSA, fundamentals, and GitHub statistics
   - Updated via the POST endpoint or GitHub Actions
   - Served to the frontend and displayed in the stats component

### Troubleshooting

| Issue | Solution |
|-------|----------|
| **GitHub Action fails** | Check that `CODOLIO_USER_KEY` and `CODOLIO_CRON_SECRET` are set correctly in GitHub Secrets |
| **API returns 401 Unauthorized** | Verify the `Authorization: Bearer` header matches your `CODOLIO_CRON_SECRET` |
| **Stats not updating locally** | Ensure `npm run dev` is running and the `public/data/` directory exists and is writable |
| **"Codolio API returned empty profile"** | Check that your Codolio username/user key is correct and your profile is public |
| **Latest stats not showing** | The stats are cached for 48 hours. Clear your browser cache or wait for the next automated update |

## Learn More

To learn more, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [v0 Documentation](https://v0.app/docs) - learn about v0 and how to use it.
- [Codolio API Docs](https://codolio.com) - learn about the Codolio platform.

<a href="https://v0.app/chat/api/kiro/clone/dipesh4000/portfolio-site" alt="Open in Kiro"><img src="https://pdgvvgmkdvyeydso.public.blob.vercel-storage.com/open%20in%20kiro.svg?sanitize=true" /></a>
