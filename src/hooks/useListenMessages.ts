import React, { useEffect } from 'react'
import { useSocket } from '../contexts/SocketContext'
import useConversation from '../zustand/useConversation'

const useListenMessages = () => {
    const { socket } = useSocket()
    const { messages, setMessages } = useConversation()

    useEffect(()=>{
        socket?.on('newMessage', (newMessage) => {
            console.log('newmessage coming through socket is ',newMessage)
            setMessages([...messages, newMessage])
        })

        return () =>{ socket?.off('newMessage')}

    }, [messages, setMessages, socket])
}

export default useListenMessages