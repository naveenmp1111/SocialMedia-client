import React from 'react'
import { ChatInterface } from '../../../types/chat'
import { useSelector } from 'react-redux'
import { StoreType } from '../../../redux/store'
import useConversation from '../../../zustand/useConversation'
import { useSocket } from '../../../contexts/SocketContext'
import { User } from '../../../types/loginUser'

const Conversation = ({chat}:{chat:ChatInterface}) => {
    // console.log('full chat data is ',chat)
    const userInRedux=useSelector((state:StoreType)=>state.auth.user)
    const friend: User | undefined=chat.members.find(item=>item._id!=userInRedux?._id)
    const {selectedConversation,setSelectedConversation,}=useConversation()
    const isSelected=selectedConversation?._id==chat._id
    const {onlineUsers}=useSocket()
    const isOnline = friend && friend._id ? onlineUsers?.includes(friend ?._id) : false;
    // console.log('users online are ',onlineUsers)
    // console.log('isonlinestatus of  ',friend?.name , isOnline)
    // console.log('checkin if the ids are equal',selectedConversation?._id,chat._id)
    return (
        <>
            <div onClick={()=>setSelectedConversation(chat)} className={`flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md
                ${isSelected ? 'bg-gray-50' : ''}
            `}>
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                    <img src={friend?.profilePic} alt="User Avatar" className="w-12 h-12 rounded-full" />
                    {isOnline && (
          <div className="relative -top-4 -right-8 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
        )}
                </div>
                <div className="flex-1">
                    <h2 className="text-lg font-semibold">{friend?.name}</h2>
                    <p className="text-gray-600"></p>
                </div>
            </div>
        </>
    )
}

export default Conversation