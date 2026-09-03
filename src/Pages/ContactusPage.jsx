import React from "react";
import { Box, Container, Flex, Heading, Text, VStack, HStack, Icon, SimpleGrid, Button, Wrap, WrapItem, Link as ChakraLink } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { FiMail, FiMapPin, FiClock, FiCalendar } from "react-icons/fi";
import { Reveal, Eyebrow, ContactForm, Seo, AuroraField } from "../Components/common";
import { services } from "../utils/Constant";
import ServicesWorldwide from "../Components/ContactCusCpmponents/ServicesWorldwide ";
import ClientsReviews from "../Components/HomePage Components/ClientsReviews";
import { useBooking } from "../context/BookingContext";
import { AREAS_SERVED, AREAS_SERVED_ISO, CONTACT } from "../utils/Constant";
import { trackEvent, EVENTS } from "../utils/analytics";

// Enquiries run through the booking flow, this form, and email — no phone channel.
// The response-time commitment is what replaces a number for an enterprise buyer.
const contactInfo = [
  { icon: FiMail, label: "Email us", value: CONTACT.email, href: `mailto:${CONTACT.email}`, event: EVENTS.EMAIL_CLICK },
  { icon: FiMapPin, label: "Location", value: "Wellington, NZ · Serving worldwide" },
  { icon: FiClock, label: "Working hours", value: "Mon–Fri, 9:00 AM – 6:00 PM (NZST)" },
  { icon: FiCalendar, label: "Response time", value: "Within one business day" },
];

