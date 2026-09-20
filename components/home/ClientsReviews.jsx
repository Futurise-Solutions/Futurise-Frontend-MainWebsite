'use client'

import React from "react";
import { Box, Text, HStack, VStack, Icon, Tag, Flex, SimpleGrid } from "@chakra-ui/react";
import { FaQuoteLeft } from "react-icons/fa6";
import { FiMapPin, FiCheck } from "react-icons/fi";
import Marquee from "react-fast-marquee";
import { testimonials, clientProof, engagementCommitments } from "@/utils/clientsReviewsData";
import Section from "@/components/common/Section";
import SectionHeading from "@/components/common/SectionHeading";
import GlassCard from "@/components/common/GlassCard";
import Reveal from "@/components/common/Reveal";

import dynamic from "next/dynamic";

/* PHASE 8: AuroraField is a purely DECORATIVE animated backdrop — three blurred radial
   washes, no text, aria-hidden by construction. It is the one component here that is
   correct to load with ssr: false: it contributes nothing a crawler reads, and it is
   absolutely positioned behind the content, so it reserves no space and cannot shift
   layout when it appears. */
const AuroraField = dynamic(() => import("@/components/common/AuroraField"), { ssr: false });

/**
 * Social proof, carried by the delivery record rather than by quote volume.
 *
 * A testimonial only exists once a client agrees to be quoted, so the list is short by
 * design — padding it with invented people would breach Google's spam policies and the
 * FTC's consumer-review rule, and stock avatars are recognisable as placeholders anyway.
 * Shipped work needs nobody's permission, so `clientProof` does the heavy lifting: named
 * clients, real markets, real outcomes, all checkable on /portfolio.
 */

const ProofCard = ({ p }) => (
  <GlassCard w="330px" h="248px" mx={3} p={6} display="flex" flexDirection="column" flexShrink={0}>
    <HStack spacing={2} mb={3}>
      <Icon as={FiMapPin} boxSize={3.5} color="accent.solid" />
      <Text fontSize="12px" color="text.faint" fontWeight={500}>
        {p.location}
      </Text>
    </HStack>

    <Text fontWeight={600} fontSize="15px" color="text.primary" noOfLines={2} mb={2}>
      {p.client}
    </Text>

    <Text fontSize="13px" color="text.muted" lineHeight={1.65} flex="1" noOfLines={4}>
      {p.work}. {p.outcome}.
    </Text>

    <Tag
      mt={4}
      alignSelf="start"
      bg="rgba(180,160,255,0.12)"
      color="accent.solid"
      borderRadius="full"
      px={3}
      py={1}
      fontSize="11px"
    >
      {p.discipline}
    </Tag>
  </GlassCard>
);

const FeaturedTestimonial = ({ t }) => (
  <GlassCard maxW="760px" mx="auto" p={{ base: 6, md: 9 }} mb={{ base: 10, md: 12 }}>
    <Icon as={FaQuoteLeft} boxSize={6} color="rgba(180,160,255,0.5)" mb={4} />
    <Text color="text.primary" fontSize={{ base: "15px", md: "17px" }} lineHeight={1.8}>
      &ldquo;{t.review}&rdquo;
    </Text>
    <HStack spacing={3} mt={6}>
      <Flex
        boxSize="42px"
        flexShrink={0}
        align="center"
        justify="center"
        borderRadius="full"
        bg="rgba(180,160,255,0.18)"
        color="accent.solid"
        fontWeight={700}
        fontSize="15px"
      >
        {t.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
      </Flex>
      <VStack align="start" spacing={0}>
        <Text fontWeight={600} fontSize="15px">{t.name}</Text>
        <Text fontSize="13px" color="text.faint">{t.title}</Text>
      </VStack>
    </HStack>
  </GlassCard>
);

const ClientsReviews = () => {
  const featured = testimonials[0];

  return (
    // `isolation` keeps the aurora's blur from compositing against the sections above
    // and below, which would bleed light past the vignette.
    <Section isolation="isolate" containerProps={{ position: "relative", zIndex: 2 }}>
      {/* This section carried the most social proof on the page and had the least
          visual support for it: a featured quote, a marquee and a four-card grid, all
          on flat canvas. The drifting light gives the proof somewhere to sit without
          adding another asset to download or another card to read. */}
      <AuroraField intensity="base" />

      <SectionHeading
        eyebrow="Client work"
        title="Products we've shipped"
        highlight="for real businesses"
        subtitle="Named clients across the UAE, the United States and India — every project below is on our portfolio, not a placeholder."
        mb={{ base: 10, md: 14 }}
      />

      {featured && <FeaturedTestimonial t={featured} />}

      <Box
        position="relative"
        sx={{
          maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
        }}
      >
        <Marquee gradient={false} speed={34} pauseOnHover>
          {clientProof.map((p) => (
            <ProofCard key={p.client} p={p} />
          ))}
        </Marquee>
      </Box>

      {/* Concrete commitments carry more weight with a considered B2B purchase than
          quote volume does, and they answer the objections that come up before an
          enquiry. */}
      <Reveal delay={0.1}>
        <SimpleGrid
          columns={{ base: 1, sm: 2, lg: 4 }}
          spacing={4}
          mt={{ base: 12, md: 16 }}
        >
          {engagementCommitments.map((c) => (
            <GlassCard key={c.label} p={6}>
              <HStack spacing={2.5} mb={2.5} align="center">
                <Flex
                  boxSize="22px"
                  flexShrink={0}
                  align="center"
                  justify="center"
                  borderRadius="full"
                  bg="rgba(180,160,255,0.16)"
                >
                  <Icon as={FiCheck} boxSize={3} color="accent.solid" />
                </Flex>
                <Text fontWeight={600} fontSize="15px" color="text.primary">
                  {c.label}
                </Text>
              </HStack>
              <Text fontSize="13px" color="text.muted" lineHeight={1.7}>
                {c.detail}
              </Text>
            </GlassCard>
          ))}
        </SimpleGrid>
      </Reveal>
    </Section>
  );
};

export default ClientsReviews;
