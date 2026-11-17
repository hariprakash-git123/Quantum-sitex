// ─────────────────────────────────────────────────────────────
//  Quantum Sitex — site configuration
//  Everything that is likely to change lives here.
// ─────────────────────────────────────────────────────────────

export const site = {
  name: 'Quantum Sitex',
  tagline: 'Ideas Into Impact.',
  description:
    'Quantum Sitex is a hybrid technology company building websites, web applications, AI integrations and automation for clients worldwide — while developing its own software products.',

  // Public URL of the deployed site, without a trailing slash.
  // e.g. 'https://www.example.com'. When empty, canonical tags and
  // sitemap.xml are skipped (they require absolute URLs).
  url: 'https://hariprakash-git123.github.io/Quantum-sitex',

  email: 'hpwebapplication@gmail.com',
  whatsapp: {
    display: '+91 95978 98990',
    number: '919597898990', // digits only, used for wa.me links
  },

  // Optional form-processing endpoint (e.g. Formspree, Web3Forms, your own API).
  // It must accept a JSON POST and return a 2xx status on success.
  // When empty, the contact form composes the enquiry in the visitor's
  // own email app (mailto) or WhatsApp — no fake "sent" messages.
  formEndpoint: '',

  // Add social profiles when they exist: { label: 'LinkedIn', href: 'https://…' }
  socials: [],

  legalUpdated: '17 November 2026',
};

// ─────────────────────────────────────────────────────────────
//  Typography — change the font pairing here only.
//  `google` is the Google Fonts family query; set to null to self-host.
// ─────────────────────────────────────────────────────────────
export const fonts = {
  display: {
    family: "'Bebas Neue'",
    fallback: "'Arial Narrow', 'Roboto Condensed', Impact, sans-serif",
    google: 'Bebas+Neue',
  },
  body: {
    family: "'Inter'",
    fallback: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
    google: 'Inter:wght@400;500;600',
  },
};
