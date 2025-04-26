export default function EarningsTable() {
  const data = [
    {
      month: "April",
      amount: "30,800",
    },
    {
      month: "May",
      amount: "30,800",
    },
    {
      month: "June",
      amount: "30,800",
    },
    {
      month: "July",
      amount: "30,800",
    },
    {
      month: "August",
      amount: "30,800",
    },
    {
      month: "September",
      amount: "30,800",
    },
    {
      month: "October",
      amount: "30,800",
    },
    {
      month: "November",
      amount: "30,800",
    },
  ];
  return (
    <div>
      <div className="overflow-x-auto max-h-[400px]">
        <table className="table table-pin-rows">
          <thead>
            <tr className="font-normal">
              <td>Month</td>
              <td>Amount</td>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={idx}>
                <td>{item.month}</td>
                <td>{item.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
