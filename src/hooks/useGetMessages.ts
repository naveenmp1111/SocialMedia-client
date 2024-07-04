import { getFullMessagesFromChat } from "../api/message"
import useConversation from "../zustand/useConversation"
import {useEffect} from 'react'

const useGetMessages=()=>{

    const {messages,setMessages,selectedConversation}=useConversation()
    useEffect(()=>{
        const getMessages=async()=>{
            try {
                const res=await getFullMessagesFromChat({chatId:selectedConversation?._id as string})
                setMessages(res.messages)
            } catch (error) {
                console.log('error in getting messages ',error)
            }
        }
        if(selectedConversation?._id)getMessages()
    },[selectedConversation,setMessages])

    return {messages}
}
export default useGetMessages