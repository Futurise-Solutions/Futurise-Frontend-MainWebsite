/**
 * Content for /europe — the Europe market page.
 *
 * WHY THIS PAGE IS A REGION PAGE AND NOT A SET OF COUNTRY PAGES
 * SERP research on European city and country terms (London, Berlin, Amsterdam and the
 * rest) found page one held almost entirely by high-authority directories and by offshore
 * agencies running templated `/location/` pages — the doorway pattern Google's spam policy
 * names explicitly. Futurise holds no European entity, office or staff. A dozen thin
 * country pages would therefore be both unrankable and a liability, so this is one page
 * that argues a single honest position instead.
 *
 * WHAT THIS PAGE IS ALLOWED TO CLAIM
 * Nothing about local presence: there is no European entity, office or team, and no
 * sentence here implies otherwise.
 *
 * It is equally careful NOT to overstate that into a claim about EXPERIENCE. An engagement
 * absent from the portfolio may be under NDA, private, or simply not selected for public
 * display — absence of a public case study is not evidence of absence of work. So this file
 * speaks only about what can be publicly ATTRIBUTED, never about what has or has not been
 * done. Do not reintroduce phrasing like "we have no European client work": it is not
 * supportable, and it concedes ground the business has not actually lost.
 *
 * What the page can legitimately argue is the thing that is both true and useful to a
 * European buyer: engaging a supplier outside the EEA is a data-protection decision before
 * it is a procurement one, and most suppliers in this bracket cannot articulate the
 * transfer mechanism they rely on. This page does, in public, and treats that as the
 * qualification.
 *
 * EVERY REGULATORY FACT BELOW IS PUBLIC RECORD, dated, and checkable against a primary
 * source — Regulation (EU) 2016/679, Regulation (EU) 2024/1689, the CJEU's Schrems II
 * judgment, and the Commission's own adequacy decisions. They are cited so a reader can
 * verify them rather than take our word. There are no invented statistics, clients,
 * reviews, awards or price figures anywhere in this file.
 */

export const euMeta = {
  // 54 characters — inside Google's ~60-character render width, so the keyword is not
  // truncated. Seo.jsx appends the brand only when the result still fits.
  title: "Software Development for European Businesses",
  // 152 characters. Leads with the transfer question because that is the query behind
  // "can we even use a non-EU developer", which is the real objection on this page.
  description:
    "Custom software, AI and SaaS built for European businesses: GDPR transfer mechanisms, EU AI Act obligations and EU data residency handled from day one.",
  keywords:
    "software development company Europe, GDPR compliant software development, EU AI Act compliance software, offshore development GDPR, EU data residency development, custom software development Europe, standard contractual clauses software supplier",
};

/*
 * The regulatory spine of the page.
 *
 * This is deliberately the first section rather than a footnote. For a European buyer
 * assessing a supplier outside the EEA, the transfer question is not a compliance detail
 * to resolve after selection — it is the gate that decides whether the conversation can
 * happen at all. Every entry is a dated instrument a reader can look up.
 */
export const euRegulatory = [
  {
    title: "GDPR applies to us because of where your users are, not where we are",
    detail:
      "Regulation (EU) 2016/679 has applied since 25 May 2018, and Article 3 extends it to processing the personal data of people in the Union regardless of where the processor sits. Being outside the EEA does not place a supplier outside the regulation; it changes which mechanism makes the transfer lawful. We work on that basis from the first call rather than discovering it at contract stage.",
  },
  {
    title: "Transfers out of the EEA run on Standard Contractual Clauses",
    detail:
      "India has no European Commission adequacy decision, so a transfer to an Indian delivery team relies on Article 46 safeguards. In practice that means the 2021 Standard Contractual Clauses, together with the transfer impact assessment the CJEU required in Schrems II (Case C-311/18, 16 July 2020). This is the specific mechanism, named, before you ask for it. A supplier who cannot tell you which Article 46 route they rely on has not thought about it.",
  },
  {
    title: "Data residency is an architectural decision, not a hosting preference",
    detail:
      "Keeping personal data physically inside the EEA is usually the cleanest answer, and it is decided in week one or retrofitted expensively later. In practice it means selecting EU regions at the infrastructure layer, checking that every managed service in the stack (database, queue, object store, logging, error tracking, analytics) offers an EU region, and knowing which of your third-party processors quietly do not.",
  },
  {
    title: "The EU AI Act now has dates attached",
    detail:
      "Regulation (EU) 2024/1689 entered into force on 1 August 2024. Its prohibitions on unacceptable-risk practices have applied since 2 February 2025, and obligations for general-purpose AI models since 2 August 2025, with the bulk of high-risk obligations following on 2 August 2026. For anyone commissioning an AI feature aimed at European users, the practical question is no longer whether the Act applies but which risk tier the system falls into. That determination changes the build.",
  },
  {
    title: "A processor's obligations are written into the contract, not assumed",
    detail:
      "Article 28 requires a written processing agreement covering subject matter, duration, purpose, categories of data, sub-processor authorisation and deletion at the end of the engagement. We expect to sign yours rather than offer our own as a formality, and we expect to be named as processor with our sub-processors disclosed. Breach notification under Article 33 runs to 72 hours, which is a build requirement as much as a legal one: it means logging and alerting have to make detection possible inside that window.",
  },
];

