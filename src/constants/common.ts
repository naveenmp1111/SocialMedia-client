import { ToastOptions } from 'react-toastify'

const CONSTANTS_COMMON = {
  API_BASE_URL: 'http://localhost:3000/'
  // API_BASE_URL:import.meta.env.BASE_URL
}

export const TOAST_ACTION: ToastOptions = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};

export default CONSTANTS_COMMON

