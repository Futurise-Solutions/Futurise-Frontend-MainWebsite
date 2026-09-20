'use client'

import React from "react";
import {
  Box, Container, Heading, Text, Button, HStack, VStack, Stack,
} from "@chakra-ui/react";
import { motion, useReducedMotion } from "framer-motion";
import { useRouter } from "next/navigation";
import NextImage from "next/image";
import { useBooking } from "../../context/BookingContext";
import { FiArrowRight } from "react-icons/fi";
import {
  logoHomies, logoMarty, logoDavidTishbi, logoEstate, logoPlatinumPeak,
} from "../../assests";
import HeroParallax from "../common/HeroParallax";
import HeroLattice from "../common/HeroLattice";

const MotionBox = motion(Box);

// Real client wordmarks — the same assets used by the "Trusted by" strip. These
// replace the stock-photo avatars that previously stood in for customers.
const heroClientLogos = [
  { src: logoHomies, alt: "HOMIES" },
  { src: logoMarty, alt: "Marty QR" },
  { src: logoDavidTishbi, alt: "David Tishbi" },
  { src: logoEstate, alt: "Estate" },
  { src: logoPlatinumPeak, alt: "Platinum Peak Hotels" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] } }),
};

/**
 * Home hero.
 *
 * Previously a browser frame containing a dashboard screenshot, floated beside the
 * copy — the arrangement every SaaS template ships, which is why it read as generic
 * despite the screenshot being real client work. That mockup is gone: the hero is now
 * a single full-bleed cinematic plate with the headline set into its dark side, which
 * is what makes the page feel like a studio rather than a product tour.
 *
 * The HOMIES dashboard did not lose its job — it moved to the "Products we've shipped"
 * proof section further down, where evidence belongs and where it is read as evidence
 * rather than decoration.
 *
 * LCP: the plate is the largest element, so it loads eagerly at high priority and the
 * container reserves its height at every breakpoint — nothing here can shift.
 */
