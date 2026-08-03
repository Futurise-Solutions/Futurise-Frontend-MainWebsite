/**
 * Pricing & engagement content — deliberately no rates, no ranges, no figures.
 *
 * The site ranks for cost queries ("AI agent development cost in New Zealand",
 * "UI/UX design cost") but answered none of them, so price-shoppers landed, found
 * nothing, and left. This page answers the question behind the query — what drives the
 * number, and how the engagement works — which is what a serious buyer actually needs
 * before a first call.
 *
 * Withholding rates is also the stronger commercial position: competitors publishing
 * industry-wide ranges cannot answer "what changes MY price", and a buyer who
 * understands the cost drivers arrives at the call already qualified.
 *
 * Written as self-contained question → answer pairs because answer engines retrieve and
 * cite passages rather than pages; each block below is quotable on its own.
 */

export const pricingMeta = {
  title: "How We Price Projects — Costs, Scope & Engagement",
  description:
    "What actually drives software project cost: scope, complexity, integrations and timeline. How our engagement models, estimates and sprints work. Book a free consultation.",
  keywords:
    "software development pricing, project cost factors, fixed scope vs time and materials, software engagement models, development project timeline, software project ROI",
};

// What moves the number, in the order it usually moves it.
export const costFactors = [
  {
    factor: "Scope and feature depth",
    detail:
      "The single largest driver. Ten screens with simple CRUD cost a fraction of three screens with real-time collaboration, permissions and audit trails. Depth matters far more than page count, which is why counting screens is a poor way to estimate.",
  },
  {
    factor: "Integrations with systems you already run",
    detail:
      "Connecting to a documented, modern API is routine. Connecting to a legacy ERP, an undocumented internal database or a payment provider with strict compliance rules is not. Integration count and integration quality are different questions, and the second one usually decides the estimate.",
  },
  {
    factor: "Data readiness",
    detail:
      "Especially for AI work. If your data is clean, labelled and accessible, model work starts immediately. If it lives across spreadsheets, PDFs and a CRM nobody has audited in three years, the preparation is the project. We assess this before quoting, because getting it wrong is the most common reason estimates move.",
  },
  {
    factor: "Compliance, security and regulatory load",
    detail:
      "Handling health records, financial data or personal information under the NZ Privacy Act or GDPR adds architecture, testing and documentation work that a marketing site never needs. This is scope, not overhead.",
  },
  {
    factor: "Design maturity",
    detail:
      "An existing design system with defined components is the cheapest starting point. A rough idea needs research, wireframes and iteration first. Neither is wrong — but they are different projects, and treating them as the same is how quotes get revised.",
  },
  {
    factor: "Expected scale and reliability",
    detail:
      "An internal tool for forty staff and a consumer product expecting forty thousand concurrent users share almost no architecture. Building day-one infrastructure for scale you will not reach for two years is a common and expensive mistake, so we size deliberately.",
  },
  {
    factor: "Timeline pressure",
    detail:
      "Compressing a schedule means more people working in parallel, which costs more per unit of output, not less. A hard external deadline is a legitimate reason to do it — we will tell you plainly when it is not worth the premium.",
  },
  {
    factor: "What happens after launch",
    detail:
      "Software is not finished at launch. Hosting, monitoring, model or dependency updates, security patching and support are ongoing. We separate these from build cost so you can see the real total, rather than discovering it later.",
  },
];

// Complexity tiers, described by characteristics rather than price.
export const complexityTiers = [
  {
    tier: "Prototype / proof of concept",
    goal: "Prove one risky assumption before committing budget.",
    looksLike:
      "A single core workflow, minimal design polish, sample rather than production data, no scaling requirement. Built to be shown, tested and often thrown away.",
    bestWhen:
      "You need to validate demand, test feasibility, or show something concrete to a stakeholder or investor.",
  },
  {
    tier: "MVP — first production release",
    goal: "Put a real product in front of real users and learn from it.",
    looksLike:
      "The smallest coherent product a customer would genuinely pay for: core workflows, authentication, payments if needed, production infrastructure and monitoring. Deliberately narrow, deliberately real.",
    bestWhen:
      "The concept is validated and you need to reach the market and start compounding learning.",
  },
  {
    tier: "Full production platform",
    goal: "Support a business that is already operating on the product.",
    looksLike:
      "Multiple user roles, third-party integrations, admin tooling, analytics, hardened security, tested scaling and a proper release process.",
    bestWhen:
      "You have traction and the current system is the constraint on growth.",
  },
  {
    tier: "Enterprise / regulated build",
    goal: "Operate reliably under external obligation.",
    looksLike:
      "Compliance requirements, audit trails, SSO, formal QA, penetration testing, documented handover, defined support commitments.",
    bestWhen:
      "You sell to enterprise customers, operate in a regulated sector, or carry contractual reliability obligations.",
  },
];

// How the commercial relationship is structured.
export const engagementModels = [
  {
    model: "Fixed-scope project",
    how: "We define the scope precisely, then quote a fixed price and timeline against it. Changes go through a written change request so the number never moves quietly.",
    goodFor:
      "Well-understood projects with a clear finish line — a website, a defined MVP, a specific integration.",
    tradeoff:
      "Requires real discovery before we can quote, and rewards clear thinking up front. It is the wrong model when the requirements are genuinely still unknown, because pricing uncertainty means pricing risk into the number.",
  },
  {
    model: "Dedicated team / retainer",
    how: "An agreed number of engineers and designers work with you continuously, planned in two-week sprints, with priorities reset each sprint.",
    goodFor:
      "Ongoing product development where priorities change with what you learn from users.",
    tradeoff:
      "No fixed end date, so it needs an engaged product owner on your side to direct the work and protect the value.",
  },
  {
    model: "Discovery engagement",
    how: "A short, paid, standalone piece of work producing a technical plan, architecture, scoped backlog and a firm estimate.",
    goodFor:
      "Large or ambiguous projects where an accurate estimate is impossible without real investigation.",
    tradeoff:
      "An extra step before build starts — but far cheaper than discovering the same unknowns halfway through a fixed-price build.",
  },
  {
    model: "Support and maintenance",
    how: "An ongoing arrangement covering monitoring, updates, security patching, bug fixes and small enhancements.",
    goodFor: "Live products that need to stay secure, current and reliable after launch.",
    tradeoff:
      "Sized to the product's actual needs rather than sold as a flat package, so it requires an honest conversation about what you genuinely need.",
  },
];

// Where the time goes. No costs — just the shape of a project.
export const timelinePhases = [
  {
    phase: "Discovery and scoping",
    output: "Requirements, technical approach, scoped backlog, fixed-scope estimate.",
    note: "Skipping this is the most expensive shortcut available in software.",
  },
  {
    phase: "Design",
    output: "User flows, wireframes, high-fidelity UI, an approved prototype.",
    note: "Changing a screen in Figma takes minutes. Changing it in production takes days.",
  },
  {
    phase: "Build",
    output: "Working software delivered in two-week sprints, reviewable each sprint.",
    note: "You see progress continuously rather than waiting for a single reveal at the end.",
  },
  {
    phase: "Testing and hardening",
    output: "QA, performance work, security review, accessibility checks.",
    note: "Runs alongside build rather than being bolted on at the end.",
  },
  {
    phase: "Launch",
    output: "Production deployment, monitoring, analytics, handover documentation.",
    note: "You receive the code and the infrastructure. There is no lock-in.",
  },
  {
    phase: "Post-launch",
    output: "Support, iteration on real usage data, ongoing improvements.",
    note: "The first month of real users teaches more than the whole build did.",
  },
];

// How to think about whether the project is worth doing at all.
export const roiFramework = [
  {
    question: "What does the current process cost you today?",
    guidance:
      "Hours spent on manual work, multiplied by loaded salary, multiplied by a year. This is usually the clearest number in the whole business case, and the one most often left uncalculated.",
  },
  {
    question: "What is a single additional customer worth?",
    guidance:
      "Average contract value multiplied by expected lifetime. If the product plausibly wins a handful of extra customers a year, that alone often covers the build.",
  },
  {
    question: "What is the cost of not doing it?",
    guidance:
      "Lost deals to better-equipped competitors, staff churn from bad internal tooling, or the compounding cost of a system that gets more expensive to change every month it is left alone.",
  },
  {
    question: "How quickly do you need payback?",
    guidance:
      "A twelve-month payback expectation argues for a narrow, focused MVP. A three-year horizon justifies building for scale from the start. Both are valid — but they produce genuinely different projects, so it is worth deciding deliberately.",
  },
];

// Buyer-intent FAQs, phrased as they are actually searched. Also emitted as FAQPage
// structured data, which is what surfaces this page in AI answers.
export const pricingFaqs = [
  {
    question: "How much does a software project cost?",
    answer:
      "It depends far more on scope, integrations, data readiness and compliance requirements than on the number of screens or the technology used. Rather than quote a range that could not apply to your situation, we run a free 45-minute consultation, establish which factors actually apply to you, and give you a fixed-scope estimate you can rely on.",
  },
  {
    question: "Why don't you publish fixed prices?",
    answer:
      "Because a published figure would be wrong for almost everyone who read it. The same feature can differ severalfold in cost depending on the systems it must integrate with, the state of your data and the compliance obligations you carry. Quoting a number before understanding those factors produces estimates that get revised — which is exactly what clients dislike most.",
  },
  {
    question: "Do you charge fixed-price or hourly?",
    answer:
      "Fixed-scope by default. We define the scope precisely, then commit to a price and timeline against it, with changes handled through a written change request. For ongoing product work where priorities shift each sprint, a dedicated-team arrangement usually serves you better, and we will say so.",
  },
  {
    question: "How long does a project take?",
    answer:
      "A prototype typically takes weeks; an MVP typically takes a few months; a full production platform takes longer and is delivered incrementally rather than in one release. We work in two-week sprints, so you see working software throughout rather than waiting for a single delivery date.",
  },
  {
    question: "What do I need before requesting an estimate?",
    answer:
      "Less than most people assume. A description of the problem, who it is for, any systems it must connect to, and your rough timeline is enough to start. If requirements are genuinely unclear, we will recommend a short paid discovery engagement rather than guessing at a number.",
  },
  {
    question: "Can we start small and expand later?",
    answer:
      "Yes, and for most clients that is the right approach. Starting with a prototype or narrow MVP gets something real in front of users quickly, and what you learn from that usually changes the roadmap. We architect early work so it extends rather than needing to be rebuilt.",
  },
  {
    question: "Do we own the code?",
    answer:
      "Yes. You own the code and the infrastructure, and we hand over full documentation at launch. There is no proprietary platform lock-in and no requirement to keep us on retainer to keep your product running.",
  },
  {
    question: "What happens if the scope changes mid-project?",
    answer:
      "Scope changes are normal on any real project. We handle them with a written change request setting out the impact on cost and timeline before any work starts, so the number never moves without your agreement.",
  },
];
