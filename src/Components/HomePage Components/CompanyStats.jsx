import React from "react";
import CountUp from "react-countup";
import { Box, Flex, Text } from "@chakra-ui/react";
import VisibilitySensor from 'react-visibility-sensor';
const CompanyStats = ({startCount}) => {
  return (
    <Flex
      flexDirection={{ base: "column", md: "row" }}
      justifyContent="space-around"
      alignItems="center"
      py={{ base: "1rem", md: "2rem" }}
      bg={"rgba(255, 255, 255, 0.05)"}
    >
      <Box bg={"rgba(255, 255, 255, 0.05)"} textAlign="center" mx="1rem">
      <VisibilitySensor partialVisibility>
          {({ isVisible }) => (
            <Text  color={"rgba(7, 171, 232, 1)"} fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }} fontWeight="bold">
              {isVisible ? <CountUp style={{ color: "#07ABE8" }} end={50} duration={2} /> : '50'}+
            </Text>
          )}
        </VisibilitySensor>
        <Text fontSize={{ base: "lg", md: "xl" }}>Clients</Text>
      </Box>
      <Box bg={"rgba(255, 255, 255, 0.05)"} textAlign="center" mx="1rem">
      <VisibilitySensor partialVisibility>
          {({ isVisible }) => (
            <Text  color={"rgba(7, 171, 232, 1)"} fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }} fontWeight="bold">
              {isVisible ? <CountUp style={{ color: "#07ABE8" }} end={10} duration={2} /> : '50'}+
            </Text>
          )}
        </VisibilitySensor>
        <Text fontSize={{ base: "lg", md: "xl" }}>Team Members</Text>
      </Box>
      <Box bg={"rgba(255, 255, 255, 0.05)"} textAlign="center" mx="1rem">
      <VisibilitySensor partialVisibility>
          {({ isVisible }) => (
            <Text  color={"rgba(7, 171, 232, 1)"} fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }} fontWeight="bold">
              {isVisible ? <CountUp style={{ color: "#07ABE8" }} end={100} duration={2} /> : '50'}+
            </Text>
          )}
        </VisibilitySensor>
        <Text fontSize={{ base: "lg", md: "xl" }}>Projects</Text>
      </Box>
    </Flex>
  );
};

export default CompanyStats;
