import type { Metadata } from 'next'
import JsonLd from '@/components/common/JsonLd'
import AboutUsBody from '@/components/pages/AboutUsBody'
import { buildMetadata } from '@/lib/seo'
import { AREAS_SERVED, SAME_AS } from '@/utils/Constant'
import { teamPersonSchema, isTeamPublished } from '@/utils/Constant/team'

/** Ported verbatim from src/Pages/AboutUs.jsx. */
const META_DESCRIPTION =
  'A Wellington-registered digital product studio founded in 2024, with an engineering team in Udaipur, India. Fixed-scope quotes and senior engineers.'

export const metadata: Metadata = buildMetadata({
  title: 'About Futurise Solutions — NZ-Registered Dev Studio',
  description: META_DESCRIPTION,
  path: '/about',
  image: '/about.png',
  keywords:
    'about Futurise Solutions, AI development team, web development company, mobile app developers, blockchain team, New Zealand tech agency, digital product studio',
})

/**
 * JSON-LD ported verbatim, including the two conditional spreads.
 *
 * The `employee` property and the trailing Person nodes are SPREAD rather than set
 * unconditionally: while the team is unpublished they contribute nothing, and an empty
 * array is a worse signal than an absent property. Describing invented people to search
 * engines is the fabricated-authority signal Google's spam policies target — see
 * utils/Constant/team.js.
 */
const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Futurise Solutions',
    url: 'https://www.futurisesolutions.com/about',
    description:
      'Senior team building AI, SaaS, web and mobile products. Registered in Wellington, New Zealand, with delivered client work in the United Arab Emirates, the United States and India.',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.futurisesolutions.com/' },
        { '@type': 'ListItem', position: 2, name: 'About', item: 'https://www.futurisesolutions.com/about' },
      ],
    },
    mainEntity: { '@id': 'https://www.futurisesolutions.com/#organization' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://www.futurisesolutions.com/#organization',
    name: 'Futurise Solutions',
    url: 'https://www.futurisesolutions.com',
    logo: 'https://www.futurisesolutions.com/favicon-new.png',
    slogan: 'Full-cycle digital product studio',
    description:
      'Futurise Solutions is a full-cycle digital product studio building AI & ML systems, SaaS platforms, web and mobile apps, UI/UX design, blockchain, and digital marketing.',
    foundingDate: '2024',
    email: 'business@futurisesolutions.com',
    // No `telephone`. The site publishes no phone number — enquiries run through the
    // booking flow, the contact form and email — so asserting one here would put a
    // contact channel in structured data that a visitor cannot find or use.
    // `numberOfEmployees: { minValue: 10 }` removed. Nothing on the site supports it.
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Huddart Parker Building',
      addressLocality: 'Wellington Central',
      postalCode: '6011',
      addressCountry: 'NZ',
    },
    areaServed: AREAS_SERVED,
    knowsAbout: [
      'Artificial Intelligence',
      'Machine Learning',
      'SaaS Development',
      'Web Development',
      'Mobile App Development',
      'UI UX Design',
      'Blockchain Development',
      'Digital Marketing',
    ],
    sameAs: SAME_AS,
    ...(isTeamPublished()
      ? { employee: teamPersonSchema().map((p: { '@id': string }) => ({ '@id': p['@id'] })) }
      : {}),
  },
  ...teamPersonSchema().map((person: Record<string, unknown>) => ({
    '@context': 'https://schema.org',
    ...person,
  })),
]

export default function Page() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <AboutUsBody />
    </>
  )
}
