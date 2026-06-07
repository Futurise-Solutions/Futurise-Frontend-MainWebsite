import React from 'react'
import AllRoutes from './Routes/AllRoutes'
import { Footer, Navbar } from './Layout'
import { Box } from '@chakra-ui/react'
import ScrollToTop from './Components/common/ScrollToTop'
import { PageTransition } from './Components/common'
import "./index.css"

const App = () => {
  return (
    <Box id='app' minH="100vh" display="flex" flexDirection="column">
      <ScrollToTop />
      <Navbar />
      <Box as="main" flex="1">
        <PageTransition>
          <AllRoutes />
        </PageTransition>
      </Box>
      <Footer />
    </Box>
  )
}

export default App
