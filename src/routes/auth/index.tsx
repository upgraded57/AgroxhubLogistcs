import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/auth/")({
  component: RouteComponent,
});

function RouteComponent() {
  // Clear login info here before navigation
  useEffect(() => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userId");
  }, []);
  return <Navigate to="/auth/login" />;
}
