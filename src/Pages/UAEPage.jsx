import React from "react";
import {
  Box, Container, Heading, Text, VStack, HStack, SimpleGrid, Icon, Flex, Button, List, ListItem,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiCheck, FiArrowUpRight } from "react-icons/fi";
import { Reveal, Eyebrow, GlassCard, Seo, CTASection } from "../Components/common";
import Faqs from "../Components/HomePage Components/Faqs";
import { useBooking } from "../context/BookingContext";
import { NavbarservicesOptions } from "../utils/Constant";
import { COUNTRY_ALTERNATES } from "../utils/Constant/countries";
import { buildCountrySchema } from "../utils/countrySchema";
import {
  aeMeta, aeEvidence, aeJurisdictions, aeInvoicing, aeArabic, aeLicence,
  aeSectors, aeFit, aePricingNotes, aeResources, aeFaqs,
} from "../utils/Constant/uae";

/**
 * /ae — the United Arab Emirates market page.
 *
 * This page inverts the order used by /nz, /us, /au and /ca. Those four lead with compliance
 * because none of them had delivered work in its market to lead with. This one does, so
 * evidence is the first in-page section and the limit of that evidence is stated in the
 * heading beside it rather than in a caveat further down. The engagement was web and search
 * work, and nothing on this page may let it stand in for AI, SaaS or platform capability.
 *
 * The jurisdiction argument follows immediately: which of mainland, free zone, DIFC or ADGM
 * a company sits in decides which data law reaches its product. No competitor page reviewed
 * during research covers it, and no other page on this site discusses choosing a legal
 * jurisdiction inside one country.
 *
 * See src/utils/Constant/uae.js for the evidence-fork rule (do NOT import clientProof here),
 * the five prohibited collisions, the banned-phrase lists for Arabic and DIFC Regulation 10,
 * and why the PDPL executive-regulation status is deliberately not asserted.
 */
