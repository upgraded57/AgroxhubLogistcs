import { createFileRoute, Outlet } from "@tanstack/react-router";
import { IMAGES } from "@/constants";

export const Route = createFileRoute("/auth")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex items-center justify-center h-screen relative bg-base-200 px-6">
      <div className="absolute top-6 left-6">
        <img src={IMAGES.logo} alt="Agroxhub" className="w-[148px]" />
      </div>
      <div className="h-[500px] flex items-stretch max-w-screen-lg w-full mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
        {/* Auth Image will show here */}
        <div className="hidden lg:flex flex-[60%] bg-dark-green-clr text-white p-4"></div>
        <div className="flex-[40%] bg-white p-6 w-full border-[1px] border-light-grey-clr">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
