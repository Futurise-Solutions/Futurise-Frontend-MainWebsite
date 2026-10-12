// Quick-reply chips and their instant answers — zero API calls.
// Shown before the visitor's first message (Zomato-style chips).

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
    /* ⚠️ NO PROJECT COUNT, AND NO UNNAMED CLIENT. This answer previously claimed "25+
       projects" and named "GDT Exchange". Both contradicted the site: /portfolio publishes
       NINE engagements, /about commits in writing to publishing no project or client
       counts, and the perpetuals trading terminal is deliberately published under its
       product rather than a client name. Name only clients /portfolio names. */
    "We've built property SaaS, AI review platforms, luxury e-commerce and trading terminals — including HOMIES and Marty-QR. Check our portfolio page!",

  // ⚠️ NO PHONE NUMBER — see the note in keywordMatcher.js. Owner decision: none is
  // published anywhere, matching /about and the Organization schema.
  "How can I contact you?":
    "Email us at business@futurisesolutions.com, book a free call, or use our contact page. We reply within hours.",

  "How long does a project take?":
    "It depends on scope. Most projects range from 4 to 16 weeks. We'll give you a clear timeline after the discovery call.",
};
