import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./axiosInstance";

export const useGetDeliverables = () => {
  const getDeliverables = async () => {
    const res = await axiosInstance.get("/deliverables", { showToast: false });
    return res.data.deliverables as Deliverable[];
  };

  return useQuery({
    queryKey: ["Deliverables"],
    queryFn: getDeliverables,
  });
};

export const useGetAllCategories = () => {
  const getAllcatCgories = async () => {
    const res = await axiosInstance.get("/deliverables/all", {
      showToast: false,
    });
    return res.data.categories as Category[];
  };

  return useQuery({
    queryKey: ["Categories"],
    queryFn: getAllcatCgories,
  });
};

export const useUpdateDeliverables = () => {
  return useMutation({
    mutationFn: (data: { id: string; name: string; unitCost: number }[]) =>
      axiosInstance.patch("/deliverables", data),
  });
};
