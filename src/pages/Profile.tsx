import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { progressService } from '../services/progressService';
import { Flame, CheckCircle2, BookOpen, Clock, User, Shield, LogOut } from 'lucide-react';
import { ProgressBar } from '../components/ProgressBar';

export const Profile: React.FC = () => {
  const { user, profile, signOut, isDemoMode } = useAuth();
  const [streak, setStreak] = useState<number>(0);
  const [coursesCount, setCoursesCount] = useState<number>(0);
  const [lessonsCount, setLessonsCount] = useState<number>(0);

  useEffect(() => {
    if (user) {
      progressService.getStreakCount(user.id).then(setStreak);
      progressService.getAllUserCourseProgress(user.id).then(cMap => {
        setCoursesCount(Object.values(cMap).filter(c => c.status === 'completed').length);
      });
      progressService.getAllUserLessonProgress(user.id).then(lMap => {
        setLessonsCount(Object.values(lMap).filter(l => l.status === 'completed').length);
      });
    }
  }, [user]);

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      
      {/* Profile Header */}
      <div className="p-8 rounded-2xl bg-dark-card border border-dark-border flex flex-col sm:flex-row items-center gap-6 shadow-xl">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-forge-500 to-forge-700 flex items-center justify-center text-white text-3xl font-extrabold shadow-lg shadow-forge-500/20">
          {(profile?.full_name || user.email || 'U')[0].toUpperCase()}
        </div>

        <div className="space-y-1 text-center sm:text-left flex-1">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h1 className="text-2xl font-bold text-white tracking-tight">
              {profile?.full_name || 'StackForge Learner'}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-forge-500/10 border border-forge-500/30 text-forge-400">
              Full-Stack Apprentice
            </span>
          </div>
          <p className="text-xs text-slate-400 font-mono">{user.email}</p>
          <p className="text-xs text-slate-500 pt-1">
            Joined {new Date(user.created_at || Date.now()).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
          </p>
        </div>

        <button
          onClick={() => signOut()}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 border border-rose-500/20 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-dark-card border border-dark-border space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Learning Streak</span>
            <Flame className="w-4 h-4 text-forge-500 fill-forge-500" />
          </div>
          <div className="text-3xl font-extrabold text-white">{streak}</div>
          <p className="text-[11px] text-slate-500">Consecutive UTC days active</p>
        </div>

        <div className="p-6 rounded-2xl bg-dark-card border border-dark-border space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Completed Courses</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-400">{coursesCount}</div>
          <p className="text-[11px] text-slate-500">100% finished curriculums</p>
        </div>

        <div className="p-6 rounded-2xl bg-dark-card border border-dark-border space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Completed Lessons</span>
            <BookOpen className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-3xl font-extrabold text-sky-400">{lessonsCount}</div>
          <p className="text-[11px] text-slate-500">Practical modules mastered</p>
        </div>
      </div>

      {/* Account & Storage Architecture Details */}
      <div className="p-6 rounded-2xl bg-dark-card border border-dark-border space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">
          Account & Security Status
        </h3>

        <div className="divide-y divide-dark-border text-xs">
          <div className="py-3 flex justify-between items-center">
            <span className="text-slate-400">Database Engine</span>
            <span className="text-slate-200 font-mono">
              {isDemoMode ? 'Local Isolated Web Store (Configure .env for Supabase)' : 'Supabase PostgreSQL Cloud'}
            </span>
          </div>
          <div className="py-3 flex justify-between items-center">
            <span className="text-slate-400">Row Level Security (RLS)</span>
            <span className="text-emerald-400 font-semibold">Active & Enforced</span>
          </div>
          <div className="py-3 flex justify-between items-center">
            <span className="text-slate-400">Stale-Write Draft Guard</span>
            <span className="text-emerald-400 font-semibold">Optimistic Atomic Revisions</span>
          </div>
          <div className="py-3 flex justify-between items-center">
            <span className="text-slate-400">Assessment Grading</span>
            <span className="text-emerald-400 font-semibold">Protected Server RPC</span>
          </div>
        </div>
      </div>

    </div>
  );
};
