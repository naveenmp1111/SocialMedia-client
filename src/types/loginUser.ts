export interface LoginUserInterface{
    email:string;
    password:string;
}

export interface User{
    _id?:string;
    name:string;
    username:string;
    email:string;
    phoneNumber?: number;
    profilePic?: string;
    bio?: string;
    followers?: string[];
    following?: string[];
    savedPosts?: string[];
    isAccountVerified?: boolean;
    isGoogleSignIn?: boolean;
    isBlock?: boolean;
    role?:string,
    requests?:string[],
    isPrivate?:boolean
}

export interface LoginUserResponse{
    message:string;
    status:string;
    user:User | null;
    token:string;
}

export interface GoogleLoginInterface {
    name:string;
    email:string;
}
