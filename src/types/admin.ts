import { User } from './loginUser'
import { PostDataInterface } from './post'

export interface GetUsersResponse {
    status: string,
    message: string,
    users: User[],
}

export interface BlockUserResponse {
    status: string,
    message: string
}

export interface GetReportsResponse {
    status: string,
    message: string,
    reports: Report[]
}

export interface Report {
    count: number,
    post: PostDataInterface,
    reporters: SingleReport[]
}

export interface SingleReport {
    name: string,
    reason: string
}