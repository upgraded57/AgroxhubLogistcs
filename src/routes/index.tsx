import { createFileRoute, Link } from "@tanstack/react-router";
import "../App.css";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import AppLayout from "@/components/layouts/app-layout";
import SummaryChart from "@/components/charts/summaryChart";
import EarningsTable from "@/components/tables/earningsTable";
import OrdersTable from "@/components/tables/ordersTable";
import { useGetOrders } from "@/api/order";
import { useGetSummary } from "@/api/summary";
import { ImSpinner8 } from "react-icons/im";
import { useGetReviews } from "@/api/reviews";
import Loader from "@/components/loader";
import moment from "moment";
import ProductRatings from "@/components/product-rating";
import EmptyState from "@/components/empty-state";

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
          {orders?.length && (
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
          )}
        </div>
        {isLoading ? (
          <div className="w-full h-[300px]">
            <span className="loading loading-spinner" />
          </div>
        ) : (
          orders && <OrdersTable orders={orders.slice(0, 5)} />
        )}
      </div>

      {/* Ratings */}
      <Reviews />
    </AppLayout>
  );
}

const Summary = () => {
  const { data: summary, isLoading } = useGetSummary();
  const stats = [
    {
      title: "Total Orders",
      count: summary?.total || 0,
      query: "all",
    },
    {
      title: "In Transit",
      count: summary?.in_transit || 0,
      query: "in_transit",
    },
    {
      title: "Delivered",
      count: summary?.delivered || 0,
      query: "delivered",
    },
    {
      title: "Total Balance",
      count: summary?.total_balance
        ? "N" + summary.total_balance.toLocaleString()
        : 0,
      isTotal: true,
    },
    {
      title: "Withdrawable Balance",
      count: summary?.withdrawable_balance
        ? "N" + summary.withdrawable_balance.toLocaleString()
        : 0,
    },
  ];

  return (
    <div className="stats bg-white w-full shadow">
      {stats.map((item, idx) => {
        const query = item.query as OrderQueryTypes["status"];
        return (
          <div className="stat min-w-[200px]" key={idx}>
            <div className="stat-title">{item.title}</div>
            <div
              className={`stat-value my-1 pl-2 ${item.isTotal ? "text-gray-500" : "text-dark-green-clr"}`}
            >
              {isLoading ? (
                <ImSpinner8 className="animate-spin text-xl my-2" />
              ) : (
                item.count
              )}
            </div>
            <div className="stat-desc">
              {!item.title.toLowerCase().includes("balance") && (
                <Link
                  to="/orders"
                  search={{
                    status: query,
                  }}
                  className="flex items-center space-x-1 border-b-[1px] w-max"
                >
                  <small>View All</small>
                  <ArrowRightIcon />
                </Link>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const Reviews = () => {
  const { isLoading, data } = useGetReviews();
  if (isLoading) {
    return (
      <div className="flex w-full h-[300px] bg-white rounded-lg shadow items-center justify-center mt-6">
        <Loader />
      </div>
    );
  }

  const reviews = data?.reviews;
  const average = data?.average;

  return (
    <div className="mt-6 rounded-lg shadow p-4 bg-white mb-6">
      <div className="flex items center justify-between mb-4 ">
        <div className="flex flex-col space-y-2">
          <p className="text-sm font-medium">Recent Orders</p>
          <div className="flex items-center space-x-4">
            <p className="text-sm">Average Rating:</p>
            <ProductRatings ratings={String(average)} />
          </div>
        </div>
        {reviews && reviews.length > 4 ? (
          <Link to="/reviews" className="flex items-center space-x-1">
            <p className="text-sm underline">See All</p>
            <ArrowRightIcon />
          </Link>
        ) : (
          ""
        )}
      </div>
      <ul className="list space-y-4">
        {reviews && reviews.length ? (
          reviews.slice(0, 5).map((review, idx) => (
            <li key={idx} className="border-b border-b-gray-100 pb-2">
              <div className="flex flex-col lg:flex-row items-start gap-4 lg:gap-20">
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="w-12 rounded-full">
                      <img
                        src={review.user.avatar || ""}
                        alt={review.user.name}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col min-w-max">
                    <p className="text-sm">{review.user.name}</p>
                    <small>{moment(review.createdAt).fromNow()}</small>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm">{review.review}</p>
                  <ProductRatings ratings={String(review.rating)} />
                </div>
              </div>
            </li>
          ))
        ) : (
          <EmptyState text="You have no reviews yet!" />
        )}
      </ul>
    </div>
  );
};
