/**
 * Content for /us — the United States market page.
 *
 * Separated from the page component for the same reason `newZealand.js` is: the copy is
 * the part that gets revised, and keeping it out of JSX makes a content change reviewable
 * without reading layout code.
 *
 * Three rules govern everything in this file.
 *
 * Nothing here may repeat the homepage, a service page, or /nz. The homepage stays the
 * global page, /nz owns everything ending in "New Zealand", and this page answers a
 * different question again — "what changes because your business and your users are in the
 * United States". Overlapping copy would leave pages competing for the same query.
 *
 * Every factual claim is verifiable public record. Statutes are named with their effective
 * date so a reader can check them. Where a number would have helped an argument but could
 * not be verified, the argument is made without it.
 *
 * `ownership` carries NO contractual commitments. Futurise's actual contract terms are not
 * documented anywhere that could be verified, so that section explains why each item must
 * be agreed during onboarding and marks where Futurise-specific language belongs. The same
 * restraint applies to invoicing currency and response times: both are commercial terms,
 * both are unconfirmed, and both are marked TODO rather than guessed. Do not replace a
 * TODO with plausible-sounding wording — confirm it first.
 */

export const usMeta = {
  title: "Software Development Company USA",
  // Under 160 characters so Google renders it whole. Deliberately free of invoicing and
  // response-time claims, neither of which is confirmed.
  description:
    "Custom software, AI and SaaS development for US businesses — built for HIPAA, CCPA and the 20-state privacy landscape, on fixed scope not hourly billing.",
  keywords:
    "software development company USA, custom software development United States, AI development company USA, SaaS development company USA, web development company USA, mobile app development company USA, HIPAA compliant software development, CCPA compliant software",
};

// SECTION 1 — EVIDENCE. First in-page section, by design.
//
// ⚠️ THE EVIDENCE FORK — DO NOT "FIX" IT ⚠️
//
// Do NOT import `clientProof` or `testimonials` from Constant/index.js into this file. The
// cards below are a prose fork written from the same underlying facts, not a re-render of
// those constants. Rendering them here would put homepage sentences verbatim on a second
// URL, which is the duplicate-content failure this page is gated against. /ae carries the
// identical rule for the Infinity Bay record; see the header of uae.js.
//
// The cost of the fork is that new US work has to be added HERE by hand as well as to
// `clientProof`. That cost is accepted deliberately.
//
// THE LIMIT THIS SECTION MUST STATE. Six of the seven portfolio projects were delivered for
// businesses operating in the US market, which is a far stronger record than /ae's single
// engagement. It is also a record with a specific hole in it: this page argues HIPAA and
// PCI DSS at length in SECTION 2, and nothing published evidences an engagement in either.
// Card 2 says so on the page where blurring it would help us most. Do not soften it, and do
// not let breadth of delivery imply regulated-domain experience the record does not show.
//
// Nothing here may claim a testimonial. The site's only testimonial belongs to a Dubai
// client and is the homepage's; `buildCountrySchema` emits no Review node for this reason.
export const usEvidence = [
  {
    title: "Six builds for businesses selling into the US",
    detail:
      "Six of the seven projects on our portfolio were delivered for companies operating in the US market. They run from a property-management platform reporting income, expenses and occupancy across large listing portfolios, to an AI review-capture product aimed at chains with many locations, a luxury jewellery storefront covering fine pieces, watches and bullion, a real-estate search platform structured so individual listings can be found through organic search, a perpetuals trading terminal dense enough for full-time traders, and a hotel booking flow built to take reservations directly rather than surrender them to an intermediary.",
  },
  {
    title: "Where the record stops",
    detail:
      "None of it is a HIPAA engagement, and none of it is a PCI DSS programme. This page argues both at length further down, and our published record evidences neither — so if regulated health data or card-data scope is central to what you are building, ask us for specifics rather than reading them into the list above. Several of these clients also operate across the United States and India rather than being US companies outright, which is the accurate description of the market involved.",
  },
  {
    title: "No one project covering for the rest",
    detail:
      "The six span platform analytics, an AI product, e-commerce, search-led web, a trading interface and booking design, and each one belongs to a different client. That matters because the usual failure in a supplier's portfolio is a single strong project quietly standing behind every capability claimed elsewhere on the site. These are separable: any one can be examined on its own without the others holding it up, and each is published with the problem it solved and screenshots of what shipped.",
  },
];

