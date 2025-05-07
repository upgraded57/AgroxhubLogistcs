import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./axiosInstance";

export const useGetAllRegions = () => {
  const getAllRegions = async () => {
    const res = await axiosInstance.get("/regions/all", { showToast: false });
    return res.data.regions as Region[];
  };

  return useQuery({
    queryKey: ["Regions"],
    queryFn: getAllRegions,
  });
};

export const useGetServiceRegions = () => {
  const geServiceRegions = async () => {
    const res = await axiosInstance.get("/regions/service", {
      showToast: false,
    });
    return res.data.regions as ServiceRegion[];
  };

  return useQuery({
    queryKey: ["ServiceRegions"],
    queryFn: geServiceRegions,
  });
};

export const useUpdateServiceRegions = () => {
  return useMutation({
    mutationFn: (data: string[]) =>
      axiosInstance.patch("/regions/service", { regionIds: data }),
  });
};
