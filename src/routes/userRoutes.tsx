import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Signup from '../pages/Signup'
import Login from '../pages/Login'
import Home from '../pages/auth/HomePage'
import Loader from '../components/others/Loader';
import UserProfile from '../pages/auth/ProfilePage'
import PublicRoutes from '../components/PublicRoutes'
import PrivateRoutes from '../components/PrivateRoutes'
import EmailModal from '../modals/other/password/EmailModal'
import RequestModal from '../modals/home/RequestModal'
import ReportPost from '../modals/post/ReportPost'
import ChatPage from '../pages/auth/ChatPage'
import UserBlockProvision from '../modals/post/UserBlockProvision'
import SettingsModal from '../modals/home/SettingsModal'
import NewChatList from '../modals/chat/NewChatList'
import ExplorePage from '../pages/auth/ExplorePage'
import Room from '../components/auth/chat/Room'
// import SettingsModal from '../modals/home/SettingsModal'


const UserRoutes = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Navigate to='/home'/>}/>
        <Route path='/messages' element={<ChatPage/>}/>
        <Route path='/room/:roomId' element={<Room/>}/>
        <Route element={<PublicRoutes />}>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} /> 
        </Route>

        <Route element={<PrivateRoutes />}>
          <Route path='/home' element={<Home />} />
          <Route path='/profile/:username' element={<UserProfile />} />
          <Route path='/explore' element={<ExplorePage />} />
          {/* <Route path='/modal' element={<NewChatList isOpen={true} onClose={()=>{}}/>}/> */}
        </Route>

      </Routes>
    </>
  )
}

export default UserRoutes