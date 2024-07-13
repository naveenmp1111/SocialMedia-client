import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { StoreType } from '../redux/store'
import LeftSideBar from './auth/leftSideBar/LeftSideBar'
import Searchbar from './auth/Searchbar'

const PrivateRoutes = () => {

    const isAuthenticated = useSelector((state: StoreType) => state.auth.isAuthenticated)
    const {videoCall}=useSelector((state:StoreType)=>state.auth)
  
       

    if (isAuthenticated) {
        return (<>
         
         
            <div className='custom-size:px-28 md:pt-20 pt-10 bg-gray-200 h-fit min-h-screen'>
                
                <Searchbar/>
              
                <LeftSideBar />

                <div className="md:ml-64">
                    <Outlet />
                </div>
            </div>
        </>)
    }
    return <Navigate to='/login' />
}

export default PrivateRoutes