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
      "Developing high-quality mobile applications with robust functionality and seamless performance.",
      "Ensuring cross-platform compatibility for iOS and Android to reach a wider audience.",
      "Designing user-friendly interfaces that provide an intuitive and engaging user experience."
    ],
    icon: AppDevHover,
    bg: AppDevelopment,
  },
  {
    name: "Web Development",
    description: [
      "Creating responsive web designs that adapt seamlessly to different screen sizes and devices.",
      "Building dynamic websites with interactive features and optimized performance.",
      "Implementing SEO best practices to enhance visibility and search engine rankings."
    ],
    icon: webDevHover,
    bg: WebDevelopment,
  },
  {
    name: "Blockchain Development",
    description: [
      "Providing secure blockchain solutions to ensure data integrity and transparency.",
      "Developing decentralized applications (dApps) that leverage the power of blockchain technology.",
      "Creating and managing smart contracts to automate processes and enforce agreements."
    ],
    icon: BlockchainHover,
    bg: BlockchainDevelopment,
  },
  {
    name: "Smart Contract",
    description: [
      "Designing efficient smart contracts that facilitate trustless transactions and operations.",
      "Automating complex workflows and reducing the need for intermediaries.",
      "Integrating blockchain technology to enhance security and transparency."
    ],
    icon: SmartContractHover,
    bg: SmartContract,
  },
  {
    name: "UI/UX Development",
    description: [
      "Crafting user-centric designs that focus on the needs and preferences of the target audience.",
      "Developing intuitive interfaces that enhance usability and accessibility.",
      "Providing an enhanced user experience through thoughtful design and functionality."
    ],
    icon: UIUXHover,
    bg: UIUXDevelopment,
  },
  {
    name: "Digital Marketing",
    description: [
      "Boosting online presence with targeted digital marketing strategies.",
      "Developing engagement strategies to interact with and retain customers.",
      "Utilizing social media marketing to increase brand awareness and drive traffic."
    ],
    icon: DigitalMarketingHover,
    bg: DigitalMarketing,
  },
];

const hoverEffect = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const TechnologyExcellence = () => {
  return (
    <Box mt="10rem" mb="10rem" textAlign="center">
       <CustomText
       mb="5rem"
        variant="heading"
        children=" Technology Excellence"
        styles={{ zIndex: 1000,textAlign:"center"}}
      />
    
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
            // clipPath="polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"
            zIndex={10}
            p={{ base: "2rem", md: "4rem" }}
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
                animation: `${hoverEffect} 0.7s forwards`,
                bg: "rgba(0, 0, 0, 0.8)",
              },
              ".headingclass":{
                opacity:0.3
              }
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
              className="headingclass"
            >
              <CustomText variant="subheading2">{strength.name}</CustomText>
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
                  <Flex key={index} >
                    
                    <Box
                      as="span"
                      mr={2}
                      bg="white"
                      p={0.5}
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
