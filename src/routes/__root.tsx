import { AdminProvider } from "@/context/AdminProvider";
import { Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <AdminProvider>
      <Outlet />
      {/* <TanStackRouterDevtools /> */}
    </AdminProvider>
  ),
});
