# Futurise Solutions — AI Chatbot Implementation Plan

> Branch: `chat-bot`
> Last Updated: 15 June 2025
> Stack: React + Chakra UI (Vite) · Node.js/Express Backend · MongoDB Atlas Vector Search · Gemini 2.5 Flash

---

## Overview

Build a hybrid AI chatbot for futurisesolutions.com that:
- Answers visitor questions about Futurise Solutions using RAG (backend + MongoDB vector search + Gemini 2.5 Flash)
- Falls back to frontend keyword matching if Gemini API limit is hit (20 calls/day free tier)
- Falls back to contact options (WhatsApp, Book a Call, Contact Page) if no answer found anywhere
- Shows predefined quick-reply questions (Zomato-style chips) for instant answers
- Has zero impact on SEO and initial page performance (fully lazy-loaded)
- Never exposes Gemini usage to the user — branded as "Futurise Assistant"

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     FRONTEND (React)                     │
│                                                         │
│  FloatingChatBubble (lazy loaded, renders only on click)│
│       ↓                                                 │
│  ChatWidget                                             │
│  ├── PredefinedChips (click → instant answer, 0 calls)  │
│  ├── MessageInput (user types question)                 │
│  └── Message flow:                                      │
│       1. Send to Backend API → get AI answer            │
│       2. If backend fails/quota → KeywordMatcher        │
│       3. If keyword no match → ContactFallback          │
└────────────────┬────────────────────────────────────────┘
                 │ POST /api/chat
                 ▼
┌─────────────────────────────────────────────────────────┐
│                     BACKEND (Node/Express)               │
│                                                         │
│  POST /api/chat                                         │
│  ├── Embed user question → vector                       │
│  ├── MongoDB Atlas Vector Search → top 3 content chunks │
│  ├── Build prompt: system + context chunks + question   │
│  ├── Call Gemini 2.5 Flash                              │
│  └── Return { answer, source: "ai" }                   │
│                                                         │
│  If Gemini quota hit → return { source: "quota_exceeded"}│
└────────────────┬────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────┐
│               MONGODB ATLAS (Vector Search)             │
│                                                         │
│  Collection: page_content                               │
│  Schema:                                                │
│  {                                                      │
│    _id, page, section, content (text),                  │
│    embedding: [1536-dim float array],                   │
│    updatedAt                                            │
│  }                                                      │
│                                                         │
│  Pages stored: home, about, services (x6),              │
│                portfolio, contact, blog, faq            │
└─────────────────────────────────────────────────────────┘
```

---

## Detailed Flow

### Flow 1 — Predefined Question (0 API calls)
```
User clicks chip "What services do you offer?"
  → answer rendered instantly from hardcoded map
  → no backend call, no Gemini call
```

### Flow 2 — Custom Question, Gemini Available
```
User types "Do you build Shopify stores?"
  → Frontend: POST /api/chat { question, history[] }
  → Backend:
      1. Embed question with Gemini embedding model
      2. MongoDB Atlas vector search → top 3 chunks (services page, home page)
      3. Build prompt:
           SYSTEM: "You are Futurise Assistant..."
           CONTEXT: <retrieved chunks>
           HISTORY: <last 5 messages>
           USER: "Do you build Shopify stores?"
      4. Gemini 2.5 Flash → answer
      5. Return { answer: "...", source: "ai" }
  → Frontend: render answer
```

### Flow 3 — Gemini Quota Hit (Frontend Fallback)
```
Backend returns { source: "quota_exceeded" }
  → Frontend: run KeywordMatcher against question
  → If match found → render static answer
  → If no match → show ContactFallback
```

### Flow 4 — No Answer Found Anywhere
```
  → Show ContactFallback component:
      "I couldn't find a specific answer. Here's how to reach us:"
      [WhatsApp Button] [Book a Free Call] [Contact Page →]
