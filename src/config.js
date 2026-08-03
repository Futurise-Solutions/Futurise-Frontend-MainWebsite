// Central runtime config.
//
// IMPORTANT: every VITE_* value is inlined into the client bundle at build time and is
// therefore public. Treat anything here as readable by anyone who opens devtools. Real
// secrets belong on the API server, never in this file.

// API base URL — set VITE_API_BASE_URL per environment.
//
// The fallback is https and portless to match the production API. It previously read
// "http://api.futurisesolutions.com:5000", which an https page cannot call at all
// (mixed content), so a deploy that forgot the env var broke every blog page silently
// rather than loudly.
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://api.futurisesolutions.com";

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
