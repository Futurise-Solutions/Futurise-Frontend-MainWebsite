/**
 * POST-BUILD GUARDS — the Next replacement for prerender.js's build assertions (D16).
 *
 * The old prerender.js did two jobs: it generated static HTML, and it ASSERTED that the
 * HTML it generated was not silently broken. Next's own build replaces the first job
 * entirely. The second job has no replacement, and each assertion below exists because
 * the failure it catches has actually shipped.
 *
 * Run AFTER `next build`, against `.next/server/app`. Exits non-zero on any failure, so
 * the build fails rather than deploying a quietly broken site.
 *
 * Thresholds are read from prerender.js, not invented:
 *   HUB_ROUTES  /blog >= 5 links to /blog/, /case-studies >= 5 links to /case-studies/
 *   zeroedStats a gradient-text span rendering "0", "0+" or "0%"
 *   sitemap     refuse-to-ship when the blog section is missing
 */
import fs from 'fs'
import path from 'path'

const APP_DIR = path.join(process.cwd(), '.next', 'server', 'app')
const failures = []

/** Every prerendered .html Next produced, keyed by the route it corresponds to. */
function collectHtml(dir, base = '') {
  const out = new Map()
  if (!fs.existsSync(dir)) return out
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      for (const [k, v] of collectHtml(full, `${base}/${entry.name}`)) out.set(k, v)
    } else if (entry.name.endsWith('.html')) {
      const name = entry.name.replace(/\.html$/, '')
      const route = name === 'index' ? base || '/' : `${base}/${name}`
      out.set(route, fs.readFileSync(full, 'utf8'))
    }
  }
  return out
}

/* ── GUARD 1: zeroed stats ──────────────────────────────────────────────────
   The home-page stat band counts up on scroll. Any animation that starts at zero
   renders zero for a crawler, and this one has shipped as "0+ Projects delivered"
   TWICE — once from a sensor that reset on scroll-away, once from a fallback that
   rendered 0 when the sensor never fired. Invisible in a browser, obvious to Googlebot.
   Ported verbatim from prerender.js's zeroedStats(). */
function zeroedStats(html) {
  const band = html.match(/gradient-text[^>]*>\s*<span>([\s\S]{0,40}?)<\/span>/g) || []
  return band.filter((s) => /<span>\s*0\+?\s*<\/span>|>\s*0%\s*</.test(s)).length
}

/* ── GUARD 2: broken hubs ───────────────────────────────────────────────────
   A hub page whose children never arrive means the CMS fetch failed. The page still
   renders, still has an h1 and schema, and still passes every other check — it is just
   empty. Thresholds are prerender.js's HUB_ROUTES, unchanged. */
const HUB_ROUTES = [
  { route: '/blog', prefix: '/blog/', min: 5 },
  { route: '/case-studies', prefix: '/case-studies/', min: 5 },
]

function hubLinkCount(html, prefix) {
  const hrefs = html.match(/href="([^"]+)"/g) || []
  return hrefs.filter((h) => h.includes(`href="${prefix}`)).length
}

const pages = collectHtml(APP_DIR)

if (pages.size === 0) {
  failures.push(
    'No prerendered HTML found under .next/server/app — did `next build` run, and did it succeed?'
  )
}

for (const [route, html] of pages) {
  const zeroed = zeroedStats(html)
  if (zeroed > 0) {
    failures.push(
      `${route} prerendered ${zeroed} stat(s) as "0" — a count-up animation was captured ` +
        `before it ran. Crawlers will read the zeros.`
    )
  }
}

for (const { route, prefix, min } of HUB_ROUTES) {
  const html = pages.get(route)
  if (!html) continue // not prerendered (e.g. fully dynamic) — nothing to assert
  const found = hubLinkCount(html, prefix)
  if (found < min) {
    failures.push(
      `${route} rendered ${found} of the expected ${min}+ "${prefix}" links — the CMS ` +
        `fetch almost certainly failed. Re-run the build.`
    )
  }
}

/* ── GUARD 3: the sitemap must not silently retract the blog ────────────────
   The blog is the largest section of the site and the only part of the sitemap that
   depends on a network fetch at build time. When the API does not answer, the blog URLs
   simply vanish — the XML is still well-formed, the build still succeeds, and the file
   looks correct. Shipping it tells Google those posts are gone, which is far more
   expensive than failing the build. */
const SITEMAP_MIN_BLOG_URLS = 5

function readSitemap() {
  for (const p of [
    path.join(APP_DIR, 'sitemap.xml.body'),
    path.join(APP_DIR, 'sitemap.xml', 'route.body'),
    path.join(process.cwd(), '.next', 'server', 'app', 'sitemap.xml.body'),
  ]) {
    if (fs.existsSync(p)) return fs.readFileSync(p, 'utf8')
  }
  return null
}

/* ASSERT ON THE DATA, NOT THE ARTIFACT.

   The rendered sitemap.xml is not on disk under ISR — it is generated per request — so
   an earlier version of this guard could only log a note and hope. But sitemap.ts builds
   its blog section from getBlogs(), and that same call can be made here. Counting the
   published slugs directly fires correctly and cannot produce a false positive from a
   missing file. */
const sitemapFromDisk = readSitemap()
let blogUrls = null

if (sitemapFromDisk !== null) {
  blogUrls = (sitemapFromDisk.match(/<loc>[^<]*\/blog\/[^<]*<\/loc>/g) || []).length
} else {
  /* Fetch and filter directly rather than importing lib/blog.ts — plain Node cannot load
     a .ts module, and adding a transpile step to a build guard makes the guard itself a
     thing that can break. The two rules that matter are duplicated in full here, and
     they are the whole contract: bare-array envelope, status === 'published'. */
  const API_ORIGIN =
    process.env.BLOG_API_ORIGIN || 'https://futurise-backend-main-website.vercel.app'
  try {
    const res = await fetch(`${API_ORIGIN}/api/blogs`)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    const list = Array.isArray(data) ? data : []
    blogUrls = list.filter((b) => b?.status === 'published').length
  } catch (err) {
    failures.push(
      `Could not count published blog slugs for the sitemap guard: ${err?.message || err}. ` +
        `The guard cannot confirm the blog section is present, so this build is not deployable.`
    )
  }
}

if (blogUrls !== null && blogUrls < SITEMAP_MIN_BLOG_URLS) {
  failures.push(
    `Only ${blogUrls} published blog post(s) will reach the sitemap (expected >= ${SITEMAP_MIN_BLOG_URLS}). ` +
      `The blog API probably did not answer. Shipping this retracts those posts from Google.`
  )
} else if (blogUrls !== null) {
  console.log(`✅ sitemap blog section: ${blogUrls} published post(s)`)
}

/* ── report ─────────────────────────────────────────────────────────────── */
console.log(`\npost-build guards — ${pages.size} prerendered page(s) checked`)
if (failures.length) {
  for (const f of failures) console.error(`❌ ${f}`)
  console.error(`\n${failures.length} guard(s) FAILED — not deployable.`)
  process.exit(1)
}
console.log('✅ all guards passed')
