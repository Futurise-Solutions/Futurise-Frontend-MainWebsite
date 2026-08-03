// Vercel Edge Middleware — server-side rendering for /blog/:slug.
//
// WHY THIS EXISTS
// The site is a client-rendered SPA, so the raw HTML it ships is an empty
// <div id="root"></div>. Blog posts are 48 of the 68 URLs in sitemap.xml, and blog
// content lives in the CMS API rather than in the repo, so it cannot be baked in at
// build time without a redeploy per post. This middleware renders the real article —
// headings, body copy, structured data — at the edge for any bot that cannot run JS.
//
// Search crawlers index the body copy instead of an empty root; AI crawlers (which do
// not execute JavaScript at all) can finally read and cite the articles; social
// crawlers still get their Open Graph tags. Human visitors fall straight through to
// the React SPA and never see this output.

import { marked } from "marked";
import { gfmHeadingId } from "marked-gfm-heading-id";
// Shared with the SPA so the byline a crawler sees and the byline a human sees can never
// disagree. Resolves to a named Person once TEAM_PUBLISHED is set, Organization until
// then — see src/utils/Constant/team.js.
import { articleAuthor, articleAuthorName } from "./src/utils/Constant/team.js";

export const config = {
  matcher: ["/blog/:path+"],
};

// Search engines + AI answer engines + social unfurlers. AI crawlers are the reason
// this list matters most: none of them execute JavaScript, so without this they see
// nothing at all.
const CRAWLERS = new RegExp(
  [
    // Search
    "googlebot", "google-inspectiontool", "bingbot", "applebot", "duckduckbot",
    "yandexbot", "baiduspider", "slurp",
    // AI answer engines
    "gptbot", "oai-searchbot", "chatgpt-user", "claudebot", "claude-searchbot",
    "claude-user", "anthropic-ai", "perplexitybot", "perplexity-user",
    "google-extended", "googleother", "ccbot", "bytespider", "amazonbot",
    "applebot-extended", "meta-externalagent", "meta-externalfetcher",
    "cohere-ai", "diffbot", "omgili", "timpibot", "youbot",
    // Social unfurlers
    "facebookexternalhit", "twitterbot", "linkedinbot", "discordbot", "slackbot",
    "telegrambot", "whatsapp", "pinterestbot", "redditbot", "skypeuripreview",
    "embedly", "quora link preview", "nuzzel", "vkshare", "tumblr",
  ].join("|"),
  "i"
);

const API_BASE = "https://api.futurisesolutions.com";
const SITE_URL = "https://www.futurisesolutions.com";
const ORG_ID = `${SITE_URL}/#organization`;

// Posts open with a Table of Contents linking to "#github-style-slug" anchors, so
// headings must carry matching ids. marked dropped built-in heading ids in v5; this
// extension reproduces GitHub's exact slug algorithm, which is what the CMS assumes.
marked.use(gfmHeadingId());
marked.setOptions({ gfm: true, breaks: false });

