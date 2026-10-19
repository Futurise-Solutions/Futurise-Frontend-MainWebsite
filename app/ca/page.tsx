import type { Metadata } from 'next'
import JsonLd from '@/components/common/JsonLd'
import CanadaPageBody from '@/components/pages/CanadaPageBody'
import { buildMetadata } from '@/lib/seo'
import { COUNTRY_ALTERNATES } from '@/utils/Constant/countries'
import { buildCountrySchema } from '@/utils/countrySchema'
import { caMeta, caFaqs } from '@/utils/Constant/canada'

/**
 * /ca — market page.
 *
 * Kept as its OWN file with its OWN content module. These six pages share a shell but
 * every H2 and all copy differs; building them from one template would destroy that.
 *
 * hreflang: COUNTRY_ALTERNATES declares the whole cluster on every variant, and each
 * page stays SELF-CANONICAL. Canonicalising a market page to the homepage would remove
 * it from the index entirely.
 */
export const metadata: Metadata = buildMetadata({
  title: caMeta.title,
  description: caMeta.description,
  path: '/ca',
  keywords: caMeta.keywords,
  image: '/home.png',
  alternates: COUNTRY_ALTERNATES,
})

/* Shape and site-wide values live in buildCountrySchema; only what is genuinely
   this market belongs here. The country registry supplies the path, label and language
   tag, so the schema cannot disagree with the hreflang cluster or the footer link. */
const jsonLd = buildCountrySchema({
  code: 'ca',
  title: caMeta.title,
  description: caMeta.description,
  regions: ['Ontario', 'Quebec', 'British Columbia', 'Alberta'],
  currency: 'CAD',
  faqs: caFaqs,
  image: '/home.png',
})

export default function Page() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <CanadaPageBody />
    </>
  )
}
