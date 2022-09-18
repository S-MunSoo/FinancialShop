import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignUp from '../components/signup/SignUp'
import SignIn from '../components/signin/SignIn'
import NavTop from '../components/NavTop'
import { CookiesProvider } from 'react-cookie'
import Products from '../pages/Products'
import Cart from '../pages/Cart'

const AppRouter = () => {
  return (
    <CookiesProvider>
      <NavTop />
      <Routes>
        <Route path='/' element={<Products />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
    </CookiesProvider>
  )
}

export default AppRouter
