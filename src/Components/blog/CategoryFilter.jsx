import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, LayoutGroup } from "framer-motion";
import { Box, IconButton } from "@chakra-ui/react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const MotionBox = motion(Box);

const FADE = 28; // width of the edge fade, px
const EDGE_PAD = 24; // breathing room kept around the active pill when auto-scrolling

// Element.scrollBy is optional in older/non-browser DOMs — fall back to a plain
// assignment rather than letting a throw inside an effect take the page down.
const scrollByX = (el, left) => {
  if (!el || !left) return;
  if (typeof el.scrollBy === "function") el.scrollBy({ left, behavior: "smooth" });
  else el.scrollLeft += left;
};

/**
 * CategoryFilter — Premium Glassmorphism Pill Bar
 * -----------------------------------------------
 * Same prop API: categories, active, onChange — NO filtering logic change.
 *
 * Layout is responsive because the category list is long (12+ labels ≈ 1700px):
 * - lg and up  → pills WRAP onto multiple rows, so every category is visible at once.
 * - below lg   → single scrolling row (a wrapped bar would eat the screen in a sticky
 *                header), with fade masks marking off-screen pills, arrow buttons for
 *                non-touch pointers, and swipe on touch.
 *
 * Extras: real <button> semantics, tablist roles, focus rings, arrow-key navigation,
 * and the active pill is scrolled into view automatically.
 */

const ScrollArrow = ({ side, show, onClick }) => (
  <IconButton
    aria-label={`Scroll categories ${side}`}
    icon={side === "left" ? <FiChevronLeft /> : <FiChevronRight />}
    onClick={onClick}
    tabIndex={-1}
    isRound
    position="absolute"
    top="50%"
    {...(side === "left" ? { left: "-4px" } : { right: "-4px" })}
    transform="translateY(-50%)"
    zIndex={2}
    minW="30px"
    w="30px"
    h="30px"
    fontSize="16px"
    bg="rgba(19,19,31,0.94)"
    color="text.primary"
    border="1px solid"
    borderColor="border.strong"
    backdropFilter="blur(8px)"
    boxShadow="0 4px 16px -4px rgba(0,0,0,0.65)"
    opacity={show ? 1 : 0}
    pointerEvents={show ? "auto" : "none"}
    transition="opacity .2s ease, background .2s ease, border-color .2s ease"
    _hover={{ bg: "brand.500", borderColor: "brand.400" }}
    // Touch devices swipe — arrows would just be clutter.
    sx={{ "@media (hover: none)": { display: "none" } }}
  />
);

