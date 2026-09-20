import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import JsonLd from '@/components/common/JsonLd'
import ServicePageBody from '@/components/pages/ServicePageBody'
import { buildMetadata } from '@/lib/seo'
import { services, AREAS_SERVED } from '@/utils/Constant'

/**
 * /service/[slug] — 6 pages, one route file.
 *
 * ⚠️ The old route param was `:serviceName`. The directory is `[slug]` because the URL
 * shape is what matters, and the value is passed to the body under its original name so
 * the ported code is unchanged.
 */
type Params = { slug: string }

interface Service {
  title: string
  description: string
  details: string
  metaTitle?: string
  metaDescription?: string
  faqs?: Array<{ question: string; answer: string }>
}

const svc = services as Record<string, Service>

/** Ported verbatim from src/Pages/ServicePage.jsx. */
const serviceImages: Record<string, string> = {
  'web-development': '/webdevelopment.png',
  'app-development': '/appdevlopment.png',
  'ui-ux-design': '/uiuxdevelopment.png',
  'blockchain-development': '/blockchaindevelopment.png',
  'ai-ml-solutions': '/aimlsol.png',
  'digital-marketing': '/digitalmarkiting.png',
}

const serviceKeywords: Record<string, string> = {
  'web-development':
    'web development company, React developer, Next.js, Node.js, full stack development, website development New Zealand, India, USA',
  'app-development':
    'mobile app development, React Native, Expo, iOS Android app, cross-platform app, app developer New Zealand',
  'ui-ux-design':
    'UI UX design, Figma design, product design, user experience design, mobile UI design, web design New Zealand',
  'blockchain-development':
    'blockchain development, DeFi development, Web3, dApp development, MEV bot, Solana, Ethereum, smart contract',
  'ai-ml-solutions':
    'AI development, ML solutions, AI agents, LLM integration, ChatGPT integration, AI SaaS, machine learning New Zealand',
  'digital-marketing':
    'digital marketing agency, SEO services, Google Ads, social media marketing, performance marketing New Zealand',
}

export function generateStaticParams(): Params[] {
  return Object.keys(svc).map((slug) => ({ slug }))
}

/** ⚠️ Next 16: `params` is a Promise and must be awaited. */
export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const service = svc[slug]
  if (!service) return {}

  return buildMetadata({
    title: service.metaTitle || `${service.title} — New Zealand, India & USA`,
    description:
      service.metaDescription || `${service.description} ${service.details}`.slice(0, 160),
    path: `/service/${slug}`,
    image: serviceImages[slug] || '/home.png',
    keywords: serviceKeywords[slug] || '',
  })
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const service = svc[slug]

  /* The old page rendered <NotFound /> inline, returning HTTP 200 with 404-looking
     content — a soft 404. notFound() returns a real 404 status. */
  if (!service) notFound()

  /** JSON-LD ported verbatim, including the conditional FAQPage spread. */
  const jsonLd = [
    /**
     * WebPage node carrying `speakable`.
     *
     * ⚠️ It is a SEPARATE node rather than a property on the Service below, because
     * `speakable` is defined on WebPage (and CreativeWork), NOT on Service. Attaching it
     * to the Service node would be ignored at best and flagged as an invalid property at
     * worst, which is why this node exists purely to host it.
     *
     * ⚠️ BOTH SELECTORS MUST RESOLVE IN THE RENDERED DOM. They are applied by hand in
     * components/pages/ServicePageBody.jsx — `speakable-answer` on the hero sentence that
     * defines the service, and the question/answer pair on the industries section. A
     * selector matching nothing advertises speakable content and then supplies none,
     * which is worse than omitting the property. Grep both class names before renaming.
     *
     * Google currently limits speakable to news publishers, so this earns nothing in
     * Search today. It marks the extractable standalone answer that assistant grounding
     * reads, which costs nothing to declare.
     */
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `https://www.futurisesolutions.com/service/${slug}#webpage`,
      url: `https://www.futurisesolutions.com/service/${slug}`,
      name: service.metaTitle || service.title,
      description: service.metaDescription || service.description,
      isPartOf: { '@id': 'https://www.futurisesolutions.com/#website' },
      about: { '@id': `https://www.futurisesolutions.com/service/${slug}#service` },
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['.speakable-question', '.speakable-answer'],
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `https://www.futurisesolutions.com/service/${slug}#service`,
      name: `${service.title} — Futurise Solutions`,
      description: service.metaDescription || service.details,
      url: `https://www.futurisesolutions.com/service/${slug}`,
      serviceType: service.title,
      category: service.title,
      provider: { '@id': 'https://www.futurisesolutions.com/#organization' },
      areaServed: AREAS_SERVED,
      audience: {
        '@type': 'Audience',
        audienceType: 'Startup founders, SaaS companies, product teams and enterprises',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      // A "Services" crumb pointing at "/" duplicated the Home crumb's target, which
      // Google reports as an invalid breadcrumb trail. Dropped until a real /services
      // hub page exists to point it at.
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.futurisesolutions.com/' },
        {
          '@type': 'ListItem',
          position: 2,
          name: service.title,
          item: `https://www.futurisesolutions.com/service/${slug}`,
        },
      ],
    },
    ...(service.faqs?.length
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: service.faqs.map((f) => ({
              '@type': 'Question',
              name: f.question,
              acceptedAnswer: { '@type': 'Answer', text: f.answer },
            })),
          },
        ]
      : []),
  ]

  return (
    <>
      <JsonLd data={jsonLd} />
      <ServicePageBody serviceName={slug} />
    </>
  )
}
