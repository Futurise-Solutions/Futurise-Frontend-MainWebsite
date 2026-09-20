'use client'

/**
 * /ca page body — ported VERBATIM from CanadaPage.jsx.
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
import { marketCa, marketReach } from "@/assests";
import {
  caMeta, caInterface, caQuebec, caChanges2026, caSupervision, caSred,
  caSectors, partnerFit, caCostModel, caResources, caFaqs,
} from "@/utils/Constant/canada";

export default function CanadaPageBody() {
  const { onOpen: openBooking } = useBooking();

  // Shape and site-wide values live in buildCountrySchema; only what is genuinely Canadian
  // belongs here. The country registry supplies the path, label and language tag, so the
  // schema cannot disagree with the hreflang cluster or the footer link.
  //
  // `languages` is deliberately NOT overridden. This page discusses French-language
  // obligations at length, which makes passing ["English", "French"] tempting — and it would
  // be an unverifiable capability claim published as structured data. It stays at the
  // builder's default.
  return (
    <Box>
      {/* Hero — market-specific atmosphere plate behind the shared texture. */}
      <MarketHero image={marketCa}>
          <Reveal><Eyebrow>Canada</Eyebrow></Reveal>
          <Reveal delay={0.05}>
            <Heading as="h1" mt={5} fontSize={{ base: "38px", md: "56px" }} lineHeight={1.08} letterSpacing="-0.025em" maxW="940px">
              Software development for{" "}
              <Box as="span" className="gradient-text">Canadian businesses</Box>
            </Heading>
          </Reveal>
          <Reveal delay={0.1}>
            <Text mt={6} color="text.muted" fontSize={{ base: "md", md: "xl" }} lineHeight={1.7} maxW="800px">
              Custom software, AI and SaaS for companies building under Canadian obligations.
              Here the rules reach the surface your users actually touch — the language it
              renders in, whether it can be operated without a mouse, whether a person can
              contest an automated decision. Those are product decisions, and they are cheapest
              in week one.
            </Text>
          </Reveal>
          <Reveal delay={0.15}>
            <HStack spacing={3} mt={8} flexWrap="wrap" rowGap={3}>
              <Button variant="gradient" size="lg" rightIcon={<FiArrowRight />} onClick={() => openBooking("ca-hero")}>
                Book a strategy call
              </Button>
              <Button as={Link} href="/contact" variant="outlineGlow" size="lg">
                Send us your scope
              </Button>
            </HStack>
          </Reveal>
      </MarketHero>

      {/* The interface obligations — the thesis */}
      <Container maxW="container.site" px={{ base: 5, md: 8 }} py={{ base: 12, md: 16 }}>
        <Reveal><Eyebrow>The starting point</Eyebrow></Reveal>
        <Reveal delay={0.05}>
          <Heading as="h2" className="speakable-question" mt={4} mb={3} fontSize={{ base: "28px", md: "38px" }} lineHeight={1.15} maxW="860px">
            What Canadian law puts{" "}
            <Box as="span" className="gradient-text">on the screen</Box>
          </Heading>
        </Reveal>
        <Reveal delay={0.1}>
          <Text className="speakable-answer" color="text.muted" fontSize={{ base: "md", md: "lg" }} lineHeight={1.7} maxW="780px" mb={10}>
            Most compliance conversations are about data at rest. Canada&apos;s are unusual in
            how much of the obligation reaches the interface itself. These four are the ones
            that change what gets built.
          </Text>
        </Reveal>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
          {caInterface.map((d, i) => (
            <Reveal key={d.title} delay={0.03 * i}>
              <GlassCard p={7} h="full">
                <Heading as="h3" fontSize={{ base: "17px", md: "19px" }} lineHeight={1.3} mb={3}>
                  {d.title}
                </Heading>
                <Text color="text.muted" fontSize={{ base: "14px", md: "15px" }} lineHeight={1.75}>
                  {d.detail}
                </Text>
              </GlassCard>
            </Reveal>
          ))}
        </SimpleGrid>
      </Container>

      {/* Quebec */}
      <Box bg="rgba(255,255,255,0.015)" borderY="1px solid" borderColor="border.subtle">
        <Container maxW="container.site" px={{ base: 5, md: 8 }} py={{ base: 14, md: 20 }}>
          <Reveal><Eyebrow>Quebec</Eyebrow></Reveal>
          <Reveal delay={0.05}>
            <Heading as="h2" className="speakable-question" mt={4} mb={3} fontSize={{ base: "28px", md: "38px" }} lineHeight={1.15} maxW="860px">
              Where French stops being{" "}
              <Box as="span" className="gradient-text">a translation task</Box>
            </Heading>
          </Reveal>
          <Reveal delay={0.1}>
            <Text className="speakable-answer" color="text.muted" fontSize={{ base: "md", md: "lg" }} lineHeight={1.7} maxW="780px" mb={10}>
              Quebec is the part of this market that most changes an engineering plan, and the
              part suppliers most often quote as though it were a content exercise. It is not.
            </Text>
          </Reveal>
          <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={5}>
            {caQuebec.map((q, i) => (
              <Reveal key={q.title} delay={0.03 * i}>
                <GlassCard p={7} h="full">
                  <Heading as="h3" fontSize={{ base: "17px", md: "19px" }} lineHeight={1.3} mb={3}>
                    {q.title}
                  </Heading>
                  <Text color="text.muted" fontSize={{ base: "14px", md: "15px" }} lineHeight={1.75}>
                    {q.detail}
                  </Text>
                </GlassCard>
              </Reveal>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* 2026 instruments */}
      <Container maxW="container.site" px={{ base: 5, md: 8 }} py={{ base: 12, md: 16 }}>
        <Reveal><Eyebrow>Recent legislation</Eyebrow></Reveal>
        <Reveal delay={0.05}>
          <Heading as="h2" className="speakable-question" mt={4} mb={3} fontSize={{ base: "28px", md: "38px" }} lineHeight={1.15} maxW="860px">
            What changed{" "}
            <Box as="span" className="gradient-text">this year</Box>
          </Heading>
        </Reveal>
        <Reveal delay={0.1}>
          <Text className="speakable-answer" color="text.muted" fontSize={{ base: "md", md: "lg" }} lineHeight={1.7} maxW="780px" mb={10}>
            Two significant statutes received assent in 2026, and most published guidance
            predates both. Just as useful as knowing what they require is knowing what is not
            yet in force — which, in two cases here, is the substance of it.
          </Text>
        </Reveal>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
          {caChanges2026.map((c, i) => (
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
      </Container>

      {/* Supplier supervision */}
      <Box bg="rgba(255,255,255,0.015)" borderY="1px solid" borderColor="border.subtle">
        <Container maxW="container.site" px={{ base: 5, md: 8 }} py={{ base: 14, md: 20 }}>
          <Reveal><Eyebrow>Oversight</Eyebrow></Reveal>
          <Reveal delay={0.05}>
            <Heading as="h2" className="speakable-question" mt={4} mb={3} fontSize={{ base: "28px", md: "38px" }} lineHeight={1.15} maxW="860px">
              How a supplier ends up{" "}
              <Box as="span" className="gradient-text">in your risk register</Box>
            </Heading>
          </Reveal>
          <Reveal delay={0.1}>
            <Text className="speakable-answer" color="text.muted" fontSize={{ base: "md", md: "lg" }} lineHeight={1.7} maxW="780px" mb={10}>
              In Canada a software supplier can sit inside its customer&apos;s supervision
              without ever being regulated itself. Knowing which of these applies before the
              contract is signed avoids a difficult month afterwards.
            </Text>
          </Reveal>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
            {caSupervision.map((s, i) => (
              <Reveal key={s.title} delay={0.03 * i}>
                <GlassCard p={7} h="full">
                  <Heading as="h3" fontSize={{ base: "17px", md: "19px" }} lineHeight={1.3} mb={3}>
                    {s.title}
                  </Heading>
                  <Text color="text.muted" fontSize={{ base: "14px", md: "15px" }} lineHeight={1.75}>
                    {s.detail}
                  </Text>
                </GlassCard>
              </Reveal>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* SR&ED */}
      <Container maxW="container.site" px={{ base: 5, md: 8 }} py={{ base: 12, md: 16 }}>
        <Reveal><Eyebrow>Research credits</Eyebrow></Reveal>
        <Reveal delay={0.05}>
          <Heading as="h2" className="speakable-question" mt={4} mb={3} fontSize={{ base: "28px", md: "38px" }} lineHeight={1.15} maxW="860px">
            The one rule that argues{" "}
            <Box as="span" className="gradient-text">against hiring us</Box>
          </Heading>
        </Reveal>
        <Reveal delay={0.1}>
          <Text className="speakable-answer" color="text.muted" fontSize={{ base: "md", md: "lg" }} lineHeight={1.7} maxW="780px" mb={10}>
            Canada funds research and development through a tax credit, and where the work
            physically happens decides whether it counts. This is the part of the Canadian
            market that genuinely favours a local supplier, so here it is stated plainly rather
            than left for you to find.
          </Text>
        </Reveal>
        <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={5}>
          {caSred.map((s, i) => (
            <Reveal key={s.title} delay={0.03 * i}>
              <GlassCard p={7} h="full">
                <Heading as="h3" fontSize={{ base: "17px", md: "19px" }} lineHeight={1.3} mb={3}>
                  {s.title}
                </Heading>
                <Text color="text.muted" fontSize={{ base: "14px", md: "15px" }} lineHeight={1.75}>
                  {s.detail}
                </Text>
              </GlassCard>
            </Reveal>
          ))}
        </SimpleGrid>
      </Container>

      {/* Sectors */}
      {/* Mid-page visual break. These pages run eight or more text-and-card
          sections back to back, which reads as documentation; this is the pause.
          The line restates the page's own argument rather than adding a claim. */}
      <VisualBand
        src={marketReach}
        title="Two languages,"
        highlight="one product"
        subtitle="Quebec obligations handled in the build, not bolted on after launch."
        height={{ base: "260px", md: "340px", lg: "380px" }}
        overlay={0.5}
      />

      <Box bg="rgba(255,255,255,0.015)" borderY="1px solid" borderColor="border.subtle">
        <Container maxW="container.site" px={{ base: 5, md: 8 }} py={{ base: 14, md: 20 }}>
          <Reveal><Eyebrow>Who this reaches</Eyebrow></Reveal>
          <Reveal delay={0.05}>
            <Heading as="h2" className="speakable-question" mt={4} mb={3} fontSize={{ base: "28px", md: "38px" }} lineHeight={1.15} maxW="860px">
              Where these obligations{" "}
              <Box as="span" className="gradient-text">concentrate</Box>
            </Heading>
          </Reveal>
          <Reveal delay={0.1}>
            <Text className="speakable-answer" color="text.muted" fontSize={{ base: "md", md: "lg" }} lineHeight={1.7} maxW="780px" mb={10}>
              Grouped by the obligation that reaches them rather than by industry, because in
              Canada that is what actually decides the engineering. Described by the shape of
              the problem, never by listing client names we are not free to publish.
            </Text>
          </Reveal>
          <VStack spacing={4} align="stretch">
            {caSectors.map((s, i) => (
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

      {/* Local vs distributed */}
      <Container maxW="container.site" px={{ base: 5, md: 8 }} py={{ base: 12, md: 16 }}>
        <Reveal><Eyebrow>Fit</Eyebrow></Reveal>
        <Reveal delay={0.05}>
          <Heading as="h2" className="speakable-question" mt={4} mb={3} fontSize={{ base: "28px", md: "38px" }} lineHeight={1.15} maxW="860px">
            When to hire in Canada,{" "}
            <Box as="span" className="gradient-text">and when not to</Box>
          </Heading>
        </Reveal>
        <Reveal delay={0.1}>
          <Text className="speakable-answer" color="text.muted" fontSize={{ base: "md", md: "lg" }} lineHeight={1.7} maxW="780px" mb={10}>
            Every reason below turns on something that is only true in Canada. Where a local
            supplier is the better answer, we would rather say so than compete for work we are
            not the right choice for.
          </Text>
        </Reveal>
        <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={5}>
          {partnerFit.map((t, i) => (
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

      {/* Estimates */}
      <Box bg="rgba(255,255,255,0.015)" borderY="1px solid" borderColor="border.subtle">
        <Container maxW="container.site" px={{ base: 5, md: 8 }} py={{ base: 14, md: 20 }}>
          <Reveal><Eyebrow>Budgeting</Eyebrow></Reveal>
          <Reveal delay={0.05}>
            <Heading as="h2" className="speakable-question" mt={4} mb={3} fontSize={{ base: "28px", md: "38px" }} lineHeight={1.15} maxW="860px">
              What moves{" "}
              <Box as="span" className="gradient-text">a Canadian estimate</Box>
            </Heading>
          </Reveal>
          <Reveal delay={0.1}>
            <Text className="speakable-answer" color="text.muted" fontSize={{ base: "md", md: "lg" }} lineHeight={1.7} maxW="780px" mb={10}>
              Two things distinguish a Canadian number from the same feature list quoted
              anywhere else, and a third changes what the project ultimately costs you without
              changing the quote at all.
            </Text>
          </Reveal>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
            {caCostModel.map((c, i) => (
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
              <Button variant="gradient" size="lg" rightIcon={<FiArrowRight />} onClick={() => openBooking("ca-pricing")}>
                Get a fixed-scope estimate
              </Button>
            </HStack>
          </Reveal>
        </Container>
      </Box>

      {/* Services + guides */}
      <Container maxW="container.site" px={{ base: 5, md: 8 }} py={{ base: 12, md: 16 }}>
        <Reveal><Eyebrow>Services &amp; cost guides</Eyebrow></Reveal>
        <Reveal delay={0.05}>
          <Heading as="h2" className="speakable-question" mt={4} mb={3} fontSize={{ base: "28px", md: "38px" }} lineHeight={1.15} maxW="860px">
            The work itself,{" "}
            <Box as="span" className="gradient-text">and what it costs</Box>
          </Heading>
        </Reveal>
        <Reveal delay={0.1}>
          <Text className="speakable-answer" color="text.muted" fontSize={{ base: "md", md: "lg" }} lineHeight={1.7} maxW="760px" mb={10}>
            Every service below is available to Canadian clients, and every guide is already
            published rather than sitting behind a form.
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
          <Heading as="h3" fontSize={{ base: "18px", md: "20px" }} mb={4}>Cost guides</Heading>
        </Reveal>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
          {caResources.map((r, i) => (
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
            <Button as={Link} href="/about" variant="ghostLink" size="lg" rightIcon={<FiArrowUpRight />}>
              Who you would be working with
            </Button>
          </HStack>
        </Reveal>
      </Container>

      <Faqs
        items={caFaqs}
        eyebrow="Canada FAQ"
        title="Questions from"
        highlight="Canadian buyers."
        intro="What Canadian enquirers ask before the first call, including two questions whose honest answer does not help us win the work. If yours is not here, send it over."
      />

      <CTASection
        eyebrow="Start in Canada"
        title="Building for users in"
        highlight="Canada or Quebec?"
        subtitle="Book a scoping call, or send us the scope and we'll come back with a written understanding of what you are building and which obligations reach it."
        primaryLabel="Book a strategy call"
        secondaryLabel="Send us your scope"
        secondaryTo="/contact"
        // Without onPrimary this button navigates to primaryTo, so a CTA labelled
        // "Book a strategy call" would silently land on the contact form instead of
        // opening the booking flow.
        onPrimary={() => openBooking("ca-cta")}
      />
    </Box>
  );
}
