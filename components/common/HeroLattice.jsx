'use client'

import { useMemo } from "react";
import { Box } from "@chakra-ui/react";
import { useReducedMotion } from "framer-motion";

/**
 * Hero visual system — the animated SVG layer over the atmosphere plate.
 *
 * `SystemDiagram` (the "Expert Engineering Team" visual) is a single readable diagram:
 * one request crossing one system. This is the same design language scaled up to hero
 * weight — not a bigger diagram, but a *system with depth*. Three parallel planes of
 * lattice recede into the frame, each drawn smaller, fainter and slower than the one in
 * front, so the hero reads as looking *into* an architecture rather than at a drawing of
 * one. On top of that:
 *
 *   - packets travel the connections on staggered offsets, so traffic is always in
 *     flight somewhere but never in a visible pattern
 *   - a light sweep crosses the whole lattice on a long cycle, briefly lifting whatever
 *     it passes over — this is what makes it feel lit rather than drawn
 *   - nodes breathe on prime-ish periods (5.1s / 6.3s / 7.7s) that never resynchronise
 *
 * WHY SVG + CSS AND NOT CANVAS/WEBGL
 * Everything here is declarative: no rAF, no JS running per frame, nothing measuring
 * layout. The browser composites `transform`, `opacity` and `stroke-dashoffset` off the
 * main thread, so the whole layer costs approximately nothing after first paint and
 * cannot interfere with the hero's LCP. A canvas version would need a render loop, a
 * DPR-aware resize path and its own teardown, for a result no visitor could distinguish.
 *
 * LCP CONTRACT
 * This layer sits *above* the plate (z-index 1) but is not itself a candidate LCP
 * element: it is `<svg>`, not a replaced image, and it never covers the plate opaquely.
 * It fades in over 1.2s starting at 0.5s, deliberately after the plate has painted, so
 * it can never delay or displace the LCP candidate. Same contract as HeroParallax.jsx —
 * read that note before changing either.
 *
 * RESPONSIVE
 * One 1200x680 viewBox with `preserveAspectRatio="xMidYMid slice"`, so the lattice
 * crops rather than squashes — geometry never distorts. On narrow screens the whole
 * layer is dialled down (see `opacity` below) because the mobile scrim is darker and the
 * copy is centred over the middle of the frame, exactly where the lattice is densest.
 */

const VB_W = 1200;
const VB_H = 680;

// Three depth planes. `s` scales the plane about the focal point, `o` is its base
// opacity, `d` is the parallax drift distance. Front plane is largest/brightest/fastest —
// the ordering is what produces the depth read.
const PLANES = [
  { key: "back", s: 0.52, o: 0.42, d: 8, dur: 42 },
  { key: "mid", s: 0.76, o: 0.68, d: 14, dur: 34 },
  { key: "front", s: 1, o: 1, d: 22, dur: 27 },
];

// Lattice geometry, authored once in viewBox units and reused by every plane. The shape
// is a spine of four hubs with satellites fanning off it — deliberately asymmetric, so it
// reads as a designed system rather than a generated mesh.
// Everything lives in the right two-thirds of the frame. The headline occupies the left
// third on desktop, and a lattice running underneath type is noise, not depth — so the
// system is composed to sit beside the copy rather than behind it.
const HUBS = [
  { id: "h0", x: 620, y: 330, r: 8 },
  { id: "h1", x: 790, y: 210, r: 11 },
  { id: "h2", x: 900, y: 430, r: 11 },
  { id: "h3", x: 1075, y: 300, r: 8 },
];

const SATS = [
  { id: "s0", x: 700, y: 120, r: 4, from: "h1" },
  { id: "s1", x: 545, y: 470, r: 4, from: "h0" },
  { id: "s2", x: 760, y: 570, r: 4.5, from: "h2" },
  { id: "s3", x: 940, y: 105, r: 4.5, from: "h1" },
  { id: "s4", x: 1010, y: 175, r: 4, from: "h3" },
  { id: "s5", x: 1055, y: 545, r: 4.5, from: "h2" },
  { id: "s6", x: 1160, y: 400, r: 4, from: "h3" },
  { id: "s7", x: 520, y: 215, r: 3.5, from: "h0" },
];

