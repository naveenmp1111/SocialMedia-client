import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { StoreType } from '../redux/store'
import LeftSideBar from './auth/leftSideBar/LeftSideBar'
import Searchbar from './auth/Searchbar'
import AdminLeftSideBar from './admin/AdminLeftSideBar'

const AdminPrivateRoutes = () => {

    const isAdminAuthenticated = useSelector((state: StoreType) => state.admin.isAuthenticated)

    if (isAdminAuthenticated) {
        return (<>
            <div className='custom-size:px-28 md:pt-16 pt-10 pb-5 bg-gray-200 h-fit min-h-screen'>
                
                <AdminLeftSideBar/>

                <div className="md:ml-56">
                    <Outlet />
                </div>
            </div>
        </>)
    }
    return <Navigate to='/login' />
}

export default AdminPrivateRoutes