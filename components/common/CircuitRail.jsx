'use client'

import { Box } from "@chakra-ui/react";
import { useReducedMotion } from "framer-motion";

/**
 * A connector rail that runs behind a row of cards.
 *
 * The card grids on this site are correct but inert: six or seven boxes, evenly spaced,
 * with nothing indicating they belong to one another. This draws the relationship — a
 * horizontal spine with a junction under each card and a pulse travelling it, so the row
 * reads as one system rather than a list.
 *
 * Deliberately *behind* the cards and low-contrast. It is punctuation, not a diagram: if
 * it draws the eye before the copy does, it is too strong.
 *
 * `stops` is how many junctions to draw — pass the number of cards in the row. `variant`
 * switches between the straight rail used under a grid and the stepped rail used for the
 * process timeline, where the eye should read direction rather than symmetry.
 *
 * Pure SVG + CSS keyframes, no JS. Fully hidden under `prefers-reduced-motion`'s motion
 * rules — the rail still draws, it simply stops travelling.
 */

const CircuitRail = ({ stops = 3, variant = "straight", height = 60, ...rest }) => {
  const reduce = useReducedMotion();

  const W = 1200;
  const H = height;
  const midY = H / 2;

  // Junction x-positions, evenly distributed with a half-cell inset so the first and
  // last sit under a card rather than at the very edge of the frame.
  const cell = W / stops;
  const xs = Array.from({ length: stops }, (_, i) => cell * i + cell / 2);

  // The stepped variant lifts alternate junctions, which is what gives the process row
  // a sense of travel rather than a flat line.
  const yAt = (i) => (variant === "stepped" ? (i % 2 === 0 ? midY - 9 : midY + 9) : midY);

  const d = xs
    .map((x, i) => {
      const y = yAt(i);
      if (i === 0) return `M ${0} ${y} L ${x} ${y}`;
      const px = xs[i - 1];
      const py = yAt(i - 1);
      // Rounded elbow between steps so the rail never has a hard corner.
      return variant === "stepped"
        ? `L ${px + (x - px) * 0.42} ${py} Q ${px + (x - px) * 0.5} ${py} ${px + (x - px) * 0.58} ${y} L ${x} ${y}`
        : `L ${x} ${y}`;
    })
    .join(" ")
    .concat(` L ${W} ${yAt(stops - 1)}`);

  return (
    <Box
      aria-hidden="true"
      position="absolute"
      left={0}
      right={0}
      pointerEvents="none"
      zIndex={0}
      h={`${H}px`}
      sx={{
        "@keyframes crFlow": { to: { strokeDashoffset: -560 } },
        "@keyframes crDraw": { to: { strokeDashoffset: 0 } },
        "@keyframes crNode": {
          "0%,100%": { opacity: 0.25, transform: "scale(1)" },
          "50%": { opacity: 0.7, transform: "scale(1.6)" },
        },
        ".cr-halo": { transformOrigin: "center", transformBox: "fill-box" },
      }}
      {...rest}
    >
      <Box
        as="svg"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        w="full"
        h="full"
        display="block"
      >
        <defs>
          <linearGradient id={`crBase-${variant}-${stops}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#7b6cff" stopOpacity="0" />
            <stop offset="18%" stopColor="#8b7bff" stopOpacity="0.32" />
            <stop offset="82%" stopColor="#b57bff" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#7b6cff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={`crPulse-${variant}-${stops}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#cbbcff" stopOpacity="0" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#b57bff" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Structural rail */}
        <path
          d={d}
          fill="none"
          stroke={`url(#crBase-${variant}-${stops})`}
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeDasharray="1400"
          strokeDashoffset={reduce ? 0 : 1400}
          style={reduce ? undefined : { animation: "crDraw 2s cubic-bezier(0.22,1,0.36,1) 0.2s forwards" }}
          vectorEffect="non-scaling-stroke"
        />

        {/* Travelling pulse */}
        {!reduce && (
          <path
            d={d}
            fill="none"
            stroke={`url(#crPulse-${variant}-${stops})`}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeDasharray="34 526"
            style={{ animation: "crFlow 9s linear 1.4s infinite" }}
            vectorEffect="non-scaling-stroke"
          />
        )}

        {/* Junctions */}
        {xs.map((x, i) => (
          <g key={x}>
            {!reduce && (
              <circle
                className="cr-halo"
                cx={x}
                cy={yAt(i)}
                r="4"
                fill="rgba(180,160,255,0.45)"
                style={{ animation: `crNode ${4.6 + i * 0.5}s ease-in-out ${i * 0.42}s infinite` }}
              />
            )}
            <circle cx={x} cy={yAt(i)} r="3" fill="rgba(203,188,255,0.75)" />
          </g>
        ))}
      </Box>
    </Box>
  );
};

export default CircuitRail;
