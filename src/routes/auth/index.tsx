import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/auth/")({
  component: RouteComponent,
});

function RouteComponent() {
  // Clear login info here before navigation
  useEffect(() => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userId");
    toast.success("Logout successful", {
      description: "Hope to have you back soon",
      id: "logout",
    });
  }, []);
  return <Navigate to="/auth/login" />;
}
