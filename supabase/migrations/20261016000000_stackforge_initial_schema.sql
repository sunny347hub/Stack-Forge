-- ============================================================================
-- STACKFORGE INITIAL DATABASE SCHEMA & MIGRATION
-- ============================================================================

-- 1. ENUMERATED TYPES
CREATE TYPE course_category AS ENUM ('frontend', 'backend', 'databases', 'developer_tools');
CREATE TYPE difficulty_level AS ENUM ('beginner', 'intermediate', 'advanced');
CREATE TYPE publish_status AS ENUM ('draft', 'published', 'archived');
CREATE TYPE prerequisite_kind AS ENUM ('recommended', 'mandatory');
CREATE TYPE progress_status AS ENUM ('not_started', 'in_progress', 'completed');
CREATE TYPE execution_mode AS ENUM (
  'none', 'html_preview', 'css_preview', 'javascript', 'typescript',
  'react_preview', 'nodejs', 'express', 'sql', 'postgresql', 'mysql', 'guided'
);
CREATE TYPE question_type AS ENUM ('single_choice');
CREATE TYPE resource_type AS ENUM ('youtube', 'article', 'docs', 'other');

-- 2. CORE CATALOG & APP TABLES

-- Profiles (extends auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  avatar_url TEXT NULL,
  preferred_language TEXT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Courses
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  short_description TEXT NOT NULL,
  full_description TEXT NOT NULL,
  technology TEXT NOT NULL,
  category course_category NOT NULL,
  difficulty difficulty_level NOT NULL,
  icon_key TEXT,
  status publish_status NOT NULL DEFAULT 'draft',
  estimated_duration_minutes INTEGER NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  learning_outcomes JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Course Prerequisites (Soft prerequisites for V1)
CREATE TABLE course_prerequisites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
  prerequisite_course_id UUID REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
  kind prerequisite_kind NOT NULL DEFAULT 'recommended',
  sort_order INTEGER NOT NULL DEFAULT 0,
  CONSTRAINT uq_course_prerequisite UNIQUE(course_id, prerequisite_course_id),
  CONSTRAINT chk_no_self_prerequisite CHECK (course_id <> prerequisite_course_id)
);

-- Course Modules
CREATE TABLE course_modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  status publish_status NOT NULL DEFAULT 'draft'
);

-- Lessons
CREATE TABLE lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id UUID REFERENCES course_modules(id) ON DELETE CASCADE NOT NULL,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  status publish_status NOT NULL DEFAULT 'draft',
  estimated_minutes INTEGER NULL,
  objectives JSONB NOT NULL DEFAULT '[]'::jsonb,
  content_md TEXT NOT NULL DEFAULT '',
  key_points_md TEXT NULL,
  common_mistakes_md TEXT NULL,
  starter_code TEXT NULL,
  language TEXT NULL,
  execution_mode execution_mode NOT NULL DEFAULT 'none',
  expected_output TEXT NULL,
  editor_enabled BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  CONSTRAINT uq_course_lesson_slug UNIQUE(course_id, slug)
);

-- Lesson Resources
CREATE TABLE lesson_resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE NOT NULL,
  type resource_type NOT NULL,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_optional BOOLEAN NOT NULL DEFAULT true
);

-- Learning Paths
CREATE TABLE learning_paths (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  status publish_status NOT NULL DEFAULT 'draft',
  is_primary BOOLEAN NOT NULL DEFAULT false
);

-- Learning Path Steps
CREATE TABLE learning_path_steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  path_id UUID REFERENCES learning_paths(id) ON DELETE CASCADE NOT NULL,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
  step_number INTEGER NOT NULL CHECK (step_number > 0),
  label TEXT NULL,
  CONSTRAINT uq_path_step_number UNIQUE(path_id, step_number),
  CONSTRAINT uq_path_course UNIQUE(path_id, course_id)
);

-- 3. USER PROGRESS & PRIVATE DATA TABLES

-- User Course Progress
CREATE TABLE user_course_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
  status progress_status NOT NULL DEFAULT 'not_started',
  last_lesson_id UUID REFERENCES lessons(id) ON DELETE SET NULL NULL,
  started_at TIMESTAMPTZ NULL,
  completed_at TIMESTAMPTZ NULL,
  updated_at TIMESTAMPTZ DEFAULT now(),
  CONSTRAINT uq_user_course_progress UNIQUE(user_id, course_id)
);

-- Lesson Progress
CREATE TABLE lesson_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE NOT NULL,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
  status progress_status NOT NULL DEFAULT 'not_started',
  first_opened_at TIMESTAMPTZ NULL,
  completed_at TIMESTAMPTZ NULL,
  last_viewed_at TIMESTAMPTZ NULL,
  CONSTRAINT uq_user_lesson_progress UNIQUE(user_id, lesson_id)
);

