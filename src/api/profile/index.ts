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
   return response.data
}