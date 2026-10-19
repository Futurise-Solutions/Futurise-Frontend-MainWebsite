import type { Metadata } from 'next'
import JsonLd from '@/components/common/JsonLd'
import PortfolioBody from '@/components/pages/PortfolioBody'
import { buildMetadata } from '@/lib/seo'
import { Projects } from '@/utils/Constant'

/**
 * /portfolio
 *
 * ⚠️ D7 — the source carries this note on the title, and it still applies:
 *   "Brand omitted here on purpose: Seo.jsx appends it only when the result still fits
 *    Google's ~60-character render width. Hardcoding it forced a truncation."
 * buildMetadata reproduces that rule. Do not add the brand by hand.
 */
export const metadata: Metadata = buildMetadata({
  title: 'Portfolio: AI, SaaS & Web Projects',
  description:
    'Real client work: Infinity Bay Trading, Dhanlaxmi Property, Palm Vision Technology and more: SaaS dashboards, AI platforms and real-estate builds we shipped.',
  path: '/portfolio',
  image: '/portfolio.png',
  keywords:
    'web development portfolio, AI app portfolio, SaaS portfolio, React projects, blockchain projects, mobile app portfolio, New Zealand web agency portfolio, case studies',
})

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Futurise Solutions Portfolio',
  url: 'https://www.futurisesolutions.com/portfolio',
  description:
    'Portfolio of AI, SaaS, web, mobile and blockchain projects built by Futurise Solutions.',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.futurisesolutions.com/' },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Portfolio',
        item: 'https://www.futurisesolutions.com/portfolio',
      },
    ],
  },
  hasPart: [
    {
      '@type': 'CreativeWork',
      name: 'HOMIES: Property Management SaaS',
      description: 'Unified SaaS dashboard for real-estate portfolio analytics.',
    },
    {
      '@type': 'CreativeWork',
      name: 'Marty-QR: AI Review Platform',
      description: 'AI-powered review management platform for local businesses.',
    },
    {
      '@type': 'CreativeWork',
      name: 'David Tishbi: Luxury E-commerce',
      description: 'Bespoke luxury jewelry storefront with appointment booking.',
    },
    {
      '@type': 'CreativeWork',
      name: 'Estate: Property Listings Platform',
      description: 'SEO-optimized real-estate search and listings platform.',
    },
    {
      '@type': 'CreativeWork',
      name: 'GDT: Crypto Trading Terminal',
      description: 'Professional perpetuals trading terminal with live charts.',
    },
    {
      '@type': 'CreativeWork',
      name: 'Platinum Peak: Hotel Booking',
      description: 'Immersive direct hotel booking experience.',
    },
  ],
}

/**
 * ItemList over the projects the page actually renders.
 *
 * ⚠️ DERIVED FROM `Projects`, NOT HAND-WRITTEN. The `hasPart` array above is a
 * hand-maintained list of SIX entries while the page renders NINE — it was written
 * before Infinity Bay, Dhanlaxmi Property and Palm Vision Technology were added and
 * nobody updated it, which is exactly the drift a literal invites. Building this node
 * from the same constant PortfolioBody renders means the count cannot fall out of step
 * again.
 *
 * `position` follows render order, so the ItemList and the H2 sequence agree.
 */
const itemList = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Futurise Solutions: published client work',
  numberOfItems: Projects.length,
  itemListElement: Projects.map(
    (p: { Heading: string; aboutProject?: string; location?: string }, i: number) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'CreativeWork',
        name: p.Heading,
        ...(p.aboutProject ? { description: p.aboutProject } : {}),
        ...(p.location ? { locationCreated: { '@type': 'Place', name: p.location } } : {}),
        creator: { '@id': 'https://www.futurisesolutions.com/#organization' },
      },
    })
  ),
}

export default function Page() {
  return (
    <>
      <JsonLd data={[jsonLd, itemList]} />
      <PortfolioBody />
    </>
  )
}
