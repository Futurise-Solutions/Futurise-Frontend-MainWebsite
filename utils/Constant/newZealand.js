/**
 * Content for /nz — the New Zealand market page.
 *
 * Separated from the page component for the same reason `pricing.js` is: the copy is the
 * part that gets revised, and keeping it out of JSX makes a content change reviewable
 * without reading layout code.
 *
 * Two rules govern everything in this file.
 *
 * Nothing here may repeat the homepage or a service page. The homepage stays the global
 * page and answers "what does this company build"; this page answers "what is it like to
 * build software in New Zealand, and what changes because you are here". Overlapping copy
 * would leave two pages competing for the same query and win neither.
 *
 * Every factual claim is either verifiable public record or a fact about how we already
 * work. There are no invented statistics, clients, reviews, awards or price figures. Where
 * a number would have helped the argument but could not be verified, the argument is made
 * without it — see `costModel`, which explains how we quote in NZD without inventing bands
 * the /pricing page deliberately refuses to publish.
 */

export const nzMeta = {
  title: "Software Development Company New Zealand",
  // Kept under ~160 characters so Google renders it whole rather than truncating.
  description:
    "Custom software, AI and SaaS development for New Zealand businesses: fixed-scope quotes in NZD, Privacy Act 2020 handled, NZ business-hours delivery.",
  keywords:
    "software development company New Zealand, custom software development NZ, AI development company New Zealand, SaaS development New Zealand, app development New Zealand, software developers Auckland, software developers Wellington",
};

// Why building software in New Zealand is structurally different. Deliberately free of
// market-size statistics: the ones worth quoting could not be verified to a primary
// source, and an unsourced figure on a page whose whole argument is credibility would
// cost more than it earned.
export const marketRealities = [
  {
    title: "A domestic market that forces you offshore early",
    detail:
      "New Zealand's population means most software here runs out of domestic addressable market long before it runs out of roadmap. That changes what you build first: multi-currency, multi-timezone and export-ready data handling stop being version-three problems and become architectural decisions you make in week one. Building them in later is the single most common rewrite we are asked to rescue.",
  },
  {
    title: "Cloud accounting is the centre of the stack",
    detail:
      "Xero was founded in Wellington, and cloud-first accounting became normal here earlier than in most markets. The practical result is that a New Zealand business system is rarely a greenfield build. It is an integration problem. Your software has to sit alongside the ledger, not replace it, and the integration is usually where the project is won or lost.",
  },
  {
    title: "Small teams, senior expectations",
    detail:
      "New Zealand companies tend to run lean technology teams, often with one or two people carrying an entire platform. That shapes what good delivery looks like: documentation that survives someone leaving, code a new developer can read without a handover, and no dependency on a specialist who is only available through us.",
  },
  {
    title: "Distance is a delivery constraint, not a slogan",
    detail:
      "Being twelve to twenty hours ahead of the markets many suppliers work from is either a problem or an advantage depending entirely on how the engagement is structured. Left unmanaged it turns a one-day question into a three-day round trip. Structured deliberately, work lands overnight and reviews happen in your morning.",
  },
];

// The objection every NZ buyer raises and no competitor answers directly. Answering it
// honestly — including where offshore genuinely loses — converts better than claiming to
// be local, and is the only version of this argument we can actually stand behind.
export const offshoreTradeoffs = [
  {
    heading: "Where a local team genuinely wins",
    points: [
      "Workshops that need a whiteboard and the whole room present.",
      "Work governed by contracts that require a New Zealand legal entity as supplier.",
      "Projects where the main risk is organisational rather than technical, and progress depends on someone chasing a stakeholder in person.",
    ],
  },
  {
    heading: "Where distributed delivery genuinely wins",
    points: [
      "Specialist capability that no single local team keeps on the bench: production LLM and RAG engineering, audited smart contracts, computer vision.",
      "Sustained throughput on a defined scope, where the constraint is engineering hours rather than meetings.",
      "Work that continues while your team sleeps, so a review request left on Friday evening has an answer waiting Monday morning.",
    ],
  },
  {
    heading: "Where offshore fails, and why",
    points: [
      "Scope handed over without a written specification, then rebuilt twice at your cost.",
      "Hourly billing with no fixed ceiling, which rewards the supplier for the project taking longer.",
      "No named engineer, with questions routed through an account manager who cannot answer them.",
    ],
  },
];

