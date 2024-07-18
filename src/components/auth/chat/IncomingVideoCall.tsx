import React from 'react'
import { MdCallEnd } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from '../../../redux/store';
import { useSocket } from '../../../contexts/SocketContext';
import { endCall, setIncomingVideoCall, setRoomId, setShowVideoCall, setVideoCall } from '../../../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const IncomingVideoCall = () => {
    const { incomingVideoCall, roomId, showVideoCall } = useSelector((state: StoreType) => state.auth)
    const dispatch = useDispatch()
    const { socket } = useSocket()
    const navigate = useNavigate()

    const handleEndCall = () => {
        console.log('state of incoming video call just before emting ', incomingVideoCall)
        socket?.emit('reject-call', ({ to: incomingVideoCall?._id }))
        dispatch(endCall())
    }

    const handleAcceptCall = () => {
        dispatch(setVideoCall({
            type: "in-coming",
            ...incomingVideoCall
        }))
        socket?.emit('reject-call', ({ to: incomingVideoCall?._id }))
        socket?.emit('accept-incoming-call', ({ to: incomingVideoCall?._id, roomId: incomingVideoCall?.roomId }))


        // navigate(`/room/${incomingVideoCall?.roomId}`)
        dispatch(setRoomId(incomingVideoCall?.roomId))
        dispatch(setShowVideoCall(true))
    }

    return (
        <>
            <div className='w-full h-full flex justify-center items-center z-40 fixed top-1'>
                <div className='w-96 bg-cyan-950  z-40 rounded-xl flex flex-col items-center shadow-2xl shadow-black'>
                    <div className='flex flex-col gap-7 items-center'>
                    <span className='text-lg text-white  mt-4'>
                            {'Incoming video call'}
                        </span>
                        <span className='text-3xl text-white font-bold'>{incomingVideoCall?.name}</span>
                        
                    </div>
                    <div className='flex m-5'>
                        <img className='w-24 h-24 rounded-full' src={incomingVideoCall?.profilePic} alt='profile' />
                    </div>
                    <div className='flex m-2  mb-5 gap-7'>
                        
                        <div className='bg-green-500 w-12 h-12 text-white rounded-full flex justify-center items-center m-1 cursor-pointer'>
                            <MdCallEnd onClick={handleAcceptCall} className='text-3xl' />

                        </div>
                        <div className='bg-red-500 w-12 h-12 text-white rounded-full flex justify-center items-center m-1 cursor-pointer'>
                            <MdCallEnd onClick={handleEndCall} className='text-3xl' />

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default IncomingVideoCall