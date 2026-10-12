'use client'

import { Box, Container, Heading, Text } from "@chakra-ui/react";
import { motion, useReducedMotion } from "framer-motion";
import NextImage from "next/image";

const MotionBox = motion.create(Box);

/**
 * Full-bleed atmospheric interstitial.
 *
 * The home and market pages ran text → cards → text → cards for their whole length,
 * which reads as documentation rather than an agency site. This is the punctuation
 * between those blocks: a wide cinematic plate carrying one short line of existing
 * copy, or none at all.
 *
 * Design rules it enforces so it can never fight the content:
 *   - the plate is always behind a top/bottom fade into `bg.canvas`, so it dissolves
 *     into the page instead of sitting in a hard-edged box
 *   - an overlay scrim keeps any text on it at AA contrast regardless of the image
 *   - `height` is fixed per breakpoint, so the band reserves its space and cannot
 *     shift layout when the image decodes
 *   - a slow scale drift adds life; disabled under prefers-reduced-motion
 *
 * `eyebrow`/`title` are optional. With none, it is pure breathing room.
 */
const VisualBand = ({
  src,
  alt = "",
  eyebrow,
  title,
  highlight,
  subtitle,
  height = { base: "260px", md: "380px", lg: "440px" },
  focal = "center",
  // Some plates run warmer than the lavender system (the Australian one especially).
  // A gentle hue nudge pulls them back into the palette without another generation.
  tone,
  overlay = 0.55,
  ...rest
}) => {
  const reduce = useReducedMotion();
  const hasCopy = Boolean(eyebrow || title || subtitle);

  return (
    <Box
      as="section"
      position="relative"
      w="full"
      h={height}
      overflow="hidden"
      // `isolation` keeps the scrim's blend from reaching the page behind the band.
      isolation="isolate"
      {...rest}
    >
      {/* plate */}
      <MotionBox
        position="absolute"
        inset={0}
        initial={reduce ? false : { scale: 1.08 }}
        whileInView={reduce ? undefined : { scale: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* D27: next/image with the static import passed directly.
            `src` arrives as a static import, which is a STRING under Vite but an OBJECT
            ({src,width,height,blurDataURL}) under Next — a raw <img src={object}> would
            render "[object Object]". next/image takes the object and gets the intrinsic
            size from it, so `fill` reproduces the original w="full" h="full" against the
            already-positioned parent. object-fit/position and the filter move to `style`.
            `loading="lazy"` and `decoding="async"` are next/image defaults. */}
        <NextImage
          src={src}
          alt={alt || ''}
          aria-hidden={alt ? undefined : 'true'}
          fill
          sizes="100vw"
          style={{
            objectFit: 'cover',
            objectPosition: focal,
            filter: tone,
            display: 'block',
          }}
        />
      </MotionBox>

      {/* readability scrim — heavier where copy sits */}
      <Box
        position="absolute"
        inset={0}
        pointerEvents="none"
        bg={
          hasCopy
            ? `linear-gradient(90deg, rgba(8,8,13,${overlay + 0.28}) 0%, rgba(8,8,13,${overlay}) 45%, rgba(8,8,13,${Math.max(overlay - 0.25, 0)}) 100%)`
            : `rgba(8,8,13,${Math.max(overlay - 0.28, 0)})`
        }
      />

      {/* top/bottom dissolve into the page canvas, so the band has no hard seam */}
      <Box
        position="absolute"
        inset={0}
        pointerEvents="none"
        bgGradient="linear(to-b, bg.canvas 0%, rgba(8,8,13,0) 22%, rgba(8,8,13,0) 74%, bg.canvas 100%)"
      />

      {hasCopy && (
        <Container
          maxW="container.site"
          px={{ base: 5, md: 8 }}
          h="full"
          position="relative"
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <MotionBox
            initial={reduce ? false : { opacity: 0, y: 18 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            maxW="620px"
          >
            {eyebrow && (
              <Text
                fontSize="xs"
                fontWeight={600}
                letterSpacing="0.16em"
                textTransform="uppercase"
                color="accent.solid"
                mb={3}
              >
                {eyebrow}
              </Text>
            )}
            {title && (
              <Heading
                as="h2"
                fontSize={{ base: "26px", md: "36px", lg: "42px" }}
                lineHeight={1.14}
                letterSpacing="-0.02em"
              >
                {title}{" "}
                {highlight && <Box as="span" className="gradient-text">{highlight}</Box>}
              </Heading>
            )}
            {subtitle && (
              <Text
                mt={4}
                color="text.muted"
                fontSize={{ base: "sm", md: "md" }}
                lineHeight={1.7}
                maxW="520px"
              >
                {subtitle}
              </Text>
            )}
          </MotionBox>
        </Container>
      )}
    </Box>
  );
};

export default VisualBand;
