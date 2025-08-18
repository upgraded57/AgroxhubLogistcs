import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { EyeNoneIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { useRegister } from "@/api/auth";
import ButtonPending from "@/components/button-pending";

export const Route = createFileRoute("/auth/register/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useRegister();
  const [showPass, setShowPass] = useState(false);
  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(
      new FormData(e.target as HTMLFormElement)
    ) as { email: string; name: string; password: string };

    mutateAsync(data).then((res) => {
      if (res) {
        navigate({ to: "/auth/check-email" });
      }
    });
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <span className="space-y-2">
        <h2 className="font-semibold text-xl">Register</h2>
        <p className="text-sm">
          Register as a Logistics Provider with Agroxhub
        </p>
      </span>
      <form className="w-full space-y-6" onSubmit={handleRegister}>
        <label htmlFor="name" className="block w-full">
          <p className="text-sm">Company Name</p>
          <input type="text" className="input w-full" name="name" id="name" />
        </label>
        <label htmlFor="email" className="block w-full">
          <p className="text-sm">Email Address</p>
          <input
            type="email"
            className="input w-full"
            name="email"
            id="email"
          />
        </label>
        <label htmlFor="password" className="block w-full">
          <p className="text-sm">Password</p>
          <div className="join w-full">
            <input
              type={showPass ? "text" : "password"}
              className="input w-full join-item"
              name="password"
              id="password"
            />
            <button
              type="button"
              className="join-item btn btn-square shadow-none"
              onClick={() => setShowPass((prev) => !prev)}
            >
              {showPass ? <EyeNoneIcon /> : <EyeOpenIcon />}
            </button>
          </div>
        </label>
        <button
          type="submit"
          className="btn text-sm font-normal bg-dark-green-clr text-white border-none"
          disabled={isPending}
        >
          {isPending && <ButtonPending />}
          Create Account
        </button>
      </form>
      <span className="flex space-x-2">
        <p className="text-sm">"Already have an account?</p>
        <Link
          to="/auth/login"
          className="text-sm text-dark-green-clr hover:underline"
        >
          Click to Login
        </Link>
      </span>
    </div>
  );
}
