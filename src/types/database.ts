export type CourseCategory = 'frontend' | 'backend' | 'databases' | 'developer_tools';
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';
export type PublishStatus = 'draft' | 'published' | 'archived';
export type PrerequisiteKind = 'recommended' | 'mandatory';
export type ProgressStatus = 'not_started' | 'in_progress' | 'completed';
export type ExecutionMode = 
  | 'none'
  | 'html_preview'
  | 'css_preview'
  | 'javascript'
  | 'typescript'
  | 'react_preview'
  | 'nodejs'
  | 'express'
  | 'sql'
  | 'postgresql'
  | 'mysql'
  | 'guided';

export type QuestionType = 'single_choice';
export type ResourceType = 'youtube' | 'article' | 'docs' | 'other';

export interface Profile {
  id: string;
  full_name: string;
  avatar_url?: string | null;
  preferred_language?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  short_description: string;
  full_description: string;
  technology: string;
  category: CourseCategory;
  difficulty: DifficultyLevel;
  icon_key: string;
  status: PublishStatus;
  estimated_duration_minutes: number | null;
  sort_order: number;
  learning_outcomes: string[];
  created_at: string;
  updated_at: string;
  published_lesson_count?: number;
}

export interface CoursePrerequisite {
  id: string;
  course_id: string;
  prerequisite_course_id: string;
  kind: PrerequisiteKind;
  sort_order: number;
  prerequisite_course?: Course;
}

export interface CourseModule {
  id: string;
  course_id: string;
  title: string;
  sort_order: number;
  status: PublishStatus;
  lessons?: Lesson[];
}

export interface Lesson {
  id: string;
  module_id: string;
  course_id: string;
  slug: string;
  title: string;
  sort_order: number;
  status: PublishStatus;
  estimated_minutes: number | null;
  objectives: string[];
  content_md: string;
  key_points_md?: string | null;
  common_mistakes_md?: string | null;
  starter_code?: string | null;
  solution_code?: string | null;
  language?: string | null;
  execution_mode: ExecutionMode;
  expected_output?: string | null;
  editor_enabled: boolean;
  created_at?: string;
  updated_at?: string;
  resources?: LessonResource[];
  is_completed?: boolean;
}

export interface LessonResource {
  id: string;
  lesson_id: string;
  type: ResourceType;
  title: string;
  url: string;
  sort_order: number;
  is_optional: boolean;
}

export interface LearningPath {
  id: string;
  slug: string;
  title: string;
  description: string;
  status: PublishStatus;
  is_primary: boolean;
  steps?: LearningPathStep[];
}

export interface LearningPathStep {
  id: string;
  path_id: string;
  course_id: string;
  step_number: number;
  label?: string | null;
  course?: Course;
}

export interface UserCourseProgress {
  id: string;
  user_id: string;
  course_id: string;
  status: ProgressStatus;
  last_lesson_id?: string | null;
  started_at?: string | null;
  completed_at?: string | null;
  updated_at: string;
  completed_lesson_count?: number;
  progress_percentage?: number;
  last_lesson?: Lesson;
}

export interface LessonProgress {
  id: string;
  user_id: string;
  lesson_id: string;
  course_id: string;
  status: ProgressStatus;
  first_opened_at?: string | null;
  completed_at?: string | null;
  last_viewed_at?: string | null;
}

export interface LessonCodeDraft {
  id: string;
  user_id: string;
  lesson_id: string;
  course_id: string;
  exercise_id?: string | null;
  code: string;
  revision: number;
  created_at: string;
  updated_at: string;
}

export interface LearningActivityDay {
  user_id: string;
  activity_date: string;
  lessons_completed_count: number;
}

export interface QuestionChoice {
  id: string;
  label: string;
}

export interface KnowledgeCheck {
  id: string;
  lesson_id: string;
  course_id: string;
  title: string;
  passing_score_percent: number;
  blocks_next_lesson: boolean;
  status: PublishStatus;
  questions?: KnowledgeCheckQuestionSafe[];
}

export interface KnowledgeCheckQuestionSafe {
  id: string;
  sort_order: number;
  prompt: string;
  question_type: QuestionType;
  choices: QuestionChoice[];
}

export interface KnowledgeCheckQuestionFull extends KnowledgeCheckQuestionSafe {
  correct_choice_id: string;
  explanation: string;
}

export interface KnowledgeCheckSubmissionAnswer {
  question_id: string;
  choice_id: string;
}

export interface KnowledgeCheckQuestionResult {
  question_id: string;
  selected_choice_id: string | null;
  correct_choice_id: string;
  is_correct: boolean;
  explanation: string;
}

export interface KnowledgeCheckResult {
  attempt_number: number;
  correct_count: number;
  total_questions: number;
  score: number;
  percentage: number;
  passing_score_percent: number;
  is_passed: boolean;
  submitted_at: string;
  breakdown: KnowledgeCheckQuestionResult[];
}

export interface KnowledgeCheckAttempt {
  id: string;
  user_id: string;
  knowledge_check_id: string;
  lesson_id: string;
  course_id: string;
  attempt_number: number;
  selected_answers: KnowledgeCheckSubmissionAnswer[];
  correct_count: number;
  total_questions: number;
  score: number;
  percentage: number;
  is_passed: boolean;
  submitted_at: string;
}