// SECTION 2 — the merged market + compliance section.
//
// This replaces the "market realities" framing used on /nz. New Zealand had four genuinely
// structural market facts (small domestic market, Xero-centric stack, lean teams, distance).
// The United States has no equivalent — it is the largest market and the default assumption
// of every tool — so forcing that framing here would produce filler.
//
// What IS structurally distinctive about the US is regulatory fragmentation: a buyer who
// assumes one national privacy law is wrong, and the difference lands in the architecture.
export const usMarket = [
  {
    title: "Privacy here is twenty laws, not one",
    detail:
      "Twenty states have comprehensive consumer privacy laws in effect during 2026, and twenty-four have now enacted one. The gap between those two numbers matters: a law that is enacted but not yet in force still sets a date you are building toward, and the schedule is continuous rather than occasional — Indiana, Kentucky and Rhode Island all came into effect on 1 January 2026. No single federal statute overrides them. For software the consequence is that compliance is not a yes-or-no property of your product. It is a question of which user triggers which obligation, and whether your system can tell the difference at the moment it matters rather than during an audit six months later.",
  },
  {
    title: "Compliance decisions land in the architecture, not the policy page",
    detail:
      "Once more than one state regime applies, three engineering decisions stop being optional. Whether a record can be located and exported for one identified person without an engineer writing a script. Whether deletion propagates through backups, event logs and downstream analytics rather than only the primary table. And whether consent state travels with the data instead of living in a separate marketing tool that nobody thinks of as part of the system. Each is a modest design decision at the start and a migration once real customer data exists. We raise all three during scoping for that reason, not because they make the estimate look thorough.",
  },
  {
    title: "Health and payment data raise the floor",
    detail:
      "HIPAA applies wherever protected health information is handled, and its technical safeguards — access control, audit trails, integrity verification, transmission security — are engineering requirements rather than documentation exercises. Where a vendor processes that data on your behalf, a Business Associate Agreement governs the relationship. Payment data brings PCI DSS, whose practical effect is usually the opposite of what people expect: the goal is to shrink scope, because the fewer systems that touch card data, the smaller and cheaper the compliance surface becomes. Both are ultimately decisions about where system boundaries sit, and both are far easier to make before the first schema exists than after.",
  },
  {
    title: "AI systems now carry rules of their own",
    detail:
      "The Texas Responsible Artificial Intelligence Governance Act took effect on 1 January 2026, and it reads as a signal rather than an outlier: AI features are moving from unregulated to governed while most products are still being built. For a team shipping an LLM or agent feature today, three capabilities are worth designing in now rather than retrofitting under deadline. Being able to show what a model was given and what it returned. Keeping a human decision point wherever the output materially affects a person. And knowing precisely which data left your boundary to reach a third-party model, because that answer is difficult to reconstruct later.",
  },
];

// SECTION 3a — the objection every US buyer raises about a supplier that is not US-based.
//
// Answered honestly, including where a US-based team genuinely wins. Deliberately built on
// different arguments from the /nz version: New Zealand's case turned on whiteboards, local
// supplier entities and overnight time-zone advantage. The US case turns on incident
// response, contractual access restrictions, and engineering depth per dollar.
export const deliveryTradeoffs = [
  {
    heading: "Where a US-based team genuinely wins",
    points: [
      "Live revenue systems where an incident at two in the afternoon Eastern needs someone already awake, already holding context, and already able to deploy.",
      "Contracts that restrict who may access data by citizenship or physical location, which some federal, defense and large healthcare agreements do explicitly.",
      "Discovery inside a regulated environment, where the real requirements only surface by sitting beside the people doing the work and watching what they actually do.",
      "Organisations where the binding constraint is internal alignment rather than engineering, and progress depends on someone chasing decisions in person.",
    ],
  },
  {
    heading: "Where distributed delivery genuinely wins",
    points: [
      "Specialist capability no single agency keeps idle on the bench — production LLM and retrieval engineering, audited smart contracts, computer vision pipelines.",
      "Sustained throughput against a scope that is already defined, where the limit is engineering hours available rather than meeting slots in a calendar.",
      "Budgets that need to buy engineering rather than overhead, so a larger share of the money reaches the build instead of the account layer above it.",
      "Work that continues while your team sleeps, so a review left on Friday afternoon has an answer waiting rather than a two-day gap in the middle of it.",
    ],
  },
  {
    heading: "Where distributed delivery fails, and why",
    points: [
      "Work handed over without a written specification, then rebuilt twice at your cost while both sides remain convinced they were perfectly clear the first time.",
      "A time-zone difference treated as a scheduling inconvenience rather than something the workflow is deliberately designed around from the first week.",
      "No named engineer, so every technical question is relayed through someone who cannot answer it and returns a day later with an approximation.",
      "Hourly billing with no fixed ceiling, which quietly rewards the supplier for the work taking longer than either side originally expected.",
    ],
  },
];

