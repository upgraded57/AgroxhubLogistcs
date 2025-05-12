import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { Link } from "@tanstack/react-router";

export default function OrderTable({ orders }: { orders: number }) {
  let arr: number[] = [];
  for (let i = 0; i < orders; i++) {
    arr.push(i);
  }

  return (
    <div className="overflow-x-auto">
      <table className="table text-sm">
        <thead>
          <tr>
            <th></th>
            <th className="font-medium">Order ID</th>
            <th className="font-medium">Products</th>
            <th className="font-medium">Pickup Address</th>
            <th className="font-medium">Delivery Address</th>
            <th className="font-medium">Delivery Date</th>
            <th className="font-medium">Action</th>
          </tr>
        </thead>
        <tbody>
          {arr.map((_, idx) => (
            <tr key={idx} className="hover:bg-base-200">
              <th>
                <StatusBadge />
              </th>
              <td>SM_1318193656_JHKF</td>
              <td>20</td>
              <td className="min-w-[300px]">
                Somewhere Street, some location, Somewhere in Lagos
              </td>
              <td className="min-w-[300px]">
                Somewhere Street, some location, Somewhere in Lagos
              </td>
              <td>Oct 21st, 2025</td>
              <td>
                <div className="dropdown dropdown-left dropdown-center">
                  <div tabIndex={0} role="button">
                    <button className="btn btn-sm btn-ghost btn-square">
                      <DotsVerticalIcon />
                    </button>
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                  >
                    <li>
                      <Link
                        to="/orders/$orderId"
                        params={{
                          orderId: "SM_1318193656_JHKF",
                        }}
                      >
                        View Details
                      </Link>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const StatusBadge = () => {
  return (
    <span className="w-3 h-3 block rounded-full bg-light-green-clr border-2 border-dark-green-clr" />
  );
};
