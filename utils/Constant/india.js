/**
 * /in — India market page copy.
 *
 * ⚠️ THE SUBJECT OF THIS PAGE IS INDIA, NOT UDAIPUR. Read this before editing any copy
 * below. An earlier draft framed the page around the city, which narrowed its targeting to
 * one local market when the business it describes is national. Udaipur appears as a
 * SUPPORTING FACT — it is where the team sits and where the two published clients are —
 * never as the page's scope. `areaServed` is the country. If an edit makes a section read
 * as "we are a Udaipur agency", it is wrong.
 *
 * ── WHY THIS PAGE IS DIFFERENT FROM EVERY OTHER MARKET PAGE ─────────────────
 * The other five country pages argue a compliance or distance case for work delivered
 * REMOTELY into a market. This one is the inverse: India is where the engineering team
 * actually sits, so it argues presence rather than reach, and it is the only page on the
 * site entitled to.
 *
 * ── THE DOORWAY-PAGE LINE ───────────────────────────────────────────────────
 * ⚠️ ONE PAGE FOR INDIA. No per-city pages. Mumbai, Delhi, Bangalore, Pune and Jaipur are
 * OUT and must stay out — there is no office and no address in any of them, and a page per
 * city with no presence behind it is a doorway page under Google's spam policy.
 *
 * The line is PHYSICAL PRESENCE, not published clients. Claiming delivered work in a market
 * is fine whether or not the client can be named; claiming an office, an address or a local
 * team that does not exist is not. That distinction is why this page can say "clients across
 * India, some we cannot name" while saying plainly that there is no Mumbai office.
 *
 * ── UNNAMED WORK ────────────────────────────────────────────────────────────
 * Where copy references work we cannot attribute, it says so plainly — "delivered for
 * clients we are not able to name" — and grounds it in the published NDA commitment
 * (engagementCommitments in Constant/index.js: "We sign your NDA before we see anything
 * confidential"). It must never become vague filler implying more volume than is real.
 *
 * ── EVERY CLAIM AND ITS SOURCE ──────────────────────────────────────────────
 *   Udaipur engineering team        utils/Constant/europe.js ("our delivery team is in
 *                                   Udaipur, India"), /about meta description
 *   Dhanlaxmi Property              Projects[] in Constant/index.js — location
 *                                   "Udaipur, India", trading since 1998, Next.js
 *                                   lead-generation site, six plotted colonies
 *   Palm Vision Technology          Projects[] — location "Udaipur, India", trading since
 *                                   2006, statically exported Next.js, ten service lines
 *   Wellington registration         CONTACT in Constant/index.js, Organization schema
 *   IST offsets                     utils/Constant/europe.js, stated there already
 *   Fixed scope / 2-week sprints    engagementCommitments in Constant/index.js
 *
 * NOTHING ELSE. No headcount, no project count, no revenue figure, no client count, no
 * "years of experience", no award, no rating. /about commits in writing to publishing none
 * of those, and this page may not be the one that breaks it.
 *
 * ⚠️ There is NO India-registered entity. The company is a New Zealand company whose team
 * works from India. The FAQ says so in the first answer, before anyone asks, because that
 * fact decides which engagements we are the right supplier for and which we are not.
 */

export const inMeta = {
  // 40 characters — well inside Google's ~60-character render width, so the brand suffix
  // is appended by resolveTitle() rather than dropped.
  title: "Software Development Company India",
  // 152 characters. The SUBJECT is India — Indian businesses and how engagements run —
  // not one city. The Udaipur team is a supporting fact inside the page, not its framing.
  description:
    "Custom software, AI and SaaS for Indian businesses — built by an in-house engineering team in India, quoted in rupees on fixed scope, inside your working day.",
  // India-level terms lead. The two Udaipur terms are kept at the tail because the team
  // and two delivered clients are genuinely there, but they must not out-weight the
  // national terms this page exists to win.
  keywords:
    "software development company India, custom software development India, AI development company India, SaaS development company India, web development company India, mobile app development company India, Next.js development company India, web development company Udaipur",
};

