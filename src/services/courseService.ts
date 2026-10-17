import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { Course, CourseModule, CoursePrerequisite, LearningPath } from '../types/database';
import { 
  INITIAL_COURSES, 
  INITIAL_MODULES, 
  INITIAL_LESSONS, 
  COURSE_PREREQUISITES, 
  PRIMARY_LEARNING_PATH 
} from '../lib/seedData';

export const courseService = {
  async getPublishedCourses(): Promise<Course[]> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('v_published_courses')
        .select('*')
        .order('sort_order', { ascending: true });

      if (!error && data) {
        return data as Course[];
      }
    }
    // Fallback seed
    return INITIAL_COURSES;
  },

  async getCourseBySlug(slug: string): Promise<{ 
    course: Course; 
    modules: CourseModule[]; 
    prerequisites: CoursePrerequisite[];
  } | null> {
    if (isSupabaseConfigured && supabase) {
      const { data: course, error: cErr } = await supabase
        .from('courses')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .single();

      if (cErr || !course) return null;

      const { data: modules } = await supabase
        .from('course_modules')
        .select('*, lessons(*)')
        .eq('course_id', course.id)
        .eq('status', 'published')
        .order('sort_order', { ascending: true });

      const { data: prereqs } = await supabase
        .from('course_prerequisites')
        .select('*, prerequisite_course:courses!course_prerequisites_prerequisite_course_id_fkey(*)')
        .eq('course_id', course.id)
        .order('sort_order', { ascending: true });

      return {
        course: course as Course,
        modules: (modules || []) as CourseModule[],
        prerequisites: (prereqs || []) as CoursePrerequisite[],
      };
    }

    // Fallback seed
    const course = INITIAL_COURSES.find(c => c.slug === slug);
    if (!course) return null;

    const modules = INITIAL_MODULES
      .filter(m => m.course_id === course.id)
      .sort((a, b) => a.sort_order - b.sort_order)
      .map(m => ({
        ...m,
        lessons: INITIAL_LESSONS.filter(l => l.module_id === m.id).sort((a, b) => a.sort_order - b.sort_order)
      }));

    const prerequisites = COURSE_PREREQUISITES
      .filter(p => p.course_id === course.id)
      .map(p => ({
        ...p,
        prerequisite_course: INITIAL_COURSES.find(c => c.id === p.prerequisite_course_id)
      }));

    return { course, modules, prerequisites };
  },

  async getPrimaryLearningPath(): Promise<LearningPath> {
    if (isSupabaseConfigured && supabase) {
      const { data: path } = await supabase
        .from('learning_paths')
        .select('*, steps:learning_path_steps(*, course:courses(*))')
        .eq('is_primary', true)
        .eq('status', 'published')
        .single();

      if (path) {
        return path as LearningPath;
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
