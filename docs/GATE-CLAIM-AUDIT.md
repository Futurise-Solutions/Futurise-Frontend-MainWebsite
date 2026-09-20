# Gate claim audit — Phases 1, 2, 3

Every claim in the Phase 1, 2 and 3 gate records, classified:

- **(a) MECHANICALLY VERIFIED** — a check produced this, named, with its coverage number
- **(b) ASSERTED BY INSPECTION** — no check produced it; a human (me) looked and concluded

Written 19 Sep 2026, after discovering that "zero hydration warnings" had been asserted at
two gates with **no detector in existence**.

## Why this audit exists

Rules 8a and 8c catch a check that measures nothing or measures too little. **Neither
catches a claim made without a check at all** — the claim never enters the results array,
so there is no coverage number to be zero. Three instances, all found by accident:

| # | Claim | What was actually happening |
|---|---|---|
| 1 | Gate 2 "all 18 computed values match" | True, but sampled **pure Latin only** — the Arial defect was present and passing |
| 2 | font-parity "PASS" | Paired **331 elements against 89 by index** — reported PASS while measuring almost nothing |
| 3 | Gates 1 & 2 "zero hydration warnings" | **No console listener existed in any script** |

(1) and (2) are 8a/8c-class and are now covered. **(3) is this class** and is not.

### Structural finding

`ls scripts/` — every instrument is dated **19 Sep**. **Gate 1 was 18 Sep.**
**No instrument existed when Gate 1 passed.** Every Gate 1 row is therefore (b) by
construction: it is either a command reporting its own exit status, or me reading a
devtools value by hand. That is not a failure of Gate 1 — the instruments did not exist
yet — but it means Gate 1's evidence is categorically weaker than Gate 2's or Gate 3's,
and the record did not say so.

---

## GATE 1 (18 Sep) — 12 claims: 0 × (a) at the time, 12 × (b)

**Read the third column before reacting to the second.** All 12 were (b) *when the gate
passed*, because no instrument existed on 18 Sep. **Nine are covered by an instrument
today.** The rows that remain genuinely bare are marked 🔴 — those are the point of this
table; the rest are history, not open risk.

| Claim | Class at the time | Covered today by |
|---|---|---|
| `npm run dev` boots, ready 7.0s | **(b)** | — *self-reporting tooling; correctly (b), no check needed* |
| Chakra styles in View Source, 12 rules SSR'd | **(b)** | ✅ **subsumed by visual diff** (header **0.000%** ×3) — SSR'd styles are what produces those pixels |
| Same in production prerender | **(b)** | ✅ **subsumed by visual diff** (same mechanism, prod build path) |
| **Zero hydration warnings** | **(b)** 🔴 | ✅ **check 7, coverage 5** — built this session; found **D11** on first run |
| Background `#08080d` | **(b)** | ✅ **subsumed by visual diff** — a wrong background fails every route at once |
| Body text `#f4f2ff` | **(b)** | ✅ **subsumed by visual diff** + **check 3b, coverage 4** |
| Brand gradient resolves | **(b)** | ✅ **subsumed by visual diff** (announcement **0.000%** ×3) |
| `container.site` token | **(b)** | ✅ **subsumed by visual diff** — layout width drives every element's x-position |
| `<div id="app">` present | **(b)** | ✅ **check 6, coverage 3** (+ control) |
| `data-scroll-behavior="smooth"` | **(b)** | 🟡 **one-time curl re-verify, 19 Sep** — present. No standing check; low risk (a static attribute in `layout.tsx`) |
| `npm run build` green | **(b)** | — *tool exit status; correctly (b)* |
| `npx tsc --noEmit` exit 0 | **(b)** | — *tool exit status; correctly (b)* — **re-run 19 Sep, still exit 0** |

**Summary: 1 gap closed by a new check, 6 subsumed by the visual diff, 1 re-verified once,
3 correctly (b) and needing nothing.** Zero Gate 1 claims remain both unverified and
load-bearing.

⚠️ **On "subsumed by visual diff":** this is a real but *indirect* argument — the diff
compares rendered pixels, so a regression in any of those values shows up as a percentage,
not as a named failure. It will tell you *something broke*; it will not tell you *the
container token changed*. That is an acceptable trade for values this foundational (they
cannot regress quietly), and it is noted here so the claim is not read as stronger than it is.

**Load-bearing assessment:** only "zero hydration warnings" was load-bearing for a decision
already taken — it is the evidence for *deliberately not using `suppressHydrationWarning`*,
a deviation recorded and defended at the gate. **A check was built (check 7).** It
immediately found a second permanent warning (D11) that inspection had missed at two gates.

Everything else in Gate 1 is either self-reporting tooling (build/tsc — appropriate as (b))
or has since been subsumed by the visual diff, which compares these pixels wholesale.

---

## GATE 2 (19 Sep) — 26 claims: 22 × (a), 4 × (b)

