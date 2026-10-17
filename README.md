# StackForge — Modern Full-Stack Learning Platform

StackForge is a full-stack developer learning platform designed to help students and beginners master web development and backend technologies through structured courses, hands-on coding workspaces, real sandboxed execution, secure knowledge checks, and persistent learning progress.

---

## 1. Features Implemented

- **Structured 12-Course Curriculum**:
  1. HTML Fundamentals (`html-fundamentals`)
  2. CSS Fundamentals (`css-fundamentals`)
  3. JavaScript Fundamentals (`javascript-fundamentals`)
  4. Git and Version Control (`git-fundamentals`)
  5. npm and Package Management (`npm-fundamentals`)
  6. TypeScript Fundamentals (`typescript-fundamentals`)
  7. React Fundamentals (`react-fundamentals`)
  8. Node.js Fundamentals (`nodejs-fundamentals`)
  9. Express.js Fundamentals (`express-fundamentals`)
  10. SQL Fundamentals (`sql-fundamentals`)
  11. PostgreSQL Fundamentals (`postgresql-fundamentals`)
  12. MySQL Fundamentals (`mysql-fundamentals`)
- **Primary Learning Path**:
  - Full-Stack Developer Path with ordered step progression, status tracking, and 5-step featured preview on the Learn Dashboard.
- **Interactive Coding Workspace**:
  - Full Monaco Editor integration with syntax highlighting, word wrap, and line numbers.
  - Reset to starter template with safety confirmation modal.
  - Stale-write protection with atomic revision checks.
  - Debounced autosave to avoid unnecessary database writes.
- **Genuine Sandboxed Code Execution**:
  - **HTML/CSS Previews**: Sandboxed `iframe` rendering with strict isolation policy (`sandbox="allow-scripts"`), viewport mode toggle (Desktop / Mobile).
  - **JavaScript / TypeScript**: Isolated Web Worker execution with 3000ms infinite loop timeout, console message capture (`log`, `warn`, `error`, `info`), structured output, and runtime exception catching.
  - **SQL Engine**: In-browser SQLite WebAssembly (`sql.js` + `/sql-wasm.wasm`) preloaded with relational sample tables (`students`, `courses`, `enrollments`), rendering live tabular results with zero network latency and zero production database risk.
  - **Guided Workflows**: Interactive terminal simulation for Git and npm commands (`git init`, `git add`, `git commit`, `npm install`).
- **Knowledge Checks & Assessment**:
  - Questions are fetched without revealing `correct_choice_id` prior to submission.
  - Server-evaluated grading (RPC `submit_knowledge_check`) calculates scores, percentages, and passing status.
  - Detailed per-question feedback with correct answers and explanations after submission.
  - Non-blocking navigation: assessments do not block the Next Lesson button.
- **Progress & Daily Streaks**:
  - Atomic `mark_lesson_complete` operation updating lesson progress, overall course percentage, and UTC calendar day streak (`learning_activity_days`).
  - Celebration confetti animations on course/lesson completion and passed quizzes.
- **Authentication**:
  - Supabase Auth integration for signup, login, session persistence, and profile creation.
  - Seamless local demo resilience when Supabase credentials have not yet been configured in `.env`.

---

## 2. Routes & Navigation

| Route | Description |
|---|---|
| `/` | **Home Page** with hero, platform features, code preview, and 12-stage roadmap |
| `/login` | **Login** with Supabase Auth and redirect preservation |
| `/signup` | **Sign Up** with full name, email, password, and profile creation |
| `/learn` | **Learn Dashboard** with greeting, continue learning card, filters, and catalog |
| `/courses/:slug` | **Course Detail** with curriculum modules, prerequisites, and outcomes |
| `/learn/:courseSlug/:lessonSlug` | **Lesson Workspace** with Monaco editor, live execution, and quiz |
| `/learning-paths` | **Full-Stack Developer Path** 12-stage curriculum overview |
| `/profile` | **User Profile** with streak, stats, and security architecture status |

---

## 3. Database Architecture & Migrations

All migrations are located in `supabase/migrations/`:
- `supabase/migrations/20261016000000_stackforge_initial_schema.sql`:
  - **Enums**: `course_category`, `difficulty_level`, `publish_status`, `prerequisite_kind`, `progress_status`, `execution_mode`, `question_type`, `resource_type`.
  - **15 Tables**: `profiles`, `courses`, `course_prerequisites`, `course_modules`, `lessons`, `lesson_resources`, `learning_paths`, `learning_path_steps`, `user_course_progress`, `lesson_progress`, `lesson_code_drafts`, `learning_activity_days`, `knowledge_checks`, `knowledge_check_questions`, `knowledge_check_attempts`.
  - **Database Views**:
    - `v_published_courses`: Aggregates published course catalog with lesson count and duration.
    - `v_user_course_card`: Combines published catalog with the authenticated user's progress.
  - **Secure Functions (`SECURITY DEFINER`)**:
    - `handle_new_user()`: Automatic profile trigger on user signup.
    - `save_lesson_draft(p_lesson_id, p_code, p_revision)`: Atomic draft revision guard.
    - `mark_lesson_complete(p_lesson_id)`: Atomic completion, course progress, and UTC activity streak upsert.
    - `get_knowledge_check_for_lesson(p_lesson_id)`: Secure question loader without answer keys.
    - `submit_knowledge_check(p_check_id, p_answers)`: Server-side grading, attempt persistence, and breakdown.
  - **Row Level Security (RLS)**: Public read for published courses and curriculum; private read/write for user progress, drafts, activity, and quiz attempts.
- `supabase/migrations/20261016000001_stackforge_seed_data.sql`:
  - Complete seed data for the 12 Full-Stack courses, modules, lessons, starter code templates, soft prerequisites, and knowledge checks.

---

## 4. How to Run Locally

### Prerequisites
- Node.js (v18+)

### Steps
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

3. Build production bundle:
   ```bash
   npm run build
   ```

---

## 5. How to Connect Your Supabase Project

1. Create a project at [supabase.com](https://supabase.com).
2. In the Supabase SQL Editor, run the two migration files in order:
   - `supabase/migrations/20261016000000_stackforge_initial_schema.sql`
   - `supabase/migrations/20261016000001_stackforge_seed_data.sql`
3. Copy your project URL and Anon Key from **Project Settings -> API**.
4. In `.env`, add your credentials:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```
5. Restart your dev server (`npm run dev`). StackForge will automatically switch from local demo mode to your live Supabase cloud database!
