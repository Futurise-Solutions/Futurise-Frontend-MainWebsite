import {
  AppDevHover, AppDevNavbarIcon, BlockchainDevNavbarIcon, BlockchainHover, ClientLogo,
  DigiMarketingNavbarIcon, DigitalMarketingHover, SmartContractHover, SmartContractNavbarIcon,
  UIUXHover, UIUXNavbarIcon, WebDevNavbarIcon, clientIconHover, expertiseiconHover,
  postIconHover, qualityIconHover, timeIconHover, webDevHover,
  propertyDashboard1, propertyDashboard2, realState1, realState2, realState3,
  marty1, marty2, marty3, crypto1, crypto2, jewel1, jewel2, jewel3, hotel1, hotel2, hotel3,
} from "../../assests";
import {
  FaClipboardList, FaPencilRuler, FaBullseye, FaHammer, FaCheckCircle, FaRocket, FaTools,
} from "react-icons/fa";

// NOTE: testimonials, client names, project case studies and partner logos below are
// realistic SAMPLE content meant to be replaced with your real data. Copy/services are final.

// **************** OUR SERVICES ****************
export const OurServiceData = [
  {
    serviceName: "App Development",
    serviceDesc:
      "Native and cross-platform iOS & Android apps that feel fast, look beautiful, and scale with your business.",
    icon: AppDevHover,
    route: "app-development",
  },
  {
    serviceName: "Web Development",
    serviceDesc:
      "Lightning-fast, SEO-ready websites and web apps built with modern frameworks and clean, maintainable code.",
    icon: webDevHover,
    route: "web-development",
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
      "Secure, transparent decentralized apps, tokens, and Web3 platforms engineered for trust and scale.",
    icon: BlockchainHover,
    route: "blockchain-development",
  },
  {
    serviceName: "Smart Contracts",
    serviceDesc:
      "Audited, gas-optimized smart contracts that automate trustless transactions across leading chains.",
    icon: SmartContractHover,
    route: "smart-contract",
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
  { value: 120, suffix: "+", label: "Projects delivered" },
  { value: 45, suffix: "+", label: "Happy clients worldwide" },
  { value: 8, suffix: "+", label: "Years of experience" },
  { value: 98, suffix: "%", label: "Client retention rate" },
];

// **************** TESTIMONIALS (sample) ****************
export const testimonials = [
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
      { src: propertyDashboard1, alt: "HOMIES property management dashboard showing income, expenses, and unit analytics for a real-estate portfolio in the USA and India" },
      { src: propertyDashboard2, alt: "HOMIES dashboard detail view with property performance charts and recent transactions" },
    ],
    location: "USA & India",
    projectType: "PropTech · SaaS Dashboard",
    Heading: "HOMIES — Property Management & Analytics Dashboard",
    aboutProject:
      "HOMIES is a property management and analytics dashboard that gives real-estate teams a single view of income, expenses, occupancy, and unit performance. We designed and engineered the interface in React, Vite, and Chakra UI, with interactive charts that turn raw portfolio data into fast, confident decisions. Built for property managers and agencies across India and the USA, it handles thousands of listings while staying fast and fully responsive — from large back-office monitors down to a phone on a site visit.",
    clentName: "HOMIES PropTech",
    tags: ["Web Development", "UI/UX Design", "Data Visualization"],
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
      "Marty-QR is an AI-powered review and customer-feedback platform that helps local businesses collect, manage, and grow their online reputation through simple QR touchpoints and seamless Google integration. We delivered the marketing site and client portal in React, Vite, and Chakra UI, with a bold, high-contrast brand and smooth animation throughout. Serving service businesses across the USA and India, the product turns in-store moments into five-star reviews and measurable growth — all wrapped in an interface that's fast, accessible, and effortless to use.",
    clentName: "Marty-QR",
    tags: ["Web Development", "App Development", "Digital Marketing"],
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
      "David Tishbi is a luxury jewelry e-commerce experience for a boutique designer brand, spanning fine jewelry, watches, and bullion. We crafted an elegant, image-led storefront in React, Vite, and Chakra UI, with refined typography, appointment booking, and a checkout designed to convert high-intent shoppers. Tailored for premium audiences in the USA and India, the site balances editorial storytelling with fast performance and accessible, mobile-first design — turning first-time visitors into loyal collectors and booked consultations.",
    clentName: "David Tishbi Jewelry",
    tags: ["Web Development", "UI/UX Design", "Digital Marketing"],
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
      "Estate is a conversion-focused real-estate platform where buyers and renters discover their next home. We built a fast, SEO-friendly property search with rich filtering, agent profiles, and featured listings, engineered in React, Vite, and Chakra UI for speed on every device. Designed for growing agencies in India and the USA, the experience pairs a striking hero with clear calls to action that move visitors from browsing to booking a viewing — backed by clean, maintainable code and strong Core Web Vitals.",
    clentName: "Estate Realty",
    tags: ["Web Development", "UI/UX Design", "SEO"],
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
      "A professional crypto trading terminal for spot and perpetuals, featuring real-time candlestick charts, live order books, depth visualization, and a streamlined buy/sell order form. We engineered the high-density, data-heavy interface in React and Vite with Chakra UI, optimized for split-second updates without sacrificing clarity. Built for Web3 traders in the USA and India, the platform balances advanced tooling with an approachable layout — and is backed by audited smart-contract integrations for secure, transparent, non-custodial trading at scale.",
    clentName: "GDT Exchange",
    tags: ["Blockchain", "Smart Contracts", "Web Development"],
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
      "Platinum Peak is a hospitality and room-booking website for a luxury hotel brand, designed to showcase suites and drive direct reservations. We built an immersive, image-rich experience in React, Vite, and Chakra UI, with smooth scrolling, clear room galleries, and a frictionless booking call to action. Created for hotels and resorts in India and the USA, the site reduces dependence on third-party platforms by making it effortless for guests to explore rooms and reserve directly — fast, responsive, and beautifully on-brand.",
    clentName: "Platinum Peak Hotels",
    tags: ["Web Development", "UI/UX Design", "App Development"],
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
      "We're a full-cycle product studio: web and mobile app development, UI/UX design, blockchain and smart contract development, and data-driven digital marketing — everything you need to take an idea from concept to launch.",
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

// **************** PARTNERS / TRUSTED BY (sample) ****************
export const partners = Array.from({ length: 9 }, () => ({ img: ClientLogo }));

// **************** NAVIGATION ****************
export const navbarOptions = [
  { option: "Home", path: "/" },
  { option: "About", path: "/about" },
  { option: "Services", path: "/" },
  { option: "Portfolio", path: "/portfolio" },
  { option: "Contact", path: "/contact" },
];

export const NavbarservicesOptions = [
  { option: "Web Development", icon: WebDevNavbarIcon, path: "/service/web-development", desc: "Sites & web apps" },
  { option: "App Development", icon: AppDevNavbarIcon, path: "/service/app-development", desc: "iOS & Android" },
  { option: "UI/UX Design", icon: UIUXNavbarIcon, path: "/service/ui-ux-design", desc: "Product design" },
  { option: "Blockchain Development", icon: BlockchainDevNavbarIcon, path: "/service/blockchain-development", desc: "Web3 & dApps" },
  { option: "Smart Contracts", icon: SmartContractNavbarIcon, path: "/service/smart-contract", desc: "Audited contracts" },
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
    name: "App Development",
    description: [
      "High-quality mobile apps with robust functionality and seamless performance.",
      "Cross-platform compatibility for iOS and Android to reach a wider audience.",
      "Intuitive, user-friendly interfaces designed for engagement and retention.",
    ],
    icon: AppDevHover,
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
    name: "Blockchain Development",
    description: [
      "Secure blockchain solutions ensuring data integrity and transparency.",
      "Decentralized applications (dApps) that harness the power of Web3.",
      "Smart contracts engineered to automate processes and enforce agreements.",
    ],
    icon: BlockchainHover,
  },
  {
    name: "Smart Contracts",
    description: [
      "Efficient contracts that facilitate trustless transactions and operations.",
      "Automated complex workflows that reduce reliance on intermediaries.",
      "Audited code that enhances security and on-chain transparency.",
    ],
    icon: SmartContractHover,
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
    whatWeDo: "What we do",
    description: "Custom-built Android & iOS solutions for every industry.",
    details:
      "From idea to App Store, we design and engineer native and cross-platform mobile apps that are fast, secure, and a joy to use. Our team handles architecture, UI, development, QA, and launch — so you get a polished product without the headaches.",
    features: [
      "Native iOS (Swift) & Android (Kotlin) development",
      "Cross-platform apps with React Native & Flutter",
      "Offline-first, real-time, and API-driven experiences",
      "App Store & Play Store submission and ASO",
    ],
  },
  "web-development": {
    title: "Web Development",
    whatWeDo: "What we do",
    description: "Responsive, robust web applications that perform.",
    details:
      "We build high-performing websites and web apps with modern frameworks, clean architecture, and rock-solid performance. SEO-ready, accessible, and scalable from day one.",
    features: [
      "Modern frontends with React & Next.js",
      "Scalable Node.js & API backends",
      "Headless CMS & e-commerce builds",
      "Core Web Vitals & SEO optimization",
    ],
  },
  "ui-ux-design": {
    title: "UI/UX Design",
    whatWeDo: "What we do",
    description: "User-centric, visually stunning interfaces.",
    details:
      "Our design team crafts exceptional experiences grounded in research. From wireframes to a complete design system, we make products that are beautiful, usable, and on-brand.",
    features: [
      "UX research, user flows & wireframing",
      "High-fidelity UI design in Figma",
      "Interactive prototypes & usability testing",
      "Reusable design systems & component libraries",
    ],
  },
  "blockchain-development": {
    title: "Blockchain Development",
    whatWeDo: "What we do",
    description: "Secure and scalable blockchain solutions.",
    details:
      "We design and build decentralized applications and Web3 platforms across leading chains, with a relentless focus on security, transparency, and great UX.",
    features: [
      "dApp & DeFi platform development",
      "Token design & tokenomics (ERC-20 / ERC-721)",
      "Wallet integration & on-chain data",
      "Multi-chain support (Ethereum, Polygon, Solana)",
    ],
  },
  "smart-contract": {
    title: "Smart Contracts",
    whatWeDo: "What we do",
    description: "Reliable, audited, gas-optimized contracts.",
    details:
      "We write and audit smart contracts that automate trustless transactions to the highest standards of security and efficiency, with thorough testing and documentation.",
    features: [
      "Solidity development & best practices",
      "Security audits & vulnerability testing",
      "Gas optimization for lower fees",
      "Upgradeable & modular contract patterns",
    ],
  },
  "digital-marketing": {
    title: "Digital Marketing",
    whatWeDo: "What we do",
    description: "Comprehensive, data-driven growth marketing.",
    details:
      "We help businesses grow their online presence with strategies rooted in data — turning visibility into traffic, leads, and revenue.",
    features: [
      "SEO & content strategy",
      "Performance & paid social campaigns",
      "Conversion rate optimization (CRO)",
      "Analytics, reporting & growth experiments",
    ],
  },
};

