import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector} from 'react-redux'
import { StoreType } from '../redux/store'
import LeftSideBar from './auth/LeftSideBar'

const PrivateRoutes = () => {

    const isAuthenticated=useSelector((state:StoreType)=>state.auth.isAuthenticated)

    if(isAuthenticated){
        return (<>
            <LeftSideBar/>
            <div className="sm:ml-64">
                  <Outlet />
                </div>
            </>)
    }
   return <Navigate to='/login'/>
}

export default PrivateRoutes