import { useGetOrders } from "@/api/order";
import AppLayout from "@/components/layouts/app-layout";
import Loader from "@/components/loader";
import OrdersTable from "@/components/tables/ordersTable";
import {
  createFileRoute,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/orders/")({
  component: RouteComponent,
  validateSearch: (search: OrderQueryTypes) => {
    return {
      status: typeof search.status === "string" ? search.status : undefined,
    };
  },
});

function RouteComponent() {
  const navigate = useNavigate();
  const params = useSearch({ from: "/(app)/orders/" });
  const {
    isLoading,
    isFetching,
    data: orders,
    isError,
  } = useGetOrders({
    status: params.status,
  });
  return (
    <AppLayout title="Orders" subtitle="See and manage your orders from here">
      <div className="rounded-lg shadow p-4 bg-white">
        {/* Filter Options */}
        <div className="flex items-center space-x-4 mb-4">
          <p className="text-sm">Filter by:</p>
          <select
            defaultValue={params.status || "Pick a Status"}
            className="select select-sm w-max"
            onChange={(e) => {
              navigate({
                to: "/orders",
                search: {
                  status: e.target.value.length
                    ? (e.target.value as OrderQueryTypes["status"])
                    : undefined,
                },
              });
            }}
          >
            <option value="">All Status</option>
            <option value="delivered">Delivered</option>
            <option value="in_transit">In Transit</option>
            <option value="pending">Pending</option>
            <option value="returned">Returned</option>
          </select>
        </div>

        {isLoading || isFetching ? (
          <div className="w-full h-[300px] flex items-center justify-center">
            <Loader />
          </div>
        ) : isError || !orders || orders.length === 0 ? (
          <div className="w-full h-[300px] flex items-center justify-center">
            <p>No order found!</p>
          </div>
        ) : (
          <>
            <OrdersTable orders={orders} />
            {/* Pagination */}
            <div className="flex justify-center py-4">
              <div className="join">
                <button className="join-item btn">«</button>
                <button className="join-item btn">Page 1</button>
                <button className="join-item btn">»</button>
              </div>
            </div>
          </>
        )}
      </div>
    </AppLayout>
  );
}
