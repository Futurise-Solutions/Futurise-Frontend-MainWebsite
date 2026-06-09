import React from "react";
import { Box, Flex, Image, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
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
    <Image
      src={p.img[0].src}
      alt={p.img[0].alt}
      loading="lazy"
      w="full"
      h="full"
      objectFit="cover"
      objectPosition="top"
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
  const navigate = useNavigate();

  return (
    <Section>
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align={{ md: "end" }}
        gap={6}
        mb={{ base: 10, md: 14 }}
      >
        <SectionHeading
          align="left"
          eyebrow="Featured work"
          title="Projects we're"
          highlight="proud of"
          subtitle="A selection of products we've designed and engineered for clients across industries and continents."
          mx={0}
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
