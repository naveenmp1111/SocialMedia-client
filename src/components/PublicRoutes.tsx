import React from 'react'
import { UseSelector,useDispatch, useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import { StoreType } from '../redux/store';

const PublicRoutes = () => {
    const isAuthenticated=useSelector((state:StoreType)=>state.auth.isAuthenticated)

    // if(isAuthenticated){
    //    return <Navigate to='/home'/>
    // }


  return <Outlet/>
}

export default PublicRoutes
