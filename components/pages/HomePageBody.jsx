'use client'

/**
 * / page body — ported VERBATIM from HomePage.jsx.
 *
 * Only three things differ from the source:
 *   1. <Seo .../> is gone — metadata moves to the Metadata API in page.tsx and
 *      the JSON-LD to <JsonLd/>, both SERVER-rendered (the old one ran in a
 *      useEffect, so it existed only after hydration).
 *   2. the copy lives in a content module and is imported.
 *   3. imports are rewritten for the new paths.
 * Every style prop, every element and every string is byte-for-byte unchanged.
 */
import dynamic from "next/dynamic";
import { Box } from "@chakra-ui/react";
import HeroSection from "@/components/home/HeroSection";
import Aboutus from "@/components/home/AboutUs";
import OurServices from "@/components/home/OurServices";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Partners from "@/components/home/Partners";
import CompanyStats from "@/components/home/CompanyStats";
import Process from "@/components/home/Process";
import { VisualBand } from "@/components/common";
import { homeArchitecture, homeCraft, marketReach } from "@/assests";

/* ── PHASE 8: below-the-fold components are code-split ────────────────────────
   These four sit far below the fold — OurProjects is after three interstitials,
   ClientsReviews, Faqs and CTASection are further still. Splitting them keeps their
   JS (a marquee, an accordion, a booking hook) off the initial bundle.

   ⚠️ NO `loading` PLACEHOLDER and NO `ssr: false` on any of these. Both would harm the
   two things this migration exists to protect:
     - `ssr: false` removes the section from the server HTML, which is what crawlers read.
     - a `loading` skeleton paints a wrong-height box that collapses when the real chunk
       lands — the exact ~0.18 CLS mechanism recorded in AllRoutes.jsx and LatestBlogs.
   The default (SSR on, hydration deferred) gives the payload win with neither cost.

   Nothing above the fold is split: HeroSection, Partners, CompanyStats, Aboutus and
   OurServices all load eagerly. */
const OurProjects = dynamic(() => import("@/components/home/OurProjects"));
const ClientsReviews = dynamic(() => import("@/components/home/ClientsReviews"));
const Faqs = dynamic(() => import("@/components/home/Faqs"));
const CTASection = dynamic(() => import("@/components/common/CTASection"));

/* `latestBlogs` is passed in as a CHILD rather than imported.
   LatestBlogs is an async SERVER component (it fetches on the server); a client
   component cannot import one, but it can render one passed to it as a prop. The
   element is created in app/page.tsx, which is a server component. */
export default function HomePageBody({ latestBlogs }) {
  return (
    <Box>
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
      {latestBlogs}
    </Box>
  );
}
