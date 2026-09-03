import React, { useMemo } from "react";
import { Box } from "@chakra-ui/react";
import { useReducedMotion } from "framer-motion";
// Same landmass grid the /contact plate uses, projected onto a sphere here instead of
// a rectangle — see the module header for how it is built.
import { COLS, ROWS, LAND } from "../../utils/Constant/worldLand";

/**
 * Compact orthographic globe marking the markets that have a country page.
 *
 * Sits beside the "Markets" copy on /about, which previously ran a single column of
 * prose and pills across a 1200px container and left the right half of the section
 * empty. This is not decoration for its own sake — it says the same thing the copy
 * says, which is that the work is spread across specific places.
 *
 * Orthographic rather than the equirectangular projection WorldReachMap uses: at this
 * size a flat rectangle reads as a chart, whereas a sphere reads as a globe. The two
 * are deliberately different objects rather than one component stretched to cover both.
 *
 * Decorative and aria-hidden — every market here is already a real, focusable link in
 * the pill row beside it.
 */

const R = 100;          // sphere radius in viewBox units
const CX = 110;
const CY = 110;

// Markets with a country page, plus the two other delivered-work locations named on
// the page. Longitude/latitude only — the projection does the rest.
const POINTS = [
  { name: "New Zealand", lon: 174, lat: -41 },
  { name: "Australia", lon: 134, lat: -25 },
  { name: "United States", lon: -98, lat: 39 },
  { name: "Canada", lon: -106, lat: 56 },
  { name: "United Arab Emirates", lon: 55, lat: 25 },
  { name: "India", lon: 79, lat: 21 },
];

// Rotate the globe so the Pacific/Asia face — where most of these sit — is the one
// turned toward the viewer. Without this the visible hemisphere is the Atlantic and
// four of the six markets fall on the far side.
const LON0 = 120;
const LAT0 = -8;

const rad = (d) => (d * Math.PI) / 180;

/**
 * Orthographic projection. Returns null when the point is on the far side of the
 * sphere, so callers can skip it rather than drawing it through the globe.
 */
const project = (lon, lat) => {
  const l = rad(lon - LON0);
  const p = rad(lat);
  const p0 = rad(LAT0);
  const cosc = Math.sin(p0) * Math.sin(p) + Math.cos(p0) * Math.cos(p) * Math.cos(l);
  if (cosc < 0) return null; // back face
  return {
    x: CX + R * Math.cos(p) * Math.sin(l),
    y: CY - R * (Math.cos(p0) * Math.sin(p) - Math.sin(p0) * Math.cos(p) * Math.cos(l)),
    // Points near the limb are foreshortened; fading them keeps the sphere reading as
    // a sphere rather than as a flat disc with dots scattered on it.
    z: cosc,
  };
};

