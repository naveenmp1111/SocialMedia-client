import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
    accessToken: string | null;
    isAuthenticated?: boolean;
}

const initialState: AuthState = {
    accessToken: localStorage.getItem('adminAccessToken') || null,
    isAuthenticated: !!localStorage.getItem('adminAccessToken')
}

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setAdminCredentials: (state, action) => {
            console.log('payloaddata', action.payload)
            const { accessToken } = action.payload
            state.accessToken = accessToken
            state.isAuthenticated = true
            if (accessToken) {
                localStorage.setItem('adminAccessToken', accessToken)
            }
        },
        adminLogout: (state) => {
            state.isAuthenticated = false;
            state.accessToken = null;
            localStorage.removeItem('adminAccessToken')
        },
    }
})

export const { setAdminCredentials, adminLogout } = adminSlice.actions;
export default adminSlice.reducer;