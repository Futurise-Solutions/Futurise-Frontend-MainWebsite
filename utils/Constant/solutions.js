/**
 * Solutions — one page per niche, at /solutions/:slug.
 *
 * Each page owns ONE buyer query (meta.title / hero) in its main market. The other
 * queries it serves live in the section headings and FAQs.
 *
 * CONTENT RULES — these pages are public claims:
 *   - Every capability and build below comes from delivered work (the team's project
 *     portfolio, Aug 2026). Do not add features or outcomes that were not built.
 *   - Clients are NEVER named here. Builds are described by sector and region only; the
 *     work is shown on a live call instead ("Book a live demo").
 *   - No invented figures. Numbers come from the delivered work (e.g. 14 countries); the only
 *     commercial figure is the Shopify one, reported by the
 *     client and published as its own case study.
 *   - Token-sniping bots are deliberately absent from every page.
 *   - Timelines and pricing use the studio-wide facts (fixed-scope quote after a free
 *     discovery call; MVPs typically 6–12 weeks, larger platforms 3–6 months).
 *
 * Optional fields: `caseStudy` (a published case-study slug), `portfolio` ({ href, label }
 * linking the named version of a build on /portfolio, so the client is still not named
 * here), `endNote` (replaces the closing NDA line where that line is not true for the
 * page) and `link` on an FAQ ({ href, label }, shown under the answer).
 */

import { hotelBookingWebsiteSolution } from "./solutionHotel.js";
import { ragDevelopmentSolution } from "./solutionRag.js";