// Sectors we are actually asked about by New Zealand enquirers. Described by the shape of
// the software problem rather than by naming clients, because the client names are not
// ours to publish.
export const nzSectors = [
  {
    sector: "Agritech and primary industries",
    detail:
      "Traceability from paddock to export document, compliance records that survive an audit, and field applications that keep working where connectivity does not. The hard requirement is almost always offline-first data capture that reconciles cleanly once a device is back in range.",
  },
  {
    sector: "Professional services and finance",
    detail:
      "Practice platforms, client portals and reporting layers that sit on top of an existing ledger. These projects live or die on integration fidelity: a portal that disagrees with the accounting system by one cent is a portal nobody trusts twice.",
  },
  {
    sector: "Tourism and hospitality",
    detail:
      "Seasonal demand curves, multi-currency payment handling and booking flows that behave under a traffic spike an order of magnitude above baseline. Systems here have to be cheap to run in the off-season and elastic in peak, which is an architecture decision, not a hosting one.",
  },
  {
    sector: "SaaS founders building for export",
    detail:
      "Products designed in New Zealand for customers who mostly are not. The recurring work is making the product legible to a buyer in another market: currency, tax treatment, data residency and support hours that do not assume the customer is awake when you are.",
  },
];

// Named integrations, because no competitor page we reviewed names any. Specificity is the
// proof — a buyer can tell in one line whether you have done this before.
export const nzIntegrations = [
  { name: "Xero", detail: "Invoices, contacts, payments and reconciliation against a live ledger." },
  { name: "MYOB", detail: "Payroll and accounting sync for businesses not on Xero." },
  { name: "Windcave", detail: "Card and recurring payment flows for New Zealand merchants." },
  { name: "Stripe", detail: "Multi-currency subscription billing for products selling offshore." },
  { name: "NZ Post", detail: "Shipping rates, label generation and tracking against live courier data." },
  { name: "HubSpot & Salesforce", detail: "Two-way CRM sync so sales and product data stop disagreeing." },
];

// Compliance obligations that apply to New Zealand software, stated as public record.
export const nzCompliance = [
  {
    title: "Privacy Act 2020",
    detail:
      "In force since 1 December 2020, replacing the Privacy Act 1993, with materially stronger expectations around how personal information is stored, disclosed and moved offshore. In practice this drives three engineering decisions on most builds: where the database physically lives, what is logged and for how long, and whether a person can be exported or erased on request without a developer writing a one-off script.",
  },
  {
    title: "GST at 15%",
    detail:
      "New Zealand GST has been 15% since 1 October 2010. Any system that quotes, invoices or reports revenue has to handle it correctly at the boundary, including the case that trips up most imported software, where a New Zealand seller invoices an overseas customer and the treatment changes.",
  },
  {
    title: "NZBN and entity data",
    detail:
      "The New Zealand Business Number gives every registered entity a single persistent identifier. Where a platform onboards other businesses, keying records to the NZBN rather than to a typed company name removes an entire category of duplicate-record problem later.",
  },
];

// How pricing works, without publishing figures. The /pricing page deliberately does not
// carry a rate card; inventing NZD bands here to look competitive would contradict it and
// break the one thing this page is selling.
export const costModel = [
  {
    title: "Quoted and invoiced in NZD",
    detail:
      "You are quoted in New Zealand dollars and invoiced in New Zealand dollars, so the number you approve is the number that reaches your accounts. No currency drift between the estimate and the invoice.",
  },
  {
    title: "Fixed scope, not an open hourly meter",
    detail:
      "We scope the work, then quote it. If the estimate is wrong on our side, that is our problem to absorb, not a variation to bill. Hourly billing pays a supplier more for taking longer, which is the wrong incentive on a fixed outcome.",
  },
  {
    title: "No rate card, and a reason",
    detail:
      "We publish how a price is built rather than a headline number, because a figure quoted before anyone understands the scope is wrong for almost everyone who reads it. What drives the estimate is written out in full on our pricing page.",
  },
  {
    title: "A free scoping conversation first",
    detail:
      "Before any number exists there is a call to establish what you are actually building. If the honest answer is that you do not need us, that is a useful outcome and costs you nothing.",
  },
];

// The engagement mechanics that make a distributed team workable from New Zealand.
export const workingModel = [
  {
    step: "Scoping call in NZ business hours",
    detail:
      "Booked in your working day, not ours. The output is a written understanding of scope, not a sales pitch.",
  },
  {
    step: "Fixed-scope estimate before commitment",
    detail:
      "A written scope and estimate you can take away and compare. We sign your NDA before reviewing anything confidential.",
  },
  {
    step: "Overnight build, morning review",
    detail:
      "Work progresses through the New Zealand night and lands for review in your morning, with a named engineer answering questions directly rather than through an account manager.",
  },
  {
    step: "Response within one business day",
    detail:
      "Every enquiry and every question during delivery gets an answer inside one New Zealand business day.",
  },
];

