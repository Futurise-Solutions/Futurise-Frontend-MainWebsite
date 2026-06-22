import { extendTheme } from "@chakra-ui/react";

/**
 * Futurise design system — dual light/dark theme.
 *
 * Brand: periwinkle (#7b6cff) → lavender (#b57bff) gradient.
 * Dark mode = the original "near-black + lavender" design (unchanged values).
 * Light mode = soft lavender-white surfaces with deep violet ink, derived from
 * the brand palette (#08080d, #0d0d16, #7b6cff, #b57bff, #b4a0ff, #f4f2ff).
 *
 * Every surface/border/text color is a SEMANTIC TOKEN with { default, _dark }
 * values, so the whole UI flips by changing color mode — components reference
 * tokens, never raw theme colors. To re-tune a theme, edit the values here only.
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
  // Near-black charcoal canvas (dark mode base)
  navy: {
    900: "#08080d",
    800: "#0d0d16",
    700: "#13131f",
    600: "#1a1a2b",
    500: "#24243a",
  },
};

const fonts = {
  heading: `'Zangezi', 'Aeonik Trial', -apple-system, system-ui, sans-serif`,
  body: `'Aeonik Trial', -apple-system, system-ui, sans-serif`,
};

// Single source of truth for every theme-aware color. default = light, _dark = dark.
const semanticTokens = {
  colors: {
    "bg.canvas": { default: "#f4f2ff", _dark: "#08080d" },
    "bg.surface": { default: "#ffffff", _dark: "rgba(255,255,255,0.035)" },
    "bg.surfaceHover": { default: "#f1eeff", _dark: "rgba(255,255,255,0.06)" },
    // Frosted glass panels (navbar, chat widget, modals, hero cards).
    "bg.glass": { default: "rgba(255,255,255,0.85)", _dark: "rgba(13,13,22,0.95)" },
    "border.subtle": { default: "rgba(123,108,255,0.14)", _dark: "rgba(255,255,255,0.08)" },
    "border.strong": { default: "rgba(123,108,255,0.28)", _dark: "rgba(255,255,255,0.16)" },
    "text.primary": { default: "#16141f", _dark: "#f4f2ff" },
    "text.muted": { default: "#56506e", _dark: "#b0a8c8" },
    "text.faint": { default: "#79738f", _dark: "#7d748f" },
    "accent.solid": { default: "#6450e6", _dark: "#b4a0ff" },
  },
};

const styles = {
  global: (props) => {
    const dark = props.colorMode === "dark";
    return {
      "html, body, #root, #app": {
        bg: "bg.canvas",
        color: "text.primary",
        scrollBehavior: "smooth",
      },
      body: {
        backgroundImage:
          "radial-gradient(60% 50% at 15% -5%, rgba(123,108,255,0.16) 0%, rgba(123,108,255,0) 60%), radial-gradient(55% 45% at 95% 0%, rgba(181,123,255,0.14) 0%, rgba(181,123,255,0) 55%)",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        overflowX: "hidden",
        // Smooth color-mode switch.
        transition: "background-color .3s ease, color .3s ease",
      },
      "::selection": { background: "rgba(123,108,255,0.35)", color: "#fff" },
      "*::-webkit-scrollbar": { width: "10px", height: "10px" },
      "*::-webkit-scrollbar-track": { background: dark ? "#0d0d16" : "#ece9ff" },
      "*::-webkit-scrollbar-thumb": {
        background: "linear-gradient(180deg,#7b6cff,#b57bff)",
        borderRadius: "8px",
      },
    };
  },
};

const components = {
  Button: {
    baseStyle: { fontWeight: 600, borderRadius: "full", letterSpacing: "0.01em" },
    variants: {
      // Brand gradient button — identical in both themes (white on gradient).
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
          bg: "rgba(123,108,255,0.1)",
          transform: "translateY(-2px) scale(1.02)",
          boxShadow: "0 12px 30px -12px rgba(123,108,255,0.55)",
        },
        _active: { transform: "translateY(0) scale(0.99)" },
      },
      ghostLink: {
        bg: "transparent",
        color: "text.muted",
        transition: "color .2s ease, background .2s ease",
        _hover: { color: "text.primary", bg: "bg.surfaceHover" },
      },
    },
    defaultProps: { variant: "gradient" },
  },
  Heading: { baseStyle: { fontWeight: 700, letterSpacing: "-0.02em", color: "text.primary" } },
  Link: {
    baseStyle: {
      color: "text.muted",
      transition: "color .2s ease",
      _hover: { color: "text.primary", textDecoration: "none" },
    },
  },
};

const theme = extendTheme({
  // Light is the new default; system preference is respected on first visit and
  // the user's toggle choice persists (Chakra stores it in localStorage).
  config: { initialColorMode: "system", useSystemColorMode: false },
  colors,
  fonts,
  semanticTokens,
  styles,
  components,
});

export default theme;
