import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Apartment from './pages/Apartment'
import Residents from './pages/Residents'
import NotFound from './pages/NotFound'

function App() {
  return (
    <>
      {' '}
      <Routes>
        <Route path='/dispex' element={<Apartment />} />
        <Route path='/detail-apartment/:id' element={<Residents />} />
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
