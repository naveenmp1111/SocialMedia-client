import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Signup from '../pages/Signup'
import Login from '../pages/Login'
import Home from '../pages/Home'
import Loader from '../components/Loader';
import UserProfile from '../pages/UserProfile'
import PublicRoutes from '../components/PublicRoutes'
import PrivateRoutes from '../components/PrivateRoutes'
import EditProfile from '../modals/EditProfile'


const UserRoutes = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Navigate to='/home'/>}/>
        <Route element={<PublicRoutes />}>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
        </Route>

        <Route element={<PrivateRoutes />}>
          <Route path='/home' element={<Home />} />
          <Route path='/profile' element={<UserProfile />} />
        </Route>

      </Routes>
    </>
  )
}

export default UserRoutes