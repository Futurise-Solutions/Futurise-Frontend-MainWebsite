// Post-build prerenderer.
//
// The app is a client-rendered SPA, so `vite build` emits a single index.html whose
// body is an empty <div id="root"></div>. Search crawlers have to defer JavaScript
// rendering to a second pass, and AI crawlers (GPTBot, ClaudeBot, PerplexityBot,
// Google-Extended, CCBot …) never execute JavaScript at all — so they see nothing.
//
// This script loads every static route in headless Chrome, waits for React to finish,
// and writes the fully rendered DOM — headings, body copy, and the per-page JSON-LD
// that Seo.jsx injects at runtime — into dist/<route>/index.html. Crawlers then get
// real content in the raw HTML; browsers still boot React over it as before.
//
// Blog articles are deliberately NOT rendered here: they live in the CMS and are
// server-rendered per request by middleware.js, so they only need their meta tags
// baked in for the (rare) non-crawler direct hit.

import fs from 'fs';
import path from 'path';
import http from 'http';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';
import { caseStudies } from './src/utils/Constant/caseStudies.js';
import { COUNTRY_SLUGS } from './src/utils/Constant/countries.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Simple zero-dependency .env reader
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  envContent.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
      const [key, ...valueParts] = trimmed.split('=');
      const val = valueParts.join('=').trim();
      process.env[key.trim()] = val.replace(/^["']|["']$/g, '');
    }
  });
}

// Origin only — the paths below append "/api/blogs/...". A value carrying that suffix
// produced "/api/blogs/api/blogs/admin/all" and a 404, which read as "no posts" and
// silently dropped 82 blog URLs from the sitemap. Normalise rather than trust, and do not
// fall back to a hardcoded host: the previous default (api.futurisesolutions.com) has
// stopped responding, and a default that hangs is harder to diagnose than one that is
// absent. writeSitemap() refuses to write when the fetch fails, so an unset value fails
// the build instead of shipping a truncated sitemap.
const API_BASE_URL = (() => {
  const raw = (process.env.VITE_API_BASE_URL || '').trim();
  if (!raw) return '';
  try { return new URL(raw).origin; } catch { return raw.replace(/\/+$/, ''); }
})();
const SITE_URL = 'https://www.futurisesolutions.com';
const DIST_PATH = path.join(__dirname, 'dist');
const INDEX_HTML_PATH = path.join(DIST_PATH, 'index.html');
const PORT = Number(process.env.PRERENDER_PORT) || 41731;

// The intro loader runs ~1000ms on home and ~500ms elsewhere, plus a 420ms fade;
// CountUp stats animate for 2200ms. These waits keep a half-faded loader and
// half-counted "0+" stats out of the output.
//
// The loader itself no longer needs stripping from the captured markup: it lives in
// index.html as a sibling of #root (see the #fs-boot block there), and everything this
// script captures or counts is scoped to #root, so it is structurally invisible here.
// The removal pass below is kept anyway as a cheap guard against a future in-#root
// overlay reintroducing the problem.
const LOADER_MS = 1600;
const ANIMATION_MS = 2600;

/*
 * Hub pages whose cards come from the CMS at build time.
 *
 * When that fetch fails the page still renders its heading, intro and footer, so a
 * word-count check passes while the page carries zero links to its children. That has
 * already happened once: /blog shipped with 492 words and no links to any of its 46
 * posts, and the build still reported success. A hub with no children is the specific
 * failure worth catching, so it is asserted directly and fails the build.
 */
const HUB_ROUTES = [
  { route: '/blog', prefix: '/blog/', min: 5 },
  { route: '/case-studies', prefix: '/case-studies/', min: 5 },
];

/*
 * The home-page stat band counts up on scroll. Any animation that starts at zero renders
 * zero for a crawler, and this one has shipped as "0+ Projects delivered" twice — once
 * from a sensor that reset on scroll-away, once from a fallback that rendered 0 when the
 * sensor never fired at all. It is invisible in a browser and obvious to Googlebot, so
 * the built HTML is asserted directly.
 */
function zeroedStats(html) {
  const band = html.match(/gradient-text[^>]*>\s*<span>([\s\S]{0,40}?)<\/span>/g) || [];
  return band.filter((s) => /<span>\s*0\+?\s*<\/span>|>\s*0%\s*</.test(s)).length;
}