| Claim | Class | Check + coverage |
|---|---|---|
| 18 computed values (h1/h2/body × 6 props) | **(a)** | Hand-run harness, 18 values, prod vs port |
| ⤷ *but sampled pure Latin only* | — | 🔴 Known gap — **Arial defect passed this gate**. Closed by **check 3b** + Sweep C |
| 11 faces declared | **(a)** | **check 3, coverage 6** |
| 0 double-downloads | **(b)** → ✅ **measured 19 Sep** | 5 fetches / 5 unique / **0 duplicates**. Dated one-time measurement, **not** a standing check |
| 0 preloads | **(b)** → ✅ **measured 19 Sep** | Port **0** font preloads, production **0**. Dated one-time measurement, **not** a standing check |
| 4 rendered faces via CDP (h1/h2/p/italic) | **(a)** | **check 3b, coverage 4** |
| Letter-spacing −2.16 / −0.84 unshifted | **(a)** | In the 18 |
| Italic is a real cut, not synthesised | **(a)** | **check 3b** (`isCustomFont`) |
| Versions + zero peer conflicts | **(b)** | npm's own output |

**Load-bearing assessment:**
- **"0 preloads"** and **"0 double-downloads"** are load-bearing — they are the entire
  justification for `preload: false`, a deliberate deviation with a long in-code comment.
  → **RE-MEASURED 19 Sep rather than left ambiguous.** The original record said "0 preload
  tags" without citing how it was counted, which is what made it unclassifiable. Measured
  directly instead of reconstructed from memory:

  ```
  PORT  /  →  totalFontFetches 5, uniqueFaces 5, duplicates [], fontPreloads 0
  PROD  /  →  font preloads 0  (1 rel=preload total, as="image")
  PORT  /  →  2 rel=preload total: as="image", as="script" (dev HMR) — none as="font"
  ```

  **Both numbers confirmed.** Reclassified from (b) to a **dated one-time measurement**.
  The distinction that matters: this **fixes the record**; it does **not** run at future
  gates. The standing check stays deferred as **O13 → Phase 8** with **A8**, because the
  failure mode is a performance regression, not a parity failure.

  📌 Incidental finding: `document.fonts.size` reads **15**, not 11 — **11 project faces
  plus 4 `__nextjs-Geist` faces injected by the dev overlay**. Confirmed dev-only (zero
  "geist" occurrences in SSR HTML and in ported source). Recorded in O13 so the Phase 8
  check does not naively assert 11 and fail in dev.
- Versions/peer-conflicts: (b) is appropriate — npm is the authority on its own resolution.

---

## GATE 3 / Phase 3 closing list (19 Sep) — 9 claims: 7 × (a), 2 × (b)

| Claim | Class | Check + coverage |
|---|---|---|
| Sweep A — all font-family literals use the variable | **(b)** | Grep + my reading of each hit |
| Dependency sweep — 5 installed, 0 peer conflicts | **(b)** | npm output + my reading |
| Check 6 — `#app` flex chain | **(a)** | **check 6, coverage 3** + control |
| Check 1 — animation-name resolves | **(a)** | **coverage 1** |
| Check 2 — declared animations running | **(a)** | **coverage 1** |
| Check 3 — no synthesised weights | **(a)** | **coverage 6** |
| Check 3b — renderer used real webfont | **(a)** | **coverage 4** |
| Check 4 — no broken assets | **(a)** | **coverage 47** |
| Router smoke test — 4 navigations, 1 full load | **(a)** | Scripted, machine-counted |
| Check 7 — no unexpected console errors | **(a)** | **coverage 5**, matched D10+D11, control-tested |

**Load-bearing assessment:** Sweep A is load-bearing — it is the evidence that the Arial
bug class is eradicated rather than fixed in one place. It is a grep, and a grep is a
reasonable instrument for "does this string appear anywhere"; its weakness is that it
cannot see a literal built at runtime. **Recorded as a known limit in the record**, not
re-built. The dependency sweep is not load-bearing for parity.

---

## Actions taken

1. **Check 7 built** — the one (b) claim that was load-bearing for a taken decision.
   Found D11 as a side effect.
2. **Gate 1 record annotated** — header stating no instruments existed on 18 Sep.
3. **"0 preloads" / "0 double-downloads" RE-MEASURED, not downgraded** — both confirmed by
   direct measurement 19 Sep. Reclassified as a dated one-time measurement; **O13** now
   carries only the *standing check* to Phase 8, not the numbers.
4. **Sweep A limit recorded** — grep cannot see runtime-constructed family strings.
5. **No other checks built.** The remaining (b) claims are either self-reporting tooling
   (build, tsc, npm) where (b) is the correct class, or are now subsumed by the visual
   diff, which compares the pixels those hand-reads were standing in for.

## The rule — ✅ ACCEPTED 19 Sep, now **AGENTS.md rule 8d**

Adopted with the second clause **broadened** by the human, and the broadening matters:

> A claim with no named check is marked "observed, not verified." It cannot be cited as
> evidence for a deviation, **NOR as evidence that a gate passed.**

My draft limited it to deviation justifications. **All three founding instances were
gate-pass claims** — Gate 2 passing with the Arial defect, font-parity reporting PASS while
pairing 331 against 89, and two gates asserting a detector that did not exist. The narrower
wording would have covered **none of them**.
