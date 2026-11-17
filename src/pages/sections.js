// About, Services, Projects, Products, Technologies, Industries, Why, Roadmap.
import { site } from '../config.js';
import {
  services, products, techCategories, techMarquee, industries, why, roadmap, projects,
} from '../data/content.js';
import {
  join, esc, lines, eyebrow, arrow, textLink, marquee, ctaBlock, sectionHead, pageHero, industryIcon, logo,
} from '../components/ui.js';
import { processMarquee } from './home.js';

const wa = `https://wa.me/${site.whatsapp.number}`;

// ── About ────────────────────────────────────────────────────
export const about = {
  slug: 'about',
  file: 'about.html',
  title: 'About Us',
  description:
    'Who Quantum Sitex is: a hybrid technology company that builds software for clients worldwide and develops its own software products.',
  body: () => `
${pageHero({
  eyebrowText: 'About us',
  heading: ['A technology company', 'built on <em>ideas</em>'],
  intro: 'Quantum Sitex builds software for clients and develops software products of its own — two tracks driven by the same goal: turning ideas into impact.',
})}

<section class="section" aria-labelledby="who-title">
  <div class="wrap split">
    <div class="split__label">${eyebrow('Who we are')}</div>
    <div class="split__body">
      <h2 class="display h-md" id="who-title" data-split="lines">${lines(['Who <em>we</em> are'])}</h2>
      <p class="lead" data-reveal>Quantum Sitex is a hybrid technology company. We design and develop websites, web applications, AI integrations and automation for clients — and we’re building our own commercial software products alongside that work.</p>
      <p data-reveal>We work with startups, small businesses, SMEs, large enterprises and individuals. We’re global from day one: if you can reach us by email or WhatsApp, we can work together.</p>
    </div>
  </div>
</section>

<section class="section section--light" aria-labelledby="vision-title">
  <div class="wrap split">
    <div class="split__label">${eyebrow('Our vision')}</div>
    <div class="split__body">
      <h2 class="sr-only" id="vision-title">Our vision</h2>
      <p class="statement" data-split="words">A world where any organization or individual, at any size, can turn a good idea into <em>software that makes a real difference.</em></p>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="mission-title">
  <div class="wrap split">
    <div class="split__label">${eyebrow('Our mission')}</div>
    <div class="split__body">
      <h2 class="sr-only" id="mission-title">Our mission</h2>
      <p class="statement" data-split="words">To turn ideas into dependable, well-designed software — by listening closely, choosing the right technology for each problem and <em>putting AI to work where it genuinely helps.</em></p>
    </div>
  </div>
</section>

<section class="section section--line" aria-labelledby="do-title">
  <div class="wrap split">
    <div class="split__label">${eyebrow('What we do')}</div>
    <div class="split__body">
      <h2 class="display h-md" id="do-title" data-split="lines">${lines(['Two tracks.', 'One <em>direction.</em>'])}</h2>
      <div class="tracks" data-stagger>
        <div class="tracks__item" data-reveal>
          <span class="tag">Available now</span>
          <h3>Services for clients</h3>
          <p>Website and web application development, AI integration, UI/UX design, automation, cloud, APIs, e-commerce, data and ongoing support.</p>
          ${textLink('View services', 'services.html')}
        </div>
        <div class="tracks__item" data-reveal>
          <span class="tag tag--outline">Planned</span>
          <h3>Products of our own</h3>
          <p>AI-integrated web applications, SaaS products, business management software and industry-specific software, starting with education.</p>
          ${textLink('View product plans', 'products.html')}
        </div>
      </div>
    </div>
  </div>
</section>

${ctaBlock({
  heading: ['Every great project', 'starts with a <em>conversation.</em>'],
  text: 'Tell us about your idea, however early it is.',
  primary: ['Get in touch', 'contact.html'],
})}
`,
};

