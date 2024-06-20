import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Signup from '../pages/Signup'
import Login from '../pages/Login'
import Home from '../pages/auth/HomePage'
import Loader from '../components/others/Loader';
import UserProfile from '../pages/auth/ProfilePage'
import PublicRoutes from '../components/PublicRoutes'
import PrivateRoutes from '../components/PrivateRoutes'
import EmailModal from '../modals/other/password/EmailModal'
import RequestModal from '../modals/home/RequestModal'
import ReportPost from '../modals/post/ReportPost'
// import SettingsModal from '../modals/home/SettingsModal'


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
          <Route path='/profile/:username' element={<UserProfile />} />
          {/* <Route path='/modal' element={<ReportPost isOpen={true} onClose={()=>{}}/>}/> */}
        </Route>

      </Routes>
    </>
  )
}

export default UserRoutes