'use client'

import React from "react";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Marquee from "react-fast-marquee";
import { FiArrowRight } from "react-icons/fi";
import { Projects } from "../../utils/Constant";
import { Section, SectionHeading, Reveal } from "../common";

const ProjectThumb = ({ p }) => (
  <Box
    w={{ base: "300px", md: "420px" }}
    h={{ base: "200px", md: "270px" }}
    mx={3}
    borderRadius="16px"
    overflow="hidden"
    border="1px solid"
    borderColor="border.subtle"
    boxShadow="0 24px 50px -28px rgba(0,0,0,0.8)"
    position="relative"
  >
    {/* D27: next/image with the static import passed directly — `p.img[0].src` holds the
        imported asset object, not a string path, so it carries its own intrinsic size.
        `fill` reproduces the original `w="full" h="full"`, with the parent already
        position:relative. object-fit/position move to props. `sizes` matches the two
        rendered widths so the browser picks the right variant rather than the largest.
        `loading="lazy"` and `decoding="async"` are next/image defaults. */}
    <Image
      src={p.img[0].src}
      alt={p.img[0].alt}
      fill
      sizes="(max-width: 768px) 300px, 420px"
      style={{ objectFit: "cover", objectPosition: "top" }}
    />
    <Box
      position="absolute"
      inset={0}
      bgGradient="linear(to-t, rgba(8,8,13,0.8), rgba(8,8,13,0) 55%)"
    />
    <Text
      position="absolute"
      bottom={3}
      left={4}
      right={4}
      fontSize="13px"
      fontWeight={600}
      noOfLines={1}
    >
      {p.clentName}
    </Text>
  </Box>
);

const OurProjects = () => {
  // react-router-dom → next/navigation, kept as `navigate(to)` so call sites are verbatim.
  const router = useRouter();
  const navigate = (to) => router.push(to);

  return (
    <Section>
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align={{ md: "end" }}
        gap={6}
        mb={{ base: 10, md: 14 }}
      >
        {/* minW=0 lets the heading shrink inside the flex row. Without it the
            640px-wide heading and the button together exceed the container at exactly
            768px, pushing the button 16px past the viewport edge. */}
        <SectionHeading
          align="left"
          eyebrow="Featured work"
          title="Projects we're"
          highlight="proud of"
          subtitle="A selection of products we've designed and engineered for clients across industries and continents."
          mx={0}
          minW={0}
        />
        <Reveal from="left" display={{ base: "none", md: "block" }} flexShrink={0}>
          <Button variant="outlineGlow" rightIcon={<FiArrowRight />} onClick={() => navigate("/portfolio")}>
            View all work
          </Button>
        </Reveal>
      </Flex>

      {/* Scrolling thumbnail marquee */}
      <Box
        position="relative"
        sx={{
          maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
        }}
      >
        <Marquee gradient={false} speed={36} pauseOnHover>
          {Projects.map((p) => (
            <ProjectThumb key={p.Heading} p={p} />
          ))}
        </Marquee>
      </Box>

      <Flex justify="center" mt={10} display={{ base: "flex", md: "none" }}>
        <Button variant="outlineGlow" rightIcon={<FiArrowRight />} onClick={() => navigate("/portfolio")}>
          View all work
        </Button>
      </Flex>
    </Section>
  );
};

export default OurProjects;
