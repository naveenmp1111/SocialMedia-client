import { User } from "./loginUser";

export interface EditProfileResponse {
    status: string,
    message: string,
    user: User
}

export interface FollowUserResponse{
    status:string,
    message:string
}

export interface FollowerData{
    name:string,
    username:string,
    profilePic:string
    _id:string
}

export interface GetFollowersResponse{
    status:string,
    message:string,
    users:FollowerData[]
}