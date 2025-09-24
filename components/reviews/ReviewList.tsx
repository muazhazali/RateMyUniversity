import { AnonymousReview } from "@/types/university";
import { ReviewCard } from "./ReviewCard";

interface ReviewListProps {
  reviews: AnonymousReview[];
}

export function ReviewList({ reviews }: ReviewListProps) {
  if (reviews.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium mb-2">No reviews yet</h3>
        <p className="text-muted-foreground">
          Be the first to review this subject!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
}
