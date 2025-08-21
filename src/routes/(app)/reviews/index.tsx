import { useGetReviews } from "@/api/reviews";
import AppLayout from "@/components/layouts/app-layout";
import ProductRatings from "@/components/product-rating";
import { createFileRoute } from "@tanstack/react-router";
import Lottie from "lottie-react";
import moment from "moment";
import AnimationNoFile from "@/assets/json/AnimationNoFile.json";
import EmptyState from "@/components/empty-state";

export const Route = createFileRoute("/(app)/reviews/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { isLoading, data } = useGetReviews();
  const reviews = data?.reviews;
  return (
    <AppLayout
      title="Reviews"
      subtitle="See what customers are saying about your services"
    >
      {isLoading ? (
        <div></div>
      ) : (
        <ul className="list space-y-4">
          {reviews && reviews.length ? (
            reviews.map((review, idx) => (
              <li key={idx}>
                <div className="flex flex-col lg:flex-row items-start gap-4 lg:gap-20 bg-white p-4 rounded-xl shadow">
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="w-12 rounded-full">
                        <img
                          src={review.user.avatar || ""}
                          alt={review.user.name}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col min-w-max">
                      <p className="text-sm">{review.user.name}</p>
                      <small>{moment(review.createdAt).fromNow()}</small>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm">{review.review}</p>
                    <ProductRatings ratings={String(review.rating)} />
                  </div>
                </div>
              </li>
            ))
          ) : (
            <EmptyState />
          )}
        </ul>
      )}
    </AppLayout>
  );
}
