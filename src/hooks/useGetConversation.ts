import { useState, useEffect } from 'react'
import { fetchChats } from '../api/chat'
import { ChatInterface } from '../types/chat'
import useConversation from '../zustand/useConversation'
const useGetConversations = () => {
    const [chats, setChats] = useState<ChatInterface[]>([])
    const { reload } = useConversation()
    useEffect(() => {
        const getConversations = async () => {
            try {
                const response = await fetchChats()
                setChats(response?.chats)
            } catch (error) {
                console.log('error in getting conversation in hooks ', error)
            }
        }
        getConversations()
    }, [reload])


    return { chats }
}

export default useGetConversations