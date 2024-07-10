import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/loginUser";

interface AuthState {
    user: User | null;
    accessToken: string | null;
    isAuthenticated?: boolean;
}

const initialState: AuthState = {
    user: JSON.parse(localStorage.getItem('userData') as  string) || null,
    accessToken: localStorage.getItem('accessToken') || null,
    isAuthenticated: !!localStorage.getItem('accessToken')
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            // console.log('payloaddata', action.payload)
            const { user, accessToken } = action.payload
            state.user = user
            state.accessToken = accessToken
            state.isAuthenticated = true
            if (user && accessToken) {
                localStorage.setItem('accessToken', accessToken)
                localStorage.setItem('userData', JSON.stringify(user))
            }
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.accessToken = null;
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
        },
    }
})

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;