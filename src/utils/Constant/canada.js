/**
 * Content for /ca — the Canada market page.
 *
 * ⚠️ READ THIS BEFORE EDITING ⚠️
 *
 * Canada sits in the opposite position to Australia, and editing it as though it were the
 * same page will break it.
 *
 * Australia was hard because every concept it needed was already claimed. Canada has six
 * genuinely free concepts — French-language obligations, accessibility as a filing duty,
 * SR&ED, retail payments registration, supplier supervision, and three instruments that
 * changed in 2026. What Canada does NOT have is an unsophisticated competitive field.
 * Canadian competitor pages already name PIPEDA, PHIPA, provincial PIPA, CASL, AODA, WCAG
 * and OSFI. Naming a statute is table stakes here, not differentiation. This page therefore
 * argues from the six free concepts and never from "we have heard of PIPEDA".
 *
 * Four rules govern everything in this file.
 *
 * ONE. Nothing here may repeat the homepage, a service page, /nz, /us or /au — not the
 * arguments, not the section shapes, not the phrasing. Three collisions are prohibited
 * outright and must not be reintroduced. Do not argue privacy-law FRAGMENTATION: /us owns
 * "twenty laws, not one" and Canada's federal-provincial patchwork is structurally the same
 * argument. Do not build a section on sales tax: /nz owns GST and /us owns sales tax varying
 * by jurisdiction. Do not build a section on data residency or on critical-infrastructure
 * cyber: /au owns both. Bill C-8 appears in exactly one FAQ answer, and only because the
 * honest answer inverts Australia's.
 *
 * TWO. Every statutory claim is verifiable public record and carries its date, and the
 * in-force status is stated exactly. Several Canadian instruments are passed but NOT
 * operative — the PIPEDA data-mobility right waits on an order in council and on sector
 * regulations, and the Critical Cyber Systems Protection Act has an empty Schedule 2, so no
 * organisation currently carries its obligations. Getting that right is the strongest
 * authority signal available on this page. Softening it into "new rules require…" would be
 * the most common competitor error, reproduced.
 *
 * THREE. No capability is claimed that has not been confirmed. This page explains French
 * language obligations at length and must never imply that we deliver in French, that we
 * translate, or that we employ francophone staff. It describes the ENGINEERING of a
 * bilingual product and says plainly that the French copy itself is a separate specialism.
 * For the same reason `buildCountrySchema` is called without a `languages` override, so the
 * structured data continues to say English only. Interac, Canada Post and the Real-Time Rail
 * are named as market facts, never as integrations we have built.
 *
 * FOUR. The SR&ED section argues against our own commercial interest, deliberately. The
 * residency rule is real, it is verifiable, and it is the single highest-trust thing this
 * page can say. Do not soften it.
 *
 * TODO (Futurise): invoicing currency and any coverage window remain unconfirmed, carried
 * forward unanswered from /us and /au. Do not replace a TODO with plausible wording.
 */

export const caMeta = {
  title: "Software Development Company Canada",
  // Under 160 characters so Google renders it whole. Free of invoicing and response-time
  // claims, neither of which is confirmed.
  description:
    "Custom software, AI and SaaS development for Canadian businesses — built for Quebec's Law 25 and Bill 96, AODA accessibility, CASL and the 2026 banking rules.",
  keywords:
    "software development company Canada, custom software development Canada, AI development company Canada, SaaS development company Canada, web development company Canada, mobile app development company Canada, AODA compliant software development, Quebec Law 25 software",
};

