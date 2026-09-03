/**
 * Content for /au — the Australia market page.
 *
 * ⚠️ READ THIS BEFORE EDITING ⚠️
 *
 * Australia is the hardest country page on this site to keep distinct, and the reason is
 * measurable rather than stylistic. Before this page was written, every concept an
 * Australia page would naturally reach for was already claimed: GST, a Privacy Act, Xero,
 * MYOB, the small-domestic-market argument, agritech, tourism and data residency all sit on
 * /nz, and the offshore argument, the integrations section and the pricing model sit on
 * both /nz and /us. A collision map of twenty-six candidate concepts returned zero free.
 *
 * So this page does not argue what the other two argue. It is built on the one thing that
 * is true in Australia and nowhere else on this site: security and data-sharing obligations
 * here are legislated, dated and enforceable, rather than advisory. Every section descends
 * from that. Twenty-four ranking competitor pages were analysed and none of them mention
 * automated decision-making, the 10 December 2026 commencement, the statutory tort, the
 * Consumer Data Right by name, or the twelve-hour reporting rule.
 *
 * Three rules govern everything in this file.
 *
 * Nothing here may repeat /nz, /us, the homepage or a service page — not the arguments, not
 * the section shapes, and not the phrasing. Do not reintroduce Xero, MYOB, GST, agritech or
 * tourism: those belong to New Zealand, and Australia sharing them is exactly why this page
 * has to go somewhere else.
 *
 * Every statutory claim is verifiable public record and carries its date so a reader can
 * check it. Where a figure would have helped but could not be verified, the argument is
 * made without it.
 *
 * No capability is claimed that has not been confirmed. `auRails` deliberately describes
 * what these builds have to satisfy rather than what we have integrated with, because the
 * integration experience behind CDR, Australia Post, superannuation gateways and the
 * Healthcare Identifiers Service was never confirmed. Invoicing currency and response
 * commitments are marked TODO for the same reason. Do not replace a TODO with plausible
 * wording — confirm it first.
 */

export const auMeta = {
  title: "Software Development Company Australia",
  // Under 160 characters so Google renders it whole. Free of invoicing and response-time
  // claims, neither of which is confirmed.
  description:
    "Custom software, AI and SaaS development for Australian businesses — built for the Privacy Act, Consumer Data Right, SOCI Act and the Essential Eight.",
  keywords:
    "software development company Australia, custom software development Australia, AI development company Australia, SaaS development company Australia, web development company Australia, mobile app development company Australia, Consumer Data Right software, Australian Privacy Principles software development",
};

// SECTION 2 — dated obligations already on the reader's roadmap.
//
// This is the page's strongest ground and the reason it exists. Of twenty-four ranking
// competitor pages analysed, zero mention automated decision-making, zero mention the
// 10 December 2026 commencement, and zero mention the statutory tort.
export const auDeadlines = [
  {
    title: "Automated decisions become explainable by law on 10 December 2026",
    detail:
      "The Privacy and Other Legislation Amendment Act 2024 received royal assent on 10 December 2024 with a twenty-four month grace period attached to its automated decision-making provisions, which places commencement on 10 December 2026. If a system makes or substantially informs a decision about a person, its privacy policy has to say so and explain what it does. In practice the engineering work is not the disclosure, it is being able to reconstruct a specific decision months later: what inputs the model saw, which version produced the output, and what a human did with it. Systems that log outcomes but not inputs cannot answer that, and retrofitting the record after launch is considerably harder than capturing it from the start.",
  },
  {
    title: "Privacy is now personally actionable",
    detail:
      "A statutory tort for serious invasions of privacy came into effect on 10 June 2025 under the same Act, covering both intrusion upon seclusion and misuse of private information. It matters here because it moves consequence from a regulator to an individual: a person can bring their own claim where the conduct was intentional or reckless and the invasion serious. For a product team the practical translation is narrower access by default, a real reason recorded for administrative access to a customer record, and internal tooling that does not quietly expose more than the task requires.",
  },
  {
    title: "Breaches are notifiable, and the clock is short",
    detail:
      "The Notifiable Data Breaches scheme obliges organisations to assess a suspected eligible breach and notify the Information Commissioner and affected individuals. Meeting that obligation is a build decision rather than a policy one, because the first question after an incident is always the same and always hard: exactly whose records were reachable. Answering it needs access logs that survive the incident, records that identify the individuals behind the rows, and a way to scope exposure without reading the data itself.",
  },
  {
    title: "The Australian Privacy Principles shape the schema",
    detail:
      "The Australian Privacy Principles under the Privacy Act 1988 govern collection, use, disclosure, correction and cross-border disclosure. Three of them reach the database directly. Collecting only what is reasonably necessary argues against the habit of capturing every field a form could ask for. A right to correction means a record has to be editable without a developer opening a console. And accountability for information disclosed overseas means knowing which third-party service holds what, which is a question about your architecture rather than your vendor list.",
  },
];

