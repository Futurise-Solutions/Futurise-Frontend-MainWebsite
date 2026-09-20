# Redirect behavioural baseline — production vs port

Measured 2026-09-19 by curl against `https://www.futurisesolutions.com` (production, Vercel)
and `http://localhost:3000` (the Next port).

This file exists because of the rule established after the `/About` redirect loop:

> For platform config, port the BEHAVIOUR, verified by curl against production, not the
> literal entry. Record each one's production behaviour (status code and Location header)
> and assert the port matches.

It is the recorded production behaviour. Phase 7 asserts the port against it.

## Scope of the enumeration

`vercel.json` contains 4 redirects and 10 rewrites. Grep for any uppercase character in
any `"source"` across the whole file returns exactly ONE hit: `/About`.

So `/About` is the only case-VARIANT entry. It is NOT the only case-related divergence —
see `/Home` and `/LLMs` below, which diverge without appearing in any grep, because the
defect is in how the two engines interpret lowercase entries, not in what is written.

## The table

| URL | production | port | match? |
|---|---|---|---|
| `/About`   | **308** → `/about`    | **404**            | ❌ lost redirect |
| `/about`   | 200                   | 200                | ✅ |
| `/Home`    | **404**               | **308** → `/`      | ❌ invented redirect |
| `/home`    | 308 → `/`             | 308 → `/`          | ✅ |
| `/LLMs`    | **404**               | **308** → `/llms.txt` | ❌ invented redirect |
| `/llms`    | 308 → `/llms.txt`     | 308 → `/llms.txt`  | ✅ |
| `/Contact` | 404                   | 404                | ✅ |
| `/contact` | 200                   | 404                | — not yet ported (Phase 5), not a redirect defect |

**Three divergences, all one mechanism.**

## Correction to an earlier statement

`next.config.ts` and the Phase 3 report both said production **301**s `/About`.
It is **308**. Vercel serves `"permanent": true` as 308, not 301.

Both are permanent and both pass link equity, so the O12 conclusion is unchanged — but
the status code `proxy.ts` must emit to match production is **308**, not 301.

## Mechanism, demonstrated not assumed

Next matches redirect `source` case-INSENSITIVELY. Every case permutation of a redirect
source matches:

    /HOME → 308 → /        /HOME is not in the config
    /hOmE → 308 → /
    /LLMS → 308 → /llms.txt
    /lLmS → 308 → /llms.txt

Route RESOLUTION is case-SENSITIVE, which is why removing the `/About` rule leaves a 404
rather than falling through to the `/about` route:

    /ABOUT → 404          (no `source` matches it; no route matches it either)

Vercel's `redirects` are case-SENSITIVE, which is why production 404s `/Home` and `/LLMs`.

This single difference produces the divergence in BOTH directions:
  - a capitalised source loses its redirect (`/About`)
  - a lowercase source gains redirects it never had (`/Home`, `/LLMs`)

## Phase 7 requirement (folded into O12)

All three must be fixed in `proxy.ts` with EXPLICIT case-sensitive comparisons, and
the corresponding entries removed from / kept out of `next.config.ts`:

    pathname === '/About' → 308 '/about'
    pathname === '/home'  → 308 '/'          and `/Home`, `/HOME` must 404
    pathname === '/llms'  → 308 '/llms.txt'  and `/LLMs`, `/LLMS` must 404

`/home` and `/llms` CAN stay in `next.config.ts` only if the invented redirects on their
case variants are judged acceptable. They are not: production 404s them, and a 308 from a
URL that has never existed is a new, wrong signal to crawlers. Move all three to `proxy.ts`.

Assert this table by curl after the Phase 7 change. Do not assert it by reading the config.

## ⚠️ ACCEPTANCE: the 404 rows are assertions, not observations

The natural way to verify Phase 7 is to check that `/About` redirects again. **That is only
half the bug, and it is the less damaging half.**

These must ALL be asserted, and the second group is the one that will be forgotten:

    MUST REDIRECT (308)          MUST 404
    /About  → /about             /Home
    /home   → /                  /HOME
    /llms   → /llms.txt          /hOmE
                                 /LLMs
                                 /LLMS
                                 /ABOUT

A permanent redirect from a URL that has never existed is not cosmetic: it marks those
URLs as worth following, and because the match is case-insensitive the set of resolving
variants is **unbounded** (`/hOmE`, `/HoMe`, …). Production emits none of them.

A Phase 7 run that reports "`/About` → 308 ✅" and stops has **passed while shipping the
worse defect**. Assert the 404 rows explicitly.
