import React, { useMemo } from "react";
import { Box, Text } from "@chakra-ui/react";
import { motion, useReducedMotion } from "framer-motion";
// Landmass grid is shared with MarketGlobe — see the module header for how it is built.
import { COLS, ROWS, LAND } from "../../utils/Constant/worldLand";

const MotionG = motion.g;

/**
 * Dark, brand-native world map for the "we serve clients worldwide" section.
 *
 * Replaces a react-leaflet OpenStreetMap embed. That embed was the single most
 * off-brand element on the site: default OSM raster tiles are a bright beige road
 * atlas, and no amount of the `grayscale(.4) brightness(.85)` filter we had on them
 * turned a road atlas into something that belonged on a near-black cinematic page.
 * Its markers were broken too — Leaflet resolves marker-icon.png relative to the CSS
 * bundle, which Vite hashes, so every pin rendered as its alt text.
 *
 * What replaces it is drawn, not fetched:
 *   - a dot-matrix landmass built from the shared run-length grid in
 *     utils/Constant/worldLand, so the geography is real but costs ~2kb of source
 *     and zero requests
 *   - the served markets as brand-coloured nodes with a slow radar pulse
 *   - great-circle arcs from Wellington (where the company is registered) to each
 *     market, drawn as quadratic curves with a travelling highlight
 *
 * Why this is better than a tile map beyond the aesthetics: no tile server round
 * trips, no Leaflet + react-leaflet in the bundle (~164kb of the Contact chunk), no
 * third-party requests from a page that handles enquiry data, and it cannot break
 * when an external tile host changes its usage policy.
 *
 * Accessibility: the SVG is decorative and hidden from assistive tech — the same
 * market names are already rendered as real text in the pill row above it, which is
 * what a screen reader should read. Motion is gated on prefers-reduced-motion: with
 * it set, the arcs and nodes render in their final state with no animation at all.
 */

// ── Markets ─────────────────────────────────────────────────────────────────
// lon/lat, projected equirectangularly onto the same grid as the landmass.
const HOME = { name: "Wellington", lon: 174.8, lat: -41.3 };
const MARKETS = [
  { name: "USA", lon: -98, lat: 39 },
  { name: "UK", lon: -3, lat: 54 },
  { name: "Denmark", lon: 10, lat: 56 },
  { name: "UAE", lon: 55, lat: 25 },
  { name: "India", lon: 79, lat: 21 },
  { name: "South Africa", lon: 23, lat: -30 },
  { name: "Australia", lon: 134, lat: -25 },
];

const VB_W = 1000;
const VB_H = 450;

const project = (lon, lat) => ({
  x: ((lon + 180) / 360) * VB_W,
  y: ((90 - lat) / 180) * VB_H,
});

// Quadratic arc that always bows away from the equator, so routes read as
// great circles rather than as straight chords across the plate.
const arcPath = (a, b) => {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dist = Math.hypot(b.x - a.x, b.y - a.y);
  const lift = Math.min(dist * 0.24, 90);
  return `M ${a.x} ${a.y} Q ${mx} ${my - lift} ${b.x} ${b.y}`;
};

