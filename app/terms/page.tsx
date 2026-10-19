import type { Metadata } from 'next'
import JsonLd from '@/components/common/JsonLd'
import TermsConditionsBody from '@/components/pages/TermsConditionsBody'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Terms & Conditions | Futurise Solutions',
  description:
    'The terms governing use of the Futurise Solutions website and our AI, web, mobile, UI/UX, blockchain and digital marketing services.',
  path: '/terms',
  keywords:
    'Futurise Solutions terms and conditions, service agreement, client terms, web development contract, AI development terms, New Zealand digital agency terms',
})

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Terms & Conditions: Futurise Solutions',
  url: 'https://www.futurisesolutions.com/terms',
  description:
    'Terms and Conditions governing use of Futurise Solutions website and engagement of services.',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.futurisesolutions.com/' },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Terms & Conditions',
        item: 'https://www.futurisesolutions.com/terms',
      },
    ],
  },
}

export default function Page() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <TermsConditionsBody />
    </>
  )
}
