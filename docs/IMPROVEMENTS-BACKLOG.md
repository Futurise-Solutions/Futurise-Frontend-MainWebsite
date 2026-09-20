# IMPROVEMENTS-BACKLOG.md

Things noticed during the migration that are **not** being acted on inside the port.

**AGENTS.md rule 1:** you are porting, not designing. If something in the old code looks
ugly, inefficient, badly named, or improvable — port it exactly as it is and add a line
here. Do not act on it.

Nothing in this file is authorisation to change anything. Each item needs a separate
decision from the human, after launch.

---

## 🔴 Live bugs (exist in production today, independent of the migration)

### B1 — Brand-substring matching can serve real browsers the bot HTML — ⚠️ **SUSPECTED, UNVERIFIED**

**Raised:** 18 Sep 2026. **Downgraded:** 18 Sep 2026, same day.
**File:** `middleware.js`, `CRAWLERS` regex.
**Status:** 🟡 **Mechanism confirmed. The specific WhatsApp instance is NOT confirmed.**

> ### ⚠️ The UA used to raise this was CONSTRUCTED, not captured.
>
> I assembled the string below from the known shape of an Android WebView UA. **I did not
> test a real device**, and I did not verify that WhatsApp's in-app browser actually emits
> a UA containing the substring `whatsapp`. Some in-app browsers append a brand token;
> others do not.
>
> This was originally filed as a confirmed "live user-facing bug". **That claim was
> overstated and is withdrawn.** A real Android WhatsApp UA is being captured by the
> human — tracked as **O3** in `MIGRATION-STATUS.md`. **Do not re-run or re-raise this
> until it lands.**

```
Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 Chrome/119.0 Mobile Safari/537.36 WhatsApp/2.23
   ↑ CONSTRUCTED BY HAND — illustrative only, not evidence
```

**If** a real in-app browser emits such a token, it matches `whatsapp` and that person is
served the crawler HTML: no stylesheet, no navigation, no chat widget, no booking CTA.
WhatsApp is a primary sharing channel in India and the UAE, so the impact *would* be
material. Unconfirmed.

---

#### What survives regardless — and is the more important finding

**Substring matching on brand names can match real browsers, and the risk generalises to
every brand entry in the list, not just `whatsapp`.**

The regex tests 45 bare substrings with no word boundaries and no structural check. Any
entry that is also a token a real browser might carry is a latent false positive. This is
verified regex behaviour, independent of whether WhatsApp specifically triggers it.

The same root cause already fires in the other direction, confirmed: `Mediapartners-Google`
**misses** while `Googlebot-News` **hits**, purely on substring position (audit §2).

One root cause, two failure modes — the list matches on brand strings rather than on what
the requester structurally *is*:

| Mode | Consequence | Status |
|---|---|---|
| False negative | A crawler silently gets an empty page | ✅ **14 confirmed** (B2) |
| False positive | A human silently gets the bot page | 🟡 Mechanism confirmed; one suspected instance pending O3 |

**Generalised fix, if the middleware is kept:** distinguish a *fetcher* from a *browser*.
A fetcher UA carries no full browser signature; requiring the absence of `Chrome/` or
`Safari/` alongside a brand token — or anchoring to the standalone `Brand/x.y` form —
closes the entire class rather than one entry. **Do not patch `whatsapp` alone**; that
would fix at most one instance of a systemic pattern.

**Why not fixed here:** outside Phase 0's scope, and Phase 6 removes the middleware
entirely. Whether it is worth a standalone fix before then depends on O3.

---

### B2 — 14 crawlers receive an empty shell, silently

**Found:** 18 Sep 2026, `CRAWLER-COVERAGE-AUDIT.md` §2.

`AdsBot-Google`, `Mediapartners-Google`, `Google-CloudVertexBot`, `Google-Firebase`,
`BingPreview`, `MicrosoftPreview`, `MistralAI-User`, `DeepSeekBot`, `Mastodon`,
`Bluesky (Cardyb)`, `AhrefsBot`, `SemrushBot`, `Screaming Frog`, and generic Apple/iMessage
link previews all get the SPA shell with a 200 status.

