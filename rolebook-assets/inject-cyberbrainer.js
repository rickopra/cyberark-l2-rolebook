(() => {
  const data=window.REFERENCE_DATA,course=window.COURSE_DATA;
  if(!data||!course)return;
  const R=(id,en)=>({id,en}),A=(id,en)=>({id,en}),P=(id,en,refs)=>({text:R(id,en),refs});
  const videos=[
    {sid:'CB-V01',id:'Z7Wu1_AufeE',d:'47:17',t:'CyberArk Tutorial | CyberArk Training | CyberArk Course | CyberBrainer',f:R('Fondasi privileged access, risiko, kontrol PAM, dan roadmap course.','Privileged-access foundations, risks, PAM controls, and course roadmap.'),n:A([
      'Privileged account memiliki kemampuan tinggi seperti install software, mengubah konfigurasi/policy, dan mengelola user pada satu atau banyak system.',
      'Interactive account digunakan manusia langsung; non-interactive account digunakan script, service, scheduled task, atau aplikasi.',
      'Risiko yang dibahas meliputi shared credential, Domain Admin blast radius, hard-coded secret, weak rotation, dan hilangnya accountability.',
      'Kontrol PAM yang diharapkan: centralization, password management, least privilege/RBAC, MFA integration, audit, session monitoring/recording/isolation, dan temporary access.',
      'Roadmap seri mencakup architecture, installation, onboarding, password management, authentication, audit/reporting, troubleshooting, backup, dan DR.'
    ],[
      'Privileged accounts have elevated capabilities such as software installation, configuration or policy changes, and user administration on one or many systems.',
      'Interactive accounts are used directly by people; non-interactive accounts are used by scripts, services, scheduled tasks, or applications.',
      'Risks include shared credentials, Domain Admin blast radius, hard-coded secrets, weak rotation, and lost accountability.',
      'Expected PAM controls include centralization, password management, least privilege/RBAC, MFA integration, audit, session monitoring/recording/isolation, and temporary access.',
      'The series roadmap covers architecture, installation, onboarding, password management, authentication, audit/reporting, troubleshooting, backup, and DR.'
    ])},
    {sid:'CB-V02',id:'I_24M7ZVU5g',d:'41:43',t:'CyberArk Training | CyberArk Course | CyberArk Tool Tutorial | CyberArk Software | CyberBrainer',f:R('Arsitektur klasik Vault, PVWA, CPM, dan PSM.','Classic Vault, PVWA, CPM, and PSM architecture.'),n:A([
      'Vault dijelaskan sebagai repository credential, policy, configuration, log, dan session recording.',
      'PVWA mengambil data dari Vault dan memfilter object berdasarkan authorization user; persona end user, admin, auditor, dan manager dibahas.',
      'CPM menjaga password Vault dan target sinkron melalui Verify, Change, dan Reconcile serta policy rotation/complexity.',
      'PSM memediasi koneksi sebagai jump server agar password tidak ditampilkan dan menyediakan monitoring, recording, serta isolation.',
      'Connect flow: authenticate ke portal, pilih account dan target, lalu route melalui PSM menuju target.'
    ],[
      'The Vault is described as the repository for credentials, policies, configuration, logs, and session recordings.',
      'PVWA retrieves Vault data and filters objects by authorization; end-user, administrator, auditor, and manager personas are discussed.',
      'CPM keeps Vault and target passwords synchronized through Verify, Change, and Reconcile plus rotation and complexity policy.',
      'PSM mediates connections as a jump server so passwords are not disclosed and provides monitoring, recording, and isolation.',
      'The Connect flow is: authenticate to the portal, choose account and target, then route through PSM to the target.'
    ])},
    {sid:'CB-V03',id:'Zlso8vyZshM',d:'28:44',t:'CyberArk Training | CyberArk Vault | CyberArk Tutorial | CyberArk Course | CyberBrainer',f:R('Digital Vault, isolation, hardening, dan komunikasi network.','Digital Vault isolation, hardening, and network communication.'),n:A([
      'Vault diperlakukan sebagai security appliance; administrator tidak mengedit database table secara langsung.',
      'Lab memakai Windows Server dan menyebut minimum 2012; supported OS aktual wajib mengikuti compatibility matrix release.',
      'Vault ditempatkan pada network zone terisolasi dengan interactive access sangat terbatas; physical server disebut rekomendasi tetapi VM digunakan pada lab.',
      'Unneeded software, protocol, dan service dibatasi; exception monitoring/AV/EDR harus mengikuti hardening guide resmi.',
      'TCP 1858 disebut sebagai channel component-to-Vault pada topology demo; L2 tetap harus validasi direction, route, dan firewall state.'
    ],[
      'The Vault is treated as a security appliance; administrators do not edit database tables directly.',
      'The lab uses Windows Server and mentions 2012 as a minimum; actual supported OS versions must follow the release compatibility matrix.',
      'The Vault is isolated with highly restricted access; a physical server is recommended, although the lab uses a VM.',
      'Unneeded software, protocols, and services are restricted; monitoring, AV, or EDR exceptions must follow official hardening guidance.',
      'TCP 1858 is identified as the component-to-Vault channel in the demo topology; L2 must still validate direction, route, and firewall state.'
    ])},
    {sid:'CB-V04',id:'Wxp9sUVpPp4',d:'23:33',t:'CyberArk Tutorial | CyberArk Online Training | CyberArk Software | CyberArk Course | CyberBrainer',f:R('Service Digital Vault dan fungsi troubleshooting.','Digital Vault services and troubleshooting roles.'),n:A([
      'Video membedakan mandatory service dari optional/enhancement service.',
      'PrivateArk Database memelihara database internal; PrivateArk Server memelihara event/log dengan italog.log sebagai contoh.',
      'CyberArk Logic Container menjalankan process/parameter dari configuration.',
      'Hardened Windows Firewall menjaga isolation/rule; Event Notification Engine mengirim alert melalui SMTP integration.',
      'Nama service, log path, dan klasifikasi service bersifat version-sensitive; kumpulkan state, dependency, exact log, dan recent change sebelum restart.'
    ],[
      'The video separates mandatory services from optional or enhancement services.',
      'PrivateArk Database maintains the internal database; PrivateArk Server maintains events and logs, with italog.log as an example.',
      'CyberArk Logic Container executes processes and parameters from configuration.',
      'Hardened Windows Firewall preserves isolation and rules; Event Notification Engine sends alerts through SMTP integration.',
      'Service names, log paths, and classifications are version-sensitive; collect state, dependencies, exact logs, and recent changes before restart.'
    ])},
    {sid:'CB-V05',id:'KNF1TCZny3I',d:'1:09:12',t:'Cyberark Training | Cyberark Tutorial for beginners | Cyberark Course | CyberBrainer',f:R('Privileged identities, attack path, dan tujuan PAM.','Privileged identities, attack paths, and PAM objectives.'),n:A([
      'Privileged identity dibagi menjadi elevated personal, shared, dan application account.',
      'Elevated personal memisahkan daily dan admin ID; shared account dipakai lintas shift; application account tertanam pada automation.',
      'Weak password dan hash dikaitkan dengan brute force, Pass-the-Hash, dan Golden Ticket sebagai ilustrasi impact domain.',
      'Attack path: phishing/insider entry, penetration, reconnaissance, privilege escalation, lateral movement, disruption, dan exfiltration.',
      'PAM mengurangi exposure dengan randomized rotation; session management mengontrol koneksi/aktivitas sedangkan credential management menjaga lifecycle secret.'
    ],[
      'Privileged identities are divided into elevated personal, shared, and application accounts.',
      'Elevated personal separates daily and admin IDs; shared accounts span shifts; application accounts are embedded in automation.',
      'Weak passwords and hashes are associated with brute force, Pass-the-Hash, and Golden Ticket as a domain-impact illustration.',
      'The attack path is phishing or insider entry, penetration, reconnaissance, privilege escalation, lateral movement, disruption, and exfiltration.',
      'PAM reduces exposure through randomized rotation; session management controls connections and activity while credential management protects the secret lifecycle.'
    ])},
    {sid:'CB-V06',id:'VI19t0o7DtU',d:'57:25',t:'Cyberark Tutorial | Cyberark Online Training | Cyberark Course Content | CyberBrainer',f:R('PrivateArk client, Safe, hardening, dan instalasi Vault.','PrivateArk client, Safes, hardening, and Vault installation.'),n:A([
      'PrivateArk console digunakan untuk mengakses Vault; Vault dianalogikan strong room dan Safe sebagai locker dengan membership/segregation of duties.',
      'Built-in user yang disebut: Administrator, Master, Operator, dan Backup; key material harus dianggap sangat sensitif.',
      'Komponen CPM, PVWA, PSM, PSMP, OPM, dan AIM digambarkan berkomunikasi ke Vault.',
      'NIC hardening menghapus protocol yang tidak dibutuhkan; installer standalone menempatkan program dan Safe data terpisah dari OS drive.',
      'Prerequisite demo: license file, operator key/CD, server/recovery key, static IP, dan storage path.'
    ],[
      'PrivateArk console is used to access the Vault; the Vault is compared to a strong room and a Safe to a locker with membership and segregation of duties.',
      'Named built-in users include Administrator, Master, Operator, and Backup; key material must be treated as highly sensitive.',
      'CPM, PVWA, PSM, PSMP, OPM, and AIM are shown communicating with the Vault.',
      'NIC hardening removes unnecessary protocols; the standalone installer separates program and Safe data from the OS drive.',
      'Demo prerequisites include license file, operator key/CD, server or recovery keys, static IP, and storage path.'
    ])},
    {sid:'CB-V07',id:'26v9lYU0DQU',d:'32:15',t:'Cyberark Training Videos | Cyberark Tutorial for beginners | Cyberark Full Course | CyberBrainer',f:R('Onboarding via PVWA, CSV upload, REST, dan reconcile account.','Onboarding through PVWA, CSV upload, REST, and reconcile accounts.'),n:A([
      'Onboarding path: manual PVWA, bulk CSV Password Upload Utility, dan REST API/PowerShell automation.',
      'Bulk utility demo membutuhkan TCP 1858 langsung ke Vault; REST path menggunakan HTTPS ke PVWA.',
      'Field yang dibahas: username, address, Safe, Platform/Policy ID, device type, password, non-standard port, dan unique object name.',
      'Platform display name dan ID dapat berbeda; automation harus memakai ID yang benar.',
      'Reconcile account adalah credential terpisah untuk mereset password target saat stored password out-of-sync; bulk onboarding perlu pilot dan Verify/Connect test.'
    ],[
      'Onboarding paths include manual PVWA, bulk CSV Password Upload Utility, and REST API or PowerShell automation.',
      'The bulk utility demo requires direct TCP 1858 to the Vault; the REST path uses HTTPS to PVWA.',
      'Discussed fields include username, address, Safe, Platform or Policy ID, device type, password, non-standard port, and unique object name.',
      'A Platform display name and ID can differ; automation must use the correct ID.',
      'A reconcile account is a separate credential used when the stored password is out of sync; bulk onboarding needs a pilot and Verify/Connect tests.'
    ])},
    {sid:'CB-V08',id:'rOoMTzX4Elo',d:'51:10',t:'Training Cyberark | Cyberark Online training | Cyberark Tutorial | Cyberark Course | CyberBrainer',f:R('Konsep cluster Vault dan maintenance HA.','Vault-cluster concepts and HA maintenance.'),n:A([
      'Cluster Vault diposisikan sebagai local HA untuk patching/maintenance tanpa DR failover.',
      'Public network melayani component access; private network dipakai untuk komunikasi antar-node.',
      'VIP berpindah ke active node; shared storage menyimpan Safe data dan quorum membantu state decision.',
      'Maintenance pattern: switch role, stop cluster service pada node target, patch/reboot, lalu kembali sebagai passive.',
      'HA cluster tidak menggantikan DR, backup, atau runbook RTO/RPO untuk site failure.'
    ],[
      'A Vault cluster is positioned as local HA for patching or maintenance without a DR failover.',
      'The public network serves component access; the private network supports inter-node communication.',
      'The VIP moves to the active node; shared storage holds Safe data and quorum assists state decisions.',
      'Maintenance pattern: switch role, stop cluster service on the target node, patch/reboot, and return as passive.',
      'An HA cluster does not replace DR, backup, or RTO/RPO runbooks for site failure.'
    ])},
    {sid:'CB-V09',id:'1S-8agm7Yhs',d:'1:22:17',t:'Cyberark Tutorial | Cyberark Online Training | Cyberark Training and Certification | CyberBrainer',f:R('Demo instalasi dan pengelolaan cluster Vault.','Vault-cluster installation and management demo.'),n:A([
      'Demo manual failover mengamati active/passive node, VIP, quorum, dan storage state.',
      'Operator key/key material dari node pertama digunakan konsisten pada node kedua; quorum/shared disk dibawa online sesuai flow.',
      'DB Secure error pada firewall rule installation dipicu comment square-bracket pada demo; trainer menghapusnya sebagai workaround.',
      'Patching dilakukan setelah workload dipindahkan, kemudian node kembali sebagai passive setelah reboot.',
      'Validation harus mencakup login, account visibility, password operation, session launch, recording, dan audit; temuan syntax tersebut version-sensitive.'
    ],[
      'The manual failover demo observes active/passive nodes, VIP, quorum, and storage state.',
      'The operator key and key material from node one are used consistently on node two; quorum and shared disk follow the lab flow.',
      'A DB Secure error during firewall rule installation is linked to square-bracket comments; the trainer removes them as a workaround.',
      'Patching occurs after workload moves away, and the node returns as passive after reboot.',
      'Validation covers login, account visibility, password operations, session launch, recording, and audit; the syntax finding is version-sensitive.'
    ])},
    {sid:'CB-V10',id:'UfrDuqh736Y',d:'52:09',t:'Cyberark Training | Cyberark Tutorial Videos | Cyberark Certification | Cyberark | CyberBrainer',f:R('Full backup dan Vault restoration.','Full backup and Vault restoration.'),n:A([
      'Backup user dan file backup.ini digunakan untuk menjalankan utility full backup; output/log dan backup location harus diverifikasi.',
      'Restore target wajib memakai versi Vault dan key material yang persis sama dengan source backup.',
      'Operator user menjalankan CAVaultManager RecoverBackupFiles lalu RestoreDB; recovery private-key path diperbarui pada DBParm.',
      'Setelah restore, component connections dan workflow PVWA/CPM/PSM harus divalidasi kembali.',
      'Recovery drill harus disiapkan sebelum disaster, dalam environment terpisah, dengan runbook dan rollback.'
    ],[
      'The Backup user and backup.ini are used for a full backup; output, logs, and backup location must be verified.',
      'The restore target strictly requires the same Vault version and key material as the backup source.',
      'The Operator runs CAVaultManager RecoverBackupFiles followed by RestoreDB; the recovery private-key path is updated in DBParm.',
      'After restore, component connections and PVWA/CPM/PSM workflows must be validated again.',
      'A recovery drill must be prepared before disaster in an isolated environment with a runbook and rollback.'
    ])}
  ];

  const addSource=s=>{const old=data.sources.find(x=>x.id===s.id);if(old)Object.assign(old,s);else data.sources.push(s)};
  addSource({id:'CYBERBRAINER-10V',title:'CyberBrainer CyberArk Tutorial Videos for Beginners (10-video playlist)',publisher:'CyberBrainer',type:'Supplemental video series',url:'https://www.youtube.com/playlist?list=PLVNl9sThbR3G-W-wI0ik7gMHrcMypBraN',accessed:'2026-08-11'});
  videos.forEach(v=>addSource({id:v.sid,title:`${v.t} (${v.d})`,publisher:'CyberBrainer',type:'Supplemental video',url:`https://www.youtube.com/watch?v=${v.id}&list=PLVNl9sThbR3G-W-wI0ik7gMHrcMypBraN`,accessed:'2026-08-11'}));
  const sections=videos.map((v,i)=>({title:R(`Video ${i+1} · ${v.d} · ${v.t}`,`Video ${i+1} · ${v.d} · ${v.t}`),paragraphs:[P(v.f.id,v.f.en,[v.sid])],bullets:v.n}));
  const sources=['CYBERBRAINER-10V',...videos.map(v=>v.sid),'CA-DOCS-15.2','CA-INSTALL-15.2','CA-REST-15.2','LOCAL-RICKO'];
  const entry={
    id:'cyberbrainer-video-series',category:'operations',term:'CyberBrainer 10-video series',
    title:R('Companion lengkap video CyberBrainer','Complete CyberBrainer video companion'),
    what:R('Catatan belajar terstruktur dan diparafrasekan dari seluruh 10 video dalam playlist CyberBrainer. Materi mempertahankan detail konseptual, demo, dependency, error, dan langkah operasional yang tampak pada transcript, tanpa menyalin transcript secara verbatim.','Structured, paraphrased study notes covering all 10 videos in the CyberBrainer playlist. The material preserves conceptual, demo, dependency, error, and operational details visible in the transcripts without reproducing the transcripts verbatim.'),
    simple:R('Gunakan artikel ini sebagai pendamping menonton: pahami mental model dari video, lalu validasi command, path, OS, port, service, dan topology terhadap versi customer.','Use this article as a viewing companion: learn the mental model from the videos, then validate commands, paths, OS versions, ports, services, and topology against the customer version.'),
    job:A(['Memberi index detail untuk semua 10 video dan menghubungkannya dengan istilah rolebook.','Membedakan konsep yang stabil dari langkah lab atau klaim spesifik versi.','Menjadikan materi video dapat dicari melalui Library dan dapat dibaca sebagai modul.'],['Provide a detailed index for all 10 videos and connect them with rolebook terminology.','Separate stable concepts from lab steps or version-specific claims.','Make the video material searchable in the Library and readable as a module.']),
    flow:A(['Video foundation → architecture → Vault hardening/services → Safe/install → onboarding → cluster → backup/restore → cross-check documentation.'],['Video foundation → architecture → Vault hardening/services → Safe/install → onboarding → cluster → backup/restore → documentation cross-check.']),
    l2:A(['Gunakan exact error, timestamp, component, topology, dan current role sebelum menerapkan clue dari demo.','Treat istilah hasil auto-caption sebagai kandidat; cocokkan dengan UI, log, installer, atau dokumentasi.','Jangan menjalankan backup restore, cluster failover, firewall change, atau key operation tanpa runbook dan approval.'],['Use the exact error, timestamp, component, topology, and current role before applying a clue from a demo.','Treat auto-caption terms as candidates and match them against the UI, logs, installer, or documentation.','Do not run backup restore, cluster failover, firewall changes, or key operations without a runbook and approval.']),
    boundary:A(['CyberBrainer adalah sumber supplemental, bukan dokumentasi vendor resmi.','Auto-generated captions memiliki salah dengar seperti Vault/world, PVWA, CPM, PSM, dan nama utility.','Detail Windows Server 2012, service name, database engine, firewall syntax, key path, serta command merupakan version-sensitive.','Dokumentasi CyberArk untuk edition/build customer dan SOP organisasi selalu memiliki precedence.'],['CyberBrainer is a supplemental source, not official vendor documentation.','Auto-generated captions contain recognition errors around Vault, PVWA, CPM, PSM, and utility names.','Windows Server 2012, service names, database-engine wording, firewall syntax, key paths, and commands are version-sensitive.','CyberArk documentation for the customer edition/build and organizational SOP always take precedence.']),
    related:['pam','identity-account-credential','vault','pvwa','cpm','psm','safe','platform','onboarding','reconcile','dr-vault','ha-rto-rpo'],
    aliases:['CyberBrainer','CyberBrainer playlist','video tutorial CyberArk'],sources,readingTime:85,lastReviewed:'2026-08-11',
    appliesTo:['PAM Self-Hosted concepts','Legacy/classic lab demonstrations','Version validation required'],
    versionNote:R('Artikel memisahkan apa yang video ajarkan dari apa yang aman dieksekusi. Nama menu, supported OS, service, syntax, port direction, key handling, dan recovery procedure wajib dicocokkan dengan exact release dan runbook customer.','This article separates what the videos teach from what is safe to execute. Menu names, supported OS versions, services, syntax, port direction, key handling, and recovery procedures must be checked against the exact release and customer runbook.'),
    failureModes:A(['Menerapkan langkah video lama pada build baru tanpa compatibility check.','Menganggap auto-caption sebagai nama command atau file yang pasti benar.','Melakukan bulk onboarding tanpa pilot dan owner/dependency inventory.','Menyamakan HA cluster dengan DR atau backup.','Menjalankan restore atau failover hanya karena satu account/session gagal.'],['Applying an old-video procedure to a new build without a compatibility check.','Treating auto-caption output as an authoritative command or filename.','Running bulk onboarding without a pilot and owner/dependency inventory.','Treating HA clusters as equivalent to DR or backup.','Running restore or failover because one account or session failed.']),
    evidence:A(['Video number dan topik yang dijadikan clue.','Exact product edition, version/build, topology, dan active/passive role.','Timestamp/timezone, exact error, component log, dan recent change.','Approved runbook, backup/replication status, rollback, dan validation result.'],['Video number and topic used as a clue.','Exact product edition, version/build, topology, and active/passive role.','Timestamp/timezone, exact error, component logs, and recent changes.','Approved runbook, backup/replication status, rollback, and validation results.']),
    sections:[
      {title:R('Cara memakai companion ini','How to use this companion'),paragraphs:[P('Playlist berdurasi sekitar delapan jam dan transcript yang diambil berasal dari subtitle otomatis. Catatan di bawah mengelompokkan setiap detail teknis menjadi konsep, langkah demo, dan warning operasional.','The playlist runs for roughly eight hours and the captured transcripts come from automatic subtitles. The notes below group technical details into concepts, demo steps, and operational warnings.',['CYBERBRAINER-10V']),P('Jangan menyalin password contoh, IP lab, path, atau urutan command ke production. Gunakan video untuk memahami dependency dan pertanyaan investigasi; gunakan dokumentasi resmi untuk execution.','Do not copy sample passwords, lab IPs, paths, or command sequences into production. Use the videos to understand dependencies and investigative questions; use official documentation for execution.',['CA-DOCS-15.2','CA-INSTALL-15.2','CA-REST-15.2'])]},
      ...sections,
      {title:R('Peta lintas-video untuk L2','Cross-video L2 map'),paragraphs:[P('Semua video dapat diringkas menjadi empat flow yang harus dipisahkan saat troubleshooting.','All videos can be reduced to four flows that must remain separate during troubleshooting.',['CYBERBRAINER-10V','CA-DOCS-15.2'])],bullets:A(['Access flow: requester → authentication/MFA → Safe authorization → account visibility/retrieve/connect.','Session flow: PVWA/request → PSM/PSMP mediation → connection component/client → target → monitoring/recording.','Credential flow: account object → Platform policy → CPM Verify/Change/Reconcile → target state → audit.','Reliability flow: health detection → HA role decision atau DR event → approved runbook → restore/failover → end-to-end validation.','Jika hanya satu user/account/target gagal, isolasi object dan authorization sebelum menyentuh Vault HA/DR.','Jika banyak workflow gagal serentak, kumpulkan component health, Vault connectivity, time correlation, dan recent change sebelum restart.'],['Access flow: requester → authentication/MFA → Safe authorization → account visibility/retrieve/connect.','Session flow: PVWA/request → PSM/PSMP mediation → connection component/client → target → monitoring/recording.','Credential flow: account object → Platform policy → CPM Verify/Change/Reconcile → target state → audit.','Reliability flow: health detection → HA role decision or DR event → approved runbook → restore/failover → end-to-end validation.','If only one user, account, or target fails, isolate the object and authorization before touching Vault HA/DR.','If many workflows fail together, collect component health, Vault connectivity, time correlation, and recent changes before restarting.'])}
    ]
  };
  const idx=data.entries.findIndex(x=>x.id===entry.id);
  if(idx>=0)data.entries[idx]=entry; else data.entries.push(entry);
  if(!data.coverage.some(x=>x[2]===entry.id))data.coverage.push(['CyberBrainer videos','Companion 10 video CyberBrainer',entry.id]);

  if(!course.parts.some(p=>p.id==='p7'))course.parts.push({id:'p7',order:7,title:R('Video Companion','Video Companion'),desc:R('Pendamping terstruktur untuk seluruh playlist CyberBrainer.','A structured companion for the complete CyberBrainer playlist.')});
  
  const content=l=>{
    const intro=l==='id'?'Materi ini adalah catatan paraphrase dari 10 video, bukan transcript verbatim atau prosedur resmi. Setiap detail operasional harus divalidasi terhadap edition, build, topology, dan runbook customer.':'This material is a paraphrased companion to 10 videos, not a verbatim transcript or official procedure. Validate every operational detail against the customer edition, build, topology, and runbook.';
    const btn=l==='id'?'Buka video':'Open video';
    const s=videos.map((v,i)=>`<section class="chapter-section"><div class="eyebrow">VIDEO ${String(i+1).padStart(2,'0')} · ${v.d}</div><h3>${v.t}</h3><p>${v.f[l]}</p><ul>${v.n[l].map(x=>`<li>${x}</li>`).join('')}</ul><p><a class="small-btn" href="https://www.youtube.com/watch?v=${v.id}&list=PLVNl9sThbR3G-W-wI0ik7gMHrcMypBraN" target="_blank" rel="noreferrer">${btn} ↗</a></p></section>`).join('');
    return `<div class="lesson-block"><h2>CyberBrainer 10-Video Companion</h2><div class="callout safe"><strong>${l==='id'?'Status sumber:':'Source status:'}</strong> ${intro}</div>${s}</div>`;
  };
  course.modules.m15={
    id:'m15',title:'CyberBrainer 10-Video Companion',en:'CyberBrainer 10-Video Companion',phase:'7. Video Companion',phaseEn:'7. Video Companion',
    lead:'Catatan detail per video: foundations, Vault, services, Safe, onboarding, cluster, backup, dan restore.',
    leadEn:'Detailed per-video notes covering foundations, Vault, services, Safes, onboarding, clusters, backup, and restore.',
    objId:['Menyusun mental model dari seluruh playlist','Membedakan concept, demo, dan version-sensitive procedure','Mengubah video menjadi checklist investigasi L2'],
    objEn:['Build a mental model from the complete playlist','Separate concepts, demos, and version-sensitive procedures','Turn video material into an L2 investigation checklist'],
    contentId:content('id'),contentEn:content('en'),part:'p7',order:15,duration:110,level:'L2',tags:['CyberBrainer','Vault','onboarding','cluster','backup','restore'],
    exercise:{
      brief:R('Pilih satu video dan ubah materinya menjadi evidence-first runbook tanpa menyalin langkah lab secara buta.','Choose one video and turn its material into an evidence-first runbook without blindly copying lab steps.'),
      deliverables:A(['Scope dan failure domain yang dibahas video.','Dependency, log/evidence, version checks, approval, rollback, dan validation.','Daftar klaim yang harus dikonfirmasi pada dokumentasi resmi.'],['The scope and failure domain covered by the video.','Dependencies, logs/evidence, version checks, approval, rollback, and validation.','A list of claims that must be confirmed in official documentation.']),
      safety:R('Jangan menjalankan cluster, firewall, key, backup, atau restore action pada production untuk menyelesaikan exercise.','Do not execute cluster, firewall, key, backup, or restore actions in production for this exercise.')
    }
  };
  data.modulePrerequisites=data.modulePrerequisites||{};
  data.modulePrerequisites.m15={required:['cyberbrainer-video-series'],recommended:['pam','vault','onboarding','ha-rto-rpo']};
})();