// SECTION 3 — the regulated data economy. No equivalent exists on /nz or /us, because no
// equivalent exists in those markets: neither has a legislated economy-wide data-sharing
// right or a critical-infrastructure cyber regime with a statutory reporting clock.
export const auDataEconomy = [
  {
    title: "The Consumer Data Right is an interface obligation",
    detail:
      "Established under Part IVD of the Competition and Consumer Act 2010, the Consumer Data Right lets consumers and small businesses authorise sharing of their data with accredited recipients. It has rolled out sector by sector — banking from 2020, energy from 2022 — and it is still expanding: product data obligations for non-bank lenders commenced on 13 July 2026, consumer data sharing begins on 9 November 2026, and large providers follow on 10 May 2027. No timeline has been announced for superannuation, insurance or telecommunications. If you are a data holder this is not a feature request, it is a published interface with conformance expectations attached, and it belongs in the architecture rather than in a later phase.",
  },
  {
    title: "Critical infrastructure carries a twelve-hour clock",
    detail:
      "The Security of Critical Infrastructure Act reaches eleven sectors, including data storage or processing, financial services and markets, health care and medical, energy, transport, food and grocery, higher education and research, water and sewerage, communications, space technology and the defence industry. The obligation that most changes a build is the reporting one: a cyber incident must reach the Australian Cyber Security Centre within twelve hours. Twelve hours is not a documentation problem. It means detection and triage have to already exist, because a team that discovers an incident by noticing something odd in a dashboard has usually spent the window before the clock starts.",
  },
  {
    title: "The Essential Eight is becoming the default baseline",
    detail:
      "Since August 2024, entities subject to a critical infrastructure risk management program have had to align their cyber risk approach with one of five recognised frameworks — the Essential Eight, the NIST Cybersecurity Framework, C2M2, ISO/IEC 27001, or the Australian Energy Sector Cyber Security Framework. The Essential Eight is the one that shows up most often in Australian procurement, and several of its mitigations are decisions made during development rather than afterwards: how applications are patched, how administrative privileges are separated, and whether multi-factor authentication is genuinely enforced at the boundary rather than merely offered.",
  },
  {
    title: "Where the data physically sits is a design input",
    detail:
      "Australian buyers ask early where information will be stored, and in regulated sectors the answer determines whether a proposal proceeds at all. The major cloud providers operate Australian regions, so the constraint is usually satisfiable — but only if it is known before the architecture is drawn. Choosing a managed service that has no Australian region, or a third-party tool that quietly relays data offshore, is inexpensive to avoid at design time and expensive to unwind once production data exists.",
  },
];