const HeroSection = () => {
  // react-router-dom → next/navigation, kept as `navigate(to)` so call sites are verbatim.
  const router = useRouter();
  const navigate = (to) => router.push(to);
  const { onOpen: openBooking } = useBooking();
  const reduce = useReducedMotion();

  return (
    <Box
      as="section"
      position="relative"
      overflow="hidden"
      isolation="isolate"
      // Fixed per-breakpoint height: the plate is absolutely positioned, so without
      // this the section would collapse and the image would have nothing to fill.
      minH={{ base: "580px", md: "620px", lg: "680px" }}
      display="flex"
      alignItems="center"
    >
      {/* Cinematic plate.

          PERFORMANCE — do not reintroduce an opacity fade on this element.
          The plate is the LCP element. It decodes at ~820ms, but a Framer Motion
          `opacity: 0 -> 1` entrance kept it visually incomplete until the tween
          settled, and the browser does not award LCP to an element that is still
          fading in: LCP landed at ~2.7s instead of ~1.0s purely because of the
          animation, with the image itself downloading in under 50ms.

          The entrance now runs as scale only (a transform, which does not gate LCP)
          plus a separate fading scrim below, so the arrival still reads exactly the
          same on screen while the image itself is opaque from its very first paint.

          HeroParallax adds the ambient drift, the counter-moving light veil and the
          damped pointer depth. It is transform-only and holds to the same contract —
          see the note at the top of that file before changing either. */}
      <HeroParallax veil>
        {/* AVIF first, WebP fallback. At matched quality (SSIM 0.958) AVIF is 26.9kB
            against WebP's 41.4kB for this plate — a 35% saving on the LCP byte. Both
            live in /public rather than the bundle so index.html can preload the exact
            URL a browser will pick; a hashed module asset cannot be named in static
            HTML. Keep these three in sync: the two files, and the <link rel="preload">
            pair in index.html. */}
        {/* ⚠️ DOCUMENTED EXCEPTION TO D27 — THIS IMAGE STAYS A LITERAL <picture>.
            Authorised by the human. Do not convert this to next/image.

            D27 ("the LCP image uses next/image with priority, non-negotiable") exists to
            fix the 71 images that ship with no width/height. THIS IMAGE IS NOT ONE OF
            THEM — it is the one image on the site that was already hand-optimised:
            explicit AVIF and WebP sources, `decoding="sync"`, and a preload on production.

            Converting it COSTS more than it gains:
              · loses the <picture> control over which format is served
              · loses the `decoding="sync"` hint
              · adds a /_next/image re-encode and an extra round-trip ON THE LCP PATH
            …for an image that needed none of what D27 provides.

            Everything below is the source verbatim. Keep these three in sync: the two
            files in /public, and the preload pair (see the original note above). */}
        <Box as="picture" display="block" w="full" h="full">
          <source srcSet="/hero-atmosphere.avif" type="image/avif" />
          <source srcSet="/hero-atmosphere.webp" type="image/webp" />
          <Box
            as="img"
            src="/hero-atmosphere.webp"
            alt=""
            aria-hidden="true"
            loading="eager"
            // React 19 requires the camelCase DOM property. The Vite source had
            // `fetchpriority` (lowercase) — valid in plain HTML, but React rejects it as
            // an invalid DOM property and DROPS it, so on the LCP element the priority
            // hint was being silently lost. Same emitted HTML, now actually applied.
            fetchPriority="high"
            // `sync` rather than `async`: this is the LCP element and is already in
            // cache from the preload, so decoding it on the critical path costs a few
            // ms and removes a frame of latency before it can be painted.
            decoding="sync"
            w="full"
            h="full"
            objectFit="cover"
            // Anchors the luminous sweep to the right on desktop, keeping the left
            // third dark for the headline; recentres on mobile where copy is centred.
            objectPosition={{ base: "68% center", lg: "center" }}
            display="block"
            // Held back so the plate reads as the *background* to the lattice rather
            // than competing with it. This is a filter on the image, not an opacity
            // animation and not a change to the file — the LCP element is still opaque
            // and still paints in one go. See the note above.
            filter="brightness(0.82) saturate(0.9)"
          />
        </Box>
      </HeroParallax>

      {/* Animated system lattice — above the plate, below the entrance scrim (so it
          arrives with the hero rather than on top of a black overlay) and below every
          readability scrim, so it can never reduce headline contrast. See
          HeroLattice.jsx for the concept and its LCP contract. */}
      <HeroLattice zIndex={0} />

      {/* Entrance scrim — carries the fade the image no longer does. It darkens the
          plate at mount and clears over the same 1.8s curve, so the perceived result
          is the previous fade-up while the LCP element stays fully opaque throughout. */}
      {!reduce && (
        <MotionBox
          position="absolute"
          inset={0}
          zIndex={1}
          pointerEvents="none"
          bg="bg.canvas"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        />
      )}

      {/* Scrim: heavy on the left where the headline sits, clearing to the right so
          the plate stays visible. Guarantees text contrast whatever the image does. */}
      <Box
        position="absolute"
        inset={0}
        zIndex={2}
        pointerEvents="none"
        bgGradient={{
          base: "linear(to-b, rgba(8,8,13,0.78) 0%, rgba(8,8,13,0.62) 55%, rgba(8,8,13,0.88) 100%)",
          lg: "linear(to-r, rgba(8,8,13,0.94) 0%, rgba(8,8,13,0.80) 38%, rgba(8,8,13,0.34) 72%, rgba(8,8,13,0.55) 100%)",
        }}
      />
      {/* Bottom dissolve into the canvas so the hero flows into the next section. */}
      <Box
        position="absolute"
        inset={0}
        zIndex={2}
        pointerEvents="none"
        bgGradient="linear(to-b, rgba(8,8,13,0) 62%, bg.canvas 100%)"
      />

      <Container
        maxW="container.site"
        px={{ base: 5, md: 8 }}
        py={{ base: 16, md: 20 }}
        position="relative"
        zIndex={3}
      >
        <VStack
          align={{ base: "center", lg: "start" }}
          spacing={6}
          textAlign={{ base: "center", lg: "left" }}
          maxW={{ lg: "700px" }}
        >
          <MotionBox custom={0} variants={fadeUp} initial="hidden" animate="show">
            <HStack
              spacing={2}
              px={3}
              py={1.5}
              borderRadius="full"
              bg="rgba(180,160,255,0.1)"
              border="1px solid"
              borderColor="rgba(180,160,255,0.25)"
              backdropFilter="blur(8px)"
            >
              <Box w="7px" h="7px" borderRadius="full" bgGradient="linear(135deg, brand.400, violet.500)" />
              <Text fontSize="xs" fontWeight={600} letterSpacing="0.14em" textTransform="uppercase" color="accent.solid">
                AI Agents · SaaS · Web · Mobile · Blockchain
              </Text>
            </HStack>
          </MotionBox>

          <MotionBox custom={1} variants={fadeUp} initial="hidden" animate="show">
            <Heading
              as="h1"
              fontSize={{ base: "42px", md: "62px", lg: "72px" }}
              lineHeight={1.03}
              letterSpacing="-0.03em"
              maxW="700px"
              textShadow="0 2px 30px rgba(8,8,13,0.55)"
            >
              AI-powered apps &{" "}
              <Box as="span" className="gradient-text">SaaS that scale.</Box>
            </Heading>
          </MotionBox>

          <MotionBox custom={2} variants={fadeUp} initial="hidden" animate="show">
            <Text
              fontSize={{ base: "md", md: "xl" }}
              color="text.muted"
              maxW="560px"
              lineHeight={1.7}
              textShadow="0 1px 16px rgba(8,8,13,0.6)"
            >
              We build AI agents, AI-integrated web apps, SaaS platforms, mobile apps, and Web3 products — end-to-end, from concept to scaled production.
            </Text>
          </MotionBox>

          <MotionBox custom={3} variants={fadeUp} initial="hidden" animate="show" w={{ base: "full", lg: "auto" }}>
            <Stack direction={{ base: "column", sm: "row" }} spacing={4} w={{ base: "full", sm: "auto" }}>
              <Button variant="gradient" size="lg" rightIcon={<FiArrowRight />} onClick={() => navigate("/contact")}>
                Start your project
              </Button>
              <Button variant="outlineGlow" size="lg" onClick={() => openBooking("home-hero")}>
                Book appointment
              </Button>
            </Stack>
          </MotionBox>

          {/* Trust strip — real client wordmarks, never stock portraits or an
              invented rating. See the note in git history for what this replaced. */}
          <MotionBox custom={4} variants={fadeUp} initial="hidden" animate="show" pt={3} w="full">
            <Text fontSize="xs" letterSpacing="0.14em" textTransform="uppercase" color="text.faint" mb={3}>
              Trusted by teams across NZ, India &amp; the USA
            </Text>
            <HStack
              spacing={{ base: 5, md: 7 }}
              flexWrap="wrap"
              justify={{ base: "center", lg: "start" }}
              rowGap={3}
            >
              {/* D27: next/image with the static import passed directly. As in
                  Partners.jsx these are wordmarks sized by HEIGHT with `w="auto"`, so
                  the static import supplies the intrinsic size and CSS reproduces the
                  original sizing. The opacity/filter hover treatment stays on the Box,
                  which is where it was — it applies to the logo either way. */}
              {heroClientLogos.map((c) => (
                <Box
                  key={c.alt}
                  h={{ base: "18px", md: "21px" }}
                  opacity={0.6}
                  filter="grayscale(1) brightness(1.8)"
                  transition="opacity .3s ease, filter .3s ease"
                  _hover={{ opacity: 0.95, filter: "grayscale(0.2) brightness(1.5)" }}
                  sx={{ "& img": { height: "100%", width: "auto" } }}
                >
                  <NextImage src={c.src} alt={c.alt} />
                </Box>
              ))}
            </HStack>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
};

export default HeroSection;
