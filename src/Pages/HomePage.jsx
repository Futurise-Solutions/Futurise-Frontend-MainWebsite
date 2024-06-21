import React from 'react'
import { Aboutus, ClientsReviews, HeroSection, OurProjects, OurServices, Partners, WhyChooseUs } from '../Components'
import Faqs from '../Components/HomePage Components/Faqs'
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
      <Faqs/>
    </Box>
  )
}

export default HomePage