import AppLayout from "@/components/layouts/AppLayout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/finance/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AppLayout title="Finance" subtitle="Manage your financial information">
      <h1>Finance</h1>
    </AppLayout>
  );
}