function brokenHubs(results) {
  return HUB_ROUTES.flatMap(({ route, prefix, min }) => {
    const rendered = results.find((r) => r.route === route);
    if (!rendered) return [];
    const found = (rendered.links || []).filter((href) => href.startsWith(prefix)).length;
    return found >= min ? [] : [{ route, prefix, min, found }];
  });
}

// Returned for every proxied API call so the app's fetches survive the localhost origin.
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Max-Age': '86400',
};

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.svg': 'image/svg+xml', '.webp': 'image/webp',
  '.ico': 'image/x-icon', '.woff': 'font/woff', '.woff2': 'font/woff2', '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml', '.webmanifest': 'application/manifest+json',
};

// ---------------------------------------------------------------------------
// Static server
// ---------------------------------------------------------------------------

// Serves real assets from dist, and the *pristine* build template for every route.
// Serving the template (rather than whatever is on disk) matters: without it a second
// prerender run would re-render its own previous output and compound it.
function startServer(template) {
  const server = http.createServer((req, res) => {
    let urlPath;
    try {
      urlPath = decodeURIComponent(new URL(req.url, `http://localhost:${PORT}`).pathname);
    } catch {
      urlPath = '/';
    }

    const filePath = path.join(DIST_PATH, urlPath);
    const isAsset =
      urlPath !== '/' &&
      filePath.startsWith(DIST_PATH) &&
      fs.existsSync(filePath) &&
      fs.statSync(filePath).isFile() &&
      path.extname(filePath) !== '.html';

    if (isAsset) {
      res.writeHead(200, { 'Content-Type': MIME[path.extname(filePath)] || 'application/octet-stream' });
      fs.createReadStream(filePath).pipe(res);
      return;
    }

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(template);
  });

  return new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(PORT, '127.0.0.1', () => resolve(server));
  });
}

// ---------------------------------------------------------------------------
// Rendering
// ---------------------------------------------------------------------------

