import React from 'react';
import { 
  CheckCircle2, 
  Lightbulb, 
  AlertTriangle, 
  Play, 
  Code2, 
  Check, 
  Copy,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import type { Lesson, Course } from '../types/database';
import { Badge } from './Badge';

interface StructuredLessonViewProps {
  lesson: Lesson;
  course: Course;
  moduleTitle?: string;
  onTryItInEditor?: (codeToLoad?: string) => void;
  onOpenQuiz?: () => void;
  onMarkComplete?: () => void;
  isCompleted?: boolean;
}

export const StructuredLessonView: React.FC<StructuredLessonViewProps> = ({
  lesson,
  course,
  moduleTitle,
  onTryItInEditor,
  onOpenQuiz,
  onMarkComplete,
  isCompleted
}) => {
  const [copiedIndex, setCopiedIndex] = React.useState<number | null>(null);

  const handleCopyCode = (codeText: string, index: number) => {
    navigator.clipboard.writeText(codeText);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  /**
   * Helper to render markdown text cleanly without raw symbols leaking into the UI
   */
  const renderFormattedText = (text: string) => {
    // Split by lines or paragraphs
    const paragraphs = text.split('\n\n');

    return paragraphs.map((para, pIdx) => {
      const trimmed = para.trim();
      if (!trimmed) return null;

      // H2 Heading
      if (trimmed.startsWith('## ')) {
        const title = trimmed.replace('## ', '');
        return (
          <h2 key={pIdx} className="text-xl font-bold text-white pt-4 pb-1 border-b border-dark-border/60 flex items-center gap-2">
            <span className="w-1.5 h-5 rounded-full bg-forge-500 inline-block" />
            <span>{title}</span>
          </h2>
        );
      }

      // H3 Heading
      if (trimmed.startsWith('### ')) {
        const title = trimmed.replace('### ', '');
        return (
          <h3 key={pIdx} className="text-base font-bold text-slate-100 pt-3 pb-0.5">
            {title}
          </h3>
        );
      }

      // H1 Heading
      if (trimmed.startsWith('# ')) {
        const title = trimmed.replace('# ', '');
        return (
          <h2 key={pIdx} className="text-2xl font-extrabold text-white pt-2 pb-1">
            {title}
          </h2>
        );
      }

      // Block Code Snippet
      if (trimmed.startsWith('```')) {
        const lines = trimmed.split('\n');
        const lang = lines[0].replace('```', '').trim() || lesson.language || 'code';
        const codeBody = lines.slice(1, -1).join('\n');

        return (
          <div key={pIdx} className="my-4 rounded-xl border border-dark-border overflow-hidden bg-dark-surface shadow-md">
            <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-dark-border text-xs">
              <span className="font-mono text-slate-400 font-semibold uppercase">{lang}</span>
              <button
                onClick={() => handleCopyCode(codeBody, pIdx)}
                className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
                title="Copy code"
              >
                {copiedIndex === pIdx ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-medium">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-4 font-mono text-xs overflow-x-auto text-forge-300 leading-relaxed bg-[#0b0f19]">
              <code>{codeBody}</code>
            </pre>
          </div>
        );
      }

      // Bullet List
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        const items = trimmed.split('\n').filter(l => l.trim().startsWith('- ') || l.trim().startsWith('* '));
        return (
          <ul key={pIdx} className="space-y-2 my-3 pl-1">
            {items.map((item, iIdx) => {
              const cleanItem = item.replace(/^[-*]\s+/, '');
              return (
                <li key={iIdx} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-forge-400 shrink-0 mt-1.5" />
                  <span>{parseInlineFormatting(cleanItem)}</span>
                </li>
              );
            })}
          </ul>
        );
      }

      // Numbered List
      if (/^\d+\.\s/.test(trimmed)) {
        const items = trimmed.split('\n').filter(l => /^\d+\.\s/.test(l.trim()));
        return (
          <ol key={pIdx} className="space-y-2 my-3 pl-1">
            {items.map((item, iIdx) => {
              const cleanItem = item.replace(/^\d+\.\s+/, '');
              return (
                <li key={iIdx} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                  <span className="font-mono font-bold text-forge-400 text-xs shrink-0">{iIdx + 1}.</span>
                  <span>{parseInlineFormatting(cleanItem)}</span>
                </li>
              );
            })}
          </ol>
        );
      }

      // Normal paragraph
      return (
        <p key={pIdx} className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {parseInlineFormatting(trimmed)}
        </p>
      );
    });
  };

  /**
   * Parses bold (`**text**`), inline code (`` `code` ``), and links
   */
  const parseInlineFormatting = (text: string) => {
    // Regex splits by bold and inline code tokens
    const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);

    return parts.map((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={idx} className="font-bold text-white">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code key={idx} className="px-1.5 py-0.5 rounded-md bg-slate-800 text-forge-300 font-mono text-[11px] border border-slate-700">
            {part.slice(1, -1)}
          </code>
        );
      }
      return part;
    });
  };

  return (
    <div className="space-y-8 max-w-3xl pb-16">
      
      {/* 1. Header & Context */}
      <div className="space-y-3 border-b border-dark-border pb-6">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <Badge category={course.category}>{course.technology}</Badge>
          {moduleTitle && (
            <>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400 font-medium">{moduleTitle}</span>
            </>
          )}
          <span className="text-slate-600">•</span>
          <span className="text-slate-400">{lesson.estimated_minutes || 20} min read & practice</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          {lesson.title}
        </h1>
      </div>

      {/* 2. WHAT YOU WILL LEARN Section */}
      {lesson.objectives && lesson.objectives.length > 0 && (
        <div className="rounded-2xl bg-gradient-to-br from-forge-500/10 via-dark-card to-dark-surface border border-forge-500/30 p-5 space-y-3 shadow-lg">
          <div className="flex items-center gap-2 text-forge-400 font-bold text-xs uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>What You Will Learn</span>
          </div>
          <ul className="grid grid-cols-1 gap-2.5 pt-1">
            {lesson.objectives.map((obj, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-forge-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed font-medium">{obj}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 3. Main Lesson Content (Explanation, Rules & Examples) */}
      <div className="space-y-6">
        {renderFormattedText(lesson.content_md)}
      </div>

      {/* 4. TRY IT YOURSELF Interactive Showcase Box */}
      {lesson.editor_enabled && lesson.starter_code && (
        <div className="rounded-2xl border border-forge-500/40 bg-gradient-to-br from-dark-card to-slate-900 p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-forge-400" />
              <span className="text-xs uppercase font-bold tracking-wider text-forge-400">
                Interactive Practice Example
              </span>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">
              Mode: {lesson.execution_mode}
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Test the concept right away! You can edit this example in the code workspace and run it with instant output.
          </p>

          {/* Starter Code Preview */}
          <div className="rounded-xl border border-dark-border overflow-hidden bg-[#090d16]">
            <pre className="p-4 font-mono text-xs text-forge-300 overflow-x-auto max-h-56 leading-relaxed">
              <code>{lesson.starter_code}</code>
            </pre>
          </div>

          {/* Action Trigger */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <button
              onClick={() => onTryItInEditor?.(lesson.starter_code || undefined)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-forge-600 hover:bg-forge-500 shadow-md shadow-forge-500/20 transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Try It in the Editor →</span>
            </button>

            {lesson.expected_output && (
              <div className="text-[11px] text-slate-400">
                <span className="font-semibold text-slate-300">Expected Result: </span>
                <span>{lesson.expected_output}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 5. COMMON BEGINNER MISTAKES Box */}
      {lesson.common_mistakes_md && (
        <div className="rounded-2xl bg-amber-500/10 border border-amber-500/30 p-5 space-y-2.5">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4" />
            <span>Common Beginner Pitfalls & Solutions</span>
          </div>
          <div className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">
            {lesson.common_mistakes_md}
          </div>
        </div>
      )}

      {/* 6. KEY TAKEAWAYS Summary */}
      {lesson.key_points_md && (
        <div className="rounded-2xl bg-sky-500/10 border border-sky-500/30 p-5 space-y-2.5">
          <div className="flex items-center gap-2 text-sky-400 text-xs font-bold uppercase tracking-wider">
            <Lightbulb className="w-4 h-4" />
            <span>Key Takeaways</span>
          </div>
          <div className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">
            {lesson.key_points_md}
          </div>
        </div>
      )}

      {/* 7. CHECK YOUR UNDERSTANDING Callout */}
      {onOpenQuiz && (
        <div className="rounded-2xl bg-dark-card border border-dark-border p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-forge-400 uppercase tracking-wider">
              <HelpCircle className="w-4 h-4" />
              <span>Knowledge Check Available</span>
            </div>
            <p className="text-xs text-slate-400">
              Reinforce your understanding with interactive concept questions.
            </p>
          </div>
          <button
            onClick={onOpenQuiz}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-dark-border transition-colors whitespace-nowrap"
          >
            Start Knowledge Check
          </button>
        </div>
      )}

      {/* 8. Bottom Lesson Mastery Action */}
      <div className="pt-4 border-t border-dark-border flex items-center justify-between">
        <div className="text-xs text-slate-400">
          Finished studying this topic? Mark it complete to track your daily streak.
        </div>
        <button
          onClick={onMarkComplete}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            isCompleted
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              : 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-md shadow-emerald-600/20'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>{isCompleted ? 'Marked as Complete' : 'Mark Lesson Complete'}</span>
        </button>
      </div>

    </div>
  );
};
