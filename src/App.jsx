import React, { useEffect } from 'react'
import AllRoutes from './Routes/AllRoutes'
import { Footer, Navbar } from './Layout'
import { Box } from '@chakra-ui/react'
import ScrollToTop from './Components/common/ScrollToTop'
import { PageTransition } from './Components/common'
import "./index.css"

const App = () => {
  // Light image protection — block right-click "Save image" on <img> only.
  // Leaves all other context menus, SEO, and accessibility untouched.
  useEffect(() => {
    const onContextMenu = (e) => {
      if (e.target && e.target.tagName === "IMG") e.preventDefault();
    };
    document.addEventListener("contextmenu", onContextMenu);
    return () => document.removeEventListener("contextmenu", onContextMenu);
  }, []);

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