// SECTION 3b — the mechanics that make the above workable.
//
// TODO (Futurise): item 4 deliberately does not state a coverage window or a response
// time. Neither is confirmed. Replace the bracketed placeholder with the real commitment
// once it is agreed — do not substitute a plausible number.
export const workingModel = [
  {
    step: "A scoping conversation before any number exists",
    detail:
      "The first call establishes what you are building, what already exists in your stack, where the real constraint sits, and which parts of your data carry regulatory obligations. It is a working session rather than a pitch, and the output is a shared understanding of the problem instead of a proposal deck. If the honest answer is that you do not need us, or that what you want is cheaper to buy than to build, we will say so on that call.",
  },
  {
    step: "A written scope you can take away",
    detail:
      "You leave with the scope in writing, in enough detail to hand to another supplier and get a comparable quote back. That matters more than it sounds: most disputes on software projects trace to a scope that lived only in someone's memory of a conversation. An estimate follows from that document, and when the document changes the estimate changes with it, visibly.",
  },
  {
    step: "A named engineer, not an account manager",
    detail:
      "During delivery you have direct access to the person writing the code. Questions that a project manager would have to forward and return on get answered by someone who can already see the answer on their screen. It also removes a failure mode common to larger suppliers, where the person who understands your system and the person who talks to you are never the same person.",
  },
  {
    // TODO (Futurise): this deliberately states no coverage window and no response time,
    // because neither is confirmed. Add the real commitment here once agreed — a specific
    // overlap window and a response target. Do not substitute a plausible-sounding number.
    step: "Working hours agreed at the start",
    detail:
      "Overlap with your working day is settled during scoping and written into the engagement, so review cycles are predictable from week one rather than discovered in week three. A time difference is only a problem when nobody has decided what it means in practice, and deciding it takes one conversation at the start rather than a month of missed handoffs. The same applies to escalation: knowing in advance who to contact when something breaks outside the overlap window is worth more than a promise that nothing will.",
  },
];

// SECTION 4 — IP, ownership and exit.
//
// ⚠️ READ BEFORE EDITING ⚠️
// This section contains NO contractual commitments, and that is deliberate, not an
// oversight. Futurise's actual terms on IP assignment, work-for-hire, repository custody,
// termination and handover are not documented anywhere that could be verified, and
// inventing them would create a legal exposure rather than merely a content problem.
//
// Every item therefore explains why the term matters and what should be settled during
// onboarding. It does not state what Futurise's answer is. Each entry carries a TODO
// marking exactly where Futurise-specific contractual language belongs once confirmed.
//
// The NDA line is the single exception: signing an NDA before reviewing anything
// confidential is already stated on /nz and was approved there.
//
// Nothing in this section is legal advice, and it must not become legal advice. It
// describes items to agree, not obligations the reader is under.
export const ownership = [
  {
    // TODO (Futurise): insert the confirmed position on IP and code ownership here —
    // whether transfer is an assignment or a licence, the point at which it takes effect,
    // and the treatment of reusable components. Until confirmed this stays generic.
    title: "Settle ownership before work starts, not after",
    detail:
      "Who owns the resulting code, at what point ownership transfers, and whether that transfer is an assignment or a licence are questions with genuinely different answers at different suppliers — and all three are cheap to agree before a repository exists, expensive to argue about once a product is live and funded. Ask any supplier to state their position in the engagement documents rather than describing it on a call, and ask specifically whether they retain rights over reusable components or internal libraries that end up in your codebase. A supplier who cannot answer that clearly has not thought about it, which is itself useful information about how the engagement will run.",
  },
  {
    title: "Confidentiality before anything is shared",
    detail:
      "We sign your NDA before reviewing anything confidential. That covers the discovery stage, where you are describing systems, roadmaps and commercial context long before any contract exists — which is precisely the window most often left uncovered, because both sides are still deciding whether to proceed. If a supplier wants access to your data room or your codebase before any confidentiality agreement is in place, treat that as information about how they operate rather than an administrative detail to sort out later.",
  },
  {
    // TODO (Futurise): insert the confirmed notice period, what the client receives for
    // work completed to date, and the repository/infrastructure access-transfer process.
    title: "Write down what happens if it ends early",
    detail:
      "Engagements end for reasons that have nothing to do with the quality of the work: funding moves, priorities change, a founder leaves, a board decides differently. Three terms are worth agreeing at the start — what notice each side gives, what you receive for work completed to that point, and how repository, environment and infrastructure access transfers back to you. Agreed up front these are administrative paperwork that takes an afternoon. Agreed during an actual disagreement they are neither quick nor cheap, and the party without them written down is usually the one that concedes.",
  },
  {
    // TODO (Futurise): insert the confirmed documentation and knowledge-transfer scope —
    // specifically whether handover is included by default or quoted as a separate item.
    title: "Plan the handover while you still need it",
    detail:
      "The real measure of a finished engagement is whether your team can keep moving without the people who built the thing. In practice that means documentation that survives someone leaving, environment setup another developer can follow without a call, and architectural decisions recorded with the reasoning behind them rather than only the outcome — because the reasoning is what tells a future engineer whether a decision still applies to a situation nobody anticipated. Establish during scoping whether that work sits inside the engagement or arrives as a separate line item, since the two produce very different final invoices and only one of them is a surprise.",
  },
];

