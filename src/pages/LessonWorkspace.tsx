import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import confetti from 'canvas-confetti';
import { useAuth } from '../context/AuthContext';
import { courseService } from '../services/courseService';
import { progressService } from '../services/progressService';
import { draftService, SaveDraftResult } from '../services/draftService';
import { knowledgeCheckService } from '../services/knowledgeCheckService';
import { executionService } from '../services/executionService';
import {
  Course,
  CourseModule,
  Lesson,
  KnowledgeCheck,
  KnowledgeCheckResult,
  KnowledgeCheckAttempt,
  KnowledgeCheckSubmissionAnswer,
  LessonProgress
} from '../types/database';
import { ExecutionResult } from '../types/execution';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { StructuredLessonView } from '../components/StructuredLessonView';
import {
  Play,
  RotateCcw,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  PanelLeftClose,
  PanelLeftOpen,
  Terminal,
  Eye,
  Table,
  BookOpen,
  HelpCircle,
  AlertTriangle,
  Check,
  ChevronRight,
  ChevronDown,
  Columns,
  Smartphone,
  Monitor,
  Maximize2,
  Minimize2,
  Copy,
  Sparkles,
  Trash2,
  Database,
  ZoomIn,
  ZoomOut,
  Send,
  RefreshCw
} from 'lucide-react';

