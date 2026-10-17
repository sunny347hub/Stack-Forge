import type { CourseModule, Lesson } from '../../types/database';

export const JS_COURSE_ID = '22222222-2222-2222-2222-222222222203';

export const JS_MODULES: CourseModule[] = [
  {
    id: '33333333-3333-3333-3333-333333333301',
    course_id: JS_COURSE_ID,
    title: 'Module 1: JavaScript Basics & Output',
    sort_order: 1,
    status: 'published'
  },
  {
    id: '33333333-3333-3333-3333-333333333302',
    course_id: JS_COURSE_ID,
    title: 'Module 2: Control Flow & Loops',
    sort_order: 2,
    status: 'published'
  },
  {
    id: '33333333-3333-3333-3333-333333333303',
    course_id: JS_COURSE_ID,
    title: 'Module 3: Functions & Scope',
    sort_order: 3,
    status: 'published'
  },
  {
    id: '33333333-3333-3333-3333-333333333304',
    course_id: JS_COURSE_ID,
    title: 'Module 4: Arrays & Objects',
    sort_order: 4,
    status: 'published'
  },
  {
    id: '33333333-3333-3333-3333-333333333305',
    course_id: JS_COURSE_ID,
    title: 'Module 5: DOM & Events',
    sort_order: 5,
    status: 'published'
  },
  {
    id: '33333333-3333-3333-3333-333333333306',
    course_id: JS_COURSE_ID,
    title: 'Module 6: Asynchronous JavaScript',
    sort_order: 6,
    status: 'published'
  }
];

