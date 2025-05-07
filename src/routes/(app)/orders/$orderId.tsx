import AppLayout from "@/components/layouts/AppLayout";
import Pending from "@/components/pending";
import OrdersTable from "@/components/tables/OrdersTable";
import {
  AvatarIcon,
  CaretDownIcon,
  CheckIcon,
  Cross2Icon,
  InfoCircledIcon,
  RadiobuttonIcon,
  SewingPinFilledIcon,
} from "@radix-ui/react-icons";
import { createFileRoute } from "@tanstack/react-router";
import moment from "moment";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/(app)/orders/$orderId")({
  component: RouteComponent,
  pendingComponent: Pending,
});

function RouteComponent() {
  const { orderId } = Route.useParams();
  const handleShowModal = (
    type: "info" | "complete" | "reject" | "pickupDate" | "deliveryDate"
  ) => {
    const modalId =
      type === "info"
        ? "infoModal"
        : type === "complete"
          ? "completeModal"
          : type === "pickupDate"
            ? "pickupDateModal"
            : type === "deliveryDate"
              ? "deliveryDateModal"
              : "rejectModal";
    const modal = document.getElementById(modalId) as HTMLDialogElement;
    modal.showModal();
  };

  const handleCloseModal = (
    type: "info" | "complete" | "reject" | "pickupDate" | "deliveryDate"
  ) => {
    const modalId =
      type === "info"
        ? "infoModal"
        : type === "complete"
          ? "completeModal"
          : type === "pickupDate"
            ? "pickupDateModal"
            : type === "deliveryDate"
              ? "deliveryDateModal"
              : "rejectModal";
    const modal = document.getElementById(modalId) as HTMLDialogElement;
    modal.close();
  };

  const [deliveryDate, setDeliveryDate] = useState<{
    pickup: string | null;
    delivery: string | null;
  }>({
    pickup: null,
    delivery: null,
  });
  return (
    <AppLayout
      title={`Order ${orderId}`}
      subtitle="Manage and complete this order"
      actions={
        <div className="dropdown lg:dropdown-end">
          <div tabIndex={0} role="button">
            <button className="btn font-normal bg-white rounded-lg">
              <CaretDownIcon />
              Delivery Actions
            </button>
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content bg-base-100 menu rounded-box z-1 w-max p-2 shadow-sm border-[1px] border-base-300"
          >
            <li>
              <button
                className="btn btn-ghost font-normal shadow-none"
                onClick={() => handleShowModal("info")}
              >
                <InfoCircledIcon />
                View Note from Buyer
              </button>
            </li>
            <li>
              <button
                className="btn btn-ghost font-normal text-dark-green-clr border-0 justify-start hover:bg-dark-green-clr hover:text-white"
                onClick={() => handleShowModal("complete")}
              >
                <CheckIcon />
                Complete Delivery
              </button>
            </li>
            <li>
              <button
                className="btn btn-ghost font-normal text-red-clr border-0 justify-start hover:bg-red-clr hover:text-white"
                onClick={() => handleShowModal("reject")}
              >
                <Cross2Icon />
                Return Products
              </button>
            </li>
          </ul>
        </div>
      }
    >
      {/* Pickup and delivery address */}
      <div className="bg-white w-full shadow mb-6 flex items-center p-4 rounded-lg overflow-x-scroll">
        <div className="space-y-2 w-full min-w-[300px]">
          <div className="flex items-center space-x-2 text-yellow-clr">
            <RadiobuttonIcon />
            <small>Pickup From:</small>
          </div>
          <p className="text-sm">
            Somewhere Street, some location, Somewhere in Lagos
          </p>
        </div>
        <span className="divider divider-horizontal" />
        <div className="space-y-2 w-full min-w-[300px]">
          <div className="flex items-center space-x-2 text-dark-green-clr">
            <SewingPinFilledIcon />
            <small>Deliver To:</small>
          </div>
          <p className="text-sm">
            Somewhere Street, some location, Somewhere in Lagos
          </p>
        </div>
        <span className="divider divider-horizontal" />
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-2 lg:gap-6 w-full min-w-[200px]">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-info">
              <AvatarIcon />
              <small>Buyer:</small>
            </div>
            <p className="text-sm">John Doe</p>
          </div>

          <button className="btn btn-sm font-normal">View Buyer Info</button>
        </div>
      </div>

      {/* Summary */}
      <div className="stats bg-white w-full shadow mb-6">
        <div className="stat">
          <div className="stat-title">Estimated Delivery Cost</div>
          <div className="stat-value my-1 font-semibold">N 34,670</div>
          <div className="stat-desc">
            Estimated travel distance -
            <span className="font-bold pl-1">34km</span>
          </div>
        </div>
        <div className="stat">
          <div className="stat-title">Pickup Date</div>
          <div className="stat-value my-1 font-semibold">
            {deliveryDate.pickup === null
              ? "Not Set"
              : moment(deliveryDate.pickup).format("MMM DD, YYYY")}
          </div>
          <div className="stat-actions">
            <button
              className="btn btn-sm font-normal"
              onClick={() => handleShowModal("pickupDate")}
            >
              {deliveryDate.pickup === null
                ? "Set pickup date"
                : "Change pickup date"}
            </button>
          </div>
        </div>
        <div className="stat">
          <div className="stat-title">Delivery Date</div>
          <div className="stat-value my-1 font-semibold">
            {deliveryDate.delivery === null
              ? "Not Set"
              : moment(deliveryDate.delivery).format("MMM DD, YYYY")}
          </div>
          <div className="stat-actions">
            <button
              className="btn btn-sm font-normal"
              onClick={() => handleShowModal("deliveryDate")}
            >
              {deliveryDate.delivery === null
                ? "Set delivery date"
                : "Change delivery date"}
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg shadow p-4 bg-white mb-6">
        <OrdersTable orders={5} />
      </div>

      {/* Modals */}
      <InfoModal onClose={() => handleCloseModal("info")} />
      <CompleteOrderModal onClose={() => handleCloseModal("complete")} />
      <RejectOrderModal onClose={() => handleCloseModal("reject")} />
      <PickupDateSetModal
        onClose={() => handleCloseModal("pickupDate")}
        setDate={setDeliveryDate}
      />
      <DeliveryDateSetModal
        onClose={() => handleCloseModal("deliveryDate")}
        setDate={setDeliveryDate}
      />
    </AppLayout>
  );
}

const InfoModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <dialog id="infoModal" className="modal">
      <div className="modal-box">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-lg">Note from Buyer</h3>
          <button
            className="btn btn-circle btn-xs btn-outline btn-error hover:text-white shadow-none"
            onClick={onClose}
          >
            <Cross2Icon />
          </button>
        </div>

        <p className="py-4 text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius quo
          commodi labore architecto impedit repellendus nemo ea in. Ducimus fuga
          earum nemo esse quidem consequuntur. Assumenda saepe corporis
          excepturi dignissimos aliquid autem optio a voluptate unde facere
          enim, velit facilis molestiae fugit perspiciatis doloribus sapiente
          laudantium recusandae non. Molestiae, temporibus!
        </p>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

const CompleteOrderModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <dialog id="completeModal" className="modal">
      <div className="modal-box">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-lg text-dark-green-clr">
            Complete Delivery
          </h3>
          <button
            className="btn btn-circle btn-xs btn-outline btn-error hover:text-white shadow-none"
            onClick={onClose}
          >
            <Cross2Icon />
          </button>
        </div>
        <p className="py-4 text-sm">
          To complete this order, you'll need to enter the{" "}
          <span className="font-bold">order completion code</span> into the
          field below. Request the code from the buyer.
        </p>

        <form className="w-full">
          <label htmlFor="code" className="block mb-2">
            <p className="text-sm mb-1">Enter order completion code</p>
            <input
              type="text"
              name="code"
              id="code"
              className="input input-bordered w-full"
              placeholder="e.g. 123456"
            />
          </label>
          <button type="submit" className="btn">
            Submit Code
          </button>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

const RejectOrderModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <dialog id="rejectModal" className="modal">
      <div className="modal-box">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-lg text-red-clr">Return Delivery</h3>
          <button
            className="btn btn-circle btn-xs btn-outline btn-error hover:text-white shadow-none"
            onClick={onClose}
          >
            <Cross2Icon />
          </button>
        </div>
        <p className="py-4 text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius quo
          commodi labore architecto impedit repellendus nemo ea in. Ducimus fuga
          earum nemo esse quidem consequuntur. Assumenda saepe corporis
          excepturi dignissimos aliquid autem optio a voluptate unde facere
          enim, velit facilis molestiae fugit perspiciatis doloribus sapiente
          laudantium recusandae non. Molestiae, temporibus!
        </p>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

const PickupDateSetModal = ({
  onClose,
  setDate,
}: {
  onClose: () => void;
  setDate: React.Dispatch<
    React.SetStateAction<{
      pickup: string | null;
      delivery: string | null;
    }>
  >;
}) => {
  const [showToast, setShowToast] = useState(false);
  const handleSetPickupDate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const date = Object.fromEntries(new FormData(e.target as HTMLFormElement));
    if (!date.date) {
      setShowToast(true);
      return;
    }
    setDate((prev) => ({
      ...prev,
      pickup: date.date as string,
    }));
    onClose();
  };

  useEffect(() => {
    const toast = setTimeout(() => {
      setShowToast(false);
    }, 2000);

    return () => {
      clearTimeout(toast);
    };
  }, [showToast]);
  return (
    <dialog id="pickupDateModal" className="modal">
      <div className="modal-box">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-lg">Set Pickup Date</h3>
          <button
            className="btn btn-circle btn-xs btn-outline btn-error hover:text-white shadow-none"
            onClick={onClose}
          >
            <Cross2Icon />
          </button>
        </div>

        <div className="w-full mt-6">
          <p className="text-sm mb-2">
            Choose a pickup date between 25/01/2025 and 31/01/2025
          </p>
          <form className="flex space-x-2" onSubmit={handleSetPickupDate}>
            <input type="date" name="date" id="date" className="input w-full" />
            <button className="btn font-normal" type="submit">
              Choose Date
            </button>
          </form>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
      {showToast && (
        <div className="toast toast-top">
          <div className="alert alert-error text-white">
            <InfoCircledIcon />
            <p className="text-sm">Please select a valid date</p>
          </div>
        </div>
      )}
    </dialog>
  );
};

const DeliveryDateSetModal = ({
  onClose,
  setDate,
}: {
  onClose: () => void;
  setDate: React.Dispatch<
    React.SetStateAction<{
      pickup: string | null;
      delivery: string | null;
    }>
  >;
}) => {
  const [showToast, setShowToast] = useState(false);
  const handleSetDeliveryDate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const date = Object.fromEntries(new FormData(e.target as HTMLFormElement));
    if (!date.date) {
      setShowToast(true);
      return;
    }
    setDate((prev) => ({
      ...prev,
      delivery: date.date as string,
    }));
    onClose();
  };

  useEffect(() => {
    const toast = setTimeout(() => {
      setShowToast(false);
    }, 2000);

    return () => {
      clearTimeout(toast);
    };
  }, [showToast]);
  return (
    <dialog id="deliveryDateModal" className="modal">
      <div className="modal-box">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-lg">Set Delivery Date</h3>
          <button
            className="btn btn-circle btn-xs btn-outline btn-error hover:text-white shadow-none"
            onClick={onClose}
          >
            <Cross2Icon />
          </button>
        </div>

        <div className="w-full mt-6">
          <p className="text-sm mb-2">
            Choose a delivery date between 25/01/2025 and 31/01/2025
          </p>
          <form className="flex space-x-2" onSubmit={handleSetDeliveryDate}>
            <input type="date" name="date" id="date" className="input w-full" />
            <button className="btn font-normal" type="submit">
              Choose Date
            </button>
          </form>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
      {showToast && (
        <div className="toast toast-top">
          <div className="alert alert-error text-white">
            <InfoCircledIcon />
            <p className="text-sm">Please select a valid date</p>
          </div>
        </div>
      )}
    </dialog>
  );
};
