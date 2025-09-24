import createClient from "@/lib/supabase/server";
import { Faculty } from "@/types/university";

export class FacultyService {
  static async getFaculties(universityId: string): Promise<Faculty[]> {
    try {
      const supabase = await createClient();

      const { data, error } = await supabase
        .from("faculties")
        .select("*")
        .eq("university_id", universityId)
        .order("name");

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Error fetching faculties:", error);
      return [];
    }
  }
}
