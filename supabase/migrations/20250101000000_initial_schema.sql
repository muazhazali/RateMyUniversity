-- Initial database schema for RateUni
-- This migration creates all the base tables for the application

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Universities table
CREATE TABLE IF NOT EXISTS universities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    short_name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Faculties table
CREATE TABLE IF NOT EXISTS faculties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    university_id UUID NOT NULL REFERENCES universities(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    short_name TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Subjects table
CREATE TABLE IF NOT EXISTS subjects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    university_id UUID NOT NULL REFERENCES universities(id) ON DELETE CASCADE,
    faculty_id UUID REFERENCES faculties(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    code TEXT NOT NULL,
    description TEXT,
    credits INTEGER,
    category_code TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE(university_id, code)
);

-- Users table (links to Supabase auth.users)
-- Note: Supabase creates auth.users automatically when you enable authentication
CREATE TABLE IF NOT EXISTS "user" (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Reviews table (authenticated users)
CREATE TABLE IF NOT EXISTS reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
    subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    difficulty_rating INTEGER NOT NULL CHECK (difficulty_rating >= 1 AND difficulty_rating <= 5),
    workload_rating INTEGER NOT NULL CHECK (workload_rating >= 1 AND workload_rating <= 5),
    teaching_quality_rating INTEGER NOT NULL CHECK (teaching_quality_rating >= 1 AND teaching_quality_rating <= 5),
    overall_rating INTEGER NOT NULL CHECK (overall_rating >= 1 AND overall_rating <= 5),
    is_verified_student BOOLEAN NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE(user_id, subject_id)
);

-- Anonymous reviews table (for public viewing)
CREATE TABLE IF NOT EXISTS anonymous_reviews (
    id UUID,
    subject_id UUID,
    subject_code TEXT,
    subject_name TEXT,
    subject_description TEXT,
    subject_credits INTEGER,
    category_code TEXT,
    university_id UUID,
    university_name TEXT,
    university_short_name TEXT,
    faculty_name TEXT,
    faculty_short_name TEXT,
    content TEXT,
    difficulty_rating INTEGER,
    workload_rating INTEGER,
    teaching_quality_rating INTEGER,
    overall_rating INTEGER,
    is_verified_student BOOLEAN,
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE
);

-- Subjects with stats view (materialized or regular view)
CREATE OR REPLACE VIEW subjects_with_stats AS
SELECT
    s.*,
    COUNT(r.id) AS review_count,
    AVG(r.overall_rating) AS average_rating
FROM subjects s
LEFT JOIN reviews r ON s.id = r.subject_id
GROUP BY s.id;

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_faculties_university_id ON faculties(university_id);
CREATE INDEX IF NOT EXISTS idx_subjects_university_id ON subjects(university_id);
CREATE INDEX IF NOT EXISTS idx_subjects_faculty_id ON subjects(faculty_id);
CREATE INDEX IF NOT EXISTS idx_subjects_code ON subjects(code);
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_subject_id ON reviews(subject_id);
CREATE INDEX IF NOT EXISTS idx_anonymous_reviews_subject_code ON anonymous_reviews(subject_code);
CREATE INDEX IF NOT EXISTS idx_anonymous_reviews_university_id ON anonymous_reviews(university_id);
CREATE INDEX IF NOT EXISTS idx_user_email ON "user"(email);

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers
CREATE TRIGGER update_universities_updated_at BEFORE UPDATE ON universities
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_faculties_updated_at BEFORE UPDATE ON faculties
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subjects_updated_at BEFORE UPDATE ON subjects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_updated_at BEFORE UPDATE ON "user"
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Comments for documentation
COMMENT ON TABLE universities IS 'Stores information about universities';
COMMENT ON TABLE faculties IS 'Stores faculties/schools within universities';
COMMENT ON TABLE subjects IS 'Stores courses/subjects offered by universities';
COMMENT ON TABLE "user" IS 'Stores user information';
COMMENT ON TABLE reviews IS 'Stores authenticated user reviews of subjects';
COMMENT ON TABLE anonymous_reviews IS 'Denormalized view of reviews for public display';
COMMENT ON VIEW subjects_with_stats IS 'View showing subjects with aggregated review statistics';
