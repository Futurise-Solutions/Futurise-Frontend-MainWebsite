/**
 * Solution entry for /solutions/rag-development.
 *
 * Kept in its own module so it could be written while solutions.js was being edited; it is
 * registered there (import + one line in `solutions`), with a matching row in
 * solutionLinks.js, whose build-time guard checks that both lists hold the same slugs in the
 * same order. Same shape, optional fields and CONTENT RULES as the entries in solutions.js;
 * read the rules at the top of that file first.
 *
 * Why a new page and not an upgrade: no existing entry targets RAG or AI support agents.
 * ai-saas-development sells AI products (accounts, credits, billing), and
 * /service/ai-ml-solutions holds the head term "custom AI development services". This page
 * takes the RAG sub-intent, the part of the AI cluster closest to page 1 in Search Console
 * (27 Oct to 23 Nov 2026): "custom rag development services" and "... consultants", RAG
 * on-premise pricing and custom LLM customer support pipelines.
 *
 * Where each claim comes from (Nov 2026):
 *   - `answer`, `capabilities`, `builds`, `stack` and the 14 weeks: the ai-support-agent case
 *     study (utils/Constant/caseStudies.js), restated by sector and region only. Nothing the
 *     case study does not say is claimed as built: no citations shown to users, no
 *     permission sync, no on-premise or self-hosted deployment, no deflection or ticket
 *     figures. Its two week-by-week breakdowns disagree (timeline vs FAQ), so only the
 *     14-week total and the order of the phases are used.
 *   - Advice in the FAQs (when a help-desk bot is enough, permissions checked at retrieval,
 *     citations, test sets, deployment options and cost drivers) restates the live guides
 *     the FAQs link to. No prices: the vendor ranges quoted in the cost guide stay there.
 *   - Timeline and pricing: the studio-wide facts in the CONTENT RULES.
 * No `endNote`: the default closing line (client under NDA, no screenshots) is true here.
 */

