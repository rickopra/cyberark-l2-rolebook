(() => {
  let query = '';

  const text = value => String(value ? '');
  const escapeHtml = value => text(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
  const language = () => document.documentElement.lang === 'en' ? 'en' : 'id';
  const index = () => window.CYBERARK_DOCS_INDEX;

  function update(container) {
    const data = index();
    if (!data) {
      container.innerHTML = '<div class="notice">CyberArk Docs index is not loaded.</div>';
      return;
    }

    const lang = language();
    const needle = query.trim().toLowerCase();
    const spaces = data.spaces || [];
    const indexed = spaces.filter(space => space.indexed);
    let html = `<div class="docs-explorer-head"><div><div class="eyebrow">CYBERARK DOCS ATLAS</div><h3>${lang === 'id' ? 'Pencarian TOC offline' : 'Offline TOC search'}</h3></div><span class="badge">${data.totalTopics || 0} topics · ${data.portalSpaceCount || spaces.length} spaces</span></div>`;
    html += `<p class="small">${lang === 'id' ? 'Index ini membantu menemukan ruang, judul halaman, dan breadcrumb. Buka hasil untuk membaca prosedur resmi sesuai versi.' : 'This index helps find spaces, page titles, and breadcrumbs. Open a result to read the official version-specific procedure.'}</p>`;
    html += `<input class="docs-search" id="docsExplorerSearch" type="search" value="${escapeHtml(query)}" placeholder="${lang === 'id' ? 'Cari judul halaman, komponen, error, atau breadcrumb…' : 'Search page title, component, error, or breadcrumb…'}">`;

    if (needle.length < 3) {
      html += `<div class="docs-space-grid">${spaces.map(space => `<a class="docs-space-item" href="${escapeHtml(space.url || '#')}" target="_blank" rel="noreferrer"><span class="docs-space-title">${escapeHtml(space.title)}</span><span class="docs-space-description">${escapeHtml(space.description || '')}</span><span class="docs-space-meta">${space.indexed ? `${space.topicCount} topics` : (lang === 'id' ? 'catalog only' : 'catalog only')} · ${escapeHtml(space.group || 'CyberArk Docs')}</span></a>`).join('')}</div>`;
      html += `<p class="small muted" style="margin-top:12px">${lang === 'id' ? `${indexed.length} ruang memiliki snapshot TOC; ruang lain tetap tersedia sebagai katalog dan link resmi.` : `${indexed.length} spaces have a TOC snapshot; other spaces remain available as catalog entries and official links.`}</p>`;
    } else {
      const results = [];
      spaces.forEach(space => (space.topics || []).forEach(topic => {
        const title = text(topic[0]);
        const breadcrumb = text(topic[2]);
        if (title.toLowerCase().includes(needle) || breadcrumb.toLowerCase().includes(needle)) results.push({ space, title, url: topic[1], breadcrumb });
      }));
      const limited = results.slice(0, 80);
      html += limited.length ? `<div class="docs-result-list">${limited.map(result => `<a class="docs-result-item" href="${escapeHtml(result.url)}" target="_blank" rel="noreferrer"><span class="docs-space-badge">${escapeHtml(result.space.title)}</span><span class="docs-result-title">${escapeHtml(result.title)}</span><span class="docs-result-path">${escapeHtml(result.breadcrumb)}</span></a>`).join('')}</div>` : `<p class="small muted">${lang === 'id' ? 'Tidak ada judul yang cocok di snapshot. Coba istilah komponen atau buka ruang resmi.' : 'No matching title in the snapshot. Try a component term or open the official space.'}</p>`;
      if (results.length > limited.length) html += `<p class="small muted" style="margin-top:12px">${lang === 'id' ? `Menampilkan ${limited.length} dari ${results.length} hasil.` : `Showing ${limited.length} of ${results.length} results.`}</p>`;
    }

    container.innerHTML = html;
    container.querySelector('#docsExplorerSearch')?.addEventListener('input', event => {
      query = event.target.value;
      update(container);
      const input = container.querySelector('#docsExplorerSearch');
      input?.focus();
      input?.setSelectionRange(query.length, query.length);
    });
  }

  function mount() {
    const root = document.querySelector('#viewRoot');
    if (!root || !root.querySelector('#refSearch') || root.querySelector('#docsExplorer')) return;
    const container = document.createElement('section');
    container.id = 'docsExplorer';
    container.className = 'docs-explorer card card-pad';
    root.appendChild(container);
    update(container);
  }

  const root = document.querySelector('#viewRoot');
  if (root) new MutationObserver(mount).observe(root, { childList: true, subtree: true });
  document.addEventListener('DOMContentLoaded', mount);
  setTimeout(mount, 0);
})();
