import {
  AppDevHover, AppDevNavbarIcon, BlockchainDevNavbarIcon, BlockchainHover,
  DigiMarketingNavbarIcon, DigitalMarketingHover, AiMlHover, AiMlNavbarIcon,
  UIUXHover, UIUXNavbarIcon, WebDevNavbarIcon, clientIconHover, expertiseiconHover,
  postIconHover, qualityIconHover, timeIconHover, webDevHover,
  propertyDashboard1, propertyDashboard2, realState1, realState2, realState3,
  marty1, marty2, marty3, crypto1, crypto2, jewel1, jewel2, jewel3, hotel1, hotel2, hotel3,
  infinityBay1, infinityBay2, infinityBay3, infinityBay4,
  logoHomies, logoMarty, logoDavidTishbi, logoEstate, logoGdt, logoPlatinumPeak,
} from "../../assests";
import {
  FaClipboardList, FaPencilRuler, FaBullseye, FaHammer, FaCheckCircle, FaRocket, FaTools,
} from "react-icons/fa";

// NOTE: testimonials, client names, project case studies and partner logos below are
// realistic SAMPLE content meant to be replaced with your real data. Copy/services are final.

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

// **************** COMPANY STATS ****************
export const companyStats = [
  { value: 30, suffix: "+", label: "Projects delivered" },
  { value: 14, suffix: "+", label: "Happy clients worldwide" },
  { value: 10, suffix: "+", label: "Team Members" },
  { value: 97, suffix: "%", label: "Client retention rate" },
];

// **************** TESTIMONIALS (sample) ****************
export const testimonials = [
  {
    name: "Abbas Kagzi",
    title: "Founder, Infinity Bay Trading",
    avatar: "",
    review:
      "We came to Futurise with a slow WordPress site that barely showed up on Google. They rebuilt it on Astro — it loads instantly now, feels far smoother, and with the new SEO content and blog we're finally getting found by buyers across the UAE. Professional team, clear communication, handled everything from design to Google Search Console.",
  },
  {
    name: "John Carter",
    title: "CEO, Northwind Media",
    avatar: "https://i.pravatar.cc/150?img=12",
    review:
      "Futurise rebuilt our streaming platform from the ground up. They were professional, fast, and shipped two weeks ahead of schedule. Engagement is up 40%.",
  },
  {
    name: "Sofia Almeida",
    title: "CTO, Ledgerly",
    avatar: "https://i.pravatar.cc/150?img=47",
    review:
      "Their blockchain team delivered audited smart contracts with zero post-launch issues. Genuinely the most reliable partner we've worked with.",
  },
  {
    name: "Daniel Mwangi",
    title: "Product Lead, FitFuel",
    avatar: "https://i.pravatar.cc/150?img=33",
    review:
      "The redesign of our app transformed how users see the brand. Clean process, clear communication, and a beautiful end result.",
  },
];

// **************** PORTFOLIO PROJECTS ****************
// Real client work. `featured: true` marks the projects highlighted on the home page.
// Each image carries descriptive alt text (with market keywords) for SEO + accessibility.
export const Projects = [
  {
    featured: true,
    img: [
      { src: infinityBay1, alt: "Infinity Bay Trading homepage hero — a Dubai, UAE one-stop FMCG, HORECA and industrial supply partner, rebuilt on Astro for fast loading" },
      { src: infinityBay2, alt: "Infinity Bay Trading delivery truck carrying FMCG, kitchenware and industrial products — B2B wholesale distribution across Dubai and the UAE" },
      { src: infinityBay3, alt: "Infinity Bay Trading product categories — coffee, beverages, confectionery, baby nutrition, spices, personal care and electronics for UAE businesses" },
      { src: infinityBay4, alt: "Infinity Bay Trading footer with product categories, Dubai head-office contact details and 'Designed & Developed by Futurise Solutions'" },
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
    featured: true,
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
    featured: true,
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
    featured: true,
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

// **************** CLIENT REVIEWS (sample) ****************
export const reviews = [
  {
    avatar: "https://i.pravatar.cc/150?img=15",
    name: "Marcus Veltri",
    description:
      "The Futurise team exceeded our expectations with exceptional service and innovative solutions. Highly efficient and delivered outstanding results ahead of schedule.",
    rating: 5,
  },
  {
    avatar: "https://i.pravatar.cc/150?img=45",
    name: "Jane Smith",
    description:
      "Working with Futurise was a fantastic experience. They were always available, provided valuable insights, and we couldn't be happier with the end result.",
    rating: 5,
  },
  {
    avatar: "https://i.pravatar.cc/150?img=52",
    name: "Dev Mishra",
    description:
      "Truly remarkable. Their dedication, expertise, and attention to detail ensured our project was a great success. We highly recommend their services.",
    rating: 5,
  },
];

// **************** PARTNERS / TRUSTED BY ****************
export const partners = [
  { img: logoHomies,       name: "HOMIES PropTech" },
  { img: logoMarty,        name: "Marty-QR" },
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
      "Cross-platform iOS & Android apps built with React Native & Expo — fast, polished and scalable from one codebase. Serving NZ, India, the USA & worldwide.",
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
      "Custom websites, SaaS platforms and web apps built with React, Next.js and Node.js — fast, SEO-ready and scalable. Serving NZ, India, the USA & worldwide.",
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
      "User-centric UI/UX design — UX research, wireframing, high-fidelity Figma UI, prototypes and design systems that cut churn and lift conversions worldwide.",
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
      "Production-grade blockchain development — audited smart contracts, DeFi platforms, MEV bots and multi-chain dApps across Ethereum, Solana, Base & more.",
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
      "Production-ready AI — custom AI agents, LLM & RAG integrations, NLP and computer vision that automate workflows, cut costs and make your product smarter.",
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
      "Data-driven digital marketing — SEO, Google & Meta ads, paid social, CRO and analytics tied to real revenue, not vanity metrics. NZ, India, the USA & beyond.",
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
          "We work with budgets from around $2,000/month for a single channel; $5,000–$10,000/month in spend is where multi-channel compounding starts. We're always clear about what a budget can realistically achieve.",
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
