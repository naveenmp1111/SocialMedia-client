import {User} from './loginUser'

export interface GetUsersResponse {
    status: string,
    message: string,
    users: User[],
}

export interface BlockUserResponse{
    status:string,
    message:string
}