/*
 * The honest positioning section. This is the part most suppliers omit, and it is the
 * reason the page can rank at all — a European buyer searching this territory has already
 * read a dozen pages claiming local presence, and the differentiated answer is the one
 * that states the constraint plainly.
 */
export const euPositioning = [
  {
    heading: "What we do not claim",
    points: [
      "We hold no European entity, no European office and no European staff. Futurise Solutions is registered in Wellington, New Zealand, and our delivery team is in India. That is a corporate fact you can check, and it is stated before you ask.",
      "The engagements named on our portfolio are in the UAE, the United States and India. Not every engagement is public. Client confidentiality decides what we may attribute, and we do not publish work we have not been cleared to name. So read the portfolio as what we can show you, not as the whole record.",
      "We are not the right supplier for a contract that requires an EU-established legal entity, or for public-sector procurement with an EEA-establishment condition. Where that is the requirement we will say so on the first call rather than after it.",
    ],
  },
  {
    heading: "What is genuinely true",
    points: [
      "The transfer mechanism, the sub-processor list and the data-residency design are settled in writing before the build starts, not requested from us during your vendor review.",
      "We already build to a comparable regime. New Zealand's Privacy Act 2020 and the UAE's PDPL both impose cross-border transfer duties, and the engineering habits they demand (deciding where data lives, what is logged and for how long, whether a person's record can be exported or erased without a one-off script) are the same habits GDPR needs.",
      "You contract with a New Zealand company. New Zealand holds a European Commission adequacy decision, in force since 2013 and retained following the Commission's 2024 review, which makes the contracting entity itself a jurisdiction the Commission has already assessed.",
    ],
  },
  {
    heading: "Where a European supplier is the better answer",
    points: [
      "Work that needs people in the room on a recurring basis, or a delivery team inside your own timezone for daily ceremonies.",
      "Contracts requiring an EU-established supplier for regulatory, procurement or insurance reasons.",
      "Projects whose main risk is organisational rather than technical, where progress depends on someone chasing a stakeholder in person.",
    ],
  },
];

/*
 * Timezone is the second objection after data protection. Stated as arithmetic rather
 * than as a promise, because the arithmetic is checkable and a promise is not.
 */
export const euWorkingModel = [
  {
    step: "A working overlap that is real, not nominal",
    detail:
      "Indian Standard Time runs 4.5 hours ahead of Central European Time in winter and 3.5 ahead during CEST. A 09:00 start in India is 04:30 in Berlin, and 17:30 in India is 13:00 in Berlin. So the European morning and the Indian afternoon overlap by roughly half a working day, every day, without anyone keeping unusual hours. For the UK the overlap is an hour wider.",
  },
  {
    step: "Scoping calls in your working day",
    detail:
      "Booked in European business hours. The output is a written understanding of scope, not a sales pitch, and we sign your NDA before reviewing anything confidential.",
  },
  {
    step: "Fixed scope, quoted in euros or pounds",
    detail:
      "You are quoted and invoiced in your own currency, so the figure you approve is the figure that reaches your accounts. Scope is fixed before work starts: if our estimate is wrong, absorbing it is our problem rather than a variation to bill.",
  },
  {
    step: "A named engineer, not an account manager",
    detail:
      "Questions during delivery go to the person writing the code. Every enquiry gets an answer inside one business day.",
  },
];

/*
 * Sectors where the regulatory framing above is the deciding factor rather than a
 * formality. Chosen because each maps to capability we genuinely have and to a specific
 * European instrument, not because they are large markets.
 */
