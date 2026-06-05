import React from "react";
import { SimpleGrid, Heading, Text, Flex, Icon } from "@chakra-ui/react";
import { FiTarget, FiEye } from "react-icons/fi";
import { Section, SectionHeading, GlassCard, Reveal } from "../common";

const items = [
  {
    icon: FiTarget,
    title: "Our Mission",
    text: "To help enterprises accelerate the adoption of new technologies, untangle the complexity that comes with digital evolution, and orchestrate ongoing innovation — so our clients can focus on what they do best.",
  },
  {
    icon: FiEye,
    title: "Our Vision",
    text: "To revolutionize the tech industry by delivering innovative solutions that empower businesses to achieve digital excellence and sustainable growth, positioning Futurise as a trusted partner for enterprises worldwide.",
  },
];

const MissionVision = () => {
  return (
    <Section>
      <SectionHeading
        eyebrow="Purpose"
        title="Mission &"
        highlight="Vision"
        subtitle="What drives us forward and where we’re headed."
        mb={{ base: 10, md: 14 }}
      />
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        {items.map((it, i) => (
          <Reveal key={it.title} delay={i * 0.1}>
            <GlassCard h="full" p={{ base: 7, md: 9 }}>
              <Flex
                w="60px"
                h="60px"
                borderRadius="16px"
                align="center"
                justify="center"
                bgGradient="linear(135deg, brand.500, violet.500)"
                mb={6}
                boxShadow="0 12px 30px -12px rgba(79,123,255,0.7)"
              >
                <Icon as={it.icon} boxSize={7} color="white" />
              </Flex>
              <Heading as="h3" fontSize={{ base: "22px", md: "26px" }} mb={3}>
                {it.title}
              </Heading>
              <Text color="text.muted" fontSize={{ base: "md", md: "lg" }} lineHeight={1.75}>
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
