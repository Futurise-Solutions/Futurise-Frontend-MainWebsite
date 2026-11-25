import type { Metadata } from 'next'
import Link from 'next/link'
import JsonLd from '@/components/common/JsonLd'
import EditorialOpening from '@/components/common/EditorialOpening'
import OtaCommissionCalculator, { OtaCallButton } from '@/components/tools/OtaCommissionCalculator'
import commercial from '@/components/common/CommercialPages.module.css'
import s from '@/components/tools/OtaCommissionCalculator.module.css'
import { buildMetadata, DEFAULT_IMAGE, SITE_URL } from '@/lib/seo'

/**
 * /tools/ota-commission-calculator
 *
 * A free calculator for hoteliers. It turns the method published in the OTA commission
 * guide (8 Nov 2026) into a tool and adds no claims of its own: every figure is the
 * visitor's input, and the page copy restates what the guide and the PMS explainer say.
 *
 * ⚠️ D7: the title goes through buildMetadata → resolveTitle. "OTA Commission Calculator
 * for Hotels" + " | Futurise Solutions" is 57 characters, so the brand is kept.
 *
 * The OG image is the DEFAULT_IMAGE constant on purpose: its file is being replaced, so
 * no filename is hard-coded here.
 */

const PATH = '/tools/ota-commission-calculator'
const PAGE_URL = `${SITE_URL}${PATH}`
const OTA_GUIDE = '/blog/hotel-direct-booking-website-reduce-ota-commission'
const PMS_GUIDE = '/blog/hotel-pms-booking-engine-channel-manager-explained'
const HOTEL_SOLUTION = '/solutions/hotel-booking-website-development'

const TITLE = 'OTA Commission Calculator for Hotels'
const DESCRIPTION =
  'Free OTA commission calculator for hotels: see what commission costs you, what moving bookings to direct could save after costs, and your break-even.'

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords:
    'OTA commission calculator, hotel OTA commission, direct booking savings calculator, reduce OTA commission, hotel direct booking website, hotel break-even calculator',
  image: DEFAULT_IMAGE,
})

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${PAGE_URL}#webpage`,
    url: PAGE_URL,
    name: 'OTA commission calculator for hotels',
    description: DESCRIPTION,
    inLanguage: 'en',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    publisher: { '@id': `${SITE_URL}/#organization` },
    primaryImageOfPage: { '@type': 'ImageObject', url: DEFAULT_IMAGE },
    // The calculator implements the method published in this guide.
    isBasedOn: `${SITE_URL}${OTA_GUIDE}`,
    audience: { '@type': 'Audience', audienceType: 'Hotel owners and revenue managers' },
    isAccessibleForFree: true,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'OTA commission calculator', item: PAGE_URL },
    ],
  },
]

/** "How the numbers work": the method in words, then the same step as a formula. */
const METHOD = [
  {
    name: 'Room nights sold per year',
    words: 'Multiply your rooms by 365, then by your average occupancy.',
    formula: 'rooms × 365 × average occupancy',
  },
  {
    name: 'Room nights booked through OTAs',
    words: 'Multiply the room nights sold by the share that comes through OTAs.',
    formula: 'room nights sold × share booked through OTAs',
  },
  {
    name: 'Commission paid per year',
    words: 'Multiply the OTA room nights by your ADR and by your commission rate.',
    formula: 'OTA room nights × ADR × commission rate',
  },
  {
    name: 'Room nights moved to direct',
    words:
      'Multiply the OTA room nights by the share you expect to move. This is your own estimate: the calculator doesn’t predict it.',
    formula: 'OTA room nights × share you expect to move',
  },
  {
    name: 'Saving per room night moved',
    words:
      'Take the commission on one room night (your ADR times your commission rate) and subtract what a direct booking costs you per room night: card fees, any per-booking engine fee and perks.',
    formula: 'ADR × commission rate − direct cost per room night',
  },
  {
    name: 'Saving after direct booking costs',
    words: 'Multiply the room nights moved by the saving per room night. This is the formula in our guide.',
    formula: 'room nights moved × saving per room night',
  },
  {
    name: 'Net saving per year',
    words:
      'Subtract the yearly cost of the direct channel: the website, the booking engine, marketing and staff time.',
    formula: 'saving after direct booking costs − yearly cost of the direct channel',
  },
  {
    name: 'Break-even',
    words:
      'Divide the yearly cost of the direct channel by the saving per room night, and round up to a whole night. If a direct booking costs as much as the commission it replaces, there is no break-even.',
    formula: 'yearly cost of the direct channel ÷ saving per room night',
  },
]

