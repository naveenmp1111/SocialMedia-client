import axiosUserInstance from "../axiosInstance/axiosUserInstance";
import END_POINT from "../../constants/endpoints";
import { GetUsersResponse } from "../../types/admin";
import { EditProfileResponse, FollowUserResponse, GetFollowersResponse } from "../../types/userProfile";
import { SavedPostDataInterface } from "../../types/post";


export const getRestofAllUsers = async (): Promise<GetUsersResponse> => {
  const response = await axiosUserInstance.get<GetUsersResponse>(
    END_POINT.GET_REST_OF_ALL_USERS
  )
  return response.data
}

export const getSuggestedUsers = async (): Promise<GetUsersResponse> => {
  const response = await axiosUserInstance.get<GetUsersResponse>(
    END_POINT.GET_SUGGESTED_USERS
  )
  return response.data
}

export const followUser = async (
  payload: { friendUsername: string }
) => {
  const response = await axiosUserInstance.post<FollowUserResponse>(
    END_POINT.FOLLOW_USER,
    payload
  )
  return response.data
}

export const unfollowUser = async (
  payload: { friendUsername: string }
) => {
  const response = await axiosUserInstance.post<FollowUserResponse>(
    END_POINT.UNFOLLOW_USER,
    payload
  )
  return response.data
}

export const removeFollower = async (
  followerUsername: string
) => {
  const response = await axiosUserInstance.patch<FollowUserResponse>(
    `${END_POINT.REMOVE_FOLLOWER}/${followerUsername}`
  )
  return response.data
}

export const getFollowers = async (
  username: string
): Promise<GetFollowersResponse> => {
  const response = await axiosUserInstance.get<GetFollowersResponse>(
    `${END_POINT.GET_FOLLOWERS}/${username}`
  );
  return response.data;
};

export const getFollowing = async (
  username: string
): Promise<GetFollowersResponse> => {
  const response = await axiosUserInstance.get<GetFollowersResponse>(
    `${END_POINT.GET_FOLLOWING}/${username}`
  );
  return response.data;
};

export const getUserByUsername = async (
  username: string
): Promise<EditProfileResponse> => {
  const response = await axiosUserInstance.get<EditProfileResponse>(
    `${END_POINT.GET_USER_BY_USERNAME}/${username}`
  )

  return response.data
}

export const getRequests = async (
  username: string
): Promise<GetUsersResponse> => {
  const response = await axiosUserInstance.get<GetUsersResponse>(
    `${END_POINT.GET_REQUESTS}/${username}`
  )
  return response.data
}

export const acceptRequest = async (
  payload: { friendUsername: string }
): Promise<FollowUserResponse> => {
  const response = await axiosUserInstance.post<FollowUserResponse>(
    END_POINT.ACCEPT_REQUEST,
    payload
  )
  return response.data
}

export const declineRequest = async (
  friendUsername: string
): Promise<FollowUserResponse> => {
  const response = await axiosUserInstance.delete<FollowUserResponse>(
    `${END_POINT.DECLINE_REQUEST}/${friendUsername}`
  )
  return response.data
}

export const savePost = async (
  postId: string
) => {
  const response = await axiosUserInstance.patch(
    `${END_POINT.SAVE_POST}/${postId}`
  )
  return response.data
}

export const unsavePost = async (
  postId: string
) => {
  const response = await axiosUserInstance.patch(
    `${END_POINT.UNSAVE_POST}/${postId}`
  )
  return response.data
}

export const getSavedPost = async (): Promise<SavedPostDataInterface> => {
  const response = await axiosUserInstance.get<SavedPostDataInterface>(
    END_POINT.GET_SAVED_POSTS
  )
  return response.data
}

export const getTaggedPosts = async (username: string): Promise<SavedPostDataInterface> => {
  const response = await axiosUserInstance.get<SavedPostDataInterface>(
    `${END_POINT.GET_TAGGED_POSTS}/${username}`
  )
  return response.data
}

export const cancelRequest = async (
  friendUsername: string
) => {
  const response = await axiosUserInstance.patch(
    `${END_POINT.CANCEL_REQUEST}/${friendUsername}`
  )
  return response.data
}

export const blockUserByUsername = async (
  username: string
) => {
  const response = await axiosUserInstance.patch(
    `${END_POINT.BLOCK_USER_BY_USERNAME}/${username}`
  )
  return response.data
}

export const unblockUserByUsername = async (
  username: string
) => {
  const response = await axiosUserInstance.patch(
    `${END_POINT.UNBLOCK_USER_BY_USERNAME}/${username}`
  )
  return response.data
}


export const getBlockedUsers = async (): Promise<GetUsersResponse> => {
  const response = await axiosUserInstance.get<GetUsersResponse>(
    END_POINT.GET_BLOCKED_USERS
  )
  return response.data
}