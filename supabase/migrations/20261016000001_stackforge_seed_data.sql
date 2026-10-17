-- ============================================================================
-- STACKFORGE SEED DATA MIGRATION
-- ============================================================================

-- 1. PRIMARY LEARNING PATH: FULL-STACK DEVELOPER
INSERT INTO learning_paths (id, slug, title, description, status, is_primary)
VALUES (
  '11111111-1111-1111-1111-111111111111',
  'full-stack-developer',
  'Full-Stack Developer',
  'A comprehensive 12-stage curriculum from HTML foundation through modern backend APIs and relational databases.',
  'published',
  true
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title;

-- 2. THE 12 COURSES
INSERT INTO courses (id, slug, title, short_description, full_description, technology, category, difficulty, icon_key, status, estimated_duration_minutes, sort_order, learning_outcomes)
VALUES
  (
    '22222222-2222-2222-2222-222222222201',
    'html-fundamentals',
    'HTML Fundamentals',
    'Master semantic markup, document architecture, and modern accessible elements.',
    'HTML is the backbone of all web development. In this course, you will learn standard HTML5 syntax, semantic tags, forms, tables, media embedding, and web accessibility standards.',
    'HTML5',
    'frontend',
    'beginner',
    'Code',
    'published',
    180,
    1,
    '["Understand the DOM tree and browser rendering", "Build structured pages using semantic HTML5 elements", "Create accessible forms with validation", "Embed multimedia and configure responsive metadata"]'::jsonb
  ),
  (
    '22222222-2222-2222-2222-222222222202',
    'css-fundamentals',
    'CSS Fundamentals',
    'Learn modern layout systems including Flexbox, Grid, animations, and responsive design.',
    'Transform raw markup into beautiful, responsive web experiences. Explore CSS specificity, the box model, Flexbox, CSS Grid, media queries, and design system variables.',
    'CSS3',
    'frontend',
    'beginner',
    'Palette',
    'published',
    240,
    2,
    '["Master the CSS box model and specificity hierarchy", "Construct fluid layouts with Flexbox and Grid", "Build responsive layouts across all screen viewports", "Implement smooth transitions and micro-interactions"]'::jsonb
  ),
  (
    '22222222-2222-2222-2222-222222222203',
    'javascript-fundamentals',
    'JavaScript Fundamentals',
    'Gain fluency in modern ECMAScript, asynchronous programming, and DOM manipulation.',
    'JavaScript brings the web to life. Master variables, functions, closures, array methods, async/await, promises, and browser event listeners.',
    'JavaScript',
    'frontend',
    'beginner',
    'Terminal',
    'published',
    300,
    3,
    '["Write modern ES6+ syntax and functions", "Manipulate array and object data structures seamlessly", "Handle asynchronous operations with Promises and async/await", "Understand the event loop and browser runtime"]'::jsonb
  ),
  (
    '22222222-2222-2222-2222-222222222204',
    'git-fundamentals',
    'Git and Version Control',
    'Learn branching, committing, merging, conflict resolution, and collaborative workflows.',
    'Version control is an indispensable developer skill. Learn how Git tracks changes, manage branches, write clean commit messages, resolve merge conflicts, and collaborate using GitHub.',
    'Git',
    'developer_tools',
    'beginner',
    'GitBranch',
    'published',
    150,
    4,
    '["Initialize repositories and track file history", "Create, merge, and rebase Git branches", "Resolve merge conflicts confidently", "Collaborate on shared remotes via pull requests"]'::jsonb
  ),
  (
    '22222222-2222-2222-2222-222222222205',
    'npm-fundamentals',
    'npm and Package Management',
    'Understand dependencies, lockfiles, scripts, semantic versioning, and package publishing.',
    'Harness the Node package ecosystem. Master package.json configuration, scripts, devDependencies, semver rules, peer dependencies, and monorepo workspace basics.',
    'npm',
    'developer_tools',
    'beginner',
    'Package',
    'published',
    120,
    5,
    '["Manage package.json dependencies and lockfiles", "Understand semantic versioning (semver) rules", "Write automation npm scripts", "Audit packages for security vulnerabilities"]'::jsonb
  ),
  (
    '22222222-2222-2222-2222-222222222206',
    'typescript-fundamentals',
    'TypeScript Fundamentals',
    'Type-safe JavaScript with interfaces, generics, union types, and compiler tooling.',
    'Build resilient applications with TypeScript. Learn static typing, custom types, interfaces, generics, utility types, and tsconfig compiler options.',
    'TypeScript',
    'frontend',
    'intermediate',
    'FileCode',
    'published',
    240,
    6,
    '["Apply static typing to prevent runtime errors", "Define clean interfaces and type aliases", "Use TypeScript Generics for reusable functions", "Configure strict compiler flags in tsconfig.json"]'::jsonb
  ),
  (
    '22222222-2222-2222-2222-222222222207',
    'react-fundamentals',
    'React Fundamentals',
    'Component-driven UI development with hooks, props, state, effects, and modern architecture.',
    'React powers modern single-page applications. Learn JSX, component composition, useState, useEffect, custom hooks, context, and client-side routing.',
    'React',
    'frontend',
    'intermediate',
    'Layers',
    'published',
    360,
    7,
    '["Build composable, reusable UI components", "Manage component state and side effects with hooks", "Pass data effectively via props and context", "Handle user inputs and form submissions smoothly"]'::jsonb
  ),
  (
    '22222222-2222-2222-2222-222222222208',
    'nodejs-fundamentals',
    'Node.js Fundamentals',
    'Server-side JavaScript runtime, event loop, file system, streams, and modules.',
    'Run JavaScript on the server. Explore the V8 engine, CommonJS vs ESM, fs module, events, streams, environment variables, and HTTP server creation.',
    'Node.js',
    'backend',
    'intermediate',
    'Server',
    'published',
    240,
    8,
    '["Understand Node runtime and asynchronous non-blocking I/O", "Read and write files using the fs module", "Work with Node streams and buffers", "Create native HTTP web servers"]'::jsonb
  ),
  (
    '22222222-2222-2222-2222-222222222209',
    'express-fundamentals',
    'Express.js Fundamentals',
    'Build production REST APIs, custom middleware, route grouping, and authentication handling.',
    'The standard minimal backend framework for Node.js. Build RESTful APIs, apply middleware for logging and validation, handle errors gracefully, and structure enterprise controllers.',
    'Express.js',
    'backend',
    'intermediate',
    'Globe',
    'published',
    240,
    9,
    '["Design and implement RESTful API endpoints", "Write custom Express middleware functions", "Validate incoming request payloads", "Implement structured error handling and responses"]'::jsonb
  ),
  (
    '22222222-2222-2222-2222-222222222210',
    'sql-fundamentals',
    'SQL Fundamentals',
    'Relational database querying, filtering, JOINs, aggregations, and data normalization.',
    'Learn Structured Query Language (SQL) from the ground up. Query tables, filter with WHERE, perform INNER/LEFT JOINs, aggregate with GROUP BY, and design normalized schemas.',
    'SQL',
    'databases',
    'beginner',
    'Database',
    'published',
    210,
    10,
    '["Write SELECT queries with WHERE and ORDER BY filters", "Combine related tables using INNER and LEFT JOINs", "Aggregate metrics using COUNT, SUM, AVG, and GROUP BY", "Understand primary keys, foreign keys, and normalization"]'::jsonb
  ),
  (
    '22222222-2222-2222-2222-222222222211',
    'postgresql-fundamentals',
    'PostgreSQL Fundamentals',
    'Advanced open-source SQL: JSONB, window functions, indexes, and ACID transactions.',
    'Master the world''s most advanced open-source database. Learn complex joins, window functions, JSONB indexing, full-text search, and multi-statement transactions.',
    'PostgreSQL',
    'databases',
    'intermediate',
    'Cpu',
    'published',
    240,
    11,
    '["Query and index semi-structured JSONB data", "Execute analytic queries using Window Functions", "Optimize queries with EXPLAIN ANALYZE and B-Tree indexes", "Enforce data integrity with ACID transactions"]'::jsonb
  ),
  (
    '22222222-2222-2222-2222-222222222212',
    'mysql-fundamentals',
    'MySQL Fundamentals',
    'Relational schema design, storage engines, indexing, replication, and performance tuning.',
    'Learn MySQL, the ubiquitous relational database powering millions of web applications. Understand InnoDB, table partitioning, performance schemas, and indexing strategies.',
    'MySQL',
    'databases',
    'intermediate',
    'HardDrive',
    'published',
    210,
    12,
    '["Design relational schemas tailored for MySQL", "Understand InnoDB storage engine architecture", "Diagnose slow queries using EXPLAIN", "Configure transactions and isolation levels"]'::jsonb
  )
ON CONFLICT (slug) DO UPDATE SET 
  title = EXCLUDED.title,
  short_description = EXCLUDED.short_description,
  full_description = EXCLUDED.full_description,
  technology = EXCLUDED.technology,
  category = EXCLUDED.category,
  difficulty = EXCLUDED.difficulty,
  icon_key = EXCLUDED.icon_key,
  status = EXCLUDED.status,
  estimated_duration_minutes = EXCLUDED.estimated_duration_minutes,
  sort_order = EXCLUDED.sort_order,
  learning_outcomes = EXCLUDED.learning_outcomes;

-- 3. LEARNING PATH STEPS (All 12 steps in sequence)
INSERT INTO learning_path_steps (path_id, course_id, step_number, label)
VALUES
  ('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222201', 1, 'HTML Fundamentals'),
  ('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222202', 2, 'CSS Fundamentals'),
  ('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222203', 3, 'JavaScript Fundamentals'),
  ('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222204', 4, 'Git and Version Control'),
  ('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222205', 5, 'npm and Package Management'),
  ('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222206', 6, 'TypeScript Fundamentals'),
  ('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222207', 7, 'React Fundamentals'),
  ('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222208', 8, 'Node.js Fundamentals'),
  ('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222209', 9, 'Express.js Fundamentals'),
  ('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222210', 10, 'SQL Fundamentals'),
  ('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222211', 11, 'PostgreSQL Fundamentals'),
  ('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222212', 12, 'MySQL Fundamentals')
ON CONFLICT (path_id, step_number) DO UPDATE SET course_id = EXCLUDED.course_id, label = EXCLUDED.label;

-- 4. SOFT PREREQUISITES
INSERT INTO course_prerequisites (course_id, prerequisite_course_id, kind, sort_order)
VALUES
  -- CSS recommends HTML
  ('22222222-2222-2222-2222-222222222202', '22222222-2222-2222-2222-222222222201', 'recommended', 1),
  -- JS recommends HTML
  ('22222222-2222-2222-2222-222222222203', '22222222-2222-2222-2222-222222222201', 'recommended', 1),
  -- React recommends JS
  ('22222222-2222-2222-2222-222222222207', '22222222-2222-2222-2222-222222222203', 'recommended', 1),
  -- Express recommends Node
  ('22222222-2222-2222-2222-222222222209', '22222222-2222-2222-2222-222222222208', 'recommended', 1),
  -- PostgreSQL recommends SQL
  ('22222222-2222-2222-2222-222222222211', '22222222-2222-2222-2222-222222222210', 'recommended', 1)
ON CONFLICT (course_id, prerequisite_course_id) DO NOTHING;

-- 5. COURSE MODULES & LESSONS

-- HTML Modules
INSERT INTO course_modules (id, course_id, title, sort_order, status)
VALUES
  ('33333333-3333-3333-3333-333333333101', '22222222-2222-2222-2222-222222222201', 'Module 1: The Core Web Structure', 1, 'published'),
  ('33333333-3333-3333-3333-333333333102', '22222222-2222-2222-2222-222222222201', 'Module 2: Semantic Elements & Forms', 2, 'published')
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title;

-- HTML Lessons
INSERT INTO lessons (
  id, module_id, course_id, slug, title, sort_order, status,
  estimated_minutes, objectives, content_md, key_points_md, common_mistakes_md,
  starter_code, language, execution_mode, expected_output, editor_enabled
)
VALUES
  (
    '44444444-4444-4444-4444-444444444101',
    '33333333-3333-3333-3333-333333333101',
    '22222222-2222-2222-2222-222222222201',
    'intro-to-html-and-the-web',
    'Introduction to HTML and the Web',
    1,
    'published',
    20,
    '["Understand the role of HTML in web architecture", "Learn how web browsers parse markup into the Document Object Model (DOM)", "Recognize opening tags, closing tags, and attributes"]'::jsonb,
    '# Welcome to HTML & The Web\n\nEvery website you visit—from social networks to interactive learning platforms like StackForge—begins with **HTML (HyperText Markup Language)**.\n\nHTML gives structure and meaning to text, images, buttons, and content on the internet. It is not a programming language like JavaScript or Python; it is a **markup language** composed of tags that tell the browser how to structure and interpret content.\n\n### The Anatomy of an HTML Element\n\n```html\n<p class="greeting">Hello, Developer!</p>\n```\n\n- `<p>` is the **opening tag**.\n- `class="greeting"` is an **attribute** providing metadata or styling hooks.\n- `Hello, Developer!` is the **content**.\n- `</p>` is the **closing tag** with a forward slash.\n\nWhen a browser receives this markup from a web server, it constructs a live tree in memory called the **Document Object Model (DOM)**.',
    '- HTML provides structure; CSS provides presentation; JavaScript provides behavior.\n- Every modern HTML document must start with `<!DOCTYPE html>`.\n- Tags without closing partners (such as `<img>` and `<br>`) are called void or self-closing tags.',
    '- Forgetting to close tags can cause unpredictable styling and layout defects.\n- Misspelling attribute names like `scr` instead of `src` or `href` instead of `src`.',
    NULL,
    'html',
    'none',
    NULL,
    false
  ),
  (
    '44444444-4444-4444-4444-444444444102',
    '33333333-3333-3333-3333-333333333101',
    '22222222-2222-2222-2222-222222222201',
    'html-document-structure',
    'HTML Document Structure & Elements',
    2,
    'published',
    30,
    '["Construct a complete standard HTML5 document boilerplate", "Understand the purpose of <head> and <body> elements", "Write heading levels from <h1> to <h6> and paragraphs"]'::jsonb,
    '# Building the Standard HTML5 Document\n\nA valid HTML5 document adheres to a standardized structural hierarchy:\n\n```html\n<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8">\n    <title>My Developer Portfolio</title>\n  </head>\n  <body>\n    <h1>Welcome to My Website</h1>\n    <p>This is where your content lives.</p>\n  </body>\n</html>\n```\n\n### Core Sections\n1. `<!DOCTYPE html>`: Declares that this document is written in HTML5.\n2. `<html lang="en">`: The root element wrapping the entire page.\n3. `<head>`: Contains machine-readable metadata, title, and external stylesheets (not displayed directly on the screen).\n4. `<body>`: Contains all visible rendered content: headings, text, media, buttons, and layouts.\n\n### Your Task:\nIn the editor to the right, create a profile card for yourself. Add an `<h1>` heading with your name, a `<p>` paragraph describing your developer goal, and a button that says **"Explore My Projects"**.',
    '- Only one `<h1>` should exist per page for optimal accessibility and search ranking.\n- Content placed in `<head>` is not visually rendered on the canvas.\n- Self-contained elements like `<meta>` do not have closing tags.',
    '- Placing visible content like `<p>` or `<h1>` directly inside the `<head>` tag.\n- Omitting the `<meta charset="UTF-8">` tag which can lead to special character encoding issues.',
    '<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Developer Profile</title>
  <style>
    body { font-family: system-ui, sans-serif; padding: 24px; background: #0f172a; color: #f8fafc; }
    .card { background: #1e293b; border-radius: 12px; padding: 24px; max-width: 400px; border: 1px solid #334155; }
    h1 { color: #ff7020; margin-top: 0; font-size: 24px; }
    p { color: #94a3b8; line-height: 1.5; }
    button { background: #ff7020; color: white; border: none; padding: 10px 18px; border-radius: 6px; font-weight: bold; cursor: pointer; }
    button:hover { background: #f05210; }
  </style>
</head>
<body>
  <div class="card">
    <!-- Write your <h1> and <p> tags here -->
    <h1>Alex Rivera</h1>
    <p>Aspiring Full-Stack Developer learning with StackForge.</p>
    <button>Explore My Projects</button>
  </div>
</body>
</html>',
    'html',
    'html_preview',
    'A styled card containing an orange <h1> heading, description paragraph, and a functional button.',
    true
  ),
  (
    '44444444-4444-4444-4444-444444444103',
    '33333333-3333-3333-3333-333333333102',
    '22222222-2222-2222-2222-222222222201',
    'semantic-html-and-forms',
    'Semantic HTML5 & Accessible Forms',
    3,
    'published',
    35,
    '["Understand semantic elements like <header>, <main>, <nav>, and <article>", "Build accessible forms using <label>, <input>, and <button>", "Configure input validation attributes like required and type"]'::jsonb,
    '# Semantic HTML5 & Modern Forms\n\nSemantic HTML means using elements that clearly describe their meaning to both the browser and screen-reading assistive technologies.\n\n### Non-Semantic vs Semantic:\n- Non-semantic: `<div class="nav">`, `<div class="footer">`\n- Semantic: `<nav>`, `<header>`, `<main>`, `<section>`, `<article>`, `<footer>`\n\n### Accessible Form Controls\nEvery `<input>` field should be explicitly coupled with a `<label>` using the `for` and `id` attributes:\n\n```html\n<form>\n  <label for="user-email">Email Address</label>\n  <input type="email" id="user-email" required placeholder="you@domain.com">\n  <button type="submit">Subscribe</button>\n</form>\n```\n\nTry running and modifying the registration form in the editor to add password validation and a terms checkbox!',
    '- Screen readers rely heavily on semantic tags to announce page landmarks.\n- Always pair `<label for="...">` with `<input id="...">`.\n- Use `type="email"`, `type="password"`, and `type="number"` for native browser validation.',
    '- Using placeholder text instead of a proper `<label>` tag.\n- Creating forms without a `<button type="submit">`.',
    '<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Newsletter Signup</title>
  <style>
    body { font-family: system-ui, sans-serif; background: #0b0f19; color: #e2e8f0; padding: 32px; }
    form { background: #161e2e; padding: 24px; border-radius: 8px; max-width: 380px; border: 1px solid #283548; }
    .form-group { margin-bottom: 16px; }
    label { display: block; margin-bottom: 6px; font-size: 14px; font-weight: 600; color: #cbd5e1; }
    input[type="text"], input[type="email"] { width: 100%; box-sizing: border-box; padding: 10px; border-radius: 6px; border: 1px solid #334155; background: #0f172a; color: white; }
    button { width: 100%; padding: 12px; background: #ff7020; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; }
  </style>
</head>
<body>
  <main>
    <form action="#" method="POST">
      <h2>Join StackForge Community</h2>
      <div class="form-group">
        <label for="name">Your Name</label>
        <input type="text" id="name" required placeholder="Jane Doe">
      </div>
      <div class="form-group">
        <label for="email">Email Address</label>
        <input type="email" id="email" required placeholder="jane@example.com">
      </div>
      <button type="submit">Sign Up Free</button>
    </form>
  </main>
</body>
</html>',
    'html',
    'html_preview',
    'A semantic form with accessible labels, styled inputs, and responsive layout.',
    true
  )
ON CONFLICT (course_id, slug) DO UPDATE SET
  title = EXCLUDED.title,
  objectives = EXCLUDED.objectives,
  content_md = EXCLUDED.content_md,
  key_points_md = EXCLUDED.key_points_md,
  common_mistakes_md = EXCLUDED.common_mistakes_md,
  starter_code = EXCLUDED.starter_code,
  language = EXCLUDED.language,
  execution_mode = EXCLUDED.execution_mode,
  expected_output = EXCLUDED.expected_output,
  editor_enabled = EXCLUDED.editor_enabled;

-- CSS Modules & Lessons
INSERT INTO course_modules (id, course_id, title, sort_order, status)
VALUES
  ('33333333-3333-3333-3333-333333333201', '22222222-2222-2222-2222-222222222202', 'Module 1: CSS Box Model & Flexbox', 1, 'published')
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title;

INSERT INTO lessons (
  id, module_id, course_id, slug, title, sort_order, status,
  estimated_minutes, objectives, content_md, key_points_md, common_mistakes_md,
  starter_code, language, execution_mode, expected_output, editor_enabled
)
VALUES
  (
    '44444444-4444-4444-4444-444444444201',
    '33333333-3333-3333-3333-333333333201',
    '22222222-2222-2222-2222-222222222202',
    'css-flexbox-mastery',
    'Flexbox Layouts & Alignment',
    1,
    'published',
    25,
    '["Understand the flex container and flex items", "Master justify-content for main-axis distribution", "Master align-items for cross-axis alignment", "Create responsive navigation bars using Flexbox"]'::jsonb,
    '# Flexbox Layouts & Alignment\n\n**Flexbox (Flexible Box Layout)** is a CSS3 layout mode designed to provide a more efficient way to lay out, align, and distribute space among items in a container, even when their size is unknown or dynamic.\n\n### Key Container Properties:\n- `display: flex;`: Activates the flexbox context.\n- `flex-direction: row | column;`: Defines the main axis.\n- `justify-content: center | space-between | space-around;`: Distributes items along the main axis.\n- `align-items: center | stretch | flex-start;`: Aligns items along the cross axis.\n- `gap: 16px;`: Controls the spacing between adjacent flex items.\n\nCheck out the starter code to see a responsive header bar and product grid built with Flexbox!',
    '- `justify-content` controls the primary axis (horizontal in row mode).\n- `align-items` controls the perpendicular axis (vertical in row mode).\n- `gap` simplifies spacing without messy margin calculations.',
    '- Using `float` or negative margins instead of flexbox properties.\n- Forgetting `display: flex` on the parent container before applying `justify-content`.',
    '<!DOCTYPE html>
<html>
<head>
  <style>
    body { background: #0f172a; color: white; font-family: sans-serif; padding: 20px; }
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #1e293b;
      padding: 12px 24px;
      border-radius: 8px;
    }
    .nav-links {
      display: flex;
      gap: 16px;
      list-style: none;
      margin: 0;
      padding: 0;
    }
    .nav-links a { color: #94a3b8; text-decoration: none; font-weight: 500; }
    .nav-links a:hover { color: #ff7020; }
    .btn { background: #ff7020; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; }
  </style>
</head>
<body>
  <nav class="navbar">
    <div style="font-weight: bold; color: #ff7020;">StackForge</div>
    <ul class="nav-links">
      <li><a href="#">Courses</a></li>
      <li><a href="#">Paths</a></li>
      <li><a href="#">Community</a></li>
    </ul>
    <button class="btn">Get Started</button>
  </nav>
</body>
</html>',
    'css',
    'css_preview',
    'A clean responsive navigation bar aligned with Flexbox.',
    true
  )
ON CONFLICT (course_id, slug) DO UPDATE SET
  title = EXCLUDED.title,
  objectives = EXCLUDED.objectives,
  content_md = EXCLUDED.content_md,
  starter_code = EXCLUDED.starter_code,
  language = EXCLUDED.language,
  execution_mode = EXCLUDED.execution_mode,
  expected_output = EXCLUDED.expected_output,
  editor_enabled = EXCLUDED.editor_enabled;

-- JavaScript Modules & Lessons
INSERT INTO course_modules (id, course_id, title, sort_order, status)
VALUES
  ('33333333-3333-3333-3333-333333333301', '22222222-2222-2222-2222-222222222203', 'Module 1: Variables, Loops & Functions', 1, 'published')
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title;

INSERT INTO lessons (
  id, module_id, course_id, slug, title, sort_order, status,
  estimated_minutes, objectives, content_md, key_points_md, common_mistakes_md,
  starter_code, language, execution_mode, expected_output, editor_enabled
)
VALUES
  (
    '44444444-4444-4444-4444-444444444301',
    '33333333-3333-3333-3333-333333333301',
    '22222222-2222-2222-2222-222222222203',
    'javascript-fundamentals-intro',
    'Variables, Functions & Array Transformation',
    1,
    'published',
    25,
    '["Understand let, const, and immutability principles", "Define and invoke arrow functions", "Transform data using map, filter, and reduce"]'::jsonb,
    '# JavaScript: Variables & Modern Array Methods\n\nJavaScript is the programming language that powers interactivity on the web.\n\n### Variable Declaration\nAlways prefer `const` by default for values that do not get reassigned, and `let` when you need mutable variables (such as counters). Avoid `var` in modern code.\n\n```javascript\nconst courseName = "StackForge Full-Stack";\nlet studentCount = 120;\nstudentCount += 1;\n```\n\n### Array Methods\nModern JavaScript favors functional transformations over raw `for` loops:\n- `map()`: Creates a new array by transforming each element.\n- `filter()`: Creates a new array with elements that pass a test condition.\n- `reduce()`: Aggregates array elements down to a single value.\n\nRun the code in the editor to see console output in real time!',
    '- `const` prevents variable reassignment, but objects and arrays assigned to `const` can still have their contents mutated.\n- `map()` always returns a new array of the identical length.\n- `filter()` returns a new array with matching items.',
    '- Modifying the original array in place inside a `map` callback.\n- Using loose equality `==` instead of strict equality `===`.',
    '// Welcome to the JavaScript Workspace!
const students = [
  { name: "Maya", score: 92, active: true },
  { name: "Devon", score: 68, active: true },
  { name: "Priya", score: 85, active: false },
  { name: "Marcus", score: 95, active: true }
];

console.log("Original student count:", students.length);

// 1. Filter students who are active and scored >= 70
const topActiveStudents = students.filter(s => s.active && s.score >= 70);
console.log("Top active students:", topActiveStudents.map(s => s.name));

// 2. Calculate the average score of active students
const totalScore = topActiveStudents.reduce((sum, s) => sum + s.score, 0);
const average = totalScore / topActiveStudents.length;

console.log("Average Score:", average.toFixed(1));',
    'javascript',
    'javascript',
    'Console logs showing student count, top active students, and computed average score.',
    true
  )
ON CONFLICT (course_id, slug) DO UPDATE SET
  title = EXCLUDED.title,
  objectives = EXCLUDED.objectives,
  content_md = EXCLUDED.content_md,
  starter_code = EXCLUDED.starter_code,
  language = EXCLUDED.language,
  execution_mode = EXCLUDED.execution_mode,
  expected_output = EXCLUDED.expected_output,
  editor_enabled = EXCLUDED.editor_enabled;

-- Git Modules & Lessons (Guided interactive workflow)
INSERT INTO course_modules (id, course_id, title, sort_order, status)
VALUES
  ('33333333-3333-3333-3333-333333333401', '22222222-2222-2222-2222-222222222204', 'Module 1: Git Basics & Commits', 1, 'published')
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title;

INSERT INTO lessons (
  id, module_id, course_id, slug, title, sort_order, status,
  estimated_minutes, objectives, content_md, key_points_md, common_mistakes_md,
  starter_code, language, execution_mode, expected_output, editor_enabled
)
VALUES
  (
    '44444444-4444-4444-4444-444444444401',
    '33333333-3333-3333-3333-333333333401',
    '22222222-2222-2222-2222-222222222204',
    'git-init-staging-commit',
    'Initializing Repositories & Making Commits',
    1,
    'published',
    20,
    '["Understand the three states of Git: Working directory, Staging area, and Repository", "Initialize a git repo using git init", "Stage files using git add and record snapshots with git commit"]'::jsonb,
    '# Git: The Core Commit Cycle\n\nGit is a distributed version control system that records changes to a file or set of files over time so that you can recall specific versions later.\n\n### The Three Git Areas:\n1. **Working Directory**: Where you edit and write your active files.\n2. **Staging Area (Index)**: A staging ground where you select which changes to include in your next snapshot.\n3. **Git Repository (.git)**: Where Git permanently stores the metadata and commit tree.\n\n### The Fundamental Command Sequence:\n```bash\n# 1. Initialize git\ngit init\n\n# 2. Check current status\ngit status\n\n# 3. Stage changes\ngit add index.html\n\n# 4. Commit snapshot\ngit commit -m "feat: create landing page structure"\n```',
    '- A commit is a permanent snapshot of staged files.\n- Write clear, imperative commit messages (e.g., "Add user profile endpoint").',
    '- Running `git commit` without staging files first with `git add`.\n- Committing sensitive secrets like API keys or .env files.',
    '# Guided Git Terminal Simulation
# Try typing commands below:
# git status
# git add .
# git commit -m "feat: initial commit"
git status',
    'shell',
    'guided',
    'Output showing clean working directory and staged commit feedback.',
    true
  )
ON CONFLICT (course_id, slug) DO UPDATE SET
  title = EXCLUDED.title,
  objectives = EXCLUDED.objectives,
  content_md = EXCLUDED.content_md,
  starter_code = EXCLUDED.starter_code,
  language = EXCLUDED.language,
  execution_mode = EXCLUDED.execution_mode,
  expected_output = EXCLUDED.expected_output,
  editor_enabled = EXCLUDED.editor_enabled;

-- SQL Modules & Lessons
INSERT INTO course_modules (id, course_id, title, sort_order, status)
VALUES
  ('33333333-3333-3333-3333-333333333501', '22222222-2222-2222-2222-222222222210', 'Module 1: Querying with SELECT & Filters', 1, 'published')
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title;

INSERT INTO lessons (
  id, module_id, course_id, slug, title, sort_order, status,
  estimated_minutes, objectives, content_md, key_points_md, common_mistakes_md,
  starter_code, language, execution_mode, expected_output, editor_enabled
)
VALUES
  (
    '44444444-4444-4444-4444-444444444501',
    '33333333-3333-3333-3333-333333333501',
    '22222222-2222-2222-2222-222222222210',
    'sql-select-and-where',
    'Querying Tables with SELECT and WHERE',
    1,
    'published',
    25,
    '["Write standard SQL SELECT queries to extract specific columns", "Filter records using WHERE clauses and logical operators (AND, OR, NOT)", "Sort results using ORDER BY with ASC and DESC"]'::jsonb,
    '# Querying Relational Databases with SQL\n\nSQL (Structured Query Language) is the universal language used to store, query, and manipulate data across relational database systems.\n\n### The SELECT Statement\nThe `SELECT` statement specifies which columns you wish to retrieve from a table:\n\n```sql\nSELECT title, category, difficulty \nFROM courses\nWHERE category = ''frontend''\nORDER BY sort_order ASC;\n```\n\n### Key Clauses:\n- `FROM`: Identifies the source table.\n- `WHERE`: Filters rows that satisfy a boolean condition.\n- `ORDER BY`: Sorts the returned rows.\n- `LIMIT`: Restricts the maximum number of rows returned.\n\nRun the SQL query on the right to inspect sample developer profiles and their completed courses!',
    '- SQL keywords are case-insensitive by standard convention, but uppercase keywords are best practice.\n- String literals in SQL are enclosed in single quotes `''`.\n- Use `IS NULL` and `IS NOT NULL` to test for null values.',
    '- Using double quotes for string values instead of single quotes.\n- Using `= NULL` instead of `IS NULL`.',
    '-- Real SQL execution environment
-- Sample table "students" is preloaded with data!

SELECT id, name, role, experience_years, status
FROM students
WHERE experience_years >= 2 AND status = ''active''
ORDER BY experience_years DESC;',
    'sql',
    'sql',
    'Tabular result with 3 filtered student records matching criteria.',
    true
  )
ON CONFLICT (course_id, slug) DO UPDATE SET
  title = EXCLUDED.title,
  objectives = EXCLUDED.objectives,
  content_md = EXCLUDED.content_md,
  starter_code = EXCLUDED.starter_code,
  language = EXCLUDED.language,
  execution_mode = EXCLUDED.execution_mode,
  expected_output = EXCLUDED.expected_output,
  editor_enabled = EXCLUDED.editor_enabled;

-- 6. KNOWLEDGE CHECKS & QUESTIONS

-- Knowledge check for Lesson 2 (HTML Document Structure)
INSERT INTO knowledge_checks (
  id, lesson_id, course_id, title, passing_score_percent, blocks_next_lesson, status
)
VALUES (
  '55555555-5555-5555-5555-555555555101',
  '44444444-4444-4444-4444-444444444102',
  '22222222-2222-2222-2222-222222222201',
  'HTML Document Structure Check',
  70,
  false,
  'published'
) ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title;

-- Questions for the Knowledge Check (answer keys protected!)
INSERT INTO knowledge_check_questions (
  id, knowledge_check_id, sort_order, prompt, question_type, choices, correct_choice_id, explanation
)
VALUES
  (
    '66666666-6666-6666-6666-666666666101',
    '55555555-5555-5555-5555-555555555101',
    1,
    'What does the <!DOCTYPE html> declaration at the beginning of an HTML file do?',
    'single_choice',
    '[
      {"id": "a", "label": "It connects the HTML file to external CSS stylesheets."},
      {"id": "b", "label": "It tells the browser that the document is written in modern HTML5."},
      {"id": "c", "label": "It renders an invisible container for JavaScript execution."},
      {"id": "d", "label": "It automatically translates foreign language characters."}
    ]'::jsonb,
    'b',
    'The <!DOCTYPE html> declaration ensures the browser operates in modern HTML5 standards mode rather than quirks mode.'
  ),
  (
    '66666666-6666-6666-6666-666666666102',
    '55555555-5555-5555-5555-555555555101',
    2,
    'Where should visible elements like <h1>, <p>, and <button> be placed inside an HTML document?',
    'single_choice',
    '[
      {"id": "a", "label": "Inside the <head> element alongside meta tags"},
      {"id": "b", "label": "Directly before the <!DOCTYPE html> declaration"},
      {"id": "c", "label": "Inside the <body> element"},
      {"id": "d", "label": "Inside an external JSON file"}
    ]'::jsonb,
    'c',
    'The <body> element encapsulates all visible, rendered content of a web page.'
  ),
  (
    '66666666-6666-6666-6666-666666666103',
    '55555555-5555-5555-5555-555555555101',
    3,
    'Which of the following is considered best practice for heading levels on a single page?',
    'single_choice',
    '[
      {"id": "a", "label": "Use at least five <h1> tags per section for emphasis"},
      {"id": "b", "label": "Use exactly one main <h1> per page for accessibility and document hierarchy"},
      {"id": "c", "label": "Skip <h2> and jump directly from <h1> to <h4>"},
      {"id": "d", "label": "Avoid using <h1> headings altogether"}
    ]'::jsonb,
    'b',
    'Having a single <h1> heading establishes a clear document title for assistive readers and search engine indexers.'
  )
ON CONFLICT (id) DO UPDATE SET
  prompt = EXCLUDED.prompt,
  choices = EXCLUDED.choices,
  correct_choice_id = EXCLUDED.correct_choice_id,
  explanation = EXCLUDED.explanation;

-- 7. LESSON RESOURCES
INSERT INTO lesson_resources (id, lesson_id, type, title, url, sort_order, is_optional)
VALUES
  (
    '77777777-7777-7777-7777-777777777101',
    '44444444-4444-4444-4444-444444444102',
    'docs',
    'MDN Web Docs: Anatomy of an HTML document',
    'https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Getting_started',
    1,
    true
  ),
  (
    '77777777-7777-7777-7777-777777777102',
    '44444444-4444-4444-4444-444444444102',
    'article',
    'W3C HTML5 Specification Overview',
    'https://www.w3.org/TR/html52/',
    2,
    true
  )
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title;
