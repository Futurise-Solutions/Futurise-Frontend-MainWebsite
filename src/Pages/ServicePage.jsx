import React from "react";
import { Box, Container, Flex, Heading, Text, Button, Stack, VStack, HStack, Icon } from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";
import ProcessSection from "../Components/ServiceComponents/ProcessSection";
import ServiceStack from "../Components/ServiceComponents/ServiceStack";
import { services } from "../utils/Constant";
import { Reveal, Eyebrow, CTASection } from "../Components/common";
import NotFound from "./NotFound";

const ServicePage = () => {
  const { serviceName } = useParams();
  const navigate = useNavigate();
  const service = services[serviceName];

  if (!service) return <NotFound />;

  return (
    <Box>
      {/* Hero */}
      <Box position="relative" overflow="hidden" pt={{ base: 12, md: 20 }} pb={{ base: 10, md: 14 }}>
        <Box position="absolute" top="-15%" left="-5%" w="500px" h="500px" bg="rgba(79,123,255,0.18)" filter="blur(120px)" rounded="full" pointerEvents="none" />
        <Box position="absolute" top="10%" right="-8%" w="420px" h="420px" bg="rgba(157,92,255,0.16)" filter="blur(120px)" rounded="full" pointerEvents="none" />

        <Container maxW="1200px" px={{ base: 5, md: 8 }} position="relative">
          <Flex direction={{ base: "column", lg: "row" }} align="center" gap={{ base: 10, lg: 16 }}>
            <VStack flex="1" align="start" spacing={5}>
              <Reveal><Eyebrow>{service.whatWeDo}</Eyebrow></Reveal>
              <Reveal delay={0.05}>
                <Heading as="h1" fontSize={{ base: "38px", md: "52px" }} lineHeight={1.1} letterSpacing="-0.02em">
                  <Box as="span" className="gradient-text">{service.title}</Box>
                </Heading>
              </Reveal>
              <Reveal delay={0.1}>
                <Text fontSize={{ base: "lg", md: "xl" }} color="text.primary" fontWeight={500}>
                  {service.description}
                </Text>
              </Reveal>
              <Reveal delay={0.15}>
                <Text color="text.muted" fontSize={{ base: "md", md: "lg" }} lineHeight={1.75}>
                  {service.details}
                </Text>
              </Reveal>
              <Reveal delay={0.2}>
                <Stack direction={{ base: "column", sm: "row" }} spacing={4} pt={2}>
                  <Button variant="gradient" size="lg" rightIcon={<FiArrowRight />} onClick={() => navigate("/contact")}>
                    Get a free quote
                  </Button>
                  <Button variant="outlineGlow" size="lg" onClick={() => navigate("/portfolio")}>
                    View our work
                  </Button>
                </Stack>
              </Reveal>
            </VStack>

            {/* Feature list card */}
            <Reveal from="left" flex="1" w="full">
              <Box
                borderRadius="24px"
                border="1px solid"
                borderColor="border.subtle"
                bg="bg.surface"
                backdropFilter="blur(12px)"
                p={{ base: 7, md: 9 }}
                position="relative"
                overflow="hidden"
              >
                <Box position="absolute" top="-30%" right="-10%" w="240px" h="240px" bg="rgba(79,123,255,0.22)" filter="blur(70px)" rounded="full" />
                <Text fontWeight={600} mb={5} fontSize="lg" position="relative">What’s included</Text>
                <VStack align="stretch" spacing={4} position="relative">
                  {service.features?.map((f) => (
                    <HStack key={f} spacing={3} align="start">
                      <Icon as={FiCheckCircle} color="accent.solid" boxSize={5} mt={0.5} flexShrink={0} />
                      <Text color="text.muted">{f}</Text>
                    </HStack>
                  ))}
                </VStack>
              </Box>
            </Reveal>
          </Flex>
        </Container>
      </Box>

      <ServiceStack service={serviceName} />
      <ProcessSection />
      <CTASection
        eyebrow="Let’s discuss your idea"
        title="Ready to start your"
        highlight={`${service.title} project?`}
        subtitle="Get a free consultation and let’s turn your vision into a unique digital creation."
        primaryLabel="Connect with us"
      />
    </Box>
  );
};

export default ServicePage;
