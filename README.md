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

## SEO Optimization

This portfolio is fully optimized for search engines with comprehensive metadata, structured data, and best practices. All SEO configurations are automated and maintained through GitHub Actions.

### SEO Features

✓ **Metadata & Tags**
- Comprehensive Open Graph tags for social sharing (Facebook, LinkedIn, etc.)
- Twitter Card support for better sharing on Twitter/X
- Canonical URLs to prevent duplicate content issues
- Robots meta directives (`index`, `follow`) for search engine crawling
- Viewport and color scheme meta tags for all devices

✓ **Structured Data (JSON-LD)**
- Person schema for author information with skills and social profiles
- WebSite schema for enhanced search result appearance
- Breadcrumb schema for navigation hierarchy
- CreativeWork schema for projects (extensible)

✓ **Technical SEO**
- XML sitemap at `/sitemap.xml` for search engine discovery
- `robots.txt` with crawler directives and sitemap reference
- Image optimization enabled (WebP/AVIF formats via Next.js)
- Semantic HTML with proper heading hierarchy (`<main>`, `<section>`, `<header>`, `<footer>`, `<nav>`)
- Performance optimization (compression, minification, ETags)

✓ **Social Sharing**
- OG image at `/og-image.png` (1200x630px) for rich previews
- Unique meta descriptions for search results
- Author and creator attribution
- Twitter handle and site configuration

### Environment Variables Required for Full SEO

Add these optional environment variables to unlock advanced SEO features:

```bash
# Optional: Google Search Console verification
GOOGLE_SITE_VERIFICATION=your_google_verification_token

# Optional: Custom base URL (defaults to https://dipeshkumar.com)
NEXT_PUBLIC_BASE_URL=https://your-domain.com
```

### How to Verify SEO Configuration

**In Browser DevTools:**
1. Open your site in Chrome/Firefox
2. Right-click → **Inspect** → **Head** tab
3. Look for:
   - `<meta name="description">` — Site description
   - `<meta property="og:image">` — Social sharing image
   - `<meta name="robots">` — Crawler directives
   - `<script type="application/ld+json">` — Structured data
   - `<link rel="canonical">` — Canonical URL

**Verify Metadata:**
```bash
# Check for metadata object in layout.tsx
grep -A 50 "export const metadata" app/layout.tsx

# Check for JSON-LD schema
grep -r "json-ld" components/
```

**Verify XML Sitemap:**
- Visit `/sitemap.xml` — Should display XML with URL entries
- Check `<lastmod>` timestamps are recent
- Verify all important pages are included

**Verify robots.txt:**
- Visit `/robots.txt` — Should display text directives
- Check `User-agent` sections for specific crawlers
- Verify `Sitemap:` line points to correct URL

**Verify Structured Data:**
- Use [Google Rich Results Test](https://search.google.com/test/rich-results)
- Visit your site homepage and paste the URL
- Should show Person schema with name, job titles, social profiles
- Should show WebSite schema for site branding

**Check Image Optimization:**
Open DevTools → **Network** tab → reload page
- Images should be served as WebP/AVIF (modern browsers)
- Check `Content-Type` header shows `image/webp` or `image/avif`
- File sizes should be significantly smaller than originals

**Verify Open Graph Tags:**
```bash
curl -s https://your-domain.com | grep -E "og:|twitter:"
```

Should show tags like:
- `<meta property="og:title">` — Page title for social sharing
- `<meta property="og:description">` — Page description
- `<meta property="og:image">` — Social preview image
- `<meta name="twitter:card">` — Twitter card type

### GitHub Actions SEO Checks

The `.github/workflows/seo-check.yml` workflow automatically validates SEO configuration on every push to `main` and pull requests.

**What it checks:**
- XML sitemap structure and validity
- robots.txt format and directives
- OG image file existence
- Metadata object configuration
- JSON-LD schema files
- Image alt text attributes
- Semantic HTML elements
- Canonical URL configuration
- Robots meta tags

**View SEO check results:**
1. Go to **Actions** tab in GitHub
2. Click **SEO Validation & Checks**
3. View latest workflow run
4. Click on "Validate SEO Configuration" to see detailed checks

### Troubleshooting SEO Issues

| Issue | Solution |
|-------|----------|
| **Google can't find my site** | Submit sitemap to Google Search Console at https://search.google.com/search-console |
| **Social preview shows generic text** | Check that `/og-image.png` exists and is 1200x630px. Clear cache and retry. |
| **Sitemap shows 404** | Ensure `/public/sitemap.xml` exists. Run `npm run build` to verify. |
| **Images not optimizing** | Check `next.config.mjs` has `unoptimized: false`. Images must be in `/public` or use `next/image`. |
| **Structured data not showing in test** | Use Google's Rich Results Test at https://search.google.com/test/rich-results. Clear browser cache. |
| **Robots.txt blocked my site** | Check `/public/robots.txt` doesn't have `Disallow: /`. Ensure `User-agent: *` allows your content. |

### Additional Resources

**Detailed SEO Guides:**
- `SEO_VERIFICATION.md` — Step-by-step verification with screenshots
- `SEO_QUICK_REFERENCE.md` — Quick reference for common SEO tasks

**For Stats Updates:**
- `STATS_SETUP.md` — Configure Codolio API integration
- `STATS_QUICK_REFERENCE.md` — Quick reference for stats updates

### Manual SEO Checks (Advanced)

```bash
# Validate XML sitemap syntax
xmllint --noout public/sitemap.xml

# Check for all meta tags
grep -E "meta|canonical|og:" app/layout.tsx

# Search for image optimization config
grep -A 5 "images:" next.config.mjs

# Find all JSON-LD schemas
grep -r "ld+json\|@context" components/ lib/
```

## Learn More

To learn more, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [v0 Documentation](https://v0.app/docs) - learn about v0 and how to use it.
- [Codolio API Docs](https://codolio.com) - learn about the Codolio platform.
- [Google Search Central](https://developers.google.com/search) - Official SEO documentation.
- [Schema.org](https://schema.org) - Structured data vocabulary reference.

<a href="https://v0.app/chat/api/kiro/clone/dipesh4000/portfolio-site" alt="Open in Kiro"><img src="https://pdgvvgmkdvyeydso.public.blob.vercel-storage.com/open%20in%20kiro.svg?sanitize=true" /></a>
