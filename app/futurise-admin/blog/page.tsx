import type { Metadata } from 'next'
import AdminBlogBody from '@/components/pages/AdminBlogBody'

/**
 * /futurise-admin/blog — the CMS dashboard. Replaces the old
 * <Route path="/futurise-admin/blog" element={<AdminBlogPage />} />.
 *
 * ── noindex, AND ALSO robots.txt ────────────────────────────────────────────
 * `robots: 'noindex, nofollow'` keeps this out of the index if it is ever crawled, and
 * app/robots.ts already carries `Disallow: /futurise-admin/` for every user-agent
 * including the eleven named AI crawlers. Both are deliberate: the disallow stops the
 * fetch, the meta tag covers a URL discovered some other way (a pasted link, a referrer).
 * `nofollow` is added here because the old <Seo noindex> emitted "noindex, follow" — on a
 * login gate there are no links worth following.
 *
 * ⚠️ NO CANONICAL, and none should be added. buildMetadata() is deliberately not used for
 * that reason: a canonical on an unindexable page is a contradictory signal.
 *
 * ── THIS PAGE IS NOT THE SECURITY BOUNDARY ──────────────────────────────────
 * Rendering it costs nothing and reveals nothing — it shows a password gate until
 * /api/admin/session confirms a valid cookie. The real boundary is server-side, in the
 * /api/admin/* Route Handlers: each one checks the session before attaching the CMS key.
 * So there is no middleware gate on this path, and none is needed. Do not add one on the
 * assumption that it is what protects the data; the handlers are.
 */
export const metadata: Metadata = {
  title: { absolute: 'Admin' },
  robots: 'noindex, nofollow',
}

/**
 * Always rendered per-request. A prerendered shell would be harmless (the gate is the
 * default state) but it would also be pointless — nothing here is cacheable, and every
 * child call is `no-store`.
 */
export const dynamic = 'force-dynamic'

export default function Page() {
  return <AdminBlogBody />
}