```

---

## MongoDB — `page_content` Collection

### Document Schema
```json
{
  "_id": "ObjectId",
  "page": "services",
  "section": "ai-ml",
  "title": "AI & Machine Learning Solutions",
  "content": "We build custom AI agents, LLM integrations, automation pipelines...",
  "keywords": ["ai", "machine learning", "llm", "agents", "automation"],
  "embedding": [0.023, -0.187, ...],
  "updatedAt": "2025-06-15T00:00:00Z"
}
```

### Pages & Sections to Store
| Page | Sections |
|---|---|
| home | hero, services-overview, stats, why-us, process, faq |
| about | mission, vision, core-values, team-stats |
| service/ai-ml | overview, features, tech-stack, process |
| service/web-development | overview, features, tech-stack |
| service/app-development | overview, features, tech-stack |
| service/ui-ux-design | overview, features, process |
| service/blockchain | overview, features, tech-stack |
| service/digital-marketing | overview, features, process |
| portfolio | project list with descriptions |
| contact | contact details, location, working hours |
| faq | all FAQ questions and answers |

### Vector Index (Atlas Search)
```json
{
  "fields": [{
    "type": "vector",
    "path": "embedding",
    "numDimensions": 768,
    "similarity": "cosine"
  }]
}
```

---

## Backend — API Endpoint
## get gemini api key from env 
### `POST /api/chat`

**Request:**
```json
{
  "question": "What technologies do you use for mobile apps?",
  "history": [
    { "role": "user", "content": "Hello" },
    { "role": "assistant", "content": "Hi! How can I help?" }
  ]
}
```

**Response (success):**
```json
{
  "answer": "We build mobile apps using React Native and Expo...",
  "source": "ai"
}
```

**Response (quota exceeded):**
```json
{
  "source": "quota_exceeded"
}
```

**Response (error):**
```json
{
  "source": "error",
  "message": "Something went wrong"
}
```

### System Prompt (Backend)
```
You are Futurise Assistant, the AI assistant for Futurise Solutions.
You help website visitors learn about our services, portfolio, and how to get started.

RULES:
- Only answer questions about Futurise Solutions
- Be friendly, concise, and professional
- Keep answers under 120 words
- If unsure, direct them to contact us
- Never mention Gemini, Google AI, or any AI provider
- Do not answer off-topic questions (coding help, general knowledge, etc.)

COMPANY:
- Name: Futurise Solutions
- Type: Full-cycle digital product studio
- Location: Wellington, New Zealand (serving India, USA & worldwide)
- Email: business@futurisesolutions.com
- Phone: +91 76650 13356
- Stats: 30+ projects, 14+ clients, 97% retention

CONTEXT FROM WEBSITE:
{retrieved_chunks}
```

---

## Frontend — Components

### File Structure
```
src/
├── Components/
│   └── Chatbot/
│       ├── index.js                  # exports
│       ├── ChatWidget.jsx            # main chat window
│       ├── ChatBubble.jsx            # floating trigger button
│       ├── MessageList.jsx           # renders conversation
│       ├── MessageInput.jsx          # text input + send
│       ├── PredefinedChips.jsx       # quick-reply buttons
│       ├── ContactFallback.jsx       # WhatsApp/booking/contact links
│       ├── TypingIndicator.jsx       # animated dots while waiting
│       ├── keywordMatcher.js         # pure function, no imports
│       └── predefinedQA.js           # hardcoded Q&A + chips data
└── App.jsx                           # lazy import ChatBubble here
```

### Lazy Loading in App.jsx
```jsx
// Load chat widget only after page is interactive
const ChatBubble = lazy(() => import('./Components/Chatbot/ChatBubble'));

// In JSX — renders outside main layout, fixed position
<Suspense fallback={null}>
  <ChatBubble />