Highest practical impact: **MicrosoftPreview** (Teams/Outlook link previews render blank)
and **AdsBot-Google** (ad landing-page quality scored against an empty page, *if* blog URLs
are ever used as ad destinations).

**Resolved by the migration** — Phase 6 SSG serves identical HTML to everyone. Listed here
so the exposure is recorded in case the migration is paused.

---

### B3 — CMS admin routes are unauthenticated — **CONFIRMED, UNMITIGATED**

**Found:** Phase 0, inventory §H.1 (as an open question).
**Confirmed:** 18 Sep 2026 by the human, who read the backend source.
**Status:** 🔴 **Confirmed. Not "either/or" — the routes have no auth middleware at all.**

Phase 0 could only observe that the frontend attaches no auth header, and that the site's
HttpOnly cookie is not sent cross-origin to
`futurise-backend-main-website.vercel.app`. That left two possibilities: the CMS is open,
or the calls fail. **It is the first.**

Confirmed open, no auth on any route:

| Method | Route | Handler | Exposure |
|---|---|---|---|
| `POST` | `/api/blogs` | `createBlog` | Anyone can publish |
| `PUT` | `/api/blogs/:id` | `updateBlog` | Anyone can edit any post |
| `DELETE` | `/api/blogs/:id` | `deleteBlog` | Anyone can delete any post |
| `GET` | `/api/blogs/admin/all` | `getAdminBlogs` | **Unpublished drafts are publicly readable** |
| `POST` | `/api/upload` | `uploadImage` (multer, 5 MB, images only) | Anyone can upload to the media store |
| `DELETE` | `/api/upload` | `deleteImage` | Anyone can delete media |

> `POST /api/chat` is also unauthenticated but is a **different class of exposure** —
> billing rather than content. Split out as **B4**.

**CORS is not a mitigation.** Recording both reasons so nobody later mistakes it for one:

1. `server.js` contains `if (!origin) return callback(null, true)` — any request with no
   `Origin` header is allowed through. `curl` sends none by default.
2. More fundamentally: **CORS restricts what browser JavaScript may READ from a response.
   It does not prevent the request from being made or processed.** `allowedOrigins` is not
   a security boundary against direct calls from `curl`, Postman, or any server.

**Resolution: decision D22 — backend auth lands WITH Phase 5.5, not before.**
Frontend-first sequencing is deliberate: Phase 5.5 rewrites the admin frontend anyway,
which is the right moment to introduce the auth path once instead of twice.

**Constraints on me, per D22 and D5:**
- 🔴 **Do not fix, probe, or touch the backend.** Not now, not in Phase 5.5.
- 🔴 The admin frontend ports **line-for-line**, including the fact that it sends no auth
  header today. **Do not "helpfully" add one.**
- 🔴 Phase 5.5 stays **blocked** until the human specifies the auth mechanism.

---

### B4 — `/api/chat` is an open, unmetered LLM proxy — **billing exposure**

**Found:** 18 Sep 2026 by the human. **Phase 0 missed this** — inventory §H.8 documented
the endpoint's contract and fallback behaviour but did not flag that it is unauthenticated.
**Severity: separate from and arguably above B3.**

```
POST /api/chat     — no auth, no rate limit
```

Unlike the blog routes, this one **calls an LLM provider on the company's API key**. The
consequences are different in kind, not just degree:

- **Billing.** Anyone can spend the company's provider credits, at any volume, indefinitely.
- **Open proxy.** It is a free, anonymous LLM endpoint for anyone who finds it — usable
  for arbitrary generation, attributable to this company's account, subject to the
  provider's abuse policies and suspension.
- **No metering.** Nothing caps, counts, or alerts on spend.

The frontend calls it with `{ question, history }` and the backend answers
`{ answer, source: "ai" }` / `{ source: "quota_exceeded" }` / `{ source: "error" }`. That
`quota_exceeded` branch is the only existing backpressure, and it is a *symptom* of the
budget already being consumed, not a control.

**Backend fix: deferred to D22** (with Phase 5.5), same as B3.

**Frontend consequence — this one IS actionable, and it changes what I port:**
See **decision D23** in `MIGRATION-STATUS.md`. The Next.js Route Handler that replaces
this endpoint ships hardened from its first commit. Porting it as-is would recreate the
same exposure in the new codebase, so it is an explicit, recorded exception to
AGENTS.md rule 1.

