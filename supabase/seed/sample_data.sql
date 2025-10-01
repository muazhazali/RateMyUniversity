-- Sample seed data for RateUni
-- This provides test data for contributors to work with during development

-- Insert sample universities
INSERT INTO universities (name, short_name) VALUES
    ('University of Malaya', 'UM'),
    ('Universiti Kebangsaan Malaysia', 'UKM'),
    ('Universiti Putra Malaysia', 'UPM')
ON CONFLICT DO NOTHING;

-- Insert sample faculties
INSERT INTO faculties (university_id, name, short_name)
SELECT
    u.id,
    f.name,
    f.short_name
FROM universities u
CROSS JOIN (VALUES
    ('Faculty of Computer Science and Information Technology', 'FCSIT'),
    ('Faculty of Engineering', 'Engineering'),
    ('Faculty of Science', 'Science')
) AS f(name, short_name)
WHERE u.short_name IN ('UM', 'UKM')
ON CONFLICT DO NOTHING;

-- Insert sample subjects
INSERT INTO subjects (university_id, faculty_id, name, code, description, credits, category_code)
SELECT
    u.id,
    f.id,
    s.name,
    s.code,
    s.description,
    s.credits,
    s.category_code
FROM universities u
CROSS JOIN faculties f ON f.university_id = u.id
CROSS JOIN (VALUES
    ('Data Structures and Algorithms', 'CS2040', 'Introduction to fundamental data structures and algorithms', 3, 'CORE'),
    ('Database Systems', 'CS3200', 'Database design, SQL, and database management systems', 3, 'CORE'),
    ('Web Development', 'CS3300', 'Modern web development with frameworks and best practices', 3, 'ELECTIVE'),
    ('Machine Learning', 'CS4100', 'Introduction to machine learning algorithms and applications', 4, 'ELECTIVE'),
    ('Software Engineering', 'CS3100', 'Software development lifecycle and engineering practices', 3, 'CORE')
) AS s(name, code, description, credits, category_code)
WHERE u.short_name = 'UM' AND f.short_name = 'FCSIT'
ON CONFLICT (university_id, code) DO NOTHING;

-- Insert sample test user
INSERT INTO "user" (id, name, email, verified) VALUES
    ('00000000-0000-0000-0000-000000000001', 'Test User', 'test@example.com', true)
ON CONFLICT (email) DO NOTHING;

-- Insert sample reviews
INSERT INTO reviews (user_id, subject_id, content, difficulty_rating, workload_rating, teaching_quality_rating, overall_rating, is_verified_student)
SELECT
    '00000000-0000-0000-0000-000000000001'::uuid,
    s.id,
    'This is a sample review for testing purposes. The subject was interesting and well-taught.',
    4,
    3,
    5,
    4,
    true
FROM subjects s
WHERE s.code IN ('CS2040', 'CS3200')
ON CONFLICT (user_id, subject_id) DO NOTHING;

-- Note: anonymous_reviews table is typically populated via a view or trigger
-- from the reviews table, so we don't seed it directly