</Suspense>
```
> `fallback={null}` — no loading spinner shown for the chat widget.
> Widget is position:fixed, completely outside the content flow → zero layout shift, zero CLS impact.

---

## Frontend — Predefined Questions (predefinedQA.js)

```js
export const predefinedChips = [
  "What services do you offer?",
  "How do I start a project?",
  "What does it cost?",
  "Show me your portfolio",
  "How can I contact you?",
  "How long does a project take?",
];

export const predefinedAnswers = {
  "What services do you offer?":
    "We offer 6 core services: AI & ML Solutions, Web Development, App Development, UI/UX Design, Blockchain/Web3, and Digital Marketing. Which one interests you?",

  "How do I start a project?":
    "Simple! Book a free strategy call and we'll discuss your idea, scope, and timeline. No commitment needed.",

  "What does it cost?":
    "We work on custom quotes based on your project scope. Book a free call and we'll give you a clear estimate.",

  "Show me your portfolio":
    "We've delivered 30+ projects including HOMIES, Marty-QR, GDT Exchange, and more. Check our portfolio page!",

  "How can I contact you?":
    "Email us at business@futurisesolutions.com, call +91 76650 13356, or use our contact page. We reply within hours.",

  "How long does a project take?":
    "It depends on scope. Most projects range from 4 to 16 weeks. We'll give you a clear timeline after the discovery call.",
};
```

---

## Frontend — Keyword Fallback (keywordMatcher.js)

```js
// Pure function — no React, no imports, no API calls
// Covers 30+ intent categories — runs only when Gemini quota is exceeded
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
    answer: "We're a senior team of 10+ developers, designers, and strategists. 30+ projects delivered with a 97% client retention rate.",
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
  const q = question.toLowerCase().trim();
  for (const entry of fallbackKB) {
    if (entry.keywords.some((kw) => q.includes(kw))) {
      return entry.answer;
    }
  }
  return null; // no match → show ContactFallback
}
```

---

## Frontend — ContactFallback Component

Shown when both Gemini and keyword matching fail to answer:

```jsx
// ContactFallback.jsx
const ContactFallback = () => (
  <Box p={4} borderRadius="14px" border="1px solid" borderColor="rgba(180,160,255,0.2)" bg="bg.surface">
    <Text fontSize="14px" color="text.muted" mb={3}>
      I couldn't find a specific answer. Here's how to reach us directly:
    </Text>
    <VStack spacing={2} align="stretch">
      <Button as="a" href="https://wa.me/917665013356" target="_blank" size="sm" variant="outlineGlow" leftIcon={<FaWhatsapp />}>
        Chat on WhatsApp
      </Button>
      <Button size="sm" variant="gradient" leftIcon={<FiCalendar />} onClick={openBooking}>
        Book a Free Call
      </Button>
      <Button as={Link} to="/contact" size="sm" variant="ghostLink" rightIcon={<FiArrowRight />}>
        Send us a message
      </Button>
    </VStack>
  </Box>
);
```

---

## Performance & SEO Rules (Non-negotiable)

| Rule | Implementation |
|---|---|
| No render on page load | `React.lazy()` + `Suspense fallback={null}` |
| No layout shift | `position: fixed`, outside content flow |
| No blocking scripts | Dynamic import only triggered on bubble click |
| SEO safe | Chat content in React state, never in crawlable DOM |
| No extra dependencies | Use existing Chakra UI, framer-motion, react-icons |
| API key hidden | All Gemini calls go through backend — key never in frontend bundle |
| Minimal bundle | Chat widget lazy chunk only loaded when user clicks bubble |
| No IndexedDB/localStorage | Conversation in useState only — clears on refresh |

---

## Environment Variables

### Frontend (.env)
```
VITE_CHAT_API_URL=https://api.futurisesolutions.com/api/chat
```

### Backend (.env)
```
GEMINI_API_KEY=your_gemini_api_key
MONGODB_URI=mongodb+srv://...
GEMINI_MODEL=gemini-2.5-flash
EMBEDDING_MODEL=text-embedding-004
VECTOR_SEARCH_INDEX=content_vector_index
TOP_K_RESULTS=3
```

---

## Content Seeding Script (Backend)

### Decision: Prompt-to-Run (NOT auto on every code change)

**Why not auto-run?**
- Gemini embedding API has daily limits — running on every file save would waste quota
- Content rarely changes — re-seeding on every build is unnecessary
- Seeding is destructive (upserts DB records) — should be intentional

**Chosen approach: Interactive CLI prompt**
Developer runs `npm run seed` → script asks what to seed → confirms before writing to DB.

---

### Script Location
```
backend/
└── scripts/
    └── seedContent.js    ← main seed script
    └── content/
        ├── home.js       ← page content as JS objects
        ├── about.js
        ├── services.js
        ├── portfolio.js
        ├── contact.js
        └── faq.js
