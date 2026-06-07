import React from "react";
import { Box, Grid, GridItem, Image, Text, Heading, HStack, Tag, Flex, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import { Projects } from "../../utils/Constant";
import { Section, SectionHeading, Reveal } from "../common";

const featuredProjects = Projects.filter((p) => p.featured);

/**
 * Premium bento showcase card — frames each screenshot in a browser chrome so the
 * image reads as an intentional product preview instead of an aggressively cropped tile.
 */
const BentoCard = ({ project, large = false, onClick }) => (
  <Box
    role="group"
    onClick={onClick}
    cursor="pointer"
    position="relative"
    h="full"
    minH={large ? { base: "320px", md: "auto" } : "230px"}
    borderRadius="22px"
    overflow="hidden"
    border="1px solid"
    borderColor="border.subtle"
    bg="bg.surface"
    backdropFilter="blur(12px)"
    transition="all .35s cubic-bezier(0.22,1,0.36,1)"
    _hover={{
      borderColor: "rgba(180,160,255,0.45)",
      boxShadow: "0 30px 60px -28px rgba(123,108,255,0.5)",
      transform: "translateY(-6px)",
    }}
    display="flex"
    flexDirection="column"
  >
    {/* browser chrome */}
    <HStack px={4} py={3} spacing={3} borderBottom="1px solid" borderColor="border.subtle" flexShrink={0}>
      <HStack spacing={1.5}>
        <Box w="9px" h="9px" rounded="full" bg="#ff5f57" />
        <Box w="9px" h="9px" rounded="full" bg="#febc2e" />
        <Box w="9px" h="9px" rounded="full" bg="#28c840" />
      </HStack>
      <Text
        flex="1"
        fontSize="11px"
        color="text.faint"
        textAlign="center"
        bg="rgba(255,255,255,0.04)"
        borderRadius="full"
        py={1}
        px={3}
        noOfLines={1}
      >
        {project.clentName}
      </Text>
      <Box color="text.faint" opacity={0.5} _groupHover={{ opacity: 1, color: "accent.solid" }} transition="all .25s">
        <FiArrowUpRight />
      </Box>
    </HStack>

    {/* preview image — top-aligned, scales on hover, no hard center crop */}
    <Box flex="1" overflow="hidden" position="relative" minH={0}>
      <Image
        src={project.img[0].src}
        alt={project.img[0].alt}
        loading="lazy"
        w="full"
        h="full"
        objectFit="cover"
        objectPosition="top"
        transition="transform .6s cubic-bezier(0.22,1,0.36,1)"
        _groupHover={{ transform: "scale(1.05)" }}
      />
      {/* caption overlay */}
      <Box position="absolute" inset={0} bgGradient="linear(to-t, rgba(8,8,13,0.92) 0%, rgba(8,8,13,0.2) 45%, transparent 70%)" />
      <Box position="absolute" bottom={0} left={0} right={0} p={{ base: 5, md: large ? 7 : 5 }}>
        <HStack spacing={2} mb={2.5} flexWrap="wrap">
          <Tag size="sm" bg="rgba(180,160,255,0.16)" color="accent.solid" borderRadius="full" px={3}>
            {project.projectType}
          </Tag>
          <Tag size="sm" bg="rgba(255,255,255,0.08)" color="text.muted" borderRadius="full" px={3}>
            {project.location}
          </Tag>
        </HStack>
        <Heading as="h3" fontSize={large ? { base: "xl", md: "2xl" } : "md"} fontWeight={600} noOfLines={2}>
          {project.Heading}
        </Heading>
        {large && (
          <Text mt={2} color="text.muted" fontSize="14px" lineHeight={1.6} noOfLines={2} maxW="520px">
            {project.aboutProject}
          </Text>
        )}
      </Box>
    </Box>
  </Box>
);

const OurProjects = () => {
  const navigate = useNavigate();
  const go = () => navigate("/portfolio");
  const [hero, ...rest] = featuredProjects; // hero = big card, rest = up to 3

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

      <Grid
        templateColumns={{ base: "1fr", md: "repeat(6, 1fr)" }}
        autoRows={{ md: "minmax(0, 1fr)" }}
        gap={{ base: 5, md: 6 }}
      >
        {/* Big hero card: left, spans 2 rows */}
        <GridItem colSpan={{ base: 1, md: 4 }} rowSpan={{ md: 2 }}>
          <Reveal h="full">
            <BentoCard project={hero} large onClick={go} />
          </Reveal>
        </GridItem>

        {/* Two stacked cards on the right */}
        {rest.slice(0, 2).map((p, i) => (
          <GridItem key={p.Heading} colSpan={{ base: 1, md: 2 }}>
            <Reveal h="full" delay={0.08 * (i + 1)}>
              <BentoCard project={p} onClick={go} />
            </Reveal>
          </GridItem>
        ))}

        {/* Wide card across the bottom */}
        {rest[2] && (
          <GridItem colSpan={{ base: 1, md: 6 }}>
            <Reveal h="full" delay={0.24}>
              <BentoCard project={rest[2]} onClick={go} />
            </Reveal>
          </GridItem>
        )}
      </Grid>

      <Flex justify="center" mt={10} display={{ base: "flex", md: "none" }}>
        <Button variant="outlineGlow" rightIcon={<FiArrowRight />} onClick={go}>
          View all work
        </Button>
      </Flex>
    </Section>
  );
};

export default OurProjects;
