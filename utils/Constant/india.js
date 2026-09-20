/**
 * /in — India market page copy.
 *
 * ── WHY THIS PAGE IS DIFFERENT FROM EVERY OTHER MARKET PAGE ─────────────────
 * The other five country pages argue a compliance or distance case for work delivered
 * REMOTELY into a market where nothing has been shipped yet. This one is the inverse:
 * India is where the engineering team actually sits, and it is the only market on the
 * site with named, delivered clients who are local businesses in the same city as the
 * team — Dhanlaxmi Property and Palm Vision Technology, both in Udaipur, Rajasthan, both
 * published on /portfolio with screenshots.
 *
 * So this page does NOT argue "we can serve you from a distance". It argues the opposite,
 * and it is the only page on the site entitled to.
 *
 * ── THE DOORWAY-PAGE LINE ───────────────────────────────────────────────────
 * ⚠️ ONE PAGE FOR INDIA. Mumbai, Delhi, Bangalore, Pune and Jaipur are explicitly OUT and
 * must stay out. There is no office, no staff and no delivered client in any of them, and
 * a page per city with no presence behind it is a doorway page under Google's spam policy.
 *
 * Udaipur is named throughout because it is where the team is and where both local clients
 * are. That is a fact about this company, not a landing-page keyword. The test for adding
 * any other Indian location to this site is the same one Udaipur passes: a named, delivered,
 * published client there, or staff there. Nowhere else currently passes it.
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
  // 154 characters. Leads with the team location because that is the differentiator on
  // this page and the thing no competitor page can copy honestly.
  description:
    "Custom software, AI and SaaS built by an engineering team in Udaipur, Rajasthan — with delivered work for Indian businesses and fixed-scope quotes in INR.",
  keywords:
    "software development company India, custom software development India, web development company Udaipur, website development Udaipur, AI development company India, SaaS development India, Next.js development company India, software company Rajasthan",
};

// SECTION 1 — WHERE THE TEAM IS. First section by design.
//
// Every other market page opens with a regulatory argument because it has nothing shipped
// locally to open with. This one opens with the thing that is actually true and actually
// rare: the people building the software are here, and two of the businesses they built
// for are in the same city.
export const inPresence = [
  {
    title: "The engineering team is in Udaipur",
    detail:
      "Not a sales office, not a partner network, not a contracted vendor we resell. The engineers who write your code work from Udaipur, Rajasthan. For an Indian client that removes the layer most offshore arrangements add — you are not briefing an account manager in one country who relays it to a team in another.",
  },
  {
    title: "Two of our published clients are Udaipur businesses",
    detail:
      "Dhanlaxmi Property, a land development and property advisory firm operating here since 1998, and Palm Vision Technology, a CCTV and office technology business in Fatehpura trading since 2006. Both are on our portfolio with screenshots of what shipped. Local work you can go and look at is a different claim from a list of cities in a footer.",
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
    title: "Site visits are possible, not theoretical",
    detail:
      "For the two Udaipur engagements, understanding the business meant seeing it — plotted colony layouts and drone footage in one case, ten separate service lines and the brands stocked in the other. Neither brief could have been taken accurately over email alone.",
  },
  {
    title: "Quoted and invoiced in rupees",
    detail:
      "Indian engagements are priced in INR on fixed scope, not converted from a foreign rate card at a rate that moves between quote and invoice. We do not publish a price list, because a number quoted before anyone understands the scope is wrong for nearly everyone who reads it.",
  },
  {
    title: "Built to be handed over",
    detail:
      "Both Udaipur sites were built so the client is not dependent on us to keep them running — typed content rather than hand-built pages, static output where the site does not need a server. A supplier who makes themselves impossible to replace has optimised for the wrong thing.",
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
      "No. Futurise Solutions is a company registered in Wellington, New Zealand, founded in 2024, and we hold no Indian entity. Our engineering team works from Udaipur, Rajasthan. We put that first rather than in a footer because it decides how contracting and invoicing work, and because some buyers specifically need an India-registered supplier — if that is your constraint, we are not the right answer and we will tell you so on the first call.",
  },
  {
    question: "Do you actually have clients in India?",
    answer:
      "Yes, and they are named. Dhanlaxmi Property, a land development and property advisory firm in Udaipur trading since 1998, and Palm Vision Technology, a CCTV and office technology business in Fatehpura, Udaipur, trading since 2006. Both appear on our portfolio with the problem, the approach and screenshots of what shipped. We name no client we have not delivered for, and we publish no client count.",
  },
  {
    question: "Do you work outside Udaipur?",
    answer:
      "Yes. The team is in Udaipur, and the work is remote-capable across India and internationally — our published record also covers clients in Dubai and the United States. What we do not do is claim a presence in cities where we have none. There is no Mumbai, Delhi, Bangalore or Pune office, and you will not find a page on this site suggesting otherwise.",
  },
  {
    question: "What does custom software cost in India?",
    answer:
      "Indian engagements are quoted and invoiced in rupees, on fixed scope rather than an open hourly meter. There is no rate card on this site for any market, and that is deliberate: the same brief can differ several-fold in cost depending on integrations, data migration and how much of the existing system has to keep working, so a headline number would mislead more readers than it helped. Our pricing page sets out every factor that moves an estimate, and our cost guides work through how projects are priced stage by stage.",
  },
  {
    question: "Can we meet in person?",
    answer:
      "In Udaipur, yes. Both local engagements involved seeing the business rather than taking the brief over email — in one case the plotted colony layouts and site footage, in the other the full range of service lines and stocked brands. Elsewhere in India, calls and video are how we work, and we would rather say that than imply a travel commitment we have not made.",
  },
  {
    question: "Who owns the code when the project ends?",
    answer:
      "You do. Both Udaipur sites were deliberately built to be maintainable without us — content typed rather than hand-built into pages, static output where a server was not needed. We sign NDAs on request, work in two-week sprints with reviewable software at each one, and offer post-launch support as a choice rather than a dependency.",
  },
];
