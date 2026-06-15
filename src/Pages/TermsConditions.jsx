import React from "react";
import {
  Box, Container, Heading, Text, VStack, HStack, Icon, Link as CLink,
} from "@chakra-ui/react";
import { FiMail, FiMapPin, FiFileText } from "react-icons/fi";
import { Reveal, Eyebrow, Seo } from "../Components/common";

const LAST_UPDATED = "15 June 2025";
const COMPANY = "Futurise Solutions";
const EMAIL = "business@futurisesolutions.com";
const ADDRESS = "Huddart Parker Building, Wellington Central, Wellington 6011, New Zealand";

const sections = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    content: [
      {
        subtitle: "",
        body: `By accessing or using the website futurisesolutions.com, or by engaging ${COMPANY} for any services, you confirm that you have read, understood, and agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree to these terms, please do not use our website or engage our services. These Terms apply to all visitors, clients, and others who access or use the site.`,
      },
    ],
  },
  {
    id: "services",
    title: "2. Our Services",
    content: [
      {
        subtitle: "",
        body: `${COMPANY} is a full-cycle digital product studio providing the following services:`,
      },
      {
        subtitle: "AI & Machine Learning Solutions",
        body: `Custom AI agents, large language model (LLM) integrations, automation pipelines, and machine learning-powered product features.`,
      },
      {
        subtitle: "Web Development",
        body: `End-to-end web application development using React, Next.js, Node.js, GraphQL, and scalable cloud infrastructure.`,
      },
      {
        subtitle: "Mobile App Development",
        body: `Cross-platform and native mobile applications built with React Native and Expo for iOS and Android.`,
      },
      {
        subtitle: "UI/UX Design",
        body: `User research, wireframing, prototyping, and design systems delivered via Figma, focused on conversion and user delight.`,
      },
      {
        subtitle: "Blockchain & Web3",
        body: `Decentralised applications (dApps), smart contract development, DeFi protocols, and MEV solutions.`,
      },
      {
        subtitle: "Digital Marketing",
        body: `Search engine optimisation (SEO), performance marketing, content strategy, and social media growth.`,
      },
      {
        subtitle: "",
        body: `The specific scope, deliverables, timeline, and pricing for each engagement are defined in a separate Statement of Work (SOW) or project agreement signed by both parties.`,
      },
    ],
  },
  {
    id: "user-obligations",
    title: "3. User Obligations",
    content: [
      {
        subtitle: "",
        body: `By using our website or engaging our services, you agree to:`,
      },
      {
        subtitle: "Accurate Information",
        body: `Provide accurate, current, and complete information when contacting us, filling in forms, or entering into a project agreement.`,
      },
      {
        subtitle: "Lawful Use",
        body: `Use our website and services only for lawful purposes and in a manner that does not infringe the rights of others or restrict their use and enjoyment of the website.`,
      },
      {
        subtitle: "No Misuse",
        body: `Not attempt to gain unauthorised access to any part of the website, our servers, or any databases connected to our website. Not transmit any unsolicited commercial communications, malware, or harmful code.`,
      },
      {
        subtitle: "Client Responsibilities",
        body: `As a client, provide timely feedback, approvals, and materials required for the project. Delays caused by the client may affect agreed timelines and costs.`,
      },
    ],
  },
  {
    id: "intellectual-property",
    title: "4. Intellectual Property",
    content: [
      {
        subtitle: "Our Website Content",
        body: `All content on futurisesolutions.com, including text, graphics, logos, images, and software, is the property of ${COMPANY} or its content suppliers and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works from this content without our express written permission.`,
      },
      {
        subtitle: "Deliverables & Client Ownership",
        body: `Upon receipt of full payment, ownership of custom deliverables created specifically for a client (source code, designs, written content) transfers to the client as specified in the project agreement. ${COMPANY} retains the right to display the work in our portfolio unless the client requests otherwise in writing.`,
      },
      {
        subtitle: "Third-Party Components",
        body: `Some deliverables may incorporate open-source libraries, third-party APIs, stock assets, or licensed software. Ownership of these components remains with their respective owners and is governed by their own licences. We will identify any such components in the project documentation.`,
      },
      {
        subtitle: "Pre-existing IP",
        body: `${COMPANY} retains ownership of any pre-existing intellectual property, methodologies, tools, frameworks, and know-how used in delivering services. We grant clients a non-exclusive licence to use such materials solely as incorporated in their deliverables.`,
      },
    ],
  },
  {
    id: "payment",
    title: "5. Payment Terms",
    content: [
      {
        subtitle: "Invoicing",
        body: `Payment terms are set out in the individual project agreement or SOW. Unless otherwise agreed, we typically require a deposit before work commences, with the remainder invoiced upon milestones or project completion.`,
      },
      {
        subtitle: "Late Payment",
        body: `Invoices unpaid beyond the agreed due date may attract a late payment fee of 1.5% per month on the outstanding balance. We reserve the right to pause work on your project until outstanding invoices are settled.`,
      },
      {
        subtitle: "Currency",
        body: `Invoices are issued in the currency agreed in the project contract (NZD, USD, or INR). Any bank fees or currency conversion costs are the responsibility of the client.`,
      },
      {
        subtitle: "Refunds",
        body: `Deposits are non-refundable once work has commenced. For disputes regarding completed deliverables, we offer a revision process as defined in the project agreement. Refund requests for exceptional circumstances will be considered on a case-by-case basis.`,
      },
    ],
  },
  {
    id: "delivery-revisions",
    title: "6. Project Delivery & Revisions",
    content: [
      {
        subtitle: "Timelines",
        body: `Estimated delivery timelines are provided in the project agreement and are contingent on the timely provision of client materials, feedback, and approvals. ${COMPANY} will communicate promptly if timelines are at risk due to factors within our control.`,
      },
      {
        subtitle: "Revisions",
        body: `Each project includes a defined number of revision rounds as specified in the SOW. Additional revisions beyond the agreed scope will be quoted and billed separately at our standard hourly rate.`,
      },
      {
        subtitle: "Acceptance",
        body: `Deliverables are deemed accepted if no written feedback is received within 7 business days of delivery. Acceptance triggers any remaining payment obligations.`,
      },
    ],
  },
  {
    id: "confidentiality",
    title: "7. Confidentiality",
    content: [
      {
        subtitle: "",
        body: `Both parties agree to keep confidential any proprietary or sensitive information disclosed during the course of the engagement, including business plans, technical specifications, pricing, and client data. This obligation survives termination of the engagement for a period of 2 years. Information that is publicly available, independently developed, or disclosed by a third party without restriction is excluded from this obligation. Where a separate Non-Disclosure Agreement (NDA) is in place, its terms shall prevail.`,
      },
    ],
  },
  {
    id: "liability",
    title: "8. Limitation of Liability",
    content: [
      {
        subtitle: "",
        body: `To the fullest extent permitted by applicable law, ${COMPANY} and its directors, employees, and contractors shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our website or services, including but not limited to loss of profits, data, goodwill, or business opportunities.`,
      },
      {
        subtitle: "",
        body: `Our total liability to you for any claim arising out of or related to our services shall not exceed the total fees paid by you to us in the 3 months preceding the claim. Nothing in these Terms limits our liability for fraud, gross negligence, or any other liability that cannot be limited by law.`,
      },
      {
        subtitle: "Website Availability",
        body: `We do not guarantee that our website will be available at all times. We reserve the right to suspend, withdraw, or restrict access to all or any part of the website for business or operational reasons.`,
      },
    ],
  },
  {
    id: "third-party-links",
    title: "9. Third-Party Links & Services",
    content: [
      {
        subtitle: "",
        body: `Our website may contain links to third-party websites, tools, or services for your convenience. These links do not constitute an endorsement of those sites or their content. ${COMPANY} has no control over and accepts no responsibility for the content, privacy policies, or practices of third-party sites. We encourage you to review the terms and privacy policies of any third-party site you visit.`,
      },
    ],
  },
  {
    id: "termination",
    title: "10. Termination",
    content: [
      {
        subtitle: "By Client",
        body: `A client may terminate a project engagement with 14 days' written notice. The client shall pay for all work completed up to the date of termination. Non-refundable deposits will not be returned.`,
      },
      {
        subtitle: "By Futurise Solutions",
        body: `We reserve the right to terminate an engagement with immediate effect if the client breaches these Terms, fails to make payment, or engages in conduct detrimental to our team or reputation. In such cases, payment for completed work remains due.`,
      },
    ],
  },
  {
    id: "governing-law",
    title: "11. Governing Law & Dispute Resolution",
    content: [
      {
        subtitle: "Governing Law",
        body: `These Terms and Conditions are governed by and construed in accordance with the laws of New Zealand. Any disputes shall be subject to the exclusive jurisdiction of the courts of New Zealand, unless both parties agree otherwise in writing.`,
      },
      {
        subtitle: "Dispute Resolution",
        body: `Before initiating formal legal proceedings, the parties agree to attempt to resolve any dispute through good-faith negotiation. If the dispute cannot be resolved within 30 days of written notice, either party may pursue their legal remedies. For disputes involving amounts under NZD 30,000, the parties will consider using the New Zealand Disputes Tribunal.`,
      },
    ],
  },
  {
    id: "changes",
    title: "12. Changes to These Terms",
    content: [
      {
        subtitle: "",
        body: `We reserve the right to update these Terms and Conditions at any time. When we make material changes, we will update the "Last Updated" date at the top of this page. Your continued use of our website or services after changes are posted constitutes your acceptance of the revised Terms. We encourage you to review these Terms periodically.`,
      },
    ],
  },
  {
    id: "contact",
    title: "13. Contact Us",
    content: [
      {
        subtitle: "",
        body: `For any questions about these Terms and Conditions, please contact us:`,
      },
    ],
  },
];

