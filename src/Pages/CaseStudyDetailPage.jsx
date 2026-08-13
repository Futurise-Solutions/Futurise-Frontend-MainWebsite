import React, { useRef } from "react";
import {
  Box, Container, Flex, Heading, Text, Button, SimpleGrid,
  HStack, VStack, Icon, Badge, Stack, Divider,
  Avatar, Wrap, WrapItem, Tag,
} from "@chakra-ui/react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  FiArrowRight, FiMapPin, FiClock, FiCalendar, FiCheckCircle,
  FiChevronRight, FiArrowLeft, FiTrendingUp, FiStar,
} from "react-icons/fi";
import { caseStudies, serviceForCaseStudy } from "../utils/Constant/caseStudies";
import { services } from "../utils/Constant";
import { Reveal, CTASection, Seo } from "../Components/common";
import { Eyebrow } from "../Components/common/SectionHeading";
import { useBooking } from "../context/BookingContext";
import NotFound from "./NotFound";

const MotionBox = motion(Box);

// ── Service colour map (mirrors CaseStudiesPage) ─────────────────────────────
const serviceColor = {
  "AI & ML Solutions":      { from: "#7b6cff", to: "#b57bff" },
  "Web Development":        { from: "#7b6cff", to: "#b57bff" },
  "App Development":        { from: "#7b6cff", to: "#b57bff" },
  "UI/UX Design":           { from: "#7b6cff", to: "#b57bff" },
  "Blockchain Development": { from: "#7b6cff", to: "#b57bff" },
  "Digital Marketing":      { from: "#7b6cff", to: "#b57bff" },
};

