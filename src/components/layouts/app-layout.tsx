import { IMAGES } from "@/constants";
import { AdminContext, AdminProvider } from "@/context/adminProvider";
import ProtectedRoute from "@/utils/ProtectedRoute";
import {
  ArchiveIcon,
  AvatarIcon,
  BackpackIcon,
  Cross1Icon,
  // ExclamationTriangleIcon,
  SpeakerLoudIcon,
  ExitIcon,
  FileTextIcon,
  HamburgerMenuIcon,
  LayersIcon,
  PieChartIcon,
  SpeakerModerateIcon,
} from "@radix-ui/react-icons";
import { Link, useRouterState } from "@tanstack/react-router";
import { use, useState, type ReactNode } from "react";
import { AvatarComp } from "../avatar-comp";
import { useGetNotifications } from "@/api/notification";

export default function AppLayout({
  children,
  title,
  subtitle,
  actions,
  badge,
}: {
  children: React.ReactNode;
  title: string;
  badge?: ReactNode;
  subtitle: string;
  actions?: React.ReactNode;
}) {
  const isLoadingRoute = useRouterState({
    select: (state) => state.status === "pending",
  });

  const pathName = useRouterState({
    select: (state) => state.location.pathname,
  });

  return (
    <AdminProvider>
      <div className="main-container w-full bg-white flex items-start space-y-6 overflow-y-hidden">
        {/* Sidebar Large Screen */}
        <AsideComp isLoadingRoute={isLoadingRoute} pathName={pathName} />

        {/* Main */}
        <div className="w-full h-full overflow-y-scroll bg-light-grey-clr">
          {/* Topbar - Small Screen */}
          <div className="mb-4">
            <MobileNav isLoadingRoute={isLoadingRoute} pathName={pathName} />
            {/* <EarlyAccessNotice /> */}
            {!pathName.includes("notification") && <NewNotificationNotice />}
          </div>
          {/* Content */}
          <main className="px-4 lg:p-6">
            <div className="flex flex-col lg:flex-row items-start space-y-4 lg:space-y-0 justify-start lg:items-center lg:justify-between mb-6 max-w-full">
              <div className="space-y-1">
                <div className="flex items-center gap-4">
                  <h2 className="font-medium text-lg">{title}</h2>
                  {badge}
                </div>
                <p className="text-sm font-light">{subtitle}</p>
              </div>
              {actions}
            </div>

            <ProtectedRoute>{children}</ProtectedRoute>
          </main>
        </div>
      </div>
    </AdminProvider>
  );
}

const NavLinks = ({
  isLoadingRoute,
  pathName,
}: {
  isLoadingRoute: boolean;
  pathName: string;
}) => {
  const { data: notifications } = useGetNotifications();
  const links = [
    {
      title: "Dashboard",
      href: "/",
      icon: <FileTextIcon />,
    },
    {
      title: "Orders",
      href: "/orders",
      icon: <PieChartIcon />,
    },
    {
      title: "Service Regions",
      href: "/regions",
      icon: <LayersIcon />,
    },
    {
      title: "Deliverables",
      href: "/deliverables",
      icon: <ArchiveIcon />,
    },
    {
      title: "Finance",
      href: "/finance",
      icon: <BackpackIcon />,
    },
    {
      title: "Notifications",
      href: "/notifications",
      icon: <SpeakerModerateIcon />,
    },
    {
      title: "Profile",
      href: "/profile",
      icon: <AvatarIcon />,
    },
    {
      title: "Logout",
      icon: <ExitIcon />,
      href: "/auth",
    },
  ];

  return links.map((item, idx) => (
    <Link to={item.href} key={idx}>
      {({ isActive }) => (
        <div className="flex items-center space-x-4 py-4">
          {isActive && (
            <span
              className={`w-1 h-7 rounded m-0 ${isLoadingRoute && pathName === item.href ? "bg-grey-clr" : "bg-dark-green-clr"}`}
            />
          )}
          <div className="flex items-center space-x-4 pl-6">
            <span
              className={`text scale-110 ${isLoadingRoute && pathName === item.href ? "text-grey-clr" : isActive ? "text-dark-green-clr" : "text-grey-clr"} ${item.title.toLowerCase() === "logout" && "text-red-clr"}`}
            >
              {item.icon}
            </span>
            <p
              className={`text-sm ${isActive ? "font-medium" : "font-light text-grey-clr"} ${item.title.toLowerCase() === "logout" && "text-red-clr"}`}
            >
              {item.title}
            </p>
            {item.href.includes("notification") &&
            pathName !== "/notifications" &&
            notifications &&
            notifications.filter((n) => n.unread).length ? (
              <span className="w-5 h-5 aspect-square bg-orange-clr rounded-full flex items-center justify-center text-xs text-white font-semibold">
                {notifications.filter((n) => n.unread).length}
              </span>
            ) : (
              ""
            )}
            {isLoadingRoute && pathName === item.href && (
              <span className="loading loading-spinner loading-sm text-grey-clr" />
            )}
          </div>
        </div>
      )}
    </Link>
  ));
};

