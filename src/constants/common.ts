import { ToastOptions } from 'react-toastify'

const CONSTANTS_COMMON = {
  // API_BASE_URL:'https://www.sickomode.online/'
  API_BASE_URL:'http://localhost:3000/'
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

