/**
 * Market variants of Solutions pages — /solutions/:slug/:market.
 *
 * A variant exists only where the market genuinely changes the work (payments, tax,
 * language, shipping, regulation) and there is commercial demand. Each variant must carry
 * content that is specific to its market. Do NOT clone a page and swap the country name:
 * Google treats near-duplicate location pages as doorway pages.
 *
 * Variants share the base solution's capabilities, builds and stack (solutions.js) and add:
 * their own meta, hero, answer, market-specific points and FAQs.
 *
 * CONTENT RULES (same as solutions.js): no client names, no invented figures. Market facts
 * describe how stores in that market work; delivery claims only where the team has
 * confirmed delivery (Shopify: India and the US).
 */

/** Market codes → labels, hreflang and the matching country page. */
export const MARKETS = {
  us: { label: "United States", short: "USA", hreflang: "en-US", countryPage: "/us" },
  ca: { label: "Canada", short: "Canada", hreflang: "en-CA", countryPage: "/ca" },
  nz: { label: "New Zealand", short: "NZ", hreflang: "en-NZ", countryPage: "/nz" },
  ae: { label: "United Arab Emirates", short: "UAE", hreflang: "en-AE", countryPage: "/ae" },
  in: { label: "India", short: "India", hreflang: "en-IN", countryPage: "/in" },
  au: { label: "Australia", short: "Australia", hreflang: "en-AU", countryPage: "/au" },
  eu: { label: "Europe", short: "Europe", hreflang: null, countryPage: "/europe" },
};

/**
 * Which market the BASE solution page itself serves. In the hreflang cluster the base page
 * is the x-default plus this market.
 */
export const baseMarket = {
  "shopify-development-cro": "in",
  "web3-dapp-development": "us",
  "ai-saas-development": "us",
  "whatsapp-crm": "in",
};

