import React from "react";
import { Box, Flex, Image, Heading, Text, Tag, HStack, VStack, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Marquee from "react-fast-marquee";
import { FiArrowRight, FiMapPin } from "react-icons/fi";
import { Projects } from "../utils/Constant";
import { Section, Reveal, GlassCard, CTASection, Seo } from "../Components/common";
import { PageHero } from "../Components/AboutUs Components/AboutUsHero";

/** Hero thumbnail marquee — immediately showcases delivered work. */
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
        title="Portfolio — Web, App & Web3 Projects"
        description="Explore Futurise Solutions' portfolio: property dashboards, real-estate platforms, AI review software, crypto trading terminals, luxury e-commerce, and hotel booking sites built with React, Vite, and Chakra UI for clients in India and the USA."
        path="/portfolio"
      />
      <PageHero
        eyebrow="Our portfolio"
        title="Crafting innovation with"
        highlight="every project."
        subtitle="A look at some of the products we’ve designed and engineered for ambitious teams around the world."
        primaryLabel="Start your project"
        secondaryLabel="Our services"
        secondaryTo="/service/web-development"
        media={<PortfolioThumbs />}
      />

      <Section pt={{ base: 4, md: 6 }}>
        <VStack spacing={{ base: 14, md: 20 }} align="stretch">
          {Projects.map((el, idx) => (
            <Reveal key={el.Heading}>
              <Flex direction={{ base: "column", lg: idx % 2 ? "row-reverse" : "row" }} gap={{ base: 8, lg: 14 }} align="center">
                {/* Image carousel — full screenshots, never cropped (natural ratio + autoHeight) */}
                <GlassCard flex="1" w="full" hover={false} overflow="hidden" p={0} sx={{ ".swiper": { paddingBottom: "36px" } }}>
                  {/* browser chrome */}
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
                        <Image src={item.src} alt={item.alt} loading="lazy" w="100%" h="auto" display="block" />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </GlassCard>

                {/* Details */}
                <VStack flex="1" align="start" spacing={4}>
                  <HStack spacing={2} flexWrap="wrap">
                    <Tag bg="rgba(180,160,255,0.14)" color="accent.solid" borderRadius="full" px={3}>{el.projectType}</Tag>
                    <Tag bg="rgba(255,255,255,0.06)" color="text.muted" borderRadius="full" px={3}>
                      <FiMapPin style={{ marginRight: 6 }} /> {el.location}
                    </Tag>
                  </HStack>
                  <Heading fontSize={{ base: "26px", md: "34px" }} lineHeight={1.2}>{el.Heading}</Heading>
                  <Text color="text.muted" fontSize={{ base: "md", md: "lg" }} lineHeight={1.75}>{el.aboutProject}</Text>
                  <HStack spacing={2} flexWrap="wrap" pt={1}>
                    {el.tags?.map((t) => (
                      <Tag key={t} variant="outline" borderRadius="full" px={3} color="text.muted" boxShadow="inset 0 0 0 1px var(--chakra-colors-border-subtle)">
                        {t}
                      </Tag>
                    ))}
                  </HStack>
                  <Text fontWeight={600} color="accent.solid" pt={1}>Client: {el.clentName}</Text>
                  <Button mt={2} variant="outlineGlow" rightIcon={<FiArrowRight />} onClick={() => navigate("/contact")}>
                    Start a similar project
                  </Button>
                </VStack>
              </Flex>
            </Reveal>
          ))}
        </VStack>
      </Section>

      <CTASection
        eyebrow="Your project next"
        title="Let’s create something"
        highlight="worth showcasing."
        subtitle="Tell us about your idea — we’ll help you bring it to life and add it to this list."
      />
    </Box>
  );
};

export default Portfolio;
