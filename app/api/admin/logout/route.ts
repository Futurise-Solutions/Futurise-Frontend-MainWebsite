import { cookies } from 'next/headers'
import { ADMIN_COOKIE, cookieOptions } from '@/lib/adminProxy'

/**
 * POST /api/admin/logout
 *
 * Ported from the old api/admin-logout.js. Clears the session cookie.
 *
 * `maxAge: 0` with the SAME flags the cookie was set with — a browser will not overwrite
 * a cookie whose path or sameSite differs, so reusing cookieOptions is what makes the
 * clear actually take effect rather than silently creating a second cookie.
 */
export async function POST() {
  const jar = await cookies()
  jar.set(ADMIN_COOKIE, '', { ...cookieOptions, maxAge: 0 })
  return Response.json({ authenticated: false })
}
