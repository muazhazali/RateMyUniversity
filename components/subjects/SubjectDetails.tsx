import { Subject } from "@/types/university";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PenTool } from "lucide-react";
import { RippleButton } from "../ui/shadcn-io/ripple-button";
import Link from "next/link";

interface SubjectDetailsProps {
  subject: Subject;
  universityShortName: string;
}

export function SubjectDetails({ subject, universityShortName }: SubjectDetailsProps) {
  return (
    <Card className="mb-8 shadow-none rounded-none border-none pl-0">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="scroll-m-20 text-left text-4xl font-extrabold tracking-tight text-balance">
              {subject.code}
            </h1>
            <h2 className="scroll-m-20 pb-2 text-3xl text-blue-500 font-semibold tracking-tight first:mt-0">
              {subject.name}
            </h2>
          </div>
          <Link href={`/universities/${universityShortName}/${subject.code}/write-review`}>
            <RippleButton variant="default">
              <PenTool size={16} />
              Write a Review
            </RippleButton>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {subject.faculties && (
            <div>
              <h4 className="scroll-m-20 text-lg font-semibold tracking-tight">
                Faculty
              </h4>
              <p className="leading-7 [&:not(:first-child)]:mt-2">
                {subject.faculties.name}
              </p>
            </div>
          )}

          {subject.universities && (
            <div>
              <h4 className="scroll-m-20 text-lg font-semibold tracking-tight">
                University
              </h4>
              <p className="leading-7 [&:not(:first-child)]:mt-2">
                {subject.universities.name}
              </p>
            </div>
          )}

          {subject.credits && (
            <div>
              <h4 className="scroll-m-20 text-lg font-semibold tracking-tight">
                Credits
              </h4>
              <p className="leading-7 [&:not(:first-child)]:mt-2">
                {subject.credits}
              </p>
            </div>
          )}
        </div>

        {subject.category_code && (
          <div>
            <h4 className="scroll-m-20 text-lg font-semibold tracking-tight">
              Category
            </h4>
            <Badge className="rounded-full mt-2">{subject.category_code}</Badge>
          </div>
        )}

        {subject.description && (
          <div>
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              Description
            </h4>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              {subject.description}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
