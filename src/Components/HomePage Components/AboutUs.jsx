import React from "react";
import { Box, Flex, Heading, Text, Button, VStack, HStack, Icon, SimpleGrid } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";
import { Section, Reveal, Eyebrow } from "../common";

const highlights = [
  "AI-first engineers who've shipped agents, SaaS & mobile apps",
  "Transparent sprints — weekly demos, zero surprises",
  "End-to-end ownership: strategy → design → build → scale",
];

const About = () => {
  const navigate = useNavigate();
  return (
    <Section>
      <Flex direction={{ base: "column", lg: "row" }} align="center" gap={{ base: 12, lg: 20 }}>
        {/* Visual */}
        <Reveal from="right" flex="1" w="full">
          <Box position="relative" maxW="520px" mx="auto">
            <Box position="absolute" inset="-12% -8%" bg="rgba(123,108,255,0.18)" filter="blur(80px)" rounded="full" />
            <SimpleGrid columns={2} spacing={4} position="relative">
              {[
                { k: "AI Agents", v: "Autonomous workflows", grad: "linear(135deg, rgba(123,108,255,0.38), rgba(123,108,255,0.08))", b: "rgba(180,160,255,0.45)" },
                { k: "Engineering", v: "Production-grade code", grad: "linear(135deg, rgba(181,123,255,0.3), rgba(181,123,255,0.06))", b: "rgba(181,123,255,0.3)" },
                { k: "Design", v: "Pixel-perfect UI", grad: "linear(135deg, rgba(181,123,255,0.3), rgba(181,123,255,0.06))", b: "rgba(181,123,255,0.3)" },
                { k: "Growth", v: "Data-driven marketing", grad: "linear(135deg, rgba(123,108,255,0.3), rgba(123,108,255,0.06))", b: "rgba(180,160,255,0.3)" },
              ].map((c, i) => (
                <Box
                  key={c.k}
                  borderRadius="20px"
                  p={6}
                  bgGradient={c.grad}
                  border="1px solid"
                  borderColor={c.b}
                  mt={i % 2 ? 8 : 0}
                  backdropFilter="blur(10px)"
                >
                  <Text fontSize="xs" textTransform="uppercase" letterSpacing="0.12em" color="text.faint">{c.k}</Text>
                  <Text mt={2} fontWeight={600} fontSize="lg">{c.v}</Text>
                </Box>
              ))}
            </SimpleGrid>
          </Box>
        </Reveal>

        {/* Copy */}
        <VStack flex="1" align="start" spacing={5}>
          <Reveal><Eyebrow>Expert Engineering Team</Eyebrow></Reveal>
          <Reveal delay={0.05}>
            <Heading fontSize={{ base: "30px", md: "42px" }} lineHeight={1.15}>
              Senior engineers who ship{" "}
              <Box as="span" className="gradient-text">AI products that scale.</Box>
            </Heading>
          </Reveal>
          <Reveal delay={0.1}>
            <Text color="text.muted" fontSize={{ base: "md", md: "lg" }} lineHeight={1.7}>
              Futurise is a product engineering team specialising in AI agents, SaaS platforms, web apps, and mobile applications. We own the full cycle — from discovery and architecture to deployment and growth — so you ship faster and scale without re-engineering.
            </Text>
          </Reveal>
          <Reveal delay={0.15}>
            <VStack align="start" spacing={3}>
              {highlights.map((h) => (
                <HStack key={h} spacing={3} align="start">
                  <Icon as={FiCheckCircle} color="accent.solid" boxSize={5} mt={0.5} />
                  <Text color="text.muted">{h}</Text>
                </HStack>
              ))}
            </VStack>
          </Reveal>
          <Reveal delay={0.2}>
            <Button mt={2} variant="gradient" size="lg" rightIcon={<FiArrowRight />} onClick={() => navigate("/about")}>
              See how we work
            </Button>
          </Reveal>
        </VStack>
      </Flex>
    </Section>
  );
};

export default About;
