import React from "react";
import { Box, Flex, Heading, Text, Tag, HStack, VStack, Button, SimpleGrid } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FiArrowRight, FiCode } from "react-icons/fi";
import { techStacks } from "../../utils/Constant";
import { Section, SectionHeading, GlassCard, Reveal } from "../common";

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
                <Heading fontSize={{ base: "26px", md: "32px" }} lineHeight={1.2}>
                  {stack.title}
                </Heading>
                <Text color="text.muted" fontSize={{ base: "md", md: "lg" }} lineHeight={1.7}>
                  {stack.description}
                </Text>
                <HStack flexWrap="wrap" spacing={2} pt={1}>
                  {stack.techStack.split(",").map((tech, idx) => (
                    <Tag key={idx} bg="rgba(111,147,255,0.12)" color="accent.solid" borderRadius="full" px={4} py={2} fontSize="sm">
                      {tech.trim()}
                    </Tag>
                  ))}
                </HStack>
                <Button mt={3} variant="outlineGlow" rightIcon={<FiArrowRight />} onClick={() => navigate("/contact")}>
                  Discuss your project
                </Button>
              </VStack>

              {/* Visual */}
              <Box flex="1" w="full">
                <GlassCard p={{ base: 6, md: 8 }} hover={false} position="relative" overflow="hidden">
                  <Box position="absolute" top="-30%" right="-10%" w="240px" h="240px" bg="rgba(157,92,255,0.25)" filter="blur(70px)" rounded="full" />
                  <Flex w="60px" h="60px" borderRadius="16px" align="center" justify="center" bgGradient="linear(135deg, brand.500, violet.500)" mb={6}>
                    <FiCode size={26} color="white" />
                  </Flex>
                  <SimpleGrid columns={2} spacing={3} position="relative">
                    {stack.techStack.split(",").map((tech, idx) => (
                      <Box key={idx} p={4} borderRadius="12px" bg="rgba(255,255,255,0.04)" border="1px solid" borderColor="border.subtle">
                        <Text fontWeight={600} fontSize="15px">{tech.trim()}</Text>
                      </Box>
                    ))}
                  </SimpleGrid>
                </GlassCard>
              </Box>
            </Flex>
          </Reveal>
        ))}
      </VStack>
    </Section>
  );
};

export default ServiceStack;
