// Pure function — no React, no imports, no API calls.
// Runs only when the backend AI is unavailable (quota hit, error, or network down) so
// the assistant still answers instantly. Facts here must match the live site: no phone
// number, no project/client counts, MVPs 6 to 12 weeks, replies within one business day.
//
// Matching is whole-word and scored. The old first-substring match answered "Do you
// build Shopify stores?" with the UI/UX entry because "ui" sits inside "build".
// Keywords ending in "*" match as a prefix ("speciali*" → specialise, specialist).
// Specific solutions come first and weigh more, so they win over the general entries.
const SITE = "https://www.futurisesolutions.com";

const fallbackKB = [
  // ── Dedicated solutions (specific, weighted) ─────────────────────────
  {
    weight: 3,
    keywords: ["shopify", "woocommerce", "ecommerce", "e-commerce", "online store", "d2c", "cro", "conversion rate", "cart", "checkout", "liquid"],
    answer: `Yes, we build and optimise Shopify stores for D2C brands: store builds, conversion rate optimisation, cart drawers with upsells, checkout and product page work. See ${SITE}/solutions/shopify-development-cro and the case study at ${SITE}/case-studies/shopify-cro-d2c-brand`,
  },
  {
    weight: 3,
    keywords: ["whatsapp crm", "whatsapp business", "whatsapp api", "whatsapp automation", "whatsapp marketing", "whatsapp campaign", "bulk message*", "broadcast"],
    answer: `Yes, we build WhatsApp CRM systems: bulk campaigns, template management, product catalogues and a live-chat inbox tied into your CRM workflows. See ${SITE}/solutions/whatsapp-crm`,
  },
  {
    weight: 3,
    keywords: ["chrome extension", "browser extension", "chrome", "extension", "add-on", "plugin"],
    answer: `Yes, we develop Chrome extensions, from AI copilots to virtual try-on tools, built for Manifest V3 and the Chrome Web Store. See ${SITE}/solutions/chrome-extension-development`,
  },
  {
    weight: 3,
    keywords: ["telegram", "telegram bot"],
    answer: `Yes, we build Telegram bots, including AI assistants that handle text and voice and group bots with moderation. See ${SITE}/solutions/telegram-bot-development`,
  },
  {
    weight: 3,
    keywords: ["hospital", "clinic", "hms", "healthcare", "patient", "ipd", "opd", "pharmacy"],
    answer: `Yes, we build hospital management systems for hospitals and clinics: appointments, billing, IPD, pharmacy, lab and patient apps. See ${SITE}/solutions/hospital-management-system`,
  },
  {
    weight: 3,
    keywords: ["recruitment", "recruiting", "hiring platform", "ats", "applicant", "resume screening", "interview"],
    answer: `We build AI recruitment platforms with recruiter and candidate flows, AI-conducted interviews, resume analysis and candidate shortlisting. See ${SITE}/solutions/ai-recruitment-platform`,
  },
  {
    weight: 3,
    keywords: ["server management", "devops", "hosting panel", "server monitoring", "control panel", "vps"],
    answer: `We build server management platforms for hosting companies: one control panel for the full server lifecycle, from provisioning to OS reinstalls and suspension. See ${SITE}/solutions/server-management-platform`,
  },
  {
    weight: 2,
    keywords: ["dapp", "web3", "blockchain", "smart contract*", "solidity", "defi", "nft", "decentrali*", "crypto", "ethereum", "solana", "token*", "wallet", "dao"],
    answer: `We build Web3 dApps, smart contracts, token launches, staking and NFT products across major chains. See ${SITE}/solutions/web3-dapp-development`,
  },
  {
    weight: 2,
    keywords: ["ai saas", "saas"],
    answer: `We design and build AI SaaS products end to end, from MVP to scale. See ${SITE}/solutions/ai-saas-development`,
  },

  // ── Commercial questions ─────────────────────────────────────────────
  {
    weight: 2,
    keywords: ["price", "pricing", "cost*", "how much", "rate", "rates", "charge", "budget", "quote", "estimate", "affordable", "expensive", "cheap", "fee", "fees"],
    answer: `Every project is quoted to its scope, so there is no fixed price list. Book a free call and we'll send a fixed-scope estimate. See ${SITE}/pricing`,
  },
  {
    weight: 2,
    keywords: ["timeline", "how long", "duration", "deadline", "week*", "month*", "delivery", "turnaround", "urgent", "rush"],
    answer: "A focused MVP typically takes 6 to 12 weeks, and larger platforms 3 to 6 months. You get a clear timeline after the discovery call.",
  },
  {
    weight: 2,
    keywords: ["nda", "confidential*", "non-disclosure", "secret"],
    answer: "Yes, we sign NDAs and keep all client information strictly confidential. Your idea is safe with us.",
  },
  {
    weight: 2,
    keywords: ["case study", "case studies", "portfolio", "past work", "previous work", "examples", "clients", "showcase"],
    /* ⚠️ NO PROJECT OR CLIENT COUNT: /about commits in writing to publishing none. */
    answer: `You can see our published work on ${SITE}/portfolio and detailed write-ups on ${SITE}/case-studies`,
  },

  // ── Contact & booking ────────────────────────────────────────────────
  {
    weight: 2,
    keywords: ["book", "schedule", "appointment", "meeting", "consultation", "free call", "discovery call", "strategy call", "demo"],
    answer: `Book a free strategy call from our website, or use the contact page: ${SITE}/contact`,
  },
  {
    weight: 2,
    keywords: ["contact", "email", "reach", "get in touch", "phone", "phone number", "mobile number", "call you", "talk to"],
    /* ⚠️ NO NUMBER IN TEXT. No phone number is ever written in text or schema; WhatsApp is
       offered only as a click-to-chat link (never put the wa.me URL in this plain-text answer). */
    answer: `Email us at business@futurisesolutions.com, message us on WhatsApp (link on our contact page), use the contact form or book a free call. We reply within one business day. ${SITE}/contact`,
  },
  {
    weight: 2,
    keywords: ["location", "located", "based", "where are you", "office", "address", "wellington", "new zealand", "headquarter*"],
    answer: "We're based in Wellington, New Zealand, with team members in India, and work with clients in the USA, UAE, India, Australia, Canada, NZ and Europe.",
  },
  {
    weight: 2,
    keywords: ["working hours", "hours", "open", "timezone", "time zone"],
    answer: "You can book a call Monday to Saturday, 9:00 AM to 10:30 PM India time (IST); the booking calendar shows each slot in your own time zone. Messages get a reply within one business day.",
  },

  // ── Core services ────────────────────────────────────────────────────
  {
    keywords: ["ai", "artificial intelligence", "machine learning", "ml", "llm", "gpt", "chatgpt", "agent", "agents", "automation", "automate", "nlp", "computer vision", "rag", "chatbot"],
    answer: `We build custom AI agents, LLM integrations, RAG assistants, NLP and computer vision features, and automation. See ${SITE}/service/ai-ml-solutions`,
  },
  {
    keywords: ["website", "web", "web app", "web application", "react", "next.js", "nextjs", "node", "frontend", "backend", "full stack", "fullstack", "api", "dashboard", "portal"],
    answer: `We build fast, scalable websites and web apps with React, Next.js and Node.js. See ${SITE}/service/web-development`,
  },
  {
    keywords: ["app", "apps", "mobile", "ios", "android", "react native", "flutter", "expo", "cross-platform", "app store", "play store"],
    answer: `We build cross-platform iOS and Android apps with React Native and Expo. See ${SITE}/service/app-development`,
  },
  {
    keywords: ["design", "ui", "ux", "ui/ux", "user experience", "user interface", "figma", "wireframe*", "prototype*", "mockup*", "redesign", "landing page"],
    answer: `We offer full UI/UX design: research, wireframes, Figma prototypes, design systems and developer handoff. See ${SITE}/service/ui-ux-design`,
  },
  {
    keywords: ["marketing", "seo", "search engine", "social media", "ads", "google ads", "content", "traffic", "leads", "growth", "campaign*", "ranking"],
    answer: `We offer SEO, AI search visibility, content, paid ads and conversion work to grow traffic and leads. See ${SITE}/service/digital-marketing`,
  },
  {
    keywords: ["blog", "article*", "guide*", "insight*", "resources"],
    answer: `Our guides on AI, SaaS, Shopify, apps and more are on ${SITE}/blog`,
  },
  {
    keywords: ["technology", "tech stack", "stack", "framework*", "typescript", "javascript", "python", "aws", "cloud", "docker", "database", "mongodb", "postgres*"],
    answer: "We choose the stack per project. Common choices are React, Next.js, Node.js, Python, MongoDB, PostgreSQL and AWS.",
  },
  {
    keywords: ["support", "maintenance", "maintain", "bug*", "after launch", "post launch", "ongoing"],
    answer: "We offer post-launch support and maintenance, and revision rounds are defined up front in every project.",
  },
  {
    keywords: ["team", "who are you", "about you", "about futurise", "company", "agency", "studio", "founded"],
    /* ⚠️ No invented counts (projects, clients, countries, retention). */
    answer: `We're a senior product engineering team covering AI, web, mobile, UI/UX, blockchain and marketing, registered in New Zealand. See ${SITE}/about`,
  },
  {
    keywords: ["partner", "partnership", "collab*", "reseller", "white label", "referral"],
    answer: "We're open to agency partnerships. Email business@futurisesolutions.com to discuss.",
  },
  {
    keywords: ["job", "jobs", "career*", "intern", "internship", "vacancy", "join your team"],
    answer: "Interested in joining us? Email your portfolio and CV to business@futurisesolutions.com.",
  },
  {
    weight: 0.5,
    keywords: ["service*", "offer", "provide", "what do you do", "speciali*", "capabilit*", "expertise"],
    answer: `We offer AI & ML, web, app, UI/UX, blockchain and digital marketing services, plus dedicated solutions such as Shopify, WhatsApp CRM and Chrome extensions. See ${SITE}/solutions`,
  },
  {
    weight: 0.5,
    keywords: ["thank*", "appreciate", "great", "awesome", "helpful"],
    answer: "You're welcome! Ask anything else, or book a free call when you're ready.",
  },
  {
    weight: 0.5,
    keywords: ["hello", "hi", "hey", "good morning", "good afternoon", "good evening", "greetings"],
    answer: "Hi! I'm Futurise Assistant. Ask me about our services, pricing or how to get started.",
  },
];

const escape = (s) => s.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&");
const compiled = fallbackKB.map((entry) => ({
  ...entry,
  patterns: entry.keywords.map((kw) => {
    const prefix = kw.endsWith("*");
    const word = escape(prefix ? kw.slice(0, -1) : kw);
    return {
      re: new RegExp(`(^|[^a-z0-9])${word}${prefix ? "" : "(?=$|[^a-z0-9])"}`),
      score: kw.includes(" ") ? 2 : 1,
    };
  }),
}));

export function matchKeyword(question) {
  const q = (question || "").toLowerCase();
  let best = null;
  let bestScore = 0;
  for (const entry of compiled) {
    const hits = entry.patterns.reduce((sum, p) => sum + (p.re.test(q) ? p.score : 0), 0);
    const score = hits * (entry.weight ?? 1);
    if (score > bestScore) {
      best = entry;
      bestScore = score;
    }
  }
  return best ? best.answer : null; // no match → show ContactFallback
}
