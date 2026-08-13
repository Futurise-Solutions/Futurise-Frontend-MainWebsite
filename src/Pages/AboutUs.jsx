import React from "react";
import { Box, Container, Heading, Text, Wrap, WrapItem, SimpleGrid, Link as ChakraLink } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { AboutUsHero, MissionVision, CompanyStats } from "../Components";
import CoreValues from "../Components/AboutUs Components/CoreValues";
import TeamSection from "../Components/AboutUs Components/TeamSection";
import TechnologyExcellence from "../Components/ContactCusCpmponents/TechnologyExcellence";
import { CTASection, Seo, Reveal, Eyebrow, GlassCard } from "../Components/common";
import { AREAS_SERVED, SAME_AS } from "../utils/Constant";
import { COUNTRIES } from "../utils/Constant/countries";
import { aboutEntity, aboutNotClaimed, aboutVerify } from "../utils/Constant/about";
import { teamPersonSchema, isTeamPublished } from "../utils/Constant/team";
import { useBooking } from "../context/BookingContext";

// Names the markets with delivered client work. This previously read "for ambitious
// brands in New Zealand, India & USA" — there is no delivered New Zealand work, and the
// meta description is exactly what a prospect reads in the search result.
// Kept under ~160 characters so Google renders it whole instead of truncating mid-sentence.
const META_DESCRIPTION =
  "Meet the senior team behind Futurise Solutions — AI agents, SaaS platforms, web and mobile products. Registered in Wellington, NZ, delivering worldwide.";

const AboutUs = () => {
  const { onOpen: openBooking } = useBooking();
  return (
    <Box>
      <Seo
        title="About Us — AI & Web Development Studio | Futurise Solutions"
        description={META_DESCRIPTION}
        path="/about"
        image="/about.png"
        keywords="about Futurise Solutions, AI development team, web development company, mobile app developers, blockchain team, New Zealand tech agency, digital product studio"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": "About Futurise Solutions",
            "url": "https://www.futurisesolutions.com/about",
            "description": "Senior team building AI, SaaS, web and mobile products. Registered in Wellington, New Zealand, with delivered client work in the United Arab Emirates, the United States and India.",
            "breadcrumb": { "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.futurisesolutions.com/" }, { "@type": "ListItem", "position": 2, "name": "About", "item": "https://www.futurisesolutions.com/about" }] },
            "mainEntity": { "@id": "https://www.futurisesolutions.com/#organization" }
          },
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "@id": "https://www.futurisesolutions.com/#organization",
            "name": "Futurise Solutions",
            "url": "https://www.futurisesolutions.com",
            "logo": "https://www.futurisesolutions.com/favicon-new.png",
            "slogan": "Full-cycle digital product studio",
            "description": "Futurise Solutions is a full-cycle digital product studio building AI & ML systems, SaaS platforms, web and mobile apps, UI/UX design, blockchain, and digital marketing.",
            "foundingDate": "2024",
            "email": "business@futurisesolutions.com",
            // No `telephone`. The site publishes no phone number — enquiries run through
            // the booking flow, the contact form and email — so asserting one here would
            // put a contact channel in structured data that a visitor cannot find or use.
            // `numberOfEmployees: { minValue: 10 }` removed. Nothing on the site supports
            // it, the published stats describe 6 core service areas, and a headcount
            // claim is exactly the kind of assertion a prospect checks on LinkedIn.
            "address": { "@type": "PostalAddress", "streetAddress": "Huddart Parker Building", "addressLocality": "Wellington Central", "postalCode": "6011", "addressCountry": "NZ" },
            "areaServed": AREAS_SERVED,
            "knowsAbout": ["Artificial Intelligence", "Machine Learning", "SaaS Development", "Web Development", "Mobile App Development", "UI UX Design", "Blockchain Development", "Digital Marketing"],
            "sameAs": SAME_AS,
            // `employee` links the Organization to named people. Spread rather than set
            // unconditionally: while the team is unpublished this contributes nothing,
            // and an empty array is a worse signal than an absent property.
            ...(isTeamPublished()
              ? { "employee": teamPersonSchema().map((p) => ({ "@id": p["@id"] })) }
              : {})
          },
          // Person nodes, emitted only once real details are filled in. See
          // src/utils/Constant/team.js — describing invented people to search engines is
          // the fabricated-authority signal Google's spam policies target.
          ...teamPersonSchema().map((person) => ({ "@context": "https://schema.org", ...person }))
        ]}
      />
      <AboutUsHero />
      <CompanyStats />
      <MissionVision />
      <CoreValues />
      <TeamSection />
      <TechnologyExcellence />

      {/* EEAT block — three sections, added as a contiguous group so the existing
          information architecture (hero → stats → purpose → values → tech → markets → CTA)
          is preserved rather than reordered.

          The discipline is the one proven on /ae and /us: state the record, then state its
          limits on the page where blurring them would help most. Section 2 is the part no
          competitor writes, and it is what makes the rest of the page credible.
          See src/utils/Constant/about.js for what these sections may not say — in
          particular why section 2 stays silent about statistics. */}
      <Container maxW="1200px" px={{ base: 5, md: 8 }} py={{ base: 12, md: 16 }}>
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
        <Container maxW="1200px" px={{ base: 5, md: 8 }} py={{ base: 14, md: 20 }}>
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

      <Container maxW="1200px" px={{ base: 5, md: 8 }} py={{ base: 12, md: 16 }}>
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
                    to={v.to}
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
      <Container maxW="1200px" px={{ base: 5, md: 8 }} py={{ base: 12, md: 16 }}>
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
                  to={c.path}
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
                to="/portfolio"
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
};

export default AboutUs;
