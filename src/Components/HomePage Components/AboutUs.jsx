import React from "react";
import { Box, Flex, Image } from "@chakra-ui/react";
import { glowBg, webAboutus } from "../../assests";
import { CustomButton } from "../../utils/Buttons";
import { CustomText } from "../../utils/Texts";
import CompanyStats from "./CompanyStats";

const Aboutus = () => {
  return (
    <>
      <Box
       
        position={"relative"}
        py={{ base: "2rem", md: "4rem" }}
      >
        {/* <Box
          className="firstglow"
          bgImage={`url(${glowBg})`}
          bgSize="cover"
          width={{ base: "50px", md: "200px", lg: "500px" }}
          height={{ base: "50px", md: "200px", lg: "500px" }}
          position="absolute"
         top={{ base: "0", md: "1rem", lg: "-10rem" }}
        left="30%"
          // transform="translateX(-50%)"
          zIndex="0"
          borderRadius="full"
        />

        <Box
          className="secondglow"
          bgImage={`url(${glowBg})`}
          bgSize="cover"
          width={{ base: "50px", md: "200px", lg: "300px" }}
          height={{ base: "50px", md: "200px", lg: "300px" }}
          position="absolute"
          top="50%"
          left={{ base: "1rem", md: "2rem", lg: "3rem" }}
          // transform="translateY(-50%)"
          // zIndex="-1"
          borderRadius="full"
        /> */}

        <Flex
          w={{ base: "90%", md: "80%" }}
          m="auto"
          gap={{ base: "2rem", md: "4rem" }}
          alignItems="center"
          flexDirection={{ base: "column", md: "row" }}
        >
          <Image
            _hover={{ transform: "scale(1.2)" }}
            w={{ base: "200px", md: "250px", lg: "322px" }}
            h={{ base: "200px", md: "250px", lg: "301px" }}
            src={webAboutus}
            alt="Aboutus"
          />
          <Flex
            alignItems="flex-start"
            flexDir="column"
            textAlign={{ base: "left", md: "left" }}
          >
            <CustomText variant="heading">About Us</CustomText>
            <CustomText variant="subheading">
              {
                "At The Futurise Soln., our mission is to drive digital transformation and create cutting-edge software solutions that empower businesses to achieve their fullest potential. We are dedicated to delivering exceptional technology products and services that enhance efficiency, innovation, and growth for our clients across diverse industries."
              }
            </CustomText>
            <CustomButton text="Know More" variant="primary" />
          </Flex>
        </Flex>
      </Box>
      <CompanyStats />
    </>
  );
};

export default Aboutus;
