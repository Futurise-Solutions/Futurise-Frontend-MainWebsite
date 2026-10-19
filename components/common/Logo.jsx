'use client'

import { Box } from "@chakra-ui/react";
import NextLink from "next/link";
import NextImage from "next/image";
import { logo } from "../../assests";

/** Actual Futurise wordmark, used in navbar + footer + loader. */
const Logo = ({ size = "md", to = "/", priority = false, ...rest }) => {
  const h = size === "nav" ? { base: "42px", md: "48px" } : size === "lg" ? { base: "34px", md: "40px" } : { base: "30px", md: "34px" };
  return (
    <Box
      // Router migration: react-router's <Link to> → next/link's <Link href>.
      // The `as={to ? Link : "div"}` shape is preserved; only the component and the
      // prop name change. Chakra forwards `href` to the rendered anchor.
      as={to ? NextLink : "div"}
      href={to || undefined}
      display="inline-flex"
      flexShrink={0}
      alignItems="center"
      transition="transform .25s ease, filter .25s ease"
      _hover={{ transform: "scale(1.04)", filter: "drop-shadow(0 4px 14px rgba(180,160,255,0.45))" }}
      {...rest}
    >
      {/* Intrinsic size of the 3x asset (see assests/index.js). Eager + high priority
          because the wordmark sits in the navbar at the very top of every page.

          ── D27: next/image with the static import passed directly ──────────────
          `logo` is the IMPORT OBJECT, not a string. next/image reads width/height from
          it, so both attributes land in the HTML automatically — no htmlWidth/htmlHeight
          by hand, which is what the original needed.

          The original set `loading="eager" fetchpriority="high"`; `priority` is
          next/image's equivalent and additionally emits a preload hint. This wordmark
          is above the fold in the navbar on every route, so it qualifies.

          Sizing: the original rendered at a responsive CSS height with `w="auto"`.
          next/image requires concrete width/height (supplied by the import) and is then
          scaled by CSS. `height: 100%` + `width: auto` on the <img> inside a Box whose
          height is the responsive token reproduces that exactly, and `maxWidth: none`
          prevents Chakra's global `img { max-width: 100% }` reset from squashing it. */}
      <Box h={h} display="inline-flex" alignItems="center">
        <NextImage
          src={logo}
          unoptimized
          alt="Futurise Solutions"
          priority={priority}
          draggable={false}
          style={{ height: "100%", width: "auto", maxWidth: "none", objectFit: "contain" }}
        />
      </Box>
    </Box>
  );
};

export default Logo;
