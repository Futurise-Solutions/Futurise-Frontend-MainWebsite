import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import JsonLd from '@/components/common/JsonLd'
import SolutionMarketBody from '@/components/pages/SolutionMarketBody'
import { buildMetadata } from '@/lib/seo'
import { solutionAlternates } from '@/lib/solutionAlternates'
import { assertSolutionLinksInSync } from '@/lib/solutionLinksGuard'
import { solutions } from '@/utils/Constant/solutions'
import { MARKETS, marketVariants, variantList } from '@/utils/Constant/solutionMarkets'

/** /solutions/[slug]/[market] — prerendered market variants of a solution page. */
type Params = { slug: string; market: string }

interface Variant {
  meta: { title: string; description: string; keywords: string }
  answer: string
  faqs: Array<{ q: string; a: string }>
}

const SITE = 'https://www.futurisesolutions.com'
const names = solutions as Record<string, { name: string }>
const variants = marketVariants as Record<string, Record<string, Variant>>
const markets = MARKETS as Record<string, { label: string }>

// Build-time drift check: the client-safe solutionLinks.js must match the content modules.
assertSolutionLinksInSync()

export const dynamicParams = false

export function generateStaticParams(): Params[] {
  return variantList
}

/** ⚠️ Next 16: `params` is a Promise and must be awaited. */
export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug, market } = await params
  const v = variants[slug]?.[market]
  if (!v) return {}
  return buildMetadata({
    title: v.meta.title,
    description: v.meta.description,
    path: `/solutions/${slug}/${market}`,
    keywords: v.meta.keywords,
    alternates: solutionAlternates(slug),
  })
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug, market } = await params
  const v = variants[slug]?.[market]
  const base = names[slug]
  if (!v || !base) notFound()

  const label = markets[market].label
  const url = `${SITE}/solutions/${slug}/${market}`

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: `${base.name}: ${label}`,
      description: v.answer,
      serviceType: base.name,
      url,
      provider: { '@id': `${SITE}/#organization` },
      areaServed: { '@type': 'Country', name: label },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: v.faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: 'Solutions', item: `${SITE}/solutions` },
        { '@type': 'ListItem', position: 3, name: base.name, item: `${SITE}/solutions/${slug}` },
        { '@type': 'ListItem', position: 4, name: label, item: url },
      ],
    },
  ]

  return (
    <>
      <JsonLd data={jsonLd} />
      <SolutionMarketBody slug={slug} market={market} />
    </>
  )
}
