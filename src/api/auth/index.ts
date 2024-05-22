import axiosUserInstance,{axiosRefreshInstance} from "../axiosInstance/axiosUserInstance";
import END_POINT from "../../constants/endpoints";

//importing types
import { SignupUserInterface,SignupUserResponse,UsernameAvailabilityResponse } from "../../types/signupUser";


export const signupUser=async(
    payload:SignupUserInterface 
):Promise<SignupUserResponse>=>{
    const response=await axiosRefreshInstance.post<SignupUserResponse>(
        END_POINT.SIGNUP_USER,
        payload
    )
    return response.data
}

export const usernameAvailability=async(
    params:string
):Promise<UsernameAvailabilityResponse>=>{
    const response=await axiosRefreshInstance.get<UsernameAvailabilityResponse>(
    `${END_POINT.USERNAME_AVAILABILITY}/${params}`
    )
    return response.data
}

export const emailAvailability=async(
    params:string
):Promise<UsernameAvailabilityResponse>=>{
    const response=await axiosRefreshInstance.get<UsernameAvailabilityResponse>(
        `${END_POINT.EMAIL_AVAILBILITY}/${params}`
    )
    return response.data
}