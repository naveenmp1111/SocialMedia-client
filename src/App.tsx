import { Route, Routes } from 'react-router-dom'
import UserRoutes from './routes/userRoutes'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AdminRoutes from './routes/adminRoutes'
import useListenMessages from './hooks/useListenMessages'

function App() {
  // useListenMessages()
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
