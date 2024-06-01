import { User } from "./loginUser";

export interface EditProfileResponse {
    status: string,
    message: string,
    user: User
}