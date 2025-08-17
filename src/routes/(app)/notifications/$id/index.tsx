import { Link, createFileRoute, useParams } from "@tanstack/react-router";
import moment from "moment";
import { useGetSingleNotification } from "@/api/notification";
import Pending from "@/components/pending";
import AppLayout from "@/components/layouts/appLayout";
import { FaStar } from "react-icons/fa6";

export const Route = createFileRoute("/(app)/notifications/$id/")({
  component: RouteComponent,
});

let type: NotificationList["type"];

const Breadcrumb = () => {
  const getTitle = () => {
    switch (type) {
      case "follow":
        return "New Follower";
      case "productReview":
        return "Service Review";
      case "productSave":
        return "Product Save";
      case "orderPlacement":
        return "Order Placement";
      case "orderPickup":
        return "Order Pickup Schedule";
      case "orderInTransit":
        return "Scheduled Delivery Notice";
      case "orderDelivery":
        return "Order Delivery";
      case "milestone":
        return "New Milestone";
      case "orderAssignment":
        return "New Order Assignment";
      case "outOfStock":
        return "New Follower";
      default:
        return "Notification";
    }
  };
  return (
    <div className="flex items-center gap-2 text-xs my-4">
      <Link
        to="/notifications"
        className="font-light text-slate-500 hover:underline"
      >
        Notifications
      </Link>
      <p className="font-light text-slate-500">/</p>
      <p className="font-medium text-dark-green-clr">{getTitle()}</p>
    </div>
  );
};

const Profile = ({
  image,
  name,
  slug,
}: {
  image?: string;
  name: string;
  slug: string;
}) => {
  const initials = name?.split(" ")[0][0] + name?.split(" ")[1][0];
  return (
    <div className="flex items-center gap-4">
      {image ? (
        <div className="avatar skeleton rounded-full">
          <div className="w-16 rounded-full overflow-hidden">
            <img src={image} className="w-full h-full object-cover" />
          </div>
        </div>
      ) : (
        <div className="avatar avatar-placeholder">
          <div className="bg-dark-green-clr w-16 rounded-full text-white">
            <span className="text-xl uppercase font-medium">{initials}</span>
          </div>
        </div>
      )}
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-xs text-slate-500">{slug}</p>
      </div>
    </div>
  );
};

function RouteComponent() {
  const id = useParams({
    from: "/(app)/notifications/$id/",
    select: (p) => p.id,
  });

  const { isLoading, data: notification } = useGetSingleNotification(id);

  if (notification) {
    type = notification.type;
  }

  if (isLoading)
    return (
      <div className="w-full h-full">
        <Pending />
      </div>
    );

  const NotificationComponent = () => {
    switch (notification?.type) {
      case "orderPlacement":
        return <OrderPlacementNotification notification={notification} />;
      case "productReview":
        return <ProductReviewNotification notification={notification} />;
      case "orderAssignment":
        return <OrderAssignmentNotification notification={notification} />;
      case "outOfStock":
      default:
        return;
    }
  };
  return (
    <AppLayout title="Notifications" subtitle="">
      <NotificationComponent />
    </AppLayout>
  );
}

