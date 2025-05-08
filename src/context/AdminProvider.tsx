import { useGetProfile } from "@/api/profile";
import { IMAGES } from "@/constants";
import { useNavigate } from "@tanstack/react-router";
import { createContext } from "react";
import { toast } from "sonner";
interface Prop {
  user: User | undefined;
}
export const AdminContext = createContext<Prop>({ user: undefined });

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token") || "";
  if (!token) {
    navigate({ to: "/auth/login" });
  }

  // Fetch User info here
  const { isLoading, data: user, isError } = useGetProfile(token);

  if (isError) {
    toast.error("Error", {
      description:
        "We're unable to load your account information at the moment. Please login again.",
      id: "logout",
    });
    navigate({ to: "/auth/login" });
  }

  if (isLoading) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center gap-4">
        <img src={IMAGES.logo} alt="Agroxhub" className="w-[140px]" />
        <div className="flex items-center space-x-4">
          <span className="loading loading-spinner loading-lg" />
          <p className="text-sm">Loading Account Information...</p>
        </div>
      </div>
    );
  }

  return (
    <AdminContext.Provider value={{ user }}>{children}</AdminContext.Provider>
  );
};
