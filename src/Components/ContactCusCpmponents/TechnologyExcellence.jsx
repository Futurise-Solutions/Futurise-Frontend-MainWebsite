import React from "react";
import { SimpleGrid, Heading, Text, VStack, HStack, Image, Icon } from "@chakra-ui/react";
import { FiCheck } from "react-icons/fi";
import { strengths } from "../../utils/Constant";
import { Section, SectionHeading, GlassCard, Reveal, IconTile } from "../common";

const TechnologyExcellence = () => {
  return (
    <Section>
      <SectionHeading
        eyebrow="Our expertise"
        title="Technology"
        highlight="excellence"
        subtitle="Deep, hands-on capability across the full modern technology stack — so we can build whatever your product needs."
        mb={{ base: 10, md: 14 }}
      />
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {strengths.map((strength, i) => (
          <Reveal key={strength.name} delay={(i % 3) * 0.08} h="full">
            <GlassCard h="full" p={{ base: 6, md: 7 }} role="group">
              <HStack spacing={4} mb={5}>
                <IconTile size="52px" radius="14px">
                  <Image src={strength.icon} alt="" w="26px" h="26px" />
                </IconTile>
                <Heading as="h3" fontSize="lg" fontWeight={600}>
                  {strength.name}
                </Heading>
              </HStack>
              <VStack align="start" spacing={3}>
                {strength.description.map((point, index) => (
                  <HStack key={index} spacing={3} align="start">
                    <Icon as={FiCheck} color="accent.solid" boxSize={4} mt={1} flexShrink={0} />
                    <Text color="text.muted" fontSize="14px" lineHeight={1.6}>{point}</Text>
                  </HStack>
                ))}
              </VStack>
            </GlassCard>
          </Reveal>
        ))}
      </SimpleGrid>
    </Section>
  );
};

export default TechnologyExcellence;
