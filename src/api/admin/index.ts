import axiosAdminInstance from "../axiosInstance/axiosAdminInstance";
import END_POINT from "../../constants/endpoints";
import { BlockUserResponse, GetUsersResponse } from "../../types/admin";


export const getAllUsers=async():Promise<GetUsersResponse>=>{
    const response=await  axiosAdminInstance.get<GetUsersResponse>(
        END_POINT.GET_USERS_FOR_ADMIN
      )
      return response.data
}

export const blockUser=async(userId:string):Promise<BlockUserResponse>=>{
    const response=await axiosAdminInstance.patch<BlockUserResponse>(
        `${END_POINT.BLOCK_USER}/${userId}`
    )
    return response.data
}

export const unblockUser=async(userId:string):Promise<BlockUserResponse>=>{
    const response=await axiosAdminInstance.patch<BlockUserResponse>(
        `${END_POINT.UNBLOCK_USER}/${userId}`
    )
    return response.data
}
