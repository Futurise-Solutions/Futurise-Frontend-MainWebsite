/**
 * Solution entry for /solutions/hotel-booking-website-development.
 *
 * Kept in its own module so it could be written while solutions.js was being edited; it is
 * registered there (import + one line in `solutions`). Same shape, optional fields and
 * CONTENT RULES as the entries in solutions.js; read the rules at the top of that file first.
 *
 * Where each claim comes from (Nov 2026):
 *   - Hotel proof: the hospitality project in Projects (utils/Constant/index.js) and its
 *     clientProof line (utils/clientsReviewsData.js). It was a UI/UX and conversion DESIGN
 *     project, so this page says "designed", never "built", and uses none of the portfolio's
 *     percentage stats. It sits in `answer`, `capabilities`, the FAQs, `portfolio` and
 *     `endNote`, NOT in `builds`: SolutionPageBody labels every build "Built by us" /
 *     "What we built". `portfolio` therefore links a design, and its label says so.
 *   - `builds`: work the team built. The car-rental booking platform (the Web3 entry in
 *     solutions.js) and the WordPress-to-Astro rebuild (Projects).
 *   - Positioning (not a booking engine, PMS or channel-manager vendor; we build around the
 *     one the hotel uses) and the embedded-vs-custom trade-offs restate the two published
 *     hotel guides, which the FAQs and solutionGuides.js link to.
 *   - Stack: the web development, UI/UX design and digital marketing services (index.js).
 *   - FAQ 1 answers "Not for hotels", not a flat "No": `builds` shows a car-rental booking
 *     system we did build. No sentence here says whether the hotel project's results are
 *     published, because its portfolio entry may still carry percentage stats.
 * Clients are never named here; builds are described by sector and region only.
 */

