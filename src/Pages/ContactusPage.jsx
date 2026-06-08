import React from "react";
import { Box, Container, Flex, Heading, Text, VStack, HStack, Icon, SimpleGrid } from "@chakra-ui/react";
import { FiMail, FiPhone, FiMapPin, FiClock } from "react-icons/fi";
import { Reveal, Eyebrow, ContactForm, Seo } from "../Components/common";
import ServicesWorldwide from "../Components/ContactCusCpmponents/ServicesWorldwide ";
import ClientsReviews from "../Components/HomePage Components/ClientsReviews";

const contactInfo = [
  { icon: FiMail, label: "Email us", value: "business@futurisesolutions.com", href: "mailto:business@futurisesolutions.com" },
  { icon: FiPhone, label: "Call us", value: "+91 76650 13356", href: "tel:+917665013356" },
  { icon: FiMapPin, label: "Location", value: "Serving clients worldwide" },
  { icon: FiClock, label: "Working hours", value: "Mon–Fri, 9:00 AM – 6:00 PM" },
];

const ContactUs = () => {
  return (
    <Box>
      <Seo
        title="Contact Us — Start Your Project"
        description="Tell Futurise Solutions about your project. We reply within hours to schedule a free consultation for web, mobile, and Web3 builds. Serving clients across India, the USA, and worldwide."
        path="/contact"
      />
      <Box position="relative" overflow="hidden" pt={{ base: 12, md: 20 }} pb={{ base: 12, md: 16 }}>
        <Box position="absolute" top="-15%" left="-5%" w="500px" h="500px" bg="rgba(123,108,255,0.18)" filter="blur(120px)" rounded="full" pointerEvents="none" />
        <Box position="absolute" bottom="-20%" right="-8%" w="420px" h="420px" bg="rgba(181,123,255,0.16)" filter="blur(120px)" rounded="full" pointerEvents="none" />

        <Container maxW="1200px" px={{ base: 5, md: 8 }} position="relative">
          <Flex direction={{ base: "column", lg: "row" }} gap={{ base: 12, lg: 16 }} align={{ base: "start", lg: "stretch" }}>
            {/* Left: copy + info — vertically centered so it balances the form height */}
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
                  Share a few details and we’ll get back to you within a couple of hours to schedule a call and discuss your goals.
                </Text>
              </Reveal>

              {/* compact 2×2 grid keeps the info section from outgrowing the form */}
              <Reveal delay={0.15} w="full">
                <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={3} w="full" pt={2}>
                  {contactInfo.map((c) => (
                    <HStack
                      key={c.label}
                      as={c.href ? "a" : "div"}
                      href={c.href}
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
            </VStack>

            {/* Right: form */}
            <Reveal from="left" flex="1" w="full" maxW={{ lg: "560px" }}>
              <ContactForm />
            </Reveal>
          </Flex>
        </Container>
      </Box>

      <ServicesWorldwide />
      <ClientsReviews />
    </Box>
  );
};

export default ContactUs;
