// Central runtime config.
//
// IMPORTANT: every VITE_* value is inlined into the client bundle at build time and is
// therefore public. Treat anything here as readable by anyone who opens devtools. Real
// secrets belong on the API server, never in this file.

// API base URL — set VITE_API_BASE_URL per environment.
//
// MUST BE AN ORIGIN, WITH NO PATH: `apiUrl()` below appends "/api/blogs" and friends, so
// a value ending in "/api/blogs" produces "/api/blogs/api/blogs/..." and a 404. That has
// happened.
//
// There is deliberately no hardcoded fallback origin. This used to default to
// "https://api.futurisesolutions.com", which later stopped responding — and a default
// that points at a dead host is worse than no default at all, because every caller then
// fails slowly (connection timeout) instead of immediately, and the misconfiguration
// looks like a backend outage. An empty base makes requests resolve against the site's
// own origin, which fails fast and visibly in the network panel.
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

// The admin password is deliberately NOT here any more. It used to be
// `import.meta.env.VITE_ADMIN_PASSWORD`, which Vite inlines into public JavaScript —
// the password was readable in devtools, so the gate protected nothing.
//
// It now lives in the server-only `ADMIN_PASSWORD` variable and is validated by
// /api/admin-login. See api/_lib/adminSession.js.

const join = (base, path) =>
  `${base}${String(path).startsWith("/") ? "" : "/"}${path}`;

// Build a full API endpoint URL.
export const apiUrl = (endpoint) => join(API_BASE_URL, endpoint);

// Resolve an image path returned by the API (e.g. "/uploads/blogs/x.webp") to a
// full URL. Absolute URLs are returned untouched.
export const mediaUrl = (path) => {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  return join(API_BASE_URL, path);
};
