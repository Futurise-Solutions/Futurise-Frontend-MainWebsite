// Topic-matched end-of-article offers, keyed by post slug. BlogCTA checks this before the
// category routing (BLOG_CATEGORY_ROUTES), so a post listed here gets copy that matches its
// subject; every other post keeps the category-based band unchanged.
// Copy only restates what the post and the published portfolio already say.
const CALL = "Book a free 45-minute call";

const RAG = {
  eyebrow: "Planning a RAG assistant or support agent?",
  heading: "Answers from your own documents, with a hand-off when it isn't sure",
  body: "We built a RAG support agent for a US B2B SaaS company: it answers from the company's documentation and hands the conversation to a person when its confidence drops. In a free 45-minute strategy call we'll look at your documents, systems and data rules, and tell you whether to build or use an off-the-shelf bot.",
  buttonLabel: CALL,
  proofLink: { href: "/case-studies/ai-support-agent", label: "Read the RAG support agent case study" },
  secondaryLink: { href: "/solutions/rag-development", label: "Custom RAG development" },
};

const HOTEL = {
  eyebrow: "Planning a direct-booking website?",
  heading: "More direct bookings, built around the PMS you already use",
  body: "We designed the direct booking experience for Platinum Peak Hotels as a UI/UX and conversion design project. We're not a booking engine or PMS vendor, so we build around the one you choose. In a free 45-minute strategy call we'll map your booking flow, engine options and measurement plan.",
  buttonLabel: CALL,
  proofLink: { href: "/portfolio#platinum-peak-hotels", label: "See the Platinum Peak Hotels project" },
  secondaryLink: { href: "/solutions/hotel-booking-website-development", label: "Hotel booking websites" },
};

const SHOPIFY = {
  eyebrow: "Running a Shopify store?",
  heading: "A store that works as one buying path",
  body: "We reworked a D2C brand's Shopify product page, cart drawer, upsells and checkout, and stayed on as its development partner. In a free 45-minute strategy call we'll look at your store and flag where shoppers drift away.",
  buttonLabel: CALL,
  proofLink: { href: "/case-studies/shopify-cro-d2c-brand", label: "Read the Shopify CRO case study" },
  secondaryLink: { href: "/solutions/shopify-development-cro", label: "Shopify development and CRO" },
};

export const BLOG_CTA_OVERRIDES = {
  "hotel-pms-booking-engine-channel-manager-explained": HOTEL,
  "hotel-direct-booking-website-reduce-ota-commission": HOTEL,
  "property-management-software-development-build-vs-buy": {
    eyebrow: "Weighing build vs buy?",
    heading: "A straight answer: buy, build or a mix of both",
    body: "We built HOMIES, a PropTech client's property management dashboard with income, expense and unit analytics. In a free 45-minute strategy call we'll give you a straight buy, build or hybrid answer, and a fixed-scope estimate if building makes sense.",
    buttonLabel: CALL,
    proofLink: { href: "/portfolio#homies-proptech", label: "See the HOMIES project" },
    caseStudyLink: { href: "/case-studies/saas-platform-scale", label: "Read the SaaS platform case study" },
    secondaryLink: { href: "/solutions/property-management-software", label: "Property management software" },
  },
  "whatsapp-business-api-pricing-and-setup-guide": {
    eyebrow: "Planning a WhatsApp CRM or bot?",
    heading: "WhatsApp connected to the CRM your team already uses",
    body: "We built a WhatsApp CRM module inside a production CRM: bulk campaigns, templates, catalogues and live chat. In a free 45-minute strategy call we'll scope yours.",
    buttonLabel: CALL,
    proofLink: { href: "/solutions/whatsapp-crm", label: "See how our WhatsApp CRM works" },
    secondaryLink: { href: "/solutions/whatsapp-crm", label: "WhatsApp CRM development" },
  },
  "shopify-vs-woocommerce-for-d2c-brands": SHOPIFY,
  "shopify-cro-checklist-for-d2c-stores": SHOPIFY,
  "the-ai-hallucination-trap-how-to-build-trustworthy-ai-agents-in-2026-rag-and-verification-strategies": RAG,
  "the-ai-data-privacy-dilemma-how-to-build-compliant-and-secure-ai-systems-in-2026": RAG,
  "how-to-build-a-custom-ai-agent-for-customer-support-in-2026-no-code-and-low-code-guide": RAG,
  "ai-agent-vs-traditional-chatbot-which-one-does-your-business-really-need-in-2026": RAG,
};
