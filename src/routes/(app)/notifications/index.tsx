import { useGetNotifications } from "@/api/notification";
import AppLayout from "@/components/layouts/app-layout";
import { GrUserNew } from "react-icons/gr";
import {
  FaCalendarCheck,
  FaChartLine,
  FaCheckDouble,
  FaCircleInfo,
  FaHeart,
  FaStar,
  FaTruck,
} from "react-icons/fa6";
import { HiClipboardDocumentCheck } from "react-icons/hi2";
import { FaCheckCircle } from "react-icons/fa";
import { createFileRoute, Link } from "@tanstack/react-router";
import moment from "moment";
import { useState } from "react";
import EmptyState from "@/components/empty-state";

export const Route = createFileRoute("/(app)/notifications/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { isLoading, data: notifications } = useGetNotifications();
  const [filter, setFilter] = useState("all");
  return (
    <AppLayout
      title="Notifications"
      subtitle="Manage your notifications"
      actions={
        <select
          className="select w-max"
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="read">Read</option>
          <option value="unread">Unread</option>
        </select>
      }
    >
      <ul className="list bg-white rounded-lg">
        {isLoading ? (
          [1, 1, 1, 1].map((_, i) => (
            <div className="flex gap-4 p-4 overflow-x-hidden" key={i}>
              <div className="w-8 h-8 aspect-square skeleton" />
              <div className="space-y-2">
                <div className="w-[300px] md:w-[400px] h-5 skeleton rounded-sm" />
                <div className="w-[200px] h-3 skeleton rounded-sm" />
                <div className="w-[280px] h-3 skeleton rounded-sm" />
              </div>
            </div>
          ))
        ) : notifications && notifications.length ? (
          notifications
            ?.filter((n) => {
              if (filter === "read") {
                return !n.unread;
              }

              if (filter === "unread") {
                return n.unread;
              }

              return n;
            })
            ?.map((item, idx) => (
              <NotificationItem key={idx} notification={item} />
            ))
        ) : (
          <EmptyState />
        )}
      </ul>
    </AppLayout>
  );
}

const NotificationItem = ({
  notification,
}: {
  notification: NotificationList;
}) => {
  let bgColor = "";
  let color = "";

  const getIcon = () => {
    switch (notification.type) {
      case "follow":
        bgColor = "bg-fuchsia-100";
        color = "text-fuchsia-600";
        return GrUserNew;
      case "productReview":
        bgColor = "bg-yellow-100";
        color = "text-yellow-600";
        return FaStar;
      case "productSave":
        bgColor = "bg-fuchsia-100";
        color = "text-fuchsia-600";
        return FaHeart;
      case "orderDelivery":
        bgColor = "bg-green-100";
        color = "text-green-600";
        return FaCheckCircle;
      case "orderPlacement":
        bgColor = "bg-purple-100";
        color = "text-purple-600";
        return HiClipboardDocumentCheck;
      case "orderPickup":
        bgColor = "bg-pink-100";
        color = "text-pink-600";
        return FaCalendarCheck;
      case "orderInTransit":
        bgColor = "bg-sky-100";
        color = "text-sky-600";
        return FaTruck;
      case "milestone":
        bgColor = "bg-green-100";
        color = "text-green-600";
        return FaChartLine;
      case "orderAssignment":
        bgColor = "bg-teal-100";
        color = "text-teal-600";
        return FaCheckDouble;
      case "outOfStock":
        bgColor = "bg-red-100";
        color = "text-red-600";
        return FaCircleInfo;
      default:
        return FaCircleInfo;
    }
  };

  const Icon = getIcon();

  return (
    <Link
      to="/notifications/$id"
      params={{
        id: notification.id,
      }}
      className={`list-row hover:underline ${notification.unread ? "" : "opacity-50"}`}
    >
      <div className="flex gap-6">
        <span
          className={`w-8 h-8 rounded-full aspect-square flex items-center justify-center ${bgColor} ${color}`}
        >
          <Icon />
        </span>
        <div className="">
          <p className="uppercase font-medium">{notification.subject}</p>
          <p>{notification.summary}</p>
          <p className="text-xs font-light text-slate-500">
            {moment(notification.createdAt).format("MMM D, YYYY. hh:mma")}
          </p>
        </div>
      </div>
      {notification.attachment && (
        <div className="w-15 h-15 rounded-lg aspect-square bg-slate-200 ml-auto overflow-hidden">
          <img
            src={notification.attachment}
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </Link>
  );
};
