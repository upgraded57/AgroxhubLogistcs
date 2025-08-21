import { useNavigate } from "@tanstack/react-router";
import moment from "moment";
import { StatusBadge } from "../status-badge";
import EmptyState from "../empty-state";

export default function OrdersTable({ orders }: { orders: Order[] }) {
  const navigate = useNavigate();
  return !orders.length ? (
    <EmptyState />
  ) : (
    <div className="overflow-x-auto">
      <table className="table text-sm">
        <thead>
          <tr>
            <th className="font-medium">Status</th>
            <th className="font-medium">Products</th>
            <th className="font-medium">Pickup Address</th>
            <th className="font-medium">Delivery Address</th>
            <th className="font-medium">Order Date</th>
            <th className="font-medium">Delivery Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, idx) => (
            <tr
              key={idx}
              className="hover:bg-base-200 cursor-pointer"
              onClick={() =>
                navigate({
                  to: "/orders/$orderId",
                  params: { orderId: order.id },
                })
              }
            >
              <th>
                <StatusBadge status={order?.status} />
              </th>
              <td>{order.productsCount}</td>
              <td className="min-w-[300px]">{order.pickupAddress || "---"}</td>
              <td className="min-w-[300px]">{order.deliveryAddress}</td>
              <td className="text-nowrap">
                {moment(order.createdAt).format("DD MMM, YYYY")}
              </td>
              <td className="text-nowrap">
                {order.deliveryDate
                  ? moment(order.deliveryDate).format("DD MMM, YYYY")
                  : "Not Set"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
