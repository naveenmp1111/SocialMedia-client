import axiosUserInstance from "../axiosInstance/axiosUserInstance";
import END_POINT from "../../constants/endpoints";
import { GetNotifications } from "../../types/post";

export const getNotifications = async ():Promise<GetNotifications> => {
    const response = await axiosUserInstance.get<GetNotifications>(
        END_POINT.GET_NOTIFICATIONS
    )
    console.log('notifications are ',response.data)
    return response.data

}

export const readNotifications=async()=>{
    const response=await axiosUserInstance.patch(
        END_POINT.READ_NOTIFICATIONS
    )
    return response.data
}