// SECTION 2 — the thesis.
//
// Every other country page on this site argues about the data behind the product: /nz about
// integration, /us about governing personal data across jurisdictions, /au about legislated
// security and data sharing. Canada's distinctive obligations land on the surface the user
// actually touches — the language it renders in, whether it can be operated without sight or
// a mouse, whether a person can contest a decision, and whether a message may be sent at all.
// That is the one framing no other page here uses, and it is what this section establishes.
export const caInterface = [
  {
    title: "The product may have to exist in French",
    detail:
      "The Charter of the French Language, amended by Bill 96 and assented to on 1 June 2022, treats commercial websites and software as material that Quebec consumers and business clients are entitled to receive in French. The requirement is parity rather than presence: the French version has to match the other language in content, presentation and functionality, so a translated marketing page attached to an English-only application does not satisfy it. Since 1 June 2025 the rules also govern prominence, and no language may be given greater visual weight than French.",
  },
  {
    title: "Accessibility is a filing obligation, not a best practice",
    detail:
      "Under Ontario Regulation 191/11 public-facing web content had to meet WCAG 2.0 Level AA by 1 January 2021 for public sector organisations and for private organisations with fifty or more employees. Federally regulated organisations work to WCAG 2.1 Level AA under the Accessible Canada Act. What makes this different from a design preference is the paperwork attached: organisations with twenty or more employees file an accessibility compliance report, and the next one is due 31 December 2026. A province-wide move to WCAG 2.2 is expected in 2027.",
  },
  {
    title: "An automated decision needs a route to a human",
    detail:
      "Section 12.1 of Quebec's Law 25 has applied since 22 September 2023. Where a decision is based exclusively on automated processing of personal information, the person has to be told at the time of the decision, given the principal factors and parameters behind it, and offered the opportunity to submit observations to someone who is in a position to review it. That last part is a screen, a queue and a role — not a paragraph in a privacy policy. It is also self-limiting in a useful way: where the human review is genuine, the decision stops being exclusively automated.",
  },
  {
    title: "Messaging carries its own consent regime",
    detail:
      "Canada's Anti-Spam Legislation governs commercial electronic messages on a consent basis rather than an opt-out one, and its mechanics are specific enough to be build requirements. An unsubscribe request has to be honoured within ten business days, and the unsubscribe mechanism has to stay valid for at least sixty days after the message was sent. Systems that record a marketing preference but not the evidence behind it — what was consented to, when, and by which route — cannot answer the only question that matters if the consent is ever challenged.",
  },
];

// SECTION 3 — Quebec in its own right.
//
// Quebec is the single largest Canada-only differentiator on this page and the one thing no
// competitor page examined during research covers at all. Deliberately framed as an
// engineering and product problem, because the translation industry already owns the
// language framing and we are not a translation supplier.
export const caQuebec = [
  {
    title: "Bilingual is an architecture decision, not a content task",
    detail:
      "Teams usually discover the cost of French late, because it looks like a content problem and behaves like a structural one. Strings living inside components rather than in a resource layer, layouts that break when text expands, dates and currency formatted for one locale, emails and PDFs generated from templates nobody counted, and a QA plan that now has to cover every path twice. None of that is difficult when it is decided in week one. All of it is expensive once a product is live, which is why we raise it during scoping rather than treating it as a later phase.",
  },
  {
    title: "Where our part ends, and where it does not",
    detail:
      "We build the mechanism: the internationalisation layer, the locale routing, the parity checks that stop one language quietly falling behind the other, and the tests that catch it when it does. We do not write French copy and we do not provide translation — that is a separate specialism, it needs to be Quebec French rather than French generally, and you should source it from someone who does it properly. Saying so costs us nothing and saves a conversation later, because a supplier who implies otherwise is telling you something about how they scope.",
  },
  {
    title: "Portability has a format requirement attached",
    detail:
      "Since 22 September 2024 Law 25 has given individuals the right to receive computerised personal information they provided in a structured and commonly used technological format, with the request answered within thirty days. Guidance published by the Quebec government points to formats such as CSV, XML and JSON, and specifically treats images and PDFs as not meeting the requirement. Exporting a rendered document is therefore the intuitive answer and the wrong one. Law 25 also expects a privacy impact assessment when a project acquires, develops or overhauls an information system involving personal information.",
  },
];