// Existing, published New Zealand guides. These are real articles on this site, which is
// what makes the resources section evidence rather than a claim.
export const nzResources = [
  {
    title: "AI Agent Development Cost in New Zealand (2026)",
    blurb: "What drives the price of a custom AI agent build, and how to judge an estimate.",
    to: "/blog/ai-agent-development-cost-in-new-zealand-2026-pricing-roi-and-implementation-guide",
  },
  {
    title: "AI Automation for Small Businesses in New Zealand",
    blurb: "Where automation pays back for a small NZ team, and where it does not.",
    to: "/blog/ai-automation-for-small-businesses-in-new-zealand-the-complete-2026-growth-guide",
  },
  {
    title: "UI/UX Design Cost in New Zealand (2026)",
    blurb: "What design work costs here, what changes the number, and what you get.",
    to: "/blog/uiux-design-cost-in-new-zealand-2026-pricing-process-and-complete-guide",
  },
  {
    title: "Why Offshore Software Development Fails Kiwi Startups",
    blurb: "The failure patterns we see most, and the Xero and HubSpot integrations that fix them.",
    to: "/blog/scaling-kiwi-startups-why-offshore-software-development-fails-and-how-custom-ai-and-saas-integrations-xero-hubspot-drive-nz-growth",
  },
];

// New Zealand-specific questions. None of these appears in the FAQ set on any other page.
export const nzFaqs = [
  {
    question: "Are you a New Zealand company?",
    answer:
      "Futurise Solutions is registered in Wellington and our address and company details are on our contact page. Our engineering team is distributed, which is what lets us keep specialist AI, blockchain and mobile capability available rather than only what one local office happens to employ. We say this plainly because you should know exactly what you are buying before the first call, not after it.",
  },
  {
    question: "Will I be working with someone in New Zealand business hours?",
    answer:
      "Scoping calls are booked in your working day, and every enquiry gets an answer inside one New Zealand business day. During delivery you have a named engineer rather than an account manager relaying questions. Work progresses overnight in New Zealand time, so reviews are generally waiting for you in the morning.",
  },
  {
    question: "What does custom software cost in New Zealand?",
    answer:
      "We quote and invoice in New Zealand dollars, on fixed scope rather than an open hourly meter. We do not publish a rate card, because a figure quoted before anyone understands the scope is wrong for almost everyone who reads it. Our pricing page sets out every factor that moves an estimate, and our New Zealand cost guides work through the numbers for AI agent and design projects specifically.",
  },
  {
    question: "How do you compare with hiring an Auckland or Wellington agency?",
    answer:
      "For work that needs a whiteboard and the whole room present, or a New Zealand supplier entity on the contract, a local agency is the better answer and we will say so. Where we are stronger is specialist capability that a single local team is unlikely to keep on the bench (production LLM and RAG engineering, audited smart contracts, computer vision), and sustained throughput on a defined scope.",
  },
  {
    question: "Can you integrate with Xero, MYOB or Windcave?",
    answer:
      "Yes. Xero and MYOB for accounting and payroll, Windcave for New Zealand card and recurring payments, Stripe where a product bills internationally, and NZ Post for shipping rates and tracking. Most New Zealand business software is an integration problem rather than a greenfield build, and the integration is usually where the project is won or lost.",
  },
  {
    question: "How do you handle Privacy Act 2020 obligations?",
    answer:
      "The Privacy Act 2020 has been in force since 1 December 2020 and sets clear expectations about storing personal information, disclosing it, and moving it offshore. On a build this becomes three concrete decisions we make with you: where the database physically lives, what gets logged and for how long, and whether a person's data can be exported or erased on request without someone writing a one-off script.",
  },
  {
    question: "Do you invoice in NZD with GST?",
    answer:
      "Quotes and invoices are in New Zealand dollars. New Zealand GST has been 15% since 1 October 2010, and any system we build that quotes, invoices or reports revenue handles it correctly at the boundary, including the case where a New Zealand seller invoices an overseas customer and the treatment changes.",
  },
  {
    question: "What happens on the first call?",
    answer:
      "It is a scoping conversation, not a pitch. We establish what you are building, what already exists, and what the real constraint is. You leave with a written understanding of scope, and an estimate follows. We sign your NDA before reviewing anything confidential, and if the honest answer is that you do not need us, we will tell you.",
  },
];
