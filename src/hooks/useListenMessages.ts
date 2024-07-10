import React, { useEffect } from 'react'
import { useSocket } from '../contexts/SocketContext'
import useConversation from '../zustand/useConversation'
import { MessageInterface } from '../types/message'

const useListenMessages = () => {
    const { socket } = useSocket()
    const { messages, setMessages,setTypingUsers,removeTypingUser } = useConversation()

    useEffect(()=>{
        socket?.on('newMessage', (newMessage) => {
            // console.log('newmessage coming through socket is ',newMessage)
            setMessages([...messages, newMessage])
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
            socket?.off('newMessage'),
            socket?.off('TypingUsers'),
            socket?.off('RemoveTypingUser')
    }

    }, [messages, setMessages, socket])
}

export default useListenMessages