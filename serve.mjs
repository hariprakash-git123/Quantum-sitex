// Local preview server for dist/, with rebuild-on-change.
// Usage: node serve.mjs [port]
import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { watch } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFile } from 'node:child_process';

const root = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(root, 'dist');
const port = Number(process.argv[2]) || 4173;
const types = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp',
  '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8', '.ico': 'image/x-icon',
};

// Each build runs in a fresh process so edited ES modules are re-read.
const build = () => new Promise((resolve) => {
  execFile(process.execPath, [path.join(root, 'build.mjs')], (err, stdout, stderr) => {
    process.stdout.write(stdout);
    process.stderr.write(stderr);
    resolve(!err);
  });
});

await build();

let timer;
watch(path.join(root, 'src'), { recursive: true }, () => {
  clearTimeout(timer);
  timer = setTimeout(build, 150);
});

http.createServer(async (req, res) => {
  const urlPath = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  let file = path.normalize(path.join(dist, urlPath));
  if (!file.startsWith(dist)) { res.writeHead(403).end(); return; }
  try {
    if ((await stat(file)).isDirectory()) file = path.join(file, 'index.html');
    const body = await readFile(file);
    res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' }).end(body);
  } catch {
    const body = await readFile(path.join(dist, '404.html')).catch(() => 'Not found');
    res.writeHead(404, { 'Content-Type': types['.html'] }).end(body);
  }
}).listen(port, () => console.log(`→ http://localhost:${port}  (watching src/ for changes)`));
