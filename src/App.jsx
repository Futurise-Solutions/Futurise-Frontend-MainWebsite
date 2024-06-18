import React from 'react'
import AllRoutes from './Routes/AllRoutes'
import { Footer, Navbar } from './Layout'

const App = () => {
  return (
    <div>
      <Navbar />
      <AllRoutes />
      <Footer />
    </div>
  )
}

export default App