---

## 🟡 Dead code (safe to delete; needs a human decision per AGENTS.md rule 1)

| # | Item | Evidence |
|---|---|---|
| D1 | **`swiper@^11.1.4` dependency** | Zero imports. Only the four `.swiper-*` CSS override rules reference it. Decision D8: do not install in Next. |
| D2 | **`.swiper-*` CSS rules** (5 rules, `src/index.css`) | Style nothing — no `.swiper` element renders. Decision D8: delete. |
| D3 | **`leaflet` + `react-leaflet` dependencies** | Zero imports. Replaced by the hand-drawn SVG `WorldReachMap.jsx`. |
| D4 | **`.form` CSS block** (5 rules, `src/index.css`) | `grep 'className="form"'` → no matches. `ContactForm.jsx` builds its own Chakra form with *different* values (`rgba(13,13,22,0.6)` vs `0.72`; `p={{base:6,md:8}}` vs `28px`). |
| D5 | **`'Inter'` in the `#app` font stack** | Never loaded by any `@font-face`; not a dependency. Dead fallback between `'Aeonik Trial'` and `sans-serif`. |
| D6 | **`GRADIENT` / `GRADIENT_SOFT` exports** (`src/theme/index.js`) | No importers anywhere. |
| D7 | **`src/utils/Buttons/index.jsx`** (`CustomButton`) | No importers. Legacy variant-name shim. |
| D8 | **Cloudinary `preconnect` + `dns-prefetch`** (`index.html`) | `grep 'res.cloudinary.com' src/` → no matches. Blog media comes from the CMS host. Two wasted connection hints on every page load. |
| D10 | **Nested `<li>` in the Footer "Markets" row — PRE-EXISTING, faithfully ported** | `src/Layout/Footer.jsx:275` uses `<Wrap spacing={0} shouldWrapChildren>` **and** explicit `<WrapItem>` children. `shouldWrapChildren` already wraps each child in a `WrapItem` (`<li>`), so every market link renders as `<li><li>…</li></li>` — invalid HTML. **Verified present on PRODUCTION: 6 nested `<li>`, and 6 in the port — identical.** Under Next this additionally logs *"In HTML, `<li>` cannot be a descendant of `<li>`. This will cause a hydration error."* on every page load (React 19 is stricter than React 18 about tag nesting during hydration). Rendering and the pixel diff are unaffected. **Ported as-is per rule 1.** Fix is one line — drop either `shouldWrapChildren` or the explicit `<WrapItem>` wrappers — but it is a DOM-structure change and must not ride along inside a parity port. Do it post-launch, or as an explicit decision during Phase 8. |
| D9 | **No root `/favicon.ico` fallback** — minor LIVE site issue, post-launch | `index.html` declares an SVG icon (`futurise-logo.svg?v=3`) and an apple-touch-icon (`logo-mark-180.png?v=3`), but **no `favicon.ico`**. Verified by curl: `https://www.futurisesolutions.com/favicon.ico` → **404**. Browsers request `/favicon.ico` unconditionally when no `.ico` is declared, so every visitor generates a 404. The port reproduces this exactly, which is **correct parity** — it is in `IGNORED_404` in `resolution-checks.mjs` for that reason, not because it was waved through. Adding one now would be an unrequested change (rule 1). **One line of work post-launch.** |
| D11 | **`<ColorModeScript>` logs a React 19 script-tag warning on every page — cosmetic, NOT broken** | Chakra's `<ColorModeScript>` (in `app/providers.tsx`) renders a `<script>` inside a client component, so React 19 logs *"Encountered a script tag while rendering React component. Scripts inside React components are never executed when rendering on the client."* on every page load. **It is not broken.** Verified by curl that the inline `localStorage` colour-mode snippet **is present in the server-rendered HTML** and therefore runs before hydration, which is its entire purpose — the warning is about client-side re-render only. Colour mode is additionally guaranteed by `data-theme="dark"`, `style="color-scheme:dark"` and `class="chakra-ui-dark"` being declared **server-side**, which is what actually removed the Phase 1 hydration mismatch; the script is a no-op confirming them. Allowlisted by exact text in check 7 of `resolution-checks.mjs` so it cannot mask a real regression. **Post-launch option:** move the snippet to a `<script>` in `app/layout.tsx` via `dangerouslySetInnerHTML`, or drop it entirely since the server-declared attributes already do the work. Not done now — it touches the colour-mode path, which is load-bearing for every colour in the diff. **🔗 RESOLVE TOGETHER WITH A7 / O8 IN PHASE 8 — same question, and this is evidence for it:** React warns precisely *because* the script only functions via SSR, i.e. its client-side render is already a no-op. If A7 concludes the script is redundant and deletes it, **D11 disappears with it** and its check-7 allowlist entry must be removed in the same change. Do not resolve either one alone. |
| D12 | **Aeonik TRIAL has a reduced character set — some glyphs fall back to Arial. Fixed by the font LICENCE, not by code.** | Blog-card `<h3>` titles render 90–144 glyphs in `Aeonik TRIAL` and **3–6 in `Arial-BoldMT`** (measured via CDP `CSS.getPlatformFontsForNode` on `/blog`). The titles are **pure ASCII** — not smart quotes — so the missing characters are plain glyphs absent from the *trial* cut. **PRE-EXISTING, NOT A REGRESSION:** the font files are byte-identical to production, the family stack now matches, and the titles are the same strings, so production falls back on the same characters. No comparison run, and none needed. **Fix: install the licensed Aeonik, which carries the full character set.** No code change — `theme/fonts.ts` and every `font-family` declaration stay as they are. Until then `resolution-checks.mjs` check 3b will report a FALLBACK on `/blog`; that is this item, and it is expected. |