async function renderRoute(browser, route) {
  const page = await browser.newPage();
  try {
    await page.setViewport({ width: 1440, height: 1000 });

    await page.setRequestInterception(true);
    page.on('request', async (req) => {
      const url = req.url();

      // Analytics beacons never resolve in headless Chrome and would stall the load.
      if (/vercel-insights|vitals\.vercel-insights|google-analytics|googletagmanager|api\.emailjs/.test(url)) {
        return req.abort().catch(() => {});
      }

      // Skip image payloads. Only the <img src> attribute ends up in the HTML, and
      // downloading them is pure cost — /blog alone pulls 50 Cloudinary images, which
      // was enough to exhaust the browser and abort the rest of the run.
      if (req.resourceType() === 'image' || req.resourceType() === 'media') {
        return req.abort().catch(() => {});
      }

      // The API's CORS policy only allows the production origin, so a browser fetch
      // from 127.0.0.1 is rejected with 403 and pages like /blog render empty. Proxy
      // those calls through Node — CORS does not apply there — and return the payload
      // with a permissive header so the app receives real data.
      if (url.startsWith(API_BASE_URL)) {
        // The app sends `Content-Type: application/json`, which makes this a
        // non-simple request, so Chrome issues an OPTIONS preflight first. It has to
        // be answered here too, or the real request is blocked before it is sent.
        if (req.method() === 'OPTIONS') {
          return req.respond({
            status: 204,
            headers: CORS_HEADERS,
          }).catch(() => {});
        }

        try {
          const upstream = await fetch(url, {
            headers: { Origin: SITE_URL, 'User-Agent': 'FuturisePrerender/2.0' },
          });
          const body = await upstream.text();
          return req.respond({
            status: upstream.status,
            contentType: upstream.headers.get('content-type') || 'application/json',
            headers: CORS_HEADERS,
            body,
          }).catch(() => {});
        } catch {
          return req.abort().catch(() => {});
        }
      }

      req.continue().catch(() => {});
    });

    // domcontentloaded rather than networkidle0: the explicit content check below is
    // the real readiness signal, and networkidle0 stalls on long-polling or slow media.
    await page.goto(`http://127.0.0.1:${PORT}${route}`, {
      waitUntil: 'domcontentloaded',
      timeout: 60000,
    });

    // Routes are React.lazy'd behind a Suspense spinner — wait for real copy, not the
    // fallback, before treating the page as rendered.
    //
    // For a CMS-backed hub the text length alone is not a readiness signal. /blog's heading
    // and intro clear 400 characters on their own, so this resolved while the post list was
    // still in flight, and whether the cards reached the snapshot came down to whether the
    // API answered inside the fixed loader + scroll + animation window. That is a race, and
    // it showed: the same build emits "3154 words · h2:2" on one run and "187 words · h2:0"
    // with the hub gate failing on the next, from identical inputs. Waiting for the children
    // themselves makes the signal deterministic. Nothing else about the capture changes.
    const hub = HUB_ROUTES.find((h) => h.route === route);
    try {
      await page.waitForFunction(
        (prefix, min) => {
          const root = document.getElementById('root');
          if (!root || root.innerText.trim().length <= 400) return false;
          if (!prefix) return true;
          return document.querySelectorAll(`#root a[href^="${prefix}"]`).length >= min;
        },
        { timeout: 45000, polling: 250 },
        hub ? hub.prefix : null,
        hub ? hub.min : 0
      );
    } catch (err) {
      // A hub whose children never arrive is a genuine failure, but brokenHubs() already
      // reports it against the captured stats and fails the build with a message naming the
      // route and the shortfall. Throwing here would replace that diagnosis with a timeout
      // and send the route through the retry-and-relaunch path, which cannot fix a CMS
      // outage. So for a hub, fall through and capture whatever state the page reached —
      // exactly the behaviour that existed before this wait was introduced.
      if (!hub) throw err;
      console.warn(`⚠️  ${route.padEnd(42)} children did not arrive in 45s — hub gate will report it`);
    }

    await new Promise((r) => setTimeout(r, LOADER_MS));

    // Reveal.jsx animates on `whileInView` and CompanyStats renders a literal 0 until
    // its VisibilitySensor fires. Nothing below the fold is in its final state until
    // it has been scrolled past, so walk the whole page before capturing.
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let y = 0;
        const step = () => {
          window.scrollTo(0, y);
          y += Math.round(window.innerHeight * 0.75);
          if (y < document.body.scrollHeight) setTimeout(step, 110);
          else setTimeout(() => { window.scrollTo(0, 0); resolve(); }, 250);
        };
        step();
      });
    });

    await new Promise((r) => setTimeout(r, ANIMATION_MS));

    // Freeze the post-animation state into the markup. framer-motion leaves inline
    // opacity/transform on every Reveal; captured mid-flight they would ship content
    // that is invisible in the raw HTML — which Google discounts as hidden text.
    await page.evaluate(() => {
      document.querySelectorAll('#root [style]').forEach((el) => {
        const o = el.style.opacity;
        if (o !== '' && parseFloat(o) < 1) el.style.opacity = '1';
        if (el.style.transform && el.style.transform !== 'none') el.style.transform = 'none';
      });
      // The intro loader is a fixed full-screen overlay; drop it if it is still mounted.
      document.querySelectorAll('#root [style*="z-index: 2000"], #root [style*="z-index:2000"]')
        .forEach((el) => el.remove());
    });

    const html = await page.content();
    const stats = await page.evaluate(() => ({
      h1: document.querySelectorAll('#root h1').length,
      h2: document.querySelectorAll('#root h2').length,
      jsonLd: document.querySelectorAll('script[type="application/ld+json"]').length,
      words: (document.getElementById('root').innerText.match(/\S+/g) || []).length,
      title: document.title,
      // Seo.jsx writes this from the page's own `path`, so it identifies which component
      // actually rendered. A route with no match in AllRoutes.jsx renders NotFound, whose
      // canonical will not be the route being prerendered — see the check in run().
      canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href') || '',
      // Internal links, so a hub page that failed to load its children can be caught.
      // See HUB_ROUTES below for why counting words is not enough.
      links: [...document.querySelectorAll('#root a[href^="/"]')]
        .map((a) => a.getAttribute('href'))
        .filter((href) => href && href !== '/'),
    }));

    return { html, stats };
  } finally {
    await page.close().catch(() => {});
  }
}

// ---------------------------------------------------------------------------
// Meta-only injection (blog articles + fallback if Chrome is unavailable)
// ---------------------------------------------------------------------------

