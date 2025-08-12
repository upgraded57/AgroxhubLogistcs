import AppLayout from "@/components/layouts/appLayout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/notifications/$id/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AppLayout title="Notifications" subtitle="Manage your notifications">
      <div>Hello "/(app)/notifications/$id/"!</div>;
    </AppLayout>
  );
}
