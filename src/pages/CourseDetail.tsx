import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { courseService } from '../services/courseService';
import { progressService } from '../services/progressService';
import type { Course, CourseModule, CoursePrerequisite, Lesson, LessonProgress } from '../types/database';
import { TechIcon } from '../components/TechIcon';
import { Badge } from '../components/Badge';
import { ProgressBar } from '../components/ProgressBar';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { 
  Clock, 
  BookOpen, 
  CheckCircle2, 
  ArrowRight, 
  AlertTriangle, 
  PlayCircle, 
  FileCode,
  ChevronRight
} from 'lucide-react';

export const CourseDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { user } = useAuth();

  const [course, setCourse] = useState<Course | null>(null);
  const [modules, setModules] = useState<CourseModule[]>([]);
  const [prerequisites, setPrerequisites] = useState<CoursePrerequisite[]>([]);
  const [lessonProgressMap, setLessonProgressMap] = useState<Record<string, LessonProgress>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (!slug) return;
      setLoading(true);
      try {
        const result = await courseService.getCourseBySlug(slug);
        if (result) {
          setCourse(result.course);
          setModules(result.modules);
          setPrerequisites(result.prerequisites);
        } else {
          setCourse(null);
          setModules([]);
          setPrerequisites([]);
        }

        if (user) {
          const lProgress = await progressService.getAllUserLessonProgress(user.id);
          setLessonProgressMap(lProgress);
        }
      } catch (err) {
        console.error('Failed to load course details:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [slug, user]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <LoadingSpinner size="lg" label="Loading course curriculum..." />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Course not found</h2>
        <p className="text-sm text-slate-400">The requested course catalog entry could not be located.</p>
        <Link to="/learn" className="inline-block px-5 py-2.5 rounded-xl bg-forge-600 text-white font-semibold text-sm">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  // Calculate completed lessons for this course
  const allLessons: Lesson[] = modules.flatMap(m => m.lessons || []);
  const completedLessons = allLessons.filter(l => lessonProgressMap[l.id]?.status === 'completed');
  const totalLessonsCount = allLessons.length;
  const progressPercentage = totalLessonsCount > 0 
    ? Math.round((completedLessons.length / totalLessonsCount) * 100) 
    : 0;

  // Find next lesson to take
  const firstIncompleteLesson = allLessons.find(l => lessonProgressMap[l.id]?.status !== 'completed') || allLessons[0];

  const primaryActionLabel = completedLessons.length === totalLessonsCount && totalLessonsCount > 0
    ? 'Review Course'
    : completedLessons.length > 0
      ? 'Continue Learning'
      : 'Start Learning';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
        <Link to="/learn" className="hover:text-white transition-colors">Courses</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        <span className="text-slate-200">{course.title}</span>
      </div>

      {/* Soft Prerequisite Notification Alert */}
      {prerequisites.length > 0 && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3.5">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs space-y-1">
            <div className="font-semibold text-amber-300">
              Recommended Prerequisite
            </div>
            <p className="text-slate-300 leading-relaxed">
              Recommended: We suggest completing{' '}
              {prerequisites.map((p, idx) => (
                <span key={p.id}>
                  {idx > 0 && ', '}
                  <Link
                    to={`/courses/${p.prerequisite_course?.slug}`}
                    className="font-bold text-amber-400 underline hover:text-amber-300 mx-1"
                  >
                    {p.prerequisite_course?.title || 'the prerequisite course'}
                  </Link>
                </span>
              ))}{' '}
              first to get the most out of this material. You can still begin this course anytime!
            </p>
          </div>
        </div>
      )}

      {/* Course Hero Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Course Overview */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-forge-400 shadow-md">
              <TechIcon iconKey={course.icon_key} className="w-6 h-6 text-forge-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <Badge category={course.category}>{course.category.replace('_', ' ')}</Badge>
                <Badge difficulty={course.difficulty}>{course.difficulty}</Badge>
              </div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight mt-1">
                {course.title}
              </h1>
            </div>
          </div>

          <p className="text-base text-slate-300 leading-relaxed font-normal">
            {course.full_description}
          </p>

          {/* Quick Metrics */}
          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400 border-y border-dark-border py-4">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-slate-500" />
              <span>{course.estimated_duration_minutes} minutes estimated</span>
            </div>
            <div className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-slate-500" />
              <span>{totalLessonsCount} published lessons</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FileCode className="w-4 h-4 text-slate-500" />
              <span>Technology: <strong className="text-slate-200">{course.technology}</strong></span>
            </div>
          </div>

          {/* What you'll learn */}
          {course.learning_outcomes && course.learning_outcomes.length > 0 && (
            <div className="space-y-3 pt-2">
              <h3 className="text-sm uppercase font-bold tracking-wider text-forge-400">
                What You'll Master
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {course.learning_outcomes.map((outcome, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-dark-card border border-dark-border">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-300 leading-relaxed">{outcome}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Action Sidebar Card */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-dark-card border border-dark-border shadow-xl space-y-6 sticky top-24">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Course Progress
            </span>
            <ProgressBar progress={progressPercentage} showLabel />
            <p className="text-xs text-slate-400">
              {completedLessons.length} of {totalLessonsCount} lessons completed
            </p>
          </div>

          {firstIncompleteLesson ? (
            <Link
              to={`/learn/${course.slug}/${firstIncompleteLesson.slug}`}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-forge-600 to-forge-500 hover:from-forge-500 hover:to-forge-400 shadow-xl shadow-forge-500/25 transition-all text-sm"
            >
              <PlayCircle className="w-5 h-5" />
              <span>{primaryActionLabel}</span>
            </Link>
          ) : (
            <div className="p-3 text-center text-xs text-slate-400 bg-slate-800/50 rounded-xl">
              Curriculum in development.
            </div>
          )}

          <div className="space-y-2 pt-2 border-t border-dark-border text-xs text-slate-400">
            <div className="flex justify-between">
              <span>Execution Mode:</span>
              <span className="text-slate-200 font-mono">Isolated Browser Sandbox</span>
            </div>
            <div className="flex justify-between">
              <span>Code Drafts:</span>
              <span className="text-slate-200 font-mono">Autosaved with Revisions</span>
            </div>
            <div className="flex justify-between">
              <span>Assessments:</span>
              <span className="text-slate-200 font-mono">Server Graded</span>
            </div>
          </div>
        </div>

      </div>

      {/* Modules & Lessons Curriculum Section */}
      <div className="space-y-6 pt-6">
        <div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            Curriculum Structure
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Complete each module and lesson at your own pace.
          </p>
        </div>

        <div className="space-y-4">
          {modules.map((module, mIdx) => (
            <div
              key={module.id}
              className="rounded-2xl bg-dark-card border border-dark-border overflow-hidden"
            >
              {/* Module Header */}
              <div className="px-6 py-4 bg-dark-surface/60 border-b border-dark-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-forge-400">
                    Module 0{mIdx + 1}
                  </span>
                  <h3 className="text-base font-bold text-white">{module.title}</h3>
                </div>
                <span className="text-xs text-slate-400">
                  {module.lessons?.length || 0} Lessons
                </span>
              </div>

              {/* Lessons List */}
              <div className="divide-y divide-dark-border">
                {module.lessons?.map((lesson, lIdx) => {
                  const isCompleted = lessonProgressMap[lesson.id]?.status === 'completed';

                  return (
                    <Link
                      key={lesson.id}
                      to={`/learn/${course.slug}/${lesson.slug}`}
                      className="px-6 py-4 flex items-center justify-between hover:bg-slate-800/40 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                          isCompleted
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                            : 'bg-slate-800 text-slate-400 border border-slate-700'
                        }`}>
                          {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : `${lIdx + 1}`}
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold text-white group-hover:text-forge-400 transition-colors">
                            {lesson.title}
                          </h4>
                          <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-0.5">
                            <span>{lesson.estimated_minutes || 20} mins</span>
                            <span>•</span>
                            <span className="capitalize">{lesson.execution_mode.replace('_', ' ')}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {isCompleted && (
                          <span className="text-[11px] text-emerald-400 font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10">
                            Completed
                          </span>
                        )}
                        <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-forge-400 group-hover:translate-x-1 transition-all" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
