(() => {
  const data=window.REFERENCE_DATA;
  const profiles=window.REFERENCE_PROFILES||{};
  if(!data?.entries)return;
  const R=(id,en)=>({id,en});
  const fallback={foundation:['CA-DOCS-15.2','NIST-800-53R5','LOCAL-RICKO'],component:['CA-DOCS-15.2','CA-INSTALL-15.2','LOCAL-RICKO'],object:['CA-DOCS-15.2','NIST-800-53R5','LOCAL-RICKO'],flow:['CA-DOCS-15.2','LOCAL-RICKO'],operations:['NIST-800-61R3','CA-DOCS-15.2','LOCAL-RICKO'],architecture:['CA-DOCS-15.2','CA-INSTALL-15.2','LOCAL-RICKO']};
  const addSource=(id,title,publisher,type,url)=>{if(!data.sources.some(s=>s.id===id))data.sources.push({id,title,publisher,type,url,accessed:'2026-08-04'});};
  addSource('CA-PAM-BRIEF','CyberArk Privileged Access Manager Solution Brief','CyberArk','Primary','https://www.cyberark.com/resources/product-datasheets/cyberark-privileged-access-security-solution');
  data.entries.forEach(e=>{
    const p=profiles[e.id]||{};
    const refs=p.refs||fallback[e.category]||['CA-DOCS-15.2','LOCAL-RICKO'];
    e.readingTime=p.time||18;
    e.lastReviewed=data.lastReviewed||'2026-08-04';
    e.appliesTo=e.appliesTo||['Check product edition and version'];
    e.versionNote=e.versionNote||R('Detail menu, path, port, log, dan behavior harus diverifikasi terhadap edition, build, topology, serta SOP customer.','Menus, paths, ports, logs, and behavior must be verified against the edition, build, topology, and customer SOP.');
    e.sections=p.sections||[
      {title:R('Penjelasan dari dasar','First-principles explanation'),paragraphs:[{text:R(`${e.what.id} Mulai dengan membedakan tujuan, object, flow, dependency, dan boundary. Jangan melompat langsung ke prosedur; pahami dulu apa yang harus dilindungi dan siapa yang memiliki tanggung jawab.`,`${e.what.en} Start by separating purpose, objects, flows, dependencies, and boundaries. Do not jump directly to procedures; first understand what must be protected and who owns each responsibility.`),refs}]},
      {title:R('Mental model sederhana','Simple mental model'),paragraphs:[{text:R(`${e.simple.id} Gunakan analogi ini untuk mengingat konsep, lalu kembali ke istilah teknis ketika membaca ticket atau dokumentasi version.`,`${e.simple.en} Use this analogy to remember the concept, then return to the technical terms when reading a ticket or version-specific documentation.`),refs}]},
      {title:R('Flow dan dependency','Flow and dependencies'),paragraphs:[{text:R((e.flow.id||[]).join(' '),(e.flow.en||[]).join(' ')),refs}]},
      {title:R('Cara berpikir L2','L2 reasoning'),paragraphs:[{text:R((e.l2.id||[]).join(' '),(e.l2.en||[]).join(' ')),refs:['NIST-800-61R3','LOCAL-RICKO']}]}
    ];
    e.sources=refs;
    e.failureModes=e.failureModes||e.l2;
    e.evidence=e.evidence||R(['Workflow dan exact error','Scope, timestamp + timezone','Edition/version/topology','Affected object/component/target','Recent change dan working comparison'],['Workflow and exact error','Scope, timestamp with timezone','Edition/version/topology','Affected object/component/target','Recent change and working comparison']);
    e.aliases=[e.term].concat(e.aliases||[]);
  });
  data.modulePrerequisites={
    m1:{required:['pam','identity-account-credential'],recommended:['rbac']},
    m2:{required:['two-flows','pvwa','cpm','psm'],recommended:['vault']},
    m3:{required:['vault','pvwa','cpm','psm','psmp'],recommended:['connector','pta']},
    m4:{required:['safe','platform','managed-account','rbac'],recommended:['identity-account-credential']},
    m5:{required:['cpm','lifecycle','reconcile'],recommended:['platform','managed-account']},
    m6:{required:['onboarding','safe','platform'],recommended:['rbac','lifecycle']},
    m7:{required:['authn-authz-connectivity','saml'],recommended:['pvwa','rbac']},
    m8:{required:['psm','psmp','connection-component'],recommended:['audit-recording']},
    m9:{required:['l2-method'],recommended:['authn-authz-connectivity','audit-recording']},
    m10:{required:['selfhosted-cloud','connector'],recommended:['vault','pvwa']},
    m11:{required:['vault','dr-vault','ha-rto-rpo'],recommended:['audit-recording']},
    m12:{required:['api-integrations','authn-authz-connectivity'],recommended:['rbac']},
    m13:{required:['l2-method'],recommended:['audit-recording']},
    m14:{required:['l2-method','pam'],recommended:['CA-CERT']}
  };
})();
