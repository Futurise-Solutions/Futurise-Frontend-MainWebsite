import { Box } from "@chakra-ui/react";

/**
 * Site-wide atmosphere layer.
 *
 * The canvas was previously two static blur orbs on flat near-black, so every surface
 * read as one plane — the main reason the UI felt cheap despite good typography. This
 * adds three cheap, composited-only layers behind content:
 *
 *   1. a fine engineering grid that fades out with a radial mask (structure)
 *   2. a soft aurora wash (depth / light source)
 *   3. a film-grain dither (kills gradient banding on large dark fills)
 *
 * All three are pure CSS painted once — no JS, no render loop, no repaint on scroll.
 * `variant` tunes intensity so a hero can carry more atmosphere than a body section.
 */

const GRID = (size, color) =>
  `linear-gradient(to right, ${color} 1px, transparent 1px),` +
  `linear-gradient(to bottom, ${color} 1px, transparent 1px)`;

// Base64 SVG fractal noise. Inlined so it costs no network request and cannot
// flash in late; ~0.4kb. Opacity is what does the work, not the texture itself.
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='0.42'/%3E%3C/svg%3E\")";

const VARIANTS = {
  hero: { grid: 64, gridColor: "rgba(180,160,255,0.075)", mask: "78% 62%", grain: 0.05 },
  section: { grid: 72, gridColor: "rgba(180,160,255,0.045)", mask: "70% 58%", grain: 0.035 },
  subtle: { grid: 88, gridColor: "rgba(180,160,255,0.03)", mask: "62% 52%", grain: 0.03 },
};

const AmbientCanvas = ({ variant = "section", aurora = true, grid = true, ...rest }) => {
  const v = VARIANTS[variant] || VARIANTS.section;

  return (
    <Box
      aria-hidden="true"
      position="absolute"
      inset={0}
      overflow="hidden"
      pointerEvents="none"
      zIndex={0}
      {...rest}
    >
      {grid && (
        <Box
          position="absolute"
          inset="-1px"
          backgroundImage={GRID(v.grid, v.gridColor)}
          backgroundSize={`${v.grid}px ${v.grid}px`}
          sx={{
            // Radial mask keeps the grid from reaching section edges, where a hard
            // cut-off is what makes a grid look like a template background.
            maskImage: `radial-gradient(ellipse ${v.mask} at 50% 38%, #000 0%, transparent 100%)`,
            WebkitMaskImage: `radial-gradient(ellipse ${v.mask} at 50% 38%, #000 0%, transparent 100%)`,
          }}
        />
      )}

      {aurora && (
        <>
          <Box
            position="absolute"
            top="-30%"
            left="-10%"
            w="clamp(320px, 45vw, 680px)"
            h="clamp(320px, 45vw, 680px)"
            borderRadius="50%"
            bg="radial-gradient(circle, rgba(123,108,255,0.20) 0%, rgba(123,108,255,0.06) 45%, transparent 70%)"
            filter="blur(40px)"
          />
          <Box
            position="absolute"
            top="-10%"
            right="-12%"
            w="clamp(300px, 40vw, 600px)"
            h="clamp(300px, 40vw, 600px)"
            borderRadius="50%"
            bg="radial-gradient(circle, rgba(181,123,255,0.17) 0%, rgba(181,123,255,0.05) 45%, transparent 70%)"
            filter="blur(40px)"
          />
        </>
      )}

      {/* Grain sits on top of the gradients so it dithers them. `mixBlendMode: overlay`
          keeps it from lifting the black point of the canvas. */}
      <Box
        position="absolute"
        inset={0}
        backgroundImage={GRAIN}
        backgroundRepeat="repeat"
        opacity={v.grain}
        mixBlendMode="overlay"
      />
    </Box>
  );
};

export default AmbientCanvas;
