import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type {
  KnowledgeCheck,
  KnowledgeCheckResult,
  KnowledgeCheckSubmissionAnswer,
  KnowledgeCheckAttempt
} from '../types/database';
import {
  INITIAL_KNOWLEDGE_CHECKS,
  KNOWLEDGE_CHECK_QUESTIONS_SECURE
} from '../lib/seedData';

const LOCAL_ATTEMPTS_KEY = 'stackforge_local_quiz_attempts';

function getLocalAttempts(): KnowledgeCheckAttempt[] {
  try {
    const raw = localStorage.getItem(LOCAL_ATTEMPTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalAttempt(attempt: KnowledgeCheckAttempt) {
  try {
    const list = getLocalAttempts();
    list.push(attempt);
    localStorage.setItem(LOCAL_ATTEMPTS_KEY, JSON.stringify(list));
  } catch (err) {
    console.error('Error saving local quiz attempt:', err);
  }
}

export const knowledgeCheckService = {
  async getKnowledgeCheckForLesson(lessonId: string): Promise<KnowledgeCheck | null> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.rpc('get_knowledge_check_for_lesson', {
        p_lesson_id: lessonId
      });

      if (!error && data) {
        return data as KnowledgeCheck;
      }
    }

    // Fallback seed: Strip out correct_choice_id and explanation before returning!
    const check = INITIAL_KNOWLEDGE_CHECKS.find(c => c.lesson_id === lessonId);
    if (!check) return null;

    const safeQuestions = KNOWLEDGE_CHECK_QUESTIONS_SECURE.map(q => ({
      id: q.id,
      sort_order: q.sort_order,
      prompt: q.prompt,
      question_type: q.question_type,
      choices: q.choices
    }));

    return {
      ...check,
      questions: safeQuestions
    };
  },

  async submitKnowledgeCheck(
    checkId: string,
    answers: KnowledgeCheckSubmissionAnswer[],
    courseId: string,
    lessonId: string,
    userId?: string
  ): Promise<KnowledgeCheckResult> {
    if (isSupabaseConfigured && supabase && userId) {
      const { data, error } = await supabase.rpc('submit_knowledge_check', {
        p_check_id: checkId,
        p_answers: answers
      });

      if (error) {
        throw new Error(error.message);
      }

      return data as KnowledgeCheckResult;
    }

    // Secure fallback grading engine (answers validated against secure internal seed)
    const check = INITIAL_KNOWLEDGE_CHECKS.find(c => c.id === checkId);
    const passingPercent = check?.passing_score_percent || 70;
    const questions = KNOWLEDGE_CHECK_QUESTIONS_SECURE;

    let correctCount = 0;
    const breakdown = questions.map(q => {
      const userAns = answers.find(a => a.question_id === q.id);
      const isCorrect = userAns ? userAns.choice_id === q.correct_choice_id : false;
      if (isCorrect) correctCount += 1;

      return {
        question_id: q.id,
        selected_choice_id: userAns?.choice_id || null,
        correct_choice_id: q.correct_choice_id,
        is_correct: isCorrect,
        explanation: q.explanation
      };
    });

    const totalQuestions = questions.length;
    const score = correctCount;
    const percentage = Number(((correctCount / totalQuestions) * 100).toFixed(2));
    const isPassed = percentage >= passingPercent;

    const existingAttempts = getLocalAttempts().filter(a => a.knowledge_check_id === checkId);
    const attemptNumber = existingAttempts.length + 1;

    const attemptRecord: KnowledgeCheckAttempt = {
      id: `attempt-${Date.now()}`,
      user_id: userId || 'local-user',
      knowledge_check_id: checkId,
      lesson_id: lessonId,
      course_id: courseId,
      attempt_number: attemptNumber,
      selected_answers: answers,
      correct_count: correctCount,
      total_questions: totalQuestions,
      score,
      percentage,
      is_passed: isPassed,
      submitted_at: new Date().toISOString()
    };

    saveLocalAttempt(attemptRecord);

    return {
      attempt_number: attemptNumber,
      correct_count: correctCount,
      total_questions: totalQuestions,
      score,
      percentage,
      passing_score_percent: passingPercent,
      is_passed: isPassed,
      submitted_at: attemptRecord.submitted_at,
      breakdown
    };
  },

  async getAttempts(checkId: string, userId?: string): Promise<KnowledgeCheckAttempt[]> {
    if (isSupabaseConfigured && supabase && userId) {
      const { data } = await supabase
        .from('knowledge_check_attempts')
        .select('*')
        .eq('knowledge_check_id', checkId)
        .eq('user_id', userId)
        .order('attempt_number', { ascending: false });

      return (data || []) as KnowledgeCheckAttempt[];
    }

    return getLocalAttempts()
      .filter(a => a.knowledge_check_id === checkId)
      .sort((a, b) => b.attempt_number - a.attempt_number);
  }
};
