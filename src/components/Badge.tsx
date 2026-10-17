import React from 'react';
import type { CourseCategory, DifficultyLevel, ProgressStatus } from '../types/database';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'category' | 'difficulty' | 'status' | 'default' | 'outline';
  category?: CourseCategory;
  difficulty?: DifficultyLevel;
  status?: ProgressStatus;
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  category,
  difficulty,
  status,
  size = 'md',
  className = ''
}) => {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs';

  let colorClasses = variant === 'outline' 
    ? 'bg-transparent text-slate-300 border border-slate-700' 
    : 'bg-slate-800 text-slate-300 border border-slate-700';

  if (category) {
    switch (category) {
      case 'frontend':
        colorClasses = 'bg-sky-500/10 text-sky-400 border border-sky-500/30';
        break;
      case 'backend':
        colorClasses = 'bg-purple-500/10 text-purple-400 border border-purple-500/30';
        break;
      case 'databases':
        colorClasses = 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30';
        break;
      case 'developer_tools':
        colorClasses = 'bg-amber-500/10 text-amber-400 border border-amber-500/30';
        break;
    }
  } else if (difficulty) {
    switch (difficulty) {
      case 'beginner':
        colorClasses = 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30';
        break;
      case 'intermediate':
        colorClasses = 'bg-amber-500/10 text-amber-400 border border-amber-500/30';
        break;
      case 'advanced':
        colorClasses = 'bg-rose-500/10 text-rose-400 border border-rose-500/30';
        break;
    }
  } else if (status) {
    switch (status) {
      case 'completed':
        colorClasses = 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/40';
        break;
      case 'in_progress':
        colorClasses = 'bg-forge-500/15 text-forge-400 border border-forge-500/40';
        break;
      case 'not_started':
        colorClasses = 'bg-slate-800 text-slate-400 border border-slate-700';
        break;
    }
  }

  return (
    <span
      className={`inline-flex items-center gap-1 font-medium rounded-full tracking-wide transition-all ${sizeClasses} ${colorClasses} ${className}`}
    >
      {children}
    </span>
  );
};
