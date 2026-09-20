import localFont from 'next/font/local'

/**
 * Brand typography — Zangezi (display headings) + Aeonik Trial (body).
 *
 * ── PORTED FROM src/index.css, ALL ELEVEN FACES ──────────────────────────────
 * The source of truth is MIGRATION-INVENTORY.md §D.2, NOT the guide's §4.2 list.
 * The guide named only six faces because it enumerated `document.fonts` on the homepage
 * alone, so every italic cut — which that page never renders — was invisible to it.
 * Wiring six would leave all italic text browser-synthesised (faux-oblique), a parity
 * failure a homepage screenshot diff cannot catch. §4.2 is now annotated as corrected.
 *
 * ── WHY THE WEIGHT RANGES MATTER ─────────────────────────────────────────────
 * Several faces declare a RANGE ('500 800', '400 500', '600 800') rather than a single
 * weight. That is deliberate and load-bearing: Zangezi ships no true bold cut, so heavier
 * requests are mapped onto the Regular cut to avoid the browser synthesising a fake bold.
 * Collapsing any range to a single weight changes the rendering of every heading.
 *
 * next/font/local accepts the same 'min max' string CSS does and emits it verbatim into
 * the generated @font-face, so the ranges survive the port unchanged.
 *
 * ── NO @font-face IN globals.css ─────────────────────────────────────────────
 * next/font generates the @font-face blocks and self-hosts the files. The eleven blocks
 * from the old src/index.css are deliberately NOT carried over — keeping both would
 * declare every family twice and double-download each face.
 *
 * ── PRELOAD IS OFF. THIS IS DELIBERATE — DO NOT FLIP IT TO true. ─────────────
 * next/font's `preload` is PER-FAMILY, not per-face: `preload: true` emits a
 * <link rel="preload"> for EVERY src entry in that family. With all eleven faces declared
 * that produced eleven preload tags — including all five italics — putting ~245 KB of
 * font on the critical path to render two cuts. Verified by inspecting the built HTML.
 *
 * The old Vite app preloads NO font at all: src/index.css declares plain @font-face with
 * `font-display: swap`, so the browser fetches each cut lazily, only when a glyph actually
 * needs it. `preload: false` reproduces that behaviour exactly, which is what parity
 * requires here.
 *
 * All eleven remain DECLARED and `display: 'swap'` — they load on demand, nothing blocks
 * paint, and no face is double-downloaded. Measured after this change: 4 of 11 fetched on
 * the scratch page (the two normal cuts in use, plus the italic when italic text renders).
 *
 * If a future phase wants the LCP heading cut preloaded, do it with an explicit
 * <link rel="preload"> for that ONE file in the layout — not by flipping this flag.
 *
 * ⚠️ LICENSING — BLOCKING FOR LAUNCH (owed item O9, backlog A6).
 * These are TRIAL files ('*_Trial-*', family literally "Aeonik Trial"). Trial licences
 * normally forbid production web embedding. public/fonts/COPYRIGHT.txt needs a human
 * read. The exposure exists on the live site today; this migration copies it forward.
 */

/* ── PHASE 8 (backlog A8): the two ABOVE-THE-FOLD cuts are preloaded ──────────
   `preload` is per-FAMILY, so the only way to preload one face without preloading all
   eleven is to declare that face as its own family. These two are the cuts check 3b
   measures on a first paint — h1 renders Zangezi08_Trial-Regular, body copy renders
   AeonikTRIAL-Regular — so they are on the critical path and everything else is not.

   ⚠️ THE FILES ARE NOT SUBSETTED. They are trial fonts pending a licence (see D12), so
   they ship whole; this changes only WHEN they are fetched, never what they contain.

   ⚠️ Each preloaded face is declared here AND still listed in its parent family below.
   That is deliberate: the family needs the full weight range for the cascade to resolve
   correctly, and next/font deduplicates the underlying file, so the byte is fetched once.
   The preloaded variable is what the two above-fold rules reference. */
export const zangeziDisplay = localFont({
  src: '../public/fonts/Zangezi08_Trial-Regular.woff2',
  weight: '500 800',
  style: 'normal',
  variable: '--font-zangezi-display',
  display: 'swap',
  preload: true,
  adjustFontFallback: false,
})

export const aeonikBody = localFont({
  src: '../public/fonts/aeoniktrial-regular.woff2',
  weight: '400 500',
  style: 'normal',
  variable: '--font-aeonik-body',
  display: 'swap',
  preload: true,
  adjustFontFallback: false,
})

