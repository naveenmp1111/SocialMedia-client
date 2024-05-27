import {BrowserRouter,Route,Routes} from 'react-router-dom'
import UserRoutes from './routes/userRoutes'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<UserRoutes/>}/>
        </Routes>
      </BrowserRouter>
      <ToastContainer/>
    </>
  ) 
}

export default App
 