/**
 * Content for /ae — the United Arab Emirates market page.
 *
 * ⚠️ READ THIS BEFORE EDITING ⚠️
 *
 * ── THE EVIDENCE FORK: DO NOT "FIX" IT ───────────────────────────────────────
 *
 * Do NOT import `clientProof` or `testimonials` from utils/clientsReviewsData.js into this file.
 *
 * The evidence section below is a deliberate prose fork of the Infinity Bay record, not a
 * re-render of it. Importing and rendering those constants would reproduce homepage text
 * verbatim on a second URL, which is the exact duplicate-content failure this page is gated
 * against: the homepage is only ~1,950 words, roughly 17% of it is already UAE-flavoured,
 * and the clientProof outcome sentence appears there twice. A third instance here would put
 * the same sentence on two competing URLs.
 *
 * The cost of the fork is that new UAE client work has to be added HERE by hand as well as
 * to `clientProof`. That cost is accepted deliberately. When UAE delivery grows beyond one
 * engagement, revisit this section rather than widening it.
 *
 * Note (25 Nov 2026): caseStudies.js lists `defi-protocol-launch` with location
 * "USA & UAE". That client is unnamed and the case-study page does not show the market, so
 * this page speaks of ONE NAMED engagement and never says "only one". Confirm the market
 * with the owner before citing that case study here.
 *
 * The client NAME is exempt from all of this — "Infinity Bay Trading" is already sitewide
 * footer chrome and appears on every route including /privacy.
 *
 * ── THE OTHER RULES ──────────────────────────────────────────────────────────
 *
 * ONE. The named UAE engagement is WEB AND SEO. It is not AI, SaaS or custom platform
 * work. Nothing here may let one website rebuild stand in for capabilities it does not
 * evidence. That limit is stated in the first section heading rather than buried in a
 * caveat, and FAQ 8 restates it.
 *
 * TWO. Nothing here may repeat the homepage, a service page, /nz, /us, /au or /ca. Five
 * collisions are prohibited outright. Do not argue privacy-law FRAGMENTATION (/us owns
 * "twenty laws, not one"; the UAE story is legal geography you CHOOSE, not fragmentation you
 * suffer). Do not build sections on tax, data residency, or critical-infrastructure cyber.
 * Do not write a government/public-sector item. On Arabic, /ca owns "parity" — the banned
 * phrases are "parity", "second surface", "translation task" and "content, presentation and
 * functionality"; the UAE test is SUFFICIENCY and the real argument is right-to-left
 * engineering. On DIFC Regulation 10, /au and /ca own automated decisions — banned phrases
 * are "explainable by law", "reconstruct a decision", "route to a human" and "principal
 * factors and parameters"; it gets one card, never a section.
 *
 * THREE. Every statutory claim is verifiable public record and carries its date. One point
 * is deliberately NOT asserted: whether the PDPL executive regulations have been issued.
 * Published sources genuinely disagree — a reputable practice guide says they have not been,
 * several vendors cite a 2024 cabinet decision, and the UAE government's own data-protection
 * page mentions neither. Saying so is stronger than picking a side. Do not resolve it here.
 *
 * FOUR. No capability is claimed that has not been confirmed. This page explains Arabic
 * obligations at length and must never imply we deliver in Arabic, translate, or employ
 * Arabic speakers; `buildCountrySchema` is therefore called without a `languages` override.
 * VARA, UAE Pass, Emirates ID and the Peppol network are named as market facts, never as
 * things we have integrated with.
 *
 * TODO (Futurise): invoicing currency and any coverage window remain unconfirmed, carried
 * forward unanswered from /us, /au and /ca. Do not replace a TODO with plausible wording.
 */

