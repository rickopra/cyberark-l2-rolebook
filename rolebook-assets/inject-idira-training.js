(() => {
  const course=window.COURSE_DATA,data=window.REFERENCE_DATA;
  if(!course||!data||data.sources.some(s=>s.id==='IDIRA-PAM-ADMIN-BUNDLE'))return;
  const R=(id,en)=>({id,en}),A=(id,en)=>({id,en});
  const E=value=>String(value??'').replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
  const list=(items,className='')=>items?.length?`<ul class="${className}">${items.map(item=>`<li>${E(item)}</li>`).join('')}</ul>`:'';
  const table=definition=>definition?.rows?.length?`<div class="training-table-wrap"><table class="training-table"><thead><tr>${definition.headers.map(item=>`<th>${E(item)}</th>`).join('')}</tr></thead><tbody>${definition.rows.map(row=>`<tr>${row.map(item=>`<td>${E(item)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`:'';
  const callout=definition=>definition?`<aside class="training-callout ${E(definition.tone||'concept')}"><strong>${E(definition.title)}</strong><p>${E(definition.text)}</p></aside>`:'';
  const sectionHtml=(section,moduleNumber,index)=>`<section class="training-section" id="training-${moduleNumber}-section-${index+1}"><div class="training-section-head"><div><span class="training-section-number">${String(index+1).padStart(2,'0')}</span><h3>${E(section.title)}</h3></div>${section.pages?`<span class="training-source-pages">Jejak sumber: ${E(section.pages)}</span>`:''}</div>${(section.paragraphs||[]).map(text=>`<p>${E(text)}</p>`).join('')}${list(section.bullets)}${section.flowNote?`<div class="training-flow-note"><strong>Flow ringkas</strong><span>${E(section.flowNote)}</span></div>`:''}${table(section.table)}${callout(section.callout)}</section>`;
  const detailPanel=(title,items,kind='')=>items?.length?`<section class="training-detail-panel ${kind}"><h3>${E(title)}</h3>${list(items,'training-check-list')}</section>`:'';
  const commandList=items=>items?.length?`<div class="training-command-list">${items.map(item=>`<div><code>${E(item.code)}</code><span>${E(item.meaning)}</span></div>`).join('')}</div>`:'';
  const expansionCards=(items,kind)=>items?.length?`<div class="training-expansion-grid">${items.map(item=>`<article class="training-expansion-card ${kind}"><header><h4>${E(item.title)}</h4>${item.pages?`<span>${E(item.pages)}</span>`:''}</header>${(item.paragraphs||[]).map(text=>`<p>${E(text)}</p>`).join('')}${list(item.bullets,'training-check-list')}${commandList(item.commands)}${table(item.table)}</article>`).join('')}</div>`:'';
  const renderExpansion=(moduleNumber,expansion)=>{
    if(!expansion)return'';
    const coverage=expansion.coverage?.length?table({headers:['Halaman','Topik sumber','Perlakuan di Rolebook'],rows:expansion.coverage.map(item=>[item.pages,item.topic,item.treatment])}):'';
    return `<section class="training-source-audit" id="training-${moduleNumber}-source-audit"><div class="eyebrow">AUDIT SUMBER 699 HALAMAN</div><h3>Jejak cakupan dan detail teknis sumber</h3><p>${E(expansion.coverageNote)}</p>${coverage}</section><section class="training-source-addendum" id="training-${moduleNumber}-source-addendum"><div class="eyebrow">SOURCE ADDENDUM</div><h3>Detail slide yang sekarang ditulis eksplisit</h3><p class="training-expansion-disclaimer">Bagian ini adalah parafrasa faktual dari material training lokal. Nama parameter, file, object, limit, port, dan command dipertahankan agar dapat dipakai sebagai referensi belajar.</p>${expansionCards(expansion.sourceAddendum,'source')}</section><section class="training-rolebook-analysis" id="training-${moduleNumber}-analysis"><div class="eyebrow">ANALISIS &amp; PENGEMBANGAN ROLEBOOK</div><h3>Bukan kutipan literal slide: penerapan, implikasi, dan pengembangan</h3><p class="training-expansion-disclaimer">Bagian ini adalah analisis Rolebook yang diturunkan dari materi sumber. Gunakan untuk membangun cara berpikir desain, operasi, troubleshooting, automation, dan maturity—bukan sebagai klaim bahwa kalimatnya berasal dari slide.</p>${expansionCards(expansion.analysis,'analysis')}${detailPanel('Artefak belajar dan kerja yang bisa dibuat',expansion.artifacts,'artifacts')}</section>`;
  };

  const renderChapter=(moduleNumber,module,chapter,detail,expansion)=>{
    const toc=(chapter.sections||[]).map((section,index)=>`<a href="#training-${moduleNumber}-section-${index+1}"><span>${String(index+1).padStart(2,'0')}</span>${E(section.title.replace(/^\d+\.\s*/,''))}</a>`).join('')+(expansion?`<a href="#training-${moduleNumber}-source-audit"><span>A</span>Audit cakupan sumber</a><a href="#training-${moduleNumber}-source-addendum"><span>S</span>Addendum teknis sumber</a><a href="#training-${moduleNumber}-analysis"><span>R</span>Analisis &amp; pengembangan</a>`:'');
    const terms=chapter.terms?.length?`<section class="training-section training-terms"><div class="training-section-head"><div><span class="training-section-number">00</span><h3>Istilah yang harus dikuasai</h3></div></div><div class="training-term-grid">${chapter.terms.map(([term,meaning])=>`<article><strong>${E(term)}</strong><p>${E(meaning)}</p></article>`).join('')}</div></section>`:'';
    const scenario=chapter.scenario?`<section class="training-scenario"><div class="eyebrow">SCENARIO WALKTHROUGH</div><h3>${E(chapter.scenario.title)}</h3><p>${E(chapter.scenario.situation)}</p><ol>${chapter.scenario.walkthrough.map(step=>`<li>${E(step)}</li>`).join('')}</ol><div class="training-scenario-result"><strong>Kesimpulan yang diharapkan</strong><p>${E(chapter.scenario.result)}</p></div></section>`:'';
    const checks=chapter.checks?.length?`<section class="training-knowledge"><div class="eyebrow">KNOWLEDGE CHECK + JAWABAN</div><h3>Uji pemahaman, lalu buka penjelasannya</h3>${chapter.checks.map((item,index)=>`<details><summary><span>Q${index+1}</span>${E(item.question)}</summary><p><strong>Jawaban:</strong> ${E(item.answer)}</p></details>`).join('')}</section>`:'';
    const detailGroups=[
      detailPanel('Konsep inti dari materi',detail?.concepts,'concepts'),
      detailPanel('Alur komponen',detail?.flow,'flow'),
      detailPanel('Tugas administrator',detail?.admin,'admin'),
      detailPanel('Walkthrough investigasi L2',detail?.l2,'l2'),
      detailPanel('Evidence minimum',detail?.evidence,'evidence'),
      detailPanel('Kesalahan umum yang harus dihindari',detail?.pitfalls,'pitfalls'),
      detailPanel('Latihan mandiri',detail?.exercises,'exercises')
    ].join('');
    return `<article class="training-chapter" id="training-${moduleNumber}"><header class="training-hero"><div class="eyebrow">IDIRA (FORMERLY CYBERARK) - PAM ADMIN M${moduleNumber}</div><h2>${E(chapter.title)}</h2><p class="training-subtitle">${E(chapter.subtitle)}</p><div class="training-provenance"><strong>Bab mandiri Rolebook</strong><span>${E(chapter.source)}</span><span>Sumber faktual hanya modul training terkait; seluruh makna, fungsi, alur, detail teknis, dan ekspansi operasional dijelaskan di halaman ini tanpa perlu membuka slide atau PDF.</span></div></header><div class="training-intro">${chapter.intro.map(text=>`<p>${E(text)}</p>`).join('')}</div><aside class="training-mental"><span>MENTAL MODEL</span><p>${E(chapter.mentalModel)}</p></aside><div class="training-objectives"><h3>Setelah bab ini kamu dapat</h3>${list(chapter.objectives,'training-check-list')}</div><nav class="training-toc" aria-label="Daftar isi bab"><strong>Daftar isi bab</strong>${toc}</nav>${terms}${chapter.sections.map((section,index)=>sectionHtml(section,moduleNumber,index)).join('')}${chapter.decisionTable?`<section class="training-section training-decisions"><div class="training-section-head"><div><span class="training-section-number">D</span><h3>Tabel keputusan dan dampak operasional</h3></div></div>${table(chapter.decisionTable)}</section>`:''}${renderExpansion(moduleNumber,expansion)}<section class="training-operational"><div class="eyebrow">OPERATIONAL EXPANSION</div><h3>Dari konsep menjadi pekerjaan administrator dan L2</h3><div class="training-detail-grid">${detailGroups}</div></section>${scenario}${checks}<section class="training-summary"><div><h3>Ringkasan bab</h3>${list(chapter.summary)}</div><div><h3>Batas aman dan catatan versi</h3>${list(chapter.boundaries)}</div></section><footer class="training-footer-note"><strong>Made by Ricko Prayudha - Offline Learning Workspace</strong><span>Materi belajar independen dan tidak berafiliasi dengan IDIRA, CyberArk, Palo Alto Networks, atau pemilik produk terkait.</span></footer></article>`;
  };

  const chapterReferenceSections=(chapter,detail,sourceId,expansion)=>{
    const section=(title,paragraphs=[],bullets=[],refs=[sourceId])=>({title:R(title,title),paragraphs:paragraphs.map(text=>({text:R(text,text),refs})),bullets:A(bullets,bullets)});
    const sections=[section('Pengantar bab',chapter.intro),section('Mental model',[chapter.mentalModel]),section('Istilah penting',[],chapter.terms.map(([term,meaning])=>`${term}: ${meaning}`))];
    chapter.sections.forEach(item=>sections.push(section(item.title,item.paragraphs||[],[...(item.bullets||[]),...(item.table?.rows||[]).map(row=>row.join(' ? ')),...(item.callout?[`${item.callout.title}: ${item.callout.text}`]:[])])));
    if(chapter.decisionTable)sections.push(section('Tabel keputusan dan dampak',[],chapter.decisionTable.rows.map(row=>row.join(' ? '))));
    if(expansion){
      sections.push(section('Audit cakupan material training',[expansion.coverageNote],expansion.coverage.map(item=>`${item.pages} ? ${item.topic}: ${item.treatment}`)));
      expansion.sourceAddendum.forEach(item=>sections.push(section(`Addendum sumber ? ${item.title}`,item.paragraphs||[],[...(item.bullets||[]),...(item.commands||[]).map(command=>`${command.code} ? ${command.meaning}`),...(item.table?.rows||[]).map(row=>row.join(' ? '))])));
      expansion.analysis.forEach(item=>sections.push(section(`Analisis & Pengembangan Rolebook ? ${item.title}`,item.paragraphs||[],item.bullets||[],[])));
      sections.push(section('Artefak pengembangan yang disarankan',[],expansion.artifacts||[],[]));
    }
    if(detail){sections.push(section('Tugas administrator',[],detail.admin),section('Investigasi L2',[],detail.l2),section('Evidence minimum',[],detail.evidence),section('Kesalahan umum',[],detail.pitfalls),section('Latihan mandiri',[],detail.exercises));}
    if(chapter.scenario)sections.push(section(`Skenario: ${chapter.scenario.title}`,[chapter.scenario.situation,chapter.scenario.result],chapter.scenario.walkthrough));
    sections.push(section('Knowledge check dengan jawaban',[],chapter.checks.map(item=>`Pertanyaan: ${item.question} Jawaban: ${item.answer}`)),section('Ringkasan',[],chapter.summary),section('Batas aman dan catatan versi',[],chapter.boundaries));
    return sections;
  };
  data.sources.push({id:'IDIRA-PAM-ADMIN-BUNDLE',title:'IDIRA (formerly CyberArk) PAM Administrator — 20 Complete Chapters',publisher:'IDIRA / CyberArk training source',type:'Primary Training',url:'https://docs.cyberark.com/',accessed:'2026-08-15',note:'Dua puluh dokumen training lokal menjadi sumber faktual; seluruh materi belajar sudah ditulis ulang, dijelaskan, dan diperluas langsung di Rolebook.'});
  const ms=[
    {n:'01',c:'foundation',t:'Introduction to PAM',s:'Konsep privileged account, ancaman credential, manfaat PAM, arsitektur self-hosted, session isolation, dan mitigasi lateral movement.',f:'Identity → authentication → Vault authorization → CPM credential flow atau PSM session flow → target access → recording & audit.',l:'Mulai dari aktivitas yang gagal: portal login, request workflow, connection, atau rotation. Catat edition/build, topology, dan timestamp.',k:['Bedakan identity, user, account, credential.','PAM bukan hanya password vault; ia menggabungkan authorization, lifecycle, isolation, recording, detection, dan audit.'],r:['pam','vault','pvwa','cpm','psm']},
    {n:'02',c:'component',t:'User Management',s:'User vs Account, internal dan transparent users/groups, predefined identities, PrivateArk/PVWA administration, Vault/Safe authorization, PVWA permission, dan LDAP directory mapping.',f:'Authentication → directory mapping (LDAP) → internal user mapping → Vault role → Safe membership → PVWA permissions & action.',l:'Jika login sukses tetapi account tidak terlihat, masalahnya ada di directory mapping, Safe membership, atau Safe permission scope.',k:['User adalah requester; Account adalah object credential pada target.','Pisahkan Vault authorization, Safe permission, dan PVWA permission.'],r:['rbac','safe','pvwa']},
    {n:'03',c:'component',t:'Policies and Platforms',s:'Workflow Master Policy, Platform, Safe, Account. Master Policy mengatur aturan global; Platform mengatur parameter teknis, linked account, dan exception.',f:'Review Policy → select/create Platform → set Master Policy exception → Safe → Account → validate CPM/PSM action.',l:'Saat account job gagal, pisahkan policy exception, Platform properties, target state, dan account state. Jangan mengubah global policy.',k:['Bedakan global policy dan Platform exception.','Jangan mengubah aturan global untuk satu account tanpa menilai blast radius.'],r:['platform','safe','cpm','psm']},
    {n:'04',c:'object',t:'Safes',s:'Vault Model, Safe sebagai logical container dan authorization boundary, Safe design criteria, access control, dan penambahan member.',f:'Define owner/scope → create Safe → retention config → add members (Users/Groups) → least privilege permissions → add accounts.',l:'Account “hilang” sering berarti Safe scope atau permission (List, Retrieve, Use) salah. Bedakan Vault authorization dan Safe permission.',k:['Rancang Safe berdasar owner, environment, risk, lifecycle, dan audit.','Bedakan List, Retrieve, Use, Add, Update, Delete, dan Manage Members.'],r:['vault','rbac','managed-account']},
    {n:'05',c:'object',t:'Accounts pt1',s:'Onboarding Account melalui PVWA, password management operations (Verify, Change, Reconcile), dan CPM target interaction.',f:'Create Account → assign Safe/Platform → CPM Verify → CPM Change sesuai policy → CPM store credentials → review activity.',l:'Cek address dan username terlebih dahulu. Pahami log CPM untuk memastikan apakah password vault out-of-sync atau koneksi ke target ditolak.',k:['Bedakan onboarding, Verify, Change, dan penggunaan account.','CPM menjalankan lifecycle berdasarkan policy dan Platform.'],r:['managed-account','safe','platform','cpm']},
    {n:'06',c:'object',t:'Accounts pt2',s:'Linked accounts: logon account, reconcile account, best practice untuk root, privilege switch (su/sudo), dan SSH key management.',f:'Login via logon account → switch/elevate → password operation; ATAU primary account connect → reconcile trigger → recovery.',l:'Periksa linked-account reference di object, switch permission pada target, SSHD configuration, dan account suspension state.',k:['Logon account menjadi identity perantara; reconcile account membantu recovery/change.','SSH key juga memiliki ownership, rotation, access, dan audit lifecycle.'],r:['managed-account','cpm','reconcile']},
    {n:'07',c:'object',t:'Dependents',s:'Dependent Platforms (Usages): kemunculan credential yang sama di Windows Service, IIS, scheduled task, atau configuration file yang harus disinkronkan oleh CPM.',f:'Discover usage → register dependent → change primary credential → CPM updates occurrence → verify service restart.',l:'Jika aplikasi down setelah rotation, cari dependency yang tidak terdaftar sebelum melakukan rollback password.',k:['Dependent bukan sekadar duplicate account.','SearchForUsages berguna jika scope, Platform, account, dan dependency benar.'],r:['managed-account','platform','cpm','lifecycle']},
    {n:'08',c:'flow',t:'Privileged Access Workflows',s:'Kontrol Privileged Access Workflows: reason for access, dual control, exclusive password, dan one-time password (OTP).',f:'Request access → reason/approval (Dual Control) → time-bound authorization → session use → lock (Exclusive) → expiry/rotation (OTP).',l:'Jika tombol Connect/Show hilang, cek List/Use permission sebelum melihat konfigurasi workflow. Approval delay wajar terjadi jika multi-level.',k:['Bedakan List, Retrieve, Use, Show/Copy, dan Connect.','Workflow menentukan syarat, duration, approval, dan exposure.'],r:['rbac','safe','psm','audit-recording']},
    {n:'09',c:'flow',t:'Discovery and Onboarding',s:'Discovery dan Onboarding: metode discovery (Windows/Unix), Automatic Onboarding Rules, PTA unmanaged detection, dan REST API batch upload.',f:'CPM Scanner discovery → Pending Safe → match Onboarding Rule → auto-provision to Safe/Platform → CPM Verify.',l:'Discovery memerlukan akun scanner dengan hak baca AD/OU. Kegagalan auto-onboarding biasanya karena tidak match dengan Rule criteria.',k:['Onboarding mencakup discovery, classification, ownership, Safe/Platform, dan validation.','Rule terlalu luas dapat menghasilkan blast radius.'],r:['managed-account','safe','platform','api-integrations']},
    {n:'10',c:'flow',t:'Privileged Session Management pt1',s:'Privileged Session Manager (PSM) Part 1: PSM Ad-Hoc Connections, HTML5 Gateway, PSM for Windows, PSM for SSH, architecture dan flow.',f:'User auth (PVWA) → request Connect → Vault issue ticket → PSM verify ticket → PSM retrieve credential → PSM launch RDP/SSH to target → Audit.',l:'Sesi timeout sering disebabkan oleh AppLocker, plugin dispatcher error, RDS CAL license, atau network block (Port 3389/22) dari PSM ke Target.',k:['PSM memisahkan endpoint dari target dan memediasi session.','Connection component menentukan cara session mencapai target.'],r:['psm','connection-component','audit-recording']},
    {n:'11',c:'flow',t:'Privileged Session Management pt2',s:'Session recordings and audits: recording storage (PSMRecordings/external), monitor/manage recordings, session audit events, active session monitoring, suspend/terminate.',f:'Session start → PSM records video/text locally → upload to recording Safe/external storage → audit review → authorized live monitor/suspend/terminate.',l:'Jika recording missing, isolasi recording enablement, local disk, upload, Safe retention/permission, session ID; untuk live control cek PSMLiveSessionTerminators; PSM for SSH hanya live audit.',k:['Bedakan video recording, text audit, dan live-session control.','Recording Safe, retention, dan permission menentukan siapa yang dapat review.','PTA dapat memberi trigger automatic suspend/terminate.'],r:['psm','psmp','connection-component','audit-recording']},
    {n:'12',c:'operations',t:'Privileged Threat Analytics',s:'Privileged Threat Analytics (PTA): deteksi unmanaged credentials, suspicious password change, irregular session time, dan over-pass-the-hash anomaly.',f:'PTA collect logs (Vault/SIEM) → baseline behavior → detect anomaly → alert → auto-remediate (suspend session / reconcile password).',l:'False positive tinggi di masa awal. Pastikan network tap atau syslog terkonfigurasi dengan benar agar PTA mendapat visibility penuh.',k:['PTA menggabungkan event privileged dan session.','Automatic containment membutuhkan test case, allowlist, rollback, dan owner.'],r:['pta','psm','audit-recording']},
    {n:'13',c:'operations',t:'Reports',s:'Reporting L2: Operational dan Compliance reports, report generation via PVWA/PrivateArk, Entitlement Report, Activity Log, dan Export Vault Data (EVD) utility.',f:'User request report (PVWA/EVD) → Vault query → compile CSV/Excel → distribute to Safe/Email.',l:'Gagal generate report biasanya karena kurang permission (ManageReportsGroup / View Audit) di Safe yang sedang di-query.',k:['Pilih report sesuai audience dan pertanyaan audit.','Export harus dianggap data sensitif dan diberi redaction/retention.'],r:['audit-recording','rbac']},
    {n:'14',c:'architecture',t:'PAM Self-hosted Architecture',s:'Self-Hosted Architecture: arsitektur komponen (Vault, PVWA, CPM, PSM), communication path, configuration files (dbparm.ini, vault.ini), dan local services/logs.',f:'Identify component → locate service (IIS/CPM/PSM) → read local config (vault.ini) → trace log (Italog/Trace.d0/PMConsole).',l:'Jangan restart Vault tanpa persiapan; iisreset bisa dipakai untuk PVWA. Semua komponen memiliki credential untuk login ke Vault.',k:['Bedakan self-hosted, cloud, dan hybrid.','Vault adalah trust anchor; component memiliki identity, config, certificate, log, dan network requirement.'],r:['selfhosted-cloud','vault','pvwa','cpm','psm','pta']},
    {n:'15',c:'architecture',t:'Backup and Restore',s:'Backup dan Restore: PAClient operations, PA-Replicate (Backup utility), full vs incremental backup, dan Vault metadata/database structure.',f:'Backup user auth → PAReplicate connect → pull metadata & file contents → store locally (encrypted) → verify backup log.',l:'Kegagalan PAReplicate sering disebabkan password backup user expired atau network block (Port 1858) dari Vault ke Backup server.',k:['Backup tanpa restore test belum membuktikan recoverability.','Restore adalah prosedur change-controlled, bukan sekadar copy file.'],r:['vault','dr-vault','ha-rto-rpo']},
    {n:'16',c:'architecture',t:'Disaster Recovery',s:'Disaster Recovery (DR): DR architecture, DR Vault Setup, failover process, split-brain avoidance, dan return to primary site.',f:'Primary down → PADR service detect timeout → PADR trigger failover → DR Vault become active → Components fallback to DR Vault IP.',l:'CPM TIDAK BOLEH dikonfigurasi auto-failover untuk menghindari split-brain. Pastikan DNS/IP update berfungsi untuk PVWA/PSM.',k:['DR Vault dan component DR harus diuji.','RTO/RPO mengikat keputusan teknis dengan business impact.'],r:['dr-vault','ha-rto-rpo','selfhosted-cloud','vault']},
    {n:'17',c:'architecture',t:'Vault Security',s:'Vault Security: Hardening (Island of Security), Digital Vault Security Standards, Server Key, Recovery Key, dan Encryption Management.',f:'OS hardened → network isolated → Vault service encrypt data with Server Key → authenticate Client → authorize access.',l:'Master/Recovery key jangan diletakkan sembarangan. Jika Vault tidak bisa start, periksa apakah Server Key (.key) berada di lokasi yang benar.',k:['Vault sebaiknya minimal, isolated, dan tidak domain-joined.','Key management membutuhkan controls dan recovery.'],r:['vault','ha-rto-rpo']},
    {n:'18',c:'operations',t:'System Monitoring',s:'System Monitoring: Health via REST API, Email notification, SIEM integration, SNMP, dan administrative maintenance.',f:'Collect health metrics → normalize/alert → correlate change → remediate → close incident.',l:'Simpan baseline alert (seperti CPU/Memory Vault). Jangan pernah mencoba meng-export secret data via monitoring script.',k:['Monitor availability, latency, capacity, job, concurrency, replication, dan expiry.','Alert harus punya owner, threshold, dan runbook.'],r:['monitoring','dr-vault','ha-rto-rpo']},
    {n:'19',c:'operations',t:'Common Issues',s:'Common Issues: Pola issue user authentication, component connectivity, CPM automatic password management, dan PSM session launch.',f:'Reproduce safely → classify flow (auth/CPM/PSM) → identify scope → collect logs → compare working case → test → validate.',l:'Mulai dari "apa yang berubah". Jangan langsung restart service sembarangan karena akan menghapus cache, memory footprint, dan timestamp.',k:['Authentication, connectivity, CPM, dan PSM harus diisolasi dengan flow masing-masing.','Bedakan symptom dari root cause.'],r:['l2-method','pvwa','cpm','psm']},
    {n:'20',c:'operations',t:'Troubleshooting',s:'Troubleshooting L2: implementasi komunikasi komponen, expected vs actual behavior, log management (Trace), xRay agent, dan escalation package.',f:'Define symptom → map component flow → scope impact → collect logs/IDs → identify cause → validate workaround → escalate (L3).',l:'Sertakan exact timestamp, timezone, version/build, topology, affected component, evidence, dan L3 specific questions.',k:['Evidence harus repeatable, sanitized, dan terhubung ke correlation/session ID.','Escalate dengan pertanyaan spesifik; jangan kirim raw password atau dump log mentah.'],r:['l2-method','vault','audit-recording']}
  ];
  ms.forEach(m=>{
    const sid='IDIRA-PAM-ADMIN-M'+m.n;
    data.sources.push({id:sid,title:'PAM Administration M'+m.n+' - '+m.t,publisher:'IDIRA / CyberArk legacy training',type:'Training PDF (local)',url:'https://docs.cyberark.com/',accessed:'2026-08-15',note:'File lokal: MATERIAL TRAINING/MATERIAL TRAINING'});
    data.entries.push({id:'idira-pam-admin-m'+m.n,category:m.c,term:'Idira PAM Admin M'+m.n+': '+m.t,title:R('M'+m.n+' - '+m.t,'M'+m.n+' - '+m.t),what:R(m.s,m.s),simple:R('Sub-modul belajar administrator PAM.','PAM administrator study sub-module.'),job:A(m.k,m.k),flow:A([m.f],[m.f]),l2:A([m.l],[m.l]),boundary:A(['Bab Rolebook ini menjelaskan konsep, fungsi, alur, dan implikasi operasional dari modul training terkait.'],['This summary/paraphrase only uses the related training PDF.']),failureModes:A([m.l],[m.l]),evidence:A(['Flow: '+m.f,'Catatan L2: '+m.l,'Dokumen sumber: M'+m.n+' - '+m.t],['Flow: '+m.f,'L2 note: '+m.l,'Source document: M'+m.n+' - '+m.t]),sections:[{title:R('Ringkasan modul','Module summary'),paragraphs:[{text:R(m.s,m.s),refs:[sid]}]},{title:R('Konsep yang wajib dipahami','Required concepts'),bullets:A(m.k,m.k)},{title:R('Alur dari dokumen','Document flow'),paragraphs:[{text:R(m.f,m.f),refs:[sid]}]},{title:R('Fokus L2 dari dokumen','L2 focus from the document'),paragraphs:[{text:R(m.l,m.l),refs:[sid]}]}],sources:[sid,'IDIRA-PAM-ADMIN-BUNDLE'],related:m.r,readingTime:14,lastReviewed:'2026-08-15',appliesTo:['PAM Administration training material'],aliases:['CyberArk PAM Admin M'+m.n],_expanded:true});
  });
  data.entries.push({id:'idira-pam-admin-summary',category:'foundation',term:'Idira PAM Admin Training',title:R('Kurikulum Lengkap 20 Bab PAM Administrator (IDIRA)','Complete 20-Chapter PAM Administrator Curriculum (IDIRA)'),what:R('Kurikulum mandiri yang menjelaskan secara lengkap 20 modul PAM Administration: konsep privileged account, user, policy, Safe, account lifecycle, workflow, discovery, PSM, PTA, report, architecture, backup, DR, security, monitoring, common issues, dan troubleshooting.','A self-contained curriculum fully explaining 20 PAM Administration modules: privileged accounts, users, policies, Safes, account lifecycle, workflows, discovery, PSM, PTA, reports, architecture, backup, DR, security, monitoring, common issues, and troubleshooting.'),simple:R('Ikuti M01–M20 langsung di Rolebook; setiap bab memuat definisi, konteks, fungsi, alur, dampak, tugas administrator, investigasi L2, evidence, skenario, serta jawaban knowledge check.','Follow M01–M20 directly in the Rolebook; every chapter includes definitions, context, purpose, flows, impacts, administrator tasks, L2 investigation, evidence, scenarios, and explained knowledge checks.'),job:A(['M01-M04 fondasi; M05-M09 account lifecycle; M10-M13 session/threat/report; M14-M18 architecture/reliability; M19-M20 L2 operations.'],['M01-M04 foundations; M05-M09 account lifecycle; M10-M13 session/threat/report; M14-M18 architecture/reliability; M19-M20 L2 operations.']),flow:A(['Study → map component → match version docs → practice safely → document evidence.'],['Study → map components → match version docs → practice safely → document evidence.']),l2:A(['Gunakan Idira di UI; pahami CyberArk sebagai nama legacy yang masih muncul pada materi, component name, URL, dan docs.'],['Use Idira in the UI; understand CyberArk as a legacy name still present in training, component names, URLs, and docs.']),boundary:A(['Materi belajar mandiri ini menjelaskan sumber training secara menyeluruh, tetapi tindakan produksi tetap harus mengikuti SOP, change control, dan dokumentasi yang sesuai build customer.'],['This self-contained learning material explains the training source comprehensively, but production actions must still follow the customer SOP, change control, and build-specific documentation.']),sources:['IDIRA-PAM-ADMIN-BUNDLE'],related:ms.map(m=>'idira-pam-admin-m'+m.n),aliases:['CyberArk PAM Administration','PAM Admin training'],readingTime:18});
  course.guides.push({id:'idira-pam-admin-guide',group:'Study Guide',title:R('Idira PAM Admin - 20 Modul','Idira PAM Admin - 20 Modules'),trigger:R('Alur belajar resource training PAM Admin baru.','Study path for the new PAM Admin training resource.'),steps:R(['M01-M04: pahami fondasi, user, policy, Platform, dan Safe.','M05-M09: ikuti account lifecycle dari onboarding sampai dependent update.','M10-M13: pisahkan password flow, session flow, threat analytics, dan report.','M14-M18: buat topology, backup/restore plan, DR runbook, security baseline, monitoring matrix.','M19-M20: latihan timeline, evidence, RCA, dan escalation package.'],['M01-M04: learn foundations, users, policies, Platforms, and Safes.','M05-M09: follow account lifecycle from onboarding to dependent update.','M10-M13: separate password, session, threat-analytics, and report flows.','M14-M18: create topology, backup/restore plan, DR runbook, security baseline, and monitoring matrix.','M19-M20: practice timelines, evidence, RCA, and escalation packages.']),evidence:R('Component map, permission matrix, account lifecycle, session flow, DR checklist, monitoring matrix, dan escalation package.','Component map, permission matrix, account lifecycle, session flow, DR checklist, monitoring matrix, and escalation package.'),avoid:R('Menghafal menu tanpa memahami object, dependency, version, scope, dan evidence.','Memorizing menus without understanding objects, dependencies, version, scope, and evidence.')});


  if (!course.parts.some(p => p.id === 'p8')) {
    course.parts.push({
      id: 'p8', order: 8,
      title: R('20 Bab PAM Administrator (IDIRA)', '20 PAM Administrator Chapters (IDIRA)'),
      desc: R('20 bab mandiri lengkap: seluruh konsep, fungsi, flow, dampak konfigurasi, operasi administrator, investigasi L2, evidence, skenario, dan jawaban tersedia langsung di Rolebook.', '20 complete self-contained chapters with concepts, functions, flows, configuration impact, administrator operations, L2 investigation, evidence, scenarios, and answers directly in the Rolebook.')
    });
    ms.forEach((m, idx) => {
      course.modules['idira_m' + m.n] = {
        id: 'idira_m' + m.n,
        title: 'M' + m.n + ' - ' + m.t,
        en: 'M' + m.n + ' - ' + m.t,
        phase: '8. Training PAM Admin',
        phaseEn: '8. Idira PAM Admin',
        lead: m.s,
        leadEn: m.s,
        part: 'p8',
        order: 15 + idx,
        code: 'PAM M' + m.n,
        duration: 15,
        level: 'core',
        tags: ['idira', 'pam', 'admin', 'm' + m.n],
        objId: ['Buka "Library" lalu ketik "M' + m.n + '"', 'Pahami failure modes', 'Catat evidence minimum'],
        objEn: ['Open "Library" and type "M' + m.n + '"', 'Understand failure modes', 'Record minimum evidence'],

        contentId: '<div class="lesson-block"><h2>' + m.t + '</h2><p>Materi Idira (formerly CyberArk) PAM Administrator disusun dalam urutan konsep hingga penerapan L2 troubleshooting.</p><h3>Fondasi Konsep</h3><p>'+m.s+'</p><h3>Alur Inti (Flow)</h3><p>'+m.f+'</p><h3>Panduan Investigasi L2</h3><p>'+m.l+'</p><p>Bab lengkap dimuat langsung di Rolebook dan mencakup konsep, fungsi, alur, keputusan operasional, skenario, serta investigasi L2.</p><div class="callout safe"><strong>Atlas Referensi Lengkap</strong>: Modul ini memiliki catatan <em>failure modes</em>, <em>mental model</em>, dan <em>evidence checklist</em> di Library. Cari topik <code>Idira PAM Admin M'+m.n+'</code> untuk review mendalam.</div></div>',


        contentEn: '<div class="lesson-block"><h2>' + m.t + '</h2><p>The Idira (formerly CyberArk) PAM Administrator material is arranged from concepts to L2 troubleshooting.</p><h3>Conceptual Foundation</h3><p>'+m.s+'</p><h3>Core Flow</h3><p>'+m.f+'</p><h3>L2 Investigation Guide</h3><p>'+m.l+'</p><p>The complete chapter is loaded directly in the Rolebook and covers concepts, functions, flows, operational decisions, scenarios, and L2 investigation.</p><div class="callout safe"><strong>Complete Reference Atlas</strong>: This module has <em>failure modes</em>, <em>mental models</em>, and <em>evidence checklists</em> in the Library. Search for the topic <code>Idira PAM Admin M'+m.n+'</code> for in-depth review.</div></div>',

        exercise: {
          brief: R('Buat rangkuman mental model.', 'Write a mental model summary.'),
          deliverables: R(['Apa flow intinya?', 'Bagaimana ini memengaruhi komponen lain?', 'Log apa yang harus dilihat?'], ['What is the core flow?', 'How does this affect other components?', 'Which logs should be checked?']),
          safety: R('Jangan menyalin PDF berlisensi ke dalam note.', 'Do not copy licensed PDFs into the notes.')
        }
      };
    });
  }



// Re-map detail rendering if IDIRA_TRAINING_DETAILS is loaded
  if (window.IDIRA_TRAINING_DETAILS) {
    ms.forEach((m, idx) => {
      const d = window.IDIRA_TRAINING_DETAILS[m.n];
      if (!d) return;
      const tId = '<div class="lesson-block"><h2>' + m.t + '</h2>' +
        '<div class="callout"><strong>Cakupan materi sumber:</strong> ' + d.pages + '</div>' +
        '<h3>Tujuan Pembelajaran</h3><ul>' + d.objectives.map(x=>'<li>'+x+'</li>').join('') + '</ul>' +
        '<h3>Konsep Inti</h3><ul>' + d.concepts.map(x=>'<li>'+x+'</li>').join('') + '</ul>' +
        '<h3>Alur Komponen (Flow)</h3><ul>' + d.flow.map(x=>'<li>'+x+'</li>').join('') + '</ul>' +
        '<h3>Tugas Administrator</h3><ul>' + d.admin.map(x=>'<li>'+x+'</li>').join('') + '</ul>' +
        '<h3>Panduan Investigasi L2</h3><ul>' + d.l2.map(x=>'<li>'+x+'</li>').join('') + '</ul>' +
        '<h3>Evidence Minimum</h3><ul>' + d.evidence.map(x=>'<li>'+x+'</li>').join('') + '</ul>' +
        '<h3>Kesalahan Umum (Pitfalls)</h3><ul>' + d.pitfalls.map(x=>'<li>'+x+'</li>').join('') + '</ul>' +
        '<h3>Latihan Mandiri</h3><ul>' + d.exercises.map(x=>'<li>'+x+'</li>').join('') + '</ul>' +
        '</div>';

      const entry = data.entries.find(e => e.id === 'idira-pam-admin-m' + m.n);
      if (entry) {
        entry.sections = [
          { title: R('Cakupan materi sumber','Source coverage'), paragraphs: [ {text: R(d.pages, d.pages)} ] },
          { title: R('Tujuan Belajar','Objectives'), bullets: A(d.objectives, d.objectives) },
          { title: R('Konsep Inti','Core Concepts'), bullets: A(d.concepts, d.concepts) },
          { title: R('Alur Komponen','Component Flow'), bullets: A(d.flow, d.flow) },
          { title: R('Checklist Investigasi L2','L2 Investigation Checklist'), bullets: A(d.l2, d.l2) },
          { title: R('Evidence Minimum','Minimum Evidence'), bullets: A(d.evidence, d.evidence) },
          { title: R('Kesalahan Umum (Pitfalls)','Common Pitfalls'), bullets: A(d.pitfalls, d.pitfalls) }
        ];
      }
      if (course.modules['idira_m' + m.n]) {
        course.modules['idira_m' + m.n].contentId = tId;
        course.modules['idira_m' + m.n].contentEn = tId; // Rolebook app will render mixed/ID
      }
    });
  }

  if (window.IDIRA_TRAINING_CHAPTERS) {
    ms.forEach(m => {
      const chapter = window.IDIRA_TRAINING_CHAPTERS[m.n];
      if (!chapter) return;
      const detail = window.IDIRA_TRAINING_DETAILS?.[m.n];
      const expansion = window.IDIRA_TRAINING_EXPANSIONS?.[m.n];
      const sourceId = 'IDIRA-PAM-ADMIN-M' + m.n;
      const chapterHtml = renderChapter(m.n, m, chapter, detail, expansion);
      const module = course.modules['idira_m' + m.n];
      if (module) {
        module.title = 'M' + m.n + ' - ' + chapter.title;
        module.en = module.title;
        module.lead = chapter.subtitle;
        module.leadEn = chapter.subtitle;
        module.duration = chapter.readingTime + (expansion?.extraReadingTime || 0);
        module.objId = chapter.objectives;
        module.objEn = chapter.objectives;
        module.contentId = chapterHtml;
        module.contentEn = chapterHtml;
        module.exercise = {
          brief: R(chapter.scenario?.title || 'Latihan pemahaman mandiri', chapter.scenario?.title || 'Self-study exercise'),
          deliverables: R(detail?.exercises || chapter.summary, detail?.exercises || chapter.summary),
          safety: R(chapter.boundaries.join(' '), chapter.boundaries.join(' '))
        };
      }
      const entry = data.entries.find(item => item.id === 'idira-pam-admin-m' + m.n);
      if (entry) {
        entry.term = 'Idira PAM Admin M' + m.n + ': ' + chapter.title;
        entry.title = R('M' + m.n + ' - ' + chapter.title, 'M' + m.n + ' - ' + chapter.title);
        entry.what = R(chapter.intro[0], chapter.intro[0]);
        entry.simple = R(chapter.mentalModel, chapter.mentalModel);
        entry.job = A(detail?.admin || [], detail?.admin || []);
        entry.flow = A(detail?.flow || [], detail?.flow || []);
        entry.l2 = A(detail?.l2 || [], detail?.l2 || []);
        entry.boundary = A(chapter.boundaries, chapter.boundaries);
        entry.failureModes = A(detail?.pitfalls || [], detail?.pitfalls || []);
        entry.evidence = A(detail?.evidence || [], detail?.evidence || []);
        entry.sections = chapterReferenceSections(chapter, detail, sourceId, expansion);
        entry.readingTime = chapter.readingTime + (expansion?.extraReadingTime || 0);
        entry.lastReviewed = '2026-08-17';
        entry.appliesTo = ['PAM Administration training material (2023)', '699-page source audit', 'Self-contained Indonesian Rolebook chapter'];
        entry.aliases = [...new Set([...(entry.aliases || []),...(expansion?.keywords || [])])];
        entry.versionNote = R('Materi sumber menjelaskan konsep PAM Self-Hosted tahun 2023. Cocokkan menu, parameter, path, dan support matrix dengan build customer sebelum perubahan produksi.', 'The source describes 2023 PAM Self-Hosted concepts. Match menus, parameters, paths, and support matrix to the customer build before production changes.');
        entry._expanded = true;
      }
    });
    const summaryEntry = data.entries.find(item => item.id === 'idira-pam-admin-summary');
    if (summaryEntry) {
      summaryEntry.what = R('Kurikulum ini memuat 20 bab mandiri berbahasa Indonesia yang telah diaudit terhadap 699 halaman material training PAM Administrator, termasuk detail teknis mikro dan analisis penerapan.', 'This curriculum contains 20 self-contained Indonesian chapters audited against all 699 pages of the PAM Administrator training material.');
      summaryEntry.simple = R('Belajar langsung di Rolebook: definisi, fungsi, alur internal, command, parameter, object bawaan, limit, workflow administrator, investigasi L2, evidence, skenario, analisis desain, dan ide pengembangan tersedia tanpa harus membuka slide.', 'Learn directly in the Rolebook without opening the slides.');
      summaryEntry.sections = [
        {title:R('Hasil audit 699 halaman','699-page audit result'),paragraphs:[{text:R('Dua puluh PDF berjumlah 699 halaman telah dicocokkan dengan bab M01–M20. Cover, agenda, divider, summary, exercise, dan resource page dicatat; seluruh teaching point substantif diterjemahkan menjadi penjelasan, sedangkan screenshot UI diterangkan sebagai workflow dan keputusan operasional, bukan disalin pixel demi pixel.','All 699 pages were mapped to M01–M20.')}],bullets:A(ms.map(item=>`M${item.n}: ${window.IDIRA_TRAINING_EXPANSIONS?.[item.n]?.coverageNote || 'Cakupan utama terpetakan.'}`),ms.map(item=>`M${item.n}: source coverage mapped.`))},
        {title:R('Cara membedakan sumber dan analisis','Source versus analysis'),paragraphs:[{text:R('Kotak SOURCE ADDENDUM berisi parafrasa faktual dari material training. Kotak ANALISIS & PENGEMBANGAN ROLEBOOK berisi sintesis, penerapan, dan brainstorming tambahan; label ini mencegah analisis internal disalahartikan sebagai kutipan atau klaim resmi produk.','Source addenda are separated from Rolebook analysis.')}],bullets:A(['Nama file, parameter, command, object, port, limit, dan urutan flow dipertahankan bila diperlukan.','Analisis desain, maturity, automation, dan troubleshooting diberi label bukan kutipan literal slide.','Tindakan produksi tetap harus mengikuti SOP, change control, support matrix, dan build customer.'],['Exact technical identifiers are retained where needed.','Analysis is explicitly labeled as non-source synthesis.','Production actions still require build-specific validation.'])}
      ];
      summaryEntry.readingTime = 55;
      summaryEntry.lastReviewed = '2026-08-17';
    }
  }
})();
