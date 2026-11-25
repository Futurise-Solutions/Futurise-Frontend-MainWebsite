import type { Metadata } from 'next'
import JsonLd from '@/components/common/JsonLd'
import PricingGuideBody from '@/components/pages/PricingGuideBody'
import { buildMetadata } from '@/lib/seo'
import { pricingMeta, pricingFaqs } from '@/utils/Constant/pricing'

/**
 * /pricing
 *
 * ⚠️ D7: the title comes from `pricingMeta.title` and is passed through the same rule
 * the old <Seo> applied. That title is 49 chars, so `+ " | Futurise Solutions"` is 70 —
 * over the 60-char limit — and the BARE title is what ships. buildMetadata reproduces
 * that decision; do not hardcode a branded variant here.
 */
export const metadata: Metadata = buildMetadata({
  title: pricingMeta.title,
  description: pricingMeta.description,
  path: '/pricing',
  keywords: pricingMeta.keywords,
  image: '/og/home-v2.png',
})

/** JSON-LD ported verbatim — an ARRAY of two blocks, as in the source. */
const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: pricingFaqs.map((f: { question: string; answer: string }) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.futurisesolutions.com/' },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Pricing & Engagement',
        item: 'https://www.futurisesolutions.com/pricing',
      },
    ],
  },
]

export default function Page() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <PricingGuideBody />
    </>
  )
}
