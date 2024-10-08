import { useEffect } from 'react'
import { useSocket } from '../contexts/SocketContext'
import useConversation from '../zustand/useConversation'
import { useDispatch } from 'react-redux'
import { endCall, setIncomingAudioCall, setIncomingVideoCall, setRoomId, setShowVideoCall } from '../redux/authSlice'

const useListenMessages = () => {
    const { socket } = useSocket()
    const { addNotification, messages, setMessages, setTypingUsers, removeTypingUser, selectedConversation, addUnreadMessage, setReload } = useConversation()
    const dispatch = useDispatch()

    useEffect(() => {
        socket?.on('newMessage', (newMessage) => {
            console.log('newMessage arrived is ', newMessage)
            if (!selectedConversation || selectedConversation && selectedConversation._id as string != newMessage.chatId as unknown as string) {
                // setUnreadMessages([...unreadMessages, newMessage])
                addUnreadMessage(newMessage)
            }
            if (newMessage.chatId._id == selectedConversation?._id)
                setMessages([...messages, newMessage])
            setReload()
        })

        socket?.on('deleteMessage', (messageId) => {
            let updatedMessages = messages.filter(item => item._id != messageId)
            setMessages(updatedMessages);
        })

        socket?.on('TypingUsers', (userId) => {
            setTypingUsers(userId)
        })

        socket?.on('RemoveTypingUser', (userId) => {
            removeTypingUser(userId)
        })

        socket?.on('incoming-audio-call', (data) => {
            dispatch(setIncomingAudioCall({ ...data.from, callType: data.callType, roomId: data.roomId }))
        })

        socket?.on('incoming-video-call', (data) => {
            dispatch(setIncomingVideoCall({ ...data.from, callType: data.callType, roomId: data.roomId }))
        })

        socket?.on('call-rejected', () => {
            dispatch(endCall())
        })

        socket?.on('accept-call', (data) => {
            dispatch(setIncomingVideoCall(null))
            dispatch(setRoomId(data.roomId))
            dispatch(setShowVideoCall(true))
        })

        socket?.on('notification', (data) => {
            addNotification(data)
        })

        return () => {
            // console.log('cleaning up socket')
            socket?.off('newMessage'),
                socket?.off('TypingUsers'),
                socket?.off('RemoveTypingUser'),
                socket?.off('deleteMessage'),
                socket?.off('incoming-audio-call')
            socket?.off('incoming-video-call')
            socket?.off('call-rejected')
            socket?.off('accept-call'),
                socket?.off('notification')
        }

    }, [messages, setMessages, socket])
}

export default useListenMessages