const WorldReachMap = ({ height = { base: "260px", md: "380px", lg: "440px" } }) => {
  const reduce = useReducedMotion();

  const dots = useMemo(() => {
    const out = [];
    const cw = VB_W / COLS;
    const ch = VB_H / ROWS;
    Object.entries(LAND).forEach(([row, spans]) => {
      const r = Number(row);
      spans.split(" ").forEach((span) => {
        const [start, len] = span.split(":").map(Number);
        for (let c = start; c < start + len; c++) {
          out.push({
            x: c * cw + cw / 2,
            y: r * ch + ch / 2,
            // Latitude-based falloff keeps the high latitudes quiet and the
            // populated middle latitudes brighter, which is what stops an even
            // dot field from reading as wallpaper. Centred on row 22 (~17°N)
            // rather than the grid midpoint, because the omitted Antarctic rows
            // make the retained grid asymmetric about the equator.
            o: 0.2 + 0.26 * (1 - Math.min(Math.abs(r - 22) / 20, 1)),
          });
        }
      });
    });
    return out;
  }, []);

  const home = project(HOME.lon, HOME.lat);
  const nodes = MARKETS.map((m) => ({ ...m, ...project(m.lon, m.lat) }));

  return (
    <Box
      position="relative"
      w="full"
      h={height}
      borderRadius="20px"
      overflow="hidden"
      border="1px solid"
      borderColor="border.subtle"
      bg="linear-gradient(160deg, rgba(19,17,34,0.9) 0%, rgba(8,8,13,1) 62%)"
    >
      {/* Soft brand glow behind the populated hemisphere, so the plate has a light
          direction instead of sitting flat like a diagram. */}
      <Box
        position="absolute"
        top="-30%"
        left="38%"
        w="55%"
        h="130%"
        bg="radial-gradient(ellipse at center, rgba(123,108,255,0.20) 0%, rgba(123,108,255,0.05) 45%, transparent 72%)"
        filter="blur(30px)"
        pointerEvents="none"
      />

      <Box
        as="svg"
        aria-hidden="true"
        focusable="false"
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        // `meet` rather than `slice`: the plate is much taller relative to its width on
        // mobile, and slicing cropped away the right edge — which is exactly where
        // Wellington and the point every arc converges on sit. Letterboxing instead
        // keeps the whole world and all seven routes visible at 320px. The gradient
        // background fills the spare height, so there is no visible letterbox.
        preserveAspectRatio="xMidYMid meet"
        position="absolute"
        inset={0}
        w="full"
        h="full"
        // Scoped keyframes — see the note on the pulse circle below for why this is
        // CSS rather than a Framer animation.
        sx={{
          "@keyframes wrm-pulse": {
            "0%": { transform: "scale(1)", opacity: 0.55 },
            "100%": { transform: "scale(3.2)", opacity: 0 },
          },
          "@media (prefers-reduced-motion: reduce)": {
            "circle[style*='wrm-pulse']": { animation: "none !important", opacity: 0 },
          },
        }}
      >
        <defs>
          <linearGradient id="wrm-arc" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#7b6cff" stopOpacity="0" />
            <stop offset="50%" stopColor="#b57bff" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#7b6cff" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="wrm-node">
            <stop offset="0%" stopColor="#d8ccff" />
            <stop offset="100%" stopColor="#7b6cff" />
          </radialGradient>
        </defs>

        {/* landmass */}
        <g fill="#b4a0ff">
          {dots.map((d, i) => (
            <circle key={i} cx={d.x} cy={d.y} r={1.7} opacity={d.o} />
          ))}
        </g>

        {/* routes */}
        <g fill="none" strokeLinecap="round">
          {nodes.map((n, i) => {
            const d = arcPath(home, n);
            return (
              <g key={n.name}>
                <path d={d} stroke="rgba(180,160,255,0.16)" strokeWidth={1} />
                {!reduce && (
                  <motion.path
                    d={d}
                    stroke="url(#wrm-arc)"
                    strokeWidth={1.6}
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      duration: 1.6,
                      delay: 0.25 + i * 0.14,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  />
                )}
              </g>
            );
          })}
        </g>

        {/* market nodes */}
        {nodes.map((n, i) => (
          <MotionG
            key={n.name}
            initial={reduce ? false : { opacity: 0, scale: 0.4 }}
            whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.7 + i * 0.14, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: `${n.x}px ${n.y}px` }}
          >
            {/* CSS pulse for the same reason as in MarketGlobe: /contact is
                prerendered, and a Framer keyframe array on the SVG `r` attribute
                renders r="undefined" on that first static paint. A composited
                scale transform gives the identical result with valid markup. */}
            {!reduce && (
              <circle
                cx={n.x}
                cy={n.y}
                r={5}
                fill="none"
                stroke="#b57bff"
                strokeWidth={1.2}
                style={{
                  transformOrigin: `${n.x}px ${n.y}px`,
                  animation: `wrm-pulse 2.8s ${(i * 0.38).toFixed(2)}s ease-out infinite`,
                }}
              />
            )}
            <circle cx={n.x} cy={n.y} r={4} fill="url(#wrm-node)" />
          </MotionG>
        ))}

        {/* origin — larger and always lit, so the arcs read as radiating from one place */}
        <g>
          <circle cx={home.x} cy={home.y} r={9} fill="rgba(181,123,255,0.18)" />
          <circle cx={home.x} cy={home.y} r={4.5} fill="#d8ccff" />
        </g>
      </Box>

      {/* Vignette: pulls the corners down so the plate has edges rather than
          stopping abruptly at the border radius. */}
      <Box
        position="absolute"
        inset={0}
        pointerEvents="none"
        bg="radial-gradient(ellipse 80% 75% at 50% 50%, transparent 40%, rgba(8,8,13,0.75) 100%)"
      />

      {/* Caption. The long form wraps to two lines below ~360px and starts crowding the
          plate, so the narrowest breakpoint gets the short form rather than a smaller
          type size — shrinking 11px uppercase any further makes it unreadable. */}
      <Text
        position="absolute"
        bottom={{ base: 3, md: 4 }}
        left={{ base: 4, md: 5 }}
        right={{ base: 4, md: 5 }}
        fontSize={{ base: "10px", md: "11px" }}
        letterSpacing="0.16em"
        textTransform="uppercase"
        color="text.faint"
        pointerEvents="none"
      >
        <Box as="span" display={{ base: "none", sm: "inline" }}>
          Wellington, NZ · delivering worldwide
        </Box>
        <Box as="span" display={{ base: "inline", sm: "none" }}>
          Wellington, NZ
        </Box>
      </Text>
    </Box>
  );
};

export default WorldReachMap;