export const hotelBookingWebsiteSolution = {
  slug: "hotel-booking-website-development",
  name: "Hotel Booking Websites",
  market: "Global",
  markets: ["Global"],
  service: "web-development",
  country: null,
  portfolio: { href: "/portfolio#platinum-peak-hotels", label: "See the hotel booking design in our portfolio" },
  endNote: "The direct-booking experience we designed for a luxury hotel brand is in our portfolio, and the car-rental booking platform we built is under NDA. Book a free live demo and we'll walk you through both.",

  meta: {
    title: "Hotel Booking Website Development for Direct Bookings",
    description:
      "Direct booking websites for hotels, designed and built around your booking engine and PMS: room pages, a booking path that works on phones, speed and SEO.",
    keywords:
      "hotel booking website development, direct booking website for hotels, hotel website development company, hotel booking engine integration, hotel direct booking website, hotel website design, reduce OTA commission, booking engine and PMS integration",
  },

  hero: {
    eyebrow: "Solutions · Hospitality",
    title: "Hotel booking websites",
    highlight: "where guests book direct.",
    subtitle:
      "Designed and built around the booking engine and PMS you already use: room pages, a booking path that works on a phone, and fast, search-ready pages.",
  },

  answer:
    "Futurise Solutions designs and builds direct-booking websites for hotels, around the booking engine and PMS they already use. We don't sell engines, PMSs or channel managers, so we can say plainly what to buy and what to build. We designed the direct-booking experience for a luxury hotel brand (hospitality, India & USA): room and suite galleries, a simple reservation flow and persuasive calls to action. We also build fast, search-ready websites on Next.js and Astro.",

  capabilities: [
    { title: "Direct-booking website design", desc: "Room and suite galleries, a simple reservation flow and calls to action that keep the booking on your own site. We designed this for a luxury hotel brand as a UI/UX and conversion design project." },
    { title: "Built around your booking engine", desc: "We work with the engine you license, never instead of it: embedded in your site, or a custom booking front end on its API where your vendor and plan allow it. Reservations keep reaching your PMS through the engine's own integration." },
    { title: "A booking path that works on a phone", desc: "Designed for a small screen first: prices shown early, the full total before payment and only the fields needed to confirm the stay, as far as your engine allows." },
    { title: "Room pages", desc: "A page for each room or suite, with a gallery of its interiors and amenities, generated from structured content rather than made by hand, so adding a room type is a content change." },
    { title: "Fast, search-ready pages", desc: "Static pages on Next.js or Astro with semantic HTML, metadata and structured data, and Google Search Console set up at launch. It's the same groundwork as the websites we've delivered." },
    { title: "Enquiries and tracking", desc: "Phone, WhatsApp and form enquiries for guests who want to ask before they book, and GA4 tracking on the clicks that hand guests to your booking engine. Direct share itself is read from your PMS reports." },
  ],

  builds: [
    {
      title: "A car-rental booking platform, from availability to return",
      client: "Mobility startup (name under NDA)",
      problem: "Customers needed to check availability, book and pay for a rental car in cryptocurrency, and the business needed one place to run its fleet and bookings.",
      built: ["Booking lifecycle: availability → booking → active rental → return", "Pickup and return logistics", "Crypto payment flow", "Notifications", "Admin panel for fleet, bookings, users and payments"],
      stack: ["React / Next.js", "Node.js / Express", "Web3 wallet payments", "JWT auth"],
      outcome: "A complete booking product with notifications and an admin panel.",
    },
    {
      title: "A slow WordPress site rebuilt on Astro",
      client: "Wholesale supplier of food, hospitality and industrial goods, Dubai, UAE",
      problem: "The old WordPress site loaded slowly, had weak on-page SEO and barely showed up on Google, which cost the business visibility with trade buyers.",
      built: ["Rebuild from WordPress to Astro, with pages served as static HTML", "Catalogue reorganised around the way buyers look for stock", "Search-led product content and a brand blog", "Google Search Console set up and every page submitted for indexing"],
      stack: ["Astro", "WordPress migration", "Google Search Console"],
      outcome: "Pages that load as static HTML, a live brand blog, and the site indexed through Google Search Console.",
    },
  ],

  stack: ["Next.js", "React", "Astro", "Node.js", "REST APIs", "Figma", "GA4", "Google Search Console"],

  faqs: [
    { q: "Do you build booking engines?", a: "Not for hotels. We aren't a booking engine, PMS or channel-manager vendor, and we don't build an engine to replace yours: a hotel booking engine has to send every booking into your PMS and keep inventory in step with the OTAs, and that is the job you license it for. You license the engine, or keep the one you have, and we design and build the website around it. Because we don't sell one, we can tell you plainly what to buy and what is worth building." },
    { q: "Will it work with my PMS?", a: "In most set-ups the website doesn't connect to the PMS itself. The booking engine does, either directly or through your channel manager, and sends each reservation into the PMS. So the first question is whether your booking engine already integrates with your PMS and channel manager, and what your vendor allows on your plan. We check that with you on the discovery call, before we quote.", link: { href: "/blog/hotel-pms-booking-engine-channel-manager-explained", label: "How a PMS, booking engine and channel manager connect" } },
    { q: "How long does a hotel website take?", a: "You get a timeline with the fixed-scope quote after the discovery call. As a studio-wide guide, MVPs typically take 6 to 12 weeks and larger platforms 3 to 6 months. For a hotel site, the main factors are the number of pages and languages, and whether the booking path is embedded or a custom front end." },
    { q: "How is a hotel website priced?", a: "As a fixed-scope quote after a free discovery call, so the price is agreed before work starts. Your booking engine's licence and any per-booking fees are separate: you pay those to your vendor, not to us." },
    { q: "Can you help us reduce OTA commission?", a: "A direct site helps, but it can't guarantee what share of your bookings comes direct, and we won't promise a percentage. What it can do is give guests who already know your name (repeat guests, referrals, people who found you on an OTA and then searched for you) a fast way to book without OTA commission. Take a baseline of direct share from your PMS reports before launch, so you can see whether it moves.", link: { href: "/blog/hotel-direct-booking-website-reduce-ota-commission", label: "Read our guide to reducing OTA commission" } },
    { q: "Can we see your work?", a: "Yes. The direct-booking experience we designed for a luxury hotel brand (India & USA) is in our portfolio. It was a UI/UX and conversion design project. We walk you through work under NDA, such as the car-rental booking platform, on a live call.", link: { href: "/portfolio#platinum-peak-hotels", label: "See the hotel booking design in our portfolio" } },
    { q: "Should we just use our booking engine's own website template?", a: "Sometimes, yes. If the template already gives you a fast, mobile-friendly site that looks like your hotel and is easy to update, you probably don't need us, and we'll say so on the call. We're more useful when the template is slow, off-brand, or can't carry the room pages and content you need to be found in search." },
    { q: "Embedded booking engine or a custom front end: which do we need?", a: "Embedding the engine (its widget or hosted booking pages, styled to match where it allows) is quicker and cheaper. A custom front end on the engine's API gives you more control over the booking experience, but only if your vendor offers that access on your plan, and there is more to build and maintain. Either way, inventory and reservations stay in your booking engine and PMS, not in the website. Our judgement: start embedded unless the engine's own booking steps are where guests give up." },
  ],

  related: ["shopify-development-cro", "whatsapp-crm", "web3-dapp-development"],
};
