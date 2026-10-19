/**
 * POST /api/chat — a GUARDED THIN PROXY to the existing backend.
 *
 * ⚠️ THIS FILE ADDS GUARDS. IT DOES NOT IMPLEMENT THE CHATBOT.
 * The LLM logic — model, system prompt, request shape, answer selection — stays in the
 * existing backend at futurise-backend-main-website.vercel.app/api/chat, which is what
 * production calls today. This route forwards to it unchanged and returns its response
 * unchanged, so the assistant answers identically to production.
 *
 * An earlier version of this file reimplemented the provider call here: an invented
 * model, system prompt and upstream shape, with no source to be faithful to. That would
 * have made the chatbot answer DIFFERENTLY from production on a customer-facing page.
 * It was deleted. Do not reintroduce it — if the answers need to change, change the
 * backend, not this proxy.
 *
 * ⚠️ D23 — THE ONE DELIBERATE RULE-1 DEVIATION IN THIS PROJECT.
 * Authorised by the human on 18 Sep 2026, scoped to the server-side guarding of this
 * single endpoint. The old `/api/chat` is unauthenticated and unrate-limited (B4) and
 * calls an LLM provider on the company's key, so the exposure is billing and abuse.
 * Porting that forward verbatim would copy a live exposure into a new system, so the
 * guards below ship from the first commit.
 *
 * ⚠️ THE RESPONSE CONTRACT IS UNCHANGED. Every response is one of the three shapes the
 * client already handles, so `api/chat.js`, ChatWidget's cascade and the keyword
 * fallback all behave exactly as they do today:
 *
 *     { answer, source: "ai" }        → render the answer
 *     { source: "quota_exceeded" }    → client runs the keyword fallback
 *     { source: "error", message }    → client runs the keyword fallback
 *
 * Every guard rejection returns `quota_exceeded` or `error` rather than a bare 4xx, so a
 * blocked request FAILS CLOSED into the keyword matcher and the visitor still gets an
 * answer (the O4/D23 requirement).
 */

/* Vercel would otherwise cut this function off at the plan default. The upstream fetch
   below gives up at 30s, so 60s leaves room to answer with a clean error. */
export const maxDuration = 60

/** The backend that actually answers. Same origin production calls (see .env). */
const BACKEND_ORIGIN =
  process.env.CHAT_BACKEND_ORIGIN || 'https://futurise-backend-main-website.vercel.app'

/* ── Guard 1: rate limit — 10 requests / IP / minute, sliding window ──────────
   Sized against the real UI, not a guess: a visitor asks, reads, asks again, so a
   genuine burst is 3–5/min. 10 leaves ~2x headroom for a fast reader or a double-submit
   and still caps an abuser at 600/hr/IP instead of unbounded.

   In-memory, per-instance. On serverless this resets on cold start and is not shared
   between instances, so it is a brake on casual abuse rather than a distributed quota.
   A durable store (Redis/Upstash) is the Phase 8 upgrade — noted, not silently assumed. */
const RATE_LIMIT = 10
const RATE_WINDOW_MS = 60_000
const hits = new Map() // ip -> number[] (timestamps)

/* ── Guard 2: global daily ceiling — 2,000 requests/day, FAILS CLOSED ─────────
   Cleared as owed item O4. The billing backstop: the per-IP limit caps any one abuser,
   but a distributed burst could still run up a provider bill. On reaching the ceiling
   this stops forwarding to the backend entirely and returns `quota_exceeded`, which the
   client already handles by falling back to the keyword matcher.                        */
const DAILY_CEILING = 2000
let dayKey = ''
let dayCount = 0

const todayKey = () => new Date().toISOString().slice(0, 10)

function underDailyCeiling() {
  const k = todayKey()
  if (k !== dayKey) {
    dayKey = k
    dayCount = 0
  }
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

  // Keep the map from growing without bound on a long-lived instance.
  if (hits.size > 5000) {
    for (const [k, v] of hits) {
      if (!v.length || now - v[v.length - 1] > RATE_WINDOW_MS) hits.delete(k)
    }
  }
  return true
}

/* ── Guard 3: Origin / Referer check ─────────────────────────────────────────
   Blocks the trivial direct-curl case. Explicitly NOT a security boundary on its own —
   an Origin header is attacker-controlled (recorded in B3). It is one layer, paired with
   the rate limit, not a substitute for it.                                              */
const ALLOWED_HOSTS = [
  'www.futurisesolutions.com',
  'futurisesolutions.com',
  'localhost:3000',
  '127.0.0.1:3000',
]

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

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })

export async function POST(req) {
  // Guard 3 — same-origin only.
  if (!originAllowed(req)) {
    return json({ source: 'error', message: 'Forbidden origin' }, 403)
  }

  // Guard 1 — per-IP rate limit. `quota_exceeded` so the client falls back to the
  // keyword matcher rather than showing the visitor an error.
  if (!underRateLimit(clientIp(req))) {
    return json({ source: 'quota_exceeded' }, 429)
  }

  // Read the body as TEXT and forward it byte-for-byte. Parsing and re-serialising
  // would risk altering the payload the backend expects; this proxy has no reason to
  // inspect or reshape it.
  let rawBody
  try {
    rawBody = await req.text()
  } catch {
    return json({ source: 'error', message: 'Malformed request body' }, 400)
  }

  // Guard 2 — global daily ceiling, checked last so it only counts requests that would
  // otherwise reach the backend.
  if (!underDailyCeiling()) {
    return json({ source: 'quota_exceeded' })
  }

  try {
    /* Optional shared secret. The backend sees this proxy's IP for every visitor, so when
       CHAT_PROXY_KEY is set we pass the real visitor IP, proven by the key, and the
       backend rate-limits per visitor. Unset = no extra headers, behaviour unchanged. */
    const headers = { 'Content-Type': 'application/json' }
    if (process.env.CHAT_PROXY_KEY) {
      headers['X-Chat-Proxy-Key'] = process.env.CHAT_PROXY_KEY
      headers['X-Visitor-IP'] = clientIp(req)
    }

    const upstream = await fetch(`${BACKEND_ORIGIN}/api/chat`, {
      method: 'POST',
      headers,
      body: rawBody,
      signal: AbortSignal.timeout(30_000),
    })

    /* Return the backend's response UNCHANGED. It already returns a `source` field even
       on handled errors (which is why the client parses the body regardless of status),
       so passing the body and status straight through preserves the existing behaviour
       exactly — including `quota_exceeded` and `error` shapes the backend itself emits. */
    const text = await upstream.text()
    return new Response(text, {
      status: upstream.status,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    // Backend too slow. Same `error` shape, so the client retries or falls back.
    if (err?.name === 'TimeoutError') {
      return json({ source: 'error', message: 'Upstream timeout' })
    }
    // Backend unreachable. The client treats a thrown error and an `error` source the
    // same way — keyword fallback — so this stays consistent with a network failure.
    return json({ source: 'error', message: 'Upstream request failed' })
  }
}