export const marketVariants = {
  /* ═══════════════════════════════ SHOPIFY ═══════════════════════════════ */
  "shopify-development-cro": {
    us: {
      meta: {
        title: "Shopify Agency USA: Store Development & CRO",
        description:
          "Shopify development and CRO for US brands: product pages, cart drawers with upsells, Shop Pay checkout, reviews and custom Liquid, on fixed scope.",
        keywords:
          "Shopify agency USA, Shopify development agency USA, Shopify CRO agency, Shopify conversion rate optimization agency, hire Shopify developer, Shopify expert USA, Shopify store redesign, Shopify theme customization",
      },
      hero: {
        eyebrow: "Solutions · Shopify · United States",
        title: "A Shopify partner for",
        highlight: "US brands.",
        subtitle:
          "Store builds, conversion work and ongoing care for US Shopify stores. Product page, cart, upsells, checkout and reviews work as one buying path.",
      },
      answer:
        "Futurise Solutions is a Shopify development and CRO agency that has delivered Shopify work for US brands. We rework product pages, build custom cart drawers with upsells, streamline checkout around Shop Pay, integrate reviews and customise themes in Liquid. Then we look after the store on a retainer. Fixed-scope quotes after a free discovery call.",
      marketPoints: [
        { title: "Checkout built around Shop Pay", desc: "US shoppers expect accelerated checkout. We shorten the path from cart to payment and keep Shop Pay and other express options where shoppers look for them." },
        { title: "Sales tax set up, not guessed", desc: "US sales tax varies by state. We configure the store's tax settings with the brand's accountant's rules rather than leaving defaults in place." },
        { title: "Email and SMS flows that follow the cart", desc: "Abandoned-cart and post-purchase flows connected to the store, so the upsell logic on site continues after the visit." },
        { title: "Built for the US calendar", desc: "Theme sections and promotions that can be switched for BFCM, Memorial Day and holiday campaigns without a rebuild." },
      ],
      proof: "We've delivered Shopify work for US brands. Clients are under NDA, so we show it on a live call.",
      faqs: [
        { q: "Do you work with US Shopify brands?", a: "Yes. We have delivered Shopify work for US brands, alongside our work for D2C brands in India. Clients are under NDA, so we show the work on a live call." },
        { q: "Can you take over an existing US Shopify store?", a: "Yes. Most of our Shopify work is on stores that are already trading; we work inside the current theme so the store keeps selling while it improves." },
        { q: "What time zones do you work in?", a: "We work with US clients remotely on fixed-scope projects, with call times agreed at the start of the project." },
        { q: "How is a US Shopify project priced?", a: "Fixed scope, quoted in USD after a free discovery call. Ongoing optimisation runs as a retainer scoped to what the store needs." },
        { q: "Do you handle Shopify Plus stores?", a: "Tell us your plan and setup on the discovery call; we'll say plainly what we can and can't take on." },
      ],
    },

    ca: {
      meta: {
        title: "Shopify Agency Canada: Store Development & CRO",
        description:
          "Shopify development and CRO for Canadian brands: bilingual English-French storefronts, GST/HST/PST-ready tax, CAD pricing and cart drawers with upsells.",
        keywords:
          "Shopify agency Canada, Shopify developer Canada, Shopify experts Canada, Shopify CRO Canada, bilingual Shopify store, French Shopify store Quebec, Shopify development company Canada",
      },
      hero: {
        eyebrow: "Solutions · Shopify · Canada",
        title: "Shopify stores for Canada,",
        highlight: "in both languages.",
        subtitle:
          "Bilingual storefronts, tax set up for each province and CAD pricing, plus the conversion work that turns visits into orders.",
      },
      answer:
        "Futurise Solutions builds and optimises Shopify stores for Canadian brands. We set up English and French storefronts, configure GST, HST and PST settings by province, price in CAD, and rework product pages, cart drawers with upsells and checkout as one buying path. Then we look after the store. Fixed-scope quotes after a free discovery call.",
      marketPoints: [
        { title: "English and French storefronts", desc: "Quebec's language rules expect French to be available to customers there. We set up translated storefronts and keep both languages in sync as products change." },
        { title: "GST, HST and PST by province", desc: "Canadian sales tax depends on the province. We configure the store's tax settings to the brand's accountant's rules." },
        { title: "CAD pricing and Canadian shipping", desc: "Prices shown in CAD and shipping rates that reflect Canadian carriers and distances, so the price at checkout is the price the shopper expected." },
        { title: "Conversion work, not just setup", desc: "Product page, cart drawer, upsells and checkout reworked as one path. It's the same method behind our D2C results in India." },
      ],
      proof: "The same Shopify method behind our India and US work, walked through live on a call.",
      faqs: [
        { q: "Can you build a bilingual Shopify store?", a: "Yes. We set up English and French storefronts and keep product content in sync in both languages." },
        { q: "Do you handle Canadian sales tax?", a: "We configure GST, HST and PST settings in the store according to your accountant's instructions; we don't give tax advice ourselves." },
        { q: "Do you work with Canadian brands remotely?", a: "Yes. We work with Canadian clients remotely on fixed-scope projects, with call times agreed at the start of the project." },
        { q: "How is it priced?", a: "Fixed scope, quoted after a free discovery call; ongoing optimisation runs as a retainer." },
        { q: "Can we see your Shopify work?", a: "Clients are under NDA, so we walk through stores, cart drawers and checkout flows on a live call." },
      ],
    },

    nz: {
      meta: {
        title: "Shopify Agency NZ: Store Development & CRO",
        description:
          "Shopify development and CRO for New Zealand brands from a Wellington-registered studio: GST-inclusive pricing, Afterpay, NZ shipping and cart upsells.",
        keywords:
          "Shopify agency NZ, Shopify developer New Zealand, Shopify experts NZ, Shopify CRO NZ, Shopify agency Wellington, Shopify store development New Zealand, Shopify website design NZ",
      },
      hero: {
        eyebrow: "Solutions · Shopify · New Zealand",
        title: "Shopify for Kiwi brands,",
        highlight: "built to sell.",
        subtitle:
          "A Wellington-registered studio that builds and optimises Shopify stores, with GST-inclusive pricing, local payment options and a buying path that converts.",
      },
      answer:
        "Futurise Solutions is a Wellington-registered studio that builds and optimises Shopify stores for New Zealand brands. We show GST-inclusive NZD pricing, set up buy-now-pay-later options such as Afterpay, configure NZ shipping, and rework product pages, cart drawers with upsells and checkout as one path. Then we look after the store.",
      marketPoints: [
        { title: "GST-inclusive NZD pricing", desc: "NZ shoppers expect prices that already include 15% GST. We set the store up that way, so there are no surprises at checkout." },
        { title: "Buy now, pay later", desc: "Afterpay and similar options are part of how many New Zealanders shop online. We place them where they help the decision, not just at checkout." },
        { title: "NZ shipping that adds up", desc: "Shipping rates and zones that reflect North Island, South Island and rural delivery, so the cost shown matches the cost charged." },
        { title: "A local contracting entity", desc: "Futurise Solutions is registered in Wellington, so you contract with a New Zealand company." },
      ],
      proof: "Wellington-registered; Shopify work delivered for brands in India and the US, walked through live on a call.",
      faqs: [
        { q: "Are you a New Zealand company?", a: "Yes. Futurise Solutions is registered in Wellington; our engineering team works remotely across time zones." },
        { q: "Can you add Afterpay to our Shopify store?", a: "Yes. We also place it on the product page and cart, where it helps shoppers decide, not only at checkout." },
        { q: "Do you set up GST correctly?", a: "We configure GST-inclusive pricing and tax settings according to your accountant's instructions." },
        { q: "How is it priced?", a: "A fixed-scope quote in NZD after a free discovery call; ongoing work runs as a retainer." },
        { q: "Can we see stores you've built?", a: "Clients are under NDA, so we walk through the work on a live call." },
      ],
    },

    ae: {
      meta: {
        title: "Shopify Agency Dubai: Shopify Developers in the UAE",
        description:
          "Shopify development and CRO for Dubai and UAE brands: Arabic RTL storefronts, AED pricing with 5% VAT, cash on delivery, Tabby and Tamara instalments.",
        keywords:
          "Shopify agency Dubai, Shopify developer UAE, Shopify development company Dubai, Arabic Shopify store, Shopify RTL theme, Shopify cash on delivery UAE, Tabby Shopify, Tamara Shopify, Shopify experts Dubai",
      },
      hero: {
        eyebrow: "Solutions · Shopify · UAE",
        title: "Shopify stores for the UAE,",
        highlight: "in Arabic and English.",
        subtitle:
          "RTL storefronts, AED pricing with VAT, cash on delivery and instalments, plus the conversion work that turns UAE traffic into orders.",
      },
      answer:
        "Futurise Solutions builds and optimises Shopify stores for brands in Dubai and across the UAE. We set up Arabic right-to-left and English storefronts, AED pricing with 5% VAT, cash on delivery and instalment options such as Tabby and Tamara, and rework product pages, cart drawers with upsells and checkout as one buying path.",
      marketPoints: [
        { title: "Arabic RTL and English", desc: "A right-to-left Arabic storefront alongside English, with layouts, icons and forms that actually mirror correctly rather than just translated text." },
        { title: "Cash on delivery and instalments", desc: "COD remains a common way to pay in the UAE, and instalment options such as Tabby and Tamara help larger baskets. We set them up and place them where they help the decision." },
        { title: "AED pricing with 5% VAT", desc: "Prices in AED with VAT handled according to your accountant's instructions, so the checkout total matches what shoppers expect." },
        { title: "Delivery expectations", desc: "Fast local delivery is the norm in Dubai. Shipping rates, delivery promises and order notifications set up to match it." },
      ],
      proof: "Shopify work delivered for brands in India and the US; UAE web work delivered for a Dubai B2B supplier.",
      faqs: [
        { q: "Can you build an Arabic Shopify store?", a: "Yes. An Arabic right-to-left storefront alongside English, with mirrored layouts and forms, not just translated text." },
        { q: "Can our store accept cash on delivery and Tabby or Tamara?", a: "Yes. We set up COD and instalment options and place them on the product page and cart where they help shoppers decide." },
        { q: "Have you worked with UAE clients?", a: "Yes. We rebuilt the website of Infinity Bay Trading, a Dubai B2B supplier, and our Shopify work spans India and the US." },
        { q: "How is a UAE Shopify project priced?", a: "Fixed scope, quoted after a free discovery call; ongoing optimisation runs as a retainer." },
        { q: "Can we see your Shopify work?", a: "Clients are under NDA, so we walk through the work on a live call." },
      ],
    },
  },

  /* ═══════════════════════════════ AI SAAS ═══════════════════════════════ */
  "ai-saas-development": {
    ca: {
      meta: {
        title: "AI SaaS Development Company in Canada",
        description:
          "AI SaaS development for Canadian founders: generative products with credits and billing, multi-LLM apps and AI copilots, built with privacy rules in mind.",
        keywords:
          "AI SaaS development company Canada, AI app development Canada, generative AI development Canada, LLM app development Canada, AI MVP development Toronto, AI startup development partner Canada",
      },
      hero: {
        eyebrow: "Solutions · AI SaaS · Canada",
        title: "AI products for",
        highlight: "Canadian founders.",
        subtitle:
          "From an idea to an AI SaaS people pay for, with accounts, credits and billing, built with Canadian privacy expectations in mind.",
      },
      answer:
        "Futurise Solutions builds AI SaaS products for founders in Canada. We have shipped an AI music generation SaaS with credits and a track library, a multi-LLM interview prep app on Claude, Gemini and Grok, an AI hiring platform and a real-time AI sales copilot. We build the whole product and quote fixed scope after a free call.",
      marketPoints: [
        { title: "Privacy built in from day one", desc: "PIPEDA, and Quebec's Law 25 for users there, shape how an AI product collects and uses personal data. We design data flows with that in mind and work with your legal adviser on the details." },
        { title: "Where your data lives", desc: "Some Canadian buyers ask where data is stored and processed. We set up hosting and AI providers so you can give them a clear answer." },
        { title: "English and French", desc: "If you sell in Quebec, the product may need French. We plan for bilingual UI and AI output from the start, not as a late patch." },
        { title: "Billing that fits your costs", desc: "AI usage costs money on every request. Credits, subscriptions and usage limits keep your margins safe as you grow." },
      ],
      proof: "AI SaaS, multi-LLM, AI hiring and AI copilot products shipped for clients under NDA. We show them on a live call.",
      faqs: [
        { q: "Do you work with Canadian startups?", a: "Yes. We work with Canadian founders remotely on fixed-scope projects, with call times agreed at the start." },
        { q: "Can you build an AI MVP quickly?", a: "An MVP usually takes 6 to 12 weeks, depending on scope. Larger platforms take 3 to 6 months." },
        { q: "Do you handle Canadian privacy compliance?", a: "We build the product with PIPEDA and Quebec Law 25 in mind and work alongside your legal adviser. We don't give legal advice ourselves." },
        { q: "Which AI models do you use?", a: "We're model-agnostic. We've shipped products on Claude, Gemini, Grok and OpenAI, and we pick per feature." },
        { q: "Can we see what you've built?", a: "Our clients are under NDA, so we demo the products on a live call." },
      ],
    },

    nz: {
      meta: {
        title: "AI SaaS Development Company NZ",
        description:
          "AI SaaS and LLM product development for New Zealand founders from a Wellington-registered studio: generative apps, billing, AI copilots and hiring tools.",
        keywords:
          "AI SaaS development NZ, AI app developers New Zealand, AI development company Wellington, LLM app development NZ, AI startup developers Auckland, generative AI development New Zealand",
      },
      hero: {
        eyebrow: "Solutions · AI SaaS · New Zealand",
        title: "AI products for",
        highlight: "Kiwi founders.",
        subtitle:
          "A Wellington-registered studio that turns AI ideas into SaaS products people pay for.",
      },
      answer:
        "Futurise Solutions is a Wellington-registered studio that builds AI SaaS products for New Zealand founders. We have shipped an AI music SaaS with credits and a library, a multi-LLM interview prep app, an AI hiring platform and a real-time AI sales copilot. You contract with a New Zealand company and get a fixed-scope quote after a free call.",
      marketPoints: [
        { title: "A New Zealand contracting entity", desc: "Futurise Solutions is registered in Wellington, so your contract, invoices and IP terms sit with a New Zealand company." },
        { title: "Privacy Act 2020, including overseas providers", desc: "Most AI models run offshore. Under the Privacy Act 2020 that matters when personal information leaves New Zealand. We map which data goes where so you can explain it to customers." },
        { title: "Priced in NZD", desc: "Fixed-scope quotes in NZD, so the budget you agree is the budget you pay." },
        { title: "Built to earn, not just to demo", desc: "Accounts, credits, subscriptions and usage limits from the first release, so the product can charge on day one." },
      ],
      proof: "Wellington-registered; AI SaaS, multi-LLM, AI hiring and AI copilot products shipped for clients under NDA and shown on a live call.",
      faqs: [
        { q: "Are you a New Zealand company?", a: "Yes. Futurise Solutions is registered in Wellington. Our engineering team works remotely." },
        { q: "How long does an AI MVP take?", a: "Usually 6 to 12 weeks, depending on scope. Larger platforms take 3 to 6 months." },
        { q: "What about privacy when AI models run overseas?", a: "We map which personal information goes to which provider and design the product around it. Your legal adviser confirms the Privacy Act position." },
        { q: "How is it priced?", a: "A fixed-scope quote in NZD after a free discovery call." },
        { q: "Can we see your AI products?", a: "They were built for clients under NDA, so we demo them on a live call." },
      ],
    },

    ae: {
      meta: {
        title: "AI Development Company Dubai: AI SaaS & Agents",
        description:
          "AI SaaS and AI product development for Dubai and UAE businesses: generative apps, multi-LLM products and AI copilots, with Arabic and English planned in.",
        keywords:
          "AI development company Dubai, AI SaaS development UAE, AI app development Dubai, generative AI company UAE, LLM development Dubai, Arabic AI chatbot development, AI agent development UAE",
      },
      hero: {
        eyebrow: "Solutions · AI SaaS · UAE",
        title: "AI products for the UAE,",
        highlight: "in Arabic and English.",
        subtitle:
          "AI SaaS, copilots and assistants for Dubai and UAE businesses, built as real products with accounts, billing and bilingual support.",
      },
      answer:
        "Futurise Solutions builds AI SaaS products and AI tools for businesses in Dubai and across the UAE. We have shipped an AI music SaaS with credits, a multi-LLM interview prep app on Claude, Gemini and Grok, an AI hiring platform and a real-time AI sales copilot. We plan Arabic and English from the start and quote fixed scope after a free call.",
      marketPoints: [
        { title: "Arabic and English", desc: "UAE users switch between Arabic and English. We plan bilingual, right-to-left UI and test how each AI model handles Arabic before we commit to it." },
        { title: "Data rules depend on where you're set up", desc: "Mainland, DIFC and ADGM each have their own data protection rules. We build the product around what your advisers say applies to you." },
        { title: "A product, not a demo", desc: "Accounts, credits, subscriptions and admin tools from the first release, so the AI feature can actually earn." },
        { title: "Model choice per feature", desc: "Claude, Gemini, Grok or OpenAI, picked for cost, speed and language quality on each feature." },
      ],
      proof: "AI products shipped for clients under NDA and shown on a live call; UAE web work delivered for a Dubai B2B supplier.",
      faqs: [
        { q: "Can you build an Arabic AI assistant?", a: "Yes. We plan Arabic and English from the start, including right-to-left UI, and test each model's Arabic before we build on it." },
        { q: "Have you worked with UAE clients?", a: "Yes. We rebuilt the website of Infinity Bay Trading, a Dubai B2B supplier, and our AI products serve clients across markets." },
        { q: "Do you handle UAE data protection rules?", a: "We build to the requirements your legal advisers set for mainland, DIFC or ADGM. We don't give legal advice ourselves." },
        { q: "How long does an AI MVP take?", a: "Usually 6 to 12 weeks, depending on scope. Larger platforms take 3 to 6 months." },
        { q: "Can we see your AI work?", a: "Clients are under NDA, so we demo the products on a live call." },
      ],
    },

    in: {
      meta: {
        title: "AI SaaS Development Company in India",
        description:
          "AI SaaS development for Indian startups: generative AI products with credits and subscriptions, multi-LLM apps, AI hiring tools and copilots, priced in INR.",
        keywords:
          "AI SaaS development company India, AI app development company India, generative AI development India, LLM app development India, AI startup development India, AI MVP development India",
      },
      hero: {
        eyebrow: "Solutions · AI SaaS · India",
        title: "AI products for",
        highlight: "Indian startups.",
        subtitle:
          "AI SaaS that people pay for, built by an engineering team in India and quoted in INR on fixed scope.",
      },
      answer:
        "Futurise Solutions builds AI SaaS products for startups and businesses in India. We have shipped an AI music SaaS with credits and a library, a multi-LLM interview prep app on Claude, Gemini and Grok, an AI hiring platform and a real-time AI sales copilot. Our engineering team works in India, and we quote fixed scope in INR after a free call.",
      marketPoints: [
        { title: "Built to be affordable to run", desc: "AI costs can eat an Indian SaaS's margins. We pick models per feature and add credits and usage limits so each user stays profitable." },
        { title: "Payments that work in India", desc: "Subscriptions and credits wired to payment flows Indian customers already use." },
        { title: "Your data, your rules", desc: "We design data flows with India's DPDP Act in mind and work with your adviser on the details." },
        { title: "Same team, same time zone", desc: "Our engineering team is in India, working in Indian hours." },
      ],
      proof: "AI SaaS, multi-LLM, AI hiring and AI copilot products shipped for clients under NDA and shown on a live call.",
      faqs: [
        { q: "Is your team in India?", a: "Yes. Our engineering team works in India. The contracting company is registered in New Zealand." },
        { q: "How long does an AI MVP take?", a: "Usually 6 to 12 weeks, depending on scope. Larger platforms take 3 to 6 months." },
        { q: "How do you keep AI costs under control?", a: "We choose the right model for each feature and build credits, subscriptions and usage limits into the product." },
        { q: "How is it priced?", a: "A fixed-scope quote in INR after a free discovery call." },
        { q: "Can we see your AI products?", a: "They were built for clients under NDA, so we demo them on a live call." },
      ],
    },
  },

  /* ═══════════════════════════════ WHATSAPP CRM ═══════════════════════════════ */
  "whatsapp-crm": {
    ae: {
      meta: {
        title: "WhatsApp CRM Development in Dubai & the UAE",
        description:
          "WhatsApp CRM development for UAE businesses: bulk campaigns, approved templates, product catalogues and a shared live-chat inbox, in Arabic and English.",
        keywords:
          "WhatsApp CRM UAE, WhatsApp CRM Dubai, WhatsApp Business API UAE, WhatsApp marketing software Dubai, WhatsApp bulk messaging UAE, WhatsApp chatbot development Dubai, WhatsApp integration company UAE",
      },
      hero: {
        eyebrow: "Solutions · WhatsApp CRM · UAE",
        title: "Your UAE sales run on WhatsApp.",
        highlight: "Your CRM should too.",
        subtitle:
          "Campaigns, templates, catalogues and live chat in Arabic and English, inside the CRM your team already uses.",
      },
      answer:
        "Futurise Solutions builds WhatsApp CRM systems for businesses in Dubai and across the UAE: bulk campaigns to large contact lists, WhatsApp template management, product catalogues and a shared live-chat inbox, all inside your CRM on Meta's WhatsApp APIs. We have built and owned this module end to end inside a production CRM.",
      marketPoints: [
        { title: "Where UAE customers already talk", desc: "In the UAE, customers expect to message a business on WhatsApp. A CRM that handles those chats properly stops leads getting lost in personal phones." },
        { title: "Arabic and English templates", desc: "Approved message templates in both languages, so campaigns and replies read naturally to every customer." },
        { title: "One inbox for the team", desc: "Sales and support work from the same conversation history, linked to the customer record." },
        { title: "Catalogues inside the chat", desc: "Product catalogues customers can browse in WhatsApp, managed from the CRM." },
      ],
      proof: "WhatsApp module built and owned end to end inside a production CRM (client under NDA), shown on a live call; UAE web work delivered for a Dubai B2B supplier.",
      faqs: [
        { q: "Do you use the official WhatsApp Business API?", a: "Yes. Campaigns and templates are built on Meta's WhatsApp template and campaign APIs." },
        { q: "Can templates be in Arabic?", a: "Yes. We set up approved templates in Arabic and English." },
        { q: "Can you add WhatsApp to our existing CRM?", a: "Yes. The module we built lives inside an existing production CRM, so we integrate with yours rather than replacing it." },
        { q: "How is it priced?", a: "A fixed-scope quote after a free discovery call, based on the modules and the CRM you use." },
        { q: "Can we see it working?", a: "The CRM is under NDA, so we demo the module on a live call." },
      ],
    },
  },

  /* ═══════════════════════════════ WEB3 ═══════════════════════════════ */
  "web3-dapp-development": {
    ae: {
      meta: {
        title: "Blockchain Development Company in Dubai: Web3 & dApps",
        description:
          "Web3 and blockchain development for Dubai and UAE teams: NFT minting dApps, token staking, Solana SPL tokens and crypto payments, contracts and front end.",
        keywords:
          "blockchain development company Dubai, Web3 development Dubai, dApp development UAE, NFT development company Dubai, smart contract development Dubai, crypto payment integration UAE, Solana development Dubai, token development company UAE",
      },
      hero: {
        eyebrow: "Solutions · Web3 · Dubai & UAE",
        title: "Web3 products for",
        highlight: "Dubai builders.",
        subtitle:
          "NFT mints, staking, Solana tokens and crypto payments for teams building in the UAE. Contracts and front end, end to end.",
      },
      answer:
        "Futurise Solutions builds Web3 products for teams in Dubai and across the UAE: NFT minting dApps with WalletConnect, time-locked token staking with rewards, SPL token minting on Solana, and crypto payments inside real products such as a car-rental platform. We build the smart contracts and the front end; your licensing questions stay with your VARA, DIFC or ADGM advisers.",
      marketPoints: [
        { title: "Built for a regulated hub", desc: "Dubai's virtual-asset activity is regulated (VARA in Dubai; DIFC and ADGM in their free zones). We build the product and work with your legal advisers on what the licence requires. We don't give regulatory advice ourselves." },
        { title: "Contracts and front end together", desc: "Mint, staking and payment contracts integrated with the UI users click through, so the launch isn't held up between two teams." },
        { title: "Multi-chain where it helps", desc: "EVM chains for NFTs and staking, Solana for SPL tokens. We pick the chain for the product, not out of habit." },
        { title: "Web3 inside normal products", desc: "Crypto payments embedded in a full product with bookings, notifications and admin, not a standalone demo." },
      ],
      proof: "NFT, staking, Solana and crypto-payment builds walked through live on a call; UAE web work delivered for a Dubai B2B supplier.",
      faqs: [
        { q: "Do you work with Web3 teams in Dubai?", a: "Yes. We build Web3 products for teams in Dubai and the UAE, and we've delivered web work for a Dubai B2B supplier." },
        { q: "Do you handle VARA licensing?", a: "No. Licensing and compliance stay with your legal advisers; we build the product to the requirements they set." },
        { q: "Which chains do you build on?", a: "EVM chains for NFT minting and staking, and Solana for SPL token minting." },
        { q: "Can you add crypto payments to a normal app?", a: "Yes. We built crypto payments into a full car-rental platform, alongside bookings, notifications and an admin panel." },
        { q: "How is a Web3 project priced?", a: "Fixed scope after a free discovery call; contract work is scoped separately from the front end." },
      ],
    },
  },
};

/** Flattened list of every variant: [{ slug, market }]. */
export const variantList = Object.entries(marketVariants).flatMap(([slug, markets]) =>
  Object.keys(markets).map((market) => ({ slug, market }))
);
