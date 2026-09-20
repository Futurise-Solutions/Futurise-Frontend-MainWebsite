'use client'

/**
 * /nz page body — ported VERBATIM from NewZealandPage.jsx.
 *
 * Only three things differ from the source:
 *   1. <Seo .../> is gone — metadata moves to the Metadata API in page.tsx and
 *      the JSON-LD to <JsonLd/>, both SERVER-rendered (the old one ran in a
 *      useEffect, so it existed only after hydration).
 *   2. the copy lives in a content module and is imported.
 *   3. imports are rewritten for the new paths.
 * Every style prop, every element and every string is byte-for-byte unchanged.
 */
import {
  Box, Container, Heading, Text, VStack, HStack, SimpleGrid, Icon, Flex, Button, List, ListItem, Link as ChakraLink
} from "@chakra-ui/react";
import NextImage from "next/image";
import Link from "next/link";
import { FiArrowRight, FiCheck, FiArrowUpRight } from "react-icons/fi";
import { Reveal, Eyebrow, GlassCard, CTASection, MarketHero, VisualBand } from "@/components/common";
import Faqs from "@/components/home/Faqs";
import { useBooking } from "@/context/BookingContext";
import { NavbarservicesOptions } from "@/utils/Constant";
import { COUNTRY_ALTERNATES } from "@/utils/Constant/countries";
import { buildCountrySchema } from "@/utils/countrySchema";
import { marketNz, marketReach } from "@/assests";
import {
  nzMeta, marketRealities, offshoreTradeoffs, nzSectors, nzIntegrations,
  nzCompliance, costModel, workingModel, nzResources, nzFaqs,
} from "@/utils/Constant/newZealand";