// Escape for use inside an HTML attribute or text node.
function esc(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// JSON-LD is injected inside a <script> block, so the only sequence that can break out
// is a literal "</script". Escaping the slash keeps the JSON valid and the tag intact.
function jsonLdSafe(obj) {
  return JSON.stringify(obj).replace(/<\/(script)/gi, "<\\/$1");
}

// Normalise the CMS body so the page has exactly one H1 (the title, which we emit
// ourselves). Two things break that: the body repeats the title as a leading H1, and
// some posts use a stray top-level heading mid-article (e.g. "# Related Articles").
// Headings inside fenced code blocks are left alone — a leading "#" there is a comment.
function normalizeArticleMarkdown(markdown) {
  const withoutTitle = String(markdown ?? "").replace(/^\s*#\s+.*(?:\r?\n)+/, "");
  return withoutTitle
    .split(/(```[\s\S]*?```|~~~[\s\S]*?~~~)/g)
    .map((chunk, i) => (i % 2 === 1 ? chunk : chunk.replace(/^#\s+/gm, "## ")))
    .join("");
}

// Plain-text excerpt used as a description fallback when the CMS has no metaDescription.
function excerpt(markdown, max = 160) {
  const text = String(markdown ?? "")
    .replace(/^#+\s+.*$/gm, "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[*_`>#|-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
}

export default async function middleware(request) {
  const ua = request.headers.get("user-agent") || "";

  // Humans get the React SPA — this path is for bots only.
  if (!CRAWLERS.test(ua)) return;

  const { pathname } = new URL(request.url);
  const slug = pathname.replace(/^\/blog\//, "").replace(/\/$/, "");
  if (!slug || slug.includes("/")) return;

  try {
    const apiRes = await fetch(`${API_BASE}/api/blogs/${slug}`, {
      headers: { "User-Agent": "FuturisePrerender/2.0" },
      signal: AbortSignal.timeout(8000),
    });

    if (!apiRes.ok) return;
    const payload = await apiRes.json();
    const blog = payload?.blog || payload?.data || payload;
    if (!blog?.title) return;

    const canonical = `${SITE_URL}/blog/${slug}`;
    const title = blog.meta?.metaTitle || blog.title;
    const description =
      blog.meta?.metaDescription || blog.shortDescription || excerpt(blog.content);
    const keywords = []
      .concat(blog.meta?.metaKeywords || [], blog.tags || [])
      .filter(Boolean)
      .join(", ");
    const image = blog.featuredImage || `${SITE_URL}/home.png`;
    const category = blog.category || "";
    // A per-post author from the CMS wins; otherwise fall back to the site-wide byline,
    // which becomes a named person as soon as the team is published.
    const author = blog.author?.name || blog.author || articleAuthorName();
    const authorNode =
      blog.author?.name || blog.author
        ? { "@type": "Person", name: author }
        : articleAuthor();
    const published = blog.publishedAt || blog.createdAt || new Date().toISOString();
    const modified = blog.updatedAt || published;
    const robots = blog.meta?.robots || "index, follow";

    // The whole point: render the actual article body, not a placeholder.
    const articleHtml = marked.parse(normalizeArticleMarkdown(blog.content || ""));

    const jsonLd = [
      {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "@id": `${canonical}#article`,
        headline: blog.title,
        description,
        image: [image],
        datePublished: published,
        dateModified: modified,
        author: authorNode,
        publisher: { "@id": ORG_ID },
        mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
        url: canonical,
        ...(category ? { articleSection: category } : {}),
        ...(blog.tags?.length ? { keywords: blog.tags.join(", ") } : {}),
        inLanguage: "en",
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
          { "@type": "ListItem", position: 3, name: blog.title, item: canonical },
        ],
      },
    ];

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>${esc(title)} | Futurise Solutions</title>
<meta name="description" content="${esc(description)}">
${keywords ? `<meta name="keywords" content="${esc(keywords)}">` : ""}
<meta name="robots" content="${esc(robots)}, max-image-preview:large">
<meta name="author" content="${esc(author)}">

<link rel="canonical" href="${esc(canonical)}">

<meta property="og:type" content="article">
<meta property="og:url" content="${esc(canonical)}">
<meta property="og:site_name" content="Futurise Solutions">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:image" content="${esc(image)}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="en">
<meta property="article:published_time" content="${esc(published)}">
<meta property="article:modified_time" content="${esc(modified)}">
${category ? `<meta property="article:section" content="${esc(category)}">` : ""}

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@futurisehq">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${esc(image)}">

<script type="application/ld+json">${jsonLdSafe(jsonLd)}</script>
</head>
<body>
<nav aria-label="Breadcrumb">
  <a href="${SITE_URL}/">Home</a> ›
  <a href="${SITE_URL}/blog">Blog</a> ›
  <span>${esc(blog.title)}</span>
</nav>

<main>
<article>
  <h1>${esc(blog.title)}</h1>
  <p>
    ${category ? `<span>${esc(category)}</span> · ` : ""}
    <span>By ${esc(author)}</span> ·
    <time datetime="${esc(published)}">${esc(String(published).slice(0, 10))}</time>
  </p>
  ${image ? `<img src="${esc(image)}" alt="${esc(blog.title)}" width="1200" height="630">` : ""}
  ${blog.shortDescription ? `<p><strong>${esc(blog.shortDescription)}</strong></p>` : ""}

  ${articleHtml}
</article>
</main>

<!-- The same offer the SPA shows readers at the end of an article. Stated as plain
     facts because this is the copy answer engines quote when someone asks how to
     engage the company. -->
<section>
  <h2>Work with Futurise Solutions</h2>
  <p>Futurise Solutions builds AI agents, SaaS platforms, web apps and mobile apps for
     businesses in New Zealand, the United Arab Emirates, the United States, Canada and
     India. Every engagement begins with a free 45-minute consultation and a
     fixed-scope estimate rather than open-ended hourly billing, and we sign your NDA
     before reviewing anything confidential.</p>
  <p>
    <a href="${SITE_URL}/contact">Book a free consultation</a> ·
    <a href="mailto:business@futurisesolutions.com">business@futurisesolutions.com</a>
  </p>
</section>

<footer>
  <h2>Futurise Solutions</h2>
  <p>Software development studio building AI agents, SaaS platforms, web and mobile
     apps for clients in New Zealand, the UAE, the United States, Canada and India.</p>
  <nav aria-label="Services">
    <a href="${SITE_URL}/service/ai-ml-solutions">AI &amp; ML Solutions</a>
    <a href="${SITE_URL}/service/web-development">Web Development</a>
    <a href="${SITE_URL}/service/app-development">App Development</a>
    <a href="${SITE_URL}/service/ui-ux-design">UI/UX Design</a>
    <a href="${SITE_URL}/service/blockchain-development">Blockchain Development</a>
    <a href="${SITE_URL}/service/digital-marketing">Digital Marketing</a>
  </nav>
  <nav aria-label="Company">
    <a href="${SITE_URL}/about">About</a>
    <a href="${SITE_URL}/portfolio">Portfolio</a>
    <a href="${SITE_URL}/case-studies">Case Studies</a>
    <a href="${SITE_URL}/blog">Blog</a>
    <a href="${SITE_URL}/contact">Contact</a>
  </nav>
</footer>
</body>
</html>`;

    return new Response(html, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "public, max-age=600, s-maxage=3600, stale-while-revalidate=86400",
        "X-Rendered-By": "futurise-edge-ssr",
      },
    });
  } catch {
    // Any failure → fall through to the SPA rather than serving a broken page.
    return;
  }
}