// ── Services ─────────────────────────────────────────────────
export const servicesPage = {
  slug: 'services',
  file: 'services.html',
  title: 'Services',
  description:
    'Website and web application development, AI development and integration, UI/UX design, automation, cloud & DevOps, APIs, e-commerce, maintenance and data analytics.',
  body: () => `
${pageHero({
  eyebrowText: 'Services',
  heading: ['We don’t just', 'build software.', 'We build <em>possibilities.</em>'],
  intro: 'Ten services, one approach: understand the problem first, then build what solves it. Every engagement can be shaped around your own requirements.',
})}

<section class="section section--tight" aria-label="All services">
  <div class="wrap">
    <p class="legend" data-reveal>
      <span><b>Build</b> — products people use</span>
      <span><b>Intelligence</b> — AI, automation & data</span>
      <span><b>Design</b> — how it looks and works</span>
      <span><b>Operate</b> — keeping it running</span>
    </p>
    <div class="svc-list">
      ${join(services, (s) => `
      <article class="svc" id="${s.slug}" data-reveal>
        <p class="svc__group">${s.group}</p>
        <h2 class="svc__name">${s.name}</h2>
        <div class="svc__body">
          <p>${s.summary}</p>
          <ul class="chips" aria-label="Can include">${join(s.includes, (i) => `<li>${i}</li>`)}</ul>
          ${textLink(`Enquire about ${s.name}`, `contact.html?service=${s.slug}#enquiry`)}
        </div>
      </article>`)}
    </div>
  </div>
</section>

${processMarquee('Our process, from idea to growth')}

${ctaBlock({
  heading: ['Need something', 'not on this <em>list?</em>'],
  text: 'Most projects mix several of these. Describe what you need and we’ll suggest the right combination.',
  primary: ['Describe your requirements', 'contact.html#enquiry'],
})}
`,
};

// ── Projects ─────────────────────────────────────────────────
const projectCard = (p) => `
<article class="proj" data-reveal>
  <div class="proj__media">
    ${p.image ? `<img src="${p.image}" alt="${esc(p.imageAlt || '')}" loading="lazy" decoding="async" data-img>` : ''}
  </div>
  <h2 class="proj__title">${p.title}</h2>
  <p>${p.summary}</p>
  <ul class="chips">${join(p.tech || [], (t) => `<li>${t}</li>`)}</ul>
  <div class="btn-row">
    ${p.demoUrl ? textLink('Live demo', p.demoUrl, 'target="_blank" rel="noopener"') : ''}
    ${p.codeUrl ? textLink('Source code', p.codeUrl, 'target="_blank" rel="noopener"') : ''}
  </div>
</article>`;

export const projectsPage = {
  slug: 'projects',
  file: 'projects.html',
  title: 'Projects',
  description: 'Demo projects by Quantum Sitex, with screenshots, technologies used and live demo links as each one is completed.',
  body: () => `
${pageHero({
  eyebrowText: 'Projects',
  heading: ['Work in', '<em>progress</em>'],
  intro: 'This page is for real demo projects only. Each one appears here once it’s built, with screenshots, the technologies used and a link to try it.',
})}

<section class="section section--tight" aria-labelledby="proj-title">
  <div class="wrap">
    <h2 class="sr-only" id="proj-title">Projects</h2>
    ${projects.length ? `<div class="proj-grid" data-stagger>${join(projects, projectCard)}</div>` : `
    <div class="empty" data-reveal>
      <div class="empty__frame" aria-hidden="true"><span></span><span></span><span></span></div>
      <div class="empty__body">
        <p class="eyebrow">Status</p>
        <p class="display h-md">No projects published yet</p>
        <p>We’re building our first demo projects now. Rather than fill this page with placeholders, we’ll add each one as it’s finished.</p>
        <p class="empty__spec-h">Each project entry will include</p>
        <ul class="empty__spec">
          <li>Screenshots</li><li>What it does</li><li>Technologies used</li><li>Live demo link</li>
        </ul>
      </div>
    </div>`}
  </div>
</section>

${ctaBlock({
  heading: ['Have something', 'you want <em>built?</em>'],
  text: 'You don’t need to wait for the portfolio to fill up. Tell us your idea and we’ll talk through how we’d approach it.',
  primary: ['Start a conversation', 'contact.html'],
  secondary: ['View services', 'services.html'],
})}
`,
};

