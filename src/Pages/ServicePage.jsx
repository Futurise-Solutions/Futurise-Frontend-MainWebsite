import React from "react";
import { Box, Container, Flex, Heading, Text, Button, Stack, VStack, HStack, Icon, SimpleGrid, Wrap, WrapItem } from "@chakra-ui/react";
import { useParams, useNavigate, Link as RouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { FiArrowRight, FiCheckCircle, FiArrowUpRight } from "react-icons/fi";
import ProcessSection from "../Components/ServiceComponents/ProcessSection";
import ServiceStack from "../Components/ServiceComponents/ServiceStack";
import ServiceHeroVisual from "../Components/ServiceComponents/ServiceHeroVisual";
import Faqs from "../Components/HomePage Components/Faqs";
import { services, AREAS_SERVED } from "../utils/Constant";
import { caseStudies, caseStudyForService } from "../utils/Constant/caseStudies";
import { serviceResources } from "../utils/Constant/serviceResources";
import { Reveal, Eyebrow, CTASection, Seo } from "../Components/common";
import { useBooking } from "../context/BookingContext";
import NotFound from "./NotFound";

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

const ServicePage = () => {
  const { serviceName } = useParams();
  const navigate = useNavigate();
  const { onOpen: openBooking } = useBooking();
  const service = services[serviceName];

  if (!service) return <NotFound />;

  const relatedCaseStudy = caseStudies[caseStudyForService[serviceName]];
  const resources = serviceResources[serviceName] || [];
  const siblingServices = Object.entries(services)
    .filter(([slug]) => slug !== serviceName)
    .map(([slug, s]) => ({ slug, title: s.title }));

  return (
    <Box>
      <Seo
        title={service.metaTitle || `${service.title} — New Zealand, India & USA`}
        description={service.metaDescription || `${service.description} ${service.details}`.slice(0, 160)}
        path={`/service/${serviceName}`}
        image={serviceImages[serviceName] || "/home.png"}
        keywords={serviceKeywords[serviceName] || ""}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "@id": `https://www.futurisesolutions.com/service/${serviceName}#service`,
            "name": `${service.title} — Futurise Solutions`,
            "description": service.metaDescription || service.details,
            "url": `https://www.futurisesolutions.com/service/${serviceName}`,
            "serviceType": service.title,
            "category": service.title,
            "provider": { "@id": "https://www.futurisesolutions.com/#organization" },
            "areaServed": AREAS_SERVED,
            "audience": { "@type": "Audience", "audienceType": "Startup founders, SaaS companies, product teams and enterprises" },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            // A "Services" crumb pointing at "/" duplicated the Home crumb's target,
            // which Google reports as an invalid breadcrumb trail. Dropped until a real
            // /services hub page exists to point it at.
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.futurisesolutions.com/" },
              { "@type": "ListItem", "position": 2, "name": service.title, "item": `https://www.futurisesolutions.com/service/${serviceName}` },
            ],
          },
          ...(service.faqs?.length
            ? [{
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": service.faqs.map((f) => ({
                  "@type": "Question",
                  "name": f.question,
                  "acceptedAnswer": { "@type": "Answer", "text": f.answer },
                })),
              }]
            : []),
        ]}
      />
      {/* Hero */}
      <Box position="relative" overflow="hidden" pt={{ base: 12, md: 20 }} pb={{ base: 10, md: 14 }}>
        <Box position="absolute" top="-15%" left="-5%" w="500px" h="500px" bg="rgba(123,108,255,0.18)" filter="blur(120px)" rounded="full" pointerEvents="none" />
        <Box position="absolute" top="10%" right="-8%" w="420px" h="420px" bg="rgba(181,123,255,0.16)" filter="blur(120px)" rounded="full" pointerEvents="none" />

        <Container maxW="1200px" px={{ base: 5, md: 8 }} position="relative">
          <Flex direction={{ base: "column", lg: "row" }} align="center" gap={{ base: 16, lg: 16 }}>
            <VStack flex="1" align="start" spacing={5}>
              <Reveal><Eyebrow>{service.whatWeDo}</Eyebrow></Reveal>
              <Reveal delay={0.05}>
                <Heading as="h1" fontSize={{ base: "38px", md: "52px" }} lineHeight={1.1} letterSpacing="-0.02em">
                  <Box as="span" className="gradient-text">{service.title}</Box>
                </Heading>
              </Reveal>
              <Reveal delay={0.1}>
                <Text fontSize={{ base: "lg", md: "xl" }} color="text.primary" fontWeight={500}>
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

      <ServiceStack service={serviceName} />
      <ProcessSection />

      {/* Industries we serve */}
      {service.industries?.length > 0 && (
        <Container maxW="1200px" px={{ base: 5, md: 8 }} py={{ base: 10, md: 14 }}>
          <Reveal><Eyebrow>Industries we serve</Eyebrow></Reveal>
          <Reveal delay={0.05}>
            <Heading mt={4} fontSize={{ base: "26px", md: "36px" }} lineHeight={1.15} maxW="760px">
              {service.title} for{" "}
              <Box as="span" className="gradient-text">teams in every industry</Box>
            </Heading>
          </Reveal>
          <Reveal delay={0.1}>
            <Text mt={4} color="text.muted" fontSize={{ base: "md", md: "lg" }} lineHeight={1.7} maxW="640px">
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
      <Container maxW="1200px" px={{ base: 5, md: 8 }} py={{ base: 10, md: 14 }}>
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
                to={`/case-studies/${relatedCaseStudy.slug}`}
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
                  to={`/service/${s.slug}`}
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
      </Container>

      {/* Further reading.
          Before this section the service pages linked to no blog post at all, so the
          depth behind each service was reachable only from the /blog index. Anchor text
          here is written to each post's informational angle and never repeats this
          page's head term — the head term is what this page is trying to rank for, and
          pointing it at a blog post would re-create the collision the re-targeting
          removes. See the note at the top of Constant/serviceResources.js. */}
      {resources.length > 0 && (
        <Container maxW="1200px" px={{ base: 5, md: 8 }} py={{ base: 10, md: 14 }}>
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
                  to={r.to}
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
};

export default ServicePage;
