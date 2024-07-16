import React from 'react'
import { MdCallEnd } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from '../../../redux/store';
import { useSocket } from '../../../contexts/SocketContext';
import { endCall, setIncomingVideoCall, setVideoCall } from '../../../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const IncomingVideoCall = () => {
    const {incomingVideoCall}=useSelector((state:StoreType)=>state.auth)
    const dispatch=useDispatch()
    const {socket}=useSocket()
    const navigate=useNavigate()

    const handleEndCall=()=>{
        console.log('state of incoming video call just before emting ',incomingVideoCall)
        socket?.emit('reject-call',({to:incomingVideoCall?._id}))
        dispatch(endCall())
    }

    const handleAcceptCall=()=>{
        dispatch(setVideoCall({
            type:"in-coming",
            ...incomingVideoCall
        }))
        socket?.emit('reject-call',({to:incomingVideoCall?._id}))
        socket?.emit('accept-incoming-call',({to:incomingVideoCall?._id,roomId:incomingVideoCall?.roomId}))
        
        
        navigate(`/room/${incomingVideoCall?.roomId}`)
    }

    return (
        <>
            <div className='w-full h-full flex justify-center items-center z-40 fixed top-10'>
                <div className='w-20 h-20 bg-red-600  z-40 '>
                    <div className='flex flex-col gap-3 items-center'>
                        <span className='text-3xl text-white'>{incomingVideoCall?.name}</span>
                        {/* <span className='text-lg text-white'>
                            {callAccepted && data.type != 'video' ? "ongoing" : "calling"}
                        </span> */}
                    </div>
                        <div className='flex'>
                            <img className='w-14 h-14 rounded-full' src={incomingVideoCall?.profilePic} alt='profile' />
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

export default IncomingVideoCall