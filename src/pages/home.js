import { site } from '../config.js';
import { services, products, industries, why, process } from '../data/content.js';
import { join, lines, eyebrow, button, textLink, marquee, ctaBlock, sectionHead, arrow } from '../components/ui.js';

export const processMarquee = (label = 'How an idea becomes a product') =>
  marquee({
    label,
    cls: 'marquee--process',
    speed: 38,
    items: process.map((p) => `<span class="mq-word">${p}</span><span class="mq-arrow" aria-hidden="true">→</span>`),
  });

const orbit = `
<svg class="orbit" viewBox="0 0 400 400" aria-hidden="true" focusable="false">
  <circle cx="200" cy="200" r="190"/>
  <circle cx="200" cy="200" r="132"/>
  <circle cx="200" cy="200" r="70"/>
  <path d="M200 0v400M0 200h400"/>
  <g class="orbit__spin"><circle class="orbit__dot" cx="200" cy="68" r="9"/></g>
  <g class="orbit__spin orbit__spin--slow"><circle class="orbit__dot orbit__dot--sm" cx="390" cy="200" r="5"/></g>
</svg>`;

export default {
  slug: 'index',
  file: 'index.html',
  title: 'Home',
  description: site.description,
  body: () => `
<section class="hero" id="top">
  <div class="wrap hero__grid">
    <p class="eyebrow hero__eyebrow" data-reveal>Quantum Sitex — hybrid technology company</p>
    <h1 class="display hero__title" data-split="lines">${lines(['Transforming', '<em>Ideas</em> Into', 'Digital', 'Experiences.'])}</h1>
    <div class="hero__orbit">${orbit}</div>
    <div class="hero__foot">
      <div class="rule rule--draw rule--red" data-reveal></div>
      <p class="display hero__tag" data-reveal>Ideas Into Impact.</p>
      <p class="hero__intro" data-reveal>We design and build websites, web applications and AI-powered software for startups, small businesses, enterprises and individuals, anywhere in the world. We’re also building software products of our own.</p>
      <div class="btn-row hero__ctas" data-reveal>
        ${button('Start a project', 'contact.html')}
        ${button('Explore services', 'services.html', 'ghost')}
      </div>
    </div>
  </div>
</section>

<section class="section section--light intro" aria-labelledby="intro-title">
  <div class="wrap intro__grid">
    ${eyebrow('About Quantum Sitex')}
    <h2 class="sr-only" id="intro-title">Who we are</h2>
    <p class="statement" data-split="words">We’re a hybrid technology company. We build software for clients and develop software products of our own. Both start the same way: <em>with an idea worth taking seriously.</em></p>
    <div class="intro__links" data-reveal>
      ${textLink('More about us', 'about.html')}
      ${textLink('See our roadmap', 'roadmap.html')}
    </div>
  </div>
</section>

${processMarquee()}

<section class="section" aria-labelledby="svc-title">
  <div class="wrap">
    ${sectionHead({
      eyebrowText: 'Services',
      heading: ['Ten ways to turn', 'an idea into <em>software</em>'],
      id: 'svc-title',
      aside: `<p>From a first website to AI built into your daily operations. Each service can be scoped to what you actually need.</p>${textLink('All services', 'services.html')}`,
    })}
    <ul class="hsvc" data-stagger>
      ${join(services, (s) => `
      <li class="hsvc__item" data-reveal>
        <a href="services.html#${s.slug}">
          <span class="hsvc__name">${s.name}</span>
          <span class="hsvc__group">${s.group}</span>
          ${arrow()}
        </a>
      </li>`)}
    </ul>
  </div>
</section>

<section class="section section--line" aria-labelledby="prod-title">
  <div class="wrap">
    ${sectionHead({
      eyebrowText: 'Products',
      heading: ['Software we’re', '<em>building</em> next'],
      id: 'prod-title',
      aside: `<p>Alongside client work, we’re planning four categories of our own products. <strong>None are available yet.</strong> This is where we’re heading.</p>${textLink('Product plans', 'products.html')}`,
    })}
    <div class="hprod" data-stagger>
      ${join(products, (p) => `
      <a class="hprod__item" href="products.html#${p.slug}" data-reveal>
        <span class="tag tag--outline">Planned</span>
        <h3 class="hprod__name">${p.name}</h3>
        <p>${p.summary}</p>
      </a>`)}
    </div>
  </div>
</section>

<section class="section section--light" aria-labelledby="ind-title">
  <div class="wrap">
    ${sectionHead({
      eyebrowText: 'Industries',
      heading: ['Built for the way', 'your <em>industry</em> works'],
      id: 'ind-title',
    })}
    <ul class="hind" data-stagger>
      ${join(industries, (ind) => `<li data-reveal><a href="industries.html#${ind.slug}">${ind.name}</a></li>`)}
    </ul>
    <div class="hind__more" data-reveal>${textLink('Explore industries', 'industries.html')}</div>
  </div>
</section>

<section class="section" aria-labelledby="why-title">
  <div class="wrap">
    ${sectionHead({
      eyebrowText: 'Why Quantum Sitex',
      heading: ['More than technology.', 'A better way <em>forward.</em>'],
      id: 'why-title',
    })}
    <ul class="hwhy" data-stagger>
      ${join(why, (w) => `<li data-reveal><h3>${w.name}</h3><p>${w.text}</p></li>`)}
    </ul>
    <div class="hwhy__more" data-reveal>${textLink('How we work', 'why.html')}</div>
  </div>
</section>

${ctaBlock({
  heading: ['Have an idea?', 'Let’s make it <em>happen.</em>'],
  text: 'Tell us what you’re imagining. We’ll help you explore the right digital solution.',
  primary: ['Start a conversation', 'contact.html'],
  secondary: ['Message on WhatsApp', `https://wa.me/${site.whatsapp.number}`, 'target="_blank" rel="noopener"'],
})}
`,
};
