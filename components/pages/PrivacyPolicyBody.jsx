'use client'

/**
 * /privacy page body — ported VERBATIM from PrivacyPolicy.jsx.
 *
 * Only three things differ from the source:
 *   1. <Seo .../> is gone — metadata moves to the Metadata API in page.tsx and
 *      the JSON-LD to <JsonLd/>, both SERVER-rendered (the old one ran in a
 *      useEffect, so it existed only after hydration).
 *   2. the copy lives in a content module and is imported.
 *   3. imports are rewritten for the new paths.
 * Every style prop, every element and every string is byte-for-byte unchanged.
 */
import {
  Box, Container, Heading, Text, VStack, HStack, Icon, Link as CLink,
} from "@chakra-ui/react";
import { FiMail, FiMapPin, FiShield } from "react-icons/fi";
import Reveal from "@/components/common/Reveal";
import { Eyebrow } from "@/components/common/SectionHeading";
import { LAST_UPDATED, COMPANY, EMAIL, ADDRESS, sections } from "@/content/privacy";

const PolicySection = ({ section, delay }) => (
  <Reveal from="up" delay={delay}>
    <Box
      id={section.id}
      p={{ base: 6, md: 8 }}
      borderRadius="18px"
      border="1px solid"
      borderColor="border.subtle"
      bg="bg.surface"
      _hover={{ borderColor: "rgba(180,160,255,0.2)" }}
      transition="border-color .3s"
    >
      <Heading
        as="h2"
        fontSize={{ base: "18px", md: "22px" }}
        fontWeight={700}
        mb={5}
        color="text.primary"
      >
        {section.title}
      </Heading>
      <VStack align="start" spacing={4}>
        {section.content.map((item, i) => (
          <Box key={i}>
            {item.subtitle && (
              <Text
                fontWeight={600}
                color="accent.solid"
                fontSize="14px"
                mb={1.5}
                letterSpacing="0.02em"
              >
                {item.subtitle}
              </Text>
            )}
            <Text color="text.muted" fontSize={{ base: "14px", md: "15px" }} lineHeight={1.8}>
              {item.body}
            </Text>
          </Box>
        ))}
      </VStack>
    </Box>
  </Reveal>
);

