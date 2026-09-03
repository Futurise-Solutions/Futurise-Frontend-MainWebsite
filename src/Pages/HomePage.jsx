import React from "react";
import { Box } from "@chakra-ui/react";
// Imported by path, one component per line, rather than through a barrel. A barrel is a
// single module, so importing one name from it pulls in every component it re-exports:
// the old ../Components barrel dragged the About page's MissionVision — an 11 kB chunk —
// into the home page's critical path, on a page that never renders it. That barrel has
// since been deleted (AboutUs.jsx was its last consumer and now imports directly too);
// keep adding imports here by path so the pattern cannot regress.
import HeroSection from "../Components/HomePage Components/HeroSection";
import Aboutus from "../Components/HomePage Components/AboutUs";
import OurServices from "../Components/HomePage Components/OurServices";
import OurProjects from "../Components/HomePage Components/OurProjects";
import WhyChooseUs from "../Components/HomePage Components/WhyChooseUs";
import ClientsReviews from "../Components/HomePage Components/ClientsReviews";
import Partners from "../Components/HomePage Components/Partners";
import CompanyStats from "../Components/HomePage Components/CompanyStats";
import Process from "../Components/HomePage Components/Process";
import Faqs from "../Components/HomePage Components/Faqs";
import { COUNTRY_ALTERNATES } from "../utils/Constant/countries";
import LatestBlogs from "../Components/blog/LatestBlogs";
import { CTASection, Seo, VisualBand } from "../Components/common";
import { faqs } from "../utils/Constant";
import { homeArchitecture, homeCraft, marketReach } from "../assests";

// The intro loader used to live here as a React component, gated on a `hasVisited`
// sessionStorage flag. It moved into index.html (see the #fs-boot block there) for two
// reasons the component version could not solve:
//
//   1. It could not cover the first frames. React mounts only after the module bundle
//      is fetched and parsed, so there was always a window where the page was visible
//      before the "pre-load" loader appeared — the opposite of the intent.
//   2. The sessionStorage gate meant it showed once per session and never again, so a
//      hard refresh of the home page had no loader at all.
//
// The static version runs on every real document load, on every route, and needs no
// flag. Nothing is needed here any more.
const HomePage = () => {
  return (
    <Box>
      <Seo
        // The country suffix is gone now that /nz exists. Two pages naming New Zealand in
        // their title competed for the same query and Google had to pick one; the homepage
        // is the global page, so it keeps the un-suffixed service terms and /nz owns
        // everything ending in "New Zealand". At 38 characters the brand suffix also fits
        // inside Google's ~60-character render width, so Seo.jsx appends it rather than
        // dropping it — the full rendered title is
        // "AI, SaaS & Web App Development Company | Futurise Solutions".
        title="AI, SaaS & Web App Development Company"
        description="Futurise Solutions builds AI agents, SaaS platforms, web and mobile apps end-to-end. Fixed-scope quotes, not hourly billing. Book a free 45-minute consultation."
        path="/"
        image="/home.png"
        // Shared with every country page, so reciprocity holds by construction rather
        // than by remembering to edit each page when a market is added.
        alternates={COUNTRY_ALTERNATES}
        keywords="AI app development, SaaS development, web development company, mobile app development, React Native, blockchain development, Web3, AI agents, digital marketing, New Zealand, India, USA, Futurise Solutions"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Futurise Solutions — AI, SaaS & Web App Development Studio",
            "url": "https://www.futurisesolutions.com/",
            "description": "Futurise Solutions builds AI agents, SaaS platforms, web apps, mobile apps & Web3 products end-to-end.",
            "isPartOf": { "@id": "https://www.futurisesolutions.com/#website" },
            "about": { "@id": "https://www.futurisesolutions.com/#organization" },
            "breadcrumb": { "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.futurisesolutions.com/" }] }
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map((f) => ({
              "@type": "Question",
              "name": f.question,
              "acceptedAnswer": { "@type": "Answer", "text": f.answer },
            })),
          }
        ]}
      />
      <HeroSection />
      <Partners />
      <CompanyStats />
      <Aboutus />
      <OurServices />

      {/* Interstitial 1 — breaks the run of card grids between the services list and
          the "why us" block, which was the longest stretch of uninterrupted
          text-then-cards on the page. The copy is the section's own framing, not a
          new claim. */}
      <VisualBand
        src={homeArchitecture}
        eyebrow="How we build"
        title="Systems designed to"
        highlight="carry weight"
        subtitle="Architecture, not assembly — every layer planned before a line of production code is written."
        height={{ base: "300px", md: "420px", lg: "480px" }}
        focal="60% center"
      />

      <WhyChooseUs />

      {/* Interstitial 2 — no copy, deliberately. Between the six "why us" cards and the
          seven-step process timeline sat thirteen consecutive cards with only a section
          heading between them, which is where the page still read as a document. This
          is a beat, not a statement: adding a third headline here would have made the
          run longer rather than shorter. Reuses the market-reach plate rather than
          generating another asset — it is already in the bundle for /nz, and its long
          horizontal light trails suit a short band better than a tall one. */}
      <VisualBand
        src={marketReach}
        height={{ base: "170px", md: "230px", lg: "260px" }}
        focal="center"
        overlay={0.46}
      />

      <Process />

      {/* Interstitial 3 — pure breathing room, no copy. Sits between the process
          timeline and the work marquee so two dense sections don't collide. */}
      <VisualBand
        src={homeCraft}
        height={{ base: "200px", md: "280px", lg: "320px" }}
        focal="center"
        overlay={0.42}
      />

      <OurProjects />
      <ClientsReviews />
      <Faqs />
      <CTASection />
      <LatestBlogs />
    </Box>
  );
};

export default HomePage;
