import React from "react";
import { SubjectService } from "@/services/subjectService";
import { reviewsService } from "@/services/reviewService";
import { notFound } from "next/navigation";
import { SubjectDetails } from "@/components/subjects/SubjectDetails";
import { ReviewList } from "@/components/reviews/ReviewList";
import { ReviewStatsComponent } from "@/components/reviews/ReviewStats";
import { PageBreadcrumb } from "@/components/ui/page-breadcrumb";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PageProps {
  params: Promise<{
    name: string;
    subjectCode: string;
  }>;
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function SubjectReviewPage({
  params,
  searchParams,
}: PageProps) {
  const { name, subjectCode } = await params;
  const { page } = await searchParams;
  const currentPage = parseInt(page || "1", 10);

  const subject = await SubjectService.getSubjectByCode(subjectCode);

  if (!subject) {
    console.log("Subject not found for:", subjectCode);
    notFound();
  }

  // Fetch reviews and stats for this subject
  const [reviewsData, reviewStats] = await Promise.all([
    reviewsService.getAllReviews(subjectCode, currentPage),
    reviewsService.getReviewStats(subject.id),
  ]);
  const { reviews, pagination } = reviewsData;

  // Build pagination URLs
  const buildPaginationUrl = (pageNum: number) => {
    const params = new URLSearchParams();
    if (pageNum > 1) params.set("page", pageNum.toString());

    const queryString = params.toString();
    return `/universities/${name}/${subjectCode}${
      queryString ? `?${queryString}` : ""
    }`;
  };

  return (
    <main className="px-4 md:px-6 lg:px-15 py-8 mt-5">
      <div className="max-w-7xl mx-auto">
        <PageBreadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Universities", href: "/universities" },
            { label: subject.universities?.short_name || name, href: `/universities/${name}` },
            { label: subject.code, current: true }
          ]}
        />

        {/* Subject Details Section */}
        <SubjectDetails subject={subject} universityShortName={name} />

        {/* Reviews Section */}
        <h2 className="text-2xl font-semibold mb-4">
          Reviews & Ratings ({pagination.totalCount})
        </h2>

        <div className="flex flex-col lg:flex-row gap-4">
          {/* Review Stats - Show first on mobile, sidebar on desktop */}
          <div className="lg:hidden">
            <ReviewStatsComponent stats={reviewStats} />
          </div>

          {/* Reviews List */}
          <div className="flex-1">
            <ReviewList reviews={reviews} />

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <Pagination>
                  <PaginationContent>
                    {pagination.hasPrevious && (
                      <PaginationItem>
                        <PaginationPrevious
                          href={buildPaginationUrl(currentPage - 1)}
                        />
                      </PaginationItem>
                    )}

                    {Array.from(
                      { length: pagination.totalPages },
                      (_, i) => i + 1
                    )
                      .filter((pageNum) => {
                        const distance = Math.abs(pageNum - currentPage);
                        return (
                          distance <= 2 ||
                          pageNum === 1 ||
                          pageNum === pagination.totalPages
                        );
                      })
                      .map((pageNum, index, array) => {
                        const showEllipsis =
                          index > 0 && pageNum - array[index - 1] > 1;

                        return (
                          <React.Fragment key={pageNum}>
                            {showEllipsis && (
                              <PaginationItem>
                                <span className="px-3 py-2">...</span>
                              </PaginationItem>
                            )}
                            <PaginationItem>
                              <PaginationLink
                                href={buildPaginationUrl(pageNum)}
                                isActive={pageNum === currentPage}
                              >
                                {pageNum}
                              </PaginationLink>
                            </PaginationItem>
                          </React.Fragment>
                        );
                      })}

                    {pagination.hasNext && (
                      <PaginationItem>
                        <PaginationNext
                          href={buildPaginationUrl(currentPage + 1)}
                        />
                      </PaginationItem>
                    )}
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>

          {/* Review Stats Sidebar - Hidden on mobile, visible on desktop */}
          <div className="hidden lg:block lg:w-xl">
            <ReviewStatsComponent stats={reviewStats} />
          </div>
        </div>
      </div>
    </main>
  );
}
