import { createContext } from "react";

interface Prop {
  user: any | null;
}
export const AdminContext = createContext<Prop>({ user: null });

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const user = {
    name: "Logistic Provider",
    email: "Logistic@sample.com",
  };

  return (
    <AdminContext.Provider value={{ user }}>{children}</AdminContext.Provider>
  );
};
