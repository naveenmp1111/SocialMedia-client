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
    
    {/* <div className='w-full h-full flex justify-center items-center z-50 fixed top-10'>
         <div className='w-20 h-20 bg-red-600  z-50 '></div>
         </div> */}
    
      
        <Routes>
          <Route path='/*' element={<UserRoutes />} />
          <Route path='/admin/*' element={<AdminRoutes />} />
        </Routes>
        <ToastContainer />
      
    </>
  )
}

export default App
