import type { CourseModule, Lesson } from '../../types/database';

export const GIT_COURSE_ID = '22222222-2222-2222-2222-222222222204';
export const NPM_COURSE_ID = '22222222-2222-2222-2222-222222222205';

export const TOOLS_MODULES: CourseModule[] = [
  // Git Modules
  {
    id: '33333333-3333-3333-3333-333333333401',
    course_id: GIT_COURSE_ID,
    title: 'Module 1: Repositories, Commits & Staging',
    sort_order: 1,
    status: 'published'
  },
  {
    id: '33333333-3333-3333-3333-333333333402',
    course_id: GIT_COURSE_ID,
    title: 'Module 2: Branching, Merging & Conflicts',
    sort_order: 2,
    status: 'published'
  },
  {
    id: '33333333-3333-3333-3333-333333333403',
    course_id: GIT_COURSE_ID,
    title: 'Module 3: Remotes & GitHub Collaboration',
    sort_order: 3,
    status: 'published'
  },

  // npm Modules
  {
    id: '33333333-3333-3333-3333-333333333501',
    course_id: NPM_COURSE_ID,
    title: 'Module 1: Package Management & Automation Scripts',
    sort_order: 1,
    status: 'published'
  },
  {
    id: '33333333-3333-3333-3333-333333333502',
    course_id: NPM_COURSE_ID,
    title: 'Module 2: Dependencies & Semantic Versioning',
    sort_order: 2,
    status: 'published'
  }
];

