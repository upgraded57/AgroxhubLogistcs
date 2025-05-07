import { useGetProfile } from "@/api/profile";
import { createContext } from "react";

interface Prop {
  user: User | undefined;
}
export const AdminContext = createContext<Prop>({ user: undefined });

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const userId = localStorage.getItem("userId") || "";

  // Fetch User info here
  const { isLoading, data: user } = useGetProfile(userId);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }
  return <AdminContext value={{ user }}>{children}</AdminContext>;
};
