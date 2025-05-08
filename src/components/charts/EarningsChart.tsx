import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

export default function EarningsChart() {
  const data = [
    {
      name: "January",
      earning: 4000,
      payout: 2400,
    },
    {
      name: "February",
      earning: 3000,
      payout: 1398,
    },
    {
      name: "March",
      earning: 2000,
      payout: 9800,
    },
    {
      name: "April",
      earning: 2780,
      payout: 3908,
    },
    {
      name: "May",
      earning: 1890,
      payout: 4800,
    },
    {
      name: "June",
      earning: 2390,
      payout: 3800,
    },
  ];
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={data}
        margin={{
          left: 20,
        }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="name"
          tickFormatter={(val) => val.slice(0, 3)}
          tickLine={false}
        />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="payout"
          stroke="#82ca9d"
          fillOpacity={1}
          fill="url(#colorPv)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