export const TOOLS_LESSONS: Lesson[] = [
  // ==========================================
  // GIT LESSONS (1 - 8)
  // ==========================================
  {
    id: '44444444-4444-4444-4444-444444444401',
    module_id: '33333333-3333-3333-3333-333333333401',
    course_id: GIT_COURSE_ID,
    slug: 'git-intro-and-config',
    title: 'Git Introduction & Configuration',
    sort_order: 1,
    status: 'published',
    estimated_minutes: 15,
    objectives: [
      'Understand Distributed Version Control systems (DVCS)',
      'Configure global username and email credentials with git config',
      'Inspect configuration settings with git config --list'
    ],
    content_md: `## What is Git?

**Git** is a free and open-source distributed version control system designed to handle everything from small to very large projects with speed and efficiency.

Unlike older centralized systems, every Git clone is a full-fledged repository with complete history and tracking capabilities.

## Essential Configuration Commands:
\`\`\`bash
git config --global user.name "Jane Developer"
git config --global user.email "jane@example.com"
git config --global init.defaultBranch main
\`\`\``,
    key_points_md: `- Git tracks changes over time like a timeline save system.
- Always configure your name and email so commit author history is attributed accurately.`,
    common_mistakes_md: `- Forgetting to configure \`user.name\` or \`user.email\`, resulting in commits labeled as generic system users.`,
    starter_code: `# Set developer identity
git config --global user.name "Jane Developer"
git config --global user.email "jane@example.com"
git config --list`,
    solution_code: `# Set developer identity
git config --global user.name "Jane Developer"
git config --global user.email "jane@example.com"
git config --list`,
    execution_mode: 'guided',
    language: 'shell',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444402',
    module_id: '33333333-3333-3333-3333-333333333401',
    course_id: GIT_COURSE_ID,
    slug: 'git-init-staging-commit',
    title: 'Initializing & Staging: git init & git add',
    sort_order: 2,
    status: 'published',
    estimated_minutes: 20,
    objectives: [
      'Initialize new repositories with git init',
      'Check working tree status with git status',
      'Stage modified and new files with git add'
    ],
    content_md: `## The 3 Trees of Git

Git manages code across 3 separate states:
1. **Working Directory**: The actual files on your computer filesystem.
2. **Staging Area (Index)**: Files prepared and formatted to be committed into the next snapshot.
3. **Repository (HEAD)**: Commits permanently recorded in project history.

## Core Commands:
\`\`\`bash
git init          # Creates .git repository folder
git status        # Shows untracked and modified files
git add index.html # Stages specific file
git add .         # Stages all modified and new files
\`\`\``,
    key_points_md: `- \`git init\` turns any local folder into a Git repository.
- Use \`git status\` constantly to see what is staged vs unstaged.`,
    common_mistakes_md: `- Running \`git init\` inside a subfolder of an existing repository.`,
    starter_code: `git init
git status
git add .
git status`,
    solution_code: `git init
git status
git add .
git status`,
    execution_mode: 'guided',
    language: 'shell',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444403',
    module_id: '33333333-3333-3333-3333-333333333401',
    course_id: GIT_COURSE_ID,
    slug: 'git-staging-committing',
    title: 'Commits: git commit & Best Practices',
    sort_order: 3,
    status: 'published',
    estimated_minutes: 20,
    objectives: [
      'Record permanent project snapshots with git commit -m',
      'Write informative, standardized Conventional Commits',
      'Avoid committing temporary files using .gitignore'
    ],
    content_md: `## Creating a Commit

A commit is a permanent snapshot of your staged files in Git history:

\`\`\`bash
git commit -m "feat: add user login form and validation"
\`\`\`

## Writing Great Commit Messages
Follow the **Conventional Commits** standard:
- \`feat:\` New feature for the user.
- \`fix:\` Bug fix for the user.
- \`docs:\` Changes to documentation only.
- \`refactor:\` Refactoring production code without changing behavior.
- \`style:\` Formatting, missing semicolons, etc.`,
    key_points_md: `- Commits are permanent snapshots with a unique SHA-1 hash.
- Write commit messages in the imperative present tense (e.g. "feat: add...", not "added...").`,
    common_mistakes_md: `- Writing vague commit messages like "updates", "fixed stuff", or "asdf".`,
    starter_code: `git add .
git commit -m "feat: initial project scaffolding with semantic HTML"`,
    solution_code: `git add .
git commit -m "feat: initial project scaffolding with semantic HTML"`,
    execution_mode: 'guided',
    language: 'shell',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444404',
    module_id: '33333333-3333-3333-3333-333333333401',
    course_id: GIT_COURSE_ID,
    slug: 'git-log-and-history',
    title: 'Git Log & History Inspection',
    sort_order: 4,
    status: 'published',
    estimated_minutes: 15,
    objectives: [
      'View repository commit logs with git log',
      'Format compact visual trees with git log --oneline --graph',
      'Inspect diff changes with git diff'
    ],
    content_md: `## Inspecting Git History

- \`git log\`: Lists commits in reverse chronological order with author, date, and full message.
- \`git log --oneline\`: Shows compact 7-character commit SHA hashes on a single line.
- \`git diff\`: Shows line-by-line additions and deletions before staging.`,
    key_points_md: `- \`git log --oneline\` is the fastest way to view recent commits.
- Press \`q\` in terminal if \`git log\` enters a paginated view.`,
    common_mistakes_md: `- Getting stuck in the terminal pager because of forgetting \`q\` exits git log.`,
    starter_code: `git log --oneline`,
    solution_code: `git log --oneline`,
    execution_mode: 'guided',
    language: 'shell',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444405',
    module_id: '33333333-3333-3333-3333-333333333402',
    course_id: GIT_COURSE_ID,
    slug: 'git-branching-merging',
    title: 'Branching: git branch & git switch',
    sort_order: 1,
    status: 'published',
    estimated_minutes: 20,
    objectives: [
      'Understand isolated parallel branch workflows',
      'Create and switch branches with git switch -c or git checkout -b',
      'List local and remote branches with git branch'
    ],
    content_md: `## What are Git Branches?

Branches allow you to diverge from the main line of development and continue work without affecting production code.

\`\`\`bash
git branch                     # List all local branches
git switch -c feature/auth     # Create and switch to new branch
# (Old syntax: git checkout -b feature/auth)
\`\`\``,
    key_points_md: `- Keep \`main\` clean and deployable.
- Develop all new features and bug fixes on isolated feature branches.`,
    common_mistakes_md: `- Committing untested experimental code directly to the \`main\` branch.`,
    starter_code: `git branch
git switch -c feature/dark-mode
git branch`,
    solution_code: `git branch
git switch -c feature/dark-mode
git branch`,
    execution_mode: 'guided',
    language: 'shell',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444406',
    module_id: '33333333-3333-3333-3333-333333333402',
    course_id: GIT_COURSE_ID,
    slug: 'git-merge-conflicts',
    title: 'Merging Branches & Conflict Resolution',
    sort_order: 2,
    status: 'published',
    estimated_minutes: 20,
    objectives: [
      'Merge feature branches into main with git merge',
      'Understand fast-forward vs 3-way merges',
      'Identify and resolve merge conflict conflict markers (<<<<<<<, =======, >>>>>>>)'
    ],
    content_md: `## Merging Branches

Once your feature branch is tested, merge it into \`main\`:
\`\`\`bash
git switch main
git merge feature/auth
\`\`\`

## What Causes Merge Conflicts?
When two branches modify the **exact same lines of code** in different ways, Git cannot guess which version is correct. It pauses and marks the conflict:

\`\`\`
<<<<<<< HEAD (Current change on main)
const theme = "dark";
=======
const theme = "system";
>>>>>>> feature/theme (Incoming change)
\`\`\`
Edit the file to pick the correct code, remove the conflict markers, then \`git add\` and \`git commit\` to finish the merge!`,
    key_points_md: `- Switch to the destination branch before running \`git merge\`.
- Conflicts are normal in collaborative software; simply select the desired lines and commit.`,
    common_mistakes_md: `- Committing unresolved conflict markers into production code.`,
    starter_code: `git switch main
git merge feature/auth`,
    solution_code: `git switch main
git merge feature/auth`,
    execution_mode: 'guided',
    language: 'shell',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444407',
    module_id: '33333333-3333-3333-3333-333333333403',
    course_id: GIT_COURSE_ID,
    slug: 'git-remotes-collaboration',
    title: 'Working with Remotes: git push & git pull',
    sort_order: 1,
    status: 'published',
    estimated_minutes: 20,
    objectives: [
      'Connect local repositories to GitHub remotes with git remote add origin',
      'Push commits to cloud repositories with git push -u origin main',
      'Fetch and integrate team updates with git pull'
    ],
    content_md: `## Git Remote Repositories

A remote repository is hosted on the Internet or network (like GitHub, GitLab, or Bitbucket).

\`\`\`bash
# Link local repo to GitHub
git remote add origin https://github.com/username/project.git

# Push changes and set upstream tracking
git push -u origin main

# Pull latest commits from teammates
git pull origin main
\`\`\``,
    key_points_md: `- \`origin\` is the conventional alias for your primary remote repository.
- Always \`git pull\` before starting new work to stay in sync with teammates.`,
    common_mistakes_md: `- Pushing with \`--force\` onto shared branches, overwriting teammates' work.`,
    starter_code: `git status
git pull origin main`,
    solution_code: `git status
git pull origin main`,
    execution_mode: 'guided',
    language: 'shell',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444408',
    module_id: '33333333-3333-3333-3333-333333333403',
    course_id: GIT_COURSE_ID,
    slug: 'github-pull-requests',
    title: 'GitHub Pull Requests & Code Reviews',
    sort_order: 2,
    status: 'published',
    estimated_minutes: 20,
    objectives: [
      'Understand the Pull Request (PR) collaboration workflow',
      'Conduct peer code reviews and submit line comments',
      'Merge PRs using Squash and Merge or Rebase workflows'
    ],
    content_md: `## The Pull Request (PR) Workflow

In engineering teams, developers never push directly to \`main\`. Instead:
1. Create a feature branch (\`feature/payment-gateway\`).
2. Commit code and push branch to GitHub (\`git push origin feature/payment-gateway\`).
3. Open a **Pull Request (PR)** on GitHub asking teammates to review changes.
4. Automated tests (CI/CD) run to verify builds.
5. Teammates review code, request improvements, or approve.
6. The PR is merged into \`main\`!`,
    key_points_md: `- Pull Requests provide a transparent record of why code changed.
- Automated CI tests run on PRs before code touches production.`,
    common_mistakes_md: `- Opening enormous 2,000-line PRs; smaller PRs (under 300 lines) are reviewed faster with fewer bugs.`,
    starter_code: `# Typical developer pull request sequence
git switch -c feature/oauth-login
git add .
git commit -m "feat: integrate Google OAuth authentication"`,
    solution_code: `# Typical developer pull request sequence
git switch -c feature/oauth-login
git add .
git commit -m "feat: integrate Google OAuth authentication"`,
    execution_mode: 'guided',
    language: 'shell',
    editor_enabled: true
  },

  // ==========================================
  // NPM LESSONS (1 - 5)
  // ==========================================
  {
    id: '44444444-4444-4444-4444-444444444501',
    module_id: '33333333-3333-3333-3333-333333333501',
    course_id: NPM_COURSE_ID,
    slug: 'npm-intro-and-setup',
    title: 'Introduction to npm & Node Package Manager',
    sort_order: 1,
    status: 'published',
    estimated_minutes: 15,
    objectives: [
      'Understand npm as the world\'s largest software registry',
      'Verify installed versions with npm -v and node -v',
      'Explore global vs local packages'
    ],
    content_md: `## What is npm?

**npm** stands for **N**ode **P**ackage **M**anager. It is the default package manager for JavaScript and the Node.js runtime environment.

npm consists of three distinct components:
1. **The Website**: To discover packages and set up profiles.
2. **The Command Line Interface (CLI)**: Runs in your terminal to install and manage tools.
3. **The Registry**: An enormous public database of JavaScript software.`,
    key_points_md: `- npm comes bundled automatically when you install Node.js.
- Local packages install into \`node_modules\` inside your current project.`,
    common_mistakes_md: `- Installing project dependencies globally (\`-g\`) instead of locally.`,
    starter_code: `npm -v`,
    solution_code: `npm -v`,
    execution_mode: 'guided',
    language: 'shell',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444502',
    module_id: '33333333-3333-3333-3333-333333333501',
    course_id: NPM_COURSE_ID,
    slug: 'npm-init-package-json',
    title: 'Creating package.json with npm init',
    sort_order: 2,
    status: 'published',
    estimated_minutes: 15,
    objectives: [
      'Generate project manifests with npm init and npm init -y',
      'Anatomy of package.json: name, version, main, dependencies, and scripts',
      'Configure ES Modules with "type": "module"'
    ],
    content_md: `## The Project Manifest: \`package.json\`

The \`package.json\` file is the heart of any Node.js project. It records the metadata and dependencies required to build and run your application.

\`\`\`bash
npm init -y # Creates package.json with default values instantly!
\`\`\`

### Anatomy:
\`\`\`json
{
  "name": "my-app",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  },
  "dependencies": {
    "react": "^18.2.0"
  }
}
\`\`\``,
    key_points_md: `- Never delete \`package.json\`; it is required to restore dependencies with \`npm install\`.
- Set \`"type": "module"\` to use modern \`import / export\` syntax.`,
    common_mistakes_md: `- Committing \`node_modules/\` to Git; only commit \`package.json\` and \`package-lock.json\`!`,
    starter_code: `npm init -y`,
    solution_code: `npm init -y`,
    execution_mode: 'guided',
    language: 'shell',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444503',
    module_id: '33333333-3333-3333-3333-333333333501',
    course_id: NPM_COURSE_ID,
    slug: 'npm-automation-scripts',
    title: 'Custom npm Automation Scripts',
    sort_order: 3,
    status: 'published',
    estimated_minutes: 15,
    objectives: [
      'Define automation tasks in the "scripts" object',
      'Run standard scripts: npm start, npm test',
      'Run custom scripts with npm run <script-name>'
    ],
    content_md: `## Automating Tasks with npm Scripts

The \`scripts\` property in \`package.json\` allows you to define custom terminal commands:

\`\`\`json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js",
  "lint": "oxlint src/",
  "build": "tsc && vite build"
}
\`\`\`

- For \`start\` and \`test\`, you can type: \`npm start\` or \`npm test\`.
- For any other script, prefix with \`run\`: \`npm run dev\`, \`npm run build\`.`,
    key_points_md: `- npm scripts eliminate the need to memorize complex CLI tool flags.
- Anyone can clone your repo and run \`npm run dev\` immediately.`,
    common_mistakes_md: `- Forgetting \`run\` when executing custom scripts (\`npm dev\` instead of \`npm run dev\`).`,
    starter_code: `npm run start`,
    solution_code: `npm run start`,
    execution_mode: 'guided',
    language: 'shell',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444504',
    module_id: '33333333-3333-3333-3333-333333333502',
    course_id: NPM_COURSE_ID,
    slug: 'npm-installing-packages',
    title: 'Installing Packages: dependencies vs devDependencies',
    sort_order: 1,
    status: 'published',
    estimated_minutes: 20,
    objectives: [
      'Install production packages with npm install <package>',
      'Install development tooling with npm install --save-dev <package>',
      'Understand the role of the node_modules folder'
    ],
    content_md: `## Installing Dependencies

- **Production Dependencies (\`dependencies\`)**: Packages needed in production runtime (e.g. Express, React, Lodash):
  \`\`\`bash
  npm install express
  \`\`\`
- **Development Dependencies (\`devDependencies\`)**: Tools only needed while coding (e.g. TypeScript, Vite, ESLint):
  \`\`\`bash
  npm install -D typescript
  \`\`\``,
    key_points_md: `- Use \`-D\` or \`--save-dev\` for compilers, linters, and bundlers.
- Always include \`node_modules\` in your \`.gitignore\`.`,
    common_mistakes_md: `- Installing heavy developer tools as production dependencies, inflating production deployment sizes.`,
    starter_code: `npm install express
npm install -D typescript`,
    solution_code: `npm install express
npm install -D typescript`,
    execution_mode: 'guided',
    language: 'shell',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444505',
    module_id: '33333333-3333-3333-3333-333333333502',
    course_id: NPM_COURSE_ID,
    slug: 'npm-semantic-versioning',
    title: 'Semantic Versioning & package-lock.json',
    sort_order: 2,
    status: 'published',
    estimated_minutes: 15,
    objectives: [
      'Understand SemVer (MAJOR.MINOR.PATCH)',
      'Interpret version prefixes: ^ (caret) vs ~ (tilde)',
      'The deterministic role of package-lock.json and npm ci'
    ],
    content_md: `## Semantic Versioning (SemVer)

npm uses Semantic Versioning: \`MAJOR.MINOR.PATCH\` (e.g. \`18.2.4\`)
- **MAJOR** (\`18.0.0\`): Breaking API changes.
- **MINOR** (\`18.2.0\`): New features, backward-compatible.
- **PATCH** (\`18.2.4\`): Bug fixes, backward-compatible.

### Prefixes:
- \`^18.2.0\` (Caret): Allows MINOR and PATCH updates (e.g. installs \`18.3.0\`, but NOT \`19.0.0\`).
- \`~18.2.0\` (Tilde): Allows PATCH updates only (e.g. installs \`18.2.5\`).

## The \`package-lock.json\`
Pins exact dependency trees so your teammate gets the **exact byte-for-byte same packages** as you! In CI/CD, always run \`npm ci\` instead of \`npm install\`.`,
    key_points_md: `- Never manually edit \`package-lock.json\`.
- Always commit \`package-lock.json\` to Git.`,
    common_mistakes_md: `- Deleting \`package-lock.json\` when debugging dependency conflicts.`,
    starter_code: `npm install lodash
cat package.json`,
    solution_code: `npm install lodash
cat package.json`,
    execution_mode: 'guided',
    language: 'shell',
    editor_enabled: true
  }
];
