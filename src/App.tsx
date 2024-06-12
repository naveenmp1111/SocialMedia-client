import { Route, Routes } from 'react-router-dom'
import UserRoutes from './routes/userRoutes'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AdminRoutes from './routes/adminRoutes'

function App() {

  return (
    <>
      
        <Routes>
          <Route path='/*' element={<UserRoutes />} />
          <Route path='/admin/*' element={<AdminRoutes />} />
        </Routes>
        <ToastContainer />
      
    </>
  )
}

export default App