// SECTION 4 — the 2026 instruments.
//
// This is the page's freshness asset. Bill C-15 received assent on 26 March 2026 and Bill C-8
// on 15 June 2026, so most published guidance predates both. Precision about what is NOT yet
// in force matters more here than anywhere else on the page.
export const caChanges2026 = [
  {
    title: "Screen scraping is on its way out",
    detail:
      "Bill C-15, the Budget 2025 Implementation Act, No. 1, received royal assent on 26 March 2026 and replaced the earlier Consumer-Driven Banking Act with a fuller framework. Two parts of it reach software directly. Financial data sharing moves onto accredited interfaces, and screen scraping — collecting a customer's data by logging in with their credentials — becomes an offence rather than a tolerated workaround. Any product still acquiring bank data that way has a migration ahead of it, and the sequencing of that migration is a product decision as much as a technical one.",
  },
  {
    title: "The regulator changed, which changes who you answer to",
    detail:
      "Supervision of the consumer-driven banking framework now sits with the Bank of Canada rather than the Financial Consumer Agency of Canada, alongside its existing retail payments mandate. Accreditation, the public registry and the assessment of applicants run through it. The technical standards, the accreditation criteria and the scope of participating entities and data types are still to come through regulation, so the honest position in mid-2026 is that the framework exists in statute and the detail a build would need does not yet exist. Read access has been described as the first phase, with write access targeted later.",
  },
  {
    title: "A federal portability right exists, but is not in force",
    detail:
      "The same bill amended PIPEDA to add the first federal data-mobility right, requiring an organisation to disclose an individual's personal information to another designated organisation on request. It is worth knowing precisely what that does and does not mean today. The right comes into force on a day fixed by order of the Governor in Council, and it operates only once regulations establish a data-mobility framework for the sector concerned. Nothing is owed under it yet. Building toward it now is reasonable planning; describing it as a current obligation is not.",
  },
  {
    title: "The cyber statute passed with nobody designated",
    detail:
      "Bill C-8 received royal assent on 15 June 2026, amending the Telecommunications Act and enacting the Critical Cyber Systems Protection Act for federally regulated sectors including telecommunications, banking, nuclear energy, clearing and settlement, federally regulated transportation, and interprovincial pipelines and power lines. The telecommunications amendments took effect on assent. The Act's own obligations begin on dates fixed by order in council, and its schedule of designated operator classes is empty, so no organisation carries them yet. It is a thing to watch rather than a thing to comply with today.",
  },
];

// SECTION 5 — supplier supervision.
//
// No other country page frames the supplier as a regulated dependency of the client. This is
// free ground and it is genuinely useful, because the questionnaire arriving from a bank
// client is the moment most teams first meet OSFI.
export const caSupervision = [
  {
    title: "Your bank client has to account for you",
    detail:
      "OSFI's Guideline B-10 on third-party risk management took effect on 1 May 2024 and applies to federally regulated financial institutions. Its practical consequence for a software supplier is indirect but concrete: the institution is accountable for risk arising from its third-party arrangements, so a supplier becomes an entry in a register with controls attached to it. The security questionnaire that arrives after the contract is signed is usually this, and it is far easier to answer from a system that was built to produce evidence than from one where the answers have to be reconstructed.",
  },
  {
    title: "Technology risk has a named guideline behind it",
    detail:
      "Guideline B-13 on technology and cyber risk management took effect on 1 January 2024 and sets expectations for how federally regulated institutions govern technology, manage change, and run operations. A supplier does not comply with B-13 — the institution does. But the expectations flow down through the arrangement, which is why questions about environment separation, change control, access review and incident handling arrive on projects that seemed, at the proposal stage, to be a straightforward build.",
  },
  {
    title: "Handling payments is now a registration, not a feature",
    detail:
      "Under the Retail Payment Activities Act the transition window closed on 7 September 2025. Since 8 September 2025, an entity that intends to perform retail payment activities must be registered with the Bank of Canada before performing them. This catches teams out because the trigger is the activity rather than the self-description: a platform that moves funds on behalf of its users may be a payment service provider whether or not it thinks of itself as one. It is a question worth settling during scoping, since the answer can change the architecture and the launch sequence.",
  },
  {
    title: "Safeguarding and reporting are build requirements",
    detail:
      "Registered providers have to document a framework for managing operational risk and responding to incidents, and where they hold end-user funds those funds have to be safeguarded — held in a segregated trust account, or covered by insurance or a guarantee from an unaffiliated financial institution, in an amount that keeps pace with what is actually held. There is an annual report attached; the first fell due on 31 March 2026. Systems that commingle balances, or that cannot show the coverage position on a given date, make that reporting considerably harder than it needs to be.",
  },
];

