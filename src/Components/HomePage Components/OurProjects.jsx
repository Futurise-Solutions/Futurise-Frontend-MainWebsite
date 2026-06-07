import React from "react";
import { Box, SimpleGrid, Image, Text, Heading, HStack, Tag, Flex, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { Projects } from "../../utils/Constant";
import { Section, SectionHeading, GlassCard, Reveal } from "../common";

const featuredProjects = Projects.filter((p) => p.featured);

const OurProjects = () => {
  const navigate = useNavigate();
  return (
    <Section>
      <Flex direction={{ base: "column", md: "row" }} justify="space-between" align={{ md: "end" }} gap={6} mb={{ base: 10, md: 14 }}>
        <SectionHeading
          align="left"
          eyebrow="Featured work"
          title="Projects we’re"
          highlight="proud of"
          subtitle="A selection of products we’ve designed and engineered for clients across industries and continents."
          mx={0}
        />
        <Reveal from="left" display={{ base: "none", md: "block" }} flexShrink={0}>
          <Button variant="outlineGlow" rightIcon={<FiArrowRight />} onClick={() => navigate("/portfolio")}>
            View all work
          </Button>
        </Reveal>
      </Flex>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
        {featuredProjects.map((project, index) => (
          <Reveal key={project.Heading} delay={(index % 4) * 0.08}>
            <GlassCard h="full" overflow="hidden" role="group" cursor="pointer" onClick={() => navigate("/portfolio")}>
              <Box overflow="hidden" h="200px">
                <Image
                  src={project.img[0].src}
                  alt={project.img[0].alt}
                  loading="lazy"
                  w="full"
                  h="full"
                  objectFit="cover"
                  objectPosition="top"
                  transition="transform .5s ease"
                  _groupHover={{ transform: "scale(1.06)" }}
                />
              </Box>
              <Box p={6}>
                <HStack spacing={2} mb={3} flexWrap="wrap">
                  <Tag size="sm" bg="rgba(111,147,255,0.14)" color="accent.solid" borderRadius="full" px={3}>
                    {project.projectType}
                  </Tag>
                  <Tag size="sm" bg="rgba(255,255,255,0.06)" color="text.muted" borderRadius="full" px={3}>
                    {project.location}
                  </Tag>
                </HStack>
                <Heading as="h3" fontSize="lg" fontWeight={600} mb={2} noOfLines={2}>
                  {project.Heading}
                </Heading>
                <Text color="text.muted" fontSize="14px" lineHeight={1.65} noOfLines={3}>
                  {project.aboutProject}
                </Text>
              </Box>
            </GlassCard>
          </Reveal>
        ))}
      </SimpleGrid>

      <Flex justify="center" mt={10} display={{ base: "flex", md: "none" }}>
        <Button variant="outlineGlow" rightIcon={<FiArrowRight />} onClick={() => navigate("/portfolio")}>
          View all work
        </Button>
      </Flex>
    </Section>
  );
};

export default OurProjects;
