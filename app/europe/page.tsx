import type { Metadata } from 'next'
import JsonLd from '@/components/common/JsonLd'
import EuropePageBody from '@/components/pages/EuropePageBody'
import { buildMetadata } from '@/lib/seo'
import { CONTACT, NavbarservicesOptions } from '@/utils/Constant'
import { euMeta, euFaqs } from '@/utils/Constant/europe'

/**
 * /europe
 *
 * ⚠️ Europe is a REGION page, not a country page: it is deliberately OUTSIDE the
 * COUNTRIES registry and the hreflang cluster, so it carries no `alternates`. Do not add
 * it to COUNTRY_ALTERNATES — see src/Pages/EuropePage.jsx for the reasoning.
 */
const SITE_URL = 'https://www.futurisesolutions.com'

export const metadata: Metadata = buildMetadata({
  title: euMeta.title,
  description: euMeta.description,
  path: '/europe',
  keywords: euMeta.keywords,
  image: '/home.png',
})

/** JSON-LD ported verbatim — four blocks. */
const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/europe`,
    name: `${euMeta.title}: Futurise Solutions`,
    url: `${SITE_URL}/europe`,
    description: euMeta.description,
    inLanguage: 'en',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#organization` },
    primaryImageOfPage: { '@type': 'ImageObject', url: `${SITE_URL}/home.png` },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/europe#service`,
    name: 'Futurise Solutions Europe',
    url: `${SITE_URL}/europe`,
    description: euMeta.description,
    parentOrganization: { '@id': `${SITE_URL}/#organization` },
    // Place, not Country. Futurise serves European clients remotely and has no
    // establishment in any European state; areaServed describes where a service is
    // provided, which is exactly this, and carries no claim of local presence.
    areaServed: [
      { '@type': 'Place', name: 'Europe' },
      { '@type': 'Place', name: 'European Economic Area' },
      { '@type': 'Country', name: 'United Kingdom' },
    ],
    availableLanguage: ['English'],
    currenciesAccepted: 'EUR, GBP',
    email: CONTACT.email,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Software development services for European businesses',
      itemListElement: NavbarservicesOptions.map((s: { option: string; path: string }) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.option, url: `${SITE_URL}${s.path}` },
      })),
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SITE_URL}/europe#faq`,
    mainEntity: euFaqs.map((f: { question: string; answer: string }) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Europe', item: `${SITE_URL}/europe` },
    ],
  },
]

export default function Page() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <EuropePageBody />
    </>
  )
}
