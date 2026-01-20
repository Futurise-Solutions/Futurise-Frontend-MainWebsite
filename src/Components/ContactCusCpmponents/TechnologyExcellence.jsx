import {
  Box,
  Flex,
  Text,
  VStack,
  Grid,
  GridItem,
  keyframes,
  Image,
} from "@chakra-ui/react";
import React from "react";
import { CustomText } from "../../utils/Texts";
import { strengths } from "../../utils/Constant";

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
        styles={{ zIndex: 1000, textAlign: "center" }}
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
              ".headingclass": {
                opacity: 0.3,
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
              pt={10}
            >
              <Image h={"70px"} w={"70px"} src={strength.icon} />
              <VStack m={"auto"} alignItems={"flex-start"} spacing={2}>
                {strength.description.map((point, index) => (
                  <Flex key={index}>
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