// SECTION 4 — industries, chosen because none appears on /nz (agritech, tourism) and only
// healthcare touches /us, where it is argued through HIPAA rather than Australian health
// identifiers. Described by the shape of the engineering problem, never by naming clients.
export const auSectors = [
  {
    sector: "Mining, resources and energy",
    detail:
      "Operational systems that have to keep working where connectivity does not, and reporting that has to survive an audit years later. The recurring engineering problem is reconciliation: data captured on a site with intermittent connectivity has to merge cleanly once a device is back in range, without a person deciding which version won. Energy also sits inside both the critical infrastructure regime and the Consumer Data Right, so the compliance surface is unusually wide for what often begins as a straightforward internal tool.",
  },
  {
    sector: "Government and public sector",
    detail:
      "Citizen-facing services and the systems behind them, where the procurement process asks harder questions than the brief does. Accessibility is generally assessed rather than assumed, security expectations are stated up front rather than negotiated, and the record of who accessed what tends to matter as much as the feature itself. Building to those expectations from the first sprint is far cheaper than retrofitting them in response to an assessment.",
  },
  {
    sector: "Superannuation and financial services",
    detail:
      "Member portals, reporting layers and the reconciliation engines underneath them. Correctness under partial failure decides these builds, because the failure modes are quiet: a balance that is right on the screen and wrong in the ledger is worse than an outage, and it is usually discovered by a member rather than by monitoring. Financial services also sits inside the critical infrastructure regime, which turns incident detection into a product requirement rather than an operations concern.",
  },
  {
    sector: "Healthcare and medical",
    detail:
      "Clinical and patient-facing systems where the boundary matters more than the feature set. Which services hold health information, which merely reference it, and how the audit trail stays intact across that line are decisions that set the compliance surface for everything built afterwards. Health care and medical is also one of the eleven critical infrastructure sectors, so the twelve-hour reporting expectation applies to organisations that do not usually think of themselves as infrastructure.",
  },
];

// SECTION 5 — reframed per the approved blueprint.
//
// The blueprint flagged that Australia's obvious integration list is New Zealand's list
// (Xero, MYOB), and that the genuinely Australian rails — CDR data access, Australia Post,
// payments, superannuation gateways, the Healthcare Identifiers Service — could not be
// evidenced as things we have built against. Claiming them would be inventing capability.
//
// So this section describes what these builds have to satisfy, not what we have integrated
// with. Every sentence is about the requirement, not about our experience of it.
//
// TODO (Futurise): if integration experience with any of these is confirmed, this section
// can be rewritten in the /nz style — named systems, stated experience. Until then it stays
// as requirements.
export const auRails = [
  {
    name: "Accredited data access",
    detail:
      "Software that consumes Consumer Data Right data has to work within the accreditation model rather than around it, which shapes consent capture, storage limits and deletion far more than it shapes the feature. The consent record itself becomes a first-class object: what was authorised, for how long, and what has to happen automatically when it expires or is withdrawn.",
  },
  {
    name: "Payments and settlement",
    detail:
      "Australian payment flows have to handle real-time settlement, recurring authority and the reconciliation gap between an authorisation and a cleared transaction — the interval where most billing defects actually live. Designing for the failure cases first, rather than the happy path, is what separates a system that reconciles from one that needs a person checking it every morning.",
  },
  {
    name: "Identity and verification",
    detail:
      "Onboarding that verifies a person or a business needs an auditable record of what was checked and when, without retaining more identity data than the check required. Those two requirements pull against each other, and resolving them well usually means storing the result of a verification rather than the documents behind it.",
  },
  {
    name: "Health identifiers",
    detail:
      "Systems touching health information have to key records to the correct national identifiers rather than to a typed name, which removes an entire category of duplicate-record problem before it starts. It also makes the audit question answerable: which clinician accessed which record, for which patient, and under what circumstances.",
  },
  {
    name: "Government and sector reporting",
    detail:
      "Regulatory submissions have to be reproducible: the same period re-run months later should produce the same figures, which is a data-model requirement rather than a reporting one. Systems that compute reports from mutable current state cannot do this, and discovering that during an audit is an expensive way to learn it.",
  },
  {
    name: "Australian-region infrastructure",
    detail:
      "Where residency is a requirement, every dependency has to satisfy it — including the logging, analytics, error reporting and support tooling that rarely appear on an architecture diagram. A single managed service defaulting to an overseas region is enough to make an otherwise compliant system non-compliant.",
  },
];

