/* =====================================================================
   TEXTOS DE LA INTERFAZ (botones, títulos, consola...)
   El contenido del CV está en data.js (español) y data.en.js (inglés).
   ===================================================================== */
window.PORTFOLIO_UI = {
  es: {
    htmlTitle: "Guillermo Gómez Rivas · Arquitecto Cloud",
    metaDesc: "Portfolio de Guillermo Gómez Rivas, arquitecto cloud junior: experiencia en OCI, GCP y Terraform, proyectos y formación, dibujados como un plano de arquitectura.",
    skip: "Saltar a la versión en texto",
    sheet: "Lámina 01",
    navLabel: "Controles de la página",
    viewLabel: "Vista",
    modePlano: "Plano",
    modeLectura: "Lectura",
    langLabel: "Idioma",
    consoleBtn: "Abrir la consola",
    consoleBtnTitle: "Consola (tecla º o `)",
    themeBtn: "Cambiar entre papel y cianotipia",
    themeBtnTitle: "Papel / cianotipia",
    planEyebrow: "Planta 01 · escala 1:1",
    planTitle: "Arquitectura profesional",
    planHint: "Cada recurso del plano es una parte de mi currículum. Pulsa sobre él para ver el detalle, o recórrelo en orden.",
    tour: "Recorrer el plano",
    closeCard: "Cerrar ficha",
    consoleTitle: "guillermo@es-madrid-1 — consola",
    consoleClose: "Cerrar la consola",
    consoleInput: "Escribe un comando",
    noscript: "Esta web necesita JavaScript para dibujar el plano. Puedes escribirme a",

    linkNames: { demand: "Demand Forecast", mcp: "Servidor MCP", acm: "A Critical Mind" },
    copied: "Email copiado: ",
    myEmail: "Mi email: ",
    writeMe: "Escríbeme",
    copyEmail: "Copiar email",
    cvPdf: "Descargar CV (PDF)",
    cvFull: "CV completo",
    ring: "Ingeniero informático · UPM 2026 · Arquitecto cloud · ",
    now: "Ahora",
    inProgress: "En curso",
    location: "Ubicación",
    mobility: "Movilidad",
    languages: "Idiomas",
    role: "Rol",
    email: "Email",
    openCard: "Abrir ficha",

    legend: "Leyenda",
    legendItems: ["Experiencia", "Proyecto", "Formación", "Formación continua", "Docencia y deporte", "Política IAM"],
    stackTitle: "Stack técnico",
    stackHint: "Pulsa una tecnología para ver dónde la he usado.",
    pencilIam: "mínimo privilegio, siempre",
    iamTitle: "Políticas IAM",
    iamHint: "Mis soft skills, escritas como permisos. Cada una con su evidencia.",
    highlighted: "Resaltado",
    resources: (n) => (n ? n + " recurso" + (n > 1 ? "s" : "") : "sin recursos en el plano"),
    clear: "Quitar",

    refPlan: "Ref. plano",
    secAbout: "Sobre mí",
    secCard: "Ficha",
    secWhat: "Qué hago",
    secTech: "Tecnologías",
    secActivities: "Actividades",
    secGives: "Lo que me aporta",
    givesText: 'Liderar un grupo hacia un objetivo común y explicar lo complejo de forma sencilla. Lo verás reflejado en las <a class="inline-link" href="#politicas-iam">políticas IAM</a>.',
    secProblem: "Problema",
    secSolution: "Solución",
    secRole: "Mi rol",
    secArch: "Arquitectura",
    secDid: "Qué hice",
    secStack: "Stack",
    secResult: "Resultado",
    secShots: "Capturas",
    memoria: "Ver el TFG en el Archivo Digital UPM",
    memoriaRead: "Ver el TFG en el Archivo Digital UPM",
    secDegree: "Titulación",
    degreeText: "Grado en Ingeniería Informática por la Universidad Politécnica de Madrid (2022–2026).",
    thesis: "Trabajo de Fin de Grado",
    secOtherLangs: "Otros lenguajes de la carrera",
    certs: "Certificaciones oficiales",
    iamChip: "Adjuntas a todos los recursos",
    iamLong: "Soft skills · principio de mínimo privilegio aplicado a mí mismo: solo lo que puedo demostrar.",
    secStrengths: "Fortalezas",
    proof: "Evidencia · ",
    secExperience: "Experiencia",
    descSoon: "Descripción en preparación.",
    whereUsed: "Dónde aparece en el plano",
    seeHighlight: "Ver resaltado en el plano",
    end: "Fin →",
    backToPlan: "Volver al plano",
    stackCount: "Stack",

    flow: {
      tagDemand: "Arquitectura · anonimizada",
      erp: "ERP del cliente", erpSub: "histórico de ventas",
      load: "carga",
      adbSub: "ventas por cliente y referencia",
      readRp: "lectura · Resource Principal",
      dsSub: "Jobs vía SDK · orquestados en 4 Pipelines · Schedules",
      pipes: ["Limpieza de datos", "Entrenamiento", "Reentrenamiento (últimos 3 años)", "Consolidación y validación"],
      write: "escritura",
      forecastTables: "Tablas de previsiones",
      consume: "consumo periódico",
      client: "Cliente", clientSub: "previsiones listas, sin intervención manual",
      sideDemand: ["Conda personalizado · Object Storage", "Grupos dinámicos", "Políticas IAM de mínimo privilegio"],
      tagMcp: "Arquitectura · en construcción",
      user: "Usuario",
      login: "inicio de sesión",
      ssoSub: "autenticación del usuario",
      idPerms: "identidad + permisos",
      runTitle: "Cloud Run · Servidor MCP",
      runSub: "gestión de permisos: a qué recursos accede cada usuario",
      query: "consulta",
      llmSub: "responde a las consultas",
      sideMcp: ["Cloud Storage", "IAM", "Toda la infraestructura en Terraform"],
    },

    readEyebrow: "Currículum · versión en texto",
    readExperience: "Experiencia",
    readProjects: "Proyectos",
    readEducation: "Formación",
    readDegree: "Grado en Ingeniería Informática",
    readStack: "Stack técnico",
    readActivities: "Actividades complementarias",
    readSoft: "Soft skills",
    techLine: "Tecnologías",

    cartContact: "Proyecto · contacto",
    cartPlan: "Plano", cartPlanV: "Arquitectura profesional",
    cartScale: "Escala", cartScaleV: "1:1 · tamaño real",
    cartDate: "Fecha", cartAuthor: "Autor", cartRev: "Revisión",
    cartState: "Estado", cartStateV: "En producción",
    cartFoot: "Dibujado a mano en HTML, CSS y JavaScript · alojado en GitHub Pages",
    cartConsole: "Consola: tecla <kbd>º</kbd> o botón <kbd>&gt;_</kbd>",

    applyPill: "✓ Plano aplicado",
    applyHint: "· abre la consola con º o &gt;_",
    applyLines: [
      "module.perfil.sobre_mi: Creating…",
      "module.formacion.grado_ingenieria: Creation complete [2026]",
      "module.proyectos.a_critical_mind: Creation complete [MVP]",
      "module.experiencia.cientifico_datos: Creation complete [06/2026]",
      "module.proyectos.demand_forecast: Creation complete [4 pipelines]",
      "module.experiencia.arquitecto_cloud_jr: Still creating… [en curso]",
    ],

    con: {
      region: "región es-madrid-1",
      locale: "es-ES",
      hello: 'Escribe <span class="c-cmd">help</span> para ver los comandos. <span class="c-dim">Prueba también ls, whoami o terraform plan.</span>',
      help: `<span class="c-dim">Comandos disponibles</span>
  <span class="c-cmd">whoami</span>             quién soy
  <span class="c-cmd">ls</span>                 recursos del plano
  <span class="c-cmd">open</span> &lt;recurso&gt;     abre la ficha (p. ej. open demand-forecast)
  <span class="c-cmd">stack</span>              tecnologías
  <span class="c-cmd">contacto</span>           datos de contacto (alias: terraform output)
  <span class="c-cmd">cv</span> · <span class="c-cmd">tfg</span>           documentos
  <span class="c-cmd">lectura</span> · <span class="c-cmd">plano</span>     cambiar de vista
  <span class="c-cmd">tema</span>               papel ↔ cianotipia
  <span class="c-cmd">idioma</span> es|en        cambiar de idioma
  <span class="c-cmd">terraform</span> plan|apply|destroy
  <span class="c-cmd">clear</span> · <span class="c-cmd">exit</span>`,
      at: "en",
      openUsage: 'uso: open &lt;recurso&gt; <span class="c-dim">· escribe ls para ver la lista</span>',
      notFound: (a) => `<span class="c-err">Error:</span> recurso «${a}» no encontrado. Escribe <span class="c-cmd">ls</span>.`,
      opening: "Abriendo",
      openingText: "Abriendo la versión en texto…",
      memoria: "TFG · A Critical Mind en el Archivo Digital UPM (oa.upm.es)",
      theme: "Tema",
      themeDark: "cianotipia", themeLight: "papel",
      langSet: "Idioma: español",
      ping: (e) => `PING guillermo (10.0.0.1): respuesta en <span class="c-acc">menos de 24 h</span> · escríbeme a ${e}`,
      badminton: `<span class="c-acc">      .
     /|\\
    / | \\      Un remate de bádminton puede superar los 400 km/h.
   /__|__\\     Llevo más de 7 años entrenando en el Club Bádminton Rivas.
     (_)       Los despliegues, en cambio, mejor sin prisas y con plan.</span>`,
      plan: `<span class="c-dim">Refreshing state…</span>
Terraform will perform the following actions:

  <span class="c-warn">~</span> module.experiencia.arquitecto_cloud_jr
      nivel       = "junior" <span class="c-warn">-></span> "(known after apply)"
      aprendiendo = ["AWS", "CI/CD", "certificaciones oficiales"]

  <span class="c-acc">+</span> module.proyectos.servidor_mcp  <span class="c-dim">(en desarrollo)</span>

<b>Plan:</b> 1 to add, 1 to change, 0 to destroy.`,
      reapply: "Aplicando de nuevo el plano…",
      destroy: `<span class="c-err">│ Error: Instance cannot be destroyed</span>
<span class="c-err">│</span>
<span class="c-err">│</span>   on guillermo.tf line 1:
<span class="c-err">│</span>    1: resource "ingeniero" "guillermo" {
<span class="c-err">│</span>
<span class="c-err">│</span> Resource has lifecycle.prevent_destroy = true.
<span class="c-err">│</span> Motivo: perseverancia (más de 7 años sin tirar la toalla).
<span class="c-err">│</span> Sugerencia: prueba mejor <span class="c-cmd">sudo contratar</span>.`,
      tfUsage: "uso: terraform plan | apply | destroy | output",
      hire: (mail) => `[sudo] contraseña para reclutador: ********
<span class="c-acc">Permiso concedido.</span> Política aplicada: <span class="c-cmd">Allow · contratar:Guillermo</span>
Siguiente paso → ${mail}`,
      hireSubject: "Hablemos · portfolio",
      sudoNo: '<span class="c-err">sudo:</span> este usuario sigue el principio de mínimo privilegio. <span class="c-dim">(pista: sudo contratar)</span>',
      unknown: (c) => `<span class="c-err">comando no encontrado:</span> ${c}. Escribe <span class="c-cmd">help</span>.`,
      outputs: { location: "location", langs: '["es: nativo", "en: B1 → B2"]' },
    },
  },

  en: {
    htmlTitle: "Guillermo Gómez Rivas · Cloud Architect",
    metaDesc: "Portfolio of Guillermo Gómez Rivas, junior cloud architect: experience with OCI, GCP and Terraform, projects and education, drawn as an architecture blueprint.",
    skip: "Skip to the text version",
    sheet: "Sheet 01",
    navLabel: "Page controls",
    viewLabel: "View",
    modePlano: "Blueprint",
    modeLectura: "Text",
    langLabel: "Language",
    consoleBtn: "Open the console",
    consoleBtnTitle: "Console (` or º key)",
    themeBtn: "Switch between paper and cyanotype",
    themeBtnTitle: "Paper / cyanotype",
    planEyebrow: "Floor 01 · scale 1:1",
    planTitle: "Professional architecture",
    planHint: "Each resource on the blueprint is part of my CV. Click one to see the details, or walk through them in order.",
    tour: "Walk the blueprint",
    closeCard: "Close details",
    consoleTitle: "guillermo@es-madrid-1 — console",
    consoleClose: "Close the console",
    consoleInput: "Type a command",
    noscript: "This website needs JavaScript to draw the blueprint. You can email me at",

    linkNames: { demand: "Demand Forecast", mcp: "MCP Server", acm: "A Critical Mind" },
    copied: "Email copied: ",
    myEmail: "My email: ",
    writeMe: "Email me",
    copyEmail: "Copy email",
    cvPdf: "Download CV (PDF)",
    cvFull: "Full CV",
    ring: "Computer engineer · UPM 2026 · Cloud architect · ",
    now: "Now",
    inProgress: "Ongoing",
    location: "Location",
    mobility: "Mobility",
    languages: "Languages",
    role: "Role",
    email: "Email",
    openCard: "Open details",

    legend: "Legend",
    legendItems: ["Experience", "Project", "Education", "Continuous learning", "Coaching and sport", "IAM policy"],
    stackTitle: "Tech stack",
    stackHint: "Click a technology to see where I have used it.",
    pencilIam: "least privilege, always",
    iamTitle: "IAM policies",
    iamHint: "My soft skills, written as permissions. Each one with its evidence.",
    highlighted: "Highlighted",
    resources: (n) => (n ? n + " resource" + (n > 1 ? "s" : "") : "no resources on the blueprint"),
    clear: "Clear",

    refPlan: "Grid ref.",
    secAbout: "About me",
    secCard: "Profile",
    secWhat: "What I do",
    secTech: "Technologies",
    secActivities: "Activities",
    secGives: "What it gives me",
    givesText: 'Leading a group towards a common goal and explaining complex things simply. You will see it reflected in the <a class="inline-link" href="#politicas-iam">IAM policies</a>.',
    secProblem: "Problem",
    secSolution: "Solution",
    secRole: "My role",
    secArch: "Architecture",
    secDid: "What I did",
    secStack: "Stack",
    secResult: "Result",
    secShots: "Screenshots",
    memoria: "View the thesis on the UPM Digital Archive (in Spanish)",
    memoriaRead: "View the thesis on the UPM Digital Archive (in Spanish)",
    secDegree: "Degree",
    degreeText: "Bachelor's degree in Computer Engineering, Universidad Politécnica de Madrid (2022–2026).",
    thesis: "Bachelor's thesis",
    secOtherLangs: "Other languages from the degree",
    certs: "Official certifications",
    iamChip: "Attached to every resource",
    iamLong: "Soft skills · the principle of least privilege applied to myself: only what I can prove.",
    secStrengths: "Strengths",
    proof: "Evidence · ",
    secExperience: "Experience",
    descSoon: "Description coming soon.",
    whereUsed: "Where it appears on the blueprint",
    seeHighlight: "See it highlighted on the blueprint",
    end: "End →",
    backToPlan: "Back to the blueprint",
    stackCount: "Stack",

    flow: {
      tagDemand: "Architecture · anonymised",
      erp: "Client's ERP", erpSub: "sales history",
      load: "load",
      adbSub: "sales by customer and product reference",
      readRp: "read · Resource Principal",
      dsSub: "Jobs via SDK · orchestrated in 4 Pipelines · Schedules",
      pipes: ["Data cleaning", "Training", "Retraining (last 3 years)", "Consolidation and validation"],
      write: "write",
      forecastTables: "Forecast tables",
      consume: "periodic consumption",
      client: "Client", clientSub: "forecasts ready, no manual intervention",
      sideDemand: ["Custom Conda · Object Storage", "Dynamic groups", "Least-privilege IAM policies"],
      tagMcp: "Architecture · under construction",
      user: "User",
      login: "sign-in",
      ssoSub: "user authentication",
      idPerms: "identity + permissions",
      runTitle: "Cloud Run · MCP Server",
      runSub: "permission management: which resources each user can access",
      query: "query",
      llmSub: "answers the queries",
      sideMcp: ["Cloud Storage", "IAM", "All infrastructure in Terraform"],
    },

    readEyebrow: "CV · text version",
    readExperience: "Experience",
    readProjects: "Projects",
    readEducation: "Education",
    readDegree: "Bachelor's degree in Computer Engineering",
    readStack: "Tech stack",
    readActivities: "Other activities",
    readSoft: "Soft skills",
    techLine: "Technologies",

    cartContact: "Project · contact",
    cartPlan: "Drawing", cartPlanV: "Professional architecture",
    cartScale: "Scale", cartScaleV: "1:1 · actual size",
    cartDate: "Date", cartAuthor: "Author", cartRev: "Revision",
    cartState: "Status", cartStateV: "In production",
    cartFoot: "Hand-drawn in HTML, CSS and JavaScript · hosted on GitHub Pages",
    cartConsole: "Console: <kbd>`</kbd> key or <kbd>&gt;_</kbd> button",

    applyPill: "✓ Blueprint applied",
    applyHint: "· open the console with ` or &gt;_",
    applyLines: [
      "module.profile.about_me: Creating…",
      "module.education.computer_engineering: Creation complete [2026]",
      "module.projects.a_critical_mind: Creation complete [MVP]",
      "module.experience.data_scientist: Creation complete [06/2026]",
      "module.projects.demand_forecast: Creation complete [4 pipelines]",
      "module.experience.jr_cloud_architect: Still creating… [ongoing]",
    ],

    con: {
      region: "region es-madrid-1",
      locale: "en-GB",
      hello: 'Type <span class="c-cmd">help</span> to see the commands. <span class="c-dim">Try ls, whoami or terraform plan too.</span>',
      help: `<span class="c-dim">Available commands</span>
  <span class="c-cmd">whoami</span>             who I am
  <span class="c-cmd">ls</span>                 resources on the blueprint
  <span class="c-cmd">open</span> &lt;resource&gt;    open its details (e.g. open demand-forecast)
  <span class="c-cmd">stack</span>              technologies
  <span class="c-cmd">contact</span>            contact details (alias: terraform output)
  <span class="c-cmd">cv</span> · <span class="c-cmd">thesis</span>        documents
  <span class="c-cmd">text</span> · <span class="c-cmd">blueprint</span>   switch view
  <span class="c-cmd">theme</span>              paper ↔ cyanotype
  <span class="c-cmd">lang</span> es|en          switch language
  <span class="c-cmd">terraform</span> plan|apply|destroy
  <span class="c-cmd">clear</span> · <span class="c-cmd">exit</span>`,
      at: "at",
      openUsage: 'usage: open &lt;resource&gt; <span class="c-dim">· type ls to see the list</span>',
      notFound: (a) => `<span class="c-err">Error:</span> resource “${a}” not found. Type <span class="c-cmd">ls</span>.`,
      opening: "Opening",
      openingText: "Opening the text version…",
      memoria: "Bachelor's thesis · A Critical Mind on the UPM Digital Archive (oa.upm.es, in Spanish)",
      theme: "Theme",
      themeDark: "cyanotype", themeLight: "paper",
      langSet: "Language: English",
      ping: (e) => `PING guillermo (10.0.0.1): reply in <span class="c-acc">under 24 h</span> · email me at ${e}`,
      badminton: `<span class="c-acc">      .
     /|\\
    / | \\      A badminton smash can go faster than 400 km/h.
   /__|__\\     I have been coaching at Club Bádminton Rivas for more than 7 years.
     (_)       Deployments, on the other hand, go best slow and with a plan.</span>`,
      plan: `<span class="c-dim">Refreshing state…</span>
Terraform will perform the following actions:

  <span class="c-warn">~</span> module.experience.jr_cloud_architect
      level    = "junior" <span class="c-warn">-></span> "(known after apply)"
      learning = ["AWS", "CI/CD", "official certifications"]

  <span class="c-acc">+</span> module.projects.mcp_server  <span class="c-dim">(in development)</span>

<b>Plan:</b> 1 to add, 1 to change, 0 to destroy.`,
      reapply: "Applying the blueprint again…",
      destroy: `<span class="c-err">│ Error: Instance cannot be destroyed</span>
<span class="c-err">│</span>
<span class="c-err">│</span>   on guillermo.tf line 1:
<span class="c-err">│</span>    1: resource "engineer" "guillermo" {
<span class="c-err">│</span>
<span class="c-err">│</span> Resource has lifecycle.prevent_destroy = true.
<span class="c-err">│</span> Reason: perseverance (7+ years without throwing in the towel).
<span class="c-err">│</span> Suggestion: try <span class="c-cmd">sudo hire</span> instead.`,
      tfUsage: "usage: terraform plan | apply | destroy | output",
      hire: (mail) => `[sudo] password for recruiter: ********
<span class="c-acc">Permission granted.</span> Policy applied: <span class="c-cmd">Allow · hire:Guillermo</span>
Next step → ${mail}`,
      hireSubject: "Let's talk · portfolio",
      sudoNo: '<span class="c-err">sudo:</span> this user follows the principle of least privilege. <span class="c-dim">(hint: sudo hire)</span>',
      unknown: (c) => `<span class="c-err">command not found:</span> ${c}. Type <span class="c-cmd">help</span>.`,
      outputs: { location: "location", langs: '["es: native", "en: B1 → B2"]' },
    },
  },
};
