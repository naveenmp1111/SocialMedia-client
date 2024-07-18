import React, { useEffect } from 'react'
import { useSocket } from '../contexts/SocketContext'
import useConversation from '../zustand/useConversation'
import { useDispatch } from 'react-redux'
import { endCall, setIncomingAudioCall, setIncomingVideoCall, setRoomId, setShowVideoCall } from '../redux/authSlice'
import { useNavigate } from 'react-router-dom'

const useListenMessages = () => {
    const { socket } = useSocket()
    const navigate=useNavigate()
    const { messages, setMessages,setTypingUsers,removeTypingUser,selectedConversation,setUnreadMessages,unreadMessages } = useConversation()
    const dispatch=useDispatch()

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

        socket?.on('incoming-audio-call',(data)=>{
            dispatch(setIncomingAudioCall({...data.from,callType:data.callType,roomId:data.roomId}))
        })

        socket?.on('incoming-video-call',(data)=>{
            dispatch(setIncomingVideoCall({...data.from,callType:data.callType,roomId:data.roomId}))
        })

        socket?.on('call-rejected',()=>{
            dispatch(endCall())
        })

        socket?.on('accept-call',(data)=>{
            dispatch(setIncomingVideoCall(null))
            // navigate(`/room/${data.roomId}`)
            dispatch(setRoomId(data.roomId))
            dispatch(setShowVideoCall(true))
        })

        return () =>{ 
            console.log('cleaning up socket')
            socket?.off('newMessage'),
            socket?.off('TypingUsers'),
            socket?.off('RemoveTypingUser'),
            socket?.off('deleteMessage'),
            socket?.off('incoming-audio-call')
            socket?.off('incoming-video-call')
            socket?.off('call-rejected')
            socket?.off('accept-call')
    }

    }, [messages, setMessages, socket])
}

export default useListenMessages