---

## 🟢 Naming / hygiene (cosmetic; port as-is, fix later if ever)

| # | Item |
|---|---|
| N1 | `src/assests/` — misspelled ("assests", 3 `s`). Path appears in ~40 imports and all 11 `@font-face` `src` URLs. |
| N2 | `src/Components/ContactCusCpmponents/` — misspelled ("Cpmponents"). |
| N3 | `src/Components/ContactCusCpmponents/ServicesWorldwide .jsx` — **trailing space before `.jsx`**. Will need renaming on port regardless. |
| N4 | `public/appdevlopment.png`, `public/digitalmarkiting.png` — both misspelled. Referenced by `serviceImages` in `ServicePage.jsx` and by `prerender.js`. Renaming changes OG image URLs — SEO-visible, do not do casually. |
| N5 | `src/assests/Project Images/infiitybay3.webp` — missing an `n`. The export name is correct. |
| N6 | `src/utils/Constant/index.js` — `clentName` (missing `i`) on all 9 `Projects` entries. |
| N7 | `AboutUsHero.jsx` exports `PageHero`, not `AboutUsHero`, and is shared with `/portfolio`. Filename misleads. |
| N8 | `TechnologyExcellence.jsx` lives in `ContactCusCpmponents/` but is used on `/about`, not `/contact`. |

---

## ⚪ Architecture observations (post-launch, Phase 8+)

