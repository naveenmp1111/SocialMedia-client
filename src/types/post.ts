import { User } from "./loginUser";

export interface PostDataInterface {
    _id: string,
    userId: string,
    description?: string,
    // hashtags?: string,
    // hashtagsArray?: string[],
    likes?: string[],
    // comments?: string[],
    // saved?: string[],
    // reports?: string[],
    user:User
    image: string[] ,
    isBlock: boolean,
    updatedAt: string,
    createdAt: string,
}