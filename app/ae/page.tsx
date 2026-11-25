import type { Metadata } from 'next'
import JsonLd from '@/components/common/JsonLd'
import UAEPageBody from '@/components/pages/UAEPageBody'
import { buildMetadata } from '@/lib/seo'
import { COUNTRY_ALTERNATES } from '@/utils/Constant/countries'
import { buildCountrySchema } from '@/utils/countrySchema'
import { aeMeta, aeFaqs } from '@/utils/Constant/uae'

/**
 * /ae — market page.
 *
 * Kept as its OWN file with its OWN content module. These six pages share a shell but
 * every H2 and all copy differs; building them from one template would destroy that.
 *
 * hreflang: COUNTRY_ALTERNATES declares the whole cluster on every variant, and each
 * page stays SELF-CANONICAL. Canonicalising a market page to the homepage would remove
 * it from the index entirely.
 */
export const metadata: Metadata = buildMetadata({
  title: aeMeta.title,
  description: aeMeta.description,
  path: '/ae',
  keywords: aeMeta.keywords,
  image: '/og/home-v2.png',
  alternates: COUNTRY_ALTERNATES,
})

/* Shape and site-wide values live in buildCountrySchema; only what is genuinely
   this market belongs here. The country registry supplies the path, label and language
   tag, so the schema cannot disagree with the hreflang cluster or the footer link. */
const jsonLd = buildCountrySchema({
  code: 'ae',
  title: aeMeta.title,
  description: aeMeta.description,
  regions: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ras Al Khaimah'],
  currency: 'AED',
  faqs: aeFaqs,
  image: '/og/home-v2.png',
})

export default function Page() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <UAEPageBody />
    </>
  )
}
