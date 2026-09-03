/**
 * The CMS API origin, for code that runs on the server (Edge Middleware and the
 * functions in api/).
 *
 * WHY THIS FILE EXISTS
 * The origin was hardcoded as `https://api.futurisesolutions.com` in two places —
 * middleware.js and api/blog-fallback.js — and that host stopped answering. DNS still
 * resolves it (129.121.98.78) but nothing listens on 80 or 443, so every request hangs
 * until it times out.
 *
 * Both callers fail open by design, which is the right behaviour for a backend blip but
 * meant this outage was silent: articles kept serving, just as an empty <div id="root">.
 * A crawler asking for a post received 12 words, no <h1> and no <article>, while a human
 * saw the full page because the SPA fetched the content client-side from a *different*,
 * working origin. Nothing errored anywhere.
 *
 * Centralising the value means the next move of the API is one edit, and — more to the
 * point — that the server and the browser can no longer disagree about where the CMS is.
 * That disagreement is what made the failure invisible.
 *
 * CONFIGURATION
 * `VITE_API_BASE_URL` is the same variable the browser bundle uses (src/config.js), so a
 * single Vercel setting keeps both halves pointing at one origin. The VITE_ prefix only
 * means "safe to expose to the client" — it is an ordinary environment variable to
 * `process.env` here, and this value is a public URL either way.
 *
 * `API_BASE_URL` is read first as an unprefixed, server-only override, for the case where
 * the edge should talk to an internal origin the browser must not be given.
 *
 * MUST BE AN ORIGIN, NOT A PATH
 * Callers append their own paths (`/api/blogs/:slug`), exactly as the client's `apiUrl()`
 * does. A value carrying a `/api/blogs` suffix produced `/api/blogs/api/blogs/...` and a
 * 404 — that was a real incident, so the suffix is stripped defensively below rather than
 * trusted. Any trailing slash goes too, for the same reason.
 */

// No production fallback to the dead host: defaulting to a known-broken origin is how
// this failure survived unnoticed. An unset variable should be loud, not quietly wrong.
const RAW = process.env.API_BASE_URL || process.env.VITE_API_BASE_URL || "";

/**
 * Reduce whatever is configured to a bare origin (scheme + host [+ port]).
 *
 * Using the URL parser rather than string surgery means a value with a path, a query, a
 * fragment or a trailing slash all collapse to the same correct result.
 */
function toOrigin(value) {
  const trimmed = String(value || "").trim();
  if (!trimmed) return "";
  try {
    return new URL(trimmed).origin;
  } catch {
    // Not parseable as a URL — most likely a bare host. Assume https and retry once,
    // so "api.example.com" is usable rather than silently empty.
    try {
      return new URL(`https://${trimmed.replace(/^\/+/, "")}`).origin;
    } catch {
      return "";
    }
  }
}

export const API_BASE = toOrigin(RAW);

/** True when an API origin is configured; callers use this to fail open deliberately. */
export const hasApiBase = Boolean(API_BASE);

/**
 * Build a full CMS URL from a path.
 *
 * Returns null when no origin is configured, so a caller must handle the missing case
 * explicitly instead of accidentally fetching a relative path against its own deployment
 * (which would 404 in a way that looks like a missing post).
 */
export function cmsUrl(path) {
  if (!API_BASE) return null;
  const p = String(path || "");
  return `${API_BASE}${p.startsWith("/") ? "" : "/"}${p}`;
}
