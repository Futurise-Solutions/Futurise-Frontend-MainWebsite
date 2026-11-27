'use client'

/**
 * /service/[slug] page body — ported VERBATIM from ServicePage.jsx.
 *
 * Only three things differ from the source:
 *   1. <Seo .../> is gone — metadata moves to the Metadata API in page.tsx and
 *      the JSON-LD to <JsonLd/>, both SERVER-rendered (the old one ran in a
 *      useEffect, so it existed only after hydration).
 *   2. the copy lives in a content module and is imported.
 *   3. imports are rewritten for the new paths.
 * Every style prop, every element and every string is byte-for-byte unchanged.
 */
import { lazy, Suspense } from "react";
import { Box, Container, Heading, Text, HStack, Icon, SimpleGrid, Wrap, WrapItem } from "@chakra-ui/react";

import RouterLink from "next/link";
import { Link as ChakraLink } from "@chakra-ui/react";
import { FiCheckCircle, FiArrowUpRight } from "react-icons/fi";
import ProcessSection from "@/components/service/ProcessSection";
const ServiceStack = lazy(() => import("@/components/service/ServiceStack"));
import ServiceIntro from "@/components/service/ServiceIntro";
import agency from "@/components/common/AgencyPages.module.css";
import Faqs from "@/components/home/Faqs";
import { services } from "@/utils/Constant";
import { caseStudies, caseStudyForService } from "@/utils/Constant/caseStudies";
import { serviceResources } from "@/utils/Constant/serviceResources";
import { solutionLinks as solutionList } from "@/utils/Constant/solutionLinks";
import Reveal from "@/components/common/Reveal";
import { Eyebrow } from "@/components/common/SectionHeading";
import CTASection from "@/components/common/CTASection";
import VisualBand from "@/components/common/VisualBand";
import { precisionLayers } from "@/assests";
import { useBooking } from "@/context/BookingContext";



// Lower-case a service name for mid-sentence use, but keep acronyms (AI, ML) intact.
const inlineName = (t) => t.split(" ").map((w) => (/[A-Z]{2}/.test(w) ? w : w.toLowerCase())).join(" ");

