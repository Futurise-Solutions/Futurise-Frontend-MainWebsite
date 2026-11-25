/**
 * Content for /about — the site's primary EEAT asset.
 *
 * ⚠️ READ THIS BEFORE EDITING ⚠️
 *
 * ── THE EVIDENCE DISCIPLINE ──────────────────────────────────────────────────
 * This file follows the rule proven on /ae and /us: state the record, then state its
 * limits on the page where blurring them would help most. Every figure below was counted
 * from the repository before it was written down (25 Nov 2026): 12 Projects, 7
 * caseStudies, 7 clientProof entries, 6 services, 8 testimonials (one signed with the
 * client's name and company, seven with the client's name and country). Recount when any
 * of those change. No figure appears here that a visitor cannot reach from this page in
 * two clicks.
 *
 * ── WHAT THIS FILE MAY NOT SAY ───────────────────────────────────────────────
 * ONE. No headcount, seniority or experience claim, and no description of team members.
 * Owner rule: the team is not shown on the site and its location is stated as India.
 * team.js keeps TEAM_PUBLISHED = false, so the site names no member of staff. Section 2
 * says that plainly. Do not paper over it, and do not describe people who are not named.
 *
 * TWO. Nothing here may restate the `companyStats` band that renders further up the same
 * page. Those figures are a pending owner decision (Nov 2026), not this file's to
 * relitigate. The practical constraint is that section 2 must not claim the site
 * publishes no unsourced statistics, because that band is one. It says nothing about
 * statistics for exactly that reason.
 *
 * THREE. Nothing here may repeat the homepage, /portfolio, or any country page. /ae owns
 * the Infinity Bay engagement narrative and /us owns the "six US-market projects"
 * framing; this page describes the ENTITY and the shape of the whole record, never an
 * individual project. Every portfolio entry names its client ("Client: …"); the
 * trading-terminal entry is titled by its product, so no card here may claim every
 * heading carries a client name.
 *
 * FOUR. Every claim is checkable from the site itself. Address and email come from
 * CONTACT in Constant/index.js; the 2024 founding date comes from the Organization schema
 * already emitted by AboutUs.jsx. Nothing is sourced from outside the repository.
 */

// SECTION 1 — the entity. Who the counterparty actually is, which no other page states.
export const aboutEntity = [
  {
    title: "A New Zealand company, founded in 2024",
    detail:
      "Futurise Solutions is registered in Wellington, at the Huddart Parker Building in Wellington Central. That is the entity a client contracts with, wherever the client itself is based, and it is the same entity named in this site's structured data. A supplier that will not tell you which legal person you are dealing with is a supplier you cannot check.",
  },
  {
    title: "Clients in seven countries",
    detail:
      "The portfolio names clients in Dubai, the United States and India. One case study covers a UK-based fintech, and the testimonials come from clients in India, the UAE, the United States, Canada, Australia and New Zealand. Each of those countries traces to something on this site you can open. None is counted because of where we are registered: an address tells you where the contract sits, not who the clients are.",
  },
  {
    title: "Every channel we answer, and no phone line",
    detail:
      "Enquiries arrive by email at business@futurisesolutions.com, through the contact form, through the booking flow, or by WhatsApp message. We do not run a published phone line, and no telephone number appears in this site's structured data. Listing a channel that nobody answers is worse than listing none, and search engines read that field literally.",
  },
];

// SECTION 2 — negative space. The section competitors do not write, and the reason this
// page can be trusted on anything else. See rule TWO above before adding a card.
export const aboutNotClaimed = [
  {
    title: "No colleagues you cannot look up",
    detail:
      "This site names no member of staff and publishes no team page. Once an engagement starts you deal directly with the engineers doing the work; before that, what you can check is the company, its record and its contact details. We will not fill the space with invented colleagues or stock portraits, and our structured data describes no people at all. Describing people who do not exist is a fabricated-authority signal search engines specifically penalise, and a worse answer than the gap it would fill.",
  },
  {
    title: "No logo without a project behind it",
    detail:
      "Every client shown anywhere on this site is one we delivered for, and every logo on our homepage belongs to a project on the portfolio. There are no logos of companies we have pitched to, piloted with, bought software from, or share an investor with. The industry convention of a grey logo strip with no engagement behind it is the single cheapest trust signal to manufacture, which is why it is worth nothing.",
  },
  {
    title: "No awards, ratings or scores",
    detail:
      "No rating appears in this site's structured data, and our testimonials are not marked up as reviews. Testimonials a company selects for its own site are not an independent body of reviews, and turning them into an AggregateRating would hand a crawler a score that no independent reviewer gave. There are no award badges either. What exists instead is eight client testimonials, each under the client's own name, and the work itself.",
  },
];

// SECTION 3 — verification routing. Deliberately about WHERE the evidence lives rather
// than restating it; /ae and /us already carry the evidence itself.
export const aboutVerify = [
  {
    title: "Twelve projects, with screenshots",
    detail:
      "The portfolio carries every project we publish in detail under the client's name, each with the problem it solved and images of what actually shipped. Every entry names its client, though one, a trading terminal, is titled by its product. Counting them is the fastest check anyone can run on an agency.",
    to: "/portfolio",
    cta: "Open the portfolio",
  },
  {
    title: "Seven written up in full",
    detail:
      "Seven engagements have a long-form write-up covering the constraint we were given, the approach taken, the stack it was built on, the outcome, and a retrospective on what we would do differently. The write-ups do not name their clients. They are written to be read by somebody deciding whether we can do their build, not to be skimmed.",
    to: "/case-studies",
    cta: "Read the case studies",
  },
  {
    title: "Eight client testimonials",
    detail:
      "Eight clients have given us a testimonial, and all eight appear on our homepage and contact page. One is signed with the client's name and company, Infinity Bay Trading in Dubai. The other seven carry the client's name and country: three in India, and one each in New Zealand, the United States, Canada and Australia. Each was approved for publication by the client who gave it.",
    to: "/contact",
    cta: "Read them on the contact page",
  },
];
