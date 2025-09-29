"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Subject } from "@/types/university";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Rating, RatingButton } from "@/components/ui/shadcn-io/rating";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, ChevronLeftIcon } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import createClient from "@/lib/supabase/client";
import Link from "next/link";

// Form validation schema
const reviewFormSchema = z.object({
  overall_rating: z.number().min(1, "Overall rating is required").max(5),
  difficulty_rating: z.number().min(1, "Difficulty rating is required").max(5),
  workload_rating: z.number().min(1, "Workload rating is required").max(5),
  teaching_quality_rating: z
    .number()
    .min(1, "Teaching quality rating is required")
    .max(5),
  content: z.string().optional(),
});

type ReviewFormValues = z.infer<typeof reviewFormSchema>;

interface WriteReviewFormProps {
  subject: Subject;
  universityName: string;
  universityShortName: string;
  userId: string;
}

export function WriteReviewForm({
  subject,
  universityName,
  universityShortName,
  userId,
}: WriteReviewFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form with react-hook-form and zod validation
  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      overall_rating: 0,
      difficulty_rating: 0,
      workload_rating: 0,
      teaching_quality_rating: 0,
      content: "",
    },
  });

  // Form submission handler
  const onSubmit = async (values: ReviewFormValues) => {
    setIsSubmitting(true);
    try {
      const supabase = createClient();

      // Create the review
      const { error } = await supabase.from("reviews").insert({
        user_id: userId,
        subject_id: subject.id,
        content: values.content?.trim() || "",
        overall_rating: values.overall_rating,
        difficulty_rating: values.difficulty_rating,
        workload_rating: values.workload_rating,
        teaching_quality_rating: values.teaching_quality_rating,
      });

      if (error) throw error;

      // Success! Redirect back to subject page
      router.push(`/universities/${universityShortName}/${subject.code}`);
    } catch (error) {
      console.error("Error submitting review:", error);
      form.setError("root", {
        message:
          error instanceof Error
            ? error.message
            : "Failed to submit review. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };
  return (
    <div className="container mx-auto p-6 max-w-2xl">
      {/* Header */}
      <div className="mb-8 space-y-4">
        <Link
          href={`/universities/${universityShortName}/${subject.code}`}
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
          {subject.code} - <span className="text-blue-500">{subject.name}</span>
        </h2>
      </div>

      {/* Form Card */}
      <Card className="rounded-none shadow-accent">
        <CardHeader>
          <CardTitle>Your Review</CardTitle>
          <p className="text-muted-foreground">
            Share your experience to help other students
          </p>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {form.formState.errors.root && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    {form.formState.errors.root.message}
                  </AlertDescription>
                </Alert>
              )}
              <FormField
                control={form.control}
                name="difficulty_rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="scroll-m-20 text-xl font-semibold tracking-tight first:mt-0 text-center block">
                      Difficulty
                    </FormLabel>

                    <FormControl>
                      <div className="grid grid-cols-3 items-center">
                        <span className="text-sm text-muted-foreground text-left">
                          Very Easy
                        </span>
                        <div className="flex items-center justify-center gap-2">
                          <Rating
                            value={field.value}
                            onValueChange={field.onChange}
                            className="text-yellow-500"
                          >
                            {Array.from({ length: 5 }).map((_, index) => (
                              <RatingButton key={index} size={20} />
                            ))}
                          </Rating>
                          <span className="text-sm text-muted-foreground">
                            {field.value > 0 ? `${field.value}/5` : ""}
                          </span>
                        </div>
                        <span className="text-sm text-muted-foreground text-right">
                          Very Hard
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Workload Rating */}
              <FormField
                control={form.control}
                name="workload_rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="scroll-m-20 text-xl font-semibold tracking-tight first:mt-0 text-center block">
                      Workload
                    </FormLabel>
                    <FormControl>
                      <div className="grid grid-cols-3 items-center">
                        <span className="text-sm text-muted-foreground text-left">
                          Very Light
                        </span>
                        <div className="flex items-center justify-center gap-2">
                          <Rating
                            value={field.value}
                            onValueChange={field.onChange}
                            className="text-yellow-500"
                          >
                            {Array.from({ length: 5 }).map((_, index) => (
                              <RatingButton key={index} size={20} />
                            ))}
                          </Rating>
                          <span className="text-sm text-muted-foreground">
                            {field.value > 0 ? `${field.value}/5` : ""}
                          </span>
                        </div>
                        <span className="text-sm text-muted-foreground text-right">
                          Very Heavy
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="teaching_quality_rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="scroll-m-20 text-xl font-semibold tracking-tight first:mt-0 text-center block">
                      Teaching Quality
                    </FormLabel>
                    <FormControl>
                      <div className="grid grid-cols-3 items-center">
                        <span className="text-sm text-muted-foreground text-left">
                          Very Poor
                        </span>
                        <div className="flex items-center justify-center gap-2">
                          <Rating
                            value={field.value}
                            onValueChange={field.onChange}
                            className="text-yellow-500"
                          >
                            {Array.from({ length: 5 }).map((_, index) => (
                              <RatingButton key={index} size={20} />
                            ))}
                          </Rating>
                          <span className="text-sm text-muted-foreground">
                            {field.value > 0 ? `${field.value}/5` : ""}
                          </span>
                        </div>
                        <span className="text-sm text-muted-foreground text-right">
                          Excellent
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="overall_rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="scroll-m-20 text-xl font-semibold tracking-tight first:mt-0 text-center block">
                      Overall Rating
                    </FormLabel>
                    <FormControl>
                      <div className="grid grid-cols-3 items-center">
                        <span className="text-sm text-muted-foreground text-left">
                          Terrible
                        </span>
                        <div className="flex items-center justify-center gap-2">
                          <Rating
                            value={field.value}
                            onValueChange={field.onChange}
                            className="text-yellow-500"
                          >
                            {Array.from({ length: 5 }).map((_, index) => (
                              <RatingButton key={index} size={20} />
                            ))}
                          </Rating>
                          <span className="text-sm text-muted-foreground">
                            {field.value > 0 ? `${field.value}/5` : ""}
                          </span>
                        </div>
                        <span className="text-sm text-muted-foreground text-right">
                          Amazing
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Review Content */}
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="scroll-m-20 text-xl font-semibold tracking-tight first:mt-0 text-center block">
                      Comment
                    </FormLabel>

                    <FormControl>
                      <Textarea
                        placeholder="Tell other students about your experience with this subject, assignments, exams, etc..."
                        {...field}
                        className="min-h-[120px] resize-none"
                      />
                    </FormControl>

                    <Alert className="mt-3">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        Please keep your review respectful and constructive.
                        Comments containing insults, harassment, racist,
                        discriminatory, or harmful content will be removed.
                      </AlertDescription>
                    </Alert>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Form Actions */}
              <div className="flex gap-3 justify-end pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Review"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
