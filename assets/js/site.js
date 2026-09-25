(() => {
  'use strict';
  const menuButton = document.querySelector('#mobile-menu-button');
  const menu = document.querySelector('#mobile-menu');
  function closeMenu(restoreFocus = false) {
    if (!menu || !menuButton) return;
    menu.hidden = true;
    menuButton.setAttribute('aria-expanded', 'false');
    if (restoreFocus) menuButton.focus();
  }
  menuButton?.addEventListener('click', () => {
    menu.hidden = !menu.hidden;
    menuButton.setAttribute('aria-expanded', String(!menu.hidden));
  });
  menu?.addEventListener('click', e => { if (e.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && menu && !menu.hidden) closeMenu(true);
  });
  matchMedia('(min-width: 1024px)').addEventListener('change', e => {
    if (e.matches) {
      const focusWasInMenu = menu?.contains(document.activeElement) || document.activeElement === menuButton;
      closeMenu();
      if (focusWasInMenu) document.querySelector('.desktop-nav a')?.focus();
    }
  });

  const dialog = document.querySelector('#search-dialog');
  let searchOpener;
  function openSearch(opener) {
    if (!dialog) return;
    searchOpener = opener || document.activeElement;
    if (!dialog.open) dialog.showModal();
    dialog.querySelector('input').focus();
  }
  document.querySelectorAll('[data-search-open]').forEach(link => link.addEventListener('click', e => {
    if (!dialog || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault(); openSearch(link);
  }));
  dialog?.querySelector('[data-search-close]').addEventListener('click', () => dialog.close());
  dialog?.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      e.preventDefault();
      dialog.close();
    }
  });
  dialog?.addEventListener('close', () => {
    if (searchOpener?.getClientRects().length) searchOpener.focus();
    else menuButton?.focus();
  });
  dialog?.addEventListener('click', e => { if (e.target === dialog) { const r = dialog.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close(); } });
  document.addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k' && dialog) {
      e.preventDefault(); openSearch(document.activeElement);
    }
  });
  let indexPromise;
  function getIndex() {
    if (!indexPromise) indexPromise = fetch('/search.json').then(r => {
      if (!r.ok) throw new Error('Search index unavailable');
      return r.json();
    }).catch(e => { indexPromise = null; throw e; });
    return indexPromise;
  }
  const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  document.querySelectorAll('[data-search-surface]').forEach(surface => {
    const input = surface.querySelector('[data-search-input]');
    const results = surface.querySelector('[data-search-results]');
    const status = surface.querySelector('[data-search-status]');
    let timer, revision = 0;
    async function search() {
      const current = ++revision;
      const query = normalize(input.value.trim());
      results.replaceChildren();
      if (!query) { status.textContent = 'Type to find a page.'; return; }
      status.textContent = 'Searching…';
      try {
        const entries = await getIndex();
        if (current !== revision) return;
        const words = query.split(/\s+/).filter(Boolean);
        const matches = entries.map(entry => {
          const title = normalize(entry.title || '');
          const text = normalize(entry.text || '');
          return {entry, score: words.every(word => title.includes(word) || text.includes(word)) ? words.reduce((n, word) => n + (title.includes(word) ? 10 : 1), 0) : 0};
        }).filter(x => x.score).sort((a,b) => b.score - a.score).slice(0, 20);
        status.textContent = matches.length ? `${matches.length === 20 ? 'Showing up to ' : ''}${matches.length} results. Tab to browse.` : 'No results. Try a shorter phrase, such as “installation” or “Liquid”.';
        for (const {entry} of matches) {
          const url = new URL(entry.url, location.origin);
          if (url.origin !== location.origin) continue;
          const li = document.createElement('li'), link = document.createElement('a');
          link.href = url.pathname + url.hash;
          const title = document.createElement('strong'); title.textContent = entry.title;
          const path = document.createElement('span'); path.className = 'search-path'; path.textContent = url.pathname;
          const snippet = document.createElement('p');
          const text = (entry.text || '').replace(/\{%[\s\S]*?%\}|\{\{[\s\S]*?\}\}/g, '').replace(/\s+/g,' ');
          const position = normalize(text).indexOf(words[0]);
          const start = Math.max(0, position - 45);
          snippet.textContent = `${start ? '…' : ''}${text.slice(start, start + 180)}${text.length > start + 180 ? '…' : ''}`;
          link.append(title, path, snippet); li.append(link); results.append(li);
        }
      } catch {
        if (current === revision) status.textContent = 'Search is temporarily unavailable. Please try again, or browse Documentation from the menu.';
      }
    }
    input.addEventListener('input', () => { ++revision; clearTimeout(timer); timer = setTimeout(search, 150); });
    input.addEventListener('keydown', e => { if (e.key === 'ArrowDown' && results.querySelector('a')) { e.preventDefault(); results.querySelector('a').focus(); } });
    if (location.pathname === '/search/' && new URLSearchParams(location.search).has('q')) { input.value = new URLSearchParams(location.search).get('q'); search(); }
  });

  document.querySelectorAll('[data-copy]').forEach(button => button.addEventListener('click', async () => {
    const text = button.dataset.copy;
    try {
      await navigator.clipboard.writeText(text);
      button.textContent = 'Copied';
      (document.querySelector('#copy-status') || button).textContent = 'Command copied to clipboard.';
    } catch {
      button.textContent = 'Select to copy';
      (document.querySelector('#copy-status') || button).textContent = 'Clipboard unavailable. Select the command and copy it manually.';
    }
    setTimeout(() => { button.textContent = 'Copy'; }, 2500);
  }));
  const terminalToggle = document.querySelector('#terminal-toggle');
  const terminalDemo = document.querySelector('#terminal-playground');
  const terminalQuickstart = document.querySelector('#quickstart-terminal');
  const terminalNote = document.querySelector('#terminal-demo-note');
  if (terminalToggle && terminalDemo && terminalQuickstart && terminalNote) {
    terminalToggle.hidden = false;
    terminalToggle.addEventListener('click', () => {
      const opening = terminalDemo.classList.contains('hidden');
      terminalDemo.classList.toggle('hidden', !opening);
      terminalQuickstart.hidden = opening;
      terminalNote.hidden = !opening;
      terminalToggle.setAttribute('aria-expanded', String(opening));
      terminalToggle.textContent = opening ? 'Show quickstart commands ↗' : 'Try interactive terminal ↗';
      if (opening) document.querySelector('#terminal-input')?.focus();
    });
  }
  // Scroll only on explicit navigation, preserving URL and reduced-motion preferences.
  document.querySelectorAll('.page-toc a').forEach(link => link.addEventListener('click', () => {
    link.closest('.mobile-page-toc')?.removeAttribute('open');
  }));
  document.querySelectorAll('.page-toc').forEach(toc => { if (!toc.querySelector('li')) toc.hidden = true; });
  const tocLinks = [...document.querySelectorAll('.page-toc a[href^="#"]')];
  if (tocLinks.length && 'IntersectionObserver' in window) {
    const headings = [...new Set(tocLinks.map(link => document.getElementById(decodeURIComponent(link.hash.slice(1)))).filter(Boolean))];
    const markCurrent = id => tocLinks.forEach(link => {
      if (decodeURIComponent(link.hash.slice(1)) === id) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    if (location.hash && document.getElementById(decodeURIComponent(location.hash.slice(1)))) {
      markCurrent(decodeURIComponent(location.hash.slice(1)));
    }
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible.length) markCurrent(visible[0].target.id);
    }, { rootMargin: '-105px 0px -65% 0px' });
    headings.forEach(heading => observer.observe(heading));
  }
  document.querySelectorAll('.prose pre').forEach(pre => { if (pre.scrollWidth > pre.clientWidth) pre.tabIndex = 0; });
  // A failed remote preview never makes a card unusable.
  document.querySelectorAll('img[data-preview]').forEach(img => {
    const fallback = () => { img.hidden = true; img.parentElement.classList.add('preview-unavailable'); };
    img.addEventListener('error', fallback);
    if (img.complete && !img.naturalWidth) fallback();
  });
})();