export const zangezi = localFont({
  src: [
    {
      path: '../public/fonts/Zangezi08_Trial-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/Zangezi08_Trial-SemiLight.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      // variable-style range: heavier requests get the Regular cut, no synthetic bold
      path: '../public/fonts/Zangezi08_Trial-Regular.woff2',
      weight: '500 800',
      style: 'normal',
    },
    {
      path: '../public/fonts/Zangezi08_Trial-LightItalic.woff2',
      weight: '300 400',
      style: 'italic',
    },
    {
      path: '../public/fonts/Zangezi08_Trial-Italic.woff2',
      weight: '500 800',
      style: 'italic',
    },
  ],
  variable: '--font-zangezi',
  display: 'swap',
  preload: false,
  // NO `fallback` array — see the note in the aeonik declaration below. Every consumer
  // supplies its own fallbacks after the variable, exactly as the old stacks did.
  adjustFontFallback: false,
})

export const aeonik = localFont({
  src: [
    {
      path: '../public/fonts/aeoniktrial-light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/aeoniktrial-regular.woff2',
      weight: '400 500',
      style: 'normal',
    },
    {
      path: '../public/fonts/aeoniktrial-bold.woff2',
      weight: '600 800',
      style: 'normal',
    },
    {
      path: '../public/fonts/aeoniktrial-lightitalic.woff2',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../public/fonts/aeoniktrial-regularitalic.woff2',
      weight: '400 500',
      style: 'italic',
    },
    {
      path: '../public/fonts/aeoniktrial-bolditalic.woff2',
      weight: '600 800',
      style: 'italic',
    },
  ],
  variable: '--font-aeonik',
  display: 'swap',
  preload: false,

  /**
   * ⚠️ NO `fallback` ARRAY. Also a parity requirement.
   *
   * next/font bakes the `fallback` array INTO the CSS variable, so
   * `--font-aeonik` becomes the whole stack:
   *     aeonik, -apple-system, system-ui, sans-serif
   * not just the family name.
   *
   * Every consumer already appends its own fallbacks after the variable, so the array
   * was duplicating them — and worse, INSERTING them in the wrong place. The legacy
   * `#app` rule is `var(--font-aeonik), 'Inter', sans-serif`, which expanded to:
   *     aeonik, -apple-system, system-ui, sans-serif, Inter, sans-serif
   * putting `system-ui` AHEAD of `Inter`, where the old stack went straight from Aeonik
   * to Inter. For characters Aeonik does not cover this changed which face won.
   *
   * MEASURED on the footer markets separator `·` (U+00B7), at 1440px:
   *   production   29px box  (24px padding + ~5px glyph)
   *   port         27px box  (24px padding + 3.047px glyph)
   *   the same glyph measures 4.672px in aeonik/Arial/-apple-system/sans-serif
   *   and 3.047px in system-ui — i.e. system-ui was winning.
   *
   * 2px per separator x 6 separators shifted every market link, and was the largest
   * single contributor to the footer diff.
   *
   * Omitting `fallback` makes the variable resolve to the family name alone, so each
   * consumer's own stack is honoured exactly as written in the original source.
   */

  /**
   * ⚠️ MUST STAY false. This is a PARITY requirement, not a preference.
   *
   * By default next/font synthesises an extra @font-face and splices it into the stack:
   *
   *   @font-face { font-family: "aeonik Fallback";
   *                src: local("Arial"); size-adjust: 101.4%;
   *                ascent-override: 91.72%; descent-override: 20.71%; line-gap-override: 0% }
   *
   * so the computed family becomes
   *   `aeonik, "aeonik Fallback", -apple-system, system-ui, sans-serif`
   * where the old app had
   *   `'Aeonik Trial', -apple-system, system-ui, sans-serif`
   *
   * It exists to reduce CLS during the swap, and for a from-scratch build it is a good
   * default. For a pixel-parity PORT it is wrong: any character the real face does not
   * cover — here the U+2022 bullets in the announcement bar — lands on Arial SCALED TO
   * 101.4% instead of plain Arial, at a different advance width.
   *
   * MEASURED on the 168-character announcement string:
   *   production                                    984.3438px
   *   port with the fallback in the chain           981.0469px   (-3.2969px)
   *   port, `aeonik` alone (no synthetic fallback)  983.5000px
   *   the synthetic fallback alone                 1009.1719px
   *
   * The 3.3px reproduced EXACTLY in a bare <div> outside the component, with emoji and
   * nbsp runs measuring identically — so it was never shaping noise, and never the
   * component's fault. It was this injected face.
   *
   * Why it mattered so much visually: the bar paints its glyphs with a gradient clipped
   * to the text (`background-clip: text` + `-webkit-text-fill-color: transparent`) and
   * `background-size: auto`, i.e. sized to the ELEMENT. A width change remaps which part
   * of the gradient every glyph samples, so a 0.3% width error became a 9-11% pixel diff.
   *
   * Setting this false restores the exact old stack shape. Re-verify with a width
   * measurement, not a visual check, if fonts are ever touched again.
   */
  adjustFontFallback: false,
})

/** Convenience: both CSS variables, for the <html> className. */
export const fontVariables = `${zangezi.variable} ${aeonik.variable} ${zangeziDisplay.variable} ${aeonikBody.variable}`
