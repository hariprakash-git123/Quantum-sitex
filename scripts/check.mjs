// Guardrail checks for the built site (run `npm run build` first).
//  • every internal link and #anchor resolves
//  • exactly 10 main sections in the navigation
//  • every page has a <title>, meta description and one <h1>
//  • no purple / violet colours anywhere
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const problems = [];

const walk = async (dir) => (await readdir(dir, { withFileTypes: true }))
  .flatMap((e) => (e.isDirectory() ? [] : [path.join(dir, e.name)]))
  .concat(...(await Promise.all((await readdir(dir, { withFileTypes: true }))
    .filter((e) => e.isDirectory()).map((e) => walk(path.join(dir, e.name))))));

const files = await walk(dist);
const htmlFiles = files.filter((f) => f.endsWith('.html'));
const docs = Object.fromEntries(await Promise.all(htmlFiles.map(async (f) => [path.basename(f), await readFile(f, 'utf8')])));
const ids = (html) => new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));

for (const [name, html] of Object.entries(docs)) {
  if (!/<title>[^<]+<\/title>/.test(html)) problems.push(`${name}: missing <title>`);
  if (!/<meta name="description" content="[^"]+">/.test(html)) problems.push(`${name}: missing meta description`);
  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) problems.push(`${name}: expected 1 <h1>, found ${h1}`);

  const navItems = (html.match(/<nav class="menu__nav"[\s\S]*?<\/nav>/) || [''])[0].match(/<li /g) || [];
  if (navItems.length !== 10) problems.push(`${name}: main menu has ${navItems.length} sections, expected 10`);

  for (const [, href] of html.matchAll(/href="([^"]+)"/g)) {
    if (/^(https?:|mailto:|tel:|\/\/)/.test(href)) continue;
    const [file, hash] = href.split('#');
    const target = (file.split('?')[0]) || name;
    if (target.endsWith('.html') && !docs[target]) problems.push(`${name}: broken link → ${href}`);
    else if (!target.endsWith('.html') && !files.includes(path.join(dist, target))) problems.push(`${name}: missing file → ${href}`);
    if (hash && docs[target] && !ids(docs[target]).has(hash)) problems.push(`${name}: missing anchor → ${href}`);
  }
}

// Colour guardrail
const hexHue = (hex) => {
  let h = hex.replace('#', '');
  if (h.length <= 4) h = [...h.slice(0, 3)].map((c) => c + c).join('');
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
  const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
  if (d < 0.08) return null; // greyscale
  let hue = max === r ? ((g - b) / d) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return (hue * 60 + 360) % 360;
};
for (const f of files.filter((f) => /\.(html|css|js|svg)$/.test(f))) {
  const text = await readFile(f, 'utf8');
  const rel = path.relative(dist, f);
  if (/\b(purple|violet|indigo|lavender|magenta|fuchsia|orchid|plum)\b/i.test(text)) problems.push(`${rel}: purple/violet colour keyword`);
  for (const [hex] of text.matchAll(/#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b/g)) {
    const hue = hexHue(hex);
    if (hue !== null && hue >= 250 && hue <= 330) problems.push(`${rel}: purple-range colour ${hex}`);
  }
  for (const [m, r, g, b] of text.matchAll(/rgba?\((\d+),\s*(\d+),\s*(\d+)/g)) {
    const hue = hexHue('#' + [r, g, b].map((n) => Number(n).toString(16).padStart(2, '0')).join(''));
    if (hue !== null && hue >= 250 && hue <= 330) problems.push(`${rel}: purple-range colour ${m}`);
  }
}

if (problems.length) {
  console.error(`✗ ${problems.length} problem(s):\n  ` + problems.join('\n  '));
  process.exit(1);
}
console.log(`✓ ${htmlFiles.length} pages checked: links, anchors, 10 sections, titles, descriptions, h1s, no purple/violet.`);
