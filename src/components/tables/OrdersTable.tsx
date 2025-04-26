import { DotsVerticalIcon } from "@radix-ui/react-icons";

export default function OrdersTable({ orders }: { orders: number }) {
  let arr: number[] = [];
  for (let i = 0; i < orders; i++) {
    arr.push(i);
  }

  return (
    <div className="overflow-x-auto">
      <table className="table text-sm">
        <thead>
          <tr>
            <th />
            <th className="font-medium">Product</th>
            <th className="font-medium">Quantity</th>
            <th className="font-medium">Weight</th>
            <th className="font-medium">Action</th>
          </tr>
        </thead>
        <tbody>
          {arr.map((_, idx) => (
            <tr key={idx} className="hover:bg-light-grey-clr">
              <th className="w-4 pr-0 m-0">
                <StatusBadge />
              </th>
              <td className="w-full">Fresh Tomatoes</td>
              <td className="w-max text-nowrap">20 Baskets</td>
              <td className="w-max text-nowrap">102kg</td>
              <td className="w-max">
                <div className="dropdown dropdown-left dropdown-center">
                  <div tabIndex={0} role="button">
                    <button className="btn btn-sm btn-ghost btn-square">
                      <DotsVerticalIcon />
                    </button>
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content bg-base-100 menu rounded-box z-1 w-max p-2 shadow-sm border-[1px] border-base-300"
                  >
                    <li>
                      <button className="btn btn-ghost font-normal w-max">
                        View Product Images
                      </button>
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
