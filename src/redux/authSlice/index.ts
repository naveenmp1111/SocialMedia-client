import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/loginUser";
const userData=localStorage.getItem('userData')
const accessToken=localStorage.getItem('accessToken')
let user=null
if(userData){
   user= JSON.parse(userData)
}

interface AuthState {
    user: User | null; 
    accessToken: string | null;
    isAuthenticated?: boolean;
  }

  const initialState:AuthState={
    user:user?user.user:null,
    accessToken:accessToken?accessToken:null,
    isAuthenticated:!!accessToken
  }

const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        setCredentials:(state,action)=>{
            console.log('payloaddata',action.payload)
            const {user,accessToken}=action.payload
            state.user=user
            state.accessToken=accessToken
            state.isAuthenticated=true
            if(user && accessToken){
                localStorage.setItem('accessToken',accessToken)
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

export const {setCredentials } =authSlice.actions;
export default authSlice.reducer;