// SECTION 5 — how pricing works.
//
// The fixed-scope model and the deliberate absence of a rate card are established positions
// already published on /pricing and /nz, so both are safe to restate. Currency and
// invoicing terms are NOT confirmed and are marked TODO.
//
// This section explains how a price is built. It must never publish figures — the cost
// guides carry those, and duplicating them here would put this page in competition with
// content that already ranks.
export const costModel = [
  {
    title: "What actually moves an estimate",
    detail:
      "Four things account for most of the distance between a cheap quote and an expensive one. How many external systems the software has to stay in sync with, because each one is a contract you do not control. How much of the data is regulated, which sets the floor on access control, logging and testing. How much existing code has to be understood before anything can safely change. And how precisely the scope is defined, which is the only one of the four the buyer fully controls. An estimate produced before those are known is a guess with a number attached to it.",
  },
  {
    title: "Fixed scope rather than an open hourly meter",
    detail:
      "We scope the work, then quote it. If our estimate turns out to be wrong on our side of the line, absorbing that is our problem rather than a variation to bill back to you. Hourly billing pays a supplier more the longer the work takes, which is precisely the wrong incentive when the outcome is fixed and the buyer is the one carrying delivery risk. Fixed scope also forces a conversation about what is genuinely in the build before anyone starts, which is where most of the value of the exercise actually sits.",
  },
  {
    title: "No published rate card, and the reason",
    detail:
      "We publish how a price is built instead of a headline figure, because a number quoted before anyone understands the scope is wrong for almost everyone who reads it — too high for the simple case, too low for the complex one, and useless for comparing suppliers. What drives an estimate is written out in full on our pricing page, and the cost guides below work through real ranges for specific project types so you can calibrate against something concrete rather than a marketing number.",
  },
  {
    // TODO (Futurise): confirm and state the quoting and invoicing currency terms for US
    // engagements here. Deliberately omitted rather than assumed — it is a commercial term.
    title: "Numbers you can check before you call",
    detail:
      "Rather than requiring you to book a call to find out whether your budget is even plausible, we publish detailed cost breakdowns for AI agents, SaaS platforms and custom software builds, with the ranges broken out by scope and complexity. You can read them, compare them against quotes you already hold, and arrive at the first conversation knowing whether the numbers are in the same universe. That is a deliberately unusual position in a market where most suppliers publish nothing at all, and it exists because a sales call is an expensive way for either side to discover a mismatch that a published range would have settled in a minute.",
  },
];

