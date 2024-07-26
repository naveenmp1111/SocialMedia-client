import { Route, Routes } from 'react-router-dom'
import UserRoutes from './routes/userRoutes'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AdminRoutes from './routes/adminRoutes'
import { useSelector } from 'react-redux'
import { StoreType } from './redux/store'
import IncomingAudioCall from './components/auth/chat/IncomingAudioCall'
import IncomingVideoCall from './components/auth/chat/IncomingVideoCall'
import Room from './components/auth/chat/Room'
import VideoCall from './components/auth/chat/VideoCall'
import AudioCall from './components/auth/chat/AudioCall'

function App() {
  const { incomingAudioCall, incomingVideoCall, showVideoCall, videoCall, audioCall } = useSelector((state: StoreType) => state.auth)
  return (
    <>

      {showVideoCall && <Room />}
      {!showVideoCall && videoCall && <VideoCall />}
      {!showVideoCall && audioCall && <AudioCall />}
      {incomingAudioCall && <IncomingAudioCall />}
      {!showVideoCall && incomingVideoCall && <IncomingVideoCall />}

      {!showVideoCall && <>
        <Routes>
          <Route path='/*' element={<UserRoutes />} />
          <Route path='/admin/*' element={<AdminRoutes />} />
        </Routes>
        <ToastContainer />
      </>}


    </>
  )
}

export default App
