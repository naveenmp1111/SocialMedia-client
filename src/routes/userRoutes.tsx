import React from 'react'
import {Routes,Route, Navigate} from 'react-router-dom'
import Signup from '../pages/Signup'
import Login from '../pages/Login'
import Home from '../pages/Home'
import Loader from '../components/Loader';
import UserProfile from '../pages/UserProfile'


const UserRoutes = () => {
  return (
   <>
   <Routes>
      <Route path='/' element={<Navigate to='/signup' />}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/profile' element={<UserProfile/>}/>
   </Routes>
   </>
  )
}

export default UserRoutes