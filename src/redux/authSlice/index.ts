import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/loginUser";

const RoomId = localStorage.getItem('roomId')
const ShowVideoCall = localStorage.getItem('ShowVideoCall')

export type Calltype = User & {
    type: string;
    callType: string;
    roomId: string;
}

interface AuthState {
    user: User | null;
    accessToken: string | null;
    isAuthenticated?: boolean;
    videoCall: Calltype | null;
    incomingVideoCall: Calltype | null;
    audioCall: Calltype | null;
    incomingAudioCall: Calltype | null;
    showVideoCall: Boolean;
    roomId: string | null;
}

const initialState: AuthState = {
    user: JSON.parse(localStorage.getItem('userData') as string) || null,
    accessToken: localStorage.getItem('accessToken') || null,
    isAuthenticated: !!localStorage.getItem('accessToken'),
    videoCall: null,
    incomingVideoCall: JSON.parse(localStorage.getItem('IncomingVideoCall') as string) || null,
    audioCall: null,
    incomingAudioCall: null,
    showVideoCall: ShowVideoCall ? true : false,
    roomId: RoomId || null,
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
        setVideoCall: (state, action) => {
            // console.log('action is ',action)
            state.videoCall = action.payload
        },
        setIncomingVideoCall: (state, action) => {
            // console.log('actionData is ',action)
            state.incomingVideoCall = action.payload
            if (action.payload) {
                localStorage.setItem('IncomingVideoCall', JSON.stringify(action.payload))
            } else {
                localStorage.removeItem('IncomingVideoCall')
            }

        },
        setAudioCall: (state, action) => {
            state.audioCall = action.payload
        },
        setIncomingAudioCall: (state, action) => {
            state.incomingAudioCall = action.payload
        },
        endCall: (state) => {
            state.videoCall = null
            state.incomingVideoCall = null
            state.audioCall = null
            state.incomingAudioCall = null
            localStorage.removeItem('IncomingVideoCall')
        },
        setShowVideoCall: (state, action) => {
            state.showVideoCall = action.payload
            if (action.payload) {
                localStorage.setItem('ShowVideoCall', 'true')
            } else {
                localStorage.removeItem('ShowVideoCall')
            }
        },
        setRoomId: (state, action) => {
            state.roomId = action.payload
            if (action.payload) {
                localStorage.setItem('roomId', action.payload)
            } else {
                localStorage.removeItem('roomId')
            }
        }
    }
})

export const { setCredentials, logout, setVideoCall, setIncomingVideoCall, setAudioCall, setIncomingAudioCall, endCall, setShowVideoCall, setRoomId } = authSlice.actions;
export default authSlice.reducer;