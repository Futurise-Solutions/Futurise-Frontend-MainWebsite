import { useLayoutEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

/**
 * Global route-change scroll restoration.
 *
 * THREE things had to be true for this to work, and each one was broken in turn. If you
 * change this file, re-check all three.
 *
 *   1. The behavior must actually be instant.
 *      The original called `scrollTo` with `behavior: "instant" in window ? "instant" : "auto"`.
 *      `instant` is a *value* for the behavior option, never a property of `window`, so
 *      the test is always false and the call always resolved to `"auto"` — which means
 *      "use the CSS cascade".
 *
 *   2. The CSS cascade says smooth, on FOUR elements.
 *      theme/index.js sets `scrollBehavior: "smooth"` on `html, body, #root, #app`. So
 *      navigating from the footer *animated* back to the top over ~500ms. Overriding
 *      `document.documentElement` alone is not enough — `body` keeps its own smooth
 *      behaviour and keeps animating, which is why a partial fix still landed at 919px
 *      instead of 0. The `.scroll-jump` class below covers the same four selectors.
 *
 *   3. It must run before paint.
 *      In `useEffect` the incoming route renders one frame at the outgoing route's
 *      offset before being corrected. `useLayoutEffect` runs before the browser paints,
 *      so the reposition is never visible.
 *
 * The class is removed on the next frame rather than synchronously: the scroll is
 * processed during layout, and tearing the class off in the same tick let the smooth
 * rule reapply mid-jump. One rAF is imperceptible and makes the jump reliable.
 *
 * BACK/FORWARD is deliberately excluded. `useNavigationType()` reports POP for history
 * traversal, and the browser's own scroll restoration returns the user to where they
 * were on that entry — forcing the top there would break the one case where restoring
 * scroll is correct. Only PUSH and REPLACE reset.
 *
 * A hard refresh is untouched: this runs only on client-side route changes.
 */
const ScrollToTop = () => {
  const { pathname, search } = useLocation();
  const navigationType = useNavigationType();

  useLayoutEffect(() => {
    // Let the browser restore position on back/forward. See the note above.
    if (navigationType === "POP") return;

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
    // `search` is included so a query-string-only navigation (filters, pagination) also
    // resets — those render new content and should not keep the old offset.
  }, [pathname, search, navigationType]);

  return null;
};

export default ScrollToTop;
