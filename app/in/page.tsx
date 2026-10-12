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
 * ⚠️ ONE PAGE FOR INDIA, AND ITS SUBJECT IS THE COUNTRY. No per-city routes. Mumbai,
 * Delhi, Bangalore, Pune and Jaipur are deliberately absent and must stay absent: there is
 * no office and no address in any of them, and a page per city with no physical presence
 * behind it is a doorway page under Google's spam policy.
 *
 * The line is PHYSICAL PRESENCE, not published clients — delivered work counts whether or
 * not the client can be named; an office that does not exist never does. See the header of
 * utils/Constant/india.js.
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

   ⚠️ `areaServed` IS THE COUNTRY. buildCountrySchema always emits
   { '@type': 'Country', name: 'India' } from the registry, and `regions` only ADDS
   AdministrativeArea nodes beneath it.

   `regions` is deliberately EMPTY. An earlier version passed ['Udaipur', 'Rajasthan'],
   which narrowed the served-area claim to one city and state on a page whose subject is
   the national market. The service is offered across India; Udaipur is where the team
   sits, which is a fact the page states in its copy and does not need to assert as a
   service boundary.

   Do NOT list the big metros here either. `areaServed` is read as a claim, and an office
   in Mumbai or Bangalore does not exist. */
const jsonLd = buildCountrySchema({
  code: 'in',
  title: inMeta.title,
  description: inMeta.description,
  regions: [],
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
