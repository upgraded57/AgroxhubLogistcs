import { createFileRoute, Link } from "@tanstack/react-router";
import Lottie from "lottie-react";
import emailAnimation from "@/assets/json/emailAnimation.json";

export const Route = createFileRoute("/auth/check-email/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col justify-between h-full">
      <span className="space-y-2">
        <h2 className="font-semibold text-xl">Registration Successful</h2>
        <p className="text-sm">Check your email inbox</p>
      </span>
      <div className="flex-1 mt-6 flex flex-col gap-4">
        <Lottie
          animationData={emailAnimation}
          loop={false}
          autoPlay={true}
          style={{ width: 100, height: 100 }}
        />
        <div className="space-y-4">
          <p className="text-sm">
            An activation link has been sent to your email address. use the link
            to complete your account creation.
          </p>
          <p className="text-sm">The link expires in 10 minutes</p>
          <a href="https://mail.google.com" target="_blank">
            <button className="btn bg-dark-green-clr text-white font-normal border-none">
              Open email inbox
            </button>
          </a>
        </div>
      </div>
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
