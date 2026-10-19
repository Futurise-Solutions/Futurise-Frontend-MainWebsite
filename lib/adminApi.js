/**
 * Admin CMS client — the browser side.
 *
 * Ported from src/api/blogs.js and src/api/adminAuth.js, with ONE structural change that
 * is the entire point of Phase 5.5:
 *
 *   OLD:  browser  ──────────────────────────────────►  CMS      (no credential at all)
 *   NEW:  browser ──► /api/admin/* (this server) ──►  CMS      (X-Admin-Key on hop 2)
 *
 * The old layer called `apiUrl("/api/blogs")`, i.e. the CMS origin, directly from the
 * browser with no credential — which is why the old login could only hide the dashboard
 * UI and every write stayed reachable with curl. Its own source said so.
 *
 * ⚠️ EVERY FUNCTION HERE MUST TARGET A RELATIVE /api/admin/* PATH. Never reintroduce the
 * CMS origin in this file. The admin key lives only on the server; a call that goes
 * straight to the CMS from here will now fail with 401 (because the CMS finally checks),
 * and "fixing" that by shipping the key to the browser would publish it in the bundle.
 *
 * Reads that do NOT need auth — the public blog index and article pages — do not belong
 * here at all. They are server-rendered through lib/blog.ts.
 */

/** Same-origin, so the HttpOnly session cookie rides along automatically. */
const opts = { credentials: 'same-origin' }

async function request(endpoint, options = {}) {
  const res = await fetch(endpoint, {
    ...opts,
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    cache: 'no-store',
    ...options,
  })

  /**
   * 401 is surfaced as a distinct error so the dashboard can drop back to the login gate
   * rather than showing "save failed". An expired session is the single most likely
   * failure here — the cookie lasts 8 hours and a writing session can outlive it.
   */
  if (res.status === 401) throw new Error('unauthorized')
  if (res.status === 503) throw new Error('not-configured')
  if (!res.ok) throw new Error(`Request failed (${res.status})`)

  const text = await res.text()
  return text ? JSON.parse(text) : null
}

/* ── Blog CRUD ──────────────────────────────────────────────────────────── */

export const getAllBlogsAdmin = () => request('/api/admin/blogs')

export const createBlog = (body) =>
  request('/api/admin/blogs', { method: 'POST', body: JSON.stringify(body) })

export const updateBlog = (id, body) =>
  request(`/api/admin/blogs/${encodeURIComponent(id)}`, {
    method: 'PUT',
    body: JSON.stringify(body),
  })

export const deleteBlog = (id) =>
  request(`/api/admin/blogs/${encodeURIComponent(id)}`, { method: 'DELETE' })

/**
 * Image upload → { imageUrl, filename }. Field name is "image", matching the CMS's multer
 * config. No Content-Type is set: fetch generates it with the multipart boundary, and
 * setting it by hand breaks the upstream parse.
 */
export async function uploadImage(file) {
  const fd = new FormData()
  fd.append('image', file)

  const res = await fetch('/api/admin/upload', { ...opts, method: 'POST', body: fd })
  if (res.status === 401) throw new Error('unauthorized')
  if (!res.ok) throw new Error(`Upload failed (${res.status})`)
  return res.json()
}

/** Normalize whatever shape the list endpoint returns into an array. Ported verbatim. */
export const toBlogArray = (data) =>
  Array.isArray(data) ? data : data?.blogs || data?.data || []

/* ── Session ────────────────────────────────────────────────────────────── */

/**
 * @returns {Promise<boolean>} true when the password was accepted.
 * @throws {Error} "not-configured" when the deployment has no ADMIN_PASSWORD set.
 */
export async function adminLogin(password) {
  const res = await fetch('/api/admin/login', {
    ...opts,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  })
  if (res.status === 503) throw new Error('not-configured')
  if (res.status === 401) return false
  if (!res.ok) throw new Error(`Login failed (${res.status})`)
  return true
}

/** Whether the current cookie is still a valid session. */
export async function adminSession() {
  try {
    const res = await fetch('/api/admin/session', { ...opts, cache: 'no-store' })
    if (!res.ok) return false
    const data = await res.json()
    return Boolean(data?.authenticated)
  } catch {
    // Network failure must fall back to the gate, never to an assumed session.
    return false
  }
}

export async function adminLogout() {
  try {
    await fetch('/api/admin/logout', { ...opts, method: 'POST' })
  } catch {
    // The cookie expires on its own; a failed logout call must not trap the user in the
    // dashboard, so the caller clears local state regardless.
  }
}
