import createClient from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { UniversityService } from "@/services/universityService";
import { SubjectService } from "@/services/subjectService";
import { reviewsService } from "@/services/reviewService";
import { WriteReviewForm } from "@/components/reviews/WriteReviewForm";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { CheckCircle, ChevronLeftIcon } from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: Promise<{ name: string; subjectCode: string }>;
}

export default async function WriteReviewPage({ params }: PageProps) {
  const { name, subjectCode } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(
      `/login?redirect=/universities/${name}/${subjectCode}/write-review`
    );
  }

  const university = await UniversityService.getUniversityByName(name);
  if (!university) {
    redirect("/");
  }

  const subject = await SubjectService.getSubjectByCode(subjectCode);

  if (!subject) {
    redirect(`/universities/${name}`);
  }

  const hasReviewed = await reviewsService.hasReviewed(user.id, subject.id);

  console.log("Has reviewed", hasReviewed);

  if (hasReviewed) {
    return (
      <div className="container mx-auto p-6 max-w-2xl">
        

        {/* Header */}
        <div className="mb-8 space-y-4">
          <Link
            href={`/universities/${name}/${subjectCode}`}
            className="text-sm mb-4 inline-block"
          >
            <Button
              variant="secondary"
              size="icon"
              className="size-8 hover:scale-105 hover:bg-gray-200"
            >
              <ChevronLeftIcon />
            </Button>
          </Link>

          <h1 className="scroll-m-20 text-left text-4xl font-extrabold tracking-tight text-balance">
            Write a Review
          </h1>
          <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            {subjectCode} -{" "}
            <span className="text-blue-500">{subject.name}</span>
          </h2>
        </div>

        {/* Already Reviewed Alert */}
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <AlertTitle className="text-green-800">Already Reviewed</AlertTitle>
          <AlertDescription className="text-green-700 mb-4">
            You have already written a review for this subject. Thank you for
            your contribution!
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <>
      <WriteReviewForm
        subject={subject}
        universityName={university.name}
        universityShortName={name}
        userId={user.id}
      />
    </>
  );
}