const UAEPage = () => {
  const { onOpen: openBooking } = useBooking();

  // Shape and site-wide values live in buildCountrySchema; only what is genuinely Emirati
  // belongs here. The country registry supplies the path, label and language tag, so the
  // schema cannot disagree with the hreflang cluster or the footer link.
  //
  // `languages` is deliberately NOT overridden. This page discusses Arabic obligations at
  // length, which makes passing ["English", "Arabic"] tempting — and it would be an
  // unverifiable capability claim published as structured data.
  //
  // No Review or AggregateRating node either. A real testimonial exists, but it belongs to
  // the homepage, not to this page, and the builder does not emit one.
  const jsonLd = buildCountrySchema({
    code: "ae",
    title: aeMeta.title,
    description: aeMeta.description,
    regions: ["Dubai", "Abu Dhabi", "Sharjah", "Ras Al Khaimah"],
    currency: "AED",
    faqs: aeFaqs,
    image: "/home.png",
  });

  return (
    <Box>
      <Seo
        title={aeMeta.title}
        description={aeMeta.description}
        path="/ae"
        keywords={aeMeta.keywords}
        image="/home.png"
        jsonLd={jsonLd}
        alternates={COUNTRY_ALTERNATES}
      />

      {/* Hero — sets up evidence rather than compliance, because evidence leads this page. */}
      <Box position="relative" overflow="hidden" pt={{ base: 12, md: 20 }} pb={{ base: 8, md: 12 }}>
        <Box position="absolute" top="-15%" left="-5%" w="500px" h="500px" bg="rgba(123,108,255,0.18)" filter="blur(120px)" rounded="full" pointerEvents="none" />
        <Container maxW="1200px" px={{ base: 5, md: 8 }} position="relative">
          <Reveal><Eyebrow>United Arab Emirates</Eyebrow></Reveal>
          <Reveal delay={0.05}>
            <Heading as="h1" mt={5} fontSize={{ base: "38px", md: "56px" }} lineHeight={1.08} letterSpacing="-0.025em" maxW="940px">
              Software development for{" "}
              <Box as="span" className="gradient-text">UAE businesses</Box>
            </Heading>
          </Reveal>
          <Reveal delay={0.1}>
            <Text mt={6} color="text.muted" fontSize={{ base: "md", md: "xl" }} lineHeight={1.7} maxW="800px">
              Custom software, AI and SaaS for companies building here. We have delivered one
              project in Dubai and say exactly what it was before anything else. The rest of
              this page covers the decisions — jurisdiction, Arabic, licensing, invoicing —
              that are cheap early and expensive later.
            </Text>
          </Reveal>
          <Reveal delay={0.15}>
            <HStack spacing={3} mt={8} flexWrap="wrap" rowGap={3}>
              <Button variant="gradient" size="lg" rightIcon={<FiArrowRight />} onClick={() => openBooking("ae-hero")}>
                Book a strategy call
              </Button>
              <Button as={Link} to="/contact" variant="outlineGlow" size="lg">
                Send us your scope
              </Button>
            </HStack>
          </Reveal>
        </Container>
      </Box>

      {/* 1 — Evidence. First section by design. */}
      <Container maxW="1200px" px={{ base: 5, md: 8 }} py={{ base: 12, md: 16 }}>
        <Reveal><Eyebrow>Delivered work</Eyebrow></Reveal>
        <Reveal delay={0.05}>
          <Heading as="h2" mt={4} mb={3} fontSize={{ base: "28px", md: "38px" }} lineHeight={1.15} maxW="900px">
            What we&apos;ve shipped in the UAE —{" "}
            <Box as="span" className="gradient-text">and what we haven&apos;t</Box>
          </Heading>
        </Reveal>
        <Reveal delay={0.1}>
          <Text color="text.muted" fontSize={{ base: "md", md: "lg" }} lineHeight={1.7} maxW="780px" mb={10}>
            Most suppliers open with capability. This opens with the record, including its
            limits.
          </Text>
        </Reveal>
        <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={5}>
          {aeEvidence.map((e, i) => (
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
        {/* The portfolio link carries the evidence so this page does not have to restate it.
            See the evidence-fork rule in src/utils/Constant/uae.js. */}
        <Reveal delay={0.12}>
          <HStack spacing={3} mt={8} flexWrap="wrap" rowGap={3}>
            <Button as={Link} to="/portfolio" variant="outlineGlow" size="lg" rightIcon={<FiArrowUpRight />}>
              See the project on our portfolio
            </Button>
          </HStack>
        </Reveal>
      </Container>

      {/* 2 — Jurisdiction */}
      <Box bg="rgba(255,255,255,0.015)" borderY="1px solid" borderColor="border.subtle">
        <Container maxW="1200px" px={{ base: 5, md: 8 }} py={{ base: 14, md: 20 }}>
          <Reveal><Eyebrow>Legal geography</Eyebrow></Reveal>
          <Reveal delay={0.05}>
            <Heading as="h2" mt={4} mb={3} fontSize={{ base: "28px", md: "38px" }} lineHeight={1.15} maxW="860px">
              Which UAE are you{" "}
              <Box as="span" className="gradient-text">building in?</Box>
            </Heading>
          </Reveal>
          <Reveal delay={0.1}>
            <Text color="text.muted" fontSize={{ base: "md", md: "lg" }} lineHeight={1.7} maxW="800px" mb={10}>
              The question nobody asks a development agency and everybody should. Where the
              company is registered decides which data law reaches your product.
            </Text>
          </Reveal>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
            {aeJurisdictions.map((j, i) => (
              <Reveal key={j.title} delay={0.03 * i}>
                <GlassCard p={7} h="full">
                  <Heading as="h3" fontSize={{ base: "17px", md: "19px" }} lineHeight={1.3} mb={3}>
                    {j.title}
                  </Heading>
                  <Text color="text.muted" fontSize={{ base: "14px", md: "15px" }} lineHeight={1.75}>
                    {j.detail}
                  </Text>
                </GlassCard>
              </Reveal>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* 3 — E-invoicing */}
      <Container maxW="1200px" px={{ base: 5, md: 8 }} py={{ base: 12, md: 16 }}>
        <Reveal><Eyebrow>Coming into force</Eyebrow></Reveal>
        <Reveal delay={0.05}>
          <Heading as="h2" mt={4} mb={3} fontSize={{ base: "28px", md: "38px" }} lineHeight={1.15} maxW="860px">
            The invoice format is changing,{" "}
            <Box as="span" className="gradient-text">and it is code</Box>
          </Heading>
        </Reveal>
        <Reveal delay={0.1}>
          <Text color="text.muted" fontSize={{ base: "md", md: "lg" }} lineHeight={1.7} maxW="780px" mb={10}>
            Rare among compliance obligations, this one has published dates and no ambiguity
            about who it reaches. It lands in the data model.
          </Text>
        </Reveal>
        <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={5}>
          {aeInvoicing.map((n, i) => (
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

      {/* 4 — Arabic and right-to-left */}
      <Box bg="rgba(255,255,255,0.015)" borderY="1px solid" borderColor="border.subtle">
        <Container maxW="1200px" px={{ base: 5, md: 8 }} py={{ base: 14, md: 20 }}>
          <Reveal><Eyebrow>Localisation</Eyebrow></Reveal>
          <Reveal delay={0.05}>
            <Heading as="h2" mt={4} mb={3} fontSize={{ base: "28px", md: "38px" }} lineHeight={1.15} maxW="900px">
              Arabic is a layout problem{" "}
              <Box as="span" className="gradient-text">before it is a language problem</Box>
            </Heading>
          </Reveal>
          <Reveal delay={0.1}>
            <Text color="text.muted" fontSize={{ base: "md", md: "lg" }} lineHeight={1.7} maxW="800px" mb={10}>
              Teams budget for words and are surprised by geometry. The requirement is
              narrower than expected; the consequence is wider.
            </Text>
          </Reveal>
          <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={5}>
            {aeArabic.map((a, i) => (
              <Reveal key={a.title} delay={0.03 * i}>
                <GlassCard p={7} h="full">
                  <Heading as="h3" fontSize={{ base: "17px", md: "19px" }} lineHeight={1.3} mb={3}>
                    {a.title}
                  </Heading>
                  <Text color="text.muted" fontSize={{ base: "14px", md: "15px" }} lineHeight={1.75}>
                    {a.detail}
                  </Text>
                </GlassCard>
              </Reveal>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* 5 — Licence-first products */}
      <Container maxW="1200px" px={{ base: 5, md: 8 }} py={{ base: 12, md: 16 }}>
        <Reveal><Eyebrow>Regulated products</Eyebrow></Reveal>
        <Reveal delay={0.05}>
          <Heading as="h2" mt={4} mb={3} fontSize={{ base: "28px", md: "38px" }} lineHeight={1.15} maxW="860px">
            Where a licence comes{" "}
            <Box as="span" className="gradient-text">before the build</Box>
          </Heading>
        </Reveal>
        <Reveal delay={0.1}>
          <Text color="text.muted" fontSize={{ base: "md", md: "lg" }} lineHeight={1.7} maxW="780px" mb={10}>
            For one category of product here, the permission decides the specification —
            reversing the order most teams work in.
          </Text>
        </Reveal>
        <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={5}>
          {aeLicence.map((l, i) => (
            <Reveal key={l.title} delay={0.03 * i}>
              <GlassCard p={7} h="full">
                <Heading as="h3" fontSize={{ base: "17px", md: "19px" }} lineHeight={1.3} mb={3}>
                  {l.title}
                </Heading>
                <Text color="text.muted" fontSize={{ base: "14px", md: "15px" }} lineHeight={1.75}>
                  {l.detail}
                </Text>
              </GlassCard>
            </Reveal>
          ))}
        </SimpleGrid>
      </Container>

      {/* 6 — Sectors */}
      <Box bg="rgba(255,255,255,0.015)" borderY="1px solid" borderColor="border.subtle">
        <Container maxW="1200px" px={{ base: 5, md: 8 }} py={{ base: 14, md: 20 }}>
          {/* Heading must not match /ca's "Where these obligations concentrate" or /au's
              "Where these obligations land hardest" — the zero-shared-H2 gate is absolute. */}
          <Reveal><Eyebrow>Where it applies</Eyebrow></Reveal>
          <Reveal delay={0.05}>
            <Heading as="h2" mt={4} mb={3} fontSize={{ base: "28px", md: "38px" }} lineHeight={1.15} maxW="860px">
              Who ends up inside{" "}
              <Box as="span" className="gradient-text">these rules</Box>
            </Heading>
          </Reveal>
          <Reveal delay={0.1}>
            <Text color="text.muted" fontSize={{ base: "md", md: "lg" }} lineHeight={1.7} maxW="780px" mb={10}>
              Grouped by the obligation that reaches them rather than by industry, and
              described by the shape of the engineering problem.
            </Text>
          </Reveal>
          <VStack spacing={4} align="stretch">
            {aeSectors.map((s, i) => (
              <Reveal key={s.sector} delay={0.04 * i}>
                <GlassCard p={{ base: 6, md: 8 }}>
                  <Flex direction={{ base: "column", lg: "row" }} gap={{ base: 3, lg: 10 }}>
                    <Box flex={{ lg: "0 0 30%" }}>
                      <Heading as="h3" fontSize={{ base: "19px", md: "22px" }} lineHeight={1.25}>
                        {s.sector}
                      </Heading>
                    </Box>
                    <Text flex="1" color="text.muted" fontSize={{ base: "14px", md: "15px" }} lineHeight={1.75}>
                      {s.detail}
                    </Text>
                  </Flex>
                </GlassCard>
              </Reveal>
            ))}
          </VStack>
        </Container>
      </Box>

      {/* 7 — Fit, with the two pricing considerations folded in from the removed cost
          section. The /pricing link and the mid-page CTA relocated here with them. */}
      <Container maxW="1200px" px={{ base: 5, md: 8 }} py={{ base: 12, md: 16 }}>
        <Reveal><Eyebrow>Fit</Eyebrow></Reveal>
        <Reveal delay={0.05}>
          <Heading as="h2" mt={4} mb={3} fontSize={{ base: "28px", md: "38px" }} lineHeight={1.15} maxW="860px">
            When to hire in the UAE,{" "}
            <Box as="span" className="gradient-text">and when not to</Box>
          </Heading>
        </Reveal>
        <Reveal delay={0.1}>
          <Text color="text.muted" fontSize={{ base: "md", md: "lg" }} lineHeight={1.7} maxW="800px" mb={10}>
            Every reason below turns on something only true here. Where a local supplier is the
            better answer, we say so.
          </Text>
        </Reveal>
        <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={5}>
          {aeFit.map((t, i) => (
            <Reveal key={t.heading} delay={0.04 * i}>
              <GlassCard p={7} h="full">
                <Heading as="h3" fontSize={{ base: "17px", md: "19px" }} lineHeight={1.3} mb={4}>
                  {t.heading}
                </Heading>
                <List spacing={3}>
                  {t.points.map((p) => (
                    <ListItem key={p} display="flex" alignItems="flex-start" gap={3}>
                      <Icon as={FiCheck} color="accent.solid" mt="4px" flexShrink={0} />
                      <Text color="text.muted" fontSize={{ base: "14px", md: "15px" }} lineHeight={1.7}>
                        {p}
                      </Text>
                    </ListItem>
                  ))}
                </List>
              </GlassCard>
            </Reveal>
          ))}
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5} mt={5}>
          {aePricingNotes.map((c, i) => (
            <Reveal key={c.title} delay={0.03 * i}>
              <GlassCard p={7} h="full">
                <Heading as="h3" fontSize={{ base: "17px", md: "19px" }} lineHeight={1.3} mb={3}>
                  {c.title}
                </Heading>
                <Text color="text.muted" fontSize={{ base: "14px", md: "15px" }} lineHeight={1.75}>
                  {c.detail}
                </Text>
              </GlassCard>
            </Reveal>
          ))}
        </SimpleGrid>

        <Reveal delay={0.15}>
          <HStack spacing={3} mt={8} flexWrap="wrap" rowGap={3}>
            <Button as={Link} to="/pricing" variant="outlineGlow" size="lg" rightIcon={<FiArrowUpRight />}>
              See what drives an estimate
            </Button>
            <Button variant="gradient" size="lg" rightIcon={<FiArrowRight />} onClick={() => openBooking("ae-fit")}>
              Get a fixed-scope estimate
            </Button>
          </HStack>
        </Reveal>
      </Container>

      {/* 8 — Services + guides */}
      <Box bg="rgba(255,255,255,0.015)" borderY="1px solid" borderColor="border.subtle">
        <Container maxW="1200px" px={{ base: 5, md: 8 }} py={{ base: 14, md: 20 }}>
          <Reveal><Eyebrow>Services &amp; cost guides</Eyebrow></Reveal>
          <Reveal delay={0.05}>
            <Heading as="h2" mt={4} mb={3} fontSize={{ base: "28px", md: "38px" }} lineHeight={1.15} maxW="860px">
              Services and the{" "}
              <Box as="span" className="gradient-text">guides that price them</Box>
            </Heading>
          </Reveal>
          <Reveal delay={0.1}>
            <Text color="text.muted" fontSize={{ base: "md", md: "lg" }} lineHeight={1.7} maxW="760px" mb={10}>
              Every service below is available to clients here, and every guide is already
              published.
            </Text>
          </Reveal>

          <Reveal>
            <Heading as="h3" fontSize={{ base: "18px", md: "20px" }} mb={4}>Services</Heading>
          </Reveal>
          {/* Single column on the narrowest phones: at 390px, two columns leave the longest
              labels too little room and the button's trailing icon pushes past the viewport,
              giving the page a horizontal scrollbar. */}
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={3} mb={12}>
            {NavbarservicesOptions.map((s, i) => (
              <Reveal key={s.option} delay={0.02 * i}>
                <Button as={Link} to={s.path} variant="outlineGlow" size="md" w="full" justifyContent="space-between" rightIcon={<FiArrowUpRight />} fontSize={{ base: "13px", md: "14px" }}>
                  {s.option}
                </Button>
              </Reveal>
            ))}
          </SimpleGrid>

          <Reveal>
            <Heading as="h3" fontSize={{ base: "18px", md: "20px" }} mb={4}>Cost guides</Heading>
          </Reveal>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
            {aeResources.map((r, i) => (
              <Reveal key={r.to} delay={0.03 * i}>
                <GlassCard p={6} h="full">
                  <Box as={Link} to={r.to} _hover={{ textDecoration: "none" }} display="block">
                    <HStack spacing={2} align="start" mb={2}>
                      <Heading as="h4" fontSize={{ base: "15px", md: "16px" }} lineHeight={1.35}>
                        {r.title}
                      </Heading>
                      <Icon as={FiArrowUpRight} color="accent.solid" flexShrink={0} mt="2px" />
                    </HStack>
                    <Text color="text.muted" fontSize="14px" lineHeight={1.7}>{r.blurb}</Text>
                  </Box>
                </GlassCard>
              </Reveal>
            ))}
          </SimpleGrid>

          <Reveal delay={0.12}>
            <HStack spacing={3} mt={10} flexWrap="wrap" rowGap={3}>
              <Button as={Link} to="/case-studies" variant="outlineGlow" size="lg" rightIcon={<FiArrowUpRight />}>
                Read our case studies
              </Button>
              <Button as={Link} to="/about" variant="ghostLink" size="lg" rightIcon={<FiArrowUpRight />}>
                Who you would be working with
              </Button>
            </HStack>
          </Reveal>
        </Container>
      </Box>

      <Faqs
        items={aeFaqs}
        eyebrow="UAE FAQ"
        title="Questions from"
        highlight="Emirates buyers."
        intro="What enquirers here ask before the first call, including three whose honest answer costs us the work."
      />

      <CTASection
        eyebrow="Start in the UAE"
        title="Building for customers in"
        highlight="Dubai or Abu Dhabi?"
        subtitle="Book a scoping call, or send the scope and we'll come back with a written understanding of what you are building and which obligations reach it."
        primaryLabel="Book a strategy call"
        secondaryLabel="Send us your scope"
        secondaryTo="/contact"
        // Without onPrimary this button navigates to primaryTo, so a CTA labelled
        // "Book a strategy call" would silently land on the contact form instead of
        // opening the booking flow.
        onPrimary={() => openBooking("ae-cta")}
      />
    </Box>
  );
};

export default UAEPage;
