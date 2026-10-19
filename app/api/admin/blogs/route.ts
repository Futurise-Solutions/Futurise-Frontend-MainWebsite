import { hasValidSession, proxyToCms, unauthorized } from '@/lib/adminProxy'

/**
 * GET  /api/admin/blogs   → every post including drafts   (CMS: GET /api/blogs/admin/all)
 * POST /api/admin/blogs   → create a post                 (CMS: POST /api/blogs)
 *
 * Both hops are authenticated, and they are authenticated by DIFFERENT things:
 *   browser → here   the HttpOnly session cookie (hasValidSession)
 *   here → CMS       the X-Admin-Key header (attached inside proxyToCms)
 *
 * ⚠️ The session check is not optional. Without it this route would forward the CMS key's
 * full authority to anyone who found the URL — an open relay, strictly worse than the
 * unauthenticated CMS this change exists to fix.
 */
export const dynamic = 'force-dynamic'

export async function GET() {
  if (!(await hasValidSession())) return unauthorized()
  return proxyToCms('/api/blogs/admin/all')
}

export async function POST(request: Request) {
  if (!(await hasValidSession())) return unauthorized()

  // Forward the body as raw TEXT, not re-serialised JSON. Re-encoding would silently
  // normalise the payload (key order, number formatting, unicode escapes) and the CMS
  // stores some of these fields verbatim.
  const body = await request.text()
  return proxyToCms('/api/blogs', {
    method: 'POST',
    body,
    contentType: 'application/json',
  })
}