const TermsSection = ({ section, delay }) => (
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

const TermsConditions = () => {
  return (
    <Box>
      <Seo
        title="Terms & Conditions | Futurise Solutions"
        description="Read the Terms and Conditions governing the use of Futurise Solutions' website and services including AI development, web development, mobile apps, UI/UX design, blockchain, and digital marketing."
        path="/terms"
        keywords="Futurise Solutions terms and conditions, service agreement, client terms, web development contract, AI development terms, New Zealand digital agency terms"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Terms & Conditions — Futurise Solutions",
          "url": "https://futurisesolutions.com/terms",
          "description": "Terms and Conditions governing use of Futurise Solutions website and engagement of services.",
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://futurisesolutions.com/" },
              { "@type": "ListItem", "position": 2, "name": "Terms & Conditions", "item": "https://futurisesolutions.com/terms" },
            ],
          },
        }}
      />

      {/* ── Hero ── */}
      <Box position="relative" overflow="hidden" pt={{ base: 14, md: 24 }} pb={{ base: 10, md: 14 }}>
        <Box position="absolute" top="-20%" right="-10%" w="600px" h="600px" bg="rgba(181,123,255,0.12)" filter="blur(140px)" rounded="full" pointerEvents="none" />
        <Box position="absolute" bottom="-10%" left="-5%" w="400px" h="400px" bg="rgba(123,108,255,0.1)" filter="blur(120px)" rounded="full" pointerEvents="none" />

        <Container maxW="1200px" px={{ base: 5, md: 8 }} position="relative">
          <VStack align="start" spacing={5} maxW="720px">
            <Reveal>
              <Eyebrow>Legal</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <Heading as="h1" fontSize={{ base: "36px", md: "52px", lg: "60px" }} lineHeight={1.08} letterSpacing="-0.02em">
                Terms &{" "}
                <Box as="span" className="gradient-text">Conditions</Box>
              </Heading>
            </Reveal>
            <Reveal delay={0.1}>
              <Text color="text.muted" fontSize={{ base: "md", md: "lg" }} lineHeight={1.7} maxW="580px">
                Please read these Terms carefully before using our website or engaging {COMPANY} for services.
                These terms govern the relationship between you and us.
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
                <Icon as={FiFileText} color="accent.solid" boxSize={4} />
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
          {/* Table of contents sidebar */}
          <Box
            display={{ base: "none", lg: "block" }}
            position="sticky"
            top="100px"
            as="nav"
            aria-label="Terms and conditions sections"
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
                  These Terms and Conditions ("Terms") govern your use of the website{" "}
                  <Box as="span" color="accent.solid" fontWeight={600}>futurisesolutions.com</Box> and any services
                  provided by <Box as="span" color="text.primary" fontWeight={600}>{COMPANY}</Box> ("we", "us", or "our"),
                  a digital product studio registered in New Zealand. These Terms were last updated on {LAST_UPDATED}.
                </Text>
              </Box>
            </Reveal>

            {sections.slice(0, -1).map((section, i) => (
              <TermsSection key={section.id} section={section} delay={0.04 * (i + 1)} />
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
                  13. Contact Us
                </Heading>
                <Text color="text.muted" fontSize={{ base: "14px", md: "15px" }} lineHeight={1.8} mb={5}>
                  If you have any questions or concerns about these Terms and Conditions, please contact us:
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

export default TermsConditions;
