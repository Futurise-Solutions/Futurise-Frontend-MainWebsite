/**
 * GET /api/blog-fallback?slug=:slug  —  reached only via the /blog/:slug rewrite.
 *
 * WHY THIS EXISTS
 * Vercel applies rewrites only after the filesystem check, so a published post is
 * served straight from its prerendered file and never touches this function. The
 * rewrite fires for exactly two cases, and they are indistinguishable from the edge:
 *
 *   1. a slug that does not exist          -> must answer 404
 *   2. a post published since the last build, so it has no static file yet -> must render
 *
 * Only the CMS can tell them apart, so the lookup happens here rather than in
 * middleware.js. That keeps it off the hot path: readers of the ~52 built posts pay
 * nothing (~64ms from the CDN), and the lookup is spent only on slugs that are
 * genuinely ambiguous.
 *
 * Previously both cases answered 200 with the prerendered homepage, which made every
 * malformed blog URL an indexable duplicate of the front page.
 */

const API_BASE = "https://api.futurisesolutions.com";
const SITE_URL = "https://www.futurisesolutions.com";

// Minimal body used only if the origin cannot serve its own 404 page. By this point
// the post is known not to exist, and the status code matters more than the design.
const FALLBACK_404 =
  '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8">' +
  "<title>Page Not Found (404) | Futurise Solutions</title>" +
  '<meta name="robots" content="noindex, follow"></head><body>' +
  "<h1>Page not found</h1>" +
  `<p><a href="${SITE_URL}/blog">Back to Blog</a></p></body></html>`;

async function originFile(origin, path, timeoutMs = 3000) {
  try {
    const res = await fetch(`${origin}${path}`, { signal: AbortSignal.timeout(timeoutMs) });
    if (res.ok) return await res.text();
  } catch {
    // Fall through to the caller's default.
  }
  return null;
}

export default async function handler(req, res) {
  const origin = `https://${req.headers.host || "www.futurisesolutions.com"}`;
  const slug = String(req.query?.slug || "").trim();

  const send404 = async () => {
    const body = (await originFile(origin, "/404.html")) || FALLBACK_404;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=60, s-maxage=3600");
    res.setHeader("X-Rendered-By", "futurise-blog-fallback-404");
    return res.status(404).send(body);
  };

  // Serve the SPA shell so the app boots at this URL and renders the post itself.
  // Used for a post that exists in the CMS but has not been built yet, and as the
  // fail-open answer when the CMS cannot be reached.
  const sendShell = async () => {
    const body = await originFile(origin, "/index.html");
    if (body === null) return send404();
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
    res.setHeader("X-Rendered-By", "futurise-blog-fallback-shell");
    return res.status(200).send(body);
  };

  if (!slug) return send404();

  let apiRes;
  try {
    apiRes = await fetch(`${API_BASE}/api/blogs/${encodeURIComponent(slug)}`, {
      headers: { "User-Agent": "FuturiseBlogFallback/1.0" },
      signal: AbortSignal.timeout(5000),
    });
  } catch {
    // Timeout or network error. Fail open: never 404 a post because the CMS blipped.
    return sendShell();
  }

  // An explicit 404 from the CMS is the only thing allowed to produce a 404.
  if (apiRes.status === 404) return send404();

  // 5xx or any other non-ok is a backend problem, not a missing post — fail open.
  return sendShell();
}
