'use client'
import regional from '../common/RegionalPages.module.css';
import RegionalHero from '../common/RegionalHero';

/**
 * /in page body.
 *
 * Structurally the same shell as the other market pages — MarketHero, Container sections,
 * GlassCard grids, Faqs, CTASection — so it reads as part of one system. The CONTENT is
 * bespoke and shares no sentence with any other market page, because the argument is
 * genuinely different: see the header note in utils/Constant/india.js.
 *
 * Section order is deliberate and inverts the other market pages. They open with a
 * regulatory argument because they have nothing shipped locally to open with. This one
 * opens with presence — the team is in the country — because that is the strongest true
 * thing on the page and the only claim no competitor can copy honestly.
 *
 * ⚠️ THE SUBJECT IS INDIA, NOT UDAIPUR. The city is named ONCE, in the section-1 answer,
 * as the place the team sits. Everything else is national. An earlier draft framed the
 * hero, the eyebrow and three headings around the city, which narrowed a national page to
 * one local market. If an edit makes this read as "a Udaipur agency", it is wrong.
 *
 * ⚠️ Every H2 that is followed by a standalone answer paragraph carries
 * `className="speakable-question"`, and that paragraph carries `speakable-answer`. Those
 * two selectors are named in the WebPage node's SpeakableSpecification, built by
 * buildCountrySchema. A selector matching nothing advertises speakable content and then
 * supplies none — so if you restructure a section, keep the pair together or remove both.
 *
 * ⚠️ Hero image: reuses `marketReach` rather than a dedicated plate, exactly as /europe
 * does. There is no market-in.webp in assests/, and inventing one is not this task.
 */
import {
  Box, Container, Heading, Text, HStack, SimpleGrid, Icon, Flex, Button, List, ListItem,
  Link as ChakraLink,
} from "@chakra-ui/react";
import Link from "next/link";
import { FiArrowRight, FiCheck, FiArrowUpRight } from "react-icons/fi";
import Reveal from "@/components/common/Reveal";
import { Eyebrow } from "@/components/common/SectionHeading";
import GlassCard from "@/components/common/GlassCard";
import CTASection from "@/components/common/CTASection";
import CountrySolutions from "@/components/common/CountrySolutions";
import Faqs from "@/components/home/Faqs";
import { useBooking } from "@/context/BookingContext";
import { NavbarservicesOptions } from "@/utils/Constant";
import {
  inPresence, inDelivery, inWork, inSectors, inStack, inFaqs,
} from "@/utils/Constant/india";

