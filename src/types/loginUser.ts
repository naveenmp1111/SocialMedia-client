export interface LoginUserInterface{
    email:string;
    password:string;
}

export interface User{
    _id?:string;
    name:string;
    username:string;
    email:string;
    
}

export interface LoginUserResponse{
    message:string;
    status:string;
    user:User | null
}

export interface GoogleLoginInterface {
    name:string;
    email:string;
}
