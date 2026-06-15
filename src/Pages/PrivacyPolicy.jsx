import React from "react";
import {
  Box, Container, Heading, Text, VStack, HStack, Icon, Link as CLink,
} from "@chakra-ui/react";
import { FiMail, FiMapPin, FiShield } from "react-icons/fi";
import { Reveal, Eyebrow, Seo } from "../Components/common";

const LAST_UPDATED = "15 June 2025";
const COMPANY = "Futurise Solutions";
const EMAIL = "business@futurisesolutions.com";
const ADDRESS = "Huddart Parker Building, Wellington Central, Wellington 6011, New Zealand";

const sections = [
  {
    id: "information-we-collect",
    title: "1. Information We Collect",
    content: [
      {
        subtitle: "1.1 Information You Provide Directly",
        body: `When you contact us, request a quote, fill in our contact form, or subscribe to our newsletter, we collect information you voluntarily provide, including: your name and email address, phone number, company name, project details and requirements, and any other information you choose to share with us.`,
      },
      {
        subtitle: "1.2 Information Collected Automatically",
        body: `When you visit our website at futurisesolutions.com, we automatically collect certain technical information, including: IP address and approximate geolocation, browser type and version, operating system, pages visited and time spent on each page, referring website or source, and device type (desktop, mobile, tablet).`,
      },
      {
        subtitle: "1.3 Cookies & Similar Technologies",
        body: `We use cookies and similar tracking technologies to improve your experience on our website. These include essential cookies (required for the site to function), analytics cookies (to understand how visitors use our site), and preference cookies (to remember your settings). You may disable cookies via your browser settings, though some features of the site may be affected.`,
      },
    ],
  },
  {
    id: "how-we-use",
    title: "2. How We Use Your Information",
    content: [
      {
        subtitle: "",
        body: `We use the information we collect for the following purposes:`,
      },
      {
        subtitle: "Service Delivery",
        body: `To respond to your enquiries, provide quotes, manage client projects, and communicate updates related to work we are performing for you.`,
      },
      {
        subtitle: "Newsletter & Marketing",
        body: `To send you our newsletter and relevant updates about our services, industry insights, or product launches — only when you have opted in. You may unsubscribe at any time by clicking the unsubscribe link in any email or contacting us directly.`,
      },
      {
        subtitle: "Website Improvement",
        body: `To analyse website traffic, understand user behaviour, fix technical issues, and improve the quality and performance of our website and services.`,
      },
      {
        subtitle: "Legal & Compliance",
        body: `To comply with applicable laws and regulations, enforce our terms, prevent fraud, and protect the rights, safety, and property of Futurise Solutions and our clients.`,
      },
    ],
  },
  {
    id: "data-sharing",
    title: "3. Data Sharing & Third Parties",
    content: [
      {
        subtitle: "",
        body: `We do not sell, rent, or trade your personal information to third parties. We may share your information in the following limited circumstances:`,
      },
      {
        subtitle: "Service Providers",
        body: `We work with trusted third-party service providers who assist us in operating our business. These include EmailJS (newsletter delivery), Google Analytics (website analytics), and project management or communication tools. These providers are contractually required to keep your data confidential and use it only for the services they perform for us.`,
      },
      {
        subtitle: "Legal Requirements",
        body: `We may disclose your information if required to do so by law, court order, or governmental authority, or if we believe disclosure is necessary to protect our rights, your safety, or the safety of others.`,
      },
      {
        subtitle: "Business Transfers",
        body: `In the event of a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of that transaction. We will notify you via email or a prominent notice on our website before your personal data is transferred and becomes subject to a different privacy policy.`,
      },
    ],
  },
  {
    id: "data-security",
    title: "4. Data Security",
    content: [
      {
        subtitle: "",
        body: `We take reasonable and appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction. Our website uses HTTPS encryption for all data in transit. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security. We encourage you to use strong passwords and keep your contact details up to date.`,
      },
    ],
  },
  {
    id: "your-rights",
    title: "5. Your Rights",
    content: [
      {
        subtitle: "",
        body: `Depending on your location, you may have certain rights under applicable data protection laws (including the New Zealand Privacy Act 2020 and, where applicable, the GDPR):`,
      },
      {
        subtitle: "Access",
        body: `You have the right to request a copy of the personal information we hold about you.`,
      },
      {
        subtitle: "Correction",
        body: `You have the right to request that we correct any inaccurate or incomplete personal information we hold about you.`,
      },
      {
        subtitle: "Deletion",
        body: `You may request that we delete your personal information, subject to our legal obligations to retain certain records.`,
      },
      {
        subtitle: "Objection & Restriction",
        body: `You may object to our processing of your personal information or request that we restrict processing in certain circumstances.`,
      },
      {
        subtitle: "Portability",
        body: `Where technically feasible, you may request a copy of your data in a structured, machine-readable format.`,
      },
      {
        subtitle: "Withdraw Consent",
        body: `Where processing is based on your consent (e.g. newsletter), you may withdraw that consent at any time without affecting the lawfulness of processing before withdrawal.`,
      },
      {
        subtitle: "",
        body: `To exercise any of these rights, please contact us at business@futurisesolutions.com. We will respond within 30 days.`,
      },
    ],
  },
  {
    id: "data-retention",
    title: "6. Data Retention",
    content: [
      {
        subtitle: "",
        body: `We retain your personal information only for as long as is necessary to fulfil the purposes for which it was collected, including any legal, accounting, or reporting requirements. Contact form submissions are retained for up to 24 months. Newsletter subscriber data is retained until you unsubscribe. Client project data is retained for up to 7 years for financial and legal compliance purposes.`,
      },
    ],
  },
  {
    id: "childrens-privacy",
    title: "7. Children's Privacy",
    content: [
      {
        subtitle: "",
        body: `Our website and services are not directed to children under the age of 16. We do not knowingly collect personal information from children under 16. If you believe we have inadvertently collected such information, please contact us immediately and we will take steps to delete it.`,
      },
    ],
  },
  {
    id: "international-transfers",
    title: "8. International Data Transfers",
    content: [
      {
        subtitle: "",
        body: `Futurise Solutions operates across New Zealand, India, and the United States. Your personal information may be transferred to, stored in, or processed in countries other than your own. When we transfer personal data internationally, we take appropriate safeguards to ensure it is protected in accordance with applicable privacy laws. By using our website, you consent to the transfer of your information to these countries.`,
      },
    ],
  },
  {
    id: "policy-changes",
    title: "9. Changes to This Privacy Policy",
    content: [
      {
        subtitle: "",
        body: `We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. When we make material changes, we will update the "Last Updated" date at the top of this page. We encourage you to review this policy periodically. Your continued use of our website after any changes constitutes your acceptance of the updated policy.`,
      },
    ],
  },
  {
    id: "contact",
    title: "10. Contact Us",
    content: [
      {
        subtitle: "",
        body: `If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:`,
      },
    ],
  },
];

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

