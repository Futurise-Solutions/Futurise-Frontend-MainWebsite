import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import JsonLd from '@/components/common/JsonLd'
import CaseStudyDetailBody from '@/components/pages/CaseStudyDetailBody'
import { buildMetadata } from '@/lib/seo'
import { caseStudies } from '@/utils/Constant/caseStudies'

/**
 * /case-studies/[slug] — 6 pages, one route file.
 *
 * The old app registered all six slugs as SEPARATE <Route> entries in AllRoutes.jsx,
 * each passing `slug` as a prop. generateStaticParams replaces that: the six pages are
 * prerendered at build time from the same content module.
 */
type Params = { slug: string }

interface CaseStudy {
  slug: string
  service: string
  year: string
  meta: { title: string; description: string; keywords: string; ogImage?: string }
  hero: { title: string; highlight: string }
  faqs?: Array<{ q: string; a: string }>
}

const studies = caseStudies as Record<string, CaseStudy>

export function generateStaticParams(): Params[] {
  return Object.keys(studies).map((slug) => ({ slug }))
}

/** ⚠️ Next 16: `params` is a Promise and must be awaited. */
export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const study = studies[slug]
  if (!study) return {}

  return buildMetadata({
    title: study.meta.title,
    description: study.meta.description,
    path: `/case-studies/${slug}`,
    image: study.meta.ogImage,
    keywords: study.meta.keywords,
    type: 'article',
    publishedTime: `${study.year}-01-01`,
    section: study.service,
  })
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const study = studies[slug]

  /* The old page rendered <NotFound /> inline, which returned HTTP 200 with 404-looking
     content — a soft 404. notFound() returns a real 404 status. */
  if (!study) notFound()

  /** JSON-LD ported verbatim, including the conditional FAQPage spread. */
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: study.meta.title,
      description: study.meta.description,
      url: `https://www.futurisesolutions.com/case-studies/${slug}`,
      image: `https://www.futurisesolutions.com${study.meta.ogImage || '/home.png'}`,
      author: { '@id': 'https://www.futurisesolutions.com/#organization' },
      publisher: { '@id': 'https://www.futurisesolutions.com/#organization' },
      datePublished: `${study.year}-01-01`,
      about: { '@type': 'Service', name: study.service },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.futurisesolutions.com/' },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Case Studies',
            item: 'https://www.futurisesolutions.com/case-studies',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: `${study.hero.title} ${study.hero.highlight}`,
            item: `https://www.futurisesolutions.com/case-studies/${slug}`,
          },
        ],
      },
    },
    ...(study.faqs?.length
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: study.faqs.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          },
        ]
      : []),
  ]

  return (
    <>
      <JsonLd data={jsonLd} />
      <CaseStudyDetailBody slug={slug} />
    </>
  )
}
