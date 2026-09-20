import type { Metadata } from 'next'
import JsonLd from '@/components/common/JsonLd'
import ContactUsBody from '@/components/pages/ContactUsBody'
import { buildMetadata } from '@/lib/seo'
import { AREAS_SERVED, AREAS_SERVED_ISO } from '@/utils/Constant'

export const metadata: Metadata = buildMetadata({
  title: 'Contact Us — Get a Free Quote | Futurise Solutions',
  description:
    'Start your AI, SaaS, web or mobile app project with Futurise Solutions. Book a strategy call or send us a message — we reply within one business day.',
  path: '/contact',
  image: '/contactus.png',
  keywords:
    'contact Futurise Solutions, hire web developer New Zealand, get a quote AI app, start SaaS project, web development consultation, mobile app quote, free project consultation',
})

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Futurise Solutions',
    url: 'https://www.futurisesolutions.com/contact',
    description:
      'Contact Futurise Solutions for AI, SaaS, web, mobile and blockchain development projects.',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.futurisesolutions.com/' },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Contact',
          item: 'https://www.futurisesolutions.com/contact',
        },
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
    email: 'business@futurisesolutions.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Wellington Central',
      postalCode: '6011',
      addressCountry: 'NZ',
    },
    areaServed: AREAS_SERVED,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: 'business@futurisesolutions.com',
        url: 'https://www.futurisesolutions.com/contact',
        availableLanguage: ['English'],
        areaServed: AREAS_SERVED_ISO,
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00',
        },
      },
    ],
  },
]

export default function Page() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <ContactUsBody />
    </>
  )
}