export default function IndiaPageBody() {
  const { onOpen: openBooking } = useBooking();

  return (
    <Box className={regional.page}>
      {/* Hero */}
      <RegionalHero>
        <Reveal><Eyebrow>India</Eyebrow></Reveal>
        <Reveal delay={0.05}>
          <Heading as="h1" mt={5} fontSize={{ base: "38px", md: "56px" }} lineHeight={1.08} letterSpacing="-0.025em" maxW="920px">
            Software development for{" "}
            <Box as="span" className="gradient-text">Indian businesses</Box>
          </Heading>
        </Reveal>
        <Reveal delay={0.1}>
          <Text mt={6} color="text.muted" fontSize={{ base: "md", md: "xl" }} lineHeight={1.7} maxW="760px">
            Custom software, AI and SaaS for businesses across India, built by our own
            engineering team in the country, quoted in rupees on fixed scope, and delivered
            inside your working day rather than across a twelve-hour gap.
          </Text>
        </Reveal>
        <Reveal delay={0.15}>
          <HStack spacing={3} mt={8} flexWrap="wrap" rowGap={3}>
            <Button variant="gradient" size="lg" rightIcon={<FiArrowRight />} onClick={() => openBooking("in-hero")}>
              Book a strategy call
            </Button>
            <Button as={Link} href="/contact" variant="outlineGlow" size="lg">
              Send us your scope
            </Button>
          </HStack>
        </Reveal>
      </RegionalHero>

      {/* SECTION 1 — presence. First, by design. */}
      <Container maxW="container.site" px={{ base: 5, md: 8 }} py={{ base: 12, md: 16 }}>
        <Reveal><Eyebrow>Where the team is</Eyebrow></Reveal>
        <Reveal delay={0.05}>
          <Heading as="h2" className="speakable-question" mt={4} mb={3} fontSize={{ base: "28px", md: "38px" }} lineHeight={1.15} maxW="780px">
            Not an offshore arrangement:{" "}
            <Box as="span" className="gradient-text">this is where we are</Box>
          </Heading>
        </Reveal>
        <Reveal delay={0.1}>
          <Text className="speakable-answer" color="text.muted" fontSize={{ base: "md", md: "lg" }} lineHeight={1.7} maxW="720px" mb={10}>
            The engineers who build your software are in India. We have delivered for Indian clients, two of them
            published with screenshots. The contracting entity is a New Zealand company. All three of those
            facts matter, so all three are stated here rather than in a footer.
          </Text>
        </Reveal>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5}>
          {inPresence.map((m, i) => (
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

      {/* SECTION 2 — what local delivery changes */}
      <Box bg="rgba(255,255,255,0.015)" borderY="1px solid" borderColor="border.subtle">
        <Container maxW="container.site" px={{ base: 5, md: 8 }} py={{ base: 12, md: 16 }}>
          <Reveal><Eyebrow>How it changes the work</Eyebrow></Reveal>
          <Reveal delay={0.05}>
            <Heading as="h2" className="speakable-question" mt={4} mb={3} fontSize={{ base: "28px", md: "38px" }} lineHeight={1.15} maxW="780px">
              What being here{" "}
              <Box as="span" className="gradient-text">actually changes</Box>
            </Heading>
          </Reveal>
          <Reveal delay={0.1}>
            <Text className="speakable-answer" color="text.muted" fontSize={{ base: "md", md: "lg" }} lineHeight={1.7} maxW="720px" mb={10}>
              Four practical differences between an engagement run from inside your working
              day and one run across a twelve-hour gap. None of them is a slogan; each is
              something you would notice in the first fortnight.
            </Text>
          </Reveal>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
            {inDelivery.map((m, i) => (
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
      </Box>

      {/* SECTION 3 — the delivered work. The evidence the rest of the page rests on. */}
      <Container maxW="container.site" px={{ base: 5, md: 8 }} py={{ base: 12, md: 16 }}>
        <Reveal><Eyebrow>Delivered in India</Eyebrow></Reveal>
        <Reveal delay={0.05}>
          <Heading as="h2" className="speakable-question" mt={4} mb={3} fontSize={{ base: "28px", md: "38px" }} lineHeight={1.15} maxW="780px">
            What we have built{" "}
            <Box as="span" className="gradient-text">for Indian businesses</Box>
          </Heading>
        </Reveal>
        <Reveal delay={0.1}>
          <Text className="speakable-answer" color="text.muted" fontSize={{ base: "md", md: "lg" }} lineHeight={1.7} maxW="720px" mb={10}>
            Every client we publish is one we delivered for. Two Indian engagements are
            published in full below; others were delivered for clients we are not able to
            name. We publish no project count and no performance figures, because neither is
            something you could check.
          </Text>
        </Reveal>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          {inWork.map((w, i) => (
            <Reveal key={w.title} delay={0.04 * i}>
              <GlassCard p={{ base: 7, md: 8 }} h="full">
                <Heading as="h3" fontSize={{ base: "19px", md: "22px" }} lineHeight={1.25} mb={4}>
                  {w.title}
                </Heading>
                <Text color="text.muted" fontSize={{ base: "14px", md: "15px" }} lineHeight={1.8} mb={5}>
                  {w.detail}
                </Text>
                <ChakraLink
                  as={Link}
                  href={w.to}
                  color="accent.solid"
                  fontSize="sm"
                  fontWeight={500}
                  display="inline-flex"
                  alignItems="center"
                  gap={1}
                  _hover={{ textDecoration: "underline" }}
                >
                  {w.cta} <Icon as={FiArrowUpRight} />
                </ChakraLink>
              </GlassCard>
            </Reveal>
          ))}
        </SimpleGrid>
      </Container>

      {/* SECTION 4 — who this suits */}
      <Box bg="rgba(255,255,255,0.015)" borderY="1px solid" borderColor="border.subtle">
        <Container maxW="container.site" px={{ base: 5, md: 8 }} py={{ base: 12, md: 16 }}>
          <Reveal><Eyebrow>Who we suit</Eyebrow></Reveal>
          <Reveal delay={0.05}>
            <Heading as="h2" className="speakable-question" mt={4} mb={3} fontSize={{ base: "28px", md: "38px" }} lineHeight={1.15} maxW="780px">
              The engagements{" "}
              <Box as="span" className="gradient-text">we are right for</Box>
            </Heading>
          </Reveal>
          <Reveal delay={0.1}>
            <Text className="speakable-answer" color="text.muted" fontSize={{ base: "md", md: "lg" }} lineHeight={1.7} maxW="720px" mb={10}>
              Four shapes of work we are a good fit for. If your requirement is an
              India-registered supplier for procurement reasons, we are not one. That is in
              the FAQ below rather than buried, because it is the first thing that would rule
              us out.
            </Text>
          </Reveal>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={5}>
            {inSectors.map((s, i) => (
              <Reveal key={s.title} delay={0.03 * i}>
                <GlassCard p={6} h="full">
                  <Heading as="h3" fontSize={{ base: "16px", md: "17px" }} lineHeight={1.3} mb={3}>
                    {s.title}
                  </Heading>
                  <Text color="text.muted" fontSize="14px" lineHeight={1.75}>
                    {s.detail}
                  </Text>
                </GlassCard>
              </Reveal>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* SECTION 5 — stack + services. Also the page's internal-link layer out to /service/*. */}
      <Container maxW="container.site" px={{ base: 5, md: 8 }} py={{ base: 12, md: 16 }}>
        <Reveal><Eyebrow>What we build with</Eyebrow></Reveal>
        <Reveal delay={0.05}>
          <Heading as="h2" className="speakable-question" mt={4} mb={3} fontSize={{ base: "28px", md: "38px" }} lineHeight={1.15} maxW="780px">
            The stack behind{" "}
            <Box as="span" className="gradient-text">Indian engagements</Box>
          </Heading>
        </Reveal>
        <Reveal delay={0.1}>
          <Text className="speakable-answer" color="text.muted" fontSize={{ base: "md", md: "lg" }} lineHeight={1.7} maxW="720px" mb={10}>
            The same stack as the rest of our work. We do not keep a cheaper toolchain for
            one market. Both published Indian sites are Next.js, one statically exported.
          </Text>
        </Reveal>
        <Flex direction={{ base: "column", lg: "row" }} gap={{ base: 10, lg: 14 }} align="start">
          <Box flex="1">
            <List spacing={3}>
              {inStack.map((s) => (
                <ListItem key={s} display="flex" alignItems="start" gap={3}>
                  <Flex
                    boxSize="20px"
                    flexShrink={0}
                    mt="3px"
                    align="center"
                    justify="center"
                    borderRadius="full"
                    bg="rgba(180,160,255,0.16)"
                  >
                    <Icon as={FiCheck} boxSize={2.5} color="accent.solid" />
                  </Flex>
                  <Text color="text.muted" fontSize={{ base: "14px", md: "15px" }} lineHeight={1.75}>
                    {s}
                  </Text>
                </ListItem>
              ))}
            </List>
          </Box>
          <Box flex="1" w="full">
            <Text fontSize="xs" fontWeight={600} letterSpacing="0.14em" textTransform="uppercase" color="accent.solid" mb={4}>
              Services
            </Text>
            <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={3}>
              {/* ⚠️ The field is `path`, NOT `to`. Passing `s.to` here yields undefined,
                  which next/link rejects at prerender with a destructuring TypeError
                  rather than a useful message. */}
              {NavbarservicesOptions.map((s) => (
                <ChakraLink
                  key={s.path}
                  as={Link}
                  href={s.path}
                  p={4}
                  borderRadius="14px"
                  border="1px solid"
                  borderColor="border.subtle"
                  bg="bg.surface"
                  color="text.primary"
                  fontSize="14px"
                  fontWeight={500}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  gap={2}
                  _hover={{ borderColor: "brand.400", bg: "bg.surfaceHover", textDecoration: "none" }}
                  transition="border-color .2s, background .2s"
                >
                  {s.option} <Icon as={FiArrowUpRight} color="accent.solid" />
                </ChakraLink>
              ))}
            </SimpleGrid>
          </Box>
        </Flex>
      </Container>

      <CountrySolutions market="in" />

      <Faqs
        items={inFaqs}
        eyebrow="India FAQ"
        title="Questions from"
        highlight="Indian buyers."
        intro="The things Indian enquirers ask before the first call, including the ones that rule us out. If yours is not here, send it over."
      />

      <CTASection
        eyebrow="Start in India"
        title="Building something in"
        highlight="India?"
        subtitle="Book a scoping call inside your working day, or send us the scope and we'll come back with a fixed-scope estimate in rupees."
        primaryLabel="Book a strategy call"
        secondaryLabel="Send us your scope"
        secondaryTo="/contact"
        // Without onPrimary this navigates to primaryTo, so a button labelled "Book a
        // strategy call" would silently land on the contact form instead of the booking flow.
        onPrimary={() => openBooking("in-cta")}
      />
    </Box>
  );
}
