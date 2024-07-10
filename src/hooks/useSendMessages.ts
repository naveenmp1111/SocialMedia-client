import { sendMessage } from "../api/message";
import useConversation from "../zustand/useConversation"

const useSendMessage=()=>{

    const {messages,setMessages,selectedConversation}=useConversation()

    const sendmessage=async(message:string)=>{
        // console.log('message to be sent id ',message)
        const response=await sendMessage({ chatId: selectedConversation?._id as string, message  });
        setMessages([...messages,response.message])
    }

    return{
        sendmessage
    }

}

export default useSendMessage