// SECTION 6 — deliberately NOT the offshore argument used on /nz and /us. Both of those
// turn on time zones, whiteboards and specialist depth. This one turns on assurance: what
// an Australian buyer has to be able to evidence to a procurement team or an assessor.
export const partnerChoice = [
  {
    heading: "When an Australian supplier is the right answer",
    points: [
      "Procurement that requires an Australian legal entity on the contract, which several government panels and large enterprise agreements do outright.",
      "Environments that have been formally assessed, where the assessment itself is the deliverable and cannot be inherited from a supplier who was not part of it.",
      "Work where personnel need clearances, or where the agreement restricts who may access data by location or citizenship.",
      "Programmes whose real constraint is internal sign-off rather than engineering, and where progress depends on being in the room when decisions are made.",
    ],
  },
  {
    heading: "When a distributed team is the right answer",
    points: [
      "Capability that is genuinely scarce and rarely sits idle — production language-model and retrieval engineering, audited smart contracts, computer vision.",
      "Throughput against a scope that is already written down, where the limit is engineering capacity rather than availability in a calendar.",
      "Budgets that need to buy engineering rather than the account layer sitting above it.",
      "Build phases that are well specified, where the expensive discovery work has already happened and what remains is disciplined delivery.",
    ],
  },
  {
    heading: "How these engagements actually go wrong",
    points: [
      "Scope agreed in conversation rather than in writing, then rebuilt twice while both parties remain certain they were clear.",
      "Compliance treated as a phase near the end, when the obligations that matter were architectural decisions taken in week one.",
      "No evidence trail, so an assessor asks a reasonable question and nobody can answer it without reading through source control.",
      "Questions routed through an account manager who has to ask someone else, turning a ten-minute answer into a two-day round trip.",
    ],
  },
];

// SECTION 7 — how estimates are built.
//
// Framed around regulated scope, which is the Australian angle and is not the argument used
// on /nz (currency and rate cards) or /us (what moves an estimate generally). Publishes no
// figures: the cost guides carry those, and repeating them here would put this page in
// competition with content that already ranks.
export const auCostModel = [
  {
    title: "Regulated scope is the biggest single multiplier",
    detail:
      "Two builds with identical feature lists can differ substantially in cost because one of them handles information that carries an obligation. Regulated data raises the floor on access control, logging, testing and the evidence you have to be able to produce later. It is worth establishing during scoping rather than discovering during a security review, because at that point the work is the same but the timeline is not.",
  },
  {
    title: "Evidence costs less when it is designed in",
    detail:
      "Being able to show who accessed what, how a decision was produced, and which records an incident touched is inexpensive when the system is built to record it and expensive when it has to be reconstructed. Most of the cost overruns we are asked to rescue on Australian projects are not feature creep — they are a compliance requirement arriving after the architecture stopped being able to accommodate it cheaply.",
  },
  {
    title: "A written scope before a number",
    detail:
      "We establish what is being built, what already exists and which obligations apply before quoting, and the scope is written down in enough detail that you could hand it to another supplier and get a comparable quote. An estimate follows from that document, and when the document changes the estimate changes visibly with it.",
  },
  {
    title: "Published ranges you can check first",
    detail:
      "Rather than asking you to book a call to learn whether a budget is plausible, we publish detailed cost breakdowns for custom software, SaaS platforms and AI agents. Read the one that matches your project and arrive already knowing whether the numbers are in range. Only three of the twenty-four Australian competitor pages we reviewed publish any figure at all.",
  },
];

// Published cost guides. Real articles already on this site, which is what makes this
// section evidence rather than a claim.
export const auResources = [
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
    title: "AI Agent vs Traditional Chatbot",
    blurb: "Which one a business actually needs, where each fits, and the cost difference between building them.",
    to: "/blog/ai-agent-vs-traditional-chatbot-which-one-does-your-business-really-need-in-2026",
  },
];

