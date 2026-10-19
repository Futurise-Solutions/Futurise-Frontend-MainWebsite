'use client'

import { Box } from "@chakra-ui/react";
import { useReducedMotion } from "framer-motion";
import useMotionVisibility from './useMotionVisibility';

/**
 * Slow-moving atmospheric backdrop for a full section.
 *
 * `AmbientCanvas` is the site-wide static texture (grid + orbs + grain) and stays as it
 * is. This is the moving counterpart, for the handful of sections that were flat black
 * behind their cards and needed a sense of light in the room rather than more texture.
 *
 * Three wide, heavily-blurred radial washes drift on long offset cycles (28s/36s/44s).
 * Because the periods share no common factor, the composition never visibly repeats —
 * the section just always looks slightly different, which is the point. A vignette keeps
 * the light off the section edges so it dissolves into the page instead of ending.
 *
 * Cost: three composited layers, no image request, no JS, no scroll or resize listener.
 * The blur is painted once and only the transform animates, so this is GPU work only and
 * does not touch the main thread after first paint. Disabled entirely under
 * prefers-reduced-motion, where it renders as a still wash.
 *
 * `intensity` scales all three washes together — `soft` for sections carrying dense text,
 * `bold` where the band is the focal point.
 */

const LEVELS = {
  soft: 0.5,
  base: 0.78,
  bold: 1,
};

const AuroraField = ({ intensity = "base", ...rest }) => {
  const reduce = useReducedMotion();
  const motionRef = useMotionVisibility();
  const k = LEVELS[intensity] ?? LEVELS.base;

  const wash = (color, alpha) =>
    `radial-gradient(circle, ${color.replace("ALPHA", (alpha * k).toFixed(3))} 0%, ${color.replace("ALPHA", (alpha * k * 0.28).toFixed(3))} 42%, transparent 70%)`;

  return (
    <Box
      ref={motionRef}
      aria-hidden="true"
      position="absolute"
      inset={0}
      overflow="hidden"
      pointerEvents="none"
      zIndex={0}
      sx={{
        '& > div': { animationPlayState: 'var(--motion-state, paused)' },
        "@keyframes afDriftA": {
          "0%,100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(6%, 4%, 0) scale(1.14)" },
        },
        "@keyframes afDriftB": {
          "0%,100%": { transform: "translate3d(0,0,0) scale(1.08)" },
          "50%": { transform: "translate3d(-7%, -3%, 0) scale(1)" },
        },
        "@keyframes afDriftC": {
          "0%,100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(4%, -6%, 0) scale(1.2)" },
        },
      }}
      {...rest}
    >
      <Box
        position="absolute"
        top="-28%"
        left="-8%"
        w="clamp(340px, 52vw, 760px)"
        h="clamp(340px, 52vw, 760px)"
        borderRadius="50%"
        bg={wash("rgba(123,108,255,ALPHA)", 0.26)}
        filter="blur(52px)"
        sx={reduce ? undefined : { animation: "afDriftA 28s ease-in-out infinite" }}
      />
      <Box
        position="absolute"
        bottom="-34%"
        right="-10%"
        w="clamp(320px, 48vw, 700px)"
        h="clamp(320px, 48vw, 700px)"
        borderRadius="50%"
        bg={wash("rgba(181,123,255,ALPHA)", 0.22)}
        filter="blur(58px)"
        sx={reduce ? undefined : { animation: "afDriftB 36s ease-in-out infinite" }}
      />
      {/* Cooler third wash, centred. Keeps the section from reading as two corner
          glows — with only two the eye finds the pattern immediately. */}
      <Box
        position="absolute"
        top="18%"
        left="38%"
        w="clamp(280px, 40vw, 560px)"
        h="clamp(280px, 40vw, 560px)"
        borderRadius="50%"
        bg={wash("rgba(96,132,255,ALPHA)", 0.16)}
        filter="blur(64px)"
        sx={reduce ? undefined : { animation: "afDriftC 44s ease-in-out infinite" }}
      />

      {/* Vignette — pulls the light away from the section's edges so the band has no
          hard boundary against the canvas above and below it. */}
      <Box
        position="absolute"
        inset={0}
        bgGradient="linear(to-b, bg.canvas 0%, rgba(8,8,13,0) 24%, rgba(8,8,13,0) 76%, bg.canvas 100%)"
      />
      <Box
        position="absolute"
        inset={0}
        bg="radial-gradient(ellipse 78% 70% at 50% 50%, transparent 40%, rgba(8,8,13,0.55) 100%)"
      />
    </Box>
  );
};

export default AuroraField;
