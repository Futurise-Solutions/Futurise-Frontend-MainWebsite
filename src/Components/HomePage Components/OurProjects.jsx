import React from "react";
import { Box, Image, Text, Heading, HStack, Tag, Flex, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import { Projects } from "../../utils/Constant";
import { Section, SectionHeading, Reveal } from "../common";

const featuredProjects = Projects.filter((p) => p.featured);

/**
 * Masonry card — the full screenshot is shown at its natural aspect ratio
 * (w:100%, h:auto, no crop) inside a browser frame; the caption sits BELOW the
 * image so no visual content is ever hidden.
 */
const MasonryCard = ({ project, onClick }) => (
  <Box
    role="group"
    onClick={onClick}
    cursor="pointer"
    mb={{ base: 5, md: 6 }}
    borderRadius="20px"
    overflow="hidden"
    border="1px solid"
    borderColor="border.subtle"
    bg="bg.surface"
    backdropFilter="blur(12px)"
    transition="all .35s cubic-bezier(0.22,1,0.36,1)"
    sx={{ breakInside: "avoid", WebkitColumnBreakInside: "avoid" }}
    _hover={{
      borderColor: "rgba(180,160,255,0.45)",
      boxShadow: "0 30px 60px -28px rgba(123,108,255,0.5)",
      transform: "translateY(-6px)",
    }}
  >
    {/* browser chrome */}
    <HStack px={4} py={3} spacing={3} borderBottom="1px solid" borderColor="border.subtle">
      <HStack spacing={1.5}>
        <Box w="9px" h="9px" rounded="full" bg="#ff5f57" />
        <Box w="9px" h="9px" rounded="full" bg="#febc2e" />
        <Box w="9px" h="9px" rounded="full" bg="#28c840" />
      </HStack>
      <Text flex="1" fontSize="11px" color="text.faint" textAlign="center" bg="rgba(255,255,255,0.04)" borderRadius="full" py={1} px={3} noOfLines={1}>
        {project.clentName}
      </Text>
      <Box color="text.faint" opacity={0.5} _groupHover={{ opacity: 1, color: "accent.solid" }} transition="all .25s">
        <FiArrowUpRight />
      </Box>
    </HStack>

    {/* full, uncropped screenshot */}
    <Box overflow="hidden">
      <Image
        src={project.img[0].src}
        alt={project.img[0].alt}
        loading="lazy"
        w="100%"
        h="auto"
        display="block"
        transition="transform .6s cubic-bezier(0.22,1,0.36,1)"
        _groupHover={{ transform: "scale(1.03)" }}
      />
    </Box>

    {/* caption below the image */}
    <Box p={{ base: 5, md: 6 }}>
      <HStack spacing={2} mb={2.5} flexWrap="wrap">
        <Tag size="sm" bg="rgba(180,160,255,0.16)" color="accent.solid" borderRadius="full" px={3}>
          {project.projectType}
        </Tag>
        <Tag size="sm" bg="rgba(255,255,255,0.08)" color="text.muted" borderRadius="full" px={3}>
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
  </Box>
);

const OurProjects = () => {
  const navigate = useNavigate();
  const go = () => navigate("/portfolio");

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
          <Button variant="outlineGlow" rightIcon={<FiArrowRight />} onClick={go}>
            View all work
          </Button>
        </Reveal>
      </Flex>

      {/* CSS masonry — variable-height cards pack without cropping images.
          The container fades in as one block (per-item transforms inside a
          multicolumn layout can mis-place cards across columns in some browsers). */}
      <Reveal>
        <Box
          sx={{
            columnGap: "24px",
            columnCount: 1,
            "@media (min-width: 768px)": { columnCount: 2 },
            "@media (min-width: 1100px)": { columnCount: 3 },
          }}
        >
          {featuredProjects.map((project) => (
            <MasonryCard key={project.Heading} project={project} onClick={go} />
          ))}
        </Box>
      </Reveal>

      <Flex justify="center" mt={6} display={{ base: "flex", md: "none" }}>
        <Button variant="outlineGlow" rightIcon={<FiArrowRight />} onClick={go}>
          View all work
        </Button>
      </Flex>
    </Section>
  );
};

export default OurProjects;
