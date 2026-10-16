'use client'

import React from "react";
import { Box, Container, Heading, Text, Button, HStack, VStack, Icon, Flex } from "@chakra-ui/react";
import RouterLink from "next/link";
import { FiArrowRight, FiArrowUpRight, FiCheck } from "react-icons/fi";
import {
  services,
  serviceForBlogCategory,
  caseStudyForBlogCategory,
  engagementCommitments,
} from "@/utils/Constant";
import { caseStudies } from "@/utils/Constant/caseStudies";
import { useBooking } from "@/context/BookingContext";

/**
 * Conversion block for the end of a blog article.
 *
 * Blog posts carry most of this site's search impressions — largely on cost and
 * how-to queries — but previously ended at "Related articles" with no offer and no
 * route into the site. A reader who searched "AI agent development cost" read the
 * answer and left, because there was nothing to do next.
 *
 * The offer is matched to the post's category so the next step is relevant rather
 * than generic, and the commitments are repeated here because this is often the
 * first page of the site a visitor sees — they never passed the home page.
 */
const BlogCTA = ({ category }) => {
  const { onOpen: openBooking } = useBooking();
  const slug = serviceForBlogCategory(category);
  const service = services[slug];

  /* The case study proving this service has been delivered. Routed through the same
     category mapping as the service link above, so the pair can never disagree. The
     anchor names the build rather than the service, so it does not compete with
     /service/<slug> for that service's head term. */
  const caseSlug = caseStudyForBlogCategory(category);
  const study = caseSlug ? caseStudies[caseSlug] : null;

  if (!service) return null;

  return (
    <Container maxW="1200px" px={{ base: 5, md: 8 }} pt={{ base: 4, md: 8 }}>
      <Box
        position="relative"
        overflow="hidden"
        borderRadius="24px"
        border="1px solid"
        borderColor="border.subtle"
        bg="bg.surface"
        p={{ base: 7, md: 10 }}
      >
        <Box
          position="absolute"
          top="-40%"
          right="-10%"
          w="420px"
          h="420px"
          bg="rgba(123,108,255,0.16)"
          filter="blur(120px)"
          rounded="full"
          pointerEvents="none"
        />

        <Flex
          direction={{ base: "column", lg: "row" }}
          gap={{ base: 8, lg: 12 }}
          align={{ lg: "center" }}
          position="relative"
        >
          <Box flex="1">
            <Text
              fontSize="xs"
              fontWeight={600}
              letterSpacing="0.14em"
              textTransform="uppercase"
              color="accent.solid"
              mb={3}
            >
              Working on this?
            </Text>

            <Heading as="h2" fontSize={{ base: "26px", md: "34px" }} lineHeight={1.15}>
              Talk to the team that{" "}
              <Box as="span" className="gradient-text">builds it</Box>
            </Heading>

            <Text mt={4} color="text.muted" fontSize={{ base: "md", md: "lg" }} lineHeight={1.7} maxW="560px">
              {service.description} Book a free 45-minute call and we&rsquo;ll scope your
              project, flag the risks, and give you a fixed-scope estimate, whether or
              not you work with us.
            </Text>

            <HStack spacing={3} mt={7} flexWrap="wrap" rowGap={3}>
              <Button variant="gradient" rightIcon={<FiArrowRight />} onClick={() => openBooking("blog-cta")}>
                Book a free consultation
              </Button>
              <Button
                as={RouterLink}
                href={`/service/${slug}`}
                variant="outlineGlow"
                rightIcon={<FiArrowUpRight />}
              >
                {service.title}
              </Button>
            </HStack>

            {/* Evidence link. Separate from the button row so it reads as a reference
                rather than a third call to action competing with the two above. */}
            {study && (
              <Text mt={5} fontSize="sm" color="text.muted">
                See it built:{" "}
                <Box
                  as={RouterLink}
                  href={`/case-studies/${caseSlug}`}
                  color="accent.solid"
                  fontWeight={500}
                  _hover={{ textDecoration: "underline" }}
                >
                  {study.hero.title} {study.hero.highlight}
                </Box>
              </Text>
            )}
          </Box>

          <VStack
            align="start"
            spacing={3}
            flexShrink={0}
            w={{ base: "full", lg: "300px" }}
            p={6}
            borderRadius="18px"
            bg="rgba(255,255,255,0.02)"
            border="1px solid"
            borderColor="border.subtle"
          >
            {engagementCommitments.map((c) => (
              <HStack key={c.label} spacing={3} align="start">
                <Flex
                  boxSize="20px"
                  flexShrink={0}
                  mt="2px"
                  align="center"
                  justify="center"
                  borderRadius="full"
                  bg="rgba(180,160,255,0.16)"
                >
                  <Icon as={FiCheck} boxSize={2.5} color="accent.solid" />
                </Flex>
                <Text fontSize="14px" color="text.primary" fontWeight={500}>
                  {c.label}
                </Text>
              </HStack>
            ))}
          </VStack>
        </Flex>
      </Box>
    </Container>
  );
};

export default BlogCTA;
