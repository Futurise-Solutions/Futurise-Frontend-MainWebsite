/**
 * Long-form buying guides and the extra FAQs for five service pages (Nov 2026).
 *
 * Each blog post that used to duplicate a service page was folded in here and then
 * redirected (see content/blogRedirects.ts). `guide` renders as a visible, server-rendered
 * section above the FAQs in ServicePageBody; `extraFaqs` are appended to the page's own
 * FAQ list (and so reach the FAQPage JSON-LD).
 */

export const serviceGuides = {
  "web-development": {
    guide: {
      eyebrow: "Buyer's guide",
      title: "What a good web build includes, and how to choose a partner",
      intro:
        "A site can look polished and still be slow, invisible to Google or impossible to change without calling the developer. Use this page to check a quote for what should be in it, pick a stack that fits the job and put hard questions to any agency, us included.",
      sections: [
        {
          heading: "What a good build includes",
          paragraphs: [
            "Check that each item below is either in scope or explicitly left out of the quote.",
          ],
          bullets: [
            "Speed you can measure. Google publishes Core Web Vitals thresholds (web.dev): Largest Contentful Paint under 2.5 seconds, Interaction to Next Paint under 200 milliseconds and Cumulative Layout Shift under 0.1. A partner should say which pages they will test against. \"Fast\" with no number attached is a promise nobody can check.",
            "SEO foundations. Server-rendered or statically generated HTML, clean URLs, one H1 per page, editable title and meta description fields, a sitemap, canonical tags, structured data where it fits and sensible redirects when URLs change. It is far cheaper to build these in than to retrofit them.",
            "A CMS your team can use. Choose by who will edit: a headless CMS or Markdown for a marketing team that wants structure, a visual editor for non-technical owners, or a simple admin panel for a few fixed pages. Ask to see the editing screen before you approve the approach.",
            "Analytics before launch. At minimum: page views, form submissions, clicks on phone and email links, and the source of every enquiry. Without them, \"the site isn't working\" is an opinion rather than a finding.",
            "Conversion basics. A clear promise above the fold, one primary action per page, short forms, proof near the decision point and pages that work on a phone held in one hand.",
          ],
        },
        {
          heading: "Choosing a stack: Astro, Next.js, React, Shopify or WordPress",
          paragraphs: [
            "There is no best framework, only a best fit. If a partner recommends the same stack for a five-page brochure site and a multi-tenant SaaS product, ask why.",
          ],
          table: {
            columns: ["Option", "Best for", "Watch out for"],
            rows: [
              ["Astro", "Content-heavy marketing sites, blogs, documentation", "Less natural for highly interactive apps"],
              ["Next.js (React)", "Marketing sites that also need dashboards, logins or dynamic data", "More moving parts; needs a developer who knows caching and rendering modes"],
              ["Plain React single-page app", "Internal tools and logged-in apps where SEO does not matter", "A poor default for public pages that need to rank"],
              ["Shopify", "Online stores that need to launch and sell quickly", "Theme limits; custom behaviour needs Liquid or app work"],
              ["WordPress or similar CMS", "Teams who already know it and want plugin variety", "Plugin sprawl, security upkeep and speed tuning"],
            ],
          },
        },
        {
          heading: "How to evaluate a web development partner",
          paragraphs: ["Run this checklist on every agency on your shortlist."],
          bullets: [
            "Ask for live sites, not screenshots. Open them on your phone and run them through PageSpeed Insights.",
            "Ask who does the work: the team you meet, or someone else.",
            "Ask what is in the fixed scope. A written scope with deliverables and exclusions protects both sides.",
            "Ask who owns the code and accounts. You should own the repository, domain, hosting and analytics.",
            "Ask how changes are handled. A change process beats surprise invoices.",
            "Ask what happens after launch: support, bug-fix windows and handover documentation.",
            "Ask how they measure success. Good partners talk about enquiries, sales and speed, not only delivery dates.",
          ],
        },
        {
          heading: "Red flags",
          paragraphs: [
            "No written scope, a price far below every other quote, refusal to share references, vague answers on hosting and any guarantee of a number-one Google ranking.",
          ],
        },
      ],
    },
    extraFaqs: [
      {
        question: "Which framework should my website use?",
        answer:
          "It depends on the job. Astro suits content-heavy marketing sites, Next.js suits sites that also need logins, dashboards or dynamic data, a plain React app suits internal tools where SEO does not matter, and Shopify suits stores that need to launch quickly. We recommend the stack after reviewing your goals.",
      },
      {
        question: "Who owns the code, hosting and analytics accounts?",
        answer:
          "You should. The repository, domain, hosting and analytics accounts belong to your business, and a good partner sets them up in your name from the start.",
      },
      {
        question: "What drives the cost of a website build?",
        answer:
          "Mostly scope: the number and type of templates, custom design versus an adapted template, dynamic functionality such as accounts, payments and booking, content migration, third-party integrations and ongoing work after launch. Our rate card and scoping approach are on the pricing page.",
      },
      {
        question: "Can my team edit the site without a developer?",
        answer:
          "Yes, if the CMS is chosen around who will edit it. We show you the editing screen before the approach is signed off, so everyday text and image changes do not need a developer.",
      },
    ],
  },

  "app-development": {
    guide: {
      eyebrow: "Planning guide",
      title: "Choosing a framework and scoping your first app",
      intro:
        "Two decisions shape most mobile projects: which technology builds the app and what goes into the first release. Get both right and the rest of the brief gets easier.",
      sections: [
        {
          heading: "React Native, Flutter or native: how to decide",
          paragraphs: [
            "For most business apps, which are forms, lists, maps, payments, notifications and accounts, React Native and Flutter are both capable, and the choice often comes down to the team that will build and maintain the app. We build in React Native and Expo, so that is our usual recommendation. If your product is a graphics-heavy game, or relies on a platform feature that cross-platform tools handle badly, native is the better call.",
          ],
          table: {
            columns: ["Approach", "Strengths", "Consider something else when"],
            rows: [
              ["React Native with Expo", "One JavaScript or TypeScript codebase; large talent pool; shares skills with web teams; fast iteration", "You need very heavy graphics or deep, unusual hardware access"],
              ["Flutter", "One codebase; consistent custom UI; strong rendering control", "Your team and hiring pool are in JavaScript, or you need to share code with a React web app"],
              ["Native (Swift and Kotlin)", "Best access to new platform features; maximum performance tuning", "Budget is tight and you would be paying for two separate builds"],
            ],
          },
        },
        {
          heading: "What an MVP app should include",
          paragraphs: [
            "An MVP is the smallest version that tests whether people want the product. Resist adding everything from the roadmap. A typical scope:",
          ],
          bullets: [
            "Sign-up and login, with a social or phone option if it helps conversion",
            "The one core workflow your idea depends on",
            "A basic profile or settings screen",
            "Push notifications, if the product is time-sensitive",
            "Payments or subscriptions, if that is how you earn",
            "An admin panel so your team can manage users and content",
            "Analytics and crash reporting, so you learn from day one",
          ],
        },
        {
          heading: "What to leave out of version one",
          paragraphs: [
            "Social feeds, complex personalisation, multi-language support and anything labelled \"phase 2\" can wait until real users ask for them. Cross-platform also does not mean identical on both: good teams follow each platform's conventions for navigation, permissions and gestures while sharing the logic underneath.",
          ],
        },
      ],
    },
    extraFaqs: [
      {
        question: "Should I build for iOS first, Android first, or both?",
        answer:
          "Choose by where your users are. In some markets one platform dominates, and if you know that, start there. With React Native the extra effort to ship both is smaller than with native code, so many teams launch on both together.",
      },
      {
        question: "Can my existing website just become an app?",
        answer:
          "Sometimes. If your product is mostly content and forms, with no need for notifications, offline use or device features, a responsive site may serve users well enough and avoids store review entirely. Once you need those features, or your users expect to find you in the stores, a proper app is worth the extra cost.",
      },
      {
        question: "What are the steps to get an app into the App Store and Google Play?",
        answer:
          "First, create Apple and Google developer accounts in your company's name early, because verification can take days. Next, prepare the store listings: name, description, screenshots, privacy policy URL and age rating. Then answer both stores' privacy disclosures accurately, since a mismatch with what the app does can get a submission rejected. Test with TestFlight on iOS and internal or closed testing tracks on Android, then submit for review and leave a buffer in your launch plan for resubmissions. Both stores also have rules on account deletion and on how digital goods are sold, and these change, so read the current guidelines before you design sign-up and payments.",
      },
      {
        question: "Should the backend be custom or a service like Firebase or Supabase?",
        answer:
          "A custom backend (Node.js with a database such as MongoDB or PostgreSQL) is the most flexible and the usual choice when the product has its own logic or integrations. A backend-as-a-service is quicker to start and suits simple data models, but check pricing at scale and how easily you could move away. Whichever you pick, you should own the cloud accounts.",
      },
    ],
  },

  "ui-ux-design": {
    guide: {
      eyebrow: "Buyer's guide",
      title: "Agency, consultant or freelancer, and how to write a brief",
      intro:
        "If a design proposal is only \"mockups\", it is missing most of the value. These two decisions, who to hire and what to tell them, do the most to keep a design project on track.",
      sections: [
        {
          heading: "Agency, consultant or freelancer?",
          paragraphs: [
            "If you already have developers and a product owner, a consultant can be the efficient choice. If you need design and engineering to work from the same plan, a team that does both avoids the usual handoff problems.",
          ],
          table: {
            columns: ["Option", "Good for", "Watch out for"],
            rows: [
              ["Freelance designer", "A defined task, such as a landing page or a set of screens", "Single point of failure; research and testing may be thin"],
              ["UX consultant", "Audits, strategy, a heuristic review, coaching an in-house team", "Usually does not build or implement"],
              ["Agency", "End-to-end projects where design, research and build need to line up", "Cost; check that the people pitching are the people doing the work"],
            ],
          },
        },
        {
          heading: "How to write a good design brief",
          paragraphs: [
            "A brief does not need to be long, but it must be specific. Include:",
          ],
          bullets: [
            "The business goal, for example increasing trial sign-ups, cutting support questions or shortening onboarding.",
            "The users: who they are, what they are trying to do and any known problems.",
            "The current state: links, analytics, support tickets and past research.",
            "Scope: which screens or flows, which platforms and what is out of scope.",
            "Constraints: brand rules, technical stack, deadlines and compliance needs.",
            "Success measures: what you will look at to decide the work succeeded.",
            "Who decides. Name the person with final sign-off, because many projects slow down when nobody can say yes.",
          ],
        },
        {
          heading: "How to judge a proposal",
          paragraphs: [
            "Look for case studies that describe the problem, process and outcome, not only attractive screens. Ask how research and testing are run and what you will see at each stage, and make sure designers and developers talk before handoff. Be wary of fixed promises such as \"we will double your conversions\": honest teams commit to the process and to measuring results. Be equally wary of any team that skips research and goes straight to visuals.",
          ],
        },
      ],
    },
    extraFaqs: [
      {
        question: "What drives the cost of a design project?",
        answer:
          "The number of screens and flows, the depth of research, whether it is a new product or a redesign, which platforms you need (web, iOS, Android), the size of the design system and how many feedback rounds there are. Feedback cycles are where timelines stretch most.",
      },
      {
        question: "Who owns the Figma files and the design system?",
        answer:
          "You should. Ask any design partner to confirm ownership of the files and the design system at the end of the project.",
      },
      {
        question: "Is accessibility part of the design work?",
        answer:
          "It belongs in every stage rather than at the end. Contrast, keyboard use, focus states, labels and readable text sizes affect all users, and meeting WCAG 2.1 AA is a common baseline to ask for.",
      },
    ],
  },

  "blockchain-development": {
    guide: {
      eyebrow: "Buyer's guide",
      title: "Do you need a chain, which one, and what to check before you build",
      intro:
        "Good blockchain work starts with a narrow question: which part of your product genuinely needs a chain? We are a software team, not a financial adviser, and nothing here is legal or investment guidance.",
      sections: [
        {
          heading: "Choosing a chain",
          paragraphs: [
            "Choose on four things: where your users already hold funds, the transaction costs your product can tolerate, the quality of wallets and tooling, and the support from auditors and exchanges. Do not pick a chain because it is trending.",
          ],
          table: {
            columns: ["Chain type", "Typical use", "Notes"],
            rows: [
              ["Ethereum mainnet", "High-value assets, established DeFi", "Highest security profile and the highest transaction fees"],
              ["EVM layer 2s and sidechains (Base, Arbitrum, Polygon and others)", "Consumer apps, mints, low-fee payments", "Lower fees; confirm each network's bridge and finality assumptions"],
              ["Solana", "Fast, low-cost token and consumer apps", "Different programming model (Rust); tooling separate from EVM"],
              ["Private or permissioned chains", "Enterprise record-keeping", "Often a database would do the job; check whether you need a chain at all"],
            ],
          },
        },
        {
          heading: "Security and audit checklist",
          paragraphs: [
            "Smart contracts are public and often immutable, which makes bugs expensive. A sound process includes:",
          ],
          bullets: [
            "A written specification before any code, covering every rule and edge case.",
            "Well-tested building blocks: audited libraries such as OpenZeppelin for standard contracts instead of writing everything from scratch.",
            "Automated tests with high coverage, plus fuzzing for anything holding value.",
            "Testnet deployment and a staged rollout with caps.",
            "An independent audit for any contract that holds user funds. Audits find problems but do not guarantee safety, so budget time for fixes and a re-review.",
            "Key management: hardware wallets or multisig for admin keys, with a record of who can do what.",
            "Upgrade and pause plans, decided before launch, including who controls that power.",
          ],
        },
        {
          heading: "How to choose a blockchain development partner",
          paragraphs: [],
          bullets: [
            "Ask to see deployed contracts or live dApps and read them on a block explorer.",
            "Ask how they test, and who audits.",
            "Ask how they would handle a bug found after launch.",
            "Ask who holds admin keys and what the recovery plan is.",
            "Confirm you will own the repository, contracts and deployment keys.",
            "Walk away from guaranteed returns or promises of token price performance. Be sceptical of anyone who says they can build a contract holding significant value without an external audit.",
          ],
        },
        {
          heading: "Regional and regulatory points",
          paragraphs: [
            "Rules differ by market, so take advice from a qualified local adviser. In the United States, the treatment of tokens and payment services depends on how the product works and who it serves. In the UAE, federal rules sit alongside local regimes, and Dubai has a dedicated regulator for virtual assets (VARA). The regulatory classification of a token varies by country, so get legal advice before you settle supply, distribution and who holds mint authority.",
          ],
        },
      ],
    },
    extraFaqs: [
      {
        question: "Do I need a blockchain for my product?",
        answer:
          "Only if you need shared, tamper-resistant records between parties who do not trust one another, or you need to work with existing crypto assets. If one company controls the data, a normal database is simpler, cheaper and faster.",
      },
      {
        question: "How much does a smart contract audit cost?",
        answer:
          "It varies widely with the size and complexity of the code, and quotes differ between firms, so we do not give a figure. Ask two or three auditors to quote on your actual contracts, book early because scheduling can add weeks, and plan for a fix-and-recheck cycle.",
      },
      {
        question: "Should we accept crypto payments through a processor or a custom build?",
        answer:
          "If your team does not want to hold keys, a payment processor is often the better fit. A custom build makes sense when you need control over the flow. Either way the real work is payment confirmation, handling underpaid or late transactions, price conversion, refunds and accounting records.",
      },
      {
        question: "Can you advise on how a token will be treated legally?",
        answer:
          "No. We build the software, and the legal treatment of a token depends on the country and on how the product works. Take advice from a qualified local adviser early, before supply and distribution are fixed.",
      },
    ],
  },

  "digital-marketing": {
    guide: {
      eyebrow: "Strategy guide",
      title: "What to do first, and which channel does what",
      intro:
        "Most tech companies are not short on marketing activity. They are short on clarity about which activity produces pipeline. Sequence and measurement are usually the constraint, more than budget.",
      sections: [
        {
          heading: "Start with measurement, not channels",
          paragraphs: [
            "Before spending on SEO, ads or content, make sure you can answer three questions: where do leads come from, which of them become customers, and what does a customer cost to acquire? A practical minimum:",
          ],
          bullets: [
            "Conversion tracking that matches your business. For B2B that means demo requests, contact forms and booked calls, not page views. For D2C it means purchases, add-to-cart and checkout steps.",
            "GA4 and Google Search Console connected, with key events defined and tested.",
            "CRM stage data. Pass the lead source into your CRM so you can report on pipeline rather than only form fills.",
            "A \"how did you hear about us?\" field on forms and in sales calls. It is blunt, but it catches word of mouth, podcasts, communities and AI assistants that analytics files under \"direct\".",
          ],
        },
        {
          heading: "Which channel does what",
          paragraphs: [
            "No channel is best in the abstract. Each does a different job at a different speed. For most tech companies the first two quarters should be SEO foundations, CRO on the pages that already get traffic and one paid channel with a tight budget cap. Adding five channels at once makes it impossible to learn anything.",
          ],
          table: {
            columns: ["Channel", "Best for", "Speed", "Main risk"],
            rows: [
              ["SEO and content", "Compounding, lower cost per lead over time", "Months", "Publishing content nobody searches for or needs"],
              ["Being cited in AI answers", "Visibility where people ask questions", "Months", "Treating it as a trick; Google says it needs no special optimisation beyond good SEO"],
              ["Paid search", "Capturing existing demand quickly", "Days to weeks", "Paying for clicks that never reach a sales conversation"],
              ["Paid social", "Creating demand, retargeting", "Weeks", "Optimising for cheap clicks over qualified leads"],
              ["Conversion rate optimisation (CRO)", "Getting more from traffic you already have", "Weeks", "Testing trivia instead of the offer and the page"],
              ["Email and lifecycle", "Retention, upsell, reactivation", "Weeks", "Sending to an unsegmented list"],
            ],
          },
        },
        {
          heading: "Attribution without false precision",
          paragraphs: [
            "Last-click reports overcredit the final touch and undercount podcasts, communities, LinkedIn posts and AI assistants. You will never have perfect attribution, but you can get good enough:",
          ],
          bullets: [
            "Use platform and GA4 data for trend direction.",
            "Add self-reported attribution on forms and calls.",
            "Track branded search volume in Search Console as a proxy for awareness.",
            "Review pipeline and revenue by source monthly with sales.",
            "Run occasional holdout or geo tests for large paid budgets.",
          ],
        },
        {
          heading: "A reasonable first 90 days",
          paragraphs: [
            "Month one is for tracking, an audit, and keyword and intent mapping. Month two is for technical fixes, page improvements and the first content or campaign. Month three is for reviewing real lead data and deciding what to scale. When your data views disagree, treat that as information, not a failure of tracking.",
          ],
        },
        {
          heading: "How to choose a digital marketing partner",
          paragraphs: ["Ask these before you sign:"],
          bullets: [
            "Which metrics will you report on, and will they include qualified leads and pipeline as well as traffic and rankings?",
            "Who actually does the work, and can I speak to them?",
            "How do you handle technical SEO: can you or a developer implement fixes, or do you only send recommendations?",
            "Can you show a relevant case study with a clear before and after, and say what you did not control?",
            "What do you need from us, and what happens in the first 30, 60 and 90 days?",
            "Do I own the ad accounts, analytics properties and content?",
          ],
        },
        {
          heading: "Red flags",
          paragraphs: [
            "Guaranteed rankings, secret methods, reports full of impressions, long lock-in contracts and no questions about your sales process.",
          ],
        },
      ],
    },
    extraFaqs: [
      {
        question: "Should I start with SEO or paid ads?",
        answer:
          "If you need leads in weeks, paid search captures existing demand faster. If you can wait, SEO compounds and lowers cost per lead over time. Many teams run a small paid budget while SEO builds, and use the paid keyword data to guide content.",
      },
      {
        question: "What should the first 90 days of a marketing engagement look like?",
        answer:
          "Month one covers tracking, an audit and keyword and intent mapping. Month two covers technical fixes, page improvements and the first content or campaign. Month three reviews real lead data and decides what to scale.",
      },
      {
        question: "How do you measure results when attribution is imperfect?",
        answer:
          "We combine platform and GA4 trends with self-reported attribution on forms and calls, track branded search as a proxy for awareness, and review pipeline and revenue by source with your sales team each month. When the views disagree, that is information rather than a tracking failure.",
      },
      {
        question: "What do we need to have in place before hiring a marketing partner?",
        answer:
          "Conversion tracking that matches your business, GA4 and Google Search Console connected, lead source passed into your CRM and a field asking leads how they heard about you. If any of that is missing, fixing it is the first job.",
      },
    ],
  },
};

export default serviceGuides;
