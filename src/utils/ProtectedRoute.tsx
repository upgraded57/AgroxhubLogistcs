import { AdminContext } from "@/context/adminProvider";
import { useNavigate } from "@tanstack/react-router";
import { use, useEffect } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigate = useNavigate();
  const user = use(AdminContext).user;
  useEffect(() => {
    if (!user) {
      navigate({ to: "/auth" });
      return;
    }
  }, []);

  return children;
}
