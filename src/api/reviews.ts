import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./axiosInstance";

export const useGetReviews = () => {
  const getReviews = async () => {
    const res = await axiosInstance.get("reviews", { showToast: false });
    return {
      average: res.data.average as number,
      reviews: res.data.reviews as UserReview[],
    };
  };

  return useQuery({
    queryKey: ["Reviews"],
    queryFn: getReviews,
    retry: 2,
  });
};
