import React from "react";
import { Box, Container, Heading, Text, Button, Stack, HStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { Reveal, Eyebrow } from "../common";

const PageHero = ({
  eyebrow = "About us",
  title,
  highlight,
  subtitle,
  primaryLabel = "Start a project",
  primaryTo = "/contact",
  secondaryLabel,
  secondaryTo,
}) => {
  const navigate = useNavigate();
  return (
    <Box position="relative" overflow="hidden" pt={{ base: 14, md: 20 }} pb={{ base: 12, md: 16 }}>
      {/* subtle dot-grid backdrop, faded toward the edges */}
      <Box
        position="absolute"
        inset={0}
        pointerEvents="none"
        opacity={0.5}
        backgroundImage="radial-gradient(rgba(111,147,255,0.16) 1px, transparent 1px)"
        backgroundSize="22px 22px"
        sx={{
          maskImage: "radial-gradient(60% 60% at 50% 35%, #000 0%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(60% 60% at 50% 35%, #000 0%, transparent 75%)",
        }}
      />
      <Box position="absolute" top="-20%" left="50%" transform="translateX(-50%)" w="700px" h="500px" bg="rgba(79,123,255,0.18)" filter="blur(120px)" rounded="full" pointerEvents="none" />
      <Box position="absolute" bottom="-30%" right="-5%" w="420px" h="420px" bg="rgba(157,92,255,0.16)" filter="blur(110px)" rounded="full" pointerEvents="none" />
      <Container maxW="900px" px={{ base: 5, md: 8 }} textAlign="center" position="relative">
        <Reveal><HStack justify="center"><Eyebrow>{eyebrow}</Eyebrow></HStack></Reveal>
        <Reveal delay={0.05}>
          <Heading mt={5} as="h1" fontSize={{ base: "38px", md: "56px" }} lineHeight={1.08} letterSpacing="-0.03em">
            {title}{" "}
            {highlight && <Box as="span" className="gradient-text">{highlight}</Box>}
          </Heading>
        </Reveal>
        {subtitle && (
          <Reveal delay={0.1}>
            <Text mt={5} color="text.muted" fontSize={{ base: "md", md: "xl" }} maxW="640px" mx="auto" lineHeight={1.7}>
              {subtitle}
            </Text>
          </Reveal>
        )}
        <Reveal delay={0.15}>
          <Stack direction={{ base: "column", sm: "row" }} spacing={4} justify="center" mt={8}>
            <Button variant="gradient" size="lg" rightIcon={<FiArrowRight />} onClick={() => navigate(primaryTo)}>
              {primaryLabel}
            </Button>
            {secondaryLabel && (
              <Button variant="outlineGlow" size="lg" onClick={() => navigate(secondaryTo)}>
                {secondaryLabel}
              </Button>
            )}
          </Stack>
        </Reveal>
      </Container>
    </Box>
  );
};

const AboutUsHero = () => (
  <PageHero
    eyebrow="About Futurise"
    title="We turn bold ideas into"
    highlight="products that scale."
    subtitle="Futurise is a full-cycle digital product studio. Our expert team specializes in web and mobile development, product design, blockchain, and smart contracts — delivering high-quality results for clients worldwide."
    primaryLabel="Work with us"
    secondaryLabel="See our work"
    secondaryTo="/portfolio"
  />
);

export { PageHero };
export default AboutUsHero;
