import React from 'react'
import { Aboutus, ClientsReviews,  HeroSection,  OurProjects, OurServices, Partners, WhyChooseUs } from '../Components'
import { Box } from '@chakra-ui/react'

const HomePage = () => {
  return (
    <Box>
      <HeroSection/>
      <Aboutus/>
      <OurServices/>
      <OurProjects/>
      <WhyChooseUs/>
      <ClientsReviews/>
      <Partners/>
    </Box>
  )
}

export default HomePage