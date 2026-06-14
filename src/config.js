// Central runtime config.
// API base URL — override per-environment with VITE_API_BASE_URL in a .env file.
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://api.futurisesolutions.com:5000";

// Admin dashboard password (gate only — not real auth). Override with VITE_ADMIN_PASSWORD.
export const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "futurise-admin";

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
