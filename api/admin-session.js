import { hasValidSession } from "./_lib/adminSession.js";

/**
 * GET /api/admin-session
 *
 * Lets the dashboard ask the server whether the current cookie is still valid, so a
 * refresh does not force a re-login and an expired token drops straight back to the gate.
 * The client cannot answer this itself — the cookie is HttpOnly by design.
 */
export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Never cache an auth answer at the edge or in the browser.
  res.setHeader("Cache-Control", "no-store, max-age=0");

  return res.status(200).json({
    authenticated: hasValidSession(req),
    configured: Boolean(process.env.ADMIN_PASSWORD),
  });
}
