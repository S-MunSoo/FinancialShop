import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignUp from '../components/signup/SignUp'
import SignIn from '../components/signin/SignIn'

const AppRouter = () => {
  return (
    <Routes>
      <Route path='/signup' element={<SignUp />} />
      <Route path='/signin' element={<SignIn />} />
    </Routes>
  )
}

export default AppRouter
