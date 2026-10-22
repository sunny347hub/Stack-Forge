import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { courseService } from '../services/courseService';
import { progressService } from '../services/progressService';
import type { Course, UserCourseProgress, LessonProgress } from '../types/database';
import { TechIcon } from '../components/TechIcon';
import { Badge } from '../components/Badge';
import { ProgressBar } from '../components/ProgressBar';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { 
  ArrowRight, 
  CheckCircle2, 
  Flame, 
  Clock, 
  Search, 
  BookOpen, 
  PlayCircle,
  Layers,
  Sparkles,
  Compass,
  Trophy,
  CheckCircle
} from 'lucide-react';

export const LearnDashboard: React.FC = () => {
  const { user, profile, isLoading: isAuthLoading } = useAuth();

  const [courses, setCourses] = useState<Course[]>([]);
  const [courseProgressMap, setCourseProgressMap] = useState<Record<string, UserCourseProgress>>({});
  const [lessonProgressMap, setLessonProgressMap] = useState<Record<string, LessonProgress>>({});
  const [streak, setStreak] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  // Filters & Search
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    async function loadDashboardData() {
      setLoading(true);
      try {
        const publishedCourses = await courseService.getPublishedCourses();
        setCourses(publishedCourses);

        if (user) {
          const [cProgress, lProgress, streakCount] = await Promise.all([
            progressService.getAllUserCourseProgress(user.id),
            progressService.getAllUserLessonProgress(user.id),
            progressService.getStreakCount(user.id)
          ]);
          setCourseProgressMap(cProgress || {});
          setLessonProgressMap(lProgress || {});
          setStreak(streakCount || 0);
        } else {
          // Unauthenticated: show any guest progress
          const [cProgress, lProgress, streakCount] = await Promise.all([
            progressService.getAllUserCourseProgress('guest_user'),
            progressService.getAllUserLessonProgress('guest_user'),
            progressService.getStreakCount('guest_user')
          ]);
          setCourseProgressMap(cProgress || {});
          setLessonProgressMap(lProgress || {});
          setStreak(streakCount || 0);
        }
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      } finally {
        setLoading(false);
      }
    }

    if (!isAuthLoading) {
      loadDashboardData();
    }
  }, [user, isAuthLoading]);

  // Derived progress statistics strictly based on current user records
  const startedCoursesCount = Object.values(courseProgressMap).filter(p => p.status === 'in_progress').length;
  const completedCoursesCount = Object.values(courseProgressMap).filter(p => p.status === 'completed').length;
  const completedLessonsCount = Object.values(lessonProgressMap).filter(p => p.status === 'completed').length;
  const hasUserActivity = user && (startedCoursesCount > 0 || completedCoursesCount > 0 || completedLessonsCount > 0);

  // Active / Last touched course for "Continue Learning"
  const activeCourseProgress = Object.values(courseProgressMap)
    .filter(p => p.status === 'in_progress')
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())[0];

  const activeCourse = activeCourseProgress 
    ? courses.find(c => c.id === activeCourseProgress.course_id)
    : null;

  // Filtering
  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || course.difficulty === selectedDifficulty;
    const matchesSearch = searchQuery.trim() === '' || 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.technology.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.short_description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesDifficulty && matchesSearch;
  });

  const categories: { key: string; label: string }[] = [
    { key: 'all', label: 'All Courses' },
    { key: 'frontend', label: 'Frontend' },
    { key: 'backend', label: 'Backend' },
    { key: 'databases', label: 'Databases' },
    { key: 'developer_tools', label: 'Developer Tools' },
  ];

  const firstFiveSteps = courses.slice(0, 5);

  if (loading || isAuthLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <LoadingSpinner size="lg" label="Loading curriculum and progress..." />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* 8.1 Header Greeting */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-dark-border pb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forge-500/10 border border-forge-500/30 text-forge-400 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Developer Learning Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {user ? (
              <>Welcome back, <span className="text-forge-400">{profile?.full_name || 'Builder'}</span>!</>
            ) : (
              <>Explore the <span className="text-forge-400">StackForge</span> Curriculum</>
            )}
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Structured full-stack engineering courses with hands-on coding, live browser preview, and continuous progress tracking.
          </p>
        </div>

        {user && (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-dark-card border border-dark-border">
              <Flame className={`w-5 h-5 ${streak > 0 ? 'text-forge-500 fill-forge-500 animate-pulse-subtle' : 'text-slate-600'}`} />
              <div>
                <div className="text-xs text-slate-400 font-medium">Daily Streak</div>
                <div className="text-base font-bold text-white">{streak} {streak === 1 ? 'Day' : 'Days'} (UTC)</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 8.2 Continue Learning & 8.3 Progress Summary */}
      {user && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Action / Jump Back In Card */}
          <div className="lg:col-span-7 rounded-2xl bg-gradient-to-br from-dark-card to-dark-surface border border-dark-border p-6 shadow-xl flex flex-col justify-between">
            {hasUserActivity && activeCourse && activeCourseProgress ? (
              /* Genuine Active Course In-Progress State */
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-forge-500 animate-pulse" />
                    <span className="text-xs uppercase font-bold tracking-wider text-forge-400">
                      Jump Back In
                    </span>
                  </div>
                  <Badge category={activeCourse.category}>{activeCourse.technology}</Badge>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white">{activeCourse.title}</h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    {activeCourse.short_description}
                  </p>
                </div>

                <div className="pt-2">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5 font-medium">
                    <span>Course Progress</span>
                    <span className="text-forge-400 font-bold">{activeCourseProgress.progress_percentage || 0}% Complete</span>
                  </div>
                  <ProgressBar 
                    progress={activeCourseProgress.progress_percentage || 0} 
                    showLabel={false}
                  />
                </div>

                <div className="pt-2">
                  <Link
                    to={`/courses/${activeCourse.slug}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-forge-600 hover:bg-forge-500 shadow-lg shadow-forge-500/20 transition-all"
                  >
                    <PlayCircle className="w-4 h-4" />
                    <span>Resume Course</span>
                  </Link>
                </div>
              </div>
            ) : hasUserActivity && completedCoursesCount > 0 && startedCoursesCount === 0 ? (
              /* All Started Courses Completed State */
              <div className="space-y-4 py-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-bold tracking-wider text-emerald-400 flex items-center gap-1.5">
                    <Trophy className="w-4 h-4" />
                    Curriculum Milestone Achieved
                  </span>
                  <Badge category="frontend">Completed</Badge>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">All Active Courses Mastered!</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    You have finished your active courses with 100% completion. Continue your learning path with the next recommended stage.
                  </p>
                </div>
                <div>
                  <Link
                    to="/learning-paths"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-500/20 transition-all"
                  >
                    <span>View Next Path Stage</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ) : (
              /* Brand-New User Clean Onboarding State (NO FAKE PROGRESS / NO 33%) */
              <div className="space-y-4 py-2">
                <div className="w-10 h-10 rounded-xl bg-forge-500/10 border border-forge-500/30 flex items-center justify-center text-forge-400">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Your Learning Journey Starts Here</h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed max-w-lg">
                    Choose a course below to begin building your full-stack engineering skills with hands-on practice, code execution, and real-time feedback.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <Link
                    to="/courses/html-fundamentals"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-forge-600 hover:bg-forge-500 shadow-lg shadow-forge-500/20 transition-all"
                  >
                    <span>Start HTML Fundamentals</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/learning-paths"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-300 hover:text-white bg-dark-card hover:bg-slate-800 border border-dark-border transition-all"
                  >
                    <span>Explore Learning Path</span>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Progress Summary Cards - strictly truthful metric values */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-dark-card border border-dark-border flex flex-col justify-between">
              <div className="text-slate-400 text-xs font-medium">Courses In Progress</div>
              <div className="text-3xl font-extrabold text-white mt-2">{startedCoursesCount}</div>
              <div className="text-[11px] text-forge-400 mt-1 font-medium">
                {startedCoursesCount === 1 ? '1 active course' : `${startedCoursesCount} active courses`}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-dark-card border border-dark-border flex flex-col justify-between">
              <div className="text-slate-400 text-xs font-medium">Courses Finished</div>
              <div className="text-3xl font-extrabold text-emerald-400 mt-2">{completedCoursesCount}</div>
              <div className="text-[11px] text-slate-400 mt-1 font-medium">100% complete</div>
            </div>

            <div className="p-5 rounded-2xl bg-dark-card border border-dark-border flex flex-col justify-between">
              <div className="text-slate-400 text-xs font-medium">Lessons Mastered</div>
              <div className="text-3xl font-extrabold text-sky-400 mt-2">{completedLessonsCount}</div>
              <div className="text-[11px] text-slate-400 mt-1 font-medium">Completed lessons</div>
            </div>

            <div className="p-5 rounded-2xl bg-dark-card border border-dark-border flex flex-col justify-between">
              <div className="text-slate-400 text-xs font-medium">Active Streak</div>
              <div className={`text-3xl font-extrabold mt-2 ${streak > 0 ? 'text-amber-400' : 'text-slate-500'}`}>
                {streak}
              </div>
              <div className="text-[11px] text-slate-400 mt-1 font-medium">Consecutive UTC days</div>
            </div>
          </div>

        </div>
      )}

      {/* 8.4 Featured Full-Stack Developer Path (First 5 steps preview) */}
      <div className="rounded-2xl bg-dark-card border border-dark-border p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-forge-400" />
              <h2 className="text-lg font-bold text-white">Full-Stack Developer Learning Path</h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              The recommended foundational progression from core markup to backend services.
            </p>
          </div>
          <Link
            to="/learning-paths"
            className="text-xs font-semibold text-forge-400 hover:text-forge-300 flex items-center gap-1"
          >
            <span>View All 12 Stages</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 5-Step Pipeline Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 pt-2">
          {firstFiveSteps.map((step, idx) => {
            const stepProgress = courseProgressMap[step.id];
            const isCompleted = stepProgress?.status === 'completed';
            const isInProgress = stepProgress?.status === 'in_progress';

            return (
              <Link
                key={step.id}
                to={`/courses/${step.slug}`}
                className="group p-4 rounded-xl bg-dark-surface/80 border border-dark-border hover:border-forge-500/50 hover:bg-slate-800/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono font-bold text-slate-500 group-hover:text-forge-400">
                      Step 0{idx + 1}
                    </span>
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : isInProgress ? (
                      <span className="w-2 h-2 rounded-full bg-forge-500 animate-pulse" />
                    ) : null}
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <TechIcon iconKey={step.icon_key} className="w-4 h-4 text-forge-400" />
                    <h4 className="text-sm font-bold text-white group-hover:text-forge-300 transition-colors">
                      {step.title.replace(' Fundamentals', '')}
                    </h4>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                    {step.short_description}
                  </p>
                </div>

                <div className="mt-4 pt-2 border-t border-dark-border/60">
                  <span className="text-[11px] text-forge-400 font-medium group-hover:underline">
                    {isCompleted ? 'Review Course' : isInProgress ? 'Continue' : 'Start Course'} →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* 8.5 & 8.7 Search & Category Filter Area */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            {categories.map(cat => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat.key
                    ? 'bg-forge-600 text-white shadow-md shadow-forge-500/20'
                    : 'bg-dark-card text-slate-400 hover:text-white hover:bg-slate-800 border border-dark-border'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input & Difficulty Selector */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search courses..."
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-dark-card border border-dark-border text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-forge-500 transition-colors"
              />
            </div>

            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="py-2 px-3 rounded-xl bg-dark-card border border-dark-border text-xs text-slate-300 focus:outline-none focus:border-forge-500 transition-colors"
            >
              <option value="all">All Difficulties</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

        </div>

        {/* 8.6 Course Cards Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map(course => {
              const userProgress = courseProgressMap[course.id];
              const isStarted = Boolean(userProgress && userProgress.status !== 'not_started');
              const isCompleted = Boolean(userProgress && userProgress.status === 'completed');
              const progressPct = userProgress?.progress_percentage || 0;

              return (
                <div
                  key={course.id}
                  className="rounded-2xl bg-dark-card border border-dark-border hover:border-slate-600 hover:shadow-xl transition-all flex flex-col justify-between overflow-hidden group"
                >
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-forge-400 group-hover:scale-105 transition-transform">
                        <TechIcon iconKey={course.icon_key} className="w-5 h-5 text-forge-400" />
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Badge category={course.category}>{course.category.replace('_', ' ')}</Badge>
                        <Badge difficulty={course.difficulty}>{course.difficulty}</Badge>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-forge-400 transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1.5 leading-relaxed line-clamp-2">
                        {course.short_description}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-slate-400 pt-2 border-t border-dark-border/60">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-500" />
                        <span>{course.estimated_duration_minutes} min</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5 text-slate-500" />
                        <span>{course.published_lesson_count || 1} {course.published_lesson_count === 1 ? 'lesson' : 'lessons'}</span>
                      </div>
                    </div>

                    {user && isStarted && (
                      <div className="pt-2">
                        <ProgressBar 
                          progress={progressPct} 
                          size="sm" 
                          showLabel 
                        />
                      </div>
                    )}
                  </div>

                  <div className="px-6 py-4 bg-dark-surface/50 border-t border-dark-border flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-400">
                      {isCompleted ? (
                        <span className="text-emerald-400 flex items-center gap-1">
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>Completed</span>
                        </span>
                      ) : isStarted ? (
                        <span className="text-forge-400">In Progress ({progressPct}%)</span>
                      ) : (
                        'Not Started'
                      )}
                    </span>
                    <Link
                      to={`/courses/${course.slug}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-slate-800 hover:bg-forge-600 transition-colors"
                    >
                      <span>{isCompleted ? 'Review' : isStarted ? 'Continue' : 'Start'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty state */
          <div className="text-center py-16 bg-dark-card rounded-2xl border border-dark-border p-8 space-y-4">
            <Search className="w-10 h-10 text-slate-500 mx-auto" />
            <h3 className="text-lg font-bold text-white">No courses match your filters</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Try selecting another category or clearing your search term to see available modules.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedDifficulty('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-forge-400 bg-forge-500/10 border border-forge-500/30 hover:bg-forge-500/20 transition-all"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

    </div>
  );
};
