(() => {
  const chapters = {};
  const add = (id, chapter) => { chapters[id] = chapter; };

  add("01", {
    title: "Introduction to Privileged Access Management",
    subtitle: "Mengapa PAM ada, bagaimana privilege disalahgunakan, dan bagaimana seluruh komponen bekerja sebagai satu sistem.",
    source: "M01, 41 halaman; konsep utama halaman 4–38 dan rangkuman halaman 40–41.",
    readingTime: 48,
    intro: [
      "Bab fondasi ini menjelaskan PAM sebagai sistem pengendalian privileged access, bukan sekadar tempat menyimpan password. Fokusnya adalah hubungan antara identity yang meminta akses, account pada target, credential yang dilindungi, komponen yang memproses akses, dan evidence yang dihasilkan.",
      "Rolebook memakai nama IDIRA (formerly CyberArk) sebagai penanda transisi, sedangkan nama komponen legacy tetap digunakan karena muncul pada materi 2023 dan masih merupakan istilah teknis. Semua isi di bawah diparafrasekan dan diperluas agar dapat dipelajari tanpa membuka slide."
    ],
    mentalModel: "Bayangkan PAM sebagai jalan tol menuju aset kritis. Vault menyimpan rahasia dan keputusan akses, PVWA menjadi gerbang layanan, CPM merawat umur credential, PSM menjadi jalur sesi terisolasi, dan PTA mengamati pola berisiko. Target tetap berada di ujung; PAM mengendalikan siapa boleh mencapainya, dengan account apa, melalui jalur apa, dan bukti apa yang tertinggal.",
    objectives: [
      "Membedakan identity, user, account, credential, dan privileged account.",
      "Menjelaskan credential theft, reconnaissance, lateral movement, dan privilege escalation.",
      "Memetakan Vault, PVWA, CPM, PSM, PTA, interface, serta utility.",
      "Menentukan stage kegagalan sebelum memilih log atau tindakan perbaikan."
    ],
    terms: [
      ["Identity", "Subjek yang bertindak: manusia, aplikasi, robot, vendor, service provider, atau komponen."],
      ["User", "Representasi identity di PAM, lengkap dengan authentication, authorization, group, dan audit."],
      ["Account", "Identity teknis pada target, misalnya Administrator Windows, root UNIX, Oracle SYS, atau Cisco enable."],
      ["Credential", "Rahasia untuk mengautentikasi account, seperti password, SSH private key, atau token."],
      ["Privileged account", "Account yang mampu mengubah atau berdampak material pada layanan, keamanan, konfigurasi, atau data."],
      ["Privileged access", "Penggunaan privilege oleh identity tertentu dalam konteks dan waktu tertentu."]
    ],
    sections: [
      {
        title: "1. Privilege ada di mana-mana",
        pages: "Halaman 4–7",
        paragraphs: [
          "Privilege tidak terbatas pada domain administrator. Ia ada pada server, database, perangkat jaringan, aplikasi, industrial controller, cloud, service account, integration, dan automation. Karena setiap sistem dapat mempunyai beberapa identity teknis, jumlah privileged account sering lebih besar daripada jumlah pegawai.",
          "Dampak adalah pembeda utamanya. Privileged account dapat mematikan service, mengubah firewall, membuat user, menyalin database, mengganti konfigurasi autentikasi, atau menghapus evidence. Karena itu inventaris harus dimulai dari kemampuan account dan dampak bisnis, bukan dari jabatan pemiliknya.",
          "Pemakai privilege dapat berupa administrator, developer, business user, vendor, service provider, aplikasi, atau robot. PAM harus mengaitkan penggunaan shared atau target account kembali ke identity individual agar accountability tidak hilang."
        ],
        callout: { tone: "concept", title: "Kunci konsep", text: "User adalah actor di PAM; account adalah identity pada target; credential adalah rahasia yang membuat account dapat dipakai." }
      },
      {
        title: "2. Privilege berada di pusat rantai serangan",
        pages: "Halaman 9–14",
        paragraphs: [
          "Setelah penetrasi awal, penyerang mencari credential, melakukan reconnaissance, berpindah antarsistem, menaikkan privilege, lalu mengulangi siklus sampai mencapai data atau proses bisnis. Credential sah membuat tindakan berbahaya tampak seperti aktivitas administrator normal sehingga kontrol perimeter saja tidak cukup.",
          "Credential theft adalah pencurian password, key, atau token. Lateral movement adalah perpindahan ke host lain, sedangkan vertical movement atau privilege escalation meningkatkan kemampuan account. PAM memutus rantai ini dengan membatasi exposure, mengisolasi koneksi, merekam aktivitas, mendeteksi penyimpangan, dan merotasi credential ketika ada indikasi kompromi."
        ],
        table: {
          headers: ["Tahap", "Tujuan penyerang", "Kontrol PAM"],
          rows: [
            ["Credential theft", "Mendapatkan secret yang sah", "Vaulting, rotation, tidak mengekspos credential"],
            ["Reconnaissance", "Memetakan account, host, trust, dan jalur", "Least privilege, audit, monitoring"],
            ["Lateral movement", "Berpindah dari foothold ke target lain", "PSM isolation dan pembatasan direct access"],
            ["Privilege escalation", "Mendapatkan hak lebih tinggi", "Authorization, approval, scope privilege"],
            ["Business impact", "Mengambil data atau mengganggu layanan", "Recording, alert, suspend, terminate, rotate"]
          ]
        }
      },
      {
        title: "3. Protect, detect, dan respond",
        pages: "Halaman 13–14",
        paragraphs: [
          "Protect bersifat proaktif: credential diamankan, akses hanya untuk user berwenang, setiap penggunaan diatribusikan ke identity individual, sesi diisolasi, dan scope privilege dibatasi. Detect mengubah Vault audit, session audit, recording, dan source lain menjadi alert atau risk signal.",
          "Respond mencakup rotasi atau reconciliation credential, onboarding account unmanaged, suspend, terminate, serta investigasi forensik. Respons otomatis harus memiliki scope, threshold, notification, dan rollback teruji agar kontrol keamanan tidak justru menghentikan aktivitas bisnis yang sah."
        ],
        bullets: [
          "Protect menjawab bagaimana mencegah exposure atau akses tidak perlu.",
          "Detect menjawab bagaimana mengenali penggunaan privilege yang menyimpang.",
          "Respond menjawab tindakan terkontrol apa yang mengurangi risiko.",
          "Forensics menjelaskan siapa melakukan apa, kapan, melalui jalur mana, dan dengan hasil apa."
        ]
      },
      {
        title: "4. Lima kemampuan inti PAM",
        pages: "Halaman 16–22",
        paragraphs: [
          "Discover and manage menemukan account lalu memberi owner, Safe, Platform, policy, verification, dan rotation. Isolation menjaga credential tidak masuk ke workstation user dan memaksa jalur sesi terkontrol. Record and audit menghasilkan video atau text evidence; monitoring memprioritaskan aktivitas berdasarkan risiko; remediation mengubah temuan menjadi tindakan.",
          "Kelima kemampuan itu adalah satu lifecycle. Discovery tanpa onboarding hanya menghasilkan daftar. Rotation tanpa dependency mapping dapat memutus aplikasi. Recording tanpa reviewer dan retention tidak menghasilkan assurance. Alert tanpa response owner hanya menambah noise."
        ],
        table: {
          headers: ["Kemampuan", "Objek utama", "Hasil"],
          rows: [
            ["Discover & manage", "Account, Platform, Safe, policy", "Account diketahui dan dikelola"],
            ["Isolate", "User, PSM, target", "Credential tidak terekspos ke endpoint"],
            ["Record & audit", "Session, recording Safe, event", "Aktivitas dapat direkonstruksi"],
            ["Monitor", "Vault/PSM/PTA/SIEM data", "Penyimpangan diprioritaskan"],
            ["Remediate", "Credential atau session state", "Risiko dikurangi secara terkontrol"]
          ]
        }
      },
      {
        title: "5. Peran Vault, PVWA, CPM, PSM, dan PTA",
        pages: "Halaman 23–27",
        paragraphs: [
          "Digital Vault adalah trust boundary untuk object, credential, authorization, konfigurasi tertentu, dan audit. PVWA adalah web interface untuk mencari account, meminta akses, meluncurkan sesi, menjalankan report, serta melakukan administrasi yang didukung versi.",
          "CPM adalah batch processor credential lifecycle: membaca pekerjaan, memilih plug-in dari Platform, terhubung ke target, menjalankan Verify, Change, atau Reconcile, memvalidasi hasil, lalu memperbarui Vault. PSM adalah proxy sesi yang mengambil credential secara terkendali, menjalankan connector, menghubungkan user ke target, dan menghasilkan recording serta audit. PTA mengumpulkan data untuk mendeteksi risiko dan memicu response."
        ],
        table: {
          headers: ["Komponen", "Tanggung jawab", "Contoh kegagalan"],
          rows: [
            ["Vault", "Penyimpanan, authorization, audit", "Login, object, permission, komunikasi komponen"],
            ["PVWA", "Portal, workflow, REST", "UI, IIS, request, API"],
            ["CPM", "Verify, Change, Reconcile, discovery", "Plug-in, target login, out-of-sync"],
            ["PSM", "Session proxy, isolation, recording", "Ticket, connector, network, target protocol"],
            ["PTA", "Analytics, event, response", "Source, rule, score, alert, automatic action"]
          ]
        }
      },
      {
        title: "6. Interface dan utility memiliki fungsi berbeda",
        pages: "Halaman 28–38",
        paragraphs: [
          "PVWA baru berfokus pada workflow modern, sedangkan classic interface masih dipakai untuk fungsi tertentu pada materi. PrivateArk Client adalah client legacy untuk operasi Vault yang belum atau tidak seluruhnya tersedia di PVWA. Perbedaan tampilan tidak otomatis berarti datanya berbeda.",
          "PAM Web Services menyediakan REST API untuk automation. API identity tetap memerlukan authentication, authorization minimum, credential atau key yang dilindungi, dan audit. Central Administration Station berjalan pada Vault untuk status, log, serta debug tertentu. Remote Control Client dan Agent memberi jalur operasi remote yang mengurangi kebutuhan membuka RDP ke Vault.",
          "Documentation, glossary, knowledge base, dan community membantu mencocokkan versi serta arti pesan. Namun sumber tersebut tidak menggantikan evidence lingkungan: topology, build, timestamp, log, recent change, dan working comparison."
        ]
      },
      {
        title: "7. Alur akses end-to-end",
        pages: "Sintesis halaman 17–34",
        paragraphs: [
          "Satu klik Connect dapat melewati authentication, Vault authorization, Safe membership, workflow reason atau approval, Platform, connection component, PSM selection, retrieval credential, konektivitas PSM-target, target authentication, audit, dan recording. Login sukses hanya membuktikan sebagian awal alur.",
          "Alur CPM berbeda: CPM membaca account dan Platform, mengambil credential, memilih plug-in, mencapai target, menjalankan operasi, melakukan post-check, lalu menyimpan state baru. Karena itu Connect gagal tidak otomatis berarti password salah, dan Verify gagal tidak otomatis berarti PVWA bermasalah.",
          "L2 harus menamai aktivitas yang gagal: login, List, Show, request, Connect, Verify, Change, Reconcile, recording, monitoring, report, atau discovery. Setelah stage diketahui, barulah komponen dan log yang relevan dapat dipilih."
        ],
        callout: { tone: "l2", title: "Aturan diagnosis", text: "Nama komponen bukan diagnosis. Sebut stage dan bukti, misalnya: PSM menerima session ID dan mengambil credential, tetapi connector gagal membuka protokol target." }
      }
    ],
    decisionTable: {
      headers: ["Perubahan", "Dampak ke bawah", "Validasi wajib"],
      rows: [
        ["Platform dinonaktifkan", "Account berhenti dikelola atau hilang dari onboarding", "Population, dependency, CPM status"],
        ["Safe membership diubah", "Visibility, Use, Retrieve, approval, audit berubah", "Persona test dan audit"],
        ["PSM diwajibkan", "Direct workflow menjadi mediated session", "Connector, port, capacity, recording"],
        ["Credential diubah manual", "Vault dan target dapat out-of-sync", "Verify lalu Reconcile sesuai prosedur"],
        ["PTA auto-response aktif", "Session/credential dapat ditindak otomatis", "Rule, scope, threshold, rollback"]
      ]
    },
    scenario: {
      title: "Login berhasil, account terlihat, tetapi Connect gagal",
      situation: "Administrator dapat masuk ke PVWA dan melihat account Linux, tetapi koneksi gagal sebelum target terbuka.",
      walkthrough: [
        "Login sukses membuktikan sebagian jalur identity, PVWA, dan Vault; jangan mulai dengan reset password user.",
        "Account terlihat membuktikan minimal List dan lokasi Safe. Periksa Use serta workflow approval.",
        "Ambil session/correlation ID, PSM yang dipilih, dan connection component dari Platform.",
        "Bedakan kegagalan sebelum retrieval credential, saat connector diluncurkan, saat network ke target, atau saat target authentication.",
        "Bandingkan dengan account working pada PSM dan connector sama, lalu validasi kembali Connect, audit, dan recording."
      ],
      result: "Kesimpulan harus menyebut stage, misalnya PSM memperoleh credential tetapi target menolak SSH pada port yang dikonfigurasi."
    },
    checks: [
      { question: "Apakah privileged user sama dengan privileged account?", answer: "Tidak. User adalah actor/requester di PAM; privileged account adalah identity teknis pada target. Audit menghubungkan keduanya." },
      { question: "Mengapa password vault saja belum cukup disebut PAM?", answer: "Karena privilege juga membutuhkan authorization, lifecycle credential, isolation, recording, monitoring, response, dan audit." },
      { question: "Jika Connect gagal, apakah password pasti salah?", answer: "Belum tentu. Permission, workflow, ticket, PSM, connector, network, protokol, retrieval, dan target authentication harus dipisahkan." },
      { question: "Apa bukti minimum sebelum restart?", answer: "Exact error, waktu/timezone, user/account/target, correlation atau session ID, scope, status service, dan log relevan." }
    ],
    summary: [
      "Privilege ditentukan oleh kemampuan dan dampak, bukan nama account atau jabatan.",
      "PAM memutus rantai serangan melalui protect, detect, dan respond.",
      "Vault, PVWA, CPM, PSM, dan PTA mempunyai tanggung jawab berbeda tetapi saling bergantung.",
      "Login, retrieval, session, dan credential management memiliki flow serta evidence berbeda.",
      "L2 harus mengidentifikasi stage kegagalan sebelum restart, reset, atau eskalasi."
    ],
    boundaries: [
      "Menu, path, port tambahan, dan behavior dapat berbeda menurut versi/build serta desain customer.",
      "Perubahan produksi tetap mengikuti SOP, approval, dan dokumentasi versi yang berlaku.",
      "Jangan memasukkan password, private key, token, credential file, atau data customer mentah ke notebook atau ticket."
    ]
  });

  add("02", {
    title: "User Management",
    subtitle: "Identity di Vault, LDAP provisioning, tiga lapis authorization, dan diagnosis akses yang tidak sesuai.",
    source: "M02, 54 halaman; user/account 4–7, predefined identity 8–12, administrasi 13–34, authorization 35–45, mapping 46–51.",
    readingTime: 52,
    intro: [
      "User adalah pihak yang meminta atau menjalankan tindakan di PAM; account adalah identity teknis pada target. Mengubah user PAM tidak otomatis mengubah account target, dan mengubah password account target tidak memperbaiki login user ke PVWA.",
      "Gunakan lima gerbang untuk membaca akses: Authentication → Directory Mapping → Vault Authorization → Safe Authorization → PVWA Capability. Login sukses hanya membuktikan gerbang awal, belum membuktikan user boleh melihat Safe, memakai account, menjalankan report, atau membuka tab administrasi."
    ],
    mentalModel: "Directory menentukan siapa identity eksternal itu, mapping menerjemahkannya menjadi Vault user/role, Vault authorization memberi fungsi sistem, Safe permission memberi akses object, dan built-in role memengaruhi kemampuan PVWA.",
    objectives: [
      "Membedakan User, Account, internal, transparent, dan predefined identity.",
      "Memahami administrasi user di PrivateArk Client dan PVWA.",
      "Membedakan Vault authorization, Safe authorization, dan PVWA permission.",
      "Menjelaskan LDAP mapping, provisioning, removal, dan synchronization."
    ],
    terms: [
      ["Internal user/group", "Identity yang dibuat otomatis atau manual dan lifecycle-nya dikelola di Vault."],
      ["Transparent user/group", "Identity dari LDAP yang diprovision ke Vault berdasarkan directory mapping."],
      ["Predefined identity", "User/group bawaan untuk administrasi, audit, backup, komponen, atau emergency."],
      ["Vault authorization", "Hak sistem seperti mengelola user, menambah Safe, audit, backup, atau restore."],
      ["Safe authorization", "Permission terhadap satu Safe dan object di dalamnya, misalnya List, Use, Retrieve, View Audit."],
      ["Directory Map", "Aturan yang memilih identity LDAP dan menentukan provisioning, role, authorization, atau location."]
    ],
    sections: [
      {
        title: "1. User bukan account",
        pages: "Halaman 4–7",
        paragraphs: [
          "User adalah actor yang login ke PAM untuk melihat data, memakai account, atau mengelola konfigurasi. Account adalah ID dan credential pada target seperti domain administrator, local administrator, root, database administrator, atau service account.",
          "Pemisahan ini mempertahankan accountability. Beberapa engineer dapat memakai satu root account melalui PAM, tetapi audit tetap harus menunjukkan engineer individual sebagai actor dan root sebagai target account yang dipakai."
        ],
        table: {
          headers: ["Aspek", "User", "Account"],
          rows: [
            ["Berada di", "Vault/directory", "Target dan Vault sebagai managed object"],
            ["Membawa", "Authentication, authorization, group", "Username, address, credential, Platform, Safe"],
            ["Diaudit sebagai", "Actor/requester", "Object/target identity"],
            ["Masalah umum", "Suspended, mapping, permission", "Out-of-sync, target, policy, Platform"]
          ]
        }
      },
      {
        title: "2. Internal dan transparent identity",
        pages: "Halaman 6–7 dan 28–34",
        paragraphs: [
          "Internal identity sepenuhnya dikelola Vault dan cocok untuk user teknis, komponen, break-glass, atau kebutuhan yang tidak berasal dari corporate directory. Transparent identity berasal dari LDAP dan biasanya dibuat di Vault saat login pertama ketika memenuhi mapping.",
          "Jika transparent user hanya dihapus dari Vault sementara object AD dan mapping masih berlaku, user dapat dibuat kembali. Pemblokiran permanen dilakukan pada source directory atau dengan menghapus kondisi mapping sesuai proses organisasi.",
          "AutoSyncExternalObjects mengatur apakah dan kapan external user/group disinkronkan. Karena itu perubahan group directory mungkin tidak langsung terlihat; timing login, provisioning, dan sync harus dicatat saat troubleshooting."
        ],
        callout: { tone: "warning", title: "Jangan salah revoke", text: "Menghapus transparent user dari Vault tidak selalu mencabut akses. Perbaiki source directory atau mapping yang memprovision identity tersebut." }
      },
      {
        title: "3. Predefined identity dan Master user",
        pages: "Halaman 8–12",
        paragraphs: [
          "Instalasi membuat user/group untuk fungsi administrasi, audit, backup, komponen, dan emergency. Banyak identity bawaan otomatis menjadi member Safe dengan hak sesuai perannya, sehingga perubahan terhadapnya dapat berdampak platform-wide.",
          "Master user adalah emergency identity paling kuat. Materi menjelaskan akses melalui PrivateArk Client dengan password, Recovery Private Key, dan pembatasan lokasi seperti Vault console serta EmergencyStationIP. Master harus disimpan dengan custody terpisah, diuji berkala, dan tidak dipakai untuk administrasi harian."
        ]
      },
      {
        title: "4. Administrasi user dan state akses",
        pages: "Halaman 13–27",
        paragraphs: [
          "Pembuatan user internal mencakup authorized interface, authentication method, Vault authorization, group membership, location, status, serta business email untuk notification. Setiap atribut mengubah surface akses dan harus mengikuti least privilege.",
          "PrivateArk Client adalah jalur tradisional. Materi juga menunjukkan kemampuan PVWA untuk create/edit user, membuat group, assign member, disable, activate suspended user, dan reset password. Disable adalah keputusan administratif, sedangkan suspended sering state protektif akibat kegagalan login; root cause harus diperiksa sebelum activate."
        ],
        table: {
          headers: ["Atribut", "Fungsi", "Risiko"],
          rows: [
            ["Authorized Interfaces", "Membatasi jalur login", "Interface yang tidak perlu terbuka"],
            ["Authentication", "Menentukan cara identity dibuktikan", "Metode tidak cocok dengan source"],
            ["Vault authorization", "Memberi fungsi sistem", "Privilege administratif terlalu luas"],
            ["Group membership", "Menyederhanakan role/access", "Effective permission melebar"],
            ["Suspend/activate", "Melindungi atau memulihkan identity", "Lockout attack diabaikan"]
          ]
        }
      },
      {
        title: "5. LDAP integration dan directory mapping",
        pages: "Halaman 28–34 dan 46–51",
        paragraphs: [
          "Vault terhubung ke LDAP menggunakan bind account, lalu mapping menentukan query/group yang relevan dan bagaimana user dibuat. User mapping mengatur provisioning serta atribut user; group mapping membuat group directory searchable, dapat diberi Safe access, atau dinest ke built-in group.",
          "Predefined mapping menghubungkan role umum seperti Vault Admins, Safe Managers, Auditors, dan Users. Custom mapping memberi fleksibilitas, tetapi rule terlalu luas dapat memberi privilege berlebih dan rule terlalu sempit membuat user tidak diprovision. Dokumentasikan query, source group, role, location, precedence, owner, serta expected population.",
          "Uji mapping dengan positive dan negative identity yang group-nya minimal. Menguji hanya dengan administrator yang sudah memiliki banyak membership dapat menyembunyikan jalur akses lain."
        ]
      },
      {
        title: "6. Tiga lapisan authorization",
        pages: "Halaman 35–45",
        paragraphs: [
          "Vault authorization berlaku pada fungsi sistem seperti menambah Safe, mengelola user, audit, backup, atau restore. Safe authorization mengatur List, Use, Retrieve, management, workflow, dan audit pada satu Safe. PVWA capability menentukan tab/pane berdasarkan built-in role dan permission.",
          "Karena lapisannya berbeda, menjadi Vault Admin tidak otomatis menjelaskan visibility seluruh account, dan memiliki Safe access tidak otomatis menampilkan Administration atau Security pane. Diagnosis harus menyebut lapisan yang tepat, bukan sekadar 'permission kurang'."
        ],
        table: {
          headers: ["Lapisan", "Scope", "Gejala bila kurang"],
          rows: [
            ["Vault authorization", "Fungsi global", "Tidak bisa manage user/Safe, audit, backup"],
            ["Safe authorization", "Object pada Safe", "Account tidak terlihat atau tidak bisa Show/Connect"],
            ["PVWA capability", "Area portal", "Administration, Sessions, atau Security pane hilang"]
          ]
        }
      }
    ],
    decisionTable: {
      headers: ["Gejala", "Lapisan utama", "Bukti pembeda"],
      rows: [
        ["Tidak bisa login", "Authentication/directory/user state", "ITAlog, mapping, suspended/disabled"],
        ["Login sukses, account kosong", "Safe membership/List", "Effective group dan Safe member"],
        ["Show tidak ada", "Retrieve/workflow", "Safe permission dan policy"],
        ["Connect tidak ada", "Use/connector/workflow", "Permission dan Platform"],
        ["Administration hilang", "Built-in role/PVWA capability", "Group dan Vault authorization"]
      ]
    },
    scenario: {
      title: "Login sukses tetapi Administration dan account produksi tidak terlihat",
      situation: "User pindah ke tim Vault Admin dan login melalui LDAP, tetapi hanya melihat portal biasa.",
      walkthrough: [
        "Login sukses: jangan reset password. Periksa mapping Vault Admins dan hasil provisioning.",
        "Administration terkait built-in role dan Vault authorization; account produksi terkait Safe membership dan List.",
        "Periksa waktu perubahan directory serta synchronization, lalu bandingkan dengan user working.",
        "Validasi hak yang dimaksud tanpa menambahkan Retrieve atau Manage Members yang tidak diperlukan."
      ],
      result: "Satu ticket dapat memiliki dua gap terpisah: role PVWA untuk tab dan Safe permission untuk object."
    },
    checks: [
      { question: "Mengapa transparent user dapat muncul lagi setelah dihapus?", answer: "Karena directory dan mapping tetap menjadi source. Login atau sync dapat memprovision ulang identity." },
      { question: "Apakah login sukses membuktikan account boleh dilihat?", answer: "Tidak. Visibility memerlukan Safe membership dan List permission." },
      { question: "Apa beda Vault dan Safe authorization?", answer: "Vault authorization memberi fungsi global; Safe authorization mengatur tindakan pada object dalam Safe tertentu." },
      { question: "Mengapa tab PVWA dapat hilang?", answer: "Tab tertentu bergantung pada built-in group/PVWA role, bukan hanya Safe access." }
    ],
    summary: [
      "User adalah actor PAM; account adalah identity teknis pada target.",
      "Internal identity dikelola Vault, transparent identity diprovision dari directory.",
      "Authentication, mapping, Vault authorization, Safe permission, dan PVWA capability harus dipisah.",
      "Deletion di Vault tidak memperbaiki source directory.",
      "Diagnosis akses harus menyebut lapisan permission yang tepat."
    ],
    boundaries: [
      "Nama group dan kemampuan PVWA dapat berbeda menurut versi/customization.",
      "Master credential dan Recovery Private Key tidak boleh masuk ticket atau notebook.",
      "Perubahan mapping dapat memengaruhi banyak user; lakukan impact review dan rollback plan."
    ]
  });

  add("03", {
    title: "Policies and Platforms",
    subtitle: "Menerjemahkan aturan bisnis menjadi perilaku teknis password, koneksi, workflow, dan lifecycle account.",
    source: "M03, 31 halaman; workflow dan Master Policy 4–10, Platform 11–24, exception 25–28.",
    readingTime: 46,
    intro: [
      "Master Policy dan Platform bukan sekadar checkbox. Master Policy menetapkan baseline organisasi; Platform menjelaskan bagaimana baseline dijalankan pada teknologi tertentu; exception mengizinkan deviasi terkontrol; Safe membatasi audience; Account adalah object individual.",
      "Urutan desain materi adalah Review Master Policy → Create Platforms → Add exceptions by Platform → Create Safes → Add Accounts. Urutan ini mencegah account di-onboard sebelum rule, plug-in, connection method, dan access boundary diputuskan."
    ],
    mentalModel: "Master Policy menjawab aturan apa yang berlaku, Platform menjawab bagaimana aturan itu dijalankan pada target, Safe menjawab siapa yang boleh mengakses, dan Account menjawab object mana yang dikelola.",
    objectives: [
      "Menjelaskan hubungan Master Policy, Platform, exception, Safe, dan Account.",
      "Memahami global policy untuk password, workflow, PSM, recording, dan retention.",
      "Membedakan target Platform dan dependent Platform.",
      "Menentukan kapan menduplikasi, menonaktifkan, mengimpor, atau membuat Platform."
    ],
    terms: [
      ["Master Policy", "Baseline bisnis dan audit untuk pengelolaan serta penggunaan privileged account."],
      ["Platform", "Setting teknis dan workflow untuk tipe target/account tertentu."],
      ["Target Platform", "Platform account utama pada server, database, device, cloud, atau sistem target."],
      ["Dependent Platform", "Platform usage credential lain seperti service, task, IIS, atau configuration file."],
      ["Exception", "Deviasi baseline yang diterapkan berdasarkan Platform dengan scope tertentu."],
      ["Plug-in/connector", "Implementasi yang mengetahui cara mengelola credential atau membuka koneksi ke target."]
    ],
    sections: [
      {
        title: "1. Hierarki kebijakan sampai object",
        pages: "Halaman 4",
        paragraphs: [
          "Master Policy berada di tingkat atas. Platform mengelompokkan account dengan perilaku teknis sama. Exception mengubah sebagian baseline untuk Platform. Safe menjadi authorization boundary. Account membawa address, username, credential, dan metadata individual.",
          "Platform bukan folder dan Safe bukan password policy. Satu Platform dapat dipakai account di banyak Safe, sementara satu Safe dapat menampung beberapa Platform bila access model mengizinkan. Keduanya berpotongan tetapi menjawab pertanyaan berbeda."
        ],
        table: {
          headers: ["Layer", "Keputusan", "Contoh"],
          rows: [
            ["Master Policy", "Baseline bisnis", "Rotation, dual control, OTP, PSM, retention"],
            ["Platform", "Perilaku teknis", "Linux SSH, Windows, Oracle, dependent usage"],
            ["Exception", "Deviasi terkontrol", "Region tertentu rotate 30 hari"],
            ["Safe", "Boundary akses", "Tim dan auditor yang berwenang"],
            ["Account", "Object target", "root pada server tertentu"]
          ]
        }
      },
      {
        title: "2. Master Policy sebagai baseline",
        pages: "Halaman 5–10",
        paragraphs: [
          "Global policy mengekspresikan kontrol seperti dual control, exclusive access, one-time password, transparent connection, reason for access, verification/change, PSM recording, dan retention audit. Policy tidak menjalankan tindakan sendiri; ia mengarahkan Platform dan komponen.",
          "Contoh: requirement change setiap 60 hari berada pada policy. Platform menentukan complexity dan plug-in, CPM mengeksekusi perubahan, dan target menerima credential baru. Baseline terlalu ketat memicu banyak exception; baseline terlalu lemah meninggalkan account tidak terlindungi."
        ]
      },
      {
        title: "3. Platform menerjemahkan aturan menjadi tindakan",
        pages: "Halaman 11–14",
        paragraphs: [
          "Mengubah root melalui SSH berbeda dari local Administrator Windows atau Oracle SYS. Platform menunjuk plug-in yang memahami prompt, command, API, dan protokol target serta menyimpan parameter agar CPM dan PSM bekerja konsisten.",
          "Tiga fungsi utamanya adalah password policy teknis, referensi plug-in/connection component, dan basis exception. Salah Platform dapat membuat target menolak password, CPM memakai metode salah, connector hilang, atau workflow tidak sesuai. Dependent Platform mengelola usage credential lain setelah primary credential berubah."
        ],
        table: {
          headers: ["Bagian", "Pertanyaan", "Dampak salah"],
          rows: [
            ["Password generation", "Panjang dan karakter apa?", "Target menolak atau compliance gagal"],
            ["Management", "Kapan Verify/Change/Reconcile?", "Lifecycle berhenti atau terlalu agresif"],
            ["Plug-in", "Bagaimana target diakses?", "Prompt/API/metode tidak cocok"],
            ["Linked account", "Butuh logon/reconcile?", "Root/recovery gagal"],
            ["Connector", "Client/protokol PSM apa?", "Connect hilang atau launch gagal"]
          ]
        }
      },
      {
        title: "4. Duplicate, naming, dan ownership",
        pages: "Halaman 15–22",
        paragraphs: [
          "Materi menyediakan banyak baseline Platform. Praktik aman adalah menduplikasi baseline terdekat ketika populasi teknologi sama membutuhkan lifecycle berbeda, bukan mengubah baseline bersama tanpa mengetahui seluruh pemakainya.",
          "Nama unik sebaiknya mengomunikasikan teknologi, protokol, region, atau rotation. Catat source Platform, parameter yang berbeda, owner, alasan bisnis, population, dan review date. Duplikat tanpa owner akan menumpuk dan sulit dibedakan saat failure."
        ],
        callout: { tone: "concept", title: "Exception atau Platform baru?", text: "Gunakan exception bila hanya rule bisnis tertentu berbeda. Gunakan Platform baru bila plug-in, connector, linked account, atau sekumpulan parameter teknis perlu lifecycle tersendiri." }
      },
      {
        title: "5. Aktivasi, deaktivasi, dan import",
        pages: "Halaman 23–24",
        paragraphs: [
          "Platform inactive disembunyikan dari onboarding dan tidak dikelola CPM. Sebelum deactivate, cari account population, dependent reference, onboarding rule, API/script, connector, dan exception yang memakai Platform ID.",
          "Platform dari marketplace atau custom tetap harus melalui compatibility dan security review. Periksa versi, command, credential handling, permission, source, serta uji di non-production sebelum dipercaya pada privileged account."
        ]
      },
      {
        title: "6. Complexity dan automatic management",
        pages: "Halaman 20–22",
        paragraphs: [
          "Generate Password mengatur length, allowed/forbidden character, dan complexity. Nilainya harus memenuhi policy organisasi sekaligus kemampuan target. Password sangat kompleks tetapi ditolak target tetap menghasilkan Change failure.",
          "CPM belum selesai ketika command change diterima. Ia harus login dengan credential baru dan menyimpan state tervalidasi. Kegagalan post-change dapat menghasilkan out-of-sync; karena itu urutan log lebih penting daripada status akhir singkat."
        ]
      },
      {
        title: "7. Exception dan effective policy",
        pages: "Halaman 25–28",
        paragraphs: [
          "Exception dibuat per Platform untuk deviasi seperti frequency change berbeda. Ia harus diperlakukan sebagai kebutuhan teknis atau risk acceptance dengan owner, alasan, scope, compensating control, test, dan review/expiry.",
          "Saat troubleshooting, cari effective behavior dari global rule, exception, Platform parameter, account state, dan target policy. Jangan mengubah global policy untuk membuat satu account lolos."
        ]
      }
    ],
    decisionTable: {
      headers: ["Perubahan", "Blast radius", "Validasi"],
      rows: [
        ["Global frequency", "Semua Platform tanpa exception", "CPM schedule, target, dependency"],
        ["Complexity Platform", "Semua account pada Platform", "Target policy dan Change test"],
        ["Plug-in/process", "Verify/Change/Reconcile", "Prompt/API dan working account"],
        ["Connector", "Semua sesi PSM Platform", "Deployment, AppLocker, port, recording"],
        ["Deactivate Platform", "Management/onboarding population", "Account, rule, API, CPM status"]
      ]
    },
    scenario: {
      title: "Change gagal setelah complexity dinaikkan",
      situation: "Account modern berhasil, tetapi beberapa target legacy gagal setelah minimum length dan character set diubah.",
      walkthrough: [
        "Keberhasilan account lain membuktikan CPM dan sebagian besar flow bekerja; fokus pada perbedaan target.",
        "Bandingkan generated rule dengan target password policy, termasuk karakter terlarang dan panjang maksimum.",
        "Tentukan apakah population legacy memerlukan Platform khusus atau exception, bukan penurunan baseline global.",
        "Pastikan apakah target sempat mengubah password; kegagalan post-check dapat membutuhkan Reconcile, bukan Change ulang.",
        "Uji non-production, dokumentasikan population, lalu validasi Verify dan Change setelah rollout."
      ],
      result: "Root cause yang presisi adalah incompatibility target terhadap rule tertentu, bukan sekadar 'CPM error'."
    },
    checks: [
      { question: "Apa beda Master Policy dan Platform?", answer: "Master Policy adalah baseline bisnis/global; Platform menerjemahkannya menjadi parameter teknis dan connector untuk tipe account." },
      { question: "Kapan Platform perlu diduplikasi?", answer: "Saat populasi membutuhkan lifecycle atau konfigurasi teknis berbeda yang perlu dikelola sebagai scope sendiri." },
      { question: "Mengapa deactivate berisiko?", answer: "Account dapat berhenti dikelola dan rule/API dapat kehilangan referensi." },
      { question: "Mengapa command change belum berarti sukses?", answer: "CPM masih harus menguji credential baru dan menyimpan state tervalidasi." }
    ],
    summary: [
      "Master Policy adalah baseline; Platform adalah implementasi teknis.",
      "Platform menentukan complexity, plug-in, connector, linked account, dan automatic management.",
      "Target dan dependent Platform memiliki fungsi berbeda.",
      "Duplikasi serta exception harus memiliki scope, owner, dan alasan.",
      "Troubleshooting mencari effective policy dan working comparison."
    ],
    boundaries: [
      "Parameter dan UI Platform berubah antarrilis.",
      "Import Platform/connector memerlukan compatibility dan security review.",
      "Perubahan global dapat memicu operasi massal; gunakan impact assessment dan change window."
    ]
  });

  add("04", {
    title: "Safes",
    subtitle: "Merancang container, authorization boundary, permission matrix, dan lifecycle akses yang dapat diaudit.",
    source: "M04, 36 halaman; Vault model 4–7, desain 8–13, access control 14–23, administrasi 24–32, terminologi 36.",
    readingTime: 50,
    intro: [
      "Safe menentukan batas akses. Kesalahan desain dapat memberi terlalu banyak orang akses credential, memblokir CPM/PSM, membuat approval tidak berjalan, atau mencampur audit antarowner.",
      "Tidak ada Safe model universal. Model harus menjawab siapa membutuhkan akses, siapa tidak boleh melihat data, seberapa sensitif environment, bagaimana ownership dan compliance bekerja, berapa volume object, serta komponen mana yang perlu menjadi member."
    ],
    mentalModel: "Vault adalah bank, authentication adalah verifikasi di pintu, dan Safe adalah kotak dengan member serta hak tersendiri. Berhasil masuk ke bank tidak memberi hak membuka semua kotak; permission pada Safe umumnya berlaku terhadap object di dalamnya.",
    objectives: [
      "Menjelaskan Safe sebagai container dan authorization boundary.",
      "Merancang Safe berdasarkan owner, environment, risk, lifecycle, compliance, dan volume.",
      "Membedakan List, Use, Retrieve, management, workflow, dan audit permission.",
      "Mendiagnosis account tidak terlihat, Connect/Show gagal, atau CPM tidak dapat mengelola object."
    ],
    terms: [
      ["Safe", "Container di Vault untuk account/file/configuration sekaligus boundary authorization."],
      ["Member/Owner", "User atau group yang memperoleh permission pada Safe."],
      ["List Accounts", "Hak melihat object dalam Safe."],
      ["Use Accounts", "Hak memakai account melalui connection workflow seperti PSM."],
      ["Retrieve Accounts", "Hak melihat atau menyalin credential."],
      ["Manage Safe Members", "Hak menambah/menghapus member serta mengubah permission mereka."],
      ["AllowedSafes", "Pola pada Platform yang membatasi Safe mana boleh memakai Platform tersebut."]
    ],
    sections: [
      {
        title: "1. Vault model dan fungsi Safe",
        pages: "Halaman 4–7",
        paragraphs: [
          "Vault menyediakan encryption, firewall, authentication, authorization, dan audit. Safe berada di dalamnya sebagai container logis untuk privileged account, configuration, recording, atau data komponen.",
          "Access control dilakukan dengan menempatkan object di Safe dan memberi user/group hak pada Safe itu. Object yang membutuhkan audience berbeda sebaiknya tidak ditempatkan bersama hanya demi kemudahan administrasi."
        ],
        callout: { tone: "concept", title: "Safe bukan folder biasa", text: "Memindahkan account ke Safe lain dapat mengubah siapa yang melihat, memakai, mengambil, mengelola, mengaudit, atau menyetujui akses." }
      },
      {
        title: "2. Pertanyaan desain Safe model",
        pages: "Halaman 8–10",
        paragraphs: [
          "Mulailah dari kebutuhan akses, bukan daftar server. Tentukan employee, partner, contractor, operator, auditor, atau aplikasi yang membutuhkan data, dan siapa yang secara eksplisit tidak boleh melihatnya.",
          "Pisahkan production, development, test, regulated, atau critical bila owner, approval, retention, dan blast radius berbeda. Pertimbangkan multiple CPM, distribution PSM, volume, geography, dan growth agar model dapat dioperasikan setelah implementasi."
        ],
        bullets: [
          "Siapa owner bisnis dan teknis?",
          "Siapa perlu List, Use, Retrieve, manage, approve, atau audit?",
          "Environment dan sensitivity apa yang harus dipisah?",
          "Komponen CPM/PSM mana memerlukan akses?",
          "Berapa volume, history, retention, dan growth rate?"
        ]
      },
      {
        title: "3. Naming dan capacity",
        pages: "Halaman 11–13",
        paragraphs: [
          "Materi menyebut nama Safe maksimum 28 karakter dan keterbatasan karakter tertentu pada versi yang dibahas. Naming harus padat dan konsisten, misalnya membawa environment, location, asset/OS, account class, atau business owner.",
          "Materi juga menyebut batas 20.000 object termasuk version history dan rekomendasi sekitar 3.000–5.000 account/file per Safe. Gunakan ini sebagai guidance versi materi; capacity planning aktual harus memperhitungkan history, growth, recording, dan performa build."
        ],
        table: {
          headers: ["Dimensi", "Contoh", "Nilai operasi"],
          rows: [
            ["Environment", "P/T/D", "Memisahkan production, test, development"],
            ["Location", "BOS/NYC", "Ownership/data center"],
            ["Asset/OS", "WIN/LIN/ORA", "Teknologi dan tim"],
            ["Account class", "LAD/DOM/SVC", "Jenis privilege"],
            ["Owner", "HR/FIN", "Accountability dan approval"]
          ]
        }
      },
      {
        title: "4. Least privilege melalui pemisahan Safe",
        pages: "Halaman 14–17",
        paragraphs: [
          "Least privilege berarti user hanya menjadi member Safe yang diperlukan dan mendapat permission minimum. Materi tidak menganjurkan object-level control sebagai model utama karena membuat administrasi dan audit rumit.",
          "Contoh ACME memisahkan local admin Windows umum, local admin host Oracle, dan account Oracle. Tim Windows memperoleh semua Windows; tim Oracle hanya host Oracle dan database. Struktur ini mencegah pemberian satu Safe besar ke semua tim.",
          "PVWA dapat membuat struktur Safe tidak terlihat oleh end user, sehingga boundary tidak perlu disederhanakan demi tampilan. Prioritaskan governance dan separation of duties."
        ],
        table: {
          headers: ["Safe", "Isi", "Windows Team", "Oracle Team"],
          rows: [
            ["WIN-SRV", "Local admin non-Oracle", "Use/List", "Tidak ada"],
            ["WIN-SRV-ORA", "Local admin host Oracle", "Use/List", "Use/List"],
            ["DB-ORA", "Account Oracle admin", "Tidak ada", "Use/List atau Retrieve sesuai policy"]
          ]
        }
      },
      {
        title: "5. Permission bukan satu checkbox",
        pages: "Halaman 18–23",
        paragraphs: [
          "List memberi visibility. List+Use memungkinkan koneksi melalui PSM. Retrieve memungkinkan password ditampilkan atau disalin dan karena itu meningkatkan exposure. Account Management memberi kemampuan add/edit/delete/unlock atau memicu operasi CPM. Safe Management mengubah properti dan member.",
          "Manage Safe Members sangat sensitif karena pemegangnya dapat mendelegasikan akses identity lain. Memberi hak ini kepada requester sementara dapat menjadikannya administrator akses. Pisahkan user account, approver, auditor, account manager, dan Safe manager bila dibutuhkan."
        ],
        table: {
          headers: ["Permission", "Kemampuan", "Risiko"],
          rows: [
            ["List", "Melihat account", "Visibility tidak perlu"],
            ["Use", "Menggunakan via PSM", "Sesi ke target"],
            ["Retrieve", "Melihat/menyalin secret", "Credential keluar dari PAM"],
            ["Account Management", "Mengubah object/CPM action", "Lifecycle dan target terdampak"],
            ["Manage Members", "Memberi akses kepada identity lain", "Delegasi privilege"]
          ]
        }
      },
      {
        title: "6. Creation, predefined member, dan AllowedSafes",
        pages: "Halaman 24–32",
        paragraphs: [
          "Vault Admins atau Safe Managers umumnya membuat Safe. Wizard dapat menambah initial members, tetapi permission preset hanya titik awal dan harus direview. Predefined user/group dapat ditambahkan otomatis; jangan menghapus CPM, auditor, atau component access tanpa memahami fungsi.",
          "AllowedSafes membatasi Platform ke Safe yang namanya match regex. Pola terlalu luas mengizinkan salah onboarding; pola terlalu sempit membuat Platform tidak dapat dipakai. Rename Safe, duplicate Platform, dan automation harus divalidasi terhadap pola ini."
        ]
      },
      {
        title: "7. Istilah PrivateArk dan PVWA",
        pages: "Halaman 36",
        paragraphs: [
          "PrivateArk memakai Owners List dan Files, sedangkan PVWA memakai Members List dan Accounts. Normalisasikan istilah ke Safe, member, permission, dan object agar tim tidak mengira ada dua data berbeda hanya karena UI berbeda."
        ]
      }
    ],
    decisionTable: {
      headers: ["Perubahan", "Dampak", "Validasi"],
      rows: [
        ["Account pindah Safe", "Audience, workflow, component access berubah", "Persona, CPM, PSM, audit"],
        ["Manage Members diberikan", "User dapat mendelegasikan akses", "Justification, expiry, audit"],
        ["Retrieve ditambah", "Credential dapat keluar dari PAM", "Need, monitoring, rotation"],
        ["CPM member dihapus", "Verify/Change/Reconcile berhenti", "Component permission dan test"],
        ["Safe di-rename", "AllowedSafes/API/report gagal", "Regex, scripts, rules"]
      ]
    },
    scenario: {
      title: "Account terlihat tetapi Connect dan Show tidak tersedia",
      situation: "User baru ditambahkan melalui group dan dapat melihat account di PVWA.",
      walkthrough: [
        "Visibility membuktikan List. Jangan mengubah authentication atau memindahkan account.",
        "Connect memerlukan Use; Show memerlukan Retrieve. Keduanya sengaja dapat dipisahkan.",
        "Jika user hanya boleh memakai account tanpa melihat password, berikan Use dan pertahankan Retrieve tidak aktif.",
        "Pastikan Platform memiliki connection component serta workflow tidak menahan akses.",
        "Uji dengan user tersebut dan validasi negative case bahwa Show tetap tidak tersedia."
      ],
      result: "Tidak adanya Show dapat merupakan desain benar; tidak adanya Connect menunjukkan Use atau jalur PSM belum terpenuhi."
    },
    checks: [
      { question: "Mengapa Safe adalah authorization boundary?", answer: "Membership dan permission menentukan siapa dapat bertindak terhadap object di dalamnya." },
      { question: "Apa beda List, Use, Retrieve?", answer: "List memberi visibility, Use memberi koneksi, Retrieve mengekspos credential." },
      { question: "Mengapa Manage Members sensitif?", answer: "Pemegangnya dapat memberi privilege kepada identity lain." },
      { question: "Apa fungsi AllowedSafes?", answer: "Membatasi Platform ke Safe dengan pola nama tertentu untuk mencegah salah onboarding." }
    ],
    summary: [
      "Safe adalah container sekaligus authorization boundary.",
      "Model mengikuti owner, audience, environment, risk, compliance, lifecycle, dan capacity.",
      "List, Use, Retrieve, management, workflow, dan audit memiliki dampak berbeda.",
      "Component access dan AllowedSafes harus ikut divalidasi.",
      "Perbaikan permission harus diuji dengan persona nyata dan negative case."
    ],
    boundaries: [
      "Batas karakter dan object count merupakan konteks versi materi.",
      "Membership dan Retrieve adalah perubahan akses sensitif yang perlu approval/audit.",
      "Hindari object-level exception massal sebagai pengganti desain Safe yang jelas."
    ]
  });

  add("05", {
    title: "Accounts — Part 1",
    subtitle: "Onboarding account dan memahami Verify, Change, Reconcile sebagai state machine CPM.",
    source: "M05, 28 halaman; account/onboarding 4–14, management operations 15–25.",
    readingTime: 45,
    intro: [
      "Menambah Account di PVWA tidak membuat user baru pada Windows, Linux, database, atau perangkat. Tindakan itu mendaftarkan object yang mewakili account target yang sudah ada: address, username, credential awal, Safe, Platform, dan metadata.",
      "Setelah onboard, CPM mengelola kesesuaian antara credential di Vault dan target. Verify menguji, Change mengganti secara terkontrol, dan Reconcile memulihkan ketika current credential tidak diketahui atau tidak cocok. Ketiganya mempunyai trigger, privilege, dan risiko berbeda."
    ],
    mentalModel: "Account object adalah catatan kendali, target account adalah realitas di sistem tujuan, dan CPM adalah pekerja yang berusaha menjaga keduanya sinkron sesuai Platform. Status sukses hanya sah setelah target menerima tindakan dan CPM memvalidasi hasilnya.",
    objectives: [
      "Menambah account tanpa menganggap target account dibuat.",
      "Memetakan Safe, Platform, address, username, credential, dan owner.",
      "Membedakan Verify, Change, dan Reconcile.",
      "Membaca stage CPM dari log dan account state."
    ],
    terms: [
      ["Onboarding", "Mendaftarkan existing target account sebagai managed object di Vault."],
      ["Verify", "Menguji apakah credential Vault dapat login ke target tanpa mengubahnya."],
      ["Change", "Membuat credential baru, mengubah target, menguji credential baru, lalu menyimpannya."],
      ["Reconcile", "Mereset target menggunakan account berprivilege ketika current credential tidak dapat dipakai."],
      ["Platform", "Menentukan policy, plug-in, complexity, dan behavior CPM."],
      ["Account state", "Status management seperti valid, pending, failed, locked, atau membutuhkan reconciliation."]
    ],
    sections: [
      {
        title: "1. Account berada di ujung workflow desain",
        pages: "Halaman 4–5",
        paragraphs: [
          "Master Policy menetapkan baseline, Platform menentukan perilaku teknis, Safe menentukan siapa boleh mengakses, lalu Account menjadi object individual. Setiap account berada pada satu Safe dan terasosiasi dengan satu Target Account Platform pada model materi.",
          "Account object membawa username, address, credential, Platform, dan properties. Kesalahan satu field dapat mengarahkan CPM ke target yang salah, memilih plug-in salah, atau memberi audience yang salah meski password sebenarnya benar."
        ]
      },
      {
        title: "2. Apa yang benar-benar terjadi saat Add Account",
        pages: "Halaman 6–14",
        paragraphs: [
          "Contoh materi menambahkan account Linux ke Platform dengan rotation 30 hari dan Safe yang dapat dipakai LinuxAdmins. PVWA menyimpan informasi tersebut di database Vault; ia tidak menjalankan perintah pembuatan user pada Linux.",
          "Sebelum submit, validasi canonical address, username, account type, environment, owner, Safe, Platform, initial credential source, dan kebutuhan linked/dependent account. Setelah submit, lakukan Verify agar kesalahan metadata ditemukan sebelum rotation otomatis.",
          "Onboarding dianggap selesai bukan ketika object muncul, tetapi ketika ownership jelas, Verify berhasil atau exception terdokumentasi, access persona diuji, serta lifecycle CPM dan dependency diketahui."
        ],
        callout: { tone: "warning", title: "Kesalahan konsep", text: "Add Account menciptakan record di PAM, bukan membuat account pada target. Provisioning target dan onboarding PAM adalah proses berbeda." }
      },
      {
        title: "3. Verify: menguji tanpa mengubah",
        pages: "Halaman 16–20",
        paragraphs: [
          "CPM memindai Vault, mengambil account information dan current credential, lalu mencoba login ke target. Target mengembalikan success/failure dan CPM memperbarui status di Vault. Verify menguji sinkronisasi; ia tidak merotasi password.",
          "Verify failure dapat berasal dari credential mismatch, target unreachable, DNS/port, account locked/disabled, Platform plug-in, prompt, atau permission. Karena itu failure tidak otomatis berarti Reconcile diperlukan. Pertama buktikan apakah CPM berhasil mencapai target dan pada tahap mana autentikasi gagal."
        ]
      },
      {
        title: "4. Change sebagai transaksi bertahap",
        pages: "Halaman 21–25",
        paragraphs: [
          "CPM mengambil current credential, membuat password baru sesuai Platform, login ke target, menjalankan change, menerima hasil, lalu login ulang menggunakan credential baru. Hanya setelah post-change login berhasil credential baru disimpan sebagai state valid.",
          "Kegagalan sebelum command change berarti target kemungkinan masih memakai password lama. Kegagalan setelah target berubah tetapi sebelum Vault menyimpan/menvalidasi state berisiko menghasilkan out-of-sync. Log harus dibaca kronologis, bukan hanya baris error terakhir.",
          "Manual Change sebaiknya mengikuti change window dan dependency assessment. Service account dengan usage yang tidak terdaftar dapat berhasil berubah secara teknis tetapi memutus aplikasi."
        ]
      },
      {
        title: "5. Reconcile bukan obat semua failure",
        pages: "Sintesis operasi pada halaman 17 dan kelanjutan M06",
        paragraphs: [
          "Reconcile dipakai ketika current credential tidak dapat dipakai dan tersedia account lain dengan hak reset. Ia tidak memperbaiki network, DNS, plug-in, prompt, target service, atau Platform salah.",
          "Sebelum Reconcile, pastikan mismatch benar-benar credential-related, Reconcile Account benar dan authorized, dependency/impact dipahami, serta target tidak sedang dalam state yang akan menghasilkan lockout tambahan."
        ]
      }
    ],
    decisionTable: {
      headers: ["Stage CPM", "Apa yang terjadi", "Bila gagal"],
      rows: [
        ["Read object", "CPM mengambil Safe/Platform/account", "Permission/component membership/object state"],
        ["Connect target", "Network dan plug-in mencapai target", "DNS, port, service, protocol"],
        ["Authenticate current", "Credential Vault diuji", "Mismatch, lock, username, target policy"],
        ["Execute change", "Target menerima password baru", "Privilege, complexity, prompt, API"],
        ["Post-change login", "Credential baru diuji", "Target state atau generated password"],
        ["Store result", "Vault menyimpan credential/status", "Vault communication atau object update"]
      ]
    },
    scenario: {
      title: "Change gagal setelah password dibuat",
      situation: "PVWA menunjukkan pending/failed Change dan operator tidak tahu apakah target sudah berubah.",
      walkthrough: [
        "Ambil job ID, timestamp, account, Safe, Platform, dan target sebelum retry.",
        "Baca log berurutan: generate → connect → authenticate current → execute change → post-change login → store.",
        "Jika execute belum terjadi, perbaiki connectivity/plug-in/current credential. Jika execute sukses tetapi post-check gagal, perlakukan sebagai potensi out-of-sync.",
        "Jangan mengulang Change atau mengubah target manual sebelum menentukan credential mana yang aktif.",
        "Gunakan Verify/Reconcile sesuai evidence, lalu validasi dependent dan audit."
      ],
      result: "Status akhir saja tidak cukup; keputusan aman bergantung pada stage terakhir yang terbukti sukses."
    },
    checks: [
      { question: "Apakah Add Account membuat account pada target?", answer: "Tidak. Ia mendaftarkan existing target account sebagai object PAM." },
      { question: "Apa beda Verify dan Change?", answer: "Verify menguji current credential tanpa mengubah; Change membuat dan menerapkan credential baru lalu mengujinya." },
      { question: "Kapan Reconcile tepat?", answer: "Ketika current credential tidak dapat dipakai dan Reconcile Account berwenang mereset target." },
      { question: "Mengapa post-change login penting?", answer: "Ia membuktikan target menerima credential baru sebelum Vault menyimpannya sebagai state valid." }
    ],
    summary: [
      "Account object bukan target account baru.",
      "Safe dan Platform harus benar sebelum lifecycle dimulai.",
      "Verify, Change, dan Reconcile menyelesaikan masalah berbeda.",
      "CPM log harus dibaca sebagai urutan transaksi.",
      "Manual target change dapat menciptakan out-of-sync dan dependency outage."
    ],
    boundaries: [
      "Jangan menyalin credential ke ticket atau notebook.",
      "Manual Change/Reconcile produksi memerlukan approval dan impact assessment.",
      "Behavior status dapat berbeda menurut Platform dan versi."
    ]
  });

  add("06", {
    title: "Accounts — Part 2",
    subtitle: "Logon account, reconcile account, privilege switching, dan lifecycle SSH key.",
    source: "M06, 28 halaman; linked accounts 3–15 dan SSH key management 16–25.",
    readingTime: 48,
    intro: [
      "Tidak semua privileged account boleh login langsung. Root sering diblokir dari remote SSH, sementara password yang hilang tidak dapat dipulihkan hanya dengan mencoba credential lama. Linked account memberi CPM jalur alternatif yang terkontrol.",
      "Logon account menyediakan jalur masuk lalu switch ke account utama. Reconcile account mempunyai privilege untuk mereset credential ketika current password tidak dapat dipakai. SSH key juga harus dikelola sebagai credential dengan owner, scope, rotation, distribution, retrieval, dan audit."
    ],
    mentalModel: "Logon account menjawab bagaimana mencapai identity utama ketika direct login dilarang; reconcile account menjawab bagaimana mengambil kembali kendali ketika password utama tidak diketahui; SSH Key Manager menjawab bagaimana key pair dibuat, disimpan, disebarkan, dan dirotasi.",
    objectives: [
      "Menjelaskan dan mengonfigurasi Logon Account.",
      "Menjelaskan dan mengonfigurasi Reconcile Account.",
      "Membedakan fungsi serta privilege keduanya.",
      "Memahami lifecycle public/private SSH key di PAM."
    ],
    terms: [
      ["Logon Account", "Account perantara untuk login ke target lalu switch/elevate ke account utama."],
      ["Reconcile Account", "Account berprivilege yang dapat mereset password target saat credential utama tidak diketahui."],
      ["Privilege switch", "Peralihan identity setelah login, misalnya su atau sudo."],
      ["Public key", "Bagian key pair yang ditempatkan pada target dan boleh didistribusikan sesuai desain."],
      ["Private key", "Bagian rahasia yang membuktikan identity dan harus dilindungi seperti password."],
      ["SSH Key Manager", "Kemampuan membuat, menyimpan, merotasi, dan mendistribusikan key pair secara terkontrol."]
    ],
    sections: [
      {
        title: "1. Mengapa root membutuhkan Logon Account",
        pages: "Halaman 4–8",
        paragraphs: [
          "Best practice pada materi menonaktifkan remote login root melalui konfigurasi SSH. Akibatnya CPM tidak dapat Verify atau Change root dengan login langsung walaupun password root benar.",
          "Solusinya adalah account non-privileged yang boleh login dan mempunyai kemampuan switch ke root. CPM menggunakan credential Logon Account, masuk ke target, menjalankan su/sudo atau mekanisme Platform, lalu melakukan operasi terhadap root.",
          "Logon Account juga dapat dipakai PSM saat koneksi target memerlukan jalur login lalu elevation. Karena digunakan rutin, availability, permission switch, prompt, target association, dan lifecycle account perantara harus stabil."
        ],
        callout: { tone: "warning", title: "Bukan superuser kedua", text: "Jangan memakai root sebagai Logon Account. Account perantara seharusnya memiliki privilege minimum untuk login dan switch yang dibutuhkan." }
      },
      {
        title: "2. Reconcile ketika current password tidak dapat dipercaya",
        pages: "Halaman 9–15",
        paragraphs: [
          "Verify menemukan mismatch ketika credential Vault tidak dapat login. Reconciliation kemudian membuat password baru, login memakai Reconcile Account yang berhak reset, mengubah credential target, menguji credential baru, lalu menyimpan state di Vault.",
          "Reconcile Account biasanya service/domain account dengan hak reset pada scope tertentu. Karena privilege-nya tinggi tetapi dipakai jarang, scope harus minimal, penggunaan diaudit, dan automatic reconciliation hanya diaktifkan setelah failure mode serta dependency dipahami.",
          "Logon Account dipakai ketika password utama diketahui tetapi direct login dilarang. Reconcile Account dipakai ketika password utama hilang/tidak cocok. Memilih linked account salah dapat meningkatkan privilege tanpa menyelesaikan stage failure."
        ],
        table: {
          headers: ["Aspek", "Logon Account", "Reconcile Account"],
          rows: [
            ["Masalah", "Direct login account utama dilarang", "Current credential hilang/out-of-sync"],
            ["Frekuensi", "Rutin", "Jarang/exceptional"],
            ["Privilege", "Login + switch minimum", "Hak reset password pada scope"],
            ["Hasil", "Mencapai account utama", "Membuat credential baru yang sinkron"]
          ]
        }
      },
      {
        title: "3. SSH password dan asymmetric key",
        pages: "Halaman 16–20",
        paragraphs: [
          "Pada password authentication, server membuktikan host, koneksi dienkripsi, lalu user mengirim bukti password melalui channel aman. Pada public-key authentication, target menyimpan public key dan user membuktikan kepemilikan private key tanpa mengirim private key tersebut.",
          "Key dapat lebih panjang dan secret tidak dikirim, tetapi satu private key sering dipercaya banyak target. Jika private key bocor, seluruh target yang mempercayainya terpapar. Key juga lebih sulit dirotasi bila distribution tidak terinventarisasi."
        ]
      },
      {
        title: "4. SSH Key Manager sebagai lifecycle",
        pages: "Halaman 21–24",
        paragraphs: [
          "SSH Key Manager membuat key pair unik, menyimpan private key di Vault, dan menggunakan CPM untuk merotasi serta mendistribusikan public key ke target. Key memakai Platform tersendiri walaupun dapat berbagi Safe dengan password.",
          "Saat existing key dimasukkan ke PAM, key tersebut telah terekspos selama proses onboarding dan sebaiknya segera dirotasi. User dengan Retrieve dapat mengambil private key; user dengan Use dapat Connect tanpa menerima secret, sehingga Use-only lebih mendukung isolation.",
          "Change pada SSH key berarti membuat atau mengganti pair dan memastikan public key baru terpasang di target sebelum key lama dinyatakan tidak berlaku. Validation harus mencakup login dan seluruh target trust."
        ]
      },
      {
        title: "5. Application server dan private key occurrence",
        pages: "Halaman 25",
        paragraphs: [
          "Aplikasi yang mengautentikasi dengan SSH key mungkin memerlukan private key didorong ke application server. Ini menciptakan dependency: Vault menyimpan source, tetapi aplikasi mempunyai occurrence yang harus diperbarui saat rotation.",
          "Scope target, permission file, service restart, owner, rollback, dan post-change test harus didokumentasikan. Jangan menganggap penyimpanan private key di Vault otomatis menghapus seluruh copy lama di filesystem."
        ]
      }
    ],
    decisionTable: {
      headers: ["Kondisi", "Linked object", "Pemeriksaan"],
      rows: [
        ["Root tidak boleh SSH langsung", "Logon Account", "Login, su/sudo, prompt, privilege"],
        ["Password utama unknown/out-of-sync", "Reconcile Account", "Reset scope, authorization, target"],
        ["SSH key login gagal", "Key object/Platform", "Format, username, public key, permission, port"],
        ["Banyak target memakai satu key", "Key trust inventory", "Blast radius dan rotation plan"],
        ["Aplikasi menyimpan private key", "Dependent occurrence", "Path, owner, update, restart, validation"]
      ]
    },
    scenario: {
      title: "Root Change gagal walaupun password benar",
      situation: "CPM mencoba SSH langsung sebagai root pada server yang menetapkan PermitRootLogin no.",
      walkthrough: [
        "Verify bahwa failure terjadi pada direct root login, bukan network atau password generation.",
        "Onboard Logon Account yang boleh SSH dan mempunyai switch privilege minimum.",
        "Link ke root, uji login dan su/sudo secara terpisah, lalu jalankan Verify/Change.",
        "Jika current root password sudah tidak diketahui, evaluasi Reconcile Account—jangan menukar fungsinya dengan Logon Account.",
        "Validasi PSM Connect karena Platform dapat memakai Logon Account yang sama untuk session."
      ],
      result: "Root tetap tidak menerima remote login; PAM mencapai dan mengelolanya melalui identity perantara yang terkontrol."
    },
    checks: [
      { question: "Apa beda Logon dan Reconcile Account?", answer: "Logon memberi jalur masuk/switch saat password utama diketahui; Reconcile mereset saat password utama tidak dapat dipakai." },
      { question: "Mengapa root tidak cocok sebagai Logon Account?", answer: "Logon Account seharusnya account perantara berprivilege minimum, bukan superuser yang sama." },
      { question: "Apa risiko satu private key untuk banyak target?", answer: "Kompromi satu key membuka seluruh target yang mempercayainya dan rotation menjadi luas." },
      { question: "Mengapa key onboarding diikuti rotation?", answer: "Key lama terekspos selama pengumpulan/import sehingga tidak lagi dapat dianggap rahasia penuh." }
    ],
    summary: [
      "Logon Account adalah jalur masuk dan privilege switch.",
      "Reconcile Account adalah jalur reset untuk credential unknown/out-of-sync.",
      "SSH private key adalah credential rahasia dengan blast radius sendiri.",
      "Key Manager mengelola generation, storage, distribution, rotation, dan access.",
      "Linked reference, target privilege, dan post-change validation harus diuji."
    ],
    boundaries: [
      "Jangan retrieve private key ke workstation bila Use/Connect memenuhi kebutuhan.",
      "Scope Reconcile Account harus minimal dan diaudit.",
      "Perubahan sshd, sudoers, atau key trust produksi mengikuti change control."
    ]
  });

  add("07", {
    title: "Dependent Platforms",
    subtitle: "Menjaga seluruh occurrence credential tetap sinkron ketika primary password berubah.",
    source: "M07, 24 halaman; konsep usage 4–10, configuration file 11–18, discovery dependency 19–21.",
    readingTime: 44,
    intro: [
      "Satu service account dapat dipakai untuk login target sekaligus tersimpan di Windows Service, Scheduled Task, IIS, registry, database string, atau configuration file. Jika CPM hanya mengubah primary credential, aplikasi yang masih menyimpan password lama akan berhenti.",
      "Dependent Platform atau Usage merepresentasikan occurrence credential lain yang harus diperbarui setelah primary Change. Dependency harus ditemukan, didaftarkan, diuji, dan dimiliki sebelum rotation otomatis dianggap aman."
    ],
    mentalModel: "Primary account adalah sumber credential yang dikelola; dependent adalah salinan atau reference yang dipakai proses lain. Change yang benar adalah transaksi lintas semua occurrence, bukan hanya perubahan password pada target utama.",
    objectives: [
      "Menjelaskan dependent dan usage.",
      "Mengonfigurasi Windows usage dan configuration-file usage.",
      "Memahami SearchForUsages serta referensi Platform ID.",
      "Membedakan dependency yang dapat ditemukan otomatis dan yang harus manual."
    ],
    terms: [
      ["Usage", "Occurrence credential yang sama pada service, task, aplikasi, file, registry, atau lokasi lain."],
      ["Dependent Platform", "Platform yang mengetahui cara memperbarui jenis usage tertentu."],
      ["Primary account", "Managed account utama yang credential-nya menjadi sumber perubahan."],
      ["SearchForUsages", "Parameter yang mengaktifkan pencarian/pemrosesan dependent untuk Platform target."],
      ["Platform ID", "Identifier dependent yang harus cocok dengan reference pada Target Platform."],
      ["Post-change validation", "Pengujian bahwa proses/aplikasi tetap bekerja setelah semua occurrence diperbarui."]
    ],
    sections: [
      {
        title: "1. Mengapa dependency memutus aplikasi setelah rotation",
        pages: "Halaman 4–8",
        paragraphs: [
          "Materi memakai Scheduled Task yang berjalan sebagai sendmail01. Password account berada pada target dan juga disimpan oleh task. Jika CPM mengubah hanya target account, task terus mencoba password lama dan gagal.",
          "Dengan usage terdaftar, CPM mengubah primary credential lalu memperbarui occurrence pada task. Keberhasilan job harus mencakup status task/service dan fungsi bisnis, bukan hanya pesan bahwa password account berubah."
        ],
        callout: { tone: "l2", title: "Pola insiden", text: "Aplikasi down segera setelah rotation adalah indikator kuat dependency hilang, salah reference, gagal update, atau gagal restart—bukan alasan langsung untuk menonaktifkan CPM." }
      },
      {
        title: "2. Hubungan Target Platform dan Dependent Platform",
        pages: "Halaman 9–10",
        paragraphs: [
          "Windows usages diaktifkan pada baseline tertentu. Target Platform harus mereferensikan ID dependent yang didukung dan SearchForUsages harus aktif. Nama/reference yang tidak cocok membuat CPM tidak memproses usage meski object dependent terlihat di UI.",
          "Target Platform menentukan lifecycle primary account; Dependent Platform menentukan cara menemukan atau mengubah occurrence. Keduanya harus kompatibel dengan target OS, path, service type, dan privilege account yang dipakai untuk mencapai lokasi usage."
        ]
      },
      {
        title: "3. Configuration file usage",
        pages: "Halaman 11–18",
        paragraphs: [
          "Materi mencakup plain text, INI, XML, web configuration, registry, database string, dan private SSH key. Configuration-file usage biasanya harus ditambahkan manual ke Target Platform dan account dengan server, full path, section/key atau pola lokasi credential.",
          "Kesalahan address, path, section, parameter, file permission, encoding, lock, atau parser dapat membuat primary Change sukses tetapi file tidak berubah. Bila server usage memerlukan identity lain untuk login, linked Logon Account harus diasosiasikan dengan usage.",
          "Password dalam file dapat diproses oleh external encryption command. Command path dan regex output menjadi bagian dari transaction chain; failure command atau pola yang salah dapat menulis nilai unusable meski CPM menganggap proses dijalankan."
        ]
      },
      {
        title: "4. Discovery dependency dan batasannya",
        pages: "Halaman 19–21",
        paragraphs: [
          "Accounts Discovery dapat mendeteksi beberapa Windows dependency seperti COM+, IIS anonymous access, IIS application pool, Scheduled Task, dan Windows Service. Dependency lain—database string, INI, private SSH key, text, web, registry, XML—harus ditambahkan manual pada konteks materi.",
          "Tidak ditemukannya dependency bukan bukti dependency tidak ada. Administrator tetap membutuhkan application owner interview, service inventory, config search, CMDB, dan test rotation. Discovery mempercepat inventaris tetapi tidak menggantikan ownership."
        ]
      },
      {
        title: "5. Urutan transaksi dan validasi",
        pages: "Sintesis halaman 4–21",
        paragraphs: [
          "Urutan aman adalah identifikasi primary → daftar usage → bind Dependent Platform → uji akses ke occurrence → Change primary → update semua usage → restart/reload bila perlu → validasi fungsi bisnis.",
          "Jika satu dependent gagal, jangan langsung mengubah kembali primary secara manual. Catat stage, status occurrence lain, risiko aplikasi, dan kemampuan retry/rollback agar tidak menciptakan tiga versi password berbeda."
        ]
      }
    ],
    decisionTable: {
      headers: ["Gejala", "Kemungkinan", "Bukti"],
      rows: [
        ["Aplikasi down setelah rotation", "Usage tidak terdaftar/gagal update", "CPM job, dependent status, app log"],
        ["Scheduled Task gagal", "Stored credential lama atau task/path salah", "Task history dan usage object"],
        ["Config file tidak berubah", "Path/permission/parser/lock", "File timestamp, CPM third-party log"],
        ["Usage tidak ditemukan", "SearchForUsages/Platform ID/discovery limit", "Platform config dan manual inventory"],
        ["Update sukses tetapi app tetap gagal", "Reload/restart atau format value", "Service status dan functional test"]
      ]
    },
    scenario: {
      title: "Aplikasi berhenti tepat setelah service account dirotasi",
      situation: "Primary Change sukses, tetapi Scheduled Task dan aplikasi CRM gagal autentikasi.",
      walkthrough: [
        "Kunci timeline Change dan failure aplikasi; jangan langsung rollback manual.",
        "Inventaris occurrence: task, service, IIS, config file, registry, key, atau string database.",
        "Periksa dependent object, Platform ID, SearchForUsages, path/server, Logon Account, dan CPM third-party log.",
        "Tentukan occurrence mana sukses/gagal agar tidak membuat state campuran semakin buruk.",
        "Perbaiki/retry sesuai stage, reload service bila diperlukan, lalu lakukan functional test bersama owner aplikasi."
      ],
      result: "Sukses primary Change bukan sukses bisnis sampai setiap dependent occurrence dan fungsi aplikasi tervalidasi."
    },
    checks: [
      { question: "Apa itu usage?", answer: "Occurrence credential primary yang disimpan atau dipakai di lokasi lain seperti service, task, atau file." },
      { question: "Mengapa SearchForUsages penting?", answer: "Ia mengaktifkan pemrosesan dependent yang direferensikan Target Platform." },
      { question: "Apakah discovery menemukan semua dependency?", answer: "Tidak. Materi membatasi discovery otomatis pada beberapa Windows dependency; banyak file/registry/key harus manual." },
      { question: "Apa arti Change sukses tetapi aplikasi gagal?", answer: "Kemungkinan primary berubah namun dependent tidak ter-update, tidak reload, atau value/path salah." }
    ],
    summary: [
      "Dependent adalah occurrence credential lain yang harus ikut berubah.",
      "Target dan Dependent Platform harus saling mereferensikan dengan benar.",
      "Config-file usage membutuhkan server, path, lokasi value, permission, dan parser tepat.",
      "Discovery membantu tetapi tidak menggantikan inventory dan owner aplikasi.",
      "Post-change validation harus menguji fungsi bisnis."
    ],
    boundaries: [
      "Jangan menampilkan password file dalam log/ticket.",
      "Rotation service account memerlukan owner, rollback, dan maintenance window.",
      "External encryption command harus melalui security review."
    ]
  });

  add("08", {
    title: "Privileged Access Workflows",
    subtitle: "Menggabungkan permission dasar dengan reason, approval, exclusivity, dan one-time password.",
    source: "M08, 38 halaman; transparent/reason 3–9, dual control 10–22, exclusive 23–28, OTP/kombinasi 29–35.",
    readingTime: 52,
    intro: [
      "Safe permission menentukan kemampuan dasar: List+Retrieve menghasilkan Show/Copy, sedangkan List+Use memungkinkan Connect. Workflow menambahkan syarat bisnis di atas permission tersebut, misalnya reason, approval, waktu akses, lock, atau perubahan password setelah digunakan.",
      "Workflow tidak menggantikan permission. User dapat memiliki Use tetapi tertahan approval; sebaliknya approval selesai tetapi Connect tetap tidak tersedia bila Use atau connection component tidak ada."
    ],
    mentalModel: "Permission menjawab boleh melakukan apa; workflow menjawab dengan syarat apa, setelah persetujuan siapa, untuk jangka waktu berapa, dan apa yang terjadi pada account setelah dipakai.",
    objectives: [
      "Menjelaskan transparent connection dan reason for access.",
      "Merancang requester/approver untuk Dual Control.",
      "Membedakan multi-group, multi-level, manager approval, dan bypass.",
      "Membedakan Exclusive Password, One-Time Password, dan kombinasinya."
    ],
    terms: [
      ["Transparent connection", "Koneksi tanpa perlu menampilkan credential kepada user."],
      ["Reason for access", "Konteks yang diwajibkan ketika account digunakan."],
      ["Dual Control", "Requirement approval sebelum akses diberikan."],
      ["Exclusive Password", "Account dikunci untuk satu user sampai release/check-in."],
      ["One-Time Password", "Credential ditandai untuk berubah setelah digunakan berdasarkan validity period."],
      ["MinValidityPeriod", "Jangka waktu minimum sebelum password one-time diubah oleh CPM."],
      ["Bypass confirmation", "Permission yang memungkinkan kelompok tertentu melewati approval."
      ]
    ],
    sections: [
      {
        title: "1. Permission dasar dan transparent connection",
        pages: "Halaman 3–6",
        paragraphs: [
          "List menentukan visibility. Retrieve memungkinkan Show/Copy. Use memungkinkan Connect. Transparent connection memberi corporate control agar user dapat memakai account melalui PSM tanpa melihat password, sehingga credential isolation tetap dipertahankan.",
          "Jika tombol hilang, periksa permission dasar terlebih dahulu sebelum menuduh workflow. Jika tombol ada tetapi proses tertahan, lanjutkan ke reason, approval, time window, account lock, dan policy exception."
        ]
      },
      {
        title: "2. Reason for access sebagai konteks audit",
        pages: "Halaman 7–9",
        paragraphs: [
          "Reason for access memaksa user menjelaskan tujuan penggunaan account. Daftar predefined reason dapat dikonfigurasi per Platform sehingga pilihan dapat berbeda antara database, server produksi, atau perangkat jaringan.",
          "Reason bukan kontrol pencegahan yang cukup sendirian; user tetap dapat memilih alasan generik. Nilainya muncul ketika reason dikombinasikan dengan ticket, approval, actor, target, timestamp, recording, dan post-use review."
        ]
      },
      {
        title: "3. Dual Control dan pembagian peran",
        pages: "Halaman 10–22",
        paragraphs: [
          "Requester membutuhkan List serta Use dan/atau Retrieve. Approver umumnya membutuhkan List dan Authorize tetapi tidak harus memakai account. Sistem mencegah self-approval, sehingga peer approval dalam satu group tetap memerlukan dua actor terpisah.",
          "Bypass diberikan melalui permission Access Safe without confirmation dan harus dibatasi pada kelompok yang benar-benar membutuhkan emergency/operational exception. Jika beberapa approver group dikonfigurasi, setidaknya satu orang dari setiap group dapat diwajibkan approve.",
          "Multi-level mengirim request secara berurutan dari satu group ke group lain; direct-manager approval menggunakan atribut manager directory. Memilih semua confirmer dapat membuat request macet ketika seseorang tidak tersedia, sehingga availability dan delegation harus dirancang."
        ],
        table: {
          headers: ["Model", "Cara kerja", "Risiko operasi"],
          rows: [
            ["Peer approval", "Dua actor dalam group sama", "Group terlalu kecil"],
            ["Multi-group", "Satu approval dari tiap group", "Salah satu group tidak tersedia"],
            ["Multi-level", "Approval berurutan", "Bottleneck tahap awal"],
            ["Direct manager", "Manager dari directory", "Atribut manager salah/kosong"],
            ["Bypass", "Tidak perlu confirmation", "Jalur kontrol mudah disalahgunakan"]
          ]
        }
      },
      {
        title: "4. Exclusive Password",
        pages: "Halaman 23–28",
        paragraphs: [
          "Exclusive access mengunci account untuk satu user ketika di-check-out. User lain tidak dapat memakai account sampai owner melakukan check-in atau administrator berhak memaksa release.",
          "Setelah release, CPM menjadwalkan immediate Change agar credential yang mungkin telah diketahui user tidak dapat digunakan kembali. Versi materi juga menjelaskan PSM dapat auto-release ketika session ditutup, mengurangi account yang tetap terkunci akibat user lupa check-in.",
          "Abnormal session termination, browser close, atau PSM failure harus diuji karena lock state dan password-change trigger dapat berbeda."
        ]
      },
      {
        title: "5. One-Time Password dan MinValidityPeriod",
        pages: "Halaman 29–31",
        paragraphs: [
          "One-time password menandai account untuk Change setelah digunakan, tetapi memungkinkan beberapa user memakai credential selama MinValidityPeriod. Periode harus cukup panjang untuk menyelesaikan pekerjaan namun cukup pendek untuk membatasi reuse.",
          "Setiap access dapat memengaruhi timer sesuai behavior versi. Investigasi harus melihat access timeline, request window, MinValidityPeriod, dan CPM schedule sebelum menyimpulkan password terlambat berubah."
        ]
      },
      {
        title: "6. Kombinasi workflow dan precedence waktu",
        pages: "Halaman 32–35",
        paragraphs: [
          "Exclusive+OTP mengunci account ke satu user dan melepaskannya otomatis berdasarkan validity period jika tidak di-check-in, kemudian password diubah. Dual Control dapat ditambahkan di depan untuk memastikan approval sebelum lock dibuat.",
          "Ketika request timeframe aktif, materi menjelaskan timeframe tersebut dapat mengalahkan MinValidityPeriod. Karena itu effective expiry berasal dari kombinasi policy, Platform, request, access time, lock, dan session close—bukan satu parameter saja."
        ]
      }
    ],
    decisionTable: {
      headers: ["Gejala", "Periksa", "Makna"],
      rows: [
        ["Show/Connect hilang", "List/Retrieve/Use", "Base permission belum terpenuhi"],
        ["Request pending", "Approver group, level, manager, expiry", "Approval path macet"],
        ["Account locked", "Owner, check-in, PSM session, force release", "Exclusive masih aktif"],
        ["Password belum berubah", "Request timeframe, MinValidityPeriod, CPM", "Trigger belum jatuh tempo/gagal"],
        ["User bypass approval", "Access without confirmation", "Exception permission aktif"]
      ]
    },
    scenario: {
      title: "Request pending lalu account tetap locked",
      situation: "Requester mendapat approval terlambat, memakai account secara exclusive, lalu session terputus sebelum check-in.",
      walkthrough: [
        "Korelasikan request ID, requester, approver groups, approval time, access window, dan expiry.",
        "Pastikan semua group/level yang diwajibkan telah approve dan manager attribute benar bila dipakai.",
        "Setelah access, periksa lock owner, session state, PSM auto-release, dan hak force release.",
        "Periksa apakah request timeframe atau MinValidityPeriod sudah memicu Change dan apakah CPM berhasil.",
        "Release/force release hanya dengan authorization; validasi account tersedia dan password telah berubah sesuai policy."
      ],
      result: "Request lifecycle, lock lifecycle, session lifecycle, dan password lifecycle adalah empat timeline yang harus dikorelasikan."
    },
    checks: [
      { question: "Apakah approval menggantikan Use permission?", answer: "Tidak. Approval adalah syarat tambahan; permission dasar tetap harus ada." },
      { question: "Apa beda Exclusive dan OTP?", answer: "Exclusive mengunci account untuk satu user; OTP menandai credential untuk berubah setelah waktu tertentu dan dapat mengizinkan akses bersamaan." },
      { question: "Mengapa all confirmers berisiko?", answer: "Satu approver tidak tersedia dapat menahan seluruh request." },
      { question: "Apa fungsi auto-release PSM?", answer: "Melepas lock ketika session ditutup agar account tidak bergantung pada manual check-in." }
    ],
    summary: [
      "Permission dasar dan workflow adalah lapisan berbeda.",
      "Reason memberi konteks audit, bukan jaminan kebenaran.",
      "Dual Control memerlukan desain requester, approver, availability, dan bypass.",
      "Exclusive mengelola lock; OTP mengelola perubahan setelah penggunaan.",
      "Kombinasi workflow mempunyai precedence waktu yang harus diuji."
    ],
    boundaries: [
      "Bypass dan force release adalah privilege tinggi yang harus diaudit.",
      "Perubahan workflow dapat memblokir operasi; uji positive, negative, expiry, dan abnormal termination.",
      "Parameter waktu dan behavior dapat berbeda menurut versi/Platform."
    ]
  });

  add("09", {
    title: "Discovery and Onboarding",
    subtitle: "Menemukan privileged account, menilai hasil, dan memasukkannya ke Safe/Platform dengan rule yang terkendali.",
    source: "M09, 56 halaman; metode 3–10, Windows discovery 11–25, rules 26–36, UNIX 37–41, continuous/PTA/DNA/REST 42–53.",
    readingTime: 58,
    intro: [
      "Discovery menjawab account apa yang ada; onboarding menjawab account mana yang akan dikelola, di Safe dan Platform mana, oleh owner siapa, dengan credential awal serta lifecycle apa. Menemukan account tidak otomatis membuatnya aman.",
      "Materi mencakup single add, bulk CSV, Windows/UNIX discovery, Pending Accounts, Automatic Onboarding Rules, continuous discovery melalui PTA, DNA, dan REST API. Setiap metode mempunyai source, scope, privilege, dan failure mode berbeda."
    ],
    mentalModel: "Discovery menghasilkan candidate record. Rule atau administrator mengklasifikasikan candidate. Onboarding membuat managed object. Verify/Change membuktikan object benar-benar dapat dikelola. Empat tahap ini harus dibedakan.",
    objectives: [
      "Membandingkan single, bulk, discovery, continuous, DNA, dan REST onboarding.",
      "Menjalankan Windows/UNIX discovery dengan scan account dan CPM Scanner.",
      "Memproses Pending Accounts dan dependency.",
      "Merancang Automatic Onboarding Rule dengan precedence aman."
    ],
    terms: [
      ["Discovery", "Pemindaian environment untuk menemukan account dan atributnya."],
      ["Pending Account", "Discovered record yang belum masuk managed Safe/Platform."],
      ["CPM Scanner", "Service CPM yang menjalankan discovery task."],
      ["Scan Account", "Identity yang membaca directory/target selama discovery."],
      ["Onboarding Rule", "Rule yang memetakan discovered attribute ke Platform, Safe, dan initial behavior."],
      ["Precedence", "Urutan rule; rule baru pada materi mendapat prioritas tertinggi."],
      ["Add Discovered Accounts", "REST method untuk memasukkan hasil discovery ke Pending atau rule processing."]
    ],
    sections: [
      {
        title: "1. Memilih metode onboarding",
        pages: "Halaman 3–10",
        paragraphs: [
          "Single add cocok untuk account yang diketahui dan jumlah kecil. Bulk CSV cocok untuk migrasi atau department baru ketika Safe dan Platform sudah ada. Satu row mewakili satu account dengan properties yang akan disimpan.",
          "Materi menyebut bulk file maksimum 10.000 account, tidak mendukung linked account/dependency, tidak dapat dibatalkan setelah mulai, dan upload berlangsung satu per satu tanpa multiple uploader bersamaan. Karena itu file harus divalidasi, dipilotkan, dan disimpan sebagai change artifact sebelum submit.",
          "Discovery cocok ketika inventory belum lengkap. REST cocok untuk integrasi provisioning. Continuous discovery melalui analytics menambah deteksi account unmanaged dari aktivitas aktual. Metode boleh digabung, tetapi source-of-truth dan deduplication harus jelas."
        ]
      },
      {
        title: "2. Windows Discovery workflow",
        pages: "Halaman 11–19",
        paragraphs: [
          "Vault Admin membuat task dengan domain, opsi secure directory connection, Scan Account, OU server/workstation, CPM Scanner, dan jadwal one-time atau recurring. Scanner mengambil task dari Vault, membaca directory, mengautentikasi ke target, lalu menemukan account.",
          "Scan Account harus domain account dengan read permission pada directory dan local administrative rights pada Windows target sesuai materi. Scope yang terlalu luas memberi privilege scanning besar dan menghasilkan noise; scope terlalu sempit membuat discovery kosong.",
          "Task bergerak Pending ke Running dan dapat dihentikan/dihapus pada stage tertentu. Account dikategorikan privileged berdasarkan group membership—misalnya membership Local Administrators—dan status itu dapat bertahan sampai evidence removal dari semua host diproses."
        ],
        table: {
          headers: ["Input", "Fungsi", "Failure umum"],
          rows: [
            ["Domain/secure LDAP", "Mencari object directory", "Bind/TLS/DNS"],
            ["Scan Account", "Membaca AD dan target", "Permission/lockout"],
            ["OU scope", "Membatasi host", "OU salah/terlalu luas"],
            ["CPM Scanner", "Menjalankan task", "Service/disconnect/capacity"],
            ["Schedule", "One-time/recurring", "Overlap atau stale inventory"]
          ]
        }
      },
      {
        title: "3. Pending Accounts dan manual onboarding",
        pages: "Halaman 20–25",
        paragraphs: [
          "Account yang tidak match rule masuk Pending. Preview menampilkan atribut dan untuk Windows dapat menunjukkan dependency seperti service atau Scheduled Task. Pending adalah staging area untuk validasi, bukan tempat menyimpan account tanpa owner selamanya.",
          "Manual onboarding memilih existing/new Safe, target Platform, dan apakah reconciliation tersedia. Administrator harus mengecek duplicate, current owner, target existence, dependency, privilege classification, initial credential handling, serta apakah account seharusnya dikelola atau dikecualikan dengan alasan."
        ]
      },
      {
        title: "4. Automatic Onboarding Rules",
        pages: "Halaman 26–36",
        paragraphs: [
          "Wizard memilih system type, machine/account category, privileged type, optional name pattern, target Platform, Safe, rule name/description, dan initial password behavior. Jika Platform memiliki Reconcile Account dan Auto Verify on Add aktif, onboarding dapat dilanjutkan ke perubahan credential otomatis.",
          "Rule baru mendapat precedence tertinggi pada materi. Rule terlalu luas dapat menangkap account sebelum rule spesifik. Rule hanya berlaku pada discovered account tanpa dependency dalam konteks materi; account yang tidak dapat diproses masuk Pending.",
          "Setiap rule memerlukan owner, match criteria, examples/non-examples, target Safe/Platform, population estimate, precedence, rollout mode, reconciliation behavior, rollback, dan review."
        ],
        callout: { tone: "warning", title: "Automation memperbesar blast radius", text: "Rule salah tidak sekadar mengklasifikasikan data; ia dapat membuat object, mengubah credential, dan memindahkan ownership secara massal." }
      },
      {
        title: "5. UNIX discovery",
        pages: "Halaman 37–41",
        paragraphs: [
          "UNIX discovery memakai CSV address host, scan user, default password pada flow materi, CPM Scanner, opsi scan SSH key, dan jadwal. Berbeda dari Windows directory-centric flow, kualitas daftar host dan kemampuan scan user pada setiap target menjadi penentu utama.",
          "Simpan secret scan secara aman, batasi network scope, dan hindari memasukkan credential ke file/ticket di luar mekanisme yang disetujui. Hasil tetap harus melewati deduplication, owner validation, Safe/Platform mapping, dan Verify."
        ]
      },
      {
        title: "6. Continuous discovery, DNA, dan REST",
        pages: "Halaman 42–53",
        paragraphs: [
          "PTA dapat mendeteksi unmanaged privileged login pada Windows, UNIX-like, AWS, Azure, atau platform lain sesuai capability. Windows local administrator membership juga dapat dipantau terus-menerus. Detection aktual membantu menemukan account yang lolos dari periodic scan.",
          "DNA adalah discovery/audit utility untuk assessment. REST onboarding mencakup Add Account ketika Safe/Platform diketahui, Add Discovered Accounts untuk hasil scanner/DNA/PTA/third party, dan bulk upload untuk multiple account. Simpan request/response status serta correlation ID tanpa secret."
        ]
      }
    ],
    decisionTable: {
      headers: ["Gejala", "Kemungkinan", "Evidence"],
      rows: [
        ["Discovery kosong", "Scope/scan permission/scanner/network", "Task, OU/host, scanner log"],
        ["Pending tidak match rule", "Attribute/precedence/criteria", "Discovered record dan rule"],
        ["Auto-onboard salah", "Rule terlalu luas/precedence", "Rule version, created time, population"],
        ["Duplicate account", "Source overlap/dedup gagal", "Address/username/Safe existing"],
        ["REST gagal", "Auth/authorization/payload/status", "HTTP response dan correlation ID"]
      ]
    },
    scenario: {
      title: "Discovery berjalan tetapi account penting tidak muncul",
      situation: "Task Windows selesai tanpa error, namun local admin pada beberapa server tidak ada di Pending.",
      walkthrough: [
        "Pastikan host benar-benar berada dalam OU/scope dan task memakai CPM Scanner yang diharapkan.",
        "Validasi Scan Account dapat membaca AD dan memiliki local administrative access pada host yang hilang.",
        "Bandingkan satu host ditemukan dan satu tidak: DNS, firewall, OS, group membership, scan log, dan last contact.",
        "Periksa apakah account sudah onboard/duplicate, difilter, atau match rule otomatis sehingga tidak lagi di Pending.",
        "Perbaiki scope/permission, rerun terbatas, lalu validasi classification dan dependency sebelum onboarding."
      ],
      result: "Status task Completed hanya berarti task selesai, bukan bahwa setiap host/account dalam niat bisnis berhasil dipindai."
    },
    checks: [
      { question: "Apa beda discovery dan onboarding?", answer: "Discovery menemukan candidate; onboarding membuat managed object dengan Safe, Platform, owner, dan lifecycle." },
      { question: "Apa batas penting bulk upload?", answer: "Materi menyebut maksimum 10.000, tidak mendukung linked/dependency, menggunakan Safe existing, tidak dapat cancel, dan satu upload aktif." },
      { question: "Mengapa precedence rule penting?", answer: "Rule lebih tinggi dapat menangkap account sebelum rule yang lebih spesifik." },
      { question: "Apakah Pending berarti account tidak privileged?", answer: "Tidak. Pending berarti belum diproses rule/onboarding; privilege harus dinilai dari discovered evidence dan owner." }
    ],
    summary: [
      "Discovery, classification, onboarding, dan management adalah tahap berbeda.",
      "Scan Account dan scope menentukan visibility serta risiko discovery.",
      "Pending membutuhkan owner, duplicate check, dependency, Safe, dan Platform decision.",
      "Automatic rule mempercepat onboarding tetapi memperbesar blast radius kesalahan.",
      "REST dan continuous detection harus tetap menjaga provenance dan audit."
    ],
    boundaries: [
      "Jangan menaruh scan password atau API secret di CSV/log/ticket.",
      "Auto Verify/Reconcile dapat mengubah target segera setelah onboarding; gunakan pilot dan approval.",
      "Support matrix discovery berubah menurut versi dan platform."
    ]
  });

  add("10", {
    title: "Privileged Session Management — Part 1",
    subtitle: "PSM flow, connector, Ad-Hoc, HTML5 Gateway, PSM for Windows, dan PSM for SSH.",
    source: "M10, 38 halaman; manfaat/flow 4–10, connector 11–16, Ad-Hoc 17–20, HTML5 21–25, Windows 26–30, SSH 31–34.",
    readingTime: 58,
    intro: [
      "PSM memisahkan endpoint user dari target, menjaga credential tidak masuk ke workstation, memantau aktivitas, dan membuat recording/audit. Ia bukan jump server generik; ia adalah enforcement point yang memakai ticket, credential retrieval, connection component, isolation, dan evidence.",
      "Berbagai entry path—PVWA, Ad-Hoc, HTML5, direct RDP client, atau native SSH—berbeda pada cara sesi dimulai, tetapi tujuan akhirnya sama: user memakai privilege melalui proxy terkontrol."
    ],
    mentalModel: "User mengautentikasi ke PAM, PSM memperoleh konteks/ticket, mengambil credential dari Vault, menjalankan connector, terhubung ke target, dan mengirim audit/recording. Pisahkan selalu sisi user→PSM dari sisi PSM→target.",
    objectives: [
      "Menjelaskan isolation, monitoring, dan recording PSM.",
      "Memetakan PSM flow dan dependency.",
      "Mengelola connection component dan custom connector.",
      "Membedakan Ad-Hoc, HTML5, PSM for Windows, dan PSM for SSH."
    ],
    terms: [
      ["PSM", "Windows-based session proxy untuk berbagai protokol/target."],
      ["Connection Component", "Konfigurasi client/connector yang dipakai PSM untuk target tertentu."],
      ["Universal Connector", "Framework materi untuk membuat connector custom dengan AutoIT."],
      ["Ad-Hoc Connection", "Sesi terisolasi untuk account yang tidak disimpan atau personal account."],
      ["HTML5 Gateway", "Gateway browser/WebSocket yang meneruskan sesi ke PSM tanpa RDP client endpoint."],
      ["PSM for Windows", "Entry langsung dari RDP-compliant client ke PSM tanpa PVWA."],
      ["PSM for SSH/PSMP", "Proxy SSH yang mempertahankan pengalaman native command-line."]
    ],
    sections: [
      {
        title: "1. Tiga manfaat: isolation, monitoring, recording",
        pages: "Halaman 4–7",
        paragraphs: [
          "Isolation memutus jalur langsung endpoint ke target dan mencegah credential mencapai user/device. Monitoring memungkinkan aktivitas mencurigakan dilihat atau dianalisis. Recording menyediakan evidence forensik dan audit.",
          "Ketiganya saling bergantung. Recording tanpa isolation masih membiarkan credential bocor. Isolation tanpa monitoring menyulitkan respons. Monitoring tanpa identity attribution tidak menjelaskan actor sebenarnya."
        ]
      },
      {
        title: "2. PSM flow dari klik sampai target",
        pages: "Halaman 8–10",
        paragraphs: [
          "Pada flow PVWA, user login dan memilih Connect. Endpoint membuat sesi terenkripsi ke PSM. PSM memvalidasi konteks, mengambil credential dari Vault, lalu memakai protokol native menuju target. Audit dapat diteruskan ke SIEM/PTA dan recording disimpan ke Vault.",
          "PSM diaktifkan secara global atau melalui exception Master Policy, kemudian Platform dikaitkan ke PSM server. Platform yang menunjuk PSM salah, server unavailable, atau connector tidak terpasang akan memengaruhi semua account dalam scope."
        ],
        table: {
          headers: ["Stage", "Dependency", "Evidence"],
          rows: [
            ["PVWA request", "User/Safe/workflow", "Request/session ID"],
            ["Endpoint→PSM", "RDP/TLS/WebSocket/SSH", "Client dan network error"],
            ["PSM→Vault", "Component user/ticket", "PSM/Vault log"],
            ["Connector launch", "Component/AppLocker/client", "Session connector log"],
            ["PSM→target", "DNS/port/protocol/credential", "Target/network event"],
            ["Evidence", "Recorder/audit Safe", "Upload/status/session audit"]
          ]
        }
      },
      {
        title: "3. Connection Component dan custom connector",
        pages: "Halaman 11–16",
        paragraphs: [
          "Connection Component menentukan third-party client, command, parameter, window handling, audit, dan behavior untuk target. Contoh materi mencakup RDP, PuTTY, WinSCP, dan SQLPlus. Connector harus di-assign ke Platform account agar tersedia.",
          "Connector out-of-box dapat diimpor/dikelola dan connector custom dapat dibuat melalui Universal Connector/AutoIT pada konteks materi. Custom connector membawa dependency binary, path, prompt, AppLocker, version, dan security review; sukses membuka aplikasi manual belum membuktikan connector aman atau dapat diaudit."
        ]
      },
      {
        title: "4. Ad-Hoc Connection",
        pages: "Halaman 17–20",
        paragraphs: [
          "Ad-Hoc memungkinkan user yang mengetahui password terhubung melalui PSM ke machine yang didukung walaupun account belum disimpan atau merupakan personal account. Isolation, monitoring, dan recording tetap diperoleh.",
          "PSM Secure Connect Platform serta policy monitoring/isolation harus aktif. User memasukkan client, target, username, password, dan detail lain. Karena credential dimasukkan saat launch dan object mungkin tidak dikelola, governance, allowed user, target scope, retention, dan reason wajib lebih ketat."
        ]
      },
      {
        title: "5. HTML5 Gateway",
        pages: "Halaman 21–25",
        paragraphs: [
          "HTML5 Gateway mengatasi endpoint yang tidak boleh membuka RDP atau tidak memiliki RDP client. Browser membangun secure WebSocket melalui port 443 ke gateway Linux berbasis Apache Guacamole, lalu gateway meneruskan RDP ke PSM.",
          "Gateway diaktifkan per PSM dan pilihan HTML5/RDP-file dapat diterapkan pada Connection Component. Troubleshooting harus memisahkan browser→gateway, gateway→PSM, PSM→Vault, dan PSM→target. Certificate, proxy, WebSocket, load balancer, dan gateway capacity dapat gagal meski PSM sehat."
        ]
      },
      {
        title: "6. PSM for Windows",
        pages: "Halaman 26–30",
        paragraphs: [
          "User dapat memakai RDP-compliant client langsung ke PSM tanpa membuka PVWA. RDP client mengirim Vault user dan Start Program/alternate shell yang menyebut privileged account, target address, serta connection component.",
          "Flow ini tetap mengambil credential dari Vault dan menjaga isolation. Diagnosis harus mencatat apakah RDP file berisi target detail, authentication method PAM, PSM address, Start Program syntax, CredSSP/NLA behavior, dan connector."
        ]
      },
      {
        title: "7. PSM for SSH",
        pages: "Halaman 31–34",
        paragraphs: [
          "PSM for SSH mempertahankan native SSH workflow. Connection string membawa Vault username, target account, target address, dan PSMP address. User membuka SSH ke proxy, proxy mengambil target credential, lalu membuka SSH kedua ke target.",
          "Karena tidak selalu diluncurkan dari PVWA, parsing connection string, client syntax, SSH key/keyboard interaction, proxy port, target port, dan policy harus dikorelasikan. Audit SSH disimpan walaupun live control mempunyai batas berbeda dari PSM Windows."
        ]
      }
    ],
    decisionTable: {
      headers: ["Jenis koneksi", "Entry path", "Failure tambahan"],
      rows: [
        ["PVWA PSM", "Browser → PVWA → PSM", "Request/ticket/UI"],
        ["Ad-Hoc", "PVWA + user-provided credential", "Secure Connect scope/input"],
        ["HTML5", "Browser → Gateway → PSM", "WebSocket/certificate/gateway"],
        ["PSM for Windows", "RDP client → PSM", "RDP file/Start Program/auth"],
        ["PSM for SSH", "SSH client → PSMP → target", "Connection string/proxy SSH"]
      ]
    },
    scenario: {
      title: "PVWA membuat session tetapi target tidak terbuka",
      situation: "User melihat loading PSM lalu koneksi berakhir dengan error.",
      walkthrough: [
        "Ambil session ID, user, account, Platform, connector, PSM server, target, dan timestamp.",
        "Tentukan apakah endpoint mencapai PSM dan apakah PSM memvalidasi ticket/mengambil credential.",
        "Periksa connector launch serta AppLocker/path/client. Jika connector hidup, lanjutkan ke DNS/port/protocol target.",
        "Bandingkan account working pada PSM dan connector sama, lalu PSM lain bila load balanced.",
        "Setelah perbaikan, validasi target access, credential isolation, audit, recording, dan SIEM/PTA forwarding."
      ],
      result: "Koneksi langsung workstation→target tidak membuktikan jalur PSM sehat karena arah jaringan dan identity berbeda."
    },
    checks: [
      { question: "Apa tiga manfaat utama PSM?", answer: "Isolation, monitoring, dan recording." },
      { question: "Apa fungsi Connection Component?", answer: "Menentukan client/configuration yang dipakai PSM untuk protokol dan target tertentu." },
      { question: "Apa beda HTML5 dan PSM for Windows?", answer: "HTML5 memakai browser→gateway→PSM; PSM for Windows memakai RDP client langsung ke PSM." },
      { question: "Mengapa direct target test tidak cukup?", answer: "PSM memakai host, network path, credential, connector, dan policy yang berbeda dari workstation user." }
    ],
    summary: [
      "PSM adalah enforcement proxy, bukan jump server biasa.",
      "Pisahkan endpoint→PSM, PSM→Vault, connector, dan PSM→target.",
      "Connector harus di-assign, tersedia, diizinkan AppLocker, dan kompatibel.",
      "Ad-Hoc, HTML5, Windows, dan SSH mempunyai entry path serta failure tambahan.",
      "Validasi selalu mencakup isolation, audit, dan recording, bukan hanya target terbuka."
    ],
    boundaries: [
      "Jangan membuka direct access sebagai workaround permanen yang melewati recording.",
      "Custom connector/AutoIT memerlukan security review dan test non-production.",
      "Perubahan NLA, CredSSP, AppLocker, atau firewall mengikuti rollback plan."
    ]
  });

  add("11", {
    title: "Privileged Session Management — Part 2",
    subtitle: "Recording lifecycle, sizing, session audit, dan kontrol active session.",
    source: "M11, 25 halaman; recording 3–13, audit 14–16, active monitoring 17–22.",
    readingTime: 46,
    intro: [
      "PSM menghasilkan beberapa jenis evidence: video/text recording, structured session audit, dan live session state. Ketiganya berbeda. Recording membantu melihat ulang, audit membantu mencari event, dan live monitoring memungkinkan tindakan saat sesi masih berjalan.",
      "Evidence hanya berguna bila recording diaktifkan, storage cukup, upload berhasil, Safe/retention benar, auditor authorized, dan session ID dapat dikorelasikan dengan actor serta target."
    ],
    mentalModel: "Selama sesi, recording ditulis sementara pada PSM; audit dapat dikirim real-time; setelah sesi selesai, recording di-upload ke Safe. Monitoring membaca state aktif, sedangkan auditor membaca evidence yang sudah atau sedang dihasilkan.",
    objectives: [
      "Menjelaskan lifecycle recording dari PSM ke Vault/external storage.",
      "Menghitung kebutuhan kapasitas berdasarkan concurrency, durasi, bitrate, dan retention.",
      "Membedakan recording dan session audit.",
      "Memahami view, suspend, terminate, dan batas live control PSM for SSH."
    ],
    terms: [
      ["Recording", "Video/text artifact sesi yang disimpan untuk playback/forensics."],
      ["Session audit", "Event terstruktur seperti SQL command, SSH keystroke, window title, atau universal keystroke."],
      ["PSMRecordings", "Default Safe recording pada materi."],
      ["Recording Safe", "Safe default/custom dengan retention dan auditor tertentu."],
      ["Live monitoring", "Melihat serta pada PSM Windows dapat mengontrol sesi aktif."],
      ["PSMLiveSessionTerminators", "Built-in group yang diberi hak suspend/terminate menurut materi."],
      ["External storage", "Lokasi di luar Vault untuk recording dengan desain security/availability tersendiri."]
    ],
    sections: [
      {
        title: "1. Recording lifecycle",
        pages: "Halaman 3–9",
        paragraphs: [
          "PSM dan PSM for SSH membuat video/text recording. Selama sesi, file berada pada filesystem PSM. Setelah sesi selesai, PSM meng-upload recording ke Vault, default-nya PSMRecordings, atau ke desain external storage yang dikonfigurasi.",
          "Karena ada fase lokal dan upload, 'recording hilang' harus dipisah menjadi: recording tidak dibuat, file lokal gagal, sesi belum selesai, upload gagal, Safe salah, indexing tertunda, atau viewer tidak authorized. Session ID adalah kunci korelasi."
        ]
      },
      {
        title: "2. Recording Safe dan authorization",
        pages: "Halaman 12–13",
        paragraphs: [
          "Custom recording Safe dapat ditentukan per Platform untuk retention atau segregation, misalnya account yang tunduk pada compliance lebih panjang. Safe dibuat ketika PSM meng-upload recording pertama pada flow materi.",
          "Auditors group memperoleh access ke recording Safe secara default dalam materi, tetapi auditor khusus dapat ditetapkan. View recording adalah akses sensitif karena dapat memuat data layar, command, dan informasi bisnis; permission harus mengikuti need-to-know."
        ]
      },
      {
        title: "3. Sizing: concurrency × duration × bitrate",
        pages: "Halaman 10–11",
        paragraphs: [
          "Kapasitas sementara PSM dipengaruhi maximum concurrent session, rata-rata durasi, dan bitrate recording, ditambah ruang cadangan. Materi memberi reference sekitar 100 KB/menit untuk SSH, 200 KB/menit untuk low-activity RDP, dan 300 KB/menit untuk high-activity RDP dengan visual kaya.",
          "Contoh materi: 25 sesi × 180 menit × 300 KB/menit ditambah 20 GB menghasilkan sekitar 21,35 GB pada PSM. Untuk Vault, retention × sesi per hari × durasi × bitrate ditambah cadangan; contoh 90 hari dan 400 sesi/hari menghasilkan sekitar 1,96 TB.",
          "Angka bukan capacity universal. Gunakan concurrency puncak, resolusi, activity pattern, compression, upload delay, retention, external storage, growth, dan failure backlog lingkungan aktual. Alert disk harus berbunyi sebelum recording berhenti."
        ]
      },
      {
        title: "4. Session audit real-time",
        pages: "Halaman 14–16",
        paragraphs: [
          "PSM dapat menghasilkan audit SQL command, SSH keystroke, window title, universal keystroke, serta pada PSM for SSH event SSH/SCP/Telnet sesuai materi. Audit dikirim real-time ke Vault dan dapat diteruskan ke SIEM/PTA.",
          "Audit terstruktur memudahkan pencarian dan risk scoring, tetapi coverage bergantung connector/protocol. Tidak adanya command audit tidak selalu berarti recording kosong; periksa jenis connector, audit setting, dan session ID."
        ]
      },
      {
        title: "5. Active Session Monitoring",
        pages: "Halaman 17–22",
        paragraphs: [
          "Authorized user dapat memonitor PSM session, berpartisipasi dalam control, suspend, atau terminate. PTA/third-party analytics juga dapat memberi trigger otomatis. Group PSMLiveSessionTerminators memiliki hak tersebut secara default pada konteks materi.",
          "PSM for SSH tidak menyediakan live control yang sama pada materi, tetapi live session audit dapat dilihat. Jangan menjanjikan suspend/terminate sebelum mengidentifikasi session type dan capability.",
          "Setiap action live harus mencatat actor, reason, event pemicu, timestamp, command terakhir, notification, dan validasi target. Terminate dapat mencegah damage tetapi juga memutus transaksi bisnis."
        ]
      }
    ],
    decisionTable: {
      headers: ["Gejala", "Stage", "Pemeriksaan"],
      rows: [
        ["Recording tidak muncul", "Create/local/upload/index/access", "Recorder log, disk, Safe, permission"],
        ["Playback kosong/rusak", "Recorder/codec/file", "Session log dan file status"],
        ["Audit event hilang", "Connector/audit type", "Protocol, settings, session ID"],
        ["Tidak bisa terminate", "Authorization/session type", "Group dan PSM vs PSMP"],
        ["Disk PSM penuh", "Capacity/upload backlog", "Concurrency, bitrate, upload error"]
      ]
    },
    scenario: {
      title: "Session sukses tetapi recording tidak ditemukan",
      situation: "User menyelesaikan RDP melalui PSM, audit login ada, tetapi auditor tidak menemukan playback.",
      walkthrough: [
        "Kunci session ID dan pastikan session type memang recording-enabled.",
        "Periksa Platform/Master Policy, recorder log, local recording folder, disk, dan apakah sesi selesai normal.",
        "Periksa upload ke recording Safe atau external storage, Safe name, retention, dan indexing delay.",
        "Validasi auditor/group mempunyai permission pada recording Safe; bedakan access failure dari artifact failure.",
        "Setelah recovery, playback dan session audit harus cocok dengan actor, account, target, dan timeline."
      ],
      result: "Recording lifecycle mempunyai fase create, local store, upload, index, dan authorize; setiap fase dapat gagal sendiri."
    },
    checks: [
      { question: "Apa beda recording dan session audit?", answer: "Recording adalah video/text playback; audit adalah event terstruktur yang dapat dicari dan diberi risk score." },
      { question: "Apa dasar sizing PSM?", answer: "Concurrent sessions × average duration × recording bitrate ditambah ruang cadangan." },
      { question: "Apakah PSM for SSH dapat dikontrol live seperti PSM Windows?", answer: "Materi menyatakan live audit dapat dilihat tetapi live control tidak sama." },
      { question: "Mengapa view recording sensitif?", answer: "Recording dapat memuat data layar, command, dan informasi bisnis walau password tidak ditampilkan." }
    ],
    summary: [
      "Recording dibuat lokal lalu di-upload ke Vault/external storage.",
      "Sizing membutuhkan concurrency, duration, bitrate, retention, dan backlog.",
      "Recording Safe dapat dipisah per Platform/compliance.",
      "Session audit dikirim real-time dan berbeda dari playback.",
      "Live control bergantung authorization dan session type."
    ],
    boundaries: [
      "Retention atau deletion recording memerlukan compliance approval.",
      "Jangan menghapus artifact untuk menyelesaikan disk issue tanpa preservation plan.",
      "Bitrate dan kapasitas contoh materi harus disesuaikan dengan environment aktual."
    ]
  });

  add("12", {
    title: "Privileged Threat Analytics",
    subtitle: "Collect, detect, alert, respond, dan menghubungkan risk analytics dengan session/credential action.",
    source: "M12, 36 halaman; overview/source 4–6, detection 7–11, event/alert 12–17, response/rules 18–26, cloud 27–33.",
    readingTime: 52,
    intro: [
      "PTA mengumpulkan data privilege, membangun analisis perilaku, mendeteksi penyimpangan atau kontrol yang dibypass, membuat security event, lalu mendukung response manual maupun otomatis. Alert bukan bukti compromise tunggal; ia adalah risk signal yang harus dikorelasikan.",
      "Nilai PTA bergantung pada source coverage, time synchronization, rule, baseline, scope, dan response design. Data tidak masuk menghasilkan blind spot; rule terlalu luas menghasilkan noise atau tindakan otomatis yang mengganggu bisnis."
    ],
    mentalModel: "Collect memberi visibility, Detect mengubah data menjadi hypothesis risiko, Alert memberi prioritas dan konteks, Respond mengurangi risiko. Setiap tahap dapat gagal secara independen dan harus mempunyai evidence sendiri.",
    objectives: [
      "Menjelaskan data source dan jenis detection PTA.",
      "Membaca security event, score, severity, timeline, dan remediation.",
      "Memahami automatic onboarding/rotation/reconciliation serta PSM response.",
      "Merancang rule category, pattern, score, scope, dan action."
    ],
    terms: [
      ["Risk score", "Nilai prioritas berdasarkan severity/anomaly untuk membantu triage."],
      ["Unmanaged privileged access", "Penggunaan privileged account yang belum dikelola Vault."],
      ["Statistical anomaly", "Perilaku menyimpang dari pola, misalnya jam atau IP tidak biasa."],
      ["Session Analysis and Response", "Integrasi PTA-PSM untuk menilai dan menindak aktivitas sesi."],
      ["Pattern", "Regex/pola aktivitas yang dicari dalam kategori audit tertentu."],
      ["Scope", "User, account, machine, atau population tempat rule berlaku."],
      ["Automatic remediation", "Onboard, rotate, reconcile, suspend, atau terminate yang dipicu sistem."]
    ],
    sections: [
      {
        title: "1. Collect: memilih data yang menjelaskan privilege",
        pages: "Halaman 4–6",
        paragraphs: [
          "Materi menunjukkan source seperti Digital Vault, PSM, Active Directory, SIEM, EPM, dan cloud. Setiap source memberi sisi berbeda: Vault mengetahui access/action, PSM mengetahui session activity, directory mengetahui identity/risk, dan cloud mengetahui event privilege pada platform cloud.",
          "Source health, parser, timestamp, retention, dan network menentukan apakah analytics melihat kejadian. No alert tidak berarti no risk jika source yang diperlukan tidak pernah masuk."
        ]
      },
      {
        title: "2. Detect: bypass, anomaly, dan directory risk",
        pages: "Halaman 7–11",
        paragraphs: [
          "Detection mencakup unmanaged access, suspected credential theft, suspicious password change, suspicious session activity, irregular hours/IP, excessive access, dormant Vault user, machine access tidak biasa, serta risiko directory seperti unconstrained delegation atau dual usage.",
          "Sebagian detection memerlukan source optional atau integration tertentu. Saat event tidak muncul, periksa prerequisite detection dan jangan hanya mengubah threshold. Saat event muncul, bedakan behavioral anomaly dari confirmed malicious action."
        ],
        table: {
          headers: ["Kategori", "Contoh", "Pertanyaan triage"],
          rows: [
            ["PAM bypass", "Unmanaged privileged access", "Apakah account seharusnya di Vault?"],
            ["Credential risk", "Suspected theft/change", "Apakah actor, target, dan waktu sesuai?"],
            ["Behavior anomaly", "Jam/IP/access volume tidak biasa", "Apakah ada change atau emergency work?"],
            ["Directory risk", "Delegation/service misuse", "Apa privilege dan exposure sebenarnya?"],
            ["Session risk", "Command/window/keystroke pattern", "Apakah rule match valid dan scope tepat?"]
          ]
        }
      },
      {
        title: "3. Alert dan Security Events",
        pages: "Halaman 12–17",
        paragraphs: [
          "Security event di PVWA/SIEM membawa event name, last detected time, score/severity, granular context, recommended action, dan status remediation. Filter severity, type, dan date membantu triage tetapi tidak menggantikan korelasi source.",
          "Risk score adalah prioritas, bukan verdict. Investigator harus memeriksa actor, account, target, session, recent change, peer behavior, source raw event, dan apakah automatic action sudah berjalan."
        ]
      },
      {
        title: "4. Respond dengan credential dan account action",
        pages: "Halaman 18–20",
        paragraphs: [
          "PTA dapat membantu onboard unmanaged account, rotate credential yang dicurigai dicuri, atau reconcile setelah suspicious change. Tindakan tersebut menyentuh target dan dependency sehingga harus mempunyai guardrail, owner, notification, dan validation.",
          "Rotation cepat mengurangi window kompromi tetapi dapat memutus service account bila dependency tidak lengkap. Reconciliation memulihkan control tetapi memerlukan Reconcile Account. Automatic onboarding dapat salah mengklasifikasikan account bila rule terlalu luas."
        ]
      },
      {
        title: "5. PSM integration dan risk-based review",
        pages: "Halaman 20–23",
        paragraphs: [
          "PSM mengirim detail session dan activity ke PTA. PTA memberi risk score sehingga auditor dapat memulai dari sesi berisiko tinggi dan titik aktivitas mencurigakan, bukan menonton seluruh recording secara linear.",
          "Integrasi juga memungkinkan automatic suspend/terminate. Keputusan harus mempertimbangkan confidence pattern, criticality target, kemungkinan false positive, dan apakah termination aman bagi transaksi."
        ]
      },
      {
        title: "6. Session Analysis and Response Rules",
        pages: "Halaman 24–26",
        paragraphs: [
          "Rule didefinisikan oleh category seperti SSH, universal keystroke, SCP, SQL, atau Windows title; pattern/regex; threat score 1–100; scope user/account/machine; dan response none, suspend, atau terminate.",
          "Mulailah dari predefined rule, pahami event sebenarnya, uji pattern dengan variasi benign/malicious, lalu sempitkan scope. Exception harus lebih spesifik daripada mematikan detection global dan mempunyai expiry/review."
        ],
        table: {
          headers: ["Elemen rule", "Pertanyaan desain", "Risiko salah"],
          rows: [
            ["Category", "Audit source apa?", "Rule tidak pernah menerima data"],
            ["Pattern", "Apa yang benar-benar match?", "False positive/negative"],
            ["Score", "Seberapa prioritas?", "Queue triage tidak proporsional"],
            ["Scope", "Siapa/target mana?", "Blast radius terlalu luas"],
            ["Response", "Alert, suspend, terminate?", "Gangguan bisnis otomatis"]
          ]
        }
      },
      {
        title: "7. Cloud detection",
        pages: "Halaman 27–33",
        paragraphs: [
          "Materi menampilkan detection AWS untuk unmanaged IAM key/password, compromised privileged IAM, dan compromised EC2; serta Azure untuk unmanaged privileged access dan suspected credential theft. Capability bergantung source dan integration cloud.",
          "Cloud identity, temporary credential, account/subscription scope, region, dan event latency berbeda dari on-prem. Jangan menerapkan asumsi Windows/Vault secara langsung tanpa memetakan source cloud dan owner."
        ]
      }
    ],
    decisionTable: {
      headers: ["Gejala", "Kemungkinan", "Bukti"],
      rows: [
        ["Tidak ada event", "Source/rule/time/scope", "Source health dan raw event"],
        ["Banyak false positive", "Pattern/baseline/scope", "Matched data dan peer behavior"],
        ["Auto-action tidak jalan", "Policy/integration/permission", "Event action status dan target log"],
        ["Session tersuspend tak terduga", "Rule terlalu luas", "Rule version, pattern, score, actor"],
        ["Cloud blind spot", "Connector/source coverage", "Cloud audit feed dan integration health"]
      ]
    },
    scenario: {
      title: "Rule session otomatis men-suspend pekerjaan sah",
      situation: "Command maintenance match regex berisiko dan PTA meminta PSM suspend.",
      walkthrough: [
        "Preserve event ID, session ID, matched category/pattern, score, scope, action, dan timestamp.",
        "Korelasi recording/audit dengan change ticket serta actor/target untuk menentukan benign atau malicious.",
        "Periksa rule version dan apakah pattern terlalu umum atau scope terlalu luas.",
        "Buat exception sempit atau perbaiki pattern; jangan mematikan seluruh detection tanpa evidence.",
        "Uji benign dan malicious sample, validasi notification/response, lalu review session yang pernah terdampak."
      ],
      result: "False positive adalah masalah rule design yang harus diperbaiki tanpa menghilangkan visibility seluruh environment."
    },
    checks: [
      { question: "Apa empat tahap PTA?", answer: "Collect, Detect, Alert, Respond." },
      { question: "Apakah high score membuktikan compromise?", answer: "Tidak. Score memprioritaskan risk signal; source evidence dan konteks tetap diperlukan." },
      { question: "Apa elemen rule session?", answer: "Category, pattern, score, scope, dan response." },
      { question: "Apa risiko auto-rotation?", answer: "Dependency yang tidak lengkap dapat membuat aplikasi outage walaupun tujuan security benar." }
    ],
    summary: [
      "PTA bergantung pada source coverage dan waktu yang konsisten.",
      "Detection mencakup bypass PAM, anomaly, directory, session, dan cloud risk.",
      "Security event adalah prioritas/hypothesis, bukan verdict tunggal.",
      "Automatic response harus memiliki guardrail, owner, dan validation.",
      "Rule yang baik mempunyai category, pattern, score, scope, response, test, dan review."
    ],
    boundaries: [
      "Alert dan recording dapat memuat data sensitif; batasi access dan redaction.",
      "Suspend/terminate/rotate/reconcile produksi memerlukan risk dan business impact design.",
      "Detection support berbeda menurut source, platform, dan versi."
    ]
  });

  add("13", {
    title: "Reports",
    subtitle: "Memilih report yang tepat, memahami permission, scheduling, output handling, dan Export Vault Data.",
    source: "M13, 30 halaman; report types 3–10, PVWA 11–23, EVD 24–27.",
    readingTime: 42,
    intro: [
      "Report menjawab pertanyaan yang berbeda: inventory menjelaskan apa yang ada, compliance menjelaskan state terhadap policy, entitlement menjelaskan siapa dapat mengakses apa, activity menjelaskan apa yang terjadi, dan capacity menjelaskan penggunaan license atau resource.",
      "Hasil report dapat berisi username, account, Safe, authorization, activity, dan metadata sensitif. Karena itu kemampuan generate, scope/filter, subscriber, output location, retention, dan sharing harus dikendalikan seperti akses data privilege lainnya."
    ],
    mentalModel: "Mulai dari audit question, pilih dataset/report, cek permission terhadap scope, jalankan dengan filter minimum, lindungi output, lalu dokumentasikan kapan dan untuk siapa snapshot tersebut valid.",
    objectives: [
      "Membedakan PrivateArk dan PVWA reports.",
      "Memilih report berdasarkan pertanyaan operasional/audit.",
      "Memahami ManageReportsGroup dan permission per report.",
      "Menggunakan EVD untuk export terkontrol."
    ],
    terms: [
      ["Inventory report", "Daftar object/account/application yang ada pada scope."],
      ["Compliance Status", "Status CPM account terhadap policy management."],
      ["Entitlement", "Relasi user dengan Safe/account yang dapat diakses."],
      ["Activity Log", "Audit tindakan user, Safe, dan account."],
      ["ManageReportsGroup", "Group yang diizinkan menghasilkan report PVWA."],
      ["EVD", "Export Vault Data utility untuk mengekspor dataset Vault ke text/CSV."],
      ["Subscriber", "Penerima notification/link ketika scheduled report selesai."]
    ],
    sections: [
      {
        title: "1. PrivateArk reports untuk administrasi Vault",
        pages: "Halaman 3–10",
        paragraphs: [
          "PrivateArk Client menyediakan License Capacity, User List, Active/Non-Active Users, Safes List, dan Active/Non-Active Safes. Report ini membantu administrator memantau license consumption, dormant identity, Safe properties, serta activity pada periode tertentu.",
          "Non-active tidak otomatis berarti boleh dihapus. User atau Safe dapat sengaja jarang digunakan sebagai emergency, DR, service, atau archive. Gabungkan report dengan owner, last use reason, dependency, dan retention sebelum cleanup."
        ]
      },
      {
        title: "2. PVWA reports untuk operasi dan audit",
        pages: "Halaman 11–18",
        paragraphs: [
          "PVWA report diakses oleh user dalam ManageReportsGroup—default materi menyebut PVWAMonitor—dengan permission tambahan sesuai dataset. Report dapat dijalankan segera, disimpan, atau dijadwalkan. Subscriber menerima email berisi link setelah report dibuat.",
          "Setiap report memiliki filter berbeda. Filter harus mengikuti need-to-know, time range, Safe, Platform, owner, atau status yang menjawab pertanyaan. Report luas lebih lama, lebih sensitif, dan lebih sulit diinterpretasikan.",
          "Output dapat diunduh sebagai Excel atau CSV. Status Finished hanya membuktikan generation selesai, bukan bahwa scope benar atau output aman."
        ]
      },
      {
        title: "3. Lima report PVWA dan permission",
        pages: "Halaman 19–23",
        paragraphs: [
          "Privileged Accounts Inventory memberi daftar account dan membutuhkan List Accounts serta View Safe Members pada Safe scope. Applications Inventory memberi daftar Application ID dan memerlukan Audit Users Vault authorization.",
          "Compliance Status menunjukkan status CPM terhadap policy. Materi mensyaratkan List, View Audit atau Confirm Safe Request untuk Safe dual-control, membership PVWAMonitor, dan Auditors bila seluruh Vault. Entitlement memerlukan Manage Users atau Audit Users. Activity Log memerlukan Audit Users untuk user activity dan View Audit untuk Safe/account activity.",
          "Permission report mengikuti data yang dibaca, bukan sekadar menu Reports. Report kosong dapat berarti user hanya berhak melihat sebagian Safe, filter salah, atau dataset tidak memiliki activity pada periode itu."
        ],
        table: {
          headers: ["Report", "Menjawab", "Permission utama materi"],
          rows: [
            ["Accounts Inventory", "Account apa yang ada?", "List + View Safe Members per Safe"],
            ["Applications Inventory", "Application ID apa yang ada?", "Audit Users"],
            ["Compliance Status", "Account comply dengan CPM policy?", "List, audit/confirm, PVWAMonitor; Auditors untuk all"],
            ["Entitlement", "Siapa dapat mengakses apa?", "Manage Users atau Audit Users"],
            ["Activity Log", "Apa yang terjadi?", "Audit Users dan/atau View Audit"]
          ]
        }
      },
      {
        title: "4. Export Vault Data Utility",
        pages: "Halaman 24–27",
        paragraphs: [
          "EVD mengekspor Vault data ke text/CSV untuk analisis atau custom reporting pihak ketiga. Utility dapat berjalan pada host yang mempunyai access ke Vault dan berkomunikasi pada port 1858 secara default pada materi.",
          "Paket mencakup ExportVaultData.exe, Vault.ini, dan CreateCredFile.exe. Dataset dapat mencakup files, activities, Master Policy, system log, requests, users, groups, membership, Safes, dan owners. Credential file dan output sama-sama sensitif tetapi dengan cara berbeda: satu memberi access, satu membawa hasil data.",
          "EVD job harus memiliki service identity minimum, protected credential file, network allowlist, output directory terproteksi, encryption/transfer control, retention, log monitoring, dan data owner."
        ]
      }
    ],
    decisionTable: {
      headers: ["Pertanyaan", "Report", "Jangan tertukar dengan"],
      rows: [
        ["Account mana belum comply?", "Compliance Status", "Inventory"],
        ["User mana bisa membuka Safe?", "Entitlement", "Activity"],
        ["Siapa melakukan perubahan?", "Activity Log", "Entitlement"],
        ["Berapa license terpakai?", "License Capacity", "User List"],
        ["Butuh dataset custom?", "EVD", "Export seluruh Vault tanpa filter"]
      ]
    },
    scenario: {
      title: "Compliance report kosong padahal account ada",
      situation: "Operator dapat membuka Reports, tetapi hasil hanya memuat sebagian Safe.",
      walkthrough: [
        "Catat report type, filter, time, requester, ManageReportsGroup, dan expected Safe.",
        "Periksa List serta View Audit/Confirm permission pada setiap Safe scope dan apakah all-Vault membutuhkan Auditors.",
        "Bandingkan satu Safe muncul dan satu hilang; jangan langsung memperluas authorization seluruh Vault.",
        "Periksa account memang dikelola CPM dan mempunyai compliance state yang dapat dilaporkan.",
        "Rerun scope kecil, validasi output, lalu simpan report dan permission evidence secara aman."
      ],
      result: "Report kosong/parsial sering merupakan kombinasi scope filter dan effective permission, bukan engine report rusak."
    },
    checks: [
      { question: "Apa beda Inventory dan Entitlement?", answer: "Inventory menjelaskan object yang ada; Entitlement menjelaskan user dapat mengakses object/Safe mana." },
      { question: "Report apa untuk aktivitas?", answer: "Activity Log, dengan Audit Users dan/atau View Audit sesuai scope." },
      { question: "Apa fungsi ManageReportsGroup?", answer: "Mengizinkan user mengakses/generate report PVWA, tetapi permission dataset tetap diperlukan." },
      { question: "Mengapa CSV report sensitif?", answer: "Ia dapat memuat account, user, Safe, entitlement, status, dan aktivitas yang memudahkan reconnaissance." }
    ],
    summary: [
      "Pilih report dari pertanyaan, bukan dari nama yang paling familiar.",
      "PrivateArk report berfokus pada administrasi Vault; PVWA report pada inventory/compliance/audit.",
      "Permission report mengikuti dataset dan Safe scope.",
      "Scheduling/subscriber/output memerlukan data-handling control.",
      "EVD memberi fleksibilitas tetapi membutuhkan identity dan output protection."
    ],
    boundaries: [
      "Jangan mengirim report mentah melalui channel tidak disetujui.",
      "Snapshot report berlaku pada waktu/filter tertentu dan bukan kebenaran permanen.",
      "Nama group dan permission dapat berubah menurut versi."
    ]
  });

  add("14", {
    title: "PAM Self-Hosted Architecture",
    subtitle: "Host, service, configuration, log, built-in Safe/user, dan jalur komunikasi komponen.",
    source: "M14, 52 halaman; architecture 4–6, local environment 7–29, built-in Safe/user 30–39, communication 40–49.",
    readingTime: 68,
    intro: [
      "Self-hosted berarti customer memiliki dan mengoperasikan Vault serta komponen. Deployment dapat seluruhnya on-premises, customer-hosted di cloud infrastructure, atau hybrid. Ini berbeda dari PAM as a Service karena responsibility untuk OS, service, config, capacity, backup, DR, network, dan hardening berada pada customer.",
      "Untuk L2, topology bukan gambar dekoratif. Ia menentukan arah network, host pemilik log, component user, Safe konfigurasi, credential file, port, restart impact, dan titik failure."
    ],
    mentalModel: "Setiap komponen mempunyai lima lapisan: Windows/Linux service, local file/config, Vault user/credential, internal Safe/config object, dan jalur komunikasi ke Vault/target. Diagnosis menelusuri kelimanya sesuai arah flow.",
    objectives: [
      "Memetakan deployment dan fungsi Vault, PVWA, CPM, PSM, PTA.",
      "Menemukan service, directory, config, dan log utama.",
      "Memahami built-in Safe, user, dan group komponen.",
      "Membedakan direct protocol port 1858 dan REST-first via PVWA/API key."
    ],
    terms: [
      ["Self-Hosted", "Deployment yang komponen dan operasinya dimiliki customer."],
      ["Vault.ini", "File alamat/port Vault atau API endpoint sesuai mode komunikasi."],
      ["Credential file", "File lokal yang menyimpan identity material komponen untuk login Vault."],
      ["dbparm.ini", "Main Vault configuration; perubahan tertentu memerlukan restart."],
      ["ITAlog.log", "Main operational log Vault."],
      ["Trace.d0", "Vault trace sesuai debug level."],
      ["API key pair", "Private key lokal dan public key di Vault yang terkait user untuk REST authentication."]
    ],
    sections: [
      {
        title: "1. Architecture dan ownership",
        pages: "Halaman 4–6",
        paragraphs: [
          "Vault menyimpan dan mengotorisasi; PVWA menyediakan web/API; CPM mengubah credential dan menjalankan scanner; PSM mengisolasi/record session; PTA mendeteksi perilaku. Komponen dapat diskalakan lintas data center dan DR site.",
          "Diagram harus berisi host, role, version, IP/DNS, load balancer, Vault primary/DR, network zone, target population, component user, dan owner. Tanpa itu error 'component disconnected' tidak menunjukkan arah koneksi yang perlu diuji."
        ]
      },
      {
        title: "2. Di dalam Vault",
        pages: "Halaman 8–13",
        paragraphs: [
          "Instalasi/hardening mengurangi service Windows dan menghapus firewall rule yang tidak relevan. Vault tidak diperlakukan seperti application server umum. Service tambahan, remote tool, domain dependency, atau firewall exception mengurangi island-of-security model.",
          "Main config mencakup passparm.ini untuk Vault user password policy, dbparm.ini untuk parameter utama seperti log level/timeouts/keys/syslog, tsparm.ini untuk storage disk, dan PARagent.ini untuk Remote Control/SNMP. dbparm.ini.good adalah last known working copy yang dibuat saat start sukses pada materi.",
          "ITAlog.log memberi operational message; Trace.d0 memberi detail sesuai debug. Perubahan debug/restart harus mempertimbangkan disk, downtime, dan evidence preservation."
        ]
      },
      {
        title: "3. PVWA, CPM, dan PSM local environment",
        pages: "Halaman 14–29",
        paragraphs: [
          "PVWA adalah IIS application. Service diperiksa melalui IIS Manager/iisreset; application berada di Password Vault Web Access path dan log default pada Windows temp/PVWA sesuai materi, dapat diubah melalui web.config LogFolder.",
          "CPM memiliki Password Manager service sebagai batch processor dan Scanner service untuk Accounts Feed. Directory bin berisi executable/process, Logs berisi pm.log dan pm_error.log, ThirdParty berisi plug-in logs, History menyimpan log yang sudah diarsip, tmp untuk processing, dan Vault untuk connection config.",
          "PSM memakai CAPSM.exe service, Basic_psm.ini, Components, Logs, Recordings, Temp, dan Vault directory. Session-specific Recorder log dan connection-client log membedakan recording failure dari connector failure; PSMConsole memberi fungsi umum.",
          "PSMConnect menjalankan user session, PSMAdminConnect mendukung auditor/live monitoring, dan shadow user menjalankan connector serta menyimpan preference. Local user, Start Program, AppLocker, dan service permission adalah dependency session."
        ]
      },
      {
        title: "4. Built-in Safes, users, dan groups",
        pages: "Halaman 30–39",
        paragraphs: [
          "Vault membuat Notification Engine, System, dan VaultInternal. System Safe memberi remote access ke config/log tertentu dan dapat menerima License.xml. Object internal bukan cleanup candidate biasa.",
          "CPM pertama membuat beberapa Safe PasswordManager untuk policy, account, pending, workspace, shared, dan temporary data. PasswordManager user otomatis ditambahkan ke Safe baru agar CPM dapat bekerja.",
          "PVWA menggunakan PVWAConfig, preference, public data, reports, task definition, ticketing, dan user prefs Safes; PVWAAppUser melakukan processing dan PVWAGWUser menjadi gateway. PSM menggunakan Safe untuk local account, live session, notification, recording, session, connectors, dan unmanaged session.",
          "PSMApp_<Machine> melakukan processing/upload dan PSMGW_<Machine> mengambil target password. Groups seperti PSMAppUsers, PSMLiveSessionTerminators, dan PSMMaster memberi fungsi khusus. Menghapus member untuk 'merapikan' dapat memutus komponen."
        ]
      },
      {
        title: "5. Direct Vault communication",
        pages: "Halaman 40–44",
        paragraphs: [
          "Secara historis komponen berkomunikasi langsung ke Vault melalui proprietary protocol port 1858. Saat start, component user mengautentikasi menggunakan Vault.ini untuk address/port dan credential file untuk username serta password material.",
          "Pada contoh CPM, user.ini dipakai oleh PasswordManager. Setelah authentication sukses, password di Vault dan credential file dapat dirotasi. Jika salah satu sisi gagal update atau file dipulihkan dari backup lama, component credential menjadi out-of-sync."
        ]
      },
      {
        title: "6. REST-first dan API key",
        pages: "Halaman 45–49",
        paragraphs: [
          "Fungsi baru dapat memakai REST: komponen berbicara ke PVWA, lalu PVWA melakukan operasi terhadap Vault. Vault.ini dapat menunjuk API address dan ApiKey file menyimpan private key lokal.",
          "Public key disimpan di Vault dan kedua key terkait dengan Vault user. Private key bukan password yang boleh dikirim ke support; ia adalah identity material. Troubleshooting harus menentukan terlebih dahulu apakah flow direct 1858 atau REST/PVWA karena log dan port berbeda."
        ]
      }
    ],
    decisionTable: {
      headers: ["Komponen", "Service/config", "Log/evidence"],
      rows: [
        ["Vault", "PrivateArk Server, dbparm/passparm/tsparm", "ITAlog, Trace, firewall"],
        ["PVWA", "IIS, web.config, Vault config Safe", "PVWA web/session log, IIS"],
        ["CPM", "Password Manager/Scanner, policy, user.ini", "pm, pm_error, ThirdParty"],
        ["PSM", "CAPSM, Basic_psm, connector", "Console, Recorder, client, Event Viewer"],
        ["REST path", "PVWA/API key", "HTTP status, PVWA/Vault audit"]
      ]
    },
    scenario: {
      title: "CPM tiba-tiba disconnected dari Vault",
      situation: "System Health menunjukkan PasswordManager disconnected setelah server reboot.",
      walkthrough: [
        "Pastikan CPM services, host time, Vault.ini address, DNS/network port, dan Vault health.",
        "Periksa ITAlog serta CPM console/error untuk membedakan network, suspended user, atau credential mismatch.",
        "Validasi PasswordManager user state dan user.ini tanpa membuka secret. Jangan reset kedua sisi berulang-ulang.",
        "Jika flow REST digunakan, periksa PVWA/API endpoint dan ApiKey, bukan hanya port 1858.",
        "Setelah resync approved, validasi component login, account processing, scanner, log rotation, dan monitoring alert."
      ],
      result: "Component connectivity adalah gabungan service, config address, network, Vault user, credential/key file, dan communication mode."
    },
    checks: [
      { question: "Apa lima lapisan component diagnosis?", answer: "Service, local config/file, Vault user/credential, internal Safe/object, dan communication/target dependency." },
      { question: "Apa beda ITAlog dan Trace?", answer: "ITAlog adalah main operational log; Trace memberi detail sesuai debug level." },
      { question: "Mengapa built-in Safe tidak boleh dihapus sembarang?", answer: "Komponen menyimpan policy, config, temporary data, recording, dan permission di dalamnya." },
      { question: "Apa beda direct dan REST-first?", answer: "Direct memakai protocol Vault/1858 dan cred file; REST-first memakai PVWA/API serta key material." }
    ],
    summary: [
      "Self-hosted memberi customer ownership atas seluruh stack dan operasi.",
      "Topology menentukan arah komunikasi serta lokasi evidence.",
      "Vault, PVWA, CPM, dan PSM mempunyai service, config, log, Safe, serta user sendiri.",
      "Built-in object adalah dependency komponen, bukan clutter.",
      "Tentukan direct 1858 atau REST/PVWA sebelum troubleshooting."
    ],
    boundaries: [
      "Path, service, Safe, dan user dapat berbeda menurut versi/topology.",
      "Jangan membagikan credential file, API private key, Server Key, atau raw config secret.",
      "Restart Vault dan debug tinggi memerlukan impact/disk/rollback plan."
    ]
  });

  add("15", {
    title: "Backup and Restore",
    subtitle: "Melindungi Data/Metadata Vault melalui Replicate, schedule, monitoring, dan restore test.",
    source: "M15, 22 halaman; overview 4–7, setup 8–13, test 14–16, schedule 17–19.",
    readingTime: 42,
    intro: [
      "Backup menjawab bagaimana memperoleh salinan point-in-time untuk data protection dan object-level restore. Ia berbeda dari DR failover: backup berfokus pada salinan yang dapat dipulihkan, sedangkan DR menjaga service continuity dan replication ke Vault standby.",
      "Vault menyimpan Safe data di Data dan database tentang user, network area, Safe, log, serta relationship di Metadata. Keduanya wajib dilindungi; menyalin satu tanpa yang lain tidak mewakili Vault lengkap."
    ],
    mentalModel: "Replicate menarik encrypted Vault data ke server backup terpisah. Enterprise backup kemudian melindungi hasil itu. Keberhasilan sejati bukan file tercipta, tetapi restore teruji menghasilkan object yang benar dan dapat digunakan.",
    objectives: [
      "Membedakan direct dan indirect backup.",
      "Menyiapkan Replicate host, Backup user, Vault.ini, dan credential file.",
      "Menjalankan full/incremental backup dan Safe restore.",
      "Mendesain schedule, monitoring, retention, dan restore test."
    ],
    terms: [
      ["Data", "Safe content dan encrypted object files."],
      ["Metadata", "Database user, Safe, network area, log, dan relationship Vault."],
      ["PAReplicate", "Utility yang menarik backup Vault ke server lain."],
      ["PARestore", "Utility untuk memulihkan Safe dari hasil backup."],
      ["Direct backup", "Backup software pihak ketiga dipasang/diizinkan langsung pada Vault; tidak direkomendasikan materi."],
      ["Indirect backup", "Replicate pada host lain menarik encrypted data; enterprise backup bekerja pada host tersebut."],
      ["Backup credential file", "File autentikasi Backup user yang harus di-hardening dan ikut berubah setelah login sukses."]
    ],
    sections: [
      {
        title: "1. Use case dan isi yang dilindungi",
        pages: "Halaman 4–5",
        paragraphs: [
          "Use case mencakup integrasi enterprise backup, granular point-in-time protection, dan object-level recovery. Safe data saja tidak cukup; Metadata dibutuhkan untuk memahami user, permission, Safe, audit, dan relationship.",
          "RPO menentukan berapa banyak perubahan dapat hilang; retention menentukan berapa lama copy tersedia; restore scope menentukan apakah satu Safe atau keseluruhan data dipulihkan. Ketiganya harus berasal dari business requirement."
        ]
      },
      {
        title: "2. Mengapa indirect backup direkomendasikan",
        pages: "Halaman 6–7",
        paragraphs: [
          "Direct backup memasang third-party agent pada Vault dan memberinya akses ke folder, memperluas software serta trust pada island-of-security. Indirect backup menempatkan Replicate Utility di server lain, menarik encrypted files, lalu enterprise backup memproses hasil tersebut.",
          "Server backup tetap sensitif. Ia membutuhkan disk setidaknya sebanding dengan database Vault pada NTFS, akses enterprise backup, physical/logical security, monitoring, dan pembatasan operator."
        ]
      },
      {
        title: "3. Installation, Vault.ini, dan credential file",
        pages: "Halaman 8–13",
        paragraphs: [
          "Enable Backup user dan set password pada Primary Vault sesuai approved process. Install Replicator pada host terpisah, tentukan encrypted backup folder, lalu isi Vault.ini dengan address Vault.",
          "CreateCredFile menghasilkan credential file terikat pada parameter security seperti executable path, host/IP, entropy, atau DPAPI sesuai opsi. File harus dibatasi ke service/operator yang memerlukan dan tidak dipindah sembarang. Setelah login sukses, credential Vault dan file dapat berubah sehingga restore file lama berisiko out-of-sync."
        ]
      },
      {
        title: "4. Full backup dan restore Safe",
        pages: "Halaman 14–16",
        paragraphs: [
          "Materi menjalankan PAReplicate dengan Vault.ini, logon-from-file, dan FullBackup. Exit code harus dibaca bersama log, size, file count, duration, last success, dan monitoring; process selesai tidak selalu berarti dataset lengkap.",
          "PARestore dapat memulihkan Safe backup ke target Safe dan memerlukan user dengan Restore All Safes. Restore adalah perubahan berisiko tinggi: tentukan source snapshot, target name, collision, owner, permission, business validation, dan rollback.",
          "Uji restore sebaiknya dilakukan ke test target yang terisolasi, lalu verifikasi object, version, metadata, permission, dan usability tanpa menimpa produksi."
        ],
        table: {
          headers: ["Tahap", "Bukti sukses", "Risiko"],
          rows: [
            ["Replicate connect", "Backup user login", "Credential/Vault.ini/network"],
            ["Data transfer", "File/count/size bertambah", "Disk/permission/interruption"],
            ["Job complete", "Log tanpa error + expected scope", "False success"],
            ["Restore", "Safe/object tersedia", "Overwrite/wrong snapshot"],
            ["Business validation", "Credential/object usable", "Data ada tetapi tidak operasional"]
          ]
        }
      },
      {
        title: "5. Scheduling dan monitoring",
        pages: "Halaman 17–19",
        paragraphs: [
          "Materi merekomendasikan dua Scheduled Tasks: full backup mingguan dan incremental harian. Jadwal harus mengikuti RPO, data growth, runtime, overlap, maintenance, enterprise backup pickup, dan retention—bukan disalin tanpa pengukuran.",
          "Log berada pada folder Replicate. Monitor last success, duration, size delta, exit code, disk, credential state, missed schedule, dan enterprise backup result. Alert yang hanya melihat process start tidak mendeteksi backup kosong atau incomplete."
        ]
      }
    ],
    decisionTable: {
      headers: ["Gejala", "Kemungkinan", "Pemeriksaan"],
      rows: [
        ["Backup tidak connect", "User/cred/Vault.ini/network", "Logon, port, user state"],
        ["Job sukses tapi size aneh", "Scope/data/previous state", "Expected count dan delta"],
        ["Disk penuh", "Retention/growth/enterprise pickup", "Capacity dan purge policy"],
        ["Restore ditolak", "Authorization/source/target", "Restore All Safes dan snapshot"],
        ["Restored Safe unusable", "Metadata/permission/object version", "Functional validation"]
      ]
    },
    scenario: {
      title: "Backup job hijau tetapi restore test gagal",
      situation: "Scheduled Task selesai tanpa error, namun Safe test tidak dapat dipulihkan dengan benar.",
      walkthrough: [
        "Preserve PAReplicate/PARestore logs, command options, snapshot time, size, file count, dan source path.",
        "Pastikan full/incremental chain lengkap dan enterprise backup tidak mengambil file saat masih ditulis.",
        "Validasi Restore All Safes authorization, target Vault/Safe name, disk, dan compatibility.",
        "Restore ke test target, bandingkan object, metadata, permission, version, dan functional use.",
        "Perbaiki schedule/retention/monitoring lalu ulangi sampai restore terbukti; jangan menyebut backup sehat hanya dari exit code."
      ],
      result: "Backup tanpa restore test adalah asumsi. Recovery capability hanya terbukti ketika data dapat dipulihkan dan digunakan."
    },
    checks: [
      { question: "Apa beda Data dan Metadata?", answer: "Data berisi Safe object; Metadata berisi database user, Safe, network area, audit, dan relationship." },
      { question: "Mengapa indirect backup direkomendasikan?", answer: "Third-party backup tidak perlu dipasang atau diberi access langsung pada hardened Vault." },
      { question: "Apa bukti backup sukses?", answer: "Log, expected scope/count/size, last success, copy enterprise, dan restore test—bukan process exit saja." },
      { question: "Siapa boleh restore Safe?", answer: "Materi mensyaratkan Restore All Safes authorization." }
    ],
    summary: [
      "Backup harus melindungi Data dan Metadata.",
      "Replicate pada host terpisah mempertahankan isolation Vault.",
      "Backup user, Vault.ini, dan credential file adalah dependency sensitif.",
      "Full/incremental schedule mengikuti RPO dan growth.",
      "Restore test adalah ukuran utama recovery readiness."
    ],
    boundaries: [
      "Restore produksi memerlukan approval, snapshot validation, dan rollback.",
      "Credential file dan backup output harus dienkripsi/dibatasi.",
      "Schedule contoh materi harus disesuaikan dengan requirement aktual."
    ]
  });

  add("16", {
    title: "Disaster Recovery",
    subtitle: "Replication, Vault failover, component failover, split-brain prevention, dan return to primary.",
    source: "M16, 29 halaman; architecture 4–9, setup 10–12, Vault failover 13–17, component failover 18–23, failback 24–26.",
    readingTime: 56,
    intro: [
      "DR menjaga kemampuan operasi ketika Primary Vault/site tidak tersedia. DR Vault adalah Vault standby dengan DR service yang mereplikasi dari Primary menggunakan DR user. PVWA dan PSM sebaiknya tersedia di DR site agar user tetap dapat mengakses; CPM memerlukan perlakuan khusus untuk mencegah dua pihak mengubah password secara bersamaan.",
      "Failover bukan satu tombol. Ia mencakup replication freshness, keputusan aktivasi, component routing, validation, operation selama DR, preservation audit/recording, replication kembali, dan failback ke primary."
    ],
    mentalModel: "Hanya satu Vault/CPM side yang boleh menjadi writer credential pada satu waktu. DR menyalin state dan siap mengambil alih; failback mengembalikan seluruh perubahan dari masa DR sebelum primary kembali aktif.",
    objectives: [
      "Menjelaskan DR Vault, service, user, dan enhanced replication.",
      "Membedakan automatic dan manual Vault failover.",
      "Memahami component failover dan larangan automatic CPM failover.",
      "Menjalankan return-to-primary tanpa kehilangan data atau membuat split-brain."
    ],
    terms: [
      ["DR Vault", "Standalone/cluster Vault standby dengan DR service."],
      ["DR user", "Built-in identity yang melakukan authentication dan replication dari Primary."],
      ["Enhanced replication", "Near-real-time metadata/current password synchronization ditambah file replication."],
      ["PADR.ini", "Configuration file DR service untuk sync/failover behavior."],
      ["Split-brain", "Primary dan DR sama-sama aktif menulis sehingga credential/state menyimpang."],
      ["Failback", "Mengembalikan operasi dari DR ke Primary setelah data disinkronkan kembali."],
      ["RTO/RPO", "Target waktu pemulihan dan toleransi kehilangan data."]
    ],
    sections: [
      {
        title: "1. DR architecture dan peran komponen",
        pages: "Halaman 4–7",
        paragraphs: [
          "DR service berjalan pada DR Vault dan memakai DR user untuk login ke Primary dengan hak Backup/Restore All Safes sesuai materi. Ia menarik atau menerima data agar standby siap diaktifkan.",
          "PVWA/PSM di DR site menyediakan access path saat primary site gagal. CPM tidak boleh automatic failover karena dua CPM terhadap dua Vault yang tidak sepenuhnya sinkron dapat mengubah target dan menghasilkan credential divergence."
        ],
        callout: { tone: "warning", title: "Aturan terpenting", text: "CPM failover harus manual. Jangan mengizinkan dua credential writer aktif pada sisi Primary dan DR." }
      },
      {
        title: "2. Enhanced replication dan freshness",
        pages: "Halaman 8–12",
        paragraphs: [
          "Enhanced replication mempercepat current password/metadata synchronization secara near real-time dan memprosesnya paralel dengan file/recording replication. Ini mengurangi lag credential, tetapi file content tetap mempunyai interval dan health yang harus dipantau.",
          "EnableDbsync=Yes mengaktifkan database synchronization. ReplicateInterval mengatur interval filesystem replication, default materi 3.600 detik. Sebelum failover, administrator harus mengetahui last successful metadata sync, file replication, backlog, dan gap terhadap RPO."
        ]
      },
      {
        title: "3. Automatic dan manual Vault failover",
        pages: "Halaman 13–17",
        paragraphs: [
          "Automatic failover diaktifkan dengan EnableFailover. Contoh materi memakai health check 60 detik, empat retry dengan jeda 30 detik sebelum DR menganggap Primary down. Parameter aktual harus disejajarkan dengan network behavior agar transient loss tidak memicu failover palsu.",
          "Manual mode memakai EnableFailover=No, EnableDbsync=Yes, dan ActivateManualFailover=No saat normal. Untuk failover, ActivateManualFailover diubah ke Yes lalu DR service direstart. Proses menyinkronkan data, memulai PrivateArk Server, dan menghentikan DR service setelah peran berubah.",
          "Keputusan failover harus mempunyai authority, incident commander, evidence primary unavailable, replication freshness, communication, dan validation plan."
        ]
      },
      {
        title: "4. Component failover dan split-brain",
        pages: "Halaman 18–23",
        paragraphs: [
          "PVWA dan PSM dapat memiliki Primary/DR Vault address di Vault.ini dan mencoba sesuai urutan. PSM recording yang dibuat saat DR harus dibackup/replicate kembali sebelum failback. PVWA audit juga perlu dipertahankan.",
          "CPM tidak boleh automatic failover. Jika Primary dan DR berbeda state lalu masing-masing CPM mengubah target, tidak ada satu credential authoritative. Recovery menjadi sangat sulit karena Vault A, Vault B, dan target dapat mempunyai nilai berbeda.",
          "DNS alias dapat mengontrol Vault yang dipakai komponen dan membantu mengurangi split-brain, tetapi update manual menambah outage dan dipengaruhi TTL/cache. DNS bukan pengganti fencing dan runbook."
        ]
      },
      {
        title: "5. Return to primary",
        pages: "Halaman 24–26",
        paragraphs: [
          "Semua data yang dibuat selama DR—credential changes, account updates, audit, recording—harus direplikasi kembali sebelum Primary dibawa online sebagai active. Primary lama tidak boleh langsung dinyalakan sebagai writer dengan state stale.",
          "Materi mengarahkan reset PADR.ini ke FailoverMode=No, memaksa full replication dengan menghapus state line tertentu, restart DR service, dan mengembalikan ActivateManualFailover=No bila manual mode digunakan. Implementasi aktual harus mengikuti runbook versi dan services engagement.",
          "Failback selesai hanya setelah Vault role, PVWA, PSM, CPM, current password state, audit, recording, replication, monitoring, dan DR standby mode tervalidasi."
        ]
      }
    ],
    decisionTable: {
      headers: ["Tahap", "Risiko", "Bukti minimum"],
      rows: [
        ["Sebelum failover", "Stale DR", "Last metadata/file sync dan RPO"],
        ["Activate DR", "False failover", "Primary health, approval, timeline"],
        ["Component switch", "Sebagian masih ke Primary", "Connection status per component"],
        ["CPM activation", "Split-brain", "Primary fenced dan manual decision"],
        ["Failback", "Data DR hilang", "Replication back dan validation"],
        ["Return DR mode", "Standby salah mode", "PADR state dan test"]
      ]
    },
    scenario: {
      title: "Primary putus-putus dan DR hampir auto-failover",
      situation: "Network intermittent membuat retry threshold tercapai, sementara sebagian komponen masih dapat mencapai Primary.",
      walkthrough: [
        "Tentukan apakah Primary benar-benar down atau hanya jalur DR→Primary yang bermasalah.",
        "Preserve check/retry timeline, Primary/DR service state, replication freshness, dan component connections.",
        "Gunakan authority/runbook untuk fence Primary sebelum CPM DR diaktifkan; jangan membiarkan dua writer.",
        "Arahkan PVWA/PSM dan validasi user access, current credential, audit, recording, serta target operation.",
        "Saat Primary pulih, replicate seluruh perubahan kembali, failback terkontrol, dan reset DR standby mode."
      ],
      result: "DR health harus membedakan kegagalan Primary dari kegagalan jalur monitoring agar failover tidak menciptakan insiden kedua."
    },
    checks: [
      { question: "Mengapa CPM tidak boleh auto-failover?", answer: "Dua CPM/Vault dapat mengubah target dengan state berbeda dan menciptakan split-brain credential." },
      { question: "Apa beda metadata dan file replication?", answer: "Current password/metadata dapat near real-time; file/recording mengikuti mekanisme/interval lain." },
      { question: "Apa syarat failback?", answer: "Data masa DR direplikasi kembali, Primary tidak stale, component diarahkan, dan seluruh fungsi tervalidasi." },
      { question: "Apakah DNS alias menghilangkan outage?", answer: "Tidak. Update manual, TTL/cache, dan validation tetap memakan waktu serta tidak menggantikan fencing." }
    ],
    summary: [
      "DR Vault mereplikasi Primary menggunakan DR service/user.",
      "Replication freshness harus dibandingkan dengan RPO sebelum failover.",
      "Automatic/manual failover mempunyai trigger dan authority berbeda.",
      "CPM failover selalu manual untuk mencegah split-brain.",
      "Failback mencakup replication back, component validation, dan reset DR mode."
    ],
    boundaries: [
      "Failover/failback produksi harus mengikuti runbook versi dan incident authority.",
      "Jangan mengedit PADR.ini tanpa backup/config review.",
      "DR test harus mencakup Vault, PVWA, PSM, CPM, audit, recording, dan monitoring."
    ]
  });

  add("17", {
    title: "Vault Security",
    subtitle: "Island-of-security, defense in depth, hierarchical encryption, dan key custody.",
    source: "M17, 18 halaman; security controls 4–8 dan encryption/key management 9–16.",
    readingTime: 46,
    intro: [
      "Vault menyimpan credential paling sensitif sehingga kompromi Vault dapat mengubah PAM dari kontrol menjadi sumber serangan. Materi membangun Vault sebagai island of security: server di-hardening, diisolasi, tidak dipenuhi aplikasi tambahan, dan tidak bergantung pada trust umum environment.",
      "Security tidak hanya encryption. Authentication, firewall, network area, role/permission, time restriction, audit, alert, key custody, monitoring, backup, dan DR bekerja sebagai defense in depth."
    ],
    mentalModel: "Credential file dienkripsi dengan key unik; key itu dilindungi Safe key; Safe key dilindungi Server Key; jalur recovery memakai Recovery Public/Private Key. Kekuatan kriptografi tetap bergantung pada custody key, hardening host, dan authorization manusia.",
    objectives: [
      "Menjelaskan island-of-security dan delapan security fundamentals.",
      "Memetakan end-to-end security layers Vault.",
      "Membedakan Server Key, Recovery Public Key, dan Recovery Private Key.",
      "Mendesain storage/custody key dan recovery drill."
    ],
    terms: [
      ["Server Key", "Symmetric key unik Vault untuk operasi harian dan perlindungan Safe key."],
      ["Recovery Public Key", "Public key yang mengenkripsi copy Safe key untuk emergency recovery."],
      ["Recovery Private Key", "Private/Master key untuk recovery; disimpan terpisah dan sangat sensitif."],
      ["File Key", "Unique symmetric key per credential/object file."],
      ["Safe Key", "Symmetric key unik per Safe yang melindungi File Key."],
      ["HSM", "Hardware Security Module untuk melindungi Server Key dengan availability dan security tinggi."],
      ["Island of Security", "Vault dipisahkan dan diminimalkan dependency/aplikasinya."]
    ],
    sections: [
      {
        title: "1. Isolasi dan hardening Vault",
        pages: "Halaman 4–7",
        paragraphs: [
          "Materi menghapus service tidak perlu, mengamankan service tersisa, memasang hanya Vault Server/PrivateArk Client yang dibutuhkan, menghindari aplikasi tambahan, domain membership/trust, DNS/WINS dependency, dan memakai hosts file manual pada desain yang dijelaskan.",
          "Virtualization, external storage, antivirus, enterprise management, remote administration, backup/HA/DR, atau domain integration dapat menambah fungsi tetapi juga merelaksasi security. Setiap exception harus mengikuti Digital Vault Security Standard dan mempunyai compensating control.",
          "Security Fundamentals merangkum delapan area: isolate/harden, 2FA, restrict component server access, limit privilege/admin points, protect sensitive accounts/keys, secure protocols, monitor irregular logs, dan test DR."
        ]
      },
      {
        title: "2. Defense in depth Vault",
        pages: "Halaman 8",
        paragraphs: [
          "Session encryption melindungi data saat transit; hardened firewall membatasi jalur; authentication membuktikan identity; mandatory/discretionary access, RBAC, subnet, time limit, dan delay mengendalikan tindakan; audit dan event alert mendukung accountability.",
          "File encryption melindungi data at rest dengan hierarchical keys. Tidak ada satu layer yang cukup. Credential terenkripsi tetap berisiko bila Master user disalahgunakan; strong authentication tetap berisiko bila server menerima aplikasi pihak ketiga yang tidak terkontrol."
        ]
      },
      {
        title: "3. Hierarchical encryption",
        pages: "Halaman 9–13",
        paragraphs: [
          "Setiap credential disimpan sebagai encrypted file dengan File Key unik berbasis symmetric encryption. File Key dienkripsi oleh Safe Key; Safe Key dienkripsi oleh Server Key. Server Key dimuat untuk operasi Vault sehari-hari.",
          "Copy Safe Key juga dienkripsi dengan Recovery Public Key dan disimpan untuk emergency. Recovery Private Key membuka jalur recovery ketika Server Key normal tidak tersedia. Materi menyebut AES-256 untuk symmetric layers dan RSA 2048 untuk recovery key pair pada konteks versi tersebut.",
          "Hierarki membatasi dampak: satu File Key tidak langsung membuka semua object. Namun kehilangan/corruption key, permission file salah, atau custody buruk dapat memblokir startup/recovery. Inventory key dilakukan berdasarkan identifier/location/custodian, bukan menyalin isi key."
        ],
        table: {
          headers: ["Key", "Melindungi", "Ketersediaan"],
          rows: [
            ["File Key", "Satu credential file", "Dikelola internal per object"],
            ["Safe Key", "File Key dalam Safe", "Dikelola Vault"],
            ["Server Key", "Safe Key operasi harian", "Diperlukan saat Vault start/operate"],
            ["Recovery Public", "Copy Safe Key", "Digunakan saat penyimpanan recovery path"],
            ["Recovery Private", "Membuka recovery path", "Offline custody/emergency"]
          ]
        }
      },
      {
        title: "4. Key delivery dan custody",
        pages: "Halaman 14–16",
        paragraphs: [
          "Materi mencatat key delivery beralih dari physical media ke secure email service pada 2022. Apa pun media delivery, organisasi harus memverifikasi recipient, integrity, chain of custody, inventory, backup, dan secure deletion copy sementara.",
          "Recovery Private Key harus disalin ke physical media dan disimpan minimal di dua lokasi aman—Primary dan DR—agar satu bencana tidak menghilangkan recovery capability. Access idealnya dual control dan diuji melalui tabletop/recovery drill.",
          "Server Key dapat disimpan pada removable media yang dimasukkan saat startup (kuat tetapi operasional lebih berat), direct-attached storage dengan permission/encryption (lebih convenient), atau HSM (kuat dan available, key tidak berada di RAM dengan model materi). Pilihan adalah trade-off security, availability, restart procedure, dan cost."
        ]
      }
    ],
    decisionTable: {
      headers: ["Perubahan/kejadian", "Risiko", "Evidence aman"],
      rows: [
        ["Tambah software di Vault", "Attack surface/dependency", "Approval dan security standard exception"],
        ["Domain/DNS integration", "External trust/dependency", "Architecture review dan compensating control"],
        ["Vault gagal start", "Server Key/config/service", "Key path/availability tanpa content, ITAlog"],
        ["Recovery drill", "Key/custody tidak usable", "Custodian, media, waktu, hasil"],
        ["Key dipindah", "Unauthorized copy/loss", "Chain of custody dan secure deletion"]
      ]
    },
    scenario: {
      title: "Vault gagal start setelah maintenance",
      situation: "Service tidak berjalan dan operator menduga Server Key tidak tersedia pada expected path.",
      walkthrough: [
        "Preserve service/ITAlog/Trace, maintenance change, key path reference, permission, media/HSM status, dan timestamp—tanpa membuka atau menyalin key content.",
        "Pastikan masalah bukan disk, config syntax, service account, firewall, atau OS dependency sebelum memindahkan key.",
        "Libatkan authorized key custodian dan dual-control procedure. Verifikasi correct media/key identifier serta chain of custody.",
        "Start sesuai runbook, validasi Vault, component login, Safe access, audit, replication, dan DR.",
        "Dokumentasikan root cause dan perbaiki startup/recovery drill agar maintenance berikutnya tidak mengulang kondisi."
      ],
      result: "Key availability adalah emergency process dengan custody evidence, bukan file-copy troubleshooting biasa."
    },
    checks: [
      { question: "Mengapa Vault disebut island of security?", answer: "Karena service, aplikasi, network dependency, trust, dan administration diminimalkan serta diisolasi." },
      { question: "Apa beda Server dan Recovery Private Key?", answer: "Server Key mendukung operasi harian; Recovery Private Key membuka jalur emergency recovery." },
      { question: "Mengapa Recovery Private Key disimpan di dua lokasi?", answer: "Agar bencana satu site tidak menghilangkan kemampuan recovery." },
      { question: "Apakah encryption saja cukup?", answer: "Tidak. Authentication, authorization, hardening, firewall, audit, monitoring, custody, backup, dan DR juga diperlukan." }
    ],
    summary: [
      "Vault security dimulai dari isolation dan hardening.",
      "Delapan fundamentals menggabungkan identity, host, protocol, monitoring, key, dan DR.",
      "Hierarchical encryption memakai File, Safe, Server, dan Recovery keys.",
      "Key storage adalah trade-off security, availability, dan operability.",
      "Recovery capability harus diuji tanpa mengekspos key material."
    ],
    boundaries: [
      "Jangan mengunggah atau menyalin key content ke support/ticket/notebook.",
      "Vault exception terhadap security standard memerlukan formal risk acceptance.",
      "Algorithm/key behavior dapat berubah menurut versi; gunakan materi sebagai model dan cocokkan build."
    ]
  });

  add("18", {
    title: "System Monitoring and Common Administrative Tasks",
    subtitle: "System Health, email, SNMP, SIEM, replication monitoring, log rotation, dan maintenance cadence.",
    source: "M18, 37 halaman; System Health 4–6, email 7–13, SNMP 14–18, SIEM 19–22, replication 23–26, tasks 27–34.",
    readingTime: 54,
    intro: [
      "Monitoring yang baik tidak hanya memberi warna hijau/merah. Ia membedakan Vault health, component connectivity, CPM workload, PSM concurrency, backup/DR freshness, capacity, dan application error trend. Setiap alert harus mempunyai threshold, owner, runbook, dan evidence path.",
      "Materi menggunakan beberapa channel—REST/System Health, email, SNMP, SIEM, ITAlog—karena satu channel dapat gagal bersama komponen yang dipantaunya. Redundansi observability mengurangi blind spot."
    ],
    mentalModel: "Collect health dari beberapa source, bandingkan dengan baseline, alert hanya pada kondisi bermakna, korelasikan dengan change, tindak sesuai runbook, lalu validasi dan tutup noise yang tidak berguna tanpa menghilangkan signal.",
    objectives: [
      "Membaca System Health dan REST export.",
      "Mengonfigurasi component disconnect email monitoring.",
      "Memahami SNMP Remote Control dan SIEM health metrics.",
      "Memonitor backup/DR replication serta menjalankan maintenance berkala."
    ],
    terms: [
      ["System Health", "PVWA view/REST data untuk Vault dan component connectivity/workload."],
      ["ComponentMonitoringInterval", "Interval Vault memeriksa component state."],
      ["ComponentNotificationThreshold", "Komponen, enable flag, first delay, dan repeat interval notification."],
      ["Remote Control Agent", "Service Vault/DR/ENE untuk remote operation dan SNMP trap."],
      ["SendMonitorMessage", "Parameter pengiriman health statistic ke SIEM/syslog."],
      ["BackupNotificationThreshold", "Threshold missing backup replication."],
      ["DRNotificationThreshold", "Threshold missing DR connection/replication."],
      ["Log rotation", "Archive/purge log terkontrol untuk menjaga disk dan evidence window."]
    ],
    sections: [
      {
        title: "1. System Health dan REST",
        pages: "Halaman 4–6",
        paragraphs: [
          "System Health menampilkan Primary/DR Vault, connectivity PVWA/CPM/PSM/PTA, account managed CPM, dan concurrent PSM session. Per component tersedia IP, version, component user, connected/disconnected, dan last logon date.",
          "Disconnected berarti component user tidak berkomunikasi dengan Vault dalam konteks monitoring, bukan otomatis service mati. Penyebab dapat berupa service, network, credential, Vault, idle/threshold, atau monitoring config. REST export memungkinkan central dashboard dan trend."
        ]
      },
      {
        title: "2. Email component monitoring",
        pages: "Halaman 7–13",
        paragraphs: [
          "Materi menyarankan monitoring user seperti PVWAAppUser, PasswordManager, DR, dan Backup. Template notification Component is inactive menggunakan ID 206 pada contoh. Pada user, opsi Send email notification if component is not connected harus aktif.",
          "ComponentMonitoringInterval mengatur frekuensi check. ComponentNotificationThreshold menentukan component, notification enable, delay pertama, dan interval berikutnya—contoh CPM Yes 720 1440 berarti first notification 720 menit dan repeat 1440 menit.",
          "Loss communication menghasilkan ITAlog entry dan email. Test harus membuktikan detection, recipient, mail delivery, clear/recovery behavior, dan deduplication."
        ]
      },
      {
        title: "3. SNMP dan Remote Control",
        pages: "Halaman 14–18",
        paragraphs: [
          "Remote Control Agent terpasang pada Vault/DR dan ENE sebagai service; Remote Control Client adalah command-line utility pada host lain. Agent dapat mengirim SNMP trap menggunakan MIB untuk OS dan Vault information seperti CPU, memory, disk, event, service, Primary/DR status, dan logs.",
          "Remote operation dapat mengambil log, mengubah parameter, restart Vault/service, reboot host, atau mengambil machine statistics. Karena kemampuannya tinggi, network port, client identity, command authorization, audit, dan break-glass governance harus ketat."
        ]
      },
      {
        title: "4. SIEM baseline dan trend",
        pages: "Halaman 19–22",
        paragraphs: [
          "SendMonitorMessage mengirim statistic Vault melalui syslog ke SIEM, termasuk transaction queue/execution time, task count, CPU, dan metric lain. Dashboard dapat menunjukkan platform error paling luas serta activity trend yang dipengaruhi replication atau EVD jobs.",
          "Threshold harus dibangun dari baseline environment. CPU 70% mungkin normal saat EVD, tetapi abnormal pada jam idle. Simpan seasonality, maintenance, growth, dan known workload agar alert tidak hanya memakai angka generik."
        ]
      },
      {
        title: "5. Backup dan DR monitoring",
        pages: "Halaman 23–26",
        paragraphs: [
          "Vault menulis ITAlog dan dapat mengirim email jika Backup/DR user tidak connect sesuai threshold. Contoh BackupNotificationThreshold Yes,Yes,48,24,12 berarti monitor aktif, notification aktif, first alert 48 jam, repeat 24 jam, check setiap 12 jam.",
          "Contoh DRNotificationThreshold Yes,Yes,2,24,30m berarti first alert 2 jam, repeat 24 jam, check 30 menit. Nilai harus dibandingkan dengan RPO: threshold lebih lambat dari toleransi kehilangan data membuat monitoring tidak berguna."
        ]
      },
      {
        title: "6. Log rotation dan Safe history",
        pages: "Halaman 27–30",
        paragraphs: [
          "CPM log dapat tumbuh besar dan menghabiskan disk serta menyulitkan pencarian. LogCheckPeriod dan LogSafeName mengatur upload berkala ke Safe; proses kemudian dapat purge log lama. Archive harus menjaga evidence window yang dibutuhkan support.",
          "Expired Safe history dapat dibersihkan melalui PrivateArk sesuai retention. Cleanup hanya menghapus version/history yang melewati period, bukan alasan untuk mengurangi retention tanpa compliance review."
        ]
      },
      {
        title: "7. Cadence maintenance",
        pages: "Halaman 31–34",
        paragraphs: [
          "Materi menyarankan review ITAlog mingguan hingga baseline noise dipahami, lalu interval dapat disesuaikan. Quarterly: license capacity, free space, directory mapping, Master access, dan DR/BC test. Periodic/annual: security health check.",
          "Praktik lain: SIEM/SNMP aktif, diagram environment mutakhir, log location diketahui, archive trace/Logic Container cukup—materi menyarankan ideal 24 jam untuk support—dan CPM auto-rotate log."
        ]
      }
    ],
    decisionTable: {
      headers: ["Alert", "Bukan otomatis berarti", "Korelasi"],
      rows: [
        ["Component disconnected", "Service pasti mati", "Last logon, service, network, cred"],
        ["High CPU", "Incident", "Baseline, replication/EVD, queue"],
        ["Backup missing", "Data sudah hilang", "Last success, job, threshold, RPO"],
        ["DR missing", "DR Vault down", "DR user, network, service, replication"],
        ["Disk growth", "Hanya tambah disk", "Log/recording/history/retention"]
      ]
    },
    scenario: {
      title: "Email component disconnected berulang tetapi service terlihat hidup",
      situation: "CPM menghasilkan alert harian walau Windows service Running.",
      walkthrough: [
        "Korelasi email time, System Health last logon, ITAlog, CPM log, service restart, dan threshold.",
        "Running tidak membuktikan component berhasil authenticate ke Vault; periksa network dan credential state.",
        "Pastikan ComponentMonitoringInterval/Threshold sesuai dan user yang dipantau benar, bukan duplicate/stale component user.",
        "Bandingkan baseline activity: batch component yang idle tetap harus login sesuai behavior yang diharapkan.",
        "Perbaiki root cause, uji disconnect/recovery notification, lalu hilangkan duplicate recipient/noise tanpa mematikan monitoring."
      ],
      result: "Service health dan application connectivity adalah dua metric berbeda yang harus dikorelasikan."
    },
    checks: [
      { question: "Apa yang ditampilkan System Health?", answer: "Vault health, component connectivity, CPM managed account, PSM concurrency, serta detail IP/version/user/last logon." },
      { question: "Mengapa baseline SIEM penting?", answer: "Metric normal dipengaruhi workload/seasonality; threshold generik menghasilkan noise atau missed anomaly." },
      { question: "Apa arti Backup threshold 48,24,12 pada contoh?", answer: "First alert 48 jam, repeat 24 jam, check setiap 12 jam setelah flags enable." },
      { question: "Mengapa CPM log perlu rotation?", answer: "Mencegah disk penuh dan menjaga evidence tetap dapat dicari/diarsipkan." }
    ],
    summary: [
      "Monitoring memakai beberapa channel agar tidak memiliki single blind spot.",
      "Disconnected bukan sinonim service stopped.",
      "Email/SNMP/SIEM threshold harus mengikuti baseline dan RPO.",
      "Backup/DR freshness adalah metric kritis tersendiri.",
      "Maintenance cadence mencakup log, disk, license, mapping, Master, DR, dan security review."
    ],
    boundaries: [
      "Remote Control operation adalah privilege tinggi dan harus dibatasi/audit.",
      "Cleanup log/history tidak boleh melanggar retention dan support evidence window.",
      "Threshold contoh materi harus disesuaikan dengan requirement customer."
    ]
  });

  add("19", {
    title: "Common Issues",
    subtitle: "Diagnosis praktis user authentication, component credential, CPM operation, dan PSM launch.",
    source: "M19, 32 halaman; user auth 3–7, component connectivity 8–16, CPM 17–20, PSM 21–30.",
    readingTime: 54,
    intro: [
      "Common issue bukan berarti satu solusi berlaku untuk semua. Modul ini menunjukkan pola isolasi: tentukan stage, scope, exact error, dan working comparison sebelum reset password, restart service, disable security control, atau mengganti timeout.",
      "Tindakan seperti unsuspend user, regenerate credential file, disable NLA/AppLocker, atau reset shadow user dapat berguna sebagai recovery/isolation. Namun setiap tindakan mengubah state dan harus dilakukan setelah evidence diambil, dengan rollback serta validation."
    ],
    mentalModel: "Classify dulu: user→Vault authentication, component→Vault authentication, CPM→target credential operation, atau user→PSM→target session. Masing-masing mempunyai identity, log, network direction, dan safe boundary berbeda.",
    objectives: [
      "Mendiagnosis user suspended dan automatic unsuspend.",
      "Memulihkan component credential yang out-of-sync.",
      "Memisahkan Verify/Change/Reconcile dan Windows/UNIX failure.",
      "Mengisolasi PVWA, PSM, connector, NLA, shadow user, AppLocker, dan target."
    ],
    terms: [
      ["Suspended user", "Identity Vault dikunci setelah kondisi keamanan seperti repeated login failure."],
      ["UserLockoutPeriodInMinutes", "Parameter automatic unsuspend setelah periode tertentu."],
      ["Component credential mismatch", "Password/key di Vault tidak cocok dengan credential file lokal."],
      ["PSMConnect", "Local PSM user untuk menjalankan user session."],
      ["Shadow user", "Local identity dinamis yang menjalankan connector dan menyimpan preference."],
      ["NLA", "Network Level Authentication pada RDP sebelum session terbentuk."],
      ["AppLocker", "Windows allow/deny rules untuk application yang boleh berjalan di PSM."]
    ],
    sections: [
      {
        title: "1. User authentication dan suspension",
        pages: "Halaman 3–7",
        paragraphs: [
          "Contoh materi menunjukkan user memakai password network lama beberapa kali hingga Vault mencatat lima failure dan user suspended. Setelah user mencoba password baru, login tetap gagal karena state suspended, bukan karena password baru salah.",
          "ITAlog mengungkap actor, count, dan suspension. Administrator dapat unsuspend manual atau mengonfigurasi UserLockoutPeriodInMinutes untuk automatic unsuspend. Sebelum activate, pastikan failure berasal dari user mistake, bukan password spray atau compromised endpoint."
        ]
      },
      {
        title: "2. Component user dan credential file out-of-sync",
        pages: "Halaman 8–16",
        paragraphs: [
          "Component seperti CPM memakai Vault user dan local credential file. Jika password di Vault tidak cocok dengan file, System Health menunjukkan disconnected dan monitoring dapat mengirim email.",
          "Manual recovery CPM pada materi: stop service, set PasswordManager password di Vault ke known approved value, unsuspend/activate user, generate credential file baru dengan CreateCredFile, lalu start service. Urutan mencegah service terus mencoba credential salah.",
          "Known value tidak boleh masuk ticket/command history publik. Setelah service login, mekanisme rotation dapat mengubah credential lagi. PTA memiliki validation script untuk resync Vault users dan PAS gateway account pada konteks materi."
        ],
        callout: { tone: "warning", title: "Jangan reset acak", text: "Reset Vault user dan regenerate file harus satu transaksi terencana. Mengubah hanya satu sisi memperpanjang mismatch." }
      },
      {
        title: "3. CPM failure: target, policy, atau plug-in",
        pages: "Halaman 17–20",
        paragraphs: [
          "Platform/Master Policy tidak boleh konflik dengan target password policy. Tentukan operasi yang gagal—Verify, Change, Reconcile, atau semua—karena masing-masing memakai command dan privilege berbeda.",
          "Untuk Windows, materi menyarankan target Event Viewer, local security setting, dan manual net use dari CPM untuk menguji connectivity/authentication; alternatif plug-in dapat memakai WMI atau PowerShell. Manual test harus menggunakan approved test credential dan tidak menulis secret ke command history.",
          "Untuk UNIX, periksa network/SSH, current credential, prompt dan process file. Prompt mismatch dapat tampak seperti password salah walau login manual berhasil. Bandingkan account working pada Platform sama sebelum mengubah global parameter."
        ]
      },
      {
        title: "4. PSM scope: PVWA, PSM, atau target",
        pages: "Halaman 21–23",
        paragraphs: [
          "Tentukan stage error, satu atau banyak account, account type, PSM hardened/domain state, connection type RDP file atau RemoteApp, dan distribution/load balancer. Service, Windows System/Application event, Safe permission, protocol version, recording/audit, serta timeout semuanya dapat memengaruhi launch.",
          "Troubleshooting harus mengubah satu variabel. Membandingkan PSM server lain, Safe working, atau connector working lebih informatif daripada disable banyak kontrol sekaligus."
        ]
      },
      {
        title: "5. NLA dan manual PSMConnect test",
        pages: "Halaman 24–26",
        paragraphs: [
          "NLA meminta authentication sebelum RDP session terbentuk. Disable sementara pada PSM/target dapat mengisolasi incompatibility, tetapi harus direstore segera karena menurunkan security.",
          "Manual PSMConnect test pada materi menonaktifkan Start Program sementara, mengambil password secara authorized, login ke PSM, lalu menjalankan MSTSC ke target. Test membedakan local user/RDP path dari PSM dispatcher/connector. Ia sangat sensitif dan memerlukan approval serta audit.",
          "Timeout dapat dinaikkan pada environment overload, tetapi hanya setelah latency/resource terbukti. Timeout besar menyembunyikan bottleneck dan memperlama failure jika root cause bukan performance."
        ]
      },
      {
        title: "6. Shadow user dan AppLocker",
        pages: "Halaman 27–30",
        paragraphs: [
          "Shadow user dibuat saat first connection untuk menjalankan connection component dan menyimpan preference. Problem dapat diisolasi dengan menjalankan component sebagai shadow user atau menghapus/recreate user sesuai procedure setelah evidence/profile dipreservasi.",
          "PSM memakai AppLocker allow rules. Connector baru perlu exception pada PSMConfigureApplocker configuration lalu script diterapkan. Audit Only atau disable enforcement boleh dipakai sebagai test terbatas, bukan permanent fix. Re-enable rules dan validasi connector serta isolation."
        ]
      }
    ],
    decisionTable: {
      headers: ["Gejala", "Layer", "Controlled test"],
      rows: [
        ["User login gagal setelah salah password", "Suspension", "ITAlog + activate/lockout policy"],
        ["Component disconnected", "Credential file/Vault user", "Service, user state, resync"],
        ["Verify/Change semua gagal", "CPM network/plugin/policy", "Manual approved connectivity + target log"],
        ["PSM RDP gagal sebelum target", "NLA/PSMConnect/service", "Stage-specific test"],
        ["Connector tidak launch", "Shadow/AppLocker/path", "Run as shadow + AppLocker audit"]
      ]
    },
    scenario: {
      title: "PSM-RDP gagal untuk satu connector setelah hardening",
      situation: "Account terlihat dan PSM service sehat, tetapi RemoteApp connector langsung tertutup.",
      walkthrough: [
        "Ambil session ID, PSM server, connector, account, Safe, target, error, dan Event Viewer.",
        "Bandingkan PSM-RDP baseline dan connector lain pada PSM sama untuk memisahkan target/network dari component launch.",
        "Periksa connection-client log, shadow user profile, executable/path, dependency, dan AppLocker event.",
        "Gunakan AppLocker Audit Only atau run-as-shadow hanya pada controlled window; jangan permanent disable.",
        "Perbaiki rule/config, re-enable enforcement, lalu validasi launch, isolation, audit, recording, dan PSM lain."
      ],
      result: "Jika RDP baseline bekerja tetapi satu connector gagal setelah hardening, failure domain mengarah ke connector/shadow/AppLocker, bukan password target."
    },
    checks: [
      { question: "Mengapa user tetap gagal setelah password benar?", answer: "Vault user dapat sudah suspended akibat repeated failure." },
      { question: "Apa tanda component credential mismatch?", answer: "Service dapat hidup tetapi Vault user login gagal dan System Health menunjukkan disconnected." },
      { question: "Kapan disable NLA/AppLocker digunakan?", answer: "Hanya sebagai isolation test terkontrol dengan rollback, bukan solusi permanen." },
      { question: "Apa fungsi shadow user?", answer: "Menjalankan connection component dan menyimpan preference pada PSM." }
    ],
    summary: [
      "Common issue tetap memerlukan stage, scope, timestamp, dan evidence.",
      "Suspension berbeda dari password salah.",
      "Component password di Vault dan credential file harus sinkron.",
      "CPM failure dipisah menurut operation, target, policy, network, dan plug-in.",
      "PSM diagnosis memisahkan PVWA, PSM, connector, security control, network, dan target."
    ],
    boundaries: [
      "Jangan mencatat known password atau credential file content.",
      "Manual PSMConnect, NLA, dan AppLocker test memerlukan approval serta immediate rollback.",
      "Jangan restart/reset sebelum exact error dan log window dipreservasi."
    ]
  });

  add("20", {
    title: "Troubleshooting",
    subtitle: "Metodologi topology-first, log correlation, debug discipline, dan xRay escalation package.",
    source: "M20, 44 halaman; methodology 4–13, login example 14–24, logs 25–35, xRay 36–41.",
    readingTime: 66,
    intro: [
      "Troubleshooting PAM membutuhkan pemahaman implementation, komunikasi komponen, dan perbedaan current versus expected behavior. Tujuannya bukan mencoba sebanyak mungkin perubahan, tetapi mempersempit failure domain dengan evidence dan satu variabel per test.",
      "Dokumentasi proses sama pentingnya dengan hasil. Topology, scope, exact error, timeline, reproduction, working comparison, log, hypothesis, action, dan validation menjadi dasar RCA serta escalation ke support."
    ],
    mentalModel: "Understand topology → ask user-experience questions → reproduce/isolate → choose relevant logs → refine hypothesis → check version-specific documentation/KB → escalate dengan paket evidence dan pertanyaan spesifik.",
    objectives: [
      "Menerapkan troubleshooting flow yang repeatable.",
      "Mengenali log types, code structure, location, dan debug control.",
      "Mengorelasikan Vault, PVWA, CPM, PSM, client, target, dan replication logs.",
      "Menggunakan xRay secara aman untuk collection dan escalation."
    ],
    terms: [
      ["Expected behavior", "Hasil yang seharusnya terjadi menurut design/SOP."],
      ["Actual behavior", "Hasil yang benar-benar diamati dan dapat direproduksi."],
      ["Failure domain", "Komponen/stage paling sempit yang masih menjelaskan gejala."],
      ["Console log", "Operational/service messages umum."],
      ["Error log", "Warning/error yang dipisahkan untuk triage cepat."],
      ["Trace log", "Detail workflow sesuai debug level untuk korelasi mendalam."],
      ["Correlation ID", "Identifier yang menghubungkan event lintas log."],
      ["xRay", "Utility collection terenkripsi untuk log/config PAM dan support sharing."]
    ],
    sections: [
      {
        title: "1. Prerequisite dan topology",
        pages: "Halaman 4–7",
        paragraphs: [
          "Sebelum diagnosis, ketahui component yang terpasang, host, version, load balancer, HA/DR, network path, dan target. Pastikan akses ke server/log serta dokumentasi/KB tersedia. Tanpa topology, test network dan pemilihan log mudah mengarah ke host salah.",
          "Gambar flow spesifik ticket, bukan seluruh architecture. Login PVWA tidak melewati target; CPM Change tidak memakai workstation user; PSM Connect mempunyai dua sisi network. Flow menentukan evidence yang relevan."
        ]
      },
      {
        title: "2. Initial questions dan scope",
        pages: "Halaman 8",
        paragraphs: [
          "Tanyakan pengalaman user, affected population, exact error, apakah pernah bekerja, recent change, crash, production impact, dan reproducibility. Jawaban 'semua gagal' harus dibuktikan dengan sample user/account/PSM/target, bukan asumsi.",
          "Tuliskan problem statement: actor melakukan action terhadap object melalui path pada waktu tertentu; expected X, actual Y; scope Z. Kalimat yang baik dapat diuji dan membatasi log window."
        ]
      },
      {
        title: "3. Isolation dan reproduction",
        pages: "Halaman 9–13",
        paragraphs: [
          "Jika reproducible, ubah satu variabel dan ulangi pada skenario berbeda sambil mencatat hasil. Bandingkan working dan failing case. Jika tidak reproducible, review log pada time window reported dan cari trigger/change yang menjelaskan intermittency.",
          "Follow-up question harus lahir dari evidence, bukan checklist statis. Setelah log menunjukkan Vault-origin error, pertanyaan berpindah ke user state/authorization; setelah PSM connector log menunjukkan timeout, pertanyaan berpindah ke target/network/resource."
        ]
      },
      {
        title: "4. Contoh login failure dan error origin",
        pages: "Halaman 14–24",
        paragraphs: [
          "Contoh materi: satu administrator gagal login di PrivateArk dan PVWA. Topology/version dicatat, scope satu user, pernah bekerja, tidak ada recent change, dan error reproducible. Prefix ITA menunjukkan error berasal dari Vault sehingga ITAlog/Trace dipilih.",
          "Pesan end-user sengaja generik. Cari entry pertama yang terkait kejadian, bukan hanya cascade terakhir. Error detail berikutnya memberi code/cause yang dapat dicocokkan dengan Messages and Responses. Setelah tindakan, ulangi flow bila muncul error baru; jangan menganggap semua entry adalah root cause yang sama."
        ],
        callout: { tone: "l2", title: "First relevant error", text: "Satu kegagalan dapat menulis banyak pesan. Cari titik pertama workflow menyimpang, lalu baca pesan sesudahnya sebagai consequence sampai terbukti sebaliknya." }
      },
      {
        title: "5. Jenis dan struktur log",
        pages: "Halaman 25–29",
        paragraphs: [
          "Log dibagi menjadi console/operational, error, dan trace/detail. Kode pesan memiliki segmen yang menunjukkan component/module, area, number, dan severity/category pada model materi. Prefix membantu memilih host dan dokumentasi pesan.",
          "Saat review, tanyakan log mana, time zone, debug level, rotation, session/job/correlation ID, first error, repeated pattern, working comparison, dan recent config. Jangan menggabungkan log dari timezone berbeda tanpa normalisasi."
        ]
      },
      {
        title: "6. Debug discipline dan component log map",
        pages: "Halaman 30–35",
        paragraphs: [
          "Vault debug dapat diubah melalui dbparm.ini dengan restart atau secara dinamis melalui tool tertentu. Materi mengingatkan debug Vault dilakukan dengan guidance support. Component debug dapat diatur melalui configuration di Vault/PVWA.",
          "Vault: dbparm.ini, ITAlog, Trace.dX, VaultDB, LogicContainer. DR: PADR.ini/PADR.log. Replicate: PAReplicate /EnableTrace dan log. CPM: Platform policy, pm/pm_error/PMConsole/PMTrace/ThirdParty. PVWA: web.config, PVWAConfig/Policies, web/session logs. PSM: Basic_psm, console/recorder/client logs.",
          "Naikkan debug hanya pada window reproduksi, periksa disk/PII/secret risk, catat before/after, lalu kembalikan level. Debug permanen membuat noise, konsumsi disk, dan exposure data."
        ]
      },
      {
        title: "7. xRay collection dan sharing",
        pages: "Halaman 36–41",
        paragraphs: [
          "xRay mengumpulkan log/config dari PAM component secara lokal atau remote, mengenkripsi data selama collection/transfer, dan dapat mengaitkan hasil ke support case. Operator memilih component, time frame, collection level, OS+application atau application-only, serta optional Active Vault access untuk config.",
          "Sebelum share, preview dataset, minimalkan timeframe/scope, redaksi sesuai policy, catat checksum/collection metadata, case number, recipient, dan retention. Encryption in transit tidak menghilangkan kewajiban data minimization."
        ]
      }
    ],
    decisionTable: {
      headers: ["Failure flow", "Log awal", "Korelasi berikut"],
      rows: [
        ["User login", "PVWA/PrivateArk + ITAlog", "Directory/user state/Vault trace"],
        ["CPM operation", "pm/pm_error", "ThirdParty + target event"],
        ["PSM session", "PSMConsole/session client", "Recorder + Event Viewer + target"],
        ["Vault health", "ITAlog/Trace", "OS, firewall, DB/LogicContainer"],
        ["Backup/DR", "PAReplicate/PADR", "Vault log dan replication status"],
        ["REST/API", "HTTP/PVWA", "Vault audit dan client request ID"]
      ]
    },
    scenario: {
      title: "Menyusun escalation package untuk login failure intermittent",
      situation: "Sebagian login LDAP gagal pada jam tertentu dan tidak selalu reproducible.",
      walkthrough: [
        "Buat topology login: client/PVWA → Vault → LDAP, termasuk load balancer, version, time source, dan node.",
        "Kumpulkan successful dan failed sample dengan user, node, timestamp/timezone, exact error, correlation, dan source IP.",
        "Korelasi PVWA session log, ITAlog/Trace LDAP, load balancer, directory, dan recent change. Cari first relevant error.",
        "Uji satu variabel: node PVWA, directory endpoint, time window, user group, atau network path; catat hasil setiap kombinasi.",
        "Jika belum selesai, buat xRay scope sempit dan escalation: expected/actual, impact, hypothesis, tested steps, sanitized logs/config, serta pertanyaan spesifik kepada L3."
      ],
      result: "Escalation yang baik meminta validasi hypothesis tertentu, bukan sekadar 'please investigate logs'."
    },
    checks: [
      { question: "Apa urutan troubleshooting dasar?", answer: "Topology, initial questions, isolate/reproduce, relevant logs, follow-up, docs/KB, lalu support." },
      { question: "Mengapa first relevant error penting?", answer: "Pesan berikutnya sering consequence dari failure pertama dan dapat menyesatkan root cause." },
      { question: "Kapan debug dinaikkan?", answer: "Pada window reproduksi yang disetujui, dengan disk/data risk dipantau, lalu dikembalikan." },
      { question: "Apa isi L3 package minimum?", answer: "Problem statement, topology/version, scope, timeline, reproduction, IDs, working comparison, steps/result, sanitized logs/config, dan pertanyaan spesifik." }
    ],
    summary: [
      "Troubleshooting dimulai dari implementation dan user experience, bukan restart.",
      "Problem statement harus membedakan expected, actual, scope, dan impact.",
      "Reproduction mengubah satu variabel dan membandingkan working/failing case.",
      "Log dipilih berdasarkan flow dan dikorelasikan dengan waktu/ID.",
      "Debug dan xRay harus scoped, aman, terdokumentasi, dan dipulihkan.",
      "Escalation harus membawa evidence serta hypothesis yang dapat dijawab."
    ],
    boundaries: [
      "Redaksi password, token, key, PII, dan customer data sebelum sharing.",
      "Debug tinggi dapat menghabiskan disk dan menambah data sensitif.",
      "Lokasi log/config serta message behavior berubah menurut versi; cocokkan build."
    ]
  });


  window.IDIRA_TRAINING_CHAPTERS = chapters;
})();
