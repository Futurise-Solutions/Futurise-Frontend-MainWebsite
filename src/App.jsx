import React from 'react'
import AllRoutes from './Routes/AllRoutes'
import { Footer, Navbar } from './Layout'
import { Box } from '@chakra-ui/react'
import { MaintenancePage } from './Pages'
import "./index.css"

// ============================================
// MAINTENANCE MODE TOGGLE
// Set to true to show maintenance page
// Set to false to show normal application
// ============================================
const MAINTENANCE_MODE = true;

const App = () => {
  sessionStorage.setItem("userActive", "user is active")
  
  // Show maintenance page if MAINTENANCE_MODE is true
  if (MAINTENANCE_MODE) {
    return (
      <Box id='app'>
        <MaintenancePage />
      </Box>
    )
  }
  
  // Normal application
  return (
    <Box id='app'>
      <Navbar />
      <AllRoutes />
      <Footer />
    </Box>
  )
}

export default App
