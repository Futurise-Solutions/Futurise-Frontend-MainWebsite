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
    service: "Web Development & SEO",
    review:
      "We came to Futurise with a slow WordPress site that barely showed up on Google. They rebuilt it on Astro. It loads instantly now, feels far smoother, and with the new SEO content and blog we're finally getting found by buyers across the UAE. Professional team, clear communication, handled everything from design to Google Search Console.",
  },
  // Client reviews supplied and approved for publication by the clients (Oct 2026).
  {
    name: "Rahul Sharma",
    title: "India",
    avatar: "",
    service: "Web Application Development",
    review:
      "We were facing challenges managing our business operations across different systems. Futurise Solutions helped us develop a custom web application that better fits our workflow. Their team understood our requirements and focused on making the solution practical and easy to use. The communication was professional throughout the process.",
  },
  {
    name: "Priya Mehta",
    title: "India",
    avatar: "",
    service: "Custom AI & ML Solutions",
    review:
      "We needed a smarter way to handle repetitive tasks and work with our business data. Futurise Solutions helped us explore and implement an AI-based approach tailored to our needs. They explained the technical aspects clearly and kept the focus on solving our actual business problems rather than adding unnecessary complexity.",
  },
  {
    name: "Arjun Patel",
    title: "India",
    avatar: "",
    service: "Shopify Development",
    review:
      "We wanted an online store that looked professional and was easier to manage as our business grew. Futurise Solutions helped us build a Shopify experience around our products and business requirements. The team was receptive to feedback and worked toward making the shopping journey smoother for our customers.",
  },
  {
    name: "Oliver Bennett",
    title: "New Zealand",
    avatar: "",
    service: "AI Agents & Automation",
    review:
      "Our team was spending too much time on repetitive processes that could be handled more efficiently. Futurise Solutions helped us explore custom AI agents and automation suited to our workflow. I appreciated their practical approach, willingness to understand our challenges, and focus on building a solution around the way our business operates.",
  },
  {
    name: "Emily Carter",
    title: "USA",
    avatar: "",
    service: "Mobile App Development",
    review:
      "We had a business idea but needed a development team that could help turn it into a usable mobile application. Futurise Solutions took time to understand the concept, discuss the required features, and consider the user experience. Their structured approach helped us think through the technical requirements and move toward a solution aligned with our goals.",
  },
  {
    name: "Liam Thompson",
    title: "Canada",
    avatar: "",
    service: "Blockchain Solutions",
    review:
      "We needed guidance on how blockchain technology could address specific requirements in our project. Futurise Solutions helped us explore the technical possibilities and discuss an approach suited to our use case. Their team was open to questions and focused on understanding the problem before considering the right implementation.",
  },
  {
    name: "Jack Wilson",
    title: "Australia",
    avatar: "",
    service: "Custom Software & AI Integration",
    review:
      "Managing different tools and disconnected workflows was creating unnecessary complexity for our business. Futurise Solutions helped us explore a custom software approach that could better connect our processes and support future growth. Their ability to discuss both software and AI possibilities made the project conversations useful and focused on our business needs.",
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
    outcome: "A booking flow designed to win reservations directly rather than through third-party platforms",
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
