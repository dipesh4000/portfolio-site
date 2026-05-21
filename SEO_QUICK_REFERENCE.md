# SEO Quick Reference

One-page cheat sheet for SEO configuration and verification.

## Configuration Files

| File | Purpose | Location |
|------|---------|----------|
| `app/layout.tsx` | Metadata & Open Graph tags | App root |
| `next.config.mjs` | Image optimization & compression | Project root |
| `components/json-ld-script.tsx` | Structured data script | Components |
| `lib/json-ld.ts` | JSON-LD schema generators | Lib utilities |
| `public/sitemap.xml` | XML sitemap for crawlers | Public static |
| `public/robots.txt` | Crawler directives | Public static |
| `public/og-image.png` | Social sharing image | Public static |
| `.github/workflows/seo-check.yml` | Automated SEO validation | GitHub Actions |

## Quick Verification Commands

```bash
# Check metadata in layout
grep -A 80 "export const metadata" app/layout.tsx

# Verify sitemap exists and is valid XML
curl https://your-domain.com/sitemap.xml | head -5

# Check robots.txt directives
curl https://your-domain.com/robots.txt

# Find all JSON-LD schemas
grep -r "application/ld+json" components/

# Test in local dev (replace YOUR_DOMAIN)
# Browser: http://localhost:3000/sitemap.xml
# Browser: http://localhost:3000/robots.txt
```

## Essential SEO Tags (In Head)

```html
<!-- Title -->
<title>Dipesh Kumar | Portfolio</title>

<!-- Description -->
<meta name="description" content="Portfolio of Dipesh Kumar...">

<!-- Keywords -->
<meta name="keywords" content="ML Engineer, Python, FastAPI...">

<!-- Canonical -->
<link rel="canonical" href="https://dipeshkumar.com/">

<!-- Viewport -->
<meta name="viewport" content="width=device-width, initial-scale=1">

<!-- Robots -->
<meta name="robots" content="index, follow, max-image-preview:large">

<!-- Open Graph (Facebook, LinkedIn) -->
<meta property="og:title" content="Dipesh Kumar | Portfolio">
<meta property="og:description" content="...">
<meta property="og:image" content="https://dipeshkumar.com/og-image.png">
<meta property="og:url" content="https://dipeshkumar.com/">
<meta property="og:type" content="website">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Dipesh Kumar | Portfolio">
<meta name="twitter:description" content="...">
<meta name="twitter:image" content="https://dipeshkumar.com/og-image.png">
<meta name="twitter:creator" content="@dipesh4000">

<!-- JSON-LD Structured Data -->
<script type="application/ld+json">
{ "@context": "https://schema.org", "@graph": [...] }
</script>
```

## File Size Guidelines

| File | Recommended Size | Check |
|------|------------------|-------|
| OG Image | 1200x630px | `identify public/og-image.png` |
| Sitemap | < 50KB | `wc -c public/sitemap.xml` |
| robots.txt | < 5KB | `wc -c public/robots.txt` |
| Page size | < 500KB | DevTools Network tab |
| Image | < 200KB | Next.js optimization handles |

## Image Optimization Checklist

- [ ] OG image is 1200x630px
- [ ] All images use Next.js `<Image>` component
- [ ] Images have meaningful `alt` attributes
- [ ] Images support lazy loading
- [ ] `next.config.mjs` has `unoptimized: false`
- [ ] Images served as WebP/AVIF in modern browsers

## Structured Data (JSON-LD) Types

**Person Schema**
```json
{
  "@type": "Person",
  "name": "Dipesh Kumar",
  "jobTitle": ["ML Engineer", "Data Scientist"],
  "sameAs": ["https://github.com/...", "https://linkedin.com/..."],
  "knowsAbout": ["Python", "FastAPI", "Computer Vision"]
}
```

**WebSite Schema**
```json
{
  "@type": "WebSite",
  "name": "Dipesh Kumar | Portfolio",
  "url": "https://dipeshkumar.com"
}
```

**CreativeWork Schema** (for projects)
```json
{
  "@type": "CreativeWork",
  "name": "Project Title",
  "description": "Project description",
  "url": "https://github.com/...",
  "creator": { "@type": "Person", "name": "Dipesh Kumar" }
}
```

## Testing Tools (Bookmarks These!)

