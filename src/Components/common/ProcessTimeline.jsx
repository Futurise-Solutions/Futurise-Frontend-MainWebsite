import React from "react";
import { SimpleGrid, Text, Heading, Flex, Icon } from "@chakra-ui/react";
import { processSteps } from "../../utils/Constant";
import GlassCard from "./GlassCard";
import Reveal from "./Reveal";

/** Numbered "how we work" steps. Shared by home + service pages. */
const ProcessTimeline = ({ columns = { base: 1, sm: 2, lg: 4 } }) => {
  return (
    <SimpleGrid columns={columns} spacing={5}>
      {processSteps.map((step, i) => (
        <Reveal key={step.title} delay={(i % 4) * 0.07}>
          <GlassCard h="full" p={6} hover={false} _hover={{ borderColor: "rgba(111,147,255,0.45)" }}>
            <Flex justify="space-between" align="center" mb={4}>
              <Flex
                w="48px"
                h="48px"
                borderRadius="14px"
                align="center"
                justify="center"
                bgGradient="linear(135deg, rgba(79,123,255,0.2), rgba(157,92,255,0.2))"
                border="1px solid"
                borderColor="rgba(111,147,255,0.25)"
              >
                <Icon as={step.icon} boxSize={5} color="accent.solid" />
              </Flex>
              <Text fontFamily="heading" fontWeight={700} fontSize="28px" color="rgba(255,255,255,0.08)">
                0{i + 1}
              </Text>
            </Flex>
            <Heading as="h3" fontSize="lg" fontWeight={600} mb={2}>
              {step.title}
            </Heading>
            <Text color="text.muted" fontSize="14px" lineHeight={1.65}>
              {step.content}
            </Text>
          </GlassCard>
        </Reveal>
      ))}
    </SimpleGrid>
  );
};

export default ProcessTimeline;