-- Saved Code Drafts (with optimistic revision locking)
CREATE TABLE lesson_code_drafts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE NOT NULL,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
  exercise_id UUID NULL,
  code TEXT NOT NULL,
  revision BIGINT NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  CONSTRAINT uq_user_lesson_draft UNIQUE(user_id, lesson_id)
);

-- Learning Activity Days (UTC streak tracking)
CREATE TABLE learning_activity_days (
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  activity_date DATE NOT NULL,
  lessons_completed_count INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (user_id, activity_date)
);

-- 4. KNOWLEDGE CHECKS TABLES

-- Knowledge Checks
CREATE TABLE knowledge_checks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE NOT NULL,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  passing_score_percent INTEGER NOT NULL DEFAULT 70,
  blocks_next_lesson BOOLEAN NOT NULL DEFAULT false,
  status publish_status NOT NULL DEFAULT 'draft'
);

-- Knowledge Check Questions (Stores correct answer safely)
CREATE TABLE knowledge_check_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  knowledge_check_id UUID REFERENCES knowledge_checks(id) ON DELETE CASCADE NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  prompt TEXT NOT NULL,
  question_type question_type NOT NULL DEFAULT 'single_choice',
  choices JSONB NOT NULL,
  correct_choice_id TEXT NOT NULL,
  explanation TEXT NOT NULL
);

-- Knowledge Check Attempts (Append-only student attempts)
CREATE TABLE knowledge_check_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  knowledge_check_id UUID REFERENCES knowledge_checks(id) ON DELETE CASCADE NOT NULL,
  lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE NOT NULL,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
  attempt_number INTEGER NOT NULL CHECK (attempt_number > 0),
  selected_answers JSONB NOT NULL,
  correct_count INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  score INTEGER NOT NULL,
  percentage NUMERIC(5,2) NOT NULL,
  is_passed BOOLEAN NOT NULL,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT uq_user_check_attempt UNIQUE(user_id, knowledge_check_id, attempt_number)
);

-- 5. INDEXES FOR PERFORMANCE
CREATE INDEX idx_courses_slug ON courses(slug);
CREATE INDEX idx_courses_category_status ON courses(category, status);
CREATE INDEX idx_modules_course_sort ON course_modules(course_id, sort_order);
CREATE INDEX idx_lessons_course_sort ON lessons(course_id, sort_order);
CREATE INDEX idx_lessons_course_slug ON lessons(course_id, slug);
CREATE INDEX idx_user_course_progress_user ON user_course_progress(user_id, updated_at DESC);
CREATE INDEX idx_lesson_progress_user_course ON lesson_progress(user_id, course_id);
CREATE INDEX idx_lesson_drafts_user_lesson ON lesson_code_drafts(user_id, lesson_id);
CREATE INDEX idx_check_attempts_user_check ON knowledge_check_attempts(user_id, knowledge_check_id, submitted_at DESC);
CREATE INDEX idx_path_steps_path_step ON learning_path_steps(path_id, step_number);

-- 6. VIEWS

-- View of published courses with lesson metrics
CREATE OR REPLACE VIEW v_published_courses AS
SELECT 
  c.id,
  c.slug,
  c.title,
  c.short_description,
  c.full_description,
  c.technology,
  c.category,
  c.difficulty,
  c.icon_key,
  c.status,
  c.sort_order,
  c.learning_outcomes,
  c.created_at,
  c.updated_at,
  COALESCE(c.estimated_duration_minutes, COALESCE(SUM(l.estimated_minutes), 0)) AS estimated_duration_minutes,
  COUNT(l.id)::INTEGER AS published_lesson_count
FROM courses c
LEFT JOIN course_modules m ON m.course_id = c.id AND m.status = 'published'
LEFT JOIN lessons l ON l.module_id = m.id AND l.course_id = c.id AND l.status = 'published'
WHERE c.status = 'published'
GROUP BY c.id;

-- View combining published courses with current authenticated user's progress
CREATE OR REPLACE VIEW v_user_course_card AS
SELECT 
  c.id,
  c.slug,
  c.title,
  c.short_description,
  c.technology,
  c.category,
  c.difficulty,
  c.icon_key,
  c.sort_order,
  c.published_lesson_count,
  c.estimated_duration_minutes,
  COALESCE(ucp.status, 'not_started'::progress_status) AS user_status,
  ucp.last_lesson_id,
  ucp.started_at,
  ucp.completed_at,
  COUNT(lp.id) FILTER (WHERE lp.status = 'completed')::INTEGER AS completed_lesson_count,
  CASE 
    WHEN c.published_lesson_count = 0 THEN 0
    ELSE ROUND((COUNT(lp.id) FILTER (WHERE lp.status = 'completed')::NUMERIC / c.published_lesson_count::NUMERIC) * 100, 1)
  END AS progress_percentage
