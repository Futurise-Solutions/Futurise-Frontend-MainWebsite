import { Box, Image } from '@chakra-ui/react'
import React from 'react'
import Marquee from 'react-fast-marquee'
import { partners } from '../../utils/Constant'
import { CustomText } from '../../utils/Texts'

const Partners = () => {
  return (
    <Box mb={"5rem"}>
      <CustomText
        variant="heading"
        children={"Our Clients"}
        styles={{ zIndex: 1000 ,textAlign:"center"}}
      />
      <Marquee  speed={100}>
          {partners.map((item, index) => (
            <Box key={index}>
              <Box key={index}   ml={{base:"2rem",md:"2rem",lg:"3rem"}} >
                <Image src={item.img} alt="logo" w={"10rem"} h={'2rem'} />
              </Box>
            </Box>
          ))}
        </Marquee>

    </Box>
  )
}

export default Partners