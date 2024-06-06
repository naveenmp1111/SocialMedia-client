import axios from 'axios';
import CONSTANTS_COMMON from '../../constants/common';
import store from '../../redux/store';
import { setCredentials,logout } from '../../redux/authSlice';
import { refreshAccessToken } from '../auth';
import {toast} from 'react-toastify'



const axiosUserInstance=axios.create({
    baseURL:CONSTANTS_COMMON.API_BASE_URL,
    withCredentials:true
})

export const axiosRefreshInstance=axios.create({
    baseURL:CONSTANTS_COMMON.API_BASE_URL,
    withCredentials:true
})

axiosUserInstance.interceptors.request.use(
    (config) => {
      const { accessToken } = store.getState().auth;
      if (accessToken) {
        config.headers.authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosUserInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
  
      if (error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true; // Prevents infinite loop
        if (error.response.data.message === "User is blocked") {
          await logout();
          toast.dismiss();
          toast.error("Your account has been blocked. Please contact admin.");
          store.dispatch(logout());
          return Promise.reject(error);
        }
  
        try {
          const { user } = store.getState().auth
          const { accessToken } = await refreshAccessToken();
          store.dispatch(setCredentials({ accessToken,user }));
          originalRequest.headers.authorization = `Bearer ${accessToken}`;
          return axiosUserInstance(originalRequest);
        } catch (refreshError) {
          // console.log('refresh error id ',refreshError)
          store.dispatch(logout())
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  );
  


export default axiosUserInstance