// SECTION 1 — WHERE THE TEAM IS. First section by design.
//
// Every other market page opens with a regulatory argument because it has nothing shipped
// locally to open with. This one opens with the thing that is actually true and actually
// rare: the people building the software are here, and two of the businesses they built
// for are in the same city.
export const inPresence = [
  {
    title: "The engineering team is in India",
    detail:
      "Not a sales office, not a partner network, not a contracted vendor we resell. The engineers who write your code are in India, working from Udaipur, Rajasthan. For an Indian client that removes the layer most offshore arrangements add — you are not briefing an account manager in one country who relays it to a team in another.",
  },
  {
    title: "Indian clients, named and unnamed",
    detail:
      "Two of our Indian engagements are published with screenshots: Dhanlaxmi Property, a land development and property advisory firm trading since 1998, and Palm Vision Technology, a CCTV and office technology business trading since 2006. Others were delivered for clients we are not able to name, because we sign NDAs before seeing anything confidential and we do not break them for marketing. We name no client who has not agreed.",
  },
  {
    title: "The contracting entity is in New Zealand",
    detail:
      "Futurise Solutions is a company registered in Wellington, New Zealand, founded in 2024. We hold no Indian entity. You should have that before the first call rather than after it, because it decides how the contract and the invoice work — and for some buyers, particularly those needing an Indian supplier for procurement reasons, it rules us out. Where that is your constraint we will say so.",
  },
];

// SECTION 2 — what local delivery actually changes. Concrete and falsifiable, not adjectives.
export const inDelivery = [
  {
    title: "Your working day is our working day",
    detail:
      "No overnight handover, no waiting a cycle for an answer to a question that takes a minute. Scoping calls, reviews and the awkward mid-build conversations all happen inside one shared working day. It is the least glamorous advantage on this page and the one that most changes how a project actually feels.",
  },
  {
    title: "Being in-country is not just a time zone",
    detail:
      "Some briefs cannot be taken accurately over email. For our two published Indian engagements it meant seeing the business — plotted colony layouts and drone footage in one case, ten separate service lines and the brands stocked in the other. Being in India rather than describing India is what makes that possible.",
  },
  {
    title: "Quoted and invoiced in rupees",
    detail:
      "Indian engagements are priced in INR on fixed scope, not converted from a foreign rate card at a rate that moves between quote and invoice. We do not publish a price list, because a number quoted before anyone understands the scope is wrong for nearly everyone who reads it.",
  },
  {
    title: "Built to be handed over",
    detail:
      "Both published Indian sites were built so the client is not dependent on us to keep them running — typed content rather than hand-built pages, static output where the site does not need a server. A supplier who makes themselves impossible to replace has optimised for the wrong thing.",
  },
];

// SECTION 3 — what we have actually built for Indian businesses.
// Drawn strictly from the two published Udaipur projects. No third example is invented to
// make the list look fuller.
export const inWork = [
  {
    title: "Lead generation for a property advisory firm",
    detail:
      "Dhanlaxmi Property sells plotted land near Udaipur to families, investors and NRIs buying from abroad. The problem was that judging a plotted colony required visiting it — plot counts, approved sizes and current site conditions lived on paper layout plans and the client's own drone footage, so every basic question became a phone call before anyone could be qualified. We built the site around the six colonies rather than a search box: each carries its layout plan, plot count, plotted area, plot sizes and aerial footage, with phone, WhatsApp and form enquiry on every page. Figures come off the client's own plans, and anything a plan does not state renders as 'On request' rather than being estimated.",
    to: "/portfolio",
    cta: "See it on the portfolio",
  },
  {
    title: "Ten service lines made findable for a local retailer",
    detail:
      "Palm Vision Technology sells CCTV, biometric attendance, computers, printers, video door phones, projectors, intruder alarms and EPABX — ten distinct lines, each with its own buyers and its own search demand. With no page per service there was nothing for any of those searches to land on, and a customer looking for one line had no way to discover the other nine. We gave every line its own page generated from typed content, plus a stocked-brands index and buyer guides answering the questions that precede a quote. The whole site is statically exported to a custom domain.",
    to: "/portfolio",
    cta: "See it on the portfolio",
  },
];

