import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/loginUser";

type Calltype=User & {
    type:string;
    callType:string;
    roomId:string;
}

interface AuthState {
    user: User | null;
    accessToken: string | null;
    isAuthenticated?: boolean;
    videoCall:Calltype | null;
    incomingVideoCall:Calltype | null;
    audioCall:Calltype | null;
    incomingAudioCall:Calltype | null;
}

const initialState: AuthState = {
    user: JSON.parse(localStorage.getItem('userData') as  string) || null,
    accessToken: localStorage.getItem('accessToken') || null,
    isAuthenticated: !!localStorage.getItem('accessToken'),
    videoCall:null,
    incomingVideoCall:null,
    audioCall:null,
    incomingAudioCall:null,
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
        setVideoCall:(state,action)=>{
            console.log('action is ',action)
            state.videoCall=action.payload
        },
        setIncomingVideoCall:(state,action)=>{
            state.incomingVideoCall=action.payload
        },
        setAudioCall:(state,action)=>{
            console.log('action is ',action)
            state.audioCall=action.payload
        },
        setIncomingAudioCall:(state,action)=>{
            console.log('incoming audio call data is ',action)
            state.incomingVideoCall=action.payload
        },
        endCall:(state)=>{
            state.videoCall=null
            state.incomingVideoCall=null
            state.audioCall=null
            state.incomingAudioCall=null
        }
    }
})

export const { setCredentials, logout,setVideoCall,setIncomingVideoCall,setAudioCall,setIncomingAudioCall,endCall } = authSlice.actions;
export default authSlice.reducer;