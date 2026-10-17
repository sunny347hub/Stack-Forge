import type {
  Course,
  LearningPath,
  CourseModule,
  Lesson,
  CoursePrerequisite,
  KnowledgeCheckQuestionFull,
  KnowledgeCheck
} from '../types/database';

import {
  ALL_CURRICULUM_MODULES,
  ALL_CURRICULUM_LESSONS,
  LESSON_COUNT_BY_COURSE
} from './curriculum';

export const INITIAL_COURSES: Course[] = [
  {
    id: '22222222-2222-2222-2222-222222222201',
    slug: 'html-fundamentals',
    title: 'HTML Fundamentals',
    short_description: 'Master semantic markup, document architecture, multimedia, forms, tables, and HTML graphics.',
    full_description: 'HTML is the foundation of all web development. In this comprehensive course modeled after professional standards and W3Schools depth, you will master document structure, headings, paragraphs, links, images, tables, lists, semantic containers, accessible forms, audio/video, SVG, canvas, and HTML entities.',
    technology: 'HTML5',
    category: 'frontend',
    difficulty: 'beginner',
    icon_key: 'Code',
    status: 'published',
    estimated_duration_minutes: 360,
    sort_order: 1,
    learning_outcomes: [
      'Understand the DOM tree and browser rendering pipeline',
      'Build structured pages using semantic HTML5 elements',
      'Create accessible forms with client-side validation',
      'Embed multimedia and configure responsive viewport metadata',
      'Master HTML tables, lists, SVG graphics, and character entities'
    ],
    published_lesson_count: LESSON_COUNT_BY_COURSE['22222222-2222-2222-2222-222222222201'] || 25,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '22222222-2222-2222-2222-222222222202',
    slug: 'css-fundamentals',
    title: 'CSS Fundamentals',
    short_description: 'Learn modern layout systems including Flexbox, Grid, animations, variables, and responsive design.',
    full_description: 'Transform raw markup into beautiful, responsive web experiences. Explore CSS selectors, specificity, the box model, Flexbox, CSS Grid, media queries, CSS custom properties, and micro-animations.',
    technology: 'CSS3',
    category: 'frontend',
    difficulty: 'beginner',
    icon_key: 'Palette',
    status: 'published',
    estimated_duration_minutes: 300,
    sort_order: 2,
    learning_outcomes: [
      'Master the CSS box model and specificity hierarchy',
      'Construct fluid layouts with Flexbox and Grid',
      'Build responsive layouts across all screen viewports',
      'Implement smooth transitions and micro-interactions',
      'Architect maintainable stylesheets using CSS custom properties'
    ],
    published_lesson_count: LESSON_COUNT_BY_COURSE['22222222-2222-2222-2222-222222222202'] || 14,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '22222222-2222-2222-2222-222222222203',
    slug: 'javascript-fundamentals',
    title: 'JavaScript Fundamentals',
    short_description: 'Gain fluency in modern ECMAScript, asynchronous programming, DOM manipulation, and browser APIs.',
    full_description: 'JavaScript brings the web to life. Master variables, datatypes, operators, conditionals, loops, functions, closures, array methods, DOM event handling, Promises, and async/await.',
    technology: 'JavaScript',
    category: 'frontend',
    difficulty: 'beginner',
    icon_key: 'Terminal',
    status: 'published',
    estimated_duration_minutes: 420,
    sort_order: 3,
    learning_outcomes: [
      'Write modern ES6+ syntax and arrow functions',
      'Manipulate complex array and object data structures seamlessly',
      'Handle asynchronous operations with Promises, async/await, and fetch',
      'Understand the browser event loop, event delegation, and DOM APIs'
    ],
    published_lesson_count: LESSON_COUNT_BY_COURSE['22222222-2222-2222-2222-222222222203'] || 18,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '22222222-2222-2222-2222-222222222204',
    slug: 'git-fundamentals',
    title: 'Git and Version Control',
    short_description: 'Learn branching, committing, merging, conflict resolution, stashing, and collaborative GitHub workflows.',
    full_description: 'Version control is an indispensable developer skill. Learn how Git tracks snapshot history, manage branches, write clean commit messages, resolve merge conflicts, and collaborate on open-source remotes.',
    technology: 'Git',
    category: 'developer_tools',
    difficulty: 'beginner',
    icon_key: 'GitBranch',
    status: 'published',
    estimated_duration_minutes: 200,
    sort_order: 4,
    learning_outcomes: [
      'Initialize repositories and track file staging history',
      'Create, merge, and rebase Git branches',
      'Resolve merge conflicts confidently',
      'Collaborate on shared remotes via pull requests and stash changes'
    ],
    published_lesson_count: LESSON_COUNT_BY_COURSE['22222222-2222-2222-2222-222222222204'] || 8,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '22222222-2222-2222-2222-222222222205',
    slug: 'npm-fundamentals',
    title: 'npm and Package Management',
    short_description: 'Understand dependencies, lockfiles, scripts, semantic versioning, and package publishing.',
    full_description: 'Harness the Node package ecosystem. Master package.json configuration, scripts, devDependencies, semver rules, peer dependencies, npx, and security auditing.',
    technology: 'npm',
    category: 'developer_tools',
    difficulty: 'beginner',
    icon_key: 'Package',
    status: 'published',
    estimated_duration_minutes: 150,
    sort_order: 5,
    learning_outcomes: [
      'Manage package.json dependencies and lockfiles',
      'Understand semantic versioning (semver) rules and version ranges',
      'Write automated npm build, test, and dev scripts',
      'Audit packages for security vulnerabilities with npm audit'
    ],
    published_lesson_count: LESSON_COUNT_BY_COURSE['22222222-2222-2222-2222-222222222205'] || 5,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '22222222-2222-2222-2222-222222222206',
    slug: 'typescript-fundamentals',
    title: 'TypeScript Fundamentals',
    short_description: 'Type-safe JavaScript with interfaces, generics, union types, utility types, and compiler tooling.',
    full_description: 'Build resilient applications with TypeScript. Learn static typing, primitive types, custom interfaces, union/intersection types, generics, utility types, and tsconfig compiler options.',
    technology: 'TypeScript',
    category: 'frontend',
    difficulty: 'intermediate',
    icon_key: 'FileCode',
    status: 'published',
    estimated_duration_minutes: 240,
    sort_order: 6,
    learning_outcomes: [
      'Apply static typing to prevent runtime errors',
      'Define clean interfaces and type aliases',
      'Use TypeScript Generics for reusable functions and components',
      'Leverage built-in utility types like Partial, Pick, and Omit'
    ],
    published_lesson_count: LESSON_COUNT_BY_COURSE['22222222-2222-2222-2222-222222222206'] || 8,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '22222222-2222-2222-2222-222222222207',
    slug: 'react-fundamentals',
    title: 'React Fundamentals',
    short_description: 'Component-driven UI development with hooks, props, state, effects, context, and modern architecture.',
    full_description: 'React powers modern single-page applications. Learn JSX, component composition, useState, useEffect, useRef, custom hooks, context, and client-side form controls.',
    technology: 'React',
    category: 'frontend',
    difficulty: 'intermediate',
    icon_key: 'Layers',
    status: 'published',
    estimated_duration_minutes: 360,
    sort_order: 7,
    learning_outcomes: [
      'Build composable, reusable UI components',
      'Manage component state and side effects with useState and useEffect',
      'Pass data effectively via props and useContext',
      'Create reusable custom hooks for shared stateful logic'
    ],
    published_lesson_count: LESSON_COUNT_BY_COURSE['22222222-2222-2222-2222-222222222207'] || 9,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '22222222-2222-2222-2222-222222222208',
    slug: 'nodejs-fundamentals',
    title: 'Node.js Fundamentals',
    short_description: 'Server-side JavaScript runtime, event loop, file system, streams, and native HTTP servers.',
    full_description: 'Run JavaScript on the server. Explore the V8 engine, CommonJS vs ESM, fs module, events, streams, environment variables, path utilities, and native HTTP web servers.',
    technology: 'Node.js',
    category: 'backend',
    difficulty: 'intermediate',
    icon_key: 'Server',
    status: 'published',
    estimated_duration_minutes: 240,
    sort_order: 8,
    learning_outcomes: [
      'Understand Node runtime and asynchronous non-blocking I/O',
      'Read and write files asynchronously using the fs module',
      'Work with Node streams and path resolution',
      'Create native HTTP web servers and handle routes'
    ],
    published_lesson_count: LESSON_COUNT_BY_COURSE['22222222-2222-2222-2222-222222222208'] || 5,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '22222222-2222-2222-2222-222222222209',
    slug: 'express-fundamentals',
    title: 'Express.js Fundamentals',
    short_description: 'Build production REST APIs, custom middleware, route grouping, and authentication handling.',
    full_description: 'The standard minimal backend framework for Node.js. Build RESTful APIs, apply middleware for logging and validation, handle errors gracefully, and structure enterprise controllers.',
    technology: 'Express.js',
    category: 'backend',
    difficulty: 'intermediate',
    icon_key: 'Globe',
    status: 'published',
    estimated_duration_minutes: 240,
    sort_order: 9,
    learning_outcomes: [
      'Design and implement RESTful API endpoints',
      'Write custom Express middleware functions',
      'Validate incoming request payloads with clean status codes',
      'Implement structured error handling and route modularity'
    ],
    published_lesson_count: LESSON_COUNT_BY_COURSE['22222222-2222-2222-2222-222222222209'] || 6,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '22222222-2222-2222-2222-222222222210',
    slug: 'sql-fundamentals',
    title: 'SQL Fundamentals',
    short_description: 'Relational database querying, filtering, JOINs, aggregations, subqueries, and table schema design.',
    full_description: 'Learn Structured Query Language (SQL) from the ground up. Query tables, filter with WHERE, perform INNER/LEFT JOINs, aggregate with GROUP BY and HAVING, write subqueries, and create relational schemas.',
    technology: 'SQL',
    category: 'databases',
    difficulty: 'beginner',
    icon_key: 'Database',
    status: 'published',
    estimated_duration_minutes: 280,
    sort_order: 10,
    learning_outcomes: [
      'Write SELECT queries with WHERE and ORDER BY filters',
      'Combine related tables using INNER and LEFT JOINs',
      'Aggregate metrics using COUNT, SUM, AVG, and GROUP BY',
      'Construct subqueries and correlated data lookups',
      'Define schemas with PRIMARY KEY and FOREIGN KEY constraints'
    ],
    published_lesson_count: LESSON_COUNT_BY_COURSE['22222222-2222-2222-2222-222222222210'] || 11,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '22222222-2222-2222-2222-222222222211',
    slug: 'postgresql-fundamentals',
    title: 'PostgreSQL Fundamentals',
    short_description: 'Advanced open-source SQL: JSONB, window functions, indexes, and ACID transactions.',
    full_description: 'Master the world\'s most advanced open-source database. Learn complex joins, window functions (ROW_NUMBER, RANK), JSONB indexing, Common Table Expressions (CTEs), and multi-statement transactions.',
    technology: 'PostgreSQL',
    category: 'databases',
    difficulty: 'intermediate',
    icon_key: 'Cpu',
    status: 'published',
    estimated_duration_minutes: 240,
    sort_order: 11,
    learning_outcomes: [
      'Query and index semi-structured JSONB data',
      'Execute analytic queries using Window Functions',
      'Write recursive and hierarchical CTE queries',
      'Optimize queries with EXPLAIN ANALYZE and B-Tree indexes',
      'Enforce data integrity with ACID transactions'
    ],
    published_lesson_count: LESSON_COUNT_BY_COURSE['22222222-2222-2222-2222-222222222211'] || 5,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '22222222-2222-2222-2222-222222222212',
    slug: 'mysql-fundamentals',
    title: 'MySQL Fundamentals',
    short_description: 'Relational schema design, storage engines, indexing, replication, and performance tuning.',
    full_description: 'Learn MySQL, the ubiquitous relational database powering millions of web applications. Understand InnoDB, clustered indexes, stored routines, transaction isolation levels, and performance schemas.',
    technology: 'MySQL',
    category: 'databases',
    difficulty: 'intermediate',
    icon_key: 'HardDrive',
    status: 'published',
    estimated_duration_minutes: 210,
    sort_order: 12,
    learning_outcomes: [
      'Design relational schemas tailored for MySQL',
      'Understand InnoDB storage engine architecture and clustered indexes',
      'Diagnose slow queries using EXPLAIN',
      'Configure transactions and locking with SELECT FOR UPDATE'
    ],
    published_lesson_count: LESSON_COUNT_BY_COURSE['22222222-2222-2222-2222-222222222212'] || 4,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
];

export const PRIMARY_LEARNING_PATH: LearningPath = {
  id: '11111111-1111-1111-1111-111111111111',
  slug: 'full-stack-developer',
  title: 'Full-Stack Developer Path',
  description: 'A curated 12-stage curriculum starting from basic HTML markup through front-end interactivity, developer tools, and relational database engineering.',
  status: 'published',
  is_primary: true
};

export const COURSE_PREREQUISITES: CoursePrerequisite[] = [
  {
    id: 'prereq-1',
    course_id: '22222222-2222-2222-2222-222222222202', // CSS
    prerequisite_course_id: '22222222-2222-2222-2222-222222222201', // HTML
    kind: 'recommended',
    sort_order: 1
  },
  {
    id: 'prereq-2',
    course_id: '22222222-2222-2222-2222-222222222203', // JS
    prerequisite_course_id: '22222222-2222-2222-2222-222222222201', // HTML
    kind: 'recommended',
    sort_order: 2
  },
  {
    id: 'prereq-3',
    course_id: '22222222-2222-2222-2222-222222222207', // React
    prerequisite_course_id: '22222222-2222-2222-2222-222222222203', // JS
    kind: 'recommended',
    sort_order: 1
  },
  {
    id: 'prereq-4',
    course_id: '22222222-2222-2222-2222-222222222209', // Express
    prerequisite_course_id: '22222222-2222-2222-2222-222222222208', // Node
    kind: 'recommended',
    sort_order: 1
  },
  {
    id: 'prereq-5',
    course_id: '22222222-2222-2222-2222-222222222211', // PostgreSQL
    prerequisite_course_id: '22222222-2222-2222-2222-222222222210', // SQL
    kind: 'recommended',
    sort_order: 1
  }
];

export const INITIAL_MODULES: CourseModule[] = ALL_CURRICULUM_MODULES;

export const INITIAL_LESSONS: Lesson[] = ALL_CURRICULUM_LESSONS;

export const INITIAL_KNOWLEDGE_CHECKS: KnowledgeCheck[] = [
  {
    id: '55555555-5555-5555-5555-555555555101',
    lesson_id: '44444444-4444-4444-4444-444444444102',
    course_id: '22222222-2222-2222-2222-222222222201',
    title: 'HTML Document Structure Check',
    passing_score_percent: 70,
    blocks_next_lesson: false,
    status: 'published',
  },
  {
    id: '55555555-5555-5555-5555-555555555102',
    lesson_id: '44444444-4444-4444-4444-444444444106',
    course_id: '22222222-2222-2222-2222-222222222201',
    title: 'Accessible Forms Knowledge Check',
    passing_score_percent: 70,
    blocks_next_lesson: false,
    status: 'published',
  }
];

export const KNOWLEDGE_CHECK_QUESTIONS_SECURE: KnowledgeCheckQuestionFull[] = [
  {
    id: '66666666-6666-6666-6666-666666666101',
    sort_order: 1,
    prompt: 'What does the <!DOCTYPE html> declaration at the beginning of an HTML file do?',
    question_type: 'single_choice',
    choices: [
      { id: 'a', label: 'It connects the HTML file to external CSS stylesheets.' },
      { id: 'b', label: 'It tells the browser that the document is written in modern HTML5.' },
      { id: 'c', label: 'It renders an invisible container for JavaScript execution.' },
      { id: 'd', label: 'It automatically translates foreign language characters.' }
    ],
    correct_choice_id: 'b',
    explanation: 'The <!DOCTYPE html> declaration ensures the browser operates in modern HTML5 standards mode rather than quirks mode.'
  },
  {
    id: '66666666-6666-6666-6666-666666666102',
    sort_order: 2,
    prompt: 'Where should visible elements like <h1>, <p>, and <button> be placed inside an HTML document?',
    question_type: 'single_choice',
    choices: [
      { id: 'a', label: 'Inside the <head> element alongside meta tags' },
      { id: 'b', label: 'Directly before the <!DOCTYPE html> declaration' },
      { id: 'c', label: 'Inside the <body> element' },
      { id: 'd', label: 'Inside an external JSON file' }
    ],
    correct_choice_id: 'c',
    explanation: 'The <body> element encapsulates all visible, rendered content of a web page.'
  },
  {
    id: '66666666-6666-6666-6666-666666666103',
    sort_order: 3,
    prompt: 'Which of the following is considered best practice for heading levels on a single page?',
    question_type: 'single_choice',
    choices: [
      { id: 'a', label: 'Use at least five <h1> tags per section for emphasis' },
      { id: 'b', label: 'Use exactly one main <h1> per page for accessibility and document hierarchy' },
      { id: 'c', label: 'Skip <h2> and jump directly from <h1> to <h4>' },
      { id: 'd', label: 'Avoid using <h1> headings altogether' }
    ],
    correct_choice_id: 'b',
    explanation: 'Having a single <h1> heading establishes a clear document title for assistive readers and search engine indexers.'
  },
  {
    id: '66666666-6666-6666-6666-666666666104',
    sort_order: 1,
    prompt: 'How do you correctly connect an HTML <label> with an <input> element for screen reader accessibility?',
    question_type: 'single_choice',
    choices: [
      { id: 'a', label: 'Match the label\'s for attribute with the input\'s id attribute identically' },
      { id: 'b', label: 'Set both elements to have the exact same class name' },
      { id: 'c', label: 'Place the label inside a separate footer tag' },
      { id: 'd', label: 'No connection is needed if placeholder text is provided' }
    ],
    correct_choice_id: 'a',
    explanation: 'Setting label for="fieldName" and input id="fieldName" explicitly pairs the control so clicking the label focuses the input, and assistive readers announce it properly.'
  },
  {
    id: '66666666-6666-6666-6666-666666666105',
    sort_order: 2,
    prompt: 'Which HTML5 element represents the primary navigation landmark for a web page?',
    question_type: 'single_choice',
    choices: [
      { id: 'a', label: '<div class="navigation">' },
      { id: 'b', label: '<nav>' },
      { id: 'c', label: '<menu type="context">' },
      { id: 'd', label: '<section>' }
    ],
    correct_choice_id: 'b',
    explanation: 'The <nav> semantic tag provides a native accessible landmark that assistive devices can jump to directly.'
  }
];