FROM v_published_courses c
LEFT JOIN user_course_progress ucp ON ucp.course_id = c.id AND ucp.user_id = auth.uid()
LEFT JOIN lesson_progress lp ON lp.course_id = c.id AND lp.user_id = auth.uid()
GROUP BY c.id, c.slug, c.title, c.short_description, c.technology, c.category, c.difficulty, c.icon_key, c.sort_order, c.published_lesson_count, c.estimated_duration_minutes, ucp.status, ucp.last_lesson_id, ucp.started_at, ucp.completed_at;

-- 7. ROW LEVEL SECURITY (RLS) POLICIES

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_prerequisites ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_paths ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_path_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_course_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_code_drafts ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_activity_days ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_checks ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_check_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_check_attempts ENABLE ROW LEVEL SECURITY;

-- Profiles: users read & update only own profile
CREATE POLICY "Users can read own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Public curriculum read policies (published records only)
CREATE POLICY "Public read published courses" ON courses
  FOR SELECT USING (status = 'published');

CREATE POLICY "Public read published modules" ON course_modules
  FOR SELECT USING (
    status = 'published' AND 
    EXISTS (SELECT 1 FROM courses c WHERE c.id = course_modules.course_id AND c.status = 'published')
  );

CREATE POLICY "Public read published lessons" ON lessons
  FOR SELECT USING (
    status = 'published' AND 
    EXISTS (SELECT 1 FROM courses c WHERE c.id = lessons.course_id AND c.status = 'published') AND
    EXISTS (SELECT 1 FROM course_modules m WHERE m.id = lessons.module_id AND m.status = 'published')
  );

CREATE POLICY "Public read published resources" ON lesson_resources
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM lessons l WHERE l.id = lesson_resources.lesson_id AND l.status = 'published')
  );

CREATE POLICY "Public read published learning paths" ON learning_paths
  FOR SELECT USING (status = 'published');

CREATE POLICY "Public read path steps" ON learning_path_steps
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM learning_paths p WHERE p.id = learning_path_steps.path_id AND p.status = 'published')
  );

CREATE POLICY "Public read prerequisites" ON course_prerequisites
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM courses c WHERE c.id = course_prerequisites.course_id AND c.status = 'published')
  );

CREATE POLICY "Public read published knowledge checks" ON knowledge_checks
  FOR SELECT USING (
    status = 'published' AND 
    EXISTS (SELECT 1 FROM lessons l WHERE l.id = knowledge_checks.lesson_id AND l.status = 'published')
  );

-- Knowledge check questions: Never expose correct_choice_id directly to client!
-- Only accessible via security definer RPC
CREATE POLICY "Restrict direct question access" ON knowledge_check_questions
  FOR SELECT USING (false);

-- User Progress: users can read/modify only their own progress
CREATE POLICY "Users read own course progress" ON user_course_progress
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users write own course progress" ON user_course_progress
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users read own lesson progress" ON lesson_progress
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users write own lesson progress" ON lesson_progress
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users read own drafts" ON lesson_code_drafts
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users write own drafts" ON lesson_code_drafts
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users read own activity" ON learning_activity_days
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users write own activity" ON learning_activity_days
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users read own quiz attempts" ON knowledge_check_attempts
  FOR SELECT USING (auth.uid() = user_id);

-- 8. SECURE FUNCTIONS & RPC

-- Trigger function for creating profile on user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER 
SECURITY DEFINER 
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'StackForge Learner'),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Secure function to save lesson drafts with atomic revision check
CREATE OR REPLACE FUNCTION save_lesson_draft(
  p_lesson_id UUID,
  p_code TEXT,
  p_revision BIGINT
)
RETURNS JSONB
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
  v_user_id UUID;
  v_course_id UUID;
  v_existing_rev BIGINT;
