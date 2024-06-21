import React from 'react'
import { AppDevelopment, BlockchainDevelopment, DigitalMarketing, SmartContract, UIUXDevelopment, WebDevelopment } from '../../assests'
import { Box, Grid, GridItem, Image } from '@chakra-ui/react'
import { CustomText } from '../../utils/Texts'

// ****************OUR SERVICES DATA ****************
const OurServiceData = [
  {
    image: AppDevelopment,
    serviceName: "App Development",
    serviceDesc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore quibusdam molestiae explicabo."
  },
  {
    image: DigitalMarketing,
    serviceName: "Digital Marketing",
    serviceDesc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore quibusdam molestiae explicabo."
  },
  {
    image: WebDevelopment,
    serviceName: "Web Development",
    serviceDesc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore quibusdam molestiae explicabo."
  },
  {
    image: BlockchainDevelopment,
    serviceName: "Blockchain Development",
    serviceDesc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore quibusdam molestiae explicabo."
  },
  {
    image: UIUXDevelopment,
    serviceName: "Ui-Ux Development",
    serviceDesc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore quibusdam molestiae explicabo."
  },
  {
    image: SmartContract,
    serviceName: "Smart Contract",
    serviceDesc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore quibusdam molestiae explicabo."
  },
]
const OurServices = () => {
  return (
    <Box
      // border={"1px solid red"}
      py={"10rem"} w={"90%"} m={"auto"} position={"relative"} overflow={"hidden"}>

      {/* BOX FOR GLOW EFFECT  */}
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
        // border={"1px solid red"}
        display={{ base: "none", sm: "none", md: "block", lg: "block" }}
      ></Box>

      <Grid gridTemplateColumns={{ base: "repeat(1,1fr)", md: "repeat(2,1fr)", lg: "repeat(3,1fr)" }} gap={"1.5rem"} >
        {
          OurServiceData.map((el) => (
            <GridItem bg={"linear-gradient(147.75deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)"} borderRadius={"1rem"} pb={"1rem"}>
              {/* *******IMAGE ********* */}
              <Image src={el.image} py={"0.5rem"} px={"0.5rem"} w={"100%"} />
              {/* *******SERVICE NAME ****** */}
              <CustomText variant='subheading2' styles={{ textAlign: "center", color: "rgba(255, 255, 255, 1)", paddingTop: "1rem" }}>{el.serviceName}</CustomText>
              {/* *******SERVICE DESC ****** */}
              <CustomText variant='subheading3' styles={{ textAlign: "center", color: "rgba(255, 255, 255, 1)", paddingTop: "1rem", paddingLeft: "12px", paddingRight: "12px" }}>{el.serviceDesc}</CustomText>
            </GridItem>
          ))
        }
      </Grid>

    </Box>
  )
}

export default OurServices