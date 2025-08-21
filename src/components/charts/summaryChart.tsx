import { useGetOrdersSummary } from "@/api/summary";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import Loader from "../loader";

export default function SummaryChart() {
  const { isLoading, data: summary } = useGetOrdersSummary();

  const data = summary?.map((s) => ({
    name: s.month,
    Total: s.total,
    Delivered: s.delivered,
  }));

  return isLoading ? (
    <div className="h-[400px] w-full grid place-content-center">
      <Loader />
    </div>
  ) : (
    <ResponsiveContainer height={400}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" />
        <Tooltip />
        <Legend />
        <Bar dataKey="Total" fill="#a5a5a5" />
        <Bar dataKey="Delivered" fill="#22955C" />
      </BarChart>
    </ResponsiveContainer>
  );
}
