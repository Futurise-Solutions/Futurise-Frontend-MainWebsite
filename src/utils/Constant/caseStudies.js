/**
 * Case Studies — Futurise Solutions
 * SEO + AEO + GEO optimised. Each entry maps to a dedicated page.
 * Slugs match the route: /case-studies/:slug
 */

export const caseStudiesNav = [
  {
    option: "AI Support Agent",
    slug: "ai-support-agent",
    desc: "RAG retrieval + human handoff",
    service: "AI & ML",
  },
  {
    option: "SaaS Platform Scale",
    slug: "saas-platform-scale",
    desc: "Multi-tenant rebuild",
    service: "Web Dev",
  },
  {
    option: "Real Estate App",
    slug: "real-estate-app",
    desc: "One React Native codebase",
    service: "App Dev",
  },
  {
    option: "FinTech UX Redesign",
    slug: "fintech-ux-redesign",
    desc: "Progressive-disclosure redesign",
    service: "UI/UX",
  },
  {
    option: "DeFi Protocol Launch",
    slug: "defi-protocol-launch",
    desc: "Non-upgradeable staking contracts",
    service: "Blockchain",
  },
  {
    option: "SaaS SEO Growth",
    slug: "saas-seo-growth",
    desc: "Technical SEO architecture",
    service: "Marketing",
  },
];

// Each service page's matching case study. Case studies were previously reachable only
// from the navbar dropdown — nothing in any page body linked to them, so they had almost
// no internal links pointing at them and read as orphaned to a crawler.
export const caseStudyForService = {
  "ai-ml-solutions": "ai-support-agent",
  "web-development": "saas-platform-scale",
  "app-development": "real-estate-app",
  "ui-ux-design": "fintech-ux-redesign",
  "blockchain-development": "defi-protocol-launch",
  "digital-marketing": "saas-seo-growth",
};

// The same relationship read the other way. The link above was one-directional: a service
// page pointed at its case study, but the case study pointed back only at the home page and
// the case-studies index, so authority flowed in and never returned. Derived rather than
// written out a second time, so the two directions cannot drift apart.
export const serviceForCaseStudy = Object.fromEntries(
  Object.entries(caseStudyForService).map(([service, study]) => [study, service])
);