export default function NewZealandPageBody() {
  const { onOpen: openBooking } = useBooking();

  // Shape and site-wide values live in buildCountrySchema; only what is genuinely New
  // Zealand belongs here. The country registry supplies the path, label and language tag,
  // so the schema cannot disagree with the hreflang cluster or the footer link.
  return (
    <Box>
      {/* Hero — market-specific atmosphere plate behind the shared texture. */}
      <MarketHero image={marketNz}>
          <Reveal><Eyebrow>New Zealand</Eyebrow></Reveal>
          <Reveal delay={0.05}>
            <Heading as="h1" mt={5} fontSize={{ base: "38px", md: "56px" }} lineHeight={1.08} letterSpacing="-0.025em" maxW="920px">
              Software development for{" "}
              <Box as="span" className="gradient-text">New Zealand businesses</Box>
            </Heading>
          </Reveal>
          <Reveal delay={0.1}>
            <Text mt={6} color="text.muted" fontSize={{ base: "md", md: "xl" }} lineHeight={1.7} maxW="760px">
              Custom software, AI and SaaS built for companies operating from Aotearoa —
              quoted in New Zealand dollars, scoped against Privacy Act 2020 obligations, and
              delivered so that reviews land in your morning rather than three days later.
            </Text>
          </Reveal>
          <Reveal delay={0.15}>
            <HStack spacing={3} mt={8} flexWrap="wrap" rowGap={3}>
              <Button variant="gradient" size="lg" rightIcon={<FiArrowRight />} onClick={() => openBooking("nz-hero")}>
                Book a strategy call
              </Button>
              <Button as={Link} href="/contact" variant="outlineGlow" size="lg">
                Send us your scope
              </Button>
            </HStack>
          </Reveal>
      </MarketHero>

      {/* Market realities */}
      <Container maxW="container.site" px={{ base: 5, md: 8 }} py={{ base: 12, md: 16 }}>
        <Reveal><Eyebrow>The market</Eyebrow></Reveal>
        <Reveal delay={0.05}>
          <Heading as="h2" className="speakable-question" mt={4} mb={3} fontSize={{ base: "28px", md: "38px" }} lineHeight={1.15} maxW="780px">
            What building software here{" "}
            <Box as="span" className="gradient-text">actually changes</Box>
          </Heading>
        </Reveal>
        <Reveal delay={0.1}>
          <Text className="speakable-answer" color="text.muted" fontSize={{ base: "md", md: "lg" }} lineHeight={1.7} maxW="700px" mb={10}>
            Four structural facts about the New Zealand market that change engineering
            decisions, not just marketing copy.
          </Text>
        </Reveal>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
          {marketRealities.map((m, i) => (
            <Reveal key={m.title} delay={0.03 * i}>
              <GlassCard p={7} h="full">
                <Heading as="h3" fontSize={{ base: "17px", md: "19px" }} lineHeight={1.3} mb={3}>
                  {m.title}
                </Heading>
                <Text color="text.muted" fontSize={{ base: "14px", md: "15px" }} lineHeight={1.75}>
                  {m.detail}
                </Text>
              </GlassCard>
            </Reveal>
          ))}
        </SimpleGrid>
      </Container>

      {/* Local vs offshore */}
      <Box bg="rgba(255,255,255,0.015)" borderY="1px solid" borderColor="border.subtle">
        <Container maxW="container.site" px={{ base: 5, md: 8 }} py={{ base: 14, md: 20 }}>
          <Reveal><Eyebrow>Local vs offshore</Eyebrow></Reveal>
          <Reveal delay={0.05}>
            <Heading as="h2" className="speakable-question" mt={4} mb={3} fontSize={{ base: "28px", md: "38px" }} lineHeight={1.15} maxW="780px">
              The honest version of{" "}
              <Box as="span" className="gradient-text">the offshore question</Box>
            </Heading>
          </Reveal>
          <Reveal delay={0.1}>
            <Text className="speakable-answer" color="text.muted" fontSize={{ base: "md", md: "lg" }} lineHeight={1.7} maxW="720px" mb={10}>
              Every New Zealand buyer weighs this, and most suppliers answer it by claiming
              their own model always wins. It does not. Here is where each genuinely does.
            </Text>
          </Reveal>
          <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={5}>
            {offshoreTradeoffs.map((t, i) => (
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
        </Container>
      </Box>

      {/* Sectors */}
      <Container maxW="container.site" px={{ base: 5, md: 8 }} py={{ base: 12, md: 16 }}>
        <Reveal><Eyebrow>Where we work</Eyebrow></Reveal>
        <Reveal delay={0.05}>
          <Heading as="h2" mt={4} mb={10} fontSize={{ base: "28px", md: "38px" }} lineHeight={1.15} maxW="780px">
            What New Zealand businesses{" "}
            <Box as="span" className="gradient-text">ask us to build</Box>
          </Heading>
        </Reveal>
        <VStack spacing={4} align="stretch">
          {nzSectors.map((s, i) => (
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

      {/* Integrations */}
      <Box bg="rgba(255,255,255,0.015)" borderY="1px solid" borderColor="border.subtle">
        <Container maxW="container.site" px={{ base: 5, md: 8 }} py={{ base: 14, md: 20 }}>
          <Reveal><Eyebrow>Integrations</Eyebrow></Reveal>
          <Reveal delay={0.05}>
            <Heading as="h2" className="speakable-question" mt={4} mb={3} fontSize={{ base: "28px", md: "38px" }} lineHeight={1.15} maxW="780px">
              The systems your software{" "}
              <Box as="span" className="gradient-text">has to talk to</Box>
            </Heading>
          </Reveal>
          <Reveal delay={0.1}>
            <Text className="speakable-answer" color="text.muted" fontSize={{ base: "md", md: "lg" }} lineHeight={1.7} maxW="700px" mb={10}>
              Most New Zealand business software is an integration problem before it is a
              build problem. These are the connections we are asked for most.
            </Text>
          </Reveal>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
            {nzIntegrations.map((it, i) => (
              <Reveal key={it.name} delay={0.03 * i}>
                <GlassCard p={6} h="full">
                  <Heading as="h3" fontSize={{ base: "16px", md: "17px" }} mb={2}>{it.name}</Heading>
                  <Text color="text.muted" fontSize="14px" lineHeight={1.7}>{it.detail}</Text>
                </GlassCard>
              </Reveal>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Compliance */}
      {/* Mid-page visual break. These pages run eight or more text-and-card
          sections back to back, which reads as documentation; this is the pause.
          The line restates the page's own argument rather than adding a claim. */}
      <VisualBand
        src={marketReach}
        title="Distance is a constraint,"
        highlight="not an excuse"
        subtitle="Reviews land in your morning, not three days later."
        height={{ base: "260px", md: "340px", lg: "380px" }}
        overlay={0.5}
      />

      <Container maxW="container.site" px={{ base: 5, md: 8 }} py={{ base: 12, md: 16 }}>
        <Reveal><Eyebrow>Compliance</Eyebrow></Reveal>
        <Reveal delay={0.05}>
          <Heading as="h2" mt={4} mb={10} fontSize={{ base: "28px", md: "38px" }} lineHeight={1.15} maxW="780px">
            New Zealand obligations that{" "}
            <Box as="span" className="gradient-text">shape the build</Box>
          </Heading>
        </Reveal>
        <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={5}>
          {nzCompliance.map((c, i) => (
            <Reveal key={c.title} delay={0.04 * i}>
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
      </Container>

      {/* Cost model */}
      <Box bg="rgba(255,255,255,0.015)" borderY="1px solid" borderColor="border.subtle">
        <Container maxW="container.site" px={{ base: 5, md: 8 }} py={{ base: 14, md: 20 }}>
          <Reveal><Eyebrow>Quoting &amp; invoicing</Eyebrow></Reveal>
          <Reveal delay={0.05}>
            <Heading as="h2" mt={4} mb={10} fontSize={{ base: "28px", md: "38px" }} lineHeight={1.15} maxW="780px">
              How we price work{" "}
              <Box as="span" className="gradient-text">in New Zealand dollars</Box>
            </Heading>
          </Reveal>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
            {costModel.map((c, i) => (
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
              <Button as={Link} href="/pricing" variant="outlineGlow" size="lg" rightIcon={<FiArrowUpRight />}>
                See what drives an estimate
              </Button>
              <Button variant="gradient" size="lg" rightIcon={<FiArrowRight />} onClick={() => openBooking("nz-pricing")}>
                Get a fixed-scope estimate
              </Button>
            </HStack>
          </Reveal>
        </Container>
      </Box>

      {/* Working model */}
      <Container maxW="container.site" px={{ base: 5, md: 8 }} py={{ base: 12, md: 16 }}>
        <Reveal><Eyebrow>How we work</Eyebrow></Reveal>
        <Reveal delay={0.05}>
          <Heading as="h2" mt={4} mb={10} fontSize={{ base: "28px", md: "38px" }} lineHeight={1.15} maxW="780px">
            Working with us{" "}
            <Box as="span" className="gradient-text">from New Zealand</Box>
          </Heading>
        </Reveal>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
          {workingModel.map((w, i) => (
            <Reveal key={w.step} delay={0.03 * i}>
              <GlassCard p={7} h="full">
                <HStack spacing={3} align="start" mb={3}>
                  <Flex boxSize="26px" flexShrink={0} align="center" justify="center" borderRadius="full" bg="rgba(180,160,255,0.16)" mt="2px">
                    <Text fontSize="12px" fontWeight={700} color="accent.solid">{i + 1}</Text>
                  </Flex>
                  <Heading as="h3" fontSize={{ base: "17px", md: "19px" }} lineHeight={1.3}>
                    {w.step}
                  </Heading>
                </HStack>
                <Text color="text.muted" fontSize={{ base: "14px", md: "15px" }} lineHeight={1.75}>
                  {w.detail}
                </Text>
              </GlassCard>
            </Reveal>
          ))}
        </SimpleGrid>
      </Container>

      {/* Services + resources */}
      <Box bg="rgba(255,255,255,0.015)" borderY="1px solid" borderColor="border.subtle">
        <Container maxW="container.site" px={{ base: 5, md: 8 }} py={{ base: 14, md: 20 }}>
          <Reveal><Eyebrow>Services &amp; guides</Eyebrow></Reveal>
          <Reveal delay={0.05}>
            <Heading as="h2" mt={4} mb={10} fontSize={{ base: "28px", md: "38px" }} lineHeight={1.15} maxW="780px">
              What we build, and what{" "}
              <Box as="span" className="gradient-text">we have published on it</Box>
            </Heading>
          </Reveal>

          <Reveal>
            <Heading as="h3" fontSize={{ base: "18px", md: "20px" }} mb={4}>Services available to New Zealand clients</Heading>
          </Reveal>
          {/* Single column on the narrowest phones: at 390px, two columns leave the
              longest labels ("Blockchain Development") too little room and the button's
              trailing icon pushes 3px past the viewport, giving the page a horizontal
              scrollbar. */}
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={3} mb={12}>
            {NavbarservicesOptions.map((s, i) => (
              <Reveal key={s.option} delay={0.02 * i}>
                <ChakraLink
                  as={Link}
                  href={s.path}
                  role="group"
                  display="flex"
                  alignItems="center"
                  gap={3}
                  h="full"
                  px={4}
                  py={3.5}
                  borderRadius="14px"
                  bgGradient="linear(160deg, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.018) 100%)"
                  border="1px solid"
                  borderColor="border.subtle"
                  boxShadow="inset 0 1px 0 rgba(255,255,255,0.07)"
                  transition="transform .28s cubic-bezier(0.22,1,0.36,1), border-color .28s ease, box-shadow .28s ease"
                  _hover={{
                    textDecoration: "none",
                    transform: "translateY(-3px)",
                    borderColor: "rgba(180,160,255,0.34)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12), 0 18px 36px -22px rgba(123,108,255,0.6)",
                  }}
                >
                  <Flex
                    w="38px"
                    h="38px"
                    flexShrink={0}
                    borderRadius="11px"
                    align="center"
                    justify="center"
                    bg="rgba(180,160,255,0.1)"
                    border="1px solid"
                    borderColor="rgba(180,160,255,0.22)"
                    transition="background .28s ease"
                    _groupHover={{ bg: "rgba(180,160,255,0.18)" }}
                  >
                    {/* D27: next/image with the static import passed directly; 19x19 intrinsic. */}
                    <NextImage src={s.icon} alt="" aria-hidden="true" width={19} height={19} />
                  </Flex>
                  <Box flex="1" minW={0}>
                    <Text fontSize={{ base: "13.5px", md: "14px" }} fontWeight={600} color="text.primary" lineHeight={1.3} noOfLines={1}>
                      {s.option}
                    </Text>
                    <Text fontSize="11.5px" color="text.faint" lineHeight={1.35} noOfLines={1}>
                      {s.desc}
                    </Text>
                  </Box>
                  <Icon
                    as={FiArrowUpRight}
                    boxSize={4}
                    color="text.faint"
                    flexShrink={0}
                    transition="color .28s ease, transform .28s ease"
                    _groupHover={{ color: "accent.solid", transform: "translate(2px,-2px)" }}
                  />
                </ChakraLink>
              </Reveal>
            ))}
          </SimpleGrid>

          <Reveal>
            <Heading as="h3" fontSize={{ base: "18px", md: "20px" }} mb={4}>New Zealand guides we have published</Heading>
          </Reveal>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
            {nzResources.map((r, i) => (
              <Reveal key={r.to} delay={0.03 * i}>
                <GlassCard p={6} h="full">
                  <Box as={Link} href={r.to} _hover={{ textDecoration: "none" }} display="block">
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
              <Button as={Link} href="/case-studies" variant="outlineGlow" size="lg" rightIcon={<FiArrowUpRight />}>
                Read our case studies
              </Button>
              <Button as={Link} href="/blog" variant="ghostLink" size="lg" rightIcon={<FiArrowUpRight />}>
                All articles
              </Button>
            </HStack>
          </Reveal>
        </Container>
      </Box>

      <Faqs
        items={nzFaqs}
        eyebrow="New Zealand FAQ"
        title="Questions from"
        highlight="New Zealand buyers."
        intro="The things NZ enquirers ask before the first call. If yours is not here, send it over — we answer within one business day."
      />

      <CTASection
        eyebrow="Start in New Zealand"
        title="Building something in"
        highlight="New Zealand?"
        subtitle="Book a scoping call in your working day, or send us the scope and we'll come back with a fixed-scope estimate in New Zealand dollars."
        primaryLabel="Book a strategy call"
        secondaryLabel="Send us your scope"
        secondaryTo="/contact"
        // Without onPrimary this button navigates to primaryTo, so a CTA labelled
        // "Book a strategy call" would silently land on the contact form instead of
        // opening the booking flow.
        onPrimary={() => openBooking("nz-cta")}
      />
    </Box>
  );
}
