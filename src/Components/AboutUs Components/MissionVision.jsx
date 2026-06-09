import React from "react";
import { Box, SimpleGrid, Heading, Text, Flex, Icon } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FiTarget, FiEye } from "react-icons/fi";
import { Section, SectionHeading, GlassCard, Reveal } from "../common";

const MotionBox = motion(Box);

const items = [
  {
    icon: FiTarget,
    no: "01",
    title: "Our Mission",
    text: "To help enterprises accelerate the adoption of new technologies, untangle the complexity that comes with digital evolution, and orchestrate ongoing innovation — so our clients can focus on what they do best.",
  },
  {
    icon: FiEye,
    no: "02",
    title: "Our Vision",
    text: "To revolutionize the tech industry by delivering innovative solutions that empower businesses to achieve digital excellence and sustainable growth, positioning Futurise as a trusted partner for enterprises worldwide.",
  },
];

const MissionVision = () => {
  return (
    <Section position="relative">
      {/* ambient backdrop */}
      <Box position="absolute" top="20%" left="50%" transform="translateX(-50%)" w="700px" h="360px" bg="rgba(123,108,255,0.1)" filter="blur(130px)" rounded="full" pointerEvents="none" />

      <SectionHeading
        eyebrow="Purpose"
        title="Mission &"
        highlight="Vision"
        subtitle="What drives us forward and where we’re headed."
        mb={{ base: 10, md: 14 }}
      />
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} position="relative">
        {items.map((it, i) => (
          <Reveal key={it.title} delay={i * 0.1} h="full">
            <GlassCard h="full" p={{ base: 7, md: 10 }} role="group" position="relative" overflow="hidden">
              {/* gradient top accent */}
              <Box position="absolute" top={0} left={0} right={0} h="3px" bgGradient="linear(90deg, brand.500, violet.500)" opacity={0.8} />
              {/* faint watermark icon */}
              <Icon as={it.icon} position="absolute" bottom="-20px" right="-16px" boxSize="160px" color="whiteAlpha.200" opacity={0.06} pointerEvents="none" />
              {/* big faint number */}
              <Text position="absolute" top={5} right={7} fontSize="40px" fontWeight={700} className="gradient-text" opacity={0.25}>
                {it.no}
              </Text>

              {/* icon orb with pulsing ring */}
              <Box position="relative" w="64px" h="64px" mb={7}>
                <MotionBox
                  position="absolute"
                  inset={0}
                  borderRadius="18px"
                  border="1px solid"
                  borderColor="rgba(180,160,255,0.5)"
                  animate={{ scale: [1, 1.35, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
                />
                <Flex
                  w="64px"
                  h="64px"
                  borderRadius="18px"
                  align="center"
                  justify="center"
                  bgGradient="linear(135deg, brand.500, violet.500)"
                  boxShadow="0 16px 36px -14px rgba(123,108,255,0.8)"
                >
                  <Icon as={it.icon} boxSize={7} color="white" />
                </Flex>
              </Box>

              <Heading as="h3" fontSize={{ base: "22px", md: "28px" }} mb={3} position="relative">
                {it.title}
              </Heading>
              <Text color="text.muted" fontSize={{ base: "md", md: "lg" }} lineHeight={1.75} position="relative" maxW="92%">
                {it.text}
              </Text>
            </GlassCard>
          </Reveal>
        ))}
      </SimpleGrid>
    </Section>
  );
};

export default MissionVision;
