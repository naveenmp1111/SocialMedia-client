import React, { useEffect } from 'react'
import { useSocket } from '../contexts/SocketContext'
import useConversation from '../zustand/useConversation'
import { MessageInterface } from '../types/message'

const useListenMessages = () => {
    const { socket } = useSocket()
    const { messages, setMessages,setTypingUsers,removeTypingUser,selectedConversation,setUnreadMessages,unreadMessages } = useConversation()

    useEffect(()=>{
        socket?.on('newMessage', (newMessage) => {
            // console.log('newmessage coming through socket is ',newMessage)
            // if(newMessage.chatId == selectedConversation?._id)
            setMessages([...messages, newMessage])
            if(!selectedConversation || selectedConversation && selectedConversation._id as string != newMessage.chatId as unknown as string){
                setUnreadMessages([...unreadMessages,newMessage])
            }
        })

        socket?.on('deleteMessage',(messageId)=>{
            let updatedMessages=messages.filter(item=>item._id!=messageId)
            setMessages(updatedMessages);
                
        })

        socket?.on('TypingUsers',(userId)=>{
            setTypingUsers(userId)
        })

        socket?.on('RemoveTypingUser',(userId)=>{
            removeTypingUser(userId)
        })

        return () =>{ 
            console.log('cleaning up socket')
            socket?.off('newMessage'),
            socket?.off('TypingUsers'),
            socket?.off('RemoveTypingUser'),
            socket?.off('deleteMessage')
    }

    }, [messages, setMessages, socket])
}

export default useListenMessages