// Supporting pages — not main sections.
import { site } from '../config.js';
import { pageHero, button } from '../components/ui.js';

const legal = (sections) => `
<section class="section section--tight" aria-label="Details">
  <div class="wrap legal">
    <p class="legal__date">Last updated: ${site.legalUpdated}</p>
    ${sections.map(([h, body]) => `<h2>${h}</h2>${body}`).join('')}
  </div>
</section>`;

export const privacy = {
  slug: 'privacy',
  file: 'privacy.html',
  title: 'Privacy Policy',
  description: 'How Quantum Sitex handles the information you share through this website.',
  body: () => `
${pageHero({ eyebrowText: 'Legal', heading: ['Privacy <em>policy</em>'], intro: 'What we collect through this website, why, and what we do with it.' })}
${legal([
  ['Who we are', `<p>This website is operated by ${site.name}. You can contact us about privacy at <a href="mailto:${site.email}">${site.email}</a>.</p>`],
  ['What we collect', `<p>We only collect what you choose to send us. When you contact us by email, WhatsApp or the enquiry form, we receive the details you include: typically your name, email address, company name, the service you’re interested in and a description of your project.</p>
   <p>The enquiry form does not store anything on this website. ${site.formEndpoint
     ? 'Your enquiry is sent to us through a form-processing provider, which handles it on our behalf.'
     : 'It prepares a message in your own email app or WhatsApp, and nothing is sent until you choose to send it there.'}</p>`],
  ['How we use it', `<p>We use your details only to reply to your enquiry and, if we work together, to communicate about your project. We don’t sell your information, add you to marketing lists or share it with third parties for their own purposes.</p>`],
  ['Cookies and storage', `<p>This website does not use analytics, advertising or tracking cookies. It stores a small flag in your browser’s session storage so the intro animation only plays once per visit. This flag is deleted when you close the tab.</p>`],
  ['Third-party services', `<p>Fonts are loaded from Google Fonts, which receives your IP address when your browser requests them. Messages sent through email or WhatsApp are also handled by those providers under their own privacy policies.</p>`],
  ['Keeping and deleting your information', `<p>We keep enquiry correspondence only as long as we need it to respond and to manage any work that follows. You can ask us at any time to see, correct or delete the information we hold about you by emailing <a href="mailto:${site.email}">${site.email}</a>.</p>`],
  ['Changes', `<p>If this policy changes, we’ll update this page and the date above.</p>`],
])}`,
};

export const terms = {
  slug: 'terms',
  file: 'terms.html',
  title: 'Terms of Use',
  description: 'Terms for using the Quantum Sitex website.',
  body: () => `
${pageHero({ eyebrowText: 'Legal', heading: ['Terms of <em>use</em>'], intro: 'The ground rules for using this website.' })}
${legal([
  ['Using this website', `<p>This website provides information about ${site.name}, our services and our planned products. By using it, you agree to these terms.</p>`],
  ['Information on this site', `<p>We aim to keep the content accurate and current, but it is provided for general information only. Descriptions of services do not form a contract. Any project work is agreed separately, in writing.</p>`],
  ['Planned products', `<p>Products and roadmap items described on this website are plans and intentions. They are not commercially available unless clearly stated, and features, timing and availability may change.</p>`],
  ['Intellectual property', `<p>The design, text and graphics of this website belong to ${site.name} unless stated otherwise. Third-party product names and logos shown on the Technologies page belong to their respective owners and are used only to identify those technologies.</p>`],
  ['External links', `<p>Links to other websites, including WhatsApp, are provided for convenience. We aren’t responsible for the content or practices of those sites.</p>`],
  ['Liability', `<p>To the extent permitted by law, ${site.name} is not liable for any loss arising from use of this website or reliance on its content.</p>`],
  ['Contact', `<p>Questions about these terms? Email <a href="mailto:${site.email}">${site.email}</a>.</p>`],
])}`,
};

export const notFound = {
  slug: '404',
  file: '404.html',
  title: 'Page not found',
  description: 'The page you were looking for does not exist.',
  noindex: true,
  body: () => `
<section class="nf">
  <div class="wrap nf__grid">
    <p class="display nf__code" aria-hidden="true">4<span>0</span>4</p>
    <div class="nf__body">
      <h1 class="display h-md">This page doesn’t exist</h1>
      <p class="lead">The link may be broken, or the page may have moved.</p>
      <div class="btn-row">
        ${button('Go to home', 'index.html')}
        ${button('Contact us', 'contact.html', 'ghost')}
      </div>
    </div>
  </div>
</section>`,
};
