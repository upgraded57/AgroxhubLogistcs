import { useGetProfile } from "@/api/profile";
import { IMAGES } from "@/constants";
import { useNavigate } from "@tanstack/react-router";
import { createContext } from "react";
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
  const { isLoading, data: user } = useGetProfile(token);

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
