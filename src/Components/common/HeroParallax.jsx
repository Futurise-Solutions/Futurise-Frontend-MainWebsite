import { useEffect, useRef, useState } from "react";
import { Box } from "@chakra-ui/react";
import { useReducedMotion } from "framer-motion";

/**
 * Motion layer for the home hero plate.
 *
 * The hero read as a still photograph with copy on it — correct, but inert. This adds
 * three independent motions that never touch layout, copy, or the plate's own paint:
 *
 *   1. `drift`   — a very slow, endless scale/translate on the plate, so the image is
 *                  never twice in the same place. This is what removes "static".
 *   2. `pointer` — a damped tilt/shift, desktop pointer only. The plate and the light
 *                  veil move at *different* rates, which is what produces depth rather
 *                  than the whole hero sliding as one sheet.
 *   3. `scroll`  — the plate drifts up slower than the page, so the hero has parallax
 *                  against the section below it.
 *
 * PERFORMANCE / LCP CONTRACT — read before editing.
 *
 * The plate is the LCP element. Two rules protect it:
 *
 *   - This component NEVER animates opacity on the plate and never wraps it in an
 *     element that starts transparent. A fading element is not awarded LCP until the
 *     tween settles; that mistake previously cost ~1.7s of LCP. Everything here is a
 *     `transform`, which the compositor handles and which does not gate LCP.
 *   - Pointer/scroll listeners attach only *after* the hero image has loaded, and only
 *     on a fine pointer (mouse). Touch devices and reduced-motion users get the static
 *     plate with no listener, no rAF loop, and no work on the main thread.
 *
 * All movement runs on a single rAF that self-parks when nothing is changing, so an
 * idle hero costs zero frames.
 */

// Damping for the pointer follow. Lower is heavier//more expensive-feeling; this is
// slow enough that the plate never appears glued to the cursor.
const EASE = 0.055;
// Maximum pointer displacement in px for the furthest layer. Kept small deliberately:
// past ~14px the movement stops reading as depth and starts reading as a gimmick.
const MAX_SHIFT = 13;

const HeroParallax = ({ children, veil }) => {
  const reduce = useReducedMotion();
  const wrapRef = useRef(null);
  const plateRef = useRef(null);
  const veilRef = useRef(null);
  const [ready, setReady] = useState(false);

  // Gate: fine pointer only. A coarse-pointer device gets no listeners at all — the
  // tilt is meaningless without a cursor and the rAF would just burn battery.
  useEffect(() => {
    if (reduce) return;
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const apply = () => setReady(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [reduce]);

  useEffect(() => {
    if (!ready) return;
    const wrap = wrapRef.current;
    const plate = plateRef.current;
    if (!wrap || !plate) return;

    // Target vs current, so the plate eases toward the pointer instead of snapping.
    let tx = 0, ty = 0, cx = 0, cy = 0, sy = 0, raf = 0, running = false;

    const frame = () => {
      const dx = tx - cx;
      const dy = ty - cy;
      cx += dx * EASE;
      cy += dy * EASE;

      // The veil travels ~1.9x the plate. That ratio is the whole effect: two layers
      // at the same rate is a slide, at different rates it is depth.
      plate.style.transform = `translate3d(${cx}px, ${cy + sy}px, 0)`;
      if (veilRef.current) {
        veilRef.current.style.transform = `translate3d(${cx * -1.9}px, ${cy * -1.9}px, 0)`;
      }

      // Park the loop once the residual motion is sub-pixel. An idle hero should not
      // hold a rAF open.
      if (Math.abs(dx) > 0.05 || Math.abs(dy) > 0.05) {
        raf = requestAnimationFrame(frame);
      } else {
        running = false;
      }
    };

    const kick = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(frame);
      }
    };

    const onMove = (e) => {
      const r = wrap.getBoundingClientRect();
      // -1..1 from the centre of the hero.
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;
      tx = nx * MAX_SHIFT * 2;
      ty = ny * MAX_SHIFT * 2;
      kick();
    };

    const onLeave = () => { tx = 0; ty = 0; kick(); };

    const onScroll = () => {
      // Only while the hero is on screen. Beyond that the value is irrelevant and we
      // would be doing layout reads for nothing.
      const y = window.scrollY;
      if (y > window.innerHeight) return;
      sy = y * 0.16;
      kick();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    wrap.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      wrap.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [ready]);

  return (
    <Box ref={wrapRef} position="absolute" inset={0} zIndex={0} overflow="hidden">
      {/* Plate carrier. `willChange` is set only when motion is actually enabled, so
          a reduced-motion visitor doesn't pay for a promoted layer they never use. */}
      <Box
        ref={plateRef}
        position="absolute"
        // Bleed past the edges: the drift and pointer shift would otherwise expose the
        // canvas at the corners.
        inset="-4%"
        willChange={ready ? "transform" : undefined}
        sx={
          reduce
            ? undefined
            : {
                // Endless ambient drift. 34s is long enough that it is felt rather than
                // seen — the plate is simply never quite where it was.
                animation: "heroDrift 34s ease-in-out infinite alternate",
              }
        }
      >
        {children}
      </Box>

      {/* Light veil — the counter-moving layer. Pure CSS gradient, no asset, so it
          costs nothing and can never delay the plate. */}
      {!reduce && veil && (
        <Box
          ref={veilRef}
          position="absolute"
          inset="-8%"
          pointerEvents="none"
          willChange={ready ? "transform" : undefined}
          bg="radial-gradient(ellipse 46% 58% at 68% 42%, rgba(150,120,255,0.20) 0%, rgba(120,100,255,0.07) 38%, transparent 72%)"
          sx={{ animation: "heroVeil 19s ease-in-out infinite alternate" }}
        />
      )}
    </Box>
  );
};

export default HeroParallax;
