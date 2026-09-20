'use client'

/**
 * /service/[slug] page body — ported VERBATIM from ServicePage.jsx.
 *
 * Only three things differ from the source:
 *   1. <Seo .../> is gone — metadata moves to the Metadata API in page.tsx and
 *      the JSON-LD to <JsonLd/>, both SERVER-rendered (the old one ran in a
 *      useEffect, so it existed only after hydration).
 *   2. the copy lives in a content module and is imported.
 *   3. imports are rewritten for the new paths.
 * Every style prop, every element and every string is byte-for-byte unchanged.
 */
import { lazy, Suspense } from "react";
import { Box, Container, Flex, Heading, Text, Button, Stack, VStack, HStack, Icon, SimpleGrid, Wrap, WrapItem } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import RouterLink from "next/link";
import { Link as ChakraLink } from "@chakra-ui/react";
import { FiArrowRight, FiCheckCircle, FiArrowUpRight } from "react-icons/fi";
import ProcessSection from "@/components/service/ProcessSection";
const ServiceStack = lazy(() => import("@/components/service/ServiceStack"));
import ServiceHeroVisual from "@/components/service/ServiceHeroVisual";
import Faqs from "@/components/home/Faqs";
import { services, AREAS_SERVED } from "@/utils/Constant";
import { caseStudies, caseStudyForService } from "@/utils/Constant/caseStudies";
import { serviceResources } from "@/utils/Constant/serviceResources";
import { Reveal, Eyebrow, CTASection, AmbientCanvas, VisualBand } from "@/components/common";
import { precisionLayers } from "@/assests";
import { useBooking } from "@/context/BookingContext";

const serviceImages = {
  "web-development":       "/webdevelopment.png",
  "app-development":       "/appdevlopment.png",
  "ui-ux-design":          "/uiuxdevelopment.png",
  "blockchain-development":"/blockchaindevelopment.png",
  "ai-ml-solutions":       "/aimlsol.png",
  "digital-marketing":     "/digitalmarkiting.png",
};

const serviceKeywords = {
  "web-development":        "web development company, React developer, Next.js, Node.js, full stack development, website development New Zealand, India, USA",
  "app-development":        "mobile app development, React Native, Expo, iOS Android app, cross-platform app, app developer New Zealand",
  "ui-ux-design":           "UI UX design, Figma design, product design, user experience design, mobile UI design, web design New Zealand",
  "blockchain-development": "blockchain development, DeFi development, Web3, dApp development, MEV bot, Solana, Ethereum, smart contract",
  "ai-ml-solutions":        "AI development, ML solutions, AI agents, LLM integration, ChatGPT integration, AI SaaS, machine learning New Zealand",
  "digital-marketing":      "digital marketing agency, SEO services, Google Ads, social media marketing, performance marketing New Zealand",
};

