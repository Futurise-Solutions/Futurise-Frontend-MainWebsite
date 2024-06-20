import React from "react";
import { Box, Flex, Image } from "@chakra-ui/react";
import {  webAboutus } from "../../assests";
import { CustomButton } from "../../utils/Buttons";
import { CustomText } from "../../utils/Texts";
import CompanyStats from "./CompanyStats";

const Aboutus = () => {
  return (
    <>
      <Box
        overflow={"hidden"}
        position={"relative"}
        py={{ base: "2rem", md: "4rem" }}
      >
        <Box
          position="absolute"
          top="-8rem"
          left="40%"
          transform="translateX(-50%)"
          width="800px"
          height={{base:"400px" , md:"350px", lg:"320px"}}
          borderRadius="0% 0% 0% 50%"
          bg="radial-gradient(50% 50% at 50% 50%, rgba(38, 145, 223, 0.4) 6.24%, rgba(38, 145, 223, 0) 100%)"
        ></Box>
        <Box
          position="absolute"
          display={{base:"none", sm:"none", md:"block", lg:"block"}}
          top="50%"
          left={{ base: "-6rem", md: "-8rem", lg: "-12rem" }}
          transform="translateY(-50%)"
          width={{ base: "300px", sm: "400px", md: "500px", lg: "700px" }}
          height={{ base: "240px", sm: "340px", md: "480px", lg: "580px" }}
          borderRadius="0% 0% 0% 50%"
          bg="radial-gradient(50% 50% at 50% 50%, rgba(38, 145, 223, 0.4) 6.24%, rgba(38, 145, 223, 0) 100%)"
        ></Box>
        <Flex
          w={{ base: "90%", md: "80%" }}
          m="auto"
          gap={{ base: "2rem", md: "4rem" }}
          alignItems="center"
          flexDirection={{ base: "column", md: "row" }}
        >
          <Image
            zIndex={1000}
            bg={"transparent"}
            _hover={{ transform: "scale(1.2)" }}
            w={{ base: "200px", md: "250px", lg: "300px" }}
            h={{ base: "200px", md: "250px", lg: "280px" }}
            src={webAboutus}
            transition="transform 0.5s ease"
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