const ContactUs = () => {
  const { onOpen: openBooking } = useBooking();

  return (
    <Box>
      <Seo
        title="Contact Us — Get a Free Quote | Futurise Solutions"
        description="Start your AI, SaaS, web or mobile app project with Futurise Solutions. Book a strategy call or send us a message — we reply within one business day."
        path="/contact"
        image="/contactus.png"
        keywords="contact Futurise Solutions, hire web developer New Zealand, get a quote AI app, start SaaS project, web development consultation, mobile app quote, free project consultation"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contact Futurise Solutions",
            "url": "https://www.futurisesolutions.com/contact",
            "description": "Contact Futurise Solutions for AI, SaaS, web, mobile and blockchain development projects.",
            "breadcrumb": { "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.futurisesolutions.com/" }, { "@type": "ListItem", "position": 2, "name": "Contact", "item": "https://www.futurisesolutions.com/contact" }] },
            "mainEntity": { "@id": "https://www.futurisesolutions.com/#organization" }
          },
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "@id": "https://www.futurisesolutions.com/#organization",
            "name": "Futurise Solutions",
            "url": "https://www.futurisesolutions.com",
            "logo": "https://www.futurisesolutions.com/favicon-new.png",
            "email": "business@futurisesolutions.com",
            "address": { "@type": "PostalAddress", "addressLocality": "Wellington Central", "postalCode": "6011", "addressCountry": "NZ" },
            "areaServed": AREAS_SERVED,
            "contactPoint": [
              {
                "@type": "ContactPoint",
                "contactType": "sales",
                "email": "business@futurisesolutions.com",
                "url": "https://www.futurisesolutions.com/contact",
                "availableLanguage": ["English"],
                "areaServed": AREAS_SERVED_ISO,
                "hoursAvailable": { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], "opens": "09:00", "closes": "18:00" }
              }
            ]
          }
        ]}
      />
      <Box position="relative" overflow="hidden" pt={{ base: 12, md: 20 }} pb={{ base: 12, md: 16 }}>
        <Box position="absolute" top="-15%" left="-5%" w="500px" h="500px" bg="rgba(123,108,255,0.18)" filter="blur(120px)" rounded="full" pointerEvents="none" />
        <Box position="absolute" bottom="-20%" right="-8%" w="420px" h="420px" bg="rgba(181,123,255,0.16)" filter="blur(120px)" rounded="full" pointerEvents="none" />

        <Container maxW="container.site" px={{ base: 5, md: 8 }} position="relative">
          <Flex direction={{ base: "column", lg: "row" }} gap={{ base: 12, lg: 16 }} align={{ base: "start", lg: "stretch" }}>
            <VStack flex="1" align="start" spacing={6} justify="center">
              <Reveal><Eyebrow>Contact us</Eyebrow></Reveal>
              <Reveal delay={0.05}>
                <Heading as="h1" fontSize={{ base: "36px", md: "50px" }} lineHeight={1.1} letterSpacing="-0.02em">
                  Tell us about your{" "}
                  <Box as="span" className="gradient-text">project.</Box>
                </Heading>
              </Reveal>
              <Reveal delay={0.1}>
                <Text color="text.muted" fontSize={{ base: "md", md: "lg" }} maxW="480px" lineHeight={1.7}>
                  {"Share a few details and we'll get back to you within a couple of hours to schedule a call and discuss your goals."}
                </Text>
              </Reveal>

              <Reveal delay={0.15} w="full">
                <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={3} w="full" pt={2}>
                  {contactInfo.map((c) => (
                    <HStack
                      key={c.label}
                      as={c.href ? "a" : "div"}
                      href={c.href}
                      target={c.external ? "_blank" : undefined}
                      rel={c.external ? "noopener noreferrer" : undefined}
                      onClick={c.event ? () => trackEvent(c.event, { location: "contact-page-cards" }) : undefined}
                      spacing={3}
                      p={4}
                      borderRadius="14px"
                      border="1px solid"
                      borderColor="border.subtle"
                      bg="bg.surface"
                      align="start"
                      h="full"
                      transition="all .25s"
                      _hover={c.href ? { borderColor: "rgba(180,160,255,0.4)", transform: "translateY(-2px)", bg: "bg.surfaceHover" } : undefined}
                    >
                      <Flex w="40px" h="40px" borderRadius="11px" align="center" justify="center" bgGradient="linear(135deg, rgba(123,108,255,0.2), rgba(181,123,255,0.2))" border="1px solid" borderColor="rgba(180,160,255,0.25)" flexShrink={0}>
                        <Icon as={c.icon} color="accent.solid" boxSize={5} />
                      </Flex>
                      <Box minW={0}>
                        <Text fontSize="xs" color="text.faint" textTransform="uppercase" letterSpacing="0.08em">{c.label}</Text>
                        <Text fontWeight={600} fontSize={{ base: "13px", md: "14px" }} wordBreak="break-word">{c.value}</Text>
                      </Box>
                    </HStack>
                  ))}
                </SimpleGrid>
              </Reveal>

              <Reveal delay={0.2} w="full">
                <Button
                  w="full"
                  size="lg"
                  variant="gradient"
                  leftIcon={<Icon as={FiCalendar} />}
                  onClick={() => openBooking("contact-page")}
                  mt={1}
                >
                  Book a free strategy call
                </Button>
              </Reveal>
            </VStack>

            <Reveal from="left" flex="1" w="full" maxW={{ lg: "560px" }}>
              <ContactForm />
            </Reveal>
          </Flex>
        </Container>
      </Box>

      <ServicesWorldwide />
      <ClientsReviews />

      {/* Still scoping. /contact held six inbound links and passed none on — a crawl sink
          at a page with real authority. Placed last, below the form and the reviews, so it
          reaches people who were not ready to send a scope without competing with the form
          for anyone who was. */}
      {/* The page closes on a bare heading and a row of chips against flat canvas —
          the weakest note to end on, on the page where a visitor is deciding whether
          to make contact. The wash gives it presence without adding another asset. */}
      <Box position="relative" isolation="isolate">
        <AuroraField intensity="soft" />
        <Container maxW="container.site" px={{ base: 5, md: 8 }} pb={{ base: 12, md: 16 }} position="relative" zIndex={2}>
        <Reveal>
          <Text fontSize="sm" fontWeight={600} letterSpacing="0.08em" textTransform="uppercase" color="text.faint" mb={2}>
            Not ready to send a scope
          </Text>
          <Heading as="h2" fontSize={{ base: "24px", md: "30px" }} lineHeight={1.2} mb={4} maxW="700px">
            Work out what you need{" "}
            <Box as="span" className="gradient-text">before you write it down</Box>
          </Heading>
          <Wrap spacing={3}>
            {Object.entries(services).map(([slug, s]) => (
              <WrapItem key={slug}>
                <ChakraLink
                  as={RouterLink}
                  to={`/service/${slug}`}
                  px={4}
                  py={2.5}
                  borderRadius="full"
                  bg="bg.surface"
                  border="1px solid"
                  borderColor="border.subtle"
                  fontSize={{ base: "sm", md: "md" }}
                  color="text.primary"
                  fontWeight={500}
                  _hover={{ borderColor: "rgba(180,160,255,0.35)", textDecoration: "none" }}
                  transition="border-color .2s"
                >
                  {s.title}
                </ChakraLink>
              </WrapItem>
            ))}
            {[["/pricing", "What it costs"], ["/portfolio", "The delivered work"]].map(([to, label]) => (
              <WrapItem key={to}>
                <ChakraLink
                  as={RouterLink}
                  to={to}
                  px={4}
                  py={2.5}
                  borderRadius="full"
                  bg="bg.surface"
                  border="1px solid"
                  borderColor="border.subtle"
                  fontSize={{ base: "sm", md: "md" }}
                  color="text.primary"
                  fontWeight={500}
                  _hover={{ borderColor: "rgba(180,160,255,0.35)", textDecoration: "none" }}
                  transition="border-color .2s"
                >
                  {label}
                </ChakraLink>
              </WrapItem>
            ))}
          </Wrap>
        </Reveal>
        </Container>
      </Box>
    </Box>
  );
};

export default ContactUs;
