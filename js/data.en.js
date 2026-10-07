/* =====================================================================
   CONTENIDO EN INGLÉS
   ---------------------------------------------------------------------
   Este archivo solo contiene la traducción. Todo lo que no aparezca
   aquí (enlaces, fechas, rutas, ids...) se toma de data.js.

   Cómo se combinan:
     - Nodos y tecnologías: por su "id".
     - El resto de listas: por posición (el 1.º con el 1.º, etc.).
     - Listas de textos (bullets, did, stackText): se sustituyen enteras.

   Si añades algo en data.js, añade aquí su traducción. Si no lo haces,
   se mostrará en español: no se rompe nada.
   ===================================================================== */

window.PORTFOLIO_EN = {
  config: {
    role: "Junior Cloud Architect",
    tagline:
      "Computer engineer, always learning, focused on designing and deploying automated, secure and scalable cloud solutions.",
    location: "Rivas-Vaciamadrid (Madrid, Spain)",
    availability:
      "Own vehicle, and open to travelling or relocating, both within Spain and internationally.",
    availabilityShort: "Spain & abroad · own vehicle",
    languages: [
      { name: "Spanish", level: "Native" },
      { name: "English", level: "B1 · working towards B2" },
    ],
  },

  about:
    "I am a computer engineer from the Universidad Politécnica de Madrid and I currently work as a junior cloud architect at Decide Soluciones SL. During my internship I deployed, almost single-handedly, a complete demand forecasting solution on Oracle Cloud Infrastructure, from process automation to access management under the principle of least privilege. I am persistent and curious, and I enjoy explaining complex things simply, something I have developed over more than seven years as a badminton coach. I want to keep growing as a cloud architect or DevOps engineer, taking on new challenges in the cloud and going deeper into infrastructure as code with Terraform and the wider cloud ecosystem.",

  nodes: [
    {
      id: "visitante",
      title: "You",
      sub: "Visitor · recruiter",
      meta: "where the request starts",
      note: "you are here",
    },
    {
      id: "about",
      title: "About me",
      sub: "Entry point",
      meta: "routes to everything else",
      statusText: "Active",
    },
    {
      id: "actividades",
      title: "Coach and tutor",
      sub: "Club Bádminton Rivas · IPAFD",
      meta: "7+ years",
      statusText: "Active",
      note: "7+ years at the same club",
      items: [
        { title: "Badminton coach", org: "Club Bádminton Rivas", time: "7+ years", text: "Groups of children aged 6 to 10." },
        { title: "Badminton coach", org: "IPAFD", time: "1 year", text: "Secondary school students." },
        { title: "Private maths tutor", org: "Final year of upper secondary school (2.º Bachillerato)", time: "1 year", text: "" },
      ],
    },
    {
      id: "datos",
      title: "Data Scientist",
      type: "Curricular internship",
      statusText: "Completed",
      bullets: [
        "Responsible for the cloud deployment of a demand forecasting system for an electricity-sector company: full automation on Oracle Cloud Infrastructure, access management, and technical point of contact with Oracle and the client (see project {{demand}}).",
        "Started building an Azure solution based on an AI agent that acts as an internal consultant for a transport-sector company.",
      ],
    },
    {
      id: "cloud",
      title: "Jr. Cloud Architect",
      fullTitle: "Junior Cloud Architect",
      type: "Extracurricular internship",
      statusText: "In progress",
      note: "right here, right now",
      bullets: [
        "In progress: this will be completed at the end of the internship.",
        "Current project: {{mcp}}",
      ],
    },
    {
      id: "acm",
      sub: "Bachelor's thesis",
      statusText: "MVP validated",
      long: "A Critical Mind (Bachelor's thesis): a web application for browsing and analysing professional film reviews",
      problem:
        "On the most popular film platforms, professional reviews sit alongside thousands of non-expert opinions with no hierarchy at all, and end up overshadowed.",
      solution:
        "A web application where only verified critics can rate films and publish reviews, while viewers browse film pages, enjoy multimedia content (trailers, interviews and making-of videos) and vote reviews up or down to build a relevance ranking.",
      role: "Solo project, from the initial idea to user testing.",
      did: [
        "<b>Validating the need:</b> designed, distributed (in Spanish and English) and analysed surveys aimed at critics and viewers.",
        "<b>Legal and regulatory study:</b> rights over audiovisual material and personal data protection.",
        "<b>Analysis and design:</b> requirements, a three-tier client-server architecture and database modelling (ER and EER diagrams).",
        "<b>Java backend with Spring Boot:</b> entities, repositories, services and a REST API returning JSON; film catalogue loaded through web scraping, and YouTube IFrame API integration to embed videos without storing them.",
        "<b>Frontend</b> in HTML5, CSS3, JavaScript and Bootstrap, connected to the API with Fetch.",
        "<b>Testing:</b> API unit tests with Postman, frontend–backend integration tests, and full usability tests with real users for each profile.",
      ],
      stackText: ["Java", "Spring Boot", "MySQL", "REST API", "HTML5", "CSS3", "JavaScript", "Bootstrap", "Postman", "YouTube IFrame API"],
      result:
        "A working minimum viable product (MVP) with two user profiles and clearly separated permissions, validated with real users through end-to-end testing.",
      gallery: [
        { alt: "A Critical Mind sign-in screen" },
        { alt: "Film page with its rating and the voted reviews" },
      ],
    },
    {
      id: "demand",
      sub: "Electricity-sector company",
      statusText: "Deployed",
      long: "Demand Forecast for an Electricity-Sector Company",
      problem:
        "The company needed to anticipate the monthly demand for its products by customer and product reference from its sales history, and to receive those forecasts automatically and on a recurring basis.",
      role:
        "Team project in which I owned the deployment, automation and security of the solution in the cloud; the rest of the team handled data processing and modelling.",
      did: [
        "<b>Deployment on OCI Data Science:</b> a custom Conda environment published to Object Storage, scripts packaged as Jobs managed through the SDK and orchestrated in four Pipelines (data cleaning, training, retraining on the last three years, and consolidation and validation of results), with scheduled runs through Schedules.",
        "<b>Security:</b> authentication through Resource Principal, dynamic groups and IAM policies that grant only the permissions each service strictly needs (Jobs, Pipelines and Schedules).",
        "<b>Documentation:</b> complete technical documentation of the deployment so the solution can be reproduced and maintained.",
        "<b>Meetings</b> with the cloud provider (Oracle) and the client to coordinate requirements and the go-live of the deployment.",
      ],
      result:
        "An end-to-end cloud solution that automatically and periodically produces demand forecasts ready for the client to use, with no manual intervention.",
      privateNote: "The code is not public (client project). The diagram has been anonymised.",
    },
    {
      id: "mcp",
      title: "MCP Server",
      sub: "Queries against an LLM",
      statusText: "In development",
      note: "under construction",
      long: "MCP Server for Queries against an LLM",
      role:
        "In development: SSO authentication and a permission management system that decides which resources each user can access, which I am programming myself.",
      result: "The full write-up will be added once the project is finished.",
    },
    {
      id: "upm",
      title: "Computer Engineering",
      sub: "Universidad Politécnica de Madrid",
      statusText: "Graduated",
      note: "where it all began",
    },
    {
      id: "cursos",
      title: "Continuous learning",
      meta: "8 objects · 1 uploading",
      statusText: "Still growing",
    },
  ],

  /* Etiquetas de las conexiones, en el mismo orden que en data.js */
  edges: [{}, {}, {}, {}, { label: "evolution" }, {}, {}, { label: "thesis" }, { label: "continuous learning" }],

  tiers: [
    { label: "edge · profile" },
    { label: "subnet · experience" },
    { label: "subnet · projects" },
    { label: "storage · education" },
  ],

  courses: [
    {
      group: "Cloud, networking and infrastructure",
      items: [{ year: "In progress · expected 2027" }, {}, {}, {}],
    },
    {
      group: "Artificial intelligence and data",
    },
  ],

  stack: [
    { group: "Cloud", items: [
      { id: "oci", desc: "Complete, almost single-handed deployment of a demand forecasting solution with OCI Data Science (Jobs, Pipelines and Schedules), Object Storage, Autonomous Database and IAM." },
      { id: "gcp", desc: "Deployment of the MCP server infrastructure (Cloud Run, Cloud Storage and IAM) with Terraform." },
      { id: "azure", desc: "First steps building a solution based on an AI agent." },
    ]},
    { group: "Infrastructure as code", items: [
      { id: "terraform", desc: "Defining and deploying the MCP server's cloud infrastructure on GCP as code (Cloud Run, Cloud Storage buckets and IAM permissions)." },
    ]},
    { group: "Security and identity", items: [
      { id: "iam", name: "IAM · least privilege", desc: "Designing IAM policies on OCI that grant only the permissions each role strictly needs." },
      { id: "sso", full: "SSO and access control", desc: "Integrating single sign-on and programming per-user permission management in the MCP server (in development)." },
    ]},
    { group: "Containers and systems", items: [
      { id: "linux", full: "Linux (Ubuntu) and Bash", desc: "Deploying and managing Ubuntu virtual machines locally to work with Linux systems and the Bash shell." },
    ]},
    { group: "Languages", items: [
      { id: "python", desc: "The programming language I have used throughout both of my internships." },
      { id: "java", desc: "My main programming language during the degree and in the backend of my Bachelor's thesis ({{acm}})." },
      { id: "sql", desc: "Used throughout the degree to work with databases." },
    ]},
    { group: "Databases", items: [
      { id: "mysql", desc: "Relational database management system used throughout the degree and in my Bachelor's thesis ({{acm}})." },
      { id: "adb", desc: "Stores the sales history and the results of the {{demand}} project, read and written from OCI Jobs and Pipelines." },
    ]},
    { group: "Backend and frontend", items: [
      { id: "spring", desc: "Designing and building web applications, such as my Bachelor's thesis ({{acm}})." },
      { id: "rest", name: "REST APIs", desc: "Designing and building REST APIs that connect the database to the frontend in web applications, such as my Bachelor's thesis ({{acm}})." },
      { id: "web", full: "HTML5, CSS3, JavaScript and Bootstrap", desc: "Building web interfaces connected to a REST API, such as my Bachelor's thesis ({{acm}})." },
    ]},
    { group: "Other languages (secondary)", items: [
      { id: "c", desc: "Programming a mini shell with basic Linux commands such as “ls”." },
      { id: "matlab", desc: "Used in several courses during the degree." },
      { id: "prolog", desc: "Basic programs in one course during the degree." },
      { id: "r", desc: "Used in two courses during the degree to handle data, and also studied in complementary training." },
    ]},
  ],

  policiesIntro:
    'My main strengths, based on the results of the <a href="https://www.viacharacter.org/character-strengths" target="_blank" rel="noopener">VIA Character Strengths Survey</a>, a scientifically validated questionnaire developed by the VIA Institute on Character, and backed by real experience:',

  policies: [
    { action: "perseverance:*", name: "Perseverance and results orientation", text: "I finish what I start, despite the obstacles.", proof: "I deployed a complete project on OCI almost single-handedly ({{demand}}) and have been at the same club for more than 7 years." },
    { action: "learning:*", name: "Continuous learning and technical curiosity", text: "I keep myself up to date, through both formal training and self-study.", proof: "Complementary training (Coursera, Cisco, Santander, in-house courses) and the move from data science to cloud architecture." },
    { action: "creativity:SolveProblems", name: "Creativity applied to problem solving", text: "I look for new solutions and approaches.", proof: "The {{mcp}} for queries against an LLM, and this very portfolio." },
    { action: "team:Lead", name: "Leadership and teamwork", text: "I motivate a group towards a common goal while looking after relationships.", proof: "Badminton coach for groups of children and secondary school students." },
    { action: "communication:Explain", name: "Communication", text: "I explain complex concepts in a simple way.", proof: "Private maths tutor and coach." },
    { action: "security:LeastPrivilege", name: "Prudence and rigour in security", text: "I make decisions carefully and assess the risks before acting.", proof: "In {{demand}}, instead of granting broad policies, we defined the minimum ones we needed to do our job. In the {{mcp}}, I am designing SSO-based access control so that each person can access only what they need." },
    { action: "team:GoodVibes", name: "Approachability and sense of humour", text: "I help create a good atmosphere in the team.", proof: "It is my number one strength in the VIA survey. Open the console and try <code>terraform destroy</code> to see for yourself." },
  ],
};
