import { useEffect } from 'react'
import Container from './Container'
import { useSelector } from 'react-redux'
import { StoreType } from '../../../redux/store'
import { useSocket } from '../../../contexts/SocketContext'

const VideoCall = () => {
  const { videoCall, user } = useSelector((state: StoreType) => state.auth)
  const { socket } = useSocket()

  useEffect(() => {
    if (videoCall?.type == 'out-going') {
      socket?.emit('outgoing-video-call', {
        to: videoCall._id,
        from: {
          _id: user?._id,
          profilePic: user?.profilePic,
          name: user?.name
        },
        callType: videoCall.callType,
        roomId: videoCall.roomId
      })
    }
  }, [videoCall])
  return (
    <Container data={videoCall} />
  )
}

export default VideoCall