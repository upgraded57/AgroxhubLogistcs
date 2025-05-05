import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./axiosInstance";

export const useGetProfile = (id: string) => {
  const getProfile = async () => {
    const res = await axiosInstance.get(`/profile/${id}`, { showToast: false });
    return res.data.user as User;
  };

  return useQuery({
    queryKey: ["Profile", id],
    queryFn: getProfile,
    enabled: !!id,
  });
};
