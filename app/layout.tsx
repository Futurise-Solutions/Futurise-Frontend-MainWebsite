import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'
import { fontVariables } from '@/theme/fonts'
import { BookingProvider } from '@/context/BookingContext'
import AnnouncementBar from '@/components/layout/AnnouncementBar'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Analytics from '@/components/common/Analytics'
import { Analytics as VercelAnalytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

/**
 * Root layout.
 *
 * PHASE 1 SCOPE: html/body, the provider stack, and the #app wrapper. The announcement
 * bar, header, footer, chat bubble and analytics arrive in Phase 3 — this file will grow.
 *
 * ── WHY <div id="app"> IS HERE ───────────────────────────────────────────────
 * It is not decorative. The Vite app rendered <Box id='app'> inside <div id="root">, and
 * six CSS rules in the legacy stylesheet are scoped to `#app` (MIGRATION-INVENTORY.md §D.4):
 *
 *   #app                         font stack + antialiasing + optimizeLegibility
 *   #app                         user-select: none          ← content protection
 *   #app input, textarea, …      user-select: text          ← re-enables it where needed
 *   #app img                     user-drag: none            ← image protection
 *   html.scroll-jump … #app      scroll-behavior: auto      ← route-change scroll fix
 *   html, body, #root, #app      bg + color + smooth scroll (from the Chakra theme)
 *
 * Dropping the wrapper silently un-applies all of them. This is trap #1 in the guide and
 * the single most likely cause of "everything looks slightly off after migration".
 * Phase 8 may remove it once those rules are rewritten; not before.
 *
 * ── data-scroll-behavior="smooth" ────────────────────────────────────────────
 * Next 16 no longer overrides scroll-behavior during navigation unless this attribute is
 * present. The theme sets `scrollBehavior: smooth` on html/body/#root/#app, so without
 * this a route change would animate-scroll to the top instead of jumping — which is the
 * exact bug ScrollToTop.jsx exists to fix in the old app.
 */

export const metadata: Metadata = {
  // Phase 1 placeholder. The real metadata — including metadataBase, the per-page
  // absolute titles (NO template, per D7), OG/Twitter and JSON-LD — lands in Phase 7.
  // See MIGRATION-INVENTORY.md §I for every route's exact values.
  title: 'Futurise Solutions',
  description: 'Phase 1 scaffold — not the production metadata.',
}

/**
 * ── WHY THE DARK-MODE ATTRIBUTES ARE HARDCODED HERE ──────────────────────────
 * <ColorModeScript> (in providers.tsx) runs as an inline script BEFORE React hydrates
 * and imperatively sets, for a dark colour mode:
 *
 *   <html data-theme="dark" style="color-scheme: dark">
 *   <body class="chakra-ui-dark">
 *
 * Without declaring them server-side, the server HTML lacks all three, the script adds
 * them, and React then reports:
 *   "A tree hydrated but some attributes of the server rendered HTML didn't match"
 *
 * That was a real, reproduced error on this scaffold — not theoretical. Declaring the
 * same values in the server render makes both sides agree, so the script becomes a no-op
 * on first load and the mismatch disappears.
 *
 * This is safe ONLY because the site is dark-only and locked:
 *   config: { initialColorMode: 'dark', useSystemColorMode: false }
 * If a light mode is ever introduced, these three attributes must become dynamic or the
 * mismatch returns inverted. See MIGRATION-INVENTORY.md §C.1 and guide trap #3.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      // Defines --font-zangezi and --font-aeonik, which theme/index.ts references in
      // `fonts.heading` / `fonts.body`. Without this className the variables resolve to
      // nothing and every element silently falls back to -apple-system.
      className={fontVariables}
      data-scroll-behavior="smooth"
      data-theme="dark"
      style={{ colorScheme: 'dark' }}
      // NOTE: deliberately NO suppressHydrationWarning. The three attributes above make
      // the server and client renders genuinely identical, verified with a headless
      // browser showing zero hydration errors. Suppression would hide a future real
      // mismatch here, so it stays off.
    >
      <body className="chakra-ui-dark">
        {/* keeps every legacy `#app ...` CSS selector matching — see note above */}
        {/* Reproduces the old App.jsx shell exactly:
              <Box id='app' minH="100vh" display="flex" flexDirection="column">
                <ScrollToTop /> <AnnouncementBar /> <Navbar />
                <Box as="main" flex="1"> <PageTransition><AllRoutes/></PageTransition> </Box>
                <Footer /> <BookingModal /> <ChatBubble />
              </Box>
            The flex column + `flex: 1` on main is what makes the Footer's `mt="auto"`
            pin it to the bottom on short pages. Dropping it would let the footer float
            up mid-viewport on /privacy and the 404.

            NOT YET PRESENT, deliberately:
              ScrollToTop   — Phase 3 open question (may be redundant under Next)
              PageTransition— same
              BookingModal  — Phase 4 (needs the modal + its framer-motion props)
              ChatBubble    — Phase 4 per D24. Its absence bottom-right is the one
                              EXPECTED delta in this phase's visual diff. */}
        <div id="app" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Providers>
            <BookingProvider>
              <AnnouncementBar />
              <Navbar />
              <main style={{ flex: 1 }}>{children}</main>
              <Footer />
            </BookingProvider>
          </Providers>
        </div>

        {/* PHASE 8 — third-party tags, all deferred and all OUTSIDE #app.
            Placing them after the app subtree keeps them out of the flex chain that
            check 6 asserts (main and footer must stay DIRECT children of #app).
            GA4 afterInteractive, Clarity lazyOnload — see Analytics.jsx.
            Vercel Analytics and Speed Insights ship their own deferred loading. */}
        <Analytics />
        <VercelAnalytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
