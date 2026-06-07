import React from "react";
import { SimpleGrid, Box, Heading, Text, VStack, HStack, Image, Icon } from "@chakra-ui/react";
import { FiCheck } from "react-icons/fi";
import { strengths } from "../../utils/Constant";
import { Section, SectionHeading, GlassCard, Reveal } from "../common";

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
          <Reveal key={strength.name} delay={(i % 3) * 0.08}>
            <GlassCard h="full" p={{ base: 6, md: 7 }}>
              <HStack spacing={4} mb={5}>
                <Box
                  w="52px"
                  h="52px"
                  borderRadius="14px"
                  display="grid"
                  placeItems="center"
                  bgGradient="linear(135deg, rgba(123,108,255,0.2), rgba(181,123,255,0.2))"
                  border="1px solid"
                  borderColor="rgba(180,160,255,0.25)"
                  flexShrink={0}
                >
                  <Image src={strength.icon} alt="" w="26px" h="26px" />
                </Box>
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
