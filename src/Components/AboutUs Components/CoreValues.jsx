import React from "react";
import { SimpleGrid, Heading, Text } from "@chakra-ui/react";
import { coreValues } from "../../utils/Constant";
import { Section, SectionHeading, GlassCard, Reveal } from "../common";

const CoreValues = () => {
  return (
    <Section>
      <SectionHeading
        eyebrow="What we stand for"
        title="Our core"
        highlight="values"
        subtitle="The principles that shape how we work, communicate, and deliver."
        mb={{ base: 10, md: 14 }}
      />
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
        {coreValues.map((v, i) => (
          <Reveal key={v.title} delay={(i % 4) * 0.07}>
            <GlassCard h="full" p={6}>
              <Text fontFamily="heading" fontWeight={700} fontSize="40px" className="gradient-text" lineHeight={1} mb={3}>
                0{i + 1}
              </Text>
              <Heading as="h3" fontSize="lg" fontWeight={600} mb={2}>{v.title}</Heading>
              <Text color="text.muted" fontSize="14px" lineHeight={1.7}>{v.description}</Text>
            </GlassCard>
          </Reveal>
        ))}
      </SimpleGrid>
    </Section>
  );
};

export default CoreValues;
