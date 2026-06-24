import React from "react";
import {
  Box, Container, Flex, Heading, Text, Button, SimpleGrid,
  HStack, VStack, Icon, Badge, Stack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiArrowRight, FiArrowUpRight, FiClock, FiMapPin } from "react-icons/fi";
import { caseStudies } from "../utils/Constant/caseStudies";
import { Reveal, CTASection, Seo } from "../Components/common";
import { Eyebrow } from "../Components/common/SectionHeading";
import { useBooking } from "../context/BookingContext";

const MotionBox = motion(Box);

// ── Service colour map ──────────────────────────────────────────────────────
const serviceColor = {
  "AI & ML Solutions":       { from: "#7b6cff", to: "#b57bff" },
  "Web Development":         { from: "#7b6cff", to: "#b57bff" },
  "App Development":         { from: "#7b6cff", to: "#b57bff" },
  "UI/UX Design":            { from: "#7b6cff", to: "#b57bff" },
  "Blockchain Development":  { from: "#7b6cff", to: "#b57bff" },
  "Digital Marketing":       { from: "#7b6cff", to: "#b57bff" },
};

// ── Inline SVG icons per service ────────────────────────────────────────────
const ServiceIcon = ({ service, size = 28 }) => {
  const color = serviceColor[service]?.from || "#7b6cff";
  const icons = {
    "AI & ML Solutions": (
      <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="5" stroke={color} strokeWidth="2"/>
        <path d="M14 2v4M14 22v4M2 14h4M22 14h4" stroke={color} strokeWidth="2" strokeLinecap="round"/>
        <path d="M5.8 5.8l2.8 2.8M19.4 19.4l2.8 2.8M5.8 22.2l2.8-2.8M19.4 8.6l2.8-2.8" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="14" cy="14" r="2" fill={color}/>
      </svg>
    ),
    "Web Development": (
      <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
        <rect x="2" y="5" width="24" height="18" rx="3" stroke={color} strokeWidth="2"/>
        <path d="M2 9h24" stroke={color} strokeWidth="1.5"/>
        <circle cx="6" cy="7" r="1" fill={color}/>
        <circle cx="10" cy="7" r="1" fill={color}/>
        <path d="M9 14l-3 3 3 3M19 14l3 3-3 3M15 13l-2 8" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    "App Development": (
      <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
        <rect x="8" y="2" width="12" height="24" rx="3" stroke={color} strokeWidth="2"/>
        <path d="M12 5h4" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="14" cy="22" r="1.5" fill={color}/>
        <path d="M11 10h6M11 13h4" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    "UI/UX Design": (
      <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="10" stroke={color} strokeWidth="2"/>
        <path d="M8 14c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="14" cy="14" r="2.5" fill={color}/>
        <path d="M14 16.5V20" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    "Blockchain Development": (
      <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
        <rect x="10" y="2" width="8" height="7" rx="1.5" stroke={color} strokeWidth="1.8"/>
        <rect x="2" y="19" width="8" height="7" rx="1.5" stroke={color} strokeWidth="1.8"/>
        <rect x="18" y="19" width="8" height="7" rx="1.5" stroke={color} strokeWidth="1.8"/>
        <path d="M14 9v5M14 14l-8 5M14 14l8 5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    "Digital Marketing": (
      <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
        <path d="M4 20L10 12l5 6 4-8 5 10" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="22" cy="6" r="3" stroke={color} strokeWidth="1.8"/>
        <path d="M20 8l-4 4" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  };
  return icons[service] || null;
};

// ── Stat strip ───────────────────────────────────────────────────────────────
const StatStrip = ({ results }) => (
  <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4} mt={8}>
    {results.slice(0, 4).map((r) => (
      <Box
        key={r.label}
        p={4}
        borderRadius="14px"
        bg="rgba(255,255,255,0.03)"
        border="1px solid"
        borderColor="border.subtle"
        textAlign="center"
      >
        <Text fontSize={{ base: "22px", md: "26px" }} fontWeight={700} className="gradient-text" lineHeight={1}>
          {r.value}
        </Text>
        <Text fontSize="xs" color="text.faint" mt={1} lineHeight={1.4}>{r.label}</Text>
      </Box>
    ))}
  </SimpleGrid>
);

// ── Card ─────────────────────────────────────────────────────────────────────
const CaseStudyCard = ({ study, index }) => {
  const navigate = useNavigate();
  const colors = serviceColor[study.service] || serviceColor["AI & ML Solutions"];
  const gradient = `linear-gradient(135deg, ${colors.from}22, ${colors.to}11)`;

  return (
    <MotionBox
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => navigate(`/case-studies/${study.slug}`)}
      cursor="pointer"
      role="article"
      p={{ base: 6, md: 8 }}
      borderRadius="24px"
      bg={gradient}
      border="1px solid"
      borderColor="border.subtle"
      position="relative"
      overflow="hidden"
      _hover={{
        borderColor: `${colors.from}55`,
        transform: "translateY(-4px)",
        boxShadow: `0 24px 60px -20px ${colors.from}33`,
      }}
      sx={{ transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)" }}
    >
      {/* glow */}
      <Box
        position="absolute" top="-40px" right="-40px"
        w="180px" h="180px"
        bg={`${colors.from}18`}
        filter="blur(50px)"
        rounded="full"
        pointerEvents="none"
      />

      <VStack align="start" spacing={5} position="relative">
        {/* icon + badges */}
        <Flex w="full" justify="space-between" align="flex-start">
          <Flex
            w="54px" h="54px" align="center" justify="center"
            borderRadius="14px"
            bg="rgba(255,255,255,0.05)"
            border="1px solid"
            borderColor={`${colors.from}33`}
          >
            <ServiceIcon service={study.service} size={26} />
          </Flex>
          <VStack align="end" spacing={1}>
            <Badge
              borderRadius="full" px={3} py={1}
              fontSize="10px" fontWeight={700}
              bg={`${colors.from}22`}
              color={colors.from}
              border="1px solid"
              borderColor={`${colors.from}44`}
            >
              {study.service}
            </Badge>
            <Badge
              borderRadius="full" px={3} py={1}
              fontSize="10px"
              bg="rgba(255,255,255,0.05)"
              color="text.faint"
            >
              {study.industry}
            </Badge>
          </VStack>
        </Flex>

        {/* title */}
        <Box>
          <Heading as="h2" fontSize={{ base: "22px", md: "26px" }} lineHeight={1.2} mb={3}>
            {study.hero.title}{" "}
            <Box as="span" className="gradient-text">{study.hero.highlight}</Box>
          </Heading>
          <Text color="text.muted" fontSize="sm" lineHeight={1.7} noOfLines={3}>
            {study.overview}
          </Text>
        </Box>

        {/* meta row */}
        <HStack spacing={4} fontSize="xs" color="text.faint" flexWrap="wrap">
          <HStack spacing={1}>
            <Icon as={FiMapPin} boxSize={3} color={colors.from} />
            <Text>{study.location}</Text>
          </HStack>
          <HStack spacing={1}>
            <Icon as={FiClock} boxSize={3} color={colors.from} />
            <Text>{study.duration}</Text>
          </HStack>
        </HStack>

        {/* top 2 results */}
        <HStack spacing={4} w="full">
          {study.results.slice(0, 2).map((r) => (
            <Box key={r.label} flex="1" p={3} borderRadius="12px" bg="rgba(255,255,255,0.04)" border="1px solid" borderColor="border.subtle">
              <Text fontSize="18px" fontWeight={700} color={colors.from} lineHeight={1}>{r.value}</Text>
              <Text fontSize="10px" color="text.faint" mt={0.5} lineHeight={1.3}>{r.label}</Text>
            </Box>
          ))}
        </HStack>

        {/* CTA */}
        <HStack
          w="full" justify="space-between" align="center"
          pt={2} borderTop="1px solid" borderColor="border.subtle"
        >
          <Text fontSize="sm" fontWeight={600} color="text.primary">Read Case Study</Text>
          <Icon as={FiArrowUpRight} color={colors.from} boxSize={5}
            transition="transform .2s"
            _groupHover={{ transform: "translate(2px,-2px)" }}
          />
        </HStack>
      </VStack>
    </MotionBox>
  );
};

// ── Page ─────────────────────────────────────────────────────────────────────
const CaseStudiesPage = () => {
  const { onOpen: openBooking } = useBooking();
  const studies = Object.values(caseStudies);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Case Studies — Futurise Solutions",
      url: "https://www.futurisesolutions.com/case-studies",
      description:
        "Real results from real projects. Explore how Futurise Solutions has delivered measurable business outcomes across AI, Web, App, Blockchain, UI/UX, and Digital Marketing.",
      publisher: { "@id": "https://www.futurisesolutions.com/#organization" },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.futurisesolutions.com/" },
          { "@type": "ListItem", position: 2, name: "Case Studies", item: "https://www.futurisesolutions.com/case-studies" },
        ],
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Futurise Solutions Case Studies",
      url: "https://www.futurisesolutions.com/case-studies",
      numberOfItems: studies.length,
      itemListElement: studies.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `https://www.futurisesolutions.com/case-studies/${s.slug}`,
        name: `${s.hero.title} ${s.hero.highlight} — ${s.service} Case Study`,
      })),
    },
  ];

  return (
    <Box>
      <Seo
        title="Case Studies — Real Results From Real Projects"
        description="Explore how Futurise Solutions delivered measurable outcomes across AI, Web, App, Blockchain, UI/UX, and Digital Marketing — with verified results and client testimonials."
        path="/case-studies"
        keywords="Futurise Solutions case studies, AI development case study, SaaS platform case study, mobile app case study, DeFi protocol case study, UI UX redesign case study, SEO growth case study"
        jsonLd={jsonLd}
      />

      {/* Hero */}
      <Box position="relative" overflow="hidden" pt={{ base: 16, md: 24 }} pb={{ base: 12, md: 16 }}>
        <Box position="absolute" top="-10%" left="-5%" w="500px" h="500px" bg="rgba(123,108,255,0.18)" filter="blur(120px)" rounded="full" pointerEvents="none" />
        <Box position="absolute" top="20%" right="-8%" w="400px" h="400px" bg="rgba(181,123,255,0.14)" filter="blur(120px)" rounded="full" pointerEvents="none" />

        <Container maxW="1200px" px={{ base: 5, md: 8 }} position="relative">
          <VStack align="center" spacing={6} textAlign="center" maxW="820px" mx="auto">
            <Reveal>
              <Eyebrow>Real Work. Real Results.</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <Heading as="h1" fontSize={{ base: "38px", md: "58px", lg: "68px" }} lineHeight={1.06} letterSpacing="-0.025em">
                From Brief to{" "}
                <Box as="span" className="gradient-text">Breakthrough</Box>
              </Heading>
            </Reveal>
            <Reveal delay={0.1}>
              <Text fontSize={{ base: "lg", md: "xl" }} color="text.muted" lineHeight={1.75} maxW="640px">
                Six in-depth case studies documenting exactly how we approached, built, and measured success — across AI, web, mobile, blockchain, design, and growth.
              </Text>
            </Reveal>
            <Reveal delay={0.15}>
              <Stack direction={{ base: "column", sm: "row" }} spacing={4} pt={2}>
                <Button variant="gradient" size="lg" rightIcon={<FiArrowRight />} onClick={openBooking}>
                  Discuss your project
                </Button>
                <Button variant="outlineGlow" size="lg" onClick={() => window.scrollTo({ top: 500, behavior: "smooth" })}>
                  Browse studies
                </Button>
              </Stack>
            </Reveal>
          </VStack>

          {/* Aggregate stats strip */}
          <Reveal delay={0.2}>
            <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4} mt={14}
              p={6} borderRadius="20px"
              bg="rgba(255,255,255,0.02)" border="1px solid" borderColor="border.subtle"
            >
              {[
                { value: "6", label: "Case Studies Published" },
                { value: "30+", label: "Projects Delivered" },
                { value: "97%", label: "Client Retention Rate" },
                { value: "14+", label: "Global Clients" },
              ].map((s) => (
                <Box key={s.label} textAlign="center">
                  <Text fontSize={{ base: "28px", md: "36px" }} fontWeight={700} className="gradient-text" lineHeight={1}>{s.value}</Text>
                  <Text fontSize="sm" color="text.faint" mt={1}>{s.label}</Text>
                </Box>
              ))}
            </SimpleGrid>
          </Reveal>
        </Container>
      </Box>

      {/* Grid */}
      <Container maxW="1200px" px={{ base: 5, md: 8 }} pb={{ base: 16, md: 24 }}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {studies.map((study, i) => (
            <CaseStudyCard key={study.slug} study={study} index={i} />
          ))}
        </SimpleGrid>
      </Container>

      <CTASection
        eyebrow="Ready to be our next case study?"
        title="Let's build something"
        highlight="worth writing about."
        subtitle="Book a free strategy call and let's talk about what's possible for your product."
        primaryLabel="Book appointment"
        onPrimary={openBooking}
      />
    </Box>
  );
};

export default CaseStudiesPage;
