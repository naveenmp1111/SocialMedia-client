import axios from "axios";
import CONSTANTS_COMMON from "../../constants/common";


const axiosAdminInstance = axios.create({
  baseURL: CONSTANTS_COMMON.API_BASE_URL,
  withCredentials: true,
});

export const axiosAdminRefreshInstance = axios.create({
  baseURL: CONSTANTS_COMMON.API_BASE_URL,
  withCredentials: true,
});

export default axiosAdminInstance