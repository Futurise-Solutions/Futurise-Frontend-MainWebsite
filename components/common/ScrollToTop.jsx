'use client'

import { useLayoutEffect } from "react";
import { useSearchParams } from "next/navigation";
import usePathname from "@/lib/useSitePathname";

/**
 * Global route-change scroll restoration.
 *
 * ── WHY THIS EXISTS UNDER NEXT, WHICH HAS ITS OWN SCROLL HANDLING ───────────
 * Next 16 DOES reset scroll on navigation, and `data-scroll-behavior="smooth"` on <html>
 * (set in this layout) tells it to neutralise smooth scrolling while it does so. That is
 * necessary but NOT sufficient here, and the gap is exactly failure mode #2 the original
 * file documented.
 *
 * Read Next's own implementation — disableSmoothScrollDuringRouteTransition() in
 * next/dist/shared/lib/router/utils/disable-smooth-scroll.js. It does this:
 *
 *     const htmlElement = document.documentElement
 *     htmlElement.style.scrollBehavior = 'auto'
 *     fn()
 *     htmlElement.style.scrollBehavior = existing
 *
 * It touches `document.documentElement` — <html> — and NOTHING ELSE.
 *
 * This theme sets `scrollBehavior: "smooth"` on `html, body, #root, #app`
 * (theme/index.ts). Confirmed in the compiled output:
 *     body,#root,#app{…;scroll-behavior:smooth;}
 * So `body` keeps its own smooth behaviour during the transition and keeps animating,
 * which is the precise bug the original notes recorded: overriding <html> alone still
 * landed at 919px instead of 0.
 *
 * The `.scroll-jump` class in globals.css covers all four selectors with `!important`,
 * which is why it is still needed alongside Next's own handling rather than instead of it.
 *
 * ── THE OTHER TWO CONDITIONS, UNCHANGED FROM THE ORIGINAL ───────────────────
 *   • It must run BEFORE PAINT. In useEffect the incoming route renders one frame at the
 *     outgoing route's offset before being corrected. useLayoutEffect runs before the
 *     browser paints, so the reposition is never visible.
 *   • The class is removed on the NEXT FRAME, not synchronously: the scroll is processed
 *     during layout, and tearing the class off in the same tick let the smooth rule
 *     reapply mid-jump. One rAF is imperceptible and makes the jump reliable.
 *
 * ── WHAT CHANGED IN THE PORT ────────────────────────────────────────────────
 * react-router's `useLocation()` → `usePathname()` + `useSearchParams()`.
 *
 * ⚠️ `useNavigationType()` HAS NO APP ROUTER EQUIVALENT, so the original's POP exemption
 * cannot be expressed the same way. It is not needed: Next's own router already restores
 * the previous offset on history traversal, and popstate does not re-run this effect with
 * a changed pathname in the common back/forward case. Do NOT add a popstate listener to
 * "restore" that behaviour — it would fight Next's restoration and force the top on back,
 * breaking the one case where keeping scroll is correct.
 *
 * ⚠️ `useSearchParams()` requires a Suspense boundary — it is wrapped in one in
 * app/layout.tsx. `search` is included because a query-only navigation (the blog category
 * filter) renders new content and should not keep the old offset.
 */
const ScrollToTop = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams?.toString() ?? "";

  useLayoutEffect(() => {
    const root = document.documentElement;
    root.classList.add("scroll-jump");

    // Two resets. The first covers the common case. The second runs after the incoming
    // route's own layout effects have committed: a lazy route that grows the document
    // (Suspense resolving, an image reserving height) can extend the scrollable area
    // *after* the first call, and the browser then restores a non-zero offset against
    // the newly available height. Both run with the class on, so neither animates.
    window.scrollTo(0, 0);
    const raf = requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      root.classList.remove("scroll-jump");
    });

    return () => {
      cancelAnimationFrame(raf);
      root.classList.remove("scroll-jump");
    };
  }, [pathname, search]);

  return null;
};

export default ScrollToTop;
