import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Signup from '../pages/Signup'
import Login from '../pages/Login'
import Home from '../pages/auth/HomePage'
import Loader from '../components/others/Loader';
import UserProfile from '../pages/auth/ProfilePage'
import PublicRoutes from '../components/PublicRoutes'
import PrivateRoutes from '../components/PrivateRoutes'
import EditPost from '../modals/post/EditPost'
import ViewPostModal from '../modals/post/ViewPostModal'


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
          {/* <Route path='/viewPost' element={<EditPost isOpen={true} postEditModalOnClose={function (): void {
            throw new Error('Function not implemented.')
          } }/>}/> */}
        </Route>

      </Routes>
    </>
  )
}

export default UserRoutes