import React from 'react'
import AllRoutes from './Routes/AllRoutes'
import { Footer, Navbar } from './Layout'
import { Box } from '@chakra-ui/react'
import "./index.css"


const App = () => {
  return (
    <Box id='app'>
      <Navbar />
      <AllRoutes />
      <Footer />
    </Box>
  )
}

export default App
