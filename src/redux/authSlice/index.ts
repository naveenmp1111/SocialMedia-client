import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/loginUser";
const userData=localStorage.getItem('userData')
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
    user:user?user:null,
    accessToken:null,
    isAuthenticated:false
  }

const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        setCredentials:(state,action)=>{
            // console.log('payload',action.payload)
            const user=action.payload
            // console.log('user',user)
            // const {user,accessToken}=action.payload
            state.user=user
            // state.accessToken=accessToken
            // state.isAuthenticated=true
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.accessToken = null; 
        },
    }
})

export const {setCredentials,logout} =authSlice.actions;
export default authSlice.reducer;