import axiosUserInstance from "../axiosInstance/axiosUserInstance";
import END_POINT from "../../constants/endpoints";
import { GetUsersResponse } from "../../types/admin";


export const getRestofAllUsers=async():Promise<GetUsersResponse>=>{
    const response=await axiosUserInstance.get<GetUsersResponse>(
        END_POINT.GET_REST_OF_ALL_USERS
    )
    console.log('getalluserresponse ',response.data)
    return response.data
}