function injectMetadata(html, { title, description, imageUrl, keywords, url }) {
  let modified = html;

  const replaceMetaTag = (htmlText, attrName, newContent) => {
    // A caller that has no value for this field must leave index.html's own tag in
    // place. Replacing it would stamp the literal string "undefined" into the meta —
    // worse than the generic site-wide default it overwrote.
    if (newContent === undefined || newContent === null || newContent === '') return htmlText;
    const metaTagRegex = new RegExp(`<meta\\s+([^>]*?(?:name|property)=["']${attrName}["'][^>]*?)>`, 'is');
    return htmlText.replace(metaTagRegex, (match, attributes) => {
      if (attributes.includes('content=')) {
        return `<meta ${attributes.replace(/content=(["'])(.*?)\1/is, `content=$1${newContent}$1`)}>`;
      }
      return `<meta ${attributes} content="${newContent}">`;
    });
  };

  if (title) {
    modified = modified.replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`);
  }
  // The canonical must always be per-route, even when nothing else is known: leaving
  // every page canonicalised to "/" would collapse the whole site into one URL.
  if (url) {
    modified = modified.replace(/<link\s+[^>]*?rel=["']canonical["'][^>]*?>/is, (match) =>
      match.replace(/href=(["'])(.*?)\1/is, `href=$1${url}$1`)
    );
  }

  modified = replaceMetaTag(modified, 'description', description);
  modified = replaceMetaTag(modified, 'keywords', keywords);
  modified = replaceMetaTag(modified, 'og:title', title);
  modified = replaceMetaTag(modified, 'og:description', description);
  modified = replaceMetaTag(modified, 'og:image', imageUrl);
  modified = replaceMetaTag(modified, 'og:url', url);
  modified = replaceMetaTag(modified, 'twitter:title', title);
  modified = replaceMetaTag(modified, 'twitter:description', description);
  modified = replaceMetaTag(modified, 'twitter:image', imageUrl);

  return modified;
}

/*
 * Re-insert the boot loader into a captured page.
 *
 * `page.content()` serialises the LIVE DOM, and by the time we capture, the loader has
 * already dismissed itself and removed its own node — so the markup we get back has no
 * loader in it. Writing that straight to disk would mean every prerendered route (which
 * is every route a visitor can land on directly) shipped *without* the loader, and only
 * the un-prerendered dev entry point had one.
 *
 * So it is spliced back in verbatim from the built template. Taken as a literal slice of
 * dist/index.html rather than re-templated here, so index.html stays the single source
 * of truth for the loader's markup, styles and timing — edit it there and this follows.
 */
function extractBootLoader(template) {
  // Both boundaries are matched by regex rather than by exact string, because both vary.
  //
  // The end boundary bit us: the first version looked for the literal `<div id="root"></div>`,
  // which only exists in a *fresh* build. Running the prerenderer a second time against an
  // already-prerendered dist/index.html — which has Chakra's style script and rendered markup
  // inside #root — made that string absent, extraction returned null, and all 27 pages shipped
  // without the loader. The warning in run() caught it, but the fragility was the real bug.
  // Matching `<div id="root"` (no closing assumption) works in both states.
  //
  // The start boundary is regex for a related reason: it depended on the exact indentation
  // Vite happened to emit, which is not a contract.
  const startMatch = /<style>\s*#fs-boot/.exec(template);
  if (!startMatch) return null;
  const start = startMatch.index;

  const endMatch = /<div id="root"/.exec(template.slice(start));
  if (!endMatch) return null;

  const block = template.slice(start, start + endMatch.index);

  // Sanity-check the extraction rather than trusting the boundaries.
  //
  // `npm run build` always runs `vite build` (which wipes dist) before this script, so the
  // template is clean in production. Running prerender.js standalone against an already-
  // prerendered dist is not: the head then carries injected meta and JSON-LD, and the slice
  // silently balloons from ~8 kB to ~16 kB of duplicated markup. Both boundaries still match,
  // so only a content check catches it. The block must contain the loader's own markup and
  // nothing that belongs to a rendered page.
  const looksRight =
    block.includes('id="fs-boot"') &&
    block.includes('fsBootG') &&
    !block.includes('application/ld+json') &&
    block.length < 40000;

  if (!looksRight) {
    console.warn(
      `⚠️  Boot loader extraction looked wrong (${block.length} bytes) — dist/index.html is probably ` +
      `already-prerendered output rather than a fresh template. Run "vite build" first.`
    );
    return null;
  }

  return block;
}

let BOOT_LOADER_HTML = null;

function withBootLoader(html) {
  if (!BOOT_LOADER_HTML) return html;
  // Already present (belt and braces — a future change might capture it live).
  if (html.includes('id="fs-boot"')) return html;
  const marker = '<div id="root">';
  const at = html.indexOf(marker);
  if (at === -1) return html;
  return html.slice(0, at) + BOOT_LOADER_HTML + html.slice(at);
}

function writeRoute(route, html) {
  const dir = route === '/' ? DIST_PATH : path.join(DIST_PATH, route);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), withBootLoader(html), 'utf-8');
}

// ---------------------------------------------------------------------------
// Route inventory
// ---------------------------------------------------------------------------

const servicesData = [
  { slug: 'web-development', image: '/webdevelopment.png' },
  { slug: 'app-development', image: '/appdevlopment.png' },
  { slug: 'ui-ux-design', image: '/uiuxdevelopment.png' },
  { slug: 'blockchain-development', image: '/blockchaindevelopment.png' },
  { slug: 'ai-ml-solutions', image: '/aimlsol.png' },
  { slug: 'digital-marketing', image: '/digitalmarkiting.png' },
];

const staticPages = ['about', 'contact', 'portfolio', 'case-studies', 'blog', 'pricing', 'privacy', 'terms', 'europe'];

// Country landing pages come from the shared registry in src/utils/Constant/countries.js,
// which also derives the hreflang cluster the pages render. Reading both from one array
// means a market cannot be prerendered without being in its own hreflang set, or vice
// versa — the two drifting apart is otherwise a silent SEO failure.
const countryPages = COUNTRY_SLUGS;

// Every route rendered through Chrome. Seo.jsx supplies each page's title, description,
// canonical and JSON-LD at runtime, so the captured HTML already carries correct metadata.
function buildRouteList() {
  return [
    '/',
    ...servicesData.map((s) => `/service/${s.slug}`),
    ...Object.keys(caseStudies).map((slug) => `/case-studies/${slug}`),
    ...staticPages.map((p) => `/${p}`),
    ...countryPages.map((p) => `/${p}`),
  ];
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function run() {
  if (!fs.existsSync(INDEX_HTML_PATH)) {
    console.error('❌ dist/index.html not found. Run "vite build" first.');
    process.exit(1);
  }

  const template = fs.readFileSync(INDEX_HTML_PATH, 'utf-8');

  // Snapshot the boot loader block once, for re-insertion into every captured page.
  // See extractBootLoader() for why a live capture never contains it.
  BOOT_LOADER_HTML = extractBootLoader(template);
  if (!BOOT_LOADER_HTML) {
    console.warn('⚠️  Boot loader block not found in dist/index.html — prerendered pages will ship without it.');
  }

  const routes = buildRouteList();

  console.log(`\n🚀 Prerendering ${routes.length} routes with headless Chrome\n`);

  const server = await startServer(template);

  const launch = () => puppeteer.launch({
    headless: 'new',
    protocolTimeout: 120000,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  let browser;
  try {
    browser = await launch();
  } catch (err) {
    server.close();

    /*
     * Without a browser there are no prerendered bodies. This used to fall through to
     * metaOnlyFallback() and return exit 0, so a build in which every route shipped an
     * empty <div id="root"> still deployed as a success. It must fail the build.
     *
     * Meta-only output stays available for local iteration without a browser, but has
     * to be asked for by name — which CI never does.
     */
    if (process.env.ALLOW_META_ONLY_FALLBACK !== '1') {
      console.error(`\n❌ Could not launch Chrome: ${err.message}`);
      console.error(
        '❌ Refusing to emit meta-only output: every route would ship an empty ' +
        '<div id="root">.\n   Set ALLOW_META_ONLY_FALLBACK=1 for local, non-deploy builds.\n'
      );
      process.exit(1);
    }

    console.warn(`\n⚠️  Could not launch Chrome: ${err.message}`);
    console.warn('⚠️  ALLOW_META_ONLY_FALLBACK=1 — meta-only output. NOT deployable.\n');
    await metaOnlyFallback(template);
    return;
  }

  const results = [];
  let failures = 0;

  for (const route of routes) {
    let lastErr;
    // Two attempts: a heavy page can take the browser down with it, so a failure
    // relaunches Chrome before retrying rather than cascading into every later route.
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        if (!browser.connected) browser = await launch();
        const { html, stats } = await renderRoute(browser, route);
        writeRoute(route, html);
        results.push({ route, ...stats, zeroStats: zeroedStats(html) });
        console.log(
          `✅ ${route.padEnd(42)} ${String(stats.words).padStart(5)} words · ` +
          `h1:${stats.h1} h2:${String(stats.h2).padStart(2)} · ld+json:${stats.jsonLd}`
        );
        lastErr = null;
        break;
      } catch (err) {
        lastErr = err;
        if (attempt === 1) {
          console.warn(`↻ ${route.padEnd(42)} retrying after: ${err.message}`);
          try { if (browser.connected) await browser.close(); } catch { /* already gone */ }
          browser = await launch();
        }
      }
    }
    if (lastErr) {
      failures++;
      console.error(`❌ ${route.padEnd(42)} ${lastErr.message}`);
    }
  }

  // Vercel serves a root-level 404.html with a real 404 status for unmatched paths.
  // Rendering the app's NotFound route into it keeps that page on-brand instead of
  // falling back to Vercel's default error page.
  try {
    const { html } = await renderRoute(browser, '/this-route-does-not-exist');
    fs.writeFileSync(path.join(DIST_PATH, '404.html'), withBootLoader(html), 'utf-8');
    console.log('✅ 404.html                                  rendered from NotFound route');
  } catch (err) {
    console.warn(`⚠️  Could not render 404.html: ${err.message}`);
  }

  await browser.close();
  server.close();

  const { blogs, reachable: blogApiUp } = await prerenderBlogMeta(template);
  const sitemapOk = writeSitemap(results.map((r) => r.route), blogs, blogApiUp);

  // Report anything that rendered but looks wrong, so a silent regression cannot pass.
  const thin = results.filter((r) => r.words < 250);
  const noH1 = results.filter((r) => r.h1 === 0);
  const multiH1 = results.filter((r) => r.h1 > 1);
  const noSchema = results.filter((r) => r.jsonLd < 2);
  const emptyHubs = brokenHubs(results);

  console.log('\n──────── summary ────────');
  console.log(`rendered: ${results.length}/${routes.length}${failures ? ` (${failures} failed)` : ''}`);
  if (thin.length)     console.log(`⚠️  thin (<250 words): ${thin.map((r) => r.route).join(', ')}`);
  if (noH1.length)     console.log(`⚠️  missing <h1>:      ${noH1.map((r) => r.route).join(', ')}`);
  if (multiH1.length)  console.log(`⚠️  multiple <h1>:     ${multiH1.map((r) => `${r.route}(${r.h1})`).join(', ')}`);
  if (noSchema.length) console.log(`⚠️  <2 JSON-LD blocks: ${noSchema.map((r) => r.route).join(', ')}`);

  const zeroed = results.filter((r) => r.zeroStats > 0);
  for (const r of zeroed) {
    console.error(
      `❌ ${r.route} prerendered ${r.zeroStats} stat(s) as "0" — a count-up animation was ` +
      `captured before it ran. Crawlers will read the zeros.`
    );
  }

  for (const hub of emptyHubs) {
    console.error(
      `❌ ${hub.route} rendered ${hub.found} of the expected ${hub.min}+ "${hub.prefix}" links ` +
      `— the CMS fetch almost certainly failed. Re-run the build.`
    );
  }

  // A route with no match in AllRoutes.jsx renders NotFound, which has an <h1>, schema and
  // 283 words — enough to pass every check above. Without this it would ship as a real
  // page and be listed in the sitemap. Country pages make that easy to hit: adding a
  // market to the countries registry creates the prerender route and the sitemap entry on
  // its own, so forgetting the React route is a single omission with no other symptom.
  const misrouted = results.filter(
    (r) => r.canonical && r.canonical !== `${SITE_URL}${r.route === '/' ? '/' : r.route}`
  );
  for (const r of misrouted) {
    console.error(
      `❌ ${r.route} rendered a page whose canonical is ${r.canonical} — the route is ` +
      `probably missing from src/Routes/AllRoutes.jsx, so NotFound rendered in its place.`
    );
  }

  console.log('🎉 Pre-rendering complete.\n');

  // `!sitemapOk` means the blog API did not answer, so sitemap.xml was deliberately not
  // rewritten. The dist is then internally inconsistent — prerendered pages but a stale or
  // absent sitemap — and must not be deployed, so it fails the build like any other defect.
  if (failures || emptyHubs.length || zeroed.length || misrouted.length || !sitemapOk) {
    process.exitCode = 1;
  }
}

// Blog articles keep meta-only files — middleware.js server-renders their bodies.
//
// Returns `{ blogs, reachable }`. The flag matters: an empty array from a failed fetch and
// an empty array from a genuinely empty CMS are indistinguishable to the caller, and they
// call for opposite behaviour. Production currently serves 62 blog URLs, so "no blogs"
// almost certainly means the API did not answer — and writing a sitemap from that would
// silently retract every one of them. See writeSitemap() for what the flag gates.
async function prerenderBlogMeta(template) {
  console.log('📡 Fetching blogs for meta-only prerender…');
  let blogs = [];
  let reachable = false;
  try {
    const res = await fetch(`${API_BASE_URL}/api/blogs/admin/all`);
    if (res.ok) {
      const data = await res.json();
      blogs = Array.isArray(data) ? data : (data?.blogs || data?.data || []);
      reachable = true;
    } else {
      console.warn(`⚠️  Failed to fetch blogs: ${res.statusText}`);
    }
  } catch (err) {
    console.warn(`⚠️  Error fetching blogs: ${err.message}`);
  }

  let count = 0;
  for (const blog of blogs) {
    if (!blog.slug) continue;
    const imageUrl = blog.featuredImage
      ? (/^https?:\/\//i.test(blog.featuredImage) ? blog.featuredImage : `${API_BASE_URL}${blog.featuredImage}`)
      : `${SITE_URL}/home.png`;

    const html = injectMetadata(template, {
      title: `${blog.meta?.metaTitle || blog.title || ''} | Futurise Solutions`,
      description: blog.meta?.metaDescription || blog.shortDescription || '',
      imageUrl,
      keywords: (blog.meta?.metaKeywords || blog.tags || []).join(', '),
      url: `${SITE_URL}/blog/${blog.slug}`,
    });

    writeRoute(`/blog/${blog.slug}`, html);
    count++;
  }
  console.log(`✅ ${count} blog meta files written (bodies served by middleware.js)`);
  return { blogs, reachable };
}

// Generate sitemap.xml from what was actually built, rather than maintaining it by hand.
// The committed public/sitemap.xml had to be edited on every publish, so <lastmod> dates
// drifted and new posts were easy to forget; this derives both from the real output.
//
// hreflang is emitted per page by Seo.jsx (x-default on /, en-NZ on /nz) rather than in
// the sitemap. Both mechanisms are valid to Google; doing it in one place keeps the
// annotation next to the page that owns it instead of splitting it across two files.
function writeSitemap(routes, blogs = [], blogApiUp = true) {
  /*
   * Refuse to write a sitemap that silently retracts the blog.
   *
   * The blog is the largest section of the site — production serves 62 post URLs against
   * 21 static ones — and it is the only part of the sitemap that depends on a network
   * fetch at build time. When api.futurisesolutions.com does not answer, prerenderBlogMeta
   * returns an empty list, and every one of those URLs simply vanishes from the output.
   *
   * That failure is quiet in the worst way. The XML is still well-formed, the build still
   * emits "sitemap.xml generated", and the file on disk looks correct — it is just missing
   * three quarters of the site. Shipping it tells Google those posts are gone, which is a
   * far more expensive mistake than failing the build.
   *
   * So an unreachable API is treated as a hard stop rather than an empty result, and the
   * existing sitemap.xml is left untouched. An API that answers with a genuinely empty
   * list is a different thing and is allowed through: that is real data.
   */
  if (!blogApiUp) {
    console.error(
      '❌ Blog API unreachable — refusing to write sitemap.xml.\n' +
      `   Production currently lists blog URLs that this build cannot see, and writing\n` +
      `   a sitemap without them would retract them from Google.\n` +
      `   Existing dist/sitemap.xml left unchanged. Re-run the build once ${API_BASE_URL} responds.`
    );
    return false;
  }

  const today = new Date().toISOString().slice(0, 10);

  // Crawl priority follows commercial value: services convert, legal pages do not.
  const weightFor = (loc) => {
    if (loc === '/') return { priority: '1.0', changefreq: 'weekly' };
    if (loc.startsWith('/service/')) return { priority: '0.9', changefreq: 'monthly' };
    if (loc.startsWith('/case-studies/')) return { priority: '0.8', changefreq: 'monthly' };
    if (loc === '/blog') return { priority: '0.8', changefreq: 'daily' };
    // High commercial intent: this is the page that answers the cost queries the blog
    // already ranks for, so it should be crawled at service-page priority.
    if (loc === '/pricing') return { priority: '0.9', changefreq: 'monthly' };
    // Country landing pages sit just under the homepage: they are the entry point for a
    // whole market and target the highest-intent commercial queries we compete for.
    if (countryPages.includes(loc.slice(1))) return { priority: '0.9', changefreq: 'monthly' };
    // The Europe region page is a market entry point like the country pages, and carries
    // the same commercial intent, so it is crawled at the same priority even though it is
    // deliberately not part of the COUNTRIES registry or the hreflang cluster.
    if (loc === '/europe') return { priority: '0.9', changefreq: 'monthly' };
    if (loc.startsWith('/blog/')) return { priority: '0.7', changefreq: 'monthly' };
    if (loc === '/privacy' || loc === '/terms') return { priority: '0.3', changefreq: 'yearly' };
    return { priority: '0.7', changefreq: 'monthly' };
  };

  const entries = [
    ...routes.map((route) => ({ loc: route, lastmod: today })),
    ...blogs
      .filter((b) => b.slug)
      .map((b) => ({
        loc: `/blog/${b.slug}`,
        // Real publish/update dates, so lastmod means something to a crawler.
        lastmod: String(b.updatedAt || b.publishedAt || b.createdAt || today).slice(0, 10),
      })),
  ];

  const seen = new Set();
  const urls = entries
    .filter((e) => (seen.has(e.loc) ? false : seen.add(e.loc)))
    .map(({ loc, lastmod }) => {
      const { priority, changefreq } = weightFor(loc);
      return `  <url>
    <loc>${SITE_URL}${loc === '/' ? '/' : loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  fs.writeFileSync(path.join(DIST_PATH, 'sitemap.xml'), xml, 'utf-8');
  console.log(`✅ sitemap.xml generated with ${seen.size} URLs (${blogs.filter((b) => b.slug).length} blog)`);
  return true;
}

/*
 * Last-resort path when Chrome is unavailable in the build environment.
 *
 * This used to write only /case-studies/* and blog-post meta, leaving /blog, /about,
 * /contact, /portfolio, /pricing, /privacy, /terms and /service/* with no file on disk
 * at all. Because vercel.json has no catch-all rewrite (deliberately — it caused soft
 * 404s), those routes then served Vercel's raw "404: NOT_FOUND" in production. It
 * shipped exactly that way once.
 *
 * Now every route in buildRouteList() gets a file. Bodies are still not prerendered —
 * only Chrome can do that — but the route resolves, the SPA boots, and human visitors
 * see the real page. vercel.json's explicit rewrites are the second layer of the same
 * guarantee.
 */
async function metaOnlyFallback(template) {
  for (const slug of Object.keys(caseStudies)) {
    const study = caseStudies[slug];
    writeRoute(`/case-studies/${slug}`, injectMetadata(template, {
      title: study.meta?.title || '',
      description: study.meta?.description || '',
      imageUrl: study.meta?.ogImage
        ? (/^https?:\/\//i.test(study.meta.ogImage) ? study.meta.ogImage : `${SITE_URL}${study.meta.ogImage}`)
        : `${SITE_URL}/home.png`,
      keywords: study.meta?.keywords || '',
      url: `${SITE_URL}/case-studies/${slug}`,
    }));
  }

  // Service pages: each has a dedicated OG image, and Seo.jsx fills the rest at runtime.
  for (const { slug, image } of servicesData) {
    writeRoute(`/service/${slug}`, injectMetadata(template, {
      imageUrl: `${SITE_URL}${image}`,
      url: `${SITE_URL}/service/${slug}`,
    }));
  }

  // The remaining static routes. Without these the SPA had no entry point for them.
  for (const page of staticPages) {
    writeRoute(`/${page}`, injectMetadata(template, {
      imageUrl: `${SITE_URL}/home.png`,
      url: `${SITE_URL}/${page}`,
    }));
  }

  // 404.html still has to exist, or unmatched paths fall back to Vercel's error page.
  fs.writeFileSync(path.join(DIST_PATH, '404.html'), template, 'utf-8');

  const { blogs, reachable: blogApiUp } = await prerenderBlogMeta(template);
  writeSitemap(buildRouteList(), blogs, blogApiUp);
  console.log(
    `⚠️  Meta-only fallback complete — ${buildRouteList().length} routes have files, ` +
    'but bodies are NOT prerendered. Crawlers will see an empty <div id="root">.'
  );
}

run();
