import { Box, Tag, TagLabel } from "@chakra-ui/react";
import React from "react";

import { CustomText } from "../../utils/Texts";
import { CustomButton } from "../../utils/Buttons";
import { AboutUsHeroBg } from "../../assests";

const AboutUsHero = () => {
  return (
    <Box
      backgroundImage={`url(${AboutUsHeroBg})`}
      
      bgRepeat={"no-repeat"}
      backgroundSize={"cover"}
      opacity={1}
      overflow={"hidden"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={{ base: "center", lg: "flex-start" }}
      position={"relative"}
      p={{ base: "1rem", lg: "5rem" }}
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
      <Box pt={"5rem"} pl={"2rem"} zIndex={1} textAlign={{ base: "center", lg: "left" }}>
        <Tag mb={{ base: "0.5rem", md: "1rem" }}>
          <TagLabel>COMPANY</TagLabel>
        </Tag>
        <CustomText
          mt={2}
          zIndex={1}
          color={"#07ABE8"}
          variant="subheading6"
          styles={{ fontFamily: "Oxanium" }}
        >
          About Futurise Solution
        </CustomText>
        <CustomText
          variant="callout6"
          w={{ base: "100%", md: "80%", lg: "60%" }}
          styles={{
            fontFamily: "Oxanium",
            marginTop: "1rem",
            marginBottom: "1rem",
          }}
        >
          At Futurise Solution, we bring innovative tech solutions to life. Our
          expert team specializes in full-stack development, web and mobile
          applications, blockchain, and smart contracts. We are dedicated to
          delivering high-quality results and transforming ideas into reality
          for clients worldwide.
        </CustomText>
        <CustomButton variant="primary" text={"Contact Us"} />
      </Box>
    </Box>
  );
};

export default AboutUsHero;