// SECTION 6 — industries, described by the shape of the engineering problem rather than by
// naming clients, because the client names are not ours to publish.
export const usSectors = [
  {
    sector: "Healthcare and digital health",
    detail:
      "Patient-facing applications, clinical workflow tools, and the integration layer that connects them to systems nobody wants to replace. The engineering problem is almost always the boundary: which services hold protected health information, which merely reference it, and how audit trails stay intact as data crosses that line. Draw the boundary tightly and the compliance surface stays small enough to reason about. Draw it loosely and every service in the architecture inherits the obligation, which shows up later as a testing burden nobody estimated.",
  },
  {
    sector: "Fintech and financial services",
    detail:
      "Ledgers, reconciliation engines, reporting layers, and the payment flows running underneath all of it. These builds are decided by correctness under partial failure rather than by feature count — what the system does when a payment provider commits and then times out, or when a webhook arrives twice, or when two updates race for the same balance. A reporting dashboard that disagrees with the ledger by a single cent is a dashboard nobody opens again, and rebuilding that trust costs more than building it correctly did.",
  },
  {
    sector: "B2B SaaS",
    detail:
      "Multi-tenant platforms where the genuinely hard problems arrive with the second enterprise customer rather than the first. Per-tenant data isolation that holds under a misconfigured query. A role model that survives contact with a real org chart. Single sign-on against an identity provider you do not control. And usage metering accurate enough to raise an invoice from without anyone checking it by hand. Every one of those is inexpensive to design in at the start and disproportionately expensive to introduce once production data exists.",
  },
  {
    sector: "Retail and e-commerce",
    detail:
      "Storefronts, subscription billing, and the operational systems that keep them supplied. Two constraints shape the architecture more than any product decision: sales tax varies by jurisdiction and changes without consulting your roadmap, and traffic is spiky enough that the system has to be inexpensive at baseline while absorbing an order-of-magnitude peak without manual intervention. Both are architecture decisions rather than hosting ones, and both are considerably cheaper to make before the first checkout goes live.",
  },
];

// Named integrations. Specificity is the proof — a buyer can tell in one line whether the
// supplier has done this before. Deliberately a different set from the /nz page, because
// the US stack genuinely differs.
export const usIntegrations = [
  {
    name: "Stripe",
    detail:
      "Subscription billing, usage-based pricing, and checkout flows across currencies — including the webhook handling and idempotency work that keeps billing correct when the network is not.",
  },
  {
    name: "Salesforce",
    detail:
      "Two-way synchronisation so pipeline data and product data stop disagreeing, with conflict rules decided deliberately rather than by whichever system happened to write last.",
  },
  {
    name: "HubSpot",
    detail:
      "Lifecycle and marketing automation wired to real product events instead of page views, so the sequence a customer receives reflects what they actually did in the product.",
  },
  {
    name: "Snowflake",
    detail:
      "Analytics pipelines that report from the warehouse rather than the production database, which keeps a heavy quarterly report from competing with live customer traffic.",
  },
  {
    name: "Plaid",
    detail:
      "Bank account linking and transaction data for financial products, including the reconnection and consent-expiry paths that most implementations discover only after launch.",
  },
  {
    name: "Twilio",
    detail:
      "Messaging and voice, together with the consent capture and opt-out handling those channels require — the part that is a compliance obligation rather than a feature.",
  },
];

// Published cost guides. These are real articles already on this site, which is what makes
// this section evidence rather than a claim — and they are the reason /us itself does not
// need to publish figures.
export const usResources = [
  {
    title: "Custom Software Development Cost Guide 2026",
    blurb: "Pricing, timeline, and the factors that move an estimate more than anything else.",
    to: "/blog/custom-software-development-cost-guide-2026-pricing-timeline-and-key-factors",
  },
  {
    title: "SaaS Development Cost Guide 2026",
    blurb: "What a SaaS build costs by stage, and where the budget actually ends up going.",
    to: "/blog/saas-development-cost-guide-2026-pricing-timeline-and-budget-breakdown",
  },
  {
    title: "How Much Does a Custom AI Agent Cost in 2026?",
    blurb: "A breakdown by capability, from a scoped pilot through to a production deployment.",
    to: "/blog/how-much-does-it-cost-to-build-a-custom-ai-agent-in-2026",
  },
  {
    title: "AI Agent Development Cost 2026 — Global Price Comparison",
    blurb: "What the same AI build costs across markets, and why the spread is that wide.",
    to: "/blog/ai-agent-development-cost-2026-a-global-price-comparison-for-custom-ai-solutions",
  },
  {
    title: "Building a Custom AI Agent: ROI and Tech Stack Guide",
    blurb: "Written for US and Canadian startups — architecture choices, model selection, and how to build the return case before committing budget.",
    to: "/blog/how-to-build-a-custom-ai-agent-for-your-business-the-complete-2026-roi-and-tech-stack-guide-for-us-and-canadian-startups",
  },
];

