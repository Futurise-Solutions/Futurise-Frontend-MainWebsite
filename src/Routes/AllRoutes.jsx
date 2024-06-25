import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Contactus, HomePage } from '../Pages'

const AllRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/contact' element={<Contactus/>}/>

        </Routes>
    </div>
  )
}

export default AllRoutes