import React from "react";
import { Box, Image, Text, HStack, VStack, Icon } from "@chakra-ui/react";
import { FiStar } from "react-icons/fi";
import { FaQuoteLeft } from "react-icons/fa6";
import Marquee from "react-fast-marquee";
import { testimonials } from "../../utils/Constant";
import { Section, SectionHeading, GlassCard } from "../common";

const TestimonialCard = ({ t }) => (
  <GlassCard
    w="360px"
    h="260px"
    mx={4}
    p={7}
    display="flex"
    flexDirection="column"
    flexShrink={0}
    overflow="hidden"
  >
    <Icon as={FaQuoteLeft} boxSize={5} color="rgba(180,160,255,0.5)" mb={3} />
    <Text color="text.primary" fontSize="14px" lineHeight={1.75} flex="1" noOfLines={4} overflow="hidden">
      "{t.review}"
    </Text>
    <HStack spacing={1} mb={4}>
      {[...Array(5)].map((_, i) => (
        <Icon key={i} as={FiStar} color="#FFB547" fill="#FFB547" boxSize={3.5} />
      ))}
    </HStack>
    <HStack spacing={3}>
      <Image src={t.avatar} alt={t.name} w="40px" h="40px" borderRadius="full" objectFit="cover" flexShrink={0} />
      <VStack align="start" spacing={0}>
        <Text fontWeight={600} fontSize="14px">{t.name}</Text>
        <Text fontSize="12px" color="text.faint">{t.title}</Text>
      </VStack>
    </HStack>
  </GlassCard>
);

const ClientsReviews = () => {
  return (
    <Section>
      <SectionHeading
        eyebrow="Testimonials"
        title="Loved by the clients"
        highlight="we work with"
        subtitle="Don't just take our word for it — here's what teams say after shipping with Futurise."
        mb={{ base: 10, md: 14 }}
      />

      <Box
        position="relative"
        sx={{
          maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
        }}
      >
        <Marquee gradient={false} speed={36} pauseOnHover>
          {testimonials.map((t) => (
            <TestimonialCard key={t.name} t={t} />
          ))}
        </Marquee>
      </Box>
    </Section>
  );
};

export default ClientsReviews;
