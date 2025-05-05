import type { ApiErrorResponse } from "@/types/axios";
import axios, { AxiosError, type AxiosResponse } from "axios";
import { toast } from "sonner";

const baseURL =
  import.meta.env.VITE_BASE_URL || "http://localhost:8800/api/logistics/v1";

type ApiError = AxiosError<ApiErrorResponse>;

export const axiosInstance = axios.create({
  baseURL,
});

let toastId: string | undefined;

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    if (config.showToast !== false) {
      toastId = toast.loading("Loading", {
        description: "Your request is being processed",
        id: "toast",
      }) as string;
    }

    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: ApiError) => {
    const config = error.config;

    if (config?.showToast !== false) {
      toast.error("Request error", {
        description: error?.response?.data?.message,
        id: toastId,
      });
    }

    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    const config = response.config;

    if (config.showToast !== false) {
      toast.success("Success", {
        id: toastId,
        description: response.data?.message,
      });
    }

    return response;
  },
  (error: ApiError) => {
    const config = error.config;

    if (config?.showToast !== false) {
      toast.error("Request Error", {
        id: toastId,
        description: error?.response?.data?.message,
      });
    }

    if (
      error.response?.status === 401 &&
      error.response?.data?.message === "Session expired. Please login again"
    ) {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
    }

    return Promise.reject(error);
  }
);
