import { extendTheme } from "@chakra-ui/react";

/**
 * Futurise design system — "Deep navy + gradient".
 * Dark navy canvas, blue→violet brand gradient, glass surfaces.
 * Reusable tokens keep every page visually consistent.
 */

export const GRADIENT = "linear-gradient(135deg, #4F7BFF 0%, #9D5CFF 100%)";
export const GRADIENT_SOFT =
  "linear-gradient(135deg, rgba(79,123,255,0.18) 0%, rgba(157,92,255,0.18) 100%)";

const colors = {
  brand: {
    50: "#eef3ff",
    100: "#dbe6ff",
    200: "#b8cdff",
    300: "#8aabff",
    400: "#6f93ff",
    500: "#4f7bff",
    600: "#3a5fe6",
    700: "#2f4cbf",
    800: "#283f99",
    900: "#1f2e6b",
  },
  violet: {
    300: "#c4a3ff",
    400: "#b07dff",
    500: "#9d5cff",
    600: "#8438f0",
  },
  navy: {
    900: "#060a18",
    800: "#0a1124",
    700: "#0e1730",
    600: "#13203f",
    500: "#1b2c50",
  },
  // Default brand color scheme for Chakra components (e.g. colorScheme="brand")
};

const fonts = {
  heading: `'Space Grotesk', 'Inter', -apple-system, system-ui, sans-serif`,
  body: `'Inter', -apple-system, system-ui, sans-serif`,
};

const semanticTokens = {
  colors: {
    "bg.canvas": "#070b18",
    "bg.surface": "rgba(255,255,255,0.035)",
    "bg.surfaceHover": "rgba(255,255,255,0.06)",
    "border.subtle": "rgba(255,255,255,0.08)",
    "border.strong": "rgba(255,255,255,0.16)",
    "text.primary": "#f5f7ff",
    "text.muted": "#aab4d4",
    "text.faint": "#7a85a8",
    "accent.solid": "#6f93ff",
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
        "radial-gradient(60% 50% at 15% -5%, rgba(79,123,255,0.16) 0%, rgba(7,11,24,0) 60%), radial-gradient(55% 45% at 95% 0%, rgba(157,92,255,0.14) 0%, rgba(7,11,24,0) 55%)",
      backgroundAttachment: "fixed",
      backgroundRepeat: "no-repeat",
      overflowX: "hidden",
    },
    "::selection": { background: "rgba(111,147,255,0.35)" },
    "*::-webkit-scrollbar": { width: "10px", height: "10px" },
    "*::-webkit-scrollbar-track": { background: "#0a1124" },
    "*::-webkit-scrollbar-thumb": {
      background: "linear-gradient(180deg,#4f7bff,#9d5cff)",
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
        boxShadow: "0 10px 30px -10px rgba(79,123,255,0.6)",
        transition: "all .25s ease",
        _hover: {
          transform: "translateY(-2px)",
          boxShadow: "0 16px 40px -12px rgba(157,92,255,0.7)",
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
          bg: "rgba(111,147,255,0.08)",
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
