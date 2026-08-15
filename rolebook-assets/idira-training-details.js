window.IDIRA_TRAINING_DETAILS = {
"01":{
  "pages": "PDF pp. 4-7, 9-14, 16-22, 24-38, 40-41.",
  "objectives": [
    "Definisikan privileged account dan bedakan identity, user, account, credential.",
    "Jelaskan credential theft, reconnaissance, lateral movement, privilege escalation.",
    "Petakan Vault, PVWA, CPM, PSM, PTA, interface, utilities.",
    "Jelaskan isolate, monitor/record, dan remediate."
  ],
  "concepts": [
    "Privileged account dapat mengubah atau berdampak pada layanan bisnis; contoh PDF: Windows Administrator, UNIX root, Oracle SYS, Cisco enable.",
    "Privilege juga dapat muncul pada vendor, developer, aplikasi, robot, dan business identity.",
    "CPM mengelola credential lifecycle; PSM menjadi proxy sesi; Vault menyimpan dan mengotorisasi; PVWA menjadi interface; PTA menganalisis risiko.",
    "Protection: secured credential, authorized user, accountability, isolation, limited scope. Detection: monitoring, alerts. Response: suspend, terminate, rotate."
  ],
  "flow": [
    "User authenticate → Vault/Safe/account authorization → CPM credential flow atau PSM session flow → target → recording/audit/PTA.",
    "Sebelum troubleshooting, tentukan apakah aktivitas gagal adalah login, retrieve, connect, Verify, Change, Reconcile, atau monitoring."
  ],
  "admin": [
    "Gambarkan topology dan komponen.",
    "Pastikan direct target connection tidak menjadi bypass.",
    "Hubungkan account dengan policy, Safe, Platform, owner.",
    "Cocokkan detail dengan version/build dan SOP."
  ],
  "l2": [
    "Tentukan user/account/target dan exact timestamp.",
    "Pisahkan authentication, authorization, credential, session, target connectivity.",
    "Korelasikan PVWA, CPM/PSM, Vault audit, PTA.",
    "Jangan restart sebelum evidence dicatat."
  ],
  "evidence": [
    "Topology dan component version/build.",
    "User, Safe, Platform, account, target, timestamp/timezone.",
    "Exact error, correlation/session ID, audit, log."
  ],
  "pitfalls": [
    "Menganggap PAM hanya password vault.",
    "Mencampur account object dengan requester.",
    "Mengambil credential langsung dari target.",
    "Menyimpulkan root cause sebelum menentukan flow."
  ],
  "exercises": [
    "Buat component map PVWA → Vault → CPM/PSM → target.",
    "Klasifikasikan ticket ke credential/session flow.",
    "Tulis evidence untuk login sukses tetapi Connect gagal."
  ]
},
"02":{
  "pages": "PDF pp. 4-14, 15-34, 35-45, 46-51, 52-54.",
  "objectives": [
    "Bedakan User, Account, internal/transparent user/group, predefined identity.",
    "Kelola user/group di PrivateArk Client dan PVWA.",
    "Bedakan Vault authorizations, Safe authorizations, PVWA permissions.",
    "Jelaskan predefined dan custom LDAP directory mapping."
  ],
  "concepts": [
    "User adalah requester; Account adalah object credential pada target.",
    "Internal user/group dikelola Vault; transparent user/group berasal external directory.",
    "Predefined identity memiliki fungsi/default authorization berbeda.",
    "Vault authorization berlaku di level Vault; Safe permission mengatur object di Safe.",
    "PVWA tabs/buttons bergantung group membership dan permission.",
    "Directory map menentukan provisioning dan authorization user/group."
  ],
  "flow": [
    "Authentication → LDAP mapping → Vault authorization → Safe membership → PVWA permission → action.",
    "Custom mapping: siapkan group/attribute → mapping → test login/provision → verifikasi authorization/Safe."
  ],
  "admin": [
    "Kelola create, suspend/unsuspend, update, group membership, audit.",
    "Review automatic Safe membership.",
    "Dokumentasikan mapping attribute, group, location, authorization.",
    "Uji mapping dengan akun test."
  ],
  "l2": [
    "Bedakan password/network/SAML/LDAP dari user suspended.",
    "Jika login sukses tetapi tab/account hilang, cek group, Vault, Safe, PVWA.",
    "Cek ITAlog dan status user sebelum mengubah mapping.",
    "Jangan beri authorization luas untuk satu object."
  ],
  "evidence": [
    "Username, directory group/attribute, mapping, login time.",
    "Vault/Safe/PVWA permission dan exact error.",
    "ITAlog/audit dan hasil user pembanding."
  ],
  "pitfalls": [
    "Mengira group membership memberi semua Vault authorization.",
    "Menyamakan visibility dengan Retrieve/Use.",
    "Mengubah predefined mapping tanpa impact review.",
    "Tidak membedakan suspended dan unprovisioned."
  ],
  "exercises": [
    "Buat matriks User → Vault → Safe → PVWA.",
    "Analisis login sukses tetapi account tidak terlihat.",
    "Review custom LDAP mapping dengan least privilege."
  ]
},
"03":{
  "pages": "PDF pp. 4-10, 11-24, 26-28, 29-31.",
  "objectives": [
    "Jelaskan Master Policy → Platform → Safe → Account.",
    "Konfigurasi parameter global Master Policy.",
    "Buat, duplikasi, aktifkan/nonaktifkan, impor Platform.",
    "Gunakan exception tanpa merusak baseline."
  ],
  "concepts": [
    "Master Policy adalah baseline business/audit; Platform berisi technical settings target/password/session.",
    "Platform menunjuk plugin dan connection component.",
    "Dependent Platform/Usage menangani service account, task, occurrence.",
    "Duplicate Platform dipakai bila target type sama butuh behavior berbeda.",
    "Platform berisi UI & Workflows dan Automatic Password Management.",
    "Inactive Platform disembunyikan dari onboarding; unsupported platform dapat dibuat/diimpor."
  ],
  "flow": [
    "Review policy → pilih/duplikasi Platform → set exception → Safe → Account → validasi CPM/PSM.",
    "Saat job gagal: policy → Platform → plugin/component → target → account."
  ],
  "admin": [
    "Gunakan naming convention target/protocol/rotation.",
    "Review complexity, expiration, Verify/Change/Reconcile, connection component, linked account.",
    "Nonaktifkan Platform hanya setelah dependency check.",
    "Dokumentasikan alasan dan expiry exception."
  ],
  "l2": [
    "Bandingkan account gagal dengan account working pada Platform sama.",
    "Pisahkan policy, plugin, target login, post-change verification.",
    "Gunakan exception, jangan mengubah global policy untuk satu account.",
    "Validasi precedence konfigurasi."
  ],
  "evidence": [
    "Master Policy/Platform snapshot.",
    "Plugin, connection component, linked account, parameters.",
    "Job ID, CPM log, target error, Verify/Change result."
  ],
  "pitfalls": [
    "Menganggap Platform hanya label.",
    "Duplicate tanpa owner/naming.",
    "Mematikan Platform yang masih dipakai.",
    "Exception tanpa scope/expiry."
  ],
  "exercises": [
    "Gambar workflow Policy-Platform-Safe-Account.",
    "Buat decision record exception vs Platform baru.",
    "Bandingkan dua Platform dan parameter CPM."
  ]
},
"04":{
  "pages": "PDF pp. 4-7, 8-13, 14-23, 24-32, 33-36.",
  "objectives": [
    "Jelaskan Vault model dan fungsi Safe.",
    "Rancang Safe berdasarkan owner, environment, risk, lifecycle, authorization.",
    "Kelompokkan permission dengan least privilege.",
    "Buat Safe dan tambah member."
  ],
  "concepts": [
    "Safe adalah container dan authorization boundary; account berada di satu Safe.",
    "Tidak ada Safe model universal; pertimbangkan owner, data class, environment, compliance, workload.",
    "Permission mencakup Access, Account Management, Safe Management/Monitoring, Workflow, Advanced.",
    "List, Retrieve, Use, Add, Update, Delete, Manage Safe/Members, View Audit berbeda dampaknya.",
    "PrivateArk dan PVWA punya perbedaan istilah Owners/Members dan Files/Accounts."
  ],
  "flow": [
    "Define owner/scope → Safe boundary → retention → members → minimum permissions → Platform/account → test.",
    "Pisahkan scope multi-team daripada memberi satu Safe besar ke semua team."
  ],
  "admin": [
    "Dokumentasikan owner, purpose, environment, retention, CPM/PSM, emergency access.",
    "Review predefined groups pada Safe baru.",
    "Gunakan group lifecycle.",
    "Uji List/Retrieve/Use/Manage terpisah."
  ],
  "l2": [
    "Account hilang: cek Safe membership/List.",
    "Connect/Show gagal: cek Use/Retrieve/workflow.",
    "CPM gagal: cek CPM member dan Safe permission.",
    "Bandingkan Safe working."
  ],
  "evidence": [
    "Safe name/owner/purpose/members/permissions/retention.",
    "Account/Platform dan CPM/PSM membership.",
    "Audit, request ID, error."
  ],
  "pitfalls": [
    "Safe hanya berdasarkan nama server.",
    "Memberi Manage Members untuk akses sementara.",
    "Menganggap Vault authorization mengganti Safe permission.",
    "Mencampur environment/risk."
  ],
  "exercises": [
    "Rancang Safe model Windows/Oracle/prod/test.",
    "Buat permission matrix.",
    "Uji persona List-only, Retrieve, Use."
  ]
},
"05":{
  "pages": "PDF pp. 4-14, 15-18, 19-25, 26-28.",
  "objectives": [
    "Tambah Account via PVWA tanpa menganggap target account dibuat.",
    "Jelaskan Verify, Change, Reconcile.",
    "Pahami interaksi CPM, Vault, policy, target."
  ],
  "concepts": [
    "Account adalah record ID/password/metadata; target account sudah ada.",
    "Account berada di satu Safe dan satu Platform.",
    "Verify mencocokkan Vault-target; Change mengganti credential; Reconcile memulihkan out-of-sync.",
    "Master Policy/Platform menentukan password behavior dan plugin.",
    "Sesudah Change, CPM login ulang dengan credential baru sebelum status sukses."
  ],
  "flow": [
    "Collect address/username/password → Safe/Platform → add object → Verify → Change → post-change login → store/audit.",
    "Verify failure tidak otomatis berarti Change; pisahkan credential, network, plugin, lock."
  ],
  "admin": [
    "Validasi address, username, target, Safe, Platform, owner.",
    "Review CPM status/next action di PVWA.",
    "Manual Verify/Change mengikuti change window.",
    "Simpan job ID dan target test."
  ],
  "l2": [
    "Pisahkan generate, execute change, post-change login, save.",
    "Bandingkan Verify vs Change vs Reconcile.",
    "Korelasi CPM/policy/target logs dan account state.",
    "Jangan menulis password di ticket."
  ],
  "evidence": [
    "Account/Safe/Platform/target/username/job ID.",
    "CPM status/log.",
    "Target audit/error/time/working comparison."
  ],
  "pitfalls": [
    "Mengira Add Account membuat OS/DB account.",
    "Manual target change membuat out-of-sync.",
    "Typo address/username.",
    "Reconcile saat masalah network/plugin."
  ],
  "exercises": [
    "Buat onboarding checklist.",
    "Gambar Verify dan Change flow.",
    "Tulis evidence Change failed setelah password generated."
  ]
},
"10":{
  "pages": "PDF pp. 4-14, 15-21, 22-26, 27-31, 32-38.",
  "objectives": [
    "Jelaskan isolation, monitoring, recording PSM.",
    "Aktifkan connection component dan Ad-Hoc.",
    "Jelaskan HTML5 Gateway, PSM for Windows, PSM for SSH."
  ],
  "concepts": [
    "PSM menjadi proxy agar endpoint tidak direct ke target dan credential tidak terekspos.",
    "Connection Component tentukan third-party client/protocol per Platform.",
    "Ad-Hoc: koneksi target yang belum disimpan, tetap isolation/monitoring/recording.",
    "HTML5 Gateway: tunnel sesi via WebSocket tanpa RDP client.",
    "PSM for Windows: RDP-compliant client; PSM for SSH: native SSH experience."
  ],
  "flow": [
    "PVWA auth/req → Vault ticket → PSM ticket validate → cred retrieval → connection component → target → record/audit."
  ],
  "admin": [
    "Assign connection component & protocol/port.",
    "Aktifkan monitoring/isolation/recording global/exception.",
    "Siapkan PSM server, service account, AppLocker, path, target access.",
    "Uji Ad-Hoc, HTML5, Windows RDP, SSH."
  ],
  "l2": [
    "Failure di PVWA ticket, PSM service, dispatcher, protocol, network.",
    "Cek PSM logs, component, target port, cred retrieval, recording state.",
    "Bandingkan PSM server/connection type.",
    "Jangan buka direct target connection sebagai workaround permanen."
  ],
  "evidence": [
    "PSM server/version, Platform/component, session ID.",
    "Target address/port, protocol, error, PSM/Windows log, network test.",
    "Recording/audit timestamp."
  ],
  "pitfalls": [
    "PSM hanya jump server tanpa audit.",
    "Connection component tidak di-assign.",
    "Ad-Hoc tanpa governance.",
    "Ubah AppLocker/NLA tanpa rollback."
  ],
  "exercises": [
    "Gambar PSM flow RDP & SSH.",
    "Bandingkan Ad-Hoc vs managed account.",
    "Checklist evidence Connect failed."
  ]
},
"06":{
  "pages": "PDF pp. 3-15, 16-25, 26-28.",
  "objectives": [
    "Jelaskan/konfigurasi Logon Account.",
    "Jelaskan/konfigurasi Reconcile Account.",
    "Pahami lifecycle SSH key."
  ],
  "concepts": [
    "Logon account adalah perantara (su/sudo) bila target account tidak boleh login langsung (root).",
    "Reconcile account memulihkan out-of-sync; harus punya scope minimal.",
    "Auto-reconciliation memakai target privilege switch; manual sesuai prosedur.",
    "SSH public/private key lebih panjang dan tidak dikirim via network, tapi satu key bisa buka banyak target.",
    "SSH Key Manager generate, rotasi, distribusi public key, simpan private key di Vault."
  ],
  "flow": [
    "Primary account → Logon Account → target switch → CPM.",
    "Out-of-sync → Reconcile Account → reset target → verify → clear flag.",
    "SSH onboarding → SSH Platform/Safe → store key → connect/retrieve → rotate/distribute."
  ],
  "admin": [
    "Validasi linked reference, target command, privilege, change method.",
    "Pisahkan root/logon/reconcile ownership/Safe permission.",
    "Gunakan Platform SSH dan tentukan rotation/behavior.",
    "Uji Connect/Change setelah distribusi."
  ],
  "l2": [
    "Cek logon/reconcile exists, active, reachable, authorized.",
    "Periksa linked reference dan switch error.",
    "Cek public key, format private key, permission, username, port, Platform.",
    "Jangan retrieve private key ke workstation bila ada direct Connect."
  ],
  "evidence": [
    "Primary/logon/reconcile IDs dan link.",
    "Target config, CPM log, SSH connection error, fingerprint.",
    "Verify/Change/Reconcile dan session audit."
  ],
  "pitfalls": [
    "Root sebagai logon account.",
    "Link ke account salah/disabled.",
    "Menyimpan private key di luar Vault.",
    "SSH key tidak dirotasi/diaudit."
  ],
  "exercises": [
    "Buat decision tree linked-account.",
    "Simulasi root Change via logon account.",
    "Dokumentasi SSH onboarding dan rotasi."
  ]
},
"07":{
  "pages": "PDF pp. 4-10, 11-19, 20-21, 22-24.",
  "objectives": [
    "Jelaskan Usage (occurrence credential lain).",
    "Konfigurasi dependent Platform (Windows service, task, IIS, config file).",
    "Bedakan auto-discoverable dan manual dependent."
  ],
  "concepts": [
    "Dependent Platform mengelola occurrence credential di OS, service, task, aplikasi, config file.",
    "CPM Change primary → SearchForUsages → update occurrence → validate service.",
    "Usage name adalah ID dependent Platform dan harus match target config.",
    "Config-file: plain text, INI, XML, web config, registry, database string, private SSH key.",
    "Windows discovery auto-detect COM+, IIS, pool, task, service; yang lain manual."
  ],
  "flow": [
    "Identify primary → discover/register usage → bind dependent Platform → change primary → update occurrence → restart/verify service."
  ],
  "admin": [
    "Inventarisasi sebelum rotation.",
    "Pastikan path/server/process/username/location tepat.",
    "Bedakan discoverable dan manual.",
    "Uji aplikasi setelah Change dan catat rollback plan."
  ],
  "l2": [
    "Aplikasi down setelah rotation: cek usage registration dan CPM log.",
    "Validasi server dan format file.",
    "Cari failure parse, permission, locked file, restart fail, wrong Platform ID.",
    "Jangan rollback primary tanpa evidence dependency."
  ],
  "evidence": [
    "Primary dan dependent IDs.",
    "Target/path/process/config, CPM job/error.",
    "Target event log dan post-change validation."
  ],
  "pitfalls": [
    "Mengira duplicate account otomatis menjadi usage.",
    "Usage dengan Platform ID salah.",
    "Tidak menguji dependency di non-prod.",
    "Ubah config file manual tanpa audit."
  ],
  "exercises": [
    "Buat dependency inventory satu service account.",
    "Bedakan discoverable vs manual.",
    "Checklist validation setelah CPM Change."
  ]
},
"08":{
  "pages": "PDF pp. 3-10, 11-24, 25-31, 32-38.",
  "objectives": [
    "Konfigurasi transparent connection, reason for access.",
    "Jelaskan Dual Control, approver, multi-group, multi-level, direct manager.",
    "Bedakan Exclusive Password, OTP, dan kombinasi."
  ],
  "concepts": [
    "List/Retrieve memberi Show/Copy; List/Use memberi Connect; workflow menjadi constraint tambahan.",
    "Transparent connection mengontrol password display vs launch session.",
    "Reason list didefinisikan per Platform.",
    "Dual Control menahan akses; multi-group wajib semua; multi-level proses berurutan.",
    "Exclusive Password mengunci akun saat dipakai sampai rilis; OTP ganti password sesuai MinValidityPeriod, izinkan akses bersamaan."
  ],
  "flow": [
    "Request access → reason/approval → time-bound access → Retrieve/Connect → release/expiry → CPM Change/audit."
  ],
  "admin": [
    "Aktifkan policy/exception.",
    "Predefined reasons dan approver group; hindari stuck.",
    "Atur exclusive release, automatic PSM release, OTP validity, expiry.",
    "Uji kombinasi workflow dengan Safe permission."
  ],
  "l2": [
    "Connect/Show hilang: cek base permission.",
    "Request stuck: cek approver group, multi-level, OOO, expiry.",
    "Account locked: cek release dan PSM session.",
    "Korelasi request ID, approval, account status, CPM change."
  ],
  "evidence": [
    "Master Policy/Platform workflow.",
    "Requester, reason, approver, time.",
    "Account state, CPM action, session/audit."
  ],
  "pitfalls": [
    "All confirmers tanpa capacity plan.",
    "Mengira OTP sama dengan Exclusive.",
    "Bypass Retrieve di luar workflow.",
    "Tidak uji rilis saat abnormal terminate."
  ],
  "exercises": [
    "Buat approval flow single-group & multi-level.",
    "Bandingkan Exclusive, OTP, kombinasi.",
    "Troubleshooting tree request pending."
  ]
},
"09":{
  "pages": "PDF pp. 4-12, 13-21, 22-36, 37-45, 46-56.",
  "objectives": [
    "Jelaskan file upload, Windows/Unix discovery, PTA detection, REST onboarding.",
    "Jalankan discovery dengan domain/OU/scan account/CPM Scanner.",
    "Proses Pending Accounts manual/otomatis.",
    "Buat Automatic Onboarding Rules dan precedence."
  ],
  "concepts": [
    "Windows Discovery: domain, secure AD, scan account, OU, CPM Scanner, schedule.",
    "Discovery task: Pending → Running, dapat dihenti/hapus; priv/non-priv berbasis group.",
    "Pending account butuh Safe, Platform, reconcile, owner.",
    "Auto Onboarding Rule mencocokkan attribute dan precedence; terlalu luas bisa onboard salah.",
    "Unix discovery: CSV IP, scan user, CPM Scanner, opsi SSH Keys.",
    "PTA deteksi unmanaged; REST: Add account, Add discovered, bulk upload."
  ],
  "flow": [
    "Define scope/cred → run discovery → review Pending → match Safe/Platform → rule/manual onboard → Verify/Change."
  ],
  "admin": [
    "Least-privilege scan account & OU.",
    "Naming/ownership rule deterministic.",
    "Review false positive/duplicate.",
    "Pisahkan scan cred dari managed account."
  ],
  "l2": [
    "Discovery kosong: cek scope, scan account, Scanner health, target reachability, permission.",
    "Pending tak match rule: bandingkan attribute dan discovered record.",
    "Auto-onboard salah: stop rule, preserve evidence, review precedence.",
    "REST: simpan req/res status, correlation ID tanpa secret."
  ],
  "evidence": [
    "Discovery ID/status, scope, scan account, Scanner.",
    "Pending record, matched rule, decision, duplicate.",
    "REST endpoint, response, account state, Verify result."
  ],
  "pitfalls": [
    "Discovery dengan scope terlalu luas.",
    "Menganggap discovered langsung onboard.",
    "Rule precedence tidak didokumentasi.",
    "Password scan masuk log/ticket."
  ],
  "exercises": [
    "Rancang Windows discovery satu OU.",
    "Buat Auto Onboarding Rule dan precedence.",
    "Bandingkan manual, Add Discovered, bulk upload."
  ]
},
"11":{
  "pages": "PDF pp. 3-13, 14-16, 17-22, 23-25.",
  "objectives": [
    "Kelola recording.",
    "Baca session audit.",
    "Monitor/suspend/terminate active session."
  ],
  "concepts": [
    "PSM/PSM for SSH membuat video/text recording, disimpan Vault atau external storage.",
    "Default recording Safe PSMRecordings; custom Safe/retention per Platform.",
    "Audit mencatat SQL commands, SSH keystrokes, window titles, universal keystrokes, SCP/Telnet.",
    "Authorized user dapat monitor, suspend, terminate; PTA dapat automatic response.",
    "PSM for SSH menampilkan live audit, tetapi kontrol live berbeda dari PSM Windows."
  ],
  "flow": [
    "Session start → local recording → upload recording Safe → authorized review → active action/retention."
  ],
  "admin": [
    "Set recording, Safe, retention, external storage.",
    "Atur group/permission view audit dan live termination.",
    "Validasi upload dan storage capacity.",
    "Korelasi audit dengan PTA score."
  ],
  "l2": [
    "Recording hilang: cek session type, setting, disk, upload, Safe, permission.",
    "Audit hilang: cek protocol/mode/session ID.",
    "Suspend/terminate hilang: cek PSMLiveSessionTerminators.",
    "Bedakan PSM for SSH live audit dari control."
  ],
  "evidence": [
    "Session ID, PSM/PSMP, recording Safe/status.",
    "PTA event, actor/action/time.",
    "Storage/upload log dan authorization group."
  ],
  "pitfalls": [
    "Ubah retention tanpa compliance approval.",
    "Recording ada berarti semua user boleh lihat.",
    "Suspend tanpa alasan/evidence.",
    "Hapus recording sebagai shortcut."
  ],
  "exercises": [
    "Gambar recording lifecycle.",
    "Bedakan video, text audit, live monitoring.",
    "Checklist recording missing."
  ]
},
"12":{
  "pages": "PDF pp. 4-10, 11-18, 19-26, 27-33, 34-36.",
  "objectives": [
    "Jelaskan PTA function/data/detection/alert/response.",
    "Konfigurasi automatic remediation dan session rules.",
    "Jelaskan threat score, pattern, scope, response, cloud."
  ],
  "concepts": [
    "PTA: Collect → Detect → Alert → Respond.",
    "Data source: Vault log, AD, EPM, PSM/session, SIEM, cloud.",
    "Event punya type, severity/score, timeline, recommendation/action; dilihat PVWA/SIEM.",
    "Automatic response: onboard unmanaged, rotate, reconcile, suspend, terminate.",
    "Rule menentukan category/protocol, regex/pattern, score, scope, response.",
    "Detections termasuk unmanaged access, credential theft, irregular hour/IP, excessive access, dormant user, AD/cloud risks."
  ],
  "flow": [
    "Collect sources → analytics/baseline → detection → risk-scored event → review/automatic action → validation."
  ],
  "admin": [
    "Validasi visibility & time sync.",
    "Review predefined rules sebelum exception.",
    "Tentukan scope dan threshold.",
    "Uji auto-response di lab dengan rollback."
  ],
  "l2": [
    "No-event: source absent atau behavior no-match.",
    "Korelasi PTA/Vault/PSM/SIEM timestamp.",
    "Review false positive, exception, score, action.",
    "Alert bukan bukti compromise tunggal."
  ],
  "evidence": [
    "Event ID/type/score/severity/time.",
    "Source logs, user/account/machine, session/pattern.",
    "Action dan validation."
  ],
  "pitfalls": [
    "Rule terlalu luas.",
    "Time drift.",
    "Rotate/reconcile tanpa dependency assessment.",
    "Abaikan support boundary cloud/platform."
  ],
  "exercises": [
    "Buat lifecycle event.",
    "Tulis rule dengan pattern/scope/score/response.",
    "Bedakan manual vs automatic."
  ]
},
"13":{
  "pages": "PDF pp. 3-10, 11-18, 19-23, 25-30.",
  "objectives": [
    "Bedakan PrivateArk dan PVWA reports.",
    "Tentukan required permissions.",
    "Generate/schedule/download/export report."
  ],
  "concepts": [
    "PrivateArk: license capacity, users, Safes, active/non-active.",
    "PVWA: Accounts Inventory, Applications Inventory, Compliance Status, Entitlement, Activity Log.",
    "ManageReportsGroup plus Safe/Vault permissions berbeda per report.",
    "Report immediate/scheduled; subscriber email; output CSV/Excel.",
    "EVD export Vault data ke text/CSV dengan Vault.ini dan credential file."
  ],
  "flow": [
    "Select report → confirm permission/scope/filter → generate/schedule → status → download/export → protect output."
  ],
  "admin": [
    "Definisikan tujuan/scope.",
    "Filter need-to-know.",
    "Owner/recipient/retention/secure storage.",
    "Bedakan inventory, compliance, entitlement, activity."
  ],
  "l2": [
    "Report kosong/gagal: permission dan ManageReportsGroup.",
    "Cek filter/time range.",
    "EVD: connectivity, cred file, Vault.ini, output, authorization.",
    "Redact output."
  ],
  "evidence": [
    "Report type/filter/requester/run status.",
    "Permission/group/output name/checksum.",
    "PVWA/EVD log/time/recipient/redaction."
  ],
  "pitfalls": [
    "Entitlement dianggap activity.",
    "Export seluruh Vault.",
    "Share CSV sensitif.",
    "Mengira permission sama."
  ],
  "exercises": [
    "Pilih report untuk 3 audit question.",
    "Buat permission matrix.",
    "Rancang secure EVD job."
  ]
},
"14":{
  "pages": "PDF pp. 4-7, 8-18, 19-31, 32-39, 40-49, 50-52.",
  "objectives": [
    "Petakan self-hosted architecture/communication.",
    "Temukan service/config/log/Safe/user.",
    "Jelaskan port 1858, REST-first, cred files, API keys."
  ],
  "concepts": [
    "Self-Hosted customer-owned; deployment on-prem/cloud-hosted/hybrid.",
    "Vault, PVWA, CPM, PSM, PTA punya service, config, log, Safe, user.",
    "Vault config: dbparm.ini, passparm.ini, tsparm.ini, PARagent.ini; restart implications.",
    "CPM punya Password Manager/Scanner; PSM punya service/recording/PSMConnect users.",
    "Component auth memakai credential file; direct protocol port 1858; fungsi baru dapat REST via PVWA.",
    "API key asymmetric pair terkait Vault user."
  ],
  "flow": [
    "Identify component → service → config/cred file → direct 1858 atau REST/PVWA → Vault → target."
  ],
  "admin": [
    "Diagram host/IP/port/role/version/service/dependency.",
    "Backup known-good config dan change window.",
    "Jaga built-in Safe/user.",
    "Audit cred files/API private key/log rotation."
  ],
  "l2": [
    "Tentukan direction komunikasi.",
    "Cek service/config/cred user/port/log.",
    "Bedakan direct Vault dari REST/PVWA.",
    "Jangan hapus built-in object."
  ],
  "evidence": [
    "Topology/version/host/IP/port.",
    "Service/config/credential user.",
    "Italog/Trace/CPM/PSM/PVWA log/API response/time."
  ],
  "pitfalls": [
    "Mengira semua lewat PVWA.",
    "Restart Vault tanpa impact.",
    "Share cred file/API private key.",
    "Ubah built-in Safe/member tanpa backup."
  ],
  "exercises": [
    "Buat communication matrix.",
    "Petakan log/config per component.",
    "Checklist sebelum restart."
  ]
},
"15":{
  "pages": "PDF pp. 4-7, 8-13, 14-19, 20-22.",
  "objectives": [
    "Jelaskan backup/restore dan indirect replication.",
    "Konfigurasi Replicate, Vault.ini, cred file, path.",
    "Jalankan full/incremental, restore Safe, schedule."
  ],
  "concepts": [
    "Safe data ada di Data; metadata/user/activity/database di Metadata; keduanya penting.",
    "Indirect backup menaruh Replicate di server lain agar third-party software tidak di Vault.",
    "Backup user enabled/authorized; cred file dilindungi dan di-update setelah login.",
    "PAReplicate full/incremental; PARestore Safe butuh Restore All Safes.",
    "Rekomendasi PDF: weekly full, daily incremental; log di folder Replicate."
  ],
  "flow": [
    "Prepare backup host → enable Backup user → install/configure → cred file → full backup → test restore → schedule/monitor."
  ],
  "admin": [
    "Disk capacity, NTFS, physical security, enterprise backup access.",
    "Pisahkan path, credentials, operator, retention, approval.",
    "Uji restore berkala.",
    "Protect/rotate cred file dan log."
  ],
  "l2": [
    "Backup fail: user/cred/Vault.ini/network/disk/auth.",
    "Restore fail: source/target Safe, authorization, Vault.",
    "Bedakan full/incremental dan last success.",
    "No production restore tanpa approval."
  ],
  "evidence": [
    "Host/path/command/job/time/size/status.",
    "Config metadata tanpa secret, log, Safe list.",
    "Restore test/validation/retention."
  ],
  "pitfalls": [
    "Backup app di Vault.",
    "Tidak test restore.",
    "Cred file terbuka.",
    "Process exit dianggap sukses."
  ],
  "exercises": [
    "Rancang schedule.",
    "Tabletop restore Safe.",
    "Checklist backup failure."
  ]
},
"16":{
  "pages": "PDF pp. 4-9, 10-16, 17-23, 24-29.",
  "objectives": [
    "Jelaskan DR Vault, DR service/user, enhanced replication.",
    "Uji automatic/manual Vault failover.",
    "Konfigurasi component failover dengan batasan CPM.",
    "Kembalikan operasi ke primary."
  ],
  "concepts": [
    "DR Vault standalone/cluster memiliki DR service; DR user melakukan auth/replication primary.",
    "Enhanced replication meningkatkan sinkronisasi database/metadata/password.",
    "Manual failover memakai PADR.INI dan harus mencegah accidental failover.",
    "PVWA/PSM dapat failover; CPM tidak boleh auto-failover untuk mencegah split-brain/password divergence.",
    "Failback perlu replication back, reset mode, validasi user/component/session."
  ],
  "flow": [
    "Primary health loss → retry/replication → activate DR → components fallback → validate → replicate back → failback."
  ],
  "admin": [
    "Dokumentasikan RTO/RPO, topology, DNS/IP, component addresses, owner.",
    "Uji full replication dan failover.",
    "CPM failover selalu manual.",
    "Reset DR mode dan validation setelah recovery."
  ],
  "l2": [
    "Bedakan replication lag vs Vault failover.",
    "Cek DR service/user/PADR/database sync/Vault.",
    "Validasi PVWA, PSM, CPM, audit, current password state.",
    "Jangan aktifkan dua writer/CPM."
  ],
  "evidence": [
    "Primary/DR status, replication time, DR user, PADR.",
    "Failover timeline, component connection, RTO/RPO.",
    "Post-failover/failback validation."
  ],
  "pitfalls": [
    "Auto-failover CPM split-brain.",
    "Failover tanpa current replication evidence.",
    "Tidak test component DR.",
    "Lupa reset DR mode."
  ],
  "exercises": [
    "Buat DR runbook.",
    "Simulasikan split-brain prevention.",
    "Checklist pasca-failover."
  ]
},
"17":{
  "pages": "PDF pp. 4-8, 9-16, 17-18.",
  "objectives": [
    "Jelaskan Vault island of security.",
    "Terapkan delapan security fundamentals.",
    "Bedakan Server/Recovery Public/Recovery Private Key.",
    "Tentukan storage strategy key."
  ],
  "concepts": [
    "Vault diisolasi/hardening: remove services, no domain/trust, no DNS/WINS dependency, required components only.",
    "Controls: isolate/harden, 2FA, restrict component access, limit privilege/admin, protect accounts/keys, secure protocols, monitor logs, test DR.",
    "End-to-end: encryption, authentication, firewall, mandatory/discretionary access, RBAC, subnet/time limits, audit, alerts.",
    "Server Key, Recovery Public Key, Recovery Private Key adalah inti operasi/encryption.",
    "Recovery Private Key disimpan media fisik di minimal dua lokasi aman (primary/DR); server key strength vs availability/HSM."
  ],
  "flow": [
    "Harden OS/network → protect keys → authenticate → authorize → encrypt/store/audit → monitor/test recovery."
  ],
  "admin": [
    "Review Digital Vault Security Standard/Security Fundamentals.",
    "Batasi remote admin, external storage, virtualization, AV, domain membership sesuai guidance.",
    "Buat key custody/dual-control dan recovery drill.",
    "Monitor ITAlog/alerts."
  ],
  "l2": [
    "Startup fail: cek key availability/path/permission tanpa memindahkan sembarang.",
    "Bedakan auth vs authorization/firewall/protocol.",
    "Cek security change/timeline.",
    "Jangan upload key/secret."
  ],
  "evidence": [
    "Security baseline/network isolation/service inventory.",
    "Key custody record tanpa content, auth/config, ITAlog.",
    "DR/recovery test/exception approval."
  ],
  "pitfalls": [
    "Vault di domain tanpa review.",
    "Recovery Private Key satu lokasi.",
    "Install app tambahan di Vault.",
    "Share key ke support."
  ],
  "exercises": [
    "Checklist 8 fundamentals.",
    "Key custody primary/DR.",
    "Evidence aman startup failure."
  ]
},
"18":{
  "pages": "PDF pp. 4-6, 7-13, 14-17, 19-22, 23-26, 28-34, 35-37.",
  "objectives": [
    "Monitor health via REST/System Health, email, SIEM, SNMP.",
    "Monitor backup/DR replication.",
    "Jalankan maintenance log rotation/review."
  ],
  "concepts": [
    "System Health: primary/DR Vault, PVWA/CPM/PSM/PTA connectivity, CPM accounts, concurrent PSM sessions.",
    "Component Monitoring memakai user notification, template, interval, threshold; disconnect masuk ITAlog.",
    "SNMP Remote Control Agent mengirim OS/Vault trap; SIEM/syslog menerima health statistics untuk baseline/trend.",
    "Backup/DR threshold mendeteksi replication/DR user connection missing.",
    "CPM log rotation mengarsipkan log ke Safe dan cegah disk/troubleshooting issue.",
    "Recommended review: ITAlog, license, directory mapping, Master/DR test, security health, environment diagram."
  ],
  "flow": [
    "Collect health → normalize/alert → correlate change → remediate → close."
  ],
  "admin": [
    "Monitor PVWAAppUser, PasswordManager, DR, Backup dan user komponen.",
    "Atur ComponentMonitoringInterval/threshold sesuai SOP.",
    "Aktifkan SendMonitorMessage; integrasikan MIB/syslog.",
    "Atur BackupNotificationThreshold/DRNotificationThreshold dan log rotation."
  ],
  "l2": [
    "Bedakan component disconnected, Vault unhealthy, replication missing, target job failure.",
    "Korelasi health pane, ITAlog, SIEM, SNMP, component log.",
    "Bandingkan baseline/trend.",
    "Alert harus punya owner, threshold, timestamp, runbook."
  ],
  "evidence": [
    "Health export/REST, status, threshold.",
    "ITAlog/email/SIEM/SNMP, replication time.",
    "Log rotation/disk/baseline/maintenance record."
  ],
  "pitfalls": [
    "Alert tanpa baseline.",
    "Tidak test notification.",
    "Log disk penuh.",
    "Tidak ada owner/runbook."
  ],
  "exercises": [
    "Monitoring matrix per component.",
    "Alert missing backup/DR.",
    "Weekly/quarterly/annual checklist."
  ]
},
"19":{
  "pages": "PDF pp. 4-8, 9-14, 15-21, 22-30, 31-32.",
  "objectives": [
    "Resolve user auth/suspended user.",
    "Troubleshoot component connectivity/credential file.",
    "Isolate CPM Verify/Change/Reconcile.",
    "Troubleshoot PSM RDP/component launch."
  ],
  "concepts": [
    "User lockout terlihat ITAlog; UserLockoutPeriodInMinutes dapat automatic unsuspend.",
    "Component user bisa out-of-sync Vault vs credential file; recovery reset password + generate cred file.",
    "CPM pisahkan Verify/Change/Reconcile, Windows/Unix, plugin, credential, event log, network.",
    "PSM scope PVWA/PSM/target, RDP/RemoteApp, load balancer, service, NLA, PSMConnect, Shadow, AppLocker.",
    "Disable NLA/AppLocker hanya isolation test dan dikembalikan."
  ],
  "flow": [
    "Reproduce safely → classify auth/CPM/PSM → scope → logs → working comparison → test → validate."
  ],
  "admin": [
    "Catat user experience/current-expected.",
    "Gunakan ITAlog, System Health, component log, Event Viewer, target command.",
    "PSM compare working Safe/PSM dan PSMConnect test dengan approval.",
    "Re-enable security control."
  ],
  "l2": [
    "One/multiple user; one/multiple account; one/multiple PSM.",
    "Exact error/time sebelum reset/restart.",
    "Bedakan credential mismatch, connectivity, plugin, target policy, AppLocker, NLA.",
    "Catat result tiap variable."
  ],
  "evidence": [
    "Scope/version/topology/error.",
    "ITAlog/cred status/CPM-PSM/Event Viewer/network.",
    "Before/after security setting dan validation."
  ],
  "pitfalls": [
    "Password reset berulang tanpa stage.",
    "Restart hilangkan timestamp.",
    "AppLocker/NLA permanent off.",
    "Raw credential/log tanpa sanitization."
  ],
  "exercises": [
    "Decision tree common issue.",
    "Controlled PSMConnect test plan.",
    "L3 package tanpa follow-up dasar."
  ]
},
"20":{
  "pages": "PDF pp. 4-14, 15-24, 25-35, 36-41, 42-44.",
  "objectives": [
    "Terapkan troubleshooting flow berbasis topology/user experience.",
    "Temukan/manage console, error, trace, component logs.",
    "Konfigurasi/gunakan xRay dengan aman."
  ],
  "concepts": [
    "Flow: topology → initial questions → isolate/reproduce → logs → follow-up → docs/KB → support.",
    "Tulis expected vs actual; uji satu variable dan catat working/non-working.",
    "Console log service entries, error log errors, trace log workflow detail; lokasi/config per component.",
    "Vault Trace/ITAlog/LogicContainer, CPM policy/log, PVWA/IIS, PSM recorder/console, target event saling melengkapi.",
    "xRay mengumpulkan log/config, mengenkripsi collection/transfer, dan membantu support."
  ],
  "flow": [
    "Define symptom → map component flow → scope → collect logs/IDs → identify cause → validate workaround → L3 escalation."
  ],
  "admin": [
    "Diagram host/IP/role/version/HA-DR/load balancer.",
    "Catat access prerequisite docs/KB/log.",
    "Set debug sesuai window lalu kembalikan.",
    "Gunakan xRay/redaction/share procedure."
  ],
  "l2": [
    "Pilih log berdasarkan flow.",
    "Korelasi timestamp/timezone/correlation ID/working case.",
    "Review config change/service/network/permission/target.",
    "Escalate dengan pertanyaan spesifik setelah logical steps."
  ],
  "evidence": [
    "Problem statement, expected/actual, topology/version/scope.",
    "Timestamp, IDs, steps, working comparison, sanitized logs/config.",
    "xRay metadata/action/result/support question."
  ],
  "pitfalls": [
    "Dump semua log tanpa scope/redaction.",
    "Ubah banyak variable sekaligus.",
    "Debug tinggi tanpa disk/retention.",
    "Ticket “please investigate” tanpa hypothesis."
  ],
  "exercises": [
    "Troubleshooting report login failure.",
    "Map log Vault/CPM/PSM/PVWA.",
    "L3 package dengan satu pertanyaan spesifik."
  ]
},
};
