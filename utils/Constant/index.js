import { recentProjects } from './recentProjects';
import { SOCIAL_PROFILES } from './navigation';
export { CONTACT, NavbarservicesOptions } from "./navigation";
import logoStartusCloud from '../../assests/PartnerLogos/logo-startus-cloud-ondark.webp';
import logoRamanScientific from '../../assests/PartnerLogos/logo-raman-scientific-ondark.webp';
import logoJainCeramicMart from '../../assests/PartnerLogos/logo-jain-ceramic-mart-ondark.webp';
import {
  AppDevHover, BlockchainHover,
  DigitalMarketingHover, AiMlHover,
  UIUXHover, clientIconHover, expertiseiconHover,
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
// A testimonial needs the client's approval for publication; add it to utils/clientsReviewsData.js and update the counts on /about, /ae and content/llms.txt.ts in the same commit.

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
      "Web3 frontends, DeFi platforms, MEV bots, launchpads, and multi-chain dApps. Built for real production.",
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

// **************** PORTFOLIO PROJECTS ****************
// Real client work. `featured: true` marks the projects highlighted on the home page.
// Each image carries descriptive alt text for SEO + accessibility.
export const Projects = [
  {
    featured: true,
    img: [
      { src: infinityBayHome, alt: "Infinity Bay Trading homepage hero reading 'One hub for every space. Infinite supply.' (a one-stop FMCG, HORECA and industrial supply partner, rebuilt on Astro for fast loading)" },
      { src: infinityBayTruck, alt: "Infinity Bay Trading branded delivery truck in the scroll-driven hero, with category, brand and one-stop supply figures" },
      { src: infinityBayReveal, alt: "Infinity Bay Trading product reveal: FMCG beverages and confectionery, HORECA tableware and industrial bearings emerging from the delivery truck" },
      { src: infinityBay3, alt: "Infinity Bay Trading product categories: coffee, beverages, confectionery, baby nutrition, spices, personal care and electronics for businesses" },
    ],
    projectType: "Wholesale Trading · Web Rebuild & SEO",
    Heading: "Infinity Bay Trading: B2B Supply Website, Rebuilt for Speed & SEO",
    aboutProject:
      "A trusted supply partner covering FMCG, HORECA and industrial goods. We rebuilt their slow WordPress site as a fast, SEO-first website on Astro. It has AEO/GEO-optimized content, a brand blog and full Google Search Console indexing so buyers can find them.",
    problem:
      "Their previous WordPress site loaded slowly, ranked poorly on Google, and had weak on-page SEO. That cost Infinity Bay visibility and qualified B2B enquiries in a competitive market.",
    solution:
      "We rebuilt the site from the ground up on Astro for near-instant loads and smooth performance, restructured it around SEO/AEO/GEO-optimized, product-led content, launched an on-brand blog, and set up Google Search Console to get every page indexed and discoverable.",
    tags: ["Web Development", "SEO", "Astro", "WordPress Migration", "AEO", "GEO", "B2B Trading"],
    clentName: "Infinity Bay Trading",
  },
  ...recentProjects,
  {
    featured: true,
    img: [
      { src: dhanlaxmi1, alt: "Dhanlaxmi Property homepage: a land development and property advisory firm, with a lake-city hero and enquiry-led calls to action" },
      { src: dhanlaxmi2, alt: "Dhanlaxmi Property track-record section showing land transactions closed, families housed, customer rating and years of experience" },
      { src: dhanlaxmi3, alt: "Dhanlaxmi Property plotted-colony listings with aerial site photography, plot counts, plotted area and plot sizes for each project" },
    ],
    projectType: "Real Estate · Lead-Generation Site & SEO",
    Heading: "Dhanlaxmi Property: Land Advisory Site Built for Qualified Enquiries",
    aboutProject:
      "A land development, project planning and property advisory firm operating since 1998. We built a lead-generation site on Next.js, not a listings marketplace. The six plotted colonies each carry their own layout plan, plot sizes and aerial site footage, and every enquiry route is one tap away.",
    problem:
      "Buyers judging land (families, investors and NRIs buying from abroad) had no way to check a plotted colony without visiting it. Plot counts, approved sizes and what a site actually looks like today lived on paper layout plans and in the client's own drone footage, so every basic question became a phone call before anyone could be qualified.",
    solution:
      "We built the site around the six colonies rather than around a search box. Each project page carries the layout plan, the plot count, the plotted area, the plot sizes and aerial footage of the site as it stands, with phone, WhatsApp and form enquiry on every page. Figures are read off the client's own plans, and anything a plan does not state renders as 'On request' rather than being estimated.",
    tags: ["Web Development", "Next.js", "SEO", "Local SEO", "Lead Generation", "Real Estate"],
    clentName: "Dhanlaxmi Property",
  },
  {
    featured: true,
    img: [
      { src: palmvision1, alt: "Palm Vision Technology homepage: CCTV, security systems and office technology supplied, installed and serviced" },
      { src: palmvision2, alt: "Palm Vision Technology service cards for CCTV and surveillance, biometric attendance, computers and laptops, printers and scanners, video door phone and projectors" },
      { src: palmvision3, alt: "Palm Vision Technology site section showing supply, installation and service coverage for homes, shops, offices and factories" },
    ],
    projectType: "Security & IT Retail · Static Site & Local SEO",
    Heading: "Palm Vision Technology: Ten Service Lines, One Findable Shop",
    aboutProject:
      "A CCTV, security systems and office technology business, trading since 2006. We built a statically exported Next.js site covering all ten service lines and the brands they stock, published to a custom domain with nothing but React shipping to the browser.",
    problem:
      "The business sells ten distinct service lines: CCTV, biometric attendance, computers, printers, video door phones, projectors, intruder alarms, EPABX and more. Each has its own buyers and its own search demand. With no page per service there was nothing for any of those searches to land on, and a customer looking for one line had no way to discover the other nine.",
    solution:
      "We gave every service line its own page, generated from typed content rather than hand-built, alongside a stocked-brands index and a set of buyer guides answering the questions that precede a quote. The whole site is statically exported and served from a custom domain, so pages load as flat files and the only runtime dependencies are React itself.",
    tags: ["Web Development", "Next.js", "Static Export", "Local SEO", "Security Systems"],
    clentName: "Palm Vision Technology",
  },
  {
    featured: true,
    img: [
      { src: propertyDashboard1, alt: "HOMIES property management dashboard showing income, expenses, and unit analytics for a real-estate portfolio" },
      { src: propertyDashboard2, alt: "HOMIES dashboard detail view with property performance charts and recent transactions" },
    ],
    projectType: "PropTech · SaaS Dashboard",
    Heading: "HOMIES: Property Management & Analytics Dashboard",
    aboutProject:
      "A unified SaaS dashboard giving real-estate teams a single view of income, expenses, occupancy, and unit performance. It's engineered in React, Vite and Chakra UI, with interactive charts built for speed on any device.",
    problem:
      "Property managers were juggling multiple spreadsheets and outdated tools to track income, expenses, and occupancy across their portfolio. This caused costly errors and slow decision-making.",
    solution:
      "We built a unified SaaS dashboard with real-time analytics and interactive charts that gives property teams instant, accurate visibility across thousands of listings from any device.",
    tags: ["PropTech", "SaaS", "Analytics Dashboard", "React", "Real Estate"],
    clentName: "HOMIES PropTech",
  },
  {
    img: [
      { src: marty1, alt: "Marty-QR AI review platform landing page with a 'Review Simplified' hero" },
      { src: marty2, alt: "Marty-QR features overview for collecting customer reviews via QR codes" },
      { src: marty3, alt: "Marty-QR client portal for managing online reputation and feedback" },
    ],
    projectType: "SaaS · AI Review Platform",
    Heading: "Marty-QR: AI-Powered Review Management",
    aboutProject:
      "An AI-powered review and feedback platform that helps local businesses collect, manage, and grow their online reputation through QR touchpoints and direct Google integration.",
    problem:
      "Local businesses were losing customers to competitors with stronger online reviews, but had no simple, consistent system to capture feedback from satisfied customers at the right moment.",
    solution:
      "We delivered an AI-powered platform with QR touchpoints that capture in-moment reviews, automate responses, and sync directly with Google. Every visit becomes a potential five-star rating.",
    tags: ["SaaS", "AI", "Review Management", "QR Code", "Online Reputation"],
    clentName: "Marty-QR",
  },
  {
    img: [
      { src: jewel1, alt: "David Tishbi luxury jewelry storefront hero featuring fine gems and rings" },
      { src: jewel2, alt: "David Tishbi jewelry collection page with product listings" },
      { src: jewel3, alt: "David Tishbi watches and bullion category for premium shoppers" },
    ],
    projectType: "Luxury E-commerce",
    Heading: "David Tishbi: Luxury Jewelry E-commerce",
    aboutProject:
      "A bespoke luxury e-commerce storefront for a boutique jewelry brand, with editorial storytelling, appointment booking and a conversion-optimized checkout for high-intent premium shoppers.",
    problem:
      "The brand's existing site failed to convey the premium quality of their pieces. Slow load times, a poor mobile experience and a generic layout were driving high bounce rates and lost sales.",
    solution:
      "We crafted a bespoke luxury storefront with editorial design, refined typography, appointment booking, and a streamlined checkout, turning first-time visitors into loyal collectors.",
    tags: ["E-commerce", "Luxury Retail", "Jewelry", "Conversion Optimization", "Web Design"],
    clentName: "David Tishbi Jewelry",
  },
  {
    img: [
      { src: realState1, alt: "Estate real-estate platform homepage with a property search hero for buyers" },
      { src: realState2, alt: "Estate property listings page showing homes for sale and rent" },
      { src: realState3, alt: "Estate agent profiles and featured property details" },
    ],
    projectType: "Real Estate · Web Platform",
    Heading: "Estate: Property Search & Listings Platform",
    aboutProject:
      "A conversion-focused real-estate platform with rich property search, agent profiles, and featured listings. It's fast, SEO-friendly and built to move visitors from browsing to booking.",
    problem:
      "Growing agencies were stuck on generic listing platforms with poor SEO, no brand differentiation, and a clunky search experience that caused high lead drop-off before enquiry.",
    solution:
      "We built a fast, SEO-optimized property platform with rich filtering, agent profiles, and compelling calls-to-action that guide visitors naturally from discovery to booking a viewing.",
    tags: ["Real Estate", "Web Platform", "Property Search", "SEO", "Lead Generation"],
    clentName: "Estate Realty",
  },
  {
    img: [
      { src: crypto1, alt: "Crypto trading terminal with a live candlestick chart, order book, and buy/sell order form" },
      { src: crypto2, alt: "Crypto exchange market view with depth chart and perpetuals trading tools" },
    ],
    projectType: "FinTech · Web3",
    Heading: "Crypto Exchange: Perpetuals Trading Terminal",
    aboutProject:
      "A professional trading terminal for spot and perpetuals with real-time charts, live order books, and audited smart-contract integrations. It's optimized for split-second decisions without sacrificing clarity.",
    problem:
      "Experienced traders were forced to use bloated, confusing interfaces that sacrificed usability for data density. This led to costly mistakes and high platform abandonment.",
    solution:
      "We engineered a precision trading terminal with real-time candlestick charts, live order books, and a clean buy/sell interface, optimized for speed, clarity and non-custodial security.",
    tags: ["FinTech", "Web3", "Crypto Exchange", "Trading Terminal", "Smart Contracts"],
    clentName: "GDT Exchange",
  },
  {
    img: [
      { src: hotel1, alt: "Platinum Peak hotel booking website showcasing luxury rooms" },
      { src: hotel2, alt: "Platinum Peak suite gallery highlighting amenities and interiors" },
      { src: hotel3, alt: "Platinum Peak direct reservation booking section" },
    ],
    projectType: "Hospitality · Booking",
    Heading: "Platinum Peak: Luxury Hotel Booking Experience",
    aboutProject:
      "An immersive hotel booking website with stunning room galleries and a simple direct-booking flow. It's designed to convert guests and reduce dependency on costly OTA platforms.",
    problem:
      "The hotel was losing a majority of bookings to OTA platforms (Booking.com, Expedia), paying steep commissions and losing direct relationships with guests.",
    solution:
      "We designed an immersive direct-booking site with editorial room galleries, smooth reservation flow and persuasive CTAs, making it easy for guests to book without third parties.",
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
      "A senior team that stays ahead of the curve, applying the right modern tech to every problem, not just the trendy one.",
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
      "We build for tomorrow: systems that handle growth in users, data, and features without a costly rebuild.",
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
      "We're a full-cycle product studio: AI agents & ML solutions, web and mobile app development, UI/UX design, blockchain & Web3 development, and data-driven digital marketing. That's everything you need to take an idea from concept to launch.",
  },
  {
    question: "How much does a project cost?",
    answer:
      "Every project is scoped individually based on complexity, features, and timeline. After a free consultation we send a transparent, fixed-scope estimate. Most engagements start from a small discovery phase so you can validate before committing.",
  },
  {
    question: "How long does it take to build a product?",
    answer:
      "A focused MVP typically takes 6 to 12 weeks, while larger platforms run 3 to 6 months. We work in two-week agile sprints with regular demos so you see real progress the whole way through.",
  },
  {
    question: "Do you offer custom solutions?",
    answer:
      "Always. We don't use one-size-fits-all templates. Every solution is tailored to your goals, brand, and users, with architecture chosen specifically for your needs.",
  },
  {
    question: "What happens after the project launches?",
    answer:
      "We offer flexible post-launch support and maintenance plans covering monitoring, updates, security, and new features, so your product stays fast, secure, and ahead of the competition.",
  },
  {
    question: "How do we get started?",
    answer:
      "Book a free call, or send your details through our contact page and we'll reply within one business day. On the call we'll understand your vision and recommend the best path forward.",
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

// **************** SERVICE -> CASE STUDY ROUTING ****************
// The reverse of serviceResources.js. Each service page already links OUT to four blog
// posts; nothing linked back, so a crawler reaching a post from search had one route
// onward (the service page, via BlogCTA) and no route to evidence that the service has
// actually been delivered.
//
// Six of the seven case studies map 1:1 onto the six services (shopify-cro-d2c-brand has no service page of its own) by their own `service` field, so
// this table is a transcription of that field, not a judgement call. Keyed by service
// slug because that is what serviceForBlogCategory already returns, which means a post
// resolves to its case study through the same routing its service link uses and the two
// can never disagree.
const CASE_STUDY_FOR_SERVICE = {
  "ai-ml-solutions": "ai-support-agent",
  "web-development": "saas-platform-scale",
  "app-development": "real-estate-app",
  "ui-ux-design": "fintech-ux-redesign",
  "blockchain-development": "defi-protocol-launch",
  "digital-marketing": "saas-seo-growth",
};

/** Case-study slug demonstrating a given service. Undefined if the service has none. */
const caseStudyForService = (serviceSlug = "") =>
  CASE_STUDY_FOR_SERVICE[serviceSlug];

/** Case-study slug for a blog category, routed through the same service mapping. */
export const caseStudyForBlogCategory = (category = "") =>
  caseStudyForService(serviceForBlogCategory(category));

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
  { img: logoStartusCloud, name: "Startus Cloud" },
  { img: logoRamanScientific, name: "Raman Scientific" },
  { img: logoJainCeramicMart, name: "Jain Ceramic Mart" },
  { img: logoHomies,       name: "HOMIES PropTech" },
  { img: logoDhanlaxmi,    name: "Dhanlaxmi Property" },
  { img: logoMarty,        name: "Marty-QR" },
  { img: logoPalmvision,   name: "Palm Vision Technology" },
  { img: logoDavidTishbi,  name: "David Tishbi Jewelry" },
  { img: logoEstate,       name: "Estate Realty" },
  { img: logoGdt,          name: "GDT Exchange" },
  { img: logoPlatinumPeak, name: "Platinum Peak Hotels" },
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
    description: "Clear pricing, honest timelines, and open communication at every stage. No jargon, no surprises.",
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
      "Responsive designs that work well on every screen and device.",
      "Dynamic, high-performance websites with interactive, modern features.",
      "SEO best practices baked in to maximize visibility and search rankings.",
    ],
    icon: webDevHover,
  },
  {
    name: "App Development",
    description: [
      "High-quality mobile apps with solid features and smooth performance.",
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
    // Keyword-led H1 (SEO, Nov 2026); `title` stays short because it is reused in sentences.
    h1: "React Native App Development Company",
    metaTitle: "React Native App Development Company: iOS, Android & Expo",
    metaDescription:
      "React Native & Expo development company for iOS and Android apps from one codebase. Fixed-scope quotes from senior engineers. Book a free 45-minute call.",
    whatWeDo: "What we do",
    description: "Cross-platform iOS & Android apps built with React Native & Expo.",
    details:
      "From idea to App Store, we design and engineer cross-platform mobile apps with React Native and Expo that are fast, secure, and a joy to use. We handle architecture, UI, maps, push notifications, backend integration, and full store deployment. You get a polished product on both platforms without the headaches.",
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
          "A focused MVP usually takes 8 to 14 weeks; a full product with custom backend and payments runs 16 to 24 weeks. We scope it precisely after a free discovery call so there are no surprises.",
      },
      {
        question: "Why cross-platform instead of separate native apps?",
        answer:
          "React Native and Expo give you true native performance from a single codebase. Both platforms ship together, typically at 40 to 60% less cost than building two separate native apps.",
      },
      {
        question: "Do you handle App Store and Play Store submission?",
        answer:
          "Yes. We manage the full submission process: developer accounts, metadata, screenshots, privacy requirements, and responding to reviewer feedback.",
      },
      {
        question: "Can you add features to an existing app?",
        answer:
          "Absolutely. We audit the existing codebase first, then scope feature additions cleanly so we extend your app without piling on technical debt.",
      },
      {
        question: "Which devices will the app support?",
        answer:
          "We target iOS 14+ and Android 8+ as a baseline (over 95% of active devices) and test on real hardware across multiple OS versions, not just simulators.",
      },
    ],
  },
  "web-development": {
    title: "Web Development",
    // Keyword-led H1 (SEO, Nov 2026); `title` stays short because it is reused in sentences.
    h1: "Web Development Company",
    metaTitle: "Web Development Company: React, Next.js & Node.js",
    metaDescription:
      "Custom websites, SaaS platforms and web apps in React, Next.js and Node.js. Fixed-scope quotes, not hourly billing. Book a free 45-minute consultation.",
    whatWeDo: "What we do",
    description: "Responsive, robust web applications that perform.",
    details:
      "We build high-performing websites and web apps with modern frameworks, clean architecture, and fast, reliable performance. From pixel-perfect frontends to scalable Node.js backends, structured databases, CI/CD pipelines, and full test coverage. It's SEO-ready, accessible and built to last.",
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
          "Performance and SEO are built into the architecture: server-side rendering, semantic HTML, structured data, and Core Web Vitals tuned for sub-2-second loads.",
      },
      {
        question: "Do you provide hosting and maintenance after launch?",
        answer:
          "We deploy to your preferred infrastructure (Vercel, AWS, GCP) and offer ongoing maintenance for updates, security patches, and new features.",
      },
      {
        question: "How long does a web project take?",
        answer:
          "A marketing site typically takes 3 to 6 weeks; a full web app or SaaS platform runs 8 to 16 weeks. You get a clear timeline after a free discovery call.",
      },
    ],
  },
  "ui-ux-design": {
    title: "UI/UX Design",
    // Keyword-led H1 (SEO, Nov 2026); `title` stays short because it is reused in sentences.
    h1: "UI/UX Design Company",
    metaTitle: "UI/UX Design Company: UX Research, UI & Design Systems",
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
          "Almost every team discovers something surprising in the first week of research. What users say and what they actually do rarely match. Research removes expensive assumptions before you build.",
      },
      {
        question: "How long does a UI/UX project take?",
        answer:
          "A focused landing page or feature redesign takes 2 to 3 weeks; a full product design with a design system runs 6 to 12 weeks depending on scope and feedback cycles.",
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
    // Keyword-led H1 (SEO, Nov 2026); `title` stays short because it is reused in sentences.
    h1: "Blockchain & Web3 Development",
    metaTitle: "Blockchain Development: Smart Contracts, DeFi & Web3",
    metaDescription:
      "Audited smart contracts, DeFi platforms and multi-chain dApps on Ethereum, Solana and Base. Fixed-scope quotes. Book a free 45-minute consultation.",
    whatWeDo: "What we do",
    description: "Real Web3 products: DeFi, bots, launchpads & multi-chain.",
    details:
      "We build production-grade Web3 products backed by real delivered projects: DeFi frontends with staking, swaps, and liquidity pools; MEV and transaction-bundling bots; Telegram-native trading platforms; launchpads and airdrop dashboards; and multi-chain EVM deployments across Ethereum, BSC, Base, Arbitrum, and Solana.",
    features: [
      "DeFi frontends: staking, AMM swaps, liquidity, launchpads",
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
    // Keyword-led H1 (SEO, Nov 2026); `title` stays short because it is reused in sentences.
    // 25 Nov 2026: H1 aligned to "custom AI development services" (94 of the cluster's 115
    // queries contain "custom" or "services"). This page now carries the build-vs-buy,
    // delivery and cost guidance that used to rank through a blog post, so it is the one
    // page for that intent. metaTitle deliberately unchanged.
    h1: "Custom AI Development Services",
    metaTitle: "AI & ML Development: AI Agents, LLMs & Computer Vision",
    metaDescription:
      "Custom AI agents and LLM & RAG integrations that automate real workflows and cut costs. Fixed-scope quotes. Book a free 45-minute consultation.",
    whatWeDo: "What we do",
    description: "AI agents, RAG assistants and LLM features built around a real task and tested on your own data before launch.",
    details:
      "A common way for AI projects to go wrong is to start from a tool (“we need an agent”) instead of a task (“support staff spend two hours a day finding policy answers”). We start from the task. Custom AI work usually falls into four kinds: agents that carry out multi-step tasks across your systems, RAG assistants that answer from your own documents, language-model features inside a product you already run, and document or image automation. Which one fits depends on the task, your data and what a wrong answer costs you, and if an off-the-shelf tool already does the job, we'll say so.",
    features: [
      "AI agents that carry out multi-step tasks across your CRM, calendar & database",
      "RAG assistants that answer from your documents & hand off to a person when unsure",
      "LLM features inside your product: summaries, drafted replies & field extraction",
      "Document & image automation with NLP and computer vision",
      "AI SaaS products with accounts, credits & subscriptions",
      "ML model development, training & production deployment",
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
        question: "What does a custom AI development service cover?",
        answer:
          "Custom AI work usually falls into four kinds. AI agents carry out multi-step tasks and call tools such as your CRM, calendar or database: qualifying inbound leads, triaging support tickets, compiling reports from several systems. RAG assistants answer from your own documents, so replies come from your policies, product data or contracts rather than the model's general training. LLM features sit inside a product you already run, such as summarising a long record, drafting a reply or extracting fields from an upload. Document and image automation reads forms, invoices and photos and passes structured data to your systems; it lives or dies on test data, so measure accuracy on a few hundred real examples, including the messy ones, before you commit.",
      },
      {
        question: "Should we build custom AI, buy a tool or configure a platform?",
        answer:
          "Buy an off-the-shelf tool when the task is generic, such as meeting notes or basic chat, and accept that it will fit your process and data only loosely. Configure a platform or no-code tool when you want to test an idea quickly; it hits limits on integrations, control and cost at volume. Build custom when the workflow, data or integrations are specific to you, or when AI is part of your product; it costs more up front and needs an owner after launch. A sensible path is to prove the value cheaply, then build custom only where the off-the-shelf version stops short. We'll tell you when buying is the right answer.",
      },
      {
        question: "What's the difference between an AI agent and an LLM integration?",
        answer:
          "An LLM integration adds language features (search, Q&A, generation) to your product. An AI agent goes further: it reasons, calls tools and APIs, and completes multi-step tasks autonomously.",
      },
      {
        question: "When is an AI agent the wrong choice?",
        answer:
          "When the steps are fixed and predictable. A plain workflow with one or two model calls is then cheaper, faster and easier to test. Agents suit tasks with several steps and some judgement, where the path really varies from one case to the next. They are the easiest kind of AI work to over-build, so we check for this before recommending one.",
      },
      {
        question: "Can the AI use our own data?",
        answer:
          "Yes. We build RAG (retrieval-augmented generation) and fine-tuning pipelines so the AI answers from your documents and data, not generic internet content. Done properly, a RAG assistant can say “I don't know”, and access control is applied when documents are retrieved, not only in the prompt. The support agent in our case study answers when its confidence is high and hands the conversation to a person when it drops.",
      },
      {
        question: "How does a custom AI project run?",
        answer:
          "In six steps. Discovery defines the task, who uses it, what good looks like and what a mistake costs. A data check looks at what data exists, where it lives, who can see it and any privacy limits. A prototype is the thinnest working version, built against real examples and measured. Evaluation scores outputs on a test set before and after every change, which is what separates a demo from a product. Build and integrate connects it to your systems, with logging, permissions and human review where needed. Launch and monitor tracks quality, cost and failure cases, then adjusts prompts, retrieval and models over time.",
      },
      {
        question: "What drives the cost of custom AI development?",
        answer:
          "Five things matter more than the model itself: how many systems the AI must read from or write to; how messy or scattered your data is; how accurate the output must be, since needing 99% costs far more than a useful first draft; the approval screens and handoff flows that human review needs; and running costs after launch, meaning maintenance plus model, API and hosting usage. We give a fixed-scope quote after a free discovery call.",
      },
      {
        question: "How long does a custom AI project take?",
        answer:
          "A focused MVP usually takes 6 to 12 weeks, and a larger platform 3 to 6 months. For reference, the RAG support agent in our case study took 14 weeks from kickoff to production: data preparation and knowledge architecture first, then the retrieval pipeline and guardrails, then a supervised rollout alongside human agents.",
      },
      {
        question: "Which AI models do you use?",
        answer:
          "We're model-agnostic: OpenAI, Anthropic Claude, Google Gemini, Grok, Meta Llama and open-source models, with LangChain and vector databases where they help. Model choice is a cost, speed and quality question that changes quickly, so we test candidates against your data rather than picking by reputation.",
      },
      {
        question: "Do we need to fine-tune a model?",
        answer:
          "Usually not at the start. Prompting, good retrieval and careful evaluation solve most business problems, and they are cheaper to change. Fine-tuning becomes worth considering when you have a large set of high-quality examples and a narrow, repeated task. We can help you judge whether you have reached that point.",
      },
      {
        question: "Is our data safe if it goes to a model provider?",
        answer:
          "It depends on the provider's terms and your setup, so read them rather than assume. The options run from enterprise API terms for most work, to private-cloud deployments for more control, to self-hosting for the most sensitive data, which brings its own hardware and staffing cost. Decide what data must never leave your environment, then check the terms with your legal adviser.",
      },
      {
        question: "Will it work reliably in production?",
        answer:
          "We build for production, not demos. Evaluation, guardrails, monitoring, fallback handling and cost controls are in from day one.",
      },
      {
        question: "Where should we start?",
        answer:
          "With a task that happens often, takes real time and has a clear right answer, where a wrong output is cheap to catch and the data is accessible and allowed to go to a model provider. Check that you can measure the result in hours saved, tickets deflected or conversion, and that someone will own the system after launch. Avoid a first project that touches regulated decisions or needs perfect accuracy.",
      },
      {
        question: "What AI work have you delivered?",
        answer:
          "A RAG support agent for a US B2B SaaS company that answers from the client's documentation and hands off to a person when confidence drops, written up as a case study. Gemini-assisted features in a hospital management system. A real-time sales copilot Chrome extension with live transcription and suggested answers. An AI hiring platform that runs first-round interviews and analyses resumes. An AI music generation SaaS with credits and subscriptions. The clients are under NDA, so we show the work on a live call.",
      },
    ],
  },
  "digital-marketing": {
    title: "Digital Marketing",
    // Keyword-led H1 (SEO, Nov 2026); `title` stays short because it is reused in sentences.
    h1: "Digital Marketing Agency",
    metaTitle: "Digital Marketing Agency: SEO, Paid Ads & CRO",
    metaDescription:
      "SEO, Google & Meta ads and CRO tied to revenue, not vanity metrics. Fixed-scope quotes and monthly reporting. Book a free 45-minute consultation.",
    whatWeDo: "What we do",
    description: "Comprehensive, data-driven growth marketing.",
    details:
      "We build digital marketing systems that remove guesswork. From technical SEO and content strategy to performance ads across Google, Meta and LinkedIn, conversion rate optimisation, and full analytics and attribution. Every channel we run is tied to a measurable business outcome: traffic, leads, pipeline, or revenue.",
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
          "Meaningful organic growth typically takes 3 to 6 months for competitive terms and 1 to 3 months for lower-competition niches. Paid channels deliver results from week one, so we often run both in parallel.",
      },
      {
        question: "What ad budget do we need?",
        answer:
          "It depends on your market, the competitiveness of the terms and how many channels you want running. Rather than quote a band that would be wrong for most readers, we look at your cost per acquisition target and what your competitors are paying for the same clicks, then tell you honestly whether the budget you have in mind can achieve what you want, including when the answer is that it cannot.",
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
      { title: "AI Agents & LLMs", subtitle: "Automate with intelligence", description: "Custom agents built on leading language models and integrated directly into your product.", techStack: "OpenAI, Claude, LangChain, LlamaIndex" },
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
