// Pure function — no React, no imports, no API calls.
// Covers 25+ intent categories — runs only when the backend AI is unavailable
// (quota hit, error, or network down) so the assistant still answers instantly.
const fallbackKB = [
  // ── Services (general) ──────────────────────────────────────────────
  {
    keywords: ["service", "offer", "provide", "what do you do", "speciali", "capabilities", "can you", "help with", "expertise"],
    answer: "We offer 6 core services: AI & ML, Web Development, App Development, UI/UX Design, Blockchain/Web3, and Digital Marketing. Which one interests you?",
  },

  // ── Pricing ─────────────────────────────────────────────────────────
  {
    keywords: ["price", "cost", "how much", "rate", "charge", "budget", "pricing", "quote", "estimate", "affordable", "expensive", "cheap", "fees", "invoice"],
    answer: "We work on custom quotes based on your project scope. Book a free call and we'll give you a clear estimate — no commitment needed.",
  },

  // ── Contact ─────────────────────────────────────────────────────────
  {
    keywords: ["contact", "email", "reach", "talk", "speak", "call", "message", "get in touch", "whatsapp", "phone", "number", "mail"],
    answer: "Email us at business@futurisesolutions.com or call +91 76650 13356. We reply within a few hours.",
  },

  // ── Location ────────────────────────────────────────────────────────
  {
    keywords: ["location", "based", "where", "country", "new zealand", "india", "usa", "office", "address", "city", "wellington", "remote", "onsite"],
    answer: "We're based in Wellington, New Zealand, with team members in India — serving clients in USA, NZ, India and worldwide.",
  },

  // ── Portfolio / Past Work ────────────────────────────────────────────
  {
    keywords: ["portfolio", "project", "past work", "example", "case study", "built", "clients", "showcase", "sample", "previous", "done before"],
    answer: "We've delivered 30+ projects including HOMIES, Marty-QR, GDT Exchange, and more. Check our portfolio page!",
  },

  // ── Timeline / Delivery ──────────────────────────────────────────────
  {
    keywords: ["timeline", "how long", "duration", "deadline", "weeks", "months", "delivery", "time", "fast", "quick", "urgent", "rush"],
    answer: "Most projects take 4–16 weeks depending on scope. We'll give a clear timeline after the discovery call.",
  },

  // ── Getting Started / Hiring ─────────────────────────────────────────
  {
    keywords: ["start", "hire", "begin", "get started", "work together", "collaborate", "onboard", "kick off", "process", "next step", "how to", "ready"],
    answer: "Book a free strategy call! We'll discuss your idea, scope it out, and put together a plan — no commitment needed.",
  },

  // ── AI & ML ──────────────────────────────────────────────────────────
  {
    keywords: ["ai", "artificial intelligence", "machine learning", "ml", "llm", "large language model", "gpt", "chatgpt", "openai", "gemini", "agent", "automation", "nlp", "computer vision", "data science", "model", "prediction", "recommendation"],
    answer: "We build custom AI agents, LLM integrations, NLP systems, computer vision pipelines, and ML-powered features for your product.",
  },

  // ── Web Development ──────────────────────────────────────────────────
  {
    keywords: ["web", "website", "web app", "saas", "react", "next.js", "nextjs", "node", "nodejs", "frontend", "backend", "fullstack", "full stack", "graphql", "api", "rest", "dashboard", "portal", "platform"],
    answer: "We build scalable web applications with React, Next.js, Node.js, and GraphQL — from SaaS platforms to dashboards and portals.",
  },

  // ── Mobile App Development ────────────────────────────────────────────
  {
    keywords: ["app", "mobile", "ios", "android", "react native", "expo", "cross-platform", "flutter", "native", "app store", "play store", "smartphone", "tablet"],
    answer: "We build cross-platform mobile apps with React Native & Expo that run natively on both iOS and Android.",
  },

  // ── UI/UX Design ──────────────────────────────────────────────────────
  {
    keywords: ["design", "ui", "ux", "user experience", "user interface", "figma", "wireframe", "prototype", "mockup", "branding", "visual", "landing page", "redesign", "pixel", "creative", "logo"],
    answer: "We offer full UI/UX design — user research, wireframes, Figma prototypes, design systems, and pixel-perfect handoffs.",
  },

  // ── Blockchain / Web3 ─────────────────────────────────────────────────
  {
    keywords: ["blockchain", "web3", "smart contract", "solidity", "defi", "nft", "dapp", "decentralized", "crypto", "ethereum", "solana", "token", "wallet", "mev", "dao"],
    answer: "We build dApps, smart contracts, DeFi protocols, MEV bots, and Web3 solutions across major chains.",
  },

  // ── Digital Marketing ─────────────────────────────────────────────────
  {
    keywords: ["marketing", "seo", "search engine", "social media", "ads", "google ads", "facebook ads", "instagram", "linkedin", "content", "blog", "traffic", "leads", "conversion", "analytics", "growth", "campaign", "rank", "keywords"],
    answer: "We offer SEO, performance marketing, content strategy, paid ads, and social media growth to drive real traffic and leads.",
  },

  // ── Team / Company Info ───────────────────────────────────────────────
  {
    keywords: ["team", "who are you", "about", "people", "member", "developer", "staff", "company", "agency", "studio", "futurise", "founded", "experience", "years"],
    answer: "We're a senior team of developers, designers, and strategists. 30+ projects delivered with a 97% client retention rate.",
  },

  // ── Tech Stack ────────────────────────────────────────────────────────
  {
    keywords: ["technology", "tech stack", "tools", "framework", "language", "typescript", "javascript", "python", "aws", "cloud", "docker", "database", "mongodb", "postgres", "mysql"],
    answer: "Our stack includes React, Next.js, Node.js, Python, MongoDB, PostgreSQL, AWS, and more — chosen based on what's best for your project.",
  },

  // ── Revisions / Support ───────────────────────────────────────────────
  {
    keywords: ["revision", "change", "update", "support", "maintenance", "bug", "fix", "after delivery", "post launch", "ongoing"],
    answer: "Every project includes revision rounds defined upfront. We also offer post-launch support and maintenance packages.",
  },

  // ── NDA / Confidentiality ─────────────────────────────────────────────
  {
    keywords: ["nda", "confidential", "secret", "agreement", "legal", "contract", "sign", "privacy", "secure"],
    answer: "Absolutely — we sign NDAs and keep all client information strictly confidential. Your idea is safe with us.",
  },

  // ── Refund / Guarantee ────────────────────────────────────────────────
  {
    keywords: ["refund", "guarantee", "money back", "quality", "satisfaction", "warranty", "assurance"],
    answer: "We stand behind our work. Quality is defined upfront in the project scope, and revisions ensure you're satisfied with every deliverable.",
  },

  // ── Blog / Resources ──────────────────────────────────────────────────
  {
    keywords: ["blog", "article", "read", "resource", "guide", "learn", "insight", "news", "update"],
    answer: "Check out our blog for insights on AI, web development, mobile apps, blockchain, and digital marketing!",
  },

  // ── Book a Call ───────────────────────────────────────────────────────
  {
    keywords: ["book", "schedule", "appointment", "meeting", "call", "consultation", "free call", "discovery", "demo"],
    answer: "Book a free strategy call directly from our website — just click 'Book a free call' or visit our contact page.",
  },

  // ── Greetings ─────────────────────────────────────────────────────────
  {
    keywords: ["hello", "hi", "hey", "good morning", "good afternoon", "good evening", "howdy", "greetings", "sup", "what's up"],
    answer: "Hey there! 👋 I'm Futurise Assistant. Ask me anything about our services, pricing, or how to get started!",
  },

  // ── Thank you ─────────────────────────────────────────────────────────
  {
    keywords: ["thank", "thanks", "thank you", "appreciate", "great", "awesome", "helpful"],
    answer: "You're welcome! 😊 Feel free to ask anything else, or book a free call when you're ready to get started.",
  },

  // ── Partnership / Collaboration ───────────────────────────────────────
  {
    keywords: ["partner", "partnership", "collab", "collaboration", "reseller", "white label", "agency partner", "referral"],
    answer: "We're open to agency partnerships and collaborations. Email us at business@futurisesolutions.com to discuss.",
  },

  // ── Internship / Jobs ─────────────────────────────────────────────────
  {
    keywords: ["job", "career", "intern", "internship", "hiring", "vacancy", "apply", "join", "work for", "opportunity"],
    answer: "Interested in joining us? Email your portfolio and CV to business@futurisesolutions.com — we'd love to hear from you.",
  },
];

export function matchKeyword(question) {
  const q = (question || "").toLowerCase().trim();
  for (const entry of fallbackKB) {
    if (entry.keywords.some((kw) => q.includes(kw))) {
      return entry.answer;
    }
  }
  return null; // no match → show ContactFallback
}
