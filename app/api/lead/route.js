/**
 * POST /api/lead - server-side safety copy of every lead.
 *
 * EmailJS (in the browser) stays the PRIMARY path for contact-form and newsletter
 * submissions. This route exists so an email failure can never silently lose a lead: the
 * form also posts the same data here, and we forward it to the backend, which stores it
 * in MongoDB (collection "leads").
 *
 * Env vars:
 *   LEAD_PROXY_KEY       shared secret sent to the backend as X-Lead-Key. It MUST hold the
 *                        same random value in BOTH Vercel projects (this site and the
 *                        backend). If it is unset, ADMIN_KEY (already shared by both projects
 *                        for the admin CMS, server-side only) is used instead. Neither set =
 *                        fail closed (503), nothing is forwarded.
 *   LEAD_BACKEND_ORIGIN  optional; falls back to CHAT_BACKEND_ORIGIN, then the production
 *                        backend.
 *
 * Guards: same-origin only, 5 requests / IP / minute, 20 KB body cap, honeypot field
 * "website", strict validation. Input is never echoed back and names, emails and messages
 * are never logged (status codes only).
 */

export const maxDuration = 30

const BACKEND_ORIGIN = () =>
  (process.env.LEAD_BACKEND_ORIGIN || process.env.CHAT_BACKEND_ORIGIN || 'https://futurise-backend-main-website.vercel.app').replace(/\/+$/, '')

const RATE_LIMIT = 5
const RATE_WINDOW_MS = 60_000
const MAX_BODY_BYTES = 20 * 1024
const hits = new Map() // ip -> number[] (timestamps)

/* Global ceiling per instance per day, FAILS CLOSED, as in /api/chat: the per-IP limit caps one
   sender, this caps a distributed burst of junk leads. Real volume is a few a week. */
const DAILY_CEILING = 300
let dayKey = ''
let dayCount = 0
function underDailyCeiling() {
  const k = new Date().toISOString().slice(0, 10)
  if (k !== dayKey) { dayKey = k; dayCount = 0 }
  if (dayCount >= DAILY_CEILING) return false
  dayCount++
  return true
}

function underRateLimit(ip) {
  const now = Date.now()
  const arr = (hits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS)
  if (arr.length >= RATE_LIMIT) {
    hits.set(ip, arr)
    return false
  }
  arr.push(now)
  hits.set(ip, arr)
  if (hits.size > 5000) {
    for (const [k, v] of hits) {
      if (!v.length || now - v[v.length - 1] > RATE_WINDOW_MS) hits.delete(k)
    }
  }
  return true
}

const ALLOWED_HOSTS = ['www.futurisesolutions.com', 'futurisesolutions.com', 'localhost:3000', '127.0.0.1:3000']

function originAllowed(req) {
  const candidate = req.headers.get('origin') || req.headers.get('referer')
  if (!candidate) return false
  try {
    return ALLOWED_HOSTS.includes(new URL(candidate).host)
  } catch {
    return false
  }
}

function clientIp(req) {
  const xff = req.headers.get('x-forwarded-for')
  if (xff) return xff.split(',')[0].trim()
  return req.headers.get('x-real-ip') || 'unknown'
}

const TYPES = ['contact', 'newsletter', 'chat']
const LIMITS = { name: 150, company: 200, email: 254, phone: 32, country: 80, service: 150, brief: 5000, location: 300, page: 300, landing: 300, referrer: 300, utm: 300 }
const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]{2,}$/

/* Strips control characters; the brief keeps line breaks and tabs. */
function clean(value, max, multiline) {
  if (typeof value !== 'string') return ''
  const re = multiline ? /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]/g : /[\u0000-\u001F\u007F-\u009F]/g
  return value.replace(re, multiline ? '' : ' ').trim().slice(0, max)
}

/* Returns the normalised lead, or null when invalid. Unknown keys are dropped. Over-long
   values are rejected for email/name and truncated for the optional fields. */
export function normaliseLead(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return null
  if (!TYPES.includes(body.type)) return null

  const email = clean(body.email, 1000)
  if (!email || email.length > LIMITS.email || !EMAIL_RE.test(email)) return null

  const out = { type: body.type, email }
  for (const key of Object.keys(LIMITS)) {
    if (key === 'email') continue
    const raw = body[key]
    if (raw !== undefined && raw !== null && typeof raw !== 'string') {
      if (key === 'name') return null
      continue
    }
    const v = clean(raw, key === 'name' ? 100000 : LIMITS[key], key === 'brief')
    if (key === 'name' && v.length > LIMITS.name) return null
    if (v) out[key] = v
  }
  if (out.type === 'contact' && !out.name) return null
  return out
}

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })

export async function POST(req) {
  if (!originAllowed(req)) return json({ ok: false }, 403)
  if (!underRateLimit(clientIp(req))) return json({ ok: false }, 429)

  const declared = Number(req.headers.get('content-length'))
  if (declared > MAX_BODY_BYTES) return json({ ok: false }, 413)

  let text
  try {
    text = await req.text()
  } catch {
    return json({ ok: false }, 400)
  }
  if (new TextEncoder().encode(text).length > MAX_BODY_BYTES) return json({ ok: false }, 413)

  let body
  try {
    body = JSON.parse(text)
  } catch {
    return json({ ok: false }, 400)
  }

  // Honeypot: pretend success, forward nothing.
  if (body && typeof body.website === 'string' && body.website.trim() !== '') return json({ ok: true })

  const lead = normaliseLead(body)
  if (!lead) return json({ ok: false }, 400)
  if (!underDailyCeiling()) return json({ ok: false }, 503)

  // LEAD_PROXY_KEY if set; otherwise ADMIN_KEY, which both projects already share for the
  // admin CMS (server-to-server only). The backend's requireLeadKey applies the same order.
  const key = process.env.LEAD_PROXY_KEY || process.env.ADMIN_KEY
  if (!key) {
    console.error('api/lead: neither LEAD_PROXY_KEY nor ADMIN_KEY is set; lead not forwarded (503)')
    return json({ ok: false }, 503)
  }

  try {
    const upstream = await fetch(`${BACKEND_ORIGIN()}/api/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Lead-Key': key },
      body: JSON.stringify(lead),
      signal: AbortSignal.timeout(8_000),
    })
    if (!upstream.ok) {
      console.error(`api/lead: backend responded ${upstream.status}`)
      return json({ ok: false }, 502)
    }
    return json({ ok: true }, 201)
  } catch (err) {
    console.error(`api/lead: backend request failed (${err?.name || 'error'})`)
    return json({ ok: false }, 502)
  }
}
