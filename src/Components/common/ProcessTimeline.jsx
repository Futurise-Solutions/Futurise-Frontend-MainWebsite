import React from "react";
import { SimpleGrid, Text, Heading, Flex, Icon, Box } from "@chakra-ui/react";
import { processSteps } from "../../utils/Constant";
import GlassCard from "./GlassCard";
import Reveal from "./Reveal";
import CircuitRail from "./CircuitRail";

/** Numbered "how we work" steps. Shared by home + service pages. */
const ProcessTimeline = ({ columns = { base: 1, sm: 2, lg: 4 } }) => {
  return (
    <Box position="relative">
      {/* Stepped rail *above* the grid, not behind it. This is the "how we work"
          section: the point is that the seven steps are a sequence, and a plain grid of
          seven boxes is the one layout that does not say so. Sitting it behind the cards
          hid everything except the slivers in the gutters, so it runs above the row
          instead, where the junctions line up with the cards below.
          Desktop only — below `lg` the cards stack into one or two columns and a
          horizontal spine would connect nothing. See CircuitRail.jsx. */}
      <Box display={{ base: "none", lg: "block" }} position="relative" h="34px" mb={1}>
        <CircuitRail stops={4} variant="stepped" height={34} top="0" />
      </Box>

      <SimpleGrid columns={columns} spacing={5} position="relative" zIndex={1}>
      {processSteps.map((step, i) => (
        <Reveal key={step.title} delay={(i % 4) * 0.07}>
          <GlassCard h="full" p={6} hover={false} _hover={{ borderColor: "rgba(180,160,255,0.45)" }}>
            <Flex justify="space-between" align="center" mb={4}>
              <Flex
                w="48px"
                h="48px"
                borderRadius="14px"
                align="center"
                justify="center"
                bgGradient="linear(135deg, rgba(123,108,255,0.2), rgba(181,123,255,0.2))"
                border="1px solid"
                borderColor="rgba(180,160,255,0.25)"
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
    </Box>
  );
};

export default ProcessTimeline;
