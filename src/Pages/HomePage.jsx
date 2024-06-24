import React, { useEffect, useState } from 'react'
import { Aboutus, ClientsReviews, HeroSection, OurProjects, OurServices, Partners, WhyChooseUs } from '../Components'
import Faqs from '../Components/HomePage Components/Faqs'
import { Box } from '@chakra-ui/react'
import LoadingIndicator from '../Components/LoadingComponent/LoadingIndicator'

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for 2 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
  }, []);
  return (
    <Box>
       {isLoading && <LoadingIndicator />}
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