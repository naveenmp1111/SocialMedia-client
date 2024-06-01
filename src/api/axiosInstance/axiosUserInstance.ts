import axios from 'axios';
import CONSTANTS_COMMON from '../../constants/common';
import store from '../../redux/store';

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



export default axiosUserInstance