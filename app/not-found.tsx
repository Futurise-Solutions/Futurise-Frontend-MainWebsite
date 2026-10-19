import type { Metadata } from 'next'
import NotFoundBody from '@/components/pages/NotFoundBody'
import { buildMetadata } from '@/lib/seo'

/**
 * 404 — the `*` catch-all route from src/Routes/AllRoutes.jsx.
 *
 * 🔴 THIS FILE WAS MISSING UNTIL NOW. The old app registered
 *      <Route path="*" element={<NotFound />} />
 * and NotFound.jsx was never ported, so every unmatched URL fell through to Next's
 * built-in 404 — an unstyled white page reading "This page could not be found", with no
 * navbar, no footer and no route back into the site. Confirmed in the built output before
 * this was added.
 *
 * ── WHAT `not-found.tsx` ACTUALLY CATCHES ───────────────────────────────────
 * Two things, which is exactly what the old `*` route covered:
 *   1. any URL matching no route at all
 *   2. any explicit `notFound()` call — which /blog/[slug], /service/[slug] and
 *      /case-studies/[slug] already use for an unknown slug, replacing the old app's
 *      inline <NotFound /> render that returned HTTP 200 with 404-looking content.
 * Both now render this page with a real 404 status.
 *
 * It inherits app/layout.tsx, so the announcement bar, navbar, footer, booking modal and
 * chat bubble are all present — which is the main thing the default page was missing.
 *
 * ── noindex ─────────────────────────────────────────────────────────────────
 * The source passed `noindex` to <Seo>. buildMetadata reproduces it as
 * `robots: 'noindex, follow'` — the same value, and the same reasoning: a 404 must not be
 * indexed, but its links should still be followed.
 *
 * ⚠️ NO `path` is passed, so NO canonical is emitted. That is deliberate: a 404 has no
 * canonical URL of its own — it answers for every unmatched path — and self-canonicalising
 * it to a single URL would be wrong. Do not add one to "fix" a canonical-coverage report.
 */
export const metadata: Metadata = buildMetadata({
  title: 'Page Not Found (404)',
  description: "The page you're looking for doesn't exist or has been moved.",
  noindex: true,
})

export default function NotFound() {
  return <NotFoundBody />
}
