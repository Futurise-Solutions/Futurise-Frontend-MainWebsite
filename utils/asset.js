/**
 * Resolve a static image import to a URL string.
 *
 * WHY THIS EXISTS
 * Vite and Next resolve `import img from './x.png'` differently:
 *
 *   Vite  →  "/assets/x-a1b2c3.png"                       (a string)
 *   Next  →  { src: "/_next/static/media/x.hash.png",     (an object)
 *              width: 354, height: 120, blurDataURL: "…" }
 *
 * Every ported component passes these imports straight into Chakra's <Image src={...}>,
 * which expects a string. Handing it the object renders `src="[object Object]"` and a
 * broken image — with NO build error and NO console warning. Resolution check 4
 * (broken assets) catches it, but only after the fact.
 *
 * This keeps the ported call sites reading exactly like the originals — `src={assetSrc(x)}`
 * rather than a conditional at every use — while tolerating both shapes, so the helper is
 * safe if a value is ever already a string.
 *
 * NOTE: this is for Chakra's <Image>. Where a component is converted to next/image in a
 * later phase, pass the IMPORT ITSELF, not this helper — next/image wants the object,
 * because that is where it gets intrinsic width/height from (which is what fixes the 71
 * missing dimension attributes).
 */
export const assetSrc = (asset) =>
  typeof asset === 'string' ? asset : (asset?.src ?? '')

/** Intrinsic dimensions of a static import, when present. */
export const assetSize = (asset) =>
  typeof asset === 'string' ? {} : { width: asset?.width, height: asset?.height }