// Australian questions. None appears on any other page, and none is a reworded version of a
// New Zealand or United States question — the two that would have collided most directly
// (Xero/MYOB integration, and invoicing with GST) were dropped rather than rephrased,
// because Australia shares both with New Zealand.
//
// TODO (Futurise): answer 9 states no currency terms, and answer 7 states no coverage
// window. Both are commercial commitments and neither is confirmed.
export const auFaqs = [
  {
    question: "When do the new automated decision-making rules apply to our product?",
    answer:
      "From 10 December 2026. The Privacy and Other Legislation Amendment Act 2024 received assent on 10 December 2024 with a twenty-four month grace period on those provisions. If your system makes or substantially informs decisions about people, your privacy policy has to disclose that and explain what the system does. The harder part is engineering: being able to reconstruct a specific past decision, including the inputs and the model version behind it.",
  },
  {
    question: "What does the Consumer Data Right require of our software?",
    answer:
      "It depends whether you hold the data or receive it. Data holders expose a conformant interface; accredited recipients work within rules covering consent, retention and deletion. The regime sits under Part IVD of the Competition and Consumer Act 2010 and has expanded sector by sector, reaching banking in 2020 and energy in 2022, with non-bank lending obligations phasing in through 2026 and 2027. Either way it is architectural, not a later integration task.",
  },
  {
    question: "Do you build to the Essential Eight?",
    answer:
      "We build so the mitigations that are genuinely development decisions are handled — patching, separation of administrative privileges, and multi-factor authentication enforced at the boundary rather than merely offered. Measuring you against the maturity levels is an assessor's job, not ours. Worth knowing too: there is no Essential Eight certificate to hold, so a supplier advertising one is telling you something useful about their rigour.",
  },
  {
    question: "Is our business covered by the SOCI Act?",
    answer:
      "The Security of Critical Infrastructure Act reaches eleven sectors, including data storage or processing, financial services and markets, health care and medical, energy, transport and higher education and research. Many organisations are surprised to be inside it. The obligation that most affects a build is reporting a cyber incident to the Australian Cyber Security Centre within twelve hours, which only works if detection and triage already exist in the system.",
  },
  {
    question: "How do the Australian Privacy Principles change what we build?",
    answer:
      "Mostly at the schema and access layers. Collecting only what is reasonably necessary argues against capturing every field a form could ask for. A right to correction means records have to be editable without a developer opening a console. And remaining accountable for information disclosed overseas means knowing precisely which third-party services hold what, which is an architecture question rather than a procurement one.",
  },
  {
    question: "Can our data stay in Australia?",
    answer:
      "Usually yes, provided it is decided before the architecture is drawn rather than after. The major cloud providers operate Australian regions, so the constraint is generally satisfiable. What catches teams out is the dependencies nobody lists on the diagram — logging, analytics, error reporting and support tooling — where a default configuration can move data offshore without anyone choosing to.",
  },
  {
    question: "Are you an Australian company?",
    answer:
      "No — we are registered in Wellington, New Zealand, with a distributed engineering team. You should have that fact before anything else, because it decides which engagements we are the right choice for and which we are not. Where a contract requires an Australian entity, personnel clearances, or participation in a formal assessment, a local supplier is the correct answer and we will say so rather than compete for the work.",
  },
  {
    question: "How do you compare with a Sydney or Melbourne agency?",
    answer:
      "On assurance a local firm can offer things we cannot, including an Australian contracting entity and participation in assessments that cannot be inherited. Our advantage is capability that rarely sits idle at a single agency — production language-model and retrieval engineering, audited smart contracts, computer vision — together with sustained delivery against a scope that has already been written down.",
  },
  {
    question: "What does custom software cost in Australia?",
    answer:
      "Here the biggest multiplier is usually regulatory scope rather than feature count. Once a system touches information carrying an obligation, the required standard for access control, audit logging and testing rises, and so does the evidence you must be able to produce on request. Two products with identical screens can differ materially in cost for that reason alone. Our published guides set out ranges by project type, so a budget can be sanity-checked before any conversation happens.",
  },
  {
    question: "What do you need from us to start?",
    answer:
      "Enough to understand the problem: what exists today, what it has to do, and which obligations apply to the information involved. If a compliance regime is in scope, knowing that at the outset changes the architecture rather than the timeline, which is why we ask about it before asking about features. We sign your confidentiality agreement before reviewing anything sensitive, and the output of that first session is a written scope rather than a proposal document.",
  },
];
