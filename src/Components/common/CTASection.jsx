import { Box, Button, Heading, Text, Stack, HStack, Link as CLink, Icon } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FiArrowRight, FiMail, FiPhone } from "react-icons/fi";
import Section from "./Section";
import Reveal from "./Reveal";

/**
 * Reusable conversion CTA band. Used at the foot of most pages.
 */
const CTASection = ({
  eyebrow = "Let’s build together",
  title = "Have a project in mind?",
  highlight = "Let’s make it real.",
  subtitle = "Book a free consultation and we’ll turn your vision into a polished, production-ready digital product.",
  primaryLabel = "Get a free quote",
  secondaryLabel = "View our work",
  primaryTo = "/contact",
  secondaryTo = "/portfolio",
}) => {
  const navigate = useNavigate();
  return (
    <Section py={{ base: "56px", md: "80px" }}>
      <Reveal>
        <Box
          position="relative"
          overflow="hidden"
          borderRadius="28px"
          px={{ base: 6, md: 14 }}
          py={{ base: 12, md: 16 }}
          textAlign="center"
          border="1px solid"
          borderColor="rgba(180,160,255,0.3)"
          bgGradient="linear(135deg, rgba(123,108,255,0.16), rgba(181,123,255,0.16))"
        >
          {/* glow orbs */}
          <Box position="absolute" top="-40%" left="-10%" w="320px" h="320px" bg="rgba(123,108,255,0.35)" filter="blur(90px)" rounded="full" />
          <Box position="absolute" bottom="-50%" right="-5%" w="320px" h="320px" bg="rgba(181,123,255,0.3)" filter="blur(90px)" rounded="full" />

          <Box position="relative">
            <Text fontSize="sm" fontWeight={600} letterSpacing="0.16em" textTransform="uppercase" color="accent.solid" mb={3}>
              {eyebrow}
            </Text>
            <Heading fontSize={{ base: "28px", md: "42px" }} lineHeight={1.15} maxW="760px" mx="auto">
              {title} <Box as="span" className="gradient-text">{highlight}</Box>
            </Heading>
            <Text mt={4} color="text.muted" fontSize={{ base: "md", md: "lg" }} maxW="620px" mx="auto">
              {subtitle}
            </Text>
            <Stack direction={{ base: "column", sm: "row" }} spacing={4} justify="center" mt={8}>
              <Button variant="gradient" size="lg" rightIcon={<FiArrowRight />} onClick={() => navigate(primaryTo)}>
                {primaryLabel}
              </Button>
              <Button variant="outlineGlow" size="lg" onClick={() => navigate(secondaryTo)}>
                {secondaryLabel}
              </Button>
            </Stack>

            {/* direct contact — high-intent shortcut */}
            <Stack direction={{ base: "column", sm: "row" }} spacing={{ base: 3, sm: 8 }} justify="center" align="center" mt={8} fontSize="sm">
              <CLink href="mailto:business@futurisesolutions.com" color="text.muted" _hover={{ color: "text.primary" }} transition="color .2s">
                <HStack spacing={2}><Icon as={FiMail} color="accent.solid" /><Text>business@futurisesolutions.com</Text></HStack>
              </CLink>
              <CLink href="tel:+917665013356" color="text.muted" _hover={{ color: "text.primary" }} transition="color .2s">
                <HStack spacing={2}><Icon as={FiPhone} color="accent.solid" /><Text>+91 76650 13356</Text></HStack>
              </CLink>
            </Stack>
          </Box>
        </Box>
      </Reveal>
    </Section>
  );
};

export default CTASection;
