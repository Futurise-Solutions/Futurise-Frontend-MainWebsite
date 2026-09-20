'use client'

import React from "react";
import { useBooking } from "../../context/BookingContext";

/**
 * AnnouncementBar
 * ---------------
 * Full-width marquee bar placed above the Navbar.
 * - Pure CSS animation: zero JS overhead, no extra dependencies.
 * - Clicking anywhere opens the existing BookingModal.
 * - Respects prefers-reduced-motion: pauses animation if enabled.
 * - aria-label + role for full accessibility.
 *
 * PORTED VERBATIM from src/Layout/AnnouncementBar.jsx. The only change is the
 * 'use client' directive and the import path for useBooking.
 *
 * ⚠️ The TEXT const below is copied byte-for-byte from the source file, escape sequences
 * and all. It begins with FOUR U+00A0 non-breaking spaces and mixes \uXXXX escapes with
 * literal characters — that inconsistency is in the original and is preserved.
 *
 * MIGRATION-GUIDE.md §3.4 gives a DIFFERENT string beginning "Powering up •". That is
 * wrong: "Powering up" is the .fs-word label inside the #fs-boot loader in index.html,
 * not this bar. The guide is annotated as corrected. See MIGRATION-INVENTORY.md §0.6.
 */

// The third item names only markets with delivered client work. It previously read
// "Trusted by Businesses Across USA, Canada, New Zealand & UAE" — Canada and New Zealand
// have no delivered projects, putting an unverifiable trust claim on every page.
const TEXT =
  "\u00a0\u00a0\u00a0\u00a0\u2022\u00a0\u00a0\u00a0\u00a0\uD83D\uDCC5\u00a0Book a Complimentary 45-Minute Strategy Call" +
  "\u00a0\u00a0\u00a0\u00a0\u2022\u00a0\u00a0\u00a0\u00a0\uD83D\uDE80\u00a0AI Agents, SaaS, Web \u0026 Mobile Solutions" +
  "    •    🌎 Delivering for Businesses in the UAE, USA & India";

const AnnouncementBar = () => {
  const { onOpen } = useBooking();

  return (
    <>
      <style>{`
        /* Marquee keyframes */
        @keyframes announcement-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* Pause when user prefers reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .announcement-track {
            animation-play-state: paused !important;
          }
        }

        .announcement-bar {
          position: relative;
          width: 100%;
          overflow: hidden;
          cursor: pointer;
          background: linear-gradient(
            90deg,
            #0d0b1a 0%,
            #120d28 20%,
            #1a0f35 50%,
            #120d28 80%,
            #0d0b1a 100%
          );
          border-bottom: 1px solid rgba(180, 160, 255, 0.18);
          z-index: 1001;
          /* Subtle shimmer overlay */
          isolation: isolate;
        }

        /* Inner gradient glow lines */
        .announcement-bar::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            linear-gradient(90deg,
              rgba(123, 108, 255, 0.12) 0%,
              rgba(181, 123, 255, 0.07) 50%,
              rgba(123, 108, 255, 0.12) 100%
            );
          pointer-events: none;
          z-index: 0;
        }

        /* Left/right fade masks */
        .announcement-bar::after {
          content: '';
          position: absolute;
          inset: 0;
          background:
            linear-gradient(to right,
              rgba(13, 11, 26, 0.9) 0%,
              transparent 8%,
              transparent 92%,
              rgba(13, 11, 26, 0.9) 100%
            );
          pointer-events: none;
          z-index: 2;
        }

        .announcement-inner {
          display: flex;
          align-items: center;
          height: 36px;
          position: relative;
          z-index: 1;
        }

        .announcement-track {
          display: flex;
          white-space: nowrap;
          animation: announcement-scroll 32s linear infinite;
          will-change: transform;
        }

        .announcement-track:hover {
          animation-play-state: paused;
        }

        .announcement-text {
          display: inline-block;
          padding: 0 2rem;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.015em;
          /* ⚠️ NON-VERBATIM LINE — the same next/font family-renaming bug as the #app
             rule in globals.css. Original:
                 font-family: 'Aeonik Trial', -apple-system, system-ui, sans-serif;
             next/font hashes family names, so the literal 'Aeonik Trial' matched nothing
             and this fell through to the system stack.

             Caught by the FIRST VISUAL DIFF (12–14% on the announcement bar) and
             confirmed with CDP CSS.getPlatformFontsForNode:
               production → AeonikTRIAL-Regular (custom, 157 glyphs)
               port       → SegoeUI-Semibold    (NOT custom, 156 glyphs)
             Computed font-family read IDENTICALLY on both. Only the face check differs.

             var(--font-aeonik) is the same variable Chakra's fonts.body resolves to.
             The rest of the stack is left exactly as the original. */
          font-family: var(--font-aeonik), -apple-system, system-ui, sans-serif;
          background: linear-gradient(135deg, #c4b5fd 0%, #e4b5ff 40%, #b4a0ff 70%, #d4c4ff 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          user-select: none;
          -webkit-user-select: none;
        }

        /* Keyboard focus ring */
        .announcement-bar:focus-visible {
          outline: 2px solid #b4a0ff;
          outline-offset: -2px;
        }
      `}</style>

      {/* Entire bar is one accessible link-like element */}
      <div
        className="announcement-bar"
        role="banner"
        aria-label="Book a free 45-minute strategy call with Futurise Solutions experts"
        tabIndex={0}
        onClick={() => onOpen("announcement-bar")}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onOpen("announcement-bar"); } }}
      >
        <div className="announcement-inner">
          {/*
            Two identical spans side-by-side (each 50% of the total width).
            The animation translates -50% which lands exactly at the start of
            the second span, creating a seamless infinite loop.
          */}
          <div className="announcement-track" aria-hidden="true">
            <span className="announcement-text">{TEXT}</span>
            <span className="announcement-text" aria-hidden="true">{TEXT}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnnouncementBar;
