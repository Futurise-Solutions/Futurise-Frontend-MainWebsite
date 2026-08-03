import { clearedCookie } from "./_lib/adminSession.js";

/**
 * POST /api/admin-logout
 *
 * Expires the session cookie. POST rather than GET so a prefetch or an <img> tag on some
 * other page cannot log the user out.
 */
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  res.setHeader("Set-Cookie", clearedCookie());
  return res.status(200).json({ authenticated: false });
}
