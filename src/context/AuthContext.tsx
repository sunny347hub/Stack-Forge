import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { Profile } from '../types/database';

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  isLoading: boolean;
  isDemoMode: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const LOCAL_USER_KEY = 'stackforge_demo_user';
const LOCAL_PROFILE_KEY = 'stackforge_demo_profile';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isDemoMode = !isSupabaseConfigured;

  const fetchProfile = async (userId: string) => {
    if (isSupabaseConfigured && supabase) {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (data) {
        setProfile(data as Profile);
      }
    }
  };

  useEffect(() => {
    if (isSupabaseConfigured && supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          fetchProfile(session.user.id);
        }
        setIsLoading(false);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          fetchProfile(session.user.id);
        } else {
          setProfile(null);
        }
        setIsLoading(false);
      });

      return () => {
        subscription.unsubscribe();
      };
    } else {
      // Local Demo Auth
      try {
        const storedUser = localStorage.getItem(LOCAL_USER_KEY);
        const storedProfile = localStorage.getItem(LOCAL_PROFILE_KEY);
        if (storedUser && storedProfile) {
          setUser(JSON.parse(storedUser));
          setProfile(JSON.parse(storedProfile));
        }
      } catch (err) {
        console.error('Error restoring demo auth session:', err);
      }
      setIsLoading(false);
    }
  }, []);

  const signIn = async (email: string, password: string): Promise<{ error: Error | null }> => {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      return { error };
    }

    // Demo Mode Sign In
    const mockId = 'demo-user-uuid-1234';
    const mockUser: any = {
      id: mockId,
      email,
      created_at: new Date().toISOString()
    };
    const mockProfile: Profile = {
      id: mockId,
      full_name: email.split('@')[0].toUpperCase(),
      avatar_url: null,
      preferred_language: 'en',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(mockUser));
    localStorage.setItem(LOCAL_PROFILE_KEY, JSON.stringify(mockProfile));
    setUser(mockUser);
    setProfile(mockProfile);

    return { error: null };
  };

  const signUp = async (email: string, password: string, fullName: string): Promise<{ error: Error | null }> => {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName
          }
        }
      });

      if (error) return { error };

      if (data.user) {
        await supabase.from('profiles').upsert({
          id: data.user.id,
          full_name: fullName,
          updated_at: new Date().toISOString()
        });
        await fetchProfile(data.user.id);
      }

      return { error: null };
    }

    // Demo Mode Sign Up
    const mockId = `user-${Date.now()}`;
    const mockUser: any = {
      id: mockId,
      email,
      created_at: new Date().toISOString()
    };
    const mockProfile: Profile = {
      id: mockId,
      full_name: fullName,
      avatar_url: null,
      preferred_language: 'en',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(mockUser));
    localStorage.setItem(LOCAL_PROFILE_KEY, JSON.stringify(mockProfile));
    setUser(mockUser);
    setProfile(mockProfile);

    return { error: null };
  };

  const signOut = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    } else {
      localStorage.removeItem(LOCAL_USER_KEY);
      localStorage.removeItem(LOCAL_PROFILE_KEY);
      // Clean up legacy un-namespaced keys if they linger
      localStorage.removeItem('stackforge_local_progress');
      localStorage.removeItem('stackforge_local_lesson_progress');
      localStorage.removeItem('stackforge_local_activity');
    }
    setUser(null);
    setProfile(null);
    setSession(null);
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        session,
        isLoading,
        isDemoMode,
        signIn,
        signUp,
        signOut,
        refreshProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
