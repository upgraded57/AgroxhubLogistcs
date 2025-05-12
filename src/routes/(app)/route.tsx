import { AdminProvider } from "@/context/adminProvider";
import { createFileRoute } from "@tanstack/react-router";
import { Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AdminProvider>
      <Outlet />
    </AdminProvider>
  );
}
