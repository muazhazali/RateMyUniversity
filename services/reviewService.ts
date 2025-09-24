import createClient from "@/lib/supabase/server";
import { PaginatedReviews, ReviewStats } from "@/types/university";

export class reviewsService {
  private static readonly DEFAULT_LIMIT = 10;
  static async getAllReviews(
    subjectCode: string,
    page: number = 1,
    limit: number = this.DEFAULT_LIMIT
  ): Promise<PaginatedReviews> {
    try {
      const supabase = await createClient();

      const from = (page - 1) * limit;
      const to = from + limit - 1;

      const { data, error, count } = await supabase
        .from("anonymous_reviews")
        .select("*", { count: "exact" })
        .eq("subject_code", subjectCode)
        .order("created_at", { ascending: false })
        .range(from, to);

      if (error) throw error;

      const totalCount = count || 0;
      const totalPages = Math.ceil(totalCount / limit);

      return {
        reviews: data || [],
        pagination: {
          currentPage: page,
          totalCount,
          totalPages,
          hasNext: page < totalPages,
          hasPrevious: page > 1,
          limit,
        },
      };
    } catch (error) {
      console.error("Error fetching reviews for subject:", error);
      return {
        reviews: [],
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

  static async hasReviewed(
    userId: string,
    subjectId: string
  ): Promise<boolean> {
    try {
      const supabase = await createClient();

      const { data, error } = supabase
        .from("reviews")
        .select("id")
        .eq("user_id", userId)
        .eq("subject_id", subjectId)
        .single();
      if (error && error.code !== "PGRST116") {
        throw error;
      }
      return !!data;
    } catch (error) {
      console.error("Error checking if user reviewed:", error);
      return false;
    }
  }

  static async createReviews(
    reviewData: {
      subjectId: string;
      content: string;
      difficulty_rating: number;
      workload_rating: number;
      teaching_quality_rating: number;
      overall_rating: number;
    },
    userId: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const supabase = await createClient();

      const hasReviewed = await this.hasReviewed(userId, reviewData.subjectId);

      if (hasReviewed) {
        return {
          success: false,
          error: "You have already reviewed this subject",
        };
      }

      const { error } = await supabase
        .from("reviews")
        .insert({ ...reviewData, user_id: userId });

      if (error) throw error;

      return {
        success: true,
      };
    } catch (error) {
      console.error("Error creating review:", error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to create review",
      };
    }
  }

  static async getReviewStats(subjectId: string): Promise<ReviewStats> {
    try {
      const supabase = await createClient();

      const { data: reviews, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("subject_id", subjectId);

      if (error) throw error;

      if (!reviews || reviews.length === 0) {
        return {
          totalReviews: 0,
          averageRatings: {
            overall: 0,
            difficulty: 0,
            workload: 0,
            teachingQuality: 0,
          },
          ratingDistribution: {
            overall: {},
            difficulty: {},
            workload: {},
            teachingQuality: {},
          },
          verifiedCount: 0,
          verifiedPercentage: 0,
        };
      }

      const totalReviews = reviews.length;
      const averageRatings = {
        overall:
          reviews.reduce((sum, r) => sum + r.overall_rating, 0) / totalReviews,
        difficulty:
          reviews.reduce((sum, r) => sum + r.difficulty_rating, 0) /
          totalReviews,
        workload:
          reviews.reduce((sum, r) => sum + r.workload_rating, 0) / totalReviews,
        teachingQuality:
          reviews.reduce((sum, r) => sum + r.teaching_quality_rating, 0) /
          totalReviews,
      };

      const ratingDistribution = {
        overall: this.calculateDistribution(
          reviews.map((r) => r.overall_rating)
        ),
        difficulty: this.calculateDistribution(
          reviews.map((r) => r.difficulty_rating)
        ),
        workload: this.calculateDistribution(
          reviews.map((r) => r.workload_rating)
        ),
        teachingQuality: this.calculateDistribution(
          reviews.map((r) => r.teaching_quality_rating)
        ),
      };

      const verifiedCount = reviews.filter((r) => r.is_verified_student).length;
      const verifiedPercentage = (verifiedCount / totalReviews) * 100;

      return {
        totalReviews,
        averageRatings,
        ratingDistribution,
        verifiedCount,
        verifiedPercentage,
      };
    } catch (error) {
      console.error("Error fetching review stats:", error);
      return {
        totalReviews: 0,
        averageRatings: {
          overall: 0,
          difficulty: 0,
          workload: 0,
          teachingQuality: 0,
        },
        ratingDistribution: {
          overall: {},
          difficulty: {},
          workload: {},
          teachingQuality: {},
        },
        verifiedCount: 0,
        verifiedPercentage: 0,
      };
    }
  }

  private static calculateDistribution(ratings: number[]): {
    [key: number]: number;
  } {
    const distribution: { [key: number]: number } = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };

    ratings.forEach((rating) => {
      distribution[rating] = (distribution[rating] || 0) + 1;
    });

    return distribution;
  }
}
