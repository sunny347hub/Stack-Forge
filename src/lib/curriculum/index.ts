import type { CourseModule, Lesson } from '../../types/database';
import { HTML_MODULES, HTML_LESSONS } from './htmlCurriculum';
import { CSS_MODULES, CSS_LESSONS } from './cssCurriculum';
import { JS_MODULES, JS_LESSONS } from './jsCurriculum';
import { TOOLS_MODULES, TOOLS_LESSONS } from './toolsCurriculum';
import { FRAMEWORKS_MODULES, FRAMEWORKS_LESSONS } from './frameworksCurriculum';
import { BACKEND_MODULES, BACKEND_LESSONS } from './backendCurriculum';
import { DATABASE_MODULES, DATABASE_LESSONS } from './databaseCurriculum';

export const ALL_CURRICULUM_MODULES: CourseModule[] = [
  ...HTML_MODULES,
  ...CSS_MODULES,
  ...JS_MODULES,
  ...TOOLS_MODULES,
  ...FRAMEWORKS_MODULES,
  ...BACKEND_MODULES,
  ...DATABASE_MODULES
];

export const ALL_CURRICULUM_LESSONS: Lesson[] = [
  ...HTML_LESSONS,
  ...CSS_LESSONS,
  ...JS_LESSONS,
  ...TOOLS_LESSONS,
  ...FRAMEWORKS_LESSONS,
  ...BACKEND_LESSONS,
  ...DATABASE_LESSONS
];

export const LESSON_COUNT_BY_COURSE: Record<string, number> = {
  'html-fundamentals': HTML_LESSONS.length,
  'css-fundamentals': CSS_LESSONS.length,
  'javascript-fundamentals': JS_LESSONS.length,
  'git-fundamentals': TOOLS_LESSONS.filter(l => l.course_id === '22222222-2222-2222-2222-222222222204').length,
  'npm-fundamentals': TOOLS_LESSONS.filter(l => l.course_id === '22222222-2222-2222-2222-222222222205').length,
  'typescript-fundamentals': FRAMEWORKS_LESSONS.filter(l => l.course_id === '22222222-2222-2222-2222-222222222206').length,
  'react-fundamentals': FRAMEWORKS_LESSONS.filter(l => l.course_id === '22222222-2222-2222-2222-222222222207').length,
  'nodejs-fundamentals': BACKEND_LESSONS.filter(l => l.course_id === '22222222-2222-2222-2222-222222222208').length,
  'express-fundamentals': BACKEND_LESSONS.filter(l => l.course_id === '22222222-2222-2222-2222-222222222209').length,
  'sql-fundamentals': DATABASE_LESSONS.filter(l => l.course_id === '22222222-2222-2222-2222-222222222210').length,
  'postgresql-fundamentals': DATABASE_LESSONS.filter(l => l.course_id === '22222222-2222-2222-2222-222222222211').length,
  'mysql-fundamentals': DATABASE_LESSONS.filter(l => l.course_id === '22222222-2222-2222-2222-222222222212').length,
};
