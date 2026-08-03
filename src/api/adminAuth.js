/**
 * Admin auth — client side of the server-validated session.
 *
 * These call this site's own /api/* functions, not the CMS. The session lives in an
 * HttpOnly cookie, so there is nothing to read or store here: the browser attaches it
 * automatically and JavaScript cannot see it.
 */

// Same-origin requests send the cookie by default, but "same-origin" is stated
// explicitly so the intent survives any future base-URL change.
const opts = { credentials: "same-origin", headers: { "Content-Type": "application/json" } };

/**
 * @returns {Promise<boolean>} true when the password was accepted.
 * @throws {Error} "not-configured" when the deployment has no ADMIN_PASSWORD set.
 */
export async function adminLogin(password) {
  const res = await fetch("/api/admin-login", {
    ...opts,
    method: "POST",
    body: JSON.stringify({ password }),
  });
  if (res.status === 503) throw new Error("not-configured");
  if (res.status === 401) return false;
  if (!res.ok) throw new Error(`Login failed (${res.status})`);
  return true;
}

/** Whether the current cookie is still a valid session. */
export async function adminSession() {
  try {
    const res = await fetch("/api/admin-session", { ...opts, method: "GET", cache: "no-store" });
    if (!res.ok) return false;
    const data = await res.json();
    return Boolean(data?.authenticated);
  } catch {
    // Network failure must fall back to the gate, never to an assumed session.
    return false;
  }
}

export async function adminLogout() {
  try {
    await fetch("/api/admin-logout", { ...opts, method: "POST" });
  } catch {
    // The cookie expires on its own; a failed logout call must not trap the user in the
    // dashboard, so the caller clears local state regardless.
  }
}
