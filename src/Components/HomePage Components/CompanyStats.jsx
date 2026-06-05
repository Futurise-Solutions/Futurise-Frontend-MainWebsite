import React from "react";
import CountUp from "react-countup";
import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import VisibilitySensor from "react-visibility-sensor";
import { companyStats } from "../../utils/Constant";
import { Section, Reveal } from "../common";

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
                  <VisibilitySensor partialVisibility offset={{ bottom: 40 }}>
                    {({ isVisible }) => (
                      <span>
                        {isVisible ? <CountUp end={stat.value} duration={2.2} /> : 0}
                        {stat.suffix}
                      </span>
                    )}
                  </VisibilitySensor>
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
