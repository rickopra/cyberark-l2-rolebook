(() => {
  const data = window.REFERENCE_DATA;
  const index = window.CYBERARK_DOCS_INDEX;
  if (!data?.entries || data.entries.some(entry => entry.id === 'docs-cyberark-portal')) return;

  const R = (id, en) => ({ id, en });
  const A = (id, en) => ({ id, en });
  const portalSource = ['CA-DOCS-PORTAL'];

  const add = entry => {
    entry.category = entry.category || 'architecture';
    entry.sources = entry.sources || portalSource;
    entry.related = entry.related || ['pam'];
    entry.appliesTo = entry.appliesTo || ['CyberArk documentation portal'];
    entry.aliases = [entry.term].concat(entry.aliases || []);
    data.entries.push(entry);
  };

  add({
    id: 'docs-cyberark-portal',
    category: 'foundation',
    term: 'docs.cyberark.com',
    title: R('Atlas docs.cyberark.com', 'docs.cyberark.com atlas'),
    what: R(
      'Portal dokumentasi resmi CyberArk. Portal ini dibagi menjadi area lintas pekerjaan seperti Setup, Manage, Access, Audit and Reports, serta ruang produk seperti PAM - Self-Hosted, Privilege Cloud, EPM, Identity, Secrets Manager, dan API.',
      'CyberArk official documentation portal. It is divided into cross-product work areas such as Setup, Manage, Access, Audit and Reports, plus product spaces such as PAM - Self-Hosted, Privilege Cloud, EPM, Identity, Secrets Manager, and API.'
    ),
    simple: R(
      'Anggap portal ini sebagai kampus besar. Pilih dulu fakultasnya (produk), lalu pilih mata kuliah atau tugasnya (Setup, Manage, Troubleshoot, API, dan seterusnya).',
      'Think of the portal as a large university. Select the faculty first (product), then choose the course or task (Setup, Manage, Troubleshoot, API, and so on).'
    ),
    job: A(
      ['Menentukan ruang produk dan versi yang benar sebelum membaca prosedur.', 'Membedakan dokumentasi self-hosted, SaaS, endpoint, identity, secrets, API, dan release notes.', 'Menjaga diagnosis tetap berbasis build, topology, scope, dan evidence.'],
      ['Selecting the correct product space and version before reading a procedure.', 'Separating self-hosted, SaaS, endpoint, identity, secrets, API, and release-note documentation.', 'Keeping diagnosis grounded in build, topology, scope, and evidence.']
    ),
    flow: A(
      ['Portal root → product or work space → version → topic/TOC → prerequisite → procedure → validation.', 'Untuk ticket, mulai dari aktivitas yang gagal, lalu cari istilah produk, komponen, error, dan versi.'],
      ['Portal root → product or work space → version → topic/TOC → prerequisite → procedure → validation.', 'For a ticket, start from the failed activity, then search product, component, error, and version terms.']
    ),
    l2: A(
      ['Jangan memakai hasil pencarian latest untuk customer yang berjalan di build lama tanpa memeriksa version selector.', 'Gunakan release notes dan known issues sebelum menyimpulkan defect.', 'Pisahkan fakta dari hipotesis dan jangan menyalin secret, token, private key, atau data customer ke notebook.'],
      ['Do not use latest search results for a customer on an older build without checking the version selector.', 'Use release notes and known issues before concluding a defect.', 'Separate facts from hypotheses and never copy secrets, tokens, private keys, or customer data into the notebook.']
    ),
    boundary: A(
      ['Atlas ini menyimpan ringkasan, metadata ruang, serta judul dan breadcrumb TOC; isi prosedur resmi tetap berada di CyberArk Docs.', 'Detail menu, port, log, command, dan recovery wajib dicocokkan dengan edition, build, topology, dan SOP customer.'],
      ['This atlas stores summaries, space metadata, and TOC titles and breadcrumbs; official procedures remain in CyberArk Docs.', 'Menus, ports, logs, commands, and recovery details must be matched to the edition, build, topology, and customer SOP.']
    ),
    related: ['pam', 'vault', 'pvwa', 'cpm', 'psm', 'connector']
  });

  const detailed = [
    {
      id: 'docs-pam-self-hosted', key: 'pam-self-hosted', term: 'PAM - Self-Hosted docs', title: R('PAM - Self-Hosted', 'PAM - Self-Hosted'),
      what: R('Ruang untuk Vault lokal, PVWA, CPM, PSM, Vault HA/DR, installation, upgrade, hardening, troubleshooting, dan REST API PAM.', 'The space for local Vault, PVWA, CPM, PSM, Vault HA/DR, installation, upgrade, hardening, troubleshooting, and PAM REST API.'),
      simple: R('Pakai ruang ini ketika customer mengelola komponen PAM di server sendiri.', 'Use this space when the customer manages PAM components on its own servers.'),
      job: A(['Cocokkan versi Vault dan komponen.', 'Cari system requirements, installation, upgrade, hardening, logs, message codes, dan API.', 'Bedakan workflow PVWA, object Vault/Safe, session PSM, dan lifecycle CPM.'], ['Match the Vault and component versions.', 'Find system requirements, installation, upgrade, hardening, logs, message codes, and APIs.', 'Separate PVWA workflow, Vault/Safe objects, PSM sessions, and CPM lifecycle.']),
      flow: A(['PAM - Self-Hosted → version → Setup/Manage/Access/Audit/Developer → komponen → topic → validation.'], ['PAM - Self-Hosted → version → Setup/Manage/Access/Audit/Developer → component → topic → validation.']),
      l2: A(['Jangan membaca prosedur v14 untuk Vault v12 tanpa compatibility check.', 'Gunakan evidence lokal: service state, component log, Vault status, target comparison, timestamp, dan recent change.'], ['Do not read a v14 procedure for a v12 Vault without a compatibility check.', 'Use local evidence: service state, component logs, Vault status, target comparison, timestamp, and recent change.']),
      boundary: A(['Failover, DR repair, certificate, database, dan production change harus mengikuti approved runbook.'], ['Failover, DR repair, certificates, database, and production changes must follow an approved runbook.'])
    },
    {
      id: 'docs-privilege-cloud', key: 'privilege-cloud-secrets-rotation', term: 'Privilege Cloud docs', title: R('Privilege Cloud', 'Privilege Cloud'),
      what: R('Ruang untuk PAM SaaS: CyberArk mengelola core service, sementara customer mengelola identity integration, connector, network path, dan target-side dependencies.', 'The space for SaaS PAM: CyberArk manages the core service while the customer manages identity integration, connectors, network paths, and target-side dependencies.'),
      simple: R('Customer biasanya tidak mengelola Vault SaaS secara langsung; investigasi berfokus pada tenant, identity, connector, dan target.', 'The customer usually does not manage the SaaS Vault directly; investigation focuses on tenant, identity, connector, and target.'),
      job: A(['Validasi tenant dan service scope.', 'Periksa Connector, Secure Tunnel, outbound TLS/proxy/DNS, PSM/CPM lokal, serta target reachability.', 'Pisahkan core issue dari connector issue.'], ['Validate tenant and service scope.', 'Check Connector, Secure Tunnel, outbound TLS/proxy/DNS, local PSM/CPM, and target reachability.', 'Separate core issues from connector issues.']),
      flow: A(['Identity → tenant authorization → Privilege Cloud workflow → connector/tunnel → target → audit.'], ['Identity → tenant authorization → Privilege Cloud workflow → connector/tunnel → target → audit.']),
      l2: A(['Jangan mengasumsikan semua error SaaS berasal dari Vault.', 'Kumpulkan tenant, user, account, target, connector identity, correlation ID, timestamp, dan hasil health check.'], ['Do not assume every SaaS error originates in the Vault.', 'Collect tenant, user, account, target, connector identity, correlation ID, timestamp, and health-check results.']),
      boundary: A(['SaaS core escalation membutuhkan evidence tenant dan waktu kejadian yang presisi; perubahan connector tetap harus approved.'], ['SaaS core escalation needs precise tenant and event-time evidence; connector changes still require approval.'])
    },
    {
      id: 'docs-epm', key: 'epm', term: 'Endpoint Privilege Manager docs', title: R('Endpoint Privilege Manager', 'Endpoint Privilege Manager'),
      what: R('Ruang untuk least privilege, application control, credential theft protection, policy, agent, dan endpoint troubleshooting.', 'The space for least privilege, application control, credential theft protection, policy, agents, and endpoint troubleshooting.'),
      simple: R('Pakai ruang ini ketika masalah terjadi pada hak admin lokal atau aplikasi di endpoint.', 'Use this space when the issue concerns local admin rights or applications on an endpoint.'),
      job: A(['Validasi agent health dan policy assignment.', 'Ambil log dari endpoint yang terdampak.', 'Bedakan policy denial, agent communication, dan application behavior.'], ['Validate agent health and policy assignment.', 'Collect logs from the affected endpoint.', 'Separate policy denial, agent communication, and application behavior.']),
      flow: A(['Endpoint agent → policy evaluation → elevation/application control → audit/telemetry.'], ['Endpoint agent → policy evaluation → elevation/application control → audit/telemetry.']),
      l2: A(['Log EPM berasal dari endpoint, bukan Vault PAM.', 'Bandingkan endpoint gagal dengan endpoint working menggunakan OS, agent version, policy, user, application path, dan timestamp.'], ['EPM logs come from the endpoint, not the PAM Vault.', 'Compare a failing endpoint with a working endpoint using OS, agent version, policy, user, application path, and timestamp.']),
      boundary: A(['EPM bukan CPM dan tidak menggantikan password rotation PAM.'], ['EPM is not CPM and does not replace PAM password rotation.'])
    },
    {
      id: 'docs-secrets-manager', key: 'secrets-manager-sh', term: 'Secrets Manager docs', title: R('Secrets Manager', 'Secrets Manager'),
      what: R('Ruang untuk secrets pada aplikasi, container, DevOps, CI/CD, Conjur, Credential Providers, dan Central Credential Provider.', 'The space for secrets in applications, containers, DevOps, CI/CD, Conjur, Credential Providers, and Central Credential Provider.'),
      simple: R('Pakai ruang ini ketika aplikasi atau pipeline gagal mengambil secret secara machine-to-machine.', 'Use this space when an application or pipeline fails to retrieve a secret machine-to-machine.'),
      job: A(['Identifikasi metode integrasi: CP, CCP, REST, Conjur, atau provider lain.', 'Validasi application identity, allowed IP/OS user/hash, policy, endpoint, dan TLS.', 'Pisahkan error aplikasi dari error provider.'], ['Identify the integration method: CP, CCP, REST, Conjur, or another provider.', 'Validate application identity, allowed IP/OS user/hash, policy, endpoint, and TLS.', 'Separate application errors from provider errors.']),
      flow: A(['Application identity → provider/policy → Vault/secret store → application response.'], ['Application identity → provider/policy → Vault/secret store → application response.']),
      l2: A(['Jangan meminta secret asli untuk troubleshooting.', 'Untuk 401/403, mulai dari application ID, authentication mode, policy, network source, dan exact timestamp.'], ['Do not request the real secret for troubleshooting.', 'For 401/403, start with application ID, authentication mode, policy, network source, and exact timestamp.']),
      boundary: A(['Human login dan PAM session management bukan fungsi utama Secrets Manager.'], ['Human login and PAM session management are not the primary function of Secrets Manager.'])
    },
    {
      id: 'docs-api', key: 'api', term: 'CyberArk API docs', title: R('API dan Developer', 'API and Developer'),
      what: R('Dokumentasi untuk endpoint API, SDK, Terraform, dan integrasi developer di ekosistem CyberArk.', 'Documentation for APIs, SDKs, Terraform, and developer integrations across the CyberArk ecosystem.'),
      simple: R('Pakai ruang ini ketika pekerjaan L2 perlu diulang atau diverifikasi lewat Postman, PowerShell, Python, atau pipeline.', 'Use this space when an L2 task needs to be repeated or verified through Postman, PowerShell, Python, or a pipeline.'),
      job: A(['Cocokkan endpoint dengan product edition dan version.', 'Validasi authentication token, request body, response code, pagination, dan permission.', 'Redact token dan secret dari evidence.'], ['Match the endpoint to the product edition and version.', 'Validate authentication tokens, request bodies, response codes, pagination, and permissions.', 'Redact tokens and secrets from evidence.']),
      flow: A(['Authenticate → authorize → call endpoint → inspect response → correlate with UI/log/audit.'], ['Authenticate → authorize → call endpoint → inspect response → correlate with UI/log/audit.']),
      l2: A(['403 biasanya mengarahkan investigasi ke identity, permission, scope, atau policy; 4xx dan 5xx harus dibaca bersama response body dan timestamp.'], ['A 403 usually directs investigation to identity, permission, scope, or policy; 4xx and 5xx must be read with the response body and timestamp.']),
      boundary: A(['API call production tetap merupakan perubahan atau akses privileged; ikuti approval dan rate-limit policy.'], ['A production API call is still a privileged access or change; follow approval and rate-limit policy.']),
      sources: ['CA-REST-15.2']
    }
  ];

  detailed.forEach(entry => {
    entry.sources = entry.sources || portalSource;
    entry.related = ['pam', 'vault', 'connector'];
    add(entry);
  });

  const detailedKeys = new Set(detailed.map(entry => entry.key));
  (index?.spaces || []).forEach(space => {
    if (detailedKeys.has(space.id)) return;
    const title = space.title || space.id;
    const description = space.description || 'CyberArk documentation space';
    add({
      id: `docs-space-${space.id}`,
      category: 'architecture',
      term: `CyberArk Docs · ${title}`,
      title: R(`${title} · docs.cyberark.com`, `${title} · docs.cyberark.com`),
      what: R(`${description} Ruang ini adalah scope resmi untuk topik tersebut di portal CyberArk.`, `${description} This is the official scope for that topic in the CyberArk portal.`),
      simple: R(`Masuk ke ruang ${title} sebelum mencari prosedur agar hasil tidak tercampur dengan product space lain.`, `Enter the ${title} space before searching so results are not mixed with other product spaces.`),
      job: A(['Menentukan scope dokumentasi yang tepat.', 'Mencocokkan versi dan topic dengan ticket.', 'Membuka TOC, release notes, dan prerequisite sebelum eksekusi.'], ['Selecting the correct documentation scope.', 'Matching version and topic to the ticket.', 'Opening TOC, release notes, and prerequisites before execution.']),
      flow: A(['Portal → space → version → TOC/search → prerequisite → procedure → validation.'], ['Portal → space → version → TOC/search → prerequisite → procedure → validation.']),
      l2: A(['Gunakan index offline untuk menemukan judul dan breadcrumb, lalu buka halaman resmi untuk isi dan langkah version-specific.', 'Jangan menyimpulkan behavior hanya dari judul topic.'], ['Use the offline index to find titles and breadcrumbs, then open the official page for content and version-specific steps.', 'Do not infer behavior from a topic title alone.']),
      boundary: A(['Space katalog tanpa TOC snapshot lengkap tetap membutuhkan browsing langsung ke portal.'], ['A cataloged space without a complete TOC snapshot still requires browsing the live portal.']),
      related: ['pam'],
      docsSpace: space
    });
  });
})();