const CategoryFilter = ({ categories = [], active = "All", onChange }) => {
  const options = ["All", ...categories];
  const scrollRef = useRef(null);
  const [edges, setEdges] = useState({ left: false, right: false });

  // Track which side(s) still hold off-screen pills, so the fade + arrows only
  // appear when there is genuinely something more to reach.
  const syncEdges = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setEdges({ left: el.scrollLeft > 1, right: el.scrollLeft < max - 1 });
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    syncEdges();
    el.addEventListener("scroll", syncEdges, { passive: true });
    // Fires on viewport resize AND on the wrap/scroll breakpoint flip.
    const ro = new ResizeObserver(syncEdges);
    ro.observe(el);
    if (el.firstElementChild) ro.observe(el.firstElementChild);
    return () => {
      el.removeEventListener("scroll", syncEdges);
      ro.disconnect();
    };
  }, [syncEdges, options.length]);

  // Keep the selected pill visible — it can otherwise sit off-screen after a
  // filter change or on load.
  useEffect(() => {
    const el = scrollRef.current;
    const pill = el?.querySelector('[data-active="true"]');
    if (!el || !pill) return;
    const c = el.getBoundingClientRect();
    const p = pill.getBoundingClientRect();
    if (p.left < c.left + EDGE_PAD) {
      scrollByX(el, p.left - c.left - EDGE_PAD);
    } else if (p.right > c.right - EDGE_PAD) {
      scrollByX(el, p.right - c.right + EDGE_PAD);
    }
  }, [active]);

  const nudge = (dir) => {
    const el = scrollRef.current;
    if (el) scrollByX(el, dir * el.clientWidth * 0.7);
  };

  // Arrow-key navigation is expected of role="tablist".
  const onKeyDown = (e) => {
    const delta = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    const nextIndex = (options.indexOf(active) + delta + options.length) % options.length;
    onChange?.(options[nextIndex]);
    scrollRef.current?.querySelectorAll("[data-pill]")[nextIndex]?.focus();
  };

  // Background-agnostic fade — works over the blurred sticky bar without having
  // to match its colour.
  const mask =
    edges.left && edges.right
      ? `linear-gradient(to right, transparent, #000 ${FADE}px, #000 calc(100% - ${FADE}px), transparent)`
      : edges.left
        ? `linear-gradient(to right, transparent, #000 ${FADE}px)`
        : edges.right
          ? `linear-gradient(to right, #000 calc(100% - ${FADE}px), transparent)`
          : undefined;

  return (
    <Box position="relative">
      <ScrollArrow side="left" show={edges.left} onClick={() => nudge(-1)} />
      <ScrollArrow side="right" show={edges.right} onClick={() => nudge(1)} />

      <Box
        ref={scrollRef}
        role="tablist"
        aria-label="Filter articles by category"
        onKeyDown={onKeyDown}
        // Scrolls below lg; at lg+ the inner bar wraps instead, so there is
        // nothing to scroll and the mask/arrows switch themselves off.
        overflowX={{ base: "auto", lg: "visible" }}
        display={{ base: "block", lg: "flex" }}
        justifyContent="center"
        // Extra vertical room so the active pill's glow isn't clipped by the
        // scroll container; pulled back so the bar's height is unchanged.
        py={2}
        my="-4px"
        sx={{
          WebkitOverflowScrolling: "touch",
          "&::-webkit-scrollbar": { height: "0px" },
          scrollbarWidth: "none",
          maskImage: mask,
          WebkitMaskImage: mask,
        }}
      >
        {/* Glassmorphism container */}
        <Box
          display="inline-flex"
          flexWrap={{ base: "nowrap", lg: "wrap" }}
          justifyContent={{ base: "flex-start", lg: "center" }}
          minW={{ base: "max-content", lg: "auto" }}
          maxW={{ lg: "100%" }}
          p="5px"
          borderRadius={{ base: "full", lg: "22px" }}
          bg="rgba(255,255,255,0.04)"
          backdropFilter="blur(12px)"
          border="1px solid"
          borderColor="rgba(255,255,255,0.09)"
          boxShadow="inset 0 1px 0 rgba(255,255,255,0.06), 0 4px 24px -8px rgba(0,0,0,0.4)"
          gap="2px"
          rowGap={{ lg: "4px" }}
        >
          <LayoutGroup id="blog-category-filter">
            {options.map((cat) => {
              const isActive = active === cat;
              return (
                <Box
                  key={cat}
                  as="button"
                  type="button"
                  data-pill
                  data-active={isActive ? "true" : undefined}
                  role="tab"
                  aria-selected={isActive}
                  tabIndex={isActive ? 0 : -1}
                  position="relative"
                  flexShrink={0}
                  borderRadius="full"
                  cursor="pointer"
                  onClick={() => onChange?.(cat)}
                  _focusVisible={{
                    outline: "2px solid",
                    outlineColor: "accent.solid",
                    outlineOffset: "2px",
                  }}
                >
                  {/* Sliding active highlight — Framer Motion layoutId for smooth transition */}
                  {isActive && (
                    <MotionBox
                      layoutId="cat-highlight"
                      position="absolute"
                      inset={0}
                      borderRadius="full"
                      bgGradient="linear(135deg, brand.500, violet.500)"
                      boxShadow="0 4px 20px -6px rgba(123,108,255,0.7), 0 0 0 1px rgba(180,160,255,0.3)"
                      transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    />
                  )}

                  {/* Pill label */}
                  <Box
                    as="span"
                    display="block"
                    position="relative"
                    zIndex={1}
                    px={{ base: 3, md: 4 }}
                    py="7px"
                    fontSize={{ base: "12px", md: "13px" }}
                    fontWeight={isActive ? 600 : 500}
                    letterSpacing="0.01em"
                    color={isActive ? "white" : "text.muted"}
                    borderRadius="full"
                    transition="color .2s ease, background .2s ease"
                    _hover={{
                      color: isActive ? "white" : "text.primary",
                      bg: isActive ? "transparent" : "rgba(180,160,255,0.08)",
                    }}
                    whiteSpace="nowrap"
                    userSelect="none"
                  >
                    {cat}
                  </Box>
                </Box>
              );
            })}
          </LayoutGroup>
        </Box>
      </Box>
    </Box>
  );
};

export default CategoryFilter;
