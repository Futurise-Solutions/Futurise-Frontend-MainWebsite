import React from "react";
import { SimpleGrid, Image, Text, Heading, HStack, Icon, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import { OurServiceData } from "../../utils/Constant";
import { Section, SectionHeading, GlassCard, Reveal } from "../common";

const OurServices = () => {
  return (
    <Section>
      <SectionHeading
        eyebrow="What we do"
        title="Services that move your"
        highlight="business forward"
        subtitle="From a single feature to an entire platform, we offer end-to-end product capabilities under one roof."
        mb={{ base: 10, md: 14 }}
      />

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {OurServiceData.map((el, index) => (
          <Reveal key={el.serviceName} delay={(index % 3) * 0.08}>
            <GlassCard
              as={Link}
              to={`/service/${el.route}`}
              display="block"
              h="full"
              p={{ base: 6, md: 7 }}
              role="group"
            >
              <Flex
                w="56px"
                h="56px"
                borderRadius="16px"
                align="center"
                justify="center"
                bgGradient="linear(135deg, rgba(79,123,255,0.2), rgba(157,92,255,0.2))"
                border="1px solid"
                borderColor="rgba(111,147,255,0.25)"
                mb={5}
                transition="transform .3s"
                _groupHover={{ transform: "scale(1.08)" }}
              >
                <Image src={el.icon} alt="" w="28px" h="28px" />
              </Flex>

              <HStack justify="space-between" align="start">
                <Heading as="h3" fontSize="xl" fontWeight={600}>
                  {el.serviceName}
                </Heading>
                <Icon
                  as={FiArrowUpRight}
                  boxSize={5}
                  color="text.faint"
                  transition="all .3s"
                  _groupHover={{ color: "accent.solid", transform: "translate(2px,-2px)" }}
                />
              </HStack>

              <Text mt={3} color="text.muted" fontSize="15px" lineHeight={1.7}>
                {el.serviceDesc}
              </Text>

              <Text
                mt={5}
                fontSize="sm"
                fontWeight={600}
                color="accent.solid"
                opacity={0.85}
                _groupHover={{ opacity: 1 }}
              >
                Learn more →
              </Text>
            </GlassCard>
          </Reveal>
        ))}
      </SimpleGrid>
    </Section>
  );
};

export default OurServices;
