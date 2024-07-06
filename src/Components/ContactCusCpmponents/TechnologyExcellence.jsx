import {
  Box,
  Flex,
  Text,
  VStack,
  Grid,
  GridItem,
  useBreakpointValue,
  keyframes,
  Image,
} from "@chakra-ui/react";
import React from "react";
import {
  AppDevelopment,
  AppDevHover,
  BlockchainDevelopment,
  BlockchainHover,
  DigitalMarketing,
  DigitalMarketingHover,
  SmartContract,
  SmartContractHover,
  UIUXDevelopment,
  UIUXHover,
  WebDevelopment,
  webDevHover,
} from "../../assests";
import { CustomText } from "../../utils/Texts";

const strengths = [
  {
    name: "App Development",
    description: [
      "High-quality mobile apps",
      "Cross-platform compatibility",
      "User-friendly interfaces",
    ],
    icon: AppDevHover,
    bg: AppDevelopment,
  },
  {
    name: "Web Development",
    description: ["Responsive designs", "Dynamic websites", "SEO optimization"],
    icon: webDevHover,
    bg: WebDevelopment,
  },
  {
    name: "Blockchain Development",
    description: [
      "Secure solutions",
      "Decentralized applications",
      "Smart contracts",
    ],
    icon: BlockchainHover,
    bg: BlockchainDevelopment,
  },
  {
    name: "Smart Contract",
    description: [
      "Efficient contracts",
      "Automation",
      "Blockchain integration",
    ],
    icon: SmartContractHover,
    bg: SmartContract,
  },
  {
    name: "UI/UX Development",
    description: [
      "User-centric design",
      "Intuitive interfaces",
      "Enhanced user experience",
    ],
    icon: UIUXHover,
    bg: UIUXDevelopment,
  },
  {
    name: "Digital Marketing",
    description: [
      "Increased online presence",
      "Engagement strategies",
      "Social media marketing",
    ],
    icon: DigitalMarketingHover,
    bg: DigitalMarketing,
  },
];

const hoverEffect = keyframes`
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
`;

const TechnologyExcellence = () => {
  return (
    <Box mt="10rem" mb="10rem" textAlign="center">
      <Text fontSize="4xl" fontWeight="bold" mb={10}>
        Technology Excellence
      </Text>
      <Grid
        templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
        gap={6}
        px={{ base: "2rem", md: "5rem" }}
        position={"relative"}
      >
           {/* BOX FOR GLOW EFFECT */}
      <Box
        position="absolute"
        top="40%"
        left="50%"
        bottom="40%"
        transform="translateX(-50%)"
        width="90%"
        m={"auto"}
        zIndex={1}
        height={{ base: "400px", md: "350px", lg: "70%" }}
        bg="radial-gradient(50% 50% at 50% 50%, rgba(49, 129, 187, 0.6) 6.24%, rgba(38, 145, 223, 0) 100%)"
        display={{ base: "none", sm: "none", md: "block", lg: "block" }}
      ></Box>
        {strengths.map((strength) => (
          <GridItem
          zIndex={10}
            key={strength.name}
            position="relative"
            backgroundImage={`url(${strength.bg})`}
            bgRepeat={"no-repeat"}
            backgroundSize={"cover"}
            color="white"
            borderRadius="lg"
            overflow="hidden"
            _hover={{
              ".hoverBox": {
                animation: `${hoverEffect} 0.3s forwards`,
                bg: "rgba(0, 0, 0, 0.8)",
              },
            }}
          >
              <Box
        position="absolute"
        top={0}
        left={0}
        h="100%"
        w="100%"
        bg="black"
        zIndex={0}
        opacity={0.6}
      />
            <VStack
              p={6}
              justifyContent="center"
              alignItems="center"
              height="200px"
              textAlign="center"
              position="relative"
            >
              <CustomText variant='subheading2'>
                {strength.name}
              </CustomText>
            </VStack>
            <Box
              className="hoverBox"
              position="absolute"
              top="0"
              left="0"
              width="100%"
              height="100%"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              color="white"
              opacity="0"
              p={4}
            >
              <Image src={strength.icon} />
              <VStack m={"auto"} alignItems={"flex-start"} spacing={2}>
                {strength.description.map((point, index) => (
                  <Flex key={index} alignItems="center">
                    <Box
                      as="span"
                      mr={2}
                      bg="white"
                      p={1}
                      borderRadius="full"
                      alignItems={"flex-start"}
                    />
                    <Text textAlign={"start"}>{point}</Text>
                  </Flex>
                ))}
              </VStack>
            </Box>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default TechnologyExcellence;
