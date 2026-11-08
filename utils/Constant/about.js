/**
 * Content for /about — the site's primary EEAT asset.
 *
 * ⚠️ READ THIS BEFORE EDITING ⚠️
 *
 * ── THE EVIDENCE DISCIPLINE ──────────────────────────────────────────────────
 * This file follows the rule proven on /ae and /us: state the record, then state its
 * limits on the page where blurring them would help most. Every figure below was counted
 * from the repository before it was written down — 7 clientProof entries, 7 Projects, 6
 * caseStudies, 6 services, 1 testimonial — and no figure appears here that a visitor
 * cannot reach from this page in two clicks.
 *
 * ── WHAT THIS FILE MAY NOT SAY ───────────────────────────────────────────────
 * ONE. No headcount, seniority or experience claim. The team section is built but gated
 * off (team.js: TEAM_PUBLISHED = false), so the site names no member of staff. Section 2
 * says that plainly. Do not paper over it, and do not describe people who are not named.
 *
 * TWO. Nothing here may restate the `companyStats` band that renders further up the same
 * page. Those figures are governed by an existing, tested policy — constant.test.js
 * asserts they are a FLOOR, never lower than what the portfolio publishes — and they are
 * a deliberate prior decision, not this file's to relitigate. The practical constraint is
 * that section 2 must not claim the site publishes no unsourced statistics, because that
 * band is one. It says nothing about statistics for exactly that reason.
 *
 * THREE. Nothing here may repeat the homepage, /portfolio, or any country page. /ae owns
 * the Infinity Bay engagement narrative and /us owns the "six of seven" framing; this page
 * describes the ENTITY and the shape of the whole record, never an individual project.
 * The portfolio's trading-terminal entry is published without the client's name in its
 * heading, so no card here may claim every project is named.
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
    title: "Delivered work sits in three markets",
    detail:
      "The published record covers clients in Dubai, in the United States and in India. New Zealand is where the company is registered, not where its clients are. No delivered engagement on this site belongs to a New Zealand business, and we would rather say so than let a registered address imply a customer base.",
  },
  {
    title: "One published way to reach a human",
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
      "This site names no member of staff. A team section is built and sitting behind a switch, and it stays off until real names, roles and profile links go into it. Publishing invented colleagues, or emitting structured data describing people who do not exist, is a fabricated-authority signal search engines specifically penalise. It is a worse answer than the gap it would fill.",
  },
  {
    title: "No logo wall",
    detail:
      "Every client shown anywhere on this site is one we delivered for. There are no logos of companies we have pitched to, piloted with, bought software from, or share an investor with. The industry convention of a grey logo strip with no engagement behind it is the single cheapest trust signal to manufacture, which is why it is worth nothing.",
  },
  {
    title: "No awards, ratings or scores",
    detail:
      "No rating appears in this site's structured data, because there is no body of reviews behind one and an AggregateRating without a corpus is a fabrication a crawler will believe. There are no award badges either. What exists instead is one testimonial, attributed to a named person at a named company, and the work itself.",
  },
];

// SECTION 3 — verification routing. Deliberately about WHERE the evidence lives rather
// than restating it; /ae and /us already carry the evidence itself.
export const aboutVerify = [
  {
    title: "Seven projects, with screenshots",
    detail:
      "The portfolio carries every engagement we publish, each with the problem it solved and images of what actually shipped. One appears under its product rather than its client's name. That is the complete set of work we put in public, and counting it is the fastest check anyone can run on an agency.",
    to: "/portfolio",
    cta: "Open the portfolio",
  },
  {
    title: "Six written up in full",
    detail:
      "Six of those engagements have a long-form write-up covering the constraint we were given, the approach taken, the stack it was built on, the outcome, and a retrospective on what we would do differently. They are written to be read by somebody deciding whether we can do their build, not to be skimmed.",
    to: "/case-studies",
    cta: "Read the case studies",
  },
  {
    title: "Exactly one testimonial",
    detail:
      "One client has given us a testimonial on the record, and it is signed with his name and his company rather than an initial and an industry. One is the number we have earned so far. A page of anonymous praise would take an afternoon to write, which is precisely why it would tell you nothing.",
    to: "/case-studies",
    cta: null,
  },
];