export const aeMeta = {
  title: "Software Development Company UAE",
  // Under 160 characters so Google renders it whole. Free of invoicing and response-time
  // claims, neither of which is confirmed.
  description:
    "Custom software, AI and SaaS development for UAE businesses, built for DIFC and ADGM data rules, Arabic RTL interfaces and the 2026 e-invoicing mandate.",
  keywords:
    "software development company UAE, custom software development UAE, AI development company UAE, SaaS development UAE, web development UAE, mobile app development UAE, software development company Dubai, Arabic RTL application development",
};

// SECTION 1 — EVIDENCE. First in-page section, by design.
//
// Most country pages lead with compliance because they have no named local work to lead
// with. This one has, so proof goes first and the limit goes in the heading beside it.
//
// ⚠️ Written from the Infinity Bay facts, NOT from clientProof's wording. See the fork rule
// at the top of this file. Do not paste the testimonial quote or the clientProof `work` and
// `outcome` strings in here in any form.
export const aeEvidence = [
  {
    title: "One named engagement, in Dubai",
    detail:
      "Infinity Bay Trading is a Dubai wholesale supplier working across food, hospitality and industrial goods. Their site ran on WordPress, loaded slowly and was largely invisible in search. We moved it onto Astro so pages ship as static HTML, reorganised the catalogue around the way buyers look for stock, and put indexing on a proper footing. We can name them because they agreed to be named, and their site carries our credit in its own footer.",
  },
  {
    title: "What that engagement was not",
    detail:
      "It was web and search work. It was not an AI build, a SaaS platform or a custom internal system. We say so on the page where blurring it would help us most, because the alternative is letting one website rebuild stand in for capabilities it does not evidence. Our AI, SaaS and blockchain work was delivered for other clients, and it is on the portfolio and in our case studies.",
  },
  {
    title: "How to check any of this",
    detail:
      "Every project we reference is on the portfolio with the client named, the problem stated and screenshots attached, and the Infinity Bay testimonial on our homepage is signed with the founder's name and his company, so you can look him up. Some suppliers here lead with large client names or headline numbers. Whoever you shortlist, us included, ask for one reference you can verify without their help.",
  },
];

// SECTION 2 — the jurisdiction thesis. The strongest ARGUMENT on the page, immediately after
// the strongest EVIDENCE. No other country page discusses choosing a legal jurisdiction
// inside one country, which is what makes this free ground.
//
// Card 2 is the deliberate non-assertion on the executive regulations. Card 3 is the only
// permitted appearance of DIFC Regulation 10.
export const aeJurisdictions = [
  {
    title: "Four places to be registered, three data laws",
    detail:
      "A company here can sit on the mainland, inside a commercial free zone such as Dubai Internet City or DMCC, or inside DIFC or ADGM. The last two matter most for software, because they are common-law jurisdictions running their own data protection statutes rather than the federal one. Two teams building an identical product a few kilometres apart can therefore owe different duties to the same user. That is a question to settle before the schema, not after launch.",
  },
  {
    title: "The federal law, stated carefully",
    detail:
      "Federal Decree-Law No. 45 of 2021 has been in force since 2 January 2022 and governs personal data processing outside those free-zone regimes. We are deliberately not telling you what its implementing regulations require, because published sources disagree about whether they have been issued at all. A reputable practice guide says they have not, while several vendors cite a 2024 cabinet decision. Take that detail from counsel rather than from a development agency, including this one.",
  },
  {
    title: "DIFC reaches AI systems directly",
    detail:
      "Inside DIFC, Regulation 10 has applied since September 2023 to systems processing personal data autonomously or semi-autonomously. It places duties on the parties deploying and operating those systems rather than on the technology, so the obligation follows whoever runs the thing in production. Shipping an AI feature inside DIFC is a different compliance question from shipping the same feature on the mainland, and the answer turns on an incorporation decision usually taken by somebody else.",
  },
  {
    title: "Incorporation reaches past compliance",
    detail:
      "Where the entity sits also decides whether it can contract directly with mainland customers and how its income is treated, since a qualifying free zone company pays nothing on qualifying income and is taxed normally on everything else. None of that is ours to advise on. It matters here because it is generally settled before a supplier is appointed, and it constrains architecture in ways that are cheap to accommodate early and expensive to unpick later.",
  },
];