const PrivacyPolicy = () => {
  return (
    <Box>
      <Seo
        title="Privacy Policy | Futurise Solutions"
        description="Learn how Futurise Solutions collects, uses, and protects your personal information. Our privacy policy covers data handling for our AI, web, mobile, and blockchain services."
        path="/privacy"
        keywords="Futurise Solutions privacy policy, data protection, personal information, GDPR, New Zealand Privacy Act, data security"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Privacy Policy — Futurise Solutions",
          "url": "https://futurisesolutions.com/privacy",
          "description": "Privacy policy detailing how Futurise Solutions handles personal data.",
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://futurisesolutions.com/" },
              { "@type": "ListItem", "position": 2, "name": "Privacy Policy", "item": "https://futurisesolutions.com/privacy" },
            ],
          },
        }}
      />

      {/* ── Hero ── */}
      <Box position="relative" overflow="hidden" pt={{ base: 14, md: 24 }} pb={{ base: 10, md: 14 }}>
        <Box position="absolute" top="-20%" left="-10%" w="600px" h="600px" bg="rgba(123,108,255,0.12)" filter="blur(140px)" rounded="full" pointerEvents="none" />
        <Box position="absolute" bottom="-10%" right="-5%" w="400px" h="400px" bg="rgba(181,123,255,0.1)" filter="blur(120px)" rounded="full" pointerEvents="none" />

        <Container maxW="1200px" px={{ base: 5, md: 8 }} position="relative">
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
      <Container maxW="1200px" px={{ base: 5, md: 8 }} pb={{ base: 16, md: 24 }}>
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
                  offered by <Box as="span" color="text.primary" fontWeight={600}>{COMPANY}</Box> ("we", "us", or "our").
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
};

export default PrivacyPolicy;
