# Quantum Sitex — company website

Static website for Quantum Sitex (spec v1.0, 17 Nov 2026). Pages are rendered from small JavaScript components and content files into plain HTML in `dist/`. The site has no runtime dependencies and no framework, and it can be hosted anywhere.

## Commands

| Command | What it does |
| --- | --- |
| `npm install` | Installs the one dev dependency (`simple-icons`, used for technology logos at build time) |
| `npm run dev` | Builds, serves `dist/` at http://localhost:4173 and rebuilds when `src/` changes |
| `npm run build` | Builds the site into `dist/` |
| `npm run check` | Checks the built site: links, anchors, exactly 10 main sections, titles, descriptions, one `h1` per page, no purple/violet colours |

## Where things live

```
src/
  config.js            name, email, WhatsApp, site URL, form endpoint, socials, FONTS
  data/content.js      all copy lists: nav, services, products, technologies, industries,
                       why-points, roadmap, projects, process marquee
  components/
    layout.js          <head>/SEO, loader, page transition, header, menu, footer
    ui.js              reusable pieces: buttons, page hero, marquee, CTA band, icons
  pages/               one module per page (home, sections, contact, support = legal/404)
  assets/css/main.css  design tokens at the top, then components and pages
  assets/js/main.js    loader, transitions, menu, reveals, marquee pause, form
scripts/check.mjs      guardrail checker
```

## Common edits

- **Change the fonts:** edit `fonts` in `src/config.js`. Both the Google Fonts link and the CSS variables `--font-display` and `--font-body` are generated from it.
- **Edit services, industries and other copy:** edit `src/data/content.js`.
- **Add a real project:** add an entry to `projects` in `src/data/content.js` and put the image in `src/assets/projects/`. The Projects page switches from its empty state to a grid automatically. Only add projects that are actually built.
- **Launch a product:** the Products, Home and About pages label all four categories **Planned**. When something ships, update its label and copy. Don't do it before.
- **Social links:** add `{ label, href }` items to `site.socials`. They appear in the footer.

## Contact form

The form has no backend by default, so it never shows a fake "sent" message.

- **Default (no endpoint):** after validation, "Send via email" opens the visitor's email app with the enquiry filled in. "Send via WhatsApp" opens WhatsApp the same way. The status message tells the visitor to press send there.
- **With an endpoint:** set `site.formEndpoint` in `src/config.js` to any service that accepts a JSON POST and returns 2xx (Formspree, Web3Forms, your own API). The form then posts directly, shows a loading state, and shows success only when the server confirms. If you do this, update the Privacy Policy wording in `src/pages/support.js`, which switches automatically, and review it.

## Before going live

1. Set `site.url` in `src/config.js`. This enables canonical tags and `sitemap.xml`.
2. Run `npm run build && npm run check`.
3. Upload `dist/` to any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages, cPanel). `404.html` is picked up automatically by most hosts.
4. Have someone qualified review the Privacy Policy and Terms. They are honest, plain-language starting points, not legal advice.

## Design guardrails (from the spec)

- Only three colours: `#090909`, `#F5F5F5`, `#FF3933`. No purple or violet anywhere. `npm run check` enforces this.
- Exactly 10 main sections. Privacy, Terms and 404 are supporting pages and don't appear in the main menu.
- No invented clients, testimonials, statistics, certifications or experience claims.
- Small red text is fine on black (5.6:1 contrast). On off-white, use red only for large display text.
- All motion respects `prefers-reduced-motion`: no loader, no transitions, and the marquees become static wrapped lists. Each marquee also has a pause button.
