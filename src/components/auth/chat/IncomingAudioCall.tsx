import { useDispatch, useSelector } from 'react-redux'
import { StoreType } from '../../../redux/store'
import { MdCallEnd } from "react-icons/md";
import { endCall, setAudioCall, setIncomingAudioCall } from '../../../redux/authSlice';
import { useSocket } from '../../../contexts/SocketContext';

const IncomingAudioCall = () => {
    const { incomingAudioCall } = useSelector((state: StoreType) => state.auth)
    const dispatch = useDispatch()
    const { socket } = useSocket()

    const handleEndCall = () => {
        socket?.emit('reject-call', ({ to: incomingAudioCall?._id }))
        dispatch(endCall())
    }

    const handleAcceptCall = () => {
        dispatch(setAudioCall({
            type: "in-coming",
            ...incomingAudioCall
        }))
        socket?.emit('accept-incoming-call', ({ to: incomingAudioCall?._id }))
        dispatch(setIncomingAudioCall(null))


    }

    return (
        <>
            <div className='w-full h-full flex justify-center items-center z-50 fixed top-10'>
                <div className='w-20 h-20 bg-red-600  z-50 '>
                    <div className='flex flex-col gap-3 items-center'>
                        <span className='text-3xl text-white'>{incomingAudioCall?.name}</span>
                    </div>
                    <div className='flex'>
                        <img className='w-14 h-14 rounded-full' src={incomingAudioCall?.profilePic} alt='profile' />
                    </div>
                    <div className='bg-red-500 w-12 h-12 text-white rounded-full flex justify-center items-center m-1'>
                        <MdCallEnd onClick={handleEndCall} className='text-3xl' />

                    </div>
                    <div className='bg-green-500 w-12 h-12 text-white rounded-full flex justify-center items-center m-1'>
                        <MdCallEnd onClick={handleAcceptCall} className='text-3xl' />

                    </div>
                </div>
            </div>
        </>
    )
}

export default IncomingAudioCall