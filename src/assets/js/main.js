/* Quantum Sitex — site behaviour. No dependencies. */
(() => {
  'use strict';

  const d = document;
  const html = d.documentElement;
  const $ = (s, c = d) => c.querySelector(s);
  const $$ = (s, c = d) => [...c.querySelectorAll(s)];
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const rm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const store = {
    get: (k) => { try { return sessionStorage.getItem(k); } catch (e) { return null; } },
    set: (k, v) => { try { sessionStorage.setItem(k, v); } catch (e) { /* storage blocked */ } },
  };
  const escapeHtml = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* ── Text splitting ─────────────────────────────────────── */
  const splitWords = (el) => {
    let i = 0;
    const walk = (node) => {
      [...node.childNodes].forEach((ch) => {
        if (ch.nodeType === 3) {
          const frag = d.createDocumentFragment();
          ch.textContent.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(d.createTextNode(part)); return; }
            const s = d.createElement('span');
            s.className = 'w';
            s.style.setProperty('--i', i++);
            s.textContent = part;
            frag.appendChild(s);
          });
          node.replaceChild(frag, ch);
        } else if (ch.nodeType === 1) {
          walk(ch);
        }
      });
    };
    walk(el);
  };
  $$('[data-split="words"]').forEach(splitWords);

  $$('[data-stagger]').forEach((group) => {
    $$('[data-reveal]', group).forEach((el, i) => el.style.setProperty('--i', i % 8));
  });

  /* ── Scroll reveals ─────────────────────────────────────── */
  const startReveals = () => {
    // Everything in the opening hero animates in immediately, regardless of position.
    const hero = $('.hero, .phero');
    if (hero) {
      hero.classList.add('is-ready');
      $$('[data-reveal], [data-split]', hero).forEach((el) => el.classList.add('is-in'));
    }
    const targets = $$('[data-reveal], [data-split], .ftr__brand').filter((el) => !el.classList.contains('is-in'));
    if (rm || !('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-in'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0 });
    targets.forEach((el) => io.observe(el));
  };

  /* ── Intro loader (first visit per session) ─────────────── */
  const runLoader = () => {
    const loader = $('.loader');
    if (!loader || !html.classList.contains('is-loading')) return Promise.resolve(false);
    const bar = $('[data-loader-bar]', loader);
    let p = 0;
    const setP = (v) => { p = Math.max(p, v); bar.style.setProperty('--p', p); };
    requestAnimationFrame(() => setP(0.18));

    const fontsReady = d.fonts ? d.fonts.ready.then(() => setP(0.6)) : Promise.resolve();
    const pageLoaded = (d.readyState === 'complete'
      ? Promise.resolve()
      : new Promise((r) => addEventListener('load', r, { once: true }))).then(() => setP(0.9));

    return Promise.race([Promise.all([fontsReady, pageLoaded, wait(1300)]), wait(3500)])
      .then(() => { setP(1); return wait(420); })
      .then(() => {
        store.set('qs-intro', '1');
        loader.classList.add('is-done');
        setTimeout(() => html.classList.remove('is-loading'), 950);
        return wait(380);
      })
      .then(() => true);
  };

  /* ── Page transitions ───────────────────────────────────── */
  if (html.classList.contains('is-arriving')) setTimeout(() => html.classList.remove('is-arriving'), 900);

  d.addEventListener('click', (e) => {
    const a = e.target.closest('a[href]');
    if (!a || rm || e.defaultPrevented) return;
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if ((a.target && a.target !== '_self') || a.hasAttribute('download')) return;
    const url = new URL(a.href, location.href);
    if (url.protocol !== location.protocol || url.origin !== location.origin) return;
    if (url.pathname === location.pathname && url.hash) return; // in-page anchor
    e.preventDefault();
    store.set('qs-nav', '1');
    html.classList.add('is-leaving');
    setTimeout(() => { location.href = url.href; }, 520);
  });

  addEventListener('pageshow', (e) => {
    if (e.persisted) html.classList.remove('is-leaving', 'is-arriving');
  });

  /* ── Header: solid on scroll, hide on scroll down ───────── */
  const hdr = $('[data-hdr]');
  let lastY = scrollY;
  let ticking = false;
  const onScroll = () => {
    const y = scrollY;
    if (hdr && !html.classList.contains('menu-open')) {
      hdr.classList.toggle('is-scrolled', y > 24);
      hdr.classList.toggle('is-hidden', y > 240 && y > lastY + 2);
      if (y < lastY - 2) hdr.classList.remove('is-hidden');
    }
    lastY = y;
    updateRoad();
    ticking = false;
  };
  addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });

  /* ── Menu ───────────────────────────────────────────────── */
  const menuBtn = $('[data-menu-btn]');
  const menu = $('[data-menu]');
  if (menuBtn && menu) {
    const label = $('.menu-btn__label', menuBtn);
    const outside = [$('main'), $('.ftr'), $('.skip')].filter(Boolean);
    let closeTimer;

    const openMenu = () => {
      clearTimeout(closeTimer);
      menu.hidden = false;
      requestAnimationFrame(() => requestAnimationFrame(() => menu.classList.add('is-open')));
      html.classList.add('menu-open');
      hdr && hdr.classList.remove('is-hidden');
      menuBtn.setAttribute('aria-expanded', 'true');
      label.textContent = label.dataset.close;
      outside.forEach((el) => { el.inert = true; });
      setTimeout(() => { const first = $('a', menu); first && first.focus(); }, 250);
    };
    const closeMenu = (returnFocus = true) => {
      menu.classList.remove('is-open');
      html.classList.remove('menu-open');
      menuBtn.setAttribute('aria-expanded', 'false');
      label.textContent = label.dataset.open;
      outside.forEach((el) => { el.inert = false; });
      closeTimer = setTimeout(() => { menu.hidden = true; }, 720);
      if (returnFocus) menuBtn.focus();
    };

    menuBtn.addEventListener('click', () => (menu.classList.contains('is-open') ? closeMenu() : openMenu()));
    d.addEventListener('keydown', (e) => {
      if (!menu.classList.contains('is-open')) return;
      if (e.key === 'Escape') { closeMenu(); return; }
      if (e.key === 'Tab') {
        const items = [...$$('a, button', hdr), ...$$('a', menu)].filter((el) => el.offsetParent !== null);
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && d.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && d.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    // Same-page links inside the menu should still close it.
    menu.addEventListener('click', (e) => {
      const a = e.target.closest('a');
      if (a && a.getAttribute('aria-current') === 'page') { e.preventDefault(); closeMenu(); }
    });
  }

  /* ── Marquee pause buttons ──────────────────────────────── */
  $$('[data-marquee-toggle]').forEach((btn) => {
    const mq = btn.closest('.marquee');
    const sr = $('.sr-only', btn);
    const name = mq.getAttribute('aria-label');
    btn.addEventListener('click', () => {
      const paused = mq.classList.toggle('is-paused');
      btn.setAttribute('aria-pressed', String(paused));
      sr.textContent = `${paused ? 'Resume' : 'Pause'} scrolling: ${name}`;
    });
  });

  /* ── Oversized footer wordmark: fit to width ────────────── */
  const brand = $('[data-fit]');
  const fitBrand = () => {
    if (!brand) return;
    const probe = $('.wrap');
    const gutter = probe ? parseFloat(getComputedStyle(probe).paddingLeft) : 16;
    brand.style.setProperty('--fit', '100px');
    const words = [...brand.children];
    const gap = parseFloat(getComputedStyle(brand).columnGap) || 0;
    const total = words.reduce((s, w) => s + w.getBoundingClientRect().width, 0) + gap * (words.length - 1);
    const target = brand.clientWidth - gutter * 2;
    if (total > 0) brand.style.setProperty('--fit', `${Math.floor((100 * target) / total * 100) / 100}px`);
  };
  let resizeTimer;
  addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(fitBrand, 120); });
  fitBrand();
  if (d.fonts) d.fonts.ready.then(fitBrand);

  /* ── Roadmap progress line ──────────────────────────────── */
  const road = $('[data-road]');
  const roadFill = $('[data-road-fill]');
  function updateRoad() {
    if (!road || !roadFill) return;
    if (rm) { roadFill.style.setProperty('--p', 1); return; }
    const r = road.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (innerHeight * 0.65 - r.top) / r.height));
    roadFill.style.setProperty('--p', p.toFixed(3));
  }
  updateRoad();

  /* ── Image loading states ───────────────────────────────── */
  $$('img[data-img]').forEach((img) => {
    const done = () => img.parentElement.classList.add('is-loaded');
    if (img.complete && img.naturalWidth) done();
    else { img.addEventListener('load', done, { once: true }); img.addEventListener('error', done, { once: true }); }
  });

  /* ── Project detail dialogs ─────────────────────────────── */
  $$('[data-dialog-open]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const dlg = d.getElementById(trigger.dataset.dialogOpen);
      if (!dlg || typeof dlg.showModal !== 'function' || dlg.open) return;
      // Return focus to the card's button, even when the screenshot was clicked.
      const card = trigger.closest('.proj');
      dlg._returnTo = (card && $('button[data-dialog-open]', card)) || trigger;
      dlg.showModal();
      html.classList.add('dialog-open');
    });
  });
  $$('dialog.pdlg').forEach((dlg) => {
    $$('[data-dialog-close]', dlg).forEach((b) => b.addEventListener('click', () => dlg.close()));
    dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); }); // backdrop
    dlg.addEventListener('close', () => {
      html.classList.remove('dialog-open');
      if (dlg._returnTo) dlg._returnTo.focus();
    });
  });

  /* ── Contact form ───────────────────────────────────────── */
  const form = $('[data-form]');
  if (form) initForm(form);

  function initForm(form) {
    const el = (n) => form.elements.namedItem(n);
    const endpoint = form.dataset.endpoint;
    const email = form.dataset.email;
    const waNumber = form.dataset.wa;
    const status = $('[data-status]', form);
    const errorsBox = $('[data-errors]', form);
    const submitBtn = $('[data-submit]', form);
    const waBtn = $('[data-wa-submit]', form);
    let attempted = false;

    // Pre-select a service from ?service=slug
    const pre = new URLSearchParams(location.search).get('service');
    if (pre && [...el('service').options].some((o) => o.value === pre)) el('service').value = pre;

    const rules = {
      name: (v) => (!v ? 'Enter your full name.' : v.length < 2 ? 'Enter your full name.' : ''),
      email: (v) => (!v ? 'Enter your email address.'
        : !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? 'Enter a valid email address, like name@example.com.' : ''),
      service: (v) => (!v ? 'Choose the service or solution you need.' : ''),
      message: (v) => (!v ? 'Describe your project.'
        : v.length < 20 ? 'Add a little more detail — at least 20 characters.' : ''),
    };
    const labels = { name: 'Full name', email: 'Email address', service: 'Service / solution required', message: 'Project description' };

    const setError = (name, msg) => {
      const input = el(name);
      const err = d.getElementById(`${name}-err`);
      const described = (input.getAttribute('aria-describedby') || '').split(' ').filter((x) => x && x !== err.id);
      if (msg) {
        err.textContent = msg;
        err.hidden = false;
        input.setAttribute('aria-invalid', 'true');
        described.push(err.id);
      } else {
        err.textContent = '';
        err.hidden = true;
        input.removeAttribute('aria-invalid');
      }
      if (described.length) input.setAttribute('aria-describedby', described.join(' '));
      else input.removeAttribute('aria-describedby');
    };

    const validate = () => {
      const failed = [];
      Object.keys(rules).forEach((name) => {
        const msg = rules[name](el(name).value.trim());
        setError(name, msg);
        if (msg) failed.push([name, msg]);
      });
      return failed;
    };

    Object.keys(rules).forEach((name) => {
      const handler = () => {
        if (!attempted) return;
        setError(name, rules[name](el(name).value.trim()));
        if (!Object.keys(rules).some((n) => el(n).getAttribute('aria-invalid'))) errorsBox.hidden = true;
      };
      el(name).addEventListener('input', handler);
      el(name).addEventListener('change', handler);
      el(name).addEventListener('blur', handler);
    });

    const showSummary = (failed) => {
      errorsBox.innerHTML = `<p><strong>Please fix ${failed.length === 1 ? '1 field' : `${failed.length} fields`} before sending:</strong></p><ul>${
        failed.map(([n, m]) => `<li><a href="#${n}" data-focus="${n}">${labels[n]}: ${escapeHtml(m)}</a></li>`).join('')}</ul>`;
      errorsBox.hidden = false;
      errorsBox.focus();
    };
    errorsBox.addEventListener('click', (e) => {
      const a = e.target.closest('[data-focus]');
      if (a) { e.preventDefault(); el(a.dataset.focus).focus(); }
    });

    const serviceLabel = () => {
      const opt = el('service').selectedOptions[0];
      return opt ? opt.textContent.trim() : '';
    };
    const compose = () => {
      const company = el('company').value.trim();
      return [
        'New enquiry from the Quantum Sitex website',
        '',
        `Name: ${el('name').value.trim()}`,
        `Email: ${el('email').value.trim()}`,
        `Company: ${company || '—'}`,
        `Service / solution: ${serviceLabel()}`,
        '',
        'Project description:',
        el('message').value.trim(),
      ].join('\n');
    };

    const setStatus = (type, htmlStr) => {
      status.className = `form__status is-${type}`;
      status.innerHTML = htmlStr;
    };

    const guard = () => {
      attempted = true;
      status.innerHTML = '';
      status.className = 'form__status';
      if (el('website').value) return false; // honeypot — likely a bot
      const failed = validate();
      if (failed.length) { showSummary(failed); return false; }
      errorsBox.hidden = true;
      return true;
    };

    const openWhatsApp = () => {
      const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(compose())}`;
      const w = window.open(url, '_blank');
      if (w) w.opener = null; else location.href = url;
      setStatus('info', `<p><strong>WhatsApp should now be open with your message filled in.</strong> Press send in WhatsApp to reach us — it hasn’t been sent yet.</p>`);
    };

    const copyEnquiry = (btn) => {
      const text = compose();
      const done = () => { btn.querySelector('span span').textContent = 'Copied'; };
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(done, () => fallbackCopy(text, done));
      else fallbackCopy(text, done);
    };
    const fallbackCopy = (text, done) => {
      const ta = d.createElement('textarea');
      ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
      d.body.appendChild(ta); ta.select();
      try { d.execCommand('copy'); done(); } catch (e) { /* ignore */ }
      ta.remove();
    };

    const sendViaEmail = () => {
      const subject = `Project enquiry: ${serviceLabel()} — ${el('name').value.trim()}`;
      location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(compose())}`;
      setStatus('info', `
        <p><strong>Your email app should now be open with your enquiry filled in.</strong> Press send there to reach us — it hasn’t been sent yet.</p>
        <p>Nothing opened? Copy your enquiry and email it to <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>, or send it on WhatsApp.</p>
        <div class="btn-row">
          <button class="btn btn--ghost" type="button" data-copy><span class="btn__label" data-label="Copy enquiry"><span>Copy enquiry</span></span></button>
          <button class="btn btn--ghost" type="button" data-status-wa><span class="btn__label" data-label="Send via WhatsApp"><span>Send via WhatsApp</span></span></button>
        </div>`);
      $('[data-copy]', status).addEventListener('click', (e) => copyEnquiry(e.currentTarget));
      $('[data-status-wa]', status).addEventListener('click', openWhatsApp);
    };

    const sendViaEndpoint = async () => {
      const label = $('.btn__label > span', submitBtn);
      const original = label.textContent;
      submitBtn.classList.add('is-loading');
      submitBtn.setAttribute('aria-busy', 'true');
      label.textContent = 'Sending…';
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 15000);
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            name: el('name').value.trim(),
            email: el('email').value.trim(),
            company: el('company').value.trim(),
            service: serviceLabel(),
            message: el('message').value.trim(),
            _subject: `Project enquiry: ${serviceLabel()}`,
          }),
          signal: ctrl.signal,
        });
        if (!res.ok) throw new Error(String(res.status));
        const who = escapeHtml(el('name').value.trim().split(/\s+/)[0]);
        const addr = escapeHtml(el('email').value.trim());
        form.reset();
        attempted = false;
        setStatus('success', `<p><strong>Enquiry sent. Thanks, ${who}.</strong> We’ll reply to ${addr}.</p>`);
      } catch (err) {
        setStatus('error', `<p><strong>Your enquiry couldn’t be sent.</strong> Check your connection and try again, or email us directly at <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>.</p>`);
      } finally {
        clearTimeout(timer);
        submitBtn.classList.remove('is-loading');
        submitBtn.removeAttribute('aria-busy');
        label.textContent = original;
      }
    };

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!guard()) return;
      if (endpoint) sendViaEndpoint(); else sendViaEmail();
    });
    waBtn.addEventListener('click', () => { if (guard()) openWhatsApp(); });
  }

  /* ── Boot sequence ──────────────────────────────────────── */
  runLoader().then((hadLoader) => {
    if (hadLoader) { startReveals(); return; }
    store.set('qs-intro', '1');
    if (html.classList.contains('is-arriving')) setTimeout(startReveals, 320);
    else startReveals();
  });
  onScroll();
})();
