import { Box } from '@chakra-ui/react'
import React from 'react'
import { AboutUsHero, MissionVision } from '../Components'
import { CustomText } from '../utils/Texts'
import { CustomButton } from '../utils/Buttons'
import TechnologyExcellence from '../Components/ContactCusCpmponents/TechnologyExcellence'

const AboutUs = () => {
  return (
    <Box>
        <AboutUsHero />
        <Box mt={"5rem"} py={12} bg={"#2C3A4780"} textAlign={"center"} className="contact">
        <CustomText variant="callout4">{"LET’S DISCUSS YOUR IDEA"}</CustomText>
        <CustomText variant="callout3">
          {
            "Get a free consultation and let us know your vision to pivot it into a unique digital creation."
          }
        </CustomText>
        <CustomButton text={"Connect With Us"} px={20}></CustomButton>
      </Box>
        <MissionVision/>
        <TechnologyExcellence/>
    </Box>
  )
}

export default AboutUs