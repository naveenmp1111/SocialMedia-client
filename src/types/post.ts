import { User } from "./loginUser";
import { Notification } from "../zustand/useConversation";

export interface PostDataInterface {
    _id: string,
    userId: string,
    description?: string,
    likes?: string[],
    user: User
    image: string[],
    isBlock: boolean,
    updatedAt: string,
    createdAt: string,
}

export interface SavedPostDataInterface {
    status: string,
    message: string,
    posts: PostDataInterface[]
}

export interface CommentInterface {
    _id: string,
    postId: string,
    comment: string,
    createdAt: Date,
    updatedAt: Date,
    parentId: string,
    user?: {
        _id: string,
        name: string,
        username: string,
        profilePic: string,
    }
}

export interface GetNotifications {
    status: string,
    message: string,
    notifications: Notification[]
}