| Tool | Purpose | URL |
|------|---------|-----|
| Google Rich Results | Structured data validation | https://search.google.com/test/rich-results |
| Google PageSpeed | Performance & SEO score | https://pagespeed.web.dev/ |
| Lighthouse | Built into DevTools (F12) | DevTools → Lighthouse tab |
| Facebook Debugger | OG image preview | https://developers.facebook.com/tools/debug/ |
| Twitter Validator | Twitter Card preview | https://cards-dev.twitter.com/validator |
| Schema.org Validator | JSON-LD validation | https://validator.schema.org/ |
| Meta Tags Preview | All meta tags visualization | https://metatags.io/ |

## Common SEO Keywords for Portfolio

```
ML Engineer
Machine Learning
Data Science
Backend Developer
Python Developer
FastAPI
PostgreSQL
Computer Vision
YOLOv8
Deep Learning
Data Engineering
REST API
Software Engineer
Full Stack Developer
```

## robots.txt Rules

```
# Allow all
User-agent: *
Allow: /

# Block specific paths
Disallow: /api/
Disallow: /admin/

# Specific crawler rules
User-agent: Googlebot
Crawl-delay: 0

User-agent: Bingbot
Crawl-delay: 1

# Reference sitemap
Sitemap: https://dipeshkumar.com/sitemap.xml
```

## Sitemap XML Structure

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://dipeshkumar.com/</loc>
    <lastmod>2024-05-21T00:00:00+00:00</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

**Fields:**
- `<loc>` — Full URL (required)
- `<lastmod>` — Last modified ISO 8601 date
- `<changefreq>` — always, hourly, daily, weekly, monthly, yearly, never
- `<priority>` — 0.0 to 1.0 (default 0.5)

## Update Checklist

**After changing content:**
- [ ] Update `<lastmod>` in sitemap
- [ ] Update metadata keywords if needed
- [ ] Regenerate OG image if major redesign
- [ ] Test social sharing preview

**After new major feature:**
- [ ] Add new URL to sitemap
- [ ] Update Person schema with new skills
- [ ] Create schema for new content type if needed
- [ ] Run SEO check workflow

**Monthly maintenance:**
- [ ] Check GitHub Actions SEO workflow
- [ ] Review Google Search Console metrics
- [ ] Check for crawl errors
- [ ] Verify sitemap freshness

## Environment Variables

```bash
# Optional - Google Search Console verification
GOOGLE_SITE_VERIFICATION=your_token

# Optional - Custom domain (defaults to https://dipeshkumar.com)
NEXT_PUBLIC_BASE_URL=https://your-domain.com
```

## One-Click Verifications

**Check all metadata:**
```bash
npm run dev
# Then: Right-click → Inspect → Head tab
```

**Run SEO checks:**
```bash
# GitHub Actions automatically runs on push to main
# Or manually: GitHub → Actions → "SEO Validation & Checks" → Run
```

**Test structured data:**
```bash
# Visit: https://search.google.com/test/rich-results
# Paste: https://your-domain.com
```

**Test social preview:**
```bash
# Facebook: https://developers.facebook.com/tools/debug/
# Twitter: https://cards-dev.twitter.com/validator
# LinkedIn: https://www.linkedin.com/post-inspector/
```

## Red Flags (Fix These!)

🚨 Sitemap returns 404
🚨 robots.txt blocks your site (has `Disallow: /`)
🚨 No OG image (social preview empty)
🚨 Missing `<title>` or `<meta name="description">`
🚨 No JSON-LD schema detected in Rich Results Test
🚨 Images showing `type: jpeg` instead of `type: webp` (not optimized)
🚨 `<h1>` missing or multiple `<h1>` tags
🚨 No semantic HTML (`<main>`, `<section>`, `<nav>`)

## Performance Impact of SEO

Good SEO configuration improves:
- **Page Load Speed** — Image optimization reduces file sizes by 60-80%
- **User Experience** — Better structure helps screen readers
- **Search Rankings** — Proper metadata helps Google rank you higher
- **Social Sharing** — OG tags make links look great
- **Mobile Experience** — Responsive viewport meta tags

## Next Steps

1. **Setup:** Add `GOOGLE_SITE_VERIFICATION` to GitHub (optional)
2. **Submit:** Add sitemap to Google Search Console
3. **Monitor:** Track metrics in GSC monthly
4. **Improve:** Use GSC data to optimize underperforming content

---

**SEO Checklist Status:**
- [x] Metadata & Open Graph
- [x] Sitemap & robots.txt
- [x] Structured Data (JSON-LD)
- [x] Image Optimization
- [x] Semantic HTML
- [x] GitHub Actions validation
- [x] Social preview image

**All done!** Your portfolio is fully SEO-optimized.