/** Restates the OTA guide and the PMS explainer. No promised percentages. */
const CHANGES = [
  {
    lead: 'What each booking it takes costs you',
    text: 'A booking completed on your own site pays no OTA commission. You pay your direct costs instead: card fees, the booking engine’s fees and any perks you offer.',
  },
  {
    lead: 'Where returning guests can book',
    text: 'Repeat guests, referrals and people who found you on an OTA and then searched for your name get a direct way to book, and the relationship stays with you.',
  },
  {
    lead: 'What you can offer',
    text: 'Your own site can carry a member rate, breakfast, late checkout or flexible cancellation. Choose offers you can afford: there is no point saving 20% commission and giving away 20% in discount.',
  },
  {
    lead: 'How Google can send guests to you',
    text: 'Google’s free booking links can show your own booking site alongside Google’s hotel prices at no cost per click. Your booking-engine provider may already connect you, so ask.',
  },
]

const UNCHANGED = [
  {
    lead: 'The reach of the OTAs',
    text: 'OTAs bring you guests who would never have found you, and a direct site doesn’t replace that overnight. Treat them as advertising for new guests.',
  },
  {
    lead: 'How many guests book direct',
    text: 'Nobody can promise a share of direct bookings, and a quote that promises a specific percentage increase is a red flag. The calculator works from the share you choose.',
  },
  {
    lead: 'Your booking engine and PMS',
    text: 'The booking engine is usually a product you license, and it has to stay in step with your PMS and channel manager or you will oversell rooms. The website is built around it.',
  },
  {
    lead: 'Your OTA contract',
    text: 'Whether you can price differently on your own site depends on where you operate and the terms you signed. Check them before you do.',
  },
  {
    lead: 'The running costs',
    text: 'The site, the engine’s fees, marketing and staff time cost money every year. That is the yearly cost in the calculator.',
  },
]