// SECTION 4 — who this suits. Written to disqualify as much as to attract, which is the
// only version of this section that is worth a reader's time.
export const inSectors = [
  {
    title: "Local businesses with real search demand",
    detail:
      "Firms whose customers are already searching for what they sell but have nothing to land on. Both Udaipur engagements were this shape.",
  },
  {
    title: "Product companies needing a build team",
    detail:
      "Founders who need engineering capacity across AI, web and mobile without assembling and managing it themselves.",
  },
  {
    title: "Businesses replacing an inherited site",
    detail:
      "Where something exists but is slow, unmaintainable, or was built by someone no longer available. Rebuild work is a large share of what we are asked for.",
  },
  {
    title: "Teams that need the work handed over",
    detail:
      "Where the deliverable has to be maintainable by someone else afterwards, rather than creating a permanent dependency on the supplier.",
  },
];

// SECTION 5 — the stack, stated plainly. Same list the rest of the site uses; no
// India-specific technology claim is invented.
export const inStack = [
  "Next.js and React for web applications and content-led sites",
  "React Native and Expo for iOS and Android from one codebase",
  "Node.js, TypeScript and Python on the server",
  "PostgreSQL, MongoDB and Redis for data",
  "OpenAI, Anthropic Claude and Google Gemini for AI features, model-agnostic by default",
  "Static export and edge hosting where a site does not need a server behind it",
];

export const inFaqs = [
  {
    question: "Is Futurise Solutions an Indian company?",
    answer:
      "No. Futurise Solutions is a company registered in Wellington, New Zealand, founded in 2024, and we hold no Indian entity. Our engineering team is in India, working from Udaipur, Rajasthan. We put that first rather than in a footer because it decides how contracting and invoicing work, and because some buyers specifically need an India-registered supplier — if that is your constraint, we are not the right answer and we will tell you so on the first call.",
  },
  {
    question: "Do you actually have clients in India?",
    answer:
      "Yes. Two are published with screenshots, the problem and the approach: Dhanlaxmi Property, a land development and property advisory firm trading since 1998, and Palm Vision Technology, a CCTV and office technology business trading since 2006 — both in Udaipur, Rajasthan, where our team is. Other Indian work was delivered for clients we are not able to name, because we sign NDAs before seeing anything confidential. We name no client who has not agreed, and we publish no client count.",
  },
  {
    question: "Do you work outside Udaipur?",
    answer:
      "Yes — we work with businesses across India, and being in the country means one working day and one time zone wherever you are. Our published record also covers clients in Dubai and the United States. What we do not do is claim an OFFICE where we have none: there is no Mumbai, Delhi, Bangalore or Pune address, and you will not find a page on this site suggesting otherwise. The team works from Udaipur, Rajasthan.",
  },
  {
    question: "What does custom software cost in India?",
    answer:
      "Indian engagements are quoted and invoiced in rupees, on fixed scope rather than an open hourly meter. There is no rate card on this site for any market, and that is deliberate: the same brief can differ several-fold in cost depending on integrations, data migration and how much of the existing system has to keep working, so a headline number would mislead more readers than it helped. Our pricing page sets out every factor that moves an estimate, and our cost guides work through how projects are priced stage by stage.",
  },
  {
    question: "Can we meet in person?",
    answer:
      "In Udaipur, where the team is, yes — both published Indian engagements involved seeing the business rather than taking the brief over email. Elsewhere in India it depends on the project and is a conversation rather than a standing offer; calls and video are how most work runs. We would rather say that than imply a travel commitment we have not made.",
  },
  {
    question: "Who owns the code when the project ends?",
    answer:
      "You do. Both published Indian sites were deliberately built to be maintainable without us — content typed rather than hand-built into pages, static output where a server was not needed. We sign NDAs on request, work in two-week sprints with reviewable software at each one, and offer post-launch support as a choice rather than a dependency.",
  },
];
