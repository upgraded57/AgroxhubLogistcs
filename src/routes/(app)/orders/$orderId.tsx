import {
  useCompleteOrder,
  useGetSingleOrder,
  useReturnOrder,
  useTransitOrder,
  useUpdateOrderDates,
} from "@/api/order";
import ButtonPending from "@/components/button-pending";
import AppLayout from "@/components/layouts/app-layout";
import Pending from "@/components/pending";
import { StatusBadge } from "@/components/status-badge";
import OrderTable from "@/components/tables/orderTable";
import { currency } from "@/utils/helpers";

import {
  AvatarIcon,
  CaretDownIcon,
  CheckIcon,
  Cross2Icon,
  InfoCircledIcon,
  RadiobuttonIcon,
  SewingPinFilledIcon,
} from "@radix-ui/react-icons";
import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import moment from "moment";
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";

type ActionTypes =
  | "info"
  | "complete"
  | "reject"
  | "pickupDate"
  | "deliveryDate"
  | "transit"
  | "buyer";

const getModalType = (type: ActionTypes) => {
  return type === "info"
    ? "infoModal"
    : type === "complete"
      ? "completeModal"
      : type === "pickupDate"
        ? "pickupDateModal"
        : type === "deliveryDate"
          ? "deliveryDateModal"
          : type === "transit"
            ? "transitModal"
            : type === "buyer"
              ? "buyerInfoModal"
              : "rejectModal";
};

export const Route = createFileRoute("/(app)/orders/$orderId")({
  component: RouteComponent,
  pendingComponent: Pending,
});

function RouteComponent() {
  const { orderId } = Route.useParams();
  const { isLoading, data: order, isError } = useGetSingleOrder(orderId);
  const handleShowModal = (type: ActionTypes) => {
    const modalId = getModalType(type);

    const modal = document.getElementById(modalId) as HTMLDialogElement;
    modal.showModal();
  };

  const handleCloseModal = (type: ActionTypes) => {
    const modalId = getModalType(type);
    const modal = document.getElementById(modalId) as HTMLDialogElement;
    modal.close();
  };

  if (isLoading)
    return (
      <AppLayout
        title="Order Details"
        subtitle="Manage and complete this order"
      >
        <Pending />
      </AppLayout>
    );

  if (isError || !order) {
    return (
      <AppLayout
        title="Order Details"
        subtitle="Manage and complete this order"
      >
        <p>Order not found</p>;
      </AppLayout>
    );
  }

  return (
    <AppLayout
      title="Order Details"
      badge={<StatusBadge status={order?.status} />}
      subtitle="Manage and complete this order"
      actions={
        <DeliveryActions order={order} handleShowModal={handleShowModal} />
      }
    >
      {/* Pickup and delivery address */}
      <div className="bg-white w-full shadow mb-6 flex items-center p-4 rounded-lg overflow-x-scroll">
        <div className="space-y-2 w-full min-w-[300px]">
          <div className="flex items-center space-x-2 text-yellow-clr">
            <RadiobuttonIcon />
            <small>Pickup From:</small>
          </div>
          <p className="text-sm">{order?.pickupAddress || "---"}</p>
        </div>
        <span className="divider divider-horizontal" />
        <div className="space-y-2 w-full min-w-[300px]">
          <div className="flex items-center space-x-2 text-dark-green-clr">
            <SewingPinFilledIcon />
            <small>Deliver To:</small>
          </div>
          <p className="text-sm">{order?.deliveryAddress || "---"}</p>
        </div>
        <span className="divider divider-horizontal" />
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-2 lg:gap-6 w-full min-w-[200px]">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-info">
              <AvatarIcon />
              <small>Buyer:</small>
            </div>
            <p className="text-sm">{order?.user?.name}</p>
          </div>

          <button
            className="btn btn-sm font-normal"
            onClick={() => handleShowModal("buyer")}
          >
            View Buyer Info
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="stats bg-white w-full shadow mb-6">
        <div className="stat">
          <div className="stat-title">Delivery Cost</div>
          <div className="stat-value my-1 font-semibold">
            {currency(order.deliveryCost)}
          </div>
          <div className="stat-desc">
            Estimated travel distance -
            <span className="font-bold pl-1">34km</span>
          </div>
        </div>
        <div className="stat">
          <div className="stat-title">Pickup Date</div>
          <div className="stat-value my-1 font-semibold">
            {order.pickupDate === null
              ? "Not Set"
              : moment(order.pickupDate).format("MMM DD, YYYY")}
          </div>
          <div className="stat-actions">
            <button
              className="btn btn-sm font-normal"
              onClick={() => handleShowModal("pickupDate")}
              disabled={order.pickupDate ? true : false}
            >
              Set pickup date
            </button>
          </div>
        </div>
        <div className="stat">
          <div className="stat-title">Delivery Date</div>
          <div className="stat-value my-1 font-semibold">
            {order.deliveryDate === null
              ? "Not Set"
              : moment(order.deliveryDate).format("MMM DD, YYYY")}
          </div>
          <div className="stat-actions">
            <button
              className="btn btn-sm font-normal"
              onClick={() => handleShowModal("deliveryDate")}
              disabled={order.deliveryDate || !order.pickupDate ? true : false}
            >
              Set delivery date
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg shadow p-4 bg-white mb-6">
        <OrderTable products={order?.products!} />
      </div>

      {/* Modals */}
      <>
        <InfoModal
          onClose={() => handleCloseModal("info")}
          info={order.logisticsNote}
        />
        <TransitOrderModal
          onClose={() => handleCloseModal("transit")}
          orderId={order.id}
        />
        <CompleteOrderModal onClose={() => handleCloseModal("complete")} />
        <RejectOrderModal onClose={() => handleCloseModal("reject")} />
        <PickupDateSetModal
          onClose={() => handleCloseModal("pickupDate")}
          orderId={order.id}
          orderDate={order.createdAt}
        />
        <DeliveryDateSetModal
          onClose={() => handleCloseModal("deliveryDate")}
          orderId={order.id}
          pickupDate={order.pickupDate}
          orderDate={order.createdAt}
        />
        <BuyerInfoModal
          onClose={() => handleCloseModal("buyer")}
          buyer={order.user}
        />
      </>
    </AppLayout>
  );
}

