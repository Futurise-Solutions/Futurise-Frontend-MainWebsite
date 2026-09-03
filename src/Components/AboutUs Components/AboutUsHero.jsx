import React from "react";
import { Box, Container, Heading, Text, Button, Stack, HStack } from "@chakra-ui/react";
import { motion, useReducedMotion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { Reveal, Eyebrow } from "../common";
import { aboutLayers } from "../../assests";

const MotionBox = motion(Box);

/**
 * `backdrop` is optional and off by default, because this hero is shared with the
 * portfolio page, whose own hero already carries a marquee of project thumbnails and
 * would be fighting itself with a plate behind it too. Passing an image swaps the
 * dot-grid/orb treatment for a full-bleed cinematic plate with a scrim over it.
 */
const PageHero = ({
  eyebrow = "About us",
  title,
  highlight,
  subtitle,
  primaryLabel = "Start a project",
  primaryTo = "/contact",
  secondaryLabel,
  secondaryTo,
  media,
  backdrop,
  backdropFocal = "center",
}) => {
  const navigate = useNavigate();
  const reduce = useReducedMotion();
  return (
    <Box
      position="relative"
      overflow="hidden"
      isolation="isolate"
      // With a plate behind it the hero needs enough height for the image to read as a
      // photograph rather than a strip. Without one the original padding is unchanged,
      // so the portfolio hero is byte-for-byte what it was.
      pt={backdrop ? { base: 20, md: 28 } : { base: 14, md: 20 }}
      pb={backdrop ? { base: 16, md: 24 } : { base: 12, md: 16 }}
      display={backdrop ? "flex" : undefined}
      alignItems={backdrop ? "center" : undefined}
      minH={backdrop ? { base: "auto", md: "560px", lg: "620px" } : undefined}
    >
      {backdrop && (
        <>
          {/* Plate. Scale-only entrance, never opacity: on a hero this is a candidate
              LCP element, and a fading element is not awarded LCP until the tween
              settles. Same rule as the home hero — see HeroSection.jsx. */}
          <MotionBox
            position="absolute"
            inset={0}
            zIndex={0}
            initial={reduce ? false : { scale: 1.07 }}
            animate={reduce ? undefined : { scale: 1 }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Box
              as="img"
              src={backdrop}
              alt=""
              aria-hidden="true"
              loading="eager"
              fetchpriority="high"
              decoding="async"
              w="full"
              h="full"
              objectFit="cover"
              objectPosition={backdropFocal}
              display="block"
            />
          </MotionBox>
          {/* Readability scrim. Two layers rather than one heavy fill: a radial that
              is dense directly behind the centred copy and clears toward the edges,
              plus a bottom dissolve into the canvas. A single flat gradient dark
              enough for centred text washed the plate out completely — the image was
              only legible in the top corner, which is worse than having no image. */}
          <Box
            position="absolute"
            inset={0}
            zIndex={1}
            pointerEvents="none"
            bg="radial-gradient(ellipse 72% 66% at 50% 46%, rgba(8,8,13,0.88) 0%, rgba(8,8,13,0.66) 48%, rgba(8,8,13,0.28) 100%)"
          />
          <Box
            position="absolute"
            inset={0}
            zIndex={1}
            pointerEvents="none"
            bgGradient="linear(to-b, bg.canvas 0%, rgba(8,8,13,0) 26%, rgba(8,8,13,0) 62%, bg.canvas 100%)"
          />
        </>
      )}
      {/* Dot grid + orbs. These are the no-backdrop treatment: with a plate behind
          the hero they would sit on top of the photograph and read as dirt on the
          lens, so they are skipped entirely rather than layered. */}
      {!backdrop && (
        <>
          {/* subtle dot-grid backdrop, faded toward the edges */}
          <Box
            position="absolute"
            inset={0}
            pointerEvents="none"
            opacity={0.5}
            backgroundImage="radial-gradient(rgba(180,160,255,0.16) 1px, transparent 1px)"
            backgroundSize="22px 22px"
            sx={{
              maskImage: "radial-gradient(60% 60% at 50% 35%, #000 0%, transparent 75%)",
              WebkitMaskImage: "radial-gradient(60% 60% at 50% 35%, #000 0%, transparent 75%)",
            }}
          />
          <Box position="absolute" top="-20%" left="50%" transform="translateX(-50%)" w="min(700px, 150vw)" h="min(500px, 110vw)" bg="rgba(123,108,255,0.18)" filter="blur(120px)" rounded="full" pointerEvents="none" />
          <Box position="absolute" bottom="-30%" right="-5%" w="min(420px, 95vw)" h="min(420px, 95vw)" bg="rgba(181,123,255,0.16)" filter="blur(110px)" rounded="full" pointerEvents="none" />
        </>
      )}
      {/* w="full" matters once the wrapper is a flex container: without it the
          Container shrink-wraps its content and the centred layout drifts left. */}
      <Container maxW="900px" w="full" px={{ base: 5, md: 8 }} textAlign="center" position="relative" zIndex={2}>
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
        {media && (
          <Reveal delay={0.2}>
            <Box mt={{ base: 12, md: 16 }}>{media}</Box>
          </Reveal>
        )}
      </Container>
    </Box>
  );
};

const AboutUsHero = () => (
  <PageHero
    eyebrow="About Futurise"
    title="We turn bold ideas into"
    highlight="products that scale."
    // Market list corrected to the delivered record. This previously read "clients in New
    // Zealand, India, the USA and worldwide", which contradicted the site's own evidence in
    // two places: clientProof carries no New Zealand client (New Zealand is where the
    // company is registered, not where a client is), and AnnouncementBar states "the UAE,
    // USA & India". The page below now argues that distinction explicitly, so the hero
    // could not keep asserting the opposite. "Worldwide" went with it — it claimed reach
    // that nothing on the site evidences.
    subtitle="Futurise is a full-cycle digital product studio. We build AI & ML systems, web and mobile apps, SaaS platforms, product design, and Web3 — with delivered work for clients in the UAE, the United States and India."
    primaryLabel="Work with us"
    secondaryLabel="See our work"
    secondaryTo="/portfolio"
    // The page opened on centred text over a flat canvas and then ran five card grids
    // in a row, so there was no focal point anywhere on it. The plate is architectural
    // rather than literal — an about page illustrated with stock "team at a whiteboard"
    // photography would be claiming something the copy below explicitly refuses to.
    backdrop={aboutLayers}
    backdropFocal="center 38%"
  />
);

export { PageHero };
export default AboutUsHero;
