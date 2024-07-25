import axiosAdminInstance from "../axiosInstance/axiosAdminInstance";
import END_POINT from "../../constants/endpoints";
import { BlockUserResponse, GetReportsResponse, GetUsersResponse } from "../../types/admin";
import { SavedPostDataInterface } from "../../types/post";


export const getAllUsers = async (): Promise<GetUsersResponse> => {
    const response = await axiosAdminInstance.get<GetUsersResponse>(
        END_POINT.GET_USERS_FOR_ADMIN
    )
    return response.data
}

export const blockUser = async (userId: string): Promise<BlockUserResponse> => {
    const response = await axiosAdminInstance.patch<BlockUserResponse>(
        `${END_POINT.BLOCK_USER}/${userId}`
    )
    return response.data
}

export const unblockUser = async (userId: string): Promise<BlockUserResponse> => {
    const response = await axiosAdminInstance.patch<BlockUserResponse>(
        `${END_POINT.UNBLOCK_USER}/${userId}`
    )
    return response.data
}
export const blockPost = async (postId: string): Promise<BlockUserResponse> => {
    const response = await axiosAdminInstance.patch<BlockUserResponse>(
        `${END_POINT.BLOCK_POST}/${postId}`
    )
    return response.data
}

export const unblockPost = async (postId: string): Promise<BlockUserResponse> => {
    const response = await axiosAdminInstance.patch<BlockUserResponse>(
        `${END_POINT.UNBLOCK_POST}/${postId}`
    )
    return response.data
}

export const getPostReports = async (): Promise<GetReportsResponse> => {
    const response = await axiosAdminInstance.get<GetReportsResponse>(
        END_POINT.GET_POST_REPORTS
    )
    return response.data
}

export const getWeeklyData = async () => {
    const response = await axiosAdminInstance.get(
        END_POINT.GET_WEEKLY_DATA
    )
    return response.data
}

export const getMonthlyData = async () => {
    const response = await axiosAdminInstance.get(
        END_POINT.GET_MONTHLY_DATA
    )
    return response.data
}

export const getYearlyData = async () => {
    const response = await axiosAdminInstance.get(
        END_POINT.GET_YEARLY_DATA
    )
    return response.data
}

export const getAllPostForAdmin = async (): Promise<SavedPostDataInterface> => {
    const response = await axiosAdminInstance.get<SavedPostDataInterface>(
        END_POINT.GET_ALL_POSTS_FOR_ADMIN
    )
    return response.data
}
