import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import JsonLd from '@/components/common/JsonLd'
import SolutionPageBody from '@/components/pages/SolutionPageBody'
import { buildMetadata } from '@/lib/seo'
import { solutionAlternates } from '@/lib/solutionAlternates'
import { solutions } from '@/utils/Constant/solutions'

/** /solutions/[slug] — one route file, one prerendered page per entry in the content module. */
type Params = { slug: string }

interface Solution {
  slug: string
  name: string
  markets: string[]
  answer: string
  meta: { title: string; description: string; keywords: string }
  faqs: Array<{ q: string; a: string }>
}

const items = solutions as Record<string, Solution>
const SITE = 'https://www.futurisesolutions.com'

export const dynamicParams = false

export function generateStaticParams(): Params[] {
  return Object.keys(items).map((slug) => ({ slug }))
}

/** ⚠️ Next 16: `params` is a Promise and must be awaited. */
export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const solution = items[slug]
  if (!solution) return {}

  return buildMetadata({
    title: solution.meta.title,
    description: solution.meta.description,
    path: `/solutions/${slug}`,
    keywords: solution.meta.keywords,
    alternates: solutionAlternates(slug),
  })
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const solution = items[slug]
  if (!solution) notFound()

  const url = `${SITE}/solutions/${slug}`
  const worldwide = solution.markets.includes('Global')

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: solution.name,
      description: solution.answer,
      serviceType: solution.name,
      url,
      provider: { '@id': `${SITE}/#organization` },
      areaServed: worldwide
        ? 'Worldwide'
        : solution.markets.map((name) => ({ '@type': 'Country', name })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: solution.faqs.map((f) => ({
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
        { '@type': 'ListItem', position: 3, name: solution.name, item: url },
      ],
    },
  ]

  return (
    <>
      <JsonLd data={jsonLd} />
      <SolutionPageBody slug={slug} />
    </>
  )
}
