import React from "react";
import { Box, SimpleGrid, Image, Text, Heading, HStack, Icon, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { OurServiceData } from "../../utils/Constant";
import { Section, SectionHeading, GlassCard, Reveal } from "../common";

const MotionBox = motion(Box);

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

    {/* icon with animated rotating gradient ring */}
    <Box position="relative" w="56px" h="56px" mb={5}>
      <MotionBox
        position="absolute"
        inset="-3px"
        borderRadius="18px"
        opacity={0}
        _groupHover={{ opacity: 0.9 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        sx={{ background: "conic-gradient(from 0deg, #7b6cff, #b57bff, #7b6cff)", filter: "blur(2px)" }}
      />
      <Flex
        position="relative"
        w="56px"
        h="56px"
        borderRadius="16px"
        align="center"
        justify="center"
        bgGradient="linear(135deg, rgba(123,108,255,0.2), rgba(181,123,255,0.2))"
        border="1px solid"
        borderColor="rgba(180,160,255,0.25)"
        transition="transform .3s"
        _groupHover={{ transform: "scale(1.08)" }}
        bg="bg.canvas"
      >
        <Image src={el.icon} alt="" w="28px" h="28px" />
      </Flex>
    </Box>

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