```

---

### npm Script (backend/package.json)
```json
{
  "scripts": {
    "seed": "node scripts/seedContent.js",
    "seed:dry": "node scripts/seedContent.js --dry-run",
    "seed:force": "node scripts/seedContent.js --force"
  }
}
```

---

### seedContent.js — Full Script

```js
// backend/scripts/seedContent.js
// Run: npm run seed
// Flags:
//   --dry-run   Preview what would be seeded, no DB writes, no API calls
//   --force     Skip confirmation prompt, seed all pages immediately
//   --page=home Seed only a specific page (e.g. --page=services)

import "dotenv/config";
import readline from "readline";
import { MongoClient } from "mongodb";
import { GoogleGenerativeAI } from "@google/generative-ai";

// ── Page content imports ─────────────────────────────────────────────
import { homeContent }      from "./content/home.js";
import { aboutContent }     from "./content/about.js";
import { servicesContent }  from "./content/services.js";
import { portfolioContent } from "./content/portfolio.js";
import { contactContent }   from "./content/contact.js";
import { faqContent }       from "./content/faq.js";

const ALL_PAGES = {
  home:      homeContent,
  about:     aboutContent,
  services:  servicesContent,
  portfolio: portfolioContent,
  contact:   contactContent,
  faq:       faqContent,
};

// ── Parse CLI flags ──────────────────────────────────────────────────
const args        = process.argv.slice(2);
const DRY_RUN     = args.includes("--dry-run");
const FORCE       = args.includes("--force");
const PAGE_FLAG   = args.find((a) => a.startsWith("--page="));
const TARGET_PAGE = PAGE_FLAG ? PAGE_FLAG.split("=")[1] : null;

// ── Determine what to seed ────────────────────────────────────────────
const pagesToSeed = TARGET_PAGE
  ? { [TARGET_PAGE]: ALL_PAGES[TARGET_PAGE] }
  : ALL_PAGES;

if (TARGET_PAGE && !ALL_PAGES[TARGET_PAGE]) {
  console.error(`\n❌ Unknown page: "${TARGET_PAGE}". Available: ${Object.keys(ALL_PAGES).join(", ")}\n`);
  process.exit(1);
}

// ── Count chunks to be seeded ─────────────────────────────────────────
const totalChunks = Object.values(pagesToSeed).reduce(
  (sum, sections) => sum + sections.length, 0
);

// ── Summary print ─────────────────────────────────────────────────────
console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("  Futurise Solutions — Content Seeder");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log(`  Pages   : ${Object.keys(pagesToSeed).join(", ")}`);
console.log(`  Chunks  : ${totalChunks} sections to embed`);
console.log(`  Mode    : ${DRY_RUN ? "DRY RUN (no writes)" : "LIVE"}`);
console.log(`  DB      : ${process.env.MONGODB_URI?.slice(0, 30)}...`);
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

if (DRY_RUN) {
  console.log("📋 DRY RUN — chunks that WOULD be seeded:\n");
  Object.entries(pagesToSeed).forEach(([page, sections]) => {
    sections.forEach((s) => {
      console.log(`  [${page}] ${s.section} — ${s.content.slice(0, 80)}...`);
    });
  });
  console.log("\n✅ Dry run complete. No DB writes. No API calls.\n");
  process.exit(0);
}