// SECTION 6 — SR&ED.
//
// ⚠️ This section argues AGAINST us and that is the point. The residency rule is real and
// competitors avoid it precisely because it is unfavourable to offshore suppliers. Stating it
// plainly is the highest-trust content available on this page. Do not soften it, and do not
// offer to "support" an SR&ED claim — that capability is not confirmed.
export const caSred = [
  {
    title: "The rule that decides this",
    detail:
      "The Scientific Research and Experimental Development programme is the largest source of federal support for research and development in Canada, and software work can qualify. The constraint that matters when choosing a supplier is where the work happens. Eighty per cent of amounts paid to arm's-length contractors are eligible only where the SR&ED work is performed in Canada. Bill C-15 improved the programme in other ways, raising the expenditure limit for the enhanced refundable credit and restoring eligibility for certain capital expenditures, but it did not change that.",
  },
  {
    title: "What this means for working with us",
    detail:
      "Development we perform outside Canada is not eligible contractor expenditure for your claim. If the credit is a material part of how the project is funded, that is a genuine reason to prefer a supplier performing the work in Canada, and we would rather you weigh it before the engagement than discover it during a filing. Suppliers do advertise SR&ED support without mentioning the residency rule. Ask any of them where the work will physically be performed, and ask before the proposal rather than after it.",
  },
  {
    title: "Where it still does not decide anything",
    detail:
      "The credit only reaches work that qualifies as SR&ED in the first place — systematic investigation directed at resolving a technological uncertainty. A great deal of valuable software is not that. Building a well-understood integration, a reporting layer, a customer portal or a second version of something that already works is ordinary engineering, and no supplier's location changes its treatment. Establishing early which parts of a roadmap could plausibly qualify is worth more than assuming the whole project does, because the assumption is usually generous.",
  },
];

// SECTION 7 — sectors.
//
// The obvious sector slots are exhausted across /nz, /us and /au: healthcare, fintech,
// government, energy and mining, agritech, tourism, B2B SaaS and retail are all claimed. The
// four below are defined by the Canadian obligation that reaches them rather than by
// industry, which is why they do not collide. Described by the shape of the engineering
// problem, never by naming clients.
export const caSectors = [
  {
    sector: "Products with Quebec users",
    detail:
      "Defined by jurisdiction rather than by industry, because the obligations follow the user. A product with a meaningful Quebec user base inherits language parity, the automated-decision route to a human, and a portability right with a format requirement — regardless of whether it is a marketplace, a scheduling tool or an internal platform. The engineering consequence is that the locale layer, the consent record and the export path stop being separate features and start being one design problem.",
  },
  {
    sector: "Payments and money movement",
    detail:
      "Not fintech as a category, but the narrower question of whether a system performs a retail payment activity and therefore needs registration before launch. The recurring problem is that funds flow is discovered late: a platform adds balances, or holds money between a transaction and a payout, and a feature turns into a regulatory trigger. Safeguarding, segregation and being able to evidence the coverage position on a given date are all much cheaper as design decisions than as retrofits.",
  },
  {
    sector: "Suppliers to regulated institutions",
    detail:
      "Software companies whose customers are banks, insurers or their service providers, where the buyer's own supervision reaches through the contract. These builds are judged on what can be evidenced rather than on what works — environment separation, change control, access review, incident handling — and the questions usually arrive after the deal, from a risk team who were not in the sales conversation. Building the evidence trail from the first sprint is the difference between answering a questionnaire and reconstructing a year of decisions.",
  },
  {
    sector: "Public-facing services under accessibility duties",
    detail:
      "Organisations whose web content is covered by AODA or the Accessible Canada Act, which is a far wider group than the public sector alone. The engineering reality is that conformance is decided by component behaviour rather than by a remediation pass — focus management, keyboard paths, name and role on custom controls, and error handling that a screen reader can actually follow. Retrofitting those into a finished interface routinely costs more than building them, and the compliance report has a date on it either way.",
  },
];

