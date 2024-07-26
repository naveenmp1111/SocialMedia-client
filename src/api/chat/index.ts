import END_POINT from "../../constants/endpoints"
import { FetchOtherUserChatResponse, FetchUserChatsResponse } from "../../types/chat"
import axiosUserInstance from "../axiosInstance/axiosUserInstance"

export const createOrAccessChat = async (
    payload: { otherUserId: string }
): Promise<FetchOtherUserChatResponse> => {
    const response = await axiosUserInstance.post<FetchOtherUserChatResponse>(
        END_POINT.CREATE_CHAT,
        payload
    )
    return response.data
}

export const fetchChats = async (): Promise<FetchUserChatsResponse> => {
    const response = await axiosUserInstance.get<FetchUserChatsResponse>(
        END_POINT.FETCH_CHATS
    )
    return response.data
}