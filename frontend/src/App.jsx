import React from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Cart from './pages/Cart/Cart'
import Placeorder from './pages/PlaceOrder/Placeorder'
import Home from './pages/Home/Home'

const App = () => {
  return (
    <div className='app'>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/order' element={<Placeorder />} />
        <Route />
      </Routes>
    </div>
  )
}

export default App