| # | Item |
|---|---|
| A1 | **De-Chakra priority order** (guide §6, still valid as *process*): `Faqs` wrapper → `ProcessTimeline` → blog article body → pricing tables → `Footer` → `Section`/`SectionHeading`/`GlassCard`. All pure static content that would become Server Components shipping 0 KB. |
| A2 | `Section.jsx` is the single highest-leverage RSC conversion — used on nearly every page, Chakra-only, no interactivity. |
| A3 | `/privacy` and `/terms` are the best whole-page de-Chakra candidates: ~940 lines of legal prose between them, zero interactivity beyond anchor links. |
| A4 | The four barrel files (`Components/common/index.js`, `Layout/index.js`, `Pages/index.js`, `Chatbot/index.js`) cause chunk bloat — `HomePage.jsx` has a long comment documenting an 11 KB `MissionVision` chunk dragged into the home critical path by one. Being dropped in the port; recorded so the reasoning survives. |
| A5 | `prerender.js`'s build guards (`zeroedStats()`, `brokenHubs()`, sitemap write-refusal) are genuine regression protection with real incidents behind them. Next has no equivalent. Worth rebuilding as a post-build check script — open question in `MIGRATION-STATUS.md`. |
| A8 | **Preload exactly the two above-the-fold font cuts** — ⏸️ **PHASE 8, DO NOT ACT NOW.** Phase 2 set `preload: false` on both families, which is the **parity-correct** answer: production preloads zero fonts (plain `@font-face` + `swap`). But zero is not *optimal* — it is just what the old site happened to do. The right end state preloads exactly the two faces used above the fold (the h1 Zangezi cut and the Aeonik regular body cut) and nothing else. **Mechanism, so Phase 8 does not rediscover it:** next/font's `preload` is **per-`localFont()` call, not per-face** — setting it `true` emitted a `<link rel="preload">` for all eleven declared faces, including every italic, putting ~245 KB on the critical path. Preloading just two therefore requires **splitting those two cuts into their own `localFont()` declarations**, separate from the families that hold the remaining nine. Alternatively, emit one explicit `<link rel="preload">` per file in the layout and leave the flag off. Either way, re-verify with the resolution checks afterwards. |
| A7 | **Is `<ColorModeScript>` still doing anything?** — ⏸️ **VERIFY IN PHASE 8, DO NOT TOUCH BEFORE.** Raised by the human 18 Sep 2026 (owed item **O8**). The site is locked to a single mode (`initialColorMode: 'dark'`, `useSystemColorMode: false`, no toggle anywhere in the UI), and as of Phase 1 the three attributes it sets — `data-theme="dark"`, `style="color-scheme:dark"` on `<html>`, `class="chakra-ui-dark"` on `<body>` — are now **declared server-side** in `app/layout.tsx`. If the script is genuinely redundant it is a **blocking inline script** on every page that could simply be deleted. **Do not delete before Phase 8:** it must first be verified that nothing else depends on it (Chakra reads `localStorage` on mount, and some components may consult `useColorMode()`), and removing it is a runtime-behaviour change that belongs in the performance pass, not in a parity phase. **🔗 NEW EVIDENCE — see D11:** React 19 logs *"Encountered a script tag while rendering React component… never executed when rendering on the client"* on every page load. That warning is a direct answer to half of this question: the script's **client-side** render is already a no-op, and it functions **only** via SSR. So the open part of A7 narrows to "does anything depend on it during the SSR pass or on mount?" **Resolve D11 and A7 in the same change** — if the script goes, D11's check-7 allowlist entry must be removed with it. |
| A6 | 🔴 **Font licences** — files are `Zangezi08_Trial-*` / `aeoniktrial-*`; the CSS family is literally `"Aeonik Trial"`. Trial licences normally forbid production web embedding. `src/assests/fonts/COPYRIGHT.txt` needs a human read. **Exposure exists today; the migration does not create it, but it does copy it forward.** Blocking for launch. |

---

### B5 — Nav highlight goes stale on browser BACK — PRE-EXISTING, faithfully ported

**Found:** 19 Sep 2026, Phase 3 router smoke test.
**Status:** 🟡 Present on **production and the port, identically**. Not a regression.

After a browser Back, the URL updates but the moving nav pill stays on the *previous*
route:

| | production | port |
|---|---|---|
| at `/about` | `hi: ["/about"]` | `hi: ["/about"]` |
| click → `/portfolio` | `hi: ["/portfolio"]` | `hi: ["/portfolio"]` |
| **browser BACK → `/about`** | **`hi: ["/portfolio"]`** ❌ | **`hi: ["/portfolio"]`** ❌ |

Not a timing artefact: measured stable at +500ms, +1.5s, +3s and +5s. A hard reload of the
same URL corrects it.

**Cause:** `NavLinkItem` computes `active` from the pathname, but the *rendered* highlight
is `hovered === index || (hovered === null && active)`. On a POP navigation `hovered`
retains the index of the link the pointer last touched (the one just clicked), so the
hover branch keeps winning. The old app has the same logic with `useLocation()`; the port
uses `usePathname()`. Both behave identically.

**Not fixed** — rule 1. It is a real UX defect worth one line post-launch (reset `hovered`
on pathname change), but fixing it inside a parity port would make the port diverge from
the thing it is being diffed against.