const OrderAssignmentNotification = ({
  notification,
}: {
  notification: NotificationList;
}) => {
  return (
    <>
      <Breadcrumb />
      <div className="p-4 my-6 space-y-12 bg-white rounded-lg">
        {/* Buyer Details */}
        <div className="space-y-3">
          <p className="text-sm">Buyer Details</p>
          <div className="pl-2">
            <Profile
              name={notification.buyer?.name || "---"}
              slug="Buyer"
              image={notification.buyer?.avatar}
            />
          </div>
        </div>

        {/* Order Details */}
        <div className="space-y-3">
          <p className="text-sm">Order Details</p>
          <div className="pl-2 space-y-2">
            <div className="grid grid-cols-7 gap-x-2">
              <div className="col-span-2">
                <p className="text-slate-400 text-sm">Order ID</p>
              </div>
              <div className="col-span-5">
                <p className="text-sm">{notification.order?.id}</p>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-x-2">
              <div className="col-span-2">
                <p className="text-slate-400 text-sm">Order Date</p>
              </div>
              <div className="col-span-5">
                <p className="text-sm">
                  {moment(notification.createdAt).format(
                    "dddd MMM DD, YYYY. hh:mma"
                  )}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-x-2">
              <div className="col-span-2">
                <p className="text-slate-400 text-sm">Total Amount</p>
              </div>
              <div className="col-span-5">
                <p className="font-semibold text-sm">
                  N {notification.order?.amount.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Products Ordered */}
        <div className="space-y-3">
          <p className="text-sm">Products Ordered</p>
          <div className="pl-2">
            <div className="overflow-x-auto rounded-box border border-base-content/5">
              <table className="table text-sm">
                {/* head */}
                <thead>
                  <tr>
                    <th className="font-normal">Product</th>
                    <th className="font-normal">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {notification.products?.map((product, idx) => (
                    <tr key={idx}>
                      <td>
                        <div className="flex items-center gap-2">
                          <span className="w-8 h-8 rounded-sm overflow-hidden aspect-square skeleton">
                            <img
                              src={product.image}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </span>
                          <p>{product.name}</p>
                        </div>
                      </td>
                      <td>{product.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Delivery Information */}
        <div className="space-y-3">
          <p className="text-sm">Delivery Information</p>
          <div className="pl-2 space-y-2">
            <div className="grid grid-cols-7 gap-x-2">
              <div className="col-span-2">
                <p className="text-slate-400 text-sm">Delivery Address</p>
              </div>
              <div className="col-span-5">
                <p className="text-sm">{notification.order?.deliveryAddress}</p>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-x-2">
              <div className="col-span-2">
                <p className="text-slate-400 text-sm">Region</p>
              </div>
              <div className="col-span-5">
                <p className="text-sm">{`${notification.order?.deliveryRegion.name}, ${notification.order?.deliveryRegion.lcda}, ${notification.order?.deliveryRegion.state}`}</p>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-x-2">
              <div className="col-span-2">
                <p className="text-slate-400 text-sm">Pickup Date</p>
              </div>
              <div className="col-span-5">
                <p className="text-sm">
                  {notification.pickupDate
                    ? moment(notification.pickupDate).format(
                        "dddd MMM DD, YYYY"
                      )
                    : "Not yet set"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-x-2">
              <div className="col-span-2">
                <p className="text-slate-400 text-sm">Delivery Date</p>
              </div>
              <div className="col-span-5">
                <p className="text-sm">
                  {notification.deliveryDate
                    ? moment(notification.deliveryDate).format(
                        "dddd MMM DD, YYYY"
                      )
                    : "Not yet set"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <Link
          to="/orders/$orderId"
          params={{ orderId: notification.orderGroupId || "" }}
        >
          <button className="btn bg-dark-green-clr shadow-0 text-white">
            Go to Order
          </button>
        </Link>
      </div>
    </>
  );
};

const OrderPlacementNotification = ({
  notification,
}: {
  notification: NotificationList;
}) => {
  return (
    <>
      <Breadcrumb />
      <div className="px-4 my-6 space-y-12">
        {/* Items to ship */}
        <div className="space-y-3">
          <p className="text-sm">Items to Ship</p>
          <div className="pl-2">
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
              <table className="table text-sm">
                {/* head */}
                <thead>
                  <tr>
                    <th className="font-normal">Product</th>
                    <th className="font-normal">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4].map((_, idx) => (
                    <tr key={idx}>
                      <td>
                        <div className="flex items-center gap-2">
                          <span className="w-8 h-8 rounded-sm overflow-hidden aspect-square skeleton">
                            <img
                              src="https://picsum.dev/50/50"
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </span>
                          <p>Fresh Tomatoes</p>
                        </div>
                      </td>
                      <td>4 Bags</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Pickup Information */}
        <div className="space-y-3">
          <p className="text-sm">Pickup Information</p>
          <div className="pl-2 space-y-2">
            <div className="grid grid-cols-7 gap-x-2">
              <div className="col-span-2">
                <p className="text-slate-400 text-sm">Delivery Address</p>
              </div>
              <div className="col-span-5">
                <p className="text-sm">Somewhere in Lagos, Nigeria</p>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-x-2">
              <div className="col-span-2">
                <p className="text-slate-400 text-sm">Region</p>
              </div>
              <div className="col-span-5">
                <p className="text-sm">Akoko, Ipaja, Lagos</p>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-x-2">
              <div className="col-span-2">
                <p className="text-slate-400 text-sm">Pickup Date</p>
              </div>
              <div className="col-span-5">
                <p className="text-sm">Not yet set </p>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-x-2">
              <div className="col-span-2">
                <p className="text-slate-400 text-sm">Delivery Date</p>
              </div>
              <div className="col-span-5">
                <p className="text-sm">Not yet set </p>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Information */}
        <div className="space-y-3">
          <p className="text-sm">Delivery Information</p>
          <div className="pl-2 space-y-2">
            <div className="grid grid-cols-7 gap-x-2">
              <div className="col-span-2">
                <p className="text-slate-400 text-sm">Delivery Address</p>
              </div>
              <div className="col-span-5">
                <p className="text-sm">Somewhere in Lagos, Nigeria</p>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-x-2">
              <div className="col-span-2">
                <p className="text-slate-400 text-sm">Region</p>
              </div>
              <div className="col-span-5">
                <p className="text-sm">Akoko, Ipaja, Lagos</p>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-x-2">
              <div className="col-span-2">
                <p className="text-slate-400 text-sm">Pickup Date</p>
              </div>
              <div className="col-span-5">
                <p className="text-sm">
                  {notification.pickupDate
                    ? moment(notification.pickupDate).format(
                        "dddd MMM DD, YYYY"
                      )
                    : "Not yet set"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-x-2">
              <div className="col-span-2">
                <p className="text-slate-400 text-sm">Delivery Date</p>
              </div>
              <div className="col-span-5">
                <p className="text-sm">
                  {notification.deliveryDate
                    ? moment(notification.deliveryDate).format(
                        "dddd MMM DD, YYYY"
                      )
                    : "Not yet set"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <Link to="/notifications/$id" params={{ id: "haggahga" }}>
          <button className="btn btn-success text-white">Go to Order</button>
        </Link>
      </div>
    </>
  );
};

const ProductReviewNotification = ({
  notification,
}: {
  notification: NotificationList;
}) => {
  const productRatings = (rating: number) => {
    const positive = Array.from({ length: rating }, (_, index) => index);
    const empty = Array.from({ length: 5 - rating }, (_, index) => index);

    return { positive, empty };
  };

  const rating = productRatings(
    notification?.rating ? parseInt(notification?.rating) : 4
  );
  return (
    <div>
      <Breadcrumb />
      <div className="my-6 space-y-8 bg-white p-6 rounded-lg">
        <p className="text-sm">{notification.summary}</p>
        <Profile
          name={notification.user?.name || ""}
          slug={moment(notification.createdAt).format(
            "dddd MMM DD, YYYY. hh:mma"
          )}
          image={notification.user?.avatar}
        />

        {/* Rating */}
        <div className="space-y-1">
          <p className="text-slate-500 text-sm">Rating</p>
          <div className="flex gap-2 items-center text-md">
            {rating.positive.map((_, idx) => (
              <FaStar key={idx} className="text-orange-400 text-xl" />
            ))}
            {rating.empty.map((_, idx) => (
              <FaStar className="text-gray-300 text-xl" key={idx} />
            ))}
          </div>
        </div>

        {/* Review */}
        <div className="space-y-1">
          <p className="text-slate-500 text-sm">Review</p>
          <p className="pr-0 lg:pr-6 text-sm">{notification?.review}</p>
        </div>

        {/* <Link
          to="/product/$slug/reviews"
          params={{ slug: notification.product?.slug || "" }}
          className="btn btn-outline border-yellow-clr text-yellow-clr hover:bg-yellow-clr hover:text-white"
        >
          View Product Reviews
        </Link> */}
      </div>
    </div>
  );
};
