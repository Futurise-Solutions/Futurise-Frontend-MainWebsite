# AGENTS.md — Futurise Solutions Next.js migration

> ## ⚠️ SOURCE-OF-TRUTH PRECEDENCE — READ FIRST
>
> **MIGRATION-INVENTORY.md supersedes MIGRATION-GUIDE.md on all factual claims.
> The guide is process-only.**
>
> The guide was written by auditing the live site from a browser, without the source.
> It got the *process* right and several *facts* wrong. Where they conflict, the
> inventory wins — silently, without asking.
>
> | Document | Authoritative for |
> |---|---|
> | `MIGRATION-INVENTORY.md` | **Facts** — keyframes, easings, theme tokens, API types, route count, component behaviour, copy, JSON-LD, animation values |
> | `MIGRATION-GUIDE.md` | **Process only** — phase order, STOP gates, verification protocol |
> | `AGENTS.md` (this file) | The ten rules, non-negotiable constants |
>
> Known-wrong sections of the guide are annotated in place with `⛔ CORRECTED` blocks
> pointing at the inventory section that holds the real value.

> Place this file at the **root of the repository**. Claude Code, Codex and Cursor read it automatically on every turn. It constrains the agent even when the conversation gets long and the original instructions scroll out of context.

## What this project is

Migrating **futurisesolutions.com** from **Vite + React + React Router + Chakra UI v2** to **Next.js 16 (App Router)**.

**The end goal has two halves, and both are hard requirements:**

1. The new site must look **100% identical** to the old one. Pixel-for-pixel.
2. All 83 blog posts must be server-rendered so crawlers and AI engines can read them.

## Read this first, every session

`MIGRATION-GUIDE.md` in the repo root is the **source of truth**. Read it before doing anything. If this file and the guide disagree, the guide wins.

Phase order is **mandatory**: Phase 0 → 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9.
Each phase has a **STOP GATE**. Do not start phase N+1 until phase N's gate passes and the human has confirmed.

Current phase is recorded in `MIGRATION-STATUS.md`. Update it after every phase.

---

## The ten rules

### 1. You are porting, not designing.
Zero creative licence. Zero unrequested changes. If you think something in the old code is ugly, inefficient, badly named, or could be improved — **port it exactly as it is** and add a line to `IMPROVEMENTS-BACKLOG.md`. Do not act on it.

#### 1a. EXCEPTION — platform config is ported by BEHAVIOUR, not by literal entry. (D29)

**Scope: `vercel.json` and platform routing ONLY.** Rule 1 is unchanged everywhere else.

> Port the **behaviour**, verified by **curl against production** — not the literal entry.
> Record each entry's production behaviour (status code **and** `Location` header) and
> assert the port matches.

**Why rule 1 is wrong for this layer:** the config text is identical, but the engine
interpreting it is not. Porting `{ source: '/About', destination: '/about' }` verbatim —
correct under rule 1 — made `/about` **completely unreachable** (`ERR_TOO_MANY_REDIRECTS`),
because Next matches redirect `source` case-INSENSITIVELY while Vercel's are case-SENSITIVE.

**A grep will not find these.** Only ONE entry in `vercel.json` contains an uppercase
character, yet **three** redirects diverge from production. `/home` and `/llms` are written
in lowercase and are correct as written; they diverge because Next *also* answers `/Home`,
`/LLMs`, `/hOmE`, inventing permanent redirects from URLs that never existed. The defect is
in interpretation, not in text, so it is invisible to inspection of the config.

Measured baseline both sides: **`REDIRECT-BEHAVIOUR-BASELINE.md`**. Assert against it by
curl. **Never assert routing behaviour by reading the config.**

### 2. Never invent a value.
If you cannot find a color, spacing, font size, duration, easing curve, breakpoint or delay in the old source — **stop and ask the human**. Do not guess. Do not use "a sensible default". Do not use "close enough". Write `NOT FOUND — ASK` and stop.

### 3. Read every file completely before porting it.
No skimming. No "I have a general idea of what this does". No porting from a truncated read. If a file is too long to read at once, read it in chunks until you have all of it.

### 4. One unit of work per turn.
One component, or one page. Never batch. Never "and while I was there I also updated…". Commit each one separately.

