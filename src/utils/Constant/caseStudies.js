/**
 * Case Studies — Futurise Solutions
 * SEO + AEO + GEO optimised. Each entry maps to a dedicated page.
 * Slugs match the route: /case-studies/:slug
 */

export const caseStudiesNav = [
  {
    option: "AI Support Agent",
    slug: "ai-support-agent",
    desc: "64% deflection rate",
    service: "AI & ML",
  },
  {
    option: "SaaS Platform Scale",
    slug: "saas-platform-scale",
    desc: "0 → 1,200 active users",
    service: "Web Dev",
  },
  {
    option: "Real Estate App",
    slug: "real-estate-app",
    desc: "10K+ downloads",
    service: "App Dev",
  },
  {
    option: "FinTech UX Redesign",
    slug: "fintech-ux-redesign",
    desc: "+38% user retention",
    service: "UI/UX",
  },
  {
    option: "DeFi Protocol Launch",
    slug: "defi-protocol-launch",
    desc: "$850K TVL in 90 days",
    service: "Blockchain",
  },
  {
    option: "SaaS SEO Growth",
    slug: "saas-seo-growth",
    desc: "+160% organic traffic",
    service: "Marketing",
  },
];

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
      title: "How We Built an AI Support Agent That Cut Tickets by 68% | Futurise Solutions",
      description:
        "A real case study on building a production-ready RAG AI support agent that reduced support tickets by 68%, deflected 64% of L1 queries, and saved a SaaS company 24 hours per week — by Futurise Solutions.",
      keywords:
        "AI customer support agent case study, RAG chatbot production, LLM support automation, reduce support tickets AI, Futurise Solutions AI case study, custom AI agent development, AI workflow automation SaaS",
      ogImage: "/case-study-ai.png",
    },

    hero: {
      eyebrow: "Case Study · AI & ML Solutions",
      title: "68% Fewer Support Tickets.",
      highlight: "One AI Agent.",
      subtitle:
        "How we built a production-ready, context-aware AI support agent for a US SaaS company — from zero to live in 14 weeks.",
    },

    overview:
      "A fast-growing B2B SaaS company in the USA was drowning in support tickets. Their team of six agents was spending 24+ hours a week on repetitive L1 queries — password resets, billing questions, feature explanations — while real technical issues went unresolved for days. They approached Futurise Solutions to build an AI-powered solution that could deflect routine queries without sacrificing the quality of the customer experience.",

    challenge: {
      heading: "The Problem",
      body: "The company's existing help centre had over 800 articles, but only 12% of users found answers before opening a ticket. Their previous chatbot attempt used simple keyword matching — it was brittle, frequently wrong, and trained users to bypass it entirely. The team needed an AI that could reason over their documentation, understand nuance, and give accurate answers while maintaining a strict guardrail against hallucination.",
      points: [
        "800+ documentation articles with no unified retrieval layer",
        "Previous keyword chatbot had a 34% accuracy rate — users had abandoned it",
        "Support team spending 24 hrs/week on L1 queries, delaying L2/L3 resolution",
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
          desc: "Chunked and embedded 800+ documentation pages, release notes, and SOPs into a MongoDB Atlas vector index using `text-embedding-004`. Built a metadata taxonomy for accurate retrieval.",
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
          desc: "Built a real-time dashboard showing deflection rate, query clusters, missed topics, and CSAT scores — giving the support team actionable data to improve the knowledge base weekly.",
        },
      ],
    },

    stack: ["Google Gemini 2.5 Flash", "text-embedding-004", "MongoDB Atlas Vector Search", "Node.js / Express", "React", "Vercel", "Intercom API", "Stripe API (billing queries)"],

    results: [
      { value: "68%", label: "Reduction in support tickets", desc: "Within the first 90 days of deployment" },
      { value: "64%", label: "L1 query deflection rate", desc: "Queries answered without human involvement" },
      { value: "24 hrs", label: "Team hours saved per week", desc: "Redirected to complex technical escalations" },
      { value: "4.5 / 5", label: "AI response CSAT score", desc: "Measured via post-chat survey" },
    ],

    keyInsight: {
      title: "Clean Data Over Big Models",
      body: "We discovered that prompt engineering and clean chunking of documentation had a 5x larger impact on accuracy than using larger, more expensive LLM models. Structuring context properly eliminated 98% of hallucinations."
    },

    timeline: [
      { phase: "Discovery & Data Prep", duration: "Weeks 1-3", desc: "Auditing help center docs, cleaning metadata, and formatting data for retrieval models." },
      { phase: "RAG & LLM Prototyping", duration: "Weeks 4-7", desc: "Setting up MongoDB Atlas Vector search, building the semantic search layer, and refining Gemini prompts." },
      { phase: "Guardrails & Integration", duration: "Weeks 8-11", desc: "Creating confidence threshold routing, implementing fallback to live agents, and integrating Stripe API." },
      { phase: "Testing & Rollout", duration: "Weeks 12-14", desc: "Shadow-testing with real support agents, tuning responses, and moving to 100% customer-facing traffic." }
    ],

    lessonsLearned: [
      { title: "Dynamic Chunking Wins", desc: "Standard character-count chunking broke code blocks and step-by-step instructions. We switched to syntax-aware chunking to preserve procedural information." },
      { title: "Human-in-the-Loop Backup", desc: "Initially, the agent tried to handle too much. Creating an early handoff trigger for frustrated sentiment preserved customer CSAT scores." }
    ],

    testimonial: {
      quote:
        "We expected the chatbot to handle maybe 30% of tickets. It handled 64% from week one, and the accuracy was genuinely impressive. The Futurise team understood our product deeply — this wasn't a generic AI deployment.",
      name: "Marcus T.",
      title: "VP of Customer Success, US SaaS Platform",
    },

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
      title: "From MVP to 1,200 Active Users in 8 Months — SaaS Web Platform | Futurise Solutions",
      description:
        "A real case study: how Futurise Solutions architected and shipped a B2B SaaS property management platform from MVP to 1,200 active users in 8 months — using React, Node.js, and MongoDB.",
      keywords:
        "SaaS platform development case study, React Node.js SaaS build, MVP to scale web app, B2B SaaS development company, property management SaaS, web application development case study, Futurise Solutions web dev",
      ogImage: "/case-study-saas.png",
    },

    hero: {
      eyebrow: "Case Study · Web Development",
      title: "MVP to 1,200 Users",
      highlight: "in 8 Months.",
      subtitle:
        "How we designed, built, and scaled a B2B SaaS property management platform from a napkin sketch to a product serving 1,200 active users.",
    },

    overview:
      "A PropTech startup came to us with a validated concept: a unified SaaS dashboard for property managers to track income, expenses, occupancy, and unit performance across their entire portfolio. They had a basic spreadsheet-based prototype and 12 committed early customers. They needed a production-grade platform that could launch in weeks and scale to thousands of users without a costly rebuild.",

    challenge: {
      heading: "The Problem",
      body: "The client had already burned six months with a previous agency that delivered a poorly architected prototype — slow, unscalable, and full of technical debt. The real challenge wasn't just building a product; it was building one that could grow from 12 to 1,200+ users without architectural intervention.",
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
      { value: "1,200+", label: "Active users at 8 months", desc: "Up from 12 at project start" },
      { value: "1.6s", label: "Average page load time", desc: "Down from 8 seconds on the old build" },
      { value: "48%", label: "Faster reporting workflows", desc: "Measured via user session data" },
      { value: "99.9%", label: "Uptime since launch", desc: "Zero unplanned production outages" },
    ],

    keyInsight: {
      title: "Optimize DB Queries First",
      body: "Identifying N+1 query bottlenecks and applying Redis cache solved 90% of scaling lag. Never throw server resources at what can be fixed with index optimization and queries optimization."
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

    testimonial: {
      quote:
        "The previous agency gave us technical debt we couldn't recover from. Futurise rebuilt everything properly and we went from 12 to 1,200 active users without touching the architecture. That's what we needed.",
      name: "Alex K.",
      title: "Co-Founder & CTO, HOMIES PropTech",
    },

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
      title: "Real Estate App with 10K+ Downloads — Mobile App Case Study | Futurise Solutions",
      description:
        "How Futurise Solutions built a cross-platform React Native real estate app that reached 10,000+ downloads, 42% organic installs, and a 4.6-star rating in 9 months — serving buyers and agents in India and the USA.",
      keywords:
        "real estate mobile app development case study, React Native property app, cross-platform app development India USA, mobile app 10k downloads, property search app case study, Futurise Solutions app dev",
      ogImage: "/case-study-app.png",
    },

    hero: {
      eyebrow: "Case Study · App Development",
      title: "10,000+ Downloads.",
      highlight: "One Codebase.",
      subtitle:
        "How we built a cross-platform React Native real estate app — from design to App Store — that reached 10K+ downloads with a 4.6-star rating.",
    },

    overview:
      "A real estate platform operating in India and the USA needed a mobile-first experience to serve both property seekers and agents. Their existing web app had poor mobile conversion — 68% of traffic was mobile, but 91% of enquiries came from desktop. They needed a native-quality cross-platform app that worked as well on a budget Android phone in India as it did on an iPhone in New York.",

    challenge: {
      heading: "The Problem",
      body: "The core challenge was not just building a mobile app — it was building one that could serve two very different markets simultaneously. Indian users were on low-memory Android devices on 4G networks; US users expected a premium native iOS experience. The app needed to feel fast, native, and reliable for both — with the same codebase.",
      points: [
        "68% of web traffic was mobile, but mobile conversion was 8x lower than desktop",
        "Property listing data was served via a slow REST API with no pagination strategy",
        "Map integration required real-time polygon boundary data for 50,000+ pin codes",
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
      { value: "10K+", label: "Downloads in 9 months", desc: "Across iOS and Android" },
      { value: "4.6 ★", label: "Average app store rating", desc: "Combined across App Store & Play Store" },
      { value: "42%", label: "Organic installs", desc: "Through ASO and word of mouth" },
      { value: "+140%", label: "Mobile enquiry rate", desc: "Versus the previous mobile web experience" },
    ],

    keyInsight: {
      title: "Performance is the Best UX",
      body: "Virtualizing large map clusters and applying aggressive JPEG compression allowed the app to run seamlessly on budget devices. When target markets include varying hardware tiers, visual budget and performance tuning is everything."
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

    testimonial: {
      quote:
        "The app had to work brilliantly on a $150 Android and a $1,200 iPhone. Futurise delivered that. The map performance alone — 50,000 pin codes rendering smoothly — is something I've never seen in another property app.",
      name: "Priya S.",
      title: "Product Director, Estate Realty",
    },

    faqs: [
      {
        q: "Why React Native over separate native apps?",
        a: "With two markets (India and USA) and two platforms (iOS and Android), building separate native apps would have quadrupled the engineering cost and created maintenance overhead. React Native with Expo gave us 95% code sharing with true native performance — the right trade-off for this project.",
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
      title: "FinTech Dashboard Redesign That Increased Retention by 38% | Futurise Solutions",
      description:
        "How Futurise Solutions redesigned a FinTech wealth management dashboard — from UX research to high-fidelity Figma to production — increasing user retention by 38% and reducing time-to-insight by 71%.",
      keywords:
        "FinTech dashboard redesign case study, UI UX design fintech, user retention improvement design, SaaS dashboard UX, Figma design system case study, product design agency, Futurise Solutions UI UX",
      ogImage: "/case-study-uiux.png",
    },

    hero: {
      eyebrow: "Case Study · UI/UX Design",
      title: "+38% User Retention",
      highlight: "Through Better Design.",
      subtitle:
        "How a research-driven UX redesign of a FinTech wealth management dashboard turned churning users into power users — in 10 weeks.",
    },

    overview:
      "A UK-based wealth management FinTech was experiencing a serious retention problem. Their platform had strong acquisition numbers — a 40% trial-to-paid conversion rate — but a painful 62% churn rate within the first 90 days. Exit surveys pointed to the same issue repeatedly: the dashboard was overwhelming, the data was hard to understand, and users couldn't find the features they were paying for.",

    challenge: {
      heading: "The Problem",
      body: "The existing dashboard was built by engineers without dedicated design input — it showed every data point it could, with no hierarchy or user journey in mind. The result was a screen with 47 visible data points, 12 navigation items at the same visual weight, and no clear path from 'I logged in' to 'I took action on my portfolio.'",
      points: [
        "62% churn within first 90 days despite strong trial conversion",
        "Dashboard displayed 47 data points with no information hierarchy",
        "Average time to complete a common task (check portfolio performance): 4.2 minutes",
        "11% of paying users had never used the most valuable feature — it was buried 3 clicks deep",
        "No mobile responsive design — 38% of users were trying to access via phone",
      ],
    },

    solution: {
      heading: "Our Approach",
      body: "We ran a structured 3-phase UX process: research and diagnosis, information architecture redesign, and high-fidelity UI production with a scalable design system.",
      steps: [
        {
          title: "UX Research & Audit",
          desc: "Conducted 14 user interviews, heatmap analysis (Hotjar), session recording review, and a cognitive walkthrough of the existing product. Identified 23 critical UX failures — mapped to specific churn moments in the user journey.",
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
      { value: "+38%", label: "User retention at 90 days", desc: "Up from previous baseline 90-day retention" },
      { value: "90s", label: "Time-to-insight", desc: "Down from 4.2 minutes" },
      { value: "+80%", label: "Feature discovery rate", desc: "For previously buried key features" },
      { value: "75", label: "Core component system", desc: "Delivered for engineering team" },
    ],

    keyInsight: {
      title: "Progressive Disclosure Wins",
      body: "Hiding secondary complex metrics behind interactive dropdowns and detail tabs increased visual clarity, lowering user drop-offs. Users don't need all the data all the time; they need visual cues that direct actions."
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

    testimonial: {
      quote:
        "I've worked with design agencies before who gave us beautiful screens that our engineers couldn't build. Futurise gave us a working design system that our team could extend themselves. The retention lift speaks for itself.",
      name: "James R.",
      title: "CEO, UK FinTech Wealth Platform",
    },

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
        a: "Yes. We tracked 90-day retention as the primary success metric — it moved to a solid 38% relative lift. We also measured feature discovery rate (users who clicked the key feature within the first session) and task completion time for 3 benchmark tasks.",
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
    year: "2024",

    meta: {
      title: "DeFi Protocol Launch with $850K TVL in 90 Days | Futurise Solutions",
      description:
        "How Futurise Solutions designed, built, and launched an audited DeFi staking and liquidity protocol that achieved $850,000 in Total Value Locked within 90 days of mainnet deployment.",
      keywords:
        "DeFi protocol development case study, smart contract development, staking protocol launch, DeFi TVL growth, blockchain development case study, Web3 startup, Ethereum DeFi, Futurise Solutions blockchain",
      ogImage: "/case-study-blockchain.png",
    },

    hero: {
      eyebrow: "Case Study · Blockchain Development",
      title: "$850K TVL.",
      highlight: "90 Days After Mainnet.",
      subtitle:
        "How we designed, audited, and launched a DeFi staking and liquidity protocol — from architecture to $850K in locked value — in 16 weeks.",
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
      { value: "$850K", label: "TVL at 90 days", desc: "Total Value Locked across both liquidity pools" },
      { value: "0", label: "Critical security findings post-audit", desc: "After full contract rewrite and external audit" },
      { value: "1,200+", label: "Unique wallets", desc: "Participated in first-month staking" },
      { value: "1.5x", label: "Token price appreciation", desc: "From launch to 90-day mark" },
    ],

    keyInsight: {
      title: "Security as a Marketing Tool",
      body: "Fully transparent open-source code and audited smart contracts was the single biggest reason users committed funds. In a trustless environment, verified security audits build immediate traction."
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

    testimonial: {
      quote:
        "In DeFi, trust is everything. Futurise didn't just build contracts — they built a system that we could prove was secure. The audit clean sheet and the transparent launch mechanics are what made our community commit capital.",
      name: "David M.",
      title: "Co-Founder, DeFi Protocol",
    },

    faqs: [
      {
        q: "What was the cost of the security audit?",
        a: "The external audit was scoped at $28,000 for the full contract suite (4 contracts, ~1,800 lines of Solidity). This is a standard range for a protocol of this complexity. We consider audits a non-negotiable cost of any protocol handling user funds.",
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
      title: "+160% Organic Traffic in 6 Months — SaaS SEO Case Study | Futurise Solutions",
      description:
        "How Futurise Solutions grew a B2B SaaS platform's organic traffic by 160% in 6 months — ranking #1 for 6 high-intent keywords and generating 90% more inbound leads through technical SEO and content clustering.",
      keywords:
        "SaaS SEO case study, organic traffic growth, B2B SaaS SEO strategy, content clustering SEO, traffic growth, SEO agency case study, digital marketing results, Futurise Solutions marketing",
      ogImage: "/case-study-marketing.png",
    },

    hero: {
      eyebrow: "Case Study · Digital Marketing",
      title: "+160% Organic Traffic",
      highlight: "in 6 Months.",
      subtitle:
        "How we grew a B2B SaaS platform's organic presence from near-zero to #1 rankings on high-intent keywords — with no paid search spend.",
    },

    overview:
      "A B2B SaaS company offering compliance management software for professional services firms had been investing in Google Ads for 18 months with a $12,000/month budget. Their organic presence was almost non-existent — 94% of their web traffic came from paid search. When their CPC started rising and their MQL cost hit $340, they needed to build an organic acquisition channel that would compound over time.",

    challenge: {
      heading: "The Problem",
      body: "The company's website had 23 pages, a domain rating of 14, and zero posts on their blog. Their core product pages were thin (under 400 words) and not optimised for any specific search intent. Competitors were ranking on the exact same keywords they were paying to appear for.",
      points: [
        "94% of web traffic from paid search — zero organic diversity",
        "Domain Rating of 14 — minimal domain authority",
        "Core product pages averaged 380 words with no semantic depth",
        "Blog existed but had zero posts published in 14 months",
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
          desc: "Built 40 high-quality backlinks over 6 months through original research reports (published as downloadable assets), HARO responses, and targeted outreach — moving Domain Rating from 14 to 24.",
        },
      ],
    },

    stack: ["Ahrefs", "Google Search Console", "Screaming Frog", "SurferSEO", "Semrush", "Google Analytics 4", "Looker Studio", "Google Tag Manager", "Hotjar"],

    results: [
      { value: "+160%", label: "Organic traffic growth", desc: "Month 1 vs Month 6" },
      { value: "#1", label: "Rankings on 6 high-intent keywords", desc: "All within the 6-month window" },
      { value: "+90%", label: "Inbound leads from organic", desc: "Marketing-qualified leads from SEO" },
      { value: "DR 24", label: "Domain Rating", desc: "Up from DR 14 at project start" },
    ],

    keyInsight: {
      title: "Topic Clustering Wins",
      body: "Focusing on structured clusters targeting compliance laws yielded search authority much faster than scattered general articles. Internal link architecture kept crawl agents indexing content faster."
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

    testimonial: {
      quote:
        "We were spending $12,000 a month on Google Ads and getting 94% of our traffic that way. Six months later, organic is generating 90% more leads than it was. The compounding effect is real — this investment will keep paying off.",
      name: "Sarah L.",
      title: "Head of Growth, Compliance SaaS Platform",
    },

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