// ── Inline SVG icons ──────────────────────────────────────────────────────────
const ServiceIcon = ({ service, size = 32 }) => {
  const color = serviceColor[service]?.from || "#7b6cff";
  const icons = {
    "AI & ML Solutions": (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="6" stroke={color} strokeWidth="2"/>
        <path d="M16 2v5M16 25v5M2 16h5M25 16h5" stroke={color} strokeWidth="2" strokeLinecap="round"/>
        <path d="M6.7 6.7l3.5 3.5M21.8 21.8l3.5 3.5M6.7 25.3l3.5-3.5M21.8 10.2l3.5-3.5" stroke={color} strokeWidth="1.6" strokeLinecap="round"/>
        <circle cx="16" cy="16" r="2.5" fill={color}/>
      </svg>
    ),
    "Web Development": (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
        <rect x="2" y="6" width="28" height="20" rx="3" stroke={color} strokeWidth="2"/>
        <path d="M2 11h28" stroke={color} strokeWidth="1.5"/>
        <circle cx="7" cy="8.5" r="1.2" fill={color}/>
        <circle cx="11.5" cy="8.5" r="1.2" fill={color}/>
        <path d="M10 17l-4 4 4 4M22 17l4 4-4 4M18 15l-3 10" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    "App Development": (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
        <rect x="9" y="2" width="14" height="28" rx="3.5" stroke={color} strokeWidth="2"/>
        <path d="M13 6h6" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="16" cy="26" r="2" fill={color}/>
        <path d="M12.5 12h7M12.5 15.5h5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    "UI/UX Design": (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="12" stroke={color} strokeWidth="2"/>
        <path d="M9 16c0-3.9 3.1-7 7-7s7 3.1 7 7" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="16" cy="16" r="3" fill={color}/>
        <path d="M16 19v4" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    "Blockchain Development": (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
        <rect x="11" y="2" width="10" height="8" rx="2" stroke={color} strokeWidth="1.8"/>
        <rect x="2" y="22" width="10" height="8" rx="2" stroke={color} strokeWidth="1.8"/>
        <rect x="20" y="22" width="10" height="8" rx="2" stroke={color} strokeWidth="1.8"/>
        <path d="M16 10v6M16 16l-9 6M16 16l9 6" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    "Digital Marketing": (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
        <path d="M4 24L11 14l6 7 5-10 6 13" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="26" cy="7" r="3.5" stroke={color} strokeWidth="1.8"/>
        <path d="M23.5 9.5l-5 5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  };
  return icons[service] || null;
};

// ── Animated counter badge ────────────────────────────────────────────────────
const ResultCard = ({ value, label, desc, color }) => (
  <MotionBox
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    p={{ base: 5, md: 7 }}
    borderRadius="20px"
    bg={`${color}0d`}
    border="1px solid"
    borderColor={`${color}33`}
    textAlign="center"
    position="relative"
    overflow="hidden"
  >
    <Box
      position="absolute" top="-30px" right="-30px"
      w="100px" h="100px"
      bg={`${color}18`}
      filter="blur(30px)"
      rounded="full"
      pointerEvents="none"
    />
    <Text fontSize={{ base: "32px", md: "40px" }} fontWeight={800} lineHeight={1}
      bgGradient={`linear(135deg, ${color}, ${color}cc)`}
      bgClip="text"
    >
      {value}
    </Text>
    <Text fontWeight={600} color="text.primary" mt={2} fontSize={{ base: "sm", md: "md" }}>
      {label}
    </Text>
    <Text fontSize="xs" color="text.faint" mt={1} lineHeight={1.5}>{desc}</Text>
  </MotionBox>
);

// ── Step card ─────────────────────────────────────────────────────────────────
const StepCard = ({ step, index, color }) => (
  <MotionBox
    initial={{ opacity: 0, x: index % 2 === 0 ? -24 : 24 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    p={6}
    borderRadius="18px"
    bg="rgba(255,255,255,0.02)"
    border="1px solid"
    borderColor="border.subtle"
    _hover={{ borderColor: `${color}33` }}
    sx={{ transition: "border-color 0.2s" }}
  >
    <HStack spacing={4} align="flex-start">
      <Flex
        w="36px" h="36px" flexShrink={0}
        align="center" justify="center"
        borderRadius="10px"
        bg={`${color}22`}
        border="1px solid"
        borderColor={`${color}44`}
        fontSize="14px" fontWeight={700}
        color={color}
      >
        {String(index + 1).padStart(2, "0")}
      </Flex>
      <Box>
        <Text fontWeight={700} color="text.primary" mb={1}>{step.title}</Text>
        <Text fontSize="sm" color="text.muted" lineHeight={1.75}>{step.desc}</Text>
      </Box>
    </HStack>
  </MotionBox>
);

// ── FAQ accordion ─────────────────────────────────────────────────────────────
const FaqItem = ({ q, a, index, color }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <MotionBox
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      borderRadius="16px"
      border="1px solid"
      borderColor={open ? `${color}44` : "border.subtle"}
      overflow="hidden"
      sx={{ transition: "border-color 0.2s" }}
    >
      <Button
        w="full" textAlign="left" justifyContent="space-between"
        px={6} py={5} h="auto"
        variant="ghost"
        color="text.primary"
        fontWeight={600}
        fontSize={{ base: "sm", md: "md" }}
        rightIcon={
          <Icon
            as={FiChevronRight}
            transform={open ? "rotate(90deg)" : "rotate(0deg)"}
            transition="transform 0.2s"
            color={color}
          />
        }
        onClick={() => setOpen((v) => !v)}
        _hover={{ bg: `${color}0a` }}
      >
        {q}
      </Button>
      {open && (
        <Box px={6} pb={5}>
          <Text fontSize="sm" color="text.muted" lineHeight={1.8}>{a}</Text>
        </Box>
      )}
    </MotionBox>
  );
};

// ── MAIN PAGE ─────────────────────────────────────────────────────────────────
const CaseStudyDetailPage = ({ slug: propSlug }) => {
  const { slug: paramSlug } = useParams();
  const slug = propSlug || paramSlug;
  const navigate = useNavigate();
  const { onOpen: openBooking } = useBooking();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const study = caseStudies[slug];
  if (!study) return <NotFound />;

  const colors = serviceColor[study.service] || serviceColor["AI & ML Solutions"];
  const c = colors.from;

  const allSlugs = Object.keys(caseStudies);
  const currentIndex = allSlugs.indexOf(slug);
  const prevSlug = currentIndex > 0 ? allSlugs[currentIndex - 1] : null;
  const nextSlug = currentIndex < allSlugs.length - 1 ? allSlugs[currentIndex + 1] : null;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: study.meta.title,
      description: study.meta.description,
      url: `https://www.futurisesolutions.com/case-studies/${slug}`,
      image: `https://www.futurisesolutions.com${study.meta.ogImage || "/home.png"}`,
      author: { "@id": "https://www.futurisesolutions.com/#organization" },
      publisher: { "@id": "https://www.futurisesolutions.com/#organization" },
      datePublished: `${study.year}-01-01`,
      about: { "@type": "Service", name: study.service },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.futurisesolutions.com/" },
          { "@type": "ListItem", position: 2, name: "Case Studies", item: "https://www.futurisesolutions.com/case-studies" },
          { "@type": "ListItem", position: 3, name: `${study.hero.title} ${study.hero.highlight}`, item: `https://www.futurisesolutions.com/case-studies/${slug}` },
        ],
      },
    },
    ...(study.faqs?.length ? [{
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: study.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    }] : []),
  ];

  return (
    <Box>
      <Seo
        title={study.meta.title}
        description={study.meta.description}
        path={`/case-studies/${slug}`}
        image={study.meta.ogImage}
        keywords={study.meta.keywords}
        type="article"
        publishedTime={`${study.year}-01-01`}
        section={study.service}
        jsonLd={jsonLd}
      />

      {/* ── Hero ── */}
      <Box ref={heroRef} position="relative" overflow="hidden" pt={{ base: 14, md: 22 }} pb={{ base: 10, md: 14 }}>
        <MotionBox
          style={{ y: yParallax }}
          position="absolute" inset={0}
          pointerEvents="none"
        >
          <Box position="absolute" top="-10%" left="-5%" w="600px" h="600px" bg={`${c}18`} filter="blur(140px)" rounded="full" />
          <Box position="absolute" bottom="-20%" right="-5%" w="450px" h="450px" bg={`${colors.to}14`} filter="blur(120px)" rounded="full" />
        </MotionBox>

        <Container maxW="1200px" px={{ base: 5, md: 8 }} position="relative">
          {/* Breadcrumb */}
          <Reveal>
            <HStack spacing={2} fontSize="sm" color="text.faint" mb={8} flexWrap="wrap">
              <Text as={Link} to="/" _hover={{ color: c }} transition="color .2s">Home</Text>
              <Icon as={FiChevronRight} boxSize={3} />
              <Text as={Link} to="/case-studies" _hover={{ color: c }} transition="color .2s">Case Studies</Text>
              <Icon as={FiChevronRight} boxSize={3} />
              <Text color="text.muted">{study.service}</Text>
            </HStack>
          </Reveal>

          <Flex direction={{ base: "column", lg: "row" }} gap={{ base: 12, lg: 16 }} align="flex-start">
            {/* Left — content */}
            <VStack flex="1" align="start" spacing={6}>
              <Reveal>
                <Eyebrow>{study.hero.eyebrow}</Eyebrow>
              </Reveal>
              <Reveal delay={0.05}>
                <Heading as="h1" fontSize={{ base: "36px", md: "52px", lg: "60px" }} lineHeight={1.08} letterSpacing="-0.025em">
                  {study.hero.title}{" "}
                  <Box as="span" className="gradient-text">{study.hero.highlight}</Box>
                </Heading>
              </Reveal>
              <Reveal delay={0.1}>
                <Text fontSize={{ base: "lg", md: "xl" }} color="text.muted" lineHeight={1.75}>
                  {study.hero.subtitle}
                </Text>
              </Reveal>
              <Reveal delay={0.15}>
                <Stack direction={{ base: "column", sm: "row" }} spacing={4} pt={2}>
                  <Button variant="gradient" size="lg" rightIcon={<FiArrowRight />} onClick={() => openBooking("case-study-detail")}>
                    Start a similar project
                  </Button>
                  <Button variant="outlineGlow" size="lg" onClick={() => navigate("/case-studies")}>
                    All case studies
                  </Button>
                </Stack>
              </Reveal>
            </VStack>

            {/* Right — meta card */}
            <Reveal delay={0.12} from="left" flex={{ base: "none", lg: "0 0 300px" }} w={{ base: "full", lg: "300px" }}>
              <Box
                p={6} borderRadius="22px"
                bg={`${c}0d`}
                border="1px solid" borderColor={`${c}33`}
              >
                <Flex w="54px" h="54px" align="center" justify="center"
                  borderRadius="14px" bg={`${c}22`} border="1px solid" borderColor={`${c}44`} mb={5}
                >
                  <ServiceIcon service={study.service} size={28} />
                </Flex>
                <VStack align="start" spacing={4}>
                  {[
                    { icon: FiTrendingUp,  label: "Service",   value: study.service },
                    { icon: FiMapPin,      label: "Location",  value: study.location },
                    { icon: FiClock,       label: "Duration",  value: study.duration },
                    { icon: FiCalendar,    label: "Year",      value: study.year },
                  ].map(({ icon, label, value }) => (
                    <HStack key={label} spacing={3}>
                      <Flex w="32px" h="32px" flexShrink={0} align="center" justify="center"
                        borderRadius="8px" bg={`${c}18`}
                      >
                        <Icon as={icon} color={c} boxSize={4} />
                      </Flex>
                      <Box>
                        <Text fontSize="10px" color="text.faint" textTransform="uppercase" letterSpacing="0.1em">{label}</Text>
                        <Text fontSize="sm" fontWeight={600} color="text.primary">{value}</Text>
                      </Box>
                    </HStack>
                  ))}
                  <Divider borderColor="border.subtle" />
                  <Box>
                    <Text fontSize="10px" color="text.faint" textTransform="uppercase" letterSpacing="0.1em" mb={2}>Industry</Text>
                    <Badge borderRadius="full" px={3} py={1} fontSize="xs" bg={`${c}22`} color={c} border="1px solid" borderColor={`${c}44`}>
                      {study.industry}
                    </Badge>
                  </Box>
                </VStack>
              </Box>
            </Reveal>
          </Flex>
        </Container>
      </Box>

      {/* ── Overview ── */}
      <Container maxW="1200px" px={{ base: 5, md: 8 }} py={{ base: 10, md: 14 }}>
        <Reveal>
          <Box p={{ base: 6, md: 10 }} borderRadius="24px"
            bgGradient={`linear(135deg, ${c}0d, ${colors.to}08)`}
            border="1px solid" borderColor={`${c}22`}
          >
            <Eyebrow mb={4}>Project Overview</Eyebrow>
            <Text fontSize={{ base: "md", md: "lg" }} color="text.primary" lineHeight={1.85}>
              {study.overview}
            </Text>
          </Box>
        </Reveal>
      </Container>

      {/* ── Key Insight ── */}
      {study.keyInsight && (
        <Container maxW="1200px" px={{ base: 5, md: 8 }} pb={{ base: 10, md: 14 }}>
          <Reveal>
            <Box
              p={{ base: 6, md: 8 }}
              borderRadius="24px"
              bg="rgba(123, 108, 255, 0.04)"
              border="1px solid"
              borderColor={`${c}44`}
              position="relative"
              overflow="hidden"
            >
              <Box
                position="absolute"
                top={0}
                left={0}
                width="4px"
                height="100%"
                bgGradient={`linear(to-b, ${c}, ${colors.to})`}
              />
              <HStack spacing={4} align="flex-start">
                <Flex
                  w="36px" h="36px" flexShrink={0}
                  align="center" justify="center"
                  borderRadius="10px"
                  bg={`${c}22`}
                  border="1px solid"
                  borderColor={`${c}44`}
                >
                  <Icon as={FiStar} color={c} boxSize={5} />
                </Flex>
                <VStack align="start" spacing={1}>
                  <Text fontWeight={800} fontSize="md" color="text.primary">
                    Key Insight: {study.keyInsight.title}
                  </Text>
                  <Text fontSize="sm" color="text.muted" lineHeight={1.8}>
                    {study.keyInsight.body}
                  </Text>
                </VStack>
              </HStack>
            </Box>
          </Reveal>
        </Container>
      )}

      {/* ── Challenge ── */}
      <Container maxW="1200px" px={{ base: 5, md: 8 }} pb={{ base: 10, md: 14 }}>
        <Flex direction={{ base: "column", lg: "row" }} gap={{ base: 8, lg: 16 }} align="flex-start">
          <VStack flex="1" align="start" spacing={5}>
            <Reveal>
              <Eyebrow>The Challenge</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <Heading fontSize={{ base: "26px", md: "34px" }} lineHeight={1.2}>
                {study.challenge.heading}
              </Heading>
            </Reveal>
            <Reveal delay={0.1}>
              <Text color="text.muted" lineHeight={1.8} fontSize={{ base: "md", md: "lg" }}>
                {study.challenge.body}
              </Text>
            </Reveal>
          </VStack>
          <Reveal delay={0.08} from="left" flex="1">
            <VStack align="start" spacing={3}>
              {study.challenge.points.map((pt, i) => (
                <HStack
                  key={i}
                  spacing={3} align="flex-start"
                  p={4} w="full" borderRadius="14px"
                  bg="rgba(255,255,255,0.02)"
                  border="1px solid" borderColor="border.subtle"
                  _hover={{ borderColor: `${c}33` }}
                  transition="border-color 0.2s"
                >
                  <Flex w="24px" h="24px" flexShrink={0} align="center" justify="center"
                    borderRadius="6px" bg={`${c}22`} mt={0.5}
                  >
                    <Box w="6px" h="6px" borderRadius="full" bg={c} />
                  </Flex>
                  <Text fontSize="sm" color="text.muted" lineHeight={1.7}>{pt}</Text>
                </HStack>
              ))}
            </VStack>
          </Reveal>
        </Flex>
      </Container>

      {/* ── Solution ── */}
      <Box bg="rgba(255,255,255,0.015)" borderTop="1px solid" borderBottom="1px solid" borderColor="border.subtle" py={{ base: 12, md: 18 }}>
        <Container maxW="1200px" px={{ base: 5, md: 8 }}>
          <VStack align="start" spacing={10}>
            <VStack align="start" spacing={4} maxW="720px">
              <Reveal><Eyebrow>Our Solution</Eyebrow></Reveal>
              <Reveal delay={0.05}>
                <Heading fontSize={{ base: "26px", md: "36px" }} lineHeight={1.2}>
                  {study.solution.heading}
                </Heading>
              </Reveal>
              <Reveal delay={0.1}>
                <Text color="text.muted" lineHeight={1.8} fontSize={{ base: "md", md: "lg" }}>
                  {study.solution.body}
                </Text>
              </Reveal>
            </VStack>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="full">
              {study.solution.steps.map((step, i) => (
                <StepCard key={step.title} step={step} index={i} color={c} />
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* ── Execution Timeline ── */}
      {study.timeline && (
        <Container maxW="1200px" px={{ base: 5, md: 8 }} py={{ base: 12, md: 16 }}>
          <VStack align="start" spacing={8} w="full">
            <VStack align="start" spacing={3}>
              <Reveal><Eyebrow>Execution Timeline</Eyebrow></Reveal>
              <Reveal delay={0.05}>
                <Heading fontSize={{ base: "26px", md: "36px" }} lineHeight={1.2}>
                  Our Step-by-Step <Box as="span" className="gradient-text">Process</Box>
                </Heading>
              </Reveal>
            </VStack>

            <Box position="relative" w="full" pl={{ base: 6, md: 10 }} _before={{
              content: '""',
              position: "absolute",
              left: "4px",
              top: "12px",
              bottom: "12px",
              width: "2px",
              bg: "border.subtle",
            }}>
              {study.timeline.map((item, idx) => (
                <Box key={idx} position="relative" pb={idx === study.timeline.length - 1 ? 0 : 8}>
                  {/* Timeline Dot */}
                  <Box
                    position="absolute"
                    left={{ base: "-21px", md: "-41px" }}
                    top="8px"
                    w="10px"
                    h="10px"
                    borderRadius="full"
                    bg={c}
                    border="2px solid"
                    borderColor="bg.canvas"
                    boxShadow={`0 0 10px ${c}`}
                  />
                  <VStack align="start" spacing={1.5}>
                    <HStack spacing={3}>
                      <Badge colorScheme="purple" variant="subtle" fontSize="10px" fontWeight={700} px={2} py={0.5} borderRadius="full" bg={`${c}22`} color={c} border="1px solid" borderColor={`${c}44`}>
                        {item.duration}
                      </Badge>
                      <Text fontWeight={700} color="text.primary" fontSize="sm">
                        {item.phase}
                      </Text>
                    </HStack>
                    <Text fontSize="sm" color="text.muted" maxW="800px" lineHeight={1.7}>
                      {item.desc}
                    </Text>
                  </VStack>
                </Box>
              ))}
            </Box>
          </VStack>
        </Container>
      )}

      {/* ── Tech Stack ── */}
      <Container maxW="1200px" px={{ base: 5, md: 8 }} py={{ base: 10, md: 14 }}>
        <Reveal>
          <Box>
            <Eyebrow mb={4}>Tech Stack</Eyebrow>
            <Wrap spacing={3}>
              {study.stack.map((tech) => (
                <WrapItem key={tech}>
                  <Tag
                    size="md"
                    borderRadius="full"
                    px={4} py={2}
                    bg={`${c}11`}
                    color="text.primary"
                    border="1px solid"
                    borderColor={`${c}33`}
                    fontWeight={500}
                    fontSize="sm"
                  >
                    {tech}
                  </Tag>
                </WrapItem>
              ))}
            </Wrap>
          </Box>
        </Reveal>
      </Container>

      {/* ── Results ── */}
      <Box bg={`${c}08`} borderTop="1px solid" borderBottom="1px solid" borderColor={`${c}22`} py={{ base: 12, md: 18 }}>
        <Container maxW="1200px" px={{ base: 5, md: 8 }}>
          <VStack align="start" spacing={8}>
            <VStack align="start" spacing={3}>
              <Reveal><Eyebrow>Results</Eyebrow></Reveal>
              <Reveal delay={0.05}>
                <Heading fontSize={{ base: "26px", md: "36px" }} lineHeight={1.2}>
                  Measurable impact — <Box as="span" className="gradient-text">verified outcomes</Box>
                </Heading>
              </Reveal>
            </VStack>
            <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={5} w="full">
              {study.results.map((r) => (
                <ResultCard key={r.label} {...r} color={c} />
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* ── Lessons Learned & Refinements ── */}
      {study.lessonsLearned && (
        <Container maxW="1200px" px={{ base: 5, md: 8 }} py={{ base: 12, md: 16 }}>
          <VStack align="start" spacing={8} w="full">
            <VStack align="start" spacing={3}>
              <Reveal><Eyebrow>Retrospective</Eyebrow></Reveal>
              <Reveal delay={0.05}>
                <Heading fontSize={{ base: "26px", md: "36px" }} lineHeight={1.2}>
                  Lessons Learned & <Box as="span" className="gradient-text">Refinements</Box>
                </Heading>
              </Reveal>
            </VStack>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} w="full">
              {study.lessonsLearned.map((lesson, idx) => (
                <Box
                  key={idx}
                  p={6}
                  borderRadius="20px"
                  bg="rgba(255, 255, 255, 0.02)"
                  border="1px solid"
                  borderColor="border.subtle"
                  _hover={{ borderColor: `${c}55` }}
                  transition="border-color 0.2s"
                >
                  <Heading as="h3" size="sm" color="text.primary" mb={3} display="flex" alignItems="center">
                    <Icon as={FiCheckCircle} color={c} mr={2} boxSize={4} />
                    {lesson.title}
                  </Heading>
                  <Text fontSize="sm" color="text.muted" lineHeight={1.75}>
                    {lesson.desc}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      )}

      {/* ── Testimonial ── */}
      {study.testimonial && (
        <Container maxW="1200px" px={{ base: 5, md: 8 }} py={{ base: 12, md: 16 }}>
          <Reveal>
            <Box
              p={{ base: 8, md: 12 }}
              borderRadius="28px"
              bgGradient={`linear(135deg, ${c}12, ${colors.to}0a)`}
              border="1px solid" borderColor={`${c}33`}
              position="relative" overflow="hidden"
            >
              <Box position="absolute" top="-50px" left="-50px" w="200px" h="200px" bg={`${c}18`} filter="blur(60px)" rounded="full" />
              <Box position="relative">
                <HStack spacing={1} mb={6}>
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} as={FiStar} color={c} boxSize={5} fill={c} />
                  ))}
                </HStack>
                <Text
                  fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
                  color="text.primary"
                  fontStyle="italic"
                  lineHeight={1.65}
                  mb={8}
                  maxW="800px"
                >
                  "{study.testimonial.quote}"
                </Text>
                <HStack spacing={4}>
                  <Avatar name={study.testimonial.name} size="md" bg={`${c}33`} color={c} />
                  <Box>
                    <Text fontWeight={700} color="text.primary">{study.testimonial.name}</Text>
                    <Text fontSize="sm" color="text.faint">{study.testimonial.title}</Text>
                  </Box>
                </HStack>
              </Box>
            </Box>
          </Reveal>
        </Container>
      )}

      {/* ── FAQs ── */}
      {study.faqs?.length > 0 && (
        <Container maxW="800px" px={{ base: 5, md: 8 }} pb={{ base: 12, md: 16 }}>
          <Reveal>
            <Eyebrow mb={4}>Frequently Asked</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <Heading mb={8} fontSize={{ base: "24px", md: "32px" }}>
              Trending Questions & <Box as="span" className="gradient-text">FAQs</Box>
            </Heading>
          </Reveal>
          <VStack spacing={3} align="stretch">
            {study.faqs.map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} index={i} color={c} />
            ))}
          </VStack>
        </Container>
      )}

      {/* ── The service behind this work ──
          Return path for the service → case study link. Without it a case study sent
          authority only to the home page and the index, so the loop between a commercial
          page and the proof that supports it never closed. Anchor text is the service's own
          title, which is correct here: this is the one link on the site where pointing the
          head term AT the service page is exactly what we want. */}
      {serviceForCaseStudy[study.slug] && services[serviceForCaseStudy[study.slug]] && (
        <Container maxW="1200px" px={{ base: 5, md: 8 }} pt={{ base: 4, md: 6 }} pb={{ base: 2, md: 4 }}>
          <Reveal>
            <Box
              as={Link}
              to={`/service/${serviceForCaseStudy[study.slug]}`}
              display="block"
              p={{ base: 5, md: 6 }}
              borderRadius="16px"
              bg="bg.surface"
              border="1px solid"
              borderColor="border.subtle"
              _hover={{ borderColor: "rgba(180,160,255,0.35)", textDecoration: "none" }}
              transition="border-color .2s"
            >
              <HStack justify="space-between" align="center" spacing={4}>
                <Box>
                  <Text fontSize="sm" fontWeight={600} letterSpacing="0.08em" textTransform="uppercase" color="text.faint" mb={1}>
                    The service behind this work
                  </Text>
                  {/* Deliberately NOT a heading. Rendering the service title as an <h2>
                      put the service page's exact head term ("AI & ML Solutions") into this
                      page's heading outline, which is the cannibalisation pattern Project 1
                      removed from the blog. As anchor text it is correct and wanted — the
                      whole card is the <a>, so the link still carries the head term TO the
                      service page without this page competing for it. */}
                  <Text fontSize={{ base: "20px", md: "24px" }} fontWeight={600} lineHeight={1.25} color="text.primary">
                    {services[serviceForCaseStudy[study.slug]].title}
                  </Text>
                </Box>
                <Icon as={FiArrowRight} boxSize={5} color="accent.solid" flexShrink={0} />
              </HStack>
            </Box>
          </Reveal>
        </Container>
      )}

      {/* ── Prev / Next ── */}
      <Container maxW="1200px" px={{ base: 5, md: 8 }} pb={{ base: 8, md: 12 }}>
        <Divider borderColor="border.subtle" mb={8} />
        <Flex justify="space-between" gap={4} flexWrap="wrap">
          {prevSlug ? (
            <Button
              variant="outlineGlow" size="md" leftIcon={<FiArrowLeft />}
              onClick={() => navigate(`/case-studies/${prevSlug}`)}
            >
              Previous Study
            </Button>
          ) : <Box />}
          {nextSlug && (
            <Button
              variant="gradient" size="md" rightIcon={<FiArrowRight />}
              onClick={() => navigate(`/case-studies/${nextSlug}`)}
            >
              Next Study
            </Button>
          )}
        </Flex>
      </Container>

      <CTASection
        eyebrow="Want similar results?"
        title="Let's build your"
        highlight="success story."
        subtitle="Book a free 45-minute strategy call. We'll scope your project, recommend the best approach, and give you a clear roadmap — no strings attached."
        primaryLabel="Book appointment"
        onPrimary={() => openBooking("case-study-detail-cta")}
        secondaryLabel="View all case studies"
        secondaryTo="/case-studies"
      />
    </Box>
  );
};

export default CaseStudyDetailPage;
