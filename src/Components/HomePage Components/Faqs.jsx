import { Box } from '@chakra-ui/react'
import React from 'react'
import { CustomText } from '../../utils/Texts'

const Faqs = () => {
  return (
    <Box textAlign={"center"}>
          <CustomText
        variant="heading"
        children={"Frequently asked Questions"}
        styles={{ zIndex: 1000 }}
      />
      
    </Box>
  )
}

export default Faqs