import type { Metadata } from 'next'
import JsonLd from '@/components/common/JsonLd'
import CaseStudiesBody from '@/components/pages/CaseStudiesBody'
import { buildMetadata } from '@/lib/seo'
import { caseStudies } from '@/utils/Constant/caseStudies'

export const metadata: Metadata = buildMetadata({
  title: 'Case Studies — How We Build, In Detail',
  description:
    'Engineering write-ups of real builds across AI, web, app, blockchain and UI/UX — the architecture, the tradeoffs and the decisions behind each one.',
  path: '/case-studies',
  keywords:
    'Futurise Solutions case studies, AI development case study, SaaS platform case study, mobile app case study, DeFi protocol case study, UI UX redesign case study, SEO growth case study',
})

interface CaseStudy {
  slug: string
  service: string
  hero: { title: string; highlight: string }
}

const studies = Object.values(caseStudies) as CaseStudy[]

/** JSON-LD ported verbatim, including the derived ItemList. */
const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Case Studies — Futurise Solutions',
    url: 'https://www.futurisesolutions.com/case-studies',
    description:
      'Engineering write-ups of software Futurise Solutions has designed and shipped across AI, web, app, blockchain, UI/UX and digital marketing — architecture, tradeoffs and what we would do differently.',
    publisher: { '@id': 'https://www.futurisesolutions.com/#organization' },
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
      ],
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Futurise Solutions Case Studies',
    url: 'https://www.futurisesolutions.com/case-studies',
    numberOfItems: studies.length,
    itemListElement: studies.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `https://www.futurisesolutions.com/case-studies/${s.slug}`,
      name: `${s.hero.title} ${s.hero.highlight} — ${s.service} Case Study`,
    })),
  },
]

export default function Page() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <CaseStudiesBody />
    </>
  )
}
