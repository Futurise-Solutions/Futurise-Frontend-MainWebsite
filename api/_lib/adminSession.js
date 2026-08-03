/**
 * Admin session — server-side only
 * ================================
 * Runs in Vercel's Node runtime and is never bundled into the client, which is the whole
 * point. The previous gate compared the typed password against
 * `import.meta.env.VITE_ADMIN_PASSWORD`, and every `VITE_*` value is inlined into the
 * public JavaScript at build time — the password was readable in devtools.
 *
 * Now: the password lives in `ADMIN_PASSWORD` (no VITE_ prefix, so Vite cannot see it),
 * is compared here in constant time, and a valid login gets an HMAC-signed, expiring
 * token in an HttpOnly cookie that JavaScript cannot read.
 */
import crypto from "node:crypto";

export const COOKIE_NAME = "fs_admin_session";

/** 8 hours — long enough for a working session, short enough that a leaked token dies. */
const TTL_MS = 8 * 60 * 60 * 1000;

/**
 * `ADMIN_SESSION_SECRET` is preferred so rotating the password need not invalidate live
 * sessions. Falling back to the password keeps first-time setup to one variable.
 */
function signingKey() {
  const key = process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD;
  if (!key) throw new Error("ADMIN_SESSION_SECRET or ADMIN_PASSWORD must be set");
  return key;
}

const sign = (payload) => crypto.createHmac("sha256", signingKey()).update(payload).digest("hex");

/**
 * Constant-time compare. Hashing first keeps it constant-time with respect to length as
 * well as content, and avoids timingSafeEqual throwing on a length mismatch.
 */
function safeEqual(a, b) {
  const hashA = crypto.createHash("sha256").update(String(a), "utf8").digest();
  const hashB = crypto.createHash("sha256").update(String(b), "utf8").digest();
  return crypto.timingSafeEqual(hashA, hashB);
}

/** Check a submitted password against the configured one. */
export function passwordMatches(submitted) {
  const configured = process.env.ADMIN_PASSWORD;
  // Unset must never mean "anything works".
  if (!configured) return false;
  if (typeof submitted !== "string" || submitted.length === 0) return false;
  return safeEqual(submitted, configured);
}

export function createToken() {
  const expiresAt = String(Date.now() + TTL_MS);
  return `${expiresAt}.${sign(expiresAt)}`;
}

export function verifyToken(token) {
  if (typeof token !== "string") return false;
  const dot = token.lastIndexOf(".");
  if (dot < 1) return false;

  const payload = token.slice(0, dot);
  let expected;
  try {
    expected = sign(payload);
  } catch {
    return false; // key not configured
  }
  if (!safeEqual(token.slice(dot + 1), expected)) return false;

  const expiresAt = Number(payload);
  return Number.isFinite(expiresAt) && Date.now() < expiresAt;
}

/** Pull our cookie out of the raw header without adding a dependency. */
function readSessionCookie(req) {
  const header = req.headers?.cookie;
  if (!header) return null;
  for (const part of header.split(";")) {
    const eq = part.indexOf("=");
    if (eq !== -1 && part.slice(0, eq).trim() === COOKIE_NAME) {
      return decodeURIComponent(part.slice(eq + 1).trim());
    }
  }
  return null;
}

/**
 * HttpOnly         — unreadable from JavaScript, so XSS cannot steal the session
 * Secure           — https only
 * SameSite=Strict  — never sent cross-site, which removes CSRF without a second token
 */
export const sessionCookie = (token) =>
  `${COOKIE_NAME}=${encodeURIComponent(token)}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${Math.floor(TTL_MS / 1000)}`;

export const clearedCookie = () =>
  `${COOKIE_NAME}=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0`;

/** True when the request carries a valid, unexpired session. */
export const hasValidSession = (req) => verifyToken(readSessionCookie(req));

/*
 * SCOPE — this secures the admin dashboard, not the data behind it.
 *
 * src/api/blogs.js calls the CMS directly with no credentials, so POST/PUT/DELETE on
 * api.futurisesolutions.com are reachable with curl regardless of this gate. Closing that
 * requires the CMS to authenticate writes itself; that change lives in the backend
 * repository, not here.
 */
