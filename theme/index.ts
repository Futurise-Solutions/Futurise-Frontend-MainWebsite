import { extendTheme } from "@chakra-ui/react";

/**
 * Futurise design system — "Near-black + lavender/violet".
 * Deep charcoal canvas, periwinkle→lavender brand gradient, glass surfaces.
 * Tuned to the premium agency reference (image.png / wednesday.is): a very dark,
 * almost-black base with soft lavender accents and purple glow.
 * Reusable tokens keep every page visually consistent.
 *
 * ── PORTED VERBATIM FROM src/theme/index.js ──────────────────────────────────
 * Every value below is copied character-for-character from the Vite app. The ONLY
 * change is `fonts`, which now points at the CSS variables next/font generates
 * (see theme/fonts.ts) instead of naming the families directly. That substitution
 * is required by Phase 2 of MIGRATION-GUIDE.md; nothing else here may drift.
 *
 * Two entries were missing from the guide's design-system section and are load-bearing
 * (see MIGRATION-INVENTORY.md §C.2):
 *   - `colors.violet.*`      — every brand gradient is linear(135deg, brand.500, violet.500)
 *   - `sizes.container.site` — the width of every section on the site
 */

export const GRADIENT = "linear-gradient(135deg, #7B6CFF 0%, #B57BFF 100%)";
export const GRADIENT_SOFT =
  "linear-gradient(135deg, rgba(123,108,255,0.18) 0%, rgba(181,123,255,0.18) 100%)";

const colors = {
  // Periwinkle → indigo brand ramp (primary accent)
  brand: {
    50: "#f1efff",
    100: "#e3dfff",
    200: "#c8bfff",
    300: "#a99cff",
    400: "#8f7dff",
    500: "#7b6cff",
    600: "#6450e6",
    700: "#503fbf",
    800: "#3f3299",
    900: "#2a2168",
  },
  // Lavender → purple secondary
  violet: {
    300: "#dcc0ff",
    400: "#c596ff",
    500: "#b57bff",
    600: "#9d4edd",
  },
  // Near-black charcoal canvas (kept under the `navy` key so existing token
  // references keep working — the values are now deep neutral-violet black).
  navy: {
    900: "#08080d",
    800: "#0d0d16",
    700: "#13131f",
    600: "#1a1a2b",
    500: "#24243a",
  },
  // Default brand color scheme for Chakra components (e.g. colorScheme="brand")
};

/**
 * The one intentional deviation from the Vite theme.
 *
 * Old value:
 *   heading: `'Zangezi', 'Aeonik Trial', -apple-system, system-ui, sans-serif`
 *   body:    `'Aeonik Trial', -apple-system, system-ui, sans-serif`
 *
 * next/font hashes the family name at build time, so the literal strings above would
 * match nothing. The CSS variables resolve to the same faces with the same fallback
 * order. Declared in theme/fonts.ts and bound to <html> in app/layout.tsx.
 *
 * ⚠️ Re-measure h1 letter-spacing after Phase 2 (STOP GATE 2). next/font applies a
 * fallback-metrics adjustment that can shift computed tracking; home h1 must still
 * compute to -2.16px at 72px (72 × -0.03em). See MIGRATION-INVENTORY.md §C.4.
 */
/* PHASE 8 (A8): the PRELOADED single-face families lead each stack, with the full
   families immediately behind them.

   The preloaded face covers the weight actually rendered above the fold — Zangezi
   Regular ('500 800') for headings, Aeonik Regular ('400 500') for body — so first
   paint resolves against a font the browser has already been told to fetch. Anything
   outside those ranges (Light, SemiLight, Bold, every italic) falls through to the full
   family on the next line, unchanged.

   Order matters and the tail is untouched: `-apple-system, system-ui, sans-serif` stays
   exactly where it was, so the U+00B7 regression recorded in fonts.ts cannot recur. */
const fonts = {
  heading: `var(--font-zangezi-display), var(--font-zangezi), var(--font-aeonik), -apple-system, system-ui, sans-serif`,
  body: `var(--font-aeonik-body), var(--font-aeonik), -apple-system, system-ui, sans-serif`,
};

const semanticTokens = {
  colors: {
    "bg.canvas": "#08080d",
    "bg.surface": "rgba(255,255,255,0.035)",
    "bg.surfaceHover": "rgba(255,255,255,0.06)",
    "border.subtle": "rgba(255,255,255,0.08)",
    "border.strong": "rgba(255,255,255,0.16)",
    "text.primary": "#f4f2ff",
    "text.muted": "#b0a8c8",
    "text.faint": "#7d748f",
    "accent.solid": "#b4a0ff",
  },
};

