'use client'

/**
 * /about page body — ported VERBATIM from AboutUs.jsx.
 *
 * Only three things differ from the source:
 *   1. <Seo .../> is gone — metadata moves to the Metadata API in page.tsx and
 *      the JSON-LD to <JsonLd/>, both SERVER-rendered (the old one ran in a
 *      useEffect, so it existed only after hydration).
 *   2. the copy lives in a content module and is imported.
 *   3. imports are rewritten for the new paths.
 * Every style prop, every element and every string is byte-for-byte unchanged.
 */
import { Box, Container, Flex, Heading, Text, Wrap, WrapItem, SimpleGrid, Link as ChakraLink } from "@chakra-ui/react";
import RouterLink from "next/link";
import AboutUsHero from "@/components/about/AboutUsHero";
import MissionVision from "@/components/about/MissionVision";
import CompanyStats from "@/components/home/CompanyStats";
import CoreValues from "@/components/about/CoreValues";
import TeamSection from "@/components/about/TeamSection";
import TechnologyExcellence from "@/components/contact/TechnologyExcellence";
import { CTASection, Reveal, Eyebrow, GlassCard, VisualBand, MarketGlobe } from "@/components/common";
import { aboutAtrium, signalBraid } from "@/assests";
import { AREAS_SERVED, SAME_AS } from "@/utils/Constant";
import { COUNTRIES } from "@/utils/Constant/countries";
import { aboutEntity, aboutNotClaimed, aboutVerify } from "@/utils/Constant/about";
import { teamPersonSchema, isTeamPublished } from "@/utils/Constant/team";

