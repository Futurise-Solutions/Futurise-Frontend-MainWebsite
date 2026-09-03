import {
  AppDevHover, AppDevNavbarIcon, BlockchainDevNavbarIcon, BlockchainHover,
  DigiMarketingNavbarIcon, DigitalMarketingHover, AiMlHover, AiMlNavbarIcon,
  UIUXHover, UIUXNavbarIcon, WebDevNavbarIcon, clientIconHover, expertiseiconHover,
  postIconHover, qualityIconHover, timeIconHover, webDevHover,
  propertyDashboard1, propertyDashboard2, realState1, realState2, realState3,
  marty1, marty2, marty3, crypto1, crypto2, jewel1, jewel2, jewel3, hotel1, hotel2, hotel3,
  infinityBay3,
  infinityBayHome, infinityBayTruck, infinityBayReveal,
  dhanlaxmi1, dhanlaxmi2, dhanlaxmi3,
  palmvision1, palmvision2, palmvision3,
  logoHomies, logoMarty, logoDavidTishbi, logoEstate, logoGdt, logoPlatinumPeak,
  logoInfinityBay, logoDhanlaxmi, logoPalmvision,
} from "../../assests";
import {
  FaClipboardList, FaPencilRuler, FaBullseye, FaHammer, FaCheckCircle, FaRocket, FaTools,
} from "react-icons/fa";

// TRUST CONTENT POLICY
// Everything in this file that a visitor could read as evidence — stats, testimonials,
// client names, logos — must be verifiable against real delivered work. Illustrative or
// placeholder social proof is not acceptable here: fabricated testimonials breach
// Google's spam policies and are prohibited outright by the FTC's 2024 Rule on Consumer
// Reviews and Testimonials, the NZ Fair Trading Act and UAE consumer protection law.
// When adding a testimonial, add the matching project to `Projects` in the same commit.

// **************** OUR SERVICES ****************
export const OurServiceData = [
  {
    serviceName: "AI & ML Solutions",
    serviceDesc:
      "Custom AI agents, LLM integrations, and ML-powered features that automate workflows and make your product smarter.",
    icon: AiMlHover,
    route: "ai-ml-solutions",
  },
  {
    serviceName: "Web Development",
    serviceDesc:
      "Lightning-fast, SEO-ready websites and web apps built with modern frameworks and clean, maintainable code.",
    icon: webDevHover,
    route: "web-development",
  },
  {
    serviceName: "App Development",
    serviceDesc:
      "Native and cross-platform iOS & Android apps that feel fast, look beautiful, and scale with your business.",
    icon: AppDevHover,
    route: "app-development",
  },
  {
    serviceName: "UI/UX Design",
    serviceDesc:
      "Research-driven product design and intuitive interfaces that turn first-time visitors into loyal customers.",
    icon: UIUXHover,
    route: "ui-ux-design",
  },
  {
    serviceName: "Blockchain Development",
    serviceDesc:
      "Web3 frontends, DeFi platforms, MEV bots, launchpads, and multi-chain dApps — built for real production.",
    icon: BlockchainHover,
    route: "blockchain-development",
  },
  {
    serviceName: "Digital Marketing",
    serviceDesc:
      "Data-led SEO, performance marketing, and social strategy that grows traffic, leads, and revenue.",
    icon: DigitalMarketingHover,
    route: "digital-marketing",
  },
];

// **************** CONTACT CHANNELS ****************
// One definition for every way to reach the company.
//
// There is deliberately no phone number and no WhatsApp link here. Enquiries run through
// three channels only: the strategy-call booking flow, the contact form, and email. A
// published number was working against that — the only one we had was +91, sitting beside
// a Wellington address, which reads as an offshore contact rather than a local one and
// undercuts the New Zealand entity the rest of the site establishes. Removing it entirely
// is a positioning decision, not an oversight: do not reintroduce a `phoneHref`,
// `whatsappHref`, or `tel:`/`wa.me` link without revisiting that decision.
export const CONTACT = {
  email: "business@futurisesolutions.com",
  address: {
    line1: "Huddart Parker Building",
    line2: "Wellington Central",
    line3: "Wellington 6011, New Zealand",
    mapsUrl:
      "https://maps.google.com/?q=Huddart+Parker+Building,+Wellington+Central,+Wellington+6011,+New+Zealand",
  },
};

// **************** SOCIAL PROFILES ****************
// Drives both the footer icons and schema.org `sameAs`. These had drifted: the footer
// linked four profiles while `sameAs` declared three, so the X profile was invisible to
// search engines as a corroborating signal.
//
// `sameAs` is a primary entity-disambiguation input, and this brand needs it — "Futurise
// Solutions" is one character from Futurice, an established Finnish consultancy with a
// Wikipedia entry. Every additional verified profile makes the two easier to tell apart.
//
// Keep index.html's Organization schema in sync by hand: it is static HTML, outside the
// bundle, and therefore cannot import this.
export const SOCIAL_PROFILES = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/futurisesolutions/" },
  { label: "Instagram", href: "https://www.instagram.com/futurisesolutions" },
  { label: "Facebook", href: "https://www.facebook.com/share/1E6xe2C5DW/" },
  { label: "X (Twitter)", href: "https://x.com/futurisesol" },
];

/** Bare URL list, the shape schema.org `sameAs` expects. */
export const SAME_AS = SOCIAL_PROFILES.map((p) => p.href);

// **************** MARKETS ****************
// Single source of truth for schema.org `areaServed`. This list previously existed as
// five separate copies across index.html, AboutUs, ContactusPage and ServicePage, and
// they had already drifted apart — the service pages were missing entries the others had.
// Ordered by commercial priority, so the primary markets lead.
// Keep index.html's Organization schema in sync by hand: it is static HTML, outside the
// bundle, and therefore cannot import this.
// `areaServed` describes where a service is offered, not where the company has an
// establishment, so listing a market served remotely is exactly what the property is for.
// What it must not do is pair with copy implying local presence — see /europe, which states
// in its own body that there is no European office, staff or entity.
//
// The United Kingdom stays on this list because /europe now argues that market explicitly
// (EEA + UK), which makes it a market the site genuinely addresses rather than an aspiration
// with nothing behind it. If /europe is ever removed, remove GB here too.
export const AREAS_SERVED = [
  "New Zealand",
  "United Arab Emirates",
  "United States",
  "Canada",
  "India",
  "United Kingdom",
  "Australia",
];

