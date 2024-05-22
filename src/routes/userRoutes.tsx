import React from 'react'
import {Routes,Route, Navigate} from 'react-router-dom'
import Signup from '../pages/signup/Signup'
import Login from '../pages/login/Login'


const UserRoutes = () => {
  return (
   <>
   <Routes>
      <Route path='/' element={<Navigate to='/signup' />}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
   </Routes>
   </>
  )
}

export default UserRoutes