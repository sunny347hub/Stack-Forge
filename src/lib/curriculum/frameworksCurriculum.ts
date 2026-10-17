import type { CourseModule, Lesson } from '../../types/database';

export const TS_COURSE_ID = '22222222-2222-2222-2222-222222222206';
export const REACT_COURSE_ID = '22222222-2222-2222-2222-222222222207';

export const FRAMEWORKS_MODULES: CourseModule[] = [
  // TypeScript Modules
  {
    id: '33333333-3333-3333-3333-333333333601',
    course_id: TS_COURSE_ID,
    title: 'Module 1: Static Types & Annotations',
    sort_order: 1,
    status: 'published'
  },
  {
    id: '33333333-3333-3333-3333-333333333602',
    course_id: TS_COURSE_ID,
    title: 'Module 2: Interfaces & Type Aliases',
    sort_order: 2,
    status: 'published'
  },
  {
    id: '33333333-3333-3333-3333-333333333603',
    course_id: TS_COURSE_ID,
    title: 'Module 3: Functions, Generics & Utilities',
    sort_order: 3,
    status: 'published'
  },

  // React Modules
  {
    id: '33333333-3333-3333-3333-333333333701',
    course_id: REACT_COURSE_ID,
    title: 'Module 1: Components & JSX',
    sort_order: 1,
    status: 'published'
  },
  {
    id: '33333333-3333-3333-3333-333333333702',
    course_id: REACT_COURSE_ID,
    title: 'Module 2: Props & State',
    sort_order: 2,
    status: 'published'
  },
  {
    id: '33333333-3333-3333-3333-333333333703',
    course_id: REACT_COURSE_ID,
    title: 'Module 3: Conditional Rendering, Lists & Effects',
    sort_order: 3,
    status: 'published'
  }
];