// SECTION 3 — e-invoicing. Free ground: no other page on this site mentions it. The value is
// that the dates are published and unambiguous, which is rare in compliance content.
export const aeInvoicing = [
  {
    title: "The dates are already published",
    detail:
      "Invoicing here is moving to a structured electronic format on a fixed schedule. A voluntary pilot opens on 1 July 2026, large businesses come into scope on 1 January 2027, and smaller businesses follow on 1 July 2027. Unlike most compliance work there is no interpretive grey area about whether it applies to you. If your product issues invoices, the only real question is which of those three dates is yours.",
  },
  {
    title: "A format and a network, not a PDF",
    detail:
      "Invoices have to be issued as structured XML against the PINT AE schema and passed through an Accredited Service Provider: a Peppol-certified operator approved by the Ministry of Finance. That is materially different from rendering a document and emailing it. The data has to be complete and correctly typed at the moment of issue, because a schema either validates or it does not, and fields that were optional or free text in your system stop being either.",
  },
  {
    title: "Retrofitting is the expensive path",
    detail:
      "Most billing systems can eventually produce a compliant document. The costly discovery is that the underlying records cannot populate one: an identifier never captured, a tax treatment inferred at render time rather than stored, or line items that exist only inside a template. Working out what the schema needs while the data model is still open is a short conversation. Doing it against a live ledger is a migration with an external deadline attached.",
  },
];

// SECTION 4 — Arabic. HIGHEST cannibalisation risk on the page: /ca owns the French argument.
// The separation is substantive, not cosmetic. /ca's test is parity; this test is
// sufficiency. /ca's language is left-to-right; this one mirrors the entire interface. Keep
// every sentence on the right-to-left engineering problem and off the /ca framing.
export const aeArabic = [
  {
    title: "The legal test is sufficiency",
    detail:
      "Consumer rules require that customers here receive sufficient information in Arabic (contract terms, pricing, product descriptions and advertising), with other languages permitted alongside it. That is a lighter test than some markets apply, and worth knowing precisely, because over-scoping Arabic costs as much as under-scoping it. A dedicated Arabic language law has been drafted with a rollout described for 2026 and 2027, but it is a draft and should be planned for rather than complied with.",
  },
  {
    title: "Right-to-left is an interface rewrite",
    detail:
      "The engineering cost is not the words. The layout mirrors: navigation, icons, progress indicators, table columns, chart axes and anything carrying a directional meaning. Then bidirectional text arrives, where an Arabic sentence containing a Latin product code or a figure runs in two directions at once and defeats naive truncation, cursor handling and selection. Components not built for this rarely mirror cleanly, and the repair usually belongs in the design system rather than the pages.",
  },
  {
    title: "What we do here, and what we do not",
    detail:
      "We build the mechanism: the localisation layer, directional styling, formatting for dates, numerals and currency, and tests that catch a layout breaking under mirroring. We do not write Arabic copy and we do not translate. That needs a native standard suited to this market and belongs with people who do it properly. A supplier implying they cover both is usually planning to machine-translate your customer-facing text, which is the version readers notice immediately.",
  },
];

