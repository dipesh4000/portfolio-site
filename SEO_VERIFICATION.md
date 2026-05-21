# SEO Verification Guide

This guide walks you through verifying that all SEO optimizations are properly configured and working.

## Quick Verification Checklist

- [ ] Visit site homepage in browser
- [ ] Check metadata in page source
- [ ] Test Open Graph with social card previewer
- [ ] Validate XML sitemap
- [ ] Verify robots.txt
- [ ] Test structured data
- [ ] Check image optimization
- [ ] Run GitHub Actions SEO checks

## Step 1: Browser Metadata Verification

### View Page Metadata

1. Open your portfolio site in a web browser
2. Right-click anywhere → **Inspect** (or press `F12`)
3. Go to the **Elements/Inspector** tab
4. Press `Ctrl+F` (or `Cmd+F` on Mac) and search for `<head>`
5. Expand the `<head>` section

### What to Look For

**✓ Title Tag**
```html
<title>Dipesh Kumar | Portfolio</title>
```
Should match your site name.

**✓ Meta Description**
```html
<meta name="description" content="Portfolio of Dipesh Kumar - ML Engineer...">
```
Should be 120-160 characters, describing your site.

**✓ Robots Meta**
```html
<meta name="robots" content="index, follow, ...">
```
Should have `index` and `follow` to allow search engines.

**✓ Canonical URL**
```html
<link rel="canonical" href="https://dipeshkumar.com/">
```
Should point to your actual domain.

**✓ Viewport Meta**
```html
<meta name="viewport" content="width=device-width, initial-scale=1, ...">
```
Required for mobile responsiveness.

**✓ Open Graph Tags**
```html
<meta property="og:title" content="Dipesh Kumar | Portfolio">
<meta property="og:description" content="Portfolio of Dipesh Kumar...">
<meta property="og:image" content="https://dipeshkumar.com/og-image.png">
<meta property="og:url" content="https://dipeshkumar.com/">
<meta property="og:type" content="website">
```

**✓ Twitter Card Tags**
```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Dipesh Kumar | Portfolio">
<meta name="twitter:image" content="https://dipeshkumar.com/og-image.png">
```

**✓ JSON-LD Structured Data**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "name": "Dipesh Kumar",
      ...
    },
    {
      "@type": "WebSite",
      ...
    }
  ]
}
</script>
```

## Step 2: Verify XML Sitemap

### Access Sitemap in Browser

1. Go to: `https://your-domain.com/sitemap.xml` (or `http://localhost:3000/sitemap.xml` locally)
2. You should see an XML file with URL entries

### What to Look For

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

**✓ Valid XML declaration** at the top
**✓ Proper namespace** with `sitemaps.org`
**✓ All important URLs** listed in `<url>` tags
**✓ Recent `<lastmod>` dates** (timestamps should be recent)
**✓ `<changefreq>` tags** indicating update frequency
**✓ `<priority>` values** between 0.0 and 1.0

### Validate Sitemap Syntax

```bash
# If you have xmllint installed
xmllint --noout public/sitemap.xml
```

Should output no errors.

## Step 3: Verify robots.txt

### Access robots.txt in Browser

1. Go to: `https://your-domain.com/robots.txt` (or `http://localhost:3000/robots.txt` locally)
2. You should see plain text directives

### What to Look For

```
# Should allow search engines
User-agent: *
Allow: /

# Should disallow private paths
Disallow: /api/
Disallow: /admin/

# Should reference sitemap
Sitemap: https://dipeshkumar.com/sitemap.xml
```

**✓ `User-agent: *` rule** for all crawlers
**✓ `Allow: /`** to allow indexing
**✓ `Disallow` directives** for private paths
**✓ `Sitemap:` line** with correct URL
**✓ No blocking of main content** in Disallow

## Step 4: Test Social Sharing (Open Graph)

### Test with Facebook