const DeliveryActions = ({
  order,
  handleShowModal,
}: {
  order: Order;
  handleShowModal: (type: ActionTypes) => void;
}) => {
  return (
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
        {order?.logisticsNote && (
          <li>
            <button
              className="btn btn-ghost font-normal"
              onClick={() => handleShowModal("info")}
            >
              <InfoCircledIcon />
              View Note from Buyer
            </button>
          </li>
        )}
        <li>
          <button
            className="btn btn-ghost font-normal text-orange-clr border-0 justify-start hover:bg-orange-clr hover:text-white disabled:text-slate-400"
            onClick={() => handleShowModal("transit")}
            disabled={
              order.status !== "pending" ||
              !order.pickupDate ||
              !order.deliveryDate
            }
          >
            <CheckIcon />
            Transit Order
          </button>
        </li>
        <li>
          <button
            className="btn btn-ghost font-normal text-dark-green-clr border-0 justify-start hover:bg-dark-green-clr hover:text-white disabled:text-slate-400"
            onClick={() => handleShowModal("complete")}
            disabled={
              order.status !== "in_transit" ||
              !order.pickupDate ||
              !order.deliveryDate
            }
          >
            <CheckIcon />
            Complete Delivery
          </button>
        </li>

        <li>
          <button
            className="btn btn-ghost font-normal text-red-clr border-0 justify-start hover:bg-red-clr hover:text-white disabled:text-slate-400"
            onClick={() => handleShowModal("reject")}
            disabled={
              order.status !== "in_transit" ||
              !order.pickupDate ||
              !order.deliveryDate
            }
          >
            <Cross2Icon />
            Return Products
          </button>
        </li>
      </ul>
    </div>
  );
};

