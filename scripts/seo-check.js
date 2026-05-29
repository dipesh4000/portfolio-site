const fs = require('fs');
const path = require('path');

let exitCode = 0;

function logSuccess(message) {
  console.log(`\x1b[32m✓\x1b[0m ${message}`);
}

function logError(message) {
  console.error(`\x1b[31m✗\x1b[0m ${message}`);
  exitCode = 1;
}

console.log("Starting SEO Verification Checks...\n");

// 1. Check sitemap.xml
const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
if (fs.existsSync(sitemapPath)) {
  logSuccess('sitemap.xml found');
  try {
    const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
    if (sitemapContent.includes('<urlset') && sitemapContent.includes('</urlset>')) {
      logSuccess('sitemap.xml is valid XML structure');
    } else {
      logError('sitemap.xml is missing root <urlset> tags');
    }
  } catch (e) {
    logError(`sitemap.xml read error: ${e.message}`);
  }
} else {
  logError('sitemap.xml not found');
}

// 2. Check robots.txt
const robotsPath = path.join(process.cwd(), 'public', 'robots.txt');
if (fs.existsSync(robotsPath)) {
  logSuccess('robots.txt found');
  try {
    const robotsContent = fs.readFileSync(robotsPath, 'utf8');
    if (robotsContent.includes('User-agent:') && robotsContent.includes('Sitemap:')) {
      logSuccess('robots.txt has basic directives and Sitemap reference');
    } else {
      logError('robots.txt is missing User-agent or Sitemap directives');
    }
  } catch (e) {
    logError(`robots.txt read error: ${e.message}`);
  }
} else {
  logError('robots.txt not found');
}

// 3. Check og-image.png
const ogImagePath = path.join(process.cwd(), 'public', 'og-image.png');
if (fs.existsSync(ogImagePath)) {
  logSuccess('og-image.png found');
} else {
  logError('og-image.png not found');
}

// 4. Check layout.tsx for Metadata, Canonical URLs, and Robots meta tags
const layoutPath = path.join(process.cwd(), 'app', 'layout.tsx');
if (fs.existsSync(layoutPath)) {
  try {
    const layoutContent = fs.readFileSync(layoutPath, 'utf8');
    if (layoutContent.includes('export const metadata')) {
      logSuccess('Metadata object exported');
    } else {
      logError('Metadata object not found in layout.tsx');
    }

    if (layoutContent.includes('canonical') || layoutContent.includes('alternates')) {
      logSuccess('Canonical URLs configured');
    } else {
      logError('Canonical URL configuration not found in layout.tsx');
    }

    if (layoutContent.includes('robots')) {
      logSuccess('Robots meta tag configured');
    } else {
      logError('Robots configuration not found in layout.tsx');
    }
  } catch (e) {
    logError(`layout.tsx read error: ${e.message}`);
  }
} else {
  logError('layout.tsx not found');
}

// 5. Scan components for Image components and verify they have alt attributes
function scanDirForImages(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      scanDirForImages(fullPath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      // Simple regex to find <Image ... /> tags
      const imageRegex = /<Image\b([^>]*)\/?>/g;
      let match;
      while ((match = imageRegex.exec(content)) !== null) {
        const attributes = match[1];
        if (!attributes.includes('alt=')) {
          logError(`Missing alt attribute on <Image> in ${path.relative(process.cwd(), fullPath)}`);
        }
      }
    }
  }
}

try {
  scanDirForImages(path.join(process.cwd(), 'components'));
  scanDirForImages(path.join(process.cwd(), 'app'));
  logSuccess('All Image components have alt text check completed');
} catch (e) {
  logError(`Image alt scan error: ${e.message}`);
}

// 6. Check for semantic HTML elements in the project
let foundMain = false;
let foundSection = false;
let foundNav = false;
let foundFooter = false;

function scanDirForSemantic(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      scanDirForSemantic(fullPath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('<main')) foundMain = true;
      if (content.includes('<section')) foundSection = true;
      if (content.includes('<nav')) foundNav = true;
      if (content.includes('<footer') || content.includes('Footer')) foundFooter = true;
    }
  }
}

try {
  scanDirForSemantic(path.join(process.cwd(), 'app'));
  scanDirForSemantic(path.join(process.cwd(), 'components'));
  
  if (foundMain && foundSection && foundNav && foundFooter) {
    logSuccess('Found semantic HTML elements (<main>, <section>, <nav>, <footer>)');
  } else {
    const missing = [];
    if (!foundMain) missing.push('<main>');
    if (!foundSection) missing.push('<section>');
    if (!foundNav) missing.push('<nav>');
    if (!foundFooter) missing.push('<footer>');
    logError(`Missing semantic HTML elements: ${missing.join(', ')}`);
  }
} catch (e) {
  logError(`Semantic HTML scan error: ${e.message}`);
}

console.log("\nSEO Verification Completed.");
process.exit(exitCode);
