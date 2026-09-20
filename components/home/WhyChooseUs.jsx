'use client'

import React from "react";
import { SimpleGrid, Text, Heading, Flex, Box } from "@chakra-ui/react";
import Image from "next/image";
import { cards } from "../../utils/Constant";
import { Section, SectionHeading, GlassCard, Reveal } from "../common";
import CircuitRail from "../common/CircuitRail";

const WhyChooseUs = () => {
  return (
    <Section>
      <SectionHeading
        eyebrow="Why Futurise"
        title="Built on trust,"
        highlight="delivered with care"
        subtitle="We obsess over the details that make a product successful — and the relationship that makes the project enjoyable."
        mb={{ base: 10, md: 14 }}
      />

      {/* Connector rail behind the grid. The six cards are one argument, but laid out
          as six separate boxes they read as a list — the rail draws the relationship
          without adding anything to read. Desktop only: at one and two columns the
          cards stack, so a horizontal spine would connect nothing.
          See CircuitRail.jsx. */}
      <Box position="relative">
        <Box display={{ base: "none", lg: "block" }} position="relative" h="30px" mb={2}>
          <CircuitRail stops={3} height={30} top="0" />
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} position="relative" zIndex={1}>
        {cards.map((el, index) => (
          <Reveal key={el.title + index} delay={(index % 3) * 0.08}>
            <GlassCard h="full" p={{ base: 6, md: 7 }}>
              <Flex
                w="52px"
                h="52px"
                borderRadius="14px"
                align="center"
                justify="center"
                bgGradient="linear(135deg, rgba(123,108,255,0.2), rgba(181,123,255,0.2))"
                border="1px solid"
                borderColor="rgba(180,160,255,0.25)"
                mb={5}
              >
                {/* D27: next/image with the static import passed directly. The old
                    Chakra <Image> took w/h as styles and htmlWidth/htmlHeight as
                    attributes; next/image takes width/height as the intrinsic size and
                    reserves the box, which is the same 26x26 result. `loading="lazy"`
                    and `decoding="async"` are next/image defaults. */}
                <Image src={el.icon} alt={`${el.title} icon`} width={26} height={26} />
              </Flex>
              <Heading as="h3" fontSize="lg" fontWeight={600} mb={2}>
                {el.title}
              </Heading>
              <Text color="text.muted" fontSize="15px" lineHeight={1.7}>
                {el.description}
              </Text>
            </GlassCard>
          </Reveal>
        ))}
        </SimpleGrid>
      </Box>
    </Section>
  );
};

export default WhyChooseUs;
