import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "./axiosInstance";

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      axiosInstance.post("/auth/login", data),
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: { name: string; email: string; password: string }) =>
      axiosInstance.post("/auth/register", data),
  });
};

export const useActivateAccount = () => {
  return useMutation({
    mutationFn: (token: string) =>
      axiosInstance.post("/auth/activate-account", { token }),
  });
};

export const useResendActivationLink = () => {
  return useMutation({
    mutationFn: (token: string) =>
      axiosInstance.post("/auth/resend-token", { token }),
  });
};
