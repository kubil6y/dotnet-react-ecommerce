import axios, { AxiosResponse, AxiosError } from "axios";
import { toast } from "react-toastify";
import { history } from "../../index";
import { PaginatedResponse } from "../models";

const SLEEP_TIME = 500;
const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  async (response: AxiosResponse) => {
    await sleep(SLEEP_TIME); // TODO
    const pagination = response.headers["pagination"]; // lowercase pagination!

    if (pagination) {
      response.data = new PaginatedResponse(
        response.data,
        JSON.parse(pagination)
      );
    }
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
        history.push({
          pathname: "/server-error",
          state: { error: data },
        });
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