export const FRAMEWORKS_LESSONS: Lesson[] = [
  // ==========================================
  // TYPESCRIPT LESSONS (1 - 8)
  // ==========================================
  {
    id: '44444444-4444-4444-4444-444444444601',
    module_id: '33333333-3333-3333-3333-333333333601',
    course_id: TS_COURSE_ID,
    slug: 'ts-intro-and-benefits',
    title: 'Why TypeScript? Static Typing vs JavaScript',
    sort_order: 1,
    status: 'published',
    estimated_minutes: 15,
    objectives: [
      'Understand how TypeScript acts as a superset of JavaScript',
      'Catch runtime type errors at compile time before deployment',
      'Leverage editor autocomplete and refactoring productivity'
    ],
    content_md: `## What is TypeScript?

**TypeScript** is JavaScript with syntax for types. It was developed by Microsoft and is strongly typed, compiled, and object-oriented.

Browsers do not execute TypeScript directly; the TypeScript compiler (\`tsc\`) type-checks your code and compiles it into clean, compatible JavaScript.

\`\`\`typescript
let message: string = "Hello TypeScript!";
// message = 42; // ❌ Compile Error: Type 'number' is not assignable to type 'string'.
\`\`\``,
    key_points_md: `- TypeScript code compiles to standard JavaScript.
- Type errors are caught in your editor before you run code.`,
    common_mistakes_md: `- Using \`any\` everywhere, defeating the purpose of TypeScript.`,
    starter_code: `let greeting: string = "Hello, TypeScript!";
let count: number = 42;
let isEnrolled: boolean = true;

console.log(greeting, "Count:", count, "Enrolled:", isEnrolled);`,
    solution_code: `let greeting: string = "Hello, TypeScript!";
let count: number = 42;
let isEnrolled: boolean = true;

console.log(greeting, "Count:", count, "Enrolled:", isEnrolled);`,
    execution_mode: 'typescript',
    language: 'typescript',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444602',
    module_id: '33333333-3333-3333-3333-333333333601',
    course_id: TS_COURSE_ID,
    slug: 'ts-primitive-types',
    title: 'Primitive Types, Arrays & Tuples',
    sort_order: 2,
    status: 'published',
    estimated_minutes: 20,
    objectives: [
      'Type primitives: string, number, boolean, symbol, bigint',
      'Define typed arrays: string[] and Array<number>',
      'Use fixed-length tuples: [string, number]'
    ],
    content_md: `## Typed Arrays and Tuples

### 1. Typed Arrays
\`\`\`typescript
const skills: string[] = ["HTML", "CSS", "TypeScript"];
const scores: Array<number> = [95, 88, 92];
\`\`\`

### 2. Tuples
A tuple is a typed array with a pre-defined length and specific types for each index:
\`\`\`typescript
let userSession: [string, number];
userSession = ["jane_doe", 101]; // Correct
// userSession = [101, "jane_doe"]; // ❌ Error!
\`\`\``,
    key_points_md: `- Arrays use \`type[]\` syntax.
- Tuples enforce strict position-based types.`,
    common_mistakes_md: `- Mutating tuple lengths with \`push\` without type-checking.`,
    starter_code: `const tags: string[] = ["frontend", "devops", "cloud"];
const coordinate: [number, number] = [37.7749, -122.4194];

console.log("Tags:", tags.join(", "));
console.log("Latitude:", coordinate[0], "Longitude:", coordinate[1]);`,
    solution_code: `const tags: string[] = ["frontend", "devops", "cloud"];
const coordinate: [number, number] = [37.7749, -122.4194];

console.log("Tags:", tags.join(", "));
console.log("Latitude:", coordinate[0], "Longitude:", coordinate[1]);`,
    execution_mode: 'typescript',
    language: 'typescript',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444603',
    module_id: '33333333-3333-3333-3333-333333333601',
    course_id: TS_COURSE_ID,
    slug: 'ts-inference-any-unknown',
    title: 'Type Inference, any & unknown',
    sort_order: 3,
    status: 'published',
    estimated_minutes: 15,
    objectives: [
      'Leverage smart TypeScript automatic type inference',
      'Understand the risks of any and why unknown is safer',
      'Perform type narrowing with typeof'
    ],
    content_md: `## Type Inference & Safe Unknowns

TypeScript automatically infers types based on assigned values:
\`\`\`typescript
let username = "alex"; // Inferred as string automatically!
\`\`\`

### \`any\` vs \`unknown\`
- **\`any\`**: Disables all type checking (avoids compiler safety).
- **\`unknown\`**: Represents any value, but forces you to perform a type check before using it!

\`\`\`typescript
let userInput: unknown = "https://stackforge.dev";
if (typeof userInput === "string") {
  console.log(userInput.toUpperCase()); // Safe!
}
\`\`\``,
    key_points_md: `- Let TypeScript infer types when obvious.
- Prefer \`unknown\` over \`any\` when dealing with external API payloads.`,
    common_mistakes_md: `- Disabling TypeScript errors by spamming \`: any\`.`,
    starter_code: `let inferredSite = "StackForge";
let rawPayload: unknown = 42;

if (typeof rawPayload === "number") {
  console.log("Calculated:", rawPayload * 2);
}`,
    solution_code: `let inferredSite = "StackForge";
let rawPayload: unknown = 42;

if (typeof rawPayload === "number") {
  console.log("Calculated:", rawPayload * 2);
}`,
    execution_mode: 'typescript',
    language: 'typescript',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444604',
    module_id: '33333333-3333-3333-3333-333333333602',
    course_id: TS_COURSE_ID,
    slug: 'ts-basic-types-interfaces',
    title: 'Interfaces & Object Contracts',
    sort_order: 1,
    status: 'published',
    estimated_minutes: 20,
    objectives: [
      'Define object shapes with interface',
      'Use optional properties (?) and readonly properties',
      'Extend interfaces with interface Child extends Parent'
    ],
    content_md: `## Interfaces in TypeScript

An \`interface\` defines the contract or shape of an object:

\`\`\`typescript
interface UserProfile {
  id: number;
  username: string;
  avatarUrl?: string; // Optional property
  readonly createdAt: Date; // Cannot be reassigned
}

const user: UserProfile = {
  id: 1,
  username: "priya_dev",
  createdAt: new Date()
};
\`\`\`

## Extending Interfaces
\`\`\`typescript
interface AdminUser extends UserProfile {
  permissions: string[];
}
\`\`\``,
    key_points_md: `- Interfaces define clear contracts across your application.
- Use \`?;\` for optional properties.
- Use \`readonly\` for immutable properties.`,
    common_mistakes_md: `- Trying to mutate a \`readonly\` property.`,
    starter_code: `interface Student {
  id: number;
  name: string;
  role: string;
  experienceYears?: number;
}

const student: Student = {
  id: 101,
  name: "Marcus Aurelius",
  role: "Backend Engineer",
  experienceYears: 5
};

console.log("Student:", student.name, "-", student.role);`,
    solution_code: `interface Student {
  id: number;
  name: string;
  role: string;
  experienceYears?: number;
}

const student: Student = {
  id: 101,
  name: "Marcus Aurelius",
  role: "Backend Engineer",
  experienceYears: 5
};

console.log("Student:", student.name, "-", student.role);`,
    execution_mode: 'typescript',
    language: 'typescript',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444605',
    module_id: '33333333-3333-3333-3333-333333333602',
    course_id: TS_COURSE_ID,
    slug: 'ts-unions-type-aliases',
    title: 'Type Aliases, Unions & Literal Types',
    sort_order: 2,
    status: 'published',
    estimated_minutes: 20,
    objectives: [
      'Create type aliases with the type keyword',
      'Build Union Types (|) for multiple acceptable types',
      'Enforce exact string literal values'
    ],
    content_md: `## Type Aliases and Unions

### 1. Type Aliases
\`\`\`typescript
type ID = string | number;
\`\`\`

### 2. String Literal Types
Enforce exact specific string values (like an enum, but simpler):
\`\`\`typescript
type Status = "pending" | "in_progress" | "completed";
let currentStatus: Status = "in_progress"; // Safe!
// currentStatus = "finished"; // ❌ Error!
\`\`\``,
    key_points_md: `- Union types (\`|\`) allow a variable to be one of several types.
- String literal unions eliminate typos in state values.`,
    common_mistakes_md: `- Typoing string literals; TypeScript immediately catches the mistake!`,
    starter_code: `type Theme = "dark" | "light" | "system";
type ExecutionMode = "html_preview" | "javascript" | "sql";

function configureWorkspace(theme: Theme, mode: ExecutionMode) {
  return \`Initialized workspace in \${theme} theme with \${mode} runner.\`;
}

console.log(configureWorkspace("dark", "javascript"));`,
    solution_code: `type Theme = "dark" | "light" | "system";
type ExecutionMode = "html_preview" | "javascript" | "sql";

function configureWorkspace(theme: Theme, mode: ExecutionMode) {
  return \`Initialized workspace in \${theme} theme with \${mode} runner.\`;
}

console.log(configureWorkspace("dark", "javascript"));`,
    execution_mode: 'typescript',
    language: 'typescript',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444606',
    module_id: '33333333-3333-3333-3333-333333333603',
    course_id: TS_COURSE_ID,
    slug: 'ts-function-types',
    title: 'Typing Functions & Return Values',
    sort_order: 1,
    status: 'published',
    estimated_minutes: 15,
    objectives: [
      'Type function parameters and explicit return values',
      'Use the void return type for functions that produce no output',
      'Define function type signatures for callbacks'
    ],
    content_md: `## Typed Functions

\`\`\`typescript
function calculateTotal(price: number, quantity: number): number {
  return price * quantity;
}

const logMessage = (msg: string): void => {
  console.log("[LOG]:", msg);
};
\`\`\``,
    key_points_md: `- Explicit return types catch accidental missing returns.
- Use \`void\` when a function does not return a value.`,
    common_mistakes_md: `- Omitting parameter types; TypeScript defaults them to \`any\` if not specified.`,
    starter_code: `function formatGreeting(name: string, isVip: boolean = false): string {
  return isVip ? \`Greetings, VIP \${name}!\` : \`Hello, \${name}!\`;
}

console.log(formatGreeting("Sarah", true));
console.log(formatGreeting("John"));`,
    solution_code: `function formatGreeting(name: string, isVip: boolean = false): string {
  return isVip ? \`Greetings, VIP \${name}!\` : \`Hello, \${name}!\`;
}

console.log(formatGreeting("Sarah", true));
console.log(formatGreeting("John"));`,
    execution_mode: 'typescript',
    language: 'typescript',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444607',
    module_id: '33333333-3333-3333-3333-333333333603',
    course_id: TS_COURSE_ID,
    slug: 'ts-generics-utility-types',
    title: 'Generics: Reusable Type Functions',
    sort_order: 2,
    status: 'published',
    estimated_minutes: 25,
    objectives: [
      'Understand Generics (<T>) as variables for types',
      'Create generic functions that preserve type relationships',
      'Apply generic constraints with <T extends Object>'
    ],
    content_md: `## What are Generics?

Generics allow you to create reusable components and functions that work across a variety of types rather than a single one:

\`\`\`typescript
function getFirstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}

const firstNumber = getFirstElement([10, 20, 30]); // Type inferred as number!
const firstString = getFirstElement(["a", "b", "c"]); // Type inferred as string!
\`\`\``,
    key_points_md: `- \`<T>\` captures the type passed by the caller.
- Generics preserve exact type information without resorting to \`any\`.`,
    common_mistakes_md: `- Overcomplicating simple types with unnecessary generic parameters.`,
    starter_code: `function wrapInEnvelope<T>(data: T) {
  return {
    timestamp: Date.now(),
    payload: data
  };
}

const stringEnvelope = wrapInEnvelope("User profile loaded");
const numberEnvelope = wrapInEnvelope(200);

console.log("String payload:", stringEnvelope.payload);
console.log("Number payload:", numberEnvelope.payload);`,
    solution_code: `function wrapInEnvelope<T>(data: T) {
  return {
    timestamp: Date.now(),
    payload: data
  };
}

const stringEnvelope = wrapInEnvelope("User profile loaded");
const numberEnvelope = wrapInEnvelope(200);

console.log("String payload:", stringEnvelope.payload);
console.log("Number payload:", numberEnvelope.payload);`,
    execution_mode: 'typescript',
    language: 'typescript',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444608',
    module_id: '33333333-3333-3333-3333-333333333603',
    course_id: TS_COURSE_ID,
    slug: 'ts-utility-types',
    title: 'Built-in Utility Types: Partial, Pick, Omit',
    sort_order: 3,
    status: 'published',
    estimated_minutes: 20,
    objectives: [
      'Use Partial<T> to make all properties optional',
      'Extract specific fields with Pick<T, Keys>',
      'Exclude sensitive fields with Omit<T, Keys>'
    ],
    content_md: `## TypeScript Utility Types

TypeScript provides several utility types to facilitate common type transformations:

| Utility | Description | Example |
| :--- | :--- | :--- |
| \`Partial<T>\` | Makes all properties in \`T\` optional | \`updateUser(id, data: Partial<User>)\` |
| \`Required<T>\` | Makes all properties in \`T\` required | |
| \`Readonly<T>\` | Makes all properties in \`T\` readonly | |
| \`Pick<T, K>\` | Selects a subset of properties \`K\` from \`T\` | \`Pick<User, 'id' | 'name'>\` |
| \`Omit<T, K>\` | Removes properties \`K\` from \`T\` | \`Omit<User, 'passwordHash'>\` |`,
    key_points_md: `- \`Partial<T>\` is essential for patch/update API endpoints.
- \`Omit<T, 'secret'>\` prevents accidental leakage of sensitive fields.`,
    common_mistakes_md: `- Creating duplicate interfaces manually instead of using \`Pick\` or \`Omit\`.`,
    starter_code: `interface LessonData {
  id: string;
  title: string;
  content: string;
  isPublished: boolean;
}

// Updating only partial fields
type LessonPatch = Partial<LessonData>;

function applyUpdate(lesson: LessonData, patch: LessonPatch): LessonData {
  return { ...lesson, ...patch };
}

const current: LessonData = { id: "1", title: "HTML Basics", content: "...", isPublished: false };
const updated = applyUpdate(current, { isPublished: true });
console.log("Published status:", updated.isPublished);`,
    solution_code: `interface LessonData {
  id: string;
  title: string;
  content: string;
  isPublished: boolean;
}

// Updating only partial fields
type LessonPatch = Partial<LessonData>;

function applyUpdate(lesson: LessonData, patch: LessonPatch): LessonData {
  return { ...lesson, ...patch };
}

const current: LessonData = { id: "1", title: "HTML Basics", content: "...", isPublished: false };
const updated = applyUpdate(current, { isPublished: true });
console.log("Published status:", updated.isPublished);`,
    execution_mode: 'typescript',
    language: 'typescript',
    editor_enabled: true
  },

  // ==========================================
  // REACT LESSONS (1 - 9)
  // ==========================================
  {
    id: '44444444-4444-4444-4444-444444444701',
    module_id: '33333333-3333-3333-3333-333333333701',
    course_id: REACT_COURSE_ID,
    slug: 'react-intro-and-jsx',
    title: 'Introduction to React & Virtual DOM',
    sort_order: 1,
    status: 'published',
    estimated_minutes: 20,
    objectives: [
      'Understand React component architecture and declarative UI',
      'Learn how the Virtual DOM and reconciliation pipeline work',
      'Master JSX syntax rules: single parent, className, and self-closing tags'
    ],
    content_md: `## What is React?

**React** is a JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called **components**.

## What is JSX?
JSX is a syntax extension for JavaScript that looks like HTML:

\`\`\`jsx
function Welcome() {
  return (
    <div className="card">
      <h1>Hello, React 19!</h1>
    </div>
  );
}
\`\`\`

### 3 Core JSX Rules:
1. **Return a single root element**: Wrap in a \`<div>\` or Fragment \`<>\`.
2. **Use \`className\` instead of \`class\`** (class is a reserved JavaScript keyword).
3. **Close all tags**: \`<img />\`, \`<br />\`, \`<input />\`.`,
    key_points_md: `- React builds interactive UIs with reusable components.
- The Virtual DOM minimizes slow direct browser DOM re-paints.
- JSX requires \`className\` and self-closing tags.`,
    common_mistakes_md: `- Returning multiple sibling JSX elements without a wrapping parent tag or Fragment \`<>\`.`,
    starter_code: `function App() {
  const course = "React Mastery";
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: '20px', background: '#0f172a', color: 'white', borderRadius: '12px' }}>
      <h1 style={{ color: '#ff7020' }}>Welcome to {course}</h1>
      <p>React makes building modern interactive user interfaces delightful.</p>
    </div>
  );
}`,
    solution_code: `function App() {
  const course = "React Mastery";
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: '20px', background: '#0f172a', color: 'white', borderRadius: '12px' }}>
      <h1 style={{ color: '#ff7020' }}>Welcome to {course}</h1>
      <p>React makes building modern interactive user interfaces delightful.</p>
      <button style={{ background: '#ff7020', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', fontWeight: 'bold' }}>
        Get Started
      </button>
    </div>
  );
}`,
    execution_mode: 'react_preview',
    language: 'javascript',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444702',
    module_id: '33333333-3333-3333-3333-333333333701',
    course_id: REACT_COURSE_ID,
    slug: 'react-components-and-props',
    title: 'Functional Components & JSX Expressions',
    sort_order: 2,
    status: 'published',
    estimated_minutes: 20,
    objectives: [
      'Write pure functional components',
      'Embed dynamic JavaScript expressions inside JSX with {}',
      'Render inline styles using JavaScript objects'
    ],
    content_md: `## Dynamic JavaScript in JSX

Inside JSX, any JavaScript expression can be evaluated inside curly braces \`{ ... }\`:

\`\`\`jsx
function UserCard() {
  const username = "Jane Developer";
  const unreadCount = 4;

  return (
    <div>
      <h2>User: {username.toUpperCase()}</h2>
      <p>You have {unreadCount * 2} notifications.</p>
    </div>
  );
}
\`\`\``,
    key_points_md: `- Use curly braces \`{}\` to inject any JavaScript variable or expression into JSX.
- Inline styles use double curly braces: \`style={{ color: '#ff7020' }}\`.`,
    common_mistakes_md: `- Putting statements (like \`if\` or \`for\` loops) inside JSX curly braces instead of expressions.`,
    starter_code: `function App() {
  const student = { name: "Priya", score: 95 };
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Student Progress: {student.name}</h2>
      <p>Score: {student.score}% (Status: {student.score >= 70 ? 'Passed' : 'Needs Review'})</p>
    </div>
  );
}`,
    solution_code: `function App() {
  const student = { name: "Priya", score: 95 };
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Student Progress: {student.name}</h2>
      <p>Score: {student.score}% (Status: {student.score >= 70 ? 'Passed' : 'Needs Review'})</p>
    </div>
  );
}`,
    execution_mode: 'react_preview',
    language: 'javascript',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444703',
    module_id: '33333333-3333-3333-3333-333333333701',
    course_id: REACT_COURSE_ID,
    slug: 'react-component-composition',
    title: 'Composing & Nesting Components',
    sort_order: 3,
    status: 'published',
    estimated_minutes: 20,
    objectives: [
      'Break complex interfaces into small, single-responsibility components',
      'Compose parent and child components cleanly',
      'Pass JSX children with props.children'
    ],
    content_md: `## Component Composition

Components can refer to other components in their output. This lets us use the same component abstraction for any level of detail:

\`\`\`jsx
function Header() {
  return <header><h1>StackForge</h1></header>;
}

function App() {
  return (
    <div>
      <Header />
      <main><p>Page content here</p></main>
    </div>
  );
}
\`\`\``,
    key_points_md: `- React applications are trees of nested components.
- React component names MUST always begin with a Capital Letter (e.g. \`Header\`, not \`header\`).`,
    common_mistakes_md: `- Starting component names with lowercase, causing React to treat them as raw HTML tags!`,
    starter_code: `function Badge({ text }) {
  return <span style={{ background: '#ff7020', color: 'white', padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold' }}>{text}</span>;
}

function CourseCard({ title, tag }) {
  return (
    <div style={{ border: '1px solid #334155', padding: '16px', borderRadius: '8px', margin: '8px 0', background: '#1e293b', color: 'white' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>{title}</h3>
        <Badge text={tag} />
      </div>
    </div>
  );
}

function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Curriculum Modules</h2>
      <CourseCard title="HTML Fundamentals" tag="Beginner" />
      <CourseCard title="React & Next.js" tag="Advanced" />
    </div>
  );
}`,
    solution_code: `function Badge({ text }) {
  return <span style={{ background: '#ff7020', color: 'white', padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold' }}>{text}</span>;
}

function CourseCard({ title, tag }) {
  return (
    <div style={{ border: '1px solid #334155', padding: '16px', borderRadius: '8px', margin: '8px 0', background: '#1e293b', color: 'white' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>{title}</h3>
        <Badge text={tag} />
      </div>
    </div>
  );
}

function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Curriculum Modules</h2>
      <CourseCard title="HTML Fundamentals" tag="Beginner" />
      <CourseCard title="React & Next.js" tag="Advanced" />
    </div>
  );
}`,
    execution_mode: 'react_preview',
    language: 'javascript',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444704',
    module_id: '33333333-3333-3333-3333-333333333702',
    course_id: REACT_COURSE_ID,
    slug: 'react-props-and-types',
    title: 'Passing & Destructuring Props',
    sort_order: 1,
    status: 'published',
    estimated_minutes: 20,
    objectives: [
      'Pass unidirectional data from parent to child via props',
      'Destructure props with defaults ({ name = "Guest" })',
      'Understand that React props are strictly read-only (immutable)'
    ],
    content_md: `## What are Props?

React components use **props** (short for properties) to communicate with each other. Every parent component can pass information to its child components:

\`\`\`jsx
function Greeting({ name, level = "Beginner" }) {
  return <h2>Hello {name}! Skill level: {level}</h2>;
}

// In parent
<Greeting name="Marcus" level="Pro" />
\`\`\`

> [!IMPORTANT]
> **Props are Read-Only!** A component must never attempt to change its own props directly.`,
    key_points_md: `- Props flow down unidirectionally from parent to child.
- Destructure props in the function parameter list for clean code.`,
    common_mistakes_md: `- Attempting to reassign \`props.name = 'New Name'\`.`,
    starter_code: `function UserStat({ label, value }) {
  return (
    <div style={{ background: '#1e293b', padding: '12px', borderRadius: '8px', textAlign: 'center', minWidth: '100px', color: 'white' }}>
      <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#ff7020' }}>{value}</span>
      <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: '#94a3b8' }}>{label}</p>
    </div>
  );
}

function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', display: 'flex', gap: '12px' }}>
      <UserStat label="Courses" value={12} />
      <UserStat label="Streak" value="5 Days" />
      <UserStat label="Mastered" value={34} />
    </div>
  );
}`,
    solution_code: `function UserStat({ label, value }) {
  return (
    <div style={{ background: '#1e293b', padding: '12px', borderRadius: '8px', textAlign: 'center', minWidth: '100px', color: 'white' }}>
      <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#ff7020' }}>{value}</span>
      <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: '#94a3b8' }}>{label}</p>
    </div>
  );
}

function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', display: 'flex', gap: '12px' }}>
      <UserStat label="Courses" value={12} />
      <UserStat label="Streak" value="5 Days" />
      <UserStat label="Mastered" value={34} />
    </div>
  );
}`,
    execution_mode: 'react_preview',
    language: 'javascript',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444705',
    module_id: '33333333-3333-3333-3333-333333333702',
    course_id: REACT_COURSE_ID,
    slug: 'react-state-and-usestate',
    title: 'The useState Hook: Component State',
    sort_order: 2,
    status: 'published',
    estimated_minutes: 25,
    objectives: [
      'Manage dynamic component memory using the useState Hook',
      'Trigger automatic UI re-renders on state updates',
      'Preserve state immutability when updating objects and arrays'
    ],
    content_md: `## What is Component State?

While props allow parents to pass data down, **state** is a component's personal memory. When state updates, React automatically re-renders the component to keep the screen in sync!

\`\`\`jsx
const [count, setCount] = React.useState(0);
\`\`\`
1. \`count\`: The current state value.
2. \`setCount\`: The updater function.

\`\`\`jsx
<button onClick={() => setCount(count + 1)}>
  Clicked {count} times
</button>
\`\`\``,
    key_points_md: `- State triggers automatic declarative re-rendering.
- Never modify state variables directly (\`count = 5\`); always call \`setCount(5)\`.`,
    common_mistakes_md: `- Calling state updater functions directly during render, causing infinite re-render loops!`,
    starter_code: `function CounterApp() {
  const [likes, setLikes] = React.useState(0);

  return (
    <div style={{ padding: '24px', fontFamily: 'sans-serif', background: '#0f172a', color: 'white', borderRadius: '12px', maxWidth: '300px' }}>
      <h3>Interactive Counter</h3>
      <p style={{ fontSize: '28px', color: '#ff7020', fontWeight: 'bold' }}>{likes} Likes</p>
      <button 
        onClick={() => setLikes(likes + 1)}
        style={{ background: '#ff7020', border: 'none', color: 'white', padding: '8px 16px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
      >
        👍 Like Lesson
      </button>
    </div>
  );
}

function App() {
  return <CounterApp />;
}`,
    solution_code: `function CounterApp() {
  const [likes, setLikes] = React.useState(0);

  return (
    <div style={{ padding: '24px', fontFamily: 'sans-serif', background: '#0f172a', color: 'white', borderRadius: '12px', maxWidth: '300px' }}>
      <h3>Interactive Counter</h3>
      <p style={{ fontSize: '28px', color: '#ff7020', fontWeight: 'bold' }}>{likes} Likes</p>
      <button 
        onClick={() => setLikes(likes + 1)}
        style={{ background: '#ff7020', border: 'none', color: 'white', padding: '8px 16px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
      >
        👍 Like Lesson
      </button>
    </div>
  );
}

function App() {
  return <CounterApp />;
}`,
    execution_mode: 'react_preview',
    language: 'javascript',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444706',
    module_id: '33333333-3333-3333-3333-333333333702',
    course_id: REACT_COURSE_ID,
    slug: 'react-events-and-forms',
    title: 'Handling Events & Controlled Inputs',
    sort_order: 3,
    status: 'published',
    estimated_minutes: 20,
    objectives: [
      'Handle synthetic events: onClick, onChange, onSubmit',
      'Create Controlled Form Components with value and onChange',
      'Synchronize live form state with UI displays'
    ],
    content_md: `## Controlled Inputs in React

In HTML, form inputs maintain their own internal state. In React, **Controlled Components** bind the input value directly to React state:

\`\`\`jsx
const [text, setText] = React.useState('');

<input 
  type="text" 
  value={text} 
  onChange={(e) => setText(e.target.value)} 
/>
\`\`\`
This makes React state the single source of truth!`,
    key_points_md: `- Controlled inputs bind \`value\` to state and update on \`onChange\`.
- Synthetic events wrap browser events for consistent cross-browser behavior.`,
    common_mistakes_md: `- Providing \`value\` without an \`onChange\` handler, making the input read-only.`,
    starter_code: `function InteractiveForm() {
  const [name, setName] = React.useState('');

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h3>Controlled Input</h3>
      <input 
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ padding: '8px', width: '220px', border: '1px solid #cbd5e1', borderRadius: '6px' }}
      />
      <p>Live Preview: <strong>{name ? name : '(Awaiting input...)'}</strong></p>
    </div>
  );
}

function App() {
  return <InteractiveForm />;
}`,
    solution_code: `function InteractiveForm() {
  const [name, setName] = React.useState('');

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h3>Controlled Input</h3>
      <input 
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ padding: '8px', width: '220px', border: '1px solid #cbd5e1', borderRadius: '6px' }}
      />
      <p>Live Preview: <strong>{name ? name : '(Awaiting input...)'}</strong></p>
    </div>
  );
}

function App() {
  return <InteractiveForm />;
}`,
    execution_mode: 'react_preview',
    language: 'javascript',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444707',
    module_id: '33333333-3333-3333-3333-333333333703',
    course_id: REACT_COURSE_ID,
    slug: 'react-conditional-rendering',
    title: 'Conditional Rendering in React',
    sort_order: 1,
    status: 'published',
    estimated_minutes: 20,
    objectives: [
      'Render UI conditionally using ternary operators (? :)',
      'Use the logical AND operator (&&) for optional badges and banners',
      'Early return patterns for loading and error states'
    ],
    content_md: `## Conditional Rendering Techniques

### 1. Ternary Operator: \`condition ? <True /> : <False />\`
\`\`\`jsx
return (
  <div>
    {isLoggedIn ? <UserDashboard /> : <LoginForm />}
  </div>
);
\`\`\`

### 2. Logical AND: \`condition && <Component />\`
Used when you want to render something or nothing at all:
\`\`\`jsx
{hasNewAlerts && <NotificationBanner />}
\`\`\``,
    key_points_md: `- Use ternary operators for mutually exclusive views.
- Use logical \`&&\` for toggleable alerts and badges.`,
    common_mistakes_md: `- Using \`count && <Items />\` when \`count = 0\`; in JavaScript, \`0 && ...\` will render the number \`0\` on screen! Use \`count > 0 && <Items />\` instead.`,
    starter_code: `function App() {
  const [isCompleted, setIsCompleted] = React.useState(false);

  return (
    <div style={{ padding: '24px', fontFamily: 'sans-serif', background: '#0f172a', color: 'white', borderRadius: '12px' }}>
      <h3>Lesson Completion Status</h3>
      {isCompleted ? (
        <p style={{ color: '#10b981', fontWeight: 'bold' }}>✓ Lesson Completed! 100XP Awarded.</p>
      ) : (
        <p style={{ color: '#94a3b8' }}>In Progress: Complete challenges to finish.</p>
      )}
      <button 
        onClick={() => setIsCompleted(!isCompleted)}
        style={{ padding: '8px 16px', background: '#ff7020', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
      >
        Toggle Status
      </button>
    </div>
  );
}`,
    solution_code: `function App() {
  const [isCompleted, setIsCompleted] = React.useState(false);

  return (
    <div style={{ padding: '24px', fontFamily: 'sans-serif', background: '#0f172a', color: 'white', borderRadius: '12px' }}>
      <h3>Lesson Completion Status</h3>
      {isCompleted ? (
        <p style={{ color: '#10b981', fontWeight: 'bold' }}>✓ Lesson Completed! 100XP Awarded.</p>
      ) : (
        <p style={{ color: '#94a3b8' }}>In Progress: Complete challenges to finish.</p>
      )}
      <button 
        onClick={() => setIsCompleted(!isCompleted)}
        style={{ padding: '8px 16px', background: '#ff7020', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
      >
        Toggle Status
      </button>
    </div>
  );
}`,
    execution_mode: 'react_preview',
    language: 'javascript',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444708',
    module_id: '33333333-3333-3333-3333-333333333703',
    course_id: REACT_COURSE_ID,
    slug: 'react-lists-and-keys',
    title: 'Rendering Lists with the key Prop',
    sort_order: 2,
    status: 'published',
    estimated_minutes: 20,
    objectives: [
      'Render dynamic arrays using array.map()',
      'The critical role of unique keys in React reconciliation',
      'Why array indexes should not be used as keys'
    ],
    content_md: `## Rendering Lists with \`.map()\`

To render multiple components from an array, use JavaScript's \`.map()\` function:

\`\`\`jsx
const items = [
  { id: 'a1', title: 'HTML' },
  { id: 'b2', title: 'CSS' }
];

return (
  <ul>
    {items.map(item => (
      <li key={item.id}>{item.title}</li>
    ))}
  </ul>
);
\`\`\`

> [!CRITICAL]
> **Why is \`key\` required?** Keys tell React which items have changed, been added, or been removed. Without stable unique keys, re-ordering items causes input values and focus state to corrupt!`,
    key_points_md: `- Always provide a stable, unique \`key\` on the top element returned by \`.map()\`.
- Avoid using array index as key when list order can change.`,
    common_mistakes_md: `- Omitting the \`key\` prop, triggering React warnings.`,
    starter_code: `function App() {
  const courses = [
    { id: 101, name: "HTML Fundamentals", duration: "15h" },
    { id: 102, name: "CSS Mastery", duration: "20h" },
    { id: 103, name: "JavaScript & React", duration: "35h" }
  ];

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Available Courses</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {courses.map(c => (
          <li key={c.id} style={{ padding: '10px 14px', border: '1px solid #e2e8f0', borderRadius: '6px', marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
            <strong>{c.name}</strong>
            <span style={{ color: '#ff7020' }}>{c.duration}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}`,
    solution_code: `function App() {
  const courses = [
    { id: 101, name: "HTML Fundamentals", duration: "15h" },
    { id: 102, name: "CSS Mastery", duration: "20h" },
    { id: 103, name: "JavaScript & React", duration: "35h" }
  ];

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Available Courses</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {courses.map(c => (
          <li key={c.id} style={{ padding: '10px 14px', border: '1px solid #e2e8f0', borderRadius: '6px', marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
            <strong>{c.name}</strong>
            <span style={{ color: '#ff7020' }}>{c.duration}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}`,
    execution_mode: 'react_preview',
    language: 'javascript',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444709',
    module_id: '33333333-3333-3333-3333-333333333703',
    course_id: REACT_COURSE_ID,
    slug: 'react-useeffect-lifecycle',
    title: 'The useEffect Hook: Side Effects & Cleanup',
    sort_order: 3,
    status: 'published',
    estimated_minutes: 25,
    objectives: [
      'Synchronize components with external systems using useEffect',
      'Manage the Dependency Array: empty [], dependencies [id], and omitted',
      'Clean up timers, subscriptions, and event listeners'
    ],
    content_md: `## Side Effects in React

The \`useEffect\` Hook lets you synchronize a component with an external system (e.g. data fetching, DOM timers, window listeners):

\`\`\`jsx
React.useEffect(() => {
  // 1. Setup code (runs on mount and dependency change)
  const timer = setInterval(() => console.log('Tick'), 1000);

  // 2. Cleanup function (runs on unmount)
  return () => clearInterval(timer);
}, []); // Empty dependency array = runs ONCE on mount!
\`\`\`

### Dependency Array Rules:
- \`[]\`: Runs **once** when component mounts.
- \`[userId]\`: Re-runs whenever \`userId\` changes.
- Omitted: Runs on **every single render** (rarely desired).`,
    key_points_md: `- Use \`useEffect\` for side effects that escape React's rendering loop.
- Always clean up subscriptions and intervals to avoid memory leaks.`,
    common_mistakes_md: `- Forgetting dependencies in the array, resulting in stale closure bugs.`,
    starter_code: `function LiveClock() {
  const [seconds, setSeconds] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', background: '#0f172a', color: 'white', borderRadius: '12px' }}>
      <h3>Live Session Timer</h3>
      <p style={{ fontSize: '24px', color: '#38bdf8', fontFamily: 'monospace' }}>
        Active: {seconds}s
      </p>
    </div>
  );
}

function App() {
  return <LiveClock />;
}`,
    solution_code: `function LiveClock() {
  const [seconds, setSeconds] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', background: '#0f172a', color: 'white', borderRadius: '12px' }}>
      <h3>Live Session Timer</h3>
      <p style={{ fontSize: '24px', color: '#38bdf8', fontFamily: 'monospace' }}>
        Active: {seconds}s
      </p>
    </div>
  );
}

function App() {
  return <LiveClock />;
}`,
    execution_mode: 'react_preview',
    language: 'javascript',
    editor_enabled: true
  }
];
