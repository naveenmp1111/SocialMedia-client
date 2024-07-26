export interface SignupUserInterface {
    name: string;
    username: string;
    email: string;
    password: string
}

export interface SignupUserResponse {
    message?: string,
    status: string
}

export interface UsernameAvailabilityResponse {
    available: boolean,
    status: string
}

export interface SendOtpResponse {
    status: string,
    message: string,
}

export interface VerifyOtpResponse {
    status: string,
    message: string,
}

export interface VerifyOtp {
    email: string,
    otp: number
}