export const JS_LESSONS: Lesson[] = [
  // Module 1: JavaScript Basics & Output
  {
    id: '44444444-4444-4444-4444-444444444301',
    module_id: '33333333-3333-3333-3333-333333333301',
    course_id: JS_COURSE_ID,
    slug: 'js-intro-and-syntax',
    title: 'JavaScript Introduction & Where To Run',
    sort_order: 1,
    status: 'published',
    estimated_minutes: 15,
    objectives: [
      'Understand the role of JavaScript as the programming language of the Web',
      'Learn how JavaScript executes in browsers and Node.js runtimes',
      'Explore syntax, semicolons, case-sensitivity, and code comments'
    ],
    content_md: `## What is JavaScript?

**JavaScript (JS)** is the world's most popular lightweight, interpreted programming language with first-class functions. While it is best known as the scripting language for Web pages, many non-browser environments use it as well, such as Node.js.

- **HTML** gives a page structure.
- **CSS** gives a page style.
- **JavaScript** gives a page behavior and intelligence!

## Syntax Rules
- **Case Sensitive**: \`myVariable\` and \`myvariable\` are two completely different identifiers.
- **CamelCase**: Developers conventionally use camelCase (e.g. \`studentName\`, \`calculateTotal\`).
- **Statements**: Separate instructions terminated by semicolons \`;\`.

\`\`\`javascript
// Single line comment
/* Multi-line
   comment */
console.log("Hello from StackForge!");
\`\`\``,
    key_points_md: `- JavaScript is dynamically typed and case-sensitive.
- Code executes sequentially from top to bottom.
- Semicolons separate distinct statements.`,
    common_mistakes_md: `- Inconsistent casing (e.g. declaring \`userEmail\` and calling \`useremail\`).`,
    starter_code: `// Write your first JavaScript program
console.log("Welcome to JavaScript Mastery!");
console.log("2 + 2 =", 2 + 2);`,
    solution_code: `// Write your first JavaScript program
console.log("Welcome to JavaScript Mastery!");
console.log("2 + 2 =", 2 + 2);
console.log("Ready to build web apps!");`,
    execution_mode: 'javascript',
    language: 'javascript',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444302',
    module_id: '33333333-3333-3333-3333-333333333301',
    course_id: JS_COURSE_ID,
    slug: 'js-output-and-console',
    title: 'JavaScript Output & console.log',
    sort_order: 2,
    status: 'published',
    estimated_minutes: 15,
    objectives: [
      'Inspect runtime outputs with console.log, console.warn, and console.error',
      'Format tabular data cleanly using console.table',
      'Measure code speed with performance.now()'
    ],
    content_md: `## JavaScript Output Methods

JavaScript can display data in different ways:
- **\`console.log()\`**: Writes into the browser console (the primary developer debugging tool).
- **\`console.info()\`**: Writes informational messages.
- **\`console.warn()\`**: Emits a yellow warning log.
- **\`console.error()\`**: Emits a red error log with stack trace.
- **\`console.table()\`**: Formats arrays or objects into readable tabular tables!

\`\`\`javascript
console.log("Regular log message");
console.warn("Caution: Deprecated API");
console.error("Critical: Network failed");

console.table([
  { id: 1, course: "HTML", status: "Done" },
  { id: 2, course: "JS", status: "Active" }
]);
\`\`\``,
    key_points_md: `- \`console.log\` accepts multiple comma-separated arguments.
- \`console.table\` is the fastest way to inspect structured data.`,
    common_mistakes_md: `- Leaving accidental \`console.log\` statements in production bundles.`,
    starter_code: `console.log("Developer name:", "Jane Doe");
console.warn("API quota at 85%");
console.error("404 Not Found");

const users = [
  { name: "Alice", role: "Frontend" },
  { name: "Bob", role: "Backend" }
];
console.log("User roster:", JSON.stringify(users));`,
    solution_code: `console.log("Developer name:", "Jane Doe");
console.warn("API quota at 85%");
console.error("404 Not Found");

const users = [
  { name: "Alice", role: "Frontend" },
  { name: "Bob", role: "Backend" }
];
console.log("User roster:", JSON.stringify(users));`,
    execution_mode: 'javascript',
    language: 'javascript',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444303',
    module_id: '33333333-3333-3333-3333-333333333301',
    course_id: JS_COURSE_ID,
    slug: 'js-variables-let-const',
    title: 'JS Variables: let, const & var',
    sort_order: 3,
    status: 'published',
    estimated_minutes: 20,
    objectives: [
      'Master modern variable declarations: const and let',
      'Understand why var is legacy and avoided in modern JavaScript',
      'Learn block scoping and temporal dead zone (TDZ)'
    ],
    content_md: `## Variables: Containers for Data

In modern JavaScript, there are 2 primary ways to declare variables:

### 1. \`const\` (Constant)
Use \`const\` for values that should **never be reassigned**:
\`\`\`javascript
const PI = 3.14159;
const appName = "StackForge";
\`\`\`

### 2. \`let\` (Reassignable)
Use \`let\` only when you expect the value to change later:
\`\`\`javascript
let score = 0;
score = score + 10;
\`\`\`

### Why avoid \`var\`?
\`var\` is function-scoped rather than block-scoped and suffers from hoisting bugs. Modern ES6+ code uses \`const\` by default, and \`let\` when mutation is needed.`,
    key_points_md: `- Default to \`const\` for 90% of variables.
- Use \`let\` only when a variable will be reassigned (like loop counters).
- Never use \`var\` in modern projects.`,
    common_mistakes_md: `- Attempting to reassign a \`const\` variable, triggering a \`TypeError: Assignment to constant variable\`.`,
    starter_code: `const courseName = "Full-Stack Development";
let currentLesson = 1;

console.log("Course:", courseName);
console.log("Current Lesson:", currentLesson);

// Progress to next lesson
currentLesson = currentLesson + 1;
console.log("Updated Lesson:", currentLesson);`,
    solution_code: `const courseName = "Full-Stack Development";
let currentLesson = 1;

console.log("Course:", courseName);
console.log("Current Lesson:", currentLesson);

// Progress to next lesson
currentLesson = currentLesson + 1;
console.log("Updated Lesson:", currentLesson);`,
    execution_mode: 'javascript',
    language: 'javascript',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444304',
    module_id: '33333333-3333-3333-3333-333333333301',
    course_id: JS_COURSE_ID,
    slug: 'js-data-types-operators',
    title: 'Data Types, Operators & Template Literals',
    sort_order: 4,
    status: 'published',
    estimated_minutes: 20,
    objectives: [
      'Learn primitive data types: string, number, boolean, null, undefined, symbol, bigint',
      'Use template literals with backticks and ${expression} interpolation',
      'Master strict equality (===) vs loose equality (==)'
    ],
    content_md: `## JavaScript Data Types

JavaScript variables can hold many data types:

| Type | Example | Description |
| :--- | :--- | :--- |
| **String** | \`"Hello"\` or \`'World'\` | Textual data |
| **Number** | \`42\` or \`3.14\` | Integers and floating-point decimals |
| **Boolean** | \`true\` or \`false\` | Logical true/false |
| **Undefined** | \`undefined\` | Variable declared but has no value assigned |
| **Null** | \`null\` | Intentional absence of any value |
| **Object** | \`{ name: "Alex" }\` | Key-value pairs |
| **Array** | \`[1, 2, 3]\` | Ordered list |

## Template Literals (\`\${...}\`)
Template literals use backticks (\`\`\`) to embed variables and expressions directly:
\`\`\`javascript
const name = "Devon";
const greeting = \`Hello \${name}, welcome to StackForge!\`;
\`\`\`

## Strict Equality: \`===\` vs \`==\`
- \`===\` checks **both value and type** (Always use this!).
- \`==\` performs loose type coercion: \`"5" == 5\` is true, but \`"5" === 5\` is false!`,
    key_points_md: `- Always use strict equality (\`===\`).
- Use template literals (\`\${val}\`) instead of string concatenation with \`+\`.
- \`typeof\` returns the type of a value.`,
    common_mistakes_md: `- Using loose equality \`==\`, which leads to subtle coercion bugs.`,
    starter_code: `const username = "Maya";
const lessonsCompleted = 5;
const totalLessons = 10;

// Template string interpolation
const status = \`User \${username} has finished \${lessonsCompleted}/\${totalLessons} lessons.\`;
console.log(status);

console.log("Strict equality check:", 5 === "5"); // false`,
    solution_code: `const username = "Maya";
const lessonsCompleted = 5;
const totalLessons = 10;

// Template string interpolation
const status = \`User \${username} has finished \${lessonsCompleted}/\${totalLessons} lessons.\`;
console.log(status);

console.log("Strict equality check:", 5 === "5"); // false
console.log("Percent complete:", (lessonsCompleted / totalLessons) * 100 + "%");`,
    execution_mode: 'javascript',
    language: 'javascript',
    editor_enabled: true
  },

  // Module 2: Control Flow & Loops
  {
    id: '44444444-4444-4444-4444-444444444305',
    module_id: '33333333-3333-3333-3333-333333333302',
    course_id: JS_COURSE_ID,
    slug: 'js-conditionals-switch',
    title: 'Conditionals: if, else if & switch',
    sort_order: 1,
    status: 'published',
    estimated_minutes: 20,
    objectives: [
      'Write conditional branch logic with if, else if, and else',
      'Use logical operators: && (AND), || (OR), and ! (NOT)',
      'Organize multi-way branching cleanly with switch statements'
    ],
    content_md: `## Conditional Branching

Conditionals control code execution based on whether a condition evaluates to truthy or falsy:

\`\`\`javascript
const score = 85;

if (score >= 90) {
  console.log("Grade: A");
} else if (score >= 80) {
  console.log("Grade: B");
} else {
  console.log("Grade: C");
}
\`\`\`

## Logical Operators
- **\`&&\` (Logical AND)**: Both conditions must be true.
- **\`||\` (Logical OR)**: At least one condition must be true.
- **\`!\` (Logical NOT)**: Inverts the boolean truthiness.`,
    key_points_md: `- Use \`if / else if\` for range checks.
- Use \`switch\` for matching specific exact values.
- Remember \`break\` in switch cases to prevent fallthrough.`,
    common_mistakes_md: `- Using a single equals \`=\` (assignment) instead of \`===\` inside an \`if\` condition!`,
    starter_code: `const userRole = "admin";

if (userRole === "admin") {
  console.log("Access granted: Full Administrative Privileges");
} else if (userRole === "editor") {
  console.log("Access granted: Content Editor Privileges");
} else {
  console.log("Access denied: Standard Guest");
}`,
    solution_code: `const userRole = "admin";

if (userRole === "admin") {
  console.log("Access granted: Full Administrative Privileges");
} else if (userRole === "editor") {
  console.log("Access granted: Content Editor Privileges");
} else {
  console.log("Access denied: Standard Guest");
}`,
    execution_mode: 'javascript',
    language: 'javascript',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444306',
    module_id: '33333333-3333-3333-3333-333333333302',
    course_id: JS_COURSE_ID,
    slug: 'js-loops',
    title: 'Loops: for, while & for...of',
    sort_order: 2,
    status: 'published',
    estimated_minutes: 20,
    objectives: [
      'Execute repeated logic using for and while loops',
      'Iterate through array values cleanly with for...of',
      'Safely break out of loops with break and skip iterations with continue'
    ],
    content_md: `## JavaScript Loops

Loops execute a block of code a number of times:

### 1. The Classic \`for\` Loop
\`\`\`javascript
for (let i = 0; i < 5; i++) {
  console.log("Count:", i);
}
\`\`\`

### 2. The Modern \`for...of\` Loop (Best for Arrays!)
\`\`\`javascript
const technologies = ["HTML", "CSS", "JS", "SQL"];
for (const tech of technologies) {
  console.log("Mastering:", tech);
}
\`\`\`

### 3. The \`while\` Loop
Executes as long as a specified condition is true:
\`\`\`javascript
let energy = 100;
while (energy > 50) {
  console.log("Coding... Energy:", energy);
  energy -= 25;
}
\`\`\``,
    key_points_md: `- Use \`for...of\` for arrays and iterable collections.
- Ensure loop termination conditions are met to avoid infinite loops.
- Use \`break\` to exit early and \`continue\` to skip to the next iteration.`,
    common_mistakes_md: `- Creating infinite loops by forgetting to increment the counter variable.`,
    starter_code: `const skills = ["HTML5", "CSS3", "JavaScript", "React", "Node.js"];

console.log("Iterating through curriculum:");
for (let i = 0; i < skills.length; i++) {
  console.log(\`Stage \${i + 1}: \${skills[i]}\`);
}`,
    solution_code: `const skills = ["HTML5", "CSS3", "JavaScript", "React", "Node.js"];

console.log("Iterating through curriculum:");
for (let i = 0; i < skills.length; i++) {
  console.log(\`Stage \${i + 1}: \${skills[i]}\`);
}

console.log("\nUsing clean for...of:");
for (const skill of skills) {
  console.log("Certified:", skill);
}`,
    execution_mode: 'javascript',
    language: 'javascript',
    editor_enabled: true
  },

  // Module 3: Functions & Scope
  {
    id: '44444444-4444-4444-4444-444444444307',
    module_id: '33333333-3333-3333-3333-333333333303',
    course_id: JS_COURSE_ID,
    slug: 'js-functions-scope',
    title: 'Functions: Declarations & Parameters',
    sort_order: 1,
    status: 'published',
    estimated_minutes: 20,
    objectives: [
      'Define reusable logic with function declarations and parameters',
      'Return computed results using the return statement',
      'Provide default parameter fallback values'
    ],
    content_md: `## What is a Function?

A JavaScript function is a block of code designed to perform a particular task. A function is executed when "something" invokes (calls) it.

\`\`\`javascript
function calculateScore(completed, total = 10) {
  const percentage = (completed / total) * 100;
  return Math.round(percentage);
}

const result = calculateScore(7, 10);
console.log("Progress:", result + "%");
\`\`\`

- **Parameters**: The variables listed inside parentheses in the function declaration.
- **Arguments**: The real values received by the function when invoked.
- **Return**: Sends the computed value back to the caller and stops execution.`,
    key_points_md: `- Functions encapsulate reusable logic and reduce repetition (DRY principle).
- Use default parameters like \`total = 10\` to handle missing arguments gracefully.`,
    common_mistakes_md: `- Forgetting the \`return\` statement; functions without a return statement return \`undefined\` by default!`,
    starter_code: `function formatUserGreeting(name, role = "Student") {
  return \`Welcome \${name}! Your current status is \${role}.\`;
}

console.log(formatUserGreeting("Marcus", "Full-Stack Engineer"));
console.log(formatUserGreeting("Chloe"));`,
    solution_code: `function formatUserGreeting(name, role = "Student") {
  return \`Welcome \${name}! Your current status is \${role}.\`;
}

console.log(formatUserGreeting("Marcus", "Full-Stack Engineer"));
console.log(formatUserGreeting("Chloe"));`,
    execution_mode: 'javascript',
    language: 'javascript',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444308',
    module_id: '33333333-3333-3333-3333-333333333303',
    course_id: JS_COURSE_ID,
    slug: 'js-arrow-functions',
    title: 'Arrow Functions & ES6 Modern Syntax',
    sort_order: 2,
    status: 'published',
    estimated_minutes: 15,
    objectives: [
      'Write compact arrow function syntax () => {}',
      'Understand implicit returns for single-line expressions',
      'Explore how arrow functions preserve lexical this'
    ],
    content_md: `## ES6 Arrow Functions

Arrow functions provide a concise syntax for writing function expressions:

\`\`\`javascript
// Traditional function
const addTraditional = function(a, b) {
  return a + b;
};

// Arrow function
const addArrow = (a, b) => a + b; // Implicit return!
\`\`\`

### Concise Rules:
- If you have exactly **one parameter**, parentheses are optional: \`x => x * 2\`.
- If the body is a **single expression**, curly braces and \`return\` are omitted.`,
    key_points_md: `- Arrow functions are standard in React and modern array iteration.
- Arrow functions do not bind their own \`this\`.`,
    common_mistakes_md: `- Wrapping the body in curly braces \`{ x * 2 }\` and forgetting \`return\`.`,
    starter_code: `// Convert to concise arrow functions
const square = (n) => n * n;
const multiply = (a, b) => a * b;

console.log("Square of 8:", square(8));
console.log("Multiply 6 x 7:", multiply(6, 7));`,
    solution_code: `// Convert to concise arrow functions
const square = (n) => n * n;
const multiply = (a, b) => a * b;

console.log("Square of 8:", square(8));
console.log("Multiply 6 x 7:", multiply(6, 7));`,
    execution_mode: 'javascript',
    language: 'javascript',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444309',
    module_id: '33333333-3333-3333-3333-333333333303',
    course_id: JS_COURSE_ID,
    slug: 'js-scope-and-closures',
    title: 'Variable Scope & Closures',
    sort_order: 3,
    status: 'published',
    estimated_minutes: 20,
    objectives: [
      'Understand Global, Function, and Block scope',
      'Explore lexical scoping in nested functions',
      'Master Closures: functions remembering their outer variables'
    ],
    content_md: `## What is Scope?

Scope determines the accessibility (visibility) of variables.

1. **Global Scope**: Declared outside any function; accessible everywhere.
2. **Function Scope**: Declared inside a function; accessible only within that function.
3. **Block Scope**: Declared with \`let\` or \`const\` inside \`{ ... }\`; accessible only inside that block.

## What is a Closure?
A **closure** is a function that remembers variables from its outer enclosing scope even after the outer function has finished executing!

\`\`\`javascript
function createCounter() {
  let count = 0;
  return function() {
    count++;
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
\`\`\``,
    key_points_md: `- \`let\` and \`const\` respect block scope \`{}\`.
- Closures allow private state encapsulation in JavaScript.`,
    common_mistakes_md: `- Thinking \`var\` is block-scoped; it leaks out of \`if\` blocks into the enclosing function!`,
    starter_code: `function createBankAccount(initialBalance) {
  let balance = initialBalance; // Private variable enclosed in closure

  return {
    deposit: (amount) => {
      balance += amount;
      return \`Deposited \$\${amount}. New balance: \$\${balance}\`;
    },
    getBalance: () => balance
  };
}

const account = createBankAccount(100);
console.log(account.deposit(50));
console.log("Verified Balance:", account.getBalance());`,
    solution_code: `function createBankAccount(initialBalance) {
  let balance = initialBalance; // Private variable enclosed in closure

  return {
    deposit: (amount) => {
      balance += amount;
      return \`Deposited \$\${amount}. New balance: \$\${balance}\`;
    },
    getBalance: () => balance
  };
}

const account = createBankAccount(100);
console.log(account.deposit(50));
console.log("Verified Balance:", account.getBalance());`,
    execution_mode: 'javascript',
    language: 'javascript',
    editor_enabled: true
  },

  // Module 4: Arrays & Objects
  {
    id: '44444444-4444-4444-4444-444444444310',
    module_id: '33333333-3333-3333-3333-333333333304',
    course_id: JS_COURSE_ID,
    slug: 'js-arrays-and-methods',
    title: 'JavaScript Arrays & Core Methods',
    sort_order: 1,
    status: 'published',
    estimated_minutes: 20,
    objectives: [
      'Create and index arrays (0-based indexing)',
      'Add and remove items with push, pop, shift, and unshift',
      'Search elements with includes, indexOf, and find'
    ],
    content_md: `## JavaScript Arrays

An array is an ordered collection of values:

\`\`\`javascript
const technologies = ["HTML", "CSS", "JavaScript"];
console.log(technologies[0]); // "HTML" (0-indexed)
console.log(technologies.length); // 3
\`\`\`

## Common Array Mutation Methods
- **\`push(item)\`**: Adds item to the **end** of array.
- **\`pop()\`**: Removes and returns the **last** item.
- **\`unshift(item)\`**: Adds item to the **beginning**.
- **\`shift()\`**: Removes and returns the **first** item.
- **\`includes(item)\`**: Returns \`true\` if item exists in array.`,
    key_points_md: `- Arrays are zero-indexed: the first item is at index \`0\`.
- \`array.length\` gives the total number of items.
- \`push\` and \`pop\` operate at the end of the array.`,
    common_mistakes_md: `- Accessing \`array[array.length]\` instead of \`array[array.length - 1]\`.`,
    starter_code: `const stack = ["HTML", "CSS"];

stack.push("JavaScript");
stack.push("React");
console.log("Current Stack:", stack);

const removed = stack.pop();
console.log("Popped element:", removed);
console.log("Final Stack:", stack);
console.log("Contains CSS?:", stack.includes("CSS"));`,
    solution_code: `const stack = ["HTML", "CSS"];

stack.push("JavaScript");
stack.push("React");
console.log("Current Stack:", stack);

const removed = stack.pop();
console.log("Popped element:", removed);
console.log("Final Stack:", stack);
console.log("Contains CSS?:", stack.includes("CSS"));`,
    execution_mode: 'javascript',
    language: 'javascript',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444311',
    module_id: '33333333-3333-3333-3333-333333333304',
    course_id: JS_COURSE_ID,
    slug: 'js-array-iteration',
    title: 'Array Iteration: map, filter & reduce',
    sort_order: 2,
    status: 'published',
    estimated_minutes: 25,
    objectives: [
      'Transform array data with map() without mutating the original',
      'Filter elements matching conditions with filter()',
      'Accumulate totals with reduce()'
    ],
    content_md: `## Modern Functional Array Methods

Modern JavaScript relies heavily on non-mutating transformation methods:

### 1. \`map()\`: Transform Every Element
Creates a new array by applying a function to each item:
\`\`\`javascript
const numbers = [1, 2, 3, 4];
const doubled = numbers.map(n => n * 2); // [2, 4, 6, 8]
\`\`\`

### 2. \`filter()\`: Select Elements
Creates a new array with elements that pass the boolean test:
\`\`\`javascript
const scores = [65, 88, 92, 45, 78];
const passing = scores.filter(s => s >= 70); // [88, 92, 78]
\`\`\`

### 3. \`reduce()\`: Accumulate Into a Single Value
\`\`\`javascript
const sum = numbers.reduce((acc, curr) => acc + curr, 0);
\`\`\``,
    key_points_md: `- \`map\` returns an array of the exact same length.
- \`filter\` returns an array containing only matching elements.
- Neither method mutates the original array.`,
    common_mistakes_md: `- Forgetting to return a value inside the \`map\` callback, resulting in an array of \`undefined\`.`,
    starter_code: `const products = [
  { name: "Laptop", price: 999, inStock: true },
  { name: "Mouse", price: 25, inStock: true },
  { name: "Monitor", price: 299, inStock: false },
  { name: "Keyboard", price: 75, inStock: true }
];

// 1. Filter items in stock
const available = products.filter(p => p.inStock);
console.log("In stock count:", available.length);

// 2. Map to formatted price tags
const priceTags = available.map(p => \`\${p.name}: \$\${p.price}\`);
console.log("Price Tags:", priceTags);`,
    solution_code: `const products = [
  { name: "Laptop", price: 999, inStock: true },
  { name: "Mouse", price: 25, inStock: true },
  { name: "Monitor", price: 299, inStock: false },
  { name: "Keyboard", price: 75, inStock: true }
];

// 1. Filter items in stock
const available = products.filter(p => p.inStock);
console.log("In stock count:", available.length);

// 2. Map to formatted price tags
const priceTags = available.map(p => \`\${p.name}: \$\${p.price}\`);
console.log("Price Tags:", priceTags);

// 3. Total inventory value
const totalVal = available.reduce((sum, p) => sum + p.price, 0);
console.log("Total Stock Value: $" + totalVal);`,
    execution_mode: 'javascript',
    language: 'javascript',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444312',
    module_id: '33333333-3333-3333-3333-333333333304',
    course_id: JS_COURSE_ID,
    slug: 'js-objects-and-methods',
    title: 'JavaScript Objects, Methods & this',
    sort_order: 3,
    status: 'published',
    estimated_minutes: 20,
    objectives: [
      'Define object literals with properties and methods',
      'Access properties via dot notation and bracket notation',
      'Understand the this keyword in method execution'
    ],
    content_md: `## JavaScript Objects

Objects store collections of key-value pairs and are the fundamental building blocks of JavaScript:

\`\`\`javascript
const student = {
  name: "Priya Sharma",
  role: "Full-Stack Engineer",
  experienceYears: 4,
  greet: function() {
    return \`Hi, I'm \${this.name}, a \${this.role}!\`;
  }
};

console.log(student.name); // Dot notation
console.log(student["role"]); // Bracket notation
console.log(student.greet());
\`\`\`

## The \`this\` Keyword
Inside an object method, \`this\` refers to the object itself.`,
    key_points_md: `- Use dot notation \`obj.prop\` for known keys.
- Use bracket notation \`obj[dynamicKey]\` when key is stored in a variable.
- Object methods can reference properties using \`this\`.`,
    common_mistakes_md: `- Using arrow functions for methods where you need \`this\`; arrow functions do not bind \`this\`!`,
    starter_code: `const course = {
  title: "JavaScript Mastery",
  level: "Intermediate",
  totalLessons: 18,
  completedLessons: 6,
  getProgress: function() {
    const pct = Math.round((this.completedLessons / this.totalLessons) * 100);
    return \`\${this.title}: \${pct}% completed\`;
  }
};

console.log(course.getProgress());`,
    solution_code: `const course = {
  title: "JavaScript Mastery",
  level: "Intermediate",
  totalLessons: 18,
  completedLessons: 6,
  getProgress: function() {
    const pct = Math.round((this.completedLessons / this.totalLessons) * 100);
    return \`\${this.title}: \${pct}% completed\`;
  }
};

console.log(course.getProgress());`,
    execution_mode: 'javascript',
    language: 'javascript',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444313',
    module_id: '33333333-3333-3333-3333-333333333304',
    course_id: JS_COURSE_ID,
    slug: 'js-destructuring-spread',
    title: 'Object & Array Destructuring and Spread',
    sort_order: 4,
    status: 'published',
    estimated_minutes: 20,
    objectives: [
      'Unpack object properties cleanly with destructuring',
      'Unpack array positions with array destructuring',
      'Copy and merge objects with the spread operator (...)'
    ],
    content_md: `## Destructuring & Spread Operator

ES6 introduced modern syntax to unpack values from arrays or properties from objects:

### 1. Object Destructuring
\`\`\`javascript
const user = { id: 101, username: "devon", role: "admin" };
const { username, role } = user;
console.log(username, role); // "devon", "admin"
\`\`\`

### 2. Array Destructuring
\`\`\`javascript
const coords = [12.5, 45.2];
const [latitude, longitude] = coords;
\`\`\`

### 3. Spread Operator: \`...\`
Clone or merge objects and arrays without mutation:
\`\`\`javascript
const baseUser = { name: "Alex", role: "user" };
const updatedUser = { ...baseUser, role: "admin", verified: true };
\`\`\``,
    key_points_md: `- Destructuring makes function parameter lists clean and readable.
- The spread operator \`...\` makes shallow copies of objects and arrays.`,
    common_mistakes_md: `- Mutating an existing object directly instead of creating a shallow clone with spread syntax.`,
    starter_code: `const config = {
  host: "localhost",
  port: 5432,
  database: "stackforge_db"
};

// Destructuring assignment
const { host, port, database } = config;
console.log(\`Connecting to \${database} at \${host}:\${port}...\`);

// Spread clone with override
const prodConfig = { ...config, host: "prod.db.stackforge.com" };
console.log("Production Host:", prodConfig.host);`,
    solution_code: `const config = {
  host: "localhost",
  port: 5432,
  database: "stackforge_db"
};

// Destructuring assignment
const { host, port, database } = config;
console.log(\`Connecting to \${database} at \${host}:\${port}...\`);

// Spread clone with override
const prodConfig = { ...config, host: "prod.db.stackforge.com" };
console.log("Production Host:", prodConfig.host);`,
    execution_mode: 'javascript',
    language: 'javascript',
    editor_enabled: true
  },

  // Module 5: DOM & Events
  {
    id: '44444444-4444-4444-4444-444444444314',
    module_id: '33333333-3333-3333-3333-333333333305',
    course_id: JS_COURSE_ID,
    slug: 'js-dom-selection-manipulation',
    title: 'DOM Elements: Selection & Manipulation',
    sort_order: 1,
    status: 'published',
    estimated_minutes: 20,
    objectives: [
      'Select elements with querySelector and querySelectorAll',
      'Change element content with textContent and innerHTML',
      'Modify classes dynamically with classList.add, remove, and toggle'
    ],
    content_md: `## What is the DOM?

The **DOM (Document Object Model)** is the browser's in-memory object representation of an HTML document. JavaScript interacts with this tree to make pages interactive!

## Selecting Elements
- \`document.getElementById('id')\`: Returns element with matching ID.
- \`document.querySelector('.class')\`: Returns the **first** element matching the CSS selector.
- \`document.querySelectorAll('.btn')\`: Returns a NodeList of **all** matching elements.

## Modifying Elements
\`\`\`javascript
const heading = document.querySelector('h1');
heading.textContent = "Updated via JavaScript!";
heading.classList.add('highlight');
\`\`\``,
    key_points_md: `- Always prefer \`textContent\` over \`innerHTML\` to avoid XSS security vulnerabilities.
- Use \`classList.toggle()\` to easily show/hide elements.`,
    common_mistakes_md: `- Running DOM selection scripts before the HTML has finished loading.`,
    starter_code: `<!DOCTYPE html>
<html>
<body>
  <h2 id="title">Static Heading</h2>
  <button id="updateBtn">Change Heading Text</button>

  <script>
    document.getElementById('updateBtn').addEventListener('click', () => {
      document.getElementById('title').textContent = 'Dynamic DOM Manipulation!';
      document.getElementById('title').style.color = '#ff7020';
    });
  </script>
</body>
</html>`,
    solution_code: `<!DOCTYPE html>
<html>
<body>
  <h2 id="title">Static Heading</h2>
  <button id="updateBtn">Change Heading Text</button>

  <script>
    document.getElementById('updateBtn').addEventListener('click', () => {
      document.getElementById('title').textContent = 'Dynamic DOM Manipulation!';
      document.getElementById('title').style.color = '#ff7020';
    });
  </script>
</body>
</html>`,
    execution_mode: 'html_preview',
    language: 'html',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444315',
    module_id: '33333333-3333-3333-3333-333333333305',
    course_id: JS_COURSE_ID,
    slug: 'js-dom-events',
    title: 'Event Listeners: click, input & submit',
    sort_order: 2,
    status: 'published',
    estimated_minutes: 20,
    objectives: [
      'Attach event listeners with addEventListener',
      'Prevent page reloads on forms with e.preventDefault()',
      'Capture user typing with the input and change events'
    ],
    content_md: `## Handling Browser Events

Events are "things" that happen to HTML elements (e.g. user clicks a button, types in an input, submits a form).

\`\`\`javascript
element.addEventListener('event', function(event) {
  // Handler logic
});
\`\`\`

## Crucial Form Event: \`e.preventDefault()\`
When a form is submitted, the browser's default behavior is to reload the page. In modern Single Page Applications (SPAs), we prevent this:

\`\`\`javascript
form.addEventListener('submit', (e) => {
  e.preventDefault(); // Stops page from reloading!
  // Send data via fetch() API
});
\`\`\``,
    key_points_md: `- Use \`addEventListener\` instead of inline HTML attributes like \`onclick=""\`.
- \`e.target\` refers to the element that triggered the event.
- Call \`e.preventDefault()\` on form submission handlers.`,
    common_mistakes_md: `- Forgetting \`e.preventDefault()\` on form submit handlers, causing the page to refresh and lose state.`,
    starter_code: `<!DOCTYPE html>
<html>
<body>
  <h2>Live Character Counter</h2>
  <input type="text" id="userInput" placeholder="Type something..." style="padding: 8px; width: 250px;">
  <p>Characters: <strong id="charCount">0</strong></p>

  <script>
    const input = document.getElementById('userInput');
    const display = document.getElementById('charCount');

    input.addEventListener('input', (e) => {
      display.textContent = e.target.value.length;
    });
  </script>
</body>
</html>`,
    solution_code: `<!DOCTYPE html>
<html>
<body>
  <h2>Live Character Counter</h2>
  <input type="text" id="userInput" placeholder="Type something..." style="padding: 8px; width: 250px;">
  <p>Characters: <strong id="charCount">0</strong></p>

  <script>
    const input = document.getElementById('userInput');
    const display = document.getElementById('charCount');

    input.addEventListener('input', (e) => {
      display.textContent = e.target.value.length;
    });
  </script>
</body>
</html>`,
    execution_mode: 'html_preview',
    language: 'html',
    editor_enabled: true
  },

  // Module 6: Asynchronous JavaScript
  {
    id: '44444444-4444-4444-4444-444444444316',
    module_id: '33333333-3333-3333-3333-333333333306',
    course_id: JS_COURSE_ID,
    slug: 'js-callbacks-event-loop',
    title: 'Callbacks & The JavaScript Event Loop',
    sort_order: 1,
    status: 'published',
    estimated_minutes: 20,
    objectives: [
      'Understand synchronous vs asynchronous execution',
      'Learn how the single-threaded Event Loop handles background tasks',
      'Use setTimeout and setInterval timers'
    ],
    content_md: `## The Asynchronous Event Loop

JavaScript is **single-threaded**—it has one call stack and can only do one thing at a time.

To prevent long operations (like network requests or file reading) from freezing the entire UI, JavaScript offloads tasks to Web APIs and coordinates them through the **Event Loop**.

\`\`\`javascript
console.log("1. Starting task");

setTimeout(() => {
  console.log("2. Timer fired in background");
}, 1000);

console.log("3. Ending synchronous script");
\`\`\`

Output order will be \`1\`, \`3\`, and then \`2\`!`,
    key_points_md: `- JavaScript is single-threaded with non-blocking I/O.
- Timers and network requests execute asynchronously.`,
    common_mistakes_md: `- Expecting \`setTimeout(fn, 0)\` to execute immediately before synchronous code finishes.`,
    starter_code: `console.log("Task A: Synchronous start");

setTimeout(() => {
  console.log("Task B: Executed from Event Loop task queue");
}, 500);

console.log("Task C: Synchronous end");`,
    solution_code: `console.log("Task A: Synchronous start");

setTimeout(() => {
  console.log("Task B: Executed from Event Loop task queue");
}, 500);

console.log("Task C: Synchronous end");`,
    execution_mode: 'javascript',
    language: 'javascript',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444317',
    module_id: '33333333-3333-3333-3333-333333333306',
    course_id: JS_COURSE_ID,
    slug: 'js-promises',
    title: 'Promises: Chaining & Error Handling',
    sort_order: 2,
    status: 'published',
    estimated_minutes: 25,
    objectives: [
      'Understand Promise states: pending, fulfilled, rejected',
      'Create custom Promises with resolve and reject',
      'Handle resolution with .then() and errors with .catch()'
    ],
    content_md: `## What is a Promise?

A **Promise** is an object representing the eventual completion or failure of an asynchronous operation:

- **Pending**: Initial state; neither fulfilled nor rejected.
- **Fulfilled**: Operation completed successfully (\`resolve(value)\`).
- **Rejected**: Operation failed (\`reject(error)\`).

\`\`\`javascript
const fetchUserData = new Promise((resolve, reject) => {
  const success = true;
  if (success) {
    resolve({ id: 1, name: "Maya" });
  } else {
    reject("Network connection lost");
  }
});

fetchUserData
  .then(user => console.log("User:", user.name))
  .catch(err => console.error("Error:", err));
\`\`\``,
    key_points_md: `- Promises replace messy nested callback hell.
- Always attach a \`.catch()\` to handle potential network or server errors.`,
    common_mistakes_md: `- Forgetting to return a Promise inside a \`.then()\` chain.`,
    starter_code: `function simulateServerCall() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ status: 200, message: "Data retrieved successfully" });
    }, 400);
  });
}

simulateServerCall()
  .then(res => {
    console.log("Response:", res.message);
  })
  .catch(err => {
    console.error("Failed:", err);
  });`,
    solution_code: `function simulateServerCall() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ status: 200, message: "Data retrieved successfully" });
    }, 400);
  });
}

simulateServerCall()
  .then(res => {
    console.log("Response:", res.message);
  })
  .catch(err => {
    console.error("Failed:", err);
  });`,
    execution_mode: 'javascript',
    language: 'javascript',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444318',
    module_id: '33333333-3333-3333-3333-333333333306',
    course_id: JS_COURSE_ID,
    slug: 'js-async-await-fetch',
    title: 'Async / Await & Fetching API Data',
    sort_order: 3,
    status: 'published',
    estimated_minutes: 25,
    objectives: [
      'Write synchronous-looking asynchronous code with async and await',
      'Wrap network calls in try / catch blocks for resilient error handling',
      'Fetch and parse JSON data using the modern fetch API'
    ],
    content_md: `## Async and Await

\`async\` and \`await\` is syntactic sugar built on top of Promises. It allows you to write asynchronous code that reads like standard synchronous code:

\`\`\`javascript
async function loadCourses() {
  try {
    const response = await fetch('/api/courses');
    const courses = await response.json();
    console.log("Courses:", courses);
  } catch (error) {
    console.error("Failed to load courses:", error);
  }
}
\`\`\`

### Rules:
- The \`await\` keyword can ONLY be used inside an \`async\` function.
- Always handle errors with \`try { ... } catch (err) { ... }\`.`,
    key_points_md: `- \`await\` pauses execution until the Promise settles.
- \`try / catch\` cleanly catches both network rejections and parsing errors.
- Modern production JavaScript relies universally on \`async / await\`.`,
    common_mistakes_md: `- Using \`await\` in a regular function without the \`async\` keyword.`,
    starter_code: `// Async/Await demonstration
async function executeApiPipeline() {
  console.log("1. Starting API request...");

  const mockFetch = () => new Promise(res => setTimeout(() => res({ user: "Jane", tier: "Pro" }), 300));

  try {
    const data = await mockFetch();
    console.log("2. API Success:", data.user, "-", data.tier);
  } catch (err) {
    console.error("Error:", err);
  }

  console.log("3. Pipeline complete.");
}

executeApiPipeline();`,
    solution_code: `// Async/Await demonstration
async function executeApiPipeline() {
  console.log("1. Starting API request...");

  const mockFetch = () => new Promise(res => setTimeout(() => res({ user: "Jane", tier: "Pro" }), 300));

  try {
    const data = await mockFetch();
    console.log("2. API Success:", data.user, "-", data.tier);
  } catch (err) {
    console.error("Error:", err);
  }

  console.log("3. Pipeline complete.");
}

executeApiPipeline();`,
    execution_mode: 'javascript',
    language: 'javascript',
    editor_enabled: true
  }
];
