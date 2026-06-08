import React from "react";
import { Box, Image, Text, HStack, VStack, Icon } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { FiStar } from "react-icons/fi";
import { FaQuoteLeft } from "react-icons/fa6";
import { testimonials } from "../../utils/Constant";
import { Section, SectionHeading, GlassCard } from "../common";

const ClientsReviews = () => {
  return (
    <Section>
      <SectionHeading
        eyebrow="Testimonials"
        title="Loved by the clients"
        highlight="we work with"
        subtitle="Don’t just take our word for it — here’s what teams say after shipping with Futurise."
        mb={{ base: 10, md: 14 }}
      />

      <Box
        sx={{
          ".swiper": { paddingBottom: "52px" },
          ".swiper-slide": { height: "auto" },
        }}
      >
        <Swiper
          spaceBetween={24}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          loop
          grabCursor
          modules={[Autoplay, Pagination]}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1100: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.name}>
              <GlassCard h="full" p={{ base: 6, md: 7 }} display="flex" flexDirection="column" hover={false}>
                <Icon as={FaQuoteLeft} boxSize={6} color="rgba(180,160,255,0.5)" mb={4} />
                <Text color="text.primary" fontSize="15px" lineHeight={1.75} flex="1">
                  “{t.review}”
                </Text>
                <HStack spacing={1} my={4}>
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} as={FiStar} color="#FFB547" fill="#FFB547" boxSize={4} />
                  ))}
                </HStack>
                <HStack spacing={3}>
                  <Image src={t.avatar} alt={t.name} w="44px" h="44px" borderRadius="full" objectFit="cover" />
                  <VStack align="start" spacing={0}>
                    <Text fontWeight={600} fontSize="15px">{t.name}</Text>
                    <Text fontSize="13px" color="text.faint">{t.title}</Text>
                  </VStack>
                </HStack>
              </GlassCard>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Section>
  );
};

export default ClientsReviews;