export const euSectors = [
  {
    title: "AI features aimed at European users",
    detail:
      "The design question is which EU AI Act risk tier a system falls into, and it changes the build. Transparency duties for systems people interact with, logging and human-oversight requirements where a use case is high-risk, and, for anything touching biometric categorisation or social scoring, a prohibition rather than a control. Deciding this before the architecture is set is far cheaper than discovering it during a compliance review.",
  },
  {
    title: "SaaS platforms processing personal data",
    detail:
      "Multi-tenant products carry the harder version of every GDPR obligation: erasure that has to work per-tenant without breaking referential integrity, export in a portable format under Article 20, retention that differs by customer contract, and audit logging that can evidence lawful basis. These are schema decisions, which is why they belong in week one.",
  },
  {
    title: "E-commerce and payments",
    detail:
      "Strong Customer Authentication under PSD2 has been enforced across the EEA since 31 December 2020 and in the UK since 14 March 2022, so European checkout flows carry authentication requirements many non-European builds simply omit. Add EU VAT and OSS reporting at the boundary, and multi-currency handling that does not round incorrectly.",
  },
  {
    title: "Internal tooling and integrations",
    detail:
      "The common European build is not greenfield. It is software that has to sit alongside an existing ERP, ledger or CRM rather than replace it, and the integration is usually where the project is won or lost. Sub-processor disclosure matters here too: every SaaS the integration touches becomes part of your processing record.",
  },
];

/*
 * Questions specific to this page. None duplicates the FAQ set on any other route, which
 * is what keeps /europe from competing with /nz or the service pages for the same query.
 * Written as self-contained answers so a retrieval system can quote any one of them
 * without the surrounding page.
 */
export const euFaqs = [
  {
    question: "Can a New Zealand company legally build software for an EU business?",
    answer:
      "Yes. GDPR applies based on whose personal data is processed, not where the supplier sits, so the question is which safeguard makes the transfer lawful rather than whether the arrangement is permitted. New Zealand holds a European Commission adequacy decision, in force since 2013 and retained after the Commission's 2024 review, so transfers to the New Zealand contracting entity rest on that. Because our delivery team is in India, which has no adequacy decision, the onward transfer relies on the 2021 Standard Contractual Clauses together with a transfer impact assessment. Both mechanisms are documented before a build starts.",
  },
  {
    question: "Where will our data physically live?",
    answer:
      "Wherever the design requires, and it is decided before the first line of production code. For most European engagements that means EU regions across the whole stack, not only the primary database but every managed service around it, including queues, object storage, logging, error tracking and analytics, since each one is a processor in its own right. Where a component has no EU region we tell you before it is chosen, not after.",
  },
  {
    question: "Do you sign a Data Processing Agreement?",
    answer:
      "Yes, and we expect to sign yours rather than present our own as a formality. Article 28 requires the agreement to set out subject matter, duration, nature and purpose, categories of data subject, sub-processor authorisation and what happens to data at the end of the engagement. We disclose our sub-processors as part of that, and we treat the Article 33 seventy-two-hour breach notification window as a build requirement, because detection inside that window depends on how logging and alerting were designed.",
  },
  {
    question: "How does the EU AI Act affect an AI feature we want built?",
    answer:
      "It determines the risk tier, and the tier determines the obligations. Regulation (EU) 2024/1689 entered into force on 1 August 2024; prohibitions on unacceptable-risk practices have applied since 2 February 2025, general-purpose AI model obligations since 2 August 2025, and most high-risk obligations follow on 2 August 2026. In practice we establish the tier during scoping, because a high-risk classification adds logging, human-oversight and documentation requirements that are far cheaper to design in than to retrofit.",
  },
  {
    question: "Which European countries do you work with?",
    answer:
      "We work with businesses across the EEA and the United Kingdom, and we make no claim of local presence in any of them: no European entity, no European office, no European staff. On client work, the honest answer is that our portfolio shows the engagements we are free to name. Confidentiality decides the rest, and we will not publish a client we have not been cleared to name. If your contract requires an EU-established supplier, that is a requirement we cannot meet, and we will tell you on the first call rather than after a proposal.",
  },
  {
    question: "How do timezones work between Europe and your delivery team?",
    answer:
      "Indian Standard Time is 4.5 hours ahead of CET and 3.5 ahead of CEST, which puts roughly half of each working day in overlap with continental Europe and slightly more with the UK. A 17:30 finish in India is 13:00 in Berlin, so the European morning is shared working time rather than a handover window. Scoping calls are booked in your hours, and every enquiry is answered inside one business day.",
  },
  {
    question: "What does a project cost, and in which currency?",
    answer:
      "We quote and invoice in euros or pounds, on fixed scope rather than an open hourly meter, so the figure you approve is the figure that reaches your accounts. We publish no rate card, because a price quoted before anyone understands the scope is wrong for almost everyone who reads it. Our pricing page sets out every factor that moves an estimate.",
  },
  {
    question: "What happens on the first call?",
    answer:
      "It is a scoping conversation rather than a pitch. We establish what you are building, what already exists, where your users' data has to live, and whether any part of the system is likely to be high-risk under the EU AI Act. You leave with a written understanding of scope, and an estimate follows. We sign your NDA before reviewing anything confidential, and if the honest answer is that you need an EU-established supplier, we will say so.",
  },
];
