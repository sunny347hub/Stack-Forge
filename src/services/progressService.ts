import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { UserCourseProgress, LessonProgress, LearningActivityDay } from '../types/database';
import { INITIAL_LESSONS } from '../lib/seedData';

interface LocalProgressState {
  courseProgress: Record<string, UserCourseProgress>;
  lessonProgress: Record<string, LessonProgress>;
  activityDays: Record<string, LearningActivityDay>;
}

function getUserStorageKeys(userId?: string) {
  const safeId = (userId && userId.trim()) ? userId.trim() : 'guest_user';
  return {
    course: `stackforge_user_${safeId}_course_progress`,
    lesson: `stackforge_user_${safeId}_lesson_progress`,
    activity: `stackforge_user_${safeId}_activity`
  };
}

function getLocalState(userId?: string): LocalProgressState {
  const safeId = (userId && userId.trim()) ? userId.trim() : 'guest_user';
  try {
    const keys = getUserStorageKeys(safeId);
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
  const safeId = (userId && userId.trim()) ? userId.trim() : 'guest_user';
  try {
    const keys = getUserStorageKeys(safeId);
    localStorage.setItem(keys.course, JSON.stringify(state.courseProgress));
    localStorage.setItem(keys.lesson, JSON.stringify(state.lessonProgress));
    localStorage.setItem(keys.activity, JSON.stringify(state.activityDays));
  } catch (err) {
    console.error('Failed to save local progress state:', err);
  }
}

export const progressService = {
  /**
   * Migrates any progress recorded as guest/anonymous into the authenticated user's profile.
   */
  migrateGuestProgress(targetUserId: string) {
    if (!targetUserId) return;
    try {
      const guestState = getLocalState('guest_user');
      const targetState = getLocalState(targetUserId);

      let changed = false;

      // Merge lessons
      Object.entries(guestState.lessonProgress).forEach(([lessonId, lp]) => {
        if (!targetState.lessonProgress[lessonId]) {
          targetState.lessonProgress[lessonId] = { ...lp, user_id: targetUserId };
          changed = true;
        }
      });

      // Merge courses
      Object.entries(guestState.courseProgress).forEach(([courseId, cp]) => {
        if (!targetState.courseProgress[courseId]) {
          targetState.courseProgress[courseId] = { ...cp, user_id: targetUserId };
          changed = true;
        }
      });

      // Merge activity
      Object.entries(guestState.activityDays).forEach(([day, ad]) => {
        if (!targetState.activityDays[day]) {
          targetState.activityDays[day] = { ...ad, user_id: targetUserId };
          changed = true;
        }
      });

      if (changed) {
        saveLocalState(targetState, targetUserId);
      }
    } catch (e) {
      console.warn('Could not migrate guest progress:', e);
    }
  },

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
    const safeId = userId || 'guest_user';
    const state = getLocalState(safeId);
    let localResult = state.lessonProgress[lessonId] || null;

    if (isSupabaseConfigured && supabase && userId) {
      try {
        const { data } = await supabase
          .from('lesson_progress')
          .select('*')
          .eq('lesson_id', lessonId)
          .eq('user_id', userId)
          .maybeSingle();

        if (data) {
          localResult = data as LessonProgress;
        }
      } catch (err) {
        console.warn('Supabase fetch lesson progress failed, using local state:', err);
      }
    }

    return localResult;
  },

  /**
   * Retrieves all course progress records for the user.
   * Merges Supabase records with local storage and calculates progress percentage.
   */
  async getAllUserCourseProgress(userId?: string): Promise<Record<string, UserCourseProgress>> {
    const safeId = userId || 'guest_user';
    const state = getLocalState(safeId);
    const map: Record<string, UserCourseProgress> = {};

    // 1. Calculate from local state first
    Object.entries(state.courseProgress).forEach(([courseId, cp]) => {
      const publishedLessons = INITIAL_LESSONS.filter(l => l.course_id === courseId && l.status === 'published');
      const totalPublished = publishedLessons.length;
      const completedCount = publishedLessons.filter(l => state.lessonProgress[l.id]?.status === 'completed').length;
      const isComplete = totalPublished > 0 && completedCount >= totalPublished;

      const percentage = totalPublished > 0
        ? Math.round((completedCount / totalPublished) * 100)
        : 0;

      map[courseId] = {
        ...cp,
        user_id: safeId,
        status: isComplete ? 'completed' : cp.status === 'not_started' ? 'not_started' : 'in_progress',
        completed_lesson_count: completedCount,
        progress_percentage: percentage
      };
    });

    // 2. If Supabase is available, attempt to merge remote records
    if (isSupabaseConfigured && supabase && userId) {
      try {
        const [courseProgressRes, lessonProgressRes] = await Promise.all([
          supabase.from('user_course_progress').select('*').eq('user_id', userId),
          supabase.from('lesson_progress').select('*').eq('user_id', userId).eq('status', 'completed')
        ]);

        if (courseProgressRes.data && courseProgressRes.data.length > 0) {
          const completedLessonSet = new Set((lessonProgressRes.data || []).map((lp: any) => lp.lesson_id));

          courseProgressRes.data.forEach((p: UserCourseProgress) => {
            const courseLessons = INITIAL_LESSONS.filter(l => l.course_id === p.course_id && l.status === 'published');
            const totalPublished = courseLessons.length;
            const completedCount = courseLessons.filter(l => completedLessonSet.has(l.id)).length;
            const isComplete = totalPublished > 0 && completedCount >= totalPublished;
            const percentage = totalPublished > 0 ? Math.round((completedCount / totalPublished) * 100) : 0;

            map[p.course_id] = {
              ...p,
              status: isComplete ? 'completed' : p.status === 'not_started' ? 'not_started' : 'in_progress',
              completed_lesson_count: completedCount,
              progress_percentage: percentage
            };
          });
        }
      } catch (err) {
        console.warn('Supabase fetch course progress failed, using local state:', err);
      }
    }

    return map;
  },

  /**
   * Retrieves all lesson progress records for the user.
   */
  async getAllUserLessonProgress(userId?: string): Promise<Record<string, LessonProgress>> {
    const safeId = userId || 'guest_user';
    const state = getLocalState(safeId);
    const map: Record<string, LessonProgress> = { ...state.lessonProgress };

    if (isSupabaseConfigured && supabase && userId) {
      try {
        const { data } = await supabase
          .from('lesson_progress')
          .select('*')
          .eq('user_id', userId);

        if (data && Array.isArray(data)) {
          data.forEach((p: LessonProgress) => {
            map[p.lesson_id] = p;
          });
        }
      } catch (err) {
        console.warn('Supabase fetch lesson progress failed, using local state:', err);
      }
    }

    return map;
  },

  /**
   * Mark lesson as completed, calculate accurate course progress %, and update streak.
   */
  async markLessonComplete(lessonId: string, courseId: string, userId?: string): Promise<{
    completed_lessons: number;
    total_lessons: number;
    is_course_completed: boolean;
  }> {
    const safeId = userId || 'guest_user';
    const state = getLocalState(safeId);
    const now = new Date().toISOString();
    const todayUTC = new Date().toISOString().slice(0, 10);

    const wasCompleted = state.lessonProgress[lessonId]?.status === 'completed';

    // 1. Update lesson progress locally
    state.lessonProgress[lessonId] = {
      id: state.lessonProgress[lessonId]?.id || `lp-${Date.now()}`,
      user_id: safeId,
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
      user_id: safeId,
      course_id: courseId,
      status: isCourseCompleted ? 'completed' : 'in_progress',
      last_lesson_id: lessonId,
      started_at: state.courseProgress[courseId]?.started_at || now,
      completed_at: isCourseCompleted ? (state.courseProgress[courseId]?.completed_at || now) : null,
      updated_at: now,
      completed_lesson_count: completedLessons,
      progress_percentage: totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0
    };

    // 3. Upsert UTC activity streak
    if (!wasCompleted) {
      const currentCount = state.activityDays[todayUTC]?.lessons_completed_count || 0;
      state.activityDays[todayUTC] = {
        user_id: safeId,
        activity_date: todayUTC,
        lessons_completed_count: currentCount + 1
      };
    }

    saveLocalState(state, safeId);

    // 4. In background, attempt Supabase sync if online and authenticated
    if (isSupabaseConfigured && supabase && userId) {
      (async () => {
        try {
          await supabase.rpc('mark_lesson_complete', { p_lesson_id: lessonId });
        } catch (err) {
          console.warn('Supabase mark_lesson_complete RPC failed (local state is saved):', err);
        }
      })();
    }

    return {
      completed_lessons: completedLessons,
      total_lessons: totalLessons,
      is_course_completed: isCourseCompleted
    };
  },

  /**
   * Record that a lesson was viewed / opened.
   */
  async recordLessonView(lessonId: string, courseId: string, userId?: string) {
    const safeId = userId || 'guest_user';
    const state = getLocalState(safeId);
    const now = new Date().toISOString();

    if (!state.lessonProgress[lessonId]) {
      state.lessonProgress[lessonId] = {
        id: `lp-${Date.now()}`,
        user_id: safeId,
        lesson_id: lessonId,
        course_id: courseId,
        status: 'in_progress',
        first_opened_at: now,
        last_viewed_at: now
      };
    } else {
      state.lessonProgress[lessonId].last_viewed_at = now;
    }

    const courseLessons = INITIAL_LESSONS.filter(l => l.course_id === courseId && l.status === 'published');
    const totalLessons = courseLessons.length;
    const completedLessons = courseLessons.filter(l => 
      state.lessonProgress[l.id]?.status === 'completed'
    ).length;

    const isCourseCompleted = totalLessons > 0 && completedLessons >= totalLessons;

    if (!state.courseProgress[courseId]) {
      state.courseProgress[courseId] = {
        id: `ucp-${Date.now()}`,
        user_id: safeId,
        course_id: courseId,
        status: 'in_progress',
        last_lesson_id: lessonId,
        started_at: now,
        completed_at: null,
        updated_at: now,
        completed_lesson_count: completedLessons,
        progress_percentage: totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0
      };
    } else {
      state.courseProgress[courseId].last_lesson_id = lessonId;
      state.courseProgress[courseId].updated_at = now;
    }

    saveLocalState(state, safeId);

    // In background, sync to Supabase if session exists
    if (isSupabaseConfigured && supabase && userId) {
      Promise.all([
        supabase.from('lesson_progress').upsert({
          user_id: userId,
          lesson_id: lessonId,
          course_id: courseId,
          status: 'in_progress',
          last_viewed_at: now
        }, { onConflict: 'user_id,lesson_id' }),
        supabase.from('user_course_progress').upsert({
          user_id: userId,
          course_id: courseId,
          status: 'in_progress',
          last_lesson_id: lessonId,
          updated_at: now
        }, { onConflict: 'user_id,course_id' })
      ]).catch(err => {
        console.warn('Supabase sync on recordLessonView failed (local state is saved):', err);
      });
    }
  },

  /**
   * Calculates the active consecutive UTC daily streak for the authenticated user.
   */
  async getStreakCount(userId?: string): Promise<number> {
    const safeId = userId || 'guest_user';
    const today = new Date();
    const todayUTC = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));

    const activityMap: Record<string, boolean> = {};

    // 1. Read from local activity days
    const state = getLocalState(safeId);
    Object.keys(state.activityDays).forEach(dateStr => {
      if (state.activityDays[dateStr].lessons_completed_count > 0) {
        activityMap[dateStr] = true;
      }
    });

    // 2. Merge Supabase activity days if available
    if (isSupabaseConfigured && supabase && userId) {
      try {
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
      } catch (err) {
        console.warn('Supabase getStreakCount failed, using local activity:', err);
      }
    }

    let streak = 0;
    const checkDate = new Date(todayUTC);

    // If no activity today, check if active yesterday
    const todayStr = checkDate.toISOString().slice(0, 10);
    if (!activityMap[todayStr]) {
      checkDate.setUTCDate(checkDate.getUTCDate() - 1);
      const yesterdayStr = checkDate.toISOString().slice(0, 10);
      if (!activityMap[yesterdayStr]) {
        // If yesterday was also not active, return 1 if there was any historical activity, or 0
        const hasAnyActivity = Object.keys(activityMap).length > 0;
        return hasAnyActivity ? 1 : 0;
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

    return Math.max(streak, 1);
  }
};