// United States questions. None of these appears in the FAQ set on any other page, and the
// four that run parallel to a /nz question are answered with different substance rather
// than a swapped country name.
//
// TODO (Futurise): answers 5 and 6 deliberately describe what to agree rather than what
// Futurise's terms are. Update them once the contractual position is confirmed.
export const usFaqs = [
  {
    question: "Do you have a US office?",
    answer:
      "No. Futurise Solutions is registered in Wellington, New Zealand, and our engineering team is distributed. That belongs at the top of the answer rather than buried in a footer, because it changes how you should evaluate us. The structure buys specialist depth — production AI, blockchain and mobile engineering — instead of only the skills a single local office happens to have hired. It does not buy someone who can be in your building on Thursday afternoon, and where a project genuinely needs that, we will say so.",
  },
  {
    question: "Are you SOC 2 certified?",
    answer:
      "No, and it is worth knowing that strictly speaking nobody is. SOC 2 is an attestation report issued by a CPA firm against the AICPA's Trust Services Criteria — there is no certificate, no pass mark, and no certifying body, so any supplier describing themselves as SOC 2 certified is describing something that does not exist. If your procurement process requires a SOC 2 Type II report, ask for the report itself rather than the claim, and check the period it covers and which criteria were in scope.",
  },
  {
    question: "How do you handle CCPA and other US state privacy laws?",
    answer:
      "As engineering requirements rather than a policy document. Twenty states have comprehensive privacy laws in effect during 2026, so the practical work is making the system able to locate, export and delete one identified person's data on request without an engineer writing a one-off script, and making deletion actually reach backups, event logs and analytics rather than only the primary table. We raise this during scoping because retrofitting it into a live system costs considerably more than designing it in.",
  },
  {
    question: "Can you build HIPAA-compliant software?",
    answer:
      "Yes. Where protected health information is in scope we build to HIPAA's technical safeguards — access control, audit trails, integrity verification and transmission security — and a Business Associate Agreement governs the arrangement where one is required. The most valuable decision is usually made early and cheaply: keeping the number of systems that touch PHI as small as possible, because every service inside that boundary inherits the obligation and the testing burden that comes with it.",
  },
  {
    question: "Who owns the code and the intellectual property?",
    answer:
      "This should be settled in writing before a repository exists, and we confirm our position in the engagement documents rather than only on a call. Four questions are worth answering explicitly with any supplier: who owns the resulting code, at what point ownership transfers, whether that transfer is an assignment or a licence, and whether the supplier retains rights over reusable components that end up in your codebase. Ask all four, and get the answers in the contract rather than the proposal.",
  },
  {
    question: "What happens if we end the contract early?",
    answer:
      "Engagements end for reasons unrelated to quality — funding moves, priorities shift, people leave — so the terms are worth agreeing at the start rather than during a disagreement. Establish what notice each side gives, what you receive for work completed to that point, and how repository, environment and infrastructure access transfers back to you. We set these out in the engagement documents specifically so there is nothing to interpret if the circumstances ever arise.",
  },
  {
    question: "How much does custom software development cost in the US?",
    answer:
      "It depends on four things more than any others: how many external systems the software must stay in sync with, how much of the data is regulated, how much existing code has to be understood before anything can change, and how precisely the scope is defined. Rather than asking you to book a call to find out, we publish detailed cost breakdowns for custom software, SaaS platforms and AI agents that you can read and compare against quotes you already have.",
  },
  {
    question: "How do you compare with a US-based agency?",
    answer:
      "There are engagements where a domestic agency wins outright, and we would rather name them than compete for work we are not suited to: live systems needing same-hours incident response, and contracts restricting data access by location. Our advantage sits elsewhere — specialist depth a single agency is unlikely to keep idle, covering production LLM and retrieval engineering, audited smart contracts and computer vision, plus sustained throughput against a scope already defined in writing.",
  },
  {
    question: "How do you handle working across time zones?",
    answer:
      "By designing the workflow around the gap rather than treating it as a scheduling problem to solve case by case. Overlap with your working day is agreed during scoping and written into the engagement, and you have a named engineer instead of questions relayed through an account manager. Left unmanaged, a time difference turns a one-day question into a three-day round trip — but that is a process failure rather than a geography one, and it is avoidable.",
  },
  {
    question: "What happens on the first call?",
    answer:
      "It is a working session rather than a sales meeting. We map the system you have today, the outcome you are trying to reach, and which parts of your data carry regulatory obligations that will shape the architecture before a line of code exists. You leave holding a written scope detailed enough to hand to a second supplier for a comparable quote, and the estimate follows from that document. Your NDA is signed before we review anything confidential, including in that first conversation.",
  },
];
