import { useEffect } from 'react'
import Container from './Container'
import { useSelector } from 'react-redux'
import { StoreType } from '../../../redux/store'
import { useSocket } from '../../../contexts/SocketContext'

const AudioCall = () => {
  const { audioCall, user } = useSelector((state: StoreType) => state.auth)
  const { socket } = useSocket()

  useEffect(() => {
    if (audioCall?.type == 'out-going') {
      socket?.emit('outgoing-audio-call', {
        to: audioCall._id,
        from: {
          _id: user?._id,
          profilePic: user?.profilePic,
          name: user?.name
        },
        callType: audioCall.callType,
        roomId: audioCall.roomId
      })
    }
  }, [audioCall])

  return (
    <Container data={audioCall} />
  )
}

export default AudioCall