import AppLayout from "@/components/layouts/AppLayout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/notifications/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AppLayout title="Notifications" subtitle="Manage your notifications">
      <h1>Notifications</h1>
    </AppLayout>
  );
}
