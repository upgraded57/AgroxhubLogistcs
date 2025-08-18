import EarningsChart from "@/components/charts/earningsChart";
import AppLayout from "@/components/layouts/app-layout";
import { ReaderIcon } from "@radix-ui/react-icons";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/finance/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AppLayout
      title="Finance"
      subtitle="Manage your financial information"
      actions={
        <div className="flex space-x-4">
          <Filters />
          <button className="btn bg-dark-green-clr border-none text-white">
            <ReaderIcon />
            Initial Payout
          </button>
        </div>
      }
    >
      <Summary />
      <div className="w-full p-6 bg-white shadow rounded-lg my-6">
        <p className="text-sm mb-4">Earnings</p>
        <EarningsChart />
      </div>
    </AppLayout>
  );
}

const Summary = () => {
  const stats = [
    {
      title: "Total Earnings",
      count: "276",
    },
    {
      title: "From Distance",
      count: "116",
    },
    {
      title: "From Deliverables",
      count: 80,
    },
    {
      title: "Withdrawable Balance",
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
        </div>
      ))}
    </div>
  );
};

const Filters = () => {
  return (
    <select name="filter" id="filter" className="select w-max">
      <option>This Month</option>
      <option>Last Month</option>
      <option>March</option>
      <option>February</option>
      <option>January</option>
    </select>
  );
};