BEGIN
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;

  SELECT course_id INTO v_course_id
  FROM lessons
  WHERE id = p_lesson_id AND status = 'published';

  IF v_course_id IS NULL THEN
    RAISE EXCEPTION 'Lesson not found or not published';
  END IF;

  SELECT revision INTO v_existing_rev
  FROM lesson_code_drafts
  WHERE user_id = v_user_id AND lesson_id = p_lesson_id;

  IF v_existing_rev IS NOT NULL AND v_existing_rev >= p_revision THEN
    RETURN jsonb_build_object(
      'status', 'stale_rejected',
      'current_revision', v_existing_rev,
      'submitted_revision', p_revision
    );
  END IF;

  INSERT INTO lesson_code_drafts (user_id, lesson_id, course_id, code, revision, updated_at)
  VALUES (v_user_id, p_lesson_id, v_course_id, p_code, p_revision, now())
  ON CONFLICT (user_id, lesson_id)
  DO UPDATE SET
    code = EXCLUDED.code,
    revision = EXCLUDED.revision,
    updated_at = now();

  RETURN jsonb_build_object(
    'status', 'saved',
    'revision', p_revision,
    'saved_at', now()
  );
END;
$$;

-- Secure function to mark lesson complete, update course progress & activity streak
CREATE OR REPLACE FUNCTION mark_lesson_complete(
  p_lesson_id UUID
)
RETURNS JSONB
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
  v_user_id UUID;
  v_course_id UUID;
  v_total_lessons INTEGER;
  v_completed_lessons INTEGER;
  v_today DATE;
  v_already_completed BOOLEAN;
BEGIN
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;

  SELECT course_id INTO v_course_id
  FROM lessons
  WHERE id = p_lesson_id AND status = 'published';

  IF v_course_id IS NULL THEN
    RAISE EXCEPTION 'Lesson not found or not published';
  END IF;

  SELECT (status = 'completed') INTO v_already_completed
  FROM lesson_progress
  WHERE user_id = v_user_id AND lesson_id = p_lesson_id;

  INSERT INTO lesson_progress (user_id, lesson_id, course_id, status, first_opened_at, completed_at, last_viewed_at)
  VALUES (v_user_id, p_lesson_id, v_course_id, 'completed', now(), now(), now())
  ON CONFLICT (user_id, lesson_id)
  DO UPDATE SET
    status = 'completed',
    completed_at = COALESCE(lesson_progress.completed_at, now()),
    last_viewed_at = now();

  SELECT COUNT(*)::INTEGER INTO v_total_lessons
  FROM lessons l
  JOIN course_modules m ON m.id = l.module_id
  WHERE l.course_id = v_course_id AND l.status = 'published' AND m.status = 'published';

  SELECT COUNT(*)::INTEGER INTO v_completed_lessons
  FROM lesson_progress lp
  JOIN lessons l ON l.id = lp.lesson_id
  WHERE lp.user_id = v_user_id AND lp.course_id = v_course_id AND lp.status = 'completed' AND l.status = 'published';

  INSERT INTO user_course_progress (
    user_id, course_id, status, last_lesson_id, started_at, completed_at, updated_at
  )
  VALUES (
    v_user_id, 
    v_course_id, 
    CASE WHEN v_completed_lessons >= v_total_lessons THEN 'completed'::progress_status ELSE 'in_progress'::progress_status END,
    p_lesson_id, 
    now(), 
    CASE WHEN v_completed_lessons >= v_total_lessons THEN now() ELSE NULL END,
    now()
  )
  ON CONFLICT (user_id, course_id)
  DO UPDATE SET
    last_lesson_id = p_lesson_id,
    status = CASE WHEN v_completed_lessons >= v_total_lessons THEN 'completed'::progress_status ELSE 'in_progress'::progress_status END,
    completed_at = CASE WHEN v_completed_lessons >= v_total_lessons THEN COALESCE(user_course_progress.completed_at, now()) ELSE NULL END,
    updated_at = now();

  IF v_already_completed IS NOT TRUE THEN
    v_today := (CURRENT_DATE AT TIME ZONE 'UTC');
    INSERT INTO learning_activity_days (user_id, activity_date, lessons_completed_count)
    VALUES (v_user_id, v_today, 1)
    ON CONFLICT (user_id, activity_date)
    DO UPDATE SET lessons_completed_count = learning_activity_days.lessons_completed_count + 1;
  END IF;

  RETURN jsonb_build_object(
    'status', 'completed',
    'lesson_id', p_lesson_id,
    'course_id', v_course_id,
    'completed_lessons', v_completed_lessons,
    'total_lessons', v_total_lessons,
    'is_course_completed', (v_completed_lessons >= v_total_lessons)
  );
END;
$$;

-- Secure function to retrieve knowledge check questions WITHOUT exposing correct_choice_id
CREATE OR REPLACE FUNCTION get_knowledge_check_for_lesson(
  p_lesson_id UUID
)
RETURNS JSONB
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
  v_check_id UUID;
  v_check_title TEXT;
  v_passing_score INTEGER;
  v_questions JSONB;
