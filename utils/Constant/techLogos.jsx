import {
  SiReact, SiNextdotjs, SiAstro, SiTypescript, SiHtml5, SiCss3, SiJavascript,
  SiTailwindcss, SiMui, SiShadcnui, SiNodedotjs, SiExpress, SiGraphql,
  SiMongodb, SiPostgresql, SiMysql, SiRedis, SiGit, SiGithub, SiVercel,
  SiNetlify, SiRender, SiJest, SiTestinglibrary, SiExpo,
  SiGooglemaps, SiFirebase, SiSupabase, SiAppstore, SiGoogleplay,
  SiFigma, SiAdobexd, SiFramer, SiSolidity, SiEthers, SiWeb3Dotjs,
  SiEthereum, SiBinance, SiCoinbase, SiPolygon, SiSolana, SiPython,
  SiOpenai, SiPytorch, SiTensorflow,
  SiScikitlearn, SiFastapi, SiGooglecloud, SiGoogleads, SiMeta,
  SiGoogleanalytics, SiGooglesearchconsole, SiAmazonaws,
} from "react-icons/si";
import { FiCpu, FiGitBranch, FiBell, FiLink2, FiRefreshCw, FiSearch, FiActivity, FiCode, FiLayers } from "react-icons/fi";
import { TbBrandCypress } from "react-icons/tb";

/**
 * Authentic brand marks for the technology names used in `techStacks`.
 *
 * The stack sections previously rendered each technology twice — once as a pill and
 * again as a text box in the "visual" beside it — so the visual carried no information
 * the reader did not already have two inches to the left. Mapping each name to its real
 * logo turns that panel into something worth looking at.
 *
 * Keys must match the strings in Constant/index.js `techStack` exactly (trimmed).
 * `color` is each brand's official hex, used at low opacity so the grid still reads as
 * one system rather than a ransom note. Anything without an official mark falls back to
 * a neutral glyph — never a wrong or invented logo.
 */

const T = (icon, color) => ({ icon, color });

export const TECH_LOGOS = {
  // — Frontend —
  "React": T(SiReact, "#61DAFB"),
  "Next.js": T(SiNextdotjs, "#FFFFFF"),
  "Astro": T(SiAstro, "#FF5D01"),
  "TypeScript": T(SiTypescript, "#3178C6"),
  "HTML5": T(SiHtml5, "#E34F26"),
  "CSS3": T(SiCss3, "#1572B6"),
  "JavaScript": T(SiJavascript, "#F7DF1E"),
  "Tailwind CSS": T(SiTailwindcss, "#06B6D4"),
  "Material UI": T(SiMui, "#007FFF"),
  "Shadcn UI": T(SiShadcnui, "#C7B9FF"),

  // — Backend —
  "Node.js": T(SiNodedotjs, "#5FA04E"),
  "Express": T(SiExpress, "#FFFFFF"),
  "REST": T(FiCode, "#B4A0FF"),
  "GraphQL": T(SiGraphql, "#E10098"),

  // — Databases —
  "MongoDB": T(SiMongodb, "#47A248"),
  "PostgreSQL": T(SiPostgresql, "#4169E1"),
  "MySQL": T(SiMysql, "#4479A1"),
  "Redis": T(SiRedis, "#FF4438"),

  // — DevOps —
  "Git": T(SiGit, "#F05032"),
  "GitHub": T(SiGithub, "#FFFFFF"),
  "CI/CD": T(FiGitBranch, "#B4A0FF"),
  "AWS": T(SiAmazonaws, "#FF9900"),
  "Google Cloud": T(SiGooglecloud, "#4285F4"),
  "Vercel": T(SiVercel, "#FFFFFF"),
  "Netlify": T(SiNetlify, "#00C7B7"),
  "Render": T(SiRender, "#FFFFFF"),

  // — Testing —
  "Jest": T(SiJest, "#C21325"),
  "React Testing Library": T(SiTestinglibrary, "#E33332"),
  "Cypress": T(TbBrandCypress, "#69D3A7"),
  "Playwright": T(FiActivity, "#2EAD33"),

  // — Mobile —
  "React Native": T(SiReact, "#61DAFB"),
  "Expo": T(SiExpo, "#FFFFFF"),
  "Google Maps API": T(SiGooglemaps, "#4285F4"),
  "Push Notifications": T(FiBell, "#B4A0FF"),
  "Expo Notifications": T(SiExpo, "#FFFFFF"),
  "Deep Linking": T(FiLink2, "#B4A0FF"),
  "Firebase": T(SiFirebase, "#DD2C00"),
  "Supabase": T(SiSupabase, "#3FCF8E"),
  "App Store": T(SiAppstore, "#0D96F6"),
  "Google Play Store": T(SiGoogleplay, "#48FF48"),
  "Expo EAS": T(SiExpo, "#FFFFFF"),
  "OTA Updates": T(FiRefreshCw, "#B4A0FF"),

  // — Design —
  "Figma": T(SiFigma, "#F24E1E"),
  "Adobe XD": T(SiAdobexd, "#FF61F6"),
  "Framer": T(SiFramer, "#FFFFFF"),

  // — Blockchain —
  "Solidity": T(SiSolidity, "#B4A0FF"),
  "Ethers.js": T(SiEthers, "#2535A0"),
  "Hardhat": T(FiLayers, "#FFF100"),
  "Wagmi": T(FiLink2, "#B4A0FF"),
  "Web3.js": T(SiWeb3Dotjs, "#F16822"),
  "gRPC": T(FiCode, "#B4A0FF"),
  "Ethereum": T(SiEthereum, "#B4A0FF"),
  "BSC": T(SiBinance, "#F0B90B"),
  "Base": T(SiCoinbase, "#0052FF"),
  "Arbitrum": T(FiLayers, "#28A0F0"),
  "Polygon": T(SiPolygon, "#7B3FE4"),
  "Solana": T(SiSolana, "#14F195"),

  // — AI / ML —
  "OpenAI": T(SiOpenai, "#FFFFFF"),
  "Claude": T(FiCpu, "#D97757"),
  "LangChain": T(FiLink2, "#B4A0FF"),
  "LlamaIndex": T(FiLayers, "#B4A0FF"),
  "Python": T(SiPython, "#3776AB"),
  "PyTorch": T(SiPytorch, "#EE4C2C"),
  "TensorFlow": T(SiTensorflow, "#FF6F00"),
  "scikit-learn": T(SiScikitlearn, "#F7931E"),
  "FastAPI": T(SiFastapi, "#009688"),

  // — Marketing —
  "Ahrefs": T(FiSearch, "#B4A0FF"),
  "GA4": T(SiGoogleanalytics, "#E37400"),
  "Search Console": T(SiGooglesearchconsole, "#458CF5"),
  "Meta Ads": T(SiMeta, "#0081FB"),
  "Google Ads": T(SiGoogleads, "#4285F4"),
};

/** Neutral fallback so an unmapped technology never renders a wrong brand mark. */
export const FALLBACK_LOGO = T(FiCode, "#B4A0FF");

export const getTechLogo = (name) => TECH_LOGOS[name?.trim()] || FALLBACK_LOGO;
