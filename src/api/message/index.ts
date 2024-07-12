import END_POINT from "../../constants/endpoints"
import { GetAllMessagesFromChatResponse, MessageInterface, SingleMessageFromChat } from "../../types/message"
import axiosUserInstance from "../axiosInstance/axiosUserInstance"

export const getFullMessagesFromChat=async(
    payload:{chatId:string}
):Promise<GetAllMessagesFromChatResponse>=>{
    const response=await axiosUserInstance.post(
        END_POINT.GET_FULL_MESSAGES_FROM_CHAT,
        payload
    )
    return response.data
}

export const getUnreadMessagesFromChat=async(
    payload:{chatId:string}
):Promise<GetAllMessagesFromChatResponse>=>{
    const response=await axiosUserInstance.post(
        END_POINT.GET_UNREAD_MESSAGES_FROM_CHAT,
        payload
    )
    return response.data
} 

export const getAllUnreadMessages=async():Promise<GetAllMessagesFromChatResponse>=>{
    const response=await axiosUserInstance.get(
        END_POINT.GET_ALL_UNREAD_MESSAGES
    )
    return response.data
} 

export const setUnreadMessagesRead=async(
    payload:{chatId:string}
)=>{
    const response=await axiosUserInstance.patch(
        END_POINT.SET_UNREAD_MESSAGES_READ,
        payload
    )
}

export const sendMessage=async(
    payload:{chatId:string,message:string}
):Promise<SingleMessageFromChat>=>{
    const response=await axiosUserInstance.post<SingleMessageFromChat>(
        END_POINT.SEND_MESSAGE,
        payload
    )
    // console.log('sendMessageREsponse ',response.data)
    return response.data
}

export const deleteMessage=async(
    payload:{messageId:string}
)=>{
    const response=await axiosUserInstance.patch(
        END_POINT.DELETE_MESSAGE,
        payload
    )
    // console.log(response.data)
}

export const deleteMessageForMe=async(
    payload:{messageId:string}
)=>{
    const response=await axiosUserInstance.patch(
        END_POINT.DELETE_MESSAGE_FOR_ME,
        payload
    )
    // console.log('response from deletemessage for me',response.data)
}