export default function AboutUsBody() {
  return (
    <Box>
      <AboutUsHero />
      <CompanyStats />
      <MissionVision />
      <CoreValues />
      <TeamSection />

      {/* Interstitial. Between the values grid and the expertise grid was the longest
          unbroken run of card grids on the site — mission/vision, then values, then
          six expertise cards, then three more EEAT grids after that. This is the one
          pause in the middle of it. The copy restates the process the page already
          describes rather than making a new claim, and it sets up "Technology
          excellence" immediately below. */}
      {/* focal sits at 88% because this plate is composed with its structure entirely
          in the right third and near-black everywhere else — cropped any further left
          the lit edge lands mid-band and reads as a pasted-in rectangle rather than as
          a photograph. Cropping into the structure lets the scrim carry the left side. */}
      <VisualBand
        src={aboutAtrium}
        eyebrow="How we work"
        title="Structure first,"
        highlight="surface second"
        subtitle="The decisions that are expensive to change later are the ones we make before anything is built."
        height={{ base: "280px", md: "380px", lg: "420px" }}
        focal="88% center"
        overlay={0.5}
      />

      <TechnologyExcellence />

      {/* EEAT block — three sections, added as a contiguous group so the existing
          information architecture (hero → stats → purpose → values → tech → markets → CTA)
          is preserved rather than reordered.

          The discipline is the one proven on /ae and /us: state the record, then state its
          limits on the page where blurring them would help most. Section 2 is the part no
          competitor writes, and it is what makes the rest of the page credible.
          See src/utils/Constant/about.js for what these sections may not say — in
          particular why section 2 stays silent about statistics. */}
      <Container maxW="container.site" px={{ base: 5, md: 8 }} py={{ base: 12, md: 16 }}>
        <Reveal><Eyebrow>The company</Eyebrow></Reveal>
        <Reveal delay={0.05}>
          <Heading as="h2" mt={4} mb={3} fontSize={{ base: "26px", md: "34px" }} lineHeight={1.2} maxW="820px">
            Who you are actually{" "}
            <Box as="span" className="gradient-text">contracting with</Box>
          </Heading>
        </Reveal>
        <Reveal delay={0.1}>
          <Text color="text.muted" fontSize={{ base: "md", md: "lg" }} lineHeight={1.7} maxW="700px" mb={10}>
            The details a buyer checks before a first call, in one place.
          </Text>
        </Reveal>
        <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={5}>
          {aboutEntity.map((e, i) => (
            <Reveal key={e.title} delay={0.03 * i}>
              <GlassCard p={7} h="full">
                <Heading as="h3" fontSize={{ base: "17px", md: "19px" }} lineHeight={1.3} mb={3}>
                  {e.title}
                </Heading>
                <Text color="text.muted" fontSize={{ base: "14px", md: "15px" }} lineHeight={1.75}>
                  {e.detail}
                </Text>
              </GlassCard>
            </Reveal>
          ))}
        </SimpleGrid>
      </Container>

      <Box bg="rgba(255,255,255,0.015)" borderY="1px solid" borderColor="border.subtle">
        <Container maxW="container.site" px={{ base: 5, md: 8 }} py={{ base: 14, md: 20 }}>
          <Reveal><Eyebrow>Negative space</Eyebrow></Reveal>
          <Reveal delay={0.05}>
            <Heading as="h2" mt={4} mb={3} fontSize={{ base: "26px", md: "34px" }} lineHeight={1.2} maxW="820px">
              What this site{" "}
              <Box as="span" className="gradient-text">does not claim</Box>
            </Heading>
          </Reveal>
          <Reveal delay={0.1}>
            <Text color="text.muted" fontSize={{ base: "md", md: "lg" }} lineHeight={1.7} maxW="720px" mb={10}>
              Most of what a supplier tells you about itself cannot be checked. These are the
              things we have left off, and why.
            </Text>
          </Reveal>
          <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={5}>
            {aboutNotClaimed.map((n, i) => (
              <Reveal key={n.title} delay={0.03 * i}>
                <GlassCard p={7} h="full">
                  <Heading as="h3" fontSize={{ base: "17px", md: "19px" }} lineHeight={1.3} mb={3}>
                    {n.title}
                  </Heading>
                  <Text color="text.muted" fontSize={{ base: "14px", md: "15px" }} lineHeight={1.75}>
                    {n.detail}
                  </Text>
                </GlassCard>
              </Reveal>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Three card grids run back to back here — "contracting with", "does not claim"
          and "does claim" — which is the longest unbroken stretch on the page and the
          most demanding to read, since all three are about what the company will and
          won't assert. This is a pause between the disclaimer and the evidence. */}
      <VisualBand
        src={signalBraid}
        height={{ base: "160px", md: "210px", lg: "240px" }}
        focal="center"
        overlay={0.62}
        // The braid plate renders more saturated than the rest of the set. Desaturating
        // and darkening pulls it back to the muted lavender the other plates sit at,
        // rather than spending another generation on a re-roll.
        tone="saturate(0.5) brightness(0.72)"
      />

      <Container maxW="container.site" px={{ base: 5, md: 8 }} py={{ base: 12, md: 16 }}>
        <Reveal><Eyebrow>Verification</Eyebrow></Reveal>
        <Reveal delay={0.05}>
          <Heading as="h2" mt={4} mb={3} fontSize={{ base: "26px", md: "34px" }} lineHeight={1.2} maxW="820px">
            Where to check{" "}
            <Box as="span" className="gradient-text">what it does claim</Box>
          </Heading>
        </Reveal>
        <Reveal delay={0.1}>
          <Text color="text.muted" fontSize={{ base: "md", md: "lg" }} lineHeight={1.7} maxW="700px" mb={10}>
            Everything asserted above resolves to something on this site you can open.
          </Text>
        </Reveal>
        <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={5}>
          {aboutVerify.map((v, i) => (
            <Reveal key={v.title} delay={0.03 * i}>
              <GlassCard p={7} h="full">
                <Heading as="h3" fontSize={{ base: "17px", md: "19px" }} lineHeight={1.3} mb={3}>
                  {v.title}
                </Heading>
                <Text color="text.muted" fontSize={{ base: "14px", md: "15px" }} lineHeight={1.75}>
                  {v.detail}
                </Text>
                {/* inline-flex + minH rather than inline-block: as a bare text link this
                    measured 21px tall, under the 24px WCAG 2.5.8 minimum and well under the
                    44px target the rest of the site's links meet. The padding is invisible —
                    the type size and colour are unchanged — but the hit area is now the same
                    as every other link in the design system. */}
                {v.cta && (
                  <ChakraLink
                    as={RouterLink}
                    href={v.to}
                    display="inline-flex"
                    alignItems="center"
                    minH="44px"
                    mt={2}
                    fontSize="sm"
                    fontWeight={600}
                    color="accent.solid"
                    _hover={{ textDecoration: "underline" }}
                  >
                    {v.cta} →
                  </ChakraLink>
                )}
              </GlassCard>
            </Reveal>
          ))}
        </SimpleGrid>
      </Container>

      {/* Markets. Two measured problems close here at once: /about was a dead end with four
          inbound links and zero outbound ones, and all five country pages were orphans —
          reachable only from the footer, with no editorial link anywhere on the site,
          despite being the largest body of content we have written.

          Derived from the COUNTRIES registry so this list cannot drift out of step with the
          hreflang cluster, the sitemap or the footer. Deliberately no prose about any
          individual market: each country page argues its own case, and restating it here
          would put competing copy on a second URL. */}
      <Container maxW="container.site" px={{ base: 5, md: 8 }} py={{ base: 12, md: 16 }}>
        {/* Two columns from lg up. This section previously ran a single column of prose
            and pills across the full 1200px and left the entire right half empty, which
            is the flattest point on the page. The globe carries the same claim the copy
            makes, so it earns the space rather than filling it. */}
        <Flex direction={{ base: "column", lg: "row" }} align="center" gap={{ base: 10, lg: 16 }}>
        <Box flex="1" minW={0}>
        <Reveal>
          <Text fontSize="sm" fontWeight={600} letterSpacing="0.08em" textTransform="uppercase" color="text.faint" mb={2}>
            Markets
          </Text>
          <Heading as="h2" fontSize={{ base: "26px", md: "34px" }} lineHeight={1.2} mb={4} maxW="720px">
            What changes when you build{" "}
            <Box as="span" className="gradient-text">for a particular market</Box>
          </Heading>
          <Text color="text.muted" fontSize={{ base: "md", md: "lg" }} lineHeight={1.7} maxW="680px" mb={7}>
            Privacy law, invoicing rules, accessibility duties and procurement expectations
            differ by country, and they land in the architecture rather than in a policy
            document. We keep a page for each market we work in, covering what applies there
            and what we have actually delivered.
          </Text>
          <Wrap spacing={3}>
            {COUNTRIES.map((c) => (
              <WrapItem key={c.code}>
                <ChakraLink
                  as={RouterLink}
                  href={c.path}
                  px={4}
                  py={2.5}
                  borderRadius="full"
                  bg="bg.surface"
                  border="1px solid"
                  borderColor="border.subtle"
                  fontSize={{ base: "sm", md: "md" }}
                  color="text.primary"
                  fontWeight={500}
                  _hover={{ borderColor: "rgba(180,160,255,0.35)", textDecoration: "none" }}
                  transition="border-color .2s"
                >
                  {c.label}
                </ChakraLink>
              </WrapItem>
            ))}
            <WrapItem>
              <ChakraLink
                as={RouterLink}
                href="/portfolio"
                px={4}
                py={2.5}
                borderRadius="full"
                bg="bg.surface"
                border="1px solid"
                borderColor="border.subtle"
                fontSize={{ base: "sm", md: "md" }}
                color="text.primary"
                fontWeight={500}
                _hover={{ borderColor: "rgba(180,160,255,0.35)", textDecoration: "none" }}
                transition="border-color .2s"
              >
                The delivered work
              </ChakraLink>
            </WrapItem>
          </Wrap>
        </Reveal>
        </Box>
        <Box flexShrink={0} w={{ base: "full", lg: "auto" }}>
          <Reveal from="right">
            <MarketGlobe size={{ base: "210px", md: "260px", lg: "300px" }} />
          </Reveal>
        </Box>
        </Flex>
      </Container>

      <CTASection
        eyebrow="Let’s work together"
        title="Ready to build something"
        highlight="exceptional?"
        subtitle="Tell us about your idea and we’ll help you turn it into a product your users will love."
        primaryLabel="Book a free call"
        onPrimary={() => openBooking("about-cta")}
      />
    </Box>
  );
}
