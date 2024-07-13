import {useState} from 'react'
import { useSocket } from '../../../contexts/SocketContext'
import { useSelector,useDispatch } from 'react-redux'
import { StoreType } from '../../../redux/store'
import { MdCallEnd } from "react-icons/md";
import { endCall } from '../../../redux/authSlice';

const Container = ({data}:{data:any}) => {
    const {socket}=useSocket()
    const [callAccepted,setCallAccepted]=useState<boolean>(false)
    const {user}=useSelector((state:StoreType)=>state.auth)
    const dispatch=useDispatch()

    const handleEndCall=()=>{
      dispatch(endCall())
    }
    console.log('data is ',data)
  return (
    <div className=' w-full h-full bg-cyan-950 flex justify-center items-center z-50'>
      <div className='flex flex-col gap-3 items-center'>
            <span className='text-3xl text-white'>{data.name}</span>
            <span className='text-lg text-white'>
              {callAccepted && data.type != 'video' ? "ongoing" : "calling"}
            </span>
      </div>
      {!callAccepted && data.callType =='audio' && (
        <div className='flex'>
          <img className='w-14 h-14 rounded-full' src={data.profilePic} alt='profile'/>
        </div>
      )}
      <div className='bg-red-500 w-12 h-12 text-white rounded-full flex justify-center items-center m-1'>
      <MdCallEnd onClick={handleEndCall} className='text-3xl'/>

      </div>
    </div>
  )
}

export default Container