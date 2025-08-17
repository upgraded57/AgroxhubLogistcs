import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./axiosInstance";

export const useGetSummary = () => {
  const getSummary = async () => {
    const res = await axiosInstance.get("summary", { showToast: false });
    return res.data.summary as Summary;
  };

  return useQuery({
    queryKey: ["Summary"],
    queryFn: getSummary,
  });
};
