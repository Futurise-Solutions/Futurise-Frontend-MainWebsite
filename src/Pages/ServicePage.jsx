import React from "react";
import { Box, Container, Flex, Heading, Text, Button, Stack, VStack, HStack, Icon, SimpleGrid } from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";
import ProcessSection from "../Components/ServiceComponents/ProcessSection";
import ServiceStack from "../Components/ServiceComponents/ServiceStack";
import ServiceHeroVisual from "../Components/ServiceComponents/ServiceHeroVisual";
import { services } from "../utils/Constant";
import { Reveal, Eyebrow, CTASection, Seo } from "../Components/common";
import NotFound from "./NotFound";

const ServicePage = () => {
  const { serviceName } = useParams();
  const navigate = useNavigate();
  const service = services[serviceName];

  if (!service) return <NotFound />;

  return (
    <Box>
      <Seo
        title={`${service.title} Services for India & USA`}
        description={`${service.description} ${service.details}`.slice(0, 300)}
        path={`/service/${serviceName}`}
      />
      {/* Hero */}
      <Box position="relative" overflow="hidden" pt={{ base: 12, md: 20 }} pb={{ base: 10, md: 14 }}>
        <Box position="absolute" top="-15%" left="-5%" w="500px" h="500px" bg="rgba(123,108,255,0.18)" filter="blur(120px)" rounded="full" pointerEvents="none" />
        <Box position="absolute" top="10%" right="-8%" w="420px" h="420px" bg="rgba(181,123,255,0.16)" filter="blur(120px)" rounded="full" pointerEvents="none" />

        <Container maxW="1200px" px={{ base: 5, md: 8 }} position="relative">
          <Flex direction={{ base: "column", lg: "row" }} align="center" gap={{ base: 16, lg: 16 }}>
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

            {/* Service-specific hero visual */}
            <Reveal from="left" flex="1" w="full">
              <ServiceHeroVisual service={serviceName} />
            </Reveal>
          </Flex>

          {/* What's included — compact strip below the hero */}
          <Reveal delay={0.1}>
            <Box mt={{ base: 14, md: 16 }} pt={{ base: 8, md: 10 }} borderTop="1px solid" borderColor="border.subtle">
              <Text fontSize="sm" fontWeight={600} letterSpacing="0.08em" textTransform="uppercase" color="text.faint" mb={5}>
                What’s included
              </Text>
              <SimpleGrid columns={{ base: 1, sm: 2 }} spacingX={10} spacingY={4}>
                {service.features?.map((f) => (
                  <HStack key={f} spacing={3} align="start">
                    <Icon as={FiCheckCircle} color="accent.solid" boxSize={5} mt={0.5} flexShrink={0} />
                    <Text color="text.muted">{f}</Text>
                  </HStack>
                ))}
              </SimpleGrid>
            </Box>
          </Reveal>
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
