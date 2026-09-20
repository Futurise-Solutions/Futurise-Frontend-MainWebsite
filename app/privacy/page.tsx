import type { Metadata } from 'next'
import JsonLd from '@/components/common/JsonLd'
import PrivacyPolicyBody from '@/components/pages/PrivacyPolicyBody'
import { buildMetadata } from '@/lib/seo'

/**
 * /privacy
 *
 * The <Seo> props below are transcribed verbatim from src/Pages/PrivacyPolicy.jsx.
 *
 * ⚠️ D7: `title` is the EXACT live string, set via `title: { absolute }`. Never a
 * template. The old <Seo> appended the brand only when the result fit in 60 characters
 * and never when the title already contained it — this title already ends with the
 * brand, so it is used as-is. See lib/seo.ts.
 */
export const metadata: Metadata = buildMetadata({
  title: 'Privacy Policy | Futurise Solutions',
  description:
    'How Futurise Solutions collects, uses and protects your personal information across our AI, web, mobile and blockchain services.',
  path: '/privacy',
  keywords:
    'Futurise Solutions privacy policy, data protection, personal information, GDPR, New Zealand Privacy Act, data security',
})

/** JSON-LD ported verbatim from the source's `jsonLd` prop. */
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Privacy Policy — Futurise Solutions',
  url: 'https://www.futurisesolutions.com/privacy',
  description: 'Privacy policy detailing how Futurise Solutions handles personal data.',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.futurisesolutions.com/' },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Privacy Policy',
        item: 'https://www.futurisesolutions.com/privacy',
      },
    ],
  },
}

export default function Page() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <PrivacyPolicyBody />
    </>
  )
}