// ── Products ─────────────────────────────────────────────────
export const productsPage = {
  slug: 'products',
  file: 'products.html',
  title: 'Products',
  description:
    'Planned Quantum Sitex products: AI-integrated web applications, SaaS products, business management software and industry-specific software.',
  body: () => `
${pageHero({
  eyebrowText: 'Products',
  heading: ['Software', 'we’re <em>building</em>'],
  intro: 'Beyond client work, we’re developing products of our own. These are the four categories we’re planning.',
  aside: `<div class="notice"><span class="tag tag--outline">Planned</span><p>None of these products are commercially available yet. We’ll update this page as each one launches.</p></div>`,
})}

<section class="section section--tight" aria-label="Product categories">
  <div class="wrap prod-list">
    ${join(products, (p, i) => `
    <article class="prod" id="${p.slug}" data-reveal>
      <div class="prod__head">
        <span class="tag tag--outline">Planned</span>
        <h2 class="display prod__name">${p.name}</h2>
      </div>
      <div class="prod__body">
        <p class="lead">${p.summary}</p>
        <p class="prod__areas-h">${i === 1 ? 'Direction' : 'Possible areas'}</p>
        <ul class="prod__areas">${join(p.areas, (a) => `<li>${a}</li>`)}</ul>
      </div>
    </article>`)}
  </div>
</section>

${ctaBlock({
  heading: ['Need one of these', '<em>today?</em>'],
  text: 'While our products are in development, we can build a custom solution in any of these areas as a service.',
  primary: ['Discuss a custom build', 'contact.html#enquiry'],
})}
`,
};

// ── Technologies ─────────────────────────────────────────────
const techItem = ([label, slug]) => `<span class="tech">${logo(slug) || `<span class="tech__mono" aria-hidden="true">${label[0]}</span>`}<span>${label}</span></span>`;

export const technologiesPage = {
  slug: 'technologies',
  file: 'technologies.html',
  title: 'Technologies',
  description:
    'The technology ecosystem Quantum Sitex draws from: frontend, backend, mobile, AI and machine learning, AI platforms, databases, cloud & DevOps, APIs and tools.',
  body: () => `
${pageHero({
  eyebrowText: 'Technologies',
  heading: ['The stack behind', 'the <em>build</em>'],
  intro: 'Languages, frameworks, AI platforms and cloud tools. We choose what fits each project, rather than forcing one stack onto every problem.',
})}

<section class="tech-band" aria-label="Technology ecosystem">
  ${marquee({ label: 'Languages and frameworks', direction: 'left', speed: 55, cls: 'marquee--tech', items: techMarquee.left.map(techItem) })}
  ${marquee({ label: 'AI platforms, data and cloud', direction: 'right', speed: 60, cls: 'marquee--tech', items: techMarquee.right.map(techItem) })}
</section>

<section class="section" aria-labelledby="eco-title">
  <div class="wrap">
    ${sectionHead({ eyebrowText: 'Ecosystem', heading: ['Nine areas.', 'One <em>toolkit.</em>'], id: 'eco-title' })}
    <dl class="eco">
      ${join(techCategories, (c) => `
      <div class="eco__row" data-reveal>
        <dt>${c.name}</dt>
        <dd><ul>${join(c.items, (t) => `<li>${t}</li>`)}</ul></dd>
      </div>`)}
    </dl>
    <p class="fine" data-reveal>Technologies listed here are part of the toolkit we choose from. They don’t indicate certifications or official partnerships. Product names and logos belong to their respective owners.</p>
  </div>
</section>

${ctaBlock({
  heading: ['Not sure which', 'stack you <em>need?</em>'],
  text: 'Tell us what you want to build. We’ll recommend technologies based on your goals, budget and timeline.',
  primary: ['Ask us', 'contact.html#enquiry'],
})}
`,
};

