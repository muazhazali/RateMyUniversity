import { Subject } from "@/types/university";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "../ui/badge";
import { Rating, RatingButton } from "@/components/ui/shadcn-io/rating";
import Link from "next/link";

interface SubjectCardProps {
  subject: Subject;
  universityShortName: string;
}

export function SubjectCard({
  subject,
  universityShortName,
}: SubjectCardProps) {
  return (
    <Link href={`/universities/${universityShortName}/${subject.code}`}>
      <Card className="hover:scale-103 shadow-none rounded-none cursor-pointer">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="scroll-m-20 text-left text-xl font-extrabold tracking-tight text-balance">
              {subject.code}
            </CardTitle>
            {subject.average_rating !== undefined &&
              subject.average_rating > 0 && subject.average_rating < 999 && (
                <div className="flex items-center gap-2">
                  <Rating
                    value={subject.average_rating}
                    readOnly
                    className="text-yellow-500"
                  >
                    {Array.from({ length: 5 }).map((_, index) => (
                      <RatingButton key={index} size={12} />
                    ))}
                  </Rating>
                  <span className="text-sm font-medium">
                    {subject.average_rating.toFixed(1)}
                  </span>
                </div>
              )}
          </div>
        </CardHeader>
        <CardContent>
          <h3 className="font-medium mb-2 truncate whitespace-nowrap overflow-hidden">
            {subject.name}
          </h3>
          {subject.faculties && (
            <p className="text-sm text-muted-foreground mb-2 truncate whitespace-nowrap overflow-hidden">
              {subject.faculties.name}
            </p>
          )}
          <div className="flex items-center gap-2 mb-2">
            {subject.category_code && (
              <Badge className="text-xs text-muted-foreground rounded-full text-white">
                {subject.category_code}
              </Badge>
            )}
            {subject.review_count !== undefined && subject.review_count > 0 && (
              <Badge variant="outline" className="rounded-full">
                {subject.review_count} reviews
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
