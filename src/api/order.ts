import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./axiosInstance";
type GetOrdersParams = {
  status?: string;
};

export const useGetOrders = (params?: GetOrdersParams) => {
  const getOrders = async () => {
    const res = await axiosInstance.get("/orders", {
      showToast: false,
      params,
    });
    return res.data.orders as Order[];
  };
  return useQuery({
    queryKey: ["Orders", params],
    queryFn: getOrders,
    retry: 2,
  });
};

export const useGetSingleOrder = (orderId: string) => {
  const getOrders = async () => {
    const res = await axiosInstance.get(`/orders/${orderId}`, {
      showToast: false,
    });
    return res.data.order as Order;
  };
  return useQuery({
    queryKey: ["Orders", orderId],
    queryFn: getOrders,
    retry: 2,
  });
};

export const useUpdateOrderDates = () => {
  return useMutation({
    mutationFn: (data: {
      orderId: string;
      type: "pickup" | "delivery";
      date: string;
    }) =>
      axiosInstance.patch(`/orders/${data.orderId}`, {
        type: data.type,
        date: data.date,
      }),
  });
};

export const useTransitOrder = () => {
  return useMutation({
    mutationFn: (data: FormData) =>
      axiosInstance.patch(`/orders/${data.get("orderId")}/transit`, data),
  });
};

export const useCompleteOrder = () => {
  return useMutation({
    mutationFn: (data: { code: string; orderId: string }) =>
      axiosInstance.patch(`/orders/${data.orderId}/complete`, {
        code: data.code,
      }),
  });
};
