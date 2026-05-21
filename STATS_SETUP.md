# Statistics Update Setup Guide

This guide walks you through setting up automated Codolio stats updates for your portfolio.

## Quick Start (5 minutes)

### Step 1: Generate a Cron Secret

Run this command to generate a secure random token:

```bash
# macOS/Linux
openssl rand -hex 32

# Windows (PowerShell)
$([Convert]::ToHexString((1..32 | ForEach-Object {Get-Random -Maximum 256})))
```

Copy the output (you'll need it in Step 2).

### Step 2: Add GitHub Secrets

1. Go to your GitHub repository
2. Click **Settings** (top right)
3. In the left sidebar, click **Secrets and variables** → **Actions**
4. Click **New repository secret** (green button)
5. Add two secrets:

| Secret Name | Value |
|-------------|-------|
| `CODOLIO_USER_KEY` | Your Codolio username (e.g., `dipesh4000`) |
| `CODOLIO_CRON_SECRET` | The random string you generated in Step 1 |

### Step 3: Verify the Workflow

1. Go to your repository → **Actions** tab
2. You should see **Update Codolio Stats** workflow listed
3. The workflow runs automatically every day at **12:00 AM UTC**
4. To test immediately, click the workflow → **Run workflow** → **Run workflow**

## What Gets Updated?

The workflow automatically fetches and commits:

- ✅ **DSA Statistics** — Total problems, difficulty breakdown (easy/medium/hard), topic distribution
- ✅ **Fundamentals** — GeeksforGeeks and HackerRank progress
- ✅ **GitHub Stats** — Stars, commits, contributions, pull requests, issues
- ✅ **Activity Metrics** — Max streak, current streak, submission calendar

All stats are stored in `public/data/codio-stats.json` and displayed on your portfolio.

## How the Workflow Works

```
┌─────────────────────────────────────────────────────┐
│  GitHub Actions (scheduled daily or manual trigger) │
└──────────────────┬──────────────────────────────────┘
                   │
                   ▼
        ┌──────────────────────┐
        │ Checkout repository  │
        └──────────┬───────────┘
                   │
                   ▼
        ┌──────────────────────┐
        │ Build Next.js        │
        │ (npm run build)      │
        └──────────┬───────────┘
                   │
                   ▼
        ┌──────────────────────────────┐
        │ Start dev server & call      │
        │ POST /api/codolio            │
        │ (with secret auth)           │
        └──────────┬────────────────────┘
                   │
                   ▼
        ┌──────────────────────────────────┐
        │ Codolio API                      │
        │ (fetches fresh stats)            │
        └──────────┬───────────────────────┘
                   │
                   ▼
        ┌──────────────────────────────┐
        │ Update codio-stats.json      │
        │ in public/data/              │
        └──────────┬────────────────────┘
                   │
                   ▼
        ┌──────────────────────────────┐
        │ Git commit & push changes    │
        │ to main branch               │
        └──────────────────────────────┘
```

## Testing Locally

To test stats updates before deploying:

```bash
# 1. Start the development server
npm run dev

# 2. In another terminal, call the API
# Make sure CODOLIO_CRON_SECRET is set in your .env or you skip the auth header

curl -X POST http://localhost:3000/api/codolio \
  -H "Authorization: Bearer your-secret-here" \
  -H "Content-Type: application/json"

# 3. Check that public/data/codio-stats.json was updated
cat public/data/codio-stats.json
```

## Common Questions

### Q: What if I want to update stats more/less frequently?

Edit `.github/workflows/update-stats.yml` and change the cron schedule:

```yaml
schedule:
  - cron: "0 6 * * *"  # Change to 6 AM UTC daily instead of midnight
```

**Cron examples:**
- `"0 0 * * *"` = Every day at midnight UTC (default)
- `"0 6,18 * * *"` = Twice daily (6 AM & 6 PM UTC)
- `"0 0 * * 0"` = Once weekly (Sunday midnight UTC)

Learn more: [Cron syntax](https://crontab.guru/)

### Q: Can I manually trigger an update without waiting for the schedule?

Yes! Go to **Actions** → **Update Codolio Stats** → **Run workflow**

### Q: What if the API call fails?

The workflow will:
1. Log the error
2. Exit with a non-zero status
3. Send you a notification (you can configure this in GitHub)
4. Not commit any changes

Check the workflow logs in **Actions** to see what went wrong.

### Q: How do I disable automatic updates?

Delete or disable `.github/workflows/update-stats.yml` — but you can still update manually via curl.

### Q: What if my Codolio profile is private?

The stats will be empty. Make sure your Codolio profile is public or adjust privacy settings.

## Environment Variables

If you want to use environment variables locally instead of the workflow:

Create a `.env.local` file:

```env
CODOLIO_USER_KEY=dipesh4000
CODOLIO_CRON_SECRET=your-secret-here
```

**Never commit `.env.local` to git!** It's in `.gitignore` by default.

## Next Steps

- ✅ Add GitHub Secrets
- ✅ Test the workflow manually
- ✅ Wait for the next scheduled run (or trigger manually)
- ✅ Verify stats appear on your portfolio

Questions? Check the troubleshooting section in the main [README.md](./README.md#troubleshooting).
