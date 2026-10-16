import { MARKETS, baseMarket, marketVariants } from '@/utils/Constant/solutionMarkets'

type Alternate = { hrefLang: string; path: string }
type MarketCode = keyof typeof MARKETS

/**
 * hreflang cluster for a solution and its market variants, or null when it has none.
 * The base page is x-default (plus its own market's tag, if set); each variant carries its
 * market's tag. Every page in the cluster declares the same list, so it is reciprocal.
 */
export function solutionAlternates(slug: string): Alternate[] | null {
  const variants = (marketVariants as Record<string, Record<string, unknown>>)[slug]
  if (!variants) return null
  const baseCode = (baseMarket as Record<string, string | null>)[slug]
  const baseTag = baseCode ? MARKETS[baseCode as MarketCode].hreflang : null
  const list: Alternate[] = [{ hrefLang: 'x-default', path: `/solutions/${slug}` }]
  if (baseTag) list.push({ hrefLang: baseTag, path: `/solutions/${slug}` })
  for (const m of Object.keys(variants)) {
    const tag = MARKETS[m as MarketCode].hreflang
    if (tag) list.push({ hrefLang: tag, path: `/solutions/${slug}/${m}` })
  }
  return list
}
