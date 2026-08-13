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
  auMeta, auDeadlines, auDataEconomy, auSectors, auRails,
  partnerChoice, auCostModel, auResources, auFaqs,
} from "../utils/Constant/australia";

/**
 * /au — the Australia market page.
 *
 * The section order and the section titles deliberately break the pattern shared by /nz and
 * /us rather than extending it. Those two pages already reuse three H2 headings verbatim
 * between them; a third instance of the same skeleton would read as a template, which is
 * the thin-localisation failure this whole strategy exists to avoid.
 *
 * More importantly, Australia cannot argue what New Zealand argues. It shares GST, a
 * Privacy Act, Xero, MYOB, agriculture and tourism with New Zealand, so a page built on
 * those would compete with /nz rather than with the market. This page is built instead on
 * the one thing that is true in Australia and nowhere else on this site: the obligations
 * here are legislated, dated and enforceable. Compliance leads, and everything else follows
 * from it.
 */
const AustraliaPage = () => {
  const { onOpen: openBooking } = useBooking();

  // Shape and site-wide values live in buildCountrySchema; only what is genuinely
  // Australian belongs here. The country registry supplies the path, label and language
  // tag, so the schema cannot disagree with the hreflang cluster or the footer link.
  const jsonLd = buildCountrySchema({
    code: "au",
    title: auMeta.title,
    description: auMeta.description,
    regions: ["New South Wales", "Victoria", "Queensland", "Western Australia", "South Australia"],
    currency: "AUD",
    faqs: auFaqs,
    image: "/home.png",
  });

  return (
    <Box>
      <Seo
        title={auMeta.title}
        description={auMeta.description}
        path="/au"
        keywords={auMeta.keywords}
        image="/home.png"
        jsonLd={jsonLd}
        alternates={COUNTRY_ALTERNATES}
      />

      {/* Hero */}
      <Box position="relative" overflow="hidden" pt={{ base: 12, md: 20 }} pb={{ base: 8, md: 12 }}>
        <Box position="absolute" top="-15%" left="-5%" w="500px" h="500px" bg="rgba(123,108,255,0.18)" filter="blur(120px)" rounded="full" pointerEvents="none" />
        <Container maxW="1200px" px={{ base: 5, md: 8 }} position="relative">
          <Reveal><Eyebrow>Australia</Eyebrow></Reveal>
          <Reveal delay={0.05}>
            <Heading as="h1" mt={5} fontSize={{ base: "38px", md: "56px" }} lineHeight={1.08} letterSpacing="-0.025em" maxW="940px">
              Software development for{" "}
              <Box as="span" className="gradient-text">Australian businesses</Box>
            </Heading>
          </Reveal>
          <Reveal delay={0.1}>
            <Text mt={6} color="text.muted" fontSize={{ base: "md", md: "xl" }} lineHeight={1.7} maxW="800px">
              Custom software, AI and SaaS built for companies operating under Australian
              obligations — the Privacy Act, the Consumer Data Right, the critical
              infrastructure regime and the Essential Eight. Here, compliance is a set of
              dated requirements with an engineering consequence, not a page in a policy
              document.
            </Text>
          </Reveal>
          <Reveal delay={0.15}>
            <HStack spacing={3} mt={8} flexWrap="wrap" rowGap={3}>
              <Button variant="gradient" size="lg" rightIcon={<FiArrowRight />} onClick={() => openBooking("au-hero")}>
                Book a strategy call
              </Button>
              <Button as={Link} to="/contact" variant="outlineGlow" size="lg">
                Send us your scope
              </Button>
            </HStack>
          </Reveal>
        </Container>
      </Box>

      {/* Deadlines */}
      <Container maxW="1200px" px={{ base: 5, md: 8 }} py={{ base: 12, md: 16 }}>
        <Reveal><Eyebrow>What is already scheduled</Eyebrow></Reveal>
        <Reveal delay={0.05}>
          <Heading as="h2" mt={4} mb={3} fontSize={{ base: "28px", md: "38px" }} lineHeight={1.15} maxW="860px">
            The compliance deadlines{" "}
            <Box as="span" className="gradient-text">already on your roadmap</Box>
          </Heading>
        </Reveal>
        <Reveal delay={0.1}>
          <Text color="text.muted" fontSize={{ base: "md", md: "lg" }} lineHeight={1.7} maxW="760px" mb={10}>
            Australian privacy law changed materially in 2024, and the parts that reach
            software are still arriving. These four are dated, in force or scheduled, and
            each one lands in the architecture rather than in a policy document.
          </Text>
        </Reveal>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
          {auDeadlines.map((d, i) => (
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

      {/* Regulated data economy */}
      <Box bg="rgba(255,255,255,0.015)" borderY="1px solid" borderColor="border.subtle">
        <Container maxW="1200px" px={{ base: 5, md: 8 }} py={{ base: 14, md: 20 }}>
          <Reveal><Eyebrow>Data &amp; security regimes</Eyebrow></Reveal>
          <Reveal delay={0.05}>
            <Heading as="h2" mt={4} mb={3} fontSize={{ base: "28px", md: "38px" }} lineHeight={1.15} maxW="860px">
              Building for a{" "}
              <Box as="span" className="gradient-text">regulated data economy</Box>
            </Heading>
          </Reveal>
          <Reveal delay={0.1}>
            <Text color="text.muted" fontSize={{ base: "md", md: "lg" }} lineHeight={1.7} maxW="780px" mb={10}>
              Australia legislates data sharing and cyber resilience rather than
              recommending them. That is the substantive difference between building here
              and building almost anywhere else, and it changes decisions taken in the first
              week of a project.
            </Text>
          </Reveal>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
            {auDataEconomy.map((d, i) => (
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
      </Box>

      {/* Sectors */}
      <Container maxW="1200px" px={{ base: 5, md: 8 }} py={{ base: 12, md: 16 }}>
        <Reveal><Eyebrow>Sectors</Eyebrow></Reveal>
        <Reveal delay={0.05}>
          <Heading as="h2" mt={4} mb={3} fontSize={{ base: "28px", md: "38px" }} lineHeight={1.15} maxW="860px">
            Where these obligations{" "}
            <Box as="span" className="gradient-text">land hardest</Box>
          </Heading>
        </Reveal>
        <Reveal delay={0.1}>
          <Text color="text.muted" fontSize={{ base: "md", md: "lg" }} lineHeight={1.7} maxW="760px" mb={10}>
            Four sectors where the regulatory surface changes the engineering, described by
            the shape of the problem rather than by listing client names we are not free to
            publish.
          </Text>
        </Reveal>
        <VStack spacing={4} align="stretch">
          {auSectors.map((s, i) => (
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

      {/* Rails */}
      <Box bg="rgba(255,255,255,0.015)" borderY="1px solid" borderColor="border.subtle">
        <Container maxW="1200px" px={{ base: 5, md: 8 }} py={{ base: 14, md: 20 }}>
          <Reveal><Eyebrow>Requirements</Eyebrow></Reveal>
          <Reveal delay={0.05}>
            <Heading as="h2" mt={4} mb={3} fontSize={{ base: "28px", md: "38px" }} lineHeight={1.15} maxW="860px">
              The rails these builds{" "}
              <Box as="span" className="gradient-text">have to run on</Box>
            </Heading>
          </Reveal>
          <Reveal delay={0.1}>
            <Text color="text.muted" fontSize={{ base: "md", md: "lg" }} lineHeight={1.7} maxW="760px" mb={10}>
              What Australian software generally has to satisfy before it is considered
              finished. These are requirements to design against rather than features to add
              later.
            </Text>
          </Reveal>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
            {auRails.map((r, i) => (
              <Reveal key={r.name} delay={0.03 * i}>
                <GlassCard p={6} h="full">
                  <Heading as="h3" fontSize={{ base: "16px", md: "17px" }} mb={2}>{r.name}</Heading>
                  <Text color="text.muted" fontSize="14px" lineHeight={1.7}>{r.detail}</Text>
                </GlassCard>
              </Reveal>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Choosing a partner */}
      <Container maxW="1200px" px={{ base: 5, md: 8 }} py={{ base: 12, md: 16 }}>
        <Reveal><Eyebrow>Assurance</Eyebrow></Reveal>
        <Reveal delay={0.05}>
          <Heading as="h2" mt={4} mb={3} fontSize={{ base: "28px", md: "38px" }} lineHeight={1.15} maxW="860px">
            Choosing a delivery partner{" "}
            <Box as="span" className="gradient-text">from Australia</Box>
          </Heading>
        </Reveal>
        <Reveal delay={0.1}>
          <Text color="text.muted" fontSize={{ base: "md", md: "lg" }} lineHeight={1.7} maxW="780px" mb={10}>
            In a regulated market the decision is usually about what you can evidence to a
            procurement team or an assessor, not about hourly rates. Here is where each
            answer is genuinely the right one, including where we are not.
          </Text>
        </Reveal>
        <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={5}>
          {partnerChoice.map((t, i) => (
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
        <Container maxW="1200px" px={{ base: 5, md: 8 }} py={{ base: 14, md: 20 }}>
          <Reveal><Eyebrow>Estimates</Eyebrow></Reveal>
          <Reveal delay={0.05}>
            <Heading as="h2" mt={4} mb={3} fontSize={{ base: "28px", md: "38px" }} lineHeight={1.15} maxW="860px">
              How estimates{" "}
              <Box as="span" className="gradient-text">are built</Box>
            </Heading>
          </Reveal>
          <Reveal delay={0.1}>
            <Text color="text.muted" fontSize={{ base: "md", md: "lg" }} lineHeight={1.7} maxW="760px" mb={10}>
              In Australia the single largest driver of cost is usually not the feature list.
              It is whether the system touches information that carries an obligation.
            </Text>
          </Reveal>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
            {auCostModel.map((c, i) => (
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
              <Button variant="gradient" size="lg" rightIcon={<FiArrowRight />} onClick={() => openBooking("au-pricing")}>
                Get a fixed-scope estimate
              </Button>
            </HStack>
          </Reveal>
        </Container>
      </Box>

      {/* Services + guides */}
      <Container maxW="1200px" px={{ base: 5, md: 8 }} py={{ base: 12, md: 16 }}>
        <Reveal><Eyebrow>Services &amp; cost guides</Eyebrow></Reveal>
        <Reveal delay={0.05}>
          <Heading as="h2" mt={4} mb={3} fontSize={{ base: "28px", md: "38px" }} lineHeight={1.15} maxW="860px">
            What we build for{" "}
            <Box as="span" className="gradient-text">Australian clients</Box>
          </Heading>
        </Reveal>
        <Reveal delay={0.1}>
          <Text color="text.muted" fontSize={{ base: "md", md: "lg" }} lineHeight={1.7} maxW="760px" mb={10}>
            Every service below is available to Australian clients, and every guide is
            already published rather than sitting behind a form.
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
          {auResources.map((r, i) => (
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

      <Faqs
        items={auFaqs}
        eyebrow="Australia FAQ"
        title="Questions from"
        highlight="Australian buyers."
        intro="What Australian enquirers ask before the first call, including the regulatory questions most suppliers leave unanswered. If yours is not here, send it over."
      />

      <CTASection
        eyebrow="Start in Australia"
        title="Building something under"
        highlight="Australian obligations?"
        subtitle="Book a scoping call, or send us the scope and we'll come back with a written understanding of what you are building and which obligations apply to it."
        primaryLabel="Book a strategy call"
        secondaryLabel="Send us your scope"
        secondaryTo="/contact"
        // Without onPrimary this button navigates to primaryTo, so a CTA labelled
        // "Book a strategy call" would silently land on the contact form instead of
        // opening the booking flow.
        onPrimary={() => openBooking("au-cta")}
      />
    </Box>
  );
};

export default AustraliaPage;
