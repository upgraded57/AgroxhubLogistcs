import { AdminContext } from "@/context/AdminProvider";
import { useNavigate } from "@tanstack/react-router";
import { useContext, useEffect } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigate = useNavigate();
  const user = useContext(AdminContext).user;
  useEffect(() => {
    if (!user) {
      navigate({ to: "/" });
      return;
    }
  }, []);
  return children;
}