export default function PrivacyPolicyBody() {
  return (
    <Box>
      {/* ── Hero ── */}
      <Box position="relative" overflow="hidden" pt={{ base: 14, md: 24 }} pb={{ base: 10, md: 14 }}>
        <Box position="absolute" top="-20%" left="-10%" w="600px" h="600px" bg="rgba(123,108,255,0.12)" filter="blur(140px)" rounded="full" pointerEvents="none" />
        <Box position="absolute" bottom="-10%" right="-5%" w="400px" h="400px" bg="rgba(181,123,255,0.1)" filter="blur(120px)" rounded="full" pointerEvents="none" />

        <Container maxW="container.site" px={{ base: 5, md: 8 }} position="relative">
          <VStack align="start" spacing={5} maxW="720px">
            <Reveal>
              <Eyebrow>Legal</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <Heading as="h1" fontSize={{ base: "36px", md: "52px", lg: "60px" }} lineHeight={1.08} letterSpacing="-0.02em">
                Privacy{" "}
                <Box as="span" className="gradient-text">Policy</Box>
              </Heading>
            </Reveal>
            <Reveal delay={0.1}>
              <Text color="text.muted" fontSize={{ base: "md", md: "lg" }} lineHeight={1.7} maxW="580px">
                We respect your privacy and are committed to protecting your personal data.
                This policy explains how {COMPANY} collects, uses, and safeguards your information.
              </Text>
            </Reveal>
            <Reveal delay={0.12}>
              <HStack
                spacing={3}
                px={4}
                py={2.5}
                borderRadius="full"
                bg="rgba(180,160,255,0.08)"
                border="1px solid"
                borderColor="rgba(180,160,255,0.2)"
              >
                <Icon as={FiShield} color="accent.solid" boxSize={4} />
                <Text fontSize="sm" color="text.faint">
                  Last updated:{" "}
                  <Box as="span" color="text.muted" fontWeight={600}>{LAST_UPDATED}</Box>
                </Text>
              </HStack>
            </Reveal>
          </VStack>
        </Container>
      </Box>

      {/* ── Content ── */}
      <Container maxW="container.site" px={{ base: 5, md: 8 }} pb={{ base: 16, md: 24 }}>
        <Box
          display={{ base: "block", lg: "grid" }}
          gridTemplateColumns={{ lg: "240px 1fr" }}
          gap={{ lg: 12 }}
          alignItems="start"
        >
          {/* Table of contents (sticky sidebar on large screens) */}
          <Box
            display={{ base: "none", lg: "block" }}
            position="sticky"
            top="100px"
            as="nav"
            aria-label="Privacy policy sections"
          >
            <Reveal from="right">
              <Box
                p={5}
                borderRadius="16px"
                border="1px solid"
                borderColor="border.subtle"
                bg="bg.surface"
              >
                <Text
                  fontSize="xs"
                  fontWeight={600}
                  letterSpacing="0.1em"
                  textTransform="uppercase"
                  color="text.faint"
                  mb={4}
                >
                  Contents
                </Text>
                <VStack align="start" spacing={2}>
                  {sections.map((s) => (
                    <CLink
                      key={s.id}
                      href={`#${s.id}`}
                      fontSize="13px"
                      color="text.muted"
                      lineHeight={1.5}
                      _hover={{ color: "accent.solid" }}
                      transition="color .2s"
                    >
                      {s.title}
                    </CLink>
                  ))}
                </VStack>
              </Box>
            </Reveal>
          </Box>

          {/* Main sections */}
          <VStack spacing={5} align="stretch">
            {/* Intro banner */}
            <Reveal from="up">
              <Box
                p={{ base: 5, md: 6 }}
                borderRadius="16px"
                bgGradient="linear(135deg, rgba(123,108,255,0.12), rgba(181,123,255,0.1))"
                border="1px solid"
                borderColor="rgba(180,160,255,0.25)"
              >
                <Text color="text.muted" fontSize={{ base: "14px", md: "15px" }} lineHeight={1.8}>
                  This Privacy Policy applies to the website <Box as="span" color="accent.solid" fontWeight={600}>futurisesolutions.com</Box> and all services
                  offered by <Box as="span" color="text.primary" fontWeight={600}>{COMPANY}</Box> (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;).
                  By using our website you agree to the collection and use of information as described in this policy.
                  If you do not agree, please discontinue use of our website.
                </Text>
              </Box>
            </Reveal>

            {sections.slice(0, -1).map((section, i) => (
              <PolicySection key={section.id} section={section} delay={0.05 * (i + 1)} />
            ))}

            {/* Contact section – special card */}
            <Reveal from="up" delay={0.5}>
              <Box
                id="contact"
                p={{ base: 6, md: 8 }}
                borderRadius="18px"
                border="1px solid"
                borderColor="rgba(180,160,255,0.25)"
                bgGradient="linear(135deg, rgba(123,108,255,0.1), rgba(181,123,255,0.08))"
              >
                <Heading as="h2" fontSize={{ base: "18px", md: "22px" }} fontWeight={700} mb={5} color="text.primary">
                  10. Contact Us
                </Heading>
                <Text color="text.muted" fontSize={{ base: "14px", md: "15px" }} lineHeight={1.8} mb={5}>
                  If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please reach out:
                </Text>
                <VStack align="start" spacing={3}>
                  <HStack spacing={3}>
                    <Box
                      w="36px"
                      h="36px"
                      borderRadius="10px"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      bgGradient="linear(135deg, rgba(123,108,255,0.25), rgba(181,123,255,0.25))"
                      border="1px solid"
                      borderColor="rgba(180,160,255,0.25)"
                      flexShrink={0}
                    >
                      <Icon as={FiMail} color="accent.solid" boxSize={4} />
                    </Box>
                    <CLink
                      href={`mailto:${EMAIL}`}
                      fontSize="15px"
                      color="accent.solid"
                      fontWeight={600}
                      _hover={{ color: "text.primary" }}
                    >
                      {EMAIL}
                    </CLink>
                  </HStack>
                  <HStack spacing={3} align="start">
                    <Box
                      w="36px"
                      h="36px"
                      borderRadius="10px"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      bgGradient="linear(135deg, rgba(123,108,255,0.25), rgba(181,123,255,0.25))"
                      border="1px solid"
                      borderColor="rgba(180,160,255,0.25)"
                      flexShrink={0}
                      mt="2px"
                    >
                      <Icon as={FiMapPin} color="accent.solid" boxSize={4} />
                    </Box>
                    <Text fontSize="15px" color="text.muted" lineHeight={1.7}>
                      {ADDRESS}
                    </Text>
                  </HStack>
                </VStack>
              </Box>
            </Reveal>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
}