// SECTION 8 — the local-versus-distributed question.
//
// This is the fourth instance of this argument on the site, so it is built entirely on
// Canadian grounds and shares no reasoning with /nz (whiteboards, NZ supplier entity,
// overnight time zone), /us (incident response, citizenship restrictions, discovery in
// regulated environments) or /au (assessed environments, clearances, internal sign-off).
// Every point below turns on something that is only true in Canada.
export const partnerFit = [
  {
    heading: "When a Canadian supplier is the better answer",
    points: [
      "Projects where the research and development credit is part of the funding model, because contractor work has to be performed in Canada to be claimable.",
      "Products where French has to be owned end to end rather than implemented, including the copy itself and the judgement about what reads correctly in Quebec.",
      "Procurement that requires a Canadian contracting entity, which several provincial and broader public-sector processes do outright.",
      "Arrangements where a regulated buyer needs supplier controls evidenced within its own jurisdiction as part of its third-party oversight.",
    ],
  },
  {
    heading: "When a distributed team is the better answer",
    points: [
      "Engineering depth that is needed intensely and then not at all, which is expensive to carry on a permanent local payroll.",
      "Delivery against a scope that is already written down, where the limiting factor is capacity rather than availability in a calendar.",
      "Work that is ordinary engineering rather than experimental development, so the research credit was never going to apply to it.",
      "Budgets that need to reach the build rather than the layer of account management sitting above it.",
    ],
  },
  {
    heading: "How these engagements actually go wrong here",
    points: [
      "French treated as a translation pass before launch, when it was an architecture decision in week one.",
      "Accessibility booked as an audit near the end, which finds problems in components rather than in content.",
      "A research credit assumed rather than checked, and the residency question asked after the invoices exist.",
      "Consent captured as a preference flag with no record of what was agreed to, when, or through which route.",
    ],
  },
];

// SECTION 9 — estimates.
//
// Framed around the two things that genuinely move a Canadian number — a second language
// surface and conformance work — plus the credit that changes the net figure. It shares no
// argument with /nz (currency and rate cards), /us (the four estimate drivers) or /au
// (regulated scope as a multiplier).
//
// Publishes no figures: the cost guides carry those. It also makes NO claim about how many
// competitors publish pricing, because unlike Australia, the Canadian pages reviewed during
// research generally do.
//
// TODO (Futurise): quoting and invoicing currency for Canadian engagements is not confirmed
// and is deliberately absent. Confirm before adding it.
export const caCostModel = [
  {
    title: "A second language is a second surface",
    detail:
      "The most common estimating mistake on Canadian projects is treating French as a percentage uplift on content. It is closer to a second surface of the same product: layouts that hold when text expands, resource files instead of inline strings, notifications and generated documents in both languages, and a test plan that covers each path twice. Decided at the start it is a modest structural choice. Decided after launch it is a migration, and the number reflects that.",
  },
  {
    title: "Conformance is cheaper as a constraint than as a fix",
    detail:
      "Accessibility work priced as a remediation project is consistently more expensive than the same conformance built in, because the findings land in shared components and in interaction patterns rather than in copy. That is also why an audit late in a build often produces a bill larger than the audit. We treat the target level as a constraint on the component library from the beginning, which makes it a design decision rather than a line item.",
  },
  {
    title: "The credit changes the net number, not the quote",
    detail:
      "Where a research credit is in play it can alter the effective cost of a project materially, and it belongs in the comparison you are making between suppliers. It does not change our estimate, and we do not build it into one. What we will do is be explicit that work performed outside Canada is not eligible contractor expenditure, so you can put a real number against that difference rather than an assumed one.",
  },
  {
    title: "Ranges you can check before booking anything",
    detail:
      "We publish detailed cost breakdowns for custom software, SaaS platforms and AI agents rather than requiring a call to establish whether a budget is plausible. Read the guide that matches the project, compare it against quotes you already hold, and arrive knowing whether the numbers are in range. A scoping conversation is a poor way for either side to discover a mismatch that a published range settles in a minute.",
  },
];

