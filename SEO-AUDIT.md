# SEO / AEO / GEO Audit — Futurise Solutions

- **Site:** https://www.futurisesolutions.com/
- **Audit date:** 2026-07-14
- **Stack audited:** Vite + React 18 SPA (react-router-dom), custom `prerender.js`, Vercel hosting + Edge Middleware
- **Goals:** (1) Rank higher in Google, (2) Be visible/citable in AI answer engines (AEO), (3) Target NZ, USA, UK, Canada, UAE/Dubai, Saudi Arabia, South Africa, Australia, India (GEO). HQ listed: Wellington, NZ.
- **Baseline (Google Search Console, 3-month):** 98 clicks · 1.52k impressions · 6.4% CTR · avg position 8.9 · **17 indexed / 31 not indexed (6 reasons)**.

---

## Table of contents
1. [Executive summary](#1-executive-summary)
2. [Severity legend](#2-severity-legend)
3. [Root cause](#3-root-cause-the-one-that-caps-everything)
4. [Findings — Critical](#4-findings--critical)
5. [Findings — High](#5-findings--high)
6. [Findings — Medium](#6-findings--medium)
7. [AEO (AI answer engines) analysis](#7-aeo--ai-answer-engine-analysis)
8. [GEO (country targeting) analysis](#8-geo--country-targeting-analysis)
9. [What is already strong](#9-what-is-already-strong-keep-it)
10. [Remediation plan — Phase 1](#10-phase-1--rendering-fix-root-cause)
11. [Remediation plan — Phase 2](#11-phase-2--quick-technical-wins)
12. [Remediation plan — Phase 3](#12-phase-3--content--geo-expansion)
13. [Success metrics & verification](#13-success-metrics--verification)
14. [Appendix — how findings were verified](#14-appendix--how-findings-were-verified)

---

## 1. Executive summary

The content, metadata, `llms.txt`, and structured-data **design** on this site are strong — above the standard of most agency websites. However, a **single architectural flaw is silently capping every result**: the site is a client-rendered SPA that ships an **empty `<div id="root"></div>`** to crawlers. `prerender.js` injects per-route *meta tags* but never the rendered page body.

Consequences that map directly to the GSC baseline:
- **Googlebot** receives blank HTML and must render JavaScript in a slow, deferred "second wave" → deferred/failed indexing → the **31 not-indexed pages**.
- **AI crawlers** (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot, Bytespider, Amazonbot) **do not execute JavaScript** → they see nothing → **the site is effectively invisible to AI search**, which is the stated #1 goal.

Everything else in this report (thin content, geo-targeting, internal linking, trust signals) is real and worth fixing — but **Phase 1 (rendering) must come first**, because all other on-page work is invisible to bots until the body content is in the raw HTML.

---

## 2. Severity legend

| Level | Meaning |
|---|---|
| 🚨 **Root cause** | Blocks the primary goals; fix before anything else. |
| 🔴 **Critical** | Actively harming indexing, trust, or rankings now. |
| 🟠 **High** | Materially limits rankings / AEO reach. |
| 🟡 **Medium** | Meaningful polish; do after Critical/High. |

---

## 3. Root cause: the one that caps everything

**🚨 No server-rendered body content. Every page serves an empty React root.**

**Evidence (live fetch as a bot):**
```
$ curl -A "GPTBot" https://www.futurisesolutions.com/
... <div id="root"></div>      # zero content: no <h1>, no text
$ grep -c "<h1" (live homepage raw HTML)  →  0
```

`prerender.js` (`injectMetadata`) only rewrites `<title>`, canonical, description, keywords, OG and Twitter tags into the built `dist/index.html` template. The `<body>` stays `<div id="root"></div>`. Confirmed: **no prerendered file in `dist/**/index.html` contains an `<h1>` or body copy.**

| Crawler | Runs JS? | What it sees today | Result |
|---|---|---|---|
| Googlebot | Yes (deferred) | Empty HTML, then JS render later | Slow/partial indexing → the 31 not-indexed |
| GPTBot / ClaudeBot / PerplexityBot / Google-Extended / CCBot / Bytespider / Amazonbot | **No** | Empty HTML | **Invisible in AI search** |

**Fix:** true build-time prerendering (render the real DOM into each static `.html`). Detailed in [Phase 1](#10-phase-1--rendering-fix-root-cause).

---

## 4. Findings — Critical

### 4.1 🔴 Soft 404s — non-existent URLs return HTTP 200
```
$ curl -I https://www.futurisesolutions.com/does-not-exist-xyz  →  HTTP/2 200
```
The SPA renders a `NotFound` component client-side but the HTTP status stays **200**. Google treats these as **soft 404s** — wasted crawl budget and inflated "not indexed" counts. The rewrite `"/(.*)" → "/index.html"` in [vercel.json](vercel.json) means any typo'd/removed URL resolves 200. Needs a true 404 status for unknown routes.

### 4.2 🔴 Blog middleware degrades blog indexing
[middleware.js](middleware.js) intercepts **Googlebot** on `/blog/*` and returns a thin stub:
```html
<body><p>Loading… <a href="{canonical}">{title}</a></p></body>
<meta http-equiv="refresh" content="0;url={canonical}">
```
Two problems: (a) it serves **almost no article body** plus a self-referential meta-refresh; (b) its `CRAWLERS` regex **excludes every AI bot** (no GPTBot/ClaudeBot/PerplexityBot/Google-Extended), so AI engines fall through to the empty SPA. Net: blog posts have **no crawlable article body** on any surface.

### 4.3 🔴 Fake testimonials, reviews, stats & avatars (E-E-A-T / trust risk)
[src/utils/Constant/index.js:15](src/utils/Constant/index.js#L15) marks the data as "realistic SAMPLE content." Reviews use stock `i.pravatar.cc` avatars ([:76](src/utils/Constant/index.js#L76), [:83](src/utils/Constant/index.js#L83), [:90](src/utils/Constant/index.js#L90), [:313](src/utils/Constant/index.js#L313)+). Fabricated social proof is penalized by Google's spam systems and undermines AI trust signals. Stats such as "30+ projects / 97% retention" and `numberOfEmployees ≥ 10` may read as inflated without proof. **Replace with real, attributable proof, or remove.**

---

## 5. Findings — High

### 5.1 🟠 Per-page structured data is client-side only
Service, `FAQPage`, `BreadcrumbList` and `BlogPosting` schemas are injected by [Seo.jsx](src/Components/common/Seo.jsx#L33) via `useEffect` → **absent from raw HTML**. Only the global Organization/WebSite JSON-LD in [index.html](index.html#L109) is static. After Phase 1, per-page schema must be emitted into the static HTML.

### 5.2 🟠 No geo-targeting in visible content (9 target countries)
Country names appear only in the *ignored* `keywords` meta and in JSON-LD. **`areaServed` is missing Saudi Arabia and South Africa** ([ServicePage.jsx:59](src/Pages/ServicePage.jsx#L59)). No country landing pages; no country terms in any H1/H2/body; NAP signals point only to Wellington + an Indian phone number.

### 5.3 🟠 Thin service pages
~300–450 unique words per service; `ui-ux-design` and `digital-marketing` are thinnest (2 tech-stack blocks each). The Process section ([ProcessSection.jsx](src/Components/ServiceComponents/ProcessSection.jsx)) and the Industries heading ([ServicePage.jsx:153](src/Pages/ServicePage.jsx#L153)) are **identical across all 6 services**. Competitive commercial keywords need ~900–1,200 words of differentiated copy.

### 5.4 🟠 Footer service links aren't crawlable
[Footer.jsx:189](src/Layout/Footer.jsx#L189) renders the Services column with `<FLink onClick={navigate}>` and **no `to` prop**, so [FLink](src/Layout/Footer.jsx#L23) falls back to a `<span>` with no `href`. Six internal links + crawl paths lost. (The Company column uses `to` and is fine.)

### 5.5 🟠 Weak internal linking / orphaned case studies
Case-study pages are reachable only from the navbar dropdown — never from body content. No service↔case-study↔service interlinking; AboutUs links to no service. Footer "Selected work" tiles all point to generic `/portfolio`.

### 5.6 🟠 No pricing content
Only one digital-marketing FAQ mentions price ([index.js:727](src/utils/Constant/index.js#L727)). "How much does {service} cost" is a top AEO query and is currently unanswerable from most pages.

---

## 6. Findings — Medium

| # | Finding | Evidence | Fix |
|---|---|---|---|
| 6.1 | Stale sitemap; no `hreflang` | newest `<lastmod>` 2026-07-02; 0 `hreflang` in [public/sitemap.xml](public/sitemap.xml) | Auto-generate sitemap at build; add `hreflang` alternates |
| 6.2 | apex→www is 307 (temporary) | `curl -I https://futurisesolutions.com/` → 307 | Make it a permanent 301/308 |
| 6.3 | Breadcrumb "Services" → homepage | [ServicePage.jsx:67](src/Pages/ServicePage.jsx#L67) points to `/` | Add a `/services` hub or drop the middle crumb |
| 6.4 | Heading hierarchy | tech-stack titles default to `h2` ([ServiceStack.jsx:36](src/Components/ServiceComponents/ServiceStack.jsx#L36)); FAQ questions not in headings | `as="h3"`; wrap FAQ Q in `h3` |
| 6.5 | Weak About-page E-E-A-T | no team bios / named founders / real client logos / founding story | Add real people + proof |
| 6.6 | Oversized favicon & heavy images | [favicon-new.png](public/favicon-new.png) 116 KB; page images 250–380 KB | Small `.ico`/PNG; convert to WebP + lazy-load |
| 6.7 | "Unparsable structured data" in GSC | flagged in GSC Enhancements | Pull exact URL from GSC; likely a client-rendered JSON-LD block or a blog with unescaped chars |
| 6.8 | Trailing-slash duplicate | `/about/` returns 200 | Normalize; canonical currently mitigates |
| 6.9 | `keywords` meta used | [index.html:43](index.html#L43) | Harmless but ignored by Google; low priority |
| 6.10 | Folder typo | `src/assests` | Rename to `assets` (cosmetic) |

---

## 7. AEO — AI answer-engine analysis

**Blocker:** AI crawlers don't run JS → they see the empty root (see [Root cause](#3-root-cause-the-one-that-caps-everything)). This is the gating issue for all AEO.

**Strong already:** [llms.txt](public/llms.txt) is comprehensive and well-structured (services, tech, industries, facts, contact, case studies, articles). FAQPage schema exists on every service + home. FAQs answer genuine buyer questions.

**Gaps once rendering is fixed:**
- No pricing / "starting from" answers (top extractable query type).
- No comparison content ("X vs Y", "how to choose").
- No explicit location answers ("Do you work with clients in the UK/UAE/Canada?").
- Only 4–5 FAQs/page — expand to 8–10 with buyer-intent questions.
- Thin body text limits extractable passages for citation.

---

## 8. GEO — country-targeting analysis

Target markets: **NZ, USA, UK, Canada, UAE/Dubai, Saudi Arabia, South Africa, Australia, India.**

| Market | In `areaServed` JSON-LD | In visible content | Landing page | NAP signal |
|---|---|---|---|---|
| New Zealand | ✅ | meta only | ❌ | ✅ Wellington |
| India | ✅ | meta only | ❌ | ✅ +91 phone |
| USA | ✅ | meta only | ❌ | ❌ |
| UK | ✅ | ❌ | ❌ | ❌ |
| Australia | ✅ | ❌ | ❌ | ❌ |
| UAE / Dubai | ✅ | ❌ | ❌ | ❌ |
| Canada | ✅ | ❌ | ❌ | ❌ |
| **Saudi Arabia** | ❌ **missing** | ❌ | ❌ | ❌ |
| **South Africa** | ❌ **missing** | ❌ | ❌ | ❌ |

**Verdict:** geo-targeting exists only as ignored meta keywords and JSON-LD. There is no on-page, URL-level, or `hreflang` signal for any market. This is the biggest content-side gap versus the stated strategy. Addressed in [Phase 3](#12-phase-3--content--geo-expansion).

---

## 9. What is already strong (keep it)

- Excellent [llms.txt](public/llms.txt).
- Clean single-`<h1>` per page; sensible H2/H3 structure on most pages.
- Comprehensive Organization + WebSite JSON-LD in [index.html](index.html#L109).
- Good OG / Twitter cards; correct canonical strategy.
- HSTS enabled; http→https is a permanent 308; `robots.txt` + sitemap wired up.
- Genuinely hand-written (not spun) service copy; code-splitting via `manualChunks`.

---

## 10. Phase 1 — Rendering fix (root cause)

**Objective:** ship full HTML content (body + per-page JSON-LD) to every crawler, return correct HTTP statuses, and stop the blog middleware from degrading indexing.

| # | Task | Files | Acceptance criteria |
|---|---|---|---|
| 1.1 | Add true build-time prerendering that renders the **actual DOM** (not just meta) into each static route file. Use a headless-Chrome approach (e.g. Puppeteer / `react-snap` / `@prerenderer`) after `vite build`, replacing the meta-only [prerender.js](prerender.js). | `prerender.js`, `package.json` build script | `curl` of any route returns real `<h1>` + body text in raw HTML; `dist/**/index.html` contain rendered content |
| 1.2 | Emit **per-page JSON-LD into the static HTML** (Service/FAQPage/Breadcrumb/Article), not just via `useEffect`. Prerendering (1.1) captures the `Seo.jsx`-injected scripts automatically once DOM rendering is real. | `Seo.jsx`, prerender | Rich Results Test passes on static HTML for each page type |
| 1.3 | Return a **real 404** for unknown routes (no soft-404 200s). | `vercel.json`, prerender, `NotFound` | `curl -I /bogus` → `HTTP 404` |
| 1.4 | Fix/replace the **blog middleware**: serve full prerendered article HTML (or remove the meta-refresh stub); include AI bots or let them hit the prerendered file. | `middleware.js` | Googlebot & GPTBot both receive article body + correct meta on `/blog/*` |
| 1.5 | Verify prerender covers **all** sitemap URLs (home, services, case studies, blog, static pages). | prerender, `sitemap.xml` | Every sitemap URL has a content-bearing static file |

**Definition of done for Phase 1:** every URL in the sitemap returns, to a no-JS client, a fully rendered page with H1, body copy, and its structured data; unknown URLs return 404; blog posts expose article text to both Google and AI bots.

---

## 11. Phase 2 — Quick technical wins

Safe, fast, high-ROI. Can be done in parallel with Phase 1 QA.

| # | Task | File |
|---|---|---|
| 2.1 | Make footer Services links real anchors — pass `to={s.path}`. | [Footer.jsx:189](src/Layout/Footer.jsx#L189) |
| 2.2 | Add **Saudi Arabia + South Africa** to `areaServed` (and the Organization schema). | [ServicePage.jsx:59](src/Pages/ServicePage.jsx#L59), [index.html:135](index.html#L135) |
| 2.3 | Fix heading levels — tech-stack titles `as="h3"`; wrap FAQ questions in `h3`. | [ServiceStack.jsx:36](src/Components/ServiceComponents/ServiceStack.jsx#L36), [Faqs.jsx](src/Components/HomePage%20Components/Faqs.jsx) |
| 2.4 | Fix breadcrumb — add a `/services` hub page or remove the middle crumb pointing to `/`. | [ServicePage.jsx:67](src/Pages/ServicePage.jsx#L67) |
| 2.5 | Auto-generate `sitemap.xml` at build with fresh `<lastmod>`; add `hreflang` alternates. | new build step, `public/sitemap.xml` |
| 2.6 | Make apex→www a permanent 301/308. | Vercel domain config / `vercel.json` |
| 2.7 | Replace 116 KB favicon with an optimized small `.ico`/PNG. | [public/favicon-new.png](public/favicon-new.png), [index.html:12](index.html#L12) |
| 2.8 | Add contextual internal links: service→related case studies + sibling services; AboutUs→services; homepage body→case studies. | `ServicePage.jsx`, `AboutUs.jsx`, homepage components |
| 2.9 | Pull the exact "Unparsable structured data" URL from GSC and fix the offending JSON-LD. | GSC → relevant page |

---

## 12. Phase 3 — Content & GEO expansion

Compounding rankings + AEO. Highest effort, largest long-term payoff.

| # | Task | Notes |
|---|---|---|
| 3.1 | **Country landing pages** for all 9 markets (e.g. `/service/{service}` variants or `/{service}-{country}`) with localized H1/H2/body, local intent, and testimonials/FAQs per market. Add `hreflang`. | Single biggest gap vs. stated GEO strategy |
| 3.2 | **Thicken every service page to ~900–1,200 unique words** — prioritize `ui-ux-design` & `digital-marketing`. Add who-it's-for, outcomes, deliverables, problem/solution prose. | [index.js:454-741](src/utils/Constant/index.js#L454) |
| 3.3 | **De-templatize** Process + Industries per service; add descriptive copy to industry chips. | `ProcessSection.jsx`, `ServicePage.jsx` |
| 3.4 | **Add pricing / "starting from"** content + a pricing FAQ on each service page. | service data + FAQs |
| 3.5 | **Replace fake testimonials/reviews/stats** with real, attributable proof (names, companies, logos, verifiable results). | [index.js](src/utils/Constant/index.js#L72) |
| 3.6 | **Expand FAQs to 8–10 per service**, add comparison + location + pricing questions (great for AEO citation). | service FAQs |
| 3.7 | **Strengthen About-page E-E-A-T** — real team bios, named founders, founding story, client logos, credentials. | `AboutUs.jsx`, `index.js` |
| 3.8 | Keep [llms.txt](public/llms.txt) in sync with new pages/pricing/geo. | `public/llms.txt` |

---

## 13. Success metrics & verification

Track in GSC + AI-engine spot checks after each phase.

- **Indexing:** not-indexed count 31 → target < 5; indexed 17 → target 40+ (Pages report).
- **Raw-HTML check:** `curl -A "GPTBot" <url>` returns real body content for every route (Phase 1 gate).
- **Rich results:** Google Rich Results Test passes for Organization, Service, FAQPage, Breadcrumb, BlogPosting on static HTML.
- **HTTP hygiene:** `curl -I /bogus` → 404; apex→www → 301/308.
- **AI presence:** ask ChatGPT / Perplexity / Google AI Overviews "best AI development company in Wellington / New Zealand" and niche queries; confirm the site is retrievable/citable.
- **Rankings:** avg position 8.9 → target < 5 on core service + geo terms; impressions/clicks trend up.
- **Geo:** country terms appear in visible H1/H2/body and `hreflang`; all 9 markets in `areaServed`.

---

## 14. Appendix — how findings were verified

- Read: `index.html`, `prerender.js`, `middleware.js`, `vercel.json`, `vite.config.js`, `public/robots.txt`, `public/sitemap.xml`, `public/llms.txt`, `src/Routes/AllRoutes.jsx`, `src/Components/common/Seo.jsx`, `src/Layout/Footer.jsx`, service/home/about pages + `src/utils/Constant/index.js`.
- Live bot fetches (`curl` with `GPTBot` / `Googlebot` / default UA) confirming: empty root, soft-404 200, apex 307, http→https 308, blog middleware behavior.
- `dist/**/index.html` inspection confirming meta-only prerender (no body `<h1>`).
- Content-quality pass across all 6 services, home, and about (word counts, uniqueness, headings, linking, sample-data flags).

> **Note:** Findings reflect the codebase and live site as of 2026-07-14 on branch `feat/brief-implementation-fonts-portfolio-seo`. Verify the exact "Unparsable structured data" URL directly in GSC — it is the one item that needs the console to pin down precisely.
