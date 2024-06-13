import React from 'react'
import { UseSelector,useDispatch, useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import { StoreType } from '../redux/store';

const PublicRoutes = () => {
    const isAuthenticated=useSelector((state:StoreType)=>state.auth.isAuthenticated)
    const isAdminAuthenticated=useSelector((state:StoreType)=>state.admin.isAuthenticated)
    console.log('isAdminAuthenticated',isAdminAuthenticated)

    if(isAuthenticated){
       return <Navigate to='/home'/>
    }else if(isAdminAuthenticated){
      return <Navigate to='/admin/dashboard'/>
    }


  return <Outlet/>
}

export default PublicRoutes
