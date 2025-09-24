import { AnonymousReview } from "@/types/university";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Rating, RatingButton } from "@/components/ui/shadcn-io/rating";
import { BadgeCheckIcon } from "lucide-react";

interface ReviewCardProps {
  review: AnonymousReview;
}

function StarRating({ rating, label }: { rating: number; label: string }) {
  return (
    <div className="flex flex-col items-start text-sm">
      <span className="text-muted-foreground mb-1">{label}</span>
      <div className="flex items-center gap-2">
        <Rating value={rating} readOnly className="text-yellow-500">
          {Array.from({ length: 5 }).map((_, index) => (
            <RatingButton key={index} size={12} />
          ))}
        </Rating>
      </div>
    </div>
  );
}

export function ReviewCard({ review }: ReviewCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card className="w-full rounded-none shadow-accent mb-4">
      <CardHeader className="pb-1">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Rating
                value={review.overall_rating}
                readOnly
                className="text-yellow-500"
              >
                {Array.from({ length: 5 }).map((_, index) => (
                  <RatingButton key={index} size={20} />
                ))}
              </Rating>
              <span className="font-semibold text-lg">
                {review.overall_rating.toFixed(1)}
              </span>
            </div>
            {review.is_verified_student && (
              <Badge
                variant="secondary"
                className="bg-blue-500 text-white dark:bg-blue-600 w-fit mt-2"
              >
                <BadgeCheckIcon />
                Verified Student
              </Badge>
            )}
          </div>
          <span className="text-sm text-muted-foreground">
            {formatDate(review.created_at)}
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {review.content && (
          <div>
            <h4 className="scroll-m-20 text-md font-normal tracking-tight">
              {review.content}
            </h4>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StarRating rating={review.difficulty_rating} label="Difficulty" />
          <StarRating rating={review.workload_rating} label="Workload" />
          <StarRating
            rating={review.teaching_quality_rating}
            label="Teaching Quality"
          />
        </div>
      </CardContent>
    </Card>
  );
}
