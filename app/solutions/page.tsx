import type { Metadata } from 'next'
import JsonLd from '@/components/common/JsonLd'
import SolutionsHubBody from '@/components/pages/SolutionsHubBody'
import { buildMetadata } from '@/lib/seo'
import { solutionList } from '@/utils/Constant/solutions'

export const metadata: Metadata = buildMetadata({
  title: "Solutions: Specialist Software We've Built",
  description:
    'Nine niches we have built in: Shopify CRO, hospital systems, WhatsApp CRM, AI SaaS, Chrome extensions, Telegram bots, Web3, AI recruitment and server tools.',
  path: '/solutions',
  keywords:
    'Futurise Solutions solutions, Shopify CRO, hospital management system development, WhatsApp CRM, AI SaaS development, Chrome extension development, Telegram bot development, Web3 dApp development, AI recruitment software, server management platform',
})

interface Solution {
  slug: string
  name: string
}

const solutions = solutionList as Solution[]
const SITE = 'https://www.futurisesolutions.com'

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Futurise Solutions: Specialist Solutions',
    url: `${SITE}/solutions`,
    numberOfItems: solutions.length,
    itemListElement: solutions.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE}/solutions/${s.slug}`,
      name: s.name,
    })),
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: 'Solutions', item: `${SITE}/solutions` },
    ],
  },
]

export default function Page() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <SolutionsHubBody />
    </>
  )
}
