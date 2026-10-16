/**
 * Supporting reading for each service page.
 *
 * WHY THIS FILE EXISTS
 * Project 0 measured seven blog posts competing with a service page for the same
 * commercial head term ("web development services", "ai & ml solutions", …). Body
 * overlap between each pair is only 1.17–2.36%, so these are not duplicate pages —
 * they are distinct content colliding on *intent*. The fix is re-targeting, not
 * redirects: the post keeps its URL and its words, and stops chasing the head term.
 *
 * The same audit found the service pages link to zero blog posts. Every one of the
 * seven competing posts had exactly two inbound internal links — the /blog index and
 * its own self-reference — so nothing on the site pointed a crawler from a service
 * page to the depth that sits behind it. This map supplies that link layer.
 *
 * ANCHOR-TEXT RULE — the reason `title` here is not the post's own <title>
 * Anchor text is a targeting signal. Linking to the web-development post with the
 * anchor "Web Development Services" would tell Google that post is the answer for
 * the exact term /service/web-development is trying to win, re-creating by hand the
 * collision the re-targeting is meant to remove. So every `title` below is written
 * to the post's *informational* angle and deliberately avoids the head term of the
 * service it is listed under. Head terms belong to the service page; the posts get
 * the long-tail question their body actually answers.
 *
 * The seven re-targeted posts carry a lower-case `retarget: true` marker. Until the
 * matching CMS title change lands, their anchor text here describes the post's body
 * rather than its current <title>. That mismatch is intentional and harmless —
 * anchor text has never been required to repeat the destination's title — and it
 * resolves the moment the CMS edit is applied.
 *
 * Every `to` was verified against a prerendered directory in dist/blog. Every blurb
 * is drawn from the post's own meta description or body; none is invented.
 */

