import { Box, Flex, Image } from '@chakra-ui/react';
import React from 'react';
import { HeroImg1, HeroImg2, HeroImg3, HeroSectionBg } from '../../assests';
import { CustomText } from '../../utils/Texts';
import { CustomButton } from '../../utils/Buttons';

const HeroSection = () => {
  return (
    <Box
      backgroundImage={`url(${HeroSectionBg})`}
      // h={{ base: "30rem", md: "40rem", lg: "50rem" }}
      bgRepeat={"no-repeat"}
      backgroundSize={"cover"}
      opacity={1}
     overflow={"hidden"}
      pt={{ base: "5rem", md: "10rem" }}
    >
         <Box
        position="absolute"
        top={50}
        left={0}
        h="900px"
        w="100%"
        bg="black" 
        zIndex={0}
        opacity={0.6}
      />
      <Flex
      zIndex={1}
        w={"90%"}
        m={"auto"}
        flexDirection={{ base:"column-reverse", lg: "row" }}
        alignItems={"center"}
        gap={{ base: "2rem", lg: "10%" }}
      >
        {/* FLEX BOX 1 **************** *********/}
        <Box
          w={{ base: "100%", lg: "45%" }}
          textAlign={{ base: "center", lg: "left" }}
          mb={{ base: "2rem", lg: "0" }}
          zIndex={100}
        >
          <CustomText variant='subheading6' styles={{ fontFamily: "Oxanium" }}>
            Mobile App & Web Development Company
          </CustomText>
          <CustomText
            variant='subheading7'
            styles={{
              fontFamily: "Oxanium",
              color: "#07ABE8",
              marginTop: "1rem",
              marginBottom: "1rem"
            }}
          >
            We shape your ideas into creativity
          </CustomText>
          <CustomText variant='subheading1' styles={{ fontFamily: "Oxanium" }}>
            Your ideas, our Innovation, a journey to success together.
          </CustomText>
          <CustomButton variant='primary' text={"Know More"} />
        </Box>
        
        {/* Flex BOX 2********** */}
        <Box
          w={{ base: "100%", lg: "45%" }}
          h={{ base: "300px", md: "400px", lg: "500px" }}
          position="relative"
          className='box'
          display={{base:"none" , lg:"block"}}
        >
          <Image
          display={{base:"none" , lg:"block"}}
            w={{ base: "150px", md: "200px" }}
            h={{ base: "200px", md: "250px" }}
            src={HeroImg1}
            alt="Image 1"
            position="absolute"
            top={{ base: "10%", lg: "22%" }}
            left={{ base: "50%", lg: "75%" }}
            transform="translateX(-50%)"
            zIndex="3"
            className='img1'
            loading={"lazy"}
          />
          <Image
           loading={"lazy"}
            display={{base:"none" , lg:"block"}}
            w={{ base: "150px", md: "200px" }}
            h={{ base: "200px", md: "250px" }}
            src={HeroImg2}
            alt="Image 2"
            position="absolute"
            top={{ base: "30%", lg: "10%" }}
            left={{ base: "50%", lg: "55%" }}
            transform="translateX(-50%)"
            zIndex="2"
            className='img2'
          />
          <Image
           loading={"lazy"}
            display={{base:"none" , lg:"block"}}
            w={{ base: "150px", md: "200px" }}
            h={{ base: "200px", md: "250px" }}
            src={HeroImg3}
            alt="Image 3"
            position="absolute"
            top={{ base: "50%", lg: "30%" }}
            left={{ base: "50%", lg: "25%" }}
            transform="translateX(-50%)"
            zIndex="1"
            className='img3'
          />
        </Box>
      </Flex>
    </Box>
  );
}

export default HeroSection;
