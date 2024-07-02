import React from 'react'
import { ChatInterface } from '../../../types/chat'
import { useSelector } from 'react-redux'
import { StoreType } from '../../../redux/store'

const Conversation = ({chat}:{chat:ChatInterface}) => {
    console.log('full chat data is ',chat)
    const userInRedux=useSelector((state:StoreType)=>state.auth.user)
    const friend=chat.members.find(item=>item._id!=userInRedux?._id)
    return (
        <>
            <div className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                    <img src={friend?.profilePic} alt="User Avatar" className="w-12 h-12 rounded-full" />
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