BEGIN
  SELECT id, title, passing_score_percent
  INTO v_check_id, v_check_title, v_passing_score
  FROM knowledge_checks
  WHERE lesson_id = p_lesson_id AND status = 'published';

  IF v_check_id IS NULL THEN
    RETURN NULL;
  END IF;

  SELECT COALESCE(jsonb_agg(
    jsonb_build_object(
      'id', q.id,
      'sort_order', q.sort_order,
      'prompt', q.prompt,
      'question_type', q.question_type,
      'choices', q.choices
    ) ORDER BY q.sort_order ASC
  ), '[]'::jsonb)
  INTO v_questions
  FROM knowledge_check_questions q
  WHERE q.knowledge_check_id = v_check_id;

  RETURN jsonb_build_object(
    'id', v_check_id,
    'title', v_check_title,
    'passing_score_percent', v_passing_score,
    'questions', v_questions
  );
END;
$$;

-- Secure function to grade knowledge check, calculate score, insert attempt, and return breakdown
CREATE OR REPLACE FUNCTION submit_knowledge_check(
  p_check_id UUID,
  p_answers JSONB -- [{ "question_id": "uuid", "choice_id": "a" }]
)
RETURNS JSONB
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
  v_user_id UUID;
  v_lesson_id UUID;
  v_course_id UUID;
  v_passing_percent INTEGER;
  v_total_questions INTEGER;
  v_correct_count INTEGER := 0;
  v_next_attempt_number INTEGER;
  v_question RECORD;
  v_user_choice TEXT;
  v_is_correct BOOLEAN;
  v_results JSONB := '[]'::jsonb;
  v_score INTEGER;
  v_percentage NUMERIC(5,2);
  v_is_passed BOOLEAN;
BEGIN
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;

  SELECT lesson_id, course_id, passing_score_percent
  INTO v_lesson_id, v_course_id, v_passing_percent
  FROM knowledge_checks
  WHERE id = p_check_id AND status = 'published';

  IF v_lesson_id IS NULL THEN
    RAISE EXCEPTION 'Knowledge check not found or not published';
  END IF;

  SELECT COUNT(*)::INTEGER INTO v_total_questions
  FROM knowledge_check_questions
  WHERE knowledge_check_id = p_check_id;

  IF v_total_questions = 0 THEN
    RAISE EXCEPTION 'Knowledge check has no questions';
  END IF;

  FOR v_question IN 
    SELECT id, prompt, correct_choice_id, explanation, sort_order
    FROM knowledge_check_questions
    WHERE knowledge_check_id = p_check_id
    ORDER BY sort_order ASC
  LOOP
    SELECT elem->>'choice_id' INTO v_user_choice
    FROM jsonb_array_elements(p_answers) AS elem
    WHERE elem->>'question_id' = v_question.id::TEXT;

    v_is_correct := (v_user_choice IS NOT NULL AND v_user_choice = v_question.correct_choice_id);
    IF v_is_correct THEN
      v_correct_count := v_correct_count + 1;
    END IF;

    v_results := v_results || jsonb_build_object(
      'question_id', v_question.id,
      'selected_choice_id', v_user_choice,
      'correct_choice_id', v_question.correct_choice_id,
      'is_correct', v_is_correct,
      'explanation', v_question.explanation
    );
  END LOOP;

  v_score := v_correct_count;
  v_percentage := ROUND((v_correct_count::NUMERIC / v_total_questions::NUMERIC) * 100, 2);
  v_is_passed := (v_percentage >= v_passing_percent);

  SELECT COALESCE(MAX(attempt_number), 0) + 1 INTO v_next_attempt_number
  FROM knowledge_check_attempts
  WHERE user_id = v_user_id AND knowledge_check_id = p_check_id;

  INSERT INTO knowledge_check_attempts (
    user_id, knowledge_check_id, lesson_id, course_id,
    attempt_number, selected_answers, correct_count, total_questions,
    score, percentage, is_passed, submitted_at
  )
  VALUES (
    v_user_id, p_check_id, v_lesson_id, v_course_id,
    v_next_attempt_number, p_answers, v_correct_count, v_total_questions,
    v_score, v_percentage, v_is_passed, now()
  );

  RETURN jsonb_build_object(
    'attempt_number', v_next_attempt_number,
    'correct_count', v_correct_count,
    'total_questions', v_total_questions,
    'score', v_score,
    'percentage', v_percentage,
    'passing_score_percent', v_passing_percent,
    'is_passed', v_is_passed,
    'submitted_at', now(),
    'breakdown', v_results
  );
END;
$$;
