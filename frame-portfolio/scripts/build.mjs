import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { portfolio as p } from '../content.js';

const root = new URL('../', import.meta.url);
const dist = new URL('dist/', root);
const esc = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
await mkdir(dist, { recursive: true });
for (const file of ['styles.css', 'app.js', 'content.js', 'assets']) await cp(new URL(file, root), new URL(file, dist), { recursive: true });
let html = await readFile(new URL('index.html', root), 'utf8');
html = html.replace(/<title>.*?<\/title>/, `<title>${esc(p.firstName)} ${esc(p.lastName)} — ${esc(p.headline)}</title>`)
  .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${esc(p.firstName)} ${esc(p.lastName)}. ${esc(p.role)}. ${esc(p.description)}">`)
  .replace(/<noscript>[\s\S]*?<\/noscript>/, `<noscript><main class="no-script"><h1>${esc(p.firstName)} ${esc(p.lastName)}</h1><p>${esc(p.role)}</p><p>${esc(p.description)}</p><a href="mailto:${esc(p.email)}">Get in touch</a></main></noscript>`)
  .replace(/<link rel="preload"[^>]*>/, `<link rel="preload" href="${esc(p.heroImage)}" as="image">`);
await writeFile(new URL('index.html', dist), html);
console.log('Built independent static site in dist/. Upload its contents to any static host.');
