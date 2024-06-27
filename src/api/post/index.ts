import axiosUserInstance from "../axiosInstance/axiosUserInstance";
import END_POINT from "../../constants/endpoints";

export const createPost = async (
    payload: { description: string, image: string }
) => {
    const response = await axiosUserInstance.post(
        END_POINT.CREATE_POST,
        payload
    )
    return response.data

}

export const getPostsByUser = async (
    username: string
) => {
    const response = await axiosUserInstance.get(
        `${END_POINT.GET_POSTS_BY_USER}/${username}`
    )
    console.log('response data of posts by user ',response.data)
    return response.data
}

export const editPost = async (
    payload: { postId: string | undefined, description: string }
) => {
    const response = await axiosUserInstance.post(
        END_POINT.EDIT_POST,
        payload
    )
    return response.data
}

export const getAllPosts = async () => {
    const response = await axiosUserInstance.get(
        END_POINT.GET_ALL_POSTS
    )
    // console.log('post data in api call ',response.data)
    return response.data
}

export const deletePost = async (
    payload: string
) => {
    const response = await axiosUserInstance.get(
        `${END_POINT.DELETE_POST}/${payload}`
    )
    return response.data
}

export const reportPost = async (
    payload: { postId: string; reason: string }
) => {
    const response = await axiosUserInstance.post(
        END_POINT.REPORT_POST,
        payload
    )
    return response.data
}

export const likePost = async (
    postId: string
) => {
    const response = await axiosUserInstance.patch(
        `${END_POINT.LIKE_POST}/${postId}`
    )
    return response.data
}

export const unlikePost = async (
    postId: string
) => {
    const response = await axiosUserInstance.patch(
        `${END_POINT.UNLIKE_POST}/${postId}`
    )
    return response.data
}

export const addComment = async (
    payload: {
        postId: string,
        comment: string
    }
) => {
    const response = await axiosUserInstance.post(
        END_POINT.ADD_COMMENT,
        payload
    )
    return response.data
}

export const getComments=async(
    postId:string
)=>{
    const response=await axiosUserInstance.get(
        `${END_POINT.GET_COMMENTS}/${postId}`
    )
    return response.data
}

export const addReply=async(
    payload:{
        postId:string,
        parentId:string,
        comment:string
    })=>{
        const response=await axiosUserInstance.post(
            END_POINT.ADD_REPLY,
            payload
        )
        return response.data
    }