const AsideComp = ({
  isLoadingRoute,
  pathName,
}: {
  isLoadingRoute: boolean;
  pathName: string;
}) => {
  const user = use(AdminContext).user;
  return (
    <aside className="hidden min-w-[300px] max-w-[300px] h-full shadow border-r-[1px] border-r-light-grey-clr lg:flex flex-col justify-between">
      <div>
        <Link
          to="/"
          className="h-[70px] w-max mx-auto flex items-center justify-center"
        >
          <img src={IMAGES.logo} alt="Agroxhub" className="w-[148px]" />
        </Link>
        <NavLinks isLoadingRoute={isLoadingRoute} pathName={pathName} />
      </div>
      <div className="w-[80%] mx-auto p-4 rounded-lg shadow border-[1px] border-light-grey-clr mb-6">
        <div className="flex items-center space-x-3">
          <AvatarComp user={user} />
          <span className="space-y-0 overflow-x-hidden">
            <p className="font-medium text-sm">{user?.name}</p>
            <small className="truncate text-ellipsis">{user?.email}</small>
          </span>
        </div>
      </div>
    </aside>
  );
};

const MobileNav = ({
  isLoadingRoute,
  pathName,
}: {
  isLoadingRoute: boolean;
  pathName: string;
}) => {
  const user = use(AdminContext)?.user;
  const [navOpen, setNavOpen] = useState(false);
  return (
    <>
      <div className="w-full bg-white flex justify-between items-center lg:hidden shadow h-15 px-4 sticky top-0 z-[20]">
        <div className="flex space-x-2 items-center">
          <button
            className="btn btn-square bg-transparent p-2 h-auto w-auto btn-ghost"
            onClick={() => setNavOpen((prev) => !prev)}
          >
            {navOpen ? <Cross1Icon /> : <HamburgerMenuIcon />}
          </button>
          <Link className="w-max" to="/">
            <img
              src={IMAGES.logo}
              alt="Agroxhub"
              className="w-[140px] h-auto"
            />
          </Link>
        </div>
        <Link to="/profile">
          <AvatarComp user={user} />
        </Link>
      </div>

      {/* Sidebar small screen */}
      <div
        className={`fixed top-15 w-full z-10 h-[100dvh] bg-black/50 transition-all ${navOpen ? "left-0" : "-left-[100%]"}`}
      >
        <div
          className={`w-[300px] border-t-[1px] border-t-light-grey-clr h-full bg-white shadow-lg`}
        >
          <NavLinks isLoadingRoute={isLoadingRoute} pathName={pathName} />
        </div>
      </div>
    </>
  );
};

// const EarlyAccessNotice = () => {
//   const [showNotice, setShowNotice] = useState(
//     !!sessionStorage.getItem("closeNotice")
//   );
//   return (
//     !showNotice && (
//       <>
//         <div className="h-8 w-full flex items-center justify-center bg-yellow-600 text-white gap-2 border-b border-b-black">
//           <ExclamationTriangleIcon />
//           <p className="text-sm">Early Access.</p>
//           <p
//             className="text-sm underline cursor-pointer"
//             onClick={() =>
//               (
//                 document.getElementById("earlyAccessModal") as HTMLDialogElement
//               ).showModal()
//             }
//           >
//             Learn More
//           </p>

//           <button
//             className="btn btn-xs shadow-none bg-transparent border-none btn-square absolute right-2"
//             onClick={() => {
//               sessionStorage.setItem("closeNotice", "1");
//               setShowNotice(true);
//             }}
//           >
//             <Cross1Icon className="text-base-content" />
//           </button>
//         </div>

//         {/* Early access dialog */}
//         <dialog id="earlyAccessModal" className="modal">
//           <div className="modal-box">
//             <h3 className="font-semibold text-lg">Early Access!</h3>
//             <p className="py-4 text-sm">
//               This is the early access version of the app. Some pages may
//               contain placeholder texts with dummy data and some functionalities
//               may not work. Features will continue to roll out, so check out
//               often!
//             </p>
//             <p className="py-4 text-sm">
//               We welcome suggestions! Reach out to us at{" "}
//               <a
//                 href="mailto:developer@agroxhub.com"
//                 target="_blank"
//                 className="font-medium underline"
//               >
//                 developer@agroxhub.com
//               </a>{" "}
//               to submit a suggestion
//             </p>
//             <div className="modal-action">
//               <form method="dialog">
//                 {/* if there is a button in form, it will close the modal */}
//                 <button className="btn">Close</button>
//               </form>
//             </div>
//           </div>
//         </dialog>
//       </>
//     )
//   );
// };

const NewNotificationNotice = () => {
  const [showNotifNotice, setShowNotifNotice] = useState(
    !!sessionStorage.getItem("closeNotifNotice")
  );

  const { isLoading, data: notifications } = useGetNotifications();
  return (
    !isLoading &&
    !showNotifNotice &&
    notifications &&
    notifications.filter((n) => n.unread).length > 0 && (
      <>
        <div className="h-8 w-full flex items-center justify-center bg-yellow-600 text-white gap-2 relative">
          <SpeakerLoudIcon />
          <p className="text-sm">
            You have {notifications.filter((n) => n.unread).length} new
            notifications.
          </p>
          <Link
            to="/notifications"
            className="text-sm underline cursor-pointer"
          >
            View Notifications
          </Link>

          <button
            className="btn btn-xs shadow-none bg-transparent border-none btn-square absolute right-2"
            onClick={() => {
              sessionStorage.setItem("closeNotifNotice", "1");
              setShowNotifNotice(true);
            }}
          >
            <Cross1Icon className="text-base-content" />
          </button>
        </div>
      </>
    )
  );
};
