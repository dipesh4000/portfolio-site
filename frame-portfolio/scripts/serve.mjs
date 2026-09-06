import http from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const port = Number(process.env.PORT || 4173);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.webp': 'image/webp' };
const allowed = new Set(['index.html', 'styles.css', 'app.js', 'content.js']);
http.createServer(async (req, res) => {
  try {
    if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405); res.end(); return; }
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const relative = pathname === '/' ? 'index.html' : pathname.slice(1);
    const resolved = path.resolve(root, relative);
    if (!resolved.startsWith(root) || relative.includes('..') || (!allowed.has(relative) && !/^assets\/[\w.-]+$/.test(relative))) { res.writeHead(404); res.end('Not found'); return; }
    const data = await readFile(resolved);
    res.writeHead(200, { 'Content-Type': types[path.extname(resolved)] || 'application/octet-stream', 'Cache-Control': 'no-cache', 'X-Content-Type-Options': 'nosniff' });
    res.end(req.method === 'HEAD' ? undefined : data);
  } catch { res.writeHead(404); res.end('Not found'); }
}).listen(port, '127.0.0.1', () => console.log(`FRAME portfolio: http://localhost:${port}`));
