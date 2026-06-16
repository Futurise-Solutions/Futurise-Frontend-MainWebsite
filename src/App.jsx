import React, { useEffect, lazy, Suspense } from 'react'
import { useLocation } from 'react-router-dom'
import AllRoutes from './Routes/AllRoutes'
import { Footer, Navbar } from './Layout'
import { Box } from '@chakra-ui/react'
import ScrollToTop from './Components/common/ScrollToTop'
import { PageTransition } from './Components/common'
import BookingModal from './Components/common/BookingModal'
import { BookingProvider } from './context/BookingContext'
import "./index.css"

// Chat widget — lazy so it stays out of the initial bundle and crawlable DOM.
const ChatBubble = lazy(() => import('./Components/Chatbot/ChatBubble'))

const App = () => {
  // Admin dashboard renders without the public navbar/footer/booking popup.
  const isAdmin = useLocation().pathname.toLowerCase().startsWith('/futurise-admin')
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
    <BookingProvider>
      <Box id='app' minH="100vh" display="flex" flexDirection="column">
        <ScrollToTop />
        {!isAdmin && <Navbar />}
        <Box as="main" flex="1">
          <PageTransition>
            <AllRoutes />
          </PageTransition>
        </Box>
        {!isAdmin && <Footer />}
        {!isAdmin && <BookingModal />}
        {!isAdmin && (
          <Suspense fallback={null}>
            <ChatBubble />
          </Suspense>
        )}
      </Box>
    </BookingProvider>
  )
}

export default App