const InfoModal = ({
  onClose,
  info,
}: {
  onClose: () => void;
  info?: string;
}) => {
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

        <p className="py-4 text-sm">{info}</p>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

const TransitOrderModal = ({
  onClose,
  orderId,
}: {
  onClose: () => void;
  orderId: string;
}) => {
  const queryClient = useQueryClient();
  const { mutateAsync: transitOrder, isPending } = useTransitOrder();
  const handleTransitOrder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const media = new FormData(e.target as HTMLFormElement);
    media.append("orderId", orderId);

    transitOrder(media).then(() => {
      queryClient.invalidateQueries({
        queryKey: ["Orders", orderId],
      });
      onClose();
    });
  };
  return (
    <dialog id="transitModal" className="modal">
      <div className="modal-box">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-lg text-dark-green-clr">
            Transit Order?
          </h3>
          <button
            className="btn btn-circle btn-xs btn-outline btn-error hover:text-white shadow-none"
            onClick={onClose}
          >
            <Cross2Icon />
          </button>
        </div>
        <p className="pt-4 text-sm">
          This will set order status as{" "}
          <span className="font-medium">In Transit</span> and notify the buyer
          that the order is on its way. Only do this after you have picked up
          the order and confirmed the order in good condition.
        </p>
        <p className="py-4 text-sm">
          To transit order, upload images of the order status as received from
          the seller
        </p>

        <form className="w-full" onSubmit={handleTransitOrder}>
          <label htmlFor="media" className="block mb-4">
            <p className="text-sm mb-1">Upload order images.</p>
            <input
              type="file"
              name="media"
              id="media"
              accept="image/*"
              className="file-input w-full"
            />
          </label>
          <button type="submit" className="btn" disabled={isPending}>
            {isPending && <ButtonPending />}
            Transit Order
          </button>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

const CompleteOrderModal = ({ onClose }: { onClose: () => void }) => {
  const queryClient = useQueryClient();
  const { mutateAsync: completeOrder, isPending } = useCompleteOrder();
  const { orderId } = Route.useParams();
  const handleCompleteOrder = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const code = Object.fromEntries(new FormData(e.target as HTMLFormElement))
      .code as string;

    if (!code) {
      toast("Unable to proceed", {
        description: "Please enter the order completion code to complete order",
        id: "errorToast",
      });
      return;
    }

    completeOrder({
      code,
      orderId,
    }).then(() => {
      queryClient.invalidateQueries({
        queryKey: ["Orders", orderId],
      });
      onClose();
    });
  };
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

        <form className="w-full" onSubmit={handleCompleteOrder}>
          <label htmlFor="code" className="block mb-2">
            <p className="text-sm mb-1">Enter order completion code</p>
            <input
              type="text"
              name="code"
              id="code"
              className="input input-bordered w-full"
              placeholder="e.g. 123456"
              disabled={isPending}
            />
          </label>
          <button type="submit" className="btn" disabled={isPending}>
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
  const queryClient = useQueryClient();
  const { mutateAsync: returnOrder, isPending } = useReturnOrder();
  const { orderId } = Route.useParams();
  const [reason, setReason] = useState("");

  const handleReturn = () => {
    returnOrder({
      reason,
      orderId,
    }).then(() => {
      setReason("");
      queryClient.invalidateQueries({
        queryKey: ["Orders", orderId],
      });
      onClose();
    });
  };
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
        <p className="pt-4 pb-2 text-sm">
          This action should only be carried out if user is not satisfied the
          products and want to return it.
        </p>
        <p className="pb-4 text-sm">
          Please specify below why this order is being returned
        </p>
        <textarea
          name="reason"
          className="textarea w-full resize-none"
          rows={5}
          placeholder="Reason for rejecting order"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <button
          className="btn bg-red-500 text-white shadow-none border-none mt-4"
          disabled={!reason.length || isPending}
          onClick={handleReturn}
        >
          Return Products
        </button>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

const PickupDateSetModal = ({
  onClose,
  orderId,
  orderDate,
}: {
  onClose: () => void;
  orderId: string;
  orderDate: Date;
}) => {
  const queryClient = useQueryClient();
  const { mutateAsync: updateDate, isPending } = useUpdateOrderDates();
  const [showToast, setShowToast] = useState(false);
  const handleSetPickupDate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const date = Object.fromEntries(
      new FormData(e.target as HTMLFormElement)
    ) as { date?: string };
    if (!date.date) {
      setShowToast(true);
      return;
    }
    updateDate({
      orderId,
      type: "pickup",
      date: date.date,
    }).then(() => {
      queryClient.invalidateQueries({
        queryKey: ["Orders", orderId],
      });
      onClose();
    });
  };

  useEffect(() => {
    const toast = setTimeout(() => {
      setShowToast(false);
    }, 2000);

    return () => {
      clearTimeout(toast);
    };
  }, [showToast]);

  const future = new Date(orderDate);
  future.setDate(future.getDate() + 7);
  const maxDate = moment(future).format("YYYY-MM-DD");
  const minDate = moment(orderDate).format("YYYY-MM-DD");

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
            Choose a pickup date between {minDate} and {maxDate}
          </p>
          <form className="flex space-x-2" onSubmit={handleSetPickupDate}>
            <input
              type="date"
              name="date"
              id="date"
              className="input w-full"
              min={minDate}
              max={maxDate}
            />
            <button
              className="btn font-normal"
              type="submit"
              disabled={isPending}
            >
              {isPending && <ButtonPending />}
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
  orderId,
  pickupDate,
  orderDate,
}: {
  onClose: () => void;
  orderId: string;
  pickupDate?: string;
  orderDate: Date;
}) => {
  const queryClient = useQueryClient();
  const { mutateAsync: updateDate, isPending } = useUpdateOrderDates();
  const [showToast, setShowToast] = useState(false);
  const handleSetDeliveryDate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const date = Object.fromEntries(
      new FormData(e.target as HTMLFormElement)
    ) as { date?: string };
    if (!date.date) {
      setShowToast(true);
      return;
    }
    updateDate({
      orderId,
      type: "delivery",
      date: date.date,
    }).then(() => {
      queryClient.invalidateQueries({
        queryKey: ["Orders", orderId],
      });
      onClose();
    });
  };

  useEffect(() => {
    const toast = setTimeout(() => {
      setShowToast(false);
    }, 2000);

    return () => {
      clearTimeout(toast);
    };
  }, [showToast]);

  const future = new Date(orderDate);
  future.setDate(future.getDate() + 7);
  const maxDate = moment(future).format("YYYY-MM-DD");
  const minDate = moment(pickupDate).format("YYYY-MM-DD");

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
            Choose a delivery date between {minDate} and {maxDate}
          </p>
          <form className="flex space-x-2" onSubmit={handleSetDeliveryDate}>
            <input
              type="date"
              name="date"
              id="date"
              className="input w-full"
              min={minDate}
              max={maxDate}
            />
            <button
              className="btn font-normal"
              type="submit"
              disabled={isPending}
            >
              {isPending && <ButtonPending />}
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

const BuyerInfoModal = ({
  onClose,
  buyer,
}: {
  onClose: () => void;
  buyer: Order["user"];
}) => {
  return (
    <dialog id="buyerInfoModal" className="modal">
      <div className="modal-box">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-lg">Buyer Information</h3>
          <button
            className="btn btn-circle btn-xs btn-outline btn-error hover:text-white shadow-none"
            onClick={onClose}
          >
            <Cross2Icon />
          </button>
        </div>

        {buyer ? (
          <div className="w-full mt-4 border-t border-t-slate-200">
            <div className="flex items-center gap-6 px-6 mt-10 mb-4">
              <div className="avatar">
                <div className="w-16 rounded-full skeleton bg-slate-200">
                  <img src={buyer?.avatar} alt="Buyer Image" />
                </div>
              </div>
              <div className="space-y-1">
                <small>Buyer Name</small>
                <p>{buyer?.name}</p>
              </div>
            </div>
          </div>
        ) : (
          "Buyer infomation not available"
        )}
      </div>
    </dialog>
  );
};
