import React, { useEffect, useState } from 'react'
import { ChatInterface } from '../../../types/chat'
import { useSelector } from 'react-redux'
import { StoreType } from '../../../redux/store'
import useConversation from '../../../zustand/useConversation'
import { useSocket } from '../../../contexts/SocketContext'
import { User } from '../../../types/loginUser'
import { format, isToday } from 'date-fns';
import { getUnreadMessagesFromChat } from '../../../api/message'

const Conversation = ({ chat }: { chat: ChatInterface }) => {
    const userInRedux = useSelector((state: StoreType) => state.auth.user)
    const friend: User | undefined = chat.members.find(item => item._id !== userInRedux?._id)
    const { selectedConversation, setSelectedConversation,messages,selectedFriend} = useConversation()
    const isSelected = selectedConversation?._id === chat._id
    const { onlineUsers } = useSocket()
    const isOnline = friend && friend._id ? onlineUsers?.includes(friend?._id) : false;
    const [noOfUnreadMessages,setNoOfUnreadMessages]=useState(0)

    const truncateMessage = (message: string, wordLimit: number) => {
        const words = message.split('')
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join('') + '...'
        }
        return message
    }
    const truncatedMessage = truncateMessage(chat.latestMessage.message || '', 12)


    useEffect(()=>{
        // console.log('checking if its working properly')
        const getUnreadMessages=async()=>{
            // setNumberofUnreadMessages(-noOfUnreadMessages)
            const response=await getUnreadMessagesFromChat({chatId:chat._id})
            setNoOfUnreadMessages(response.messages.length)
        }
        getUnreadMessages()
    },[selectedConversation,messages])

    const handleSelectConversation=()=>{
        setSelectedConversation(chat)
    }

    console.log('chat is ',chat)

    const messageDate = new Date(chat.latestMessage.createdAt);
    const displayDate = isToday(messageDate) ? format(messageDate, 'p') : format(messageDate, 'P');

    return (
        <div
            onClick={handleSelectConversation}
            className={`flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md
                ${isSelected ? 'bg-gray-50' : ''}
            `}
        >
            <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                <img src={friend?.profilePic} alt="User Avatar" className="w-12 h-12 rounded-full" />
                {isOnline && (
                    <div className="relative -top-4 -right-8 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                )}
            </div>
            <div className="flex-1">
            <div className='flex justify-between'>
                <h2 className="text-lg font-semibold">{friend?.name}</h2>
               {(selectedConversation?._id != chat._id)&& noOfUnreadMessages>0 && <span className="flex items-center justify-center w-5 h-5 text-white bg-red-600 rounded-full">
                              {noOfUnreadMessages || ''}
                           </span>} 
                </div>
                <div className='flex justify-between'>
                <p className="text-gray-600 break-words">: {truncatedMessage}</p>
                <span className="text-gray-500 text-xs">{displayDate}</span>
                </div>
                
            </div>
        </div>
    )
}

export default Conversation