const styles = {
  global: {
    // `#root` no longer exists in Next (the Vite hydration root). It is kept in the
    // selector list because a non-matching selector in a list is inert, and removing it
    // would be an unrequested change to a ported value. `#app` is preserved as a real
    // wrapper div in app/layout.tsx so the legacy `#app ...` rules keep matching.
    "html, body, #root, #app": {
      bg: "bg.canvas",
      color: "text.primary",
      scrollBehavior: "smooth",
    },
    body: {
      backgroundImage:
        "radial-gradient(60% 50% at 15% -5%, rgba(123,108,255,0.16) 0%, rgba(8,8,13,0) 60%), radial-gradient(55% 45% at 95% 0%, rgba(181,123,255,0.14) 0%, rgba(8,8,13,0) 55%)",
      backgroundAttachment: "fixed",
      backgroundRepeat: "no-repeat",
      overflowX: "hidden",
    },
    "::selection": { background: "rgba(123,108,255,0.35)" },
    "*::-webkit-scrollbar": { width: "10px", height: "10px" },
    "*::-webkit-scrollbar-track": { background: "#0d0d16" },
    "*::-webkit-scrollbar-thumb": {
      background: "linear-gradient(180deg,#7b6cff,#b57bff)",
      borderRadius: "8px",
    },
  },
};

const components = {
  Button: {
    baseStyle: { fontWeight: 600, borderRadius: "full", letterSpacing: "0.01em" },
    variants: {
      gradient: {
        bgGradient: "linear(135deg, brand.500, violet.500)",
        color: "white",
        boxShadow: "0 10px 30px -10px rgba(123,108,255,0.6)",
        transition: "transform .25s cubic-bezier(0.22,1,0.36,1), box-shadow .25s ease, filter .25s ease",
        _hover: {
          transform: "translateY(-2px) scale(1.02)",
          boxShadow: "0 18px 46px -12px rgba(181,123,255,0.8)",
          filter: "brightness(1.06)",
          _disabled: { transform: "none", filter: "none" },
        },
        _active: { transform: "translateY(0) scale(0.99)" },
      },
      outlineGlow: {
        bg: "transparent",
        color: "text.primary",
        border: "1px solid",
        borderColor: "border.strong",
        backdropFilter: "blur(6px)",
        transition: "transform .25s cubic-bezier(0.22,1,0.36,1), box-shadow .25s ease, border-color .25s ease, background .25s ease",
        _hover: {
          borderColor: "brand.400",
          bg: "rgba(180,160,255,0.1)",
          transform: "translateY(-2px) scale(1.02)",
          boxShadow: "0 12px 30px -12px rgba(123,108,255,0.55)",
        },
        _active: { transform: "translateY(0) scale(0.99)" },
      },
      ghostLink: {
        bg: "transparent",
        color: "text.muted",
        transition: "color .2s ease, background .2s ease",
        _hover: { color: "text.primary", bg: "rgba(255,255,255,0.04)" },
      },
    },
    defaultProps: { variant: "gradient" },
  },
  Heading: { baseStyle: { fontWeight: 700, letterSpacing: "-0.02em" } },
  Link: {
    baseStyle: {
      color: "text.muted",
      transition: "color .2s ease",
      _hover: { color: "text.primary", textDecoration: "none" },
    },
  },
};

/**
 * Content width.
 *
 * Every section on the site was capped at a literal `maxW="1200px"`. That is correct up
 * to about a 1280px viewport and increasingly wrong above it: at 1440 the content column
 * used 83% of the window, at 1680 it was 71%, at 1920 63%, and at 2560 it occupied less
 * than half the screen with ~680px of dead margin on each side. Full-bleed elements (the
 * hero plate, the interstitial bands, the marquees) kept spanning the whole viewport, so
 * the page read as a narrow column of content trapped inside wide backgrounds — the
 * "squeezed" look.
 *
 * `clamp` fixes the cause rather than patching breakpoints: the column tracks the
 * viewport through the mid-range and stops at 1560px, which is roughly the widest a
 * 16px paragraph can run before line length hurts readability. Below ~1330px the clamp
 * resolves under 1200px, so small laptops and everything narrower are byte-for-byte
 * what they were.
 *
 *   1280 -> 1200 (unchanged)   1680 -> 1428    2560 -> 1560 (capped)
 *   1440 -> 1224               1920 -> 1560
 *
 * Sections that deliberately run narrower for readability (prose at 780px, forms at
 * 640px) pass their own maxW and are untouched by this.
 */
const sizes = {
  container: {
    site: "clamp(1200px, 85vw, 1560px)",
  },
};

const theme = extendTheme({
  config: { initialColorMode: "dark", useSystemColorMode: false },
  colors,
  fonts,
  sizes,
  semanticTokens,
  styles,
  components,
});

export default theme;
