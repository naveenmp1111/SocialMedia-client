import axios from 'axios';
import CONSTANTS_COMMON from '../../constants/common';

const axiosUserInstance=axios.create({
    baseURL:CONSTANTS_COMMON.API_BASE_URL,
    withCredentials:true
})

export const axiosRefreshInstance=axios.create({
    baseURL:CONSTANTS_COMMON.API_BASE_URL,
    withCredentials:true
})

export default axiosUserInstance