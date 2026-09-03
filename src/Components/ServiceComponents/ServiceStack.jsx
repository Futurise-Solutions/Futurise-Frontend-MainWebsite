import React from "react";
import { Box, Flex, Heading, Text, Tag, HStack, VStack, Button, SimpleGrid, Icon } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { techStacks } from "../../utils/Constant";
import { getTechLogo } from "../../utils/Constant/techLogos";
import { Section, SectionHeading, GlassCard, Reveal } from "../common";

/**
 * Capability grid — one authentic brand mark per technology in the stack.
 *
 * Each tile keeps the technology's real brand colour at low opacity so the grid still
 * reads as one lavender system, then lifts to full colour on hover. Logos are vector
 * (react-icons / Simple Icons), so nothing is downloaded and nothing is distorted.
 */
const TechLogoGrid = ({ stack }) => {
  const techs = stack.techStack.split(",").map((t) => t.trim()).filter(Boolean);
  // Prefer a column count that divides the item count evenly, so a 4-item stack renders
  // 2x2 rather than a row of 3 plus a lone orphan tile. Falls back to the densest
  // sensible grid for counts with no clean divisor (e.g. 5, 7).
  // Large stacks always want 4 columns (10 items in 2 columns would be a tall list);
  // only small stacks get a divisor-based choice, where an orphan tile is conspicuous.
  const n = techs.length;
  const cols =
    n >= 9 ? 4
    : n >= 7 ? 4
    : n === 6 ? 3
    : n === 5 ? 3
    : n === 4 ? 2
    : n === 3 ? 3
    : 2;

  return (
    <GlassCard p={{ base: 5, md: 7 }} hover={false} position="relative" overflow="hidden">
      {/* corner light — gives the panel a direction rather than an even wash */}
      <Box
        position="absolute" top="-40%" right="-15%" w="280px" h="280px" rounded="full"
        bg="radial-gradient(circle, rgba(181,123,255,0.24) 0%, transparent 68%)"
        filter="blur(50px)" pointerEvents="none"
      />

      <SimpleGrid columns={{ base: 2, sm: cols }} spacing={{ base: 2.5, md: 3 }} position="relative">
        {techs.map((tech) => {
          const { icon, color } = getTechLogo(tech);
          return (
            <VStack
              key={tech}
              role="group"
              spacing={2.5}
              px={2}
              py={{ base: 3.5, md: 4 }}
              borderRadius="14px"
              bg="rgba(255,255,255,0.035)"
              border="1px solid"
              borderColor="border.subtle"
              transition="transform .28s cubic-bezier(0.22,1,0.36,1), border-color .28s ease, background .28s ease"
              _hover={{
                transform: "translateY(-3px)",
                borderColor: "rgba(180,160,255,0.3)",
                bg: "rgba(255,255,255,0.06)",
              }}
            >
              <Icon
                as={icon}
                boxSize={{ base: 6, md: 7 }}
                color={color}
                // Desaturated at rest so a grid of 10 brand colours doesn't shout;
                // resolves to true brand colour on hover.
                opacity={0.72}
                transition="opacity .28s ease, transform .28s ease"
                _groupHover={{ opacity: 1, transform: "scale(1.08)" }}
              />
              <Text
                fontSize={{ base: "11px", md: "12px" }}
                fontWeight={600}
                color="text.muted"
                textAlign="center"
                lineHeight={1.25}
                noOfLines={2}
                transition="color .28s ease"
                _groupHover={{ color: "text.primary" }}
              >
                {tech}
              </Text>
            </VStack>
          );
        })}
      </SimpleGrid>
    </GlassCard>
  );
};

const ServiceStack = ({ service }) => {
  const navigate = useNavigate();
  const serviceData = techStacks[service];
  if (!serviceData) return null;

  return (
    <Section>
      <SectionHeading
        eyebrow="Capabilities"
        title="Our"
        highlight={serviceData.title}
        subtitle="The tools and approaches we use to deliver fast, reliable, future-proof results."
        mb={{ base: 12, md: 16 }}
      />

      <VStack spacing={{ base: 12, md: 16 }} align="stretch">
        {serviceData.stacks.map((stack, index) => (
          <Reveal key={index}>
            <Flex
              direction={{ base: "column", md: index % 2 === 1 ? "row-reverse" : "row" }}
              align="center"
              gap={{ base: 8, md: 14 }}
            >
              {/* Copy */}
              <VStack flex="1" align="start" spacing={4}>
                <Text fontSize="sm" fontWeight={600} color="accent.solid" letterSpacing="0.08em" textTransform="uppercase">
                  {stack.subtitle}
                </Text>
                {/* h3: these sit under the section's h2, so the default h2 broke the
                    document outline and flattened the page's heading hierarchy. */}
                <Heading as="h3" fontSize={{ base: "26px", md: "32px" }} lineHeight={1.2}>
                  {stack.title}
                </Heading>
                <Text color="text.muted" fontSize={{ base: "md", md: "lg" }} lineHeight={1.7}>
                  {stack.description}
                </Text>
                <HStack flexWrap="wrap" spacing={2} pt={1}>
                  {stack.techStack.split(",").map((tech, idx) => (
                    <Tag key={idx} bg="rgba(180,160,255,0.12)" color="accent.solid" borderRadius="full" px={4} py={2} fontSize="sm">
                      {tech.trim()}
                    </Tag>
                  ))}
                </HStack>
                <Button mt={3} variant="outlineGlow" rightIcon={<FiArrowRight />} onClick={() => navigate("/contact")}>
                  Discuss your project
                </Button>
              </VStack>

              {/* Visual — authentic brand marks for the same stack.
                  This panel used to repeat the technology names as plain text boxes,
                  duplicating the pills in the copy column verbatim. Showing each
                  technology's real logo makes the panel carry information the reader
                  does not already have, and reads as a capability grid rather than a
                  second list. */}
              <Box flex="1" w="full">
                <TechLogoGrid stack={stack} />
              </Box>
            </Flex>
          </Reveal>
        ))}
      </VStack>
    </Section>
  );
};

export default ServiceStack;
