export interface University {
  id: string;
  name: string;
  short_name: string;
  created_at: string;
  updated_at: string;
  review_count?: number;
}

export interface UniversityResponse {
  success: boolean;
  data: University[];
  count: number;
  error?: string;
}
export interface Faculty {
  id: string;
  university_id: string;
  name: string;
  short_name: string;
  created_at: string;
  updated_at: string;
}

export interface Subject {
  id: string;
  university_id: string;
  faculty_id: string;
  name: string;
  code: string;
  description?: string;
  credits?: number;
  category_code?: string;
  created_at: string;
  updated_at: string;
  faculties?: Faculty;
  universities?: University;
}

export interface SubjectDetails extends Subject {
  faculty_name: string;
  faculty_short_name?: string;
  university_name: string;
  university_short_name: string;
}

export interface SubjectResponse {
  success: boolean;
  data: Subject[];
  count: number;
  error?: string;
}

export interface Review {
  id: string;
  user_id: string;
  subject_id: string;
  content: string;
  difficulty_rating: number;
  workload_rating: number;
  teaching_quality_rating: number;
  overall_rating: number;
  is_verified_student: boolean;
  created_at: string;
  updated_at: string;
}

export interface AnonymousReview {
  id: string;
  content: string;
  difficulty_rating: number;
  workload_rating: number;
  teaching_quality_rating: number;
  overall_rating: number;
  is_verified_student: boolean;
  created_at: string;
  updated_at: string;
  subject_code: string;
  subject_name: string;
  subject_description?: string;
  subject_credits?: string;
  university_name: string;
  university_short_name: string;
  faculty_name: string;
  faculty_short_name: string;
}

export interface ReviewStats {
  totalReviews: number;
  averageRatings: {
    overall: number;
    difficulty: number;
    workload: number;
    teachingQuality: number;
  };
  ratingDistribution: {
    overall: { [key: number]: number };
    difficulty: { [key: number]: number };
    workload: { [key: number]: number };
    teachingQuality: { [key: number]: number };
  };
  verifiedCount: number;
  verifiedPercentage: number;
}

export interface PaginatedReviews {
  reviews: AnonymousReview[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    hasNext: boolean;
    hasPrevious: boolean;
    limit: number;
  };
}
