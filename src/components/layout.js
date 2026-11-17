// Page shell: <head>, loader, page transition, header, menu, footer.
import { site, fonts } from '../config.js';
import { nav } from '../data/content.js';
import { esc, join, mark, arrow } from './ui.js';

const year = new Date().getFullYear();

const fontLink = () => {
  const fams = [fonts.display, fonts.body].filter((f) => f.google).map((f) => `family=${f.google}`);
  if (!fams.length) return '';
  return `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?${fams.join('&')}&display=swap">`;
};

const fontVars = `<style>:root{--font-display:${fonts.display.family},${fonts.display.fallback};--font-body:${fonts.body.family},${fonts.body.fallback}}</style>`;

// Runs before first paint: decides whether to show the intro loader
// (first visit in a session) or the arrival half of a page transition.
const headScript = `<script>(function(d){var c=d.documentElement.classList;c.add('js');try{var rm=matchMedia('(prefers-reduced-motion: reduce)').matches;if(!sessionStorage.getItem('qs-intro')){if(!rm)c.add('is-loading')}else if(sessionStorage.getItem('qs-nav')){if(!rm)c.add('is-arriving');sessionStorage.removeItem('qs-nav')}}catch(e){}})(document)</script>`;

const jsonLd = () => {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    slogan: site.tagline,
    description: site.description,
    email: site.email,
    telephone: `+${site.whatsapp.number}`,
    areaServed: 'Worldwide',
    ...(site.url ? { url: site.url } : {}),
  };
  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
};

const head = (page) => {
  const title = page.slug === 'index' ? `${site.name} — ${site.tagline} Software, AI & Digital Products` : `${page.title} — ${site.name}`;
  const canonical = site.url ? `${site.url}/${page.file === 'index.html' ? '' : page.file}` : '';
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(page.description)}">
${page.noindex ? '<meta name="robots" content="noindex">' : ''}
${canonical ? `<link rel="canonical" href="${canonical}">` : ''}
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(site.name)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(page.description)}">
${canonical ? `<meta property="og:url" content="${canonical}">` : ''}
<meta name="twitter:card" content="summary">
<meta name="theme-color" content="#090909">
<link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
${fontLink()}
${fontVars}
<link rel="stylesheet" href="assets/css/main.css">
${headScript}
<script src="assets/js/main.js" defer></script>
${jsonLd()}
</head>`;
};

const loader = () => `
<div class="loader" aria-hidden="true">
  <div class="loader__inner">
    <p class="loader__brand">${join([...'QUANTUM'], (c, i) => `<span style="--i:${i}">${c}</span>`)}<span class="loader__gap"></span>${join([...'SITEX'], (c, i) => `<span style="--i:${i + 8}">${c}</span>`)}</p>
    <div class="loader__bar"><span data-loader-bar></span></div>
    <p class="loader__msg"><span>${site.tagline}</span></p>
  </div>
</div>
<div class="pt" aria-hidden="true"><span class="pt__edge"></span>${mark('pt__mark')}</div>`;

const header = (page) => {
  const current = nav.find((n) => n.slug === page.slug);
  return `
<a class="skip" href="#main">Skip to content</a>
<header class="hdr" data-hdr>
  <div class="wrap hdr__bar">
    <a class="brand" href="index.html" aria-label="${site.name} — Home">${mark()}<span class="brand__name">Quantum Sitex</span></a>
    <p class="hdr__crumb" aria-hidden="true">${current ? `<span>/</span> ${current.label}` : ''}</p>
    <div class="hdr__actions">
      <a class="hdr__cta" href="contact.html"><span>Let’s talk</span></a>
      <button class="menu-btn" type="button" aria-expanded="false" aria-controls="site-menu" data-menu-btn>
        <span class="menu-btn__label" data-open="Menu" data-close="Close">Menu</span>
        <span class="menu-btn__icon" aria-hidden="true"><i></i><i></i></span>
      </button>
    </div>
  </div>
</header>
<div class="menu" id="site-menu" hidden data-menu>
  <div class="wrap menu__grid">
    <nav class="menu__nav" aria-label="Main">
      <ul class="menu__list">
        ${join(nav, (n, i) => `<li style="--i:${i}"><a href="${n.href}"${n.slug === page.slug ? ' aria-current="page"' : ''}><span>${n.label}</span></a></li>`)}
      </ul>
    </nav>
    <div class="menu__side">
      <p class="eyebrow">Get in touch</p>
      <a class="menu__contact" href="mailto:${site.email}">${site.email}</a>
      <a class="menu__contact" href="https://wa.me/${site.whatsapp.number}" target="_blank" rel="noopener">WhatsApp ${site.whatsapp.display}</a>
      <p class="menu__tag">${site.tagline}</p>
    </div>
  </div>
</div>`;
};

const footer = () => `
<footer class="ftr" aria-labelledby="ftr-title">
  <h2 class="sr-only" id="ftr-title">Site footer</h2>
  <div class="wrap">
    <div class="ftr__top">
      <p class="display ftr__line" data-split="lines"><span class="ln"><span class="ln__i" style="--i:0">Think Beyond.</span></span><span class="ln"><span class="ln__i" style="--i:1"><em>Build Beyond.</em></span></span></p>
      <div class="ftr__about" data-reveal>
        <p>Quantum Sitex is a hybrid technology company: we build software for clients worldwide and develop our own software products alongside it.</p>
        <a class="btn btn--solid" href="contact.html"><span class="btn__label" data-label="Start a project"><span>Start a project</span></span>${arrow()}</a>
      </div>
    </div>
    <div class="ftr__cols" data-reveal>
      <nav aria-label="Footer">
        <h3 class="ftr__h">Sections</h3>
        <ul class="ftr__nav">${join(nav, (n) => `<li><a href="${n.href}">${n.label}</a></li>`)}</ul>
      </nav>
      <div>
        <h3 class="ftr__h">Contact</h3>
        <ul class="ftr__list">
          <li><a href="mailto:${site.email}">${site.email}</a></li>
          <li><a href="https://wa.me/${site.whatsapp.number}" target="_blank" rel="noopener">WhatsApp ${site.whatsapp.display}</a></li>
          ${join(site.socials, (s) => `<li><a href="${s.href}" target="_blank" rel="noopener">${s.label}</a></li>`)}
        </ul>
      </div>
      <div>
        <h3 class="ftr__h">Legal</h3>
        <ul class="ftr__list">
          <li><a href="privacy.html">Privacy Policy</a></li>
          <li><a href="terms.html">Terms of Use</a></li>
        </ul>
      </div>
    </div>
  </div>
  <div class="ftr__brand" aria-hidden="true" data-fit>
    <span class="ftr__word">${join([...'QUANTUM'], (c, i) => `<span style="--i:${i}">${c}</span>`)}</span><span class="ftr__word">${join([...'SITEX'], (c, i) => `<span style="--i:${i + 7}">${c}</span>`)}<span class="ftr__dot" style="--i:12"></span></span>
  </div>
  <div class="wrap ftr__base">
    <p>© ${year} ${site.name}. All rights reserved.</p>
    <p>${site.tagline}</p>
    <a class="tlink tlink--up" href="#main"><span>Back to top</span>${arrow()}</a>
  </div>
</footer>`;

export const layout = (page) => `${head(page)}
<body class="p-${page.slug}">
${page.loader === false ? '' : loader()}
${header(page)}
<main id="main" tabindex="-1">
${page.body()}
</main>
${footer()}
</body>
</html>
`;
