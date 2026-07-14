// Vercel Edge Middleware — runs BEFORE the SPA for social crawlers.
// Bots don't execute JavaScript, so they never see React-injected meta tags.
// This intercepts /blog/:slug requests from crawlers, fetches the blog data
// from the API, and returns a lightweight HTML page with proper OG tags.

export const config = {
  matcher: ["/blog/:path+"],
};

const CRAWLERS =
  /facebookexternalhit|twitterbot|linkedinbot|discordbot|slackbot|telegrambot|whatsapp|googlebot|bingbot|applebot|pinterestbot|redditbot/i;

const API_BASE = "https://api.futurisesolutions.com";
const SITE_URL = "https://www.futurisesolutions.com";

function esc(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export default async function middleware(request) {
  const ua = request.headers.get("user-agent") || "";

  // Only intercept social/search crawlers — regular users get the React SPA
  if (!CRAWLERS.test(ua)) return;

  const { pathname } = new URL(request.url);
  const slug = pathname.replace(/^\/blog\//, "").replace(/\/$/, "");
  if (!slug) return;

  try {
    const apiRes = await fetch(`${API_BASE}/api/blogs/${slug}`, {
      headers: { "User-Agent": "VercelMiddleware/1.0" },
      signal: AbortSignal.timeout(5000),
    });

    if (!apiRes.ok) return;
    const blog = await apiRes.json();
    if (!blog?.title) return;

    const title       = esc(blog.meta?.metaTitle      || blog.title);
    const description = esc(blog.meta?.metaDescription || blog.shortDescription);
    const image       = esc(blog.featuredImage);
    const keywords    = esc((blog.meta?.metaKeywords || blog.tags || []).join(", "));
    const canonical   = `${SITE_URL}/blog/${slug}`;
    const published   = blog.createdAt || new Date().toISOString();
    const modified    = blog.updatedAt  || published;

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>${title}</title>
<meta name="description" content="${description}">
<meta name="keywords" content="${keywords}">
<meta name="robots" content="index, follow">
<meta name="author" content="Futurise Solutions">

<link rel="canonical" href="${canonical}">

<!-- Open Graph -->
<meta property="og:type"        content="article">
<meta property="og:url"         content="${canonical}">
<meta property="og:site_name"   content="Futurise Solutions">
<meta property="og:title"       content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:image"       content="${image}">
<meta property="og:image:width"  content="1200">
<meta property="og:image:height" content="630">
<meta property="article:published_time" content="${published}">
<meta property="article:modified_time"  content="${modified}">

<!-- Twitter -->
<meta name="twitter:card"        content="summary_large_image">
<meta name="twitter:site"        content="@futurisehq">
<meta name="twitter:title"       content="${title}">
<meta name="twitter:description" content="${description}">
<meta name="twitter:image"       content="${image}">

<!-- Redirect browsers that somehow hit this (edge case) -->
<meta http-equiv="refresh" content="0;url=${canonical}">
</head>
<body>
<p>Loading… <a href="${canonical}">${title}</a></p>
</body>
</html>`;

    return new Response(html, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
        "X-OG-Served-By": "futurise-middleware",
      },
    });
  } catch {
    // Any error → fall through to the normal SPA
    return;
  }
}
