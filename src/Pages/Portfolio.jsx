import React from "react";
import { Box, Flex, Image, Heading, Text, Tag, HStack, VStack, Button, SimpleGrid } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Marquee from "react-fast-marquee";
import { FiArrowRight, FiMapPin, FiAlertCircle, FiZap } from "react-icons/fi";
import { Projects } from "../utils/Constant";
import { Section, Reveal, GlassCard, CTASection, Seo } from "../Components/common";
import { PageHero } from "../Components/AboutUs Components/AboutUsHero";

// Visually hidden but indexable by crawlers — do NOT use display:none
const SrOnly = ({ children }) => (
  <Box
    as="p"
    position="absolute"
    w="1px"
    h="1px"
    p={0}
    m="-1px"
    overflow="hidden"
    whiteSpace="nowrap"
    borderWidth={0}
    sx={{ clip: "rect(0,0,0,0)" }}
  >
    {children}
  </Box>
);

const PortfolioThumbs = () => (
  <Box
    position="relative"
    sx={{
      maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
      WebkitMaskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
    }}
  >
    <Marquee gradient={false} speed={36} pauseOnHover>
      {Projects.map((p) => (
        <Box
          key={p.Heading}
          w={{ base: "240px", md: "300px" }}
          h={{ base: "150px", md: "186px" }}
          mx={3}
          borderRadius="16px"
          overflow="hidden"
          border="1px solid"
          borderColor="border.subtle"
          boxShadow="0 24px 50px -28px rgba(0,0,0,0.8)"
          position="relative"
        >
          <Image src={p.img[0].src} alt={p.img[0].alt} loading="lazy" w="full" h="full" objectFit="cover" objectPosition="top" />
          <Box position="absolute" inset={0} bgGradient="linear(to-t, rgba(8,8,13,0.8), rgba(8,8,13,0) 55%)" />
          <Text position="absolute" bottom={3} left={4} right={4} fontSize="13px" fontWeight={600} noOfLines={1}>
            {p.clentName}
          </Text>
        </Box>
      ))}
    </Marquee>
  </Box>
);

