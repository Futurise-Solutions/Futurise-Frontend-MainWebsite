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
 * The re-targeted posts carry a lower-case `retarget: true` marker. Until the
 * matching CMS title change lands, their anchor text here describes the post's body
 * rather than its current <title>. That mismatch is intentional and harmless —
 * anchor text has never been required to repeat the destination's title — and it
 * resolves the moment the CMS edit is applied. (The AI one is no longer listed; see
 * the note under "ai-ml-solutions".)
 *
 * Every `to` was verified against a prerendered directory in dist/blog (entries added
 * on 25 Nov 2026 against the live blog API). Every blurb is drawn from the post's own
 * meta description or body; none is invented.
 */

export const serviceResources = {
  "web-development": [
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
    {
      title: "Property software: build, buy or a hybrid",
      blurb:
        "How landlords, property managers and PropTech founders choose between off-the-shelf software, a custom build or a hybrid, with the modules, integrations and cost drivers to check.",
      to: "/blog/property-management-software-development-build-vs-buy",
    },
    {
      title: "How a hotel PMS, channel manager and booking engine connect",
      blurb:
        "Two-way sync, API versus middleware, where integrations fail, and the questions to ask a vendor before you buy.",
      to: "/blog/hotel-pms-booking-engine-channel-manager-explained",
    },
  ],

  "app-development": [
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
    {
      title: "What a hotel direct booking site needs to cut OTA commission",
      blurb:
        "A worked savings formula, what the site needs to win repeat guests, and how to measure direct share.",
      to: "/blog/hotel-direct-booking-website-reduce-ota-commission",
    },
  ],

  "blockchain-development": [
    {
      title: "Real-world asset tokenisation in 2026",
      blurb:
        "How tokenisation digitises physical assets, and what a business needs in place before attempting it.",
      to: "/blog/real-world-asset-tokenization-rwa-2026-the-trillion-dollar-opportunity-for-businesses",
    },
  ],

  "ai-ml-solutions": [
    // The "custom AI development: what to build, buy and expect" post used to lead this
    // list. Its build-vs-buy, delivery and cost guidance now lives on the service page
    // itself (Nov 2026) and "Custom AI Development Services" is that page's H1, so a card
    // pointing at the post would hand the head term back to it. Deliberately not linked.
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
    {
      title: "Security questions to ask an AI vendor",
      blurb:
        "Data retention and training, sub-processors, SOC 2 scope, prompt injection, incident response and HIPAA BAAs: a due-diligence list for US buyers.",
      to: "/blog/security-questions-to-ask-an-ai-vendor",
    },
    {
      title: "Making an Arabic chatbot work for UAE customers",
      blurb:
        "Gulf dialect and code-switching, right-to-left design, WhatsApp, human handoff, testing and data protection.",
      to: "/blog/arabic-ai-chatbot-guide-for-uae-businesses",
    },
  ],

  "digital-marketing": [
    {
      title: "Winning the click that never happens",
      blurb:
        "Zero-click search strategy for the queries Google now answers on the results page itself.",
      to: "/blog/the-zero-click-seo-strategy-for-2026-how-to-win-when-google-answers-everything",
    },
  ],
};

export default serviceResources;
