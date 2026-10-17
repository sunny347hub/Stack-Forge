-- ============================================================================
-- MIGRATION: 20261017000000_w3schools_curriculum_and_progress_fix.sql
-- W3Schools-Style Curriculum Expansion & Accurate Progress Calculations
-- ============================================================================

-- 1. Ensure user_course_progress has an updated trigger/view definition
-- Update mark_lesson_complete RPC to calculate distinct published lessons accurately
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

  -- Total distinct published lessons in course
  SELECT COUNT(DISTINCT l.id)::INTEGER INTO v_total_lessons
  FROM lessons l
  JOIN course_modules m ON m.id = l.module_id
  WHERE l.course_id = v_course_id AND l.status = 'published' AND m.status = 'published';

  -- Completed distinct published lessons by this user
  SELECT COUNT(DISTINCT lp.lesson_id)::INTEGER INTO v_completed_lessons
  FROM lesson_progress lp
  JOIN lessons l ON l.id = lp.lesson_id
  JOIN course_modules m ON m.id = l.module_id
  WHERE lp.user_id = v_user_id AND lp.course_id = v_course_id AND lp.status = 'completed' AND l.status = 'published' AND m.status = 'published';

  INSERT INTO user_course_progress (
    user_id, course_id, status, last_lesson_id, started_at, completed_at, updated_at
  )
  VALUES (
    v_user_id, 
    v_course_id, 
    CASE WHEN v_total_lessons > 0 AND v_completed_lessons >= v_total_lessons THEN 'completed'::progress_status ELSE 'in_progress'::progress_status END,
    p_lesson_id, 
    now(), 
    CASE WHEN v_total_lessons > 0 AND v_completed_lessons >= v_total_lessons THEN now() ELSE NULL END,
    now()
  )
  ON CONFLICT (user_id, course_id)
  DO UPDATE SET
    last_lesson_id = p_lesson_id,
    status = CASE WHEN v_total_lessons > 0 AND v_completed_lessons >= v_total_lessons THEN 'completed'::progress_status ELSE 'in_progress'::progress_status END,
    completed_at = CASE WHEN v_total_lessons > 0 AND v_completed_lessons >= v_total_lessons THEN COALESCE(user_course_progress.completed_at, now()) ELSE NULL END,
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
    'is_course_completed', (v_total_lessons > 0 AND v_completed_lessons >= v_total_lessons)
  );
END;
$$;
