import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { UserCourseProgress, LessonProgress, LearningActivityDay } from '../types/database';
import { INITIAL_LESSONS } from '../lib/seedData';

interface LocalProgressState {
  courseProgress: Record<string, UserCourseProgress>;
  lessonProgress: Record<string, LessonProgress>;
  activityDays: Record<string, LearningActivityDay>;
}

function getUserStorageKeys(userId?: string) {
  const safeId = userId?.trim() || 'anonymous';
  return {
    course: `stackforge_user_${safeId}_course_progress`,
    lesson: `stackforge_user_${safeId}_lesson_progress`,
    activity: `stackforge_user_${safeId}_activity`
  };
}

function getLocalState(userId?: string): LocalProgressState {
  if (!userId) {
    return { courseProgress: {}, lessonProgress: {}, activityDays: {} };
  }

  try {
    const keys = getUserStorageKeys(userId);
    const cp = localStorage.getItem(keys.course);
    const lp = localStorage.getItem(keys.lesson);
    const ad = localStorage.getItem(keys.activity);

    return {
      courseProgress: cp ? JSON.parse(cp) : {},
      lessonProgress: lp ? JSON.parse(lp) : {},
      activityDays: ad ? JSON.parse(ad) : {}
    };
  } catch {
    return { courseProgress: {}, lessonProgress: {}, activityDays: {} };
  }
}

function saveLocalState(state: LocalProgressState, userId?: string) {
  if (!userId) return;
  try {
    const keys = getUserStorageKeys(userId);
    localStorage.setItem(keys.course, JSON.stringify(state.courseProgress));
    localStorage.setItem(keys.lesson, JSON.stringify(state.lessonProgress));
    localStorage.setItem(keys.activity, JSON.stringify(state.activityDays));
  } catch (err) {
    console.error('Failed to save local progress state:', err);
  }
}

