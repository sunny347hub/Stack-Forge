import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { Course, CourseModule, CoursePrerequisite, LearningPath } from '../types/database';
import { 
  INITIAL_COURSES, 
  INITIAL_MODULES, 
  INITIAL_LESSONS, 
  COURSE_PREREQUISITES, 
  PRIMARY_LEARNING_PATH 
} from '../lib/seedData';

/**
 * Normalizes any course slug or title input into standard kebab-case format.
 * E.g., "html fundamentals", "HTML Fundamentals", "html%20fundamentals" -> "html-fundamentals"
 */
export function normalizeSlug(input?: string): string {
  if (!input) return '';
  return decodeURIComponent(input)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Finds a matching course from local seed data by slug, title, or normalized variant.
 */
function findSeedCourse(rawSlug: string): Course | null {
  if (!rawSlug) return null;
  const clean = decodeURIComponent(rawSlug).trim().toLowerCase();
  const normalized = normalizeSlug(rawSlug);

  return (
    INITIAL_COURSES.find(c => {
      const cSlug = c.slug.toLowerCase();
      const cNorm = normalizeSlug(c.slug);
      const cTitle = c.title.toLowerCase();
      const cTitleNorm = normalizeSlug(c.title);

      return (
        cSlug === clean ||
        cSlug === normalized ||
        cNorm === normalized ||
        cTitle === clean ||
        cTitleNorm === normalized ||
        cNorm.replace(/-/g, '') === normalized.replace(/-/g, '')
      );
    }) || null
  );
}

/**
 * Builds all modules with nested lessons for a course from the local seed curriculum.
 */
function getSeedModulesForCourse(courseId: string): CourseModule[] {
  return INITIAL_MODULES
    .filter(m => m.course_id === courseId)
    .sort((a, b) => a.sort_order - b.sort_order)
    .map(m => ({
      ...m,
      lessons: INITIAL_LESSONS
        .filter(l => l.module_id === m.id)
        .sort((a, b) => a.sort_order - b.sort_order)
    }));
}

/**
 * Builds all prerequisites for a course from the local seed data.
 */
function getSeedPrerequisitesForCourse(courseId: string): CoursePrerequisite[] {
  return COURSE_PREREQUISITES
    .filter(p => p.course_id === courseId)
    .map(p => ({
      ...p,
      prerequisite_course: INITIAL_COURSES.find(c => c.id === p.prerequisite_course_id)
    }));
}

export const courseService = {
  /**
   * Returns all published courses for catalog / dashboard.
   * Falls back to INITIAL_COURSES if Supabase is offline, restricted, or empty.
   */
  async getPublishedCourses(): Promise<Course[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('v_published_courses')
          .select('*')
          .order('sort_order', { ascending: true });

        if (!error && Array.isArray(data) && data.length > 0) {
          return data as Course[];
        }
      } catch (err) {
        console.warn('Supabase getPublishedCourses failed, using seed data:', err);
      }
    }
    // Fallback seed
    return INITIAL_COURSES;
  },

  /**
   * Retrieves course, its modules with lessons, and prerequisites by slug.
   * Handles loose slugs ("html fundamentals"), handles Supabase errors,
   * and guarantees rich modules and lessons are returned.
   */
  async getCourseBySlug(rawSlug: string): Promise<{ 
    course: Course; 
    modules: CourseModule[]; 
    prerequisites: CoursePrerequisite[];
  } | null> {
    if (!rawSlug) return null;

    const cleanSlug = decodeURIComponent(rawSlug).trim().toLowerCase();
    const normalized = normalizeSlug(rawSlug);

    // 1. If Supabase is configured, attempt fetch
    if (isSupabaseConfigured && supabase) {
      try {
        const { data: course, error: cErr } = await supabase
          .from('courses')
          .select('*')
          .or(`slug.eq.${normalized},slug.eq.${cleanSlug}`)
          .eq('status', 'published')
          .maybeSingle();

        if (!cErr && course) {
          const { data: dbModules, error: mErr } = await supabase
            .from('course_modules')
            .select('*, lessons(*)')
            .eq('course_id', course.id)
            .eq('status', 'published')
            .order('sort_order', { ascending: true });

          const { data: dbPrereqs } = await supabase
            .from('course_prerequisites')
            .select('*, prerequisite_course:courses!course_prerequisites_prerequisite_course_id_fkey(*)')
            .eq('course_id', course.id)
            .order('sort_order', { ascending: true });

          let modules = (dbModules || []) as CourseModule[];
          // Verify if modules actually have lessons
          const hasValidLessons = modules.some(m => Array.isArray(m.lessons) && m.lessons.length > 0);

          if (mErr || modules.length === 0 || !hasValidLessons) {
            // Supabase lacks modules/lessons or denied select - hydrate with seed modules!
            const seedC = findSeedCourse(rawSlug);
            if (seedC) {
              modules = getSeedModulesForCourse(seedC.id);
            }
          }

          let prereqs = (dbPrereqs || []) as CoursePrerequisite[];
          if (prereqs.length === 0) {
            const seedC = findSeedCourse(rawSlug);
            if (seedC) {
              prereqs = getSeedPrerequisitesForCourse(seedC.id);
            }
          }

          return {
            course: course as Course,
            modules,
            prerequisites: prereqs
          };
        }
      } catch (err) {
        console.warn('Supabase getCourseBySlug failed, falling back to local seed:', err);
      }
    }

    // 2. Fallback to comprehensive local curriculum
    const course = findSeedCourse(rawSlug);
    if (!course) return null;

    const modules = getSeedModulesForCourse(course.id);
    const prerequisites = getSeedPrerequisitesForCourse(course.id);

    return { course, modules, prerequisites };
  },

  /**
   * Retrieves primary learning path with ordered step stages.
   */
  async getPrimaryLearningPath(): Promise<LearningPath> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data: path, error } = await supabase
          .from('learning_paths')
          .select('*, steps:learning_path_steps(*, course:courses(*))')
          .eq('is_primary', true)
          .eq('status', 'published')
          .maybeSingle();

        if (!error && path && Array.isArray(path.steps) && path.steps.length > 0) {
          return path as LearningPath;
        }
      } catch (err) {
        console.warn('Supabase getPrimaryLearningPath failed, using seed data:', err);
      }
    }

    // Fallback seed
    return {
      ...PRIMARY_LEARNING_PATH,
      steps: INITIAL_COURSES.map((c, idx) => ({
        id: `step-${idx + 1}`,
        path_id: PRIMARY_LEARNING_PATH.id,
        course_id: c.id,
        step_number: idx + 1,
        label: c.title,
        course: c
      }))
    };
  }
};