export const solutions = {
  /* ───────────────────────────── 1. Shopify ───────────────────────────── */
  "shopify-development-cro": {
    slug: "shopify-development-cro",
    name: "Shopify Development & CRO",
    market: "India",
    markets: ["India", "United States"],
    service: "web-development",
    country: "in",
    caseStudy: "shopify-cro-d2c-brand",

    meta: {
      title: "Shopify CRO Agency in India: Store Builds That Convert",
      description:
        "Shopify development and CRO for D2C brands in India and the US: product pages, cart drawers with upsells, one-click checkout, reviews and custom Liquid.",
      keywords:
        "Shopify CRO agency India, Shopify conversion rate optimisation, Shopify store development company India, Shopify cart drawer upsell, Shopify product page optimisation, Shopify Liquid developer, D2C Shopify agency",
    },

    hero: {
      eyebrow: "Solutions · Shopify Development & CRO",
      title: "Shopify stores built",
      highlight: "to convert.",
      subtitle:
        "We build and optimise Shopify stores for D2C brands. Product page, cart, upsells, checkout and reviews work as one buying path, and we keep improving it as the brand grows.",
    },

    answer:
      "Futurise Solutions is a Shopify development and CRO studio working with D2C brands in India and the US. We rework product pages, build cart drawers with upsells, shorten checkout and add reviews, all inside the theme in custom Liquid. Then we stay on to look after the store. One D2C store went from about ₹5,000 a month to about ₹1,00,000 a month (₹3,00,000 in its latest quarter).",

    capabilities: [
      { title: "Conversion rate optimisation", desc: "Product page, cart, upsell and checkout worked on as a single path from interest to order, not as isolated tweaks." },
      { title: "Custom cart drawers & upsells", desc: "Slide-out carts that keep shoppers on the page, with relevant upsells inside the cart." },
      { title: "Product page (PDP) work", desc: "Buy-box and layout rework in custom Liquid sections; React product pages fed by Shopify GraphQL where a store needs more than the theme can do." },
      { title: "Checkout & reviews", desc: "One-click checkout to remove steps before payment, and Judge.me reviews integrated as on-page social proof." },
      { title: "Theme customisation", desc: "Custom Liquid sections and snippets instead of stacking apps, so the store stays fast and maintainable." },
      { title: "Store builds & ongoing care", desc: "Complete storefronts with catalogue, cart, checkout and app setup, plus retainers for updates and maintenance." },
    ],

    builds: [
      {
        title: "Conversion work for a D2C health & wellness brand",
        client: "D2C health & wellness brand, India",
        problem: "The store made about ₹5,000 a month; product page, cart and checkout had never been designed as one buying path.",
        built: ["Product page and buy-box rework", "Custom cart drawer with in-cart upsells", "One-click checkout", "Judge.me reviews on product pages", "Ongoing updates and maintenance"],
        stack: ["Shopify", "Liquid", "Judge.me"],
        outcome: "₹3,00,000 in revenue in the latest quarter. That's about ₹1,00,000 a month, roughly twenty times where it started. The full story is in the case study.",
      },
      {
        title: "Custom React product page on a Shopify storefront",
        client: "E-commerce brand (name under NDA)",
        problem: "The product page needed a richer experience than the theme could provide.",
        built: ["Product page built in React", "Product data fetched from the client's Shopify GraphQL API", "Page integrated into the live Shopify storefront"],
        stack: ["React", "Shopify GraphQL", "Shopify"],
        outcome: "Live on the client's Shopify store.",
      },
    ],

    stack: ["Shopify", "Liquid", "Shopify GraphQL", "React", "Judge.me", "Shopify apps"],

    faqs: [
      { q: "What does a Shopify CRO agency actually change?", a: "The steps between a visit and an order: the product page, the cart, upsells, checkout and the social proof around them. We work on them as one path and build the changes into the theme rather than adding more apps." },
      { q: "Do you work on existing Shopify stores?", a: "Yes. Most CRO work is on stores that are already trading. We work inside the current theme with custom Liquid sections and snippets, so the store keeps selling while it improves." },
      { q: "Can you build a complete Shopify store from scratch?", a: "Yes. We build full storefronts: catalogue, cart, checkout, theme customisation and app setup such as Judge.me reviews." },
      { q: "Do you work with brands outside India?", a: "Yes. Our Shopify work is mainly for Indian D2C brands, and we also take on US stores; the method is the same." },
      { q: "How is a Shopify project priced?", a: "As a fixed-scope quote after a free discovery call. Ongoing optimisation and maintenance run as a retainer, scoped to what the store needs." },
      { q: "Can we see stores you've worked on?", a: "Our clients are under NDA, so we don't name them publicly. We'll walk you through the product pages, cart drawers, upsells and checkout on a live call." },
    ],

    related: ["whatsapp-crm", "ai-saas-development", "chrome-extension-development"],
  },

  /* ─────────────────────── 2. Hospital Management System ─────────────────────── */
  "hospital-management-system": {
    slug: "hospital-management-system",
    name: "Hospital Management System",
    market: "India",
    markets: ["India"],
    service: "web-development",
    country: "in",

    meta: {
      title: "Hospital Management System Development (HMS & IPD)",
      description:
        "Hospital management system development: appointments, billing, doctor, nurse, pharmacy and lab modules, IPD admission to discharge and a patient app.",
      keywords:
        "hospital management system development, HMS software development company India, IPD management software, hospital software development, clinic management software development, nurse duty management, bed management software, patient app development",
    },

    hero: {
      eyebrow: "Solutions · Healthcare Software",
      title: "Hospital management software",
      highlight: "built for the ward.",
      subtitle:
        "Custom HMS and IPD software, from appointments to discharge. Keyboard-first screens for doctors and nurses, an admin panel and a patient app.",
    },

    answer:
      "Futurise Solutions builds custom hospital management systems for hospitals and clinics in India. We have delivered HMS modules for appointments, billing, doctors, nurses, pharmacy and lab; a full IPD flow from admission to discharge with bed and nurse-duty management; keyboard-first clinical screens; Gemini-assisted features; and an Expo patient app for bookings and prescriptions.",

    capabilities: [
      { title: "Core HMS modules", desc: "Appointments, billing, doctor, nurse, pharmacy and lab, each connected end to end to the backend." },
      { title: "IPD: admission to discharge", desc: "Admission, treatment and discharge, with bed management, nurse-duty scheduling and a full discharge process." },
      { title: "Clinical care logs", desc: "Medicine-by-medicine nursing care tracking and doctor-visit logs: who visited, when, and what they prescribed." },
      { title: "Keyboard-first clinical UX", desc: "Clinical staff rarely reach for a mouse, so doctor and nurse screens run on keyboard shortcuts. The doctor panel most of all." },
      { title: "Role-customisable interface", desc: "Doctors, nurses and other roles can tailor the interface to their own workflow." },
      { title: "Patient mobile app", desc: "An Expo (React Native) app for patients to book appointments and download prescriptions." },
    ],

    builds: [
      {
        title: "A keyboard-first hospital management system",
        client: "Hospital (name under NDA)",
        problem: "Clinical staff needed software they could use at speed across appointments, billing, pharmacy and lab, without switching to the mouse.",
        built: ["Appointments, billing, doctor, nurse, pharmacy and lab modules", "Keyboard events and shortcuts across clinical panels", "Per-role customisable UI", "Google Gemini integrated in several workflows", "Admin dashboard in React + TailwindCSS"],
        stack: ["React", "TailwindCSS", "Google Gemini", "REST APIs"],
        outcome: "Production-oriented HMS with keyboard-first clinical panels and an admin dashboard.",
      },
      {
        title: "In-patient (IPD) management from admission to discharge",
        client: "Hospital (name under NDA)",
        problem: "Beds, medication rounds, doctor visits and discharge all needed to be tracked in one place.",
        built: ["Admission → treatment → discharge flow", "Bed assignment and tracking", "Nurse-duty scheduling", "Medicine-level nursing care log", "Doctor-visit log with prescriptions", "Discharge management and admin panel"],
        stack: ["React", "REST APIs"],
        outcome: "End-to-end IPD tracking with bed, nurse-duty and discharge management.",
      },
    ],

    stack: ["React", "TailwindCSS", "Expo (React Native)", "Google Gemini", "REST APIs"],

    faqs: [
      { q: "Can you build a custom hospital management system instead of an off-the-shelf HMS?", a: "Yes. We build HMS software around how your hospital actually works: the modules you need, your roles and your workflows. You don't have to bend your process to fit a packaged product." },
      { q: "Which modules have you built?", a: "Appointments, billing, doctor, nurse, pharmacy and lab, plus a full IPD flow with bed management, nurse-duty scheduling, nursing care logs, doctor-visit logs and discharge, and an admin panel." },
      { q: "Why keyboard-first?", a: "Doctors and nurses work fast and rarely use a mouse. Keyboard shortcuts across the clinical screens, especially the doctor panel, keep them moving." },
      { q: "Is there a patient app?", a: "We have built an Expo (React Native) patient app where patients book appointments and download their prescriptions." },
      { q: "How is an HMS project priced and how long does it take?", a: "We give a fixed-scope quote after a free discovery call. As a guide, an MVP usually takes 6 to 12 weeks and a larger platform 3 to 6 months, depending on the modules." },
      { q: "Can we see the system?", a: "The hospitals we built for are under NDA, so we don't publish screenshots. We'll walk you through the working system on a live call." },
    ],

    related: ["ai-recruitment-platform", "whatsapp-crm", "ai-saas-development"],
  },

  /* ───────────────────────────── 3. WhatsApp CRM ───────────────────────────── */
  "whatsapp-crm": {
    slug: "whatsapp-crm",
    name: "WhatsApp CRM",
    market: "India",
    markets: ["India"],
    service: "web-development",
    country: "in",

    meta: {
      title: "WhatsApp CRM Development: Campaigns, Templates, Live Chat",
      description:
        "WhatsApp CRM development: bulk campaigns, template management, product catalogues and a live chat window, linked to your CRM through Meta's WhatsApp APIs.",
      keywords:
        "WhatsApp CRM development, WhatsApp Business API integration company India, WhatsApp bulk campaign software development, WhatsApp template management, WhatsApp catalogue management, WhatsApp chat CRM",
    },

    hero: {
      eyebrow: "Solutions · WhatsApp CRM",
      title: "WhatsApp, run like",
      highlight: "a CRM.",
      subtitle:
        "Bulk campaigns, approved templates, product catalogues and live chat, all inside your CRM. Sales and support work from one place.",
    },

    answer:
      "Futurise Solutions builds WhatsApp CRM systems for businesses in India: bulk campaign messaging to large contact lists, WhatsApp message template management, product catalogue management and a full live-chat window, all tied into CRM workflows through Meta's WhatsApp template and campaign APIs. We have owned this module end to end inside a production CRM.",

    capabilities: [
      { title: "Bulk campaigns", desc: "Send WhatsApp campaigns to large contact lists from inside the CRM." },
      { title: "Template management", desc: "Create and manage WhatsApp message templates for campaigns and replies." },
      { title: "Catalogue management", desc: "Manage the product catalogues customers browse inside WhatsApp." },
      { title: "Live chat window", desc: "A full chat interface with conversation management for sales and support teams." },
      { title: "CRM workflows", desc: "Messaging tied into the surrounding CRM flows, so every conversation sits next to the customer record." },
    ],

    builds: [
      {
        title: "The WhatsApp module of a production CRM",
        client: "CRM platform (name under NDA)",
        problem: "The CRM needed its whole messaging side built and owned end to end: campaigns, templates, catalogues and live conversations.",
        built: ["Bulk campaign messaging", "Template creation and management", "Catalogue management", "Chat window with conversation management", "CRM workflow integration"],
        stack: ["React", "Material UI", "Meta WhatsApp APIs", "Axios", "React Hook Form"],
        outcome: "WhatsApp module owned end to end inside a production CRM.",
      },
    ],

    stack: ["React", "Material UI (MUI)", "Meta WhatsApp template & campaign APIs", "REST APIs", "React Hook Form"],

    faqs: [
      { q: "What is a WhatsApp CRM?", a: "A CRM where WhatsApp is a working channel, not a separate app: campaigns, templates, catalogues and live chats run inside the same system as your customer records and workflows." },
      { q: "Do you build on the official WhatsApp Business APIs?", a: "Yes. Campaigns and templates are built on Meta's WhatsApp template and campaign APIs." },
      { q: "Can you add WhatsApp to our existing CRM?", a: "Yes. The module we built lives inside an existing production CRM. We integrate with your CRM's APIs rather than replacing it." },
      { q: "Can it send bulk campaigns?", a: "Yes, to large contact lists, using approved message templates." },
      { q: "Do we need Meta business verification?", a: "To use the API you need a Meta business portfolio and a WhatsApp Business Account to hold your number. Verification matters for volume: Meta caps how many people a business can message outside an open customer service window in any rolling 24 hours, and verifying the business is one of the ways to raise that cap. Plan the first bulk campaign around the cap your account is on, not the size of your contact list." },
      { q: "Which phone number does it use?", a: "A business phone number registered to your WhatsApp Business Account. Keep that account in your own business portfolio rather than a provider's, so the number stays with you if you ever change suppliers. The CRM module connects to the account through Meta's APIs." },
      { q: "How does template approval work?", a: "Meta reviews every template when it is created or edited. Its documentation says review can take up to 24 hours, and a rejected template can't be sent. Templates are created and managed inside the CRM module, and bulk campaigns go out on approved templates only. Meta also puts each template in a category (marketing, utility or authentication) that sets its price, and can recategorise a template later, so check the category before a large send." },
      { q: "Do contacts need to opt in?", a: "Yes. Meta's policy says you may message people only if they have given you their number and opted in to hearing from your business, and you must honour requests to stop, whether they come on WhatsApp or elsewhere. Opt-in can be collected on your website, by SMS, through an IVR call or in person on paper. Campaigns go to the contact lists in your CRM, so keep those lists to people who have opted in, and ask separately for order updates and for offers." },
      { q: "How is it priced?", a: "As a fixed-scope quote after a free discovery call, based on the modules and the CRM you're integrating with." },
      { q: "What does WhatsApp cost to run once it's built?", a: "Meta bills per delivered template message, at a rate set by the template's category and the recipient's country calling code. Replies inside the 24-hour customer service window are free, as is a utility template sent while that window is open, so the bill depends mostly on how many marketing and out-of-window messages you send. Those charges are billed by Meta, or by a Meta partner if you use one, separately from the cost of building the module. Take current rates from Meta's rate card for your country and currency.", link: { href: "/blog/whatsapp-business-api-pricing-and-setup-guide", label: "WhatsApp Business API pricing and setup guide" } },
      { q: "Can we see it working?", a: "The CRM is under NDA, so we demo the module on a live call instead of publishing screenshots." },
    ],

    related: ["shopify-development-cro", "hospital-management-system", "ai-saas-development"],
  },

  /* ───────────────────────────── 4. AI SaaS ───────────────────────────── */
  "ai-saas-development": {
    slug: "ai-saas-development",
    name: "AI SaaS Development",
    market: "United States",
    markets: ["United States", "India", "New Zealand"],
    service: "ai-ml-solutions",
    country: "us",

    meta: {
      title: "AI SaaS Development Company: From MVP to Paying Users",
      description:
        "AI SaaS development: generative apps with accounts, credits and billing, multi-LLM apps on Claude, Gemini and Grok, AI interview tools and copilots.",
      keywords:
        "AI SaaS development company, build an AI SaaS MVP, multi LLM app development, generative AI product development, AI music generator development, AI interview app development, LLM app development company USA",
    },

    hero: {
      eyebrow: "Solutions · AI SaaS",
      title: "AI products people",
      highlight: "pay for.",
      subtitle:
        "We turn a prompt box into a real SaaS, with accounts, credits, billing and history, on top of the right model (or a few of them).",
    },

    answer:
      "Futurise Solutions is an AI SaaS development company for founders in the US, India and New Zealand. We have shipped an AI music generation SaaS with credits and a track library, a multi-LLM interview-prep app combining Claude, Gemini and Grok, an AI hiring platform with AI interviews, and a real-time AI sales copilot. We are model-agnostic and build the whole product, not just the prompt.",

    capabilities: [
      { title: "Generative SaaS products", desc: "Prompt-driven generation wrapped in a real product: accounts, history, library, playback and download." },
      { title: "Credits & subscriptions", desc: "SaaS monetisation with credits, subscriptions and usage limits." },
      { title: "Multi-LLM apps", desc: "Products that combine Claude, Gemini and Grok, each used where it is strongest." },
      { title: "AI analysis & scoring", desc: "AI interviews, resume analysis and performance analysis that turn conversations into decisions." },
      { title: "AI copilots", desc: "Real-time assistants with live transcription, suggestions and automated follow-ups." },
    ],

    builds: [
      {
        title: "A Suno-style AI music generation SaaS",
        client: "AI music startup (name under NDA)",
        problem: "Turn text prompts into songs inside a product people subscribe to.",
        built: ["Music generation from text prompts", "Accounts, generation history and library", "Playback and download", "Subscription and credits model with usage limits"],
        stack: ["React / Next.js", "Node.js / Python API", "Music generation model API"],
        outcome: "A full SaaS-style AI music product.",
      },
      {
        title: "A multi-LLM interview preparation app",
        client: "EdTech product (name under NDA)",
        problem: "Help candidates practise interviews and understand how they performed.",
        built: ["Guided interview preparation", "Response and performance analysis", "Claude, Gemini and Grok combined"],
        stack: ["React", "Node.js", "Claude", "Gemini", "Grok"],
        outcome: "Working AI interview-prep and analysis tool.",
      },
    ],

    stack: ["React", "Next.js", "Node.js", "Python", "OpenAI", "Anthropic Claude", "Google Gemini", "Grok", "LangChain", "Vector databases"],

    faqs: [
      { q: "Can you build an AI SaaS MVP from an idea?", a: "Yes. We build the whole product: model integration, accounts, billing and credits, history and the UI. Not only the AI call." },
      { q: "Which AI models do you use?", a: "We are model-agnostic. We have shipped products on Claude, Gemini, Grok and OpenAI, and combine several where that gives better results." },
      { q: "How do you handle usage and billing?", a: "With subscriptions, credits and usage limits built into the product, so AI costs stay tied to what customers pay." },
      { q: "How long does an AI SaaS MVP take?", a: "Usually 6 to 12 weeks for an MVP, depending on scope. Larger platforms take 3 to 6 months. We quote fixed scope after a free discovery call." },
      { q: "Do you work with US founders?", a: "Yes. US founders are a primary market; the company is registered in New Zealand and works with US clients remotely on fixed-scope projects." },
      { q: "Can we see what you've built?", a: "Our clients are under NDA, so we demo the products on a live call." },
    ],

    related: ["rag-development", "chrome-extension-development", "ai-recruitment-platform"],
  },

  /* ───────────────────────────── 5. Chrome extensions ───────────────────────────── */
  "chrome-extension-development": {
    slug: "chrome-extension-development",
    name: "Chrome Extension Development",
    market: "United States",
    markets: ["United States", "Global"],
    service: "web-development",
    country: "us",

    meta: {
      title: "Chrome Extension Development Company for AI Tools",
      description:
        "Chrome extension development: AI meeting copilots with live transcription, HubSpot and Google Calendar integrations, and a virtual try-on extension.",
      keywords:
        "Chrome extension development company, AI Chrome extension development, hire Chrome extension developer, browser extension development, sales copilot Chrome extension, HubSpot Chrome extension, virtual try-on extension",
    },

    hero: {
      eyebrow: "Solutions · Chrome Extensions",
      title: "Chrome extensions that",
      highlight: "work where you work.",
      subtitle:
        "AI copilots inside your meetings and tools that run on any website, connected to the CRM, calendar and tasks your team already uses.",
    },

    answer:
      "Futurise Solutions develops Chrome extensions for startups and teams in the US and worldwide. We have built Sales Buddy, an AI sales copilot with live transcription, answer and objection suggestions, automatic meeting summaries to Google Calendar, follow-up booking and HubSpot sync, and Try-It, a virtual clothing try-on extension that works on any online store.",

    capabilities: [
      { title: "AI meeting copilots", desc: "Live transcription, suggested answers and objection handling during calls." },
      { title: "Context & memory", desc: "Pulls the last meeting's summary into the next call and saves a new summary to Google Calendar at the end." },
      { title: "Workflow automation", desc: "Books follow-up meetings, creates Google Tasks and pushes meeting data to HubSpot." },
      { title: "Works on any site", desc: "Extensions that activate on third-party websites, such as a try-on layer for any online clothing store." },
      { title: "Google sign-in", desc: "Google login with Calendar and Tasks scopes, so the extension acts on the user's own accounts." },
    ],

    builds: [
      {
        title: "Sales Buddy: an AI meeting copilot",
        client: "Sales-tech product (name under NDA)",
        problem: "Sales reps lose context between calls and spend time after every meeting on notes and follow-ups.",
        built: ["Previous-meeting context at the start of each call", "Live transcription", "Real-time answer and objection suggestions", "Auto summaries saved to Google Calendar", "Automatic follow-up booking", "HubSpot sync, Google login and Google Tasks"],
        stack: ["Chrome Extension APIs", "LLMs", "Google Calendar & Tasks", "HubSpot"],
        outcome: "Full sales copilot with live guidance and CRM/calendar automation.",
      },
      {
        title: "Try-It: virtual clothing try-on",
        client: "Fashion-tech product (name under NDA)",
        problem: "Shoppers can't see how clothes look on them before buying online.",
        built: ["Activates on online clothing stores", "Virtual try-on of items before purchase", "Runs natively in the browser"],
        stack: ["Chrome Extension (JavaScript)", "Image processing / AI try-on"],
        outcome: "Working try-on extension for online stores.",
      },
    ],

    stack: ["Chrome Extension APIs", "JavaScript", "React", "LLMs", "Google APIs", "HubSpot API"],

    faqs: [
      { q: "Do you build AI Chrome extensions?", a: "Yes. That includes a real-time AI sales copilot with live transcription, suggestions, summaries and automatic follow-ups." },
      { q: "Can an extension integrate with HubSpot or Google Calendar?", a: "Yes. Sales Buddy pushes meeting data to HubSpot, saves summaries to Google Calendar and creates Google Tasks after Google sign-in." },
      { q: "Can an extension work on websites we don't own?", a: "Yes. Try-It activates on third-party online stores to add a virtual try-on layer." },
      { q: "Will you publish it to the Chrome Web Store?", a: "Yes. We can prepare the extension and its Chrome Web Store listing with you." },
      { q: "How is a Chrome extension project priced?", a: "Fixed scope, quoted after a free discovery call." },
      { q: "Can we see the extensions?", a: "They were built for clients under NDA; we demo them on a live call." },
    ],

    related: ["ai-saas-development", "telegram-bot-development", "shopify-development-cro"],
  },

  /* ───────────────────────────── 6. Telegram bots ───────────────────────────── */
  "telegram-bot-development": {
    slug: "telegram-bot-development",
    name: "Telegram Bot Development",
    market: "Global",
    markets: ["Global"],
    service: "ai-ml-solutions",
    country: null,

    meta: {
      title: "Telegram Bot Development: AI Assistants & Group Bots",
      description:
        "Telegram bot development: AI assistants that talk by voice and text, plus group bots with moderation, welcome messages, rules and admin tools.",
      keywords:
        "Telegram bot development company, AI Telegram bot, Telegram group management bot development, Telegram voice bot, custom Telegram bot developer, Telegram moderation bot",
    },

    hero: {
      eyebrow: "Solutions · Telegram Bots",
      title: "Telegram bots that",
      highlight: "listen and talk.",
      subtitle:
        "AI assistants that understand voice and text, and group managers that moderate with judgement instead of keyword rules.",
    },

    answer:
      "Futurise Solutions builds custom Telegram bots worldwide. Our AI Telegram assistant talks by voice and text, using an LLM for conversation with speech-to-text and text-to-speech, and manages groups like Rose bot does: moderation, welcome messages, rules, anti-spam and admin tools. The AI layer on top means replies and moderation follow meaning, not fixed keywords.",

    capabilities: [
      { title: "Voice + text AI", desc: "Conversations by voice message and text, with speech-to-text and text-to-speech." },
      { title: "Group management", desc: "Moderation, welcome messages, rules, admin commands and member management." },
      { title: "AI-driven moderation", desc: "Moderation and replies that understand meaning, on top of standard rule-based tools." },
      { title: "Automation", desc: "Automated responses and group housekeeping." },
    ],

    builds: [
      {
        title: "An AI voice assistant and group manager",
        client: "Telegram community product (name under NDA)",
        problem: "Group admins needed Rose-style moderation plus an assistant members could talk to naturally.",
        built: ["Voice and text conversation powered by an LLM", "TTS / STT for voice messages", "Welcome messages, rules and admin tools", "Anti-spam and member management", "Automated responses and housekeeping"],
        stack: ["Telegram Bot API", "Python / Node.js", "LLM", "TTS / STT"],
        outcome: "Full-featured assistant and moderation bot.",
      },
    ],

    stack: ["Telegram Bot API", "Node.js", "Python", "LLMs", "Speech-to-text", "Text-to-speech"],

    faqs: [
      { q: "Can a Telegram bot reply with voice?", a: "Yes. Our assistant understands voice messages and replies with voice, using speech-to-text and text-to-speech around an LLM." },
      { q: "How is it different from Rose bot?", a: "It covers the same basics (moderation, welcomes, rules, admin tools) and adds AI, so it can hold a conversation and moderate by meaning instead of keywords." },
      { q: "Can you build a bot for our community or business?", a: "Yes. We build custom Telegram bots around your group's rules, workflows and integrations." },
      { q: "Which languages and stacks do you use?", a: "Node.js or Python with the Telegram Bot API, and the LLM and voice services that fit your budget." },
      { q: "How is a Telegram bot priced?", a: "Fixed scope, quoted after a free discovery call." },
      { q: "Can we try the bot?", a: "We demo it live on a call." },
    ],

    related: ["ai-saas-development", "web3-dapp-development", "chrome-extension-development"],
  },

  /* ───────────────────────────── 7. Web3 ───────────────────────────── */
  "web3-dapp-development": {
    slug: "web3-dapp-development",
    name: "Web3 dApp Development",
    market: "United States",
    markets: ["United States", "United Arab Emirates", "Global"],
    service: "blockchain-development",
    country: "us",

    meta: {
      title: "Web3 dApp Development: NFT Minting, Staking & Solana",
      description:
        "Web3 dApp development: NFT minting with WalletConnect, time-locked staking with rewards, SPL token minting on Solana and crypto payments in real products.",
      keywords:
        "Web3 dApp development company, NFT minting dApp development, token staking platform development, Solana token development company, SPL token creation, crypto payment integration, WalletConnect integration",
    },

    hero: {
      eyebrow: "Solutions · Web3",
      title: "Web3 products, from contract",
      highlight: "to checkout.",
      subtitle:
        "NFT mints, staking, Solana tokens and crypto payments. We build the smart contracts and the front end people actually use.",
    },

    answer:
      "Futurise Solutions builds Web3 dApps for teams in the US, UAE and worldwide: NFT minting dApps in React with WalletConnect and live mint state, time-locked token staking with rewards, SPL token minting on Solana, and crypto payments inside a full car-rental platform. We build both the smart contracts and the front end, end to end.",

    capabilities: [
      { title: "NFT minting dApps", desc: "Connect → mint → confirm, with WalletConnect, MetaMask and live supply, price and progress." },
      { title: "Staking & lock-to-earn", desc: "Time-locked staking contracts with reward calculation by amount and duration, and unlock on maturity." },
      { title: "Solana tokens", desc: "SPL token creation and minting on Solana." },
      { title: "Crypto payments", desc: "Wallet-based crypto payment flows inside real products, with bookings and admin." },
      { title: "Smart contracts", desc: "ERC-721 / ERC-1155 mint contracts and Solidity staking contracts integrated with the UI." },
    ],

    builds: [
      {
        title: "An NFT minting dApp",
        client: "NFT project (name under NDA)",
        problem: "Collectors needed a clear connect-and-mint experience with live mint progress.",
        built: ["Wallet connection (MetaMask, WalletConnect)", "Minting from the dApp", "Live supply, price and mint progress", "Smart contract integration"],
        stack: ["React", "ethers.js / wagmi", "WalletConnect", "ERC-721 / ERC-1155"],
        outcome: "Full dApp with wallet connection and minting.",
      },
      {
        title: "Token lock & rewards (staking)",
        client: "Token project (name under NDA)",
        problem: "Holders needed to lock tokens for a fixed period and earn rewards.",
        built: ["Time-locked staking", "Reward calculation by amount and duration", "Unlock and withdraw on maturity", "React front end with wallet integration"],
        stack: ["Solidity", "React", "ethers.js / web3.js"],
        outcome: "Working staking / lock-to-earn mechanism.",
      },
      {
        title: "A car-rental platform with crypto payments",
        client: "Mobility startup (name under NDA)",
        problem: "Customers needed to book and pay for car rentals in cryptocurrency.",
        built: ["Booking lifecycle: availability → booking → active rental → return", "Pickup and return logistics", "Crypto payment flow", "Notifications", "Admin panel for fleet, bookings, users and payments"],
        stack: ["React / Next.js", "Node.js / Express", "Web3 wallet payments", "JWT auth"],
        outcome: "Full production-style build with admin and notifications.",
      },
    ],

    stack: ["Solidity", "ethers.js", "wagmi", "WalletConnect", "@solana/web3.js", "SPL Token", "React", "Next.js", "Node.js"],

    faqs: [
      { q: "Can you build an NFT minting website?", a: "Yes. A React dApp with wallet connection, minting and live supply, price and progress, connected to an ERC-721 or ERC-1155 contract." },
      { q: "Do you build staking platforms?", a: "Yes. We have built time-locked staking with rewards calculated by amount and lock duration, and withdrawal at maturity." },
      { q: "Do you work on Solana?", a: "Yes, including SPL token creation and minting with @solana/web3.js." },
      { q: "Can you add crypto payments to a normal product?", a: "Yes. We built crypto payments into a full car-rental platform, alongside bookings, notifications and an admin panel." },
      { q: "How is a Web3 project priced?", a: "Fixed scope, quoted after a free discovery call. Contract work is scoped separately from the front end." },
      { q: "Can we see your Web3 work?", a: "Our Web3 clients are under NDA; we walk through the dApps on a live call." },
    ],

    related: ["telegram-bot-development", "ai-saas-development", "server-management-platform"],
  },

  /* ───────────────────────────── 8. AI recruitment ───────────────────────────── */
  "ai-recruitment-platform": {
    slug: "ai-recruitment-platform",
    name: "AI Recruitment Platform",
    market: "India",
    markets: ["India", "United States"],
    service: "ai-ml-solutions",
    country: "in",

    meta: {
      title: "AI Recruitment Software Development with AI Interviews",
      description:
        "AI recruitment platform development: recruiter, candidate and admin flows, AI interviews, resume analysis and shortlisting in one hiring product.",
      keywords:
        "AI recruitment software development, AI interview platform development, AI hiring platform, resume screening software development, applicant tracking system development, HR tech development company India",
    },

    hero: {
      eyebrow: "Solutions · HR Tech",
      title: "Hiring platforms where AI",
      highlight: "runs the first round.",
      subtitle:
        "Recruiter, candidate and admin flows with AI interviews, resume analysis and shortlisting. The whole hiring journey in one product.",
    },

    answer:
      "Futurise Solutions builds AI recruitment platforms for HR-tech companies in India and the US. We have delivered a hiring platform with separate recruiter, candidate and admin flows, AI-conducted interviews, resume submission and automated resume analysis, and candidate shortlisting, with real-time updates and Google sign-in. It runs from submission to interview to analysis to shortlist.",

    capabilities: [
      { title: "Recruiter flow", desc: "An end-to-end workspace for recruiters to run roles and candidates." },
      { title: "Candidate flow", desc: "Application, resume submission and AI interviews for candidates." },
      { title: "AI interviews", desc: "Interviews conducted by AI as the first round." },
      { title: "Resume analysis & shortlisting", desc: "Automated resume analysis that feeds a shortlist." },
      { title: "Admin & real-time", desc: "A central admin panel, real-time updates over Socket.IO and Google OAuth." },
    ],

    builds: [
      {
        title: "An AI-powered hiring platform",
        client: "HR-tech company (name under NDA)",
        problem: "Screening and first-round interviews consumed recruiter time before the right candidates surfaced.",
        built: ["Recruiter, candidate and admin flows", "AI-conducted interviews", "Resume submission and analysis", "Shortlisting from the analysis", "Real-time updates and Google OAuth"],
        stack: ["React", "Material UI", "Redux (Saga + Persist)", "Socket.IO", "Google OAuth", "REST APIs"],
        outcome: "Full hiring platform with AI interviews and resume-driven shortlisting.",
      },
    ],

    stack: ["React", "Material UI (MUI)", "Redux Saga", "Socket.IO", "Google OAuth", "LLMs", "REST APIs"],

    faqs: [
      { q: "Can AI conduct the first interview?", a: "Yes. The platform we built runs AI-conducted interviews as part of the candidate flow, then feeds the results into analysis and shortlisting." },
      { q: "Does it analyse resumes?", a: "Yes. Candidates submit resumes, the platform analyses them automatically, and recruiters shortlist from that analysis." },
      { q: "Is this an ATS?", a: "It covers the core hiring workflow (roles, candidates, interviews, analysis, shortlist) and can grow into a full applicant tracking system." },
      { q: "Can you build this for our HR product?", a: "Yes. We build the recruiter, candidate and admin experiences around your process and integrate the AI steps where they save the most time." },
      { q: "How is it priced?", a: "Fixed scope after a free discovery call. An MVP usually takes 6 to 12 weeks." },
      { q: "Can we see it?", a: "The platform is under NDA; we demo it on a live call." },
    ],

    related: ["ai-saas-development", "hospital-management-system", "chrome-extension-development"],
  },

  /* ───────────────────────────── 9. Server management ───────────────────────────── */
  "server-management-platform": {
    slug: "server-management-platform",
    name: "Server Management Platform",
    market: "Global",
    markets: ["Global"],
    service: "web-development",
    country: null,

    meta: {
      title: "Server Management Platform & VPS Control Panel Development",
      description:
        "A custom hosting control panel built in Next.js: provision servers across 14 countries, reinstall the OS, suspend and terminate, with Stripe billing.",
      keywords:
        "server management panel development, VPS provisioning platform development, hosting control panel development, WHMCS alternative development, server lifecycle management software, cloud server provisioning dashboard",
    },

    hero: {
      eyebrow: "Solutions · Infrastructure Platforms",
      title: "A control panel for servers",
      highlight: "in 14 countries.",
      subtitle:
        "Provision, reinstall, suspend and terminate. The whole server lifecycle, with billing, in one dashboard your customers can use.",
    },

    answer:
      "Futurise Solutions builds custom server management platforms for hosting and infrastructure companies. We have delivered a Next.js and TypeScript control panel that provisions servers across 14 countries and handles the full lifecycle: provisioning, OS reinstalls, suspension and termination. Stripe handles payments.",

    capabilities: [
      { title: "Multi-country provisioning", desc: "Spin up servers on demand across 14 countries." },
      { title: "OS reinstall", desc: "Reinstall the operating system on a server from the panel." },
      { title: "Suspend & terminate", desc: "Suspend running servers and terminate them, with the rest of the lifecycle operations." },
      { title: "Billing", desc: "Stripe payments built into the platform." },
      { title: "Customer dashboard", desc: "A Next.js + TypeScript dashboard with Material UI and Redux Toolkit." },
    ],

    builds: [
      {
        title: "A server management platform across 14 countries",
        client: "Hosting provider (name under NDA)",
        problem: "Customers needed to manage servers in many regions from one place, with billing built in.",
        built: ["Provisioning across 14 countries", "OS reinstallation", "Server suspension and termination", "Lifecycle management", "Stripe payments"],
        stack: ["Next.js", "TypeScript", "Material UI", "Redux Toolkit", "Stripe", "REST APIs"],
        outcome: "Production server-management platform spanning 14 countries.",
      },
    ],

    stack: ["Next.js", "TypeScript", "Material UI (MUI)", "Redux Toolkit", "Stripe", "REST APIs"],

    faqs: [
      { q: "Can you build a custom hosting control panel?", a: "Yes. We built a Next.js control panel that provisions servers in 14 countries and handles reinstall, suspension and termination." },
      { q: "Is it a WHMCS alternative?", a: "It can be. A custom panel gives you your own provisioning flows, billing and customer experience instead of a generic one." },
      { q: "Does it include billing?", a: "Yes. Stripe payments are built in." },
      { q: "Which providers can it connect to?", a: "We integrate with your infrastructure providers' APIs; the platform we built provisions across 14 countries." },
      { q: "How is it priced?", a: "Fixed scope after a free discovery call." },
      { q: "Can we see the panel?", a: "It's under NDA; we demo it on a live call." },
    ],

    related: ["web3-dapp-development", "ai-saas-development", "telegram-bot-development"],
  },

  /* ─────────────────────── 10. Property management software ─────────────────────── */
  // The PropTech dashboard on /portfolio and the platform rebuild in the saas-platform-scale
  // case study share sector and region (PropTech, USA & India) and may be one engagement, so
  // they are described together as one build and never counted as two projects. Real-estate
  // listing and lead-generation websites are not property management software: not listed here.
  "property-management-software": {
    slug: "property-management-software",
    name: "Property Management Software",
    market: "United States",
    markets: ["United States", "India", "Global"],
    service: "web-development",
    country: "us",
    caseStudy: "saas-platform-scale",
    portfolio: { href: "/portfolio#homies-proptech", label: "See the dashboard in our portfolio" },
    endNote: "The property dashboard we built is in our portfolio, and the platform work is a published case study. We walk you through the working software live on a call.",

    meta: {
      title: "Custom Property Management Software Development",
      description:
        "Custom property management software development: income, expense and occupancy dashboards, multi-tenant PropTech SaaS and a straight build vs buy answer.",
      keywords:
        "custom property management software development, property management software development company, building property management software, custom property management system, build to rent software, property management system API integration, PropTech software development, multi-tenant property management SaaS",
    },

    hero: {
      eyebrow: "Solutions · PropTech",
      title: "Custom property management software",
      highlight: "built around your workflow.",
      subtitle:
        "Portfolio dashboards and multi-tenant platforms for property managers, landlords and PropTech founders, built when off-the-shelf tools no longer fit how you work.",
    },

    answer:
      "Futurise Solutions builds custom property management software for property managers, landlords and PropTech companies. Our PropTech work in the USA and India covers a property management dashboard with income, expense, occupancy and unit analytics, and a multi-tenant SaaS platform rebuild: each customer's data isolated, a Redis-cached Node.js API, Stripe billing and CI/CD on AWS. If an existing product already fits your workflow, we'll tell you to buy it.",

    capabilities: [
      { title: "Portfolio dashboards", desc: "Income, expenses, occupancy and unit performance across a whole portfolio in one view, with interactive charts that work on any device." },
      { title: "Unit management", desc: "Units and sign-in for property teams, shipped as the first release; analytics, billing and integrations followed in two-week sprints." },
      { title: "Multi-tenant SaaS", desc: "One platform serving many property businesses, with each customer's data in its own database namespace on shared infrastructure." },
      { title: "Query & caching layer", desc: "Dashboard reads restructured into aggregation pipelines, indexes matched to real query shapes, and Redis caching in front of the hot paths." },
      { title: "Billing", desc: "Stripe billing built into the platform." },
      { title: "Releases & monitoring", desc: "Automated tests and zero-downtime deploys to AWS through GitHub Actions, with Datadog for performance, errors and usage." },
    ],

    builds: [
      {
        title: "A property management SaaS: portfolio dashboard and multi-tenant platform",
        client: "PropTech, USA & India",
        problem: "Property managers needed one view of income, expenses, occupancy and unit performance across a portfolio. The platform work started from an inherited build that was slow, hard to extend and did not isolate each customer's data.",
        built: ["Portfolio dashboard for income, expenses, occupancy and unit performance", "Unit management and authentication", "Database-per-tenant isolation with MongoDB namespacing", "Aggregation pipelines, query-matched indexes and Redis caching", "Stripe billing", "CI/CD to AWS with GitHub Actions, and Datadog monitoring"],
        stack: ["React", "Vite", "Chakra UI", "React Query", "Recharts", "Node.js", "Express", "MongoDB", "Redis", "Stripe", "AWS", "GitHub Actions", "Datadog"],
        outcome: "The platform rebuild ran eight months from discovery to production, with a production-ready first release (dashboard, sign-in and unit management) in six weeks. The case study covers it in full.",
      },
    ],

    stack: ["React", "Vite", "Chakra UI", "React Query", "Recharts", "Node.js", "Express", "MongoDB", "Redis", "Stripe", "AWS", "GitHub Actions", "Datadog"],

    faqs: [
      { q: "Should we build or buy property management software?", a: "Buy first if your workflow looks like everyone else's: established products cover rent collection, accounting and maintenance well, and a tool you adopt this month usually beats a custom system that launches in six months. Build when the software is the business, when your workflow is distinctive, when you need one view across several systems, or when you want to own the tenant and owner experience. A hybrid, with a bought core and a custom dashboard or portal on top through its API, is often the sensible middle.", link: { href: "/blog/property-management-software-development-build-vs-buy", label: "Read our build vs buy guide" } },
      { q: "What goes into building custom property management software?", a: "Usually the same modules a product has: properties and units, leases and tenants, rent collection, maintenance, accounting and owner reporting, tenant and owner portals, and analytics. Custom work pays off in the modules where your operation differs, such as unusual unit structures, your own approval or payout workflow, local payment rails or your reporting format. Our delivered PropTech work covers the dashboard, unit management, multi-tenant and billing layers; anything beyond that we scope with you." },
      { q: "Can one platform serve many property businesses?", a: "Yes. That is a multi-tenant SaaS, and it is how the platform in our case study was rebuilt: a database-per-tenant model with MongoDB namespacing, so customers share infrastructure while each one's data stays inside its own boundary, without running separate database clusters at early scale." },
      { q: "Can you build software for build-to-rent operators?", a: "Build-to-rent operators usually own whole buildings, so they report at building and portfolio level, and unit-level income, occupancy and expense views matter more than owner-by-owner statements. The dashboard we built gives that view. The BTR-specific parts, such as lease-up tracking, amenity booking and a resident app, are not in that build, so we would scope them with you, often as a custom layer on top of a bought system that keeps the ledger and rent collection." },
      { q: "Can you build on the property management system we already use?", a: "If its API or developer kit allows it, yes. That is the hybrid route: the bought system stays the record for accounting and rent, and a dashboard, portal or automation layer sits on top through its API. Before quoting, we check what the API exposes, on which plan and with what limits, because that decides what can be built on top." },
      { q: "How do you handle tenant data and privacy?", a: "Tenant records hold identity documents, income details and payment data, so we treat privacy as a design input from day one: collect only what is needed and set retention periods, separate roles so a tenant sees their lease, an owner their properties and staff what their job needs, keep an audit trail of ledger changes, and let a payment provider hold card and bank details. Which privacy and tenancy rules apply depends on the country, so check them with your legal adviser." },
      { q: "How much does custom property management software cost, and how long does it take?", a: "It depends on scope, so we quote fixed scope after a free discovery call rather than publish one price. The main cost drivers are the number of roles and portals, whether money moves through the system, accounting depth, integrations, data migration and mobile apps. As a guide, a focused MVP usually takes 6 to 12 weeks and a larger platform 3 to 6 months." },
      { q: "Can you build a mobile app for tenants or residents?", a: "The closest work we have delivered is a React Native property app for buyers and agents in India and the US, with map search, in-app messaging between agents and buyers and offline access to shortlisted listings, built to run as well on a budget Android phone as on an iPhone. A responsive web portal costs less than native apps, so for many operators it is the better first step.", link: { href: "/case-studies/real-estate-app", label: "Read the property app case study" } },
      { q: "Can we see what you've built?", a: "Yes. Screenshots of the property dashboard we built are in our portfolio, and the platform work is written up as a case study. We walk you through the working software on a live call.", link: { href: "/portfolio#homies-proptech", label: "See the dashboard in our portfolio" } },
    ],

    related: ["ai-saas-development", "hospital-management-system", "whatsapp-crm"],
  },

  /* ───────────────────────────── 11. Hotel booking websites ───────────────────────────── */
  "hotel-booking-website-development": hotelBookingWebsiteSolution,

  /* ───────────────────────────── 12. RAG development ───────────────────────────── */
  "rag-development": ragDevelopmentSolution,
};

/** Ordered list for hubs, nav and sitemap. */
export const solutionList = Object.values(solutions);

const ONES = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
const TENS = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

/** A count as a capitalised English word ("Ten"), so copy like "Ten kinds of software" follows Object.keys(solutions).length. Digits from 100. */
export function numberToWords(n) {
  const word = n < 20 ? ONES[n] : n < 100 ? TENS[Math.floor(n / 10)] + (n % 10 ? `-${ONES[n % 10]}` : "") : String(n);
  return word.charAt(0).toUpperCase() + word.slice(1);
}