// ISO 3166-1 alpha-2 form, for schema that expects codes rather than names.
// Kept in the same order as AREAS_SERVED so the two can be read side by side.
export const AREAS_SERVED_ISO = ["NZ", "AE", "US", "CA", "IN", "GB", "AU"];

// **************** COMPANY STATS ****************
// Whole-business operating figures, attested by the company — NOT a count of what is
// published on this site. An earlier version derived these from `Projects.length`, which
// understated the business badly: /portfolio shows selected featured work, not every
// engagement delivered, so it was never the right denominator.
//
// Two rules keep these credible:
//   1. Rounded down, with "+". A "+" figure reads as "at least this", which is both
//      honest and unfalsifiable. Precise-looking numbers ("27 projects", "97% retention")
//      imply measurement a prospect can ask to see, and invite doubt when it is not there.
//   2. Every figure must survive the question "can you talk me through that?" on a sales
//      call. These are the claims a buyer tests first.
//
// `Core service areas` is deliberately exact, not "+": there are exactly six service
// pages, and claiming more than the navigation shows is a contradiction a visitor spots
// in one click. One exact number beside rounded ones also reads as measured rather than
// decorative.
//
// Still deliberately avoided: satisfaction and retention percentages ("97% client
// retention", "100% on-time delivery"). They imply a tracked metric, are the first thing
// an informed buyer discounts, and add no persuasion that "25+ projects" does not.
export const companyStats = [
  { value: 25, suffix: "+", label: "Projects delivered" },
  { value: 15, suffix: "+", label: "Clients served" },
  { value: 4, suffix: "+", label: "Countries served" },
  { value: 6, suffix: "", label: "Core service areas" },
];

