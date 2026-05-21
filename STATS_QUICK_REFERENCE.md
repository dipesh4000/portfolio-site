# Codolio Stats Update - Quick Reference

## ⚡ 5-Minute Setup

### 1. Generate Secret Token
```bash
openssl rand -hex 32
```
Copy the output.

### 2. Add GitHub Secrets
Repository → Settings → Secrets and variables → Actions → New repository secret

```
CODOLIO_USER_KEY = dipesh4000
CODOLIO_CRON_SECRET = [paste token from step 1]
```

### 3. Done ✅
Stats update automatically daily at 12:00 AM UTC

---

## 📅 How to Run Updates

### Automatic (Daily)
No action needed. Workflow runs automatically every 24 hours.

### Manual (On-Demand)
1. Go to Repository → **Actions** tab
2. Click **Update Codolio Stats**
3. Click **Run workflow** → **Run workflow** (green button)
4. Wait 2-5 minutes for completion

### Local Testing
```bash
npm run dev

# Terminal 2:
curl -X POST http://localhost:3000/api/codolio \
  -H "Authorization: Bearer YOUR_SECRET_HERE"
```

---

## 📊 What Gets Updated

- ✅ DSA problems (total, easy/medium/hard, topics)
- ✅ Fundamentals (GeeksforGeeks, HackerRank)
- ✅ GitHub stats (stars, commits, contributions, etc.)
- ✅ Activity metrics (streaks, submissions)

File: `public/data/codio-stats.json`

---

## 🔧 Change Update Frequency

Edit `.github/workflows/update-stats.yml`

```yaml
schedule:
  - cron: "0 0 * * *"  # Change this line
```

**Examples:**
| Schedule | Cron |
|----------|------|
| Daily at midnight | `"0 0 * * *"` |
| Daily at 6 AM | `"0 6 * * *"` |
| Twice daily | `"0 6,18 * * *"` |
| Weekly (Sunday) | `"0 0 * * 0"` |

---

## ❌ Troubleshooting

| Error | Fix |
|-------|-----|
| 401 Unauthorized | Check GitHub Secret `CODOLIO_CRON_SECRET` is set |
| API error | Verify Codolio username in `CODOLIO_USER_KEY` |
| Workflow not found | Commit `.github/workflows/update-stats.yml` to repo |
| Stats not updating | Check GitHub Actions logs (Actions tab) |

---

## 📖 Full Guides

- **STATS_SETUP.md** — Detailed step-by-step setup
- **README.md** — Complete documentation
- **STATS_IMPLEMENTATION_SUMMARY.md** — Architecture & details

---

## 🚀 Files Created

- `.github/workflows/update-stats.yml` — Automation
- `STATS_SETUP.md` — Step-by-step guide
- `STATS_IMPLEMENTATION_SUMMARY.md` — Technical details
- `STATS_QUICK_REFERENCE.md` — This file
- `README.md` — Updated with documentation

---

**That's it!** Your stats are now automated. 🎉
