/**
 * Light solution index for CLIENT components (navbar, service and country pages).
 *
 * solutions.js and solutionMarkets.js hold the full page copy; importing them from a client
 * component ships every page's text in client JavaScript. Client code imports THIS file
 * instead. It must stay in step with those two modules: app/solutions/[slug]/[market]/page.tsx
 * checks it at build time (lib/solutionLinksGuard.ts) and fails the build on any drift.
 */

export const solutionLinks = [
  { slug: "shopify-development-cro", name: "Shopify Development & CRO", market: "India", service: "web-development", country: "in" },
  { slug: "hospital-management-system", name: "Hospital Management System", market: "India", service: "web-development", country: "in" },
  { slug: "whatsapp-crm", name: "WhatsApp CRM", market: "India", service: "web-development", country: "in" },
  { slug: "ai-saas-development", name: "AI SaaS Development", market: "United States", service: "ai-ml-solutions", country: "us" },
  { slug: "chrome-extension-development", name: "Chrome Extension Development", market: "United States", service: "web-development", country: "us" },
  { slug: "telegram-bot-development", name: "Telegram Bot Development", market: "Global", service: "ai-ml-solutions", country: null },
  { slug: "web3-dapp-development", name: "Web3 dApp Development", market: "United States", service: "blockchain-development", country: "us" },
  { slug: "ai-recruitment-platform", name: "AI Recruitment Platform", market: "India", service: "ai-ml-solutions", country: "in" },
  { slug: "server-management-platform", name: "Server Management Platform", market: "Global", service: "web-development", country: null },
];

/** Which market variants exist per solution (mirrors marketVariants in solutionMarkets.js). */
export const variantMarkets = {
  "shopify-development-cro": ["us", "ca", "nz", "ae"],
  "ai-saas-development": ["ca", "nz", "ae", "in"],
  "whatsapp-crm": ["ae"],
  "web3-dapp-development": ["ae"],
};

/** Short market names for link tags (mirrors MARKETS[m].short and MARKETS[m].label). */
export const marketNames = {
  us: { label: "United States", short: "USA" },
  ca: { label: "Canada", short: "Canada" },
  nz: { label: "New Zealand", short: "NZ" },
  ae: { label: "United Arab Emirates", short: "UAE" },
  in: { label: "India", short: "India" },
  au: { label: "Australia", short: "Australia" },
  eu: { label: "Europe", short: "Europe" },
};

/** `/solutions/:slug/:market` when that variant exists, else `/solutions/:slug`. */
export function solutionHref(slug, market) {
  return variantMarkets[slug]?.includes(market) ? `/solutions/${slug}/${market}` : `/solutions/${slug}`;
}

/**
 * Country page → solution order. Every country page lists all solutions (so a visitor from
 * any market can reach every service), ordered by what sells in that market. A solution
 * links to its market variant when one exists, otherwise to the base page.
 */
export const countrySolutionOrder = {
  us: ["shopify-development-cro", "ai-saas-development", "chrome-extension-development", "web3-dapp-development", "ai-recruitment-platform", "telegram-bot-development", "server-management-platform", "whatsapp-crm", "hospital-management-system"],
  ca: ["shopify-development-cro", "ai-saas-development", "chrome-extension-development", "web3-dapp-development", "ai-recruitment-platform", "telegram-bot-development", "server-management-platform", "whatsapp-crm", "hospital-management-system"],
  nz: ["shopify-development-cro", "ai-saas-development", "chrome-extension-development", "whatsapp-crm", "ai-recruitment-platform", "web3-dapp-development", "telegram-bot-development", "server-management-platform", "hospital-management-system"],
  ae: ["web3-dapp-development", "shopify-development-cro", "whatsapp-crm", "ai-saas-development", "hospital-management-system", "telegram-bot-development", "chrome-extension-development", "ai-recruitment-platform", "server-management-platform"],
  in: ["shopify-development-cro", "hospital-management-system", "whatsapp-crm", "ai-recruitment-platform", "ai-saas-development", "web3-dapp-development", "chrome-extension-development", "telegram-bot-development", "server-management-platform"],
  au: ["shopify-development-cro", "ai-saas-development", "chrome-extension-development", "whatsapp-crm", "web3-dapp-development", "ai-recruitment-platform", "telegram-bot-development", "server-management-platform", "hospital-management-system"],
  eu: ["ai-saas-development", "shopify-development-cro", "web3-dapp-development", "chrome-extension-development", "telegram-bot-development", "server-management-platform", "ai-recruitment-platform", "whatsapp-crm", "hospital-management-system"],
};
