import { IMAGES } from "@/constants";
import { Link } from "@tanstack/react-router";
export default function AuthLayout({
  children,
  title = "Login",
  subtitle = "Login to your account",
}: {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}) {
  return (
    <div className="flex items-center justify-center h-screen relative bg-base-200 px-6">
      <div className="absolute top-6 left-6">
        <img src={IMAGES.logo} alt="Agroxhub" className="w-[148px]" />
      </div>
      <div className="h-[500px] flex items-stretch max-w-screen-lg w-full mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
        {/* Auth Image will show here */}
        <div className="hidden lg:flex flex-[60%] bg-dark-green-clr text-white p-4"></div>
        <div className="flex-[40%] flex flex-col justify-between bg-white p-6 w-full border-[1px] border-light-grey-clr ">
          <span className="space-y-2">
            <h2 className="font-semibold text-xl">{title}</h2>
            <p className="text-sm">{subtitle}</p>
          </span>
          {children}
          <span className="flex space-x-2">
            <p className="text-sm">
              {title.toLowerCase() === "login"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link
              to={
                title.toLowerCase() === "login"
                  ? "/auth/register"
                  : "/auth/login"
              }
              className="text-sm text-dark-green-clr hover:underline"
            >
              {title.toLowerCase() === "login"
                ? "Click to Register"
                : "Click to Login"}
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