export const LessonWorkspace: React.FC = () => {
  const { courseSlug, lessonSlug } = useParams<{ courseSlug: string; lessonSlug: string }>();
  const { user } = useAuth();

  // Course & Curriculum State
  const [course, setCourse] = useState<Course | null>(null);
  const [modules, setModules] = useState<CourseModule[]>([]);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [allLessonProgressMap, setAllLessonProgressMap] = useState<Record<string, LessonProgress>>({});
  const [loading, setLoading] = useState(true);

  // Layout UI State
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [collapsedModules, setCollapsedModules] = useState<Record<string, boolean>>({});
  const [layoutMode, setLayoutMode] = useState<'split' | 'reading' | 'editor'>('split');
  const [activeTab, setActiveTab] = useState<'content' | 'quiz'>('content');
  const [mobileActiveTab, setMobileActiveTab] = useState<'content' | 'editor' | 'output'>('content');
  const [editorOutputTab, setEditorOutputTab] = useState<'preview' | 'console' | 'table'>('preview');
  const [previewViewport, setPreviewViewport] = useState<'desktop' | 'mobile'>('desktop');

  // Editor & Draft State
  const [code, setCode] = useState<string>('');
  const [revision, setRevision] = useState<number>(1);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'stale_rejected' | 'error'>('idle');
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Execution State
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionResult, setExecutionResult] = useState<ExecutionResult | null>(null);

  // Enhanced Compiler State
  const [editorFontSize, setEditorFontSize] = useState<number>(13);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [isFullscreenPreview, setIsFullscreenPreview] = useState<boolean>(false);
  const [interactiveCmd, setInteractiveCmd] = useState<string>('');
  const [showSqlSchema, setShowSqlSchema] = useState<boolean>(false);

  // Knowledge Check State
  const [knowledgeCheck, setKnowledgeCheck] = useState<KnowledgeCheck | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [quizResult, setQuizResult] = useState<KnowledgeCheckResult | null>(null);
  const [quizSubmitting, setQuizSubmitting] = useState(false);
  const [pastAttempts, setPastAttempts] = useState<KnowledgeCheckAttempt[]>([]);

  // Autosave Debounce Ref
  const autosaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 1. Load Course, Lessons & Active Lesson
  useEffect(() => {
    async function loadWorkspace() {
      if (!courseSlug || !lessonSlug) return;
      setLoading(true);
      try {
        const result = await courseService.getCourseBySlug(courseSlug);
        if (result) {
          setCourse(result.course);
          setModules(result.modules);

          const allLessons = result.modules.flatMap(m => m.lessons || []);
          const lesson = allLessons.find(l => l.slug === lessonSlug) || null;
          setCurrentLesson(lesson);

          if (user) {
            // Load user progress map
            const lProgress = await progressService.getAllUserLessonProgress(user.id);
            setAllLessonProgressMap(lProgress);

            if (lesson) {
              setIsCompleted(lProgress[lesson.id]?.status === 'completed');
              // Record lesson view
              await progressService.recordLessonView(lesson.id, result.course.id, user.id);
            }
          } else {
            setIsCompleted(false);
          }

          if (lesson) {
            // Load Draft or Starter Code
            const savedDraft = await draftService.getDraft(lesson.id, user?.id);
            if (savedDraft) {
              setCode(savedDraft.code);
              setRevision(savedDraft.revision);
              setSaveStatus('saved');
            } else {
              setCode(lesson.starter_code || '');
              setRevision(1);
              setSaveStatus('idle');
            }

            // Load Knowledge Check
            const check = await knowledgeCheckService.getKnowledgeCheckForLesson(lesson.id);
            setKnowledgeCheck(check);

            if (check && user) {
              const attempts = await knowledgeCheckService.getAttempts(check.id, user.id);
              setPastAttempts(attempts);
            }

            // Configure default output tab based on execution mode
            if (lesson.execution_mode === 'sql' || lesson.execution_mode === 'postgresql' || lesson.execution_mode === 'mysql') {
              setEditorOutputTab('table');
            } else if (lesson.execution_mode === 'javascript' || lesson.execution_mode === 'typescript' || lesson.execution_mode === 'guided') {
              setEditorOutputTab('console');
            } else {
              setEditorOutputTab('preview');
            }
          }
        }
      } catch (err) {
        console.error('Failed to load lesson workspace:', err);
      } finally {
        setLoading(false);
      }
    }

    loadWorkspace();
  }, [courseSlug, lessonSlug, user]);

  // 2. Debounced Autosave on Code Changes
  const handleCodeChange = (newCode: string | undefined) => {
    const val = newCode ?? '';
    setCode(val);
    setSaveStatus('saving');

    if (autosaveTimerRef.current) {
      clearTimeout(autosaveTimerRef.current);
    }

    autosaveTimerRef.current = setTimeout(async () => {
      if (!currentLesson || !course) return;
      const nextRev = revision + 1;
      const result: SaveDraftResult = await draftService.saveDraft(
        currentLesson.id,
        val,
        nextRev,
        course.id,
        user?.id
      );

      if (result.status === 'saved') {
        setRevision(nextRev);
        setSaveStatus('saved');
      } else if (result.status === 'stale_rejected') {
        setSaveStatus('stale_rejected');
        setRevision(result.revision);
      } else {
        setSaveStatus('error');
      }
    }, 1200);
  };

  // 3. Reset Code to Starter Code Template
  const handleResetStarterCode = () => {
    if (!currentLesson) return;
    setCode(currentLesson.starter_code || '');
    const nextRev = revision + 1;
    setRevision(nextRev);
    if (course) {
      draftService.saveDraft(currentLesson.id, currentLesson.starter_code || '', nextRev, course.id, user?.id);
    }
    setSaveStatus('saved');
    setShowResetConfirm(false);
  };

  // 4. Run Execution
  const handleRunCode = async () => {
    if (!currentLesson) return;
    setIsExecuting(true);
    try {
      const res = await executionService.executeCode(
        code,
        currentLesson.execution_mode,
        currentLesson.language || 'javascript'
      );
      setExecutionResult(res);

      if (currentLesson.execution_mode === 'sql' || currentLesson.execution_mode === 'postgresql' || currentLesson.execution_mode === 'mysql') {
        setEditorOutputTab('table');
      } else if (currentLesson.execution_mode === 'html_preview' || currentLesson.execution_mode === 'css_preview' || currentLesson.execution_mode === 'react_preview') {
        setEditorOutputTab('preview');
      } else {
        setEditorOutputTab('console');
      }

      // On mobile, automatically show output tab
      setMobileActiveTab('output');
    } catch (err: any) {
      console.error('Execution error:', err);
    } finally {
      setIsExecuting(false);
    }
  };

  // Keyboard Shortcut: Ctrl+Enter / Cmd+Enter to Run Code
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handleRunCode();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [code, currentLesson]);

  // Listen for iframe console bridge messages
  useEffect(() => {
    const handleWindowMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'stackforge_console') {
        const newLog = {
          type: (event.data.level as any) || 'log',
          content: String(event.data.content),
          timestamp: Date.now()
        };
        setExecutionResult(prev => {
          if (!prev) {
            return {
              status: 'success',
              stdout: newLog.content,
              stderr: '',
              logs: [newLog],
              executionTimeMs: 0
            };
          }
          return {
            ...prev,
            logs: [...prev.logs, newLog]
          };
        });
      }
    };
    window.addEventListener('message', handleWindowMessage);
    return () => window.removeEventListener('message', handleWindowMessage);
  }, []);

  // Format Code Helper
  const handleFormatCode = () => {
    try {
      const lines = code.split('\n');
      let indent = 0;
      const formatted = lines.map(line => {
        const trimmed = line.trim();
        if (trimmed.startsWith('</') || trimmed.startsWith('}') || trimmed.startsWith(']')) {
          indent = Math.max(0, indent - 1);
        }
        const indented = '  '.repeat(indent) + trimmed;
        if (
          (trimmed.endsWith('{') || trimmed.endsWith('(') || trimmed.endsWith('[') ||
            (trimmed.startsWith('<') && !trimmed.startsWith('</') && !trimmed.endsWith('/>') && !trimmed.includes('</'))) &&
          !trimmed.startsWith('<!--')
        ) {
          indent += 1;
        }
        return indented;
      }).join('\n');
      setCode(formatted);
      handleCodeChange(formatted);
    } catch (e) {
      // ignore
    }
  };

  // Copy Code to Clipboard
  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Clear Console Logs
  const handleClearConsole = () => {
    setExecutionResult(prev => prev ? { ...prev, logs: [], stdout: '' } : null);
  };

  // Execute single guided CLI command
  const handleExecuteSingleCommand = async (cmdToRun: string) => {
    if (!cmdToRun.trim() || !currentLesson) return;
    setIsExecuting(true);
    try {
      const res = executionService.executeGuidedCommand(cmdToRun);
      setExecutionResult(prev => {
        if (!prev) return res;
        return {
          ...prev,
          stdout: prev.stdout + '\n' + res.stdout,
          logs: [...prev.logs, ...res.logs]
        };
      });
      setInteractiveCmd('');
      setEditorOutputTab('console');
    } finally {
      setIsExecuting(false);
    }
  };

  // 5. Mark Lesson Complete Action (Single synchronized handler)
  const handleMarkComplete = async () => {
    if (!currentLesson || !course || !user) return;
    try {
      await progressService.markLessonComplete(currentLesson.id, course.id, user.id);
      setIsCompleted(true);
      setAllLessonProgressMap(prev => ({
        ...prev,
        [currentLesson.id]: {
          id: prev[currentLesson.id]?.id || `lp-${Date.now()}`,
          user_id: user.id,
          lesson_id: currentLesson.id,
          course_id: course.id,
          status: 'completed',
          completed_at: new Date().toISOString()
        }
      }));

      // Trigger Celebration Confetti!
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#ff7020', '#ffbb85', '#38bdf8', '#10b981']
      });
    } catch (err) {
      console.error('Error marking lesson complete:', err);
    }
  };

  // 6. Submit Knowledge Check
  const handleSubmitQuiz = async () => {
    if (!knowledgeCheck || !currentLesson || !course || !user) return;
    setQuizSubmitting(true);
    try {
      const answers: KnowledgeCheckSubmissionAnswer[] = Object.entries(selectedAnswers).map(
        ([qId, cId]) => ({ question_id: qId, choice_id: cId })
      );

      const result = await knowledgeCheckService.submitKnowledgeCheck(
        knowledgeCheck.id,
        answers,
        course.id,
        currentLesson.id,
        user.id
      );

      setQuizResult(result);

      if (result.is_passed) {
        confetti({
          particleCount: 50,
          spread: 50,
          origin: { y: 0.6 },
          colors: ['#10b981', '#34d399', '#ffffff']
        });
      }

      const updatedAttempts = await knowledgeCheckService.getAttempts(knowledgeCheck.id, user.id);
      setPastAttempts(updatedAttempts);
    } catch (err) {
      console.error('Error submitting quiz attempt:', err);
    } finally {
      setQuizSubmitting(false);
    }
  };

  // Toggle module accordion
  const toggleModuleCollapse = (moduleId: string) => {
    setCollapsedModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };

  // Navigation: Find Previous & Next Lessons
  const allLessons = modules.flatMap(m => m.lessons || []);
  const currentIndex = allLessons.findIndex(l => l.id === currentLesson?.id);
  const previousLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex >= 0 && currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  // Active module title
  const activeModule = modules.find(m => m.id === currentLesson?.module_id);

  if (loading) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center">
        <LoadingSpinner size="lg" label="Preparing interactive lesson workspace..." />
      </div>
    );
  }

  if (!course || !currentLesson) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Lesson not found</h2>
        <p className="text-xs text-slate-400">The requested lesson slug could not be located in this curriculum.</p>
        <Link to="/learn" className="inline-block px-5 py-2.5 rounded-xl bg-forge-600 text-white font-semibold text-sm">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-dark-bg text-slate-100 overflow-hidden">

      {/* 10.1 Top Workspace Sub-Header Context Bar */}
      <div className="h-12 border-b border-dark-border bg-dark-surface/90 px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title={sidebarOpen ? "Hide curriculum sidebar" : "Show curriculum sidebar"}
          >
            {sidebarOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeftOpen className="w-4 h-4" />}
          </button>

          <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
            <Link to="/learn" className="hover:text-forge-400 transition-colors hidden sm:inline">
              Learn
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600 hidden sm:inline" />
            <Link to={`/courses/${course.slug}`} className="hover:text-forge-400 transition-colors">
              {course.title}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-slate-200 font-semibold truncate max-w-[150px] sm:max-w-xs md:max-w-md">
              {currentLesson.title}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Desktop Layout Mode Switches */}
          {currentLesson.editor_enabled && (
            <div className="hidden lg:flex items-center gap-1 bg-dark-bg p-0.5 rounded-lg border border-dark-border">
              <button
                onClick={() => setLayoutMode('split')}
                className={`p-1.5 rounded-md text-xs font-medium flex items-center gap-1 transition-colors ${layoutMode === 'split' ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
                  }`}
                title="Side-by-Side Split View"
              >
                <Columns className="w-3.5 h-3.5" />
                <span>Split</span>
              </button>
              <button
                onClick={() => setLayoutMode('reading')}
                className={`p-1.5 rounded-md text-xs font-medium flex items-center gap-1 transition-colors ${layoutMode === 'reading' ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
                  }`}
                title="Reading Focus View"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Read</span>
              </button>
              <button
                onClick={() => setLayoutMode('editor')}
                className={`p-1.5 rounded-md text-xs font-medium flex items-center gap-1 transition-colors ${layoutMode === 'editor' ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
                  }`}
                title="Code Editor Focus View"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Code</span>
              </button>
            </div>
          )}

          {/* Save Status Indicator */}
          <div className="flex items-center gap-1.5 text-xs">
            {saveStatus === 'saving' && (
              <span className="text-amber-400 flex items-center gap-1 font-mono">
                <LoadingSpinner size="sm" />
                <span className="hidden sm:inline">Autosaving...</span>
              </span>
            )}
            {saveStatus === 'saved' && (
              <span className="text-emerald-400 flex items-center gap-1 font-mono text-[11px]">
                <Check className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Saved</span>
              </span>
            )}
            {saveStatus === 'stale_rejected' && (
              <span className="text-rose-400 flex items-center gap-1 font-mono text-[11px]">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Stale update rejected</span>
              </span>
            )}
          </div>

          {/* Mark Complete Checkmark / Action */}
          {isCompleted ? (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-xs font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Completed</span>
            </div>
          ) : (
            <button
              onClick={handleMarkComplete}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Mark Complete</span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Responsive Navigation Switcher */}
      <div className="lg:hidden border-b border-dark-border bg-dark-card flex">
        <button
          onClick={() => setMobileActiveTab('content')}
          className={`flex-1 py-2.5 text-xs font-semibold text-center border-b-2 transition-colors ${mobileActiveTab === 'content'
            ? 'border-forge-500 text-forge-400 bg-slate-800/40'
            : 'border-transparent text-slate-400'
            }`}
        >
          Lesson
        </button>
        {currentLesson.editor_enabled && (
          <>
            <button
              onClick={() => setMobileActiveTab('editor')}
              className={`flex-1 py-2.5 text-xs font-semibold text-center border-b-2 transition-colors ${mobileActiveTab === 'editor'
                ? 'border-forge-500 text-forge-400 bg-slate-800/40'
                : 'border-transparent text-slate-400'
                }`}
            >
              Code Editor
            </button>
            <button
              onClick={() => setMobileActiveTab('output')}
              className={`flex-1 py-2.5 text-xs font-semibold text-center border-b-2 transition-colors ${mobileActiveTab === 'output'
                ? 'border-forge-500 text-forge-400 bg-slate-800/40'
                : 'border-transparent text-slate-400'
                }`}
            >
              Output
            </button>
          </>
        )}
      </div>

      {/* Main Workspace Layout */}
      <div className="flex-1 flex overflow-hidden">

        {/* Left Curriculum Sidebar (Collapsible & Scrollable) */}
        {sidebarOpen && (
          <aside className="w-72 border-r border-dark-border bg-dark-surface/80 flex flex-col shrink-0 overflow-y-auto">
            <div className="p-4 border-b border-dark-border flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Course Curriculum
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                {allLessons.filter(l => allLessonProgressMap[l.id]?.status === 'completed').length}/{allLessons.length} Done
              </span>
            </div>

            <div className="p-2 space-y-3">
              {modules.map((m) => {
                const isCollapsed = collapsedModules[m.id];
                return (
                  <div key={m.id} className="space-y-1">
                    <button
                      onClick={() => toggleModuleCollapse(m.id)}
                      className="w-full flex items-center justify-between px-2.5 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider hover:text-slate-200 transition-colors"
                    >
                      <span className="truncate">{m.title}</span>
                      {isCollapsed ? (
                        <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                      )}
                    </button>

                    {!isCollapsed && (
                      <div className="space-y-0.5">
                        {m.lessons?.map((les) => {
                          const isCurrent = les.id === currentLesson.id;
                          const isLesCompleted = allLessonProgressMap[les.id]?.status === 'completed' || (isCompleted && isCurrent);

                          return (
                            <Link
                              key={les.id}
                              to={`/learn/${course.slug}/${les.slug}`}
                              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition-colors ${isCurrent
                                ? 'bg-forge-600/20 text-forge-300 font-semibold border border-forge-500/40 shadow-sm'
                                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                                }`}
                            >
                              <div className="shrink-0">
                                {isLesCompleted ? (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                ) : (
                                  <div className={`w-2 h-2 rounded-full ${isCurrent ? 'bg-forge-500 ring-2 ring-forge-500/30' : 'bg-slate-600'}`} />
                                )}
                              </div>
                              <span className="truncate">{les.title}</span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </aside>
        )}

        {/* Central & Right Split Area */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">

          {/* Central Lesson Content Area */}
          <div className={`flex-1 border-r border-dark-border flex flex-col bg-dark-bg overflow-y-auto ${layoutMode === 'editor' ? 'hidden' : 'flex'
            } ${mobileActiveTab !== 'content' ? 'hidden lg:flex' : 'flex'}`}>

            {/* Tab Selector: Material vs Knowledge Check */}
            <div className="flex items-center gap-3 px-6 pt-3 border-b border-dark-border bg-dark-surface/40 shrink-0">
              <button
                onClick={() => setActiveTab('content')}
                className={`pb-3 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all ${activeTab === 'content'
                  ? 'border-forge-500 text-forge-400 font-bold'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Lesson Material</span>
              </button>

              {knowledgeCheck && (
                <button
                  onClick={() => setActiveTab('quiz')}
                  className={`pb-3 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all ${activeTab === 'quiz'
                    ? 'border-forge-500 text-forge-400 font-bold'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                    }`}
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>Knowledge Check</span>
                  {quizResult?.is_passed && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  )}
                </button>
              )}
            </div>

            {/* Tab 1: Structured W3Schools-Style Lesson Content */}
            {activeTab === 'content' && (
              <div className="p-6 sm:p-8 flex-1">
                <StructuredLessonView
                  lesson={currentLesson}
                  course={course}
                  moduleTitle={activeModule?.title}
                  onTryItInEditor={(starterCode) => {
                    if (starterCode) setCode(starterCode);
                    setLayoutMode('split');
                    setMobileActiveTab('editor');
                  }}
                  onOpenQuiz={knowledgeCheck ? () => setActiveTab('quiz') : undefined}
                  onMarkComplete={handleMarkComplete}
                  isCompleted={isCompleted}
                />
              </div>
            )}

            {/* Tab 2: Knowledge Check Quiz Section */}
            {activeTab === 'quiz' && knowledgeCheck && (
              <div className="p-6 sm:p-8 space-y-6 max-w-3xl flex-1">
                <div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">
                    {knowledgeCheck.title}
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Passing Score: {knowledgeCheck.passing_score_percent}% • Graded securely on server
                    {pastAttempts.length > 0 && ` • Previous attempts: ${pastAttempts.length}`}
                  </p>
                </div>

                {/* Graded Result Banner */}
                {quizResult && (
                  <div className={`p-4 rounded-xl border ${quizResult.is_passed
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                    : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                    }`}>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm">
                        {quizResult.is_passed ? '🎉 Knowledge Check Passed!' : 'Needs Review'}
                      </span>
                      <span className="text-sm font-extrabold">
                        {quizResult.score}/{quizResult.total_questions} ({quizResult.percentage}%)
                      </span>
                    </div>
                    <p className="text-xs mt-1 text-slate-300">
                      {quizResult.is_passed
                        ? 'Excellent job! You demonstrated mastery of this lesson material.'
                        : 'Review the explanations below and feel free to try again.'}
                    </p>
                  </div>
                )}

                {/* Questions List */}
                <div className="space-y-6">
                  {knowledgeCheck.questions?.map((q, qIdx) => {
                    const resultItem = quizResult?.breakdown.find(b => b.question_id === q.id);

                    return (
                      <div key={q.id} className="p-5 rounded-xl bg-dark-card border border-dark-border space-y-4">
                        <div className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded-lg bg-slate-800 text-forge-400 text-xs font-bold flex items-center justify-center shrink-0">
                            {qIdx + 1}
                          </span>
                          <h4 className="text-sm font-semibold text-white leading-relaxed">
                            {q.prompt}
                          </h4>
                        </div>

                        {/* Choices */}
                        <div className="space-y-2 pt-1 pl-9">
                          {q.choices.map(choice => {
                            const isSelected = selectedAnswers[q.id] === choice.id;
                            const isAnswerCorrect = resultItem && resultItem.correct_choice_id === choice.id;
                            const isUserWrongChoice = resultItem && isSelected && !resultItem.is_correct;

                            let choiceClasses = 'border-dark-border bg-dark-bg text-slate-300 hover:border-slate-600';
                            if (isSelected) choiceClasses = 'border-forge-500 bg-forge-500/10 text-white font-medium';
                            if (resultItem) {
                              if (isAnswerCorrect) {
                                choiceClasses = 'border-emerald-500 bg-emerald-500/15 text-emerald-300 font-semibold';
                              } else if (isUserWrongChoice) {
                                choiceClasses = 'border-rose-500 bg-rose-500/15 text-rose-300 font-semibold';
                              }
                            }

                            return (
                              <button
                                key={choice.id}
                                disabled={Boolean(quizResult)}
                                onClick={() => setSelectedAnswers({ ...selectedAnswers, [q.id]: choice.id })}
                                className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between ${choiceClasses}`}
                              >
                                <span>{choice.label}</span>
                                {resultItem && isAnswerCorrect && (
                                  <Check className="w-4 h-4 text-emerald-400" />
                                )}
                              </button>
                            );
                          })}
                        </div>

                        {/* Explanation after grading */}
                        {resultItem && (
                          <div className="mt-3 p-3 rounded-lg bg-slate-800/60 border border-slate-700/60 text-xs text-slate-300 space-y-1">
                            <span className="font-semibold text-forge-400">Explanation:</span>
                            <p>{resultItem.explanation}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Submit / Retry Actions */}
                <div className="pt-2">
                  {!quizResult ? (
                    <button
                      onClick={handleSubmitQuiz}
                      disabled={quizSubmitting || Object.keys(selectedAnswers).length === 0}
                      className="px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-forge-600 to-forge-500 hover:from-forge-500 hover:to-forge-400 shadow-lg shadow-forge-500/20 text-xs transition-all disabled:opacity-50"
                    >
                      {quizSubmitting ? 'Evaluating Answers...' : 'Submit Knowledge Check'}
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setQuizResult(null);
                        setSelectedAnswers({});
                      }}
                      className="px-5 py-2.5 rounded-xl font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 border border-dark-border text-xs transition-colors"
                    >
                      Attempt Quiz Again
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right-Side Code Workspace & Output Panel */}
          {currentLesson.editor_enabled && (
            <div className={`flex-1 flex flex-col bg-dark-surface/40 ${layoutMode === 'reading' ? 'hidden' : 'flex'
              } ${mobileActiveTab === 'content' ? 'hidden lg:flex' : 'flex'}`}>
              {/* Editor Action Header */}
              <div className="h-10 border-b border-dark-border bg-dark-surface px-4 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-semibold text-slate-300 uppercase">
                    {currentLesson.language || 'code'} editor
                  </span>
                  <span className="text-slate-600">•</span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    Mode: {currentLesson.execution_mode}
                  </span>

                  {/* Schema viewer toggle for SQL */}
                  {(currentLesson.execution_mode === 'sql' || currentLesson.execution_mode === 'postgresql' || currentLesson.execution_mode === 'mysql') && (
                    <button
                      onClick={() => setShowSqlSchema(!showSqlSchema)}
                      className={`ml-2 px-2 py-0.5 rounded text-[11px] font-mono flex items-center gap-1 border transition-colors ${showSqlSchema ? 'bg-forge-500/20 text-forge-300 border-forge-500/40' : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                        }`}
                      title="View database tables schema"
                    >
                      <Database className="w-3 h-3 text-forge-400" />
                      <span className="hidden sm:inline">Tables Schema</span>
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2">
                  {/* Font Size Controls */}
                  <div className="flex items-center bg-slate-800/80 rounded border border-slate-700/80 px-1 py-0.5 text-[11px] text-slate-400">
                    <button
                      onClick={() => setEditorFontSize(f => Math.max(11, f - 1))}
                      className="px-1 hover:text-white"
                      title="Decrease font size"
                    >
                      A-
                    </button>
                    <span className="text-[10px] text-slate-500 px-0.5">{editorFontSize}px</span>
                    <button
                      onClick={() => setEditorFontSize(f => Math.min(20, f + 1))}
                      className="px-1 hover:text-white"
                      title="Increase font size"
                    >
                      A+
                    </button>
                  </div>

                  {/* Format Code */}
                  <button
                    onClick={handleFormatCode}
                    className="p-1 px-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 text-xs flex items-center gap-1 transition-colors"
                    title="Format / Beautify Code"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span className="hidden md:inline">Format</span>
                  </button>

                  {/* Copy Code */}
                  <button
                    onClick={handleCopyCode}
                    className="p-1 px-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 text-xs flex items-center gap-1 transition-colors"
                    title="Copy code to clipboard"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span className="hidden md:inline">{copiedCode ? 'Copied' : 'Copy'}</span>
                  </button>

                  {/* Reset Code */}
                  <button
                    onClick={() => setShowResetConfirm(true)}
                    className="p-1 px-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 text-xs flex items-center gap-1 transition-colors"
                    title="Reset to starter code"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span className="hidden md:inline">Reset</span>
                  </button>

                  {/* Run Code Button with Keyboard Hint */}
                  <button
                    onClick={handleRunCode}
                    disabled={isExecuting}
                    className="flex items-center gap-1.5 px-3.5 py-1 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-forge-600 to-forge-500 hover:from-forge-500 hover:to-forge-400 shadow-md shadow-forge-500/25 transition-all disabled:opacity-50"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>{isExecuting ? 'Running...' : 'Run Code'}</span>
                    <span className="hidden lg:inline text-[10px] opacity-75 font-mono ml-0.5">(Ctrl+↵)</span>
                  </button>
                </div>
              </div>

              {/* SQL Schema Reference Card */}
              {showSqlSchema && (
                <div className="bg-slate-900 border-b border-dark-border p-3 text-xs font-mono grid grid-cols-1 sm:grid-cols-3 gap-2 shrink-0">
                  <div className="p-2 rounded bg-slate-800/80 border border-slate-700/60">
                    <span className="text-forge-400 font-bold block mb-1">students</span>
                    <span className="text-slate-400 text-[11px] block">id (PK), name, role, experience_years, status</span>
                  </div>
                  <div className="p-2 rounded bg-slate-800/80 border border-slate-700/60">
                    <span className="text-forge-400 font-bold block mb-1">courses</span>
                    <span className="text-slate-400 text-[11px] block">id (PK), title, category, difficulty</span>
                  </div>
                  <div className="p-2 rounded bg-slate-800/80 border border-slate-700/60">
                    <span className="text-forge-400 font-bold block mb-1">enrollments</span>
                    <span className="text-slate-400 text-[11px] block">student_id (FK), course_id (FK), grade</span>
                  </div>
                </div>
              )}

              {/* Monaco Code Editor */}
              <div className="h-1/2 border-b border-dark-border">
                <Editor
                  height="100%"
                  language={currentLesson.language === 'shell' ? 'shell' : currentLesson.language || 'javascript'}
                  theme="vs-dark"
                  value={code}
                  onChange={handleCodeChange}
                  options={{
                    fontSize: editorFontSize,
                    fontFamily: 'JetBrains Mono, monospace',
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    lineNumbers: 'on',
                    wordWrap: 'on',
                    tabSize: 2
                  }}
                />
              </div>

              {/* Output / Preview / Console Tab Bar */}
              <div className="h-9 border-b border-dark-border bg-dark-card px-4 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  {(currentLesson.execution_mode === 'html_preview' || currentLesson.execution_mode === 'css_preview' || currentLesson.execution_mode === 'react_preview') && (
                    <button
                      onClick={() => setEditorOutputTab('preview')}
                      className={`text-xs font-semibold flex items-center gap-1.5 transition-colors ${editorOutputTab === 'preview' ? 'text-forge-400 font-bold' : 'text-slate-400 hover:text-white'
                        }`}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Live Preview</span>
                    </button>
                  )}

                  <button
                    onClick={() => setEditorOutputTab('console')}
                    className={`text-xs font-semibold flex items-center gap-1.5 transition-colors ${editorOutputTab === 'console' ? 'text-forge-400 font-bold' : 'text-slate-400 hover:text-white'
                      }`}
                  >
                    <Terminal className="w-3.5 h-3.5" />
                    <span>Console Log</span>
                  </button>

                  {(currentLesson.execution_mode === 'sql' || currentLesson.execution_mode === 'postgresql' || currentLesson.execution_mode === 'mysql') && (
                    <button
                      onClick={() => setEditorOutputTab('table')}
                      className={`text-xs font-semibold flex items-center gap-1.5 transition-colors ${editorOutputTab === 'table' ? 'text-forge-400 font-bold' : 'text-slate-400 hover:text-white'
                        }`}
                    >
                      <Table className="w-3.5 h-3.5" />
                      <span>Query Results</span>
                    </button>
                  )}

                  {/* Execution time indicator */}
                  {executionResult && typeof executionResult.executionTimeMs === 'number' && (
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      ⚡ {executionResult.executionTimeMs}ms
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {/* Console Clear Button */}
                  {editorOutputTab === 'console' && executionResult?.logs && executionResult.logs.length > 0 && (
                    <button
                      onClick={handleClearConsole}
                      className="p-1 px-2 rounded text-[11px] text-slate-400 hover:text-white hover:bg-slate-800 flex items-center gap-1 transition-colors"
                      title="Clear console output"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Clear</span>
                    </button>
                  )}

                  {/* Preview controls: Viewport and Fullscreen */}
                  {editorOutputTab === 'preview' && (
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 bg-dark-bg p-0.5 rounded border border-dark-border">
                        <button
                          onClick={() => setPreviewViewport('desktop')}
                          className={`p-1 rounded ${previewViewport === 'desktop' ? 'bg-slate-700 text-white' : 'text-slate-500'}`}
                          title="Desktop preview"
                        >
                          <Monitor className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => setPreviewViewport('mobile')}
                          className={`p-1 rounded ${previewViewport === 'mobile' ? 'bg-slate-700 text-white' : 'text-slate-500'}`}
                          title="Mobile preview"
                        >
                          <Smartphone className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => setIsFullscreenPreview(true)}
                        className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
                        title="Fullscreen preview"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Output Content Area */}
              <div className="flex-1 bg-dark-bg overflow-auto p-3">

                {/* 1. Live Preview Panel (Isolated Sandboxed Iframe) */}
                {editorOutputTab === 'preview' && (
                  <div className={`h-full mx-auto transition-all ${previewViewport === 'mobile' ? 'max-w-xs border border-dark-border rounded-xl shadow-lg' : 'w-full'}`}>
                    <iframe
                      title="Sandboxed Output Preview"
                      sandbox="allow-scripts"
                      className="w-full h-full bg-white rounded-lg border-0"
                      srcDoc={executionResult?.previewHtml || executionService.formatHtmlPreview(code, currentLesson.execution_mode)}
                    />
                  </div>
                )}

                {/* 2. Console Logs Panel */}
                {editorOutputTab === 'console' && (
                  <div className="font-mono text-xs flex flex-col h-full overflow-hidden">
                    <div className="flex-1 overflow-y-auto space-y-1.5 p-1">
                      {executionResult?.logs && executionResult.logs.length > 0 ? (
                        executionResult.logs.map((log, idx) => (
                          <div
                            key={idx}
                            className={`p-2 rounded ${log.type === 'error'
                              ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                              : log.type === 'warn'
                                ? 'bg-amber-500/10 text-amber-300'
                                : 'bg-dark-card text-slate-200'
                              }`}
                          >
                            <span className="text-slate-500 mr-2">[{log.type.toUpperCase()}]</span>
                            <span>{log.content}</span>
                          </div>
                        ))
                      ) : (
                        <div className="text-slate-500 italic p-4 text-center">
                          Click "Run Code" or use the interactive terminal prompt below to execute.
                        </div>
                      )}
                    </div>

                    {/* Interactive Guided Shell Prompt for Git & npm */}
                    {currentLesson.execution_mode === 'guided' && (
                      <div className="mt-2 pt-2 border-t border-dark-border bg-slate-950/70 p-2.5 rounded-lg shrink-0">
                        <div className="text-[11px] text-slate-400 mb-1.5 flex items-center justify-between">
                          <span className="font-semibold text-slate-300">Terminal Shell:</span>
                          <span className="text-slate-500">Quick suggestions:</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {(currentLesson.language === 'git' || currentLesson.slug.includes('git') ? [
                            'git status',
                            'git add .',
                            'git commit -m "feat: init"',
                            'git branch',
                            'git log --oneline'
                          ] : [
                            'npm init -y',
                            'npm install express',
                            'npm run start'
                          ]).map(cmd => (
                            <button
                              key={cmd}
                              onClick={() => handleExecuteSingleCommand(cmd)}
                              className="px-2 py-0.5 rounded bg-slate-800 hover:bg-forge-500/20 hover:text-forge-300 text-slate-300 border border-slate-700 text-[10px] transition-colors"
                            >
                              $ {cmd}
                            </button>
                          ))}
                        </div>
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            handleExecuteSingleCommand(interactiveCmd);
                          }}
                          className="flex items-center gap-1.5"
                        >
                          <span className="text-forge-400 font-bold text-xs">$</span>
                          <input
                            type="text"
                            value={interactiveCmd}
                            onChange={(e) => setInteractiveCmd(e.target.value)}
                            placeholder="Type command (e.g. git status) and hit Enter..."
                            className="flex-1 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-200 text-xs focus:outline-none focus:border-forge-500"
                          />
                          <button
                            type="submit"
                            disabled={!interactiveCmd.trim()}
                            className="px-2.5 py-1 bg-forge-600 hover:bg-forge-500 text-white rounded text-xs font-semibold disabled:opacity-40"
                          >
                            Send
                          </button>
                        </form>
                      </div>
                    )}
                  </div>
                )}

                {/* 3. SQL Relational Results Table */}
                {editorOutputTab === 'table' && (
                  <div className="h-full overflow-auto">
                    {executionResult?.sqlResult && executionResult.sqlResult.columns.length > 0 ? (
                      <div className="border border-dark-border rounded-xl overflow-hidden">
                        <table className="w-full text-left text-xs font-mono">
                          <thead className="bg-dark-card border-b border-dark-border text-forge-400">
                            <tr>
                              {executionResult.sqlResult.columns.map((col, idx) => (
                                <th key={idx} className="px-3 py-2 font-bold">{col}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-dark-border">
                            {executionResult.sqlResult.values.map((row, rIdx) => (
                              <tr key={rIdx} className="hover:bg-slate-800/40">
                                {row.map((cell, cIdx) => (
                                  <td key={cIdx} className="px-3 py-2 text-slate-300">
                                    {cell === null ? <span className="text-slate-600 italic">NULL</span> : String(cell)}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-slate-500 italic p-4 text-center">
                        {executionResult?.error ? (
                          <span className="text-rose-400 font-mono">{executionResult.error}</span>
                        ) : (
                          'Execute a SELECT statement to visualize relational tables.'
                        )}
                      </div>
                    )}
                  </div>
                )}

              </div>

            </div>
          )}

        </div>
      </div>

      {/* 10.1 Bottom Lesson Action Bar (Synchronized with top) */}
      <div className="h-14 border-t border-dark-border bg-dark-card px-4 sm:px-6 flex items-center justify-between shrink-0">
        <div>
          {previousLesson ? (
            <Link
              to={`/learn/${course.slug}/${previousLesson.slug}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous Lesson</span>
            </Link>
          ) : (
            <div />
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleMarkComplete}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${isCompleted
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              : 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-md'
              }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isCompleted ? 'Marked Complete' : 'Mark as Complete'}</span>
          </button>

          {nextLesson && (
            <Link
              to={`/learn/${course.slug}/${nextLesson.slug}`}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-forge-600 to-forge-500 hover:from-forge-500 hover:to-forge-400 shadow-md shadow-forge-500/20 transition-all"
            >
              <span>Next Lesson</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="max-w-sm w-full bg-dark-card border border-dark-border p-6 rounded-2xl shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white">Reset Starter Code?</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              This will reset the editor to the lesson's original starter template. Any unsaved edits will be replaced.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleResetStarterCode}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-500"
              >
                Reset Code
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Fullscreen Preview Modal */}
      {isFullscreenPreview && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md p-4 sm:p-6 flex flex-col">
          <div className="h-12 border-b border-slate-800 bg-slate-900 px-4 rounded-t-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-bold text-white text-sm">Live Preview (Fullscreen)</span>
              <div className="flex items-center gap-1 bg-slate-800 p-0.5 rounded border border-slate-700">
                <button
                  onClick={() => setPreviewViewport('desktop')}
                  className={`p-1 px-2 rounded text-xs flex items-center gap-1 ${previewViewport === 'desktop' ? 'bg-forge-600 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>Desktop</span>
                </button>
                <button
                  onClick={() => setPreviewViewport('mobile')}
                  className={`p-1 px-2 rounded text-xs flex items-center gap-1 ${previewViewport === 'mobile' ? 'bg-forge-600 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Mobile</span>
                </button>
              </div>
            </div>
            <button
              onClick={() => setIsFullscreenPreview(false)}
              className="p-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs flex items-center gap-1.5 transition-colors"
            >
              <Minimize2 className="w-4 h-4" />
              <span>Close Fullscreen</span>
            </button>
          </div>
          <div className="flex-1 bg-slate-950 rounded-b-xl overflow-hidden p-2 flex items-center justify-center">
            <div className={`h-full transition-all ${previewViewport === 'mobile' ? 'w-[375px] shadow-2xl border border-slate-700 rounded-2xl overflow-hidden' : 'w-full'}`}>
              <iframe
                title="Fullscreen Preview"
                sandbox="allow-scripts"
                className="w-full h-full bg-white rounded-lg border-0"
                srcDoc={executionResult?.previewHtml || executionService.formatHtmlPreview(code, currentLesson.execution_mode)}
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