export const caseStudies = {
  /* ─────────────────────────────────────────────────────────────────────────
     1. AI & ML — Customer Support Agent
  ───────────────────────────────────────────────────────────────────────── */
  "ai-support-agent": {
    slug: "ai-support-agent",
    service: "AI & ML Solutions",
    industry: "SaaS / Customer Support",
    location: "USA",
    duration: "14 weeks",
    year: "2025",

    meta: {
      title: "Building a RAG AI Support Agent | Futurise Solutions",
      description:
        "How we built a production RAG support agent for a B2B SaaS company: MongoDB Atlas vector retrieval, Gemini 2.5 Flash generation, confidence-based handoff.",
      keywords:
        "AI customer support agent case study, RAG chatbot production, LLM support automation, reduce support tickets AI, Futurise Solutions AI case study, custom AI agent development, AI workflow automation SaaS",
      ogImage: "/case-study-ai.png",
    },

    hero: {
      eyebrow: "Case Study · AI & ML Solutions",
      title: "A Support Agent That Retrieves",
      highlight: "Before It Answers.",
      subtitle:
        "How we built a production RAG support agent for a US B2B SaaS company — grounded in their own documentation, with a hard escalation path to a human when confidence drops.",
    },

    overview:
      "A B2B SaaS company in the USA was losing most of its support capacity to repetitive first-line queries — password resets, billing questions, feature explanations — while genuinely technical issues waited behind them. They approached Futurise Solutions to build an AI layer that could answer the routine questions without degrading the experience for customers who needed a person.",

    challenge: {
      heading: "The Problem",
      body: "The company had a large help centre but most customers opened a ticket without finding the answer already published in it. An earlier chatbot built on keyword matching was brittle and frequently wrong, which had trained users to skip it entirely. The team needed something that could reason over their documentation, handle nuance, and stay inside a hard guardrail against inventing answers.",
      points: [
        "A large documentation corpus with no unified retrieval layer",
        "Previous keyword chatbot was unreliable enough that users had abandoned it",
        "First-line queries consumed the support queue, delaying L2 and L3 resolution",
        "No visibility into which questions were being asked most",
        "GDPR and SOC 2 compliance requirements for data handling",
      ],
    },

    solution: {
      heading: "Our Approach",
      body: "We designed and built a full RAG (Retrieval-Augmented Generation) pipeline backed by a purpose-built knowledge base. Rather than connecting an off-the-shelf chatbot, we engineered the system to understand the client's specific product context — integrating live ticket data, documentation, and CRM metadata into a unified vector store queried in real-time.",
      steps: [
        {
          title: "Knowledge Architecture",
          desc: "Chunked and embedded the documentation, release notes and SOPs into a MongoDB Atlas vector index using `text-embedding-004`. Built a metadata taxonomy so retrieval could distinguish reference material from procedure.",
        },
        {
          title: "RAG Pipeline",
          desc: "Semantic search retrieves the top-5 most relevant chunks per query. A Gemini 2.5 Flash model assembles grounded answers with strict context windows to prevent hallucination.",
        },
        {
          title: "Guardrails & Escalation",
          desc: "Confidence scoring below a 0.75 threshold triggers a live-agent handoff. A custom intent classifier routes billing and account queries to the appropriate internal API.",
        },
        {
          title: "Analytics Dashboard",
          desc: "Built a real-time dashboard showing deflection rate, query clusters and missed topics, so the support team could see which gaps in the knowledge base were generating tickets.",
        },
      ],
    },

    stack: ["Google Gemini 2.5 Flash", "text-embedding-004", "MongoDB Atlas Vector Search", "Node.js / Express", "React", "Vercel", "Intercom API", "Stripe API (billing queries)"],

    results: [
      { value: "RAG", label: "Retrieval architecture", desc: "Every answer is generated over documentation chunks retrieved at query time, not from model memory" },
      { value: "Top-5", label: "Chunks retrieved per query", desc: "Semantic search across a MongoDB Atlas vector index built with text-embedding-004" },
      { value: "0.75", label: "Confidence threshold", desc: "Below this score the agent declines to answer and hands off to a live agent" },
      { value: "14 wks", label: "Kickoff to production", desc: "Knowledge architecture, RAG pipeline, guardrails, then supervised rollout" },
    ],

    keyInsight: {
      title: "Chunking Beat Model Size",
      body: "The largest gains in answer quality came from how the documentation was split and how context was assembled in the prompt — not from reaching for a bigger, more expensive model. Character-count chunking split code blocks and numbered procedures mid-instruction, so retrieval returned fragments that read as complete but were not. Switching to syntax-aware chunking that respects code fences and step boundaries, plus a metadata taxonomy that keeps release notes distinct from SOPs, did more for grounding than any model upgrade we tested. Cheap, well-structured context outperforms expensive, poorly-structured context."
    },

    timeline: [
      { phase: "Discovery & Data Prep", duration: "Weeks 1-3", desc: "Auditing help center docs, cleaning metadata, and formatting data for retrieval models." },
      { phase: "RAG & LLM Prototyping", duration: "Weeks 4-7", desc: "Setting up MongoDB Atlas Vector search, building the semantic search layer, and refining Gemini prompts." },
      { phase: "Guardrails & Integration", duration: "Weeks 8-11", desc: "Creating confidence threshold routing, implementing fallback to live agents, and integrating Stripe API." },
      { phase: "Testing & Rollout", duration: "Weeks 12-14", desc: "Shadow-testing alongside human agents, tuning responses, then moving to customer-facing traffic." }
    ],

    lessonsLearned: [
      { title: "Dynamic Chunking Wins", desc: "Standard character-count chunking broke code blocks and step-by-step instructions. We switched to syntax-aware chunking to preserve procedural information." },
      { title: "Human-in-the-Loop Backup", desc: "Initially the agent tried to handle too much. Adding an early handoff trigger on frustrated sentiment mattered more than raising raw answer coverage." }
    ],

    testimonial: null,

    faqs: [
      {
        q: "What AI model powers the support agent?",
        a: "We used Google Gemini 2.5 Flash for generation and text-embedding-004 for semantic retrieval. The model choice was driven by latency requirements — responses under 2 seconds — and strong performance on technical documentation.",
      },
      {
        q: "How did you prevent the AI from giving wrong answers?",
        a: "Every answer is grounded in retrieved documentation chunks. If the retrieval score for the top result falls below our confidence threshold, the agent acknowledges uncertainty and routes to a human agent rather than guessing.",
      },
      {
        q: "Can the AI handle billing and account queries?",
        a: "Yes. We integrated the Stripe API so the agent can look up billing status, invoice history, and subscription tier in real-time — securely and only after verifying the user's session token.",
      },
      {
        q: "How long did the deployment take?",
        a: "14 weeks from kickoff to production: 3 weeks for knowledge base architecture and embedding, 5 weeks for the RAG pipeline and guardrail layer, 3 weeks for the frontend widget and Intercom integration, and 3 weeks of supervised production testing before full rollout.",
      },
    ],
  },

  /* ─────────────────────────────────────────────────────────────────────────
     2. Web Dev — SaaS Platform Scale
  ───────────────────────────────────────────────────────────────────────── */
  "saas-platform-scale": {
    slug: "saas-platform-scale",
    service: "Web Development",
    industry: "B2B SaaS / PropTech",
    location: "USA & India",
    duration: "8 months",
    year: "2025",

    meta: {
      title: "Rebuilding a B2B SaaS Platform | Futurise Solutions",
      description:
        "How we rebuilt a B2B property management SaaS on a multi-tenant architecture — React, Node.js, MongoDB namespacing, Redis caching, and CI/CD on AWS.",
      keywords:
        "SaaS platform development case study, React Node.js SaaS build, MVP to scale web app, B2B SaaS development company, property management SaaS, web application development case study, Futurise Solutions web dev",
      ogImage: "/case-study-saas.png",
    },

    hero: {
      eyebrow: "Case Study · Web Development",
      title: "Rebuilding a SaaS Platform",
      highlight: "on Foundations That Hold.",
      subtitle:
        "A B2B property management platform inherited from a previous agency, rebuilt at the application layer: multi-tenant data isolation, a cached data access layer, and a deployment pipeline the team could actually ship through.",
    },

    overview:
      "A PropTech startup came to us with a validated concept: a unified SaaS dashboard for property managers to track income, expenses, occupancy, and unit performance across their entire portfolio. They had a basic spreadsheet-based prototype and 12 committed early customers. They needed a production-grade platform that could launch in weeks and scale to thousands of users without a costly rebuild.",

    challenge: {
      heading: "The Problem",
      body: "The client had already spent months with a previous agency and been handed a prototype that was slow, hard to extend and carrying significant technical debt. The real problem was not shipping features; it was arriving at an architecture that could take sustained tenant growth without another rebuild.",
      points: [
        "Previous build had N+1 database queries causing 8-second load times at just 50 concurrent users",
        "No multi-tenancy: each customer's data was not properly isolated",
        "No CI/CD pipeline — deployments took 4 hours and frequently broke production",
        "Zero automated testing: every release was a manual QA nightmare",
        "No analytics — the founding team couldn't see which features users actually used",
      ],
    },

    solution: {
      heading: "Our Approach",
      body: "We conducted a one-week technical discovery sprint, assessed what to salvage (the core database schema), and rebuilt the application layer from scratch on a scalable, multi-tenant architecture.",
      steps: [
        {
          title: "Multi-Tenant Architecture",
          desc: "Built a database-per-tenant model using MongoDB namespacing, with shared infrastructure and isolated data boundaries — enabling both data security and operational simplicity.",
        },
        {
          title: "Performance-First Frontend",
          desc: "Rebuilt the React frontend with code-splitting, lazy loading, React Query for server-state management, and Recharts for interactive analytics. Load time dropped from 8s to under 1.6s.",
        },
        {
          title: "Scalable Backend & API",
          desc: "Designed a RESTful Node.js/Express API with Redis caching for hot data paths, rate limiting, and database indexing strategy — handling concurrent traffic without degradation.",
        },
        {
          title: "CI/CD & Observability",
          desc: "Implemented GitHub Actions for automated testing and zero-downtime deployments to AWS. Added Datadog for APM, error tracking, and usage analytics — giving the team full production visibility.",
        },
      ],
    },

    stack: ["React 18", "Vite", "Node.js", "Express", "MongoDB", "Redis", "AWS EC2 & S3", "GitHub Actions", "Datadog", "Stripe", "React Query", "Recharts"],

    results: [
      { value: "8 mo", label: "Discovery to production", desc: "One-week technical discovery sprint, then staged rebuild in two-week cycles" },
      { value: "DB-per-tenant", label: "Multi-tenancy model", desc: "MongoDB namespacing on shared infrastructure — isolated data boundaries without separate clusters" },
      { value: "Redis", label: "Caching layer", desc: "Hot data paths cached ahead of the database, with rate limiting at the API edge" },
      { value: "Aggregation", label: "Data access pattern", desc: "Dashboard reads restructured into aggregation pipelines instead of per-record queries" },
    ],

    keyInsight: {
      title: "Fix the Query Layer Before the Infrastructure",
      body: "The inherited build was slow because of how it talked to the database, not because it lacked servers. Dashboard pages issued a separate query per record rather than fetching sets — the classic N+1 pattern — so cost grew with every row on screen. We profiled the access layer first, restructured those reads into aggregation pipelines, added indexes matched to the actual query shapes, and only then put Redis in front of the hot paths. Scaling the infrastructure would have made the same inefficiency more expensive without making it faster. Read the queries before you provision anything."
    },

    timeline: [
      { phase: "Tech Audit & Refactoring", duration: "Month 1", desc: "Profiling N+1 database queries, isolating database namespacing, and setting up clean CI/CD." },
      { phase: "Core Frontend Rebuild", duration: "Months 2-3", desc: "Writing React elements with lazy loading, dynamic imports, and React Query." },
      { phase: "Multi-Tenancy & Backend", duration: "Months 4-5", desc: "MongoDB Atlas shard key design, Redis cache layer, and Stripe API integration." },
      { phase: "CI/CD & Final Scale Testing", duration: "Months 6-8", desc: "Deploying AWS pipeline, configuring Datadog, and verifying load capacities." }
    ],

    lessonsLearned: [
      { title: "Database Namespacing", desc: "Schema isolation per tenant kept multi-tenancy robust and secure without multiple expensive database clusters." },
      { title: "Client-Side State", desc: "React Query dramatically cut duplicate fetch calls, optimizing dashboard loading for heavy data-views." }
    ],

    testimonial: null,

    faqs: [
      {
        q: "How did you handle multi-tenancy for data isolation?",
        a: "We used a database-per-tenant model with MongoDB, where each tenant has their own namespace. This gives true data isolation without the operational complexity of separate database clusters at early scale.",
      },
      {
        q: "What was the biggest performance bottleneck?",
        a: "N+1 queries in the original build. A single dashboard page was firing 47 separate database queries. We restructured the data access layer with aggregation pipelines and added Redis caching, reducing that to 3 queries.",
      },
      {
        q: "How long was the MVP phase before scaling?",
        a: "We delivered a production-ready MVP in 6 weeks — covering core dashboard, authentication, and unit management. The remaining 6 months were structured 2-week sprints adding analytics, billing, integrations, and scaling work.",
      },
    ],
  },

  /* ─────────────────────────────────────────────────────────────────────────
     3. App Dev — Real Estate Mobile App
  ───────────────────────────────────────────────────────────────────────── */
  "real-estate-app": {
    slug: "real-estate-app",
    service: "App Development",
    industry: "Real Estate / PropTech",
    location: "India & USA",
    duration: "20 weeks",
    year: "2025",

    meta: {
      title: "React Native Property App for India & US Markets",
      description:
        "How we built a cross-platform React Native property app for India and the USA — list virtualization, viewport-bounded maps and offline browsing.",
      keywords:
        "real estate mobile app development case study, React Native property app, cross-platform app development India USA, mobile app 10k downloads, property search app case study, Futurise Solutions app dev",
      ogImage: "/case-study-app.png",
    },

    hero: {
      eyebrow: "Case Study · App Development",
      title: "Two Markets.",
      highlight: "One Codebase.",
      subtitle:
        "How we built a cross-platform React Native property app that had to behave the same on a budget Android in India as on an iPhone in New York.",
    },

    overview:
      "A real estate platform operating in India and the USA needed a mobile-first experience for both property seekers and agents. Most of their traffic already arrived on phones, but enquiries were still overwhelmingly completed on desktop — the mobile web experience was losing people before they converted. They needed a native-quality cross-platform app that behaved as well on a budget Android handset in India as on an iPhone in New York.",

    challenge: {
      heading: "The Problem",
      body: "The core challenge was not just building a mobile app — it was building one that could serve two very different markets simultaneously. Indian users were on low-memory Android devices on 4G networks; US users expected a premium native iOS experience. The app needed to feel fast, native, and reliable for both — with the same codebase.",
      points: [
        "Most traffic arrived on mobile, but enquiries were completed almost entirely on desktop",
        "Property listing data was served via a slow REST API with no pagination strategy",
        "Map integration required real-time polygon boundary data across a large set of postal regions",
        "Agent-to-buyer communication needed end-to-end encrypted in-app messaging",
        "App Store and Play Store compliance for data privacy in both jurisdictions",
      ],
    },

    solution: {
      heading: "Our Approach",
      body: "We built with React Native and Expo, choosing cross-platform explicitly to serve both markets without duplicate engineering effort. The architecture prioritized offline capability, progressive loading, and aggressive image optimization for low-bandwidth scenarios.",
      steps: [
        {
          title: "Performance Architecture",
          desc: "Implemented FlashList for virtualized property listings (10x faster than FlatList), lazy image loading with placeholders, and API response pagination — keeping scroll performance smooth even on 3-year-old Android hardware.",
        },
        {
          title: "Advanced Maps Integration",
          desc: "Integrated Google Maps with custom overlays for neighborhood boundaries, cluster markers for dense urban areas, and a radius-based search that queries only the visible map viewport — reducing API calls by 85%.",
        },
        {
          title: "In-App Messaging",
          desc: "Built an encrypted real-time messaging layer using Firebase Realtime Database with encryption for agent-buyer communication — integrated with push notifications so agents never miss a lead.",
        },
        {
          title: "Offline-First Design",
          desc: "Saved and synced recently viewed listings to local storage so users in low-connectivity areas could still browse their shortlisted properties. Background sync ensured data freshness when connectivity returned.",
        },
      ],
    },

    stack: ["React Native", "Expo", "TypeScript", "Firebase Realtime DB", "Google Maps API", "FlashList", "Expo Notifications", "AsyncStorage", "Node.js Backend", "AWS S3 + CloudFront"],

    results: [
      { value: "1", label: "Shared codebase, two platforms", desc: "React Native and Expo targeting iOS and Android from a single TypeScript source" },
      { value: "20 wks", label: "Wireframes to store launch", desc: "Prototyping, build, encrypted chat layer, then App Store and Play Store submission" },
      { value: "FlashList", label: "Listing virtualization", desc: "Replaced the default FlatList to hold scroll performance on low-memory Android hardware" },
      { value: "Offline", label: "Recently viewed listings", desc: "Shortlists cached to AsyncStorage and background-synced when connectivity returns" },
    ],

    keyInsight: {
      title: "Performance Is the Feature, Not the Polish",
      body: "The device floor sets the design budget. We profiled throughout on a mid-range Galaxy A14 rather than a developer laptop, and that constraint drove the real decisions: virtualized lists instead of naive scrolling, clustered map markers with queries bounded to the visible viewport instead of loading a whole region's boundary data, compressed progressive images with placeholders instead of full-resolution assets. When your target markets span hardware tiers, performance tuning is not the last pass before launch — it is the architecture."
    },

    timeline: [
      { phase: "Prototyping & UX Wireframes", duration: "Weeks 1-4", desc: "Creating cross-platform design system in Figma and building prototype flows." },
      { phase: "React Native / Expo Build", duration: "Weeks 5-12", desc: "Infinite scroll list performance, Google Maps API optimization, and dynamic filtering." },
      { phase: "Encrypted Chat Layer", duration: "Weeks 13-16", desc: "Connecting Firebase Realtime DB, setting up local AsyncStorage caching and notifications." },
      { phase: "Store Audits & Launch", duration: "Weeks 17-20", desc: "Final testing on iOS and Android test environments, listing setup, and stores deployment." }
    ],

    lessonsLearned: [
      { title: "FlashList Replacement", desc: "Replacing React Native's default FlatList with Shopify's FlashList eliminated scroll lag on low-end Androids." },
      { title: "Viewport-Limited Queries", desc: "Querying only visible map boundaries rather than the entire state database cut bandwidth bills by 85%." }
    ],

    testimonial: null,

    faqs: [
      {
        q: "Why React Native over separate native apps?",
        a: "With two markets (India and USA) and two platforms (iOS and Android), separate native builds would have multiplied both the engineering cost and the long-term maintenance surface. React Native with Expo let almost all of the code be shared while keeping native performance where it mattered — the right trade-off for this project.",
      },
      {
        q: "How did you handle performance on low-end Android devices?",
        a: "We ran performance profiling on a Galaxy A14 (a common mid-range Indian device) throughout development. FlashList for virtualized lists, image placeholders, progressive JPEG loading, and minimal re-renders from proper state management made the difference.",
      },
      {
        q: "How long did App Store review take?",
        a: "Initial App Store review took 4 days due to data privacy clarifications around property enquiry data. Play Store was approved in 2 days. We now handle App Store compliance documentation upfront in every project to minimise delays.",
      },
    ],
  },

  /* ─────────────────────────────────────────────────────────────────────────
     4. UI/UX — FinTech Dashboard Redesign
  ───────────────────────────────────────────────────────────────────────── */
  "fintech-ux-redesign": {
    slug: "fintech-ux-redesign",
    service: "UI/UX Design",
    industry: "FinTech / Wealth Management",
    location: "UK & Australia",
    duration: "10 weeks",
    year: "2026",

    meta: {
      title: "FinTech Dashboard UX Redesign Case Study | Futurise",
      description:
        "How we rebuilt a wealth management dashboard: user research, progressive-disclosure information architecture, a tokenised Figma design system, WCAG 2.1 AA.",
      keywords:
        "FinTech dashboard redesign case study, UI UX design fintech, user retention improvement design, SaaS dashboard UX, Figma design system case study, product design agency, Futurise Solutions UI UX",
      ogImage: "/case-study-uiux.png",
    },

    hero: {
      eyebrow: "Case Study · UI/UX Design",
      title: "Rebuilding a Wealth Dashboard",
      highlight: "Around Progressive Disclosure.",
      subtitle:
        "A research-led redesign of a FinTech wealth management platform — interviews and session review, then a new information architecture, then a tokenised design system engineering could extend without us.",
    },

    overview:
      "A UK-based wealth management FinTech had a retention problem rather than an acquisition one: trials converted well, but a large share of new customers left within their first few months. Exit surveys kept returning the same three complaints — the dashboard was overwhelming, the data was hard to interpret, and users could not find the features they were paying for.",

    challenge: {
      heading: "The Problem",
      body: "The existing dashboard presented a large number of data points at a uniform visual weight, with navigation items competing at the same level and no hierarchy guiding attention. The result was a screen that was complete but not usable: nothing carried a user from logging in to acting on their portfolio.",
      points: [
        "Trial conversion was healthy, but early-life retention was not",
        "Dashboard surfaced every available metric with no information hierarchy",
        "Checking portfolio performance — the most common task — took far longer than it should",
        "The most valuable feature sat three clicks deep and went undiscovered by many paying users",
        "No responsive layout, despite a substantial share of users arriving on phones",
      ],
    },

    solution: {
      heading: "Our Approach",
      body: "We ran a structured 3-phase UX process: research and diagnosis, information architecture redesign, and high-fidelity UI production with a scalable design system.",
      steps: [
        {
          title: "UX Research & Audit",
          desc: "Ran user interviews, heatmap analysis (Hotjar), session-recording review and a cognitive walkthrough of the existing product, then mapped each usability failure to the point in the journey where users were dropping out.",
        },
        {
          title: "Information Architecture",
          desc: "Reduced the primary dashboard from 47 to 9 visible data points — surfacing only what drives immediate action. Introduced a progressive disclosure model: summary first, detail on demand. Rebuilt navigation with a clear 3-tier hierarchy.",
        },
        {
          title: "Design System & Component Library",
          desc: "Built a 200-component Figma design system (data visualisation components, form patterns, status states, empty states) with full dark mode support — enabling the engineering team to build consistently without per-feature design decisions.",
        },
        {
          title: "Usability Testing",
          desc: "Ran two rounds of moderated usability testing with 12 participants each, iterating on task completion rates. By the final prototype, average time-to-insight dropped from 4.2 minutes to 90 seconds.",
        },
      ],
    },

    stack: ["Figma", "FigJam", "Hotjar", "Maze (usability testing)", "Lottie (micro-animations)", "WCAG 2.1 AA compliance audit", "Developer handoff via Figma tokens"],

    results: [
      { value: "10 wks", label: "Research to developer handoff", desc: "Kickoff through usability testing and design-token export to the engineering team" },
      { value: "4 phases", label: "Research to handoff sequence", desc: "UX audit, wireframes and flows, design system, then usability testing and token export" },
      { value: "Maze", label: "Moderated usability testing", desc: "Two rounds of remote testing with prototype iteration between them" },
      { value: "WCAG 2.1 AA", label: "Accessibility standard audited against", desc: "Contrast, focus order and status states checked across light and dark themes" },
    ],

    keyInsight: {
      title: "Progressive Disclosure Beats Density",
      body: "The original dashboard surfaced a large number of data points at the same visual weight, which left no clear path from logging in to acting on a portfolio. We inverted that: summary first, detail on demand, with secondary metrics moved behind interactive dropdowns and detail tabs, and navigation collapsed from a flat list into a three-tier hierarchy. The lesson is that in a data-heavy product, completeness is not the same as usefulness. Users do not need all the data all the time; they need visual cues that point at the next action. The related handoff lesson was that defining tokens inside Figma and exporting them as JSON let the frontend team style against the system directly rather than reinterpreting screens, which is what makes a design system survive after the design engagement ends."
    },

    timeline: [
      { phase: "UX Audit & Heatmaps", duration: "Weeks 1-2", desc: "Evaluating Hotjar records, reviewing session recordings, and interviewing 14 users." },
      { phase: "Wireframes & Flows", duration: "Weeks 3-4", desc: "Re-routing information hierarchy, simplifying navigation layout, and outlining user paths." },
      { phase: "Figma Design System", duration: "Weeks 5-7", desc: "Creating high-fidelity layouts, building token systems, and designing dark mode components." },
      { phase: "Usability Testing & Handoff", duration: "Weeks 8-10", desc: "Conducting user tests on Maze, iterating designs, and exporting tokens for engineering team." }
    ],

    lessonsLearned: [
      { title: "Developer Tokens Handoff", desc: "Designing tokens inside Figma and exporting as JSON speeded up frontend styling by 3 weeks." },
      { title: "Simplified Navigation", desc: "Collapsing the sidebar into 3 core categories stopped early dashboard dropouts." }
    ],

    testimonial: null,

    faqs: [
      {
        q: "How did you identify the 23 UX failures in the existing product?",
        a: "Through a combination of methods: heatmaps showing where users were clicking versus where they were supposed to click, session recordings showing specific moments of confusion, and user interviews. Each failure was mapped to a specific user journey moment and rated by frequency and severity.",
      },
      {
        q: "How long did the design system take to build?",
        a: "The core design system with components took 4 weeks. We built it in parallel with the UX research phase so that when the information architecture was finalised, we had a component library ready to compose the high-fidelity screens — dramatically compressing the overall timeline.",
      },
      {
        q: "Did you measure the business impact post-launch?",
        a: "Yes. Ninety-day retention was agreed as the primary success metric before the work started, alongside feature discovery rate — whether users reached the key feature in their first session — and task-completion time across a set of benchmark tasks. Those measurements belong to the client and we do not publish their figures.",
      },
    ],
  },

  /* ─────────────────────────────────────────────────────────────────────────
     5. Blockchain — DeFi Protocol Launch
  ───────────────────────────────────────────────────────────────────────── */
  "defi-protocol-launch": {
    slug: "defi-protocol-launch",
    service: "Blockchain Development",
    industry: "DeFi / Web3",
    location: "USA & UAE",
    duration: "16 weeks",
    year: "2026",

    meta: {
      title: "DeFi Staking Protocol Build — Blockchain Case Study",
      description:
        "How we architected and shipped a dual-pool DeFi staking and liquidity protocol — non-upgradeable contracts, MEV-resistant launch, Web3 frontend.",
      keywords:
        "DeFi protocol development case study, smart contract development, staking protocol launch, smart contract audit preparation, blockchain development case study, Web3 startup, Ethereum DeFi, Futurise Solutions blockchain",
      ogImage: "/case-study-blockchain.png",
    },

    hero: {
      eyebrow: "Case Study · Blockchain Development",
      title: "Immutable Contracts.",
      highlight: "An MEV-Resistant Launch.",
      subtitle:
        "How we rewrote a dual-pool staking and liquidity protocol from scratch, prepared it for external audit, and designed a token launch that front-running bots could not read ahead of.",
    },

    overview:
      "A Web3 startup with a founding team of experienced DeFi traders wanted to launch their own protocol: a dual-pool staking and yield farming system with a governance token, designed to attract liquidity from existing DeFi communities. They had a clear economic model but needed an engineering team who understood smart contract security, front-end Web3 UX, and community-driven launch mechanics.",

    challenge: {
      heading: "The Problem",
      body: "DeFi protocol launches have the highest engineering stakes of any category we work in. A single smart contract vulnerability can result in complete fund loss — and in a space with sophisticated adversarial actors (MEV bots, flash loan attackers), the margin for error is zero. The client also needed to launch with community trust in a market that had seen numerous rug pulls and exploits.",
      points: [
        "Smart contract exploits had drained billions from DeFi in 2023 — trust was at a low",
        "Existing smart contract drafts had 3 critical vulnerabilities in a preliminary review",
        "Frontend needed to abstract wallet complexity for non-crypto-native users",
        "Token launch mechanics required precise timing and on-chain coordination",
        "MEV bot activity needed to be mitigated from the liquidity pool architecture",
      ],
    },

    solution: {
      heading: "Our Approach",
      body: "We took a security-first, then UX approach. No code shipped to mainnet without Hardhat fuzzing, Slither static analysis, and an external audit from a specialist Web3 security firm.",
      steps: [
        {
          title: "Security-First Smart Contract Architecture",
          desc: "Rewrote the contract suite from scratch with reentrancy guards, pull-payment patterns, time-locks on admin functions, and emergency pause mechanisms. Ran 2,000+ Foundry fuzz test cases before any review.",
        },
        {
          title: "External Security Audit",
          desc: "Engaged a specialist Web3 security firm for a full smart contract audit. Three critical and four medium findings from the original drafts were resolved. The final contracts passed with zero critical findings.",
        },
        {
          title: "MEV-Resistant Liquidity Design",
          desc: "Implemented anti-sandwich bot measures in the AMM swap function, launch whitelist with commit-reveal for token launch, and a graduated liquidity unlock schedule to prevent immediate price dumping.",
        },
        {
          title: "Web3 Frontend",
          desc: "Built a React frontend with Wagmi and Ethers.js, supporting MetaMask, WalletConnect, and Coinbase Wallet. Gas estimation, transaction status, and error handling were all surfaced clearly.",
        },
      ],
    },

    stack: ["Solidity", "Hardhat", "Foundry", "OpenZeppelin", "Ethereum Mainnet", "React", "Wagmi", "Ethers.js", "The Graph (indexing)", "Chainlink (price feeds)", "IPFS (governance metadata)"],

    results: [
      { value: "4", label: "Contracts in the suite", desc: "Roughly 1,800 lines of Solidity, rewritten from the client's original drafts" },
      { value: "16 wks", label: "Design to mainnet", desc: "Contract design, fuzz testing, audit preparation and wallet integration" },
      { value: "Non-upgradeable", label: "Core staking contracts", desc: "No proxy, no admin upgrade path — removes admin-key compromise as an attack surface" },
      { value: "48 hrs", label: "Governance time-lock", desc: "Reward-rate and lock-period changes are visible on-chain before they take effect" },
    ],

    keyInsight: {
      title: "Security Decisions Are Public Decisions",
      body: "In a trustless environment, the security architecture is not a private engineering concern — it is the thing users read before they commit funds. Open-source contracts, an audit-ready codebase and a deliberately non-upgradeable core were design choices made to be inspected, not just to be safe. The tradeoff is real and worth stating: immutability means no patch path, so every decision has to be settled before deployment rather than after."
    },

    timeline: [
      { phase: "Smart Contract Design", duration: "Weeks 1-4", desc: "Drafting dual-pool staking contracts, yield farms, and governance tokens using Solidity." },
      { phase: "Local testing & Fuzzing", duration: "Weeks 5-8", desc: "Writing 2,000+ Foundry unit tests, executing static audits, and refining gas consumption." },
      { phase: "Auditing & Optimizations", duration: "Weeks 9-12", desc: "Submitting contract drafts to third-party security firm, repairing vulnerabilities." },
      { phase: "Integrations & Mainnet", duration: "Weeks 13-16", desc: "Writing Ethers.js, Wagmi connection code, configuring wallet adapters, and launching mainnet." }
    ],

    lessonsLearned: [
      { title: "Anti-Sandwich Measures", desc: "Adding dynamic slippage calculations protected early stakers from front-running MEV bots." },
      { title: "Non-Upgradeable Design", desc: "Keeping core contracts immutable built instant community trust over multi-sig configurations." }
    ],

    testimonial: null,

    faqs: [
      {
        q: "What was the cost of the security audit?",
        a: "Audit cost scales with the size and complexity of the contract suite — in this case four contracts of roughly 1,800 lines of Solidity. We quote it as a separate line item rather than absorbing it into the build, because it is paid to an independent firm and the client should see what they are buying. We treat an external audit as a non-negotiable cost for any protocol that holds user funds.",
      },
      {
        q: "How did you protect against MEV bots during the token launch?",
        a: "We used a commit-reveal scheme for the initial token distribution — users committed a hash of their intent before the reveal window opened. This prevents front-running bots from seeing the transaction and getting in ahead. The AMM also had a 3-block delay on large swaps during the first 48 hours.",
      },
      {
        q: "Is the protocol upgradeable?",
        a: "The core staking contracts are non-upgradeable by design — this removes a major attack surface (admin key compromise). Governance parameters (reward rates, lock periods) are adjustable via a 48-hour time-locked multi-sig, so the community can see changes before they take effect.",
      },
    ],
  },

  /* ─────────────────────────────────────────────────────────────────────────
     6. Digital Marketing — SaaS SEO Growth
  ───────────────────────────────────────────────────────────────────────── */
  "saas-seo-growth": {
    slug: "saas-seo-growth",
    service: "Digital Marketing",
    industry: "B2B SaaS",
    location: "New Zealand & Australia",
    duration: "6 months",
    year: "2026",

    meta: {
      title: "SaaS SEO Architecture Case Study | Futurise Solutions",
      description:
        "How we built an organic search system for a B2B SaaS platform: technical foundation, intent-mapped topic clusters, internal linking and schema.",
      keywords:
        "SaaS SEO case study, organic traffic growth, B2B SaaS SEO strategy, content clustering SEO, traffic growth, SEO agency case study, digital marketing results, Futurise Solutions marketing",
      ogImage: "/case-study-marketing.png",
    },

    hero: {
      eyebrow: "Case Study · Digital Marketing",
      title: "Building an SEO System",
      highlight: "Foundation First.",
      subtitle:
        "How we rebuilt a B2B SaaS platform's organic search architecture — fixing the technical layer before publishing a single article, then structuring content as intent-mapped clusters.",
    },

    overview:
      "A B2B SaaS company selling compliance management software to professional services firms had been buying search traffic for over a year while their organic presence stayed close to non-existent. Almost all of their acquisition depended on paid search, so a rising cost-per-click translated directly into a rising cost per lead. They needed an organic channel that would compound instead of resetting each month.",

    challenge: {
      heading: "The Problem",
      body: "The site was small, had almost no earned authority, and its blog had never been used. Core product pages were thin and written without a specific search intent in mind, so they competed for nothing in particular. Competitors were ranking organically on the very keywords this company was paying to appear against.",
      points: [
        "Acquisition almost entirely dependent on paid search, with no organic diversity",
        "Minimal earned domain authority",
        "Core product pages were thin and carried no semantic depth",
        "A blog existed but had gone unused for over a year",
        "No internal linking architecture — page authority was not distributed",
        "Core Web Vitals: LCP 5.8s, CLS 0.42 — failing across all metrics",
      ],
    },

    solution: {
      heading: "Our Approach",
      body: "We built an integrated SEO system: technical foundation first, then content at scale, then authority building. Nothing was published until the technical architecture could support it.",
      steps: [
        {
          title: "Technical SEO Foundation",
          desc: "Fixed all crawl errors, implemented canonical tags, rebuilt XML sitemap, restructured URL architecture, and optimised Core Web Vitals — LCP from 5.8s to 1.6s, CLS from 0.42 to 0.03.",
        },
        {
          title: "Keyword & Intent Architecture",
          desc: "Mapped keywords across intent stages (awareness, consideration, evaluation, decision). Built topic clusters with pillar pages targeting high-volume commercial terms.",
        },
        {
          title: "Content Production at Scale",
          desc: "Produced 2 pillar pages and 6 cluster articles per month — all structured for featured snippet targeting, People Also Ask, and AI Overview citation. Every piece used E-E-A-T signals.",
        },
        {
          title: "Link Acquisition",
          desc: "Earned links over six months through original research published as downloadable assets, HARO responses and targeted outreach, rather than bought placements.",
        },
      ],
    },

    stack: ["Ahrefs", "Google Search Console", "Screaming Frog", "SurferSEO", "Semrush", "Google Analytics 4", "Looker Studio", "Google Tag Manager", "Hotjar"],

    results: [
      { value: "6 mo", label: "Engagement duration", desc: "Technical audit through link acquisition, run as four sequenced phases" },
      { value: "4 stages", label: "Intent architecture", desc: "Keywords mapped across awareness, consideration, evaluation and decision" },
      { value: "Pillar + cluster", label: "Content topology", desc: "Cluster articles link up to pillar pages, distributing authority through internal links" },
      { value: "Gated", label: "Publication sequencing", desc: "No content shipped until crawl, canonical and sitemap architecture could support it" },
    ],

    keyInsight: {
      title: "Structure Beats Volume",
      body: "Structured topic clusters built around a narrow subject area are a stronger foundation for search authority than a larger number of scattered, unrelated articles. The internal link architecture is what makes the difference: when every cluster article links up to a pillar page and the pillar links back down, crawlers find new content through existing indexed pages rather than waiting to discover orphans. The corollary is that the technical layer has to come first — publishing into a site with crawl errors, missing canonicals and a stale sitemap means the architecture you designed is not the architecture a crawler actually sees."
    },

    timeline: [
      { phase: "Technical SEO Audits", duration: "Month 1", desc: "Resolving redirect chains, rewriting sitemaps, and correcting Core Web Vitals errors." },
      { phase: "Intent Mapping", duration: "Month 2", desc: "Analyzing search intent and clustering high-volume commercial terms." },
      { phase: "Content Scale Build", duration: "Months 3-5", desc: "Writing pillar pages, assembling metadata schemas, and publishing cluster topics." },
      { phase: "Link Acquisition Campaigns", duration: "Month 6", desc: "Writing reports, launching HARO pitches, and building external page authority." }
    ],

    lessonsLearned: [
      { title: "E-E-A-T Signal Depth", desc: "Adding verified compliance lawyer quotes and legal citations to articles reduced search indexing time." },
      { title: "Core Web Vitals Impact", desc: "Optimizing website load speeds was the catalyst for early keyword rank jumps." }
    ],

    testimonial: null,

    faqs: [
      {
        q: "How did you prioritise keywords for a compliance niche?",
        a: "We built a keyword matrix scoring each term on search volume, keyword difficulty, commercial intent, and alignment with the product's buyer journey. We deliberately targeted lower-difficulty, high-intent long-tail terms first to generate early wins and build domain authority before attacking competitive head terms.",
      },
      {
        q: "How did you generate original data for E-E-A-T?",
        a: "We surveyed compliance professionals (via the client's existing customer base and LinkedIn) to generate a proprietary compliance report. This became the most linked asset in the campaign — earning backlinks in its first month.",
      },
      {
        q: "When did traffic start to move?",
        a: "Month 2 after we fixed Core Web Vitals and submitted the restructured sitemap. We saw Google begin re-crawling and re-indexing at a higher frequency. The first major ranking movements came in Month 3, with the full compounding effect visible by Month 5.",
      },
    ],
  },
};