// ── Confirmation prompt (skipped with --force) ────────────────────────
async function confirm() {
  if (FORCE) return true;
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(
      `⚠️  This will upsert ${totalChunks} chunks into MongoDB.\n   Gemini embedding API will be called ${totalChunks} time(s).\n\n   Proceed? (y/N): `,
      (ans) => { rl.close(); resolve(ans.trim().toLowerCase() === "y"); }
    );
  });
}

// ── Main seeding logic ────────────────────────────────────────────────
async function seed() {
  const ok = await confirm();
  if (!ok) { console.log("\n🚫 Aborted. No changes made.\n"); process.exit(0); }

  const client = new MongoClient(process.env.MONGODB_URI);
  const genAI  = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const embedModel = genAI.getGenerativeModel({ model: "text-embedding-004" });

  try {
    await client.connect();
    const db         = client.db("futurise");
    const collection = db.collection("page_content");

    let seeded = 0;
    let failed = 0;

    for (const [page, sections] of Object.entries(pagesToSeed)) {
      console.log(`\n📄 Seeding page: ${page} (${sections.length} sections)`);

      for (const section of sections) {
        try {
          // Generate embedding
          const result    = await embedModel.embedContent(section.content);
          const embedding = result.embedding.values;

          // Upsert into MongoDB
          await collection.updateOne(
            { page: section.page, section: section.section },
            {
              $set: {
                page:      section.page,
                section:   section.section,
                title:     section.title,
                content:   section.content,
                keywords:  section.keywords,
                embedding,
                updatedAt: new Date(),
              },
            },
            { upsert: true }
          );

          console.log(`  ✅ ${section.section}`);
          seeded++;

          // Small delay to respect Gemini rate limits
          await new Promise((r) => setTimeout(r, 300));

        } catch (err) {
          console.error(`  ❌ ${section.section} — ${err.message}`);
          failed++;
        }
      }
    }

    console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(`  ✅ Seeded : ${seeded} chunks`);
    if (failed > 0)
      console.log(`  ❌ Failed : ${failed} chunks (re-run to retry)`);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

  } finally {
    await client.close();
  }
}

