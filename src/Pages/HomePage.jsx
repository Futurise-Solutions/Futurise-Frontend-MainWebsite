import React from 'react'
import { Aboutus, ClientsReviews, HeroSection, OurProjects, OurServices, Partners, WhyChooseUs } from '../Components'

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
    </div>
  )
}

export default HomePage