export default function Page() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <div className={commercial.page}>
        <nav aria-label="Breadcrumb" className={`${commercial.container} ${commercial.breadcrumb}`}>
          <Link href="/">Home</Link> / <span aria-current="page">OTA commission calculator</span>
        </nav>

        <EditorialOpening
          eyebrow="Free tool · Hotels"
          title="OTA commission calculator"
          accent="for hotels"
          description="Work out what OTA commission costs you in a year, what moving some of those bookings to your own website could save once direct costs are paid, and how many room nights it takes to break even. Every number is your own input."
        >
          <a href="#calculator">
            Use the calculator <span aria-hidden="true">↓</span>
          </a>
          <Link href={OTA_GUIDE}>
            Read the method <span aria-hidden="true">↗</span>
          </Link>
        </EditorialOpening>

        <section
          id="calculator"
          className={`${commercial.section} ${s.calculatorSection}`}
          aria-labelledby="calculator-title"
        >
          <div className={commercial.container}>
            <p className={commercial.eyebrow}>The calculator</p>
            <h2 id="calculator-title">Your hotel, your numbers</h2>
            <p className={commercial.intro}>
              Results update as you type. The example inputs are the illustrative assumptions from the
              worked example in{' '}
              <Link className={s.inlineLink} href={OTA_GUIDE}>
                our guide to reducing OTA commission
              </Link>
              , plus placeholder figures for rooms, occupancy and OTA share. None of them is a benchmark:
              replace each one with the figures from your PMS reports and OTA contract.
            </p>
            <OtaCommissionCalculator />
          </div>
        </section>

        <section id="how-the-numbers-work" className={commercial.section}>
          <div className={`${commercial.container} ${commercial.splitSection}`}>
            <div className={commercial.stickyTitle}>
              <p className={commercial.eyebrow}>The method</p>
              <h2>How the numbers work</h2>
              <p className={commercial.intro}>
                The calculator applies the formula published in our guide, one step at a time. Nothing else
                goes into it.
              </p>
            </div>
            <div>
              <p className={s.oneLine}>
                <strong>In one line:</strong> net saving = room nights moved × (ADR × commission rate − direct
                cost per room night) − yearly cost of the direct channel.
              </p>
              <ol className={`${commercial.ruledList} ${s.methodList}`}>
                {METHOD.map((step, i) => (
                  <li key={step.name}>
                    <span className={s.stepNo}>{String(i + 1).padStart(2, '0')}</span>
                    <h3>{step.name}</h3>
                    <p>{step.words}</p>
                    <p className={s.methodFormula}>{step.formula}</p>
                  </li>
                ))}
              </ol>
              <aside className={commercial.insight}>
                <h3>What it leaves out</h3>
                <p>
                  The calculator uses your commission rate alone. It doesn’t include the other OTA costs our
                  guide mentions, such as commission on upsells or sponsored placement, and it doesn’t model
                  cancellations. Treat the result as arithmetic on your own assumptions, not a forecast.
                </p>
              </aside>
            </div>
          </div>
        </section>

        <section className={commercial.dark} aria-labelledby="changes-title">
          <div className={commercial.container}>
            <p className={commercial.eyebrow}>Before you build</p>
            <h2 id="changes-title" className={commercial.sectionTitle}>
              What a direct-booking website changes, <span>and what it doesn’t</span>
            </h2>
            <p className={commercial.intro}>
              A direct site can lower what a booking costs you, but only if guests can find it, trust it and
              finish a booking on a phone.
            </p>
            <div className={s.compare}>
              <div>
                <h3 className={s.compareTitle}>What it changes</h3>
                <ul className={s.compareList}>
                  {CHANGES.map((item) => (
                    <li key={item.lead}>
                      <strong>{item.lead}</strong>
                      {item.text}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className={s.compareTitle}>What it doesn’t</h3>
                <ul className={s.compareList}>
                  {UNCHANGED.map((item) => (
                    <li key={item.lead}>
                      <strong>{item.lead}</strong>
                      {item.text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className={s.baseline}>
              <strong>Set a baseline first.</strong> Take your direct share of room nights from your PMS
              reports, not from web analytics, before you change anything. Without it, you can’t tell whether a
              new site worked.
            </p>
          </div>
        </section>

        <section className={commercial.section} aria-labelledby="reading-title">
          <div className={commercial.container}>
            <p className={commercial.eyebrow}>Read next</p>
            <h2 id="reading-title">The guides behind the calculator</h2>
            <p className={commercial.intro}>
              The worked example and where the figures come from, how the systems behind a direct booking fit
              together, and how we build hotel booking websites.
            </p>
            <div className={commercial.linkList}>
              <Link href={OTA_GUIDE}>How to reduce OTA commission with a direct booking website ↗</Link>
              <Link href={PMS_GUIDE}>How a PMS, booking engine and channel manager connect ↗</Link>
              <Link href={HOTEL_SOLUTION}>Hotel booking website development ↗</Link>
            </div>
          </div>
        </section>

        <section className={commercial.end} aria-labelledby="next-step-title">
          <p className={commercial.eyebrow}>Next step</p>
          <h2 id="next-step-title">Planning a direct-booking website?</h2>
          <p>
            Bring your numbers to a free 45-minute strategy call. We’ll map your booking flow, booking engine
            options and measurement plan. We’re not a booking engine or PMS vendor, so we build around the one
            you choose.
          </p>
          <div className={commercial.actions}>
            <OtaCallButton>
              Book a free 45-minute call <span aria-hidden="true">↗</span>
            </OtaCallButton>
            <Link href={HOTEL_SOLUTION}>
              Hotel booking websites <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}