seed().catch((err) => {
  console.error("\n❌ Fatal error:", err.message);
  process.exit(1);
});
```

---

### Content File Format (e.g. content/faq.js)

```js
// backend/scripts/content/faq.js
export const faqContent = [
  {
    page: "faq",
    section: "faq-services",
    title: "What services does Futurise Solutions offer?",
    content: `Futurise Solutions offers 6 core services:
1. AI & ML Solutions — custom AI agents, LLM integrations, NLP, computer vision
2. Web Development — React, Next.js, Node.js, GraphQL, SaaS platforms
3. App Development — React Native, Expo, iOS and Android
4. UI/UX Design — user research, Figma, design systems
5. Blockchain/Web3 — smart contracts, DeFi, dApps, MEV
6. Digital Marketing — SEO, performance marketing, social strategy`,
    keywords: ["services", "offer", "what do you do"],
  },
  {
    page: "faq",
    section: "faq-pricing",
    title: "How much does a project cost?",
    content: `Futurise Solutions works on custom quotes based on project scope, complexity, and timeline.
We do not have fixed packages — every project is different.
To get an accurate estimate, book a free strategy call where we discuss your requirements.`,
    keywords: ["price", "cost", "budget", "how much"],
  },
  {
    page: "faq",
    section: "faq-timeline",
    title: "How long does a project take?",
    content: `Project timelines at Futurise Solutions typically range from 4 to 16 weeks depending on scope.
A simple landing page or MVP may take 3-4 weeks.
A full SaaS platform or mobile app typically takes 8-16 weeks.
We provide a clear timeline breakdown after the discovery call.`,
    keywords: ["timeline", "how long", "duration", "delivery"],
  },
  // ... add all FAQ entries
];
```

---

### When to Re-run the Seed Script

| Trigger | Command | Notes |
|---|---|---|
| First setup | `npm run seed` | Seeds all pages |
| Content updated on one page | `npm run seed -- --page=services` | Only re-embeds services content |
| Preview without writing | `npm run seed:dry` | Shows all chunks, no API calls |
| CI/CD deployment (optional) | `npm run seed:force` | Skips prompt, use in pipelines |
| Testing output format | `npm run seed:dry -- --page=faq` | Preview single page |

> **Rule:** Only re-seed when the actual text content of a page changes significantly.
> Minor wording tweaks do not need re-seeding — the existing embeddings remain accurate enough.

---

## Build Order

### Phase 1 — Backend
1. Setup Express route `POST /api/chat`
2. Connect MongoDB Atlas, create `page_content` collection
3. Create vector search index in Atlas UI
4. Write `seedContent.js` — populate DB with page content + embeddings
5. Implement RAG: embed question → vector search → build prompt → Gemini call
6. Handle quota exceeded (429) → return `{ source: "quota_exceeded" }`
7. Test with Postman/Thunder Client

### Phase 2 — Frontend
1. Create `src/Components/Chatbot/` folder and all files
2. Build `predefinedQA.js` and `keywordMatcher.js` (pure JS, no deps)
3. Build `ContactFallback.jsx`
4. Build `TypingIndicator.jsx`
5. Build `MessageList.jsx` + `MessageInput.jsx`
6. Build `PredefinedChips.jsx` (shown only at start of conversation)
7. Build `ChatWidget.jsx` (assembles all pieces, holds useState for messages)
8. Build `ChatBubble.jsx` (floating trigger, toggles widget open/close)
9. Lazy import `ChatBubble` in `App.jsx`
10. Test full flow: predefined → AI → keyword fallback → contact fallback

### Phase 3 — Polish
1. Framer Motion open/close animation for chat window
2. Auto-scroll to latest message
3. Mobile responsive (full-screen on small devices)
4. Typing indicator while waiting for backend
5. Error toast if network down
6. Rate limit UX — show fallback seamlessly (no "API limit" message shown to user)

---

## UI Design Spec

```
Widget position:   fixed, bottom-right, z-index 9999
Bubble size:       56px × 56px, brand gradient bg, glow shadow
Widget size:       380px wide × 560px tall (desktop)
                   100vw × 100vh (mobile, <480px)
Border radius:     20px
Background:        rgba(13,13,22,0.95) + backdrop-blur(20px)
Header:            "Futurise Assistant" + online indicator dot (green)
Font:              Aeonik Trial (existing body font)
Colors:            Match existing theme — bg.surface, text.muted, accent.solid, brand.400
Message bubbles:
  - User:          bg brand gradient, text white, right-aligned
  - Assistant:     bg bg.surface border border.subtle, text text.muted, left-aligned
Chips:             Eyebrow-style pill buttons, shown only before first user message
Send button:       brand gradient, FiSend icon
```

---

## Key Decisions Summary

| Decision | Choice | Reason |
|---|---|---|
| AI Provider | Gemini 2.5 Flash | Free tier, 20 calls/day |
| Embeddings | `text-embedding-004` | Free, high quality, 768-dim |
| Vector DB | MongoDB Atlas Vector Search | Already using Mongo, no extra infra |
| Fallback 1 | Frontend keyword matching | Zero API calls, instant |
| Fallback 2 | Contact options (WA/Call/Contact) | Converts visitors even when AI fails |
| Quick replies | Predefined chips (frontend) | Zomato-style, no API calls |
| Performance | React.lazy + Suspense null | Zero impact on page load / LCP |
| SEO | Chat in useState only | Never in crawlable DOM |
| API key | Backend only | Key never exposed in frontend bundle |
| Conversation memory | useState (session only) | No DB storage needed for chat history |