export default function ServicePageBody({ serviceName }) {
  /* `serviceName` now arrives as a PROP from the server component, which resolved it
     from `await params` — the old page read it from react-router's useParams().

     The `if (!service) return <NotFound/>` guard is gone: the route calls notFound()
     BEFORE rendering this, so an unknown slug returns a real 404 status rather than a
     200 carrying 404-looking content. */

  const { onOpen: openBooking } = useBooking();
  const service = services[serviceName];

  const relatedCaseStudy = caseStudies[caseStudyForService[serviceName]];
  const resources = serviceResources[serviceName] || [];
  const siblingServices = Object.entries(services)
    .filter(([slug]) => slug !== serviceName)
    .map(([slug, s]) => ({ slug, title: s.title }));
  const specialistSolutions = solutionList.filter((s) => s.service === serviceName);
  return (
    <Box>
      <ServiceIntro service={service} slug={serviceName} />

      {/* Reserve height so the lazy chunk landing cannot shift the sections below it. */}
      <div className={agency.light}>
      <Suspense fallback={<Box minH={{ base: "600px", md: "800px" }} />}>
        <ServiceStack service={serviceName} />
      </Suspense>
      </div>
      <ProcessSection />

      {/* All six service pages run ~7600px of copy, chips, cards and accordions with no
          image between the hero and the footer. This sits at the midpoint — after the
          process timeline, before the industries list — so the second half of the page
          starts on a visual rather than continuing the same run. No copy: a third
          headline here would lengthen the reading, which is the problem it is solving.
          The plate is shared across all six services on purpose; it is cached after the
          first service page a visitor opens. */}
      <VisualBand
        src={precisionLayers}
        height={{ base: "190px", md: "260px", lg: "300px" }}
        focal="center"
        overlay={0.5}
      />

      {/* Industries we serve */}
      {service.industries?.length > 0 && (
        <Container maxW="container.site" px={{ base: 5, md: 8 }} py={{ base: 10, md: 14 }}>
          <Reveal><Eyebrow>Industries we serve</Eyebrow></Reveal>
          <Reveal delay={0.05}>
            <Heading className="speakable-question" mt={4} fontSize={{ base: "26px", md: "36px" }} lineHeight={1.15} maxW="760px">
              {service.title} for{" "}
              <Box as="span" className="gradient-text">teams in every industry</Box>
            </Heading>
          </Reveal>
          <Reveal delay={0.1}>
            <Text className="speakable-answer" mt={4} color="text.muted" fontSize={{ base: "md", md: "lg" }} lineHeight={1.7} maxW="640px">
              We’ve shipped {inlineName(service.title)} work for founders and product teams across these sectors,
              and adapt fast to yours.
            </Text>
          </Reveal>
          <Reveal delay={0.15}>
            <Wrap spacing={3} mt={7}>
              {service.industries.map((ind) => (
                <WrapItem key={ind}>
                  <HStack
                    spacing={2.5}
                    px={4}
                    py={2.5}
                    borderRadius="full"
                    bg="bg.surface"
                    border="1px solid"
                    borderColor="border.subtle"
                    _hover={{ borderColor: "rgba(180,160,255,0.35)" }}
                    transition="border-color .2s"
                  >
                    <Icon as={FiCheckCircle} color="accent.solid" boxSize={4} />
                    <Text fontSize={{ base: "sm", md: "md" }} color="text.primary" fontWeight={500}>
                      {ind}
                    </Text>
                  </HStack>
                </WrapItem>
              ))}
            </Wrap>
          </Reveal>
        </Container>
      )}

      {/* Related work + sibling services.
          These are the only body-content links from a service page to a case study or
          to another service. Without them case studies were reachable only via the
          navbar dropdown, and no service page linked to any other — so crawl paths
          dead-ended here and page authority never flowed between them. */}
      <Container maxW="container.site" px={{ base: 5, md: 8 }} py={{ base: 10, md: 14 }}>
        {relatedCaseStudy && (
          <>
            <Reveal><Eyebrow>Related work</Eyebrow></Reveal>
            <Reveal delay={0.05}>
              <Heading mt={4} mb={6} fontSize={{ base: "26px", md: "36px" }} lineHeight={1.15} maxW="760px">
                See {service.title}{" "}
                <Box as="span" className="gradient-text">in production</Box>
              </Heading>
            </Reveal>
            <Reveal delay={0.1}>
              <ChakraLink
                as={RouterLink}
                href={`/case-studies/${relatedCaseStudy.slug}`}
                display="block"
                p={{ base: 6, md: 7 }}
                borderRadius="20px"
                bg="bg.surface"
                border="1px solid"
                borderColor="border.subtle"
                _hover={{ borderColor: "rgba(180,160,255,0.35)", textDecoration: "none" }}
                transition="border-color .2s"
              >
                <HStack justify="space-between" align="start" spacing={4}>
                  <Box>
                    <Text fontSize="sm" color="accent.solid" fontWeight={600} mb={1}>
                      {relatedCaseStudy.industry}
                    </Text>
                    <Heading as="h3" fontSize={{ base: "20px", md: "24px" }} lineHeight={1.25}>
                      {relatedCaseStudy.hero?.title} {relatedCaseStudy.hero?.highlight}
                    </Heading>
                    <Text mt={2} color="text.muted" fontSize={{ base: "sm", md: "md" }} lineHeight={1.7}>
                      {relatedCaseStudy.hero?.subtitle}
                    </Text>
                  </Box>
                  <Icon as={FiArrowUpRight} boxSize={6} color="accent.solid" flexShrink={0} mt={1} />
                </HStack>
              </ChakraLink>
            </Reveal>
          </>
        )}

        <Reveal delay={0.15}>
          <Text mt={relatedCaseStudy ? 10 : 0} mb={4} fontSize="sm" fontWeight={600} letterSpacing="0.08em" textTransform="uppercase" color="text.faint">
            Other services
          </Text>
          <Wrap spacing={3}>
            {siblingServices.map((s) => (
              <WrapItem key={s.slug}>
                <ChakraLink
                  as={RouterLink}
                  href={`/service/${s.slug}`}
                  px={4}
                  py={2.5}
                  borderRadius="full"
                  bg="bg.surface"
                  border="1px solid"
                  borderColor="border.subtle"
                  fontSize={{ base: "sm", md: "md" }}
                  color="text.primary"
                  fontWeight={500}
                  _hover={{ borderColor: "rgba(180,160,255,0.35)", textDecoration: "none" }}
                  transition="border-color .2s"
                >
                  {s.title}
                </ChakraLink>
              </WrapItem>
            ))}
          </Wrap>
        </Reveal>

        {specialistSolutions.length > 0 && (
          <Reveal delay={0.18}>
            <Text mt={10} mb={4} fontSize="sm" fontWeight={600} letterSpacing="0.08em" textTransform="uppercase" color="text.faint">
              Specialist solutions
            </Text>
            <Wrap spacing={3}>
              {specialistSolutions.map((s) => (
                <WrapItem key={s.slug}>
                  <ChakraLink
                    as={RouterLink}
                    href={`/solutions/${s.slug}`}
                    px={4}
                    py={2.5}
                    borderRadius="full"
                    bg="bg.surface"
                    border="1px solid"
                    borderColor="border.subtle"
                    fontSize={{ base: "sm", md: "md" }}
                    color="text.primary"
                    fontWeight={500}
                    _hover={{ borderColor: "rgba(180,160,255,0.35)", textDecoration: "none" }}
                    transition="border-color .2s"
                  >
                    {s.name}
                  </ChakraLink>
                </WrapItem>
              ))}
            </Wrap>
          </Reveal>
        )}

        {/* Markets.
            The service pages linked to the market pages only through the footer, so the
            Service -> Market half of the internal-link graph existed sitewide but not
            contextually. This block closes it.

            Anchors are written to what each market page actually argues — the obligation
            or commercial fact a buyer there cares about — rather than repeating
            "<service> in <country>" six times. Exact-match anchor repetition across
            six pages x six markets would be the pattern to avoid, and the descriptive
            version is more useful to a reader deciding whether the page is for them. */}
        <Reveal delay={0.2}>
          <Text mt={10} mb={4} fontSize="sm" fontWeight={600} letterSpacing="0.08em" textTransform="uppercase" color="text.faint">
            Building from a specific market?
          </Text>
          <Wrap spacing={3}>
            {[
              { to: "/us", label: "United States: contracting and IP terms" },
              { to: "/ca", label: "Canada: provincial privacy law" },
              { to: "/ae", label: "UAE: free zone, mainland and PDPL" },
              { to: "/nz", label: "New Zealand: NZD quotes, Privacy Act 2020" },
              { to: "/au", label: "Australia: Consumer Data Right" },
              { to: "/europe", label: "Europe: GDPR transfers and the EU AI Act" },
            ].map((m) => (
              <WrapItem key={m.to}>
                <ChakraLink
                  as={RouterLink}
                  href={m.to}
                  px={4}
                  py={2.5}
                  borderRadius="full"
                  bg="bg.surface"
                  border="1px solid"
                  borderColor="border.subtle"
                  fontSize={{ base: "sm", md: "md" }}
                  color="text.primary"
                  fontWeight={500}
                  _hover={{ borderColor: "rgba(180,160,255,0.35)", textDecoration: "none" }}
                  transition="border-color .2s"
                >
                  {m.label}
                </ChakraLink>
              </WrapItem>
            ))}
          </Wrap>
        </Reveal>
      </Container>

      {/* Further reading.
          Before this section the service pages linked to no blog post at all, so the
          depth behind each service was reachable only from the /blog index. Anchor text
          here is written to each post's informational angle and never repeats this
          page's head term — the head term is what this page is trying to rank for, and
          pointing it at a blog post would re-create the collision the re-targeting
          removes. See the note at the top of Constant/serviceResources.js. */}
      {resources.length > 0 && (
        <Container maxW="container.site" px={{ base: 5, md: 8 }} py={{ base: 10, md: 14 }}>
          <Reveal><Eyebrow>Further reading</Eyebrow></Reveal>
          <Reveal delay={0.05}>
            <Heading mt={4} fontSize={{ base: "26px", md: "36px" }} lineHeight={1.15} maxW="760px">
              Questions worth answering{" "}
              <Box as="span" className="gradient-text">before you brief anyone</Box>
            </Heading>
          </Reveal>
          <Reveal delay={0.1}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mt={8}>
              {resources.map((r) => (
                <ChakraLink
                  key={r.to}
                  as={RouterLink}
                  href={r.to}
                  display="block"
                  p={{ base: 5, md: 6 }}
                  borderRadius="16px"
                  bg="bg.surface"
                  border="1px solid"
                  borderColor="border.subtle"
                  _hover={{ borderColor: "rgba(180,160,255,0.35)", textDecoration: "none" }}
                  transition="border-color .2s"
                >
                  <HStack justify="space-between" align="start" spacing={3}>
                    <Box>
                      <Heading as="h3" fontSize={{ base: "17px", md: "19px" }} lineHeight={1.3}>
                        {r.title}
                      </Heading>
                      <Text mt={2} color="text.muted" fontSize={{ base: "sm", md: "md" }} lineHeight={1.7}>
                        {r.blurb}
                      </Text>
                    </Box>
                    <Icon as={FiArrowUpRight} boxSize={5} color="accent.solid" flexShrink={0} mt={1} />
                  </HStack>
                </ChakraLink>
              ))}
            </SimpleGrid>
          </Reveal>
        </Container>
      )}

      {/* Buying guide: long-form material folded in from the retired twin blog posts.
          Plain server-rendered headings, lists and a real <table>, so it is crawlable and
          readable without JS. Renders nothing when the service has no `guide`. */}
      {service.guide && (
        <Container maxW="container.site" px={{ base: 5, md: 8 }} py={{ base: 10, md: 14 }}>
          <Reveal><Eyebrow>{service.guide.eyebrow}</Eyebrow></Reveal>
          <Reveal delay={0.05}>
            <Heading as="h2" mt={4} fontSize={{ base: "26px", md: "36px" }} lineHeight={1.15} maxW="760px">
              {service.guide.title}
            </Heading>
          </Reveal>
          {service.guide.intro && (
            <Reveal delay={0.1}>
              <Text mt={4} color="text.muted" fontSize={{ base: "md", md: "lg" }} lineHeight={1.7} maxW="760px">
                {service.guide.intro}
              </Text>
            </Reveal>
          )}
          {service.guide.sections.map((sec) => (
            <Box key={sec.heading} mt={{ base: 8, md: 10 }} maxW="860px">
              <Heading as="h3" fontSize={{ base: "20px", md: "24px" }} lineHeight={1.25}>
                {sec.heading}
              </Heading>
              {sec.paragraphs?.map((para, pi) => (
                <Text key={pi} mt={3} color="text.muted" fontSize={{ base: "sm", md: "md" }} lineHeight={1.7}>
                  {para}
                </Text>
              ))}
              {sec.bullets?.length > 0 && (
                <Box as="ul" mt={4} pl={5} display="grid" gap={2.5}>
                  {sec.bullets.map((b, bi) => (
                    <Box as="li" key={bi} color="text.muted" fontSize={{ base: "sm", md: "md" }} lineHeight={1.7}>
                      {b}
                    </Box>
                  ))}
                </Box>
              )}
              {sec.table && (
                <Box mt={5} overflowX="auto" borderRadius="16px" border="1px solid" borderColor="border.subtle" bg="bg.surface">
                  <Box as="table" aria-label={sec.heading} w="100%" minW="520px" fontSize={{ base: "sm", md: "md" }} lineHeight={1.6} sx={{ borderCollapse: "collapse" }}>
                    <Box as="thead">
                      <Box as="tr">
                        {sec.table.columns.map((c, ci) => (
                          <Box as="th" scope="col" key={ci} textAlign="left" px={4} py={3} color="text.primary" fontWeight={600} borderBottom="1px solid" borderColor="border.subtle">
                            {c}
                          </Box>
                        ))}
                      </Box>
                    </Box>
                    <Box as="tbody">
                      {sec.table.rows.map((row, ri) => (
                        <Box as="tr" key={ri}>
                          {row.map((cell, i) =>
                            i === 0 ? (
                              <Box as="th" scope="row" key={i} textAlign="left" verticalAlign="top" px={4} py={3} color="text.primary" fontWeight={600} borderTop="1px solid" borderColor="border.subtle">
                                {cell}
                              </Box>
                            ) : (
                              <Box as="td" key={i} verticalAlign="top" px={4} py={3} color="text.muted" borderTop="1px solid" borderColor="border.subtle">
                                {cell}
                              </Box>
                            )
                          )}
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Box>
              )}
            </Box>
          ))}
        </Container>
      )}

      {/* Service-specific FAQ (also emits FAQPage schema above) */}
      {service.faqs?.length > 0 && (
        <Faqs
          items={service.faqs}
          eyebrow="FAQ"
          title="Frequently asked"
          highlight="questions"
          intro={`Common questions about our ${inlineName(service.title)} services. Can’t find what you’re looking for?`}
        />
      )}

      <CTASection
        eyebrow="Let’s discuss your idea"
        title="Ready to start your"
        highlight={`${service.title} project?`}
        subtitle="Get a free consultation and let’s turn your vision into a unique digital creation."
        primaryLabel="Book appointment"
        onPrimary={() => openBooking(`service-${serviceName}`)}
      />
    </Box>
  );
}