// SECTION 5 — licence-first products. Free ground: no page mentions virtual asset regulation.
//
// Card 3 states plainly that our blockchain work was not delivered under a Dubai licence.
// That is the /au auRails discipline applied to a market where we DO have adjacent evidence:
// name the real capability, refuse the adjacent claim.
export const aeLicence = [
  {
    title: "Virtual assets are licensed in Dubai",
    detail:
      "Dubai regulates virtual asset activity through an authority established under Dubai Law No. 4 of 2022, running a full market regime since February 2023 with twelve rulebooks and seven categories of regulated activity. If a product issues, custodies, exchanges or brokers virtual assets from Dubai, the licence is not a later formality. It governs what the product may do, for whom, and with what disclosures. Practitioners describe 2026 as the year those rulebooks are enforced.",
  },
  {
    title: "The build follows the permission",
    detail:
      "This inverts the usual order of work. Normally a team builds and compliance is arranged around it; here the category applied for determines the feature set, the onboarding flow, the record-keeping and the disclosures before anything is designed. We are not licensing advisers and will not act as though we were. What we will do is ask which category you are pursuing before proposing an architecture, because a wallet, an exchange and an issuance are different products.",
  },
  {
    title: "Where we have and have not done this",
    detail:
      "We have built production blockchain systems, including a perpetuals trading terminal, and that work is on the portfolio under the client's name. None of it was delivered under a Dubai virtual asset licence. If your build needs a supplier who has been through that process, that is a fair requirement and we are not the answer to it. If it needs engineers who have shipped a demanding trading interface, that is a different question.",
  },
];

// SECTION 6 — sectors. Grouped by the UAE obligation or market condition that reaches them,
// because the obvious industry slots are exhausted across /nz, /us, /au and /ca. Item 1 is
// the sector of the named UAE engagement.
export const aeSectors = [
  {
    sector: "B2B trading, wholesale and distribution",
    detail:
      "The sector our named engagement here sits in. Catalogues that are large, shallow and constantly changing, where the commercial problem is that buyers search for a product rather than a company, and the technical problem is that most catalogue sites render slowly enough to lose them first. What decides these builds is how the catalogue is structured and how fast a page reaches a buyer on a phone, rather than the length of the feature list.",
  },
  {
    sector: "Real estate and proptech",
    detail:
      "Listing platforms, portfolio dashboards and the reporting underneath them. The recurring difficulty is that property data arrives from several sources that disagree, and the system has to show one number without quietly choosing a winner. We have built in this category for clients in other markets rather than in the Emirates, which is worth stating rather than leaving to inference. Listings are also the part of a product most likely to be read in Arabic.",
  },
  {
    sector: "Virtual assets and tokenisation",
    detail:
      "Products touching virtual assets from Dubai, where the regulatory category is settled before the roadmap is. The engineering problems are the familiar hard ones: correctness under partial failure, custody boundaries, and interfaces dense enough for expert users without becoming unusable, sitting on top of a permission that governs what may be offered at all. The compliance surface is unusually wide relative to the size of the first release.",
  },
  {
    sector: "Free zone companies selling into the mainland",
    detail:
      "Businesses that incorporated in a free zone for speed and ownership, then found their customers on the mainland. Systems built for the first situation frequently do not fit the second: invoicing, contracting entity, tax treatment and now electronic invoicing all change. The work is usually less about new features than about a data model that assumed one entity and one set of rules when it now has to represent two.",
  },
];

// SECTION 7 — fit. FIFTH instance of this argument on the site, so every point turns on
// something only true in the UAE. It shares no reasoning with /nz (whiteboards, NZ entity,
// overnight time zone), /us (incident response, citizenship restrictions), /au (assessed
// environments, clearances) or /ca (research credits, French).
export const aeFit = [
  {
    heading: "When a UAE supplier is the better answer",
    points: [
      "Work needing someone who can sit with a free zone authority, a regulator or a bank in person, repeatedly.",
      "Products where Arabic has to be owned end to end, including the copy and the judgement about how it reads here.",
      "Contracts requiring a UAE licensed entity as the supplier, which several larger and government-adjacent processes do outright.",
      "Builds shaped by a Dubai virtual asset licence, where having been through that process before is genuinely worth paying for.",
    ],
  },
  {
    heading: "When a distributed team is the better answer",
    points: [
      "Engineering depth needed intensely for a period and then not at all, which is expensive to carry on a local payroll.",
      "Delivery against a scope already written down, where the constraint is capacity rather than time in anyone's calendar.",
      "Work that is ordinary product engineering, where no licence, entity or language requirement decides the outcome.",
      "Budgets that need to reach the build rather than the layer of account management sitting above it.",
    ],
  },
  {
    heading: "How these engagements go wrong here",
    points: [
      "Arabic scoped as a translation line item, when mirroring was a design system decision taken months earlier.",
      "Electronic invoicing treated as a finance project, then found to be a data model problem with a published deadline.",
      "The incorporation question never asked, so the architecture assumes a jurisdiction the client is not actually in.",
      "A licence category chosen after the product was designed, forcing onboarding and disclosure to be rebuilt.",
    ],
  },
];

