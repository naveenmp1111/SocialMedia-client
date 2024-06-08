import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Loader from '../components/others/Loader';

import PrivateRoutes from '../components/PrivateRoutes'
import Dashboard from '../pages/admin/Dashboard';
import Userslist from '../pages/admin/Userslist';



const AdminRoutes = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Navigate to='/admin/dashboard'/>}/>
        
        {/* <Route element={<AdminPrivateRoutes />}> */}
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/users-list' element={<Userslist />} />
        {/* </Route> */}

      </Routes>
    </>
  )
}

export default AdminRoutes