import axiosUserInstance from "../axiosInstance/axiosUserInstance";
import END_POINT from "../../constants/endpoints";

export const createPost=async(
    payload:{description:string,image:string}
)=>{
   const response=await axiosUserInstance.post(
    END_POINT.CREATE_POST,
    payload
   )
   return response.data
   
}

export const getPostsByUser=async(
    userId:string
)=>{
    const response=await axiosUserInstance.get(
        `${END_POINT.GET_POSTS_BY_USER}/${userId}`
    )
    console.log('response data is',response.data)
    return response.data
}

export const editPost=async(
    payload:{postId:string | undefined,description:string}
)=>{
    const response=await axiosUserInstance.post(
        END_POINT.EDIT_POST,
        payload
    )
    return response.data
}

export const getAllPosts=async()=>{
    const response=await axiosUserInstance.get(
        END_POINT.GET_ALL_POSTS
    )
    return response.data
}

export const deletePost=async(
    payload:string
)=>{
    const response=await axiosUserInstance.get(
        `${END_POINT.DELETE_POST}/${payload}`
    )
    return response.data
}