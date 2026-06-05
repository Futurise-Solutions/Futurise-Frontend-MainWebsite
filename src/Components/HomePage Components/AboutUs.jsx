import React from "react";
import { Box, Flex, Heading, Text, Button, VStack, HStack, Icon, SimpleGrid } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";
import { Section, Reveal, Eyebrow } from "../common";

const highlights = [
  "Senior, product-minded engineers & designers",
  "Agile sprints with weekly demos and full transparency",
  "End-to-end ownership: strategy, design, build & launch",
];

const About = () => {
  const navigate = useNavigate();
  return (
    <Section>
      <Flex direction={{ base: "column", lg: "row" }} align="center" gap={{ base: 12, lg: 20 }}>
        {/* Visual */}
        <Reveal from="right" flex="1" w="full">
          <Box position="relative" maxW="520px" mx="auto">
            <Box position="absolute" inset="-12% -8%" bg="rgba(79,123,255,0.18)" filter="blur(80px)" rounded="full" />
            <SimpleGrid columns={2} spacing={4} position="relative">
              {[
                { k: "Design", v: "Pixel-perfect UI", grad: "linear(135deg, rgba(79,123,255,0.3), rgba(79,123,255,0.06))", b: "rgba(111,147,255,0.3)" },
                { k: "Engineering", v: "Clean, tested code", grad: "linear(135deg, rgba(157,92,255,0.3), rgba(157,92,255,0.06))", b: "rgba(157,92,255,0.3)" },
                { k: "Web3", v: "Audited contracts", grad: "linear(135deg, rgba(157,92,255,0.3), rgba(157,92,255,0.06))", b: "rgba(157,92,255,0.3)" },
                { k: "Growth", v: "Data-driven marketing", grad: "linear(135deg, rgba(79,123,255,0.3), rgba(79,123,255,0.06))", b: "rgba(111,147,255,0.3)" },
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
          <Reveal><Eyebrow>Who we are</Eyebrow></Reveal>
          <Reveal delay={0.05}>
            <Heading fontSize={{ base: "30px", md: "42px" }} lineHeight={1.15}>
              A partner that turns ideas into{" "}
              <Box as="span" className="gradient-text">products people love.</Box>
            </Heading>
          </Reveal>
          <Reveal delay={0.1}>
            <Text color="text.muted" fontSize={{ base: "md", md: "lg" }} lineHeight={1.7}>
              At Futurise, we drive digital transformation with cutting-edge software that empowers businesses to reach their full potential. We blend strategy, design, and engineering to deliver products that are fast, beautiful, and built to scale.
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
              Learn more about us
            </Button>
          </Reveal>
        </VStack>
      </Flex>
    </Section>
  );
};

export default About;