// **************** SERVICE PAGE TECH STACKS ****************
export const techStacks = {
  "web-development": {
    title: "Web Development",
    stacks: [
      { title: "Frontend Development", subtitle: "Interfaces that delight", description: "We use modern frontend technologies to build responsive, interactive web applications.", techStack: "React, Next.js, TypeScript" },
      { title: "Backend Development", subtitle: "Robust & scalable APIs", description: "Secure, scalable backends built with the latest technologies and best practices.", techStack: "Node.js, Express, PostgreSQL" },
      { title: "CMS & E-commerce", subtitle: "Content you control", description: "Custom themes, plugins, and headless setups tailored to your business needs.", techStack: "WordPress, Shopify, Strapi" },
    ],
  },
  "app-development": {
    title: "App Development",
    stacks: [
      { title: "iOS Development", subtitle: "Built for Apple", description: "High-performance iOS apps using Swift and the latest Apple frameworks.", techStack: "Swift, SwiftUI" },
      { title: "Android Development", subtitle: "Built for Android", description: "Polished Android apps developed with Kotlin for optimal performance.", techStack: "Kotlin, Jetpack Compose" },
      { title: "Cross-Platform", subtitle: "One codebase, every device", description: "Ship to both platforms faster with a shared, maintainable codebase.", techStack: "React Native, Flutter" },
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
      { title: "dApp Development", subtitle: "Decentralized by design", description: "Secure, scalable blockchain solutions across leading networks.", techStack: "Solidity, Ethers.js, Hardhat" },
      { title: "Web3 Integration", subtitle: "Connect to the chain", description: "Wallet connections, on-chain data, and seamless Web3 UX.", techStack: "Wagmi, Web3.js, IPFS" },
    ],
  },
  "smart-contract": {
    title: "Smart Contracts",
    stacks: [
      { title: "Contract Development", subtitle: "Trustless automation", description: "Reliable, efficient smart contracts written and tested with care.", techStack: "Solidity, Foundry" },
      { title: "Security Audits", subtitle: "Ship with confidence", description: "Thorough audits and testing to keep your contracts safe.", techStack: "Slither, Mythril" },
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
