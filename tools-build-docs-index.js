const fs = require('fs');
const https = require('https');

const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) CyberArk L2 Rolebook';

const fetchText = (url) => new Promise((resolve, reject) => {
  https.get(url, { headers: { 'User-Agent': USER_AGENT } }, res => {
    if (res.statusCode === 301 || res.statusCode === 302) return fetchText(new URL(res.headers.location, url).href).then(resolve).catch(reject);
    if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode} on ${url}`));
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => resolve({ text: data, url: res.url || url }));
  }).on('error', reject);
});

const clean = s => String(s||'').replace(/<[^>]*>/g, ' ').replace(/&amp;/gi, '&').replace(/&nbsp;/gi, ' ').replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/gi, '<').replace(/&gt;/gi, '>').replace(/\s+/g, ' ').trim();

async function run() {
  const portalUrl = 'https://docs.cyberark.com/portal/latest/en/docs.htm';
  console.log('Fetching portal index...');
  const { text: html } = await fetchText(portalUrl);
  
  const records = [];
  const regexes = [
    /<div\b[^>]*class="[^"]*portal-tile[^"]*"[^>]*>[\s\S]*?<a\b[^>]*href="([^"]+)"[^>]*>[\s\S]*?<div\b[^>]*class="[^"]*portal-tile-content[^"]*"[^>]*>\s*<p[^>]*>([\s\S]*?)<\/p>\s*<p[^>]*>([\s\S]*?)<\/p>/gi,
    /<div\b[^>]*class="[^"]*space-tile[^"]*"[^>]*>[\s\S]*?<a\b[^>]*href="([^"]+)"[^>]*>[\s\S]*?<div\b[^>]*class="[^"]*space-tile-content[^"]*"[^>]*>\s*<p[^>]*>([\s\S]*?)<\/p>\s*<p[^>]*>([\s\S]*?)<\/p>/gi
  ];
  for (const re of regexes) {
    for (const m of html.matchAll(re)) records.push({ at: m.index, title: clean(m[2]), desc: clean(m[3]), href: new URL(m[1], portalUrl).href });
  }
  records.sort((a, b) => a.at - b.at);
  const seen = new Set();
  const spaces = [];
  for (const r of records) {
    const k = r.title + '|' + r.href;
    if (!seen.has(k)) {
      seen.add(k);
      spaces.push({ id: new URL(r.href).pathname.split('/').filter(Boolean)[0] || 'unknown', title: r.title, description: r.desc, url: r.href });
    }
  }

  // Tarik semua space dari portal resmi
  for (let i = 0; i < spaces.length; i++) {
    const space = spaces[i];
    console.log(`[${i+1}/${spaces.length}] Fetching TOC for ${space.title}...`);
    space.indexed = false;
    space.indexError = '';
    try {
      const u = new URL(space.url);
      const segments = u.pathname.split('/').filter(Boolean);
      if (segments.length < 3) throw new Error('Short path, probably redirect or portal link');
      
      const baseUrl = u.origin + '/' + segments.slice(0, 3).join('/') + '/';
      const helpUrl = baseUrl + 'Data/HelpSystem.xml';
      
      const { text: helpXml } = await fetchText(helpUrl);
      const tocMatch = helpXml.match(/Toc="([^"]*)"/i);
      if (!tocMatch) throw new Error('No TOC attribute in HelpSystem');
      
      const tocUrl = baseUrl + tocMatch[1];
      const { text: tocJs } = await fetchText(tocUrl);
      
      let defObj;
      const fakeDefine = (obj) => { defObj = obj; };
      eval('const define = fakeDefine;' + tocJs);
      
      if (!defObj || !defObj.tree || !defObj.tree.n) throw new Error('Invalid TOC JS');
      
      const tocDir = tocUrl.substring(0, tocUrl.lastIndexOf('/') + 1);
      const chunksCount = defObj.numchunks || 0;
      const chunks = [];
      
      for(let c=0; c<Math.min(chunksCount, 25); c++) {
         const cu = tocDir + defObj.prefix + c + '.js';
         const { text: cjs } = await fetchText(cu).catch(() => ({text:''}));
         if(!cjs) continue;
         let co;
         const cd = (obj) => { co = obj; };
         eval('const define = cd;' + cjs);
         chunks.push(co);
      }
      
      const nodeMap = new Map();
      for(const ch of chunks) {
         if(!ch) continue;
         for(const path in ch) {
            const m = ch[path];
            const indices = Array.isArray(m.i) ? m.i : [];
            const titles = Array.isArray(m.t) ? m.t : [];
            indices.forEach((idx, pos) => {
               nodeMap.set(idx, { path: path.replace(/^\//,''), title: clean(titles[pos] || titles[0] || path) });
            });
         }
      }
      
      const topics = [];
      function traverse(nodes, parents) {
         if(!nodes) return;
         for(const n of nodes) {
            const md = nodeMap.get(n.i);
            const title = md ? md.title : `Node ${n.i}`;
            const p = [...parents, title];
            if(md) topics.push([title, baseUrl + md.path, p.join(' > ')]);
            traverse(n.n, p);
         }
      }
      
      traverse(defObj.tree.n, []);
      space.topics = topics;
      space.topicCount = topics.length;
      space.indexed = topics.length > 0;
      console.log(`  -> OK: ${topics.length} topics`);
    } catch (err) {
      space.indexError = err.message;
      console.log(`  -> Skip: ${err.message}`);
    }
  }

  const snapshot = {
    generatedAt: new Date().toISOString(),
    portalUrl,
    spaceCount: spaces.length,
    totalTopics: spaces.reduce((sum, s) => sum + (s.topicCount || 0), 0),
    spaces: spaces.map(s => ({
      id: s.id,
      title: s.title,
      description: s.description,
      url: s.url,
      indexed: !!s.indexed,
      indexError: s.indexError || '',
      topicCount: s.topicCount || 0,
      topics: s.topics || []
    }))
  };

  const out = `// Auto-generated Docs Offline Index
window.CYBERARK_DOCS_INDEX = ${JSON.stringify(snapshot)};
`;
  fs.writeFileSync('rolebook-assets/cyberark-docs-index.js', out, 'utf8');
  console.log(`Successfully generated cyberark-docs-index.js with ${snapshot.totalTopics} topics across ${snapshot.spaces.length} spaces.`);
}

run().catch(console.error);
