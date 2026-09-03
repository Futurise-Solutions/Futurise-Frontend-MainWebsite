import { Box } from "@chakra-ui/react";
import { useReducedMotion } from "framer-motion";

/**
 * Architecture diagram for the "Expert Engineering Team" section.
 *
 * What it replaced: four flat gradient rectangles, each carrying two words ("AI Agents /
 * Autonomous workflows"). They restated the copy beside them in a weaker form and looked
 * like an unstyled wireframe — the section's own headline claims senior engineering, and
 * the visual next to it was the least engineered thing on the page.
 *
 * This is drawn as an actual system: a request enters at the edge, fans through a gateway
 * into three parallel services, those reach a shared data layer, and a signal returns. It
 * reads as architecture because it *is* one — the shape a reviewer recognises, not generic
 * "tech" decoration. Nothing here is a claim, so there is no invented metric to defend.
 *
 * Pure inline SVG at ~4kB of markup: no image request, no layout shift, sharp at any DPI,
 * and it inherits the brand palette directly rather than being colour-matched by hand.
 *
 * Motion is CSS only — dashed strokes flowing along the paths, plus a soft pulse on the
 * nodes. Framer Motion is deliberately not used: keyframe arrays on SVG geometry
 * attributes render as `undefined` on the prerendered first paint (this bit us on /about
 * with the globe), and CSS transforms have no such failure mode.
 */

// Layout constants. Kept explicit rather than computed so the diagram is legible as
// source — someone editing this should be able to see where a node will land.
const W = 460;
const H = 380;

const NODES = {
  ingress: { x: 52, y: 190, r: 9, label: "Request" },
  gateway: { x: 158, y: 190, r: 13, label: "Gateway" },
  svcA: { x: 288, y: 92, r: 11, label: "AI agents" },
  svcB: { x: 288, y: 190, r: 11, label: "Application" },
  svcC: { x: 288, y: 288, r: 11, label: "Pipeline" },
  store: { x: 402, y: 190, r: 14, label: "Data layer" },
};

// [from, to, curve-lift]. A lift of 0 draws a straight line; anything else bows the
// path, which is what stops the fan-out from looking like a flowchart template.
const EDGES = [
  ["ingress", "gateway", 0],
  ["gateway", "svcA", -26],
  ["gateway", "svcB", 0],
  ["gateway", "svcC", 26],
  ["svcA", "store", 26],
  ["svcB", "store", 0],
  ["svcC", "store", -26],
];

const path = (a, b, lift) => {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  return lift === 0
    ? `M ${a.x} ${a.y} L ${b.x} ${b.y}`
    : `M ${a.x} ${a.y} Q ${mx} ${my + lift} ${b.x} ${b.y}`;
};

// Fluid rather than a flat 520px cap. The diagram sits in one half of a two-column
// section, and once the page container became fluid that half grew well past 520px — the
// diagram was filling only ~35% of its column at 1920 and reading as undersized in its
// own space. This tracks the column and stops at 640px, past which the node labels start
// to look sparse against the connections.
const SystemDiagram = ({ maxW = "clamp(320px, 100%, 640px)" }) => {
  const reduce = useReducedMotion();

  return (
    <Box position="relative" maxW={maxW} mx="auto" w="full">
      {/* Depth glow behind the diagram, matching the orb treatment the section used
          before so the surrounding composition is unchanged. */}
      <Box
        position="absolute"
        inset="-14% -10%"
        bg="radial-gradient(ellipse 60% 60% at 55% 50%, rgba(123,108,255,0.22) 0%, rgba(123,108,255,0.05) 45%, transparent 72%)"
        filter="blur(30px)"
        pointerEvents="none"
      />

      <Box
        as="svg"
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        height="auto"
        position="relative"
        display="block"
        role="img"
        aria-label="Diagram of a request passing through a gateway, fanning out to AI agent, application and pipeline services, and resolving against a shared data layer."
        sx={{
          "@keyframes sdFlow": { to: { strokeDashoffset: -22 } },
          "@keyframes sdPulse": {
            "0%,100%": { opacity: 0.25, transform: "scale(1)" },
            "50%": { opacity: 0.6, transform: "scale(1.45)" },
          },
          ".sd-halo": { transformOrigin: "center", transformBox: "fill-box" },
        }}
      >
        <defs>
          <linearGradient id="sdEdge" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#7b6cff" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#b57bff" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#7b6cff" stopOpacity="0.15" />
          </linearGradient>
          <radialGradient id="sdNode">
            <stop offset="0%" stopColor="#cbbcff" />
            <stop offset="100%" stopColor="#7b6cff" />
          </radialGradient>
        </defs>

        {/* Substrate grid — the faint engineering paper the system sits on. Masked so
            it never reaches the edges of the frame. */}
        <g opacity="0.5" mask="url(#sdMask)">
          {Array.from({ length: 10 }, (_, i) => (
            <line
              key={`h${i}`}
              x1="0"
              y1={i * 42 + 14}
              x2={W}
              y2={i * 42 + 14}
              stroke="rgba(180,160,255,0.09)"
              strokeWidth="1"
            />
          ))}
          {Array.from({ length: 12 }, (_, i) => (
            <line
              key={`v${i}`}
              x1={i * 42 + 10}
              y1="0"
              x2={i * 42 + 10}
              y2={H}
              stroke="rgba(180,160,255,0.09)"
              strokeWidth="1"
            />
          ))}
        </g>
        <mask id="sdMask">
          <radialGradient id="sdMaskG">
            <stop offset="0%" stopColor="#fff" />
            <stop offset="70%" stopColor="#fff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#000" />
          </radialGradient>
          <rect width={W} height={H} fill="url(#sdMaskG)" />
        </mask>

        {/* Service boundary — the dashed envelope around the three parallel services.
            This is the detail that makes it read as architecture rather than a graph. */}
        <rect
          x="250"
          y="52"
          width="76"
          height="276"
          rx="18"
          fill="rgba(123,108,255,0.04)"
          stroke="rgba(180,160,255,0.16)"
          strokeWidth="1"
          strokeDasharray="4 5"
        />

        {/* Edges: a static base stroke for structure, plus a travelling dashed overlay
            that carries the sense of live traffic. */}
        {EDGES.map(([from, to, lift], i) => {
          const d = path(NODES[from], NODES[to], lift);
          return (
            <g key={`${from}-${to}`}>
              <path d={d} fill="none" stroke="rgba(180,160,255,0.2)" strokeWidth="1.4" />
              <path
                d={d}
                fill="none"
                stroke="url(#sdEdge)"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeDasharray="5 17"
                style={
                  reduce
                    ? undefined
                    : {
                        animation: `sdFlow ${2.6 + (i % 3) * 0.5}s linear ${i * 0.22}s infinite`,
                      }
                }
              />
            </g>
          );
        })}

        {/* Nodes */}
        {Object.entries(NODES).map(([key, n], i) => (
          <g key={key}>
            {!reduce && (
              <circle
                className="sd-halo"
                cx={n.x}
                cy={n.y}
                r={n.r}
                fill="rgba(180,160,255,0.4)"
                style={{ animation: `sdPulse ${3.4 + i * 0.3}s ease-in-out ${i * 0.4}s infinite` }}
              />
            )}
            <circle cx={n.x} cy={n.y} r={n.r} fill="url(#sdNode)" />
            <circle
              cx={n.x}
              cy={n.y}
              r={n.r}
              fill="none"
              stroke="rgba(215,205,255,0.55)"
              strokeWidth="1"
            />
            {/* Inner mark: hollow centre on the store so it reads as a different kind
                of thing from the compute nodes. */}
            {key === "store" && <circle cx={n.x} cy={n.y} r="5" fill="rgba(8,8,13,0.72)" />}
            <text
              x={n.x}
              y={n.y + n.r + 17}
              textAnchor="middle"
              fill="rgba(200,190,235,0.75)"
              fontSize="11"
              fontWeight="500"
              letterSpacing="0.04em"
            >
              {n.label}
            </text>
          </g>
        ))}
      </Box>
    </Box>
  );
};

export default SystemDiagram;
