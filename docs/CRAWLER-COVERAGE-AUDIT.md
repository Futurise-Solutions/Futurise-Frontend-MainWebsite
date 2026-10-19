# Crawler coverage audit — `middleware.js` UA regex

**Measured:** 18 September 2026, against production
`https://www.futurisesolutions.com/blog/ai-agent-development-cost-2026-a-global-price-comparison-for-custom-ai-solutions`

**Method:** live `curl` with each User-Agent string. A request is **covered** when the
response carries `X-Rendered-By: futurise-edge-ssr` and the body contains the article
(16 `<h2>`). A request is a **MISS** when no `X-Rendered-By` header is present — the
crawler received the SPA shell: 0 `<h1>`, 0 `<h2>`, no article text.

> ⚠️ **Correction to this method statement (18 Sep 2026).** An earlier version of this
> line claimed "each **real** User-Agent string". That is true for every row in §1 and
> §2 — those are documented, publicly published crawler UAs. It is **not** true for the
> WhatsApp in-app browser row in §3, where the UA was **assembled by hand** from the
> known shape of an Android WebView UA, **not captured from a real device**. §3 is
> annotated accordingly and its finding is downgraded to unverified.

**Source of the list:** `middleware.js`, `const CRAWLERS` — 45 substrings, joined with
`|`, case-insensitive. Plain substring matching, no word boundaries.

---

## 1. The 14 UAs you asked about — ALL COVERED ✅

Every one passes. The suspected unfurler bug **does not exist**: blog links shared on
LinkedIn, WhatsApp, Slack, Discord, Facebook and X all preview correctly today.

| UA tested | `X-Rendered-By` | `<h2>` | `og:title` | Status |
|---|---|---|---|---|
| Bingbot | `futurise-edge-ssr` | 16 | 1 | ✅ covered |
| Applebot (Siri) | `futurise-edge-ssr` | 16 | 1 | ✅ covered |
| Applebot-Extended | `futurise-edge-ssr` | 16 | 1 | ✅ covered |
| Amazonbot (Alexa) | `futurise-edge-ssr` | 16 | 1 | ✅ covered |
| Meta-ExternalAgent | `futurise-edge-ssr` | 16 | 1 | ✅ covered |
| Bytespider | `futurise-edge-ssr` | 16 | 1 | ✅ covered |
| DuckDuckBot | `futurise-edge-ssr` | 16 | 1 | ✅ covered |
| YandexBot | `futurise-edge-ssr` | 16 | 1 | ✅ covered |
| facebookexternalhit | `futurise-edge-ssr` | 16 | 1 | ✅ covered |
| Twitterbot | `futurise-edge-ssr` | 16 | 1 | ✅ covered |
| LinkedInBot | `futurise-edge-ssr` | 16 | 1 | ✅ covered |
| Slackbot | `futurise-edge-ssr` | 16 | 1 | ✅ covered |
| WhatsApp | `futurise-edge-ssr` | 16 | 1 | ✅ covered |
| Discordbot | `futurise-edge-ssr` | 16 | 1 | ✅ covered |

**No action needed this week on social previews.**

---

## 2. Gaps found — 14 MISSES

These receive the empty SPA shell, silently, with a 200 status.

| UA | Category | Impact | Severity |
|---|---|---|---|
| **AdsBot-Google** | Google Ads landing-page quality | Ad landing-page quality scored against an empty page. Affects Quality Score → CPC, **if** blog URLs are ever used as ad destinations. | 🟠 Medium (conditional) |
| **Mediapartners-Google** | AdSense crawler | Contextual ad matching sees no content. Only matters if AdSense is used. | ⚪ Low |
| **Google-CloudVertexBot** | Vertex AI / Gemini grounding | Enterprise RAG grounding sees nothing. Growing surface. | 🟠 Medium |
| **Google-Firebase** | Firebase App Hosting fetch | Not applicable to this deployment. | ⚪ None |
| **BingPreview** | Bing snapshot/preview | Bing preview thumbnails render an empty page. | 🟡 Low-Med |
| **MicrosoftPreview** | Microsoft link preview (Teams, Outlook) | Links shared in **Teams and Outlook preview as blank**. | 🟠 Medium |
| **MistralAI-User** | Mistral answer engine | Cannot cite the articles. | 🟡 Low-Med |
| **DeepSeekBot** | DeepSeek answer engine | Cannot cite the articles. | 🟡 Low-Med |
| **Mastodon** | Fediverse unfurler | Fediverse shares preview blank. | 🟡 Low-Med |
| **Bluesky (Cardyb)** | Bluesky unfurler | Bluesky shares preview blank. | 🟡 Low-Med |
| **AhrefsBot** | SEO tool | Your own SEO audits report the blog as thin/empty content. | 🟡 Low-Med |
| **SemrushBot** | SEO tool | Same. | 🟡 Low-Med |
| **Screaming Frog** | SEO tool | Same — an in-house crawl would show 83 empty pages. | 🟡 Low-Med |
| **iMessage / generic Safari-like preview** | Apple link preview | Falls back to a real-browser UA; previews blank. | 🟡 Low-Med |

