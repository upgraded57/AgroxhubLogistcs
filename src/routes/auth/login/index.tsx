import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { EyeNoneIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useLogin } from "@/api/auth";
import ButtonPending from "@/components/button-pending";

export const Route = createFileRoute("/auth/login/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useLogin();
  const [showPass, setShowPass] = useState(false);
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(
      new FormData(e.target as HTMLFormElement)
    ) as { email: string; password: string };

    mutateAsync(data).then((res) => {
      localStorage.setItem("token", res.data.token);
      navigate({ to: "/" });
    });
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <span className="space-y-2">
        <h2 className="font-semibold text-xl">Login</h2>
        <p className="text-sm">Login to your account</p>
      </span>
      <form className="w-full space-y-6" onSubmit={handleLogin}>
        <label htmlFor="email" className="block w-full">
          <p className="text-sm">Email Address</p>
          <input
            type="email"
            className="input w-full"
            name="email"
            id="email"
            disabled={isPending}
            required
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
              minLength={8}
              disabled={isPending}
              required
            />
            <button
              className="join-item btn btn-square shadow-none"
              type="button"
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
          Login
        </button>
      </form>
      <span className="flex space-x-2">
        <p className="text-sm">"Don't have an account</p>
        <Link
          to="/auth/register"
          className="text-sm text-dark-green-clr hover:underline"
        >
          Click to Register
        </Link>
      </span>
    </div>
  );
}
