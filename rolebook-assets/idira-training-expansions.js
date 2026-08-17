(() => {
  const expansions = {};
  const add = (id, expansion) => { expansions[id] = expansion; };

  add("01", {
    extraReadingTime: 24,
    coverageNote: "Seluruh 41 halaman M01 sudah dipetakan. Halaman pengantar, divider, rangkuman, latihan, dan resource tetap dicatat; seluruh teaching point halaman 4–38 diterangkan di bab utama atau addendum ini.",
    coverage: [
      { pages: "1–3, 8, 15, 23, 39", topic: "Cover, agenda, dan pemisah topik", treatment: "Dipakai sebagai struktur urutan belajar dan konteks perpindahan konsep." },
      { pages: "4–14", topic: "Definisi privilege dan attack lifecycle", treatment: "Dijelaskan pada fondasi, threat chain, serta kontrol protect-detect-respond." },
      { pages: "16–22", topic: "Kemampuan utama PAM", treatment: "Diperluas menjadi discovery, credential lifecycle, isolation, recording, monitoring, dan remediation." },
      { pages: "24–38", topic: "Arsitektur, client, interface, utility, dan resources", treatment: "Arsitektur ada di bab utama; PACLI, SDK, REST, Central Administration Station, RCC, port, dan glossary dilengkapi di addendum." },
      { pages: "40–41", topic: "Summary, exercise, dan additional resources", treatment: "Diterjemahkan menjadi knowledge check, latihan pemetaan komponen, dan daftar artefak belajar." }
    ],
    sourceAddendum: [
      {
        title: "Client, interface, dan utility yang disebut materi",
        pages: "Halaman 25 dan 28–34",
        paragraphs: [
          "Materi membedakan jalur interaksi manusia, jalur administrasi, dan jalur automation. PrivateArk Client dipakai untuk administrasi Vault dan akses object tertentu; PVWA menjadi web interface; PACLI dan SDK melayani integrasi programatik; PAM Web Services menyediakan REST API; Vault Central Administration Station bekerja lokal pada Vault; Remote Control Client menjalankan operasi remote melalui agent.",
          "Pemilihan interface menentukan lokasi autentikasi, jenis authorization, port yang dipakai, log yang relevan, dan blast radius perubahan. Karena itu nama interface harus selalu dicatat dalam ticket, bukan hanya menulis 'gagal login ke CyberArk'."
        ],
        bullets: [
          "PACLI dan SDK muncul sebagai client untuk custom application atau reporting tool yang perlu berkomunikasi dengan Vault.",
          "PAM Web Services menjalankan operasi create, list, modify, dan delete melalui program atau script untuk mengotomasi pekerjaan UI dan provisioning.",
          "Vault Central Administration Station hanya tersedia pada server Vault dan dapat menampilkan log, mengubah debug level secara dinamis, serta start/stop service Vault.",
          "Remote Control Client mengurangi kebutuhan membuka RDP ke Vault karena command dikirim ke Remote Control Agent."
        ]
      },
      {
        title: "Contoh alur REST dan arti status response",
        pages: "Halaman 32",
        paragraphs: [
          "Slide memberi contoh dua operasi: LOGON mengautentikasi user dan mengembalikan HTTP 200, kemudian ADD USER membuat user dan mengembalikan HTTP 201. Token hasil logon dipakai pada request berikutnya; token contoh pada slide hanyalah ilustrasi dan tidak boleh disalin sebagai credential nyata.",
          "Makna operasionalnya: troubleshooting API harus memisahkan kegagalan transport, authentication, authorization, validasi payload, dan operasi object. HTTP success tidak otomatis membuktikan seluruh workflow bisnis selesai bila ada proses lanjutan atau dependency lain."
        ],
        commands: [
          { code: "LOGON → HTTP 200", meaning: "Autentikasi berhasil dan response berisi CyberArkLogonResult atau token sesi." },
          { code: "ADD USER → HTTP 201", meaning: "Request pembuatan user diterima dan resource berhasil dibuat pada contoh materi." }
        ]
      },
      {
        title: "Vault Central Administration Station dan Remote Control Client",
        pages: "Halaman 33–34",
        paragraphs: [
          "Central Administration Station memperlihatkan ITALOG.LOG, menyediakan start/stop PrivateArk Server service, dan memungkinkan debug level diubah tanpa mengedit konfigurasi lalu restart. Remote Control Client adalah CLI yang berkomunikasi dengan Remote Control Agent memakai CyberArk Remote Control Protocol pada port 9022.",
          "Command status harus dipakai sebelum dan sesudah start/stop agar operator tidak menyimpulkan sukses hanya dari pesan pending. Operasi penghentian service adalah tindakan berdampak tinggi dan harus mengikuti change atau incident authority."
        ],
        commands: [
          { code: "PARCLIENT> status vault", meaning: "Memeriksa status Vault dari Remote Control Client." },
          { code: "PARCLIENT> stop vault", meaning: "Menghentikan Vault setelah konfirmasi operator." },
          { code: "PARCLIENT> start vault", meaning: "Memulai Vault; status perlu diperiksa lagi sampai benar-benar running." },
          { code: "PARCLIENT> status ene / start ene", meaning: "Memeriksa atau memulai Event Notification Engine melalui jalur remote control." },
          { code: "TCP 9022", meaning: "Port yang disebut materi untuk komunikasi Remote Control Client dengan Agent." }
        ]
      },
      {
        title: "Dokumentasi, Customer Community, glossary, dan latihan",
        pages: "Halaman 35–41",
        paragraphs: [
          "Materi menempatkan dokumentasi, Customer Community, knowledge resources, dan glossary sebagai alat kerja administrator. Glossary membantu menerjemahkan acronym, tetapi versi dokumentasi harus cocok dengan build karena nama menu, parameter, dan support statement dapat berubah.",
          "Resource page juga mengarahkan latihan mengenali environment, login ke komponen, mengaktifkan PSM, menonaktifkan Reason for Access pada lab, connect/retrieve account, memakai PrivateArk Client, dan mencoba Remote Control Client. Rolebook menerjemahkan tujuan latihan itu menjadi walkthrough dan checklist, bukan meminta pembaca membuka slide."
        ]
      }
    ],
    analysis: [
      {
        title: "Bangun matriks pemilihan jalur akses",
        paragraphs: [
          "Satu tujuan administrasi dapat memiliki beberapa interface, tetapi masing-masing membawa risiko dan evidence berbeda. Gunakan matriks agar tim memilih jalur paling sempit yang memenuhi kebutuhan."
        ],
        bullets: [
          "PVWA untuk workflow end-user, request, Show/Copy, Connect, reporting, dan administrasi web yang didukung.",
          "PrivateArk Client untuk operasi Vault/Safe tertentu, investigasi object, atau fungsi legacy yang memang membutuhkan client.",
          "REST untuk workflow berulang yang memerlukan idempotency, validation, logging, dan controlled service identity.",
          "Remote Control Client untuk status atau operasi service Vault/ENE tanpa membuka desktop interaktif ke Vault.",
          "Akses langsung ke Vault console hanya untuk aktivitas yang memang memerlukan boundary tersebut."
        ]
      },
      {
        title: "Jadikan arsitektur sebagai peta troubleshooting",
        paragraphs: [
          "Setiap insiden harus ditaruh pada stage: identity authentication, Vault authorization, Safe permission, credential lifecycle, session brokering, target authentication, recording, atau analytics. Stage ini menentukan log pertama dan siapa owner teknisnya."
        ],
        bullets: [
          "Login PVWA gagal: mulai dari browser/PVWA, identity source, lalu Vault authentication evidence.",
          "Connect tersedia tetapi sesi gagal: periksa PSM path, connector, network, credential retrieval, dan target response.",
          "Verify/Change/Reconcile gagal: fokus pada CPM, Platform, linked account, plugin, policy target, dan target event.",
          "Risk event tidak muncul: periksa audit generation, forwarding, PTA ingestion, rule scope, dan time correlation."
        ]
      },
      {
        title: "Roadmap automation yang aman",
        paragraphs: [
          "REST atau SDK sebaiknya tidak langsung dipakai untuk mass change. Mulai dari read-only inventory, lanjut ke create dengan approval, lalu lifecycle action setelah idempotency, rollback, rate control, dan audit terbukti."
        ],
        bullets: [
          "Tahap 1: inventory dan compliance read-only.",
          "Tahap 2: onboarding terkontrol dengan dry-run dan validation report.",
          "Tahap 3: remediation terbatas pada cohort kecil dengan canary.",
          "Tahap 4: event-driven response dengan guardrail dan manual override.",
          "Setiap tahap menyimpan request ID, actor, target, before/after, result, dan exception."
        ]
      }
    ],
    artifacts: [
      "Diagram topology dengan host, role, version, port, dan arah komunikasi.",
      "Matriks Interface → Use Case → Authentication → Authorization → Log → Risiko.",
      "Template klasifikasi ticket berdasarkan stage flow PAM.",
      "Checklist kontrol bypass agar target tidak menerima jalur direct yang tidak disetujui.",
      "Register automation berisi owner, service identity, scope, approval, dan rollback."
    ],
    keywords: ["PACLI", "SDK", "REST API", "Vault Central Administration Station", "ITALOG.LOG", "PARCLIENT", "Remote Control Client", "9022"]
  });

  add("02", {
    extraReadingTime: 28,
    coverageNote: "Seluruh 54 halaman M02 sudah dipetakan. Detail Master user, predefined identity, UI management, tiga lapis authorization, LDAP provisioning, synchronization, dan directory mapping kini tersedia langsung di Rolebook.",
    coverage: [
      { pages: "1–3", topic: "Cover, agenda, overview", treatment: "Menjadi tujuan bab dan pemisahan User, Account, internal, serta transparent identity." },
      { pages: "4–14", topic: "User model dan predefined users/groups", treatment: "Konsep utama ada di bab; mekanisme Master dan identity bawaan dirinci di addendum." },
      { pages: "15–34", topic: "PrivateArk/PVWA management dan LDAP lifecycle", treatment: "Seluruh operasi create, edit, group, disable, reset, provision, removal, dan sync dijelaskan." },
      { pages: "35–51", topic: "Vault, Safe, PVWA authorization dan directory maps", treatment: "Perbedaan scope, inheritance, built-in role, user mapping, dan group mapping dirinci." },
      { pages: "52–54", topic: "Summary, exercise, resources", treatment: "Diubah menjadi checklist test mapping, unsuspend, dan break-glass exercise." }
    ],
    sourceAddendum: [
      {
        title: "Master user dan tiga faktor akses",
        pages: "Halaman 8–12",
        paragraphs: [
          "Master adalah user paling kuat dengan seluruh Vault dan Safe authorization yang tidak dapat dicabut. Materi membatasi login melalui PrivateArk Client dan menjelaskan tiga faktor: password Master, akses ke RecPrvKey, serta koneksi dari Vault console atau satu IP tambahan yang ditentukan oleh EmergencyStationIP.",
          "Perubahan password Master dilakukan setelah login sebagai Master melalui User → Set Password. Karena kombinasi ini adalah mekanisme emergency, keberadaannya bukan alasan untuk dipakai pada administrasi harian."
        ],
        commands: [
          { code: "Master password + RecPrvKey + approved source", meaning: "Tiga faktor yang harus tersedia bersamaan sesuai materi." },
          { code: "EmergencyStationIP", meaning: "Parameter yang mengizinkan satu alamat tambahan selain Vault console untuk jalur Master." },
          { code: "User → Set Password", meaning: "Menu yang diperlihatkan materi untuk mengganti password Master setelah berhasil login." }
        ]
      },
      {
        title: "Predefined identities dan permission bawaan",
        pages: "Halaman 9, 35–45",
        paragraphs: [
          "Instalasi membuat user dan group bawaan untuk pekerjaan administratif. Administrator memiliki full Vault authorizations secara default; Auditor user memiliki Audit Users; Backup user memiliki Backup all Safes. Banyak predefined group otomatis menjadi member Safe baru sesuai fungsi.",
          "Vault authorization hanya diberikan ke user dan tidak diwariskan melalui group membership, sedangkan Safe authorization dapat diberikan ke user atau group dan dapat diwariskan. Tab dan button PVWA bergantung pada membership built-in group."
        ],
        table: {
          headers: ["Identity/group", "Default atau UI effect yang disebut materi"],
          rows: [
            ["Administrator", "Full Vault authorizations secara default."],
            ["Auditor user", "Audit Users Vault authorization."],
            ["Backup user", "Backup all Safes Vault authorization."],
            ["Auditors group", "Otomatis List accounts, View Safe members, dan View audit log pada Safe baru."],
            ["Vault Admins", "Administration tab pada PVWA."],
            ["Auditors", "Privileged Sessions tab pada PVWA."],
            ["Security Admins / Security Operators", "Security pane pada PVWA."]
          ]
        }
      },
      {
        title: "Internal user, transparent user, dan LDAP lifecycle",
        pages: "Halaman 14–34",
        paragraphs: [
          "Internal user disimpan dan dikelola di Vault. Materi merekomendasikan external LDAP directory untuk mayoritas user, sementara manual user tetap dapat dibuat melalui PrivateArk Client atau PVWA. PVWA versi 13 pada materi menyediakan create/edit user, create group, assign user, disable/activate, dan reset password.",
          "Transparent user diprovision otomatis saat pertama kali login LDAP berdasarkan Directory Map. Menghapus user LDAP hanya dari Vault tidak permanen: user akan dibuat kembali saat login bila masih memenuhi mapping di directory. Untuk memblokir, ubah membership pada LDAP atau disable/delete identity di source directory."
        ],
        commands: [
          { code: "AutoSyncExternalObjects=Yes,24,1,5", meaning: "Contoh dbparm.ini: aktifkan sync, cycle 24 jam, dan window jam 1–5 sesuai slide." },
          { code: "dbparm.ini", meaning: "Mengontrol external-object synchronization dan daftar group yang otomatis ditambahkan ke Safe baru." }
        ]
      },
      {
        title: "User Mapping versus Group Mapping",
        pages: "Halaman 46–51",
        paragraphs: [
          "User Mapping menentukan apakah user dibuat saat authentication serta atributnya, termasuk Vault authorizations dan location. Group Mapping membuat LDAP group dapat dicari dari PAM, diberi Safe authorization, atau dinest ke built-in CyberArk group.",
          "Wizard predefined mapping pada materi menghubungkan empat group LDAP—CyberArk Auditors, CyberArk Safe Managers, CyberArk Users, dan CyberArk Vault Admins—ke role bawaan. Custom mapping dapat dibuat bila organisasi memerlukan scope atau authorization yang berbeda."
        ],
        bullets: [
          "Provisioning terjadi pada login pertama, bukan otomatis berarti user punya akses ke semua Safe.",
          "Daily process mengevaluasi user yang cocok dengan query mapping; karena itu perubahan directory dapat mengubah effective access setelah sinkronisasi.",
          "Directory map harus diuji dengan positive, negative, overlapping, disabled, dan removed-user cases."
        ]
      }
    ],
    analysis: [
      {
        title: "Pisahkan break-glass dari administrasi normal",
        paragraphs: [
          "Master adalah mekanisme pemulihan, bukan super-admin harian. Desain operasional yang matang menjaga material recovery terpisah, membatasi pihak yang dapat menggabungkan faktor, dan memastikan setiap penggunaan menghasilkan incident record."
        ],
        bullets: [
          "Gunakan dual custody untuk media recovery dan prosedur check-out/check-in.",
          "Uji login secara berkala dalam exercise terkontrol tanpa menjadikan credential rutin.",
          "Catat siapa membuka lokasi, siapa mengoperasikan console, alasan, waktu, hasil, dan rotasi pascapenggunaan.",
          "Pastikan EmergencyStationIP tidak berubah diam-diam dan jalur jaringan hanya aktif sesuai desain."
        ]
      },
      {
        title: "Bangun effective-access matrix",
        paragraphs: [
          "Masalah akses sering terjadi karena tiga lapisan dicampur: Vault authorization, Safe authorization, dan PVWA permission. Buat satu matriks yang menghitung effective access dari identity source sampai action akhir."
        ],
        bullets: [
          "Identity source dan authentication method.",
          "Directory map yang match serta precedence bila lebih dari satu.",
          "Vault authorization langsung pada user.",
          "Built-in/custom group membership dan Safe membership.",
          "Action akhir: melihat tab, List, Use, Retrieve, manage, authorize, atau audit."
        ]
      },
      {
        title: "Directory mapping sebagai code-like policy",
        paragraphs: [
          "Walau dikonfigurasi melalui UI, directory mapping harus diperlakukan seperti policy code: punya owner, requirement, test case, peer review, change record, dan rollback. Overlapping query dapat memberi privilege lebih luas dari yang terlihat pada satu mapping."
        ],
        bullets: [
          "Buat test identity untuk setiap role dan satu identity yang tidak boleh match.",
          "Bandingkan effective access sebelum/sesudah perubahan mapping.",
          "Monitor user yang tiba-tiba diprovision ulang atau pindah role.",
          "Review stale group, nested group, disabled user, dan orphaned Safe membership.",
          "Simpan snapshot mapping agar drift dapat dibedakan dari incident authentication."
        ]
      }
    ],
    artifacts: [
      "Runbook penggunaan dan pengujian Master/break-glass.",
      "Matriks User → Directory Map → Vault Authorization → Group → Safe Permission → PVWA UI.",
      "Test pack LDAP mapping: positive, negative, overlap, disable, delete, dan re-provision.",
      "Checklist unsuspend yang membedakan network-password failure, suspended user, dan unprovisioned user.",
      "Quarterly access review untuk built-in group dan automatic Safe membership."
    ],
    keywords: ["RecPrvKey", "EmergencyStationIP", "AutoSyncExternalObjects", "dbparm.ini", "User Mapping", "Group Mapping", "Vault Admins", "PVWAMonitor"]
  });

  add("03", {
    extraReadingTime: 22,
    coverageNote: "Seluruh 31 halaman M03 sudah dipetakan. Baseline Master Policy, dua tipe Platform, konfigurasi password/session, duplicate-edit-activate-import lifecycle, naming, dan exception per Platform telah diterangkan.",
    coverage: [
      { pages: "1–3", topic: "Cover, agenda, overview", treatment: "Menjadi struktur hubungan Master Policy → Platform → Safe → Account." },
      { pages: "4–10", topic: "Master Policy global rules", treatment: "Dijelaskan sebagai baseline business/audit untuk password, dual control, exclusive access, reason, PSM, dan retention." },
      { pages: "11–24", topic: "Platform types dan lifecycle", treatment: "Target/dependent Platform, duplicate, naming, edit, password generation, deactivate, dan import dijelaskan lengkap." },
      { pages: "25–28", topic: "Exception terhadap Master Policy", treatment: "Precedence dan scope exception per Platform ditulis sebagai keputusan operasional." },
      { pages: "29–31", topic: "Summary dan exercise", treatment: "Diubah menjadi latihan desain Platform serta checklist change." }
    ],
    sourceAddendum: [
      {
        title: "Master Policy sebagai global baseline",
        pages: "Halaman 4–10",
        paragraphs: [
          "Master Policy menyimpan business dan audit rules global. Materi mencontohkan dual control, exclusive access, one-time password, transparent connection, reason for access, password change/verification, aktivasi PSM/recording, dan retention audit data.",
          "Platform menjadi basis exception. Artinya perubahan global memengaruhi cohort luas, sedangkan kebutuhan berbeda untuk tipe account tertentu seharusnya diselesaikan dengan exception yang terikat Platform."
        ],
        bullets: [
          "Global policy menjawab apa yang organisasi wajibkan.",
          "Platform menjawab bagaimana target tertentu menjalankan requirement itu.",
          "Safe menjawab siapa yang boleh mengakses object.",
          "Account object membawa address, username, secret, Platform, Safe, dan metadata lain."
        ]
      },
      {
        title: "Target Platform dan Dependent Platform",
        pages: "Halaman 11–13",
        paragraphs: [
          "Materi membagi Platform menjadi dua tipe. Target Platform mendefinisikan technical settings untuk mengelola account pada server atau device dan menghubungkannya ke target. Dependent Platform—juga disebut Usage—mengelola occurrence tambahan seperti Windows service atau scheduled task yang memakai credential target account.",
          "Keduanya tidak boleh diperlakukan sebagai label katalog. Target Platform mengarahkan CPM/PSM behavior, sedangkan dependent Platform menentukan bagaimana copy credential pada dependency ditemukan dan diperbarui."
        ]
      },
      {
        title: "Duplicate sebelum customize dan naming yang bermakna",
        pages: "Halaman 18–22",
        paragraphs: [
          "Materi mewajibkan duplicate ketika account pada system type yang sama membutuhkan policy berbeda, misalnya UNIX account di region berbeda memakai interval rotation berbeda. Platform name harus unik dan sebaiknya menjelaskan target, protocol, dan business rule.",
          "Contoh LIN SSH 30 berarti Linux, koneksi SSH, dan rotation 30 hari. Setelah duplicate, setting dibagi menjadi UI & Workflows serta Automatic Password Management; bagian Generate Password mengontrol length, complexity, forbidden characters, dan aturan pembentukan password lain."
        ],
        commands: [
          { code: "LIN SSH 30", meaning: "Contoh naming convention: Linux, SSH, rotasi 30 hari." },
          { code: "UI & Workflows", meaning: "Kelompok setting experience dan workflow account/session." },
          { code: "Automatic Password Management", meaning: "Kelompok setting Verify, Change, Reconcile, generation, serta behavior CPM." }
        ]
      },
      {
        title: "Deactivate, import, dan exception",
        pages: "Halaman 23–27",
        paragraphs: [
          "Deactivating Platform menyembunyikannya saat user menambah account dan mencegah CPM mengelola Platform yang tidak aktif. Ini meningkatkan administrability dan performance, tetapi hanya aman setelah tidak ada account aktif atau dependency yang masih membutuhkannya.",
          "Jika target belum didukung, administrator dapat membuat Platform atau mengimpor dari marketplace. Exception Master Policy dibuat berdasarkan Platform, misalnya mengubah frekuensi password change untuk cohort tertentu."
        ]
      }
    ],
    analysis: [
      {
        title: "Platform adalah deployment unit kebijakan teknis",
        paragraphs: [
          "Cara paling aman memahami Platform adalah sebagai paket release: ada configuration, plugin, connector, dependency, target compatibility, owner, test result, dan rollback. Mengubah Platform berarti merilis behavior baru kepada seluruh account yang menunjuknya."
        ],
        bullets: [
          "Hitung jumlah account dan Safe yang terikat sebelum change.",
          "Identifikasi linked account, dependent Platform, PSM connector, dan exception yang ikut terpengaruh.",
          "Gunakan canary account representatif sebelum rollout massal.",
          "Bandingkan Verify, Change, Reconcile, Connect, dan post-change login.",
          "Simpan export/snapshot dan change rationale untuk rollback serta RCA."
        ]
      },
      {
        title: "Gunakan configuration precedence map",
        paragraphs: [
          "Incident sering muncul karena operator membaca satu layer saja. Buat peta precedence dari Master Policy, exception Platform, Platform technical settings, account override, linked account, connector, sampai target policy."
        ],
        bullets: [
          "Tuliskan value efektif, bukan hanya value pada layar yang sedang dibuka.",
          "Tandai apakah value berasal dari global rule, exception, atau parameter teknis.",
          "Bandingkan account gagal dengan account working pada Platform dan target policy yang sama.",
          "Jika satu account perlu berbeda permanen, evaluasi Platform baru daripada override tak terdokumentasi."
        ]
      },
      {
        title: "Kelola lifecycle Platform seperti katalog produk",
        paragraphs: [
          "Tanpa governance, duplicate Platform menghasilkan sprawl. Tetapkan status draft, pilot, active, deprecated, inactive, dan retired; setiap status punya syarat dan owner."
        ],
        bullets: [
          "Nama memuat target/protocol/purpose/rotation hanya bila stabil dan berguna.",
          "Deskripsi memuat business owner, technical owner, source template, dan exception rationale.",
          "Deprecated mencegah onboarding baru tetapi memberi waktu migrasi account lama.",
          "Inactive baru dilakukan setelah query menunjukkan nol account/dependency aktif.",
          "Imported Platform tetap harus melewati compatibility dan security review."
        ]
      }
    ],
    artifacts: [
      "Platform release checklist untuk duplicate, configure, test, pilot, rollout, dan rollback.",
      "Configuration precedence worksheet dari Master Policy sampai target policy.",
      "Platform catalog berisi owner, purpose, account count, connector, dependency, status, dan last review.",
      "Exception register dengan business reason, scope, approver, expiry, dan compensating control.",
      "Canary test matrix untuk Verify, Change, Reconcile, Connect, dan dependent update."
    ],
    keywords: ["Target Platform", "Dependent Platform", "LIN SSH 30", "UI & Workflows", "Automatic Password Management", "Master Policy exception"]
  });

  add("04", {
    extraReadingTime: 23,
    coverageNote: "Seluruh 36 halaman M04 sudah dipetakan. Safe model, naming constraint, permission group, exact access behavior, creation/management, predefined membership, dan AllowedSafes regex sekarang dijelaskan eksplisit.",
    coverage: [
      { pages: "1–7", topic: "Purpose dan Safe overview", treatment: "Safe dijelaskan sebagai boundary storage, authorization, retention, dan audit." },
      { pages: "8–17", topic: "Safe-model design dan contoh ACME", treatment: "Pertanyaan desain, least privilege, dan segmentasi team/account diterjemahkan menjadi metode desain." },
      { pages: "18–23", topic: "Granular Safe permissions", treatment: "List, Use, Retrieve, management, monitoring, workflow, dan advanced permission dijelaskan." },
      { pages: "24–32", topic: "Create/manage Safe dan relation ke Platform", treatment: "Constraint 28 karakter, object ACL warning, member assignment, dan AllowedSafes regex dilengkapi." },
      { pages: "33–36", topic: "Summary dan exercises", treatment: "Diubah menjadi latihan Safe model, permission bundle, dan naming validation." }
    ],
    sourceAddendum: [
      {
        title: "Safe model adalah desain implementasi, bukan template universal",
        pages: "Halaman 8–17",
        paragraphs: [
          "Materi menegaskan tidak ada satu Safe model generik untuk semua organisasi. Model harus menjawab siapa yang membutuhkan akses, tipe account apa yang disimpan, bagaimana tim dan tanggung jawab dipisahkan, serta bagaimana least privilege dipertahankan ketika lingkungan bertambah.",
          "Contoh ACME memisahkan Windows local admin umum, Windows server yang juga menampung Oracle, dan Oracle sysadmin sehingga Windows team dan Oracle team memperoleh akses sesuai tugas tanpa membuka seluruh inventory."
        ],
        bullets: [
          "Safe sebaiknya dibentuk dari authorization boundary dan lifecycle yang sama, bukan sekadar satu Safe per server.",
          "PVWA menyembunyikan banyak kompleksitas Safe dari end user; jangan mengorbankan least privilege hanya demi struktur yang tampak sederhana.",
          "Model harus mempertimbangkan CPM access, auditor, owner, retention, dual control, recording, dan operational ownership."
        ]
      },
      {
        title: "Perbedaan List, Use, dan Retrieve",
        pages: "Halaman 18–23",
        paragraphs: [
          "List Accounts membuat account terlihat. Kombinasi List dan Use memungkinkan user memakai account untuk koneksi PSM tanpa harus melihat password. Retrieve menambahkan kemampuan melihat dan menyalin password. Perbedaan ini adalah inti desain non-disclosure access.",
          "Permission lain dikelompokkan menjadi Account Management, Safe Management and Monitoring, Workflow, dan Advanced. Manage Safe mengubah sebagian properti Safe; Manage Safe Members menambah atau menghapus user/group dan menentukan authorization mereka."
        ],
        table: {
          headers: ["Permission", "Perilaku praktis"],
          rows: [
            ["List Accounts", "Melihat object account di Safe."],
            ["List + Use Accounts", "Menjalankan Connect melalui PSM tanpa harus menyalin secret."],
            ["List + Retrieve Accounts", "Menampilkan atau menyalin password/key jika workflow mengizinkan."],
            ["Manage Safe", "Mengubah properti Safe tertentu."],
            ["Manage Safe Members", "Mengelola member dan Safe authorization."],
            ["Account Management permissions", "Add/edit/delete/rename/unlock account serta memulai operasi CPM sesuai hak spesifik."]
          ]
        }
      },
      {
        title: "Naming constraint dan larangan object-level ACL",
        pages: "Halaman 11 dan 27",
        paragraphs: [
          "Safe name dibatasi maksimum 28 karakter dan materi menyatakan double-byte characters tidak didukung. Object-level access control tidak direkomendasikan karena membuat effective permission sulit dipahami, direview, dan ditroubleshoot dibanding segmentasi Safe yang jelas.",
          "Pada materi, Vault Admins dan Safe Managers memiliki hak menambah Safe. Wizard baru menyederhanakan create Safe dan initial members, sementara classic interface tetap disebut untuk versi sebelum 12.6."
        ],
        commands: [
          { code: "Safe name ≤ 28 characters", meaning: "Constraint yang harus divalidasi oleh naming standard dan automation." },
          { code: "Object-level access control: not recommended", meaning: "Gunakan boundary Safe bila memungkinkan agar permission dapat diaudit secara konsisten." }
        ]
      },
      {
        title: "AllowedSafes membatasi Platform dengan regex",
        pages: "Halaman 32",
        paragraphs: [
          "AllowedSafes membatasi account yang memakai Platform tertentu agar hanya dapat disimpan pada Safe yang namanya match regular-expression pattern. Contoh materi: account pada Platform LIN SSH 30 hanya boleh masuk ke Safe yang dimulai dengan Lin-.",
          "Selain mengurangi salah-onboarding, scope yang lebih kecil membantu CPM performance dan menyederhanakan administrasi. Regex yang terlalu luas atau naming yang tidak konsisten akan menghilangkan manfaat kontrol ini."
        ],
        commands: [
          { code: "AllowedSafes", meaning: "Parameter Platform untuk membatasi Safe yang valid berdasarkan regular expression." },
          { code: "^Lin-", meaning: "Representasi praktis pola prefix untuk Safe Linux; ekspresi aktual harus disesuaikan dengan syntax/build." }
        ]
      }
    ],
    analysis: [
      {
        title: "Desain Safe dari authorization boundary",
        paragraphs: [
          "Pertanyaan pertama bukan 'berapa server per Safe', tetapi 'kelompok account mana yang harus memiliki member, workflow, owner, retention, dan operational lifecycle yang sama'."
        ],
        bullets: [
          "Pisahkan ketika requester/approver atau auditor berbeda.",
          "Pisahkan ketika target sensitivity, environment, atau regulatory retention berbeda.",
          "Pisahkan ketika CPM/PSM workflow dan break-glass process berbeda.",
          "Gabungkan hanya bila effective access dan lifecycle benar-benar identik.",
          "Hindari Safe-per-account kecuali ada requirement khusus karena menambah operational overhead."
        ]
      },
      {
        title: "Gunakan permission bundles, bukan centang ad hoc",
        paragraphs: [
          "Buat role bundle standar agar tiap team tidak memperoleh kombinasi permission unik yang sulit direview. Contoh: Session User, Credential Retriever, Account Operator, Safe Owner, Approver, dan Auditor."
        ],
        bullets: [
          "Session User: List + Use, tanpa Retrieve.",
          "Credential Retriever: List + Retrieve dengan workflow tambahan jika diperlukan.",
          "Account Operator: permission CPM/action yang diperlukan tanpa Manage Safe Members.",
          "Approver: List + Authorize request, umumnya tanpa Use/Retrieve.",
          "Auditor: List, View Safe Members, View Audit, dan recording access sesuai scope."
        ]
      },
      {
        title: "Jadikan naming dan AllowedSafes sebagai preventive control",
        paragraphs: [
          "Naming convention bernilai bila divalidasi otomatis. Gunakan prefix pendek namun bermakna untuk environment, technology, region, dan ownership, lalu selaraskan dengan AllowedSafes."
        ],
        bullets: [
          "Uji regex dengan daftar Safe yang harus match dan tidak boleh match.",
          "Jaga batas 28 karakter agar automation tidak menghasilkan nama terpotong atau collision.",
          "Review orphan Safe, Safe tanpa owner, dan Platform yang match terlalu banyak Safe.",
          "Saat rename/migrasi, periksa Platform restriction, report, script, dan integration yang memakai nama Safe."
        ]
      }
    ],
    artifacts: [
      "Safe-model decision tree berbasis team, sensitivity, environment, workflow, dan retention.",
      "Permission-bundle catalog untuk Session User, Retriever, Operator, Approver, Owner, dan Auditor.",
      "Safe naming linter yang memeriksa maksimum 28 karakter dan pattern organisasi.",
      "AllowedSafes regex test pack dengan positive/negative cases.",
      "Quarterly review untuk member, owner, stale Safe, object ACL, dan effective access."
    ],
    keywords: ["AllowedSafes", "List Accounts", "Use Accounts", "Retrieve Accounts", "Manage Safe Members", "28 characters", "object-level access control"]
  });

  add("05", {
    extraReadingTime: 20,
    coverageNote: "Seluruh 28 halaman M05 sudah dipetakan. Add Account, metadata registration, account properties, dan tiga operasi CPM—Verify, Change, Reconcile—telah diterjemahkan menjadi state dan flow yang dapat dipakai belajar serta troubleshooting.",
    coverage: [
      { pages: "1–3", topic: "Cover dan agenda", treatment: "Menjadi tujuan lifecycle account bagian pertama." },
      { pages: "4–14", topic: "Add account dan account properties", treatment: "Onboarding, Platform, Safe, address, username, password, serta arti registrasi account dijelaskan." },
      { pages: "15–25", topic: "Automatic password management", treatment: "Verify dan Change dijelaskan langkah demi langkah; Reconcile diperkenalkan sebagai mismatch recovery." },
      { pages: "26–28", topic: "Summary, resources, exercises", treatment: "Diubah menjadi validation checklist dan latihan klasifikasi job CPM." }
    ],
    sourceAddendum: [
      {
        title: "Add Account mendaftarkan object; tidak membuat identity di target",
        pages: "Halaman 7–13",
        paragraphs: [
          "Contoh materi memakai Platform LIN SSH 30, Safe Lin-Fin-US, username logon01, dan address target-lin.acme.corp. Setelah form disimpan, PAM hanya mendaftarkan metadata dan secret tentang account bernama logon01; proses itu tidak membuat user logon01 pada Linux target.",
          "Karena itu onboarding harus didahului validasi bahwa target identity memang ada, dapat digunakan sesuai policy, dan owner menyetujui PAM mengambil alih lifecycle credential."
        ],
        bullets: [
          "Account object menghubungkan target address, username, credential, Safe, Platform, dan metadata.",
          "Kesalahan address atau username menghasilkan object yang valid di Vault tetapi menunjuk identity yang salah atau tidak ada.",
          "Keberhasilan Save bukan bukti Verify/Change/Connect akan berhasil."
        ]
      },
      {
        title: "Verify flow",
        pages: "Halaman 17–19",
        paragraphs: [
          "Verify mengonfirmasi bahwa credential di Vault masih cocok dengan credential target. CPM memindai Vault untuk account, membaca account information dan current password, mencoba login ke target, lalu mengirim hasil success atau failure kembali ke Vault.",
          "Verify tidak dimaksudkan untuk mengganti password. Failure berarti ada masalah pada credential, target reachability, plugin/prompt, linked account, target state, atau policy yang harus diklasifikasikan sebelum remediation."
        ],
        commands: [
          { code: "Vault → CPM scan → target login → result → Vault", meaning: "Urutan konseptual Verify pada diagram materi." }
        ]
      },
      {
        title: "Change flow dan state Pending/Completed",
        pages: "Halaman 21–25",
        paragraphs: [
          "Change dimulai ketika CPM memindai account dan login menggunakan current credential. Setelah login berhasil, CPM membuat password baru, menjalankan perubahan pada target, menguji login dengan password baru, lalu hanya menyimpan credential baru ke Vault setelah validasi berhasil.",
          "Materi memperlihatkan state Confirm Change, Pending Change, dan Completed Change. Pending menunjukkan pekerjaan belum selesai; operator harus menilai log dan tahap terakhir, bukan menganggap password baru sudah aman tersimpan."
        ],
        commands: [
          { code: "Current login → generate → change target → verify new → store new", meaning: "Urutan aman Change yang mencegah Vault menyimpan secret yang belum terbukti bekerja." }
        ]
      },
      {
        title: "Reconcile untuk password unknown atau mismatch",
        pages: "Halaman 17 dan pengantar M06",
        paragraphs: [
          "Reconciliation dipakai ketika password di Vault tidak cocok dengan target atau password target tidak diketahui. Berbeda dari Change biasa, Reconcile menggunakan identity lain yang memiliki hak reset untuk menetapkan password baru lalu menyinkronkan Vault dan target.",
          "M05 memperkenalkan tujuan ini; detail linked Reconcile Account, manual/automatic behavior, dan failed Verify → Reconcile flow dilanjutkan pada M06."
        ]
      }
    ],
    analysis: [
      {
        title: "Gunakan onboarding readiness gate",
        paragraphs: [
          "Sebelum menekan Add, pastikan object yang akan dikelola siap secara teknis dan organisasional. Gate mencegah Vault berisi account yang tidak dapat diverifikasi atau tidak jelas ownership-nya."
        ],
        bullets: [
          "Identity target ada, enabled, dan tidak sedang dipakai oleh proses yang belum dipetakan.",
          "Address, port, protocol, Platform, Safe, dan account type tervalidasi.",
          "Current credential tersedia atau Reconcile Account siap.",
          "Target password policy kompatibel dengan Platform generation rule.",
          "Dependency, maintenance window, rollback owner, dan application validation sudah ditentukan."
        ]
      },
      {
        title: "Pahami account sebagai state machine",
        paragraphs: [
          "Account lifecycle lebih mudah ditroubleshoot bila status dipetakan sebagai state: Registered, Verify Pending, Verified, Change Pending, Change Failed, Reconcile Pending, Reconciled, Disabled, atau Locked."
        ],
        bullets: [
          "Catat event yang memindahkan state dan siapa actor-nya.",
          "Bedakan failure sebelum target login, saat password change, dan saat post-change verification.",
          "Jangan mengulang Change berkali-kali tanpa memahami state karena dapat memperbesar desynchronization.",
          "Setelah remediation, lakukan Verify atau login test sesuai SOP untuk menutup state secara eksplisit."
        ]
      },
      {
        title: "Klasifikasikan failure berdasarkan langkah terakhir yang sukses",
        paragraphs: [
          "Log menjadi lebih mudah dibaca bila pertanyaan utamanya adalah: langkah mana yang terakhir berhasil? Dari situ ruang penyebab dapat dipersempit."
        ],
        bullets: [
          "Tidak dapat membaca object: Safe permission, Platform assignment, atau component access.",
          "Tidak mencapai target: DNS, route, firewall, port, service, atau address.",
          "Mencapai target tetapi current login gagal: secret mismatch, lockout, authentication mode, prompt, atau linked logon.",
          "Change command gagal: target policy, privilege, plugin, prompt, atau session restriction.",
          "New login gagal: perubahan tidak efektif, propagation, target behavior, atau generated password tidak kompatibel."
        ]
      }
    ],
    artifacts: [
      "Account onboarding readiness form dengan target owner dan application owner sign-off.",
      "CPM state-machine diagram untuk Verify, Change, Reconcile, pending, dan failure.",
      "Failure-stage worksheet berdasarkan langkah terakhir yang sukses.",
      "Post-onboarding validation checklist untuk Verify, Change, Connect, audit, dan dependency.",
      "Rollback record berisi previous state, action, result, dan pihak yang memvalidasi target."
    ],
    keywords: ["registered information", "Verify Process", "Change Process", "Pending Change", "Completed Change", "Reconciliation"]
  });

  add("06", {
    extraReadingTime: 24,
    coverageNote: "Seluruh 28 halaman M06 sudah dipetakan. Linked Logon/Reconcile account, root access pattern, manual/automatic reconciliation, SSH password/key authentication, SSH Key Manager, rotation, retrieval, connection, dan key push telah dijelaskan.",
    coverage: [
      { pages: "1–3", topic: "Cover, agenda, linked-account overview", treatment: "Dijadikan pembeda Logon dan Reconcile Account." },
      { pages: "4–15", topic: "Logon dan Reconcile workflow", treatment: "Root example, PermitRootLogin, association, failed Verify/reconcile, dan manual/automatic behavior dijelaskan." },
      { pages: "16–25", topic: "SSH password dan key management", treatment: "Authentication flow, trade-off key, Vaulting, rotation, Retrieve/Connect, dan application push dijelaskan." },
      { pages: "26–28", topic: "Summary dan exercise", treatment: "Diubah menjadi linked-account design dan SSH-key migration exercise." }
    ],
    sourceAddendum: [
      {
        title: "Logon Account untuk akses bertahap",
        pages: "Halaman 3–8",
        paragraphs: [
          "Materi menggunakan root sebagai contoh account yang dilarang login remote. Dengan PermitRootLogin no pada /etc/ssh/sshd_config, CPM atau PSM masuk menggunakan non-privileged Logon Account, kemudian switch ke root untuk melakukan password change atau membuka sesi.",
          "Logon Account dipakai ketika password target diketahui tetapi account tidak boleh login langsung. Ia digunakan secara rutin, sehingga availability dan credential health-nya menjadi dependency banyak account. Superuser seperti root tidak disarankan menjadi Logon Account."
        ],
        commands: [
          { code: "PermitRootLogin no", meaning: "Contoh SSH hardening yang membuat root memerlukan jalur Logon Account." },
          { code: "login as logon01 → su - root", meaning: "Urutan contoh materi untuk masuk dengan account perantara lalu switch ke root." }
        ]
      },
      {
        title: "Reconcile Account dan failed Verify flow",
        pages: "Halaman 9–15",
        paragraphs: [
          "Reconcile Account biasanya adalah domain atau service account dengan privilege untuk reset password account target. Manual reconciliation aktif secara default menurut materi; automatic reconciliation harus diaktifkan secara eksplisit.",
          "Pada flow failure, CPM mencoba current credential dan gagal, menandai account, membuat password baru, masuk menggunakan Reconcile Account, menjalankan reset, menguji login menggunakan password baru, lalu menyimpan secret baru setelah sukses."
        ],
        bullets: [
          "Reconcile digunakan untuk lost/unknown password dan seharusnya jarang dipakai.",
          "Account ini memerlukan elevated privilege dan harus dikhususkan untuk fungsi reconcile.",
          "Kegagalan banyak account sekaligus dapat berasal dari satu linked Reconcile Account yang locked, expired, atau kehilangan privilege."
        ]
      },
      {
        title: "SSH password versus asymmetric key authentication",
        pages: "Halaman 17–20",
        paragraphs: [
          "Password authentication membangun encrypted session lalu server memvalidasi password user. Pada key authentication, client membuktikan kepemilikan private key terhadap public key yang dipasang di target tanpa mengirim private key melalui network.",
          "Kelebihan key adalah secret panjang dan tidak ditransmisikan. Kekurangannya: satu private key sering dipercaya banyak target, sehingga compromise membuka semua target tersebut, dan key lebih sulit diganti daripada password bila lifecycle tidak dikelola."
        ]
      },
      {
        title: "SSH Key Manager lifecycle",
        pages: "Halaman 21–25",
        paragraphs: [
          "SSH Key Manager membuat key pair unik untuk tiap target, menyimpan private key di Vault, merotasi key pair melalui CPM, dan mendistribusikan public key ke target. SSH key dapat berbagi Safe dengan password tetapi membutuhkan Platform sendiri.",
          "Saat private key lama dimasukkan ke Vault, materi menganggap key tersebut sudah terekspos dan menyarankan rotasi segera. User dengan Retrieve dapat mengambil salinan private key; user dengan Use dapat Connect dari PVWA. PAM juga dapat mendorong private key ke application server yang membutuhkannya."
        ],
        commands: [
          { code: "Change", meaning: "Action yang digunakan untuk merotasi SSH key seperti password pada materi." },
          { code: "Retrieve Accounts", meaning: "Mengizinkan pengambilan salinan private key." },
          { code: "Use Accounts", meaning: "Mengizinkan koneksi tanpa perlu membuka secret secara langsung." }
        ]
      }
    ],
    analysis: [
      {
        title: "Linked account adalah shared dependency",
        paragraphs: [
          "Satu Logon atau Reconcile Account dapat menopang banyak target. Karena itu blast radius harus diukur dan monitoring-nya lebih ketat daripada account biasa."
        ],
        bullets: [
          "Inventaris semua account yang merujuk linked identity.",
          "Monitor lockout, expiry, privilege drift, network restriction, dan password-operation failure.",
          "Gunakan dedicated account, bukan human admin atau root umum.",
          "Uji canary setelah perubahan linked account sebelum CPM batch berikutnya.",
          "Siapkan alternatif atau procedure manual bila dependency kritis tidak tersedia."
        ]
      },
      {
        title: "Pilih Logon atau Reconcile berdasarkan tujuan",
        paragraphs: [
          "Keduanya sama-sama identity perantara, tetapi threat model dan timing berbeda. Salah memilih dapat memberi privilege berlebih atau menghasilkan workflow yang tidak pernah berhasil."
        ],
        table: {
          headers: ["Pertanyaan", "Logon", "Reconcile"],
          rows: [
            ["Password target diketahui?", "Ya", "Tidak harus"],
            ["Tujuan", "Masuk lalu switch/elevate", "Reset credential target"],
            ["Frekuensi", "Rutin", "Exception/recovery"],
            ["Privilege", "Cukup untuk mencapai/switch", "Cukup untuk reset account target"],
            ["Risiko utama", "Outage banyak flow bila unavailable", "Mass reset capability bila disalahgunakan"]
          ]
        }
      },
      {
        title: "Kurangi blast radius SSH key",
        paragraphs: [
          "Target utama pengembangan bukan hanya menyimpan private key, tetapi menghilangkan reuse lintas target, memperpendek lifetime, membatasi retrieval, dan membuktikan public-key propagation."
        ],
        bullets: [
          "Gunakan key pair unik per target atau trust boundary.",
          "Prioritaskan Use/Connect dibanding Retrieve bila workflow memungkinkan.",
          "Rotasi segera key yang pernah berada di workstation atau dikirim manual.",
          "Validasi authorized_keys dan application copy setelah change.",
          "Alert pada retrieval, failed rotation, stale public key, dan key yang dipercaya banyak host."
        ]
      }
    ],
    artifacts: [
      "Linked-account dependency graph dan blast-radius report.",
      "Decision table kapan memakai Logon versus Reconcile Account.",
      "Health check khusus linked account sebelum maintenance atau mass rotation.",
      "SSH-key migration checklist dari shared key ke unique managed key pairs.",
      "Validation sheet untuk public-key propagation, application key copy, Retrieve, dan Connect."
    ],
    keywords: ["Logon Account", "Reconcile Account", "PermitRootLogin no", "Manual Reconciliation", "SSH Key Manager", "private key", "public key"]
  });

  add("07", {
    extraReadingTime: 22,
    coverageNote: "Seluruh 24 halaman M07 sudah dipetakan. Usage/dependent lifecycle, Scheduled Task example, Target-to-Dependent references, configuration-file dependency, encryption hook, dan discoverable versus manual dependency telah dijelaskan.",
    coverage: [
      { pages: "1–3", topic: "Cover dan objective", treatment: "Menjadi tujuan mengelola berbagai tipe Dependent Platform." },
      { pages: "4–10", topic: "Usage concept dan Scheduled Task", treatment: "SearchForUsages, SchedTask reference, dan synchronization flow dijelaskan." },
      { pages: "11–18", topic: "Configuration-file dependencies", treatment: "File types, path/section/parameter, Logon Account, Encryption Command, dan Regex dirinci." },
      { pages: "19–21", topic: "Dependency discovery support", treatment: "Discoverable Windows dependencies dan manual dependency types dibedakan." },
      { pages: "22–24", topic: "Summary dan exercises", treatment: "Diubah menjadi dependency mapping dan outage-prevention exercise." }
    ],
    sourceAddendum: [
      {
        title: "Usage dan SearchForUsages",
        pages: "Halaman 4–10",
        paragraphs: [
          "Usage adalah occurrence lain dari credential target account—misalnya service, task, registry, atau file konfigurasi. Ketika CPM mengganti password target, setiap occurrence terdaftar harus diperbarui agar workload tidak berhenti.",
          "Materi memakai local Windows user sendmail01 yang menjalankan SchedTask01. Target Platform harus mereferensikan Dependent Platform dengan object ID yang sesuai dan SearchForUsages=Yes agar CPM mencari serta memperbarui usage."
        ],
        commands: [
          { code: "SearchForUsages=Yes", meaning: "Mengaktifkan pencarian dependent usages dari Target Platform." },
          { code: "SchedTask", meaning: "Object ID contoh untuk Dependent Platform Scheduled Task yang direferensikan Target Platform." }
        ]
      },
      {
        title: "Configuration-file dependency",
        pages: "Halaman 11–17",
        paragraphs: [
          "CPM dapat mengelola credential pada plain text, INI, XML, dan web configuration file. Dependency ini harus ditambahkan manual ke Target Platform dan account, termasuk server address, full path, serta lokasi nilai password dalam struktur file.",
          "Contoh materi memperbarui password dba01 pada /var/opt/app/app01.ini di target 10.0.0.20, section Server, parameter Password. Jika server dependency memerlukan account tambahan untuk login, Logon Account harus dihubungkan ke usage."
        ],
        commands: [
          { code: "/var/opt/app/app01.ini", meaning: "Path contoh configuration-file usage pada materi." },
          { code: "[Server] Password=...", meaning: "Section dan parameter contoh tempat credential ditemukan." }
        ]
      },
      {
        title: "Encryption Command dan Encryption Regex",
        pages: "Halaman 18",
        paragraphs: [
          "Password dalam configuration file dapat dienkripsi menggunakan external command yang berjalan dari CPM. Encryption Command berisi full path command; Encryption Regex memproses output command untuk mengambil nilai yang harus ditulis.",
          "Bila Encryption Regex tidak didefinisikan, materi menyatakan behavior setara dengan (.*). Karena command eksternal menjadi bagian credential lifecycle, exit code, output, permission file, secret exposure, dan timeout harus masuk test serta monitoring."
        ],
        commands: [
          { code: "Encryption Command", meaning: "Full path program eksternal yang mengenkripsi password sebelum ditulis." },
          { code: "Encryption Regex", meaning: "Pattern yang mengambil hasil command; default behavior disebut setara (.*)." }
        ]
      },
      {
        title: "Dependency yang dapat dan tidak dapat ditemukan",
        pages: "Halaman 19–21",
        paragraphs: [
          "Accounts Discovery dapat mendeteksi COM+ Application, IIS Directory Security/Anonymous Access, IIS Application Pool, Scheduled Task, dan Windows Service account, lalu mengonboard dependency yang didukung.",
          "Database String, INI File, Private SSH Key, Text File, Web File, Windows Registry, dan XML File tidak ditemukan otomatis pada materi dan harus ditambahkan manual. 'Tidak terdeteksi' tidak berarti 'tidak ada'; application owner tetap harus membantu inventory."
        ]
      }
    ],
    analysis: [
      {
        title: "Ubah daftar dependency menjadi graph",
        paragraphs: [
          "Password change adalah graph transaction: satu source account terhubung ke banyak usage. Graph harus memuat node, edge, update order, validation owner, dan rollback agar partial failure tidak tersembunyi."
        ],
        bullets: [
          "Node source: target account dan linked account.",
          "Node usage: service, task, app pool, registry, config file, private key, connection string.",
          "Edge: lokasi, dependent Platform, logon method, dan update sequence.",
          "Validation: service/task/app test setelah update.",
          "Risk score: criticality, number of dependencies, maintenance window, dan rollback complexity."
        ]
      },
      {
        title: "Gunakan safe rotation sequence",
        paragraphs: [
          "Untuk account dengan dependency, change tidak selesai hanya karena target password berhasil diganti. Operasi harus menilai semua usage dan business service."
        ],
        bullets: [
          "Pre-check source account, dependency reachability, dan application owner readiness.",
          "Change target credential.",
          "Update setiap usage dengan result per edge.",
          "Restart/reload hanya bila dependency type memerlukan dan telah disetujui.",
          "Lakukan synthetic transaction atau health check aplikasi.",
          "Jika partial failure, gunakan predefined rollback atau reconcile path—bukan change ulang acak."
        ]
      },
      {
        title: "Tutup discovery gap bersama application owner",
        paragraphs: [
          "Discovery otomatis hanya menangkap tipe tertentu. Tambahkan questionnaire dan code/config search untuk menemukan hard-coded credential yang tidak terlihat oleh scan PAM."
        ],
        bullets: [
          "Cari username/service identity pada repository, deployment manifest, task definition, dan runbook.",
          "Tanyakan reload behavior, encryption wrapper, secret cache, dan active/passive node.",
          "Buat evidence bahwa semua usage telah diuji setelah rotation.",
          "Masukkan dependency baru ke graph sebelum account masuk automatic rotation."
        ]
      }
    ],
    artifacts: [
      "Credential-dependency graph per managed service account.",
      "Rotation transaction checklist dengan result setiap usage.",
      "Application-owner questionnaire untuk non-discoverable dependencies.",
      "Test harness Encryption Command: exit code, output regex, timeout, permission, dan secret redaction.",
      "Partial-failure runbook untuk reconcile, rollback, dan business validation."
    ],
    keywords: ["SearchForUsages", "SchedTask", "app01.ini", "Encryption Command", "Encryption Regex", "COM+", "IIS Application Pool", "Windows Registry"]
  });

  add("08", {
    extraReadingTime: 25,
    coverageNote: "Seluruh 38 halaman M08 sudah dipetakan. Exact base permission behavior, transparent connection, reason, dual-control variants, exclusive lock lifecycle, PSM auto-release, one-time password, MinValidityPeriod, dan kombinasi workflow telah dijelaskan.",
    coverage: [
      { pages: "1–6", topic: "Base access dan transparent connection", treatment: "List/Retrieve/Use behavior serta corporate control Show/Copy/Connect dijelaskan." },
      { pages: "7–9", topic: "Reason for Access", treatment: "Master Policy activation dan predefined reason per Platform dijelaskan." },
      { pages: "10–22", topic: "Dual Control", treatment: "Requester/approver permission, peer, bypass, multi-group, multi-level, dan manager approval dirinci." },
      { pages: "23–35", topic: "Exclusive dan one-time password", treatment: "Lock/check-in/release/change, PSM auto-release, MinValidityPeriod, dan precedence request timeframe dijelaskan." },
      { pages: "36–38", topic: "Summary dan exercises", treatment: "Diubah menjadi workflow-combination design lab." }
    ],
    sourceAddendum: [
      {
        title: "Base permission menentukan tombol dan exposure",
        pages: "Halaman 3–6",
        paragraphs: [
          "List + Retrieve memungkinkan Show dan Copy. List + Use memungkinkan Connect. Di atas permission dasar ini, workflow menentukan kapan, berapa lama, dengan alasan atau approval apa account boleh dipakai.",
          "Allow EPV Transparent Connections memberi corporate-level control apakah end user boleh melihat password atau hanya menjalankan transparent connection. Default pada contoh materi mengizinkan connect dan password viewing, tetapi organisasi dapat mempersempitnya."
        ],
        table: {
          headers: ["Kombinasi", "Hasil"],
          rows: [
            ["List + Retrieve", "Show dan Copy credential."],
            ["List + Use", "Connect melalui jalur yang dikonfigurasi."],
            ["List + Authorize Account Requests", "Approver dapat menerima/menolak request pada Safe."],
            ["Access Safe without confirmation", "Membypass Dual Control untuk member yang diberi hak tersebut."]
          ]
        }
      },
      {
        title: "Reason for Access dan scope Platform",
        pages: "Halaman 7–9",
        paragraphs: [
          "Require Users to Specify Reason for Access memaksa requester memberikan alasan. Pilihan dropdown didefinisikan pada Platform di bagian Privileged Account Request, sehingga alasan dapat berbeda antar cohort account.",
          "Reason meningkatkan audit context tetapi bukan approval atau validasi otomatis. Alasan generik seperti 'maintenance' perlu dikombinasikan dengan ticket ID, target scope, dan expected activity bila organisasi membutuhkan evidence yang dapat direkonsiliasi."
        ]
      },
      {
        title: "Dual Control: peer, bypass, multi-group, dan multi-level",
        pages: "Halaman 10–22",
        paragraphs: [
          "Requester membutuhkan List serta Use dan/atau Retrieve. Approver membutuhkan List dan Authorize, dan biasanya tidak menggunakan account. Sistem mencegah self-approval, sehingga satu group dapat menjalankan peer approval selama requester dan approver adalah orang berbeda.",
          "Bila lebih dari satu approver group dikonfigurasi dalam model multi-group, setidaknya satu orang dari setiap group harus menyetujui. Multi-level mengirim request secara berurutan dari level pertama ke level berikutnya. Direct manager approval dapat memakai Manager attribute di AD. Memilih semua confirmer berisiko menunda request bila user tidak tersedia."
        ],
        bullets: [
          "Access Safe without confirmation memberi bypass dan harus sangat terbatas.",
          "Email notification membantu awareness tetapi PVWA tetap menjadi source of truth status request.",
          "Approver design harus mempertimbangkan on-call coverage, conflict of interest, dan emergency process."
        ]
      },
      {
        title: "Exclusive access, check-in, release, dan PSM auto-release",
        pages: "Halaman 23–28",
        paragraphs: [
          "Exclusive access mengunci account pada satu user. User lain melihat lock sampai owner check-in atau administrator dengan hak force release melepaskannya. Setelah check-in, CPM menjadwalkan immediate password change.",
          "Mulai versi 11.7 pada materi, PSM dapat auto-release saat sesi ditutup bila Platform dikonfigurasi. Ini mengurangi lock yang tertinggal, tetapi sesi abnormal, network loss, atau koneksi non-PSM tetap perlu penanganan."
        ]
      },
      {
        title: "One-time password dan MinValidityPeriod",
        pages: "Halaman 29–35",
        paragraphs: [
          "One-time password diaktifkan di Master Policy. Beberapa user dapat mengakses account bersamaan; password ditandai untuk change berdasarkan MinValidityPeriod pada Platform. Nilai 60 berarti change 60 menit setelah access, dan timer reset ketika user lain mengakses.",
          "Jika Exclusive dan One-Time digabung, account tetap eksklusif tetapi dapat auto-release/change setelah minimum validity. Bila Dual Control request timeframe masih aktif, timeframe request mengalahkan MinValidityPeriod sehingga change menunggu window selesai."
        ],
        commands: [
          { code: "MinValidityPeriod=60", meaning: "Contoh: password berubah 60 menit setelah dipakai, dengan interaksi workflow sebagaimana dijelaskan materi." }
        ]
      }
    ],
    analysis: [
      {
        title: "Pilih workflow dari risk scenario",
        paragraphs: [
          "Jangan mengaktifkan semua workflow untuk semua account. Tentukan ancaman yang ingin dikurangi: disclosure, unauthorized timing, concurrent conflict, stale credential, atau missing accountability."
        ],
        bullets: [
          "List + Use tanpa Retrieve untuk mengurangi secret disclosure.",
          "Reason untuk menambah business context pada aktivitas yang memang boleh dilakukan.",
          "Dual Control untuk akses berisiko tinggi yang membutuhkan pre-authorization.",
          "Exclusive untuk account yang tidak aman dipakai concurrent atau mudah konflik.",
          "One-Time untuk memperpendek validitas secret setelah penggunaan.",
          "PSM recording/monitoring untuk evidence dan response selama sesi."
        ]
      },
      {
        title: "Rancang approval yang tersedia saat dibutuhkan",
        paragraphs: [
          "Kontrol yang terlalu ketat tetapi tidak tersedia mendorong bypass. Ukur median approval time, request expiry, rejected reason, out-of-hours coverage, dan emergency use."
        ],
        bullets: [
          "Gunakan role approver, bukan ketergantungan pada satu nama personal.",
          "Pisahkan peer approval biasa, CAB/change approval, manager approval, dan emergency approval.",
          "Hindari requirement 'all approvers' tanpa coverage dan delegation.",
          "Review bypass member dan setiap penggunaan bypass.",
          "Hubungkan request ke ticket/change record untuk reconciliation."
        ]
      },
      {
        title: "Modelkan timer dan lock secara eksplisit",
        paragraphs: [
          "Exclusive, one-time password, request window, session duration, and CPM schedule menciptakan beberapa timer. Dokumentasikan precedence agar user dan L2 tahu kapan account akan release atau change."
        ],
        bullets: [
          "Catat lock owner, request start/end, last access, MinValidityPeriod, dan next CPM run.",
          "Sediakan runbook force release dengan approval dan audit.",
          "Uji close normal, disconnect abnormal, PSM crash, request expiry, dan concurrent access.",
          "Alert pada lock yang melewati threshold dan repeated force release."
        ]
      }
    ],
    artifacts: [
      "Workflow selector berdasarkan disclosure, timing, concurrency, rotation, dan audit risk.",
      "Requester/approver permission matrix dan conflict-of-interest check.",
      "Approval availability dashboard: median time, expiry, bypass, rejection, dan after-hours coverage.",
      "Timer/precedence diagram untuk request window, session, MinValidityPeriod, release, dan CPM change.",
      "Test cases untuk self-approval prevention, multi-group, multi-level, auto-release, dan force release."
    ],
    keywords: ["Authorize Account Requests", "Dual Control", "Peer Approval", "Multi-Group Approval", "Multi-Level Approval", "Exclusive Password", "MinValidityPeriod", "Check-in"]
  });

  add("09", {
    extraReadingTime: 30,
    coverageNote: "Seluruh 56 halaman M09 sudah dipetakan. Bulk CSV limit, Windows/UNIX discovery, scanner credential, Pending Safe, rule precedence, automatic onboarding, continuous discovery, DNA, dan tiga REST onboarding method kini dijelaskan.",
    coverage: [
      { pages: "1–10", topic: "Single/bulk onboarding methods", treatment: "CSV structure, use case, limit, dan concurrency restriction dirinci." },
      { pages: "11–25", topic: "Windows discovery dan Pending Accounts", treatment: "CPM Scanner flow, credential requirement, categorization, preview, dependency, dan manual onboarding dijelaskan." },
      { pages: "26–36", topic: "Automatic Onboarding Rules", treatment: "Filter, Platform, Safe, initial password, Auto Verify, precedence, dan dependency limit dijelaskan." },
      { pages: "37–45", topic: "UNIX dan continuous discovery", treatment: "Input scan, SSH-key option, PTA login/group detections, dan supported cloud targets diterangkan." },
      { pages: "46–56", topic: "DNA, REST, summary, exercise", treatment: "Discovery sources dan REST Add/Add Discovered/Bulk methods dipetakan ke pipeline onboarding." }
    ],
    sourceAddendum: [
      {
        title: "Bulk CSV upload dan batas operasional",
        pages: "Halaman 6–10",
        paragraphs: [
          "Bulk file memakai comma-separated values; setiap row mewakili satu account beserta properties. Metode ini cocok untuk migrasi repository, tahap awal implementasi, atau onboarding department baru.",
          "Materi menetapkan batas penting: linked account dan dependency tidak didukung, Safe dan group harus sudah ada, maksimum 10.000 account per file, proses tidak dapat dibatalkan, file berikutnya menunggu upload saat ini selesai, dan beberapa user tidak dapat upload bersamaan."
        ],
        commands: [
          { code: "Maximum 10,000 accounts per CSV", meaning: "Batas file pada materi." },
          { code: "No cancel / no parallel file upload", meaning: "Upload adalah operasi serial yang harus divalidasi sebelum dimulai." }
        ]
      },
      {
        title: "Windows Discovery flow dan scanner credential",
        pages: "Halaman 12–25",
        paragraphs: [
          "Vault Admin membuat discovery; CPM Scanner mengambil task dari Vault, membaca directory, mengautentikasi ke target Windows, menemukan account, lalu memproses hasil melalui Automatic Onboarding Rules. Account tanpa matching rule masuk Pending Safe/Pending Accounts untuk review manual.",
          "Scan account harus berupa domain account dengan read permission pada Active Directory dan local administrative rights pada Windows server/workstation yang dipindai. Discovery juga memilih domain, secure directory connection, OU target, CPM scanner, serta one-time atau recurring schedule."
        ],
        bullets: [
          "Beberapa discovery dari CPM Scanner berbeda dapat berjalan bersamaan.",
          "Account dikategorikan privileged bila menjadi member Local Administrators pada mesin yang ditemukan.",
          "Pending preview menampilkan detail; dependency column menunjukkan Windows service/scheduled task usage.",
          "Manual onboarding memilih Safe, Platform, dan menilai apakah reconcile tersedia."
        ]
      },
      {
        title: "Automatic Onboarding Rules dan precedence",
        pages: "Halaman 26–36",
        paragraphs: [
          "Rule memfilter discovered account, memilih Platform dan Safe, serta menetapkan properties termasuk initial password handling. Jika Platform memiliki Reconcile Account dan Auto Verify on Add=Yes, onboarding dapat dilanjutkan dengan immediate automatic password change.",
          "Rule baru memperoleh precedence tertinggi. Rules berlaku untuk Accounts Discovery dan REST Add Discovered Accounts. Account yang tidak match masuk Pending; rule otomatis pada materi hanya berlaku untuk account tanpa dependencies."
        ],
        commands: [
          { code: "Auto Verify on Add=Yes", meaning: "Dengan Reconcile Account, dapat memicu automation onboarding dan immediate credential management." },
          { code: "New rule → highest precedence", meaning: "Rule baru dievaluasi lebih dulu; overlap dapat mengubah destination atau Platform account." }
        ]
      },
      {
        title: "UNIX discovery dan continuous discovery",
        pages: "Halaman 37–45",
        paragraphs: [
          "UNIX discovery memerlukan CSV alamat UNIX/Linux, scan user, default password, CPM Scanner, pilihan scan SSH Keys, dan schedule one-time atau recurring. Input dan privilege scan identity harus diamankan karena mencakup banyak host.",
          "Continuous discovery melalui PTA dapat mendeteksi unmanaged privileged login untuk Windows, UNIX, AWS, dan Azure; custom plugin dapat menambah platform lain. PTA juga memonitor membership Windows Local Administrators untuk response lebih cepat."
        ]
      },
      {
        title: "DNA dan REST onboarding methods",
        pages: "Halaman 46–52",
        paragraphs: [
          "Materi menyebut Discovery and Audit (DNA) sebagai metode assessment/discovery dan PAM Web Services sebagai integrasi script atau third-party application melalui PVWA. Tiga method onboarding utama adalah Add Account, Add Discovered Accounts, dan Create Bulk Upload of Accounts.",
          "Add Account cocok ketika Safe dan Platform sudah diketahui. Add Discovered Accounts menerima hasil dari CPM Scanner, DNA, third party, atau PTA untuk Pending Safe atau automatic rule processing. Bulk method membuat job file skala besar."
        ]
      }
    ],
    analysis: [
      {
        title: "Bangun onboarding factory dengan quality gates",
        paragraphs: [
          "Discovery bukan tujuan akhir; output harus melewati normalization, ownership, risk classification, rule evaluation, credential control, validation, dan handoff. Jadikan pipeline ini repeatable."
        ],
        bullets: [
          "Deduplicate berdasarkan target identity, address, domain, dan source evidence.",
          "Validasi owner, criticality, account type, dependency, Platform, Safe, dan reconcile readiness.",
          "Gunakan dry-run report sebelum bulk atau automatic onboarding.",
          "Canary onboarding lebih dulu, lalu cohort bertahap.",
          "Tutup dengan Verify/Change/Connect/dependency validation dan exception list."
        ]
      },
      {
        title: "Kelola rule seperti firewall policy",
        paragraphs: [
          "Rule order dan overlap dapat mengirim account ke Safe/Platform yang salah. Buat hit simulation dan review setiap rule baru terhadap seluruh rule lama."
        ],
        bullets: [
          "Tentukan match criteria yang mutually exclusive bila memungkinkan.",
          "Simpan contoh account yang harus match dan tidak boleh match.",
          "Ukur hit count, unmatched count, conflict, dan manual override.",
          "Review highest-precedence insertion sebelum publish.",
          "Version rule, owner, business rationale, dan rollback order."
        ]
      },
      {
        title: "Automation tidak boleh mengabaikan dependency",
        paragraphs: [
          "Rule otomatis hanya berlaku pada account tanpa dependencies di materi. Ini adalah guardrail penting: immediate rotation dapat mematikan service bila usage belum dipetakan."
        ],
        bullets: [
          "Account dengan dependency masuk remediation queue terpisah.",
          "Application owner mengonfirmasi maintenance dan validation path.",
          "Linked/reconcile account disiapkan sebelum credential takeover.",
          "Continuous discovery event tidak langsung menjadi mass rotation tanpa identity confidence dan exception handling."
        ]
      },
      {
        title: "Ukur discovery-to-control funnel",
        paragraphs: [
          "Dashboard sebaiknya menunjukkan berapa asset dipindai, account ditemukan, privileged, duplicate, matched rule, pending, onboarded, verified, managed, dan failed. Funnel memperlihatkan bottleneck yang tidak terlihat dari jumlah discovery saja."
        ]
      }
    ],
    artifacts: [
      "CSV preflight validator untuk schema, required fields, duplicate, Safe, Platform, dan 10.000-row limit.",
      "Discovery credential requirement sheet dan least-privilege review.",
      "Rule simulation matrix dengan precedence, positive/negative sample, dan destination result.",
      "Onboarding factory board dari discovered sampai managed/validated.",
      "Dependency exception queue dan business-owner approval workflow.",
      "Discovery funnel dashboard beserta aging Pending Accounts."
    ],
    keywords: ["10,000 accounts", "Pending Safe", "Pending Accounts", "CPM Scanner", "Automatic Onboarding Rules", "Auto Verify on Add", "Continuous Accounts Discovery", "DNA", "Add Discovered Accounts"]
  });

  add("10", {
    extraReadingTime: 28,
    coverageNote: "Seluruh 38 halaman M10 sudah dipetakan. Universal PSM flow, connector lifecycle, Ad-Hoc, HTML5 Gateway, PSM for Windows native RDP, preconfigured RDP alternate shell, dan PSM for SSH/PSMP connection string telah dijelaskan.",
    coverage: [
      { pages: "1–10", topic: "PSM benefits dan core flow", treatment: "Isolation, monitoring, recording, credential fetch, target connection, SIEM/PTA, dan recording storage dijelaskan." },
      { pages: "11–16", topic: "Connection Components", treatment: "Built-in/marketplace/custom connector, Platform assignment, import, dan Universal Connector dijelaskan." },
      { pages: "17–25", topic: "Ad-Hoc dan HTML5 Gateway", treatment: "Use case, prerequisite, user input, WebSocket flow, port 443, dan method selection dijelaskan." },
      { pages: "26–34", topic: "PSM for Windows dan PSM for SSH", treatment: "Native client flow, RDP file alternate shell, PSMP string, dan native SSH flow dirinci." },
      { pages: "35–38", topic: "Summary dan resources", treatment: "Diubah menjadi connector/network/session-path lab." }
    ],
    sourceAddendum: [
      {
        title: "PSM flow dan Connection Components",
        pages: "Halaman 4–16",
        paragraphs: [
          "PSM memberi isolation, monitoring, dan recording. Flow standar: user login PVWA, connect ke PSM memakai RDP/TLS, PSM mengambil credential dari Vault, connector membuka native protocol ke target, audit diteruskan ke SIEM/PTA, dan recording disimpan ke Vault.",
          "Connection Component mendefinisikan cara third-party client dipakai untuk target, misalnya SQLPlus, RDP, PuTTY, atau WinSCP. Connector harus ditautkan ke Platform. Materi menyebut built-in connector, marketplace connector, custom connector, dan Universal Connector berbasis AutoIT."
        ],
        bullets: [
          "Default Platform diasosiasikan dengan PSM pertama yang diinstal pada materi.",
          "Connector import dan Platform linking dapat dikelola dari interface administrasi baru.",
          "Connector failure harus dipisahkan dari credential retrieval dan target authentication failure."
        ]
      },
      {
        title: "PSM Ad-Hoc Connection",
        pages: "Halaman 18–20",
        paragraphs: [
          "Ad-Hoc memungkinkan koneksi aman ke mesin yang didukung PSM ketika account tidak disimpan di Vault atau user memakai personal account. Isolation, monitoring, dan recording tetap tersedia, tetapi user memasukkan client, target address, username, password, dan detail lain saat launch.",
          "PSM Secure Connect Platform harus aktif dan privileged session monitoring/isolation harus enabled secara global atau melalui exception. Karena credential dapat dimasukkan user, logging dan data-handling policy harus memastikan secret tidak bocor ke log atau recording."
        ]
      },
      {
        title: "HTML5 Gateway flow",
        pages: "Halaman 21–25",
        paragraphs: [
          "HTML5 Gateway menghindari direct RDP dari endpoint dengan men-tunnel sesi browser ke gateway memakai secure WebSocket pada port 443, lalu gateway membuka RDP ke PSM. Gateway berbasis Apache Guacamole pada Linux dan dapat co-host dengan PSM for SSH menurut materi.",
          "User dapat diberi pilihan HTML5 atau RDP-file pada level Connection Component. System-level enablement dilakukan per PSM server, sehingga availability dan route gateway harus dimasukkan ke topology."
        ],
        commands: [
          { code: "Browser → WebSocket 443 → HTML5 Gateway → RDP → PSM", meaning: "Jalur browser-based session pada diagram materi." }
        ]
      },
      {
        title: "PSM for Windows dan preconfigured RDP file",
        pages: "Halaman 27–30",
        paragraphs: [
          "PSM for Windows memungkinkan user memakai RDP-compliant client langsung ke PSM tanpa PVWA, lalu PSM menghubungkan target dengan protocol yang sesuai. RDP client harus mendukung Start Program; user dapat memakai single atau multi-factor authentication.",
          "RDP file dapat membawa PSM address dan target detail. Contoh alternate shell menyertakan privileged account, target address, dan Connection Component. enablecredsspsupport:i:0 juga muncul pada contoh file materi."
        ],
        commands: [
          { code: "alternate shell:s:psm /u localadmin01 /a target-win.acme.corp /c PSM-RDP", meaning: "Contoh parameter preconfigured RDP file dari materi." },
          { code: "enablecredsspsupport:i:0", meaning: "Setting yang muncul dalam contoh RDP file materi; validasi requirement dan build sebelum penggunaan." }
        ]
      },
      {
        title: "PSM for SSH / PSMP native connection",
        pages: "Halaman 31–34",
        paragraphs: [
          "PSM for SSH—sebelumnya disebut PSM SSH Proxy atau PSMP—mempertahankan workflow native UNIX/Linux. User membuka SSH ke PSM, PSM mengambil privileged password dari Vault, lalu membuka SSH ke target; audit diteruskan ke SIEM/PTA dan disimpan.",
          "Connection tidak diluncurkan dari PVWA, melainkan memakai connection string yang menggabungkan Vault username, target account, target address, dan PSM for SSH address."
        ],
        commands: [
          { code: "mike@logon01@10.0.0.20@10.0.30.1", meaning: "Contoh urutan Vault user @ target account @ target address @ PSM-for-SSH address." }
        ]
      }
    ],
    analysis: [
      {
        title: "Buat session-path decision matrix",
        paragraphs: [
          "Pilih path berdasarkan endpoint capability, protocol, regulatory constraint, need for browser, native-client requirement, dan whether account is vaulted."
        ],
        bullets: [
          "PVWA + RDP file untuk managed account dan desktop workflow standar.",
          "PVWA + HTML5 untuk browser-only endpoint atau environment yang melarang outbound RDP.",
          "PSM for Windows untuk native RDP client tanpa membuka PVWA terlebih dahulu.",
          "PSM for SSH untuk native SSH workflow UNIX/network team.",
          "Ad-Hoc hanya untuk use case disetujui karena account dapat berada di luar Vault lifecycle."
        ]
      },
      {
        title: "Kelola connector sebagai software supply chain",
        paragraphs: [
          "Connector menjalankan client dan automation pada hardened PSM. Setiap import/customization harus memiliki source, version, hash, owner, compatibility, AppLocker rule, test, dan rollback."
        ],
        bullets: [
          "Pisahkan connector package dari Platform assignment agar impact jelas.",
          "Test launch, authentication, window detection, timeout, close behavior, audit, dan recording.",
          "Review binary/script update dan third-party client license/security.",
          "Canary pada satu PSM sebelum menyebarkan ke farm.",
          "Catat connector version pada evidence ticket."
        ]
      },
      {
        title: "Gunakan hop-by-hop network matrix",
        paragraphs: [
          "Tuliskan setiap hop—endpoint, PVWA, HTML5 gateway, PSM, Vault, target, SIEM/PTA, recording Safe—dengan protocol, port, certificate, identity, dan log. Ini mencegah semua failure disebut 'PSM issue'."
        ],
        bullets: [
          "Uji DNS, route, firewall, TLS, time, service, dan target native protocol per hop.",
          "Bedakan connection launch failure, credential fetch failure, client startup failure, dan target login failure.",
          "Masukkan load balancer serta PSM assignment dalam correlation."
        ]
      },
      {
        title: "Tetapkan boundary Ad-Hoc",
        paragraphs: [
          "Ad-Hoc memperluas monitoring ke account yang belum vaulted, tetapi dapat menormalisasi bypass onboarding bila tidak dibatasi. Tentukan siapa boleh memakai, target scope, reason/ticket requirement, retention, dan jalur menuju full management."
        ]
      }
    ],
    artifacts: [
      "Session-path decision matrix untuk PVWA/RDP, HTML5, PSM for Windows, PSMP, dan Ad-Hoc.",
      "Connector inventory dengan package source, version, hash, Platform, PSM farm, AppLocker, dan owner.",
      "Connector acceptance test untuk launch, credential injection, target login, audit, recording, timeout, dan close.",
      "Hop-by-hop network/certificate matrix.",
      "Ad-Hoc governance policy dan conversion queue menuju managed account."
    ],
    keywords: ["Connection Components", "Universal Connector", "AutoIT", "PSM Ad-Hoc", "HTML5 Gateway", "WebSocket 443", "PSM for Windows", "alternate shell", "PSMP", "PSM for SSH"]
  });

  add("11", {
    extraReadingTime: 26,
    coverageNote: "Seluruh 25 halaman M11 sudah dipetakan. Recording creation/upload, PSM/Vault sizing equations, bitrate examples, recording Safe design, audit categories, real-time forwarding, active monitoring, dan live-session permissions telah dijelaskan.",
    coverage: [
      { pages: "1–2", topic: "Cover dan agenda", treatment: "Menjadi struktur recording, audit, dan active monitoring." },
      { pages: "3–13", topic: "Recordings dan storage sizing", treatment: "Upload flow, PSMRecordings, external storage, equations, bitrates, retention, dan custom Safe dirinci." },
      { pages: "14–16", topic: "Session audits", treatment: "SQL, SSH, window title, universal keystroke, real-time Vault/SIEM/PTA flow dijelaskan." },
      { pages: "17–22", topic: "Active session monitoring", treatment: "Monitor, suspend, terminate, PSMP limitation, dan terminator group dijelaskan." },
      { pages: "23–25", topic: "Summary dan resources", treatment: "Diubah menjadi capacity, audit, dan live-response exercise." }
    ],
    sourceAddendum: [
      {
        title: "Recording lifecycle dan Safe default",
        pages: "Halaman 3–8 dan 12–13",
        paragraphs: [
          "PSM dan PSM for SSH membuat video/text recording. Selama sesi, PSM menulis recording sementara pada filesystem PSM; setelah sesi selesai, file diupload ke Vault, default Safe bernama PSMRecordings. External storage juga disebut sebagai opsi.",
          "Custom recording Safe dapat ditentukan per Platform dan dibuat otomatis ketika PSM mengupload recording pertama. Contoh materi memisahkan recording Linux yang tunduk SOX dengan retention 365 hari. Auditors group otomatis mendapat permission, tetapi auditor berbeda dapat ditetapkan per Safe."
        ],
        commands: [
          { code: "PSMRecordings", meaning: "Default Safe untuk session recording pada materi." },
          { code: "Platform → custom recording Safe", meaning: "Membuat tier retention dan access control berbeda per cohort account." }
        ]
      },
      {
        title: "Sizing storage PSM dan Vault",
        pages: "Halaman 10–11",
        paragraphs: [
          "Materi menghitung storage PSM dari maximum concurrent session × average session duration × average recording bitrate + 20 GB. Contoh 25 session × 180 menit × 300 KB/menit + 20 GB menghasilkan sekitar 21,35 GB.",
          "Storage Vault menambahkan retention days × session per day × average duration × bitrate + 20 GB. Contoh 90 hari × 400 session/hari × 180 menit × 300 KB/menit + 20 GB menghasilkan sekitar 1,96 TB. Angka harus diganti dengan baseline nyata karena resolusi, activity, protocol, compression, dan retention memengaruhi hasil."
        ],
        commands: [
          { code: "S_PSM = C_session × t_session × R_recording + 20 GB", meaning: "Persamaan sizing temporary/local PSM storage dari materi." },
          { code: "S_Vault = t_retention × N_session/day × t_session × R_recording + 20 GB", meaning: "Persamaan sizing recording repository Vault dari materi." },
          { code: "100 / 200 / 300 KB per minute", meaning: "Contoh rata-rata SSH, low-activity RDP, dan high-activity RDP dengan rich wallpaper." }
        ]
      },
      {
        title: "Session audit categories dan forwarding",
        pages: "Halaman 14–16",
        paragraphs: [
          "Secara default, materi menyebut audit SQL commands, SSH keystrokes, window titles, dan universal keystrokes. PSM for SSH dapat membuat activity audit untuk SSH, SCP, dan Telnet.",
          "Audit dikirim real time dari PSM ke Vault, lalu Vault dapat meneruskan informasi ke SIEM atau PTA melalui syslog untuk risk analysis. Integrasi PTA menambahkan suspicious-activity risk score di Monitoring pane agar auditor memprioritaskan sesi."
        ]
      },
      {
        title: "Active monitoring dan control",
        pages: "Halaman 17–22",
        paragraphs: [
          "Authorized user dapat memonitor sesi aktif, ikut mengontrol, suspend, atau terminate. PSM juga dapat otomatis suspend/terminate ketika PTA atau third-party analytics mengirim notifikasi.",
          "Live PSM-for-SSH session tidak dapat dimonitor atau dikontrol secara interaktif pada materi, tetapi live audit dapat dilihat. Member PSMLiveSessionTerminators secara default berhak suspend dan terminate active sessions."
        ],
        commands: [
          { code: "PSMLiveSessionTerminators", meaning: "Built-in group yang disebut materi untuk hak suspend/terminate live session." }
        ]
      }
    ],
    analysis: [
      {
        title: "Capacity planning harus memakai percentile",
        paragraphs: [
          "Average dapat menyembunyikan peak. Ukur P50/P95 duration, concurrency peak, bitrate per connector, upload lag, retry, free space, dan retention growth. Tambahkan headroom serta failure buffer ketika Vault atau network unavailable."
        ],
        bullets: [
          "Pisahkan temporary PSM capacity dari long-term Vault/external storage.",
          "Alert pada local recording queue, upload failure, dan disk watermark.",
          "Modelkan seasonal peak, maintenance window, dan incident war-room sessions.",
          "Uji restore/playback, bukan hanya keberadaan file."
        ]
      },
      {
        title: "Tier recording berdasarkan control objective",
        paragraphs: [
          "Custom Safe dapat memisahkan retention dan auditor scope. Tier sebaiknya mengikuti regulatory requirement, target criticality, data sensitivity, legal hold, dan cost."
        ],
        bullets: [
          "Tier standard untuk operasi umum.",
          "Tier critical/regulatory dengan retention lebih panjang dan auditor khusus.",
          "Tier investigation/legal hold dengan immutability dan controlled export.",
          "Pastikan Platform assignment tidak salah mengirim recording ke tier yang keliru."
        ]
      },
      {
        title: "Gabungkan metadata, audit, dan video",
        paragraphs: [
          "Investigasi tercepat dimulai dari metadata session dan risk event, lalu audit command/keystroke, baru video pada window relevan. Ini mengurangi waktu review dan exposure data yang tidak perlu."
        ],
        bullets: [
          "Korelasi session ID, requester, account, target, connector, start/end, reason, ticket, dan risk score.",
          "Buat bookmark pada suspicious timestamp.",
          "Verifikasi recording completeness dan time synchronization.",
          "Catat siapa melihat, mengekspor, atau membagikan recording."
        ]
      },
      {
        title: "Live response memerlukan authority model",
        paragraphs: [
          "Suspend/terminate dapat menghentikan serangan tetapi juga memutus operasi kritis. Definisikan trigger, actor, approval, notification, evidence preservation, dan follow-up rotation/reconcile."
        ]
      }
    ],
    artifacts: [
      "Capacity calculator dengan concurrency, duration percentile, bitrate, retention, headroom, dan growth.",
      "Recording-tier matrix untuk retention, auditor, legal hold, dan storage location.",
      "Session evidence schema berisi session ID, target, connector, risk, audit, dan recording link.",
      "Live-response runbook untuk monitor, suspend, terminate, preserve evidence, dan rotate credential.",
      "Daily check untuk local recording queue, upload failure, Vault capacity, dan playback sample."
    ],
    keywords: ["PSMRecordings", "S_PSM", "S_Vault", "100 KB/min", "SQL commands", "SSH keystrokes", "Window titles", "Universal keystrokes", "PSMLiveSessionTerminators"]
  });

  add("12", {
    extraReadingTime: 27,
    coverageNote: "Seluruh 36 halaman M12 sudah dipetakan. PTA data sources, standard detections, alert view, automatic remediation, PSM integration, rule fields, response lifecycle, dan AWS/Azure capabilities kini dijelaskan.",
    coverage: [
      { pages: "1–10", topic: "Collect dan detect", treatment: "Vault/PSM/AD/cloud/SIEM data, bypass, statistical anomaly, dan AD risk dijelaskan." },
      { pages: "11–18", topic: "Standard detections dan alert navigation", treatment: "Detection matrix, risk score/severity, Security pane, filter, dan event detail diterjemahkan." },
      { pages: "19–26", topic: "Automatic remediation dan session response", treatment: "Onboard/rotate/reconcile, PSM risk score, suspend/terminate, rule schema, dan lifecycle dirinci." },
      { pages: "27–33", topic: "Windows/AWS demos dan cloud capability", treatment: "Use case Windows serta AWS/Azure detection scope dijelaskan." },
      { pages: "34–36", topic: "Summary dan exercises", treatment: "Diubah menjadi rule engineering, exception, dan automatic-response lab." }
    ],
    sourceAddendum: [
      {
        title: "Collect, detect, alert, respond",
        pages: "Halaman 4–13",
        paragraphs: [
          "PTA mengumpulkan data dari Digital Vault, PSM, Active Directory, cloud, dan SIEM, lalu mencari bypass of PAM controls, statistical anomalies, serta AD risks. Contoh deteksi meliputi unmanaged privileged access, suspected credential theft, suspicious password change, suspicious session activity, irregular time/IP, excessive access, dormant Vault user, unconstrained delegation, dan dual usage.",
          "Security event diberi risk score berdasarkan severity, menyimpan granular event detail, dan dapat ditinjau di PVWA Security pane atau SIEM. Filter mencakup severity, event type, dan date; compact view menampilkan last detection, event name, score/severity, remediation state, dan recommended/automatic action."
        ]
      },
      {
        title: "Automatic remediation",
        pages: "Halaman 18–22",
        paragraphs: [
          "PTA dapat otomatis onboard unmanaged account, rotate credential, atau reconcile credential. Integrasi PSM mengirim session/activity detail ke PTA untuk dianalisis dan diberi risk score; audit team dapat memprioritaskan session berdasarkan risk.",
          "Session Analysis and Response memungkinkan automatic suspension atau termination ketika high-risk activity terdeteksi. Response cepat harus diimbangi scope dan exception agar activity sah tidak memutus layanan."
        ],
        bullets: [
          "Onboarding menutup unmanaged privileged identity.",
          "Rotation merespons suspected credential theft.",
          "Reconcile merespons suspicious password change atau mismatch.",
          "Suspend mempertahankan sesi tetapi menghentikan aktivitas sementara; terminate menutup sesi."
        ]
      },
      {
        title: "Schema Session Analysis and Response rule",
        pages: "Halaman 24–26",
        paragraphs: [
          "Rule dapat diterapkan granular ke Vault user, account, dan machine. Materi merekomendasikan organisasi mempelajari predefined rules lalu menyesuaikan sesuai kebutuhan.",
          "Setiap rule memiliki Category, Pattern, Session response, Threat Score, dan Scope. Pattern adalah regular expression; response adalah Suspend, Terminate, atau None; threat score berada pada rentang 1–100."
        ],
        table: {
          headers: ["Field", "Nilai/contoh materi"],
          rows: [
            ["Category", "SSH, Universal Keystrokes, SCP, SQL, Windows title."],
            ["Pattern", "Regular expression yang dicari pada audit stream."],
            ["Session response", "Suspend, Terminate, atau None."],
            ["Threat Score", "1–100."],
            ["Scope", "Vault users, accounts, dan machines yang terkena rule."]
          ]
        }
      },
      {
        title: "AWS dan Azure capabilities",
        pages: "Halaman 27–32",
        paragraphs: [
          "Untuk AWS, materi menyebut deteksi unmanaged Access Keys dan passwords bagi IAM accounts, compromised privileged IAM accounts, serta compromised EC2 accounts. Untuk Azure, materi menyebut unmanaged privileged access dan suspected credential theft.",
          "Cloud detection harus dipahami sesuai source telemetry dan identity context; event tidak otomatis membuktikan compromise tanpa korelasi login, API activity, asset ownership, dan expected automation."
        ]
      }
    ],
    analysis: [
      {
        title: "Gunakan rule-engineering lifecycle",
        paragraphs: [
          "Rule bukan sekali buat lalu selesai. Jalankan observe → tune → enforce → review. Mulai response None untuk mengukur hit dan false positive, lalu Suspend, dan hanya Terminate bila confidence serta recovery path memadai."
        ],
        bullets: [
          "Definisikan attack hypothesis dan expected benign matches.",
          "Uji regex terhadap sample audit yang disanitasi.",
          "Tetapkan scope kecil dan canary cohort.",
          "Ukur true positive, false positive, missed detection, dan operational impact.",
          "Version rule dan exception; review setelah incident atau environment change."
        ]
      },
      {
        title: "Threat score harus punya decision meaning",
        paragraphs: [
          "Skor 1–100 berguna bila organisasi menghubungkannya ke triage priority dan response. Hindari menganggap angka sebagai kebenaran absolut tanpa context."
        ],
        bullets: [
          "Low: enrich dan observe.",
          "Medium: analyst review dan account/session context.",
          "High: rapid validation, potential suspend, dan credential containment.",
          "Critical pattern: terminate hanya bila rule, scope, dan business exception matang.",
          "Document override agar analyst tahu kapan tidak mengikuti response default."
        ]
      },
      {
        title: "Pisahkan detection, containment, dan recovery",
        paragraphs: [
          "Automatic response tidak menutup incident. Setelah suspend/terminate/rotate/reconcile, tim tetap perlu preserve evidence, mengidentifikasi root cause, memvalidasi target, dan mengembalikan service secara terkendali."
        ],
        bullets: [
          "Detection record: evidence dan confidence.",
          "Containment record: session/account action dan timestamp.",
          "Recovery record: credential health, application impact, dan user re-enable.",
          "Lessons learned: rule tuning, exception, dan control gap."
        ]
      },
      {
        title: "Bangun coverage map lintas platform",
        paragraphs: [
          "Petakan tiap detection ke data source dan platform. Jika telemetry tidak ada, rule tidak benar-benar memberi coverage meski aktif. Tandai blind spot untuk UNIX, Windows, AWS, Azure, custom platform, dan off-Vault activity."
        ]
      }
    ],
    artifacts: [
      "Rule specification: hypothesis, category, regex, score, response, scope, owner, dan test set.",
      "Rule promotion checklist dari observe ke suspend/terminate.",
      "Threat-score-to-response matrix dan manual override criteria.",
      "Detection coverage map berdasarkan data source dan platform.",
      "Automatic-remediation post-action checklist untuk evidence, credential, target, dan application health.",
      "False-positive review log serta expiring exception register."
    ],
    keywords: ["Privileged Threat Analytics", "Session Analysis and Response", "Threat Score 1-100", "Regular Expression", "Suspend", "Terminate", "Unmanaged Privileged Access", "AWS IAM", "Azure"]
  });

  add("13", {
    extraReadingTime: 24,
    coverageNote: "Seluruh 30 halaman M13 sudah dipetakan. PrivateArk/PVWA report types, filtering/scheduling/download, exact permission requirements, dan Export Vault Data utility files, port, serta datasets kini tersedia langsung.",
    coverage: [
      { pages: "1–10", topic: "PrivateArk reports", treatment: "License, user, active/non-active, Safe, dan activity-oriented report dijelaskan." },
      { pages: "11–23", topic: "PVWA reports dan permissions", treatment: "ManageReportsGroup, PVWAMonitor, filter, schedule, download, purpose, dan permission per report dirinci." },
      { pages: "24–27", topic: "Export Vault Data utility", treatment: "Deployment model, executables, config/cred file, port, dan export datasets dijelaskan." },
      { pages: "28–30", topic: "Summary dan exercises", treatment: "Diubah menjadi report-control dan evidence-pipeline exercise." }
    ],
    sourceAddendum: [
      {
        title: "Dua kategori report",
        pages: "Halaman 3–10",
        paragraphs: [
          "PrivateArk reports berorientasi Vault administration: license capacity, user list, active/non-active users, Safes list, serta active/non-active Safes. PVWA reports berorientasi operation, audit, dan compliance: Privileged Accounts Inventory, Applications Inventory, Privileged Accounts Compliance Status, Entitlement, dan Activity Log.",
          "License Capacity menunjukkan license type/object, maximum, dan usage. Active/Non-Active Safe menggunakan activity pada time period tertentu; definisi period harus dicatat ketika hasil dipakai untuk cleanup atau capacity decision."
        ]
      },
      {
        title: "Report access, schedule, dan output",
        pages: "Halaman 11–18",
        paragraphs: [
          "User dapat generate report bila menjadi member group yang ditetapkan oleh ManageReportsGroup di Administration → Options → Reports. Default pada materi adalah internal group PVWAMonitor, dan Vault Administrators biasanya menjadi member.",
          "PVWA memungkinkan filter yang berbeda per report, run immediately, save, schedule berkala, serta menambahkan subscriber yang menerima email link. Finished report dapat diunduh dalam Excel atau CSV."
        ],
        commands: [
          { code: "ManageReportsGroup", meaning: "Parameter yang menentukan group pembuat report." },
          { code: "PVWAMonitor", meaning: "Default internal group yang disebut materi." }
        ]
      },
      {
        title: "Permission matrix report",
        pages: "Halaman 19–23",
        table: {
          headers: ["Report", "Permission yang disebut materi"],
          rows: [
            ["Privileged Accounts Inventory", "List Accounts + View Safe Members pada setiap Safe yang disertakan."],
            ["Applications Inventory", "Audit Users Vault authorization."],
            ["Compliance Status", "List Accounts; View Audit atau Confirm Safe request pada Safe dual-control; PVWAMonitor; Auditors untuk seluruh Vault."],
            ["Entitlement", "Manage Users atau Audit Users Vault authorization."],
            ["Activity Log", "Audit Users untuk user activity; View Audit pada Safe untuk Safe/account activity."]
          ]
        },
        paragraphs: [
          "Report kosong atau parsial sering merupakan authorization behavior, bukan kegagalan engine. Selalu bandingkan scope yang diminta dengan effective Safe/Vault permission user pembuat report."
        ]
      },
      {
        title: "Export Vault Data utility",
        pages: "Halaman 25–27",
        paragraphs: [
          "EVD mengekspor Vault data ke text atau CSV agar third-party tools/database dapat membuat custom analysis/report. Utility dapat ditempatkan pada server yang memiliki akses ke Vault dan mengikuti pola component: executable, Vault definition, dan credential file.",
          "Dataset contoh mencakup files, user/Safe activities, Master Policy, system log, requests, users, groups, group members, Safes, dan owners. Nilai pada text export disebut diapit quotation marks."
        ],
        commands: [
          { code: "ExportVaultData.exe", meaning: "Executable utama untuk mengambil data dan menghasilkan export." },
          { code: "Vault.ini", meaning: "Menentukan Vault sumber data." },
          { code: "CreateCredFile.exe", meaning: "Membuat credential file bagi user EVD." },
          { code: "TCP 1858", meaning: "Default communication port EVD ke Vault pada materi." }
        ]
      }
    ],
    analysis: [
      {
        title: "Mulai dari control question, bukan nama report",
        paragraphs: [
          "Report bernilai bila menjawab keputusan. Definisikan pertanyaan, population, as-of time, completeness, permission scope, dan action owner sebelum generate."
        ],
        bullets: [
          "Inventory: account apa yang ada dan siapa owner-nya?",
          "Compliance: account mana yang tidak sesuai policy dan mengapa?",
          "Entitlement: siapa dapat mengakses apa melalui jalur mana?",
          "Activity: siapa melakukan tindakan apa, kapan, dan dengan object mana?",
          "Capacity: license atau storage mana yang mendekati limit?"
        ]
      },
      {
        title: "Report permission adalah bagian evidence quality",
        paragraphs: [
          "Dua user dapat menjalankan report dengan nama sama tetapi hasil berbeda karena Safe scope. Sertakan generator identity, permission snapshot, filter, time range, dan generated timestamp pada evidence pack."
        ],
        bullets: [
          "Gunakan dedicated reporting role dengan least privilege yang terdokumentasi.",
          "Jangan memberi broad authorization hanya agar report terlihat lengkap tanpa control approval.",
          "Validasi count dengan source comparison atau report kedua.",
          "Tandai partial result secara eksplisit agar auditor tidak menganggap population lengkap."
        ]
      },
      {
        title: "Bangun evidence pipeline dari EVD",
        paragraphs: [
          "EVD dapat menjadi feed data governance bila credential, schedule, output location, integrity, retention, dan access dikontrol. Pisahkan raw export dari transformed dashboard."
        ],
        bullets: [
          "Hash dan timestamp raw file.",
          "Simpan query/config version dan EVD version.",
          "Redaksi atau encrypt output karena dapat berisi sensitive metadata.",
          "Monitor job failure, row-count anomaly, dan stale extract.",
          "Definisikan lineage dari Vault source sampai KPI/dashboard."
        ]
      }
    ],
    artifacts: [
      "Report-to-control catalog dengan question, population, owner, schedule, dan action.",
      "Report permission checklist dan partial-scope disclosure template.",
      "Scheduled report register berisi subscriber, retention, sensitivity, dan failure alert.",
      "EVD deployment/runbook dengan Vault.ini, cred file, port, output encryption, dan hash.",
      "Evidence lineage sheet dari raw report sampai audit conclusion."
    ],
    keywords: ["ManageReportsGroup", "PVWAMonitor", "Privileged Accounts Compliance Status", "Entitlement Report", "ExportVaultData.exe", "CreateCredFile.exe", "Vault.ini", "1858"]
  });

  add("14", {
    extraReadingTime: 36,
    coverageNote: "Seluruh 52 halaman M14 sudah dipetakan. Semua component role, service, directory, configuration/log file, internal Safe/user/group, direct Vault communication, credential file, REST-first model, dan API-key hierarchy dari materi kini dirangkum eksplisit.",
    coverage: [
      { pages: "1–7", topic: "Self-hosted model dan scalable architecture", treatment: "On-prem/cloud/hybrid context, component roles, HA/DR/site layout, dan local-environment scope dijelaskan." },
      { pages: "8–29", topic: "Vault, PVWA, CPM, PSM local environment", treatment: "Hardening/service, config, directory, log, component users, shadow users, dan file paths dirinci." },
      { pages: "30–39", topic: "Internal Safes, users, dan groups", treatment: "Vault/CPM/PVWA/PSM object map ditulis sebagai reference map." },
      { pages: "40–49", topic: "Internal communication", treatment: "Port 1858, Vault.ini, cred files, credential rotation, REST-first, ApiKey file, dan asymmetric key association dijelaskan." },
      { pages: "50–52", topic: "Summary dan resources", treatment: "Diubah menjadi architecture inventory dan component-flow exercise." }
    ],
    sourceAddendum: [
      {
        title: "Vault configuration dan logs",
        pages: "Halaman 8–13",
        paragraphs: [
          "Vault hardening mengurangi service dan firewall rules yang tidak terkait. Materi menyebut passparm.ini untuk Vault-user password policy, dbparm.ini sebagai main Vault configuration yang memerlukan restart setelah perubahan, tsparm.ini untuk physical disk data storage, dan PARagent.ini untuk Remote Control Agent/SNMP.",
          "dbparm.ini memuat log level, Server Key, Syslog, timeouts, Recovery Key, dan parameter lain; DBPARM.sample.ini berisi pilihan konfigurasi, sedangkan dbparm.ini.good adalah last-known-working copy yang dibuat saat startup. Main logs adalah Trace.d0 dan Italog.log."
        ],
        commands: [
          { code: "passparm.ini", meaning: "Vault user password policy." },
          { code: "dbparm.ini", meaning: "Main Vault configuration; perubahan membutuhkan Vault restart menurut materi." },
          { code: "tsparm.ini", meaning: "Physical disks untuk Vault data." },
          { code: "PARagent.ini", meaning: "Remote Control Agent dan SNMP configuration." },
          { code: "Trace.d0 / Italog.log", meaning: "Vault trace dan main server log." }
        ]
      },
      {
        title: "PVWA, CPM, dan PSM local map",
        pages: "Halaman 14–29",
        paragraphs: [
          "PVWA berjalan pada IIS; materi menampilkan iisreset /restart dan iisreset /status. Application files berada di C:\\Cyberark\\Password Vault Web Access\\ dan default log di %windir%\\temp\\PVWA\\; web.config LogFolder dapat mengubah lokasi.",
          "CPM memiliki CyberArk Password Manager service sebagai batch processor dan Central Policy Manager Scanner untuk Accounts Feed. Directory bin, Logs, tmp, dan Vault dipisahkan. pm.log memuat semua message, pm_error.log warning/error, ThirdParty logs berasal dari plugin, dan History menyimpan log yang diupload/diarsip.",
          "PSM memakai CAPSM.exe, Basic_psm.ini, Components, Logs, Recordings, Temp, dan Vault directories. Session-specific Recorder dan connection-client logs serta PSMConsole.log membantu troubleshooting."
        ],
        commands: [
          { code: "iisreset /restart | iisreset /status", meaning: "Contoh service operation/status PVWA pada materi." },
          { code: "%windir%\\temp\\PVWA\\", meaning: "Default PVWA log folder pada materi." },
          { code: "pm.log / pm_error.log / Logs\\ThirdParty", meaning: "CPM general, error-only, dan plugin logs." },
          { code: "Basic_psm.ini", meaning: "Main local PSM startup configuration termasuk cred-file location dan Safe names." },
          { code: "<SessionID>.Recorder.log / PSMConsole.log / <SessionID>.<client>.log", meaning: "PSM recording, service, dan connector-session logs." }
        ]
      },
      {
        title: "PSM local identities dan shadow users",
        pages: "Halaman 26–29",
        paragraphs: [
          "PSMConnect adalah local identity yang dipakai end user saat PSM session; PSMAdminConnect dipakai auditor untuk RDP monitoring. Credential keduanya disimpan sebagai account di Vault dan harus dikelola seperti account lain.",
          "Untuk non-RDP connection pertama, PSM membuat shadow user lokal yang menjalankan application seperti PuTTY. Credential shadow user direset setiap connection. Masalah shadow user dapat memengaruhi connector walau Vault account dan target sehat."
        ]
      },
      {
        title: "Internal Safes, users, dan groups",
        pages: "Halaman 30–39",
        paragraphs: [
          "Vault installation membuat Notification Engine, System, dan VaultInternal. System Safe memberi remote access ke configuration/log link dan dapat menerima License.xml tanpa Vault restart. VaultInternal menyimpan LDAP-integration configuration.",
          "First CPM membuat PasswordManager, PasswordManager_Accounts, PasswordManager_ADInternal, PasswordManager_info, PasswordManager_Pending, PasswordManager_workspace, PasswordManagerShared, dan PasswordManagerTemp. Default CPM user adalah PasswordManager.",
          "PVWA Safes mencakup PVWAConfig, PVWAPrivateUserPrefs, PVWAPublicData, PVWAReports, PVWATaskDefinitions, PVWATicketingSystem, dan PVWAUserPrefs. PVWAAppUser untuk internal processing; PVWAGWUser adalah gateway access identity.",
          "PSM Safes mencakup PSM, PSMLiveSessions, PSMNotifications, PSMRecordings, PSM Sessions, PSMUniversalConnectors, dan PSMUnmanagedSessions. PSMApp_<MachineName> memakai psmapp.cred; PSMGW_<MachineName> memakai psmgw.cred. Groups penting: PSMAppUsers, PSMLiveSessionTerminators, dan PSMMaster."
        ]
      },
      {
        title: "Direct Vault protocol, credential file, dan REST-first",
        pages: "Halaman 40–49",
        paragraphs: [
          "Secara historis component berkomunikasi langsung ke Vault melalui proprietary protocol port 1858. Component memakai Vault.ini untuk address/port dan credential file untuk username serta password hash. Contoh CPM memakai user.ini; setelah authentication sukses, password di Vault dan cred file dirotasi.",
          "Pada REST-first model, component berkomunikasi ke PVWA melalui REST dan PVWA menjalankan action ke Vault. Vault.ini berisi API address, sedangkan ApiKey file menyimpan private key; public key tersimpan di Vault dan kedua key diasosiasikan dengan username Vault yang sudah dibuat."
        ],
        commands: [
          { code: "Vault.ini + credential file", meaning: "Model direct communication ke Vault pada port 1858." },
          { code: "user.ini", meaning: "Contoh CPM credential file." },
          { code: "Vault.ini + ApiKey file", meaning: "Model REST-first melalui PVWA." },
          { code: "Private key local / public key in Vault", meaning: "Asymmetric API authentication model yang dijelaskan materi." }
        ]
      }
    ],
    analysis: [
      {
        title: "Bangun component bill of materials",
        paragraphs: [
          "Untuk setiap server/component, simpan role, version, service, install path, config, log, Safe, Vault user/group, cred/key file, port, dependency, owner, dan backup method. Ini menjadi peta incident serta change impact."
        ],
        bullets: [
          "Satu row per component instance, bukan hanya per component type.",
          "Tandai shared Safe/user versus instance-specific object.",
          "Masukkan HA/load balancer/DR relation dan target network zone.",
          "Review setelah upgrade, connector import, atau topology change."
        ]
      },
      {
        title: "Kelola configuration sebagai controlled baseline",
        paragraphs: [
          "Configuration tersebar antara local filesystem dan Vault Safe. Buat source-of-truth yang menunjukkan authoritative copy, restart requirement, secret content, backup, dan validation command."
        ],
        bullets: [
          "Capture before/after hash dan sanitized diff.",
          "Jangan copy cred file, key, atau secret-bearing config ke ticket biasa.",
          "Uji syntax/startup serta compare last-known-good.",
          "Catat service restart dan downstream reconnect behavior.",
          "Audit siapa dapat mengubah local file versus Vault-hosted config."
        ]
      },
      {
        title: "Treat component credentials as a lifecycle",
        paragraphs: [
          "Component user dan cred/API key file adalah machine identity. Monitor authentication, rotation, expiry, file permission, instance binding, dan orphan object ketika server dipensiunkan."
        ],
        bullets: [
          "Jangan menyalin cred file antar host tanpa memahami binding/protection.",
          "Alert pada component user suspended atau disconnected.",
          "Sediakan reset/resync runbook per component.",
          "Retire Vault user, Safe membership, key, dan local file bersama server decommission."
        ]
      },
      {
        title: "Petakan coexistence direct dan REST-first",
        paragraphs: [
          "Lingkungan transisi dapat memiliki flow 1858 dan REST secara bersamaan. Ticket harus menyebut fitur/action spesifik agar investigator tidak memilih port, config, atau credential model yang salah."
        ],
        bullets: [
          "Map function → path → authentication artifact → log.",
          "Verifikasi PVWA availability menjadi dependency baru untuk REST-first feature.",
          "Pisahkan API key issue dari legacy cred-file issue.",
          "Uji firewall dan certificate untuk kedua path selama migration."
        ]
      }
    ],
    artifacts: [
      "Component bill of materials untuk setiap instance Vault/PVWA/CPM/PSM/PTA/DR/Replicate.",
      "Config-log-service map yang dapat dicari di Library dan dipakai intake ticket.",
      "Internal Safe/user/group inventory beserta purpose dan deletion warning.",
      "Machine-identity lifecycle register untuk cred files dan API keys.",
      "Function-to-communication-path matrix: direct 1858 versus REST-first.",
      "Sanitized configuration baseline dan last-known-good validation procedure."
    ],
    keywords: ["passparm.ini", "dbparm.ini", "tsparm.ini", "PARagent.ini", "Basic_psm.ini", "PSMAppUsers", "PSMMaster", "Vault.ini", "user.ini", "ApiKey file", "REST first", "port 1858"]
  });

  add("15", {
    extraReadingTime: 23,
    coverageNote: "Seluruh 22 halaman M15 sudah dipetakan. Backup data/metadata, indirect-replicate architecture, prerequisites, credential file, exact PAReplicate/PARestore commands, schedule full/incremental, dan log location kini dijelaskan.",
    coverage: [
      { pages: "1–7", topic: "Backup use cases dan design", treatment: "Point-in-time/object protection, Data/Metadata, direct versus indirect backup, dan Replicate utility dijelaskan." },
      { pages: "8–13", topic: "Installation dan credential setup", treatment: "Disk/security prerequisites, Backup user, Vault.ini, backup path, dan hardened cred file dirinci." },
      { pages: "14–19", topic: "Backup, restore, dan scheduling", treatment: "Exact commands, Restore authorization, weekly full, daily incremental, dan logs dijelaskan." },
      { pages: "20–22", topic: "Summary dan exercises", treatment: "Diubah menjadi restore-validation dan backup-readiness lab." }
    ],
    sourceAddendum: [
      {
        title: "Data, Metadata, dan indirect backup",
        pages: "Halaman 4–7",
        paragraphs: [
          "Safe files berada di Data subdirectory; users, network areas, Safes, log records, dan aktivitas berada di database pada Metadata subdirectory. Keduanya harus dibackup untuk recovery lengkap, sementara single-Safe restore memberi granular object-level recovery.",
          "Direct backup dengan third-party agent di Vault tidak direkomendasikan karena menambah aplikasi dan access ke backup folder. Indirect backup menempatkan PrivateArk Replicate Utility di server lain, menarik encrypted Vault data, lalu enterprise backup melindungi hasil tersebut."
        ]
      },
      {
        title: "Replicator prerequisite dan credential file",
        pages: "Halaman 8–13",
        paragraphs: [
          "Backup server memerlukan minimal disk setara Vault database pada NTFS, dapat diakses enterprise backup, dan memiliki physical security. Backup user harus enabled dan diberi password pada Primary Vault; Vault.ini menunjuk address Vault.",
          "Credential file harus hardened. Materi menyatakan password Backup user di Vault dan credential file berubah setelah successful login. Command contoh membuat backup.cred untuk PAReplicate dengan application type CABACKUP dan opsi protection."
        ],
        commands: [
          { code: "CreateCredFile.exe backup.cred Password /username backup /password <value> /ExePath <PAReplicate.exe> /IpAddress /Hostname /AppType CABACKUP /EntropyFile /DpapiMachineProtection /DpapiUserProtection", meaning: "Bentuk command yang diperlihatkan materi; secret harus dimasukkan aman dan syntax divalidasi pada build." }
        ]
      },
      {
        title: "Backup dan restore commands",
        pages: "Halaman 14–16",
        paragraphs: [
          "PAReplicate memakai Vault.ini dan credential file untuk menjalankan full backup. PARestore dapat mengembalikan Safe yang sudah dibackup; user membutuhkan Restore All Safes Vault authorization.",
          "Restore command contoh mengembalikan Linux02 ke target Safe LinuxRestore. Nama sumber/target dan destination state harus diverifikasi untuk mencegah overwrite atau exposure."
        ],
        commands: [
          { code: "PAReplicate.exe vault.ini /logonfromfile user.ini /FullBackup", meaning: "Full backup command pada materi." },
          { code: "PARestore.exe vault.ini operator /RestoreSafe Linux02 /TargetSafe /LinuxRestore", meaning: "Safe restore example pada materi." }
        ]
      },
      {
        title: "Scheduled full dan incremental backup",
        pages: "Halaman 17–19",
        paragraphs: [
          "Windows Scheduled Task dapat menjalankan PAReplicate pada interval tetap. Materi sangat merekomendasikan dua task: full backup mingguan dan incremental backup harian. Log berada pada root Replicate folder.",
          "Schedule sukses belum membuktikan restore siap. Monitor completion, duration, file growth, last full/incremental chain, enterprise-copy status, dan periodic test restore."
        ]
      }
    ],
    analysis: [
      {
        title: "Definisikan recovery objective per data class",
        paragraphs: [
          "RPO/RTO untuk full Vault, single Safe, recording, audit, dan configuration mungkin berbeda. Backup design harus memetakan requirement ke frequency, retention, copy, dan restore sequence."
        ],
        bullets: [
          "Full Vault recovery untuk site/system loss.",
          "Single Safe restore untuk deletion/corruption terlokalisasi.",
          "Recording/audit recovery untuk forensic atau compliance.",
          "Config/key recovery mengikuti security ceremony yang berbeda.",
          "Enterprise backup copy tidak menggantikan PAReplicate consistency."
        ]
      },
      {
        title: "Backup sukses hanya bila dapat direstore",
        paragraphs: [
          "Gunakan restore drill yang memvalidasi command, authorization, backup chain, file integrity, object visibility, history, dan application behavior. Catat waktu aktual untuk membuktikan RTO."
        ],
        bullets: [
          "Pilih test Safe non-production dengan known objects.",
          "Restore ke target Safe terisolasi bila memungkinkan.",
          "Bandingkan object count, metadata, permission, versions, dan audit.",
          "Hapus hasil test sesuai retention/change record.",
          "Perbarui runbook berdasarkan gap drill."
        ]
      },
      {
        title: "Perlakukan backup server sebagai high-value asset",
        paragraphs: [
          "Walau file terenkripsi, backup server memiliki utility, Vault reachability, credential file, dan large data set. Terapkan hardening, segmentation, least privilege, monitoring, offline/immutable copy, dan controlled operator access."
        ],
        bullets: [
          "Monitor perubahan PAReplicate binary/config/cred file.",
          "Pisahkan operator backup dari Vault administration bila governance meminta.",
          "Alert pada missing backup, unusual size, repeated full, atau credential failure.",
          "Jaga enterprise backup agent tidak dipasang pada Vault utama."
        ]
      }
    ],
    artifacts: [
      "Backup architecture diagram dari Vault → Replicate server → enterprise backup → immutable/offline copy.",
      "RPO/RTO matrix untuk full Vault, Safe, recording, audit, dan configuration.",
      "Daily backup evidence checklist: task, exit code, log, size, duration, chain, dan downstream copy.",
      "Quarterly single-Safe restore drill dan annual full-recovery exercise.",
      "Backup-server hardening dan credential-file custody checklist."
    ],
    keywords: ["CreateCredFile.exe", "PAReplicate.exe", "/logonfromfile", "/FullBackup", "PARestore.exe", "incremental backup", "Backup user"]
  });

  add("16", {
    extraReadingTime: 27,
    coverageNote: "Seluruh 29 halaman M16 sudah dipetakan. DR architecture, DR user/service, enhanced synchronization, PADR.ini parameters, automatic/manual failover, component failover, CPM split-brain rule, DNS alias, failback, dan return-to-DR steps telah dijelaskan.",
    coverage: [
      { pages: "1–9", topic: "DR architecture dan replication", treatment: "DR Vault/service/user, PSM/PVWA at DR site, CPM warning, database sync, dan near-real-time metadata dijelaskan." },
      { pages: "10–17", topic: "PADR setup dan Vault failover", treatment: "EnableDbsync, ReplicateInterval, EnableFailover, CheckInterval, ActivateManualFailover, dan process sequence dirinci." },
      { pages: "18–26", topic: "Component failover dan failback", treatment: "Vault.ini order, CPM manual-only, PSM/PVWA concerns, DNS alias, reverse replication, dan PADR reset dijelaskan." },
      { pages: "27–29", topic: "Summary dan exercises", treatment: "Diubah menjadi failover/failback rehearsal plan." }
    ],
    sourceAddendum: [
      {
        title: "DR architecture dan DR identity",
        pages: "Halaman 4–9",
        paragraphs: [
          "DR Vault dapat standalone atau clustered dan memiliki DR service. PSM dan PVWA sebaiknya tersedia pada DR site agar user tetap dapat mengakses; CPM tidak boleh automatic failover. DR user dibuat otomatis dan DR service memakai credential itu untuk mengautentikasi ke Primary serta mereplikasi data.",
          "DR user memiliki Backup All Safes dan Restore All Safes. Enhanced replication mendorong metadata/current password hampir real time, sementara file/recording replication berjalan terpisah sesuai interval."
        ]
      },
      {
        title: "PADR.ini synchronization dan failover parameters",
        pages: "Halaman 10–16",
        paragraphs: [
          "EnableDbsync=Yes mengaktifkan data/metadata synchronization. Saat failover, DR service menyinkronkan database dengan Safe data files. ReplicateInterval default pada materi adalah 3.600 detik untuk filesystem synchronization.",
          "Automatic failover memakai EnableFailover=Yes. CheckInterval pada contoh menghubungi Primary setiap 60 detik; setelah gagal, mencoba empat kali setiap 30 detik sebelum DR mode. Manual mode menggunakan EnableFailover=No, EnableDbsync=Yes, ActivateManualFailover=No; untuk failover, ubah ActivateManualFailover=Yes dan restart DR service."
        ],
        commands: [
          { code: "EnableDbsync=Yes", meaning: "Aktifkan synchronization." },
          { code: "ReplicateInterval=3600", meaning: "Default interval filesystem replication yang disebut materi." },
          { code: "EnableFailover=Yes / No", meaning: "Aktifkan automatic atau gunakan manual failover design." },
          { code: "CheckInterval", meaning: "Interval health check Primary oleh DR service." },
          { code: "ActivateManualFailover=Yes", meaning: "Memulai manual failover setelah DR service restart." }
        ]
      },
      {
        title: "Failover process dan component behavior",
        pages: "Halaman 17–23",
        paragraphs: [
          "Sequence materi: Primary connection gagal, retry habis, failover dimulai, data disinkronkan, PrivateArk Server dimulai, dan DR service berhenti. Component dapat diberi Primary dan DR address pada Vault.ini dan mencoba sesuai urutan.",
          "CPM harus manual-only untuk mencegah split brain—dua Vault mengubah password target dengan state berbeda. PSM automatic failover opsional, tetapi recording pada DR harus direplikasi kembali. PVWA dapat failover otomatis; audit pada DR harus diselamatkan sebelum replication normal diaktifkan. DNS alias dapat mengontrol Vault aktif tetapi update-nya manual dan memperpanjang outage."
        ]
      },
      {
        title: "Return to Primary dan reset DR mode",
        pages: "Halaman 24–26",
        paragraphs: [
          "Data yang dibuat pada DR harus direplikasi kembali ke Primary sebelum Primary online. DNS alias dan failback replication adalah manual process. Pada DR Vault, materi mengarahkan set FailoverMode=No, hapus dua baris terakhir PADR.ini untuk memaksa full replication, restart DR service, dan reset ActivateManualFailover=No bila manual mode digunakan.",
          "Langkah ini harus dijalankan berdasarkan runbook versi/build dan change authority; kehilangan urutan dapat menghasilkan data divergence atau accidental failover."
        ],
        commands: [
          { code: "FailoverMode=No", meaning: "Mengembalikan server ke DR role sesuai materi." },
          { code: "ActivateManualFailover=No", meaning: "Mencegah accidental manual failover setelah recovery." }
        ]
      }
    ],
    analysis: [
      {
        title: "CPM adalah write authority yang harus tunggal",
        paragraphs: [
          "Split brain paling berbahaya ketika dua CPM mengubah target credential berdasarkan Vault state berbeda. DR runbook harus menunjuk satu write authority dan memblokir yang lain sebelum service account management dilanjutkan."
        ],
        bullets: [
          "Freeze automatic password changes selama authority belum jelas.",
          "Catat last successful replication dan last credential change.",
          "Aktifkan CPM pada site terpilih secara manual setelah validation.",
          "Sebelum failback, reconcile changed accounts dan reverse-replicate DR data.",
          "Audit semua emergency retrieve/change selama DR window."
        ]
      },
      {
        title: "Pisahkan Vault failover dari service restoration",
        paragraphs: [
          "Vault running tidak otomatis berarti layanan PAM pulih. Validasi PVWA login, Safe access, CPM pause/state, PSM session, recording, audit, PTA/SIEM, notification, dan target connectivity."
        ],
        bullets: [
          "Gunakan dependency-ordered smoke test.",
          "Tandai fitur read-only versus write-capable.",
          "Komunikasikan temporary limitation kepada operator.",
          "Simpan timestamp tiap component switch untuk RCA."
        ]
      },
      {
        title: "DR decision authority dan trigger",
        paragraphs: [
          "Automatic failover mengurangi outage tetapi dapat bereaksi pada network partition. Manual failover mengurangi false activation tetapi menambah decision time. Dokumentasikan health evidence, decision owner, quorum, business trigger, dan abort criteria."
        ],
        bullets: [
          "Bedakan Primary down dari link DR-to-Primary down.",
          "Konfirmasi replication freshness dan DR capacity.",
          "Pastikan target network route dari DR site.",
          "Tentukan kapan DNS alias berubah dan TTL impact.",
          "Simulasikan komunikasi serta user instruction."
        ]
      },
      {
        title: "Failback lebih berisiko daripada failover",
        paragraphs: [
          "Saat DR aktif, data baru, recording, audit, request, dan credential change terakumulasi. Failback harus berfokus pada reconciliation dan proof of convergence, bukan sekadar menyalakan Primary."
        ]
      }
    ],
    artifacts: [
      "DR authority matrix untuk decision maker, technical executor, business approver, dan communication owner.",
      "Failover/failback timeline template dengan replication freshness dan component switch time.",
      "Single-writer CPM checklist dan changed-account reconciliation list.",
      "Dependency smoke test untuk Vault, PVWA, PSM, CPM, recording, audit, PTA, SIEM, dan notification.",
      "Quarterly tabletop dan periodic technical failover/failback exercise.",
      "Data-convergence evidence pack sebelum Primary kembali menjadi active."
    ],
    keywords: ["PADR.ini", "EnableDbsync", "ReplicateInterval", "EnableFailover", "CheckInterval", "ActivateManualFailover", "FailoverMode", "split brain", "CPM manual failover"]
  });

  add("17", {
    extraReadingTime: 24,
    coverageNote: "Seluruh 18 halaman M17 sudah dipetakan. Vault isolation/hardening, eight security controls, layered authorization/audit, Server/Recovery keys, AES-256/RSA-2048 hierarchy, key delivery, dual-site recovery storage, dan Server Key storage options telah dijelaskan.",
    coverage: [
      { pages: "1–3", topic: "Cover dan agenda", treatment: "Menjadi struktur Vault hardening dan encryption-key management." },
      { pages: "4–8", topic: "Vault security controls", treatment: "Isolation, no domain/DNS/WINS, documentation standards, eight controls, firewall/auth/access/audit layers dijelaskan." },
      { pages: "9–16", topic: "Encryption and key management", treatment: "Server/RecPub/RecPrv roles, key hierarchy, algorithms, delivery, custody, dan HSM option dirinci." },
      { pages: "17–18", topic: "Summary", treatment: "Diubah menjadi key-ceremony dan security-baseline exercise." }
    ],
    sourceAddendum: [
      {
        title: "Vault sebagai island of security",
        pages: "Halaman 4–8",
        paragraphs: [
          "Materi menggambarkan Vault sebagai server yang di-hardening dan diisolasi: unnecessary services dihapus, remaining services diamankan, hanya Vault Server dan PrivateArk Client yang dipasang, tidak ada aplikasi tambahan, domain membership/trust, DNS, atau WINS; host resolution memakai manually configured hosts file.",
          "Security Fundamentals merangkum delapan kontrol: isolate/harden Vault, two-factor authentication, restrict component servers, limit privilege/admin points, protect sensitive accounts/keys, use secure protocols, monitor logs, dan test DR plan secara berkala."
        ],
        bullets: [
          "Security Standard membahas Backup/HA/DR, monitoring, remote administration, external storage, virtualization, domain membership, dan anti-virus sebagai area yang dapat merelaksasi hardening.",
          "End-to-end controls mencakup proprietary/OpenSSL session encryption, hardened firewall, authentication, granular/RBAC/subnet/time controls, tamper-resistant audit, alerts, dan hierarchical file encryption."
        ]
      },
      {
        title: "Tiga key files dan hierarchy object encryption",
        pages: "Halaman 9–13",
        paragraphs: [
          "Tiga cornerstone key files adalah Server Key, Recovery Public Key, dan Recovery Private Key. Setiap credential disimpan sebagai encrypted file dengan unique File Key; File Key dienkripsi oleh Safe Key; Safe Key dienkripsi oleh Vault-unique Server Key. Server Key dimuat ke memory ketika Vault start.",
          "Untuk recovery, copy Safe Key dienkripsi dengan Recovery Public Key dan disimpan bersama Safe. Recovery Private Key membuka jalur emergency. Diagram materi menyebut AES-256 pada symmetric File/Safe/Server layers dan RSA 2048 pada Recovery key pair."
        ],
        commands: [
          { code: "File Key → Safe Key → Server Key", meaning: "Hierarchy symmetric encryption untuk day-to-day access." },
          { code: "AES-256", meaning: "Algorithm label pada File, Safe, dan Server key layers di materi." },
          { code: "RecPub / RecPrv → RSA 2048", meaning: "Asymmetric recovery path yang ditampilkan materi." }
        ]
      },
      {
        title: "Key delivery dan Recovery Private Key custody",
        pages: "Halaman 14–15",
        paragraphs: [
          "Materi menjelaskan key sebelumnya dikirim lewat physical CD, dan sejak Maret 2022 melalui secure email service. Metode delivery bukan pengganti internal custody: authenticity, download, transfer, storage, access, dan destruction harus direkam.",
          "Recovery Private Key—juga disebut Master Key pada slide—harus disalin ke physical media dan disimpan minimal pada dua lokasi aman: Primary site dan Disaster Recovery site. Pemisahan lokasi melindungi dari kehilangan site tunggal."
        ]
      },
      {
        title: "Server Key storage strategies",
        pages: "Halaman 16",
        paragraphs: [
          "Opsi pertama menyimpan Server Key pada external media di physical safe dan memasukkannya saat start/restart; key berada di RAM setelah load, aman tetapi menambah operational dependency. Opsi kedua menyimpan pada direct-attached storage dengan NTFS permission atau third-party encryption; selalu tersedia tetapi tetap berada di RAM saat dipakai.",
          "Opsi ketiga menyimpan Server Key pada Hardware Security Module; selalu tersedia dan materi menandai key tidak berada di RAM. Trade-off harus dinilai terhadap availability, ceremony, supported integration, dan recovery procedure."
        ],
        commands: [
          { code: "External media", meaning: "Strong custody, manual presence saat Vault start/restart." },
          { code: "Direct-attached storage", meaning: "Convenient; harus diamankan dengan filesystem/third-party protection." },
          { code: "HSM", meaning: "Strong dan convenient option pada materi dengan key tidak berada di RAM." }
        ]
      }
    ],
    analysis: [
      {
        title: "Buat formal key ceremony",
        paragraphs: [
          "Key ceremony mendefinisikan siapa boleh menerima, memverifikasi, memindahkan, menyimpan, menggunakan, mengganti, menguji, dan menghancurkan key material. Gunakan dual control dan tamper-evident evidence."
        ],
        bullets: [
          "Pisahkan custodian, Vault operator, approver, dan auditor.",
          "Catat media ID, hash/fingerprint yang aman, location, seal, check-out, dan check-in.",
          "Larangan foto, email biasa, chat, clipboard, atau ticket attachment.",
          "Uji recovery secara terkontrol tanpa mengekspos key lebih luas.",
          "Rotasi/replace procedure harus mempertimbangkan Primary dan DR."
        ]
      },
      {
        title: "Threat-model setiap Server Key option",
        paragraphs: [
          "Tidak ada opsi tanpa trade-off. External media menghadapi availability dan human error; local storage menghadapi host compromise; HSM menghadapi integration, HA, vendor, dan recovery dependency."
        ],
        bullets: [
          "Evaluasi theft, ransomware, insider, site loss, media damage, HSM outage, dan failed restart.",
          "Tentukan compensating control dan recovery time untuk tiap failure mode.",
          "Pastikan DR site memiliki prosedur yang benar-benar independen.",
          "Jangan mengubah key storage dalam emergency tanpa tested rollback."
        ]
      },
      {
        title: "Hardening adalah continuous baseline",
        paragraphs: [
          "Vault dapat drift karena troubleshooting, patch, monitoring request, remote tool, atau exception sementara. Baseline harus mendeteksi service, firewall rule, installed software, domain/trust, host file, local account, storage, dan security-policy drift."
        ],
        bullets: [
          "Setiap exception punya owner dan expiry.",
          "Bandingkan Primary dan DR baseline tanpa mengasumsikan identik.",
          "Review third-party agent request terhadap Security Standard.",
          "Kembalikan temporary debug/remote access segera setelah window selesai."
        ]
      }
    ],
    artifacts: [
      "Key hierarchy diagram dan dependency explanation untuk operator.",
      "Recovery/Server Key ceremony dengan dual custody, media log, dan emergency authority.",
      "Threat-model matrix untuk external media, direct-attached storage, dan HSM.",
      "Vault hardening baseline dan drift-check schedule.",
      "Annual recovery exercise yang mencakup Primary-site loss dan DR key availability.",
      "Exception register untuk monitoring, virtualization, anti-virus, external storage, dan remote administration."
    ],
    keywords: ["Server Key", "Recovery Public Key", "Recovery Private Key", "RecPrvKey", "AES-256", "RSA 2048", "HSM", "island of security"]
  });

  add("18", {
    extraReadingTime: 29,
    coverageNote: "Seluruh 37 halaman M18 sudah dipetakan. REST System Health, component disconnect notification, Remote Control/SNMP MIB, SIEM metrics, backup/DR thresholds, CPM log rotation, Safe history, dan weekly/quarterly/annual task cadence kini tersedia.",
    coverage: [
      { pages: "1–6", topic: "System Health via REST/UI", treatment: "Vault/DR health, component connectivity, CPM accounts, PSM concurrency, export, IP/version/user/status/last logon dijelaskan." },
      { pages: "7–13", topic: "Email component monitoring", treatment: "Template 206, user flag, ComponentMonitoringInterval, ComponentNotificationThreshold, ITAlog/email behavior dirinci." },
      { pages: "14–22", topic: "SNMP dan SIEM", treatment: "Remote Control Agent/Client, v1/v2 MIB, OS/Vault traps, SendMonitorMessage, baselines, dan dashboard examples dijelaskan." },
      { pages: "23–30", topic: "Replication monitoring dan housekeeping", treatment: "Backup/DR thresholds, CPM log archive, LogCheckPeriod, LogSafeName, dan Clear Expired History dijelaskan." },
      { pages: "31–37", topic: "Recommended tasks, summary, resources", treatment: "Weekly, quarterly, annual cadence dan support-readiness practices diterjemahkan menjadi ops calendar." }
    ],
    sourceAddendum: [
      {
        title: "System Health dan component monitoring",
        pages: "Halaman 4–13",
        paragraphs: [
          "System Health menunjukkan Primary/DR Vault health, connectivity PVWA/CPM/PSM/PTA, accounts managed by CPM, dan PSM concurrent sessions; consolidated health dapat diexport melalui REST API. Per component ditampilkan IP, version, component user, connected/disconnected, dan last logon date.",
          "Email monitoring menggunakan notification rule Component is inactive, template ID 206. Pada component user di PrivateArk Client, aktifkan Send email notification if component is not connected. dbparm.ini memakai ComponentMonitoringInterval dan ComponentNotificationThreshold."
        ],
        commands: [
          { code: "ComponentMonitoringInterval=1", meaning: "Contoh: satu menit antar-check menurut materi." },
          { code: "ComponentNotificationThreshold=CPM,Yes,720,1440", meaning: "Contoh: monitor CPM, first notification 720 menit, repeat 1.440 menit." },
          { code: "Notification template ID 206", meaning: "Template Component is inactive yang dapat dikustomisasi." }
        ]
      },
      {
        title: "SNMP Remote Control dan SIEM metrics",
        pages: "Halaman 14–22",
        paragraphs: [
          "Remote Control Agent terpasang pada Primary/DR Vault dan dapat mengirim SNMP traps. Materi menyediakan dua MIB files untuk SNMP v1 dan v2. Data mencakup CPU, memory, disk, event log, service status, Primary/DR status, dan Vault logs.",
          "Vault dapat mengirim health statistics ke SIEM melalui syslog dengan SendMonitorMessage=yes pada dbparm.ini. Metrics mencakup transaction queue/execution time, number of tasks, CPU, dan lainnya. Baseline harus spesifik environment; dashboard contoh memprioritaskan Platform dengan error luas dan membandingkan historical load/replication/EVD cycles."
        ],
        commands: [
          { code: "SendMonitorMessage=Yes", meaning: "Mengirim Vault monitoring statistics ke SIEM sebagaimana materi." },
          { code: "SNMP v1 / v2 MIB", meaning: "Definition files untuk integrasi trap Vault ke enterprise monitoring." }
        ]
      },
      {
        title: "Backup dan DR notification thresholds",
        pages: "Halaman 23–26",
        paragraphs: [
          "Vault dapat mengirim email dan menulis ITAlog ketika Backup atau DR user tidak connect sesuai threshold. Default recipient adalah Vault Admins, tetapi recipient lain dapat ditetapkan.",
          "Contoh BackupNotificationThreshold mengaktifkan monitoring, memberi first alert 48 jam setelah missing replication, repeat setiap 24 jam, dan check setiap 12 jam. DRNotificationThreshold memberi first alert 2 jam, repeat 24 jam, check 30 menit."
        ],
        commands: [
          { code: "BackupNotificationThreshold=Yes,Yes,48,24,12", meaning: "Monitor missing backup, first 48h, repeat 24h, check 12h." },
          { code: "DRNotificationThreshold=Yes,Yes,2,24,30m", meaning: "Monitor missing DR connection, first 2h, repeat 24h, check 30m." }
        ]
      },
      {
        title: "CPM log rotation dan Safe history",
        pages: "Halaman 28–30",
        paragraphs: [
          "CPM logs dapat tumbuh besar dan menyulitkan disk serta troubleshooting. Materi merekomendasikan periodic upload ke Vault Safe memakai LogCheckPeriod dan LogSafeName, lalu purge obsolete local logs. Setelah Log Safe didefinisikan, automatic process membersihkan file lama.",
          "Expired Safe history hanya dapat dihapus setelah melewati retention pada Safe Properties History. PrivateArk Client menyediakan Tools → Clear Expired History → Safe dan dapat memberi prompt saat Safe dibuka."
        ],
        commands: [
          { code: "LogCheckPeriod", meaning: "Interval jam sebelum CPM log diupload." },
          { code: "LogSafeName", meaning: "Safe tujuan archive CPM logs." },
          { code: "Clear Expired History", meaning: "PrivateArk operation untuk membersihkan history yang melewati retention." }
        ]
      },
      {
        title: "Recommended operational cadence",
        pages: "Halaman 31–34",
        paragraphs: [
          "Materi menyarankan membaca ITAlog mingguan selama sebulan lalu menyesuaikan interval bila noise rendah; memahami normal diperlukan untuk menemukan abnormal. Quarterly: license capacity, free space, directory mapping, serta periodic Master/DR procedure tests. Annually: formal Security Services Health Check.",
          "Praktik lain: gunakan Syslog/SIEM, SNMP Remote Control, dokumentasikan topology/version, simpan sekitar 24 jam archived trace/Logic Container logs bila memungkinkan, tahu log yang diminta Support, pakai log viewer, auto-rotate CPM logs, dan aktifkan disconnected-component email."
        ]
      }
    ],
    analysis: [
      {
        title: "Ubah monitoring menjadi service objectives",
        paragraphs: [
          "Connected/disconnected saja belum cukup. Tentukan SLO untuk authentication, component heartbeat, password-job success, session launch, recording upload, replication freshness, capacity, dan alert delivery."
        ],
        bullets: [
          "Availability: component user heartbeat dan service status.",
          "Performance: queue, execution time, session launch latency.",
          "Correctness: Verify/Change/Reconcile success dan recording completeness.",
          "Durability: backup/DR freshness dan restore test age.",
          "Capacity: disk, license, concurrency, log growth, Safe history."
        ]
      },
      {
        title: "Baseline mengalahkan static threshold",
        paragraphs: [
          "Static threshold memberi alert awal, tetapi anomaly terhadap baseline lebih berguna untuk queue, task count, session volume, replication duration, dan error pattern. Simpan seasonality serta maintenance windows."
        ],
        bullets: [
          "Bandingkan current dengan historical percentile.",
          "Annotate upgrade, batch onboarding, EVD, backup, dan DR test.",
          "Prioritaskan error yang luas per Platform atau component.",
          "Review noisy alert dan missing alert setelah incident."
        ]
      },
      {
        title: "Alert harus punya owner dan action",
        paragraphs: [
          "Setiap alert mendefinisikan severity, owner, first checks, escalation, suppression, and recovery proof. Email tanpa on-call routing hanya menjadi arsip."
        ],
        bullets: [
          "Component disconnected → service/network/cred-file/user state checks.",
          "Backup stale → PAReplicate job/log/credential/disk/downstream copy.",
          "DR stale → DR service/user/network/PADR/Primary state.",
          "Disk high → identify recordings/log/history growth sebelum deletion.",
          "Repeated CPM error → cohort/Platform/target pattern analysis."
        ]
      },
      {
        title: "Buat operating calendar yang dapat dibuktikan",
        paragraphs: [
          "Weekly/quarterly/annual tasks harus menghasilkan evidence, owner, due date, finding, dan remediation. Checklist tanpa result tidak membuktikan control berjalan."
        ]
      }
    ],
    artifacts: [
      "PAM SLO catalog dan dashboard mapping per component/flow.",
      "Alert runbook untuk component disconnect, backup stale, DR stale, disk, license, dan CPM error spike.",
      "Baseline dashboard dengan maintenance/change annotations.",
      "Weekly/quarterly/annual operations calendar dan evidence attachment.",
      "Log-retention/capacity policy untuk Vault trace, Logic Container, CPM, PSM, PVWA, dan archive Safe.",
      "Monitoring coverage matrix: REST, email, SNMP, SIEM, local logs, dan synthetic tests."
    ],
    keywords: ["ComponentMonitoringInterval", "ComponentNotificationThreshold", "Template ID 206", "SNMP MIB", "SendMonitorMessage", "BackupNotificationThreshold", "DRNotificationThreshold", "LogCheckPeriod", "LogSafeName"]
  });

  add("19", {
    extraReadingTime: 30,
    coverageNote: "Seluruh 32 halaman M19 sudah dipetakan. User lockout, component credential resync, PTA validation utility, CPM Windows/UNIX tests, PSM-RDP isolation, PSMConnect manual test, timeout, shadow user, dan AppLocker troubleshooting kini dijelaskan eksplisit.",
    coverage: [
      { pages: "1–7", topic: "User authentication failure", treatment: "ITAlog evidence, suspension, manual unsuspend, dan UserLockoutPeriodInMinutes dijelaskan." },
      { pages: "8–16", topic: "Component connectivity", treatment: "System Health, credential mismatch, five-step reset, CreateCredFile, dan PTA resync utility dirinci." },
      { pages: "17–20", topic: "CPM common issues", treatment: "Target policy conflicts, net use, plink, operation scope, event/prompt/plugin checks dijelaskan." },
      { pages: "21–30", topic: "PSM common issues", treatment: "Stage isolation, NLA, PSMConnect test, timeout, component/shadow user, AppLocker script/XML/audit-only test dijelaskan." },
      { pages: "31–32", topic: "Summary", treatment: "Diubah menjadi reusable common-issue decision trees." }
    ],
    sourceAddendum: [
      {
        title: "User suspension dan automatic unsuspend",
        pages: "Halaman 4–7",
        paragraphs: [
          "Contoh materi: user mengganti network password, mencoba password lama berulang, lalu Vault mencatat lima failed logon dan mensuspend user. Setelah password benar pun login tetap gagal sampai user diaktifkan kembali atau lockout period habis.",
          "dbparm.ini dapat mengaktifkan automatic unsuspend setelah predefined period melalui UserLockoutPeriodInMinutes. Investigasi harus membedakan wrong credential, directory failure, suspended Vault user, dan missing mapping."
        ],
        commands: [
          { code: "UserLockoutPeriodInMinutes", meaning: "Vault parameter untuk automatic unsuspend setelah periode yang ditentukan." }
        ]
      },
      {
        title: "Component credential reset sequence",
        pages: "Halaman 8–15",
        paragraphs: [
          "Credential component user dapat out of sync antara Vault dan local credential file. Contoh default CPM user PasswordManager ditangani dengan urutan: stop CPM services, reset password user di Vault ke known value, activate/unsuspend Trusted Net Areas, generate User.ini baru, lalu restart services.",
          "Urutan penting karena service yang masih berjalan dapat terus mencoba credential lama dan mensuspend user lagi. Known password serta generated cred file harus dijaga sebagai secret dan dihapus dari console history/ticket."
        ],
        commands: [
          { code: "CreateCredFile.exe User.ini Password /username PasswordManager /password <value> /IpAddress /Hostname /EntropyFile", meaning: "Bentuk command contoh materi untuk membuat CPM credential file baru." }
        ]
      },
      {
        title: "PTA credential resynchronization",
        pages: "Halaman 16",
        paragraphs: [
          "Bila PTA connectivity gagal, materi menyebut resync PTA Vault users dan PTA_PAS_Gatewayaccount yang dipakai REST antara PVWA dan PTA. Utility VaultPermissionsValidation.sh berada di utility folder PTA; alias UTILITYDIR dapat membawa operator ke folder tersebut.",
          "Hasil script harus dikorelasikan dengan PTA/PVWA/Vault logs dan credential object state; jangan menjadikan script sebagai black-box fix tanpa before/after evidence."
        ],
        commands: [
          { code: "UTILITYDIR", meaning: "Alias menuju PTA utility directory pada materi." },
          { code: "VaultPermissionsValidation.sh", meaning: "Utility untuk memvalidasi/resync PTA Vault permissions/credentials." }
        ]
      },
      {
        title: "CPM Windows dan UNIX connectivity tests",
        pages: "Halaman 17–20",
        paragraphs: [
          "Platform/Master Policy tidak boleh konflik dengan target local password policy. Untuk Windows, tentukan apakah Verify, Change, Reconcile, atau semua operasi gagal; periksa API/plugin, Event Viewer, Local Security Settings, dan jalankan net use manual dari CPM. Alternative plugin WMI atau PowerShell disebut materi.",
          "Untuk UNIX, tentukan operation scope, jalankan plink manual dari CPM dengan target/port, periksa prompt/process files, dan pertimbangkan DEP exception pada CPM bila relevan serta disetujui. Manual command membuktikan network/protocol path, bukan otomatis membuktikan CPM plugin configuration benar."
        ],
        commands: [
          { code: "net use \\\\<target>\\IPC$ /user:<domain>\\<username>", meaning: "Manual Windows connectivity/authentication test dari CPM." },
          { code: "plink.exe <target> -ssh -P <port>", meaning: "Manual SSH path test dari CPM server." }
        ]
      },
      {
        title: "PSM-RDP, timeout, shadow user, dan AppLocker",
        pages: "Halaman 21–30",
        paragraphs: [
          "Tentukan stage failure: PVWA, PSM, atau target; one/multiple account; PSM hardened/domain; RDP file atau RemoteApp; single/load-balanced PSM. Checks mencakup service, PSM/OS events, NLA, manual PSMConnect test, Safe permission, temporary recording/audit isolation, protocol version, dan timeout.",
          "Manual PSMConnect test menonaktifkan Start Program sementara, mengambil PSMConnect password secara authorized, RDP ke PSM, lalu menjalankan MSTSC ke target. Timeout example ConnectionComponentTimeout: 20000 dapat dinaikkan pada overloaded environment.",
          "Shadow user menjalankan connector dan menyimpan preference; dapat dites manual atau dihapus agar dibuat ulang. AppLocker rules harus diperbarui saat connector baru ditambah melalui PSMConfigureApplocker.xml/script. Audit Only boleh dipakai sementara untuk isolasi lalu enforcement dikembalikan."
        ],
        commands: [
          { code: "ConnectionComponentTimeout: 20000", meaning: "Contoh timeout materi; perubahan harus scoped dan diuji." },
          { code: "PSMConfigureApplocker.ps1", meaning: "Script untuk menerapkan konfigurasi AppLocker PSM." },
          { code: "PSMConfigureApplocker.xml", meaning: "Rule definition tempat exception connector diaktifkan." },
          { code: "secpol.msc / gpedit.msc → AppLocker → Audit Only", meaning: "Temporary isolation method pada materi; Enforce harus dipulihkan setelah test." }
        ]
      }
    ],
    analysis: [
      {
        title: "Gunakan decision tree, bukan daftar restart",
        paragraphs: [
          "Mulai dari stage dan scope. Jika satu user, periksa identity state; jika satu component, periksa machine identity; jika satu Platform/account, periksa target/plugin; jika seluruh PSM farm, periksa shared config/network/Vault."
        ],
        bullets: [
          "Authentication: wrong password, suspended, mapping, source directory, time/network.",
          "Component: service, Vault user, cred file, Safe permission, network, Vault.ini.",
          "CPM: operation type, Platform, plugin, linked account, target policy/event.",
          "PSM: launch stage, PSM node, connector, shadow user, AppLocker, NLA, target.",
          "Setiap branch menyebut evidence sebelum action."
        ]
      },
      {
        title: "Credential resync adalah controlled secret operation",
        paragraphs: [
          "Reset component credential berisiko outage dan secret exposure. Jalankan dalam maintenance/incident authority, hentikan retry source, buat credential file pada host benar, validasi permission/binding, restart, lalu periksa successful login dan rotation."
        ],
        bullets: [
          "Jangan menaruh plaintext password pada command transcript yang disimpan.",
          "Bersihkan shell history/temp file sesuai SOP.",
          "Verifikasi component user tidak kembali suspended.",
          "Bandingkan file timestamp/hash dan service account access.",
          "Document root cause: manual password reset, file restore, clone, permission change, atau failed rotation."
        ]
      },
      {
        title: "Temporary diagnostic controls harus reversible",
        paragraphs: [
          "Disable NLA, recording, auditing, atau AppLocker hanya untuk membuktikan hypothesis, bukan solusi permanen. Setiap temporary change memiliki owner, start/end time, risk, scope, and restoration proof."
        ],
        bullets: [
          "Satu perubahan per test agar hasil dapat diinterpretasi.",
          "Gunakan node/account/connector canary.",
          "Capture before/after config dan result.",
          "Kembalikan enforcement lalu ulangi test normal.",
          "Escalate bila hanya berhasil ketika control keamanan dimatikan."
        ]
      },
      {
        title: "Bandingkan working versus failing path",
        paragraphs: [
          "Pilih account/PSM node/connector yang sama sebanyak mungkin dan ubah satu variable. Comparison sering lebih cepat daripada membaca semua log tanpa baseline."
        ]
      }
    ],
    artifacts: [
      "Decision trees untuk user auth, component auth, CPM Windows/UNIX, dan PSM launch.",
      "Component credential-resync runbook dengan secret-handling dan validation steps.",
      "Temporary-control register untuk NLA, recording, auditing, AppLocker, timeout, dan debug.",
      "Working-versus-failing comparison worksheet.",
      "PSM connector isolation checklist: node, shadow user, AppLocker, client, Safe, target, dan recording.",
      "Known-error library yang menyimpan symptom, stage, evidence, cause, fix, dan prevention."
    ],
    keywords: ["UserLockoutPeriodInMinutes", "CreateCredFile.exe", "VaultPermissionsValidation.sh", "UTILITYDIR", "net use", "plink.exe", "PSMConnect", "ConnectionComponentTimeout", "PSMConfigureApplocker.xml", "AppLocker"]
  });

  add("20", {
    extraReadingTime: 38,
    coverageNote: "Seluruh 44 halaman M20 sudah dipetakan. Troubleshooting flow, complete login example, message-code grammar, log-review method, Vault/ENE/Client/DR/CPM/PVWA/PSM debug cheat sheets, xRay collection/share workflow, dan resources telah diterangkan.",
    coverage: [
      { pages: "1–13", topic: "Methodology dan support prerequisites", treatment: "Topology, initial questions, reproduction, logs, follow-up, docs/KB, dan support package dijelaskan." },
      { pages: "14–24", topic: "Administrator login example", treatment: "Environment scope, questions, reproduction via PVWA, ITATS004E/ITA origin, ITATS528E code 66, reset/retry loop dijelaskan." },
      { pages: "25–35", topic: "Log types, codes, debug, and locations", treatment: "Console/error/trace/debug, code grammar, correlation, and component cheat sheets dirinci." },
      { pages: "36–41", topic: "xRay", treatment: "Remote/local collection, encryption, scope, Active Vault option, monitoring, preview, partner/support sharing, account/case prerequisites dijelaskan." },
      { pages: "42–44", topic: "Summary dan resources", treatment: "Diubah menjadi evidence-pack dan escalation exercise; resource concepts diintegrasikan tanpa mengarahkan kembali ke slide." }
    ],
    sourceAddendum: [
      {
        title: "Troubleshooting flow dan login example",
        pages: "Halaman 4–24",
        paragraphs: [
          "Flow materi: pahami topology, tanya user experience, isolate/reproduce, check relevant logs, ajukan follow-up, cek documentation/knowledgebase, lalu contact support. Prerequisite mencakup environment layout, server access, knowledgebase, dan current documentation.",
          "Example environment memiliki satu Production Vault, satu DR Vault, satu PVWA/CPM/PSM, version 12.6 pada Windows Server 2019. Satu Administrator user gagal pada PrivateArk dan PVWA. Error ITATS004E menunjukkan origin ITA/Vault; log awal ITAlog.log dan Trace.d0. ITATS528E code 66 ditemukan sebagai first relevant error, lalu password reset diuji. Bila gagal lagi, ulangi flow dengan error baru, bukan terus mengulang fix lama."
        ],
        commands: [
          { code: "ITATS004E", meaning: "Contoh user-facing/error-origin code yang mengarahkan investigator ke Vault logs." },
          { code: "ITATS528E / code 66", meaning: "First relevant Vault error pada scenario materi; exact meaning harus dicari pada Messages and Responses untuk build terkait." },
          { code: "ITAlog.log + Trace.d0", meaning: "Log awal untuk scenario login yang berasal dari Vault." }
        ]
      },
      {
        title: "Log types dan message-code grammar",
        pages: "Halaman 25–29",
        paragraphs: [
          "Console log memberi component-level event seperti service up/down; Error log hanya error/warning pada component tertentu; Trace log memberi detail workflow; Debug dapat berupa trace tambahan atau file terpisah tergantung component.",
          "Code dibaca sebagai source + module + number + category. Contoh ITAFW001I berarti ITA/Vault, firewall module, message 001, informational. Category examples: ITAFW001I informational, ITATS319W warning, ITATS691E error, ITADB367S system. Cari timestamp, user, object/Safe/account, keywords, dan correlated OS/component events."
        ],
        commands: [
          { code: "ITA FW 001 I", meaning: "Source, module, message number, category." },
          { code: "I / W / E / S", meaning: "Informational, Warning, Error, System categories pada materi." }
        ]
      },
      {
        title: "Vault, database, Logic Container, Replicate, ENE, Client, DR cheat sheet",
        pages: "Halaman 30–34",
        paragraphs: [
          "Vault debug dapat diubah di dbparm.ini dengan restart atau dinamis melalui PARclient/Central Administration Station. Materi mengingatkan debug Vault hanya di bawah guidance Support. Cheat sheet mencantumkan DBParm.ini, Database\\my.ini, Italog.log, Trace.d0–d4, Database\\VaultDB.log, dan LogicContainer.log.",
          "PAReplicate menambahkan /EnableTrace dan menulis PAReplicate.log. ENE memakai local ENEConf.ini serta EventNotificationEngine.ini di Notification Engine Safe; debug fields mencakup Controller, Collector, Parser, SMTPSender, dan ConfigurationManager levels; logs ENEConsole.log dan ENETrace.log. PrivateArk Client memakai PAInfo.exe atau Advanced Log Configuration dan PALog.txt. DR memakai PADR.ini, EnableTrace=yes, dan PADR.log."
        ],
        commands: [
          { code: "DebugLevel=PE(1),PERF(1) / LDAP(14,15)", meaning: "Contoh Vault debug categories/levels pada materi." },
          { code: "Trace.d0 ... Trace.d4", meaning: "Vault trace files." },
          { code: "VaultDB.log / LogicContainer.log", meaning: "Database dan Logic Container logs." },
          { code: "PAReplicate.exe ... /EnableTrace", meaning: "Aktifkan Replicate trace." },
          { code: "ENEConf.ini / EventNotificationEngine.ini", meaning: "Local dan Vault-hosted ENE configuration." },
          { code: "PAInfo.exe / PALog.txt", meaning: "PrivateArk Client diagnostic utility/log." },
          { code: "PADR.ini → EnableTrace=yes → PADR.log", meaning: "DR trace configuration dan output." }
        ]
      },
      {
        title: "CPM, PVWA, dan PSM cheat sheet",
        pages: "Halaman 35",
        paragraphs: [
          "CPM Platform config berada pada Password Manager Safe root\\policies\\<policy>.ini. CPMDebugLevels 0–6 mengontrol no trace, exceptions, trace, CASOS activity/debug/error, atau all CASOS. Logs: pm.log, pm-error.log, PMConsole.log, PMTrace.log, dan ThirdParty plugin logs.",
          "PVWA config mencakup web.config serta PVWAConfig Safe files PVConfiguration.xml dan Policies.xml. Logging di Administration Options memakai DebugLevel dan InformationLevel dengan None/High/Low/Profiling. Logs yang disebut: CyberArk.Webapplication.log, CyberArk.WebConsole.log, dan CyberArk.WebSession.<Sessionid>.log di %windir%\\temp\\.",
          "PSM memakai Basic_psm.ini dan PVWA PSM options. TraceLevels 1–7 untuk Server Settings, 1–2 untuk Recorder dan Connection Client. Logs berada di installation-folder Logs/subfolders atau lokasi LogsFolder pada Basic_psm.ini."
        ],
        commands: [
          { code: "CPMDebugLevels=0..6", meaning: "CPM trace/CASOS levels yang dijabarkan materi." },
          { code: "pm.log / pm-error.log / PMConsole.log / PMTrace.log / ThirdParty\\*.log", meaning: "CPM log set." },
          { code: "PVConfiguration.xml / Policies.xml / web.config", meaning: "PVWA configuration sources." },
          { code: "CyberArk.Webapplication.log / WebConsole.log / WebSession.<Sessionid>.log", meaning: "PVWA logs pada cheat sheet." },
          { code: "Basic_psm.ini / TraceLevels / LogsFolder", meaning: "PSM debug configuration dan log location controls." }
        ]
      },
      {
        title: "xRay collection dan secure sharing workflow",
        pages: "Halaman 36–41",
        paragraphs: [
          "xRay mengumpulkan logs dan configuration dari PAM components dalam satu workflow, dapat dijalankan remote atau pada component server. Data dienkripsi saat collection, baik local maupun remote, lalu ditransfer kembali ke xRay machine. Saat dibagikan ke support, dataset ditautkan ke case.",
          "Operator memilih component, timeframe, collection level, scope OS+application atau application-only, dan optional Active Vault IP/admin credential untuk config collection. Progress dapat dimonitor; setelah selesai, preview data lalu share ke partner atau CyberArk. Technical Community account dan case number diperlukan untuk share ke vendor support pada materi."
        ],
        bullets: [
          "Encryption in collection/transfer tidak menghapus kewajiban minimization dan redaction.",
          "Pilih timeframe tersempit yang mencakup reproduction serta working comparison.",
          "Preview config/log sebelum share; catat collector version, scope, checksum, recipient, case, dan retention."
        ]
      }
    ],
    analysis: [
      {
        title: "Evidence-first troubleshooting discipline",
        paragraphs: [
          "Tujuan awal bukan menemukan fix tercepat, tetapi membuat model failure yang dapat diuji. Tulis expected, actual, scope, impact, first occurrence, recent change, topology, dan exact timestamp sebelum action."
        ],
        bullets: [
          "Ambil screenshot/error text dan IDs sebelum restart atau retry massal.",
          "Buat timeline lintas timezone dan pastikan time sync.",
          "Pilih log berdasarkan flow, bukan dump semua file.",
          "Cari first relevant error; message sesudahnya mungkin consequence.",
          "Ubah satu variable dan simpan result working/failing."
        ]
      },
      {
        title: "Bangun correlation ladder",
        paragraphs: [
          "Mulai dari user-visible event, lalu session/request/job ID, component log, Vault audit, OS/network, dan target event. Setiap anak tangga harus menyebut timestamp dan identity/object yang sama."
        ],
        bullets: [
          "User/browser/client evidence.",
          "PVWA/PrivateArk/API request.",
          "Vault authentication/authorization/audit.",
          "CPM/PSM/PTA component execution.",
          "Target authentication/application event.",
          "SIEM/network/load balancer/certificate/time evidence."
        ]
      },
      {
        title: "Debug adalah temporary experiment",
        paragraphs: [
          "Naikkan debug hanya untuk hypothesis dan reproduction window. Hitung disk, performance, sensitive data, log retention, dan who-can-read risk; catat old/new value; lalu rollback dan verifikasi normal logging."
        ],
        bullets: [
          "Tidak menaikkan semua component sekaligus.",
          "Tidak meninggalkan High/Profiling/debug detail setelah incident.",
          "Tidak membagikan raw log tanpa minimization.",
          "Jika reproduction gagal, hentikan debug dan desain test baru—jangan biarkan permanen."
        ]
      },
      {
        title: "Escalation package harus menjawab pertanyaan",
        paragraphs: [
          "Paket L3/vendor yang baik menyatakan hypothesis dan pertanyaan spesifik, bukan hanya 'please investigate'. Sertakan environment/version, topology, expected/actual, scope/impact, timeline, reproduction, working comparison, actions/results, sanitized log/config, dan xRay metadata."
        ],
        bullets: [
          "Apa first failure dan component asalnya?",
          "Apakah behavior expected untuk build/config ini?",
          "Parameter atau defect apa yang dapat menjelaskan perbedaan working/failing?",
          "Evidence tambahan apa yang diperlukan dan pada debug scope berapa?",
          "Workaround apa yang aman serta bagaimana rollback-nya?"
        ]
      },
      {
        title: "Jadikan solved incident sebagai reusable knowledge",
        paragraphs: [
          "Setelah root cause, simpan sanitized symptom signature, affected flow, detection query, cause, fix, validation, prevention, version applicability, dan misleading signals. Ini mempercepat ticket berikut tanpa menyalin langkah yang tidak relevan."
        ]
      }
    ],
    artifacts: [
      "Troubleshooting intake template: expected, actual, scope, impact, topology, version, time, change, dan reproduction.",
      "Correlation ladder worksheet dari user event sampai target/system evidence.",
      "Component log/config/debug cheat sheet yang dapat dicari berdasarkan Vault, ENE, DR, CPM, PVWA, PSM, dan Client.",
      "Debug experiment form dengan hypothesis, value before/after, window, disk/data risk, result, dan rollback proof.",
      "xRay collection/sharing checklist dengan minimization, preview, checksum, case, recipient, dan retention.",
      "L3/vendor escalation package template dengan specific questions.",
      "Post-incident known-error article dan prevention action tracker."
    ],
    keywords: ["ITATS004E", "ITATS528E", "ITAlog.log", "Trace.d0", "ITAFW001I", "ITATS319W", "ITATS691E", "ITADB367S", "VaultDB.log", "LogicContainer.log", "ENEConf.ini", "PMConsole.log", "PVConfiguration.xml", "Basic_psm.ini", "xRay"]
  });

  // __EXPANSIONS__

  window.IDIRA_TRAINING_EXPANSIONS = expansions;
})();
