/**
 * Data for ClientsReviews. Extracted PROGRAMMATICALLY from
 * src/utils/Constant/index.js — bytes copied, never retyped, so curly quotes,
 * em dashes (U+2014), en dashes (U+2013), arrows (U+2192) and middots (U+00B7)
 * survive exactly. Asserted byte-for-byte by Sweep B.
 *
 * Only the three exports ClientsReviews needs are carried. The rest of the old
 * Constant/index.js lands with the components that use it, in Phase 5.
 */

export const testimonials = [
  {
    name: "Abbas Kagzi",
    title: "Founder, Infinity Bay Trading, Dubai, UAE",
    avatar: "",
    review:
      "We came to Futurise with a slow WordPress site that barely showed up on Google. They rebuilt it on Astro. It loads instantly now, feels far smoother, and with the new SEO content and blog we're finally getting found by buyers across the UAE. Professional team, clear communication, handled everything from design to Google Search Console.",
  },
];

// **************** DELIVERY RECORD ****************
// Shown alongside testimonials as verifiable proof of work. Testimonials depend on a
// client agreeing to be quoted; shipped projects do not — so this carries the trust
// load while the testimonial list is still short, without inventing anything.
//
// Each entry is deliberately written as a self-contained factual statement
// (client → market → what was built → what changed). That phrasing is what answer
// engines quote: they retrieve and cite passages, not pages, so a sentence that names
// the entity, the place and the outcome is far more likely to be surfaced than a
// generic claim like "we build great software".

export const clientProof = [
  {
    client: "Infinity Bay Trading",
    location: "Dubai, UAE",
    discipline: "Web Development & SEO",
    work: "Rebuilt a slow WordPress site as an SEO-first Astro site",
    outcome: "Faster page loads, a structured brand blog, and full Google Search Console indexing for UAE B2B buyers",
  },
  {
    client: "HOMIES PropTech",
    location: "USA & India",
    discipline: "SaaS & Analytics",
    work: "Built a unified property-management dashboard",
    outcome: "Real-time income, expense and unit analytics across thousands of listings from any device",
  },
  {
    client: "Marty-QR",
    location: "USA & India",
    discipline: "AI & SaaS",
    work: "Built an AI-powered review-management platform",
    outcome: "QR-driven review capture and online reputation management for multi-location businesses",
  },
  {
    client: "David Tishbi Jewelry",
    location: "USA",
    discipline: "E-commerce & CRO",
    work: "Designed and built a luxury jewellery storefront",
    outcome: "A conversion-focused catalogue spanning fine jewellery, watches and bullion",
  },
  {
    client: "Estate Realty",
    location: "India & USA",
    discipline: "Web Platform & SEO",
    work: "Built a property search and listings platform",
    outcome: "Search-led property discovery with an SEO structure built for inbound lead generation",
  },
  {
    client: "GDT Exchange",
    location: "USA & India",
    discipline: "Blockchain & FinTech",
    work: "Built a perpetuals crypto trading terminal",
    outcome: "A dense trading interface built for experienced traders without sacrificing usability",
  },
  {
    client: "Platinum Peak Hotels",
    location: "India & USA",
    discipline: "UI/UX & CRO",
    work: "Designed a direct hotel booking experience",
    outcome: "A booking flow built to win reservations directly rather than through third-party platforms",
  },
];

// **************** PORTFOLIO PROJECTS ****************
// Real client work. `featured: true` marks the projects highlighted on the home page.
// Each image carries descriptive alt text (with market keywords) for SEO + accessibility.

export const engagementCommitments = [
  {
    label: "Free discovery call",
    detail: "A no-obligation call to scope the work before any money is discussed.",
  },
  {
    label: "Fixed-scope estimates",
    detail: "You get a defined scope and price up front, not an open-ended hourly count.",
  },
  {
    label: "Two-week sprints",
    detail: "Working software you can review every two weeks, not a silent build.",
  },
  {
    label: "NDA on request",
    detail: "We sign your NDA before we see anything confidential.",
  },
];

// **************** PARTNERS / TRUSTED BY ****************
