import createClient from "@/lib/supabase/server";
import { University, UniversityResponse } from "@/types/university";

export class UniversityService {
  //Fetching all universities
  static async getAllUniversities(): Promise<UniversityResponse> {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from("universities")
        .select("*")
        .order("name");

      if (error) throw error;

      return {
        success: true,
        data: data || [],
        count: data?.length || 0,
      };
    } catch (error) {
      return {
        success: false,
        data: [],
        count: 0,
        error: error instanceof Error ? error.message : "unknown error",
      };
    }
  }

  static async getUniversityByName(
    short_name: string
  ): Promise<University | null> {
    try {
      const supabase = await createClient();

      const { data, error } = await supabase
        .from("universities")
        .select("*")
        .ilike("short_name", short_name)
        .single();

      if (error) {
        console.error("❌ Supabase error details:", {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code,
        });
        throw error;
      }

      if (!data) {
        return null;
      }

      return data;
    } catch (error) {
      console.error("💥 Error fetching university:", {
        error,
        errorMessage: error instanceof Error ? error.message : "Unknown error",
        errorType: typeof error,
        errorConstructor: error?.constructor?.name,
      });
      return null;
    }
  }

  static async searchUniversityByName(
    searchTerm: string
  ): Promise<UniversityResponse> {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from("universities")
        .select("*")
        .or(`name.ilike.%${searchTerm}%,short_name.ilike.%${searchTerm}%`)
        .order("name");

      if (error) throw error;
      return {
        success: true,
        data: data || [],
        count: data?.length || 0,
      };
    } catch (error) {
      return {
        success: false,
        data: [],
        count: 0,
        error: error instanceof Error ? error.message : "unknown error",
      };
    }
  }
}
