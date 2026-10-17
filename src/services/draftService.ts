import { supabase, isSupabaseConfigured } from '../lib/supabase';

const LOCAL_DRAFTS_KEY = 'stackforge_local_drafts';

interface LocalDraftRecord {
  code: string;
  revision: number;
  updated_at: string;
}

function getLocalDrafts(): Record<string, LocalDraftRecord> {
  try {
    const raw = localStorage.getItem(LOCAL_DRAFTS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveLocalDraft(lessonId: string, record: LocalDraftRecord) {
  try {
    const drafts = getLocalDrafts();
    drafts[lessonId] = record;
    localStorage.setItem(LOCAL_DRAFTS_KEY, JSON.stringify(drafts));
  } catch (err) {
    console.error('Failed to save draft to local storage fallback:', err);
  }
}

export interface SaveDraftResult {
  status: 'saved' | 'stale_rejected' | 'error';
  revision: number;
  message?: string;
}

export const draftService = {
  async getDraft(lessonId: string, userId?: string): Promise<{ code: string; revision: number } | null> {
    if (isSupabaseConfigured && supabase && userId) {
      const { data, error } = await supabase
        .from('lesson_code_drafts')
        .select('code, revision')
        .eq('lesson_id', lessonId)
        .eq('user_id', userId)
        .maybeSingle();

      if (!error && data) {
        return {
          code: data.code,
          revision: Number(data.revision)
        };
      }
    }

    // Local storage fallback
    const drafts = getLocalDrafts();
    const local = drafts[lessonId];
    if (local) {
      return {
        code: local.code,
        revision: local.revision
      };
    }

    return null;
  },

  async saveDraft(
    lessonId: string,
    code: string,
    revision: number,
    _courseId: string,
    userId?: string
  ): Promise<SaveDraftResult> {
    // 1. Always update local storage safety buffer first
    const localDrafts = getLocalDrafts();
    const existingLocal = localDrafts[lessonId];

    if (existingLocal && existingLocal.revision >= revision) {
      return {
        status: 'stale_rejected',
        revision: existingLocal.revision,
        message: 'A newer draft already exists.'
      };
    }

    saveLocalDraft(lessonId, {
      code,
      revision,
      updated_at: new Date().toISOString()
    });

    // 2. Persist to Supabase if configured & user logged in
    if (isSupabaseConfigured && supabase && userId) {
      const { data, error } = await supabase.rpc('save_lesson_draft', {
        p_lesson_id: lessonId,
        p_code: code,
        p_revision: revision
      });

      if (error) {
        return {
          status: 'error',
          revision,
          message: error.message
        };
      }

      if (data && data.status === 'stale_rejected') {
        return {
          status: 'stale_rejected',
          revision: Number(data.current_revision),
          message: 'Draft rejected: server holds a newer revision.'
        };
      }

      return {
        status: 'saved',
        revision
      };
    }

    return {
      status: 'saved',
      revision
    };
  },

  clearDraft(lessonId: string) {
    try {
      const drafts = getLocalDrafts();
      delete drafts[lessonId];
      localStorage.setItem(LOCAL_DRAFTS_KEY, JSON.stringify(drafts));
    } catch (err) {
      console.error('Error clearing local draft:', err);
    }
  }
};
