import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./axiosInstance";

export const useGetReviews = () => {
  const getReviews = async () => {
    const res = await axiosInstance.get("reviews", { showToast: false });
    return res.data.reviews as Review[];
  };

  return useQuery({
    queryKey: ["Reviews"],
    queryFn: getReviews,
  });
};
