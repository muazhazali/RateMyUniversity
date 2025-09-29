import React from "react";
import { UniversityService } from "@/services/universityService";
import { SubjectService } from "@/services/subjectService";
import { FacultyService } from "@/services/facultyService";
import { notFound } from "next/navigation";
import { SubjectCard } from "@/components/subjects/SubjectsCard";
import { SubjectFilters } from "@/components/subjects/SubjectFilters";
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
  }>;
  searchParams: Promise<{
    page?: string;
    faculty?: string;
    category?: string;
    search?: string;
    sort?: string;
  }>;
}

export default async function SubjectsPage({
  params,
  searchParams,
}: PageProps) {
  const { name } = await params;
  const { page, faculty, category, search, sort } = await searchParams;
  const currentPage = parseInt(page || "1", 12);

  const university = await UniversityService.getUniversityByName(name);

  if (!university) {
    console.log("University not found for:", name);
    notFound();
  }

  const filters = {
    facultyId: faculty,
    categoryCode: category,
    searchTerm: search,
    sortBy: sort as
      | "default"
      | "highest_rating"
      | "lowest_rating"
      | "most_reviewed"
      | undefined,
  };

  const [subjectsData, faculties] = await Promise.all([
    SubjectService.getAllSubjects(university.id, currentPage, 12, filters),
    FacultyService.getFaculties(university.id),
  ]);

  const { subjects, pagination } = subjectsData;

  // Build pagination URLs with preserved filters
  const buildPaginationUrl = (pageNum: number) => {
    const params = new URLSearchParams();
    if (pageNum > 1) params.set("page", pageNum.toString());
    if (faculty) params.set("faculty", faculty);
    if (category) params.set("category", category);
    if (search) params.set("search", search);
    if (sort && sort !== "default") params.set("sort", sort);

    const queryString = params.toString();
    return `/universities/${name}${queryString ? `?${queryString}` : ""}`;
  };

  return (
    <main className="px-4 md:px-6 lg:px-15 py-8 mt-5">
      <div className="max-w-7xl mx-auto">
        <PageBreadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Universities", href: "/universities" },
            { label: university.short_name, current: true },
          ]}
        />

        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">{university.name}</h1>
          <p className="text-muted-foreground">
            {pagination.totalCount} subjects available
          </p>
        </div>

        <SubjectFilters universityName={name} faculties={faculties} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mb-8">
          {subjects.map((subject) => (
            <SubjectCard
              key={subject.id}
              subject={subject}
              universityShortName={university.short_name}
            />
          ))}
        </div>

        {pagination.totalPages > 1 && (
          <div className="flex justify-center">
            <Pagination>
              <PaginationContent>
                {pagination.hasPrevious && (
                  <PaginationItem>
                    <PaginationPrevious
                      href={buildPaginationUrl(currentPage - 1)}
                    />
                  </PaginationItem>
                )}

                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
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

        {subjects.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium mb-2">No subjects found</h3>
            <p className="text-muted-foreground">
              This university does not have any subjects yet.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
