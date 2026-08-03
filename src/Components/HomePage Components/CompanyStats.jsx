import React, { useState } from "react";
import CountUp from "react-countup";
import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import VisibilitySensor from "react-visibility-sensor";
import { companyStats } from "../../utils/Constant";
import { Section, Reveal } from "../common";

/**
 * Counts up once when scrolled into view, then stays at its final value.
 *
 * Two things here exist because of bugs that actually shipped:
 *
 *   - `active={!counted}` latches the sensor off after the first sighting. Without it
 *     the number drops back whenever the section scrolls out of view.
 *   - The non-animated fallback renders `value`, NOT 0. VisibilitySensor depends on
 *     scroll events, and it never fires during the build-time prerender, so a 0 fallback
 *     meant every crawler and AI engine read "0+ Projects delivered" off the home page.
 *     Falling back to the real figure makes the markup correct without JavaScript, which
 *     is exactly what a crawler sees. There is no visual cost: an element that has not
 *     been scrolled into view has not been read yet, so the count still animates from 0
 *     the moment it appears.
 */
const StatValue = ({ value, suffix }) => {
  const [counted, setCounted] = useState(false);
  return (
    <VisibilitySensor
      partialVisibility
      offset={{ bottom: 40 }}
      active={!counted}
      onChange={(isVisible) => isVisible && setCounted(true)}
    >
      {({ isVisible }) => (
        <span>
          {isVisible || counted ? <CountUp end={value} duration={2.2} /> : value}
          {suffix}
        </span>
      )}
    </VisibilitySensor>
  );
};

const CompanyStats = () => {
  return (
    <Section py={{ base: "40px", md: "56px" }}>
      <Reveal>
        <Box
          borderRadius="24px"
          border="1px solid"
          borderColor="border.subtle"
          bg="bg.surface"
          backdropFilter="blur(12px)"
          py={{ base: 8, md: 10 }}
          px={{ base: 4, md: 8 }}
        >
          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={{ base: 8, md: 4 }}>
            {companyStats.map((stat) => (
              <Box key={stat.label} textAlign="center" position="relative">
                <Text
                  fontFamily="heading"
                  fontWeight={700}
                  fontSize={{ base: "34px", md: "44px" }}
                  className="gradient-text"
                  lineHeight={1}
                >
                  <StatValue value={stat.value} suffix={stat.suffix} />
                </Text>
                <Text mt={2} fontSize={{ base: "sm", md: "md" }} color="text.muted">
                  {stat.label}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </Reveal>
    </Section>
  );
};

export default CompanyStats;
