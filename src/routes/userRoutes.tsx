import { Routes, Route, Navigate } from 'react-router-dom'
import Signup from '../pages/Signup'
import Login from '../pages/Login'
import Home from '../pages/auth/HomePage'
import UserProfile from '../pages/auth/ProfilePage'
import PublicRoutes from '../components/PublicRoutes'
import PrivateRoutes from '../components/PrivateRoutes'
import ChatPage from '../pages/auth/ChatPage'
import ExplorePage from '../pages/auth/ExplorePage'
import Room from '../components/auth/chat/Room'


const UserRoutes = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Navigate to='/home' />} />
        <Route path='/messages' element={<ChatPage />} />
        <Route path='/room/:roomId' element={<Room />} />
        <Route element={<PublicRoutes />}>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
        </Route>

        <Route element={<PrivateRoutes />}>
          <Route path='/home' element={<Home />} />
          <Route path='/profile/:username' element={<UserProfile />} />
          <Route path='/explore' element={<ExplorePage />} />
        </Route>

      </Routes>
    </>
  )
}

export default UserRoutes