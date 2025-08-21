import { useGetEarningsSummary } from "@/api/summary";
import Loader from "../loader";

export default function EarningsTable() {
  const { isLoading, data: summary } = useGetEarningsSummary();
  return isLoading ? (
    <div className="h-[400px] w-full grid place-content-center">
      <Loader />
    </div>
  ) : (
    <div>
      <div className="overflow-x-auto max-h-[400px]">
        <table className="table table-pin-rows">
          <thead>
            <tr className="font-normal">
              <td className="w-full">Month</td>
              <td>Amount</td>
            </tr>
          </thead>
          <tbody>
            {summary?.map((item, idx) => (
              <tr key={idx}>
                <td>{item.month}</td>
                <td className="text-right">N{item.total.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
