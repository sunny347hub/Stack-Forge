import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { courseService } from '../services/courseService';
import { progressService } from '../services/progressService';
import { LearningPath, UserCourseProgress } from '../types/database';
import { Badge } from '../components/Badge';
import { ProgressBar } from '../components/ProgressBar';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  Sparkles
} from 'lucide-react';

export const LearningPaths: React.FC = () => {
  const { user } = useAuth();
  const [path, setPath] = useState<LearningPath | null>(null);
  const [courseProgressMap, setCourseProgressMap] = useState<Record<string, UserCourseProgress>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPath() {
      setLoading(true);
      try {
        const primaryPath = await courseService.getPrimaryLearningPath();
        setPath(primaryPath);

        if (user) {
          const cProgress = await progressService.getAllUserCourseProgress(user.id);
          setCourseProgressMap(cProgress);
        }
      } catch (err) {
        console.error('Failed to load learning path:', err);
      } finally {
        setLoading(false);
      }
    }
    loadPath();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <LoadingSpinner size="lg" label="Loading Full-Stack curriculum path..." />
      </div>
    );
  }

  const steps = path?.steps || [];
  const completedStepsCount = steps.filter(s => courseProgressMap[s.course_id]?.status === 'completed').length;
  const overallPercentage = steps.length > 0 ? Math.round((completedStepsCount / steps.length) * 100) : 0;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Path Header */}
      <div className="border-b border-dark-border pb-8 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forge-500/10 border border-forge-500/30 text-forge-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Curated Developer Trajectory</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Full-Stack Developer Path
        </h1>

        <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
          {path?.description || 'A complete 12-stage curriculum guiding you from frontend markup to backend REST APIs and relational databases.'}
        </p>

        {user && (
          <div className="pt-2 max-w-md">
            <ProgressBar progress={overallPercentage} showLabel />
            <span className="text-xs text-slate-400 mt-1 block">
              {completedStepsCount} of {steps.length} path courses completed
            </span>
          </div>
        )}
      </div>

      {/* 12 Stages Vertical Timeline */}
      <div className="space-y-4">
        {steps.map((step) => {
          const course = step.course;
          const userProgress = course ? courseProgressMap[course.id] : null;
          const isCompleted = userProgress?.status === 'completed';
          const isInProgress = userProgress?.status === 'in_progress';

          return (
            <div
              key={step.id}
              className={`p-6 rounded-2xl bg-dark-card border transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 ${
                isCompleted
                  ? 'border-emerald-500/30 bg-emerald-500/5'
                  : isInProgress
                  ? 'border-forge-500/40 bg-forge-500/5'
                  : 'border-dark-border hover:border-slate-700'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 ${
                  isCompleted
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : isInProgress
                    ? 'bg-forge-500/20 text-forge-400 border border-forge-500/40'
                    : 'bg-dark-surface text-slate-400 border border-dark-border'
                }`}>
                  {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : `0${step.step_number}`}
                </div>

                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs uppercase font-mono font-bold text-slate-500">
                      Stage {step.step_number}
                    </span>
                    {course && (
                      <>
                        <Badge category={course.category}>{course.category.replace('_', ' ')}</Badge>
                        <Badge difficulty={course.difficulty}>{course.difficulty}</Badge>
                      </>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-white">
                    {course?.title || step.label}
                  </h3>

                  <p className="text-xs text-slate-400 max-w-xl leading-relaxed">
                    {course?.short_description}
                  </p>

                  {course && (
                    <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{course.estimated_duration_minutes} mins</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>{course.published_lesson_count || 1} published lessons</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-3">
                {course && (
                  <Link
                    to={`/courses/${course.slug}`}
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isCompleted
                        ? 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                        : isInProgress
                        ? 'bg-forge-600 text-white hover:bg-forge-500 shadow-md shadow-forge-500/20'
                        : 'bg-dark-surface text-slate-300 hover:text-white hover:bg-slate-800 border border-dark-border'
                    }`}
                  >
                    <span>{isCompleted ? 'Review' : isInProgress ? 'Continue' : 'Start Stage'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
