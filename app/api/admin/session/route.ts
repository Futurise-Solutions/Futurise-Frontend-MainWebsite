import { hasValidSession } from '@/lib/adminProxy'

/**
 * GET /api/admin/session  →  { authenticated: boolean }
 *
 * Ported from the old api/admin-session.js. The dashboard calls this on mount to decide
 * whether to show the gate or the CMS.
 *
 * ⚠️ `force-dynamic` is REQUIRED. Without it Next may statically evaluate this route at
 * build time and serve a cached `{ authenticated: false }` — or worse, a cached `true` —
 * to every visitor regardless of their actual cookie. A session check must read the live
 * request every time.
 */
export const dynamic = 'force-dynamic'

export async function GET() {
  return Response.json({ authenticated: await hasValidSession() })
}