export const serviceResources = {
  "web-development": [
    {
      title: "What sub-2-second load times actually cost to build",
      blurb:
        "The architecture decisions behind a fast site: React, Next.js and Node.js choices that decide load time before a line of design work starts.",
      to: "/blog/web-development-services-fast-scalable-and-seo-ready-websites-and-web-apps-built-to-convert",
      retarget: true,
    },
    {
      title: "Hiring a web team in India: what to pay and who to trust",
      blurb:
        "Typical 2026 costs, what to expect from a delivery partner, and the checks worth running before you sign.",
      to: "/blog/web-development-services-in-india-2026-what-to-expect-what-to-pay-and-who-to-trust",
    },
    {
      title: "Why an AI-powered website still fails to convert",
      blurb:
        "The pitfalls that leave a technically modern site producing no leads, and the fixes that change it.",
      to: "/blog/why-your-ai-powered-website-isnt-converting-leads-and-how-to-fix-it-in-2026",
    },
    {
      title: "Custom software cost guide 2026",
      blurb:
        "How a build is priced stage by stage, the factors that move the figure furthest, and how to budget against them.",
      to: "/blog/custom-software-development-cost-guide-2026-pricing-timeline-and-key-factors",
    },
  ],

  "app-development": [
    {
      title: "Choosing one codebase for iOS and Android",
      blurb:
        "What React Native and Expo give you across both platforms (Firebase backends, payments, push and maps), and where a single codebase stops paying off.",
      to: "/blog/app-development-services-build-cross-platform-ios-and-android-apps-that-users-actually-love",
      retarget: true,
    },
    {
      title: "React Native vs Flutter: cost and ROI compared",
      blurb:
        "A framework decision costed out for Australian startups across Sydney, Melbourne and Brisbane.",
      to: "/blog/react-native-vs-flutter-for-australian-startups-complete-cost-and-roi-guide-2026",
    },
    {
      title: "Custom software cost guide 2026",
      blurb:
        "Pricing, timelines and the key factors that decide what a build costs.",
      to: "/blog/custom-software-development-cost-guide-2026-pricing-timeline-and-key-factors",
    },
  ],

  "ui-ux-design": [
    {
      title: "How design decisions move conversion and churn",
      blurb:
        "UX research, wireframing, high-fidelity UI, prototypes and design systems, traced through to the numbers they change.",
      to: "/blog/uiux-design-services-how-great-design-turns-visitors-into-loyal-customers",
      retarget: true,
    },
    {
      // "UI/UX design" is this service page's own head term, so it must not appear in
      // anchor text pointing away from it — the whole card is inside the <a>.
      title: "What a product design engagement costs in New Zealand",
      blurb:
        "Pricing, timelines and process, written for startups planning a first product build.",
      to: "/blog/uiux-design-cost-in-new-zealand-2026-pricing-process-and-complete-guide",
    },
    {
      title: "Why an AI-powered website still fails to convert",
      blurb:
        "Where the interface, not the technology, is the reason visitors leave without becoming leads.",
      to: "/blog/why-your-ai-powered-website-isnt-converting-leads-and-how-to-fix-it-in-2026",
    },
  ],

  "blockchain-development": [
    {
      title: "Getting a smart contract audited and shipped",
      blurb:
        "What production-grade means for audited contracts, DeFi platforms, multi-chain dApps and Web3 integrations.",
      to: "/blog/blockchain-development-services-smart-contracts-defi-and-web3-solutions-for-modern-businesses",
      retarget: true,
    },
    {
      title: "Real-world asset tokenisation in 2026",
      blurb:
        "How tokenisation digitises physical assets, and what a business needs in place before attempting it.",
      to: "/blog/real-world-asset-tokenization-rwa-2026-the-trillion-dollar-opportunity-for-businesses",
    },
  ],

  "ai-ml-solutions": [
    {
      title: "Custom AI development: what to build, buy and expect",
      blurb:
        "The four main types of custom AI work, when each makes sense, build versus buy, and the factors that drive cost.",
      to: "/blog/ai-and-ml-solutions-custom-ai-agents-llm-integrations-nlp-and-computer-vision-built-for-your-business",
      retarget: true,
    },
    {
      title: "What a custom AI agent costs to build",
      blurb:
        "2026 vendor estimate ranges, running costs and regional rate differences, plus how to scope a quote.",
      to: "/blog/ai-agent-development-cost-2026-a-global-price-comparison-for-custom-ai-solutions",
    },
    {
      title: "AI agent or chatbot: which one you need",
      blurb:
        "The differences that matter commercially, the cost gap between them, and the use cases that decide it.",
      to: "/blog/ai-agent-vs-traditional-chatbot-which-one-does-your-business-really-need-in-2026",
    },
    {
      title: "Stopping an agent from hallucinating",
      blurb:
        "RAG and verification strategies for building agents that can be trusted with real customer questions.",
      to: "/blog/the-ai-hallucination-trap-how-to-build-trustworthy-ai-agents-in-2026-rag-and-verification-strategies",
    },
    {
      title: "Why AI investment is not paying off, and how to fix it",
      blurb:
        "Why AI pilots stall, from use case choice and the skills gap to change management and measuring ROI.",
      to: "/blog/the-ai-paradox-why-your-business-is-investing-in-ai-but-not-seeing-roi-and-how-to-fix-it-in-2026",
    },
  ],

  "digital-marketing": [
    {
      title: "Tying SEO, ads and CRO to revenue rather than vanity metrics",
      blurb:
        "How performance ads, paid social, CRO and analytics get measured against money instead of impressions.",
      to: "/blog/digital-marketing-services-the-data-driven-strategy-that-grows-traffic-leads-and-revenue",
      retarget: true,
    },
    {
      title: "Ranking when Google rewrites your content",
      blurb:
        "What AI Overviews change about SEO, and how to adapt a strategy built for ten blue links.",
      to: "/blog/seo-for-ai-overviews-2026-how-to-rank-when-google-rewrites-your-content",
    },
    {
      title: "Winning the click that never happens",
      blurb:
        "Zero-click search strategy for the queries Google now answers on the results page itself.",
      to: "/blog/the-zero-click-seo-strategy-for-2026-how-to-win-when-google-answers-everything",
    },
  ],
};

export default serviceResources;
