import React from "react";
import { Box, Flex, Image, Heading, Text, Tag, HStack, VStack, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { FiArrowRight, FiMapPin } from "react-icons/fi";
import { Projects } from "../utils/Constant";
import { Section, Reveal, GlassCard, CTASection } from "../Components/common";
import { PageHero } from "../Components/AboutUs Components/AboutUsHero";

const Portfolio = () => {
  const navigate = useNavigate();
  return (
    <Box>
      <PageHero
        eyebrow="Our portfolio"
        title="Crafting innovation with"
        highlight="every project."
        subtitle="A look at some of the products we’ve designed and engineered for ambitious teams around the world."
        primaryLabel="Start your project"
        secondaryLabel="Our services"
        secondaryTo="/service/web-development"
      />

      <Section pt={{ base: 4, md: 6 }}>
        <VStack spacing={{ base: 14, md: 20 }} align="stretch">
          {Projects.map((el, idx) => (
            <Reveal key={el.Heading}>
              <Flex direction={{ base: "column", lg: idx % 2 ? "row-reverse" : "row" }} gap={{ base: 8, lg: 14 }} align="center">
                {/* Image carousel */}
                <GlassCard flex="1" w="full" hover={false} overflow="hidden" p={0}>
                  <Swiper
                    slidesPerView={1}
                    loop
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 2600, disableOnInteraction: false }}
                    modules={[Autoplay, Pagination]}
                  >
                    {el.img?.map((item, i) => (
                      <SwiperSlide key={i}>
                        <Image src={item} w="100%" h={{ base: "240px", md: "360px" }} objectFit="cover" alt={el.Heading} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </GlassCard>

                {/* Details */}
                <VStack flex="1" align="start" spacing={4}>
                  <HStack spacing={2} flexWrap="wrap">
                    <Tag bg="rgba(111,147,255,0.14)" color="accent.solid" borderRadius="full" px={3}>{el.projectType}</Tag>
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
