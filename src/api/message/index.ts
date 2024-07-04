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

export const sendMessage=async(
    payload:{chatId:string,message:string}
):Promise<SingleMessageFromChat>=>{
    const response=await axiosUserInstance.post<SingleMessageFromChat>(
        END_POINT.SEND_MESSAGE,
        payload
    )
    console.log('sendMessageREsponse ',response.data)
    return response.data
}