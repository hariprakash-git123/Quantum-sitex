// Small, reusable rendering helpers. Every page is composed from these.
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

export const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const join = (arr, fn) => arr.map(fn).join('');

// ── Icons ────────────────────────────────────────────────────
export const arrow = (cls = '') =>
  `<svg class="i-arrow ${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`;

export const mark = (cls = '') =>
  `<svg class="mark ${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="11" cy="11" r="8" fill="none" stroke="currentColor" stroke-width="2.4"/><circle class="mark__dot" cx="19" cy="19" r="3.4"/></svg>`;

const industryPaths = {
  education: '<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5"/><path d="M22 9v6"/>',
  healthcare: '<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"/>',
  'real-estate': '<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',
  retail: '<path d="M5 8h14l-1 13H6z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
  finance: '<path d="M3 20h18"/><path d="M5 16l5-5 4 3 6-7"/><path d="M15 7h5v5"/>',
  hospitality: '<path d="M3 18h18"/><path d="M5 18a7 7 0 0 1 14 0"/><path d="M12 11V8"/><path d="M10 8h4"/>',
  logistics: '<path d="M2 6h12v10H2z"/><path d="M14 10h4l3 3v3h-7"/><circle cx="6" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',
  manufacturing: '<path d="M3 21V10l6 4v-4l6 4V5h6v16z"/><path d="M7 17h2M12 17h2M17 17h1"/>',
  'professional-services': '<path d="M3 8h18v12H3z"/><path d="M9 8V5h6v3"/><path d="M3 13h18"/>',
  media: '<rect x="3" y="5" width="18" height="14"/><path d="M10 9l5 3-5 3z"/>',
};
export const industryIcon = (slug) =>
  `<svg class="i-line" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${industryPaths[slug] || ''}</svg>`;

// Technology logos from the simple-icons package (monochrome, currentColor).
const logoCache = new Map();
export const logo = (slug) => {
  if (!slug) return '';
  if (logoCache.has(slug)) return logoCache.get(slug);
  const file = path.join(root, 'node_modules/simple-icons/icons', `${slug}.svg`);
  let out = '';
  if (existsSync(file)) {
    const d = readFileSync(file, 'utf8').match(/ d="([^"]+)"/);
    if (d) out = `<svg class="logo" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="${d[1]}"/></svg>`;
  }
  logoCache.set(slug, out);
  return out;
};

// ── Text ─────────────────────────────────────────────────────
// Masked line-by-line heading. `lines` is an array of HTML strings.
export const lines = (arr) =>
  join(arr, (l, i) => `<span class="ln"><span class="ln__i" style="--i:${i}">${l}</span></span>`);

export const eyebrow = (text) => `<p class="eyebrow" data-reveal>${text}</p>`;

// ── Buttons & links ──────────────────────────────────────────
export const button = (label, href, variant = 'solid', attrs = '') =>
  `<a class="btn btn--${variant}" href="${href}" ${attrs}><span class="btn__label" data-label="${esc(label)}"><span>${label}</span></span>${arrow()}</a>`;

export const textLink = (label, href, attrs = '') =>
  `<a class="tlink" href="${href}" ${attrs}><span>${label}</span>${arrow()}</a>`;

// ── Sections ─────────────────────────────────────────────────
export const pageHero = ({ eyebrowText, heading, intro = '', aside = '', id = 'top' }) => `
<section class="phero" id="${id}">
  <div class="wrap phero__grid">
    ${eyebrow(eyebrowText)}
    <h1 class="display phero__title" data-split="lines">${lines(heading)}</h1>
    ${intro ? `<p class="lead phero__intro" data-reveal>${intro}</p>` : ''}
    ${aside ? `<div class="phero__aside" data-reveal>${aside}</div>` : ''}
  </div>
  <div class="wrap"><div class="rule rule--draw" data-reveal></div></div>
</section>`;

// Seamless marquee. Items are HTML strings. Second copy is hidden from AT.
export const marquee = ({ items, direction = 'left', label, speed = 40, cls = '' }) => {
  const list = (hidden) =>
    `<ul class="marquee__list" ${hidden ? 'aria-hidden="true"' : ''}>${join(items, (it) => `<li>${it}</li>`)}</ul>`;
  return `
<div class="marquee marquee--${direction} ${cls}" style="--speed:${speed}s" role="region" aria-label="${esc(label)}">
  <div class="marquee__track">${list(false)}${list(true)}</div>
  <button class="marquee__toggle" type="button" aria-pressed="false" data-marquee-toggle>
    <span class="sr-only">Pause scrolling: ${esc(label)}</span>
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path class="p-pause" d="M8 5v14M16 5v14"/><path class="p-play" d="M7 5l12 7-12 7z"/></svg>
  </button>
</div>`;
};

export const ctaBlock = ({ heading, text, primary = ['Start a conversation', 'contact.html'], secondary }) => `
<section class="cta" aria-labelledby="cta-title">
  <div class="wrap cta__grid">
    <h2 class="display cta__title" id="cta-title" data-split="lines">${lines(heading)}</h2>
    <div class="cta__side" data-reveal>
      <p class="lead">${text}</p>
      <div class="btn-row">
        ${button(primary[0], primary[1])}
        ${secondary ? button(secondary[0], secondary[1], 'ghost', secondary[2] || '') : ''}
      </div>
    </div>
  </div>
</section>`;

export const sectionHead = ({ eyebrowText, heading, id, aside = '' }) => `
<div class="shead">
  ${eyebrow(eyebrowText)}
  <h2 class="display shead__title" id="${id}" data-split="lines">${lines(heading)}</h2>
  ${aside ? `<div class="shead__aside" data-reveal>${aside}</div>` : ''}
</div>`;
