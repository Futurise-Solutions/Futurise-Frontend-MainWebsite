import type { Metadata } from 'next'
import JsonLd from '@/components/common/JsonLd'
import IndiaPageBody from '@/components/pages/IndiaPageBody'
import { buildMetadata } from '@/lib/seo'
import { COUNTRY_ALTERNATES } from '@/utils/Constant/countries'
import { buildCountrySchema } from '@/utils/countrySchema'
import { inMeta, inFaqs } from '@/utils/Constant/india'

/**
 * /in — India market page.
 *
 * ⚠️ ONE PAGE FOR INDIA. No per-city routes. Mumbai, Delhi, Bangalore, Pune and Jaipur
 * are deliberately absent and must stay absent: there is no office, no staff and no
 * delivered client in any of them, and a page per city with nothing behind it is a doorway
 * page under Google's spam policy. The test any additional Indian location must pass is
 * documented at the top of utils/Constant/india.js — Udaipur passes it because the
 * engineering team is there AND two published clients are Udaipur businesses.
 *
 * This page inverts the other market pages' argument. They argue that remote delivery into
 * a market works; this one has people and delivered local clients on the ground, so it
 * leads with presence. The copy shares no sentence with any other market page.
 *
 * hreflang: COUNTRY_ALTERNATES declares the whole cluster on every variant, and this page
 * stays SELF-CANONICAL. Adding `in` to COUNTRIES in countries.js is what wires the
 * reciprocal annotation on the other five pages — it is not duplicated here by hand.
 */
export const metadata: Metadata = buildMetadata({
  title: inMeta.title,
  description: inMeta.description,
  path: '/in',
  keywords: inMeta.keywords,
  image: '/home.png',
  alternates: COUNTRY_ALTERNATES,
})

/* Shape and site-wide values live in buildCountrySchema; only what is genuinely this
   market belongs here. The country registry supplies the path, label and language tag, so
   the schema cannot disagree with the hreflang cluster or the footer link.

   ⚠️ `regions` is Udaipur and Rajasthan ONLY. It is tempting to list the big metros here
   because the field accepts anything, but `areaServed` is read as a presence claim and
   these are the only two places the claim is true. */
const jsonLd = buildCountrySchema({
  code: 'in',
  title: inMeta.title,
  description: inMeta.description,
  regions: ['Udaipur', 'Rajasthan'],
  currency: 'INR',
  faqs: inFaqs,
  image: '/home.png',
})

export default function Page() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <IndiaPageBody />
    </>
  )
}