// Published cost guides. Real articles already on this site, which is what makes this section
// evidence rather than a claim. Deliberately ordered differently from /us and /au, and every
// blurb rewritten, because a third identical block would be a measurable duplicate-content
// contribution across the country pages.
export const caResources = [
  {
    title: "Building a Custom AI Agent: ROI and Tech Stack Guide",
    blurb: "Written for North American teams — how to size the return case before committing budget, and which architecture choices decide it.",
    to: "/blog/how-to-build-a-custom-ai-agent-for-your-business-the-complete-2026-roi-and-tech-stack-guide-for-us-and-canadian-startups",
  },
  {
    title: "AI Agent Development Cost 2026 — Global Price Comparison",
    blurb: "What the same agent build costs market by market, which is the comparison worth having before you shortlist anyone.",
    to: "/blog/ai-agent-development-cost-2026-a-global-price-comparison-for-custom-ai-solutions",
  },
  {
    title: "Custom Software Development Cost Guide 2026",
    blurb: "How a build is priced, stage by stage, and which decisions move the figure furthest.",
    to: "/blog/custom-software-development-cost-guide-2026-pricing-timeline-and-key-factors",
  },
  {
    title: "SaaS Development Cost Guide 2026",
    blurb: "Where the budget actually goes on a multi-tenant platform, and what the second enterprise customer costs you.",
    to: "/blog/saas-development-cost-guide-2026-pricing-timeline-and-budget-breakdown",
  },
  {
    title: "AI Agent vs Traditional Chatbot",
    blurb: "Which of the two a business actually needs, and the honest cost difference between building them.",
    to: "/blog/ai-agent-vs-traditional-chatbot-which-one-does-your-business-really-need-in-2026",
  },
];