// The two pricing considerations folded in from the removed cost section. The standalone
// estimates section was cut because /ae deliberately does not target rate-card queries and
// the shape already exists on four pages. Only what is genuinely UAE-specific survives.
//
// Publishes no figures: the cost guides carry those. Makes NO claim about how many
// competitors publish pricing — of the pages reviewed during research, one published none
// and one used a budget selector, which is not a large enough sample to generalise from.
//
// TODO (Futurise): quoting and invoicing currency for UAE engagements is not confirmed and is
// deliberately absent. Confirm before adding it.
export const aePricingNotes = [
  {
    title: "Jurisdiction moves the number before features do",
    detail:
      "Two identical briefs can price differently because of where the company is registered. A DIFC entity shipping an AI feature carries obligations a mainland entity does not, and a virtual asset product carries a category decision ahead of a roadmap. We establish this during scoping rather than at a security review, because by then the work is the same size and the timeline is not.",
  },
  {
    title: "Electronic invoicing is scope, not a later task",
    detail:
      "If your product raises invoices, the schema requirement lands inside the data model rather than beside it, and it arrives on a published date. Treating it as a phase after launch is what turns a modest piece of work into a migration. We would rather it sat in the estimate at the start, where it is small.",
  },
];

// Published cost guides. Real articles already on this site, which is what makes this section
// evidence rather than a claim. Ordered differently from /us, /au and /ca, with every blurb
// rewritten — a fourth identical block would be a measurable duplicate-content contribution.
export const aeResources = [
  {
    title: "Custom Software Development Cost Guide 2026",
    blurb: "What a build costs stage by stage, and which decisions move the figure furthest.",
    to: "/blog/custom-software-development-cost-guide-2026-pricing-timeline-and-key-factors",
  },
  {
    title: "AI Agent Development Cost 2026: Global Price Comparison",
    blurb: "The same agent build priced market by market. It is the comparison worth having before shortlisting.",
    to: "/blog/ai-agent-development-cost-2026-a-global-price-comparison-for-custom-ai-solutions",
  },
  {
    title: "SaaS Development Cost Guide 2026",
    blurb: "Where the budget goes on a multi-tenant platform, and what the second enterprise customer costs.",
    to: "/blog/saas-development-cost-guide-2026-pricing-timeline-and-budget-breakdown",
  },
  {
    title: "AI Agent vs Traditional Chatbot",
    blurb: "Which of the two a business actually needs, and the honest cost difference between them.",
    to: "/blog/ai-agent-vs-traditional-chatbot-which-one-does-your-business-really-need-in-2026",
  },
];

