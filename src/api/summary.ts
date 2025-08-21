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

export const useGetOrdersSummary = () => {
  const getOrdersSummary = async () => {
    const res = await axiosInstance.get("summary/orders", { showToast: false });
    return res.data.summary as OrdersSummary[];
  };

  return useQuery({
    queryKey: ["Summary", "Orders"],
    queryFn: getOrdersSummary,
  });
};

export const useGetEarningsSummary = () => {
  const getEarningsSummary = async () => {
    const res = await axiosInstance.get("summary/earnings", {
      showToast: false,
    });
    return res.data.summary as OrdersSummary[];
  };

  return useQuery({
    queryKey: ["Summary", "Earnings"],
    queryFn: getEarningsSummary,
  });
};
