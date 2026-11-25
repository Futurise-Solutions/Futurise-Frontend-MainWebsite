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

// Chip answers that mention a call get a booking button under them.
export const answersWithBooking = new Set(["How do I start a project?", "What does it cost?"]);

export const predefinedAnswers = {
  "What services do you offer?":
    "We offer AI & ML Solutions, Web Development, App Development, UI/UX Design, Blockchain/Web3 and Digital Marketing, plus dedicated solutions such as Shopify development, WhatsApp CRM, Chrome extensions and hospital management systems: https://www.futurisesolutions.com/solutions",

  "How do I start a project?":
    "Simple! Book a free strategy call and we'll discuss your idea, scope, and timeline. No commitment needed.",

  "What does it cost?":
    "Every project is quoted to its scope, so there is no fixed price list. Book a free call and we'll send a fixed-scope estimate: https://www.futurisesolutions.com/pricing",

  "Show me your portfolio":
    /* ⚠️ NO PROJECT COUNT, AND NO UNNAMED CLIENT. This answer previously claimed "25+
       projects" and named "GDT Exchange". Both contradicted the site: /portfolio publishes
       NINE engagements, /about commits in writing to publishing no project or client
       counts, and the perpetuals trading terminal is deliberately published under its
       product rather than a client name. Name only clients /portfolio names. */
    "We've built property SaaS, AI review platforms, luxury e-commerce and trading terminals, including HOMIES and Marty-QR. Check our portfolio page!",

  // ⚠️ NO NUMBER IN TEXT — see the note in keywordMatcher.js. No number is ever written in
  // text; WhatsApp is offered only as a click-to-chat link.
  "How can I contact you?":
    "Email us at business@futurisesolutions.com, message us on WhatsApp (link on our contact page), use the contact form or book a free call. We reply within one business day: https://www.futurisesolutions.com/contact",

  "How long does a project take?":
    "It depends on scope. A focused MVP typically takes 6 to 12 weeks, and larger platforms 3 to 6 months. We'll give you a clear timeline after the discovery call.",
};