> **Note on Googlebot variants:** `Googlebot-Image` and `Googlebot-News` **are** covered —
> both contain the substring `googlebot`. `AdsBot-Google` and `Mediapartners-Google` are
> not, because the substring is `google` in a different position. This is exactly the
> brittleness described in §4.

---

## 3. Substring matching can match real browsers — ⚠️ SUSPECTED, UNVERIFIED

> ## ⚠️ READ THIS BEFORE CITING THIS SECTION
>
> **The WhatsApp UA below was CONSTRUCTED BY HAND, not captured from a real device.**
>
> I assembled it from the known shape of an Android WebView UA. I did not verify that
> WhatsApp's in-app browser actually emits a UA containing the substring `whatsapp` on
> a real handset. Some in-app browsers append a brand token; others do not.
>
> **This section therefore proves a mechanism, not an incident.** It was previously
> written up as a confirmed "live user-facing bug" — that claim was overstated and is
> withdrawn. Downgraded 18 Sep 2026.
>
> **A real Android WhatsApp UA is being captured by the human (owed item O3).
> Do not re-run this test or re-raise the finding until it lands.**

### What IS verified (regex behaviour, tested locally against the real pattern)

| Case | Matches regex? | Correct? | UA source |
|---|---|---|---|
| Chrome desktop | no | ✅ | real |
| Safari iPhone | no | ✅ | real |
| Firefox | no | ✅ | real |
| Slack desktop app (`Slack_SSB`) | no | ✅ | real |
| Discord desktop app | no | ✅ | real |
| **Android WebView + `WhatsApp/2.23` token** | **yes** | 🔴 would be wrong | ⚠️ **constructed** |

The constructed string:

```
Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 Chrome/119.0 Mobile Safari/537.36 WhatsApp/2.23
```

**If** a real in-app browser emits a token like that, it matches `whatsapp` and the
middleware serves that person the bot HTML — no stylesheet, no navigation, no chat widget,
no booking CTA. WhatsApp is a primary sharing channel in India and the UAE, two of the
three markets with delivered client work, so the impact *would* be material. Unconfirmed.

### The durable finding, which does NOT depend on B1 being confirmed

**Substring matching on brand names can match real browsers, and the risk generalises to
every brand entry in the list — not just `whatsapp`.**

The regex tests 45 bare substrings with no word boundaries and no structural check. Any
entry that is also a token a real browser might carry is a latent false positive. The
same class of error already demonstrably fires in the other direction: `Mediapartners-Google`
misses while `Googlebot-News` hits, purely on substring position (§2).

So the list has two failure modes from one root cause — it matches on brand strings rather
than on what the requester structurally *is*:

- **False negatives** → a crawler silently gets an empty page (14 confirmed, §2)
- **False positives** → a human silently gets the bot page (mechanism confirmed; one
  suspected instance pending a real UA)

**Generalised fix, if the middleware is kept:** distinguish an unfurler's *fetcher* from a
*browser*. A fetcher UA carries no full browser signature; requiring the absence of
`Chrome/`/`Safari/` alongside a brand token, or anchoring to the standalone `Brand/x.y`
form, closes the whole class rather than one entry.

**Not fixed here** — outside Phase 0's scope, and Phase 6 removes the mechanism entirely.
Tracked as B1 in `IMPROVEMENTS-BACKLOG.md`.

---

## 4. Why this is a structural argument for the migration

The audit substantiates Q1 item 2 and item 3, though not in the way either of us expected.
The named list is *better maintained* than assumed. The problem is the mechanism, not the
diligence:

1. **Every entry is a guess about a string someone else controls.** 14 misses exist today
   despite a 45-entry list that is clearly actively curated.
2. **Substring matching is brittle in both directions.** `Mediapartners-Google` misses
   while `Googlebot-News` hits; `whatsapp` catches a human browser. Both are the same root
   cause.
3. **It fails silently, with a 200.** No error, no log, no Search Console signal. A miss is
   invisible until traffic analysis catches it months later.
4. **The list can only ever be reactive.** Every new answer engine is a gap until someone
   notices and ships a deploy.

**SSG/ISR has none of these failure modes.** Every requester — named, unnamed, human,
machine, future — gets identical server-rendered HTML. The regex, and this entire audit,
cease to exist as a maintenance surface.

That is a sound engineering-debt argument. It is not an indexing emergency: the crawlers
that matter most commercially (Google, Bing, and the major AI engines) are covered today.

---

## 5. Admin exclusion — confirmed on all three fronts ✅

Asked under Q3. `/futurise-admin` is correctly protected:

| Mechanism | Evidence |
|---|---|
| `robots.txt` | `Disallow: /futurise-admin/` — `public/robots.txt` line 7 |
| Page-level `noindex` | `AdminBlogPage.jsx:481` → `<Seo title="Admin" noindex path="/futurise-admin/blog" />` → `robots: noindex, follow` |
| Sitemap | Not in `buildRouteList()` in `prerender.js`, so it is never built and never enters `sitemap.xml` |

**Carry all three into the Next.js port at Phase 5.5.** The `noindex` becomes
`robots: { index: false }` in the route's metadata; the `robots.txt` rule moves to
`app/robots.ts`; the sitemap exclusion is automatic as long as the admin route is not added
to `app/sitemap.ts`.
