import { passwordMatches, createToken, sessionCookie } from "./_lib/adminSession.js";

/**
 * POST /api/admin-login  { password }
 *
 * Validates the password server-side and, on success, sets the HttpOnly session cookie.
 * The password never reaches the client bundle and the response never echoes it back.
 */
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  // A missing ADMIN_PASSWORD is a misconfiguration, not a failed login. Say so plainly
  // rather than reporting "wrong password" and sending someone hunting for a typo.
  if (!process.env.ADMIN_PASSWORD) {
    return res.status(503).json({ error: "Admin access is not configured for this deployment." });
  }

  const password = req.body?.password;

  if (!passwordMatches(password)) {
    // Small fixed delay. It will not stop a determined attacker — that needs a rate
    // limiter with shared state — but it makes casual online guessing impractical
    // without introducing a timing signal of its own.
    await new Promise((resolve) => setTimeout(resolve, 400));
    return res.status(401).json({ error: "Incorrect password" });
  }

  res.setHeader("Set-Cookie", sessionCookie(createToken()));
  return res.status(200).json({ authenticated: true });
}