const NODE_BY_ID = Object.fromEntries([...HUBS, ...SATS].map((n) => [n.id, n]));

// Spine links carry the packets; satellite links are structure only. Lift bows the path
// so no two connections are parallel — parallel lines are what make a lattice look
// machine-generated.
const SPINE = [
  ["h0", "h1", -38],
  ["h1", "h2", 46],
  ["h2", "h3", -34],
];

const curve = (a, b, lift) => {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  return lift === 0
    ? `M ${a.x} ${a.y} L ${b.x} ${b.y}`
    : `M ${a.x} ${a.y} Q ${mx} ${my + lift} ${b.x} ${b.y}`;
};

const HeroLattice = ({ zIndex = 1, ...rest }) => {
  const reduce = useReducedMotion();

  // Geometry is static; memo keeps the path strings from being rebuilt on every render
  // of the hero (which re-renders on route transitions).
  const paths = useMemo(() => {
    const spine = SPINE.map(([a, b, lift]) => curve(NODE_BY_ID[a], NODE_BY_ID[b], lift));
    const sats = SATS.map((s) => curve(NODE_BY_ID[s.from], s, 0));
    return { spine, sats };
  }, []);

  return (
    <Box
      aria-hidden="true"
      position="absolute"
      inset={0}
      zIndex={zIndex}
      pointerEvents="none"
      overflow="hidden"
      // Dialled back on small screens: the mobile scrim is heavier and the copy is
      // centred over the middle of the frame, which is where the lattice is densest.
      // Not dialled back to nothing, though — at `slice` on a tall phone viewport the
      // lattice already crops to its middle, so too low a value here erases it entirely
      // and the enhancement simply does not exist on mobile.
      opacity={{ base: 0.62, md: 0.8, lg: 1 }}
      sx={{
        // Entrance. Starts after the plate has had time to paint so this can never
        // become or delay the LCP candidate.
        animation: reduce ? undefined : "hlIn 1.2s ease-out 0.5s both",
        "@keyframes hlIn": { from: { opacity: 0 }, to: {} },

        // Plane parallax — each depth drifts a different distance on a different period,
        // which is what separates them visually.
        "@keyframes hlPlaneA": {
          "0%,100%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(-8px, 5px, 0)" },
        },
        "@keyframes hlPlaneB": {
          "0%,100%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(14px, -9px, 0)" },
        },
        "@keyframes hlPlaneC": {
          "0%,100%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(-22px, 12px, 0)" },
        },

        // Traffic. The dash pattern is one short lit segment in a long gap, so what
        // travels the path reads as a discrete packet rather than a marching dashed line.
        "@keyframes hlPacket": { to: { strokeDashoffset: -420 } },

        // Structure draw-on — the connections appear to be drawn once at mount.
        "@keyframes hlDraw": { to: { strokeDashoffset: 0 } },

        // Node breathing.
        "@keyframes hlPulse": {
          "0%,100%": { opacity: 0.28, transform: "scale(1)" },
          "50%": { opacity: 0.72, transform: "scale(1.9)" },
        },

        // The light sweep. Travels well past the frame on both sides so its entry and
        // exit are never visible.
        "@keyframes hlSweep": {
          "0%": { transform: "translateX(-38%)" },
          "100%": { transform: "translateX(138%)" },
        },

        ".hl-halo": { transformOrigin: "center", transformBox: "fill-box" },
      }}
      {...rest}
    >
      <Box
        as="svg"
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        // `slice` not `meet`: the lattice fills the hero and crops at the edges rather
        // than letterboxing, and geometry never distorts at any aspect ratio.
        //
        // The alignment changes with the breakpoint because the crop does. On a wide
        // desktop hero the viewBox is cropped top and bottom, so centring is right. On a
        // tall phone viewport it is cropped hard left and right instead, and centring
        // would throw away the whole right-hand composition — `xMaxYMid` keeps the hub
        // cluster in frame there.
        //
        // This is a plain string, not Chakra's responsive object: `preserveAspectRatio`
        // is an SVG *attribute*, not a style, so an object serialises to the literal
        // "[object Object]" and the attribute silently becomes invalid. The narrow-screen
        // reframing is done instead by translating the content group (`.hl-frame` below),
        // which is a transform and therefore something CSS can vary per breakpoint.
        preserveAspectRatio="xMidYMid slice"
        w="full"
        h="full"
        display="block"
      >
        <defs>
          {/* Connection stroke. Transparent at both ends so every line fades out
              instead of terminating on a hard cap. */}
          <linearGradient id="hlLink" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#7b6cff" stopOpacity="0" />
            <stop offset="28%" stopColor="#a89aff" stopOpacity="0.9" />
            <stop offset="72%" stopColor="#c79bff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#7b6cff" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="hlPacketGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#d9ccff" stopOpacity="0" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#b57bff" stopOpacity="0" />
          </linearGradient>

          <radialGradient id="hlHub">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#cbbcff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#7b6cff" stopOpacity="0.85" />
          </radialGradient>

          <radialGradient id="hlSat">
            <stop offset="0%" stopColor="#e6dfff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#8b7bff" stopOpacity="0.7" />
          </radialGradient>

          {/* Sweep band — a soft vertical wedge of light that crosses the lattice. */}
          <linearGradient id="hlSweepGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#b9a6ff" stopOpacity="0" />
            <stop offset="50%" stopColor="#cbbcff" stopOpacity="0.24" />
            <stop offset="100%" stopColor="#b9a6ff" stopOpacity="0" />
          </linearGradient>

          {/* Vignette mask: the lattice is strongest around the right-of-centre focal
              area and dissolves toward every edge, so it never collides with the
              headline on the left or ends abruptly at the frame. */}
          <radialGradient id="hlMaskGrad" cx="0.72" cy="0.46" r="0.56">
            <stop offset="0%" stopColor="#fff" stopOpacity="1" />
            <stop offset="60%" stopColor="#fff" stopOpacity="0.88" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </radialGradient>
          <mask id="hlMask">
            <rect width={VB_W} height={VB_H} fill="url(#hlMaskGrad)" />
          </mask>

          <filter id="hlGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3.4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <Box
          as="g"
          mask="url(#hlMask)"
          // Narrow-screen reframing. At `slice` a tall phone viewport crops the viewBox
          // hard on both sides, which would cut the hub cluster in half; pulling the
          // composition left and scaling it down brings it back into the visible band.
          // Applied here as a responsive prop rather than through a media query in the
          // wrapper's `sx`: a nested at-rule targeting a descendant selector was silently
          // dropped and never reached the stylesheet.
          sx={{ transformBox: "view-box", transformOrigin: "50% 50%" }}
          transform={{ base: "translateX(-120px) scale(0.86)", md: "none" }}
        >
          {PLANES.map((plane, pi) => (
            <g
              key={plane.key}
              opacity={plane.o}
              style={
                reduce
                  ? undefined
                  : {
                      animation: `hlPlane${["A", "B", "C"][pi]} ${plane.dur}s ease-in-out infinite`,
                    }
              }
            >
              {/* Each plane is the same lattice scaled about the focal point. Scaling
                  about 58%/46% rather than the centre keeps the planes converging on
                  the hero's optical focus instead of splaying symmetrically. */}
              <g
                transform={`translate(${VB_W * 0.78} ${VB_H * 0.46}) scale(${plane.s}) translate(${-VB_W * 0.78} ${-VB_H * 0.46})`}
              >
                {/* Satellite links — structure only, no traffic. */}
                {paths.sats.map((d, i) => (
                  <path
                    key={`sat-${i}`}
                    d={d}
                    fill="none"
                    stroke="rgba(190,172,255,0.42)"
                    strokeWidth={1.5 / plane.s}
                    strokeDasharray="300"
                    strokeDashoffset={reduce ? 0 : 300}
                    style={
                      reduce
                        ? undefined
                        : { animation: `hlDraw 1.5s ease-out ${0.75 + i * 0.09 + pi * 0.16}s forwards` }
                    }
                  />
                ))}

                {/* Spine: a static structural stroke, plus a packet travelling it. */}
                {paths.spine.map((d, i) => (
                  <g key={`spine-${i}`}>
                    <path
                      d={d}
                      fill="none"
                      stroke="url(#hlLink)"
                      strokeWidth={2.8 / plane.s}
                      strokeLinecap="round"
                      strokeDasharray="900"
                      strokeDashoffset={reduce ? 0 : 900}
                      style={
                        reduce
                          ? undefined
                          : { animation: `hlDraw 1.9s cubic-bezier(0.22,1,0.36,1) ${0.6 + i * 0.16 + pi * 0.2}s forwards` }
                      }
                    />
                    {!reduce && (
                      <path
                        d={d}
                        fill="none"
                        stroke="url(#hlPacketGrad)"
                        strokeWidth={2.6 / plane.s}
                        strokeLinecap="round"
                        // One lit segment in a long gap = a discrete packet.
                        strokeDasharray="26 394"
                        filter={pi === 2 ? "url(#hlGlow)" : undefined}
                        style={{
                          animation: `hlPacket ${5.5 + i * 1.4 + pi * 2.2}s linear ${i * 0.9 + pi * 1.3}s infinite`,
                        }}
                      />
                    )}
                  </g>
                ))}

                {/* Satellites */}
                {SATS.map((n, i) => (
                  <g key={n.id}>
                    {!reduce && (
                      <circle
                        className="hl-halo"
                        cx={n.x}
                        cy={n.y}
                        r={n.r}
                        fill="rgba(180,160,255,0.5)"
                        style={{ animation: `hlPulse ${5.1 + i * 0.42}s ease-in-out ${i * 0.5}s infinite` }}
                      />
                    )}
                    <circle cx={n.x} cy={n.y} r={n.r} fill="url(#hlSat)" />
                  </g>
                ))}

                {/* Hubs — larger, haloed, and on the front plane only, glowing. */}
                {HUBS.map((n, i) => (
                  <g key={n.id}>
                    {!reduce && (
                      <circle
                        className="hl-halo"
                        cx={n.x}
                        cy={n.y}
                        r={n.r}
                        fill="rgba(155,140,255,0.55)"
                        style={{ animation: `hlPulse ${6.3 + i * 0.55}s ease-in-out ${i * 0.7}s infinite` }}
                      />
                    )}
                    <circle
                      cx={n.x}
                      cy={n.y}
                      r={n.r}
                      fill="url(#hlHub)"
                      filter={pi === 2 ? "url(#hlGlow)" : undefined}
                    />
                    {/* Containment ring — the detail that makes a hub read as a boundary
                        rather than a dot. Front plane only; on the rear planes it would
                        be sub-pixel and just add noise. */}
                    {pi === 2 && (
                      <circle
                        cx={n.x}
                        cy={n.y}
                        r={n.r + 7}
                        fill="none"
                        stroke="rgba(200,185,255,0.3)"
                        strokeWidth="1"
                        strokeDasharray="3 6"
                        className="hl-halo"
                        style={
                          reduce
                            ? undefined
                            : { animation: `hlPulse ${7.7 + i * 0.6}s ease-in-out ${i * 0.9}s infinite` }
                        }
                      />
                    )}
                  </g>
                ))}
              </g>
            </g>
          ))}

          {/* Light sweep, above the planes so it lifts all three at once. */}
          {!reduce && (
            <g style={{ animation: "hlSweep 13s ease-in-out infinite" }}>
              <rect x={-VB_W * 0.2} y="0" width={VB_W * 0.34} height={VB_H} fill="url(#hlSweepGrad)" />
            </g>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default HeroLattice;
