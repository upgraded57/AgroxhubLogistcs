import { createFileRoute, Link } from "@tanstack/react-router";
import "../App.css";
import {
  ArrowRightIcon,
  StarFilledIcon,
  StarIcon,
} from "@radix-ui/react-icons";
import AppLayout from "@/components/layouts/appLayout";
import SummaryChart from "@/components/charts/summaryChart";
import EarningsTable from "@/components/tables/earningsTable";
import OrdersTable from "@/components/tables/ordersTable";
import { useGetOrders } from "@/api/order";
export const Route = createFileRoute("/")({
  component: App,
});

export function App() {
  const { isLoading, data: orders } = useGetOrders();
  return (
    <AppLayout title="Overview" subtitle="Your account at a glance">
      <Summary />
      {/* Chart and Earnings Table */}
      <div className="flex flex-col lg:flex-row items-stretch my-6 gap-6 w-full">
        <div className="rounded-lg shadow p-4 bg-white lg:flex-7/10 w-full">
          <SummaryChart />
        </div>
        <div className="rounded-lg shadow p-4 bg-white lg:flex-3/10 ">
          <p className="text-sm font-medium mb-2">Earnings</p>
          <EarningsTable />
        </div>
      </div>

      {/* Recent Orders */}
      <div className="rounded-lg shadow p-4 bg-white">
        <div className="flex items center justify-between mb-4">
          <p className="text-sm font-medium">Recent Orders</p>

          {/* Recent orders badges */}
          <div className="hidden lg:flex items-center space-x-4">
            <span className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-light-green-clr border-2 border-dark-green-clr" />
              <p className="text-sm font-light">Delivered</p>
            </span>
            <span className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-orange-300 border-2 border-orange-400" />
              <p className="text-sm font-light">In Transit</p>
            </span>
            <span className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-yellow-300 border-2 border-yellow-400" />
              <p className="text-sm font-light">Pending</p>
            </span>
            <span className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-red-300 border-2 border-red-500" />
              <p className="text-sm font-light">Returned</p>
            </span>
          </div>
          <Link
            to="/orders"
            search={{
              status: undefined,
            }}
            className="flex items-center space-x-1"
          >
            <p className="text-sm underline">See All</p>
            <ArrowRightIcon />
          </Link>
        </div>
        {isLoading ? (
          <div className="w-full h-[300px]">
            <span className="loading loading-spinner" />
          </div>
        ) : (
          orders && <OrdersTable orders={orders} />
        )}
      </div>

      {/* Average Ratings */}
      <div className="mt-6 rounded-lg shadow p-4 bg-white">
        <div className="flex items center justify-between mb-4">
          <p className="text-sm font-medium">Recent Orders</p>
          <div className="flex items-center space-x-4">
            <p className="text-sm">Average Rating:</p>
            <span className="flex items-center space-x-2">
              <StarFilledIcon className="text-yellow-clr" />
              <StarFilledIcon className="text-yellow-clr" />
              <StarFilledIcon className="text-yellow-clr" />
              <StarFilledIcon className="text-yellow-clr" />
              <StarIcon className="text-yellow-clr" />
            </span>
          </div>
        </div>
        <ul className="list">
          {[1, 1, 2, 2, 2].map((_, idx) => (
            <li className="list-row" key={idx}>
              <RatingComp />
            </li>
          ))}
        </ul>
      </div>
    </AppLayout>
  );
}

const Summary = () => {
  const stats = [
    {
      title: "Total Orders",
      count: "276",
    },
    {
      title: "In Transit",
      count: "116",
    },
    {
      title: "Delivered",
      count: 80,
    },
    {
      title: "Available Balance",
      count: "N27.6k",
    },
  ];
  return (
    <div className="stats bg-white w-full shadow">
      {stats.map((item, idx) => (
        <div className="stat min-w-[200px]" key={idx}>
          <div className="stat-title">{item.title}</div>
          <div className="stat-value text-dark-green-clr my-1 pl-2">
            {item.count}
          </div>
          <div className="stat-desc">
            <Link
              to="."
              className="flex items-center space-x-1 border-b-[1px] w-max"
            >
              <small>View All</small>
              <ArrowRightIcon />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

const RatingComp = () => {
  return (
    <div className="flex flex-col lg:flex-row items-start gap-4 lg:gap-20">
      <div className="flex items-center space-x-3">
        <div className="avatar">
          <div className="w-12 rounded-full">
            <img
              src="https://img.daisyui.com/images/profile/demo/2@94.webp"
              alt="Avatar Tailwind CSS Component"
            />
          </div>
        </div>
        <div className="flex flex-col min-w-max">
          <p className="text-sm">John Doe</p>
          <small>8 Days Ago</small>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm">
          At Agroxhub, we believe in making agricultural transactions simple,
          efficient, and rewarding for both farmers and buyers. Our platform is
          designed with you in mind, providing a seamless experience that
          connects quality products with eager buyers.
        </p>
        <span className="flex items-center space-x-2">
          <StarFilledIcon className="text-yellow-clr" />
          <StarFilledIcon className="text-yellow-clr" />
          <StarFilledIcon className="text-yellow-clr" />
          <StarFilledIcon className="text-yellow-clr" />
          <StarIcon className="text-yellow-clr" />
        </span>
      </div>
    </div>
  );
};
