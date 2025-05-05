import AuthLayout from "@/components/layouts/AuthLayout";
import {
  createFileRoute,
  Link,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";
import Lottie from "lottie-react";
import successAnimation from "@/assets/json/AnimationSuccess.json";
import failAnimation from "@/assets/json/AnimationFail.json";
import loadingAnimation from "@/assets/json/AnimationLoading.json";
import { useEffect } from "react";
import { useActivateAccount, useResendActivationLink } from "@/api/auth";

export const Route = createFileRoute("/auth/verify-email/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const params = useSearch({ from: "/auth/verify-email/" }) as {
    token: string;
    type?: "create" | "reset";
  };

  const { token, type } = params;
  const { mutate, isPending, isSuccess } = useActivateAccount();
  const { mutate: resendLink, isPending: isResendingLink } =
    useResendActivationLink();

  useEffect(() => {
    if (!token && !type) {
      navigate({ to: "/auth/register" });
    } else {
      mutate(token);
    }
  }, []);

  return (
    <AuthLayout title="Verify email" subtitle="Verify your email address">
      <div className="flex-1 mt-6 flex flex-col gap-4">
        <Lottie
          animationData={
            isPending
              ? loadingAnimation
              : isSuccess
                ? successAnimation
                : failAnimation
          }
          loop={isPending}
          autoPlay={true}
          style={{ width: 100, height: 100 }}
        />

        {isPending ? (
          <p className="text-sm">
            Please wait while we <br />
            verify your email address
          </p>
        ) : isSuccess ? (
          <div className="space-y-4">
            <p className="text-sm">
              Email Verification Successful. <br />
              You can proceed to sign in to your account
            </p>
            <Link to="/auth/login">
              <button className="btn bg-dark-green-clr text-white font-normal border-none">
                Proceed to Login
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm">
              Email Verification Failed. <br />
              You can request another verification link
              <br /> using the button below.
            </p>
            <button
              className="btn bg-dark-green-clr text-white font-normal border-none"
              onClick={() => {
                resendLink(token);
              }}
              disabled={isResendingLink}
            >
              {isResendingLink && <span className="loading loading-spinner" />}
              Request new Link
            </button>
          </div>
        )}
      </div>
    </AuthLayout>
  );
}
