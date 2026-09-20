'use client'

import React from "react";
import { Box, Flex, Heading, Text, Button, VStack, HStack, Icon } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";
import { Section, Reveal, Eyebrow } from "../common";
import SystemDiagram from "../common/SystemDiagram";

const highlights = [
  "AI-first engineers who've shipped agents, SaaS & mobile apps",
  "Transparent sprints — weekly demos, zero surprises",
  "End-to-end ownership: strategy → design → build → scale",
];

const About = () => {
  // react-router-dom → next/navigation. Kept as a `navigate(to)` function so the call
  // site below stays character-for-character what it was. Same pattern as Navbar.jsx.
  const router = useRouter();
  const navigate = (to) => router.push(to);
  return (
    <Section>
      <Flex direction={{ base: "column", lg: "row" }} align="center" gap={{ base: 12, lg: 20 }}>
        {/* Visual — an actual architecture diagram. This was four gradient boxes
            captioned "AI Agents / Autonomous workflows" and so on: they paraphrased
            the copy sitting next to them and read as an unstyled wireframe, which is
            a poor advertisement directly beside a headline about senior engineering.
            See SystemDiagram.jsx for what it draws and why it is SVG rather than an
            image. */}
        <Reveal from="right" flex="1" w="full">
          <SystemDiagram />
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