### 5. Copy strings character-for-character.
The site uses curly quotes (`'` `"`), em dashes (`—`), middots (`·`) and arrows (`→`). Straightening a quote is a content change. Rewording a sentence is a content change. Fixing a typo is a content change. None of these are allowed without asking.

### 6. Copy animation values literally.
Every framer-motion `initial`, `animate`, `whileInView`, `viewport`, `transition` object. Every number, every easing array, every stagger delay. A changed easing will pass a screenshot diff and still feel wrong. Same for CSS `@keyframes` — copy the whole body.

### 7. The geo pages are six different pages, not one template.
`/nz` `/us` `/au` `/ca` `/ae` `/europe` share a layout shell but have **completely different copy** — about 21,500 words total, all market-specific. Six separate `page.tsx` files, six separate content modules. Building them from one template destroys the content **and still passes the screenshot diff**. This is the single most dangerous step in the project.

### 8. Verify with tooling, not with your opinion.
"This looks correct to me" is not verification. After every component and every page:
- run `scripts/visual-diff.mjs` for that route → must be **< 0.5%**
- run `scripts/content-check.mjs` for that route → word count within **±5%** of Appendix A
- run `scripts/font-parity.mjs` for that route → both checks PASS
- run `scripts/resolution-checks.mjs` for that route → all checks PASS
Paste the actual numbers. If a gate fails, fix it before moving on. Never report a phase complete with a failing gate.

#### 8a. NO CHECK MAY REPORT PASS WITHOUT REPORTING ITS COVERAGE.

Every check prints how much it actually measured, and **fails loudly at zero**.

> **Why this rule exists.** `font-parity.mjs` initially paired elements by index.
> Production had 331 text elements; the port had 89. Almost every comparison was
> silently skipped, and the tool reported **PASS while measuring close to nothing**.
> That is worse than having no check at all, because it manufactures confidence.

"Verify with tooling" is only true if the tooling says how much it looked at.

| Check | Must report |
|---|---|
| `font-parity.mjs` | `PAIRED BY TEXT (actually compared): N` — shouts at 0 ✅ done |
| `resolution-checks.mjs` | element count probed, per check |
| `visual-diff.mjs` (D28) | excluded area %, images measured, targets compared |
| `content-check.mjs` | words compared, elements counted |
| `string-fidelity.mjs` (Sweep B) | strings compared, files scanned |

A coverage number of 0 — or one far below what the route contains — is a **FAIL**,
not a pass.

#### 8b. EVERY NEW CHECK SHIPS WITH A CONTROL.

Before a check is trusted, deliberately reintroduce the defect it targets, confirm the
check **fails**, then restore. A check that has never failed has never been shown to
work. Record the control result next to the check.

Done so far:
- `agentRules: false` → flag on regenerates the files, off does not
- `font-parity.mjs` → restoring the `fallback` array produced `CHECK 1: 2 MISMATCH` on
  the wordmark, with the exact stack corruption printed

#### 8c. EVERY CHECK DECLARES AN EXPECTED COVERAGE AND FAILS BELOW IT.

8a catches **"measured nothing."** It does **not** catch **"measured a third of it"** —
a non-zero, reported, and wrong coverage number, which is the index-pairing bug again,
just above zero instead of at it.

> Phase 4 ports **31 keyframes**. If check 1's coverage goes 1 → 12 when it should be 31,
> it PASSES: non-zero, dutifully reported, and silently missing nineteen animations.

So every check states what it **expects** to find, and fails when actual < expected.

**Expected values come from the inventory, never from the last run.** A number derived
from the previous run just ratchets in whatever was already broken.

| Check | Expected coverage source |
|---|---|
| keyframes per route | the 36-keyframe inventory (§D.3) — 31 carried over |
| images per route | the asset inventory (§G) |
| text elements per route | **production's own count** (e.g. 331 on `/`) |
| strings per component | the source file being ported |
| fonts: weight/style combinations | the 11 declared faces (§D.2) |

A check that cannot state what it expects to find cannot tell you when something went
missing. Seed expectations while the numbers are small and knowable, not at Phase 5.