export const progressService = {
  /**
   * Clears in-memory and local storage state for a specific user (or on sign out).
   */
  clearUserState(userId?: string) {
    if (!userId) return;
    try {
      const keys = getUserStorageKeys(userId);
      localStorage.removeItem(keys.course);
      localStorage.removeItem(keys.lesson);
      localStorage.removeItem(keys.activity);
    } catch (err) {
      console.error('Failed to clear user state:', err);
    }
  },

  /**
   * Retrieves single lesson progress for an authenticated user.
   */
  async getLessonProgress(lessonId: string, userId?: string): Promise<LessonProgress | null> {
    if (!userId) return null;

    if (isSupabaseConfigured && supabase) {
      const { data } = await supabase
        .from('lesson_progress')
        .select('*')
        .eq('lesson_id', lessonId)
        .eq('user_id', userId)
        .maybeSingle();
      return (data as LessonProgress) || null;
    }

    const state = getLocalState(userId);
    return state.lessonProgress[lessonId] || null;
  },

  /**
   * Retrieves all course progress records for the user.
   * Dynamically calculates `progress_percentage` and updates status based on published lessons.
   */
  async getAllUserCourseProgress(userId?: string): Promise<Record<string, UserCourseProgress>> {
    if (!userId) return {};

    if (isSupabaseConfigured && supabase) {
      // Query published course metrics and user's lesson progress
      const [courseProgressRes, lessonProgressRes, publishedLessonsRes] = await Promise.all([
        supabase.from('user_course_progress').select('*').eq('user_id', userId),
        supabase.from('lesson_progress').select('*').eq('user_id', userId).eq('status', 'completed'),
        supabase.from('lessons').select('id, course_id').eq('status', 'published')
      ]);

      const map: Record<string, UserCourseProgress> = {};
      const completedLessonSet = new Set((lessonProgressRes.data || []).map((lp: any) => lp.lesson_id));

      const publishedByCourse: Record<string, string[]> = {};
      (publishedLessonsRes.data || []).forEach((l: any) => {
        if (!publishedByCourse[l.course_id]) publishedByCourse[l.course_id] = [];
        publishedByCourse[l.course_id].push(l.id);
      });

      if (courseProgressRes.data) {
        courseProgressRes.data.forEach((p: UserCourseProgress) => {
          const courseLessons = publishedByCourse[p.course_id] || [];
          const totalPublished = courseLessons.length;
          const completedCount = courseLessons.filter(lId => completedLessonSet.has(lId)).length;
          const isComplete = totalPublished > 0 && completedCount >= totalPublished;

          const percentage = totalPublished > 0 
            ? Math.round((completedCount / totalPublished) * 100) 
            : 0;

          map[p.course_id] = {
            ...p,
            status: isComplete ? 'completed' : p.status === 'not_started' ? 'not_started' : 'in_progress',
            completed_lesson_count: completedCount,
            progress_percentage: percentage
          };
        });
      }
      return map;
    }

    // Local state calculation
    const state = getLocalState(userId);
    const map: Record<string, UserCourseProgress> = {};

    Object.entries(state.courseProgress).forEach(([courseId, cp]) => {
      // Filter published lessons for this course
      const publishedLessons = INITIAL_LESSONS.filter(l => l.course_id === courseId && l.status === 'published');
      const totalPublished = publishedLessons.length;
      const completedCount = publishedLessons.filter(l => state.lessonProgress[l.id]?.status === 'completed').length;
      const isComplete = totalPublished > 0 && completedCount >= totalPublished;

      const percentage = totalPublished > 0
        ? Math.round((completedCount / totalPublished) * 100)
        : 0;

      map[courseId] = {
        ...cp,
        user_id: userId,
        status: isComplete ? 'completed' : cp.status === 'not_started' ? 'not_started' : 'in_progress',
        completed_lesson_count: completedCount,
        progress_percentage: percentage
      };
    });

    return map;
  },

  /**
   * Retrieves all lesson progress records for the user.
   */
  async getAllUserLessonProgress(userId?: string): Promise<Record<string, LessonProgress>> {
    if (!userId) return {};

    if (isSupabaseConfigured && supabase) {
      const { data } = await supabase
        .from('lesson_progress')
        .select('*')
        .eq('user_id', userId);

      const map: Record<string, LessonProgress> = {};
      if (data) {
        data.forEach((p: LessonProgress) => {
          map[p.lesson_id] = p;
        });
      }
      return map;
    }

    const state = getLocalState(userId);
    return state.lessonProgress;
  },

  /**
   * Mark lesson as completed, calculate accurate course progress %, and update streak.
   */
  async markLessonComplete(lessonId: string, courseId: string, userId?: string): Promise<{
    completed_lessons: number;
    total_lessons: number;
    is_course_completed: boolean;
  }> {
    if (!userId) {
      throw new Error('Authentication required to mark lesson complete.');
    }

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.rpc('mark_lesson_complete', {
        p_lesson_id: lessonId
      });

      if (!error && data) {
        return data;
      }
    }

    // Local state fallback implementation
    const state = getLocalState(userId);
    const now = new Date().toISOString();
    const todayUTC = new Date().toISOString().slice(0, 10);

    const wasCompleted = state.lessonProgress[lessonId]?.status === 'completed';

    // 1. Update lesson progress
    state.lessonProgress[lessonId] = {
      id: state.lessonProgress[lessonId]?.id || `lp-${Date.now()}`,
      user_id: userId,
      lesson_id: lessonId,
      course_id: courseId,
      status: 'completed',
      first_opened_at: state.lessonProgress[lessonId]?.first_opened_at || now,
      completed_at: state.lessonProgress[lessonId]?.completed_at || now,
      last_viewed_at: now
    };

    // 2. Calculate course metrics using distinct published lessons
    const courseLessons = INITIAL_LESSONS.filter(l => l.course_id === courseId && l.status === 'published');
    const totalLessons = courseLessons.length;
    const completedLessons = courseLessons.filter(l => 
      state.lessonProgress[l.id]?.status === 'completed'
    ).length;

    const isCourseCompleted = totalLessons > 0 && completedLessons >= totalLessons;

    state.courseProgress[courseId] = {
      id: state.courseProgress[courseId]?.id || `ucp-${Date.now()}`,
      user_id: userId,
      course_id: courseId,
      status: isCourseCompleted ? 'completed' : 'in_progress',
      last_lesson_id: lessonId,
      started_at: state.courseProgress[courseId]?.started_at || now,
      completed_at: isCourseCompleted ? (state.courseProgress[courseId]?.completed_at || now) : null,
      updated_at: now,
      completed_lesson_count: completedLessons,
      progress_percentage: totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0
    };

    // 3. Upsert UTC activity streak only on first completion
    if (!wasCompleted) {
      const currentCount = state.activityDays[todayUTC]?.lessons_completed_count || 0;
      state.activityDays[todayUTC] = {
        user_id: userId,
        activity_date: todayUTC,
        lessons_completed_count: currentCount + 1
      };
    }

    saveLocalState(state, userId);

    return {
      completed_lessons: completedLessons,
      total_lessons: totalLessons,
      is_course_completed: isCourseCompleted
    };
  },

  /**
   * Record that a lesson was viewed / opened.
   * Does NOT mark the lesson as completed.
   * Progress percentage remains 0% until a lesson is actually completed.
   */
  async recordLessonView(lessonId: string, courseId: string, userId?: string) {
    if (!userId) return;

    if (isSupabaseConfigured && supabase) {
      await supabase
        .from('lesson_progress')
        .upsert({
          user_id: userId,
          lesson_id: lessonId,
          course_id: courseId,
          status: 'in_progress',
          last_viewed_at: new Date().toISOString()
        }, { onConflict: 'user_id,lesson_id' });

      await supabase
        .from('user_course_progress')
        .upsert({
          user_id: userId,
          course_id: courseId,
          status: 'in_progress',
          last_lesson_id: lessonId,
          updated_at: new Date().toISOString()
        }, { onConflict: 'user_id,course_id' });
      return;
    }

    const state = getLocalState(userId);
    const now = new Date().toISOString();

    if (!state.lessonProgress[lessonId]) {
      state.lessonProgress[lessonId] = {
        id: `lp-${Date.now()}`,
        user_id: userId,
        lesson_id: lessonId,
        course_id: courseId,
        status: 'in_progress',
        first_opened_at: now,
        last_viewed_at: now
      };
    } else {
      state.lessonProgress[lessonId].last_viewed_at = now;
    }

    // Compute published lessons for this course
    const courseLessons = INITIAL_LESSONS.filter(l => l.course_id === courseId && l.status === 'published');
    const totalLessons = courseLessons.length;
    const completedLessons = courseLessons.filter(l => 
      state.lessonProgress[l.id]?.status === 'completed'
    ).length;

    const isCourseCompleted = totalLessons > 0 && completedLessons >= totalLessons;

    if (!state.courseProgress[courseId]) {
      state.courseProgress[courseId] = {
        id: `ucp-${Date.now()}`,
        user_id: userId,
        course_id: courseId,
        status: isCourseCompleted ? 'completed' : 'in_progress',
        last_lesson_id: lessonId,
        started_at: now,
        completed_at: isCourseCompleted ? now : null,
        updated_at: now,
        completed_lesson_count: completedLessons,
        progress_percentage: totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0
      };
    } else {
      state.courseProgress[courseId].last_lesson_id = lessonId;
      state.courseProgress[courseId].updated_at = now;
      state.courseProgress[courseId].completed_lesson_count = completedLessons;
      state.courseProgress[courseId].progress_percentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
      if (isCourseCompleted) {
        state.courseProgress[courseId].status = 'completed';
      }
    }

    saveLocalState(state, userId);
  },

  /**
   * Calculates the active consecutive UTC daily streak for the authenticated user.
   */
  async getStreakCount(userId?: string): Promise<number> {
    if (!userId) return 0;

    const today = new Date();
    const todayUTC = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));

    let activityMap: Record<string, boolean> = {};

    if (isSupabaseConfigured && supabase) {
      const { data } = await supabase
        .from('learning_activity_days')
        .select('activity_date, lessons_completed_count')
        .eq('user_id', userId)
        .gt('lessons_completed_count', 0);

      if (data) {
        data.forEach((row: { activity_date: string }) => {
          activityMap[row.activity_date] = true;
        });
      }
    } else {
      const state = getLocalState(userId);
      Object.keys(state.activityDays).forEach(dateStr => {
        if (
          state.activityDays[dateStr].user_id === userId &&
          state.activityDays[dateStr].lessons_completed_count > 0
        ) {
          activityMap[dateStr] = true;
        }
      });
    }

    let streak = 0;
    let checkDate = new Date(todayUTC);

    // If no activity today, check if active yesterday
    const todayStr = checkDate.toISOString().slice(0, 10);
    if (!activityMap[todayStr]) {
      checkDate.setUTCDate(checkDate.getUTCDate() - 1);
      const yesterdayStr = checkDate.toISOString().slice(0, 10);
      if (!activityMap[yesterdayStr]) {
        return 0;
      }
    }

    while (true) {
      const dateStr = checkDate.toISOString().slice(0, 10);
      if (activityMap[dateStr]) {
        streak += 1;
        checkDate.setUTCDate(checkDate.getUTCDate() - 1);
      } else {
        break;
      }
    }

    return streak;
  }
};
