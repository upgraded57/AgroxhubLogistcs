import AppLayout from "@/components/layouts/appLayout";
import OrderTable from "@/components/tables/orderTable";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/orders/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AppLayout title="Orders" subtitle="See and manage your orders from here">
      <div className="rounded-lg shadow p-4 bg-white">
        {/* Filter Options */}
        <div className="flex items-center space-x-4 mb-4">
          <p className="text-sm">Filter by:</p>
          <select
            defaultValue="Pick a Status"
            className="select select-sm w-max"
          >
            <option disabled={true}>Pick a Status</option>
            <option>Delivered</option>
            <option>In Transit</option>
            <option>Pending</option>
            <option>Returned</option>
          </select>
        </div>

        <OrderTable orders={20} />
        {/* Pagination */}
        <div className="flex justify-center py-4">
          <div className="join">
            <button className="join-item btn">«</button>
            <button className="join-item btn">Page 1</button>
            <button className="join-item btn">»</button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
