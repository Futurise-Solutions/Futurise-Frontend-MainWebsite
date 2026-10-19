// Layout-level data (navbar, footer, CTA). Kept apart from Constant/index.js and
// caseStudies.js so the every-page layout bundle does not pull in the large page-content
// data. Both of those modules re-export these names, so existing imports keep working.
import WebDevNavbarIcon from "../../assests/HomeAssest/WebDevNavbarIcon.svg";
import AppDevNavbarIcon from "../../assests/HomeAssest/AppDevNavbarIcon.svg";
import BlockchainDevNavbarIcon from "../../assests/HomeAssest/BlockchainDevNavbarIcon.svg";
import DigiMarketingNavbarIcon from "../../assests/HomeAssest/DigiMarketingNavbarIcon.svg";
import AiMlNavbarIcon from "../../assests/HomeAssest/AiMlNavbarIcon.svg";
import UIUXNavbarIcon from "../../assests/HomeAssest/UIUXNavbarIcon.svg";

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

export const caseStudiesNav = [
  {
    option: "AI Support Agent",
    slug: "ai-support-agent",
    desc: "RAG retrieval + human handoff",
    service: "AI & ML",
  },
  {
    option: "SaaS Platform Scale",
    slug: "saas-platform-scale",
    desc: "Multi-tenant rebuild",
    service: "Web Dev",
  },
  {
    option: "Real Estate App",
    slug: "real-estate-app",
    desc: "One React Native codebase",
    service: "App Dev",
  },
  {
    option: "FinTech UX Redesign",
    slug: "fintech-ux-redesign",
    desc: "Progressive-disclosure redesign",
    service: "UI/UX",
  },
  {
    option: "DeFi Protocol Launch",
    slug: "defi-protocol-launch",
    desc: "Non-upgradeable staking contracts",
    service: "Blockchain",
  },
  {
    option: "SaaS SEO Growth",
    slug: "saas-seo-growth",
    desc: "Technical SEO architecture",
    service: "Marketing",
  },
  {
    option: "Shopify CRO",
    slug: "shopify-cro-d2c-brand",
    desc: "~20× monthly revenue",
    service: "E-commerce",
  },
];
