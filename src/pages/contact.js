import { site } from '../config.js';
import { services, products } from '../data/content.js';
import { join, esc, arrow, pageHero, eyebrow } from '../components/ui.js';

const field = ({ id, label, type = 'text', optional = false, autocomplete = '', control = '', attrs = '' }) => `
<div class="field" data-field>
  <label for="${id}">${label}${optional ? ' <span class="field__opt">(optional)</span>' : ''}</label>
  ${control || `<input id="${id}" name="${id}" type="${type}" ${autocomplete ? `autocomplete="${autocomplete}"` : ''} ${optional ? '' : 'required aria-required="true"'} ${attrs}>`}
  <p class="field__err" id="${id}-err" hidden></p>
</div>`;

const serviceSelect = `
<div class="select">
  <select id="service" name="service" required aria-required="true">
    <option value="">Choose one</option>
    <optgroup label="Services">
      ${join(services, (s) => `<option value="${s.slug}">${s.name}</option>`)}
    </optgroup>
    <optgroup label="Custom build in a planned product area">
      ${join(products, (p) => `<option value="product-${p.slug}">${p.name}</option>`)}
    </optgroup>
    <optgroup label="Other">
      <option value="not-sure">Not sure yet — help me decide</option>
      <option value="other">Something else</option>
    </optgroup>
  </select>
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6 9l6 6 6-6"/></svg>
</div>`;

const hasEndpoint = Boolean(site.formEndpoint);

export default {
  slug: 'contact',
  file: 'contact.html',
  title: 'Contact',
  description: `Contact Quantum Sitex about a website, web application, AI integration or software project. Email ${site.email} or message us on WhatsApp.`,
  body: () => `
${pageHero({
  eyebrowText: 'Contact',
  heading: ['Have an idea?', 'Let’s make it <em>happen.</em>'],
  intro: 'Tell us what you’re imagining. We’ll help you explore the right digital solution.',
})}

<section class="section section--tight contact" id="enquiry" aria-labelledby="form-title">
  <div class="wrap contact__grid">
    <aside class="contact__direct" aria-label="Direct contact" data-reveal>
      ${eyebrow('Talk to us directly')}
      <a class="direct" href="mailto:${site.email}">
        <span class="direct__k">Email</span>
        <span class="direct__v">${site.email}</span>
        ${arrow()}
      </a>
      <a class="direct" href="https://wa.me/${site.whatsapp.number}" target="_blank" rel="noopener">
        <span class="direct__k">WhatsApp</span>
        <span class="direct__v">${site.whatsapp.display}</span>
        ${arrow()}
      </a>
      <p class="display contact__line">Every great project starts with a <em>conversation.</em></p>
    </aside>

    <div class="contact__form" data-reveal>
      <h2 class="display h-md" id="form-title">Send an enquiry</h2>
      <p class="form__intro">All fields are required unless marked optional.</p>
      <form class="form" novalidate data-form
        data-endpoint="${esc(site.formEndpoint)}"
        data-email="${esc(site.email)}"
        data-wa="${esc(site.whatsapp.number)}">
        <div class="form__errors" role="alert" tabindex="-1" hidden data-errors></div>
        <div class="form__row">
          ${field({ id: 'name', label: 'Full name', autocomplete: 'name' })}
          ${field({ id: 'email', label: 'Email address', type: 'email', autocomplete: 'email', attrs: 'inputmode="email"' })}
        </div>
        <div class="form__row">
          ${field({ id: 'company', label: 'Company name', optional: true, autocomplete: 'organization' })}
          ${field({ id: 'service', label: 'Service / solution required', control: serviceSelect })}
        </div>
        ${field({
          id: 'message',
          label: 'Project description',
          control: `<textarea id="message" name="message" rows="6" required aria-required="true" aria-describedby="message-hint" maxlength="5000"></textarea><p class="field__hint" id="message-hint">What you want to build, who it’s for and any timeline or budget you have in mind.</p>`,
        })}
        <div class="hp" aria-hidden="true"><label for="website">Leave this empty</label><input id="website" name="website" type="text" tabindex="-1" autocomplete="off"></div>
        <p class="form__privacy">We use these details only to reply to your enquiry. We don’t add you to mailing lists or share your details with anyone else. See our <a href="privacy.html">Privacy Policy</a>.</p>
        <div class="form__actions">
          <button class="btn btn--solid" type="submit" data-submit>
            <span class="btn__label" data-label="${hasEndpoint ? 'Send enquiry' : 'Send via email'}"><span>${hasEndpoint ? 'Send enquiry' : 'Send via email'}</span></span>${arrow()}
          </button>
          <button class="btn btn--ghost" type="button" data-wa-submit>
            <span class="btn__label" data-label="Send via WhatsApp"><span>Send via WhatsApp</span></span>${arrow()}
          </button>
        </div>
        <p class="form__how">${
          hasEndpoint
            ? '“Send enquiry” delivers your message to us directly. “Send via WhatsApp” opens WhatsApp with your message filled in.'
            : '“Send via email” opens your email app with your enquiry filled in, ready to send. “Send via WhatsApp” does the same in WhatsApp.'
        }</p>
        <div class="form__status" role="status" aria-live="polite" data-status></div>
      </form>
    </div>
  </div>
</section>
`,
};
