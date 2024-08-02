import { Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from '../pages/admin/Dashboard';
import Userslist from '../pages/admin/Userslist';
import AdminPrivateRoutes from '../components/AdminPrivateRoutes';
import ReportManagement from '../pages/admin/ReportManagement';



const AdminRoutes = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Navigate to='/admin/dashboard' />} />

        <Route element={<AdminPrivateRoutes />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/users-list' element={<Userslist />} />
          <Route path='/report-management' element={<ReportManagement />} />
        </Route>

      </Routes>
    </>
  )
}

export default AdminRoutes