const Portfolio = () => {
  const navigate = useNavigate();
  return (
    <Box>
      <Seo
        title="Portfolio — Web, App, Blockchain & UI/UX Projects | Futurise Solutions"
        description="Explore Futurise Solutions' portfolio of delivered projects: property management SaaS dashboards, AI-powered review platforms, luxury jewelry e-commerce, real-estate listing sites, crypto trading terminals, and hotel booking experiences — built with React, Vite, and Chakra UI for clients in India and the USA."
        path="/portfolio"
      />

      <PageHero
        eyebrow="Our portfolio"
        title="Crafting innovation with"
        highlight="every project."
        subtitle="A look at some of the products we've designed and engineered for ambitious teams around the world."
        primaryLabel="Start your project"
        secondaryLabel="Our services"
        secondaryTo="/service/web-development"
        media={<PortfolioThumbs />}
      />

      <Box as="section" aria-label="Case studies">
        <Section pt={{ base: 4, md: 6 }}>
          <VStack spacing={{ base: 14, md: 20 }} align="stretch">
            {Projects.map((el, idx) => (
              <Reveal key={el.Heading}>
                <Box as="article" aria-label={el.Heading}>
                  <Flex
                    direction={{ base: "column", lg: idx % 2 ? "row-reverse" : "row" }}
                    gap={{ base: 8, lg: 14 }}
                    align="center"
                  >
                    {/* Image carousel */}
                    <GlassCard flex="1" w="full" hover={false} overflow="hidden" p={0} sx={{ ".swiper": { paddingBottom: "36px" } }}>
                      <HStack px={4} py={3} spacing={1.5} borderBottom="1px solid" borderColor="border.subtle">
                        <Box w="9px" h="9px" rounded="full" bg="#ff5f57" />
                        <Box w="9px" h="9px" rounded="full" bg="#febc2e" />
                        <Box w="9px" h="9px" rounded="full" bg="#28c840" />
                      </HStack>
                      <Swiper
                        slidesPerView={1}
                        loop
                        autoHeight
                        grabCursor
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 2600, disableOnInteraction: false }}
                        modules={[Autoplay, Pagination]}
                      >
                        {el.img?.map((item, i) => (
                          <SwiperSlide key={i}>
                            <Image
                              src={item.src}
                              alt={item.alt}
                              loading={idx === 0 && i === 0 ? "eager" : "lazy"}
                              fetchpriority={idx === 0 && i === 0 ? "high" : "auto"}
                              w="100%"
                              h="auto"
                              display="block"
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </GlassCard>

                    {/* Details */}
                    <VStack flex="1" align="start" spacing={5} position="relative">

                      {/* Hidden full description for crawlers */}
                      <SrOnly>{el.aboutProject}</SrOnly>

                      <HStack spacing={2} flexWrap="wrap">
                        <Tag bg="rgba(180,160,255,0.14)" color="accent.solid" borderRadius="full" px={3}>{el.projectType}</Tag>
                        <Tag bg="rgba(255,255,255,0.06)" color="text.muted" borderRadius="full" px={3}>
                          <FiMapPin style={{ marginRight: 6 }} />{el.location}
                        </Tag>
                      </HStack>

                      <Heading as="h2" fontSize={{ base: "26px", md: "34px" }} lineHeight={1.2}>
                        {el.Heading}
                      </Heading>

                      {/* Problem */}
                      <Box w="full" p={4} borderRadius="12px" bg="rgba(255,80,80,0.06)" border="1px solid" borderColor="rgba(255,100,100,0.15)">
                        <HStack spacing={2} mb={2}>
                          <FiAlertCircle color="#ff6464" size={15} />
                          <Text as="h3" fontSize="11px" fontWeight={700} letterSpacing="0.12em" textTransform="uppercase" color="rgba(255,100,100,0.8)">
                            The Problem
                          </Text>
                        </HStack>
                        <Text fontSize="14px" color="text.muted" lineHeight={1.75}>{el.problem}</Text>
                      </Box>

                      {/* Solution */}
                      <Box w="full" p={4} borderRadius="12px" bg="rgba(123,108,255,0.07)" border="1px solid" borderColor="rgba(180,160,255,0.18)">
                        <HStack spacing={2} mb={2}>
                          <FiZap color="#7b6cff" size={15} />
                          <Text as="h3" fontSize="11px" fontWeight={700} letterSpacing="0.12em" textTransform="uppercase" color="accent.solid">
                            Our Solution
                          </Text>
                        </HStack>
                        <Text fontSize="14px" color="text.muted" lineHeight={1.75}>{el.solution}</Text>
                      </Box>

                      {/* Stats */}
                      {el.stats && (
                        <SimpleGrid columns={3} spacing={3} w="full">
                          {el.stats.map((s) => (
                            <Box
                              key={s.label}
                              p={3}
                              borderRadius="12px"
                              bg="rgba(255,255,255,0.03)"
                              border="1px solid"
                              borderColor="border.subtle"
                              textAlign="center"
                            >
                              <Text fontSize={{ base: "20px", md: "24px" }} fontWeight={700} className="gradient-text" lineHeight={1} aria-label={`${s.value} ${s.label}`}>
                                {s.value}
                              </Text>
                              <Text fontSize="11px" color="text.faint" mt={1} lineHeight={1.4}>{s.label}</Text>
                            </Box>
                          ))}
                        </SimpleGrid>
                      )}

                      <HStack spacing={3} pt={1}>
                        <Text fontSize="13px" color="text.faint">Client:</Text>
                        <Text fontSize="13px" fontWeight={600} color="accent.solid">{el.clentName}</Text>
                      </HStack>

                      <Button variant="outlineGlow" rightIcon={<FiArrowRight />} onClick={() => navigate("/contact")}>
                        Start a similar project
                      </Button>
                    </VStack>
                  </Flex>
                </Box>
              </Reveal>
            ))}
          </VStack>
        </Section>
      </Box>

      <CTASection
        eyebrow="Your project next"
        title="Let's create something"
        highlight="worth showcasing."
        subtitle="Tell us about your idea — we'll help you bring it to life and add it to this list."
      />
    </Box>
  );
};

export default Portfolio;
