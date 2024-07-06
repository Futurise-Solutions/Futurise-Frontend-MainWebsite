import { Box } from '@chakra-ui/react'
import React from 'react'
import { AboutUsHeroBg } from '../../assests'

const AboutUsHero = () => {
  return (
    <Box backgroundImage={`url(${AboutUsHeroBg})`} w={"100%"} h={"50rem"}
    bgRepeat={"no-repeat"}
    backgroundSize={"cover"} mb={"1rem"}>
        Hello
    </Box>
  )
}

export default AboutUsHero