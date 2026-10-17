import type { CourseModule, Lesson } from '../../types/database';

export const NODE_COURSE_ID = '22222222-2222-2222-2222-222222222208';
export const EXPRESS_COURSE_ID = '22222222-2222-2222-2222-222222222209';

export const BACKEND_MODULES: CourseModule[] = [
  // Node.js Modules
  {
    id: '33333333-3333-3333-3333-333333333801',
    course_id: NODE_COURSE_ID,
    title: 'Module 1: Node.js Runtime & Architecture',
    sort_order: 1,
    status: 'published'
  },
  {
    id: '33333333-3333-3333-3333-333333333802',
    course_id: NODE_COURSE_ID,
    title: 'Module 2: Core Built-in Modules & HTTP',
    sort_order: 2,
    status: 'published'
  },

  // Express.js Modules
  {
    id: '33333333-3333-3333-3333-333333333901',
    course_id: EXPRESS_COURSE_ID,
    title: 'Module 1: Express Server & Routing',
    sort_order: 1,
    status: 'published'
  },
  {
    id: '33333333-3333-3333-3333-333333333902',
    course_id: EXPRESS_COURSE_ID,
    title: 'Module 2: Middleware & RESTful APIs',
    sort_order: 2,
    status: 'published'
  }
];

export const BACKEND_LESSONS: Lesson[] = [
  // ==========================================
  // NODE.JS LESSONS (1 - 5)
  // ==========================================
  {
    id: '44444444-4444-4444-4444-444444444801',
    module_id: '33333333-3333-3333-3333-333333333801',
    course_id: NODE_COURSE_ID,
    slug: 'nodejs-runtime-event-loop',
    title: 'Node.js Architecture & The Event Loop',
    sort_order: 1,
    status: 'published',
    estimated_minutes: 20,
    objectives: [
      'Understand the V8 JavaScript engine and libuv asynchronous I/O',
      'The single-threaded non-blocking event-driven architecture',
      'Inspect process.version, process.platform, and process.argv'
    ],
    content_md: `## What is Node.js?

**Node.js** is a cross-platform, open-source JavaScript runtime environment that executes JavaScript code outside a web browser.

Built on Google Chrome's **V8 engine**, Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient for data-intensive real-time applications.

## Global \`process\` Object
The \`process\` object provides information about the current Node.js process:
\`\`\`javascript
console.log("Node Version:", process.version);
console.log("Platform:", process.platform);
\`\`\``,
    key_points_md: `- Node.js runs JavaScript on servers.
- Uses non-blocking asynchronous I/O for scalable concurrency.`,
    common_mistakes_md: `- Blocking the single thread with heavy CPU calculations (e.g. synchronous cryptographic hashes).`,
    starter_code: `console.log("Node.js Runtime Initialized");
console.log("Environment:", process.env.NODE_ENV || "development");
console.log("Architecture:", process.arch || "x64");`,
    solution_code: `console.log("Node.js Runtime Initialized");
console.log("Environment:", process.env.NODE_ENV || "development");
console.log("Architecture:", process.arch || "x64");`,
    execution_mode: 'nodejs',
    language: 'javascript',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444802',
    module_id: '33333333-3333-3333-3333-333333333801',
    course_id: NODE_COURSE_ID,
    slug: 'nodejs-modules-system',
    title: 'CommonJS vs. ES Modules',
    sort_order: 2,
    status: 'published',
    estimated_minutes: 20,
    objectives: [
      'Import and export with CommonJS: require() and module.exports',
      'Import and export with ES Modules: import and export',
      'Organize modular code architecture across server files'
    ],
    content_md: `## Module Systems in Node.js

### 1. CommonJS (Traditional)
\`\`\`javascript
// math.js
module.exports = { add: (a, b) => a + b };

// app.js
const { add } = require('./math');
\`\`\`

### 2. ES Modules (Modern Standard)
\`\`\`javascript
// math.js
export const add = (a, b) => a + b;

// app.js
import { add } from './math.js';
\`\`\``,
    key_points_md: `- CommonJS uses \`require\`; ES Modules use \`import\`.
- Set \`"type": "module"\` in \`package.json\` to enable ES Modules.`,
    common_mistakes_md: `- Mixing \`require\` and \`import\` in the same file.`,
    starter_code: `const mathUtils = {
  add: (a, b) => a + b,
  multiply: (a, b) => a * b
};

console.log("Sum:", mathUtils.add(14, 28));
console.log("Product:", mathUtils.multiply(6, 7));`,
    solution_code: `const mathUtils = {
  add: (a, b) => a + b,
  multiply: (a, b) => a * b
};

console.log("Sum:", mathUtils.add(14, 28));
console.log("Product:", mathUtils.multiply(6, 7));`,
    execution_mode: 'nodejs',
    language: 'javascript',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444803',
    module_id: '33333333-3333-3333-3333-333333333802',
    course_id: NODE_COURSE_ID,
    slug: 'nodejs-file-system-fs',
    title: 'The File System (fs) Module',
    sort_order: 1,
    status: 'published',
    estimated_minutes: 25,
    objectives: [
      'Read and write files asynchronously with fs.promises',
      'Create and remove directories with fs.mkdir and fs.rm',
      'Stream large files with createReadStream'
    ],
    content_md: `## The \`fs\` Module

Node.js provides the built-in \`fs\` (File System) module to read, write, and manipulate files:

\`\`\`javascript
const fs = require('fs');

// Synchronous write
fs.writeFileSync('output.txt', 'Hello StackForge!');

// Synchronous read
const content = fs.readFileSync('output.txt', 'utf8');
console.log(content);
\`\`\``,
    key_points_md: `- Always prefer asynchronous or promise-based file methods in web servers.
- Specify encoding like \`'utf8'\` when reading text files to avoid raw Buffers.`,
    common_mistakes_md: `- Using synchronous \`fs.readFileSync\` on high-traffic server request paths, freezing the event loop.`,
    starter_code: `const fs = require('fs');

fs.writeFileSync('server.log', 'Log entry: server startup successful\\n');
const log = fs.readFileSync('server.log');
console.log("Log content:", log);`,
    solution_code: `const fs = require('fs');

fs.writeFileSync('server.log', 'Log entry: server startup successful\\n');
const log = fs.readFileSync('server.log');
console.log("Log content:", log);`,
    execution_mode: 'nodejs',
    language: 'javascript',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444804',
    module_id: '33333333-3333-3333-3333-333333333802',
    course_id: NODE_COURSE_ID,
    slug: 'nodejs-path-and-env',
    title: 'Path Normalization & Environment Variables',
    sort_order: 2,
    status: 'published',
    estimated_minutes: 20,
    objectives: [
      'Resolve cross-platform file paths using path.join and path.resolve',
      'Manage environment secrets securely using process.env and dotenv',
      'Prevent cross-platform directory separator bugs (Windows \\ vs Linux /)'
    ],
    content_md: `## Path Normalization: \`path.join()\`

Different operating systems use different file path delimiters (Windows uses \`\\\`, Linux uses \`/\`). The \`path\` module resolves this automatically:

\`\`\`javascript
const path = require('path');
const configPath = path.join(__dirname, 'config', 'database.json');
\`\`\`

## Environment Variables (\`process.env\`)
Store database credentials, API keys, and port numbers outside your source code:
\`\`\`javascript
const PORT = process.env.PORT || 3000;
\`\`\``,
    key_points_md: `- Never hardcode path strings with slashes; always use \`path.join()\`.
- Store secrets in \`.env\` files and add \`.env\` to \`.gitignore\`.`,
    common_mistakes_md: `- Hardcoding Windows backslashes \`\\folder\\file\`, crashing deployments on Linux servers.`,
    starter_code: `const path = require('path');

const filePath = path.join('public', 'uploads', 'avatar.png');
console.log("Normalized cross-platform path:", filePath);
console.log("Server listening port:", process.env.PORT || 3000);`,
    solution_code: `const path = require('path');

const filePath = path.join('public', 'uploads', 'avatar.png');
console.log("Normalized cross-platform path:", filePath);
console.log("Server listening port:", process.env.PORT || 3000);`,
    execution_mode: 'nodejs',
    language: 'javascript',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444805',
    module_id: '33333333-3333-3333-3333-333333333802',
    course_id: NODE_COURSE_ID,
    slug: 'nodejs-http-server',
    title: 'Building an HTTP Web Server',
    sort_order: 3,
    status: 'published',
    estimated_minutes: 25,
    objectives: [
      'Create basic web servers using the native http module',
      'Inspect request URLs, methods, and headers',
      'Send HTTP status codes and JSON responses'
    ],
    content_md: `## The Native \`http\` Module

Node.js has a built-in module called \`http\` which allows Node.js to transfer data over the Hyper Text Transfer Protocol (HTTP):

\`\`\`javascript
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ status: 'ok', server: 'Node.js' }));
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
\`\`\``,
    key_points_md: `- \`req\` contains incoming client data.
- \`res\` sends headers, status codes, and body content back to the client.`,
    common_mistakes_md: `- Forgetting to call \`res.end()\`, leaving the client browser hanging forever.`,
    starter_code: `console.log("Starting Node.js HTTP server simulation...");
const port = process.env.PORT || 8080;
console.log(\`Server listening on http://localhost:\${port}\`);`,
    solution_code: `console.log("Starting Node.js HTTP server simulation...");
const port = process.env.PORT || 8080;
console.log(\`Server listening on http://localhost:\${port}\`);`,
    execution_mode: 'nodejs',
    language: 'javascript',
    editor_enabled: true
  },

  // ==========================================
  // EXPRESS.JS LESSONS (1 - 6)
  // ==========================================
  {
    id: '44444444-4444-4444-4444-444444444901',
    module_id: '33333333-3333-3333-3333-333333333901',
    course_id: EXPRESS_COURSE_ID,
    slug: 'express-intro-first-server',
    title: 'Express Introduction & First Web Server',
    sort_order: 1,
    status: 'published',
    estimated_minutes: 20,
    objectives: [
      'Understand Express as the de facto web framework for Node.js',
      'Initialize an Express application and listen on a port',
      'Define basic root GET endpoints'
    ],
    content_md: `## What is Express?

**Express** is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

While Node's raw \`http\` module is low-level, Express makes routing, middleware, and API responses clean and intuitive:

\`\`\`javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Welcome to StackForge API!');
});

app.listen(3000, () => console.log('Server started on port 3000'));
\`\`\``,
    key_points_md: `- Express wraps Node's HTTP module with a convenient routing layer.
- \`app.listen(port)\` starts the web server.`,
    common_mistakes_md: `- Forgetting to invoke \`express()\` to create the app instance.`,
    starter_code: `const express = require('express');
const app = express();

app.get('/', (req, res) => {
  console.log("Root endpoint hit");
});

app.listen(3000, () => {
  console.log("Express server listening on port 3000");
});`,
    solution_code: `const express = require('express');
const app = express();

app.get('/', (req, res) => {
  console.log("Root endpoint hit");
});

app.listen(3000, () => {
  console.log("Express server listening on port 3000");
});`,
    execution_mode: 'express',
    language: 'javascript',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444902',
    module_id: '33333333-3333-3333-3333-333333333901',
    course_id: EXPRESS_COURSE_ID,
    slug: 'express-routes-and-methods',
    title: 'HTTP Methods: GET, POST, PUT, DELETE',
    sort_order: 2,
    status: 'published',
    estimated_minutes: 20,
    objectives: [
      'Map CRUD operations to HTTP verbs',
      'Use app.get, app.post, app.put, and app.delete',
      'Send structured JSON responses with res.json()'
    ],
    content_md: `## HTTP Routing & CRUD

| HTTP Verb | CRUD Action | Express Method |
| :--- | :--- | :--- |
| **GET** | Read data | \`app.get('/api/courses')\` |
| **POST** | Create data | \`app.post('/api/courses')\` |
| **PUT** | Update / Replace data | \`app.put('/api/courses/:id')\` |
| **DELETE**| Remove data | \`app.delete('/api/courses/:id')\` |

\`\`\`javascript
app.get('/api/users', (req, res) => {
  res.json([
    { id: 1, name: "Maya" },
    { id: 2, name: "Devon" }
  ]);
});
\`\`\``,
    key_points_md: `- Always use \`res.json()\` when returning JSON data from API endpoints.
- Group related resources under common path prefixes (e.g. \`/api/...\`).`,
    common_mistakes_md: `- Using \`GET\` for actions that mutate or delete database records.`,
    starter_code: `const express = require('express');
const app = express();

app.get('/api/health', (req, res) => {
  console.log("Health check verified: Status 200 OK");
});

app.post('/api/users', (req, res) => {
  console.log("User record creation requested");
});

app.listen(3000);`,
    solution_code: `const express = require('express');
const app = express();

app.get('/api/health', (req, res) => {
  console.log("Health check verified: Status 200 OK");
});

app.post('/api/users', (req, res) => {
  console.log("User record creation requested");
});

app.listen(3000);`,
    execution_mode: 'express',
    language: 'javascript',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444903',
    module_id: '33333333-3333-3333-3333-333333333901',
    course_id: EXPRESS_COURSE_ID,
    slug: 'express-route-parameters',
    title: 'URL Parameters: req.params & req.query',
    sort_order: 3,
    status: 'published',
    estimated_minutes: 20,
    objectives: [
      'Extract dynamic URL segments with req.params (e.g. /users/:id)',
      'Parse optional query string filters with req.query (?sort=asc&limit=10)',
      'Validate parameter types before database queries'
    ],
    content_md: `## Dynamic Route Parameters

- **Route Parameters (\`req.params\`)**: Named URL segments used to identify a specific resource:
  \`\`\`javascript
  app.get('/api/courses/:slug', (req, res) => {
    const { slug } = req.params;
    console.log("Requested course slug:", slug);
  });
  \`\`\`
- **Query Parameters (\`req.query\`)**: Optional key-value pairs following \`?\`:
  \`\`\`javascript
  // URL: /api/courses?category=frontend&sort=rating
  app.get('/api/courses', (req, res) => {
    const { category, sort } = req.query;
  });
  \`\`\``,
    key_points_md: `- Parameters prefixed with \`:\` populate \`req.params\`.
- Query strings populate \`req.query\`.`,
    common_mistakes_md: `- Forgetting that \`req.params.id\` is a string, not a number! Convert with \`Number(req.params.id)\`.`,
    starter_code: `const express = require('express');
const app = express();

app.get('/api/courses/:courseId', (req, res) => {
  console.log("Course detail route registered");
});

app.listen(3000);`,
    solution_code: `const express = require('express');
const app = express();

app.get('/api/courses/:courseId', (req, res) => {
  console.log("Course detail route registered");
});

app.listen(3000);`,
    execution_mode: 'express',
    language: 'javascript',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444904',
    module_id: '33333333-3333-3333-3333-333333333902',
    course_id: EXPRESS_COURSE_ID,
    slug: 'express-middleware-body-parser',
    title: 'Middleware & Request Body Parsing',
    sort_order: 1,
    status: 'published',
    estimated_minutes: 25,
    objectives: [
      'Understand the Express Middleware pipeline (req, res, next)',
      'Parse incoming JSON request payloads with express.json()',
      'Create custom authentication and logger middleware'
    ],
    content_md: `## What is Middleware?

Middleware functions are functions that have access to the request object (\`req\`), the response object (\`res\`), and the \`next\` middleware function in the application's request-response cycle.

\`\`\`javascript
// Custom logger middleware
app.use((req, res, next) => {
  console.log(\`[\${req.method}] \${req.url} at \${new Date().toISOString()}\`);
  next(); // Pass control to the next handler!
});

// JSON body parser (REQUIRED for POST/PUT requests!)
app.use(express.json());
\`\`\``,
    key_points_md: `- Middleware executes in the order it is declared with \`app.use()\`.
- Always call \`next()\` unless terminating the request with \`res.send()\`.`,
    common_mistakes_md: `- Forgetting to call \`next()\`, leaving incoming requests hanging indefinitely!`,
    starter_code: `const express = require('express');
const app = express();

// Enable JSON body parsing
app.use(express.json());

app.post('/api/feedback', (req, res) => {
  console.log("Received feedback payload");
});

app.listen(3000);`,
    solution_code: `const express = require('express');
const app = express();

// Enable JSON body parsing
app.use(express.json());

app.post('/api/feedback', (req, res) => {
  console.log("Received feedback payload");
});

app.listen(3000);`,
    execution_mode: 'express',
    language: 'javascript',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444905',
    module_id: '33333333-3333-3333-3333-333333333902',
    course_id: EXPRESS_COURSE_ID,
    slug: 'express-restful-apis',
    title: 'Building RESTful APIs: Complete CRUD',
    sort_order: 2,
    status: 'published',
    estimated_minutes: 25,
    objectives: [
      'Design RESTful resource endpoints (/api/items, /api/items/:id)',
      'Implement in-memory CRUD operations',
      'Set accurate HTTP Status codes: 200, 201 Created, 204 No Content, 404 Not Found'
    ],
    content_md: `## REST API Architecture

A REST (Representational State Transfer) API standardizes client-server communication:

\`\`\`javascript
const express = require('express');
const app = express();
app.use(express.json());

let courses = [{ id: 1, title: 'HTML' }];

// 1. GET all
app.get('/api/courses', (req, res) => res.json(courses));

// 2. POST create
app.post('/api/courses', (req, res) => {
  const newCourse = { id: courses.length + 1, ...req.body };
  courses.push(newCourse);
  res.status(201).json(newCourse);
});
\`\`\``,
    key_points_md: `- Return \`201 Created\` when creating new records.
- Return \`404 Not Found\` when requested ID does not exist.`,
    common_mistakes_md: `- Returning \`200 OK\` for errors.`,
    starter_code: `const express = require('express');
const app = express();
app.use(express.json());

app.get('/api/courses', (req, res) => {
  console.log("Courses list returned");
});

app.listen(3000);`,
    solution_code: `const express = require('express');
const app = express();
app.use(express.json());

app.get('/api/courses', (req, res) => {
  console.log("Courses list returned");
});

app.listen(3000);`,
    execution_mode: 'express',
    language: 'javascript',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444906',
    module_id: '33333333-3333-3333-3333-333333333902',
    course_id: EXPRESS_COURSE_ID,
    slug: 'express-error-handling',
    title: 'Error Handling & HTTP Status Codes',
    sort_order: 3,
    status: 'published',
    estimated_minutes: 20,
    objectives: [
      'Understand HTTP status codes: 2xx (Success), 4xx (Client Error), 5xx (Server Error)',
      'Define centralized Express error-handling middleware (err, req, res, next)',
      'Catch unhandled Promise rejections'
    ],
    content_md: `## Centralized Error Handling

Express error-handling middleware accepts **4 arguments**: \`(err, req, res, next)\`:

\`\`\`javascript
app.use((err, req, res, next) => {
  console.error('[SERVER ERROR]:', err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
      status: err.status || 500
    }
  });
});
\`\`\``,
    key_points_md: `- Error middleware MUST define 4 arguments \`(err, req, res, next)\`.
- Place error handling middleware at the very END of your app, after all routes.`,
    common_mistakes_md: `- Omitting the 4th parameter \`next\`, which causes Express to treat it as regular middleware instead of error handling!`,
    starter_code: `const express = require('express');
const app = express();

app.get('/api/error-test', (req, res) => {
  console.log("Triggering route error handling");
});

app.listen(3000);`,
    solution_code: `const express = require('express');
const app = express();

app.get('/api/error-test', (req, res) => {
  console.log("Triggering route error handling");
});

app.listen(3000);`,
    execution_mode: 'express',
    language: 'javascript',
    editor_enabled: true
  }
];
