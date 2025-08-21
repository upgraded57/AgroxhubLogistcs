import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./axiosInstance";

export const useGetProfile = (token: string) => {
  const getProfile = async () => {
    const res = await axiosInstance.get(`/profile`, { showToast: false });
    return res.data.user as User;
  };

  return useQuery({
    queryKey: ["Profile"],
    queryFn: getProfile,
    enabled: !!token,
    retry: 2,
  });
};

export const useUpdateAvatar = () => {
  return useMutation({
    mutationFn: (data: FormData) =>
      axiosInstance.patch("/profile/avatar", data),
  });
};

export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: (data: any) => axiosInstance.patch("/profile", data),
  });
};

export const useUpdateVisibilityStatus = () => {
  return useMutation({
    mutationFn: () => axiosInstance.patch("/profile/visibility"),
  });
};
