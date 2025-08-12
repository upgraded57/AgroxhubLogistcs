export const StatusBadge = ({ status }: { status: Order["status"] }) => {
  const getStatusBg = () => {
    switch (status) {
      case "pending":
        return "bg-slate-100 text-slate-500 border-slate-200";
      case "in_transit":
        return "bg-yellow-100 text-yellow-500 border-yellow-200";
      case "delivered":
        return "bg-green-100 text-dark-green-clr border-green-200";
      case "rejected":
        return "bg-red-100 text-red-500 border-red-200";
      case "canceled":
        return "bg-red-100 text-red-500 border-red-200";
      default:
        return "bg-slate-300 text-slate-500 border-slate-200";
    }
  };
  return (
    <span
      className={`badge text-xs font-normal p-2 capitalize text-nowrap rounded-sm ${getStatusBg()}`}
    >
      {status.replace("_", " ")}
    </span>
  );
};
