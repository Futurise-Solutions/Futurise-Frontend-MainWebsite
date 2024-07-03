import React from "react";
import { Box, Flex, Text, VStack, Center } from "@chakra-ui/react";
import { FaEthereum, FaVrCardboard, FaNetworkWired, FaRobot, FaRegUserCircle } from "react-icons/fa";

const HexagonItem = ({ icon, label }) => (
  <Box
    position="relative"
    width="120px"
    height="138.6px"
    clipPath="polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)"
    background="white"
    border="1px solid #ccc"
    textAlign="center"
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    boxShadow="md"
    p={4}
  >
    <Center fontSize="32px" color="blue.500">
      {icon}
    </Center>
    <Text mt="10px">{label}</Text>
  </Box>
);

const MissionVision = () => (
  <Flex direction="column" justifyContent="center" alignItems="center" minHeight="100vh" background="gray.100" p={4}>
    {/* Mission and Vision Section */}
    <VStack spacing={6} mb={10} textAlign="center" width="80%">
      <Box>
        <Text fontSize="2xl" fontWeight="bold">Our Mission</Text>
        <Text mt={2} fontSize="lg">
          To leverage cutting-edge technology to provide innovative solutions for businesses worldwide.
        </Text>
      </Box>
      <Box>
        <Text fontSize="2xl" fontWeight="bold">Our Vision</Text>
        <Text mt={2} fontSize="lg">
          To be a global leader in technology-driven transformation, empowering enterprises to achieve their goals.
        </Text>
      </Box>
    </VStack>

    {/* Hexagonal Layout */}
    <Box position="relative" width="80%" maxWidth="600px" height="400px" mt={10}>
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        width="150px"
        height="173px"
        background="blue.500"
        color="white"
        textAlign="center"
        display="flex"
        justifyContent="center"
        alignItems="center"
        clipPath="polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)"
        boxShadow="xl"
      >
        <Text>ENTERPRISE CORE</Text>
      </Box>
      <Box position="absolute" top="10%" left="50%" transform="translate(-50%, -50%)">
        <HexagonItem icon={<FaEthereum />} label="Blockchain" />
      </Box>
      <Box position="absolute" top="50%" left="10%" transform="translate(-50%, -50%)">
        <HexagonItem icon={<FaNetworkWired />} label="IoT" />
      </Box>
      <Box position="absolute" top="50%" right="10%" transform="translate(50%, -50%)">
        <HexagonItem icon={<FaRobot />} label="AI" />
      </Box>
      <Box position="absolute" bottom="10%" left="25%" transform="translate(-50%, 50%)">
        <HexagonItem icon={<FaVrCardboard />} label="XR" />
      </Box>
      <Box position="absolute" bottom="10%" right="25%" transform="translate(50%, 50%)">
        <HexagonItem icon={<FaRegUserCircle />} label="UX" />
      </Box>
    </Box>
  </Flex>
);

export default MissionVision;