const MarketGlobe = ({ size = { base: "220px", md: "280px" } }) => {
  const reduce = useReducedMotion();

  // Graticule: meridians and parallels, sampled and clipped to the visible hemisphere.
  const graticule = useMemo(() => {
    const paths = [];
    for (let lon = -180; lon < 180; lon += 30) {
      const seg = [];
      for (let lat = -90; lat <= 90; lat += 4) {
        const p = project(lon, lat);
        seg.push(p ? `${seg.length ? "L" : "M"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}` : null);
      }
      paths.push(seg.filter(Boolean).join(" "));
    }
    for (let lat = -60; lat <= 60; lat += 30) {
      const seg = [];
      for (let lon = -180; lon <= 180; lon += 4) {
        const p = project(lon, lat);
        seg.push(p ? `${seg.length ? "L" : "M"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}` : null);
      }
      paths.push(seg.filter(Boolean).join(" "));
    }
    return paths.filter((d) => d.length > 0);
  }, []);

  // Landmass, projected onto the visible hemisphere. Back-face points are dropped by
  // `project` returning null, so nothing is drawn through the sphere.
  const land = useMemo(() => {
    const out = [];
    Object.entries(LAND).forEach(([row, spans]) => {
      const r = Number(row);
      const lat = 90 - (r + 0.5) * (180 / ROWS);
      spans.split(" ").forEach((span) => {
        const [start, len] = span.split(":").map(Number);
        for (let c = start; c < start + len; c++) {
          const lon = -180 + (c + 0.5) * (360 / COLS);
          const p = project(lon, lat);
          if (p) out.push(p);
        }
      });
    });
    return out;
  }, []);

  const pts = POINTS.map((p) => ({ ...p, ...(project(p.lon, p.lat) || {}) })).filter(
    (p) => p.x !== undefined
  );

  return (
    <Box w={size} h={size} mx="auto" position="relative">
      <Box
        as="svg"
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 220 220"
        w="full"
        h="full"
        overflow="visible"
        // Scoped to this component's own stylesheet rather than index.css: the
        // animation is meaningless outside it, and Emotion keeps the keyframe name
        // from colliding with anything else on the page.
        sx={{
          "@keyframes mg-pulse": {
            "0%": { transform: "scale(1)", opacity: 0.6 },
            "100%": { transform: "scale(3.4)", opacity: 0 },
          },
          // Reduced motion is honoured in CSS as well as in the JS branch above, so
          // the pulse stops even if the media query changes after mount.
          "@media (prefers-reduced-motion: reduce)": {
            "circle[style*='mg-pulse']": { animation: "none !important", opacity: 0 },
          },
        }}
      >
        <defs>
          <radialGradient id="mg-sphere" cx="35%" cy="28%">
            <stop offset="0%" stopColor="#221d3d" />
            <stop offset="70%" stopColor="#0e0d1a" />
            <stop offset="100%" stopColor="#08080d" />
          </radialGradient>
          <radialGradient id="mg-node">
            <stop offset="0%" stopColor="#e2d9ff" />
            <stop offset="100%" stopColor="#8b7bff" />
          </radialGradient>
        </defs>

        {/* outer halo */}
        <circle cx={CX} cy={CY} r={R + 8} fill="rgba(123,108,255,0.07)" />
        {/* sphere body, lit from the upper left so it has a light direction */}
        <circle cx={CX} cy={CY} r={R} fill="url(#mg-sphere)" />

        {/* graticule */}
        <g fill="none" stroke="rgba(180,160,255,0.13)" strokeWidth="0.6">
          {graticule.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>

        {/* landmass. Radius and opacity both track `z` (the cosine of angular distance
            from the centre of the visible face) so dots compress and dim toward the
            limb the way a real sphere's surface does. Without the falloff the disc
            reads as flat no matter how good the shading behind it is. */}
        <g fill="#c4b5ff">
          {land.map((p, i) => (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={0.5 + 1.15 * p.z}
              opacity={0.12 + 0.5 * p.z}
            />
          ))}
        </g>

        {/* terminator rim — a bright arc on the lit edge reads as atmosphere */}
        <circle
          cx={CX}
          cy={CY}
          r={R}
          fill="none"
          stroke="rgba(180,160,255,0.34)"
          strokeWidth="1"
        />

        {/* markets */}
        {pts.map((p, i) => (
          <g key={p.name} opacity={0.45 + 0.55 * p.z}>
            {/* Radar pulse as a CSS keyframe animation rather than a Framer one.
                /about is prerendered at build time, and Framer resolving a keyframe
                array on the SVG `r` attribute emits r="undefined" on that first
                static paint — SVG rejects it and logs '<circle> attribute r:
                Expected length' once per node. A scale transform about the node's
                own origin produces the identical effect, is composited rather than
                re-laid-out, and has a valid `r` in the markup from the start. */}
            {!reduce && (
              <circle
                cx={p.x}
                cy={p.y}
                r={3.5}
                fill="none"
                stroke="#b57bff"
                strokeWidth={1}
                style={{
                  transformOrigin: `${p.x}px ${p.y}px`,
                  animation: `mg-pulse 3s ${(i * 0.45).toFixed(2)}s ease-out infinite`,
                }}
              />
            )}
            <circle cx={p.x} cy={p.y} r={3.4} fill="url(#mg-node)" />
          </g>
        ))}
      </Box>
    </Box>
  );
};

export default MarketGlobe;