### 8d. A CLAIM WITH NO NAMED CHECK IS "OBSERVED, NOT VERIFIED".

> **A claim with no named check is marked "observed, not verified." It cannot be cited as
> evidence for a deviation, NOR as evidence that a gate passed.**

Every gate record states, per claim, **which check produced it and that check's coverage
number**. A claim with no check named cannot be cited for either purpose.

**Why 8a and 8c do not already cover this.** They govern checks that *exist*: 8a catches a
check that measured nothing, 8c a check that measured too little. **A claim made without
any check never enters the results array at all** — there is no coverage number to be
zero, so nothing fires. It is invisible to both.

Three instances, each found by accident rather than by an instrument, and **all three were
gate-pass claims** — which is why the second clause is not limited to deviations:

| Claim | Reality |
|---|---|
| Gate 2: "all 18 computed values match" | True, but sampled **pure Latin only** — the Arial defect was present and passed |
| font-parity: "PASS" | Paired **331 elements against 89 by index** — PASS while measuring almost nothing |
| Gates 1 & 2: "zero hydration warnings" | **No console listener existed in any script** |

**This does not mean build a check for everything.** Some claims are correctly (b): a
build's or `tsc`'s exit status is self-reporting, and npm is the authority on its own peer
resolution. The rule is about **labelling honestly**, so an unverified claim cannot be
silently promoted to evidence.

Two legitimate remedies besides building a standing check:
- **A dated one-time measurement.** Cite the command and the date. It fixes the record but
  does **not** run at future gates — say so explicitly.
- **Downgrade the wording** and carry it as an owed item to the phase that owns it.

Full classification of Phases 1–3: `GATE-CLAIM-AUDIT.md`.

### 9. Chakra UI v2 stays for now.
Do not migrate to Chakra v3. Do not migrate to Tailwind. Do not "modernise the styling while we're in here". That is Phase 8+, after launch, and it is not your call to start early. Chakra v2 is confirmed compatible with React 19 and Next.js 16.

### 10. Say what you could not do.
End every turn with what is still unknown, what you could not read, what you guessed at (you should have guessed at nothing), and what the human needs to decide. Silence about a problem is worse than the problem.

### 11. READ THE DIFF OF EVERY EDIT BEFORE RUNNING ANYTHING.

After every edit to a source or script file, print that file's diff and read it.

> **Why this is a rule and not advice.** "Direct edits only" was written down twice as a
> lesson and failed twice anyway. The second failure: a script was patched through a
> shell generator, the shell consumed a backslash, `split(/\s+/)` became `split(/s+/)`,
> `parseW("400 500")` returned `NaN`, every weight-range comparison failed, and the
> result was misdiagnosed as a deeper problem for a full cycle.
>
> Every code failure mode in this project has an instrument. This one was relying on
> willpower. It now has an instrument too.

The diff converts **"the edit I intended"** into **"what is actually on disk"** — exactly
what check 3b does for fonts (declared vs *rendered*) and what rule 8a does for checks
(reported vs *measured*). Same principle, applied to my own edits.

**If an edit feels mechanical enough to generate, that is precisely when the diff
matters — mechanical edits are the ones nobody reads.**

Practically:
- Prefer a direct editing tool over any generator. Never patch source with a shell script.
- After editing: `git diff -- <file>` (or read the changed region) **before** running it.
- An edit that cannot be diffed cannot be reviewed, and an unreviewed edit is not a port.

---

## Next.js 16 specifics that will bite you

Your training data probably predates these. Check `node_modules/next/dist/docs/` for the installed version's docs.

| Thing | Next.js 16 behaviour |
|---|---|
| `params` / `searchParams` | **Promises.** `const { slug } = await params`. Synchronous access was removed. |
| `cookies()` `headers()` `draftMode()` | Async only. |
| Turbopack | Default for `next dev` and `next build`. No `--turbopack` flag needed. A custom webpack config makes the build **fail** unless you pass `--webpack`. |
| `middleware.ts` | Renamed to `proxy.ts`, exported function renamed to `proxy`. Node runtime only. |
| `next lint` | Removed. Use ESLint/Biome directly. |
| `revalidateTag('x')` | Needs a second argument: `revalidateTag('x', 'max')`. |
| `images.qualities` | Defaults to `[75]` only. Declare others explicitly. |
| `images.minimumCacheTTL` | Default changed 60s → 4h. |
| `images.imageSizes` | `16` removed from the default array. |
| `images.domains` | Deprecated. Use `remotePatterns`. |
| `scroll-behavior: smooth` | Next no longer overrides it on navigation unless `<html data-scroll-behavior="smooth">`. |
| Parallel route slots | Every slot now needs an explicit `default.js` or the build fails. |
| React | 19.2 required for App Router. |
| Node | 20.9+ required. |

