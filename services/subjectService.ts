import createClient from "@/lib/supabase/server";
import { Subject } from "@/types/university";

interface SubjectFilters {
  facultyId?: string;
  categoryCode?: string;
  searchTerm?: string;
  sortBy?: "default" | "highest_rating" | "lowest_rating" | "most_reviewed";
}

interface PaginatedSubjects {
  subjects: Subject[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    hasNext: boolean;
    hasPrevious: boolean;
    limit: number;
  };
}
export class SubjectService {
  private static readonly DEFAULT_LIMIT = 10;

  static async getAllSubjects(
    universityId: string,
    page: number = 1,
    limit: number = this.DEFAULT_LIMIT,
    filters?: SubjectFilters
  ): Promise<PaginatedSubjects> {
    try {
      const supabase = await createClient();

      const from = (page - 1) * limit;
      const to = from + limit - 1;

      // Query the view instead of the table
      let query = supabase
        .from("subjects_with_stats")
        .select(
          `
          *,
          faculties(id, name, short_name)
        `,
          { count: "exact" }
        )
        .eq("university_id", universityId);

      // Apply filters
      if (filters?.facultyId) {
        query = query.eq("faculty_id", filters.facultyId);
      }

      if (filters?.categoryCode) {
        query = query.eq("category_code", filters.categoryCode);
      }

      if (filters?.searchTerm) {
        query = query.or(
          `name.ilike.%${filters.searchTerm}%,code.ilike.%${filters.searchTerm}%`
        );
      }

      // Apply sorting
      switch (filters?.sortBy) {
        case "highest_rating":
          // Filter out subjects with 999 (no reviews), then sort by rating desc
          query = query
            .not("average_rating", "eq", 999)
            .order("average_rating", { ascending: false });
          break;
        case "lowest_rating":
          // Filter out subjects with 999 (no reviews), then sort by rating asc
          query = query
            .not("average_rating", "eq", 999)
            .order("average_rating", { ascending: true });
          break;
        case "most_reviewed":
          query = query.order("review_count", { ascending: false });
          break;
        default:
          query = query.order("name", { ascending: true });
          break;
      }

      const { data, error, count } = await query.range(from, to);

      if (error) throw error;

      const totalCount = count || 0;
      const totalPages = Math.ceil(totalCount / limit);

      return {
        subjects: data || [],
        pagination: {
          currentPage: page,
          totalPages,
          totalCount,
          hasNext: page < totalPages,
          hasPrevious: page > 1,
          limit,
        },
      };
    } catch (error) {
      console.error("Error fetching paginated subjects:", error);
      return {
        subjects: [],
        pagination: {
          currentPage: page,
          totalPages: 0,
          totalCount: 0,
          hasNext: false,
          hasPrevious: false,
          limit,
        },
      };
    }
  }

  static async getSubjectByCode(code: string): Promise<Subject | null> {
    try {
      const supabase = await createClient();

      console.log("Looking for subject with code:", code);

      // First try exact match
      let { data, error } = await supabase
        .from("subjects")
        .select(
          `*, faculties(id, name, short_name), universities(id, name, short_name)`
        )
        .eq("code", code)
        .maybeSingle();

      // If no exact match, try case-insensitive match
      if (!data && !error) {
        console.log("No exact match found, trying case-insensitive search...");
        const result = await supabase
          .from("subjects")
          .select(
            `*, faculties(id, name, short_name), universities(id, name, short_name)`
          )
          .ilike("code", code)
          .limit(1);

        data = result.data?.[0] || null;
        error = result.error;
      }

      if (error) {
        console.error("Supabase error:", error);
        return null;
      }

      if (!data) {
        console.log("No subject found with code:", code);
        return null;
      }

      console.log("Found subject:", data.code, data.name);
      return data;
    } catch (error) {
      console.error("Error fetching subject by code:", error);
      return null;
    }
  }

  static async getCategories(universityId: string): Promise<string[]> {
    try {
      const supabase = await createClient();

      const { data, error } = await supabase
        .from("subjects")
        .select("category_code")
        .eq("university_id", universityId)
        .not("university_id", "is", null);

      if (error) throw error;

      const categories = [
        ...new Set(data?.map((item) => item.category_code).filter(Boolean)),
      ];
      return categories.sort();
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  }
}
