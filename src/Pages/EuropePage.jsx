import React from "react";
import {
  Box, Container, Heading, Text, VStack, HStack, SimpleGrid, Icon, Button, List, ListItem,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiCheck, FiAlertCircle, FiArrowUpRight } from "react-icons/fi";
import { Reveal, Eyebrow, GlassCard, Seo, CTASection, MarketHero, VisualBand } from "../Components/common";
import Faqs from "../Components/HomePage Components/Faqs";
import { useBooking } from "../context/BookingContext";
import { CONTACT, NavbarservicesOptions } from "../utils/Constant";
import { marketReach, precisionLayers } from "../assests";
import {
  euMeta, euRegulatory, euPositioning, euWorkingModel, euSectors, euFaqs,
} from "../utils/Constant/europe";

const SITE_URL = "https://www.futurisesolutions.com";

/**
 * /europe — the Europe market page.
 *
 * WHY THIS IS ONE PAGE AND NOT A COUNTRY CLUSTER
 * SERP research across European city and country terms found page one held almost entirely
 * by high-authority directories and by offshore agencies running templated `/location/`
 * pages. Futurise holds no European entity, office or staff, so a set of country pages
 * would be unrankable and would read as exactly the doorway pattern Google's spam policy
 * names. One page arguing a single honest position is the defensible version.
 *
 * The page speaks only to what can be publicly ATTRIBUTED, never to whether work exists.
 * Confidentiality, not inexperience, is what limits what a portfolio can show — see the
 * note in src/utils/Constant/europe.js before editing any of this copy.
 *
 * WHY IT DOES NOT USE buildCountrySchema()
 * That builder is keyed to the COUNTRIES registry and emits `areaServed: { @type: Country }`
 * plus a `hrefLang` drawn from the registry entry. Europe is a region, not a country, and
 * it has no ISO 3166-1 code, no single language tag and no place in the hreflang cluster —
 * forcing it through the builder would emit a Country node naming a continent and would add
 * a sixth entry to a reciprocal cluster that must stay symmetric. The schema below is
 * therefore inline, but it still links back to the shared Organization and WebSite nodes by
 * @id, so this page cannot introduce a second company entity.
 *
 * NO hreflang. The hreflang cluster is the homepage plus the five country pages, and every
 * member must declare the whole set. This page is not a regional variant of the homepage —
 * it is a distinct topic — so it stays out of the cluster and self-canonicalises.
 */