// Emirates questions. None appears in the FAQ set on any other page. Questions 8, 9 and 10
// give answers that are commercially unhelpful to us, which is precisely why they are here.
//
// Question 7 is the only surviving Open Finance coverage — the standalone card was cut
// because it duplicated this answer.
//
// TODO (Futurise): answer 9 states no coverage window and no invoicing currency. Both are
// commercial commitments and neither is confirmed.
export const aeFaqs = [
  {
    question: "Free zone, mainland, DIFC or ADGM: does it change our software?",
    answer:
      "Yes, more than most teams expect. DIFC and ADGM run their own data protection statutes rather than the federal one, so an identical product can owe different duties depending on where the company is registered, and DIFC additionally reaches systems that process personal data autonomously. Because the incorporation decision is usually taken before a developer is appointed, tell us which one you are in at the start. It changes architecture, not just paperwork.",
  },
  {
    question: "Which data protection law applies to our product?",
    answer:
      "It depends on your entity and, for DIFC, on where your users are. Federal Decree-Law No. 45 of 2021 has applied across the country since 2 January 2022. DIFC operates under its own law, amended in July 2025 so that it reaches controllers processing the data of DIFC residents regardless of where those controllers are incorporated. ADGM runs a separate regime again. This is a question for counsel, and the answer shapes the build.",
  },
  {
    question: "Is our product ready for UAE e-invoicing?",
    answer:
      "The test is whether your data model can populate a structured schema, not whether you can produce a document. Invoices move to XML on the PINT AE schema, sent through a Ministry-approved Accredited Service Provider. A voluntary pilot opens on 1 July 2026, large businesses follow on 1 January 2027 and smaller ones on 1 July 2027. Most systems fail on missing or inferred fields rather than on the format itself.",
  },
  {
    question: "Does our app need to be in Arabic?",
    answer:
      "If you sell to customers here, plan for it. Consumer rules require sufficient information in Arabic (contract terms, pricing, descriptions and advertising), with other languages allowed alongside. A dedicated Arabic language law has been drafted with a rollout described for 2026 and 2027, but it remains a draft. The larger cost is rarely the words: it is that the interface has to mirror, which is a design system decision rather than a content one.",
  },
  {
    question: "Are there UAE rules for AI features?",
    answer:
      "There is no binding federal AI statute. There is a national strategy and a charter issued in June 2024, both setting expectations without creating enforceable duties, and from January 2026 an AI system sits as an advisory member of Cabinet. Inside DIFC the picture differs: Regulation 10 has applied since September 2023 to systems processing personal data autonomously, placing duties on those deploying and operating them.",
  },
  {
    question: "Do we need a licence to build a token or wallet product?",
    answer:
      "If you are operating from Dubai, answer that before design rather than after. Virtual asset activity is regulated under an authority established by Dubai Law No. 4 of 2022, with twelve rulebooks and seven categories of regulated activity, and the category you pursue determines the feature set, onboarding and disclosures. We are not licensing advisers, so we ask which category you are seeking before proposing an architecture.",
  },
  {
    question: "What does the Open Finance framework mean for a fintech build?",
    answer:
      "The Central Bank has established a framework with its own licence category for providers sharing data or initiating services on a customer's behalf. What makes it unusual internationally is that it is centralised: a single API hub and a common trust framework, rather than each institution exposing its own interface. That removes some integration work and concentrates the rest into meeting one specification and holding the right permission.",
  },
  {
    question: "Have you actually delivered anything in the UAE?",
    answer:
      "Yes. The engagement we can name is the website of Infinity Bay Trading, a Dubai wholesale supplier, which we moved off WordPress onto Astro and restructured for search. Their founder is quoted on this site by name and their own site carries our credit. That engagement was web and search work, not AI, SaaS or a custom platform. Our work in those categories was delivered for other clients and is on the portfolio and in our case studies.",
  },
  {
    question: "Do you have a UAE office or trade licence?",
    answer:
      "No. Futurise Solutions is registered in Wellington, New Zealand, with a distributed engineering team, and we hold no entity or licence in the Emirates. That belongs near the top of an answer rather than in a footer, because it rules us out of some work entirely: anything requiring a UAE supplier entity, personnel based here, or a regulated licence. Where that is your constraint, a local firm is the correct answer and we will say so.",
  },
  {
    question: "Can you work in Arabic?",
    answer:
      "No. We build the localisation layer, the directional styling and the tests that keep a mirrored interface from breaking, but the Arabic itself needs a native standard suited to this market and we would have you source it separately. We say so because the alternative (implying coverage and quietly machine-translating customer-facing text) is something readers notice immediately.",
  },
];
