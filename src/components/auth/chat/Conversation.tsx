import React from 'react'
import { ChatInterface } from '../../../types/chat'

const Conversation = ({chat}:{chat:ChatInterface}) => {
    return (
        <>
            <div className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                    <img src={chat.members[1].profilePic} alt="User Avatar" className="w-12 h-12 rounded-full" />
                </div>
                <div className="flex-1">
                    <h2 className="text-lg font-semibold">{chat?.members[1].name}</h2>
                    <p className="text-gray-600"></p>
                </div>
            </div>
        </>
    )
}

export default Conversation