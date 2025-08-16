import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./axiosInstance";

export const useGetNotifications = () => {
  const getNotifications = async () => {
    const res = await axiosInstance.get("/notifications", { showToast: false });
    return res.data.notifications as NotificationList[];
  };
  return useQuery({
    queryKey: ["Notification"],
    queryFn: getNotifications,
  });
};

export const useGetSingleNotification = (id: string) => {
  const getSingleNotifications = async () => {
    const res = await axiosInstance.get(`notifications/${id}`, {
      showToast: false,
    });
    return res.data.notification as NotificationList;
  };

  return useQuery({
    queryKey: ["Notification", id],
    queryFn: getSingleNotifications,
  });
};
