import React from "react";
import {
  Box, Container, Heading, Text, VStack, HStack, SimpleGrid, Icon, Flex, Button, Divider,
  Wrap, WrapItem, Link as ChakraLink,
} from "@chakra-ui/react";
import { FiArrowRight, FiCheck, FiTrendingUp } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Reveal, Eyebrow, GlassCard, Seo, CTASection, VisualBand } from "../Components/common";
import { orderedTerrain } from "../assests";
import { services } from "../utils/Constant";
import { useBooking } from "../context/BookingContext";
import {
  pricingMeta, costFactors, complexityTiers, engagementModels,
  timelinePhases, roiFramework, pricingFaqs,
} from "../utils/Constant/pricing";
import Faqs from "../Components/HomePage Components/Faqs";

/**
 * Answers the cost question without quoting a price.
 *
 * The blog already ranks for cost queries in New Zealand and elsewhere, but every one
 * of those visitors previously hit a page with no pricing information and no next step.
 * This page captures that intent: it explains what drives the number and how the
 * engagement works, which is what a buyer needs before a first call — and it qualifies
 * them, because someone who has read this arrives understanding why scope matters.
 */
const PricingGuide = () => {
  const { onOpen: openBooking } = useBooking();

  return (
    <Box>
      <Seo
        title={pricingMeta.title}
        description={pricingMeta.description}
        path="/pricing"
        keywords={pricingMeta.keywords}
        image="/home.png"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: pricingFaqs.map((f) => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: { "@type": "Answer", text: f.answer },
            })),
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://www.futurisesolutions.com/" },
              { "@type": "ListItem", position: 2, name: "Pricing & Engagement", item: "https://www.futurisesolutions.com/pricing" },
            ],
          },
        ]}
      />

      {/* Hero */}
      <Box position="relative" overflow="hidden" pt={{ base: 12, md: 20 }} pb={{ base: 8, md: 12 }}>
        <Box position="absolute" top="-15%" left="-5%" w="500px" h="500px" bg="rgba(123,108,255,0.18)" filter="blur(120px)" rounded="full" pointerEvents="none" />
        <Container maxW="container.site" px={{ base: 5, md: 8 }} position="relative">
          <Reveal><Eyebrow>Pricing &amp; engagement</Eyebrow></Reveal>
          <Reveal delay={0.05}>
            <Heading as="h1" mt={5} fontSize={{ base: "38px", md: "56px" }} lineHeight={1.08} letterSpacing="-0.025em" maxW="900px">
              What actually drives{" "}
              <Box as="span" className="gradient-text">the cost of your project</Box>
            </Heading>
          </Reveal>
          <Reveal delay={0.1}>
            <Text mt={6} color="text.muted" fontSize={{ base: "md", md: "xl" }} lineHeight={1.7} maxW="740px">
              We don&rsquo;t publish rate cards, because a number quoted before we understand your
              scope would be wrong for almost everyone who read it. What we can do is show you
              exactly which factors move the estimate — so that when we do quote, you can tell
              whether it&rsquo;s fair.
            </Text>
          </Reveal>
          <Reveal delay={0.15}>
            <HStack spacing={3} mt={8} flexWrap="wrap" rowGap={3}>
              <Button variant="gradient" size="lg" rightIcon={<FiArrowRight />} onClick={() => openBooking("pricing-hero")}>
                Get a fixed-scope estimate
              </Button>
              <Button as={Link} to="/contact" variant="outlineGlow" size="lg">
                Send us your scope
              </Button>
            </HStack>
          </Reveal>
        </Container>
      </Box>

      {/* Cost factors */}
      <Container maxW="container.site" px={{ base: 5, md: 8 }} py={{ base: 12, md: 16 }}>
        <Reveal><Eyebrow>What moves the number</Eyebrow></Reveal>
        <Reveal delay={0.05}>
          <Heading as="h2" mt={4} mb={3} fontSize={{ base: "28px", md: "38px" }} lineHeight={1.15} maxW="760px">
            Eight factors that decide{" "}
            <Box as="span" className="gradient-text">what a project costs</Box>
          </Heading>
        </Reveal>
        <Reveal delay={0.1}>
          <Text color="text.muted" fontSize={{ base: "md", md: "lg" }} lineHeight={1.7} maxW="680px" mb={10}>
            Roughly in the order they tend to matter. Two projects with identical feature lists
            can differ severalfold on these alone.
          </Text>
        </Reveal>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
          {costFactors.map((f, i) => (
            <Reveal key={f.factor} delay={0.03 * i}>
              <GlassCard p={7} h="full">
                <HStack spacing={3} align="start" mb={3}>
                  <Flex boxSize="26px" flexShrink={0} align="center" justify="center" borderRadius="full" bg="rgba(180,160,255,0.16)" mt="2px">
                    <Text fontSize="12px" fontWeight={700} color="accent.solid">{i + 1}</Text>
                  </Flex>
                  <Heading as="h3" fontSize={{ base: "17px", md: "19px" }} lineHeight={1.3}>
                    {f.factor}
                  </Heading>
                </HStack>
                <Text color="text.muted" fontSize={{ base: "14px", md: "15px" }} lineHeight={1.75}>
                  {f.detail}
                </Text>
              </GlassCard>
            </Reveal>
          ))}
        </SimpleGrid>
      </Container>

      {/* A pricing page is the densest reading on the site and this one carried no
          image anywhere in its ~1900px. The band sits between the cost drivers and the
          complexity tiers — the point where a reader most needs a beat before the next
          block of figures. No copy, deliberately: nothing here should compete with the
          numbers for attention. */}
      <VisualBand
        src={orderedTerrain}
        height={{ base: "170px", md: "230px", lg: "260px" }}
        focal="center 62%"
        overlay={0.46}
      />

      {/* Complexity tiers */}
      <Box bg="rgba(255,255,255,0.015)" borderY="1px solid" borderColor="border.subtle">
        <Container maxW="container.site" px={{ base: 5, md: 8 }} py={{ base: 14, md: 20 }}>
          <Reveal><Eyebrow>Project complexity</Eyebrow></Reveal>
          <Reveal delay={0.05}>
            <Heading as="h2" mt={4} mb={10} fontSize={{ base: "28px", md: "38px" }} lineHeight={1.15} maxW="760px">
              Four kinds of build, and{" "}
              <Box as="span" className="gradient-text">when each is right</Box>
            </Heading>
          </Reveal>

          <VStack spacing={4} align="stretch">
            {complexityTiers.map((t, i) => (
              <Reveal key={t.tier} delay={0.04 * i}>
                <GlassCard p={{ base: 6, md: 8 }}>
                  <Flex direction={{ base: "column", lg: "row" }} gap={{ base: 4, lg: 10 }}>
                    <Box flex={{ lg: "0 0 30%" }}>
                      <Heading as="h3" fontSize={{ base: "19px", md: "22px" }} lineHeight={1.25}>
                        {t.tier}
                      </Heading>
                      <Text mt={2} fontSize="14px" color="accent.solid" fontWeight={500}>
                        {t.goal}
                      </Text>
                    </Box>
                    <Box flex="1">
                      <Text color="text.muted" fontSize={{ base: "14px", md: "15px" }} lineHeight={1.75}>
                        {t.looksLike}
                      </Text>
                      <HStack spacing={2} align="start" mt={3}>
                        <Icon as={FiCheck} color="accent.solid" boxSize={4} mt="3px" flexShrink={0} />
                        <Text fontSize={{ base: "14px", md: "15px" }} color="text.primary" lineHeight={1.7}>
                          <Box as="span" fontWeight={600}>Best when: </Box>
                          {t.bestWhen}
                        </Text>
                      </HStack>
                    </Box>
                  </Flex>
                </GlassCard>
              </Reveal>
            ))}
          </VStack>
        </Container>
      </Box>

      {/* Engagement models */}
      <Container maxW="container.site" px={{ base: 5, md: 8 }} py={{ base: 14, md: 20 }}>
        <Reveal><Eyebrow>Engagement models</Eyebrow></Reveal>
        <Reveal delay={0.05}>
          <Heading as="h2" mt={4} mb={3} fontSize={{ base: "28px", md: "38px" }} lineHeight={1.15} maxW="760px">
            Fixed-scope, dedicated team,{" "}
            <Box as="span" className="gradient-text">or discovery first</Box>
          </Heading>
        </Reveal>
        <Reveal delay={0.1}>
          <Text color="text.muted" fontSize={{ base: "md", md: "lg" }} lineHeight={1.7} maxW="680px" mb={10}>
            Each has a real trade-off. We&rsquo;ll recommend the one that fits your situation, including
            when that means less work for us.
          </Text>
        </Reveal>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
          {engagementModels.map((m, i) => (
            <Reveal key={m.model} delay={0.04 * i}>
              <GlassCard p={7} h="full">
                <Heading as="h3" fontSize={{ base: "18px", md: "20px" }} mb={3}>{m.model}</Heading>
                <Text color="text.muted" fontSize="14px" lineHeight={1.75}>{m.how}</Text>
                <Divider my={4} borderColor="border.subtle" />
                <Text fontSize="14px" lineHeight={1.7} mb={2}>
                  <Box as="span" fontWeight={600} color="text.primary">Good for: </Box>
                  <Box as="span" color="text.muted">{m.goodFor}</Box>
                </Text>
                <Text fontSize="14px" lineHeight={1.7}>
                  <Box as="span" fontWeight={600} color="text.primary">Trade-off: </Box>
                  <Box as="span" color="text.muted">{m.tradeoff}</Box>
                </Text>
              </GlassCard>
            </Reveal>
          ))}
        </SimpleGrid>
      </Container>

      {/* Timeline */}
      <Box bg="rgba(255,255,255,0.015)" borderY="1px solid" borderColor="border.subtle">
        <Container maxW="container.site" px={{ base: 5, md: 8 }} py={{ base: 14, md: 20 }}>
          <Reveal><Eyebrow>Timelines</Eyebrow></Reveal>
          <Reveal delay={0.05}>
            <Heading as="h2" mt={4} mb={10} fontSize={{ base: "28px", md: "38px" }} lineHeight={1.15} maxW="760px">
              Where the time actually{" "}
              <Box as="span" className="gradient-text">goes</Box>
            </Heading>
          </Reveal>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
            {timelinePhases.map((p, i) => (
              <Reveal key={p.phase} delay={0.03 * i}>
                <GlassCard p={6} h="full">
                  <Text fontSize="12px" fontWeight={700} color="accent.solid" letterSpacing="0.1em" mb={2}>
                    {String(i + 1).padStart(2, "0")}
                  </Text>
                  <Heading as="h3" fontSize="17px" mb={2}>{p.phase}</Heading>
                  <Text color="text.muted" fontSize="14px" lineHeight={1.7}>{p.output}</Text>
                  <Text mt={3} fontSize="13px" color="text.faint" fontStyle="italic" lineHeight={1.6}>
                    {p.note}
                  </Text>
                </GlassCard>
              </Reveal>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* ROI */}
      <Container maxW="container.site" px={{ base: 5, md: 8 }} py={{ base: 14, md: 20 }}>
        <Reveal><Eyebrow>Business value</Eyebrow></Reveal>
        <Reveal delay={0.05}>
          <Heading as="h2" mt={4} mb={3} fontSize={{ base: "28px", md: "38px" }} lineHeight={1.15} maxW="760px">
            Four questions that tell you{" "}
            <Box as="span" className="gradient-text">if it&rsquo;s worth building</Box>
          </Heading>
        </Reveal>
        <Reveal delay={0.1}>
          <Text color="text.muted" fontSize={{ base: "md", md: "lg" }} lineHeight={1.7} maxW="680px" mb={10}>
            Worth answering before you talk to any agency, including us.
          </Text>
        </Reveal>

        <VStack spacing={4} align="stretch">
          {roiFramework.map((r, i) => (
            <Reveal key={r.question} delay={0.04 * i}>
              <GlassCard p={{ base: 6, md: 7 }}>
                <HStack spacing={4} align="start">
                  <Flex boxSize="34px" flexShrink={0} align="center" justify="center" borderRadius="11px" bg="rgba(180,160,255,0.14)">
                    <Icon as={FiTrendingUp} color="accent.solid" boxSize={4} />
                  </Flex>
                  <Box>
                    <Heading as="h3" fontSize={{ base: "17px", md: "19px" }} lineHeight={1.35} mb={2}>
                      {r.question}
                    </Heading>
                    <Text color="text.muted" fontSize={{ base: "14px", md: "15px" }} lineHeight={1.75}>
                      {r.guidance}
                    </Text>
                  </Box>
                </HStack>
              </GlassCard>
            </Reveal>
          ))}
        </VStack>
      </Container>

      {/* What is being priced. /pricing had five inbound links and exactly one outbound one
          (/contact), so a page whose whole job is to explain what work costs never sent a
          reader to the work itself. */}
      <Container maxW="container.site" px={{ base: 5, md: 8 }} pb={{ base: 12, md: 16 }}>
        <Reveal>
          <Eyebrow>What is being priced</Eyebrow>
          <Heading as="h2" mt={4} mb={3} fontSize={{ base: "28px", md: "38px" }} lineHeight={1.15} maxW="760px">
            The six kinds of work{" "}
            <Box as="span" className="gradient-text">these numbers cover</Box>
          </Heading>
          <Text color="text.muted" fontSize={{ base: "md", md: "lg" }} lineHeight={1.7} maxW="680px" mb={7}>
            Every estimate on this page resolves to one of these, or to a combination of
            them. Each page sets out what the work involves and what shapes its cost.
          </Text>
          <Wrap spacing={3}>
            {Object.entries(services).map(([slug, s]) => (
              <WrapItem key={slug}>
                <ChakraLink
                  as={Link}
                  to={`/service/${slug}`}
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
            <WrapItem>
              <ChakraLink
                as={Link}
                to="/case-studies"
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
                What these budgets produced
              </ChakraLink>
            </WrapItem>
          </Wrap>
        </Reveal>
      </Container>

      <Faqs
        items={pricingFaqs}
        eyebrow="Pricing FAQ"
        title="The questions"
        highlight="buyers actually ask."
        intro="Straight answers on cost, scope, ownership and how changes are handled. Anything we haven't covered?"
      />

      <CTASection
        eyebrow="Next step"
        title="Get a fixed-scope estimate"
        highlight="for your project"
        subtitle="A free 45-minute call. We'll scope the work, flag the risks, and tell you what it takes — whether or not you build it with us."
      />
    </Box>
  );
};

export default PricingGuide;