// ── Industries ───────────────────────────────────────────────
export const industriesPage = {
  slug: 'industries',
  file: 'industries.html',
  title: 'Industries',
  description:
    'Industries Quantum Sitex aims to serve: education, healthcare, real estate, retail & e-commerce, finance & fintech, hospitality, logistics, manufacturing, professional services and media.',
  body: () => `
${pageHero({
  eyebrowText: 'Industries',
  heading: ['Every industry', 'has its own <em>problems</em>'],
  intro: 'Software needs change from sector to sector. These are the ten industries we aim to serve, and the kinds of solutions we can build for each.',
})}

<section class="section section--tight" aria-label="Industries">
  <div class="wrap">
    <ul class="ind-list">
      ${join(industries, (ind) => `
      <li class="ind" id="${ind.slug}" data-reveal>
        <span class="ind__icon">${industryIcon(ind.slug)}</span>
        <h2 class="ind__name">${ind.name}</h2>
        <p class="ind__line">${ind.line}</p>
        <a class="ind__link" href="contact.html#enquiry" aria-label="Discuss a ${ind.name} project">Discuss a project${arrow()}</a>
      </li>`)}
    </ul>
  </div>
</section>

${ctaBlock({
  heading: ['Your industry', 'isn’t <em>listed?</em>'],
  text: 'These are where we’re focusing first, not a limit. If you have a problem software can solve, we want to hear it.',
  primary: ['Tell us about it', 'contact.html#enquiry'],
})}
`,
};

// ── Why Quantum Sitex ────────────────────────────────────────
export const whyPage = {
  slug: 'why',
  file: 'why.html',
  title: 'Why Quantum Sitex',
  description:
    'How Quantum Sitex works: client-focused, modern technology, AI-driven innovation, custom solutions, scalable development and continuous support.',
  body: () => `
${pageHero({
  eyebrowText: 'Why Quantum Sitex',
  heading: ['More than technology.', 'A better way <em>forward.</em>'],
  intro: 'Six principles that shape how we approach every project, whatever its size.',
})}

<section class="section section--tight" aria-label="Our principles">
  <div class="wrap">
    <ol class="why-list">
      ${join(why.slice(0, 3), (w) => `<li class="why" data-reveal><h2 class="why__name">${w.name}</h2><p>${w.text}</p></li>`)}
    </ol>
  </div>
</section>

<section class="section section--light interlude" aria-label="Statement">
  <div class="wrap">
    <p class="display interlude__text" data-split="lines">${lines(['Your challenges.', 'Our creative <em>thinking.</em>'])}</p>
  </div>
</section>

<section class="section section--tight" aria-label="Our principles, continued">
  <div class="wrap">
    <ol class="why-list" start="4">
      ${join(why.slice(3), (w) => `<li class="why" data-reveal><h2 class="why__name">${w.name}</h2><p>${w.text}</p></li>`)}
    </ol>
  </div>
</section>

${ctaBlock({
  heading: ['Built around', 'your <em>vision.</em>'],
  text: 'Tell us where you want to go. We’ll help you work out how to get there.',
  primary: ['Start a conversation', 'contact.html'],
})}
`,
};

// ── Future Roadmap ───────────────────────────────────────────
export const roadmapPage = {
  slug: 'roadmap',
  file: 'roadmap.html',
  title: 'Future Roadmap',
  description:
    'Where Quantum Sitex is heading: building the foundation, expanding into digital products and growing a global software ecosystem.',
  body: () => `
${pageHero({
  eyebrowText: 'Future roadmap',
  heading: ['Today we imagine.', 'Tomorrow we <em>innovate.</em>'],
  intro: 'Our direction in three stages. These are ambitions, not fixed dates — we’ll update this page as we make progress.',
})}

<section class="section section--tight" aria-label="Roadmap stages">
  <div class="wrap">
    <ol class="road" data-road>
      <span class="road__track" aria-hidden="true"><span class="road__fill" data-road-fill></span></span>
      ${join(roadmap, (r, i) => `
      <li class="road__stage${i === 0 ? ' is-current' : ''}" data-reveal>
        <span class="road__node" aria-hidden="true"></span>
        <p class="road__meta"><span>${r.stage}</span><span class="tag ${i === 0 ? '' : 'tag--outline'}">${r.status}</span></p>
        <h2 class="display road__name">${r.name}</h2>
        <p class="road__text">${r.text}</p>
      </li>`)}
    </ol>
  </div>
</section>

${ctaBlock({
  heading: ['Want to build', 'the future <em>with us?</em>'],
  text: 'Whether you have a project now or an idea for later, we’d like to hear from you.',
  primary: ['Get in touch', 'contact.html'],
  secondary: ['Message on WhatsApp', wa, 'target="_blank" rel="noopener"'],
})}
`,
};
