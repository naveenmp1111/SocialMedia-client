import axios from "axios";
import CONSTANTS_COMMON from "../../constants/common";
import { refreshAccessToken } from "../auth";
import { adminLogout, setAdminCredentials } from "../../redux/adminSlice";
import { handleAxiosErrorHelper } from "../../utils/ErrorHandler";
import store from "../../redux/store";
import { toast } from 'react-toastify'


const axiosAdminInstance = axios.create({
  baseURL: CONSTANTS_COMMON.API_BASE_URL,
  withCredentials: true,
});

export const axiosAdminRefreshInstance = axios.create({
  baseURL: CONSTANTS_COMMON.API_BASE_URL,
  withCredentials: true,
});

axiosAdminInstance.interceptors.request.use(
  (config) => {
    const { accessToken } = store.getState().admin;
    if (accessToken) {
      config.headers.authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosAdminInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // console.log('error message from interceptor',error.message)
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Prevents infinite loop
      if (error.response.data.message === "User is blocked") {
        toast.dismiss();
        toast.error("Your account has been blocked. Please contact admin.");
        store.dispatch(adminLogout());
        return Promise.reject(error);
      }

      try {
        const { user } = store.getState().auth
        const { accessToken } = await refreshAccessToken();
        store.dispatch(setAdminCredentials({ accessToken, user }));
        originalRequest.headers.authorization = `Bearer ${accessToken}`;
        return axiosAdminInstance(originalRequest);
      } catch (refreshError) {
        toast.error('refresh token expired')
        store.dispatch(adminLogout())
        return Promise.reject(refreshError);
      }
    }
    handleAxiosErrorHelper(error)
    return Promise.reject(error);
  }
);

export default axiosAdminInstance