export default function ServicePageBody({ serviceName }) {
  /* `serviceName` now arrives as a PROP from the server component, which resolved it
     from `await params` — the old page read it from react-router's useParams().

     The `if (!service) return <NotFound/>` guard is gone: the route calls notFound()
     BEFORE rendering this, so an unknown slug returns a real 404 status rather than a
     200 carrying 404-looking content. */
  const router = useRouter();
  const navigate = (to) => router.push(to);
  const { onOpen: openBooking } = useBooking();
  const service = services[serviceName];

  const relatedCaseStudy = caseStudies[caseStudyForService[serviceName]];
  const resources = serviceResources[serviceName] || [];
  const siblingServices = Object.entries(services)
    .filter(([slug]) => slug !== serviceName)
    .map(([slug, s]) => ({ slug, title: s.title }));
  return (
    <Box>
      {/* Hero */}
      <Box position="relative" overflow="hidden" pt={{ base: 12, md: 20 }} pb={{ base: 10, md: 14 }}>
        {/* Shared atmosphere layer — same grid/aurora/grain system as the home hero,
            so every service page reads as part of one visual system. */}
        <AmbientCanvas variant="hero" />

        <Container maxW="container.site" px={{ base: 5, md: 8 }} position="relative" zIndex={1}>
          <Flex direction={{ base: "column", lg: "row" }} align="center" gap={{ base: 16, lg: 16 }}>
            <VStack flex="1" align="start" spacing={5}>
              <Reveal><Eyebrow>{service.whatWeDo}</Eyebrow></Reveal>
              <Reveal delay={0.05}>
                <Heading as="h1" fontSize={{ base: "38px", md: "52px" }} lineHeight={1.1} letterSpacing="-0.02em">
                  <Box as="span" className="gradient-text">{service.title}</Box>
                </Heading>
              </Reveal>
              <Reveal delay={0.1}>
                {/* The page's primary direct answer: one sentence defining the service,
                    written to stand alone. Marked speakable — see the note in
                    app/service/[slug]/page.tsx. */}
                <Text className="speakable-answer" fontSize={{ base: "lg", md: "xl" }} color="text.primary" fontWeight={500}>
                  {service.description}
                </Text>
              </Reveal>
              <Reveal delay={0.15}>
                <Text color="text.muted" fontSize={{ base: "md", md: "lg" }} lineHeight={1.75}>
                  {service.details}
                </Text>
              </Reveal>
              <Reveal delay={0.2}>
                <Stack direction={{ base: "column", sm: "row" }} spacing={4} pt={2}>
                  <Button variant="gradient" size="lg" rightIcon={<FiArrowRight />} onClick={() => navigate("/contact")}>
                    Get a free quote
                  </Button>
                  <Button variant="outlineGlow" size="lg" onClick={() => navigate("/portfolio")}>
                    View our work
                  </Button>
                </Stack>
              </Reveal>
            </VStack>

            {/* Service-specific hero visual */}
            <Reveal from="left" flex="1" w="full">
              <ServiceHeroVisual service={serviceName} />
            </Reveal>
          </Flex>

          {/* What's included — compact strip below the hero */}
          <Reveal delay={0.1}>
            <Box mt={{ base: 14, md: 16 }} pt={{ base: 8, md: 10 }} borderTop="1px solid" borderColor="border.subtle">
              <Text fontSize="sm" fontWeight={600} letterSpacing="0.08em" textTransform="uppercase" color="text.faint" mb={5}>
                What’s included
              </Text>
              <SimpleGrid columns={{ base: 1, sm: 2 }} spacingX={10} spacingY={4}>
                {service.features?.map((f) => (
                  <HStack key={f} spacing={3} align="start">
                    <Icon as={FiCheckCircle} color="accent.solid" boxSize={5} mt={0.5} flexShrink={0} />
                    <Text color="text.muted">{f}</Text>
                  </HStack>
                ))}
              </SimpleGrid>
            </Box>
          </Reveal>
        </Container>
      </Box>

      {/* Reserve height so the lazy chunk landing cannot shift the sections below it. */}
      <Suspense fallback={<Box minH={{ base: "600px", md: "800px" }} />}>
        <ServiceStack service={serviceName} />
      </Suspense>
      <ProcessSection />

      {/* All six service pages run ~7600px of copy, chips, cards and accordions with no
          image between the hero and the footer. This sits at the midpoint — after the
          process timeline, before the industries list — so the second half of the page
          starts on a visual rather than continuing the same run. No copy: a third
          headline here would lengthen the reading, which is the problem it is solving.
          The plate is shared across all six services on purpose; it is cached after the
          first service page a visitor opens. */}
      <VisualBand
        src={precisionLayers}
        height={{ base: "190px", md: "260px", lg: "300px" }}
        focal="center"
        overlay={0.5}
      />

      {/* Industries we serve */}
      {service.industries?.length > 0 && (
        <Container maxW="container.site" px={{ base: 5, md: 8 }} py={{ base: 10, md: 14 }}>
          <Reveal><Eyebrow>Industries we serve</Eyebrow></Reveal>
          <Reveal delay={0.05}>
            <Heading className="speakable-question" mt={4} fontSize={{ base: "26px", md: "36px" }} lineHeight={1.15} maxW="760px">
              {service.title} for{" "}
              <Box as="span" className="gradient-text">teams in every industry</Box>
            </Heading>
          </Reveal>
          <Reveal delay={0.1}>
            <Text className="speakable-answer" mt={4} color="text.muted" fontSize={{ base: "md", md: "lg" }} lineHeight={1.7} maxW="640px">
              We’ve shipped {service.title.toLowerCase()} work for founders and product teams across these sectors —
              and adapt fast to yours.
            </Text>
          </Reveal>
          <Reveal delay={0.15}>
            <Wrap spacing={3} mt={7}>
              {service.industries.map((ind) => (
                <WrapItem key={ind}>
                  <HStack
                    spacing={2.5}
                    px={4}
                    py={2.5}
                    borderRadius="full"
                    bg="bg.surface"
                    border="1px solid"
                    borderColor="border.subtle"
                    _hover={{ borderColor: "rgba(180,160,255,0.35)" }}
                    transition="border-color .2s"
                  >
                    <Icon as={FiCheckCircle} color="accent.solid" boxSize={4} />
                    <Text fontSize={{ base: "sm", md: "md" }} color="text.primary" fontWeight={500}>
                      {ind}
                    </Text>
                  </HStack>
                </WrapItem>
              ))}
            </Wrap>
          </Reveal>
        </Container>
      )}

      {/* Related work + sibling services.
          These are the only body-content links from a service page to a case study or
          to another service. Without them case studies were reachable only via the
          navbar dropdown, and no service page linked to any other — so crawl paths
          dead-ended here and page authority never flowed between them. */}
      <Container maxW="container.site" px={{ base: 5, md: 8 }} py={{ base: 10, md: 14 }}>
        {relatedCaseStudy && (
          <>
            <Reveal><Eyebrow>Related work</Eyebrow></Reveal>
            <Reveal delay={0.05}>
              <Heading mt={4} mb={6} fontSize={{ base: "26px", md: "36px" }} lineHeight={1.15} maxW="760px">
                See {service.title.toLowerCase()}{" "}
                <Box as="span" className="gradient-text">in production</Box>
              </Heading>
            </Reveal>
            <Reveal delay={0.1}>
              <ChakraLink
                as={RouterLink}
                href={`/case-studies/${relatedCaseStudy.slug}`}
                display="block"
                p={{ base: 6, md: 7 }}
                borderRadius="20px"
                bg="bg.surface"
                border="1px solid"
                borderColor="border.subtle"
                _hover={{ borderColor: "rgba(180,160,255,0.35)", textDecoration: "none" }}
                transition="border-color .2s"
              >
                <HStack justify="space-between" align="start" spacing={4}>
                  <Box>
                    <Text fontSize="sm" color="accent.solid" fontWeight={600} mb={1}>
                      {relatedCaseStudy.industry} · {relatedCaseStudy.location}
                    </Text>
                    <Heading as="h3" fontSize={{ base: "20px", md: "24px" }} lineHeight={1.25}>
                      {relatedCaseStudy.hero?.title} {relatedCaseStudy.hero?.highlight}
                    </Heading>
                    <Text mt={2} color="text.muted" fontSize={{ base: "sm", md: "md" }} lineHeight={1.7}>
                      {relatedCaseStudy.hero?.subtitle}
                    </Text>
                  </Box>
                  <Icon as={FiArrowUpRight} boxSize={6} color="accent.solid" flexShrink={0} mt={1} />
                </HStack>
              </ChakraLink>
            </Reveal>
          </>
        )}

        <Reveal delay={0.15}>
          <Text mt={relatedCaseStudy ? 10 : 0} mb={4} fontSize="sm" fontWeight={600} letterSpacing="0.08em" textTransform="uppercase" color="text.faint">
            Other services
          </Text>
          <Wrap spacing={3}>
            {siblingServices.map((s) => (
              <WrapItem key={s.slug}>
                <ChakraLink
                  as={RouterLink}
                  href={`/service/${s.slug}`}
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
                  {s.title}
                </ChakraLink>
              </WrapItem>
            ))}
          </Wrap>
        </Reveal>

        {/* Markets.
            The service pages linked to the market pages only through the footer, so the
            Service -> Market half of the internal-link graph existed sitewide but not
            contextually. This block closes it.

            Anchors are written to what each market page actually argues — the obligation
            or commercial fact a buyer there cares about — rather than repeating
            "<service> in <country>" six times. Exact-match anchor repetition across
            six pages x six markets would be the pattern to avoid, and the descriptive
            version is more useful to a reader deciding whether the page is for them. */}
        <Reveal delay={0.2}>
          <Text mt={10} mb={4} fontSize="sm" fontWeight={600} letterSpacing="0.08em" textTransform="uppercase" color="text.faint">
            Building from a specific market?
          </Text>
          <Wrap spacing={3}>
            {[
              { to: "/nz", label: "New Zealand — NZD quotes, Privacy Act 2020" },
              { to: "/us", label: "United States — contracting and IP terms" },
              { to: "/ca", label: "Canada — provincial privacy law" },
              { to: "/au", label: "Australia — Consumer Data Right" },
              { to: "/ae", label: "UAE — free zone, mainland and PDPL" },
              { to: "/europe", label: "Europe — GDPR transfers and the EU AI Act" },
            ].map((m) => (
              <WrapItem key={m.to}>
                <ChakraLink
                  as={RouterLink}
                  href={m.to}
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
                  {m.label}
                </ChakraLink>
              </WrapItem>
            ))}
          </Wrap>
        </Reveal>
      </Container>

      {/* Further reading.
          Before this section the service pages linked to no blog post at all, so the
          depth behind each service was reachable only from the /blog index. Anchor text
          here is written to each post's informational angle and never repeats this
          page's head term — the head term is what this page is trying to rank for, and
          pointing it at a blog post would re-create the collision the re-targeting
          removes. See the note at the top of Constant/serviceResources.js. */}
      {resources.length > 0 && (
        <Container maxW="container.site" px={{ base: 5, md: 8 }} py={{ base: 10, md: 14 }}>
          <Reveal><Eyebrow>Further reading</Eyebrow></Reveal>
          <Reveal delay={0.05}>
            <Heading mt={4} fontSize={{ base: "26px", md: "36px" }} lineHeight={1.15} maxW="760px">
              Questions worth answering{" "}
              <Box as="span" className="gradient-text">before you brief anyone</Box>
            </Heading>
          </Reveal>
          <Reveal delay={0.1}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mt={8}>
              {resources.map((r) => (
                <ChakraLink
                  key={r.to}
                  as={RouterLink}
                  href={r.to}
                  display="block"
                  p={{ base: 5, md: 6 }}
                  borderRadius="16px"
                  bg="bg.surface"
                  border="1px solid"
                  borderColor="border.subtle"
                  _hover={{ borderColor: "rgba(180,160,255,0.35)", textDecoration: "none" }}
                  transition="border-color .2s"
                >
                  <HStack justify="space-between" align="start" spacing={3}>
                    <Box>
                      <Heading as="h3" fontSize={{ base: "17px", md: "19px" }} lineHeight={1.3}>
                        {r.title}
                      </Heading>
                      <Text mt={2} color="text.muted" fontSize={{ base: "sm", md: "md" }} lineHeight={1.7}>
                        {r.blurb}
                      </Text>
                    </Box>
                    <Icon as={FiArrowUpRight} boxSize={5} color="accent.solid" flexShrink={0} mt={1} />
                  </HStack>
                </ChakraLink>
              ))}
            </SimpleGrid>
          </Reveal>
        </Container>
      )}

      {/* Service-specific FAQ (also emits FAQPage schema above) */}
      {service.faqs?.length > 0 && (
        <Faqs
          items={service.faqs}
          eyebrow="FAQ"
          title="Frequently asked"
          highlight="questions"
          intro={`Common questions about our ${service.title.toLowerCase()} services. Can’t find what you’re looking for?`}
        />
      )}

      <CTASection
        eyebrow="Let’s discuss your idea"
        title="Ready to start your"
        highlight={`${service.title} project?`}
        subtitle="Get a free consultation and let’s turn your vision into a unique digital creation."
        primaryLabel="Book appointment"
        onPrimary={() => openBooking(`service-${serviceName}`)}
      />
    </Box>
  );
}
