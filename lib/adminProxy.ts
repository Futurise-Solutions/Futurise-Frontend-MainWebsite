import { cookies } from 'next/headers'
import crypto from 'node:crypto'

/**
 * Server-only helpers shared by every /api/admin/* Route Handler.
 *
 * ⚠️ THIS FILE MUST NEVER BE IMPORTED BY A CLIENT COMPONENT. It reads ADMIN_KEY and
 * ADMIN_PASSWORD. Anything that reaches a client component is bundled into the JavaScript
 * the browser downloads, and both secrets would be readable in devtools. That exact
 * mistake was made once already in the old app with VITE_ADMIN_PASSWORD.
 *
 * It is safe here because Route Handlers only ever run on the server. `next/headers` is
 * server-only and will throw if this module is pulled into a client bundle, which is a
 * useful second line of defence — but do not rely on it. Check the import site.
 *
 * ── THE SHAPE OF THIS DESIGN, AND WHY ───────────────────────────────────────
 * Two separate secrets doing two different jobs:
 *
 *   ADMIN_PASSWORD  what the human types to get a dashboard session.
 *   ADMIN_KEY       what THIS SERVER sends to the CMS backend as `X-Admin-Key`.
 *
 * The browser only ever holds a session cookie. It never sees ADMIN_KEY, and it never
 * talks to the CMS directly — every write goes browser → this server → CMS, and the key
 * is attached on the last hop.
 *
 * That indirection is the whole point of Option A. The old app had the browser call the
 * CMS directly, which is why its login could only hide the UI: there was no server hop
 * on which to attach a credential. Its own source said as much.
 */

export const ADMIN_COOKIE = 'fs_admin_session'

/** 8 hours — long enough for a working session, short enough that a leaked token dies. */
const TTL_MS = 8 * 60 * 60 * 1000

const BACKEND_ORIGIN =
  process.env.BLOG_API_ORIGIN || 'https://futurise-backend-main-website.vercel.app'

/**
 * Prefer ADMIN_SESSION_SECRET so rotating the password does not invalidate live sessions.
 * Falling back to the password keeps first-time setup to one variable.
 */
function signingKey(): string {
  const key = process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD
  if (!key) throw new Error('ADMIN_SESSION_SECRET or ADMIN_PASSWORD must be set')
  return key
}

const sign = (payload: string) =>
  crypto.createHmac('sha256', signingKey()).update(payload).digest('hex')

/**
 * Constant-time compare. Hashing first keeps it constant-time with respect to LENGTH as
 * well as content, and avoids timingSafeEqual throwing on a length mismatch.
 */
function safeEqual(a: string, b: string): boolean {
  const ha = crypto.createHash('sha256').update(String(a), 'utf8').digest()
  const hb = crypto.createHash('sha256').update(String(b), 'utf8').digest()
  return crypto.timingSafeEqual(ha, hb)
}

/** Check a submitted password against the configured one. */
export function passwordMatches(submitted: unknown): boolean {
  const configured = process.env.ADMIN_PASSWORD
  // Unset must never mean "anything works".
  if (!configured) return false
  if (typeof submitted !== 'string' || submitted.length === 0) return false
  return safeEqual(submitted, configured)
}

export function createToken(): string {
  const expiresAt = String(Date.now() + TTL_MS)
  return `${expiresAt}.${sign(expiresAt)}`
}

export function verifyToken(token: unknown): boolean {
  if (typeof token !== 'string') return false
  const dot = token.lastIndexOf('.')
  if (dot < 1) return false

  const payload = token.slice(0, dot)
  let expected: string
  try {
    expected = sign(payload)
  } catch {
    return false // key not configured — fail closed
  }
  if (!safeEqual(token.slice(dot + 1), expected)) return false

  const expiresAt = Number(payload)
  return Number.isFinite(expiresAt) && Date.now() < expiresAt
}

/** True when the incoming request carries a valid, unexpired admin session. */
export async function hasValidSession(): Promise<boolean> {
  const jar = await cookies()
  return verifyToken(jar.get(ADMIN_COOKIE)?.value)
}

/**
 * Cookie flags, and why each one is load-bearing:
 *   httpOnly        unreadable from JavaScript, so XSS cannot steal the session
 *   secure          https only (disabled in dev, where localhost is http)
 *   sameSite strict never sent cross-site, which removes CSRF without a second token
 */
export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
  path: '/',
  maxAge: Math.floor(TTL_MS / 1000),
}

/**
 * Proxy a request to the CMS with the admin key attached.
 *
 * ⚠️ EVERY CALLER MUST CHECK hasValidSession() FIRST. This function does NOT check the
 * session — it only attaches the key. Calling it without a session check turns the handler
 * into an open relay that hands the CMS key's authority to anyone who finds the URL, which
 * is strictly worse than the hole this whole change closes.
 *
 * Returns the CMS response essentially unchanged so the client-side API layer keeps its
 * existing contract. Only the status and body are forwarded; backend headers are not,
 * because nothing downstream reads them and forwarding blindly can leak server detail.
 */
export async function proxyToCms(
  path: string,
  init: { method?: string; body?: string; contentType?: string } = {}
): Promise<Response> {
  const adminKey = process.env.ADMIN_KEY

  /**
   * Missing key is a MISCONFIGURATION and must fail closed with a distinguishable status.
   * 503, not 401: a 401 would send an operator hunting for a wrong password when the real
   * problem is an unset environment variable on this deployment.
   */
  if (!adminKey) {
    return Response.json(
      { success: false, message: 'Admin API key is not configured on this deployment.' },
      { status: 503 }
    )
  }

  const res = await fetch(`${BACKEND_ORIGIN}${path}`, {
    method: init.method || 'GET',
    headers: {
      'X-Admin-Key': adminKey,
      ...(init.contentType ? { 'Content-Type': init.contentType } : {}),
    },
    body: init.body,
    // Admin reads must never be served from a cache — a draft that was just saved has to
    // come back changed, and ISR would happily return the previous version.
    cache: 'no-store',
  })

  const text = await res.text()
  return new Response(text || null, {
    status: res.status,
    headers: { 'Content-Type': 'application/json' },
  })
}

/** Standard 401 for a handler reached without a session. */
export const unauthorized = () =>
  Response.json({ success: false, message: 'Unauthorized' }, { status: 401 })
