import React from 'react';
import { Box, Grid, GridItem, Image, Flex } from '@chakra-ui/react';
import { CustomText } from '../../utils/Texts';
import { InfoIcon } from '@chakra-ui/icons'; // Example icon, you can replace it with any icon you prefer
import { OurServiceData } from '../../utils/Constant';


const OurServices = () => {
  return (
    <Box
      py={"5rem"}
      w={"90%"}
      m={"auto"}
      position={"relative"}
      overflow={"hidden"}
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
        height={{ base: "400px", md: "350px", lg: "70%" }}
        bg="radial-gradient(50% 50% at 50% 50%, rgba(49, 129, 187, 0.4) 6.24%, rgba(38, 145, 223, 0) 100%)"
        display={{ base: "none", sm: "none", md: "block", lg: "block" }}
      ></Box>

      <Grid gridTemplateColumns={{ base: "repeat(1,1fr)", md: "repeat(2,1fr)", lg: "repeat(3,1fr)" }} gap={"1.5rem"} >
        {OurServiceData.map((el, index) => (
          <GridItem
            key={index}
            position="relative"
            bg={"linear-gradient(147.75deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)"}
            borderRadius={"1rem"}
            pb={"1rem"}
            overflow="hidden"
            _hover={{
              '& .overlay': {
                opacity: 1,
                visibility: 'visible',
              }
            }}
          >
            {/* Overlay */}
            <Flex
              className="overlay"
              position="absolute"
              top={0}
              left={0}
              width="100%"
              height="100%"
              bg="rgba(0, 0, 0, 0.7)"
              alignItems="center"
              justifyContent="center"
              opacity={0}
              visibility="hidden"
              transition="all 0.3s ease-in-out"
            >
              <InfoIcon w={10} h={10} color="white" />
            </Flex>

            {/* Image */}
            <Image src={el.image} py={"0.5rem"} px={"0.5rem"} w={"100%"} />
            {/* Service Name */}
            <CustomText variant='subheading2' styles={{ textAlign: "center", color: "rgba(255, 255, 255, 1)", paddingTop: "1rem" }}>{el.serviceName}</CustomText>
            {/* Service Desc */}
            <CustomText variant='subheading3' styles={{ textAlign: "center", color: "rgba(255, 255, 255, 1)", paddingTop: "1rem", paddingLeft: "12px", paddingRight: "12px" }}>{el.serviceDesc}</CustomText>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default OurServices;
