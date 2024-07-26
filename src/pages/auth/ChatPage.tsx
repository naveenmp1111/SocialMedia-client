import { useSelector } from 'react-redux'
import { StoreType } from '../../redux/store'
import { Navigate } from 'react-router-dom'
import Chat from '../../components/auth/chat'

const ChatPage = () => {
  const isAuthenticated = useSelector((state: StoreType) => state.auth.isAuthenticated)

  if (isAuthenticated) {
    return (<>
      <Chat />
    </>)
  }
  return <Navigate to='/login' />

}

export default ChatPage