import { solutions } from '@/utils/Constant/solutions'
import { marketVariants } from '@/utils/Constant/solutionMarkets'
import { solutionLinks, variantMarkets } from '@/utils/Constant/solutionLinks'

/**
 * solutionLinks.js is the client-safe copy of the solution index. Throws (failing the
 * build) if it has drifted from solutions.js or solutionMarkets.js.
 */
export function assertSolutionLinksInSync(): void {
  const full = solutions as Record<
    string,
    { slug: string; name: string; market: string; service: string; country: string | null }
  >
  const problems: string[] = []
  const slugs = Object.keys(full)
  if (solutionLinks.map((s) => s.slug).join('|') !== slugs.join('|')) {
    problems.push(`slugs/order differ: links=[${solutionLinks.map((s) => s.slug)}] solutions=[${slugs}]`)
  }
  for (const l of solutionLinks) {
    const s = full[l.slug]
    if (!s) continue
    for (const k of ['name', 'market', 'service', 'country'] as const) {
      if (l[k] !== s[k]) problems.push(`${l.slug}.${k}: links="${l[k]}" solutions="${s[k]}"`)
    }
  }
  const actual = Object.fromEntries(Object.entries(marketVariants).map(([k, v]) => [k, Object.keys(v)]))
  if (JSON.stringify(actual) !== JSON.stringify(variantMarkets)) {
    problems.push(
      `variantMarkets differ: links=${JSON.stringify(variantMarkets)} marketVariants=${JSON.stringify(actual)}`
    )
  }
  if (problems.length) {
    throw new Error(
      `utils/Constant/solutionLinks.js is out of sync with solutions.js / solutionMarkets.js:\n  ${problems.join('\n  ')}`
    )
  }
}
