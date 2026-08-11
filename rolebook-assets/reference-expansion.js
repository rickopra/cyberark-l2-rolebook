(() => {
  const data=window.REFERENCE_DATA;
  if(!data?.entries)return;
  const R=(id,en)=>({id,en});
  const P=(id,en,refs)=>({text:R(id,en),refs});
  const list=(value,lang)=>Array.isArray(value)?value.join(lang==='id'?' ':' '):(value||'');
  const sourceFor=entry=>entry.sources?.length?entry.sources:['CA-DOCS-15.2','LOCAL-RICKO'];
  data.entries.forEach(entry=>{
    if(entry._expanded) return;
    const refs=sourceFor(entry), flowId=list(entry.flow,'id'), flowEn=list(entry.flow,'en'), l2Id=list(entry.l2,'id'), l2En=list(entry.l2,'en'), boundaryId=list(entry.boundary,'id'), boundaryEn=list(entry.boundary,'en');
    const category=entry.category;
    const scopeId=category==='component'?'komponen dan dependency-nya':category==='object'?'object, permission, dan policy yang berlaku':category==='flow'?'urutan workflow dan state object':category==='operations'?'evidence, impact, dan owner':'layer pertama yang gagal';
    const scopeEn=category==='component'?'the component and its dependencies':category==='object'?'the object, permissions, and applicable policy':category==='flow'?'the workflow order and object state':category==='operations'?'evidence, impact, and ownership':'the first failing layer';
    entry.sections=(entry.sections||[]).concat([
      {title:R('Fondasi dan boundary','Foundations and boundaries'),paragraphs:[
        P(`Sebelum memikirkan menu atau command, tentukan masalah apa yang sebenarnya diselesaikan oleh ${entry.term}. ${entry.what.id} Dalam arsitektur PAM, konsep ini harus dipahami bersama identity peminta, object yang dilindungi, target/resource, policy, dan evidence. Jika salah satu unsur hilang, penjelasan ticket akan mudah berubah menjadi asumsi.`,
        `Before thinking about menus or commands, define the problem that ${entry.term} is meant to solve. ${entry.what.en} In a PAM architecture, this concept must be understood together with the requesting identity, protected object, target/resource, policy, and evidence. If one element is missing, the ticket explanation can turn into an assumption.`,refs),
        P(`Batasan juga penting. ${boundaryId} L2 tidak boleh mengubah production hanya karena suatu tindakan terlihat teknis dan sederhana. Pisahkan diagnosis, recommendation, approval, execution, dan validation. Detail implementasi tetap harus mengikuti edition, build, topology, serta runbook customer.`,
        `Boundaries matter as well. ${boundaryEn} L2 must not change production merely because an action looks technical and simple. Separate diagnosis, recommendation, approval, execution, and validation. Implementation details must follow the edition, build, topology, and customer runbook.`,['NIST-800-61R3','LOCAL-RICKO'])
      ]},
      {title:R('Dari request ke target','From request to target'),paragraphs:[
        P(`Mental model flow untuk topik ini adalah: ${flowId} Jangan hanya menghafal panahnya. Untuk setiap panah, tanyakan siapa initiator-nya, component mana yang mengerjakan, identity apa yang dipakai, object apa yang dibaca, target mana yang dihubungi, dan evidence apa yang dihasilkan. Itulah cara membedakan komponen yang benar-benar gagal dari komponen yang hanya terlihat di layar.`,
        `The flow mental model for this topic is: ${flowEn} Do not merely memorize the arrows. For every arrow, ask who initiates it, which component performs it, which identity is used, which object is read, which target is contacted, and what evidence is produced. This is how you distinguish the component that actually failed from the component merely visible on screen.`,refs),
        P(`Ketika flow berhenti, catat titik terakhir yang berhasil dan titik pertama yang gagal. ${scopeId} menjadi batas investigasi awal, bukan alasan untuk langsung menunjuk seluruh platform sebagai penyebab.`,
        `When the flow stops, record the last successful point and the first failing point. ${scopeEn} becomes the initial investigation boundary; it is not a reason to blame the entire platform immediately.`,['NIST-800-61R3','LOCAL-RICKO'])
      ]},
      {title:R('Worked example untuk pemula','Beginner worked example'),paragraphs:[
        P(`Contoh kasus: seorang user melaporkan bahwa ${entry.term} “tidak bekerja”. Jangan mulai dengan restart. Tanyakan workflow yang dilakukan, identity yang dipakai, object/target yang dipilih, hasil yang diharapkan, pesan error persis, scope user lain yang terdampak, kapan terakhir berhasil, dan perubahan apa yang terjadi sebelumnya. Setelah itu bandingkan dengan satu jalur yang terbukti bekerja.`,
        `Example case: a user reports that ${entry.term} “does not work”. Do not start with a restart. Ask which workflow was attempted, which identity was used, which object/target was selected, the expected result, the exact error, the scope of other affected users, when it last worked, and what changed beforehand. Then compare it with one path proven to work.`,['NIST-800-61R3','LOCAL-RICKO']),
        P(`Jika hanya satu account atau satu target yang gagal, hipotesis awal biasanya berada di ${scopeId}, object state, target policy, atau jalur spesifik—bukan outage luas. Jika banyak user, Safe, component, atau target gagal pada waktu yang sama, naikkan kemungkinan shared dependency dan lakukan impact assessment sebelum tindakan apa pun.`,
        `If only one account or target fails, the initial hypothesis is usually within ${scopeEn}, object state, target policy, or a specific path—not a broad outage. If many users, Safes, components, or targets fail at the same time, increase the likelihood of a shared dependency and perform impact assessment before any action.`,['LOCAL-RICKO'])
      ]},
      {title:R('Checklist evidence L2','L2 evidence checklist'),paragraphs:[
        P(`Evidence minimum yang aman: ${l2Id} Jangan meminta secret, private key, token, raw assertion, atau customer data yang tidak diperlukan. Gunakan timestamp beserta timezone, exact error, sanitized log, scope, version/topology, affected object, recent change, dan hasil setiap percobaan.`,
        `Minimum safe evidence: ${l2En} Do not request secrets, private keys, tokens, raw assertions, or unnecessary customer data. Use timestamps with timezone, exact errors, sanitized logs, scope, version/topology, affected object, recent changes, and the result of every attempt.`,['NIST-800-61R3','LOCAL-RICKO']),
        P(`Tutup analisis dengan status yang dapat dipahami: confirmed root cause, probable cause, known error, workaround approved, blocked by missing evidence, atau escalation yang membutuhkan owner lain. Hindari kalimat “sudah dicek” tanpa menyebut apa yang dicek dan hasilnya.`,
        `Close the analysis with an understandable status: confirmed root cause, probable cause, known error, approved workaround, blocked by missing evidence, or escalation requiring another owner. Avoid saying “checked” without stating what was checked and what it showed.`,['NIST-800-61R3'])
      ]}
    ]);
    entry.readingTime=(entry.readingTime||18)+12;
    entry._expanded=true;
  });
})();
