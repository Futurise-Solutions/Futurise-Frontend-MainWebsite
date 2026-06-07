import { extendTheme } from "@chakra-ui/react";

/**
 * Futurise design system — "Near-black + lavender/violet".
 * Deep charcoal canvas, periwinkle→lavender brand gradient, glass surfaces.
 * Tuned to the premium agency reference (image.png / wednesday.is): a very dark,
 * almost-black base with soft lavender accents and purple glow.
 * Reusable tokens keep every page visually consistent.
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

const fonts = {
  heading: `'Zangezi', 'Aeonik Trial', -apple-system, system-ui, sans-serif`,
  body: `'Aeonik Trial', -apple-system, system-ui, sans-serif`,
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
        transition: "all .25s ease",
        _hover: {
          transform: "translateY(-2px)",
          boxShadow: "0 16px 40px -12px rgba(181,123,255,0.7)",
          _disabled: { transform: "none" },
        },
        _active: { transform: "translateY(0)" },
      },
      outlineGlow: {
        bg: "transparent",
        color: "text.primary",
        border: "1px solid",
        borderColor: "border.strong",
        backdropFilter: "blur(6px)",
        transition: "all .25s ease",
        _hover: {
          borderColor: "brand.400",
          bg: "rgba(180,160,255,0.08)",
          transform: "translateY(-2px)",
        },
      },
      ghostLink: {
        bg: "transparent",
        color: "text.muted",
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

const theme = extendTheme({
  config: { initialColorMode: "dark", useSystemColorMode: false },
  colors,
  fonts,
  semanticTokens,
  styles,
  components,
});

export default theme;
