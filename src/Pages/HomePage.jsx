import React from 'react'
import { Aboutus, ClientsReviews, HeroSection, OurProjects, OurServices, Partners, WhyChooseUs } from '../Components'
import Faqs from '../Components/HomePage Components/Faqs'

const HomePage = () => {
  return (
    <div>
      <HeroSection/>
      <Aboutus/>
      <OurServices/>
      <OurProjects/>
      <WhyChooseUs/>
      <ClientsReviews/>
      <Partners/>
      <Faqs/>
    </div>
  )
}

export default HomePage