import END_POINT from "../../constants/endpoints"
import { FetchUserChatsResponse} from "../../types/chat"
import axiosUserInstance from "../axiosInstance/axiosUserInstance"

export const createOrAccessChat=async(
   payload:{otherUserId:string}
)=>{
    const response=await axiosUserInstance.post(
        END_POINT.CREATE_CHAT,
        payload
    )
    console.log('create chat response is ',response.data)
    return response.data
}


export const fetchChats=async():Promise<FetchUserChatsResponse>=>{
    const response=await axiosUserInstance.get<FetchUserChatsResponse>(
        END_POINT.FETCH_CHATS
    )
    console.log('fetchChats response is ',response.data)
    return response.data
}