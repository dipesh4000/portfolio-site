import assert from 'node:assert/strict';
import { access } from 'node:fs/promises';
import { portfolio as p } from '../content.js';

assert(p.firstName && p.lastName && p.email && p.role, 'Identity fields are required');
assert.match(p.accent, /^#[0-9a-f]{6}$/i);
assert.match(p.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
assert.equal(new Set(p.projects.map(x => x.id)).size, p.projects.length, 'Project IDs must be unique');
for (const item of [...p.projects, ...p.socials, { url: p.resume }]) assert(['https:', 'http:'].includes(new URL(item.url).protocol), 'Links must be http(s)');
for (const asset of [p.heroImage, p.portrait]) await access(new URL(asset, new URL('../', import.meta.url)));
assert(p.metrics.every(x => typeof x.label === 'string' && ['string', 'number'].includes(typeof x.value)));
console.log('Configuration, project IDs, links, and local assets verified.');
