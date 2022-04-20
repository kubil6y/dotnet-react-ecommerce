import axios, { AxiosResponse, AxiosError } from "axios";
import { toast } from "react-toastify";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (err: AxiosError) => {
    const { data, status } = err.response!;

    switch (status) {
      case 400:
        // for validation errors
        if (data?.errors) {
          const modelStateErrors: string[] = Object.values(
            data.errors
          ).flat() as string[];

          throw modelStateErrors;
        }

        toast.error(data.title);
        break;

      case 401:
        toast.error(data.title);
        break;

      case 500:
        toast.error(data.title);
        break;

      default:
        break;
    }

    // this makes handling errors much easier
    // instead of "err?.response" checks now we can use "err"
    return Promise.reject(err.response);
  }
);
