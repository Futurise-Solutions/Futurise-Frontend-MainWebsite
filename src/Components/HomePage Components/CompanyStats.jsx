import React from "react";
import CountUp from "react-countup";
import { Box, Flex, Text } from "@chakra-ui/react";
import VisibilitySensor from 'react-visibility-sensor';
import { CustomText } from "../../utils/Texts";
const CompanyStats = () => {
  return (
    <Flex
      flexDirection={{ base: "row", md: "row" }}
      justifyContent="space-around"    
      alignItems="center"
      py={{ base: "1rem", md: "2rem" }}
      bg={"rgba(255, 255, 255, 0.05)"}
    >
      <Box  textAlign="center" mx="1rem">
      <VisibilitySensor partialVisibility>
          {({ isVisible }) => (
            <Text  color={"rgba(7, 171, 232, 1)"} fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }} fontWeight="bold">
              {isVisible ? <CountUp style={{ color: "#07ABE8" }} end={50} duration={4} /> : '50'}+
            </Text>
          )}
        </VisibilitySensor>
        <CustomText variant="subheading1" children={"Clients"} />

      </Box>
      <Box  textAlign="center" mx="1rem">
      <VisibilitySensor partialVisibility>
          {({ isVisible }) => (
            <Text  color={"rgba(7, 171, 232, 1)"} fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }} fontWeight="bold">
              {isVisible ? <CountUp style={{ color: "#07ABE8" }} end={10} duration={2} /> : '50'}+
            </Text>
          )}
        </VisibilitySensor>
        <CustomText variant="subheading1" children={"Team Members"} />

      </Box>
      <Box  textAlign="center" mx="1rem">
      <VisibilitySensor partialVisibility>
          {({ isVisible }) => (
            <Text  color={"rgba(7, 171, 232, 1)"} fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }} fontWeight="bold">
              {isVisible ? <CountUp style={{ color: "#07ABE8" }} end={100} duration={2} /> : '50'}+
            </Text>
          )}
        </VisibilitySensor>
        <CustomText variant="subheading1" children={"Projects"} />
      </Box>
    </Flex>
  );
};

export default CompanyStats;
