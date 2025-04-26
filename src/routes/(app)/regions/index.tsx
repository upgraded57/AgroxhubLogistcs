import AppLayout from "@/components/layouts/AppLayout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/regions/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AppLayout
      title="Service Regions"
      subtitle="Add, remove and update your service regions"
    >
      <h1>Service Regions</h1>
    </AppLayout>
  );
}
