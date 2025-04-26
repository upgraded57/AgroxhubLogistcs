import { IMAGES } from "@/constants";
import {
  BackpackIcon,
  EnterIcon,
  FileTextIcon,
  HomeIcon,
  MixerHorizontalIcon,
  SpeakerModerateIcon,
} from "@radix-ui/react-icons";
import { Link } from "@tanstack/react-router";

export default function AppLayout({
  children,
  title,
  subtitle,
  actions,
}: {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  actions?: React.ReactNode;
}) {
  const links = [
    {
      title: "Dashboard",
      href: "/",
      icon: <FileTextIcon />,
    },
    {
      title: "Orders",
      href: "/orders",
      icon: <EnterIcon />,
    },
    {
      title: "Service Regions",
      href: "/regions",
      icon: <HomeIcon />,
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
      icon: <MixerHorizontalIcon />,
    },
  ];
  return (
    <div className="w-full h-screen bg-white flex items-start space-y-6 overflow-y-hidden">
      {/* Sidebar */}
      <aside className="min-w-[300px] max-w-[300px] h-full shadow border-r-[1px] border-r-light-grey-clr flex flex-col justify-between">
        <div>
          <div className="h-[70px] w-full flex items-center justify-center">
            <img src={IMAGES.logo} alt="Agroxhub" className="w-[148px]" />
          </div>
          {links.map((item, idx) => (
            <Link to={item.href} key={idx}>
              {({ isActive }) => (
                <div className="flex items-center space-x-4 py-4">
                  {isActive && (
                    <span className="w-1 h-7 rounded bg-dark-green-clr m-0" />
                  )}
                  <div className="flex items-center space-x-4 pl-6">
                    <span
                      className={`text scale-110 ${isActive ? "text-dark-green-clr" : "text-grey-clr"}`}
                    >
                      {item.icon}
                    </span>
                    <p
                      className={`text-sm ${isActive ? "font-medium" : "font-light text-grey-clr"}`}
                    >
                      {item.title}
                    </p>
                  </div>
                </div>
              )}
            </Link>
          ))}
        </div>
        <div className="w-[80%] mx-auto p-4 rounded-lg shadow border-[1px] border-light-grey-clr mb-6">
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="w-10 rounded-full">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>

            <span className="space-y-0">
              <p className="font-medium text-sm">ABC Logistics</p>
              <small className="text-xs font-light">Logistics Provider</small>
            </span>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="w-full h-full overflow-y-scroll p-6 bg-light-grey-clr">
        <div className="flex items-center justify-between">
          <div className="space-y-1 mb-6">
            <h2 className="font-medium text-lg">{title}</h2>
            <p className="text-sm font-light">{subtitle}</p>
          </div>
          {actions}
        </div>
        {children}
      </main>
    </div>
  );
}
