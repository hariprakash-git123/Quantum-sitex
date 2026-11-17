// Static site build: renders src/pages/* through the shared layout into dist/.
// Usage: node build.mjs            (one-off build)
import { rm, mkdir, cp, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(root, 'dist');

export async function build() {
  const load = (p) => import(pathToFileURL(path.join(root, p)).href);
  const { pages } = await load('src/pages/index.js');
  const { layout } = await load('src/components/layout.js');
  const { site } = await load('src/config.js');

  await rm(dist, { recursive: true, force: true });
  await mkdir(dist, { recursive: true });
  await cp(path.join(root, 'src/assets'), path.join(dist, 'assets'), { recursive: true });

  for (const page of pages) {
    await writeFile(path.join(dist, page.file), layout(page), 'utf8');
  }

  const robots = ['User-agent: *', 'Allow: /'];
  if (site.url) {
    const urls = pages
      .filter((p) => !p.noindex)
      .map((p) => `  <url><loc>${site.url}/${p.file === 'index.html' ? '' : p.file}</loc></url>`)
      .join('\n');
    await writeFile(
      path.join(dist, 'sitemap.xml'),
      `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    );
    robots.push(`Sitemap: ${site.url}/sitemap.xml`);
  } else {
    console.warn('! site.url is empty in src/config.js — skipped sitemap.xml and canonical URLs.');
  }
  await writeFile(path.join(dist, 'robots.txt'), robots.join('\n') + '\n');

  console.log(`✓ Built ${pages.length} pages → dist/`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  build().catch((err) => { console.error(err); process.exit(1); });
}
