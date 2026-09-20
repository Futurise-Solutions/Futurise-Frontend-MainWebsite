import type { Metadata } from 'next'
import JsonLd from '@/components/common/JsonLd'
import HomePageBody from '@/components/pages/HomePageBody'
import LatestBlogs from '@/components/blog/LatestBlogs'
import { buildMetadata } from '@/lib/seo'
import { faqs } from '@/utils/Constant'
import { COUNTRY_ALTERNATES } from '@/utils/Constant/countries'

/**
 * / — the global home page.
 *
 * ⚠️ D7 / TITLE, from the source's own note — do not "improve" this:
 *   The country suffix is gone now that /nz exists. Two pages naming New Zealand in
 *   their title competed for the same query and Google had to pick one; the homepage
 *   is the global page, so it keeps the un-suffixed service terms and /nz owns
 *   everything ending in "New Zealand". At 38 characters the brand suffix also fits
 *   inside Google's ~60-character render width, so the rule APPENDS it rather than
 *   dropping it — the full rendered title is
 *   "AI, SaaS & Web App Development Company | Futurise Solutions".
 *
 * `alternates` is shared with every country page, so hreflang reciprocity holds by
 * construction rather than by remembering to edit each page when a market is added.
 */
export const metadata: Metadata = buildMetadata({
  title: 'AI, SaaS & Web App Development Company',
  description:
    'Futurise Solutions builds AI agents, SaaS platforms, web and mobile apps end-to-end. Fixed-scope quotes, not hourly billing. Book a free 45-minute consultation.',
  path: '/',
  image: '/home.png',
  alternates: COUNTRY_ALTERNATES,
  keywords:
    'AI app development, SaaS development, web development company, mobile app development, React Native, blockchain development, Web3, AI agents, digital marketing, New Zealand, India, USA, Futurise Solutions',
})

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Futurise Solutions — AI, SaaS & Web App Development Studio',
    url: 'https://www.futurisesolutions.com/',
    description:
      'Futurise Solutions builds AI agents, SaaS platforms, web apps, mobile apps & Web3 products end-to-end.',
    isPartOf: { '@id': 'https://www.futurisesolutions.com/#website' },
    about: { '@id': 'https://www.futurisesolutions.com/#organization' },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.futurisesolutions.com/' },
      ],
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f: { question: string; answer: string }) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  },
]

export default function Page() {
  return (
    <>
      <JsonLd data={jsonLd} />
      {/* LatestBlogs is an async server component, so it is created HERE and passed
          into the client body as a child. */}
      <HomePageBody latestBlogs={<LatestBlogs />} />
    </>
  )
}
