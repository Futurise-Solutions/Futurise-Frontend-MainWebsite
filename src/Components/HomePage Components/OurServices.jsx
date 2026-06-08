import React from "react";
import { Box, SimpleGrid, Image, Text, Heading, HStack, Icon } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import { OurServiceData } from "../../utils/Constant";
import { Section, SectionHeading, GlassCard, Reveal, IconTile } from "../common";

const ServiceCard = ({ el, index }) => (
  <GlassCard
    as={Link}
    to={`/service/${el.route}`}
    display="block"
    h="full"
    p={{ base: 6, md: 7 }}
    role="group"
    position="relative"
    overflow="hidden"
  >
    {/* hover gradient sweep */}
    <Box
      position="absolute"
      inset={0}
      opacity={0}
      bgGradient="radial(140% 120% at 100% 0%, rgba(123,108,255,0.16), transparent 60%)"
      transition="opacity .4s"
      _groupHover={{ opacity: 1 }}
      pointerEvents="none"
    />
    {/* faint index number */}
    <Text
      position="absolute"
      top={4}
      right={5}
      fontSize="46px"
      fontWeight={700}
      lineHeight={1}
      color="whiteAlpha.300"
      opacity={0.18}
      transition="opacity .3s"
      _groupHover={{ opacity: 0.3 }}
      pointerEvents="none"
    >
      {String(index + 1).padStart(2, "0")}
    </Text>

    {/* premium icon tile — glow visible by default */}
    <IconTile mb={5}>
      <Image src={el.icon} alt="" w="28px" h="28px" />
    </IconTile>

    <HStack justify="space-between" align="start" position="relative">
      <Heading as="h3" fontSize="xl" fontWeight={600}>
        {el.serviceName}
      </Heading>
      <Icon
        as={FiArrowUpRight}
        boxSize={5}
        color="text.faint"
        transition="all .3s"
        _groupHover={{ color: "accent.solid", transform: "translate(3px,-3px)" }}
      />
    </HStack>

    <Text mt={3} color="text.muted" fontSize="15px" lineHeight={1.7} position="relative">
      {el.serviceDesc}
    </Text>

    <Text
      mt={5}
      fontSize="sm"
      fontWeight={600}
      color="accent.solid"
      opacity={0.85}
      position="relative"
      _groupHover={{ opacity: 1 }}
    >
      Learn more →
    </Text>
  </GlassCard>
);

const OurServices = () => {
  return (
    <Section>
      <SectionHeading
        eyebrow="What we do"
        title="Services that move your"
        highlight="business forward"
        subtitle="From a single feature to an entire platform, we offer end-to-end product capabilities under one roof."
        mb={{ base: 10, md: 14 }}
      />

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {OurServiceData.map((el, index) => (
          <Reveal key={el.serviceName} delay={(index % 3) * 0.08} h="full">
            <ServiceCard el={el} index={index} />
          </Reveal>
        ))}
      </SimpleGrid>
    </Section>
  );
};

export default OurServices;
