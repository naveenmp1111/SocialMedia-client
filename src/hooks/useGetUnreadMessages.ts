import { getAllUnreadMessages } from "../api/message"
import useConversation from "../zustand/useConversation"
import { useEffect } from 'react'

const useGetUnreadMessages = () => {

    const { messages, setMessages, selectedConversation, setUnreadMessages, unreadMessages } = useConversation()
    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await getAllUnreadMessages()
                // console.log('unread message in usegetUnread messags is ',res.messages)
                setUnreadMessages(res.messages)
            } catch (error) {
                console.log('error in getting messages ', error)
            }
        }
        getMessages()
    }, [selectedConversation, setMessages, setUnreadMessages, messages])

    return { unreadMessages }
}
export default useGetUnreadMessages