import { Box } from "@chakra-ui/react";

/**
 * Frosted-glass surface used for cards everywhere.
 *
 * Previously a flat 3.5%-white fill with a 1px border, which gave every card the same
 * value as the canvas and left the UI looking like unstyled boxes. Now each card is lit:
 *
 *   - a top-down gradient fill, so the surface has a light direction
 *   - an inset hairline highlight along the top edge (catches the "light")
 *   - a real drop shadow, so the card sits *above* the canvas instead of on it
 *   - a gradient edge-glow on hover via ::before, rather than a flat border colour swap
 *
 * `hover` keeps its old meaning. `tone="raised"` is available for cards that need to
 * read as the primary surface in a group.
 */
const GlassCard = ({ children, hover = true, tone = "default", ...rest }) => (
  <Box
    position="relative"
    isolation="isolate"
    border="1px solid"
    borderColor="border.subtle"
    borderRadius="20px"
    backdropFilter="blur(12px)"
    overflow="hidden"
    bgGradient={
      tone === "raised"
        ? "linear(160deg, rgba(255,255,255,0.075) 0%, rgba(255,255,255,0.028) 46%, rgba(255,255,255,0.015) 100%)"
        : "linear(160deg, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.02) 48%, rgba(255,255,255,0.012) 100%)"
    }
    boxShadow="inset 0 1px 0 rgba(255,255,255,0.09), 0 1px 2px rgba(0,0,0,0.35), 0 18px 40px -28px rgba(0,0,0,0.85)"
    transition="transform .4s cubic-bezier(0.22,1,0.36,1), box-shadow .4s cubic-bezier(0.22,1,0.36,1), border-color .3s ease"
    sx={{
      // Gradient edge-glow. Painted on a pseudo-element so it can fade independently
      // of the border and never triggers a layout pass.
      "&::before": {
        content: '""',
        position: "absolute",
        inset: 0,
        borderRadius: "inherit",
        padding: "1px",
        background:
          "linear-gradient(150deg, rgba(180,160,255,0.55), rgba(181,123,255,0.15) 40%, transparent 70%)",
        WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
        WebkitMaskComposite: "xor",
        maskComposite: "exclude",
        opacity: 0,
        transition: "opacity .35s ease",
        pointerEvents: "none",
      },
      ...(hover ? { "&:hover::before": { opacity: 1 } } : {}),
    }}
    _hover={
      hover
        ? {
            transform: "translateY(-5px)",
            borderColor: "rgba(180,160,255,0.28)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.14), 0 2px 4px rgba(0,0,0,0.3), 0 30px 60px -30px rgba(123,108,255,0.5)",
          }
        : undefined
    }
    {...rest}
  >
    {children}
  </Box>
);

export default GlassCard;
