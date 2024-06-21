import { Box, Flex, Image } from '@chakra-ui/react'
import React from 'react'
import { HeroImg1, HeroImg2, HeroImg3, HeroSectionBg } from '../../assests'
import { CustomText } from '../../utils/Texts'
import { CustomButton } from '../../utils/Buttons'

const HeroSection = () => {
  return (
    <Box backgroundImage={`url(${HeroSectionBg})`} h={{ base: "20rem", md: "30rem", lg: "50rem" }} bgRepeat={"no-repeat"} backgroundSize={"cover"} opacity={1}>

      <Flex w={"90%"} m={"auto"} gap={"10%"} >
        {/* FLEX BOX 1 **************** */}
        <Box w={"45%"} h={"500px"} border={"1px solid red"} >
          <CustomText variant='subheading6' styles={{fontFamily:"Oxanium"}}>Mobile App & Web Development Company</CustomText>

          <CustomText variant='subheading7' styles={{fontFamily:"Oxanium",color:"#07ABE8",marginTop:"1rem",marginBottom:"1rem"}}>We shape your ideas into creativity </CustomText>
          <CustomText variant='subheading1' styles={{fontFamily:"Oxanium"}}>Your ideas, our Innovation, a journey to success together.</CustomText>


          <CustomButton variant='primary' text={"Know More"} />
        </Box>
        {/* Flex BOX 2********** */}
        <Box w={"45%"} h={"500px"} border={"1px solid red"}>
          <Image
            src={HeroImg1}
            alt="Image 1"
            position="absolute"
            top="5%"
            left="82%"
            transform="translateX(-50%)"
            zIndex="3"
          // border={"1px solid red"}
          />
          <Image
            src={HeroImg2}
            alt="Image 2"
            position="absolute"
            top="3%"
            left="75%"
            transform="translateX(-50%)"
            zIndex="2"
          />
          <Image
            src={HeroImg3}
            alt="Image 3"
            position="absolute"
            top="5%"
            left="68%"
            transform="translateX(-50%)"
            zIndex="1"
          />
        </Box>
      </Flex>

    </Box>
  )
}

export default HeroSection