// Canadian questions. None appears in the FAQ set on any other page, and none is a reworded
// version of a New Zealand, United States or Australian question. Two of them — the research
// credit and the cyber statute — give an answer that is commercially unhelpful to us, which
// is exactly why they are here.
//
// TODO (Futurise): answer 10 states no coverage window and no invoicing currency. Both are
// commercial commitments and neither is confirmed.
export const caFaqs = [
  {
    question: "Does our product need a French version?",
    answer:
      "If you are selling to consumers or business clients in Quebec, assume yes. The Charter of the French Language treats commercial websites and software as material Quebec customers are entitled to receive in French, and the standard is parity rather than presence — the French version has to match in content, presentation and functionality. Since 1 June 2025 the prominence rules also mean no other language may be given greater visual weight. The practical question is not whether to translate but whether the product is built so that it can be.",
  },
  {
    question: "Do you provide the French translation?",
    answer:
      "No. We build the mechanism — the internationalisation layer, locale routing, formatting, and the parity checks that stop one language falling behind the other — and we leave the language itself to people who do it properly. It needs to be Quebec French rather than French generally, and that is a separate specialism. We would rather tell you that now than imply a capability we do not have and hand you a problem at launch.",
  },
  {
    question: "What accessibility standard do we have to meet?",
    answer:
      "In Ontario, public-facing web content has had to meet WCAG 2.0 Level AA since 1 January 2021 for public sector organisations and private organisations with fifty or more employees, under Ontario Regulation 191/11. Federally regulated organisations work to WCAG 2.1 Level AA under the Accessible Canada Act. Organisations with twenty or more employees also file an accessibility compliance report, and the next is due 31 December 2026. A move to WCAG 2.2 is expected in 2027, which is worth knowing before you scope a remediation to the older version.",
  },
  {
    question: "Our product makes automated decisions. What does Quebec require?",
    answer:
      "Section 12.1 of Law 25 has applied since 22 September 2023. Where a decision is based exclusively on automated processing of personal information, the individual must be informed at the time of the decision, told the principal factors and parameters involved, and given the chance to submit observations to a person able to review it. In build terms that is a screen, a queue and someone whose role includes reviewing. It is also worth knowing that where the human review is genuine, the decision is no longer exclusively automated.",
  },
  {
    question: "What actually changed in Canadian privacy law in 2026?",
    answer:
      "Bill C-15 received royal assent on 26 March 2026 and amended PIPEDA to add the first federal data-mobility right, requiring disclosure of an individual's personal information to another designated organisation on request. It is not in force. It commences on a day fixed by order of the Governor in Council and operates only once regulations establish a data-mobility framework for the sector. Separately, Bill C-27 — which would have replaced PIPEDA entirely and introduced an AI statute — died on the Order Paper in January 2025, so PIPEDA remains the operative federal law.",
  },
  {
    question: "Does the open banking framework affect what we build?",
    answer:
      "If your product acquires banking data, yes. Bill C-15 replaced the earlier Consumer-Driven Banking Act with a fuller framework in which financial data sharing moves onto accredited interfaces and screen scraping becomes an offence. Supervision now sits with the Bank of Canada rather than the Financial Consumer Agency of Canada. The technical standards, accreditation criteria and participating data types still have to arrive through regulation, so the honest position today is that the direction is settled and the specification a build would need is not yet published.",
  },
  {
    question: "Are we a payment service provider under the RPAA?",
    answer:
      "Possibly, and it is worth resolving before launch rather than after. Since 8 September 2025 an entity must be registered with the Bank of Canada before performing retail payment activities, following the close of the transition window on 7 September 2025. The trigger is the activity rather than how the business describes itself, so platforms that hold funds between a transaction and a payout are frequently inside it without having considered the question. Registration also brings an operational risk framework, safeguarding obligations for end-user funds, and annual reporting.",
  },
  {
    question: "Why did our bank client send us a security questionnaire?",
    answer:
      "Almost certainly because of OSFI's Guideline B-10 on third-party risk management, effective 1 May 2024, under which a federally regulated financial institution remains accountable for risk arising from its third-party arrangements. Guideline B-13 on technology and cyber risk, effective 1 January 2024, shapes what it asks about. You do not comply with either — the institution does — but the expectations reach you through the contract. Systems built to produce evidence answer these in days; systems that were not take weeks and a lot of reconstruction.",
  },
  {
    question: "Can we claim SR&ED on the work you do?",
    answer:
      "Not for work we perform outside Canada. Eighty per cent of amounts paid to arm's-length contractors are eligible only where the SR&ED work is performed in Canada, so development done elsewhere is not eligible contractor expenditure for your claim. If the credit is material to how the project is funded, that is a real reason to prefer a supplier working in Canada, and we would rather you weigh it now than at filing. It is also worth checking which parts of the roadmap would qualify at all, since ordinary engineering does not.",
  },
  {
    question: "Are you a Canadian company?",
    answer:
      "No. Futurise Solutions is registered in Wellington, New Zealand, with a distributed engineering team, and we have not delivered projects in Canada — you should have both facts before anything else rather than after a proposal. What that structure buys is engineering depth available when a project needs it instead of a fixed local roster. What it does not buy is a Canadian contracting entity, French-language delivery, or eligibility for your research credit, and where any of those decides the engagement, a Canadian supplier is the right answer and we will say so.",
  },
];