// **************** CLIENT TESTIMONIALS ****************
// Attributed, first-party quotes only. Every entry names a real client whose project
// appears in `Projects` below, so any claim here can be checked against the portfolio.
// Add new entries only with the client's permission; anonymise as "First-name L.,
// Role — sector, city" if they prefer, but never invent a person or a company.
export const testimonials = [
  {
    name: "Abbas Kagzi",
    title: "Founder, Infinity Bay Trading — Dubai, UAE",
    avatar: "",
    review:
      "We came to Futurise with a slow WordPress site that barely showed up on Google. They rebuilt it on Astro — it loads instantly now, feels far smoother, and with the new SEO content and blog we're finally getting found by buyers across the UAE. Professional team, clear communication, handled everything from design to Google Search Console.",
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
export const Projects = [
  {
    featured: true,
    img: [
      { src: infinityBayHome, alt: "Infinity Bay Trading homepage hero reading 'One hub for every space. Infinite supply.' — a Dubai, UAE one-stop FMCG, HORECA and industrial supply partner, rebuilt on Astro for fast loading" },
      { src: infinityBayTruck, alt: "Infinity Bay Trading branded delivery truck in the scroll-driven hero, with category, brand and one-stop supply figures across the UAE" },
      { src: infinityBayReveal, alt: "Infinity Bay Trading product reveal — FMCG beverages and confectionery, HORECA tableware and industrial bearings emerging from the delivery truck" },
      { src: infinityBay3, alt: "Infinity Bay Trading product categories — coffee, beverages, confectionery, baby nutrition, spices, personal care and electronics for UAE businesses" },
    ],
    location: "Dubai, UAE",
    projectType: "Wholesale Trading · Web Rebuild & SEO",
    Heading: "Infinity Bay Trading — B2B Supply Website, Rebuilt for Speed & SEO",
    aboutProject:
      "A trusted Dubai-based supply partner covering FMCG, HORECA and industrial goods. We rebuilt their slow WordPress site as a fast, SEO-first website on Astro — with AEO/GEO-optimized content, a brand blog, and full Google Search Console indexing so buyers across the UAE can find them.",
    problem:
      "Their previous WordPress site loaded slowly, ranked poorly on Google, and had weak on-page SEO — costing Infinity Bay visibility and qualified B2B enquiries in a competitive Dubai and UAE market.",
    solution:
      "We rebuilt the site from the ground up on Astro for near-instant loads and smooth performance, restructured it around SEO/AEO/GEO-optimized, product-led content, launched an on-brand blog, and set up Google Search Console to get every page indexed and discoverable.",
    tags: ["Web Development", "SEO", "Astro", "WordPress Migration", "AEO", "GEO", "Dubai", "UAE", "B2B Trading"],
    clentName: "Infinity Bay Trading",
  },
  {
    featured: true,
    img: [
      { src: dhanlaxmi1, alt: "Dhanlaxmi Property homepage — a land development and property advisory firm in Udaipur, Rajasthan, with a lake-city hero and enquiry-led calls to action" },
      { src: dhanlaxmi2, alt: "Dhanlaxmi Property track-record section showing land transactions closed, families housed, customer rating and years in Udaipur" },
      { src: dhanlaxmi3, alt: "Dhanlaxmi Property plotted-colony listings with aerial site photography, plot counts, plotted area and plot sizes for each project near Udaipur" },
    ],
    location: "Udaipur, India",
    projectType: "Real Estate · Lead-Generation Site & SEO",
    Heading: "Dhanlaxmi Property — Land Advisory Site Built for Qualified Enquiries",
    aboutProject:
      "A land development, project planning and property advisory firm operating in Udaipur since 1998. We built a lead-generation site on Next.js — not a listings marketplace — where the six plotted colonies each carry their own layout plan, plot sizes and aerial site footage, and every enquiry route is one tap away.",
    problem:
      "Buyers judging land in Udaipur — families, investors and NRIs buying from abroad — had no way to check a plotted colony without visiting it. Plot counts, approved sizes and what a site actually looks like today lived on paper layout plans and in the client's own drone footage, so every basic question became a phone call before anyone could be qualified.",
    solution:
      "We built the site around the six colonies rather than around a search box. Each project page carries the layout plan, the plot count, the plotted area, the plot sizes and aerial footage of the site as it stands, with phone, WhatsApp and form enquiry on every page. Figures are read off the client's own plans, and anything a plan does not state renders as 'On request' rather than being estimated.",
    tags: ["Web Development", "Next.js", "SEO", "Local SEO", "Lead Generation", "Real Estate", "Udaipur", "India"],
    clentName: "Dhanlaxmi Property",
  },
  {
    featured: true,
    img: [
      { src: palmvision1, alt: "Palm Vision Technology homepage — CCTV, security systems and office technology supplied, installed and serviced in Fatehpura, Udaipur" },
      { src: palmvision2, alt: "Palm Vision Technology service cards for CCTV and surveillance, biometric attendance, computers and laptops, printers and scanners, video door phone and projectors" },
      { src: palmvision3, alt: "Palm Vision Technology site section showing supply, installation and service coverage for homes, shops, offices and factories in Udaipur" },
    ],
    location: "Udaipur, India",
    projectType: "Security & IT Retail · Static Site & Local SEO",
    Heading: "Palm Vision Technology — Ten Service Lines, One Findable Shop",
    aboutProject:
      "A CCTV, security systems and office technology business in Fatehpura, Udaipur, trading since 2006. We built a statically exported Next.js site covering all ten service lines and the brands they stock, published to a custom domain with nothing but React shipping to the browser.",
    problem:
      "The business sells ten distinct service lines — CCTV, biometric attendance, computers, printers, video door phones, projectors, intruder alarms, EPABX and more — each with its own buyers and its own search demand. With no page per service there was nothing for any of those searches to land on, and a customer looking for one line had no way to discover the other nine.",
    solution:
      "We gave every service line its own page, generated from typed content rather than hand-built, alongside a stocked-brands index and a set of buyer guides answering the questions that precede a quote. The whole site is statically exported and served from a custom domain, so pages load as flat files and the only runtime dependencies are React itself.",
    tags: ["Web Development", "Next.js", "Static Export", "Local SEO", "Security Systems", "Udaipur", "India"],
    clentName: "Palm Vision Technology",
  },
  {
    featured: true,
    img: [
      { src: propertyDashboard1, alt: "HOMIES property management dashboard showing income, expenses, and unit analytics for a real-estate portfolio in the USA and India" },
      { src: propertyDashboard2, alt: "HOMIES dashboard detail view with property performance charts and recent transactions" },
    ],
    location: "USA & India",
    projectType: "PropTech · SaaS Dashboard",
    Heading: "HOMIES — Property Management & Analytics Dashboard",
    aboutProject:
      "A unified SaaS dashboard giving real-estate teams a single view of income, expenses, occupancy, and unit performance — engineered in React, Vite, and Chakra UI with interactive charts built for speed on any device.",
    problem:
      "Property managers were juggling multiple spreadsheets and outdated tools to track income, expenses, and occupancy across their portfolio — causing costly errors and slow decision-making.",
    solution:
      "We built a unified SaaS dashboard with real-time analytics and interactive charts that gives property teams instant, accurate visibility across thousands of listings from any device.",
    stats: [
      { value: "+62%", label: "Faster Reporting" },
      { value: "+45%", label: "Admin Time Saved" },
      { value: "98%", label: "Data Accuracy" },
    ],
    tags: ["PropTech", "SaaS", "Analytics Dashboard", "React", "Real Estate"],
    clentName: "HOMIES PropTech",
  },
  {
    img: [
      { src: marty1, alt: "Marty-QR AI review platform landing page with a 'Review Simplified' hero" },
      { src: marty2, alt: "Marty-QR features overview for collecting customer reviews via QR codes" },
      { src: marty3, alt: "Marty-QR client portal for managing online reputation and feedback" },
    ],
    location: "USA & India",
    projectType: "SaaS · AI Review Platform",
    Heading: "Marty-QR — AI-Powered Review Management",
    aboutProject:
      "An AI-powered review and feedback platform that helps local businesses collect, manage, and grow their online reputation through QR touchpoints and seamless Google integration.",
    problem:
      "Local businesses were losing customers to competitors with stronger online reviews, but had no simple, consistent system to capture feedback from satisfied customers at the right moment.",
    solution:
      "We delivered an AI-powered platform with QR touchpoints that capture in-moment reviews, automate responses, and sync directly with Google — turning every visit into a potential five-star rating.",
    stats: [
      { value: "3.2x", label: "Review Collection Rate" },
      { value: "+89%", label: "Google Rating Lift" },
      { value: "+55%", label: "New Customer Conversions" },
    ],
    tags: ["SaaS", "AI", "Review Management", "QR Code", "Online Reputation"],
    clentName: "Marty-QR",
  },
  {
    img: [
      { src: jewel1, alt: "David Tishbi luxury jewelry storefront hero featuring fine gems and rings" },
      { src: jewel2, alt: "David Tishbi jewelry collection page with product listings" },
      { src: jewel3, alt: "David Tishbi watches and bullion category for premium shoppers in the USA and India" },
    ],
    location: "USA",
    projectType: "Luxury E-commerce",
    Heading: "David Tishbi — Luxury Jewelry E-commerce",
    aboutProject:
      "A bespoke luxury e-commerce storefront for a boutique jewelry brand — editorial storytelling, appointment booking, and a conversion-optimized checkout crafted for high-intent premium shoppers.",
    problem:
      "The brand's existing site failed to convey the premium quality of their pieces — slow load times, poor mobile experience, and a generic layout were driving high bounce rates and lost sales.",
    solution:
      "We crafted a bespoke luxury storefront with editorial design, refined typography, appointment booking, and a streamlined checkout — turning first-time visitors into loyal collectors.",
    stats: [
      { value: "+73%", label: "Session Duration" },
      { value: "+48%", label: "Direct Bookings" },
      { value: "-38%", label: "Bounce Rate" },
    ],
    tags: ["E-commerce", "Luxury Retail", "Jewelry", "Conversion Optimization", "Web Design"],
    clentName: "David Tishbi Jewelry",
  },
  {
    img: [
      { src: realState1, alt: "Estate real-estate platform homepage with a property search hero for buyers in India and the USA" },
      { src: realState2, alt: "Estate property listings page showing homes for sale and rent" },
      { src: realState3, alt: "Estate agent profiles and featured property details" },
    ],
    location: "India & USA",
    projectType: "Real Estate · Web Platform",
    Heading: "Estate — Property Search & Listings Platform",
    aboutProject:
      "A conversion-focused real-estate platform with rich property search, agent profiles, and featured listings — fast, SEO-friendly, and built to move visitors from browsing to booking.",
    problem:
      "Growing agencies were stuck on generic listing platforms with poor SEO, no brand differentiation, and a clunky search experience that caused high lead drop-off before enquiry.",
    solution:
      "We built a fast, SEO-optimized property platform with rich filtering, agent profiles, and compelling calls-to-action that guide visitors naturally from discovery to booking a viewing.",
    stats: [
      { value: "+58%", label: "Organic Traffic" },
      { value: "+41%", label: "Lead Conversion" },
      { value: "3x", label: "Page Speed Score" },
    ],
    tags: ["Real Estate", "Web Platform", "Property Search", "SEO", "Lead Generation"],
    clentName: "Estate Realty",
  },
  {
    img: [
      { src: crypto1, alt: "Crypto trading terminal with a live candlestick chart, order book, and buy/sell order form" },
      { src: crypto2, alt: "Crypto exchange market view with depth chart and perpetuals trading tools" },
    ],
    location: "USA & India",
    projectType: "FinTech · Web3",
    Heading: "Crypto Exchange — Perpetuals Trading Terminal",
    aboutProject:
      "A professional trading terminal for spot and perpetuals with real-time charts, live order books, and audited smart-contract integrations — optimized for split-second decisions without sacrificing clarity.",
    problem:
      "Experienced traders were forced to use bloated, confusing interfaces that sacrificed usability for data density — leading to costly mistakes and high platform abandonment.",
    solution:
      "We engineered a precision trading terminal with real-time candlestick charts, live order books, and a clean buy/sell interface — optimized for speed, clarity, and non-custodial security.",
    stats: [
      { value: "+67%", label: "Trade Execution Speed" },
      { value: "+52%", label: "User Retention" },
      { value: "-28%", label: "Order Error Rate" },
    ],
    tags: ["FinTech", "Web3", "Crypto Exchange", "Trading Terminal", "Smart Contracts"],
    clentName: "GDT Exchange",
  },
  {
    img: [
      { src: hotel1, alt: "Platinum Peak hotel booking website showcasing luxury rooms" },
      { src: hotel2, alt: "Platinum Peak suite gallery highlighting amenities and interiors" },
      { src: hotel3, alt: "Platinum Peak direct reservation booking section" },
    ],
    location: "India & USA",
    projectType: "Hospitality · Booking",
    Heading: "Platinum Peak — Luxury Hotel Booking Experience",
    aboutProject:
      "An immersive hotel booking website with stunning room galleries and a frictionless direct-reservation flow — designed to convert guests and reduce dependency on costly OTA platforms.",
    problem:
      "The hotel was losing a majority of bookings to OTA platforms (Booking.com, Expedia), paying steep commissions and losing direct relationships with guests.",
    solution:
      "We built an immersive direct-booking site with editorial room galleries, seamless reservation flow, and persuasive CTAs — making it effortless for guests to book without third parties.",
    stats: [
      { value: "+84%", label: "Direct Bookings" },
      { value: "+61%", label: "Conversion Rate" },
      { value: "-42%", label: "OTA Dependency" },
    ],
    tags: ["Hospitality", "Hotel Booking", "Direct Booking", "Web Design", "CRO"],
    clentName: "Platinum Peak Hotels",
  },
];

// **************** WHY CHOOSE US ****************
export const cards = [
  {
    icon: expertiseiconHover,
    title: "Expertise & Innovation",
    description:
      "A senior team that stays ahead of the curve, applying the right modern tech to every problem — not just the trendy one.",
  },
  {
    icon: clientIconHover,
    title: "Client-Centric Approach",
    description:
      "You get a dedicated point of contact, weekly demos, and full transparency from kickoff to launch and beyond.",
  },
  {
    icon: qualityIconHover,
    title: "Quality & Reliability",
    description:
      "Clean, tested, documented code and rigorous QA mean fewer bugs, easier maintenance, and a product you can trust.",
  },
  {
    icon: timeIconHover,
    title: "On-Time Delivery",
    description:
      "Clear milestones and agile sprints keep your project on schedule and on budget, with no surprises.",
  },
  {
    icon: expertiseiconHover,
    title: "Scalable Architecture",
    description:
      "We build for tomorrow — systems that handle growth in users, data, and features without a costly rebuild.",
  },
  {
    icon: postIconHover,
    title: "Post-Launch Support",
    description:
      "Launch is the beginning. We monitor, maintain, and iterate so your product keeps improving over time.",
  },
];

// **************** FAQ ****************
export const faqs = [
  {
    question: "What services does Futurise offer?",
    answer:
      "We're a full-cycle product studio: AI agents & ML solutions, web and mobile app development, UI/UX design, blockchain & Web3 development, and data-driven digital marketing — everything you need to take an idea from concept to launch.",
  },
  {
    question: "How much does a project cost?",
    answer:
      "Every project is scoped individually based on complexity, features, and timeline. After a free consultation we send a transparent, fixed-scope estimate. Most engagements start from a small discovery phase so you can validate before committing.",
  },
  {
    question: "How long does it take to build a product?",
    answer:
      "A focused MVP typically takes 6–12 weeks, while larger platforms run 3–6 months. We work in two-week agile sprints with regular demos so you see real progress the whole way through.",
  },
  {
    question: "Do you offer custom solutions?",
    answer:
      "Always. We don't use one-size-fits-all templates — every solution is tailored to your goals, brand, and users, with architecture chosen specifically for your needs.",
  },
  {
    question: "What happens after the project launches?",
    answer:
      "We offer flexible post-launch support and maintenance plans covering monitoring, updates, security, and new features, so your product stays fast, secure, and ahead of the competition.",
  },
  {
    question: "How do we get started?",
    answer:
      "Just reach out through our contact page. We'll schedule a free consultation within a couple of hours to understand your vision and recommend the best path forward.",
  },
];

// **************** BLOG → SERVICE ROUTING ****************
// Blog posts are 48 of the site's 68 indexable URLs and earn most of its impressions,
// but every post used to dead-end at "Related articles" — no offer, no service link, no
// way to enquire. Readers arriving on a cost or how-to query had nowhere to go.
//
// Categories are free text in the CMS and have drifted ("AI & ML", "AI Development",
// "AI & Technology" all exist), so match on a normalised substring rather than exact
// keys, and fall back to the AI service, which covers 27 of the 50 published posts.
const BLOG_CATEGORY_ROUTES = [
  [/blockchain|web3|crypto/i, "blockchain-development"],
  [/marketing|seo|growth/i, "digital-marketing"],
  [/ui|ux|design|creative/i, "ui-ux-design"],
  [/app\b|mobile/i, "app-development"],
  [/web|software/i, "web-development"],
  [/ai|ml|machine learning|technology/i, "ai-ml-solutions"],
];

/** Best-matching service slug for a blog category. Never returns undefined. */
export const serviceForBlogCategory = (category = "") => {
  const match = BLOG_CATEGORY_ROUTES.find(([pattern]) => pattern.test(category));
  return match ? match[1] : "ai-ml-solutions";
};

// **************** ENGAGEMENT COMMITMENTS ****************
// How we actually work, stated as commitments a prospect can hold us to. These carry
// real trust weight — they are concrete and falsifiable, unlike adjectives — and they
// answer the questions buyers ask before enquiring, which is exactly the phrasing
// answer engines extract when someone asks "how does Futurise Solutions work?".
// Anything added here must be something the team genuinely does on every project.
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
export const partners = [
  { img: logoInfinityBay,  name: "Infinity Bay Trading" },
  { img: logoHomies,       name: "HOMIES PropTech" },
  { img: logoDhanlaxmi,    name: "Dhanlaxmi Property" },
  { img: logoMarty,        name: "Marty-QR" },
  { img: logoPalmvision,   name: "Palm Vision Technology" },
  { img: logoDavidTishbi,  name: "David Tishbi Jewelry" },
  { img: logoEstate,       name: "Estate Realty" },
  { img: logoGdt,          name: "GDT Exchange" },
  { img: logoPlatinumPeak, name: "Platinum Peak Hotels" },
];

// **************** NAVIGATION ****************
export const navbarOptions = [
  { option: "Home", path: "/" },
  { option: "About", path: "/about" },
  { option: "Services", path: "/" },
  { option: "Portfolio", path: "/portfolio" },
  // "How much does this cost" is the question buyers arrive with and the intent the
  // blog already ranks for, so it earns a top-level slot rather than a footer link.
  { option: "Pricing", path: "/pricing" },
  { option: "Blog", path: "/blog" },
  { option: "Contact", path: "/contact" },
];

export const NavbarservicesOptions = [
  { option: "Web Development", icon: WebDevNavbarIcon, path: "/service/web-development", desc: "Sites & web apps" },
  { option: "App Development", icon: AppDevNavbarIcon, path: "/service/app-development", desc: "iOS & Android" },
  { option: "UI/UX Design", icon: UIUXNavbarIcon, path: "/service/ui-ux-design", desc: "Product design" },
  { option: "Blockchain Development", icon: BlockchainDevNavbarIcon, path: "/service/blockchain-development", desc: "Web3 & dApps" },
  { option: "AI & ML Solutions", icon: AiMlNavbarIcon, path: "/service/ai-ml-solutions", desc: "Agents & automation" },
  { option: "Digital Marketing", icon: DigiMarketingNavbarIcon, path: "/service/digital-marketing", desc: "SEO & growth" },
];

// **************** WORLDWIDE LOCATIONS ****************
export const locations = [
  { name: "USA", coordinates: [37.0902, -95.7129] },
  { name: "Australia", coordinates: [-25.2744, 133.7751] },
  { name: "Denmark", coordinates: [56.2639, 10.4515] },
  { name: "South Africa", coordinates: [-30.5595, 22.9375] },
  { name: "UAE", coordinates: [25.2048, 55.1713] },
  { name: "India", coordinates: [20.5937, 78.9629] },
  { name: "UK", coordinates: [55.378051, -3.435973] },
];

// **************** ABOUT — CORE VALUES ****************
export const coreValues = [
  {
    title: "Transparency",
    description: "Clear pricing, honest timelines, and open communication at every stage — no jargon, no surprises.",
  },
  {
    title: "Craftsmanship",
    description: "We sweat the details. Pixel-perfect interfaces and clean, well-tested code are non-negotiable.",
  },
  {
    title: "Partnership",
    description: "We act as an extension of your team, invested in your outcomes long after launch.",
  },
  {
    title: "Innovation",
    description: "We embrace emerging tech responsibly, choosing what genuinely moves your business forward.",
  },
];

// --------- About Us — Technology excellence strengths ---------
export const strengths = [
  {
    name: "AI & ML Solutions",
    description: [
      "Custom AI agents and LLM integrations that automate complex workflows.",
      "Machine learning models trained on your data for smarter decisions.",
      "AI-powered SaaS platforms and features that scale with your business.",
    ],
    icon: AiMlHover,
  },
  {
    name: "Web Development",
    description: [
      "Responsive designs that adapt seamlessly across every screen and device.",
      "Dynamic, high-performance websites with interactive, modern features.",
      "SEO best practices baked in to maximize visibility and search rankings.",
    ],
    icon: webDevHover,
  },
  {
    name: "App Development",
    description: [
      "High-quality mobile apps with robust functionality and seamless performance.",
      "Cross-platform compatibility for iOS and Android to reach a wider audience.",
      "Intuitive, user-friendly interfaces designed for engagement and retention.",
    ],
    icon: AppDevHover,
  },
  {
    name: "Blockchain Development",
    description: [
      "Secure blockchain solutions ensuring data integrity and transparency.",
      "Decentralized applications (dApps) that harness the power of Web3.",
      "Smart contracts engineered to automate processes and enforce agreements.",
    ],
    icon: BlockchainHover,
  },
  {
    name: "UI/UX Design",
    description: [
      "User-centric designs focused on the needs of your target audience.",
      "Intuitive interfaces that enhance usability and accessibility.",
      "Thoughtful experiences that turn visitors into loyal customers.",
    ],
    icon: UIUXHover,
  },
  {
    name: "Digital Marketing",
    description: [
      "Targeted strategies that boost your online presence and reach.",
      "Engagement campaigns designed to attract and retain customers.",
      "Social and performance marketing that drives measurable traffic.",
    ],
    icon: DigitalMarketingHover,
  },
];

// **************** SERVICE PAGES ****************
export const services = {
  "app-development": {
    title: "App Development",
    metaTitle: "App Development Company — iOS & Android (React Native)",
    metaDescription:
      "Cross-platform iOS & Android apps from one React Native codebase. Fixed-scope quotes instead of open-ended hourly billing. Book a free 45-minute consultation.",
    whatWeDo: "What we do",
    description: "Cross-platform iOS & Android apps built with React Native & Expo.",
    details:
      "From idea to App Store, we design and engineer cross-platform mobile apps with React Native and Expo that are fast, secure, and a joy to use. We handle architecture, UI, maps, push notifications, backend integration, and full store deployment — so you get a polished product on both platforms without the headaches.",
    features: [
      "Cross-platform apps with React Native & Expo",
      "Google Maps API, push notifications & deep linking",
      "Firebase, Supabase, AWS & Google Cloud backends",
      "App Store & Play Store deployment with OTA updates",
    ],
    industries: [
      "Consumer & Lifestyle",
      "Marketplaces & On-Demand",
      "FinTech & Wallets",
      "Real Estate & Booking",
      "Health & Fitness",
      "B2B & SaaS",
    ],
    faqs: [
      {
        question: "How long does it take to build an app?",
        answer:
          "A focused MVP usually takes 8–14 weeks; a full product with custom backend and payments runs 16–24 weeks. We scope it precisely after a free discovery call so there are no surprises.",
      },
      {
        question: "Why cross-platform instead of separate native apps?",
        answer:
          "React Native and Expo give you true native performance from a single codebase — both platforms ship together, typically at 40–60% less cost than building two separate native apps.",
      },
      {
        question: "Do you handle App Store and Play Store submission?",
        answer:
          "Yes. We manage the full submission process — developer accounts, metadata, screenshots, privacy requirements, and responding to reviewer feedback.",
      },
      {
        question: "Can you add features to an existing app?",
        answer:
          "Absolutely. We audit the existing codebase first, then scope feature additions cleanly so we extend your app without piling on technical debt.",
      },
      {
        question: "Which devices will the app support?",
        answer:
          "We target iOS 14+ and Android 8+ as a baseline — over 95% of active devices — and test on real hardware across multiple OS versions, not just simulators.",
      },
    ],
  },
  "web-development": {
    title: "Web Development",
    metaTitle: "Web Development Company — React, Next.js & Node.js",
    metaDescription:
      "Custom websites, SaaS platforms and web apps in React, Next.js and Node.js. Fixed-scope quotes, not hourly billing. Book a free 45-minute consultation.",
    whatWeDo: "What we do",
    description: "Responsive, robust web applications that perform.",
    details:
      "We build high-performing websites and web apps with modern frameworks, clean architecture, and rock-solid performance. From pixel-perfect frontends to scalable Node.js backends, structured databases, CI/CD pipelines, and full test coverage — SEO-ready, accessible, and built to last.",
    features: [
      "Modern frontends with React, Next.js, Astro & TypeScript",
      "Node.js backends with REST & GraphQL APIs",
      "MongoDB, PostgreSQL, MySQL & Redis databases",
      "CI/CD pipelines, cloud deployment & automated testing",
    ],
    industries: [
      "SaaS & Startups",
      "E-commerce & Retail",
      "Real Estate & PropTech",
      "Professional Services",
      "Healthcare",
      "FinTech",
    ],
    faqs: [
      {
        question: "Do you work with existing codebases or only new projects?",
        answer:
          "Both. We audit your existing code, decide what to keep versus rebuild, and work incrementally when a full rewrite isn't practical.",
      },
      {
        question: "Can you build from our Figma designs?",
        answer:
          "Yes. We regularly translate Figma files from in-house or third-party designers into pixel-perfect, production-ready code.",
      },
      {
        question: "Will my website be fast and SEO-ready?",
        answer:
          "Performance and SEO are built into the architecture — server-side rendering, semantic HTML, structured data, and Core Web Vitals tuned for sub-2-second loads.",
      },
      {
        question: "Do you provide hosting and maintenance after launch?",
        answer:
          "We deploy to your preferred infrastructure (Vercel, AWS, GCP) and offer ongoing maintenance for updates, security patches, and new features.",
      },
      {
        question: "How long does a web project take?",
        answer:
          "A marketing site typically takes 3–6 weeks; a full web app or SaaS platform runs 8–16 weeks. You get a clear timeline after a free discovery call.",
      },
    ],
  },
  "ui-ux-design": {
    title: "UI/UX Design",
    metaTitle: "UI/UX Design Agency — Product Design & Figma",
    metaDescription:
      "UX research, Figma UI and design systems that cut churn and lift conversions. Fixed-scope quotes, not hourly billing. Book a free 45-minute consultation.",
    whatWeDo: "What we do",
    description: "User-centric, visually stunning interfaces.",
    details:
      "Our design team turns research into interfaces people love to use. From UX discovery and user flows to high-fidelity Figma UI, interactive prototypes, and a scalable design system, we craft experiences that are beautiful, accessible (WCAG 2.1), and engineered to convert visitors into customers.",
    features: [
      "UX research, user flows & wireframing",
      "High-fidelity UI design in Figma",
      "Interactive prototypes & usability testing",
      "Reusable design systems & component libraries",
    ],
    industries: [
      "SaaS & Dashboards",
      "E-commerce",
      "FinTech",
      "Healthcare",
      "Real Estate",
      "EdTech & Marketplaces",
    ],
    faqs: [
      {
        question: "Do I need UX research if I already know my users?",
        answer:
          "Almost every team discovers something surprising in the first week of research. What users say and what they actually do rarely match — research removes expensive assumptions before you build.",
      },
      {
        question: "How long does a UI/UX project take?",
        answer:
          "A focused landing page or feature redesign takes 2–3 weeks; a full product design with a design system runs 6–12 weeks depending on scope and feedback cycles.",
      },
      {
        question: "Can you redesign an existing product without breaking it?",
        answer:
          "Yes. We audit the current experience, prioritise the highest-impact changes, and roll them out incrementally so your current users aren't disrupted.",
      },
      {
        question: "Do you work with our existing development team?",
        answer:
          "Always. We design in Figma with developer handoff in mind and work directly with your engineers to answer implementation questions throughout the build.",
      },
    ],
  },
  "blockchain-development": {
    title: "Blockchain Development",
    metaTitle: "Blockchain Development — Smart Contracts, DeFi & Web3",
    metaDescription:
      "Audited smart contracts, DeFi platforms and multi-chain dApps on Ethereum, Solana and Base. Fixed-scope quotes. Book a free 45-minute consultation.",
    whatWeDo: "What we do",
    description: "Real Web3 products — DeFi, bots, launchpads & multi-chain.",
    details:
      "We build production-grade Web3 products backed by real delivered projects: DeFi frontends with staking, swaps, and liquidity pools; MEV and transaction-bundling bots; Telegram-native trading platforms; launchpads and airdrop dashboards; and multi-chain EVM deployments across Ethereum, BSC, Base, Arbitrum, and Solana.",
    features: [
      "DeFi frontends — staking, AMM swaps, liquidity, launchpads",
      "MEV bots, Solana/ETH bundle scripts & arbitrage automation",
      "Telegram trading & analytics bots with real-time data",
      "Multi-chain EVM deployments (Ethereum, BSC, Base, Arbitrum, Polygon)",
    ],
    industries: [
      "DeFi & Exchanges",
      "NFT & Gaming",
      "FinTech",
      "Launchpads & DAOs",
      "Trading & MEV",
      "Web3 Startups",
    ],
    faqs: [
      {
        question: "Which chains do you build on?",
        answer:
          "We deploy across Ethereum, BSC, Base, Arbitrum, Polygon and Solana, and build cross-chain bridges and aggregators when your users need to move assets between them.",
      },
      {
        question: "Are your smart contracts audited?",
        answer:
          "Security comes first. Every contract goes through rigorous testing (Hardhat, Foundry fuzzing, Slither static analysis) and is structured for third-party audit before mainnet deployment.",
      },
      {
        question: "Can you make Web3 usable for non-crypto users?",
        answer:
          "Yes. We abstract wallet and transaction complexity behind clean UX so mainstream users can onboard and transact without friction.",
      },
      {
        question: "Do you build trading bots and on-chain automation?",
        answer:
          "We build MEV bots, arbitrage and liquidation automation, mempool monitoring, and Telegram-native trading tools with gas-optimised, competitive execution.",
      },
    ],
  },
  "ai-ml-solutions": {
    title: "AI & ML Solutions",
    metaTitle: "AI & ML Development — AI Agents, LLMs & Computer Vision",
    metaDescription:
      "Custom AI agents and LLM & RAG integrations that automate real workflows and cut costs. Fixed-scope quotes. Book a free 45-minute consultation.",
    whatWeDo: "What we do",
    description: "Intelligent systems that learn, adapt, and automate.",
    details:
      "We design and build production-ready AI agents, ML-powered features, and fully integrated AI SaaS platforms — from data pipelines to deployed models — so your product gets smarter over time and your team operates at a higher level.",
    features: [
      "Custom AI agents & LLM-powered workflow automation",
      "ML model development, training & production deployment",
      "AI-integrated web apps & SaaS platforms",
      "NLP, computer vision & predictive analytics pipelines",
    ],
    industries: [
      "SaaS & Startups",
      "E-commerce",
      "FinTech",
      "Healthcare",
      "Legal & Finance",
      "Customer Support",
    ],
    faqs: [
      {
        question: "What's the difference between an AI agent and an LLM integration?",
        answer:
          "An LLM integration adds language features — search, Q&A, generation — to your product. An AI agent goes further: it reasons, calls tools and APIs, and completes multi-step tasks autonomously.",
      },
      {
        question: "Can the AI use our own data?",
        answer:
          "Yes. We build RAG (retrieval-augmented generation) and fine-tuning pipelines so the AI answers from your documents and data, not generic internet content.",
      },
      {
        question: "Which AI models do you use?",
        answer:
          "We're model-agnostic — OpenAI, Anthropic Claude, Google Gemini, Meta Llama and open-source models — and recommend what best fits your budget, latency and accuracy needs.",
      },
      {
        question: "Will it work reliably in production?",
        answer:
          "We build for production, not demos — with evaluation, guardrails, monitoring, fallback handling and cost controls in from day one.",
      },
    ],
  },
  "digital-marketing": {
    title: "Digital Marketing",
    metaTitle: "Digital Marketing Agency — SEO, Paid Ads & CRO",
    metaDescription:
      "SEO, Google & Meta ads and CRO tied to revenue, not vanity metrics. Fixed-scope quotes and monthly reporting. Book a free 45-minute consultation.",
    whatWeDo: "What we do",
    description: "Comprehensive, data-driven growth marketing.",
    details:
      "We build digital marketing systems that remove guesswork. From technical SEO and content strategy to performance ads across Google, Meta and LinkedIn, conversion rate optimisation, and full analytics and attribution — every channel we run is tied to a measurable business outcome: traffic, leads, pipeline, or revenue.",
    features: [
      "SEO & content strategy",
      "Performance & paid social campaigns",
      "Conversion rate optimization (CRO)",
      "Analytics, reporting & growth experiments",
    ],
    industries: [
      "SaaS",
      "E-commerce",
      "Professional Services",
      "Real Estate",
      "Healthcare",
      "Hospitality",
    ],
    faqs: [
      {
        question: "How long before we see results from SEO?",
        answer:
          "Meaningful organic growth typically takes 3–6 months for competitive terms and 1–3 months for lower-competition niches. Paid channels deliver results from week one, so we often run both in parallel.",
      },
      {
        question: "What ad budget do we need?",
        answer:
          "It depends on your market, the competitiveness of the terms and how many channels you want running. Rather than quote a band that would be wrong for most readers, we look at your cost per acquisition target and what your competitors are paying for the same clicks, then tell you honestly whether the budget you have in mind can achieve what you want — including when the answer is that it cannot.",
      },
      {
        question: "Do you create the content, or do we?",
        answer:
          "Either. We have in-house copywriters, designers and video editors, or we work alongside your internal team for strategy and distribution.",
      },
      {
        question: "Can you take over from our current marketing agency?",
        answer:
          "Yes. We start with a full audit of what's been done and what's working, then transition carefully so live campaigns aren't disrupted.",
      },
    ],
  },
};

// **************** SERVICE PAGE TECH STACKS ****************
export const techStacks = {
  "web-development": {
    title: "Web Development",
    stacks: [
      {
        title: "Frontend Development",
        subtitle: "Interfaces that delight",
        description: "Pixel-perfect, accessible UIs built with modern frameworks and utility-first styling.",
        techStack: "React, Next.js, Astro, TypeScript, HTML5, CSS3, JavaScript, Tailwind CSS, Material UI, Shadcn UI",
      },
      {
        title: "Backend & APIs",
        subtitle: "Robust & scalable",
        description: "Secure, performant server-side logic and APIs that power your product at any scale.",
        techStack: "Node.js, Express, REST, GraphQL",
      },
      {
        title: "Databases",
        subtitle: "Data you can trust",
        description: "Structured schemas, optimized queries, and caching layers built for speed and reliability.",
        techStack: "MongoDB, PostgreSQL, MySQL, Redis",
      },
      {
        title: "DevOps & Deployment",
        subtitle: "Ship with confidence",
        description: "Automated pipelines and cloud infrastructure so every release is fast, safe, and repeatable.",
        techStack: "Git, GitHub, CI/CD, AWS, Google Cloud, Vercel, Netlify, Render",
      },
      {
        title: "Testing",
        subtitle: "Quality at every layer",
        description: "Unit, integration, and end-to-end tests that catch bugs before your users do.",
        techStack: "Jest, React Testing Library, Cypress, Playwright",
      },
    ],
  },
  "app-development": {
    title: "App Development",
    stacks: [
      {
        title: "Cross-Platform Development",
        subtitle: "One codebase, every device",
        description: "Ship to iOS and Android simultaneously with a single maintainable React Native & Expo codebase.",
        techStack: "React Native, Expo, TypeScript, JavaScript",
      },
      {
        title: "Maps & Native Features",
        subtitle: "Rich mobile experiences",
        description: "Location-aware apps with maps, real-time push notifications, deep linking, and offline support.",
        techStack: "Google Maps API, Push Notifications, Expo Notifications, Deep Linking",
      },
      {
        title: "Backend & Cloud",
        subtitle: "Scalable infrastructure",
        description: "Robust backend services and real-time data layers that power your app at any scale.",
        techStack: "Firebase, Supabase, AWS, Google Cloud",
      },
      {
        title: "Deployment",
        subtitle: "Launch without friction",
        description: "Full App Store and Play Store submission, review handling, and over-the-air updates via Expo.",
        techStack: "App Store, Google Play Store, Expo EAS, OTA Updates",
      },
    ],
  },
  "ui-ux-design": {
    title: "UI/UX Design",
    stacks: [
      { title: "Product Design", subtitle: "Research to reality", description: "User-centric, visually appealing interfaces designed end to end.", techStack: "Figma, Adobe XD" },
      { title: "Prototyping", subtitle: "Test before you build", description: "Interactive prototypes that validate ideas with real users.", techStack: "Figma, Framer" },
    ],
  },
  "blockchain-development": {
    title: "Blockchain Development",
    stacks: [
      { title: "DeFi & dApp Development", subtitle: "Decentralized by design", description: "Staking, AMM swaps, liquidity pools, launchpads, and airdrop dashboards built for real users.", techStack: "Solidity, Ethers.js, Hardhat, Wagmi" },
      { title: "Web3 Automation & Bots", subtitle: "Speed meets precision", description: "MEV scripts, Solana/ETH bundle bots, Telegram trading platforms, and arbitrage automation.", techStack: "TypeScript, Python, Web3.js, gRPC" },
      { title: "Multi-Chain Deployments", subtitle: "One build, every chain", description: "Cross-chain protocol duplication and EVM deployments across all major L1s and L2s.", techStack: "Ethereum, BSC, Base, Arbitrum, Polygon, Solana" },
    ],
  },
  "ai-ml-solutions": {
    title: "AI & ML Solutions",
    stacks: [
      { title: "AI Agents & LLMs", subtitle: "Automate with intelligence", description: "Custom agents powered by state-of-the-art language models integrated directly into your product.", techStack: "OpenAI, Claude, LangChain, LlamaIndex" },
      { title: "ML Development", subtitle: "Models that improve over time", description: "End-to-end ML pipelines from data preprocessing and training to production deployment.", techStack: "Python, PyTorch, TensorFlow, scikit-learn" },
      { title: "AI-Powered SaaS", subtitle: "Build smarter products", description: "Web apps and SaaS platforms with AI-driven features on scalable cloud infrastructure.", techStack: "FastAPI, Node.js, AWS, Vercel" },
    ],
  },
  "digital-marketing": {
    title: "Digital Marketing",
    stacks: [
      { title: "SEO & Content", subtitle: "Get found", description: "Rank higher and attract qualified organic traffic that converts.", techStack: "Ahrefs, GA4, Search Console" },
      { title: "Paid & Social", subtitle: "Scale what works", description: "Performance campaigns across search and social, optimized for ROI.", techStack: "Meta Ads, Google Ads" },
    ],
  },
};

// **************** PROCESS ****************
export const processSteps = [
  { icon: FaClipboardList, title: "Discovery", content: "We dig into your goals, users, and market to define a clear, focused scope." },
  { icon: FaPencilRuler, title: "Design", content: "Wireframes and high-fidelity UI bring your product to life before a line of code." },
  { icon: FaBullseye, title: "Planning", content: "We map architecture, milestones, and sprints so everyone knows the path ahead." },
  { icon: FaHammer, title: "Build", content: "Agile development in two-week sprints with regular demos and full transparency." },
  { icon: FaCheckCircle, title: "Testing", content: "Rigorous QA and automated tests ensure a stable, secure, polished release." },
  { icon: FaRocket, title: "Launch", content: "We deploy with confidence and monitor closely for a smooth go-live." },
  { icon: FaTools, title: "Support", content: "Post-launch maintenance and iteration keep your product ahead over time." },
];
