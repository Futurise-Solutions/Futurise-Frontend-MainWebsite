'use client'

import { motion, useReducedMotion } from "framer-motion";
import { Box } from "@chakra-ui/react";
import { usePathname } from "next/navigation";

const MotionBox = motion.create(Box);

/**
 * Smooth page-entrance transition. Re-keys on route change so each page
 * fades/eases in on navigation. Respects prefers-reduced-motion.
 *
 * ── PORTED FROM src/Components/common/PageTransition.jsx ────────────────────
 * The ONLY change is the source of `pathname`: react-router's `useLocation()` becomes
 * Next's `usePathname()`. Every motion value is byte-identical to the original —
 *
 *     initial     { opacity: 0, y: 14 }      (or false under reduced motion)
 *     animate     { opacity: 1, y: 0 }
 *     transition  duration 0.5, ease [0.22, 1, 0.36, 1]
 *
 * — because the whole point of restoring this is to reproduce the old feel exactly.
 * Do not "tune" the duration or the easing curve.
 *
 * 🔴 IT WAS DELETED DURING THE REPO RESTRUCTURE. The file survived the port but nothing
 * imported it: app/layout.tsx named it only inside a comment describing the old App.jsx
 * shell, so a reference search found one hit, in a comment, and it was treated as dead.
 * The visible consequence was that every navigation SNAPPED instead of fading — the
 * single largest contributor to the site feeling less fluid than the Vite app.
 *
 * ── WHY `key` IS LOAD-BEARING ───────────────────────────────────────────────
 * Re-keying on pathname forces React to unmount and remount the subtree, which is what
 * re-fires `initial`. Without the key the element persists across navigations and the
 * entrance animation runs exactly once, on first load. It looks like it works until you
 * click a second link.
 *
 * ── WHY searchParams IS NOT IN THE KEY ──────────────────────────────────────
 * `useSearchParams()` opts the whole subtree into client-side bailout and would force
 * every page that renders through here to become dynamic. A query-only change (the blog
 * category filter) is also not a navigation the user experiences as a new page, so
 * re-running the fade there would be wrong anyway. ScrollToTop handles `search`
 * separately, where it genuinely matters.
 */
const PageTransition = ({ children }) => {
  const pathname = usePathname();
  const reduce = useReducedMotion();

  return (
    <MotionBox
      key={pathname}
      initial={reduce ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionBox>
  );
};

export default PageTransition;
