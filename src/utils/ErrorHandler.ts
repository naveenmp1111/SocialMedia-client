// errorHandler.ts
import { toast } from 'react-toastify';
import axios, { AxiosError } from 'axios';

export const handleAxiosErrorHelper = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    console.log("inside axios error");

    const axiosError = error as AxiosError<any>;
    console.log("axiosError ", axiosError);

    if (
      axiosError.response &&
      axiosError.response.data &&
      axiosError.response.data.message
    ) {
      const backendError = axiosError.response.data.message;
      toast.dismiss();
      toast.error(backendError);
    } else {
      toast.error("An unexpected error occurred");
    }
  } else {
    toast.error("An unknown error occurred");
  }
};