export interface  SignupUserInterface {
    name:string;
    username:string;
    email:string;
    password:string
}   

export interface SignupUserResponse {
    message?: string,
    status: string
}

export interface UsernameAvailabilityResponse {
    available: boolean,
    status: string
}