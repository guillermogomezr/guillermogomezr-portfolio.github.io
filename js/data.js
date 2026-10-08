/* =====================================================================
   CONTENIDO DEL PORTFOLIO
   ---------------------------------------------------------------------
   Todo el texto de la web sale de este archivo. Para actualizar algo
   (un enlace, un curso nuevo, una certificación...) solo tienes que
   editar aquí; el diseño se genera solo.

   PENDIENTES (déjalos en "" y no se muestran):
     - config.linkedin  -> URL de tu perfil
     - config.github    -> URL de tu perfil
     - config.photo     -> ruta a tu foto, p. ej. "assets/img/foto.jpg"
     - config.cvPdf     -> sube tu CV a esa ruta (si no existe, el botón
                           abre el modo lectura)
   ===================================================================== */

window.PORTFOLIO = {
  config: {
    name: "Guillermo Gómez Rivas",
    first: "Guillermo",
    last: "Gómez Rivas",
    initials: "Guillermo Gómez Rivas",
    role: "Arquitecto Cloud Junior",
    tagline:
      "Ingeniero informático en constante aprendizaje, enfocado en diseñar y desplegar soluciones en la nube automatizadas, seguras y escalables.",
    email: "guillermogr13@yahoo.es",
    linkedin: "", // p. ej. "https://www.linkedin.com/in/tu-usuario"
    github: "https://github.com/guillermogomezr",
    photo: "assets/img/foto-perfil.jpg",
    cvPdf: "assets/cv-guillermo-gomez-rivas.pdf",
    tfgUrl: "https://oa.upm.es/98407/", // TFG publicado en el Archivo Digital UPM
    location: "Rivas-Vaciamadrid (Madrid)",
    availability:
      "Vehículo propio y disponibilidad para desplazarme o cambiar de residencia, a nivel nacional e internacional.",
    availabilityShort: "Nacional e internacional · vehículo propio",
    languages: [
      { name: "Español", level: "Nativo" },
      { name: "Inglés", level: "B1 · preparando el B2" },
    ],
    currentCompany: "Decide Soluciones SL",
    revision: "v1.0",
    date: "09/2026",
  },

  about:
    "Soy ingeniero informático por la Universidad Politécnica de Madrid y actualmente trabajo como arquitecto cloud junior en Decide Soluciones SL. Durante mis prácticas desplegué de forma prácticamente autónoma una solución completa de previsión de la demanda en Oracle Cloud Infrastructure, desde la automatización de los procesos hasta la gestión de accesos bajo el principio de mínimo privilegio. Soy constante, curioso y disfruto explicando lo complejo de forma sencilla, algo que he cultivado durante más de siete años como entrenador de bádminton. Busco seguir creciendo como arquitecto cloud o ingeniero DevOps, enfrentándome a nuevos retos en la nube y profundizando en la infraestructura como código con Terraform y en las tecnologías del ecosistema cloud.",

  /* -------------------------------------------------------------------
     NODOS DEL PLANO
     tier: fila del plano (0 perfil, 1 experiencia, 2 proyectos, 3 formación)
     col:  columna (1, 2 o 3). span: columnas que ocupa.
     status: running | done | deploying | live
     ------------------------------------------------------------------- */
  nodes: [
    {
      id: "visitante",
      slug: "visitante",
      tier: 0, col: 1, icon: "user", kind: "visitor",
      title: "Tú",
      sub: "Visitante · reclutador",
      meta: "origen de la petición",
      note: "estás aquí",
      noteSide: "below",
      passive: true,
    },
    {
      id: "about",
      slug: "sobre-mi",
      tier: 0, col: 2, icon: "balancer", kind: "gateway",
      address: "module.perfil.sobre_mi",
      title: "Sobre mí",
      sub: "Punto de entrada",
      meta: "enruta hacia todo lo demás",
      status: "live", statusText: "Activo",
    },
    {
      id: "actividades",
      slug: "actividades",
      tier: 1, col: 1, icon: "shuttle", kind: "activity",
      address: "module.experiencia.docencia_y_deporte",
      title: "Entrenador y profesor",
      sub: "Club Bádminton Rivas · IPAFD",
      meta: "+7 años",
      status: "live", statusText: "Activo",
      note: "+7 años en el mismo club",
      noteSide: "below",
      items: [
        { title: "Entrenador de bádminton", org: "Club Bádminton Rivas", time: "Más de 7 años", text: "Grupos de niños de entre 6 y 10 años." },
        { title: "Entrenador de bádminton", org: "IPAFD", time: "1 año", text: "Alumnos de secundaria." },
        { title: "Profesor particular de matemáticas", org: "2.º de Bachillerato", time: "1 año", text: "" },
      ],
    },
    {
      id: "datos",
      slug: "cientifico-de-datos",
      tier: 1, col: 2, icon: "compute", kind: "experience",
      address: "module.experiencia.cientifico_datos",
      title: "Científico de datos",
      sub: "Decide Soluciones SL",
      meta: "02/2026 — 06/2026",
      type: "Prácticas curriculares",
      status: "done", statusText: "Completado",
      bullets: [
        'Responsable del despliegue en la nube de un sistema de previsión de la demanda para una empresa del sector eléctrico: automatización completa en Oracle Cloud Infrastructure, gestión de accesos e interlocución técnica con Oracle y con el cliente (ver proyecto {{demand}}).',
        "Inicio del desarrollo de una solución en Azure basada en un agente de IA que actúa como consultor interno para una empresa del sector del transporte.",
      ],
      stackText: ["Python", "OCI Data Science", "Oracle Autonomous Database", "OCI Object Storage", "OCI IAM", "Azure"],
    },
    {
      id: "cloud",
      slug: "arquitecto-cloud",
      tier: 1, col: 3, icon: "compute", kind: "experience",
      address: "module.experiencia.arquitecto_cloud_jr",
      title: "Arquitecto Cloud Jr.",
      fullTitle: "Arquitecto Cloud Junior",
      sub: "Decide Soluciones SL",
      meta: "09/2026 — 12/2026",
      type: "Prácticas extracurriculares",
      status: "running", statusText: "En curso",
      note: "ahora mismo, aquí",
      noteSide: "right",
      bullets: [
        "En curso: se completará al finalizar el periodo de prácticas.",
        "Proyecto en marcha: {{mcp}}",
      ],
      stackText: ["GCP", "Terraform", "Python"],
    },
    {
      id: "acm",
      slug: "a-critical-mind",
      tier: 2, col: 1, icon: "clapper", kind: "project",
      address: "module.proyectos.a_critical_mind",
      title: "A Critical Mind",
      sub: "Trabajo de Fin de Grado",
      meta: "Java · Spring Boot · MySQL",
      status: "done", statusText: "MVP validado",
      long: "A Critical Mind (Trabajo de Fin de Grado): Aplicación Web para la Consulta y Análisis de Críticas Cinematográficas Profesionales",
      problem:
        "En las plataformas de cine más populares, las críticas profesionales conviven sin ninguna jerarquía con miles de opiniones no expertas y quedan eclipsadas.",
      solution:
        "Aplicación web en la que solo críticos verificados pueden valorar películas y publicar reseñas, mientras que los espectadores consultan las fichas, disfrutan de contenido multimedia (tráileres, entrevistas o making-of) y votan las críticas con «me gusta» o «no me gusta» para establecer un ranking por relevancia.",
      role: "Proyecto individual, desde la idea hasta las pruebas con usuarios.",
      did: [
        "<b>Validación de la necesidad:</b> diseño, difusión (en español e inglés) y análisis de encuestas dirigidas a críticos y a espectadores.",
        "<b>Estudio legal y normativo:</b> derechos sobre el material audiovisual y protección de datos personales.",
        "<b>Análisis y diseño:</b> requisitos, arquitectura cliente-servidor de tres capas y modelado de la base de datos (diagramas entidad-relación y EER).",
        "<b>Backend en Java con Spring Boot:</b> entidades, repositorios, servicios y una API REST con respuestas en JSON; carga del catálogo de películas mediante web scraping e integración de la API de YouTube IFrame para incrustar los vídeos sin almacenarlos.",
        "<b>Frontend</b> con HTML5, CSS3, JavaScript y Bootstrap, conectado a la API mediante Fetch.",
        "<b>Pruebas:</b> unitarias de la API con Postman, de integración entre frontend y backend, y pruebas completas de usabilidad con usuarios reales para cada perfil.",
      ],
      stackText: ["Java", "Spring Boot", "MySQL", "API REST", "HTML5", "CSS3", "JavaScript", "Bootstrap", "Postman", "API de YouTube IFrame"],
      result:
        "Producto mínimo viable (MVP) funcional con dos perfiles de usuario y permisos bien diferenciados, validado con usuarios reales mediante pruebas end-to-end.",
      gallery: [
        { src: "assets/img/acm-login.jpg", alt: "Pantalla de inicio de sesión de A Critical Mind" },
        { src: "assets/img/acm-ficha.jpg", alt: "Ficha técnica de una película con la puntuación y las críticas votadas" },
      ],
      download: "tfg",
    },
    {
      id: "demand",
      slug: "demand-forecast",
      tier: 2, col: 2, icon: "forecast", kind: "project",
      address: "module.proyectos.demand_forecast",
      title: "Demand Forecast",
      sub: "Empresa del sector eléctrico",
      meta: "OCI · 4 pipelines",
      status: "done", statusText: "Desplegado",
      long: "Demand Forecast para una Empresa del Sector Eléctrico",
      problem:
        "La empresa necesitaba anticipar la demanda mensual de sus productos por cliente y referencia a partir de su histórico de ventas, y disponer de esas previsiones de forma automática y recurrente.",
      role:
        "Proyecto en equipo en el que me encargué del despliegue, la automatización y la seguridad de la solución en la nube; el tratamiento de los datos y el modelado los desarrolló el resto del equipo.",
      did: [
        "<b>Despliegue en OCI Data Science:</b> entorno Conda personalizado publicado en Object Storage, scripts encapsulados en Jobs gestionados mediante SDK y orquestados en cuatro Pipelines (limpieza de datos, entrenamiento, reentrenamiento con los últimos tres años y consolidación y validación de resultados), con ejecución programada mediante Schedules.",
        "<b>Seguridad:</b> autenticación mediante Resource Principal, grupos dinámicos y políticas IAM que conceden únicamente los permisos imprescindibles para cada servicio (Jobs, Pipelines y Schedules).",
        "<b>Documentación</b> técnica completa del despliegue para que la solución pueda reproducirse y mantenerse.",
        "<b>Reuniones</b> con el proveedor cloud (Oracle) y con el cliente para coordinar los requisitos y la puesta en marcha del despliegue.",
      ],
      stackText: ["OCI Data Science (Notebook Sessions, Jobs, Pipelines, Schedules)", "OCI Object Storage", "Oracle Autonomous Database", "OCI IAM", "Conda", "Python", "SQL"],
      result:
        "Solución end-to-end en la nube que genera de forma automática y periódica previsiones de demanda listas para que el cliente las consuma, sin intervención manual.",
      diagram: "demand",
      privateNote: "El código no es público (proyecto para cliente). El diagrama está anonimizado.",
    },
    {
      id: "mcp",
      slug: "servidor-mcp",
      tier: 2, col: 3, icon: "plug", kind: "project",
      address: "module.proyectos.servidor_mcp",
      title: "Servidor MCP",
      sub: "Consultas contra un LLM",
      meta: "GCP · Terraform",
      status: "deploying", statusText: "En desarrollo",
      note: "en obras",
      noteSide: "right",
      long: "Servidor MCP para Consultas contra un LLM",
      problem: "",
      role:
        "En desarrollo: autenticación mediante SSO y un sistema de gestión de permisos que determina a qué recursos tiene acceso cada usuario, cuya programación asumo yo.",
      did: [],
      stackText: ["GCP (Cloud Run, Cloud Storage, IAM)", "Terraform"],
      result: "La ficha completa llegará al terminar el proyecto.",
      diagram: "mcp",
    },
    {
      id: "upm",
      slug: "ingenieria-informatica",
      tier: 3, col: 1, icon: "database", kind: "education",
      address: "module.formacion.grado_ingenieria_informatica",
      title: "Ingeniería Informática",
      sub: "Universidad Politécnica de Madrid",
      meta: "2022 — 2026",
      status: "done", statusText: "Graduado",
      note: "aquí empezó todo",
      noteSide: "below",
    },
    {
      id: "cursos",
      slug: "cursos",
      tier: 3, col: 2, span: 2, icon: "bucket", kind: "courses",
      address: "module.formacion.bucket_formacion_continua",
      title: "Formación continua",
      sub: "Cisco · Coursera · Decide · Santander",
      meta: "8 objetos · 1 subiendo",
      status: "running", statusText: "Sigue creciendo",
    },
  ],

  edges: [
    { from: "visitante", to: "about" },
    { from: "about", to: "actividades" },
    { from: "about", to: "datos" },
    { from: "about", to: "cloud" },
    { from: "datos", to: "cloud", label: "evolución" },
    { from: "datos", to: "demand" },
    { from: "cloud", to: "mcp" },
    { from: "upm", to: "acm", label: "TFG" },
    { from: "upm", to: "cursos", label: "formación continua" },
  ],

  tiers: [
    { name: "perfil", label: "edge · perfil", cidr: "10.0.0.0/24" },
    { name: "experiencia", label: "subred · experiencia", cidr: "10.0.1.0/24" },
    { name: "proyectos", label: "subred · proyectos", cidr: "10.0.2.0/24" },
    { name: "formacion", label: "almacenamiento · formación", cidr: "10.0.3.0/24" },
  ],

  /* Formación: cuando tengas certificaciones oficiales añádelas aquí.
     Formato: { name, org, year, url } -> aparecerán por encima de los cursos. */
  certifications: [],

  courses: [
    {
      group: "Cloud, redes e infraestructura",
      items: [
        { name: "Cloud & DevOps", org: "Decide Soluciones SL", year: "En curso · fin previsto en 2027", ongoing: true },
        { name: "CCNA: Introduction to Networks", org: "Cisco", year: "2025" },
        { name: "CCNA: Switching, Routing and Wireless Essentials", org: "Cisco", year: "2025" },
        { name: "CCNA: Enterprise Networking, Security, and Automation", org: "Cisco", year: "2025" },
      ],
    },
    {
      group: "Inteligencia artificial y datos",
      items: [
        { name: "GenAI", org: "Decide Soluciones SL", year: "2026" },
        { name: "IBM: Data Science Methodology", org: "Coursera", year: "2026" },
        { name: "Universidad de los Andes: Fundamentos del uso de IA generativa", org: "Coursera", year: "2025" },
        { name: "Introducción a la Ciencia de Datos", org: "Santander", year: "2024" },
      ],
    },
  ],

  /* STACK: used = ids de los nodos donde se usa (resalta el plano al filtrar) */
  stack: [
    { group: "Cloud", items: [
      { id: "oci", name: "OCI", full: "Oracle Cloud Infrastructure", used: ["datos", "demand"], desc: "Despliegue completo y prácticamente autónomo de una solución de previsión de la demanda con OCI Data Science (Jobs, Pipelines y Schedules), Object Storage, Autonomous Database e IAM." },
      { id: "gcp", name: "GCP", full: "Google Cloud Platform", used: ["cloud", "mcp"], desc: "Despliegue de la infraestructura del servidor MCP (Cloud Run, Cloud Storage e IAM) mediante Terraform." },
      { id: "azure", name: "Azure", full: "Microsoft Azure", used: ["datos"], desc: "Primeros pasos en el desarrollo de una solución basada en un agente de IA." },
    ]},
    { group: "Infraestructura como código", items: [
      { id: "terraform", name: "Terraform", used: ["cloud", "mcp"], desc: "Definición y despliegue como código de la infraestructura cloud del servidor MCP en GCP (Cloud Run, buckets de Cloud Storage y permisos IAM)." },
    ]},
    { group: "Seguridad e identidades", items: [
      { id: "iam", name: "IAM · mínimo privilegio", used: ["demand", "mcp"], desc: "Diseño de políticas IAM en OCI que conceden únicamente los permisos imprescindibles para cada función." },
      { id: "sso", name: "SSO", full: "SSO y control de accesos", used: ["mcp"], desc: "Integración de inicio de sesión único y programación de la gestión de permisos por usuario en el servidor MCP (en desarrollo)." },
    ]},
    { group: "Contenedores y sistemas", items: [
      { id: "docker", name: "Docker", used: [], desc: "" },
      { id: "linux", name: "Linux · Bash", full: "Linux (Ubuntu) y Bash", used: [], desc: "Despliegue y administración de máquinas virtuales Ubuntu en entorno local para trabajar con sistemas Linux y la terminal Bash." },
    ]},
    { group: "Lenguajes", items: [
      { id: "python", name: "Python", used: ["datos", "cloud", "demand"], desc: "Lenguaje de programación usado durante mis prácticas, tanto curriculares como extracurriculares." },
      { id: "java", name: "Java", used: ["upm", "acm"], desc: "Lenguaje de programación principal en la carrera y en el backend de mi Trabajo de Fin de Grado ({{acm}})." },
      { id: "sql", name: "SQL", used: ["upm", "demand", "acm"], desc: "Usado a lo largo de toda la carrera para comunicarse con las bases de datos." },
    ]},
    { group: "Bases de datos", items: [
      { id: "mysql", name: "MySQL", used: ["upm", "acm"], desc: "Sistema gestor de bases de datos relacional utilizado a lo largo de la carrera y en mi Trabajo de Fin de Grado ({{acm}})." },
      { id: "adb", name: "Autonomous DB", full: "Oracle Autonomous Database", used: ["demand"], desc: "Almacenamiento del histórico de ventas y de los resultados del proyecto {{demand}}, con lectura y escritura desde los Jobs y Pipelines de OCI." },
    ]},
    { group: "Backend y frontend", items: [
      { id: "spring", name: "Spring Boot", used: ["acm"], desc: "Diseño y desarrollo de aplicaciones web, como mi Trabajo de Fin de Grado ({{acm}})." },
      { id: "rest", name: "APIs REST", used: ["acm"], desc: "Diseño y desarrollo de APIs REST para comunicar la base de datos con el frontend en aplicaciones web, como en mi Trabajo de Fin de Grado ({{acm}})." },
      { id: "web", name: "HTML · CSS · JS", full: "HTML5, CSS3, JavaScript y Bootstrap", used: ["acm"], desc: "Desarrollo de interfaces web conectadas a una API REST, como en mi Trabajo de Fin de Grado ({{acm}})." },
    ]},
    { group: "Otros lenguajes (en segundo plano)", minor: true, items: [
      { id: "c", name: "C", used: ["upm"], desc: "Programación de un minishell con comandos básicos de Linux como «ls»." },
      { id: "matlab", name: "Matlab", used: ["upm"], desc: "Usado en varias asignaturas de la carrera." },
      { id: "prolog", name: "Prolog", used: ["upm"], desc: "Programas básicos en una asignatura de la carrera." },
      { id: "r", name: "R", used: ["upm"], desc: "Usado en dos asignaturas de la carrera para manejar datos y estudiado también en cursos de formación complementaria." },
    ]},
  ],

  policiesIntro:
    'Mis principales fortalezas, basadas en el resultado del <a href="https://www.viacharacter.org/character-strengths" target="_blank" rel="noopener">VIA Character Strengths Survey</a>, un cuestionario validado científicamente y desarrollado por el VIA Institute on Character, y respaldadas por experiencias reales:',

  policies: [
    { action: "perseverancia:*", name: "Perseverancia y orientación a resultados", text: "Termino lo que empiezo a pesar de los obstáculos.", proof: "Desplegué un proyecto completo en OCI prácticamente sin ayuda ({{demand}}) y llevo más de 7 años en el mismo club." },
    { action: "aprendizaje:*", name: "Aprendizaje continuo y curiosidad técnica", text: "Me actualizo de forma constante, tanto por vía formal como autodidacta.", proof: "Formación complementaria (Coursera, Cisco, Santander, cursos internos) y el paso de la ciencia de datos a la arquitectura cloud." },
    { action: "creatividad:ResolverProblemas", name: "Creatividad aplicada a la resolución de problemas", text: "Busco soluciones y enfoques nuevos.", proof: "El {{mcp}} para consultas contra un LLM, y este mismo portfolio." },
    { action: "equipo:Liderar", name: "Liderazgo y trabajo en equipo", text: "Motivo a un grupo hacia un objetivo común cuidando las relaciones.", proof: "Entrenador de bádminton de grupos de niños y de alumnos de secundaria." },
    { action: "comunicacion:Explicar", name: "Comunicación", text: "Explico conceptos complejos de forma sencilla.", proof: "Profesor particular de matemáticas y entrenador." },
    { action: "seguridad:MinimoPrivilegio", name: "Prudencia y rigor en seguridad", text: "Tomo decisiones con cautela y evalúo los riesgos antes de actuar.", proof: "En {{demand}}, en lugar de conceder políticas amplias, definimos las mínimas que nos permitían cumplir nuestra función. En el {{mcp}}, diseño del control de accesos vía SSO para que cada persona acceda solo a lo que necesita." },
    { action: "equipo:BuenAmbiente", name: "Cercanía y sentido del humor", text: "Contribuyo a un buen ambiente de trabajo en el equipo.", proof: "Es mi fortaleza nº 1 en el test VIA. Si abres la consola y pruebas <code>terraform destroy</code>, lo compruebas." },
  ],
};
