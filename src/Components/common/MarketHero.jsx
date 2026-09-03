import { Box, Container } from "@chakra-ui/react";
import { motion, useReducedMotion } from "framer-motion";
import AmbientCanvas from "./AmbientCanvas";

const MotionBox = motion(Box);

/**
 * Market-page hero shell.
 *
 * All five country pages opened with the same grid + aurora treatment, so the only
 * thing distinguishing New Zealand from the UAE above the fold was the wording. Each
 * market now gets its own abstract atmosphere plate — deliberately non-literal: no
 * flags, no landmarks, no maps, which would be both cliché and, for a market page,
 * a claim about presence we are not making.
 *
 * The plate sits *under* the existing AmbientCanvas so the grid and grain still read
 * on top of it and the market pages stay part of the same system as home.
 *
 * Children are the existing hero copy, untouched.
 */
const MarketHero = ({ image, tone, focal = "center", children }) => {
  const reduce = useReducedMotion();

  return (
    <Box
      position="relative"
      overflow="hidden"
      isolation="isolate"
      pt={{ base: 12, md: 20 }}
      pb={{ base: 10, md: 16 }}
      // Gives the plate room to read as a composition. Without a floor the hero is only
      // as tall as its copy, and the atmosphere is compressed into a sliver.
      minH={{ base: "auto", lg: "560px" }}
      display="flex"
      alignItems="center"
    >
      {/* market plate */}
      <MotionBox
        position="absolute"
        inset={0}
        zIndex={0}
        initial={reduce ? false : { scale: 1.07, opacity: 0 }}
        animate={reduce ? { opacity: 1 } : { scale: 1, opacity: 1 }}
        transition={{ duration: 1.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <Box
          as="img"
          src={image}
          alt=""
          aria-hidden="true"
          loading="eager"
          fetchpriority="high"
          decoding="async"
          w="full"
          h="full"
          objectFit="cover"
          objectPosition={focal}
          filter={tone}
          display="block"
        />
      </MotionBox>

      {/* Scrim. These pages are long-form and text-first, so the plate is pushed
          well back — it should register as atmosphere, never compete with the copy. */}
      <Box
        position="absolute"
        inset={0}
        zIndex={1}
        pointerEvents="none"
        bgGradient={{
          base: "linear(to-b, rgba(8,8,13,0.80) 0%, rgba(8,8,13,0.70) 50%, bg.canvas 100%)",
          // Dense behind the copy column, clearing sharply to the right so the plate
          // is genuinely visible rather than a rumour under a black sheet.
          lg: "linear(to-r, rgba(8,8,13,0.92) 0%, rgba(8,8,13,0.78) 34%, rgba(8,8,13,0.34) 62%, rgba(8,8,13,0.18) 100%)",
        }}
      />
      <Box
        position="absolute"
        inset={0}
        zIndex={1}
        pointerEvents="none"
        bgGradient="linear(to-b, rgba(8,8,13,0) 55%, bg.canvas 100%)"
      />

      {/* Existing shared texture, kept on top so every page still matches home. */}
      <Box position="absolute" inset={0} zIndex={2} pointerEvents="none">
        <AmbientCanvas variant="hero" aurora={false} />
      </Box>

      <Container maxW="container.site" w="full" px={{ base: 5, md: 8 }} position="relative" zIndex={3}>
        {children}
      </Container>
    </Box>
  );
};

export default MarketHero;
