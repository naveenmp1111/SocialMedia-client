import { axiosRefreshInstance } from "../axiosInstance/axiosUserInstance";
import END_POINT from "../../constants/endpoints";

//importing types
import { SignupUserInterface, SignupUserResponse, UsernameAvailabilityResponse, SendOtpResponse, VerifyOtpResponse, VerifyOtp } from "../../types/signupUser";
import { GoogleLoginInterface, LoginUserInterface, LoginUserResponse } from "../../types/loginUser";


export const signupUser = async (
    payload: SignupUserInterface
): Promise<SignupUserResponse> => {
    const response = await axiosRefreshInstance.post<SignupUserResponse>(
        END_POINT.SIGNUP_USER,
        payload
    )
    return response.data
}

export const usernameAvailability = async (
    params: string
): Promise<UsernameAvailabilityResponse> => {
    const response = await axiosRefreshInstance.get<UsernameAvailabilityResponse>(
        `${END_POINT.USERNAME_AVAILABILITY}/${params}`
    )
    return response.data
}

export const emailAvailability = async (
    params: string
): Promise<UsernameAvailabilityResponse> => {
    const response = await axiosRefreshInstance.get<UsernameAvailabilityResponse>(
        `${END_POINT.EMAIL_AVAILBILITY}/${params}`
    )
    return response.data
}

export const loginUser = async (
    paload: LoginUserInterface
): Promise<LoginUserResponse> => {
    const response = await axiosRefreshInstance.post<LoginUserResponse>(
        `${END_POINT.LOGIN_USER}`,
        paload
    )
    return response.data
}

export const sendOtp = async (
    payload: { email: string, message?: string }
): Promise<SendOtpResponse> => {
    const response = await axiosRefreshInstance.post<SendOtpResponse>(
        END_POINT.SEND_OTP,
        payload
    )
    return response.data
}

export const verifyOtp = async (
    payload: VerifyOtp
): Promise<VerifyOtpResponse> => {
    const response = await axiosRefreshInstance.post<VerifyOtpResponse>(
        END_POINT.VERIFY_OTP,
        payload
    )
    return response.data
}

export const loginUsingGoogle = async (
    payload: GoogleLoginInterface
): Promise<LoginUserResponse> => {
    const response = await axiosRefreshInstance.post<LoginUserResponse>(
        END_POINT.LOGIN_GOOGLE,
        payload
    )
    return response.data
}

export const refreshAccessToken = async (): Promise<{ accessToken: string }> => {
    const response = await axiosRefreshInstance.get<{ accessToken: string }>(
        END_POINT.REFRESH_ACCESS_TOKEN,
        { withCredentials: true }
    )
    return response.data
}

export const resetPassword = async (
    payload: {
        email: string,
        password: string
    }
) => {
    const response = await axiosRefreshInstance.post<VerifyOtpResponse>(
        END_POINT.RESET_PASSWORD,
        payload
    )
    return response.data
}