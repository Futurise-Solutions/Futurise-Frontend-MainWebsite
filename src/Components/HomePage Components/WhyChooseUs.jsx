import React from "react";
import { SimpleGrid, Image, Text, Heading, Flex } from "@chakra-ui/react";
import { cards } from "../../utils/Constant";
import { Section, SectionHeading, GlassCard, Reveal } from "../common";

const WhyChooseUs = () => {
  return (
    <Section>
      <SectionHeading
        eyebrow="Why Futurise"
        title="Built on trust,"
        highlight="delivered with care"
        subtitle="We obsess over the details that make a product successful — and the relationship that makes the project enjoyable."
        mb={{ base: 10, md: 14 }}
      />

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {cards.map((el, index) => (
          <Reveal key={el.title + index} delay={(index % 3) * 0.08}>
            <GlassCard h="full" p={{ base: 6, md: 7 }}>
              <Flex
                w="52px"
                h="52px"
                borderRadius="14px"
                align="center"
                justify="center"
                bgGradient="linear(135deg, rgba(123,108,255,0.2), rgba(181,123,255,0.2))"
                border="1px solid"
                borderColor="rgba(180,160,255,0.25)"
                mb={5}
              >
                <Image src={el.icon} alt={`${el.title} icon`} w="26px" h="26px" />
              </Flex>
              <Heading as="h3" fontSize="lg" fontWeight={600} mb={2}>
                {el.title}
              </Heading>
              <Text color="text.muted" fontSize="15px" lineHeight={1.7}>
                {el.description}
              </Text>
            </GlassCard>
          </Reveal>
        ))}
      </SimpleGrid>
    </Section>
  );
};

export default WhyChooseUs;