1. Go to [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
2. Enter your site URL
3. Click **Debug**

You should see:
- ✓ Title and description populated
- ✓ Large preview image displayed
- ✓ No warnings or errors
- ✓ Correct domain shown

### Test with Twitter/X

1. Go to [Twitter Card Validator](https://cards-dev.twitter.com/validator)
2. Enter your site URL
3. View the preview

You should see:
- ✓ Summary or summary_large_image card
- ✓ Correct title and description
- ✓ OG image displayed as preview
- ✓ All fields populated

### Test with LinkedIn

1. Go to [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)
2. Paste your site URL
3. Check preview

You should see:
- ✓ Site title and description
- ✓ OG image displayed
- ✓ Proper aspect ratio (1200x630px)

## Step 5: Validate Structured Data

### Use Google Rich Results Test

1. Go to [Google Rich Results Test](https://search.google.com/test/rich-results)
2. Select **URL**
3. Paste your site URL
4. Click **Test URL**

Expected results:
```
Detected: Person
Detected: WebSite
```

### What Each Schema Shows

**Person Schema** should include:
- ✓ Name: "Dipesh Kumar"
- ✓ Job titles: ML Engineer, Data Scientist, etc.
- ✓ Social profiles: GitHub, LinkedIn, Twitter
- ✓ Skills/expertise: Python, FastAPI, Computer Vision, etc.
- ✓ Email and description
- ✓ Profile image URL

**WebSite Schema** should include:
- ✓ Site name
- ✓ URL and description
- ✓ Creator information
- ✓ Search action capability

### Test with Schema.org Validator

1. Go to [Schema.org Validator](https://validator.schema.org/)
2. Paste your page URL
3. Validate

Should show:
- ✓ Valid JSON-LD
- ✓ No critical errors
- ✓ Structured data detected

## Step 6: Verify Image Optimization

### Check Network Tab

1. Open DevTools (`F12`)
2. Go to **Network** tab
3. Reload the page
4. Filter by **Images** (if available)

For each image:
- ✓ **Type** should show `image/webp` or `image/avif` (for modern browsers)
- ✓ **Size** should be reasonable (typically < 200KB for portfolio images)
- ✓ Progressive loading in slower networks

### Example in Chrome DevTools

```
Name: dipesh.jpg
Type: image/webp
Size: 42 KB (original might be 200+ KB)
Status: 200 OK
```

### Test Image Responsiveness

1. Open DevTools
2. Toggle **Device Toolbar** (mobile view)
3. Reload page
4. Check images still load and scale properly
5. Verify no layout shift when images load

## Step 7: Check Semantic HTML

### Verify Key Elements

Open DevTools and search for:

**✓ Main landmark**
```html
<main id="main-content" ...>
```

**✓ Section elements**
```html
<section id="about" ...>
<section id="projects" ...>
<section id="experience" ...>
```

**✓ Header and Footer**
```html
<header>...</header>
<footer>...</footer>
```

**✓ Navigation landmark**
```html
<nav>...</nav>
```

**✓ Proper heading hierarchy**
```html
<h1>...</h1>  <!-- Only one per page -->
<h2>...</h2>  <!-- Section headings -->
<h3>...</h3>  <!-- Subheadings -->
```

## Step 8: Run GitHub Actions SEO Checks

### Trigger Manual Workflow

1. Go to your GitHub repository
2. Click **Actions** tab
3. Select **SEO Validation & Checks**
4. Click **Run workflow** button
5. Select branch (main)
6. Click **Run workflow**

### View Results

1. Wait for workflow to complete (usually < 1 minute)
2. Click the workflow run
3. Expand "Validate SEO Configuration" step
4. Review all checks:

Expected output:
```
✓ sitemap.xml found
✓ sitemap.xml is valid XML
✓ robots.txt found
✓ og-image.png found
✓ Metadata object exported
✓ All Image components have alt text
✓ Found semantic HTML elements
✓ Canonical URLs configured
✓ Robots meta tag configured
```

### Troubleshoot Failed Checks

If any checks fail:

1. Click the failed step to see details
2. Common issues:
   - Missing files in `/public` directory
   - Incorrect XML formatting in sitemap
   - Missing metadata in `app/layout.tsx`
   - Images without alt text

3. Fix issues and push changes
4. Workflow will run automatically on next push

## Step 9: Submit to Search Engines

### Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click **Add property**
3. Enter your domain URL
4. Verify ownership (via DNS, file, or meta tag)
5. Submit sitemap:
   - Click **Sitemaps** in left menu
   - Enter `/sitemap.xml`
   - Click **Submit**

### Bing Webmaster Tools

1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Add your site URL
3. Verify ownership
4. Submit sitemap:
   - Click **Sitemaps**
   - Enter `/sitemap.xml`
   - Submit

## Step 10: Monitor SEO Performance

### Google Search Console Metrics

After submitting to Google:

1. Go to Search Console
2. Check **Performance** report
3. Monitor:
   - **Total Clicks** — How many people clicked your result
   - **Impressions** — How many times you appeared in search
   - **Average CTR** — Click-through rate (% of impressions that clicked)
   - **Average Position** — Where you rank for keywords

### Monitor Over Time

- Check weekly for the first month
- Track which keywords bring traffic
- Improve content for high-impression, low-CTR keywords
- Monitor ranking improvements

## Step 11: Ongoing Maintenance

### Monthly SEO Audit

1. Run the GitHub Actions SEO workflow
2. Review Google Search Console metrics
3. Check for crawl errors in GSC
4. Verify sitemap is current
5. Test social sharing again
6. Update content and timestamps

### When to Update SEO Configuration

Update `app/layout.tsx` if:
- ✓ You change your site's primary purpose
- ✓ You update your skills or experience
- ✓ You want different keywords
- ✓ You change social media handles

Update `public/sitemap.xml` if:
- ✓ You add new pages
- ✓ You remove pages
- ✓ You change URL structure

Update JSON-LD schemas if:
- ✓ You add new project types
- ✓ You want to highlight specific expertise
- ✓ You add new social profiles

## Helpful Tools & Resources

- [Google Search Central](https://developers.google.com/search) — Official Google SEO guide
- [Google PageSpeed Insights](https://pagespeed.web.dev/) — Performance scoring
- [SEO Audit Tools](https://www.semrush.com/seo-audit-tool/) — Comprehensive SEO analysis
- [Meta Tags Inspector](https://metatags.io/) — Visualize meta tags
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) — Built-in DevTools audits

## Common Issues & Solutions

| Problem | Solution |
|---------|----------|
| **Sitemap returns 404** | Ensure `/public/sitemap.xml` exists. Run `npm run build` before deploying. |
| **OG image not showing** | Image must be at `/public/og-image.png`, 1200x630px. Clear cache and retry. |
| **Structured data not detected** | Use Rich Results Test to validate JSON-LD. Check console for errors. |
| **Robots.txt blocks content** | Ensure `Disallow: /` line is not present. Check for `/api/` blocking is intentional. |
| **Images not optimizing** | Check `next.config.mjs` has `unoptimized: false`. Use Next.js `Image` component. |
| **Google can't index site** | Ensure robots.txt allows `/`. Submit sitemap to Google Search Console. |

---

**Last Updated:** 2024-05-21
**Next Review:** Monthly