---

## Non-negotiable constants

Do not change any of these. They are measured from the live site.

```
Background:        #08080d
Body text:         #f4f2ff
Brand 500:         #7b6cff
Accent solid:      #b4a0ff
Surface:           rgba(255,255,255,0.035)
Surface hover:     rgba(255,255,255,0.06)

Violet scale (MISSING from the original list — every brand gradient uses it):
  violet.300       #dcc0ff
  violet.400       #c596ff
  violet.500       #b57bff     ← linear(135deg, brand.500, violet.500)
  violet.600       #9d4edd

Content width (MISSING from the original list — sets EVERY section's width):
  sizes.container.site = clamp(1200px, 85vw, 1560px)
  Used as maxW="container.site" site-wide. A literal 1200px is NOT equivalent.

Signature easing curve (use everywhere; see inventory §F.1):
  framer-motion:   [0.22, 1, 0.36, 1]
  CSS:             cubic-bezier(0.22,1,0.36,1)
  NOT [0.16, 1, 0.3, 1] — that value appears nowhere in the codebase.

Gradient text:     linear-gradient(135deg, #b4a0ff 0%, #d4a5ff 100%)

Heading font:      Zangezi, then Aeonik Trial
Body font:         Aeonik Trial
h1 desktop:        72px / 700 / letter-spacing -2.16px
h2 desktop:        42px / 700 / letter-spacing -0.84px

Color mode:        dark only. initialColorMode: 'dark', useSystemColorMode: false
Hydration root:    keep <div id="app"> — legacy CSS selectors depend on it

Contact form fields (DO NOT RENAME):
  user_name, company, user_email, phone, message

Analytics IDs:
  GA4      G-5FKB0BL3MQ
  Clarity  ycomehde8x

Blog API:
  https://futurise-backend-main-website.vercel.app/api/blogs
  https://futurise-backend-main-website.vercel.app/api/blogs/<slug>
```

## Route count check

| | Count |
|---|---|
| Static routes | **28** (27 public + `/futurise-admin/blog`) |
| Blog posts | 83 |
| Sitemap URLs | ≥ 110 (admin is excluded — `noindex` + `robots.txt` + absent from sitemap) |
| Route files you should end up writing | ~18 |

> ⛔ **CORRECTED:** the original said 27 static routes. `src/Routes/AllRoutes.jsx`
> declares **28**; the guide's inventory omitted `/futurise-admin/blog` entirely.
> See inventory §B and §0.5.

Every path must stay **identical**. No path changes, no trailing-slash changes, no "cleaner" URLs.

---

## What "done" means

Not "the site builds". Not "it looks right". Done is:

- [ ] All 27 static routes: visual diff **< 0.5%** at 390 / 768 / 1440 px
- [ ] All 27 static routes: word count within **±5%** of Appendix A
- [ ] `curl http://localhost:3000/blog/<any-slug> | grep -c "<h2"` returns **> 0**
- [ ] All 110 URLs return 200; unknown paths return **404** (not 200)
- [ ] All titles, descriptions, canonicals and JSON-LD block counts match or are logged as deliberate changes
- [ ] Contact form sends a real test email
- [ ] Lighthouse mobile ≥ 90 on `/`, `/service/web-development`, `/blog/<post>`

---

## If you are about to do any of these, stop and ask

- Change a color, font size, spacing value or animation timing
- Reword, shorten, "clean up" or fix a typo in any user-facing string
- Build the geo pages from a shared template
- Replace Chakra with anything
- Change a URL path
- Rename a form field
- Skip a STOP GATE because "it's basically fine"
- Mark a phase complete with a failing verification number
