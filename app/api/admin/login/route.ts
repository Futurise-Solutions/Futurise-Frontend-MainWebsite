import { cookies } from 'next/headers'
import { passwordMatches, createToken, ADMIN_COOKIE, cookieOptions } from '@/lib/adminProxy'

/**
 * POST /api/admin/login   { password }
 *
 * Ported from the old api/admin-login.js. Validates the password server-side and, on
 * success, sets the HttpOnly session cookie. The password never reaches the client bundle
 * and the response never echoes it back.
 */
export async function POST(request: Request) {
  // A missing ADMIN_PASSWORD is a misconfiguration, not a failed login. Say so plainly
  // rather than reporting "wrong password" and sending someone hunting for a typo.
  if (!process.env.ADMIN_PASSWORD) {
    return Response.json(
      { error: 'Admin access is not configured for this deployment.' },
      { status: 503 }
    )
  }

  let password: unknown
  try {
    password = (await request.json())?.password
  } catch {
    password = undefined
  }

  if (!passwordMatches(password)) {
    /**
     * Small fixed delay, carried over from the original. It will not stop a determined
     * attacker — that needs a rate limiter with shared state — but it makes casual online
     * guessing impractical without introducing a timing signal of its own.
     */
    await new Promise((resolve) => setTimeout(resolve, 400))
    return Response.json({ error: 'Incorrect password' }, { status: 401 })
  }

  const jar = await cookies()
  jar.set(ADMIN_COOKIE, createToken(), cookieOptions)

  return Response.json({ authenticated: true })
}