export const ragDevelopmentSolution = {
  slug: "rag-development",
  name: "RAG Development",
  market: "United States",
  markets: ["United States", "Global"],
  service: "ai-ml-solutions",
  country: "us",
  caseStudy: "ai-support-agent",

  meta: {
    title: "Custom RAG Development Services for AI Support Agents",
    description:
      "Custom RAG development services: support agents that answer from your own docs, hand off to a person when unsure, and connect to Intercom and Stripe.",
    keywords:
      "custom RAG development services, custom RAG development consultants, RAG development company, RAG chatbot development, AI customer support agent development, custom LLM customer support pipeline, retrieval-augmented generation development, RAG on-premise development, private RAG deployment, RAG support agent",
  },

  hero: {
    eyebrow: "Solutions · RAG & AI Support Agents",
    title: "Custom RAG development,",
    highlight: "grounded in your own documents.",
    subtitle:
      "Support agents that retrieve from your own documentation before they answer, and hand the conversation to a person when their confidence drops.",
  },

  answer:
    "Futurise Solutions builds custom RAG (retrieval-augmented generation) systems for support teams. For a US B2B SaaS company we built a support agent that answers only from documentation retrieved for each question, hands the conversation to a person when its confidence score falls below 0.75, looks up billing in Stripe once the user's session is verified, and is integrated with Intercom. If an off-the-shelf help-desk bot already answers your customers well, we'll tell you to keep it.",

  capabilities: [
    { title: "Retrieval that finds the right passage", desc: "Documentation, release notes and SOPs chunked so that code blocks and numbered steps stay whole, tagged as reference or procedure, and embedded into a vector index. In our build, that did more for grounding than any model upgrade we tested." },
    { title: "Answers grounded in what was retrieved", desc: "The top five passages for each question go to the model inside a strict context window, and the answer is generated from them, not from the model's memory." },
    { title: "A confidence threshold and a hand-off", desc: "Below a set confidence score the agent declines to answer and passes the conversation to a person. In our build the threshold is 0.75, and frustrated sentiment triggers the hand-off early." },
    { title: "Live lookups behind verification", desc: "An intent classifier routes billing and account questions to the right internal API. Billing status, invoices and subscription tier come live from Stripe, and only after the user's session token is verified." },
    { title: "Connected to your support stack", desc: "Documentation, live ticket data and CRM metadata in one vector store, queried in real time, with a front-end widget and an Intercom integration." },
    { title: "Tested before launch, measured after", desc: "Shadow-tested alongside human agents before it answers customers. After launch, a dashboard of deflection rate, query clusters and missed topics shows which gaps in the knowledge base are still creating tickets." },
  ],

  builds: [
    {
      title: "A RAG support agent for a B2B SaaS help desk",
      client: "B2B SaaS company, USA",
      problem: "Repetitive first-line questions (password resets, billing, feature explanations) took most of the support capacity while technical issues waited behind them. Most customers opened a ticket without finding the answer already in the help centre, an earlier keyword-matching chatbot was wrong often enough that users skipped it, and nobody could see which questions came up most. The company also had GDPR and SOC 2 requirements for data handling.",
      built: [
        "Documentation, release notes and SOPs chunked and embedded into a MongoDB Atlas vector index with text-embedding-004",
        "Syntax-aware chunking that keeps code blocks and numbered steps whole, and a metadata taxonomy that separates reference material from procedure",
        "Top-5 semantic retrieval per question, with Gemini 2.5 Flash answering inside a strict context window",
        "Hand-off to a live agent below a 0.75 confidence score, and early on frustrated sentiment",
        "Intent classifier routing billing and account questions to internal APIs, with Stripe lookups after session verification",
        "Front-end widget and Intercom integration",
        "Real-time dashboard of deflection rate, query clusters and missed topics",
        "Shadow testing alongside human agents before customer-facing rollout",
      ],
      stack: ["Google Gemini 2.5 Flash", "text-embedding-004", "MongoDB Atlas Vector Search", "Node.js / Express", "React", "Vercel", "Intercom API", "Stripe API"],
      outcome: "In production 14 weeks after kickoff, answering from retrieved documentation and handing low-confidence conversations to a person. The case study covers it in full.",
    },
  ],

  stack: ["Google Gemini 2.5 Flash", "text-embedding-004", "MongoDB Atlas Vector Search", "Node.js / Express", "React", "Vercel", "Intercom API", "Stripe API"],

  faqs: [
    { q: "Do we need a custom LLM support pipeline, or will our help desk's own AI bot do?", a: "If your needs are simple, start with the bot. An off-the-shelf or no-code support bot is enough when it mostly answers questions from a help centre, collects details and passes the rest to a person. Pilot it, learn which questions matter and where it falls short, then build only for the gaps you have evidence for. Go custom sooner if customer data can't go to a third-party platform, the agent must take actions such as refunds or account changes, you need detailed audit logs, or it has to sit inside your own product. If the bot you have is enough, we'll say so on the call.", link: { href: "/blog/how-to-build-a-custom-ai-agent-for-customer-support-in-2026-no-code-and-low-code-guide", label: "When a no-code support agent is enough" } },
    { q: "How do you stop a RAG agent from making up answers?", a: "By answering only from what was retrieved, and by making it acceptable for the agent to say it doesn't know. In our support agent every answer is generated from the documentation retrieved for that question. If the retrieval score for the top result falls below the threshold (0.75 in that build), the agent says it isn't sure and hands the conversation to a person instead of guessing. Set the threshold from your own test questions: record the score for each answer, find where the wrong ones cluster, set it just above them and review it as your content changes." },
    { q: "Can a RAG assistant respect who is allowed to see which documents?", a: "It can, but only if the check happens at retrieval. Each indexed chunk carries its source document's permissions, and every search is filtered by the asking user's identity and groups before any text reaches the model. An instruction in the prompt is not a control, and filtering the answer afterwards is too late, because the model has already read the restricted text. Show the source with every answer too: a title, a link and ideally the passage, so a reviewer can check it in seconds. In our support agent, billing and subscription details come from a live Stripe lookup made only after the user's session token is verified.", link: { href: "/blog/the-ai-hallucination-trap-how-to-build-trustworthy-ai-agents-in-2026-rag-and-verification-strategies", label: "Secure RAG: permissions, citations and audit logs" } },
    { q: "Can you build RAG on-premise or on a private LLM?", a: "We'll help you choose where the model runs and build the retrieval, permissions and logging around it. There are four realistic set-ups: a hosted model API on enterprise data terms, a model inside your own private cloud account, an open-weight model you host yourself, or fully on-premise. On-premise suits air-gapped environments, and its cost moves from per-token fees to hardware, power, cooling, space and staff. Most companies need something narrower, such as no training on their data, strict retention and full audit logs, which can usually be met far more cheaply. The support agent in our case study uses a hosted model, Gemini 2.5 Flash.", link: { href: "/blog/the-ai-data-privacy-dilemma-how-to-build-compliant-and-secure-ai-systems-in-2026", label: "Private LLM: hosted API, private cloud, self-hosted or on-prem" } },
    { q: "How do you test a RAG system before customers see it?", a: "With a test set built from your own questions and past tickets: questions it should answer, with the source it should use; questions it should decline; and attempts to make it ignore its rules or reveal data it shouldn't. Re-run the set whenever the chunking, embedding model, prompt or model changes. Our support agent was shadow-tested alongside human agents, with its responses tuned, before it moved to customer-facing traffic. After launch, its dashboard of missed topics shows where the knowledge base needs filling.", link: { href: "/blog/security-questions-to-ask-an-ai-vendor", label: "Security questions buyers ask an AI vendor" } },
    { q: "How much does custom RAG development cost?", a: "We quote fixed scope after a free discovery call rather than publish one price. What moves the quote: how many sources the system reads and how messy they are, the integrations (help desk, CRM, billing, internal APIs), how much it may do without review, permissions and logging, and the test set. Running costs sit on top: model and API usage, hosting including the vector database, and maintenance. Where the model runs changes their shape: per-token fees on a hosted API, or GPUs and the people to run them for a self-hosted or on-premise model.", link: { href: "/blog/ai-agent-development-cost-2026-a-global-price-comparison-for-custom-ai-solutions", label: "AI agent development cost in 2026" } },
    { q: "How long does a RAG project take?", a: "You get a timeline with the fixed-scope quote. As a studio-wide guide, an MVP usually takes 6 to 12 weeks and a larger platform 3 to 6 months. For reference, the support agent in our case study took 14 weeks from kickoff to production: knowledge architecture and embedding first, then the retrieval pipeline and guardrails, then the widget and Intercom integration, and finally a supervised rollout alongside human agents." },
    { q: "Can we see a RAG system you've built?", a: "Yes. The support agent is written up as a case study, with the client unnamed: the architecture, the stack, the timeline and what we learnt. On a live call we walk you through how it retrieves, answers and hands off.", link: { href: "/case-studies/ai-support-agent", label: "Read the RAG support agent case study" } },
  ],

  related: ["ai-saas-development", "telegram-bot-development", "whatsapp-crm"],
};
