import axiosUserInstance from "../axiosInstance/axiosUserInstance";
import END_POINT from "../../constants/endpoints";
import { User } from "../../types/loginUser";
import { EditProfileResponse } from "../../types/userProfile";

export const editProfile=async(
    userInfo:User
):Promise<EditProfileResponse>=>{
   const response=await axiosUserInstance.post<EditProfileResponse>(
     END_POINT.EDIT_PROFILE,
     userInfo
   )
   console.log('response from edit ',response.data)
   return response.data
}

export const getUserById=async(
  userId:string
):Promise<EditProfileResponse>=>{
  const response=await axiosUserInstance.get<EditProfileResponse>(
      `${END_POINT.GET_USER_BY_ID}/${userId}`
  )
  
  return response.data
}