const EuropePage = () => {
  const { onOpen: openBooking } = useBooking();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${SITE_URL}/europe`,
      name: `${euMeta.title} — Futurise Solutions`,
      url: `${SITE_URL}/europe`,
      description: euMeta.description,
      inLanguage: "en",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#organization` },
      primaryImageOfPage: { "@type": "ImageObject", url: `${SITE_URL}/home.png` },
    },
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/europe#service`,
      name: "Futurise Solutions — Europe",
      url: `${SITE_URL}/europe`,
      description: euMeta.description,
      parentOrganization: { "@id": `${SITE_URL}/#organization` },
      // Place, not Country. Futurise serves European clients remotely and has no
      // establishment in any European state; areaServed describes where a service is
      // provided, which is exactly this, and carries no claim of local presence.
      areaServed: [
        { "@type": "Place", name: "Europe" },
        { "@type": "Place", name: "European Economic Area" },
        { "@type": "Country", name: "United Kingdom" },
      ],
      availableLanguage: ["English"],
      currenciesAccepted: "EUR, GBP",
      email: CONTACT.email,
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Software development services for European businesses",
        itemListElement: NavbarservicesOptions.map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: s.option, url: `${SITE_URL}${s.path}` },
        })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${SITE_URL}/europe#faq`,
      mainEntity: euFaqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Europe", item: `${SITE_URL}/europe` },
      ],
    },
  ];

  return (
    <Box>
      <Seo
        title={euMeta.title}
        description={euMeta.description}
        path="/europe"
        keywords={euMeta.keywords}
        image="/home.png"
        jsonLd={jsonLd}
      />

      <MarketHero image={marketReach}>
        <Reveal><Eyebrow>Europe</Eyebrow></Reveal>
        <Reveal delay={0.05}>
          <Heading as="h1" mt={5} fontSize={{ base: "38px", md: "56px" }} lineHeight={1.08} letterSpacing="-0.025em" maxW="940px">
            Software development for{" "}
            <Box as="span" className="gradient-text">European businesses</Box>
          </Heading>
        </Reveal>
        <Reveal delay={0.1}>
          <Text mt={6} color="text.muted" fontSize={{ base: "md", md: "xl" }} lineHeight={1.7} maxW="780px">
            Engaging a supplier outside the EEA is a data-protection decision before it is a
            procurement one. We publish the transfer mechanism we rely on, where your data
            will physically live, and which EU AI Act obligations reach what you are building —
            before you ask for any of it.
          </Text>
        </Reveal>
        <Reveal delay={0.15}>
          <HStack spacing={3} mt={8} flexWrap="wrap" rowGap={3}>
            <Button variant="gradient" size="lg" rightIcon={<FiArrowRight />} onClick={() => openBooking("europe-hero")}>
              Book a scoping call
            </Button>
            <Button as={Link} to="/contact" variant="outlineGlow" size="lg">
              Send us your scope
            </Button>
          </HStack>
        </Reveal>
      </MarketHero>

      {/* Regulatory spine — first, because for a non-EEA supplier this is the gate that
          decides whether the conversation can happen at all. */}
      <Container maxW="container.site" px={{ base: 5, md: 8 }} py={{ base: 12, md: 16 }}>
        <Reveal><Eyebrow>Data protection</Eyebrow></Reveal>
        <Reveal delay={0.05}>
          <Heading as="h2" mt={4} mb={3} fontSize={{ base: "28px", md: "38px" }} lineHeight={1.15} maxW="820px">
            What it takes to engage a supplier{" "}
            <Box as="span" className="gradient-text">outside the EEA</Box>
          </Heading>
        </Reveal>
        <Reveal delay={0.1}>
          <Text color="text.muted" fontSize={{ base: "md", md: "lg" }} lineHeight={1.7} maxW="740px" mb={10}>
            Five things that are true regardless of which supplier you choose. Every
            instrument named here is public record and dated, so you can check it rather than
            take our word for it.
          </Text>
        </Reveal>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
          {euRegulatory.map((m, i) => (
            <Reveal key={m.title} delay={0.03 * i}>
              <GlassCard h="full" p={{ base: 6, md: 7 }}>
                <Heading as="h3" fontSize={{ base: "17px", md: "19px" }} lineHeight={1.3} mb={3}>
                  {m.title}
                </Heading>
                <Text color="text.muted" fontSize={{ base: "sm", md: "md" }} lineHeight={1.75}>
                  {m.detail}
                </Text>
              </GlassCard>
            </Reveal>
          ))}
        </SimpleGrid>
      </Container>

      {/* Honest positioning. The section most suppliers omit, and the reason this page can
          rank: a European buyer has already read a dozen pages claiming local presence. */}
      <Box bg="rgba(255,255,255,0.015)" borderY="1px solid" borderColor="border.subtle">
        <Container maxW="container.site" px={{ base: 5, md: 8 }} py={{ base: 12, md: 16 }}>
          <Reveal><Eyebrow>Straight answers</Eyebrow></Reveal>
          <Reveal delay={0.05}>
            <Heading as="h2" mt={4} mb={3} fontSize={{ base: "28px", md: "38px" }} lineHeight={1.15} maxW="820px">
              What we claim, and{" "}
              <Box as="span" className="gradient-text">what we do not</Box>
            </Heading>
          </Reveal>
          <Reveal delay={0.1}>
            <Text color="text.muted" fontSize={{ base: "md", md: "lg" }} lineHeight={1.7} maxW="740px" mb={10}>
              We hold no European entity and make no claim of local presence. Stating that
              plainly is cheaper for both of us than discovering it during your vendor review.
            </Text>
          </Reveal>
          <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={5}>
            {euPositioning.map((group, i) => (
              <Reveal key={group.heading} delay={0.04 * i}>
                <GlassCard h="full" p={{ base: 6, md: 7 }}>
                  <Heading as="h3" fontSize={{ base: "17px", md: "19px" }} lineHeight={1.3} mb={4}>
                    {group.heading}
                  </Heading>
                  <List spacing={3}>
                    {group.points.map((p) => (
                      <ListItem key={p} display="flex" gap={3} alignItems="flex-start">
                        <Icon
                          as={i === 0 ? FiAlertCircle : FiCheck}
                          color={i === 0 ? "rgba(255,180,160,0.85)" : "accent.solid"}
                          mt="4px"
                          flexShrink={0}
                        />
                        <Text color="text.muted" fontSize={{ base: "sm", md: "md" }} lineHeight={1.7}>
                          {p}
                        </Text>
                      </ListItem>
                    ))}
                  </List>
                </GlassCard>
              </Reveal>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      <VisualBand
        src={precisionLayers}
        eyebrow="How we work"
        title="Decided in week one,"
        highlight="not retrofitted"
        subtitle="Where data lives, what is logged, and which risk tier an AI feature falls into — settled before the architecture is set."
        height={{ base: "260px", md: "340px", lg: "390px" }}
        focal="center"
      />

      {/* Sectors */}
      <Container maxW="container.site" px={{ base: 5, md: 8 }} py={{ base: 12, md: 16 }}>
        <Reveal><Eyebrow>Where this matters most</Eyebrow></Reveal>
        <Reveal delay={0.05}>
          <Heading as="h2" mt={4} mb={3} fontSize={{ base: "28px", md: "38px" }} lineHeight={1.15} maxW="820px">
            Builds where European rules{" "}
            <Box as="span" className="gradient-text">change the architecture</Box>
          </Heading>
        </Reveal>
        <Reveal delay={0.1}>
          <Text color="text.muted" fontSize={{ base: "md", md: "lg" }} lineHeight={1.7} maxW="740px" mb={10}>
            Four kinds of project where the regulatory position is a design input rather than
            a compliance form filled in at the end.
          </Text>
        </Reveal>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
          {euSectors.map((s, i) => (
            <Reveal key={s.title} delay={0.03 * i}>
              <GlassCard h="full" p={{ base: 6, md: 7 }}>
                <Heading as="h3" fontSize={{ base: "17px", md: "19px" }} lineHeight={1.3} mb={3}>
                  {s.title}
                </Heading>
                <Text color="text.muted" fontSize={{ base: "sm", md: "md" }} lineHeight={1.75}>
                  {s.detail}
                </Text>
              </GlassCard>
            </Reveal>
          ))}
        </SimpleGrid>
      </Container>

      {/* Working model */}
      <Box bg="rgba(255,255,255,0.015)" borderY="1px solid" borderColor="border.subtle">
        <Container maxW="container.site" px={{ base: 5, md: 8 }} py={{ base: 12, md: 16 }}>
          <Reveal><Eyebrow>Engagement</Eyebrow></Reveal>
          <Reveal delay={0.05}>
            <Heading as="h2" mt={4} mb={3} fontSize={{ base: "28px", md: "38px" }} lineHeight={1.15} maxW="820px">
              How a European engagement{" "}
              <Box as="span" className="gradient-text">actually runs</Box>
            </Heading>
          </Reveal>
          <Reveal delay={0.1}>
            <Text color="text.muted" fontSize={{ base: "md", md: "lg" }} lineHeight={1.7} maxW="740px" mb={10}>
              Timezone stated as arithmetic rather than as a promise, because the arithmetic
              is something you can check.
            </Text>
          </Reveal>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
            {euWorkingModel.map((w, i) => (
              <Reveal key={w.step} delay={0.03 * i}>
                <GlassCard h="full" p={{ base: 6, md: 7 }}>
                  <HStack align="flex-start" spacing={4}>
                    <Box
                      minW="32px" h="32px" borderRadius="10px" display="grid" placeItems="center"
                      bg="rgba(180,160,255,0.12)" border="1px solid" borderColor="rgba(180,160,255,0.25)"
                      fontSize="sm" fontWeight={700} color="accent.solid" flexShrink={0}
                    >
                      {i + 1}
                    </Box>
                    <Box>
                      <Heading as="h3" fontSize={{ base: "16px", md: "18px" }} lineHeight={1.3} mb={2}>
                        {w.step}
                      </Heading>
                      <Text color="text.muted" fontSize={{ base: "sm", md: "md" }} lineHeight={1.75}>
                        {w.detail}
                      </Text>
                    </Box>
                  </HStack>
                </GlassCard>
              </Reveal>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Services — internal links out to the six service pages, which is how this page
          passes authority into the cluster rather than terminating it. */}
      <Container maxW="container.site" px={{ base: 5, md: 8 }} py={{ base: 12, md: 16 }}>
        <Reveal><Eyebrow>What we build</Eyebrow></Reveal>
        <Reveal delay={0.05}>
          <Heading as="h2" mt={4} mb={8} fontSize={{ base: "28px", md: "38px" }} lineHeight={1.15} maxW="820px">
            Six disciplines,{" "}
            <Box as="span" className="gradient-text">one team</Box>
          </Heading>
        </Reveal>
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={4}>
          {NavbarservicesOptions.map((s, i) => (
            <Reveal key={s.option} delay={0.03 * i}>
              <GlassCard
                as={Link}
                to={s.path}
                h="full"
                p={{ base: 5, md: 6 }}
                display="block"
                transition="transform .25s ease, border-color .25s ease"
                _hover={{ transform: "translateY(-3px)", borderColor: "rgba(180,160,255,0.4)" }}
              >
                <HStack justify="space-between" align="flex-start">
                  <Heading as="h3" fontSize={{ base: "16px", md: "17px" }} lineHeight={1.3}>
                    {s.option}
                  </Heading>
                  <Icon as={FiArrowUpRight} color="accent.solid" flexShrink={0} />
                </HStack>
              </GlassCard>
            </Reveal>
          ))}
        </SimpleGrid>

        {/* Related markets — internal linking into the country cluster. */}
        <Reveal delay={0.2}>
          <VStack align="flex-start" spacing={3} mt={12} pt={10} borderTop="1px solid" borderColor="border.subtle">
            <Text fontSize="sm" color="text.faint" letterSpacing="0.12em" textTransform="uppercase">
              Other markets
            </Text>
            <HStack flexWrap="wrap" rowGap={2} spacing={5}>
              {[
                { to: "/nz", label: "New Zealand" },
                { to: "/us", label: "United States" },
                { to: "/ca", label: "Canada" },
                { to: "/au", label: "Australia" },
                { to: "/ae", label: "United Arab Emirates" },
                { to: "/portfolio", label: "Portfolio" },
                { to: "/pricing", label: "How we price" },
              ].map((l) => (
                <Text
                  key={l.to}
                  as={Link}
                  to={l.to}
                  color="text.muted"
                  fontSize={{ base: "sm", md: "md" }}
                  _hover={{ color: "accent.solid" }}
                  transition="color .2s ease"
                >
                  {l.label}
                </Text>
              ))}
            </HStack>
          </VStack>
        </Reveal>
      </Container>

      {/* Faqs renders the accordion only — it emits no structured data of its own, so the
          FAQPage node in this page's jsonLd above is the single source and there is no
          duplicate-schema risk. */}
      <Faqs
        items={euFaqs}
        eyebrow="Europe FAQ"
        title="Questions from"
        highlight="European buyers."
        intro="What European enquirers ask before a first call — including the one whose honest answer sends them to a different supplier."
      />

      <CTASection
        eyebrow="Building for European users?"
        title="Let's scope it"
        highlight="properly"
        subtitle="Send us the scope, or book a call in your working hours. We sign your NDA before reviewing anything confidential, and if you need an EU-established supplier we will tell you on the first call."
      />
    </Box>
  );
};

export default EuropePage;
