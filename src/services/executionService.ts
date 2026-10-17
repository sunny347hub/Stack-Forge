import initSqlJs, { type Database } from 'sql.js';
import type { ExecutionResult, ConsoleMessage, SqlQueryResult } from '../types/execution';
import type { ExecutionMode } from '../types/database';

let sqlDbPromise: Promise<Database> | null = null;

async function getSqlDatabase(): Promise<Database> {
  if (!sqlDbPromise) {
    sqlDbPromise = (async () => {
      const SQL = await initSqlJs({
        locateFile: () => '/sql-wasm.wasm'
      });
      const db = new SQL.Database();
      
      // Seed default relational schema for student learning
      db.run(`
        CREATE TABLE IF NOT EXISTS students (
          id INTEGER PRIMARY KEY,
          name TEXT NOT NULL,
          role TEXT NOT NULL,
          experience_years INTEGER NOT NULL,
          status TEXT NOT NULL
        );

        INSERT INTO students VALUES 
          (1, 'Maya Lin', 'Frontend Developer', 3, 'active'),
          (2, 'Devon Patel', 'Junior Engineer', 1, 'active'),
          (3, 'Priya Sharma', 'Full-Stack Engineer', 4, 'active'),
          (4, 'Marcus Aurelius', 'Backend Developer', 5, 'inactive'),
          (5, 'Chloe Bennett', 'DevOps Specialist', 2, 'active');

        CREATE TABLE IF NOT EXISTS courses (
          id INTEGER PRIMARY KEY,
          title TEXT NOT NULL,
          category TEXT NOT NULL,
          difficulty TEXT NOT NULL
        );

        INSERT INTO courses VALUES
          (101, 'HTML Fundamentals', 'frontend', 'beginner'),
          (102, 'CSS Fundamentals', 'frontend', 'beginner'),
          (103, 'JavaScript Mastery', 'frontend', 'intermediate'),
          (104, 'Node.js & Express', 'backend', 'intermediate'),
          (105, 'Relational SQL', 'databases', 'beginner');

        CREATE TABLE IF NOT EXISTS enrollments (
          student_id INTEGER,
          course_id INTEGER,
          grade INTEGER,
          PRIMARY KEY (student_id, course_id)
        );

        INSERT INTO enrollments VALUES
          (1, 101, 98),
          (1, 102, 95),
          (1, 103, 91),
          (2, 101, 88),
          (3, 103, 94),
          (3, 104, 89),
          (5, 105, 96);
      `);

      return db;
    })();
  }
  return sqlDbPromise;
}

/**
 * Strips basic TypeScript type annotations for safe browser Worker execution
 */
function stripTypeScript(tsCode: string): string {
  return tsCode
    // Remove interfaces and types
    .replace(/(interface|type)\s+[A-Za-z0-9_]+\s*(=|{)[\s\S]*?(};|})/g, '')
    // Remove generic parameters from function calls/definitions
    .replace(/<[A-Za-z0-9_,\s]+>(?=\()/g, '')
    // Remove type casts: `as Type`
    .replace(/\s+as\s+[A-Za-z0-9_<>[\]]+/g, '')
    // Remove return type annotations `: Type {` or `: void =>`
    .replace(/:\s*[A-Za-z0-9_<>[\]|&]+\s*(?=\{|\=\>)/g, ' ')
    // Remove variable/parameter type annotations `: string`, `: number[]`
    .replace(/:\s*[A-Za-z0-9_<>[\]|&]+/g, '');
}

export const executionService = {
  async executeCode(
    code: string,
    mode: ExecutionMode,
    _language: string = 'javascript'
  ): Promise<ExecutionResult> {
    const startTime = performance.now();

    switch (mode) {
      case 'html_preview':
      case 'css_preview': {
        const previewHtml = executionService.formatHtmlPreview(code, mode);
        return {
          status: 'success',
          stdout: 'Preview rendered in isolated sandbox.',
          stderr: '',
          logs: [{ type: 'info', content: 'HTML/CSS sandbox live rendered', timestamp: Date.now() }],
          executionTimeMs: Math.round(performance.now() - startTime),
          previewHtml
        };
      }

      case 'react_preview': {
        const previewHtml = executionService.formatReactPreview(code);
        return {
          status: 'success',
          stdout: 'React component mounted in sandboxed preview.',
          stderr: '',
          logs: [{ type: 'info', content: 'React live preview mounted successfully', timestamp: Date.now() }],
          executionTimeMs: Math.round(performance.now() - startTime),
          previewHtml
        };
      }

      case 'javascript':
        return executionService.executeJavaScript(code);

      case 'typescript':
        return executionService.executeTypeScript(code);

      case 'nodejs':
      case 'express':
        return executionService.executeNodeCode(code);

      case 'sql':
      case 'postgresql':
      case 'mysql':
        return executionService.executeSql(code);

      case 'guided':
        return executionService.executeGuidedCommand(code);

      default:
        return {
          status: 'success',
          stdout: 'Lesson reading mode. No active execution required.',
          stderr: '',
          logs: [],
          executionTimeMs: 0
        };
    }
  },

  async executeTypeScript(code: string): Promise<ExecutionResult> {
    try {
      const transpiled = stripTypeScript(code);
      return await executionService.executeJavaScript(transpiled);
    } catch (err: any) {
      return {
        status: 'error',
        stdout: '',
        stderr: `TypeScript syntax processing error: ${err.message}`,
        logs: [{ type: 'error', content: err.message, timestamp: Date.now() }],
        executionTimeMs: 1,
        exitCode: 1,
        error: err.message
      };
    }
  },

  async executeNodeCode(code: string): Promise<ExecutionResult> {
    // Inject mock Node / Express runtime helpers
    const wrappedCode = `
      const process = { env: { NODE_ENV: 'development', PORT: 3000 } };
      const require = function(moduleName) {
        if (moduleName === 'express') {
          return function createExpressApp() {
            const routes = [];
            return {
              use: (fn) => { console.log('[Express Middleware] Applied middleware'); },
              get: (path, handler) => {
                routes.push({ method: 'GET', path });
                console.log('[Express Route] Registered GET ' + path);
              },
              post: (path, handler) => {
                routes.push({ method: 'POST', path });
                console.log('[Express Route] Registered POST ' + path);
              },
              listen: (port, cb) => {
                console.log('[Express Server] Server listening on port ' + port);
                if (cb) cb();
              }
            };
          };
        }
        if (moduleName === 'fs') {
          return {
            readFileSync: (filename) => 'Sample file contents for: ' + filename,
            writeFileSync: (filename, data) => { console.log('[fs.writeFileSync] Saved ' + filename); }
          };
        }
        if (moduleName === 'path') {
          return {
            join: (...parts) => parts.join('/'),
            resolve: (...parts) => '/' + parts.join('/')
          };
        }
        return {};
      };
      ${code}
    `;
    return executionService.executeJavaScript(wrappedCode);
  },

  async executeJavaScript(code: string): Promise<ExecutionResult> {
    const startTime = performance.now();
    const logs: ConsoleMessage[] = [];

    // Optional Remote Sandbox check
    const remoteApi = import.meta.env.VITE_EXECUTION_API_URL;
    if (remoteApi) {
      try {
        const res = await fetch(`${remoteApi}/execute`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ language: 'javascript', version: '18.15.0', files: [{ content: code }] })
        });
        if (res.ok) {
          const data = await res.json();
          const run = data.run || {};
          return {
            status: run.code === 0 ? 'success' : 'error',
            stdout: run.stdout || '',
            stderr: run.stderr || '',
            logs: [{ type: run.code === 0 ? 'log' : 'error', content: run.output || '', timestamp: Date.now() }],
            executionTimeMs: Math.round(performance.now() - startTime),
            exitCode: run.code
          };
        }
      } catch (err) {
        console.warn('Remote execution fallback to isolated worker:', err);
      }
    }

    // Isolated Web Worker Execution
    return new Promise((resolve) => {
      const workerCode = `
        self.onmessage = function(e) {
          const userCode = e.data;

          function safeSerialize(val) {
            try {
              if (val === undefined) return 'undefined';
              if (val === null) return 'null';
              if (typeof val === 'object') return JSON.stringify(val);
              return String(val);
            } catch (err) {
              return String(val);
            }
          }

          console.log = function(...args) {
            self.postMessage({ type: 'log', content: args.map(safeSerialize).join(' ') });
          };
          console.info = function(...args) {
            self.postMessage({ type: 'info', content: args.map(safeSerialize).join(' ') });
          };
          console.warn = function(...args) {
            self.postMessage({ type: 'warn', content: args.map(safeSerialize).join(' ') });
          };
          console.error = function(...args) {
            self.postMessage({ type: 'error', content: args.map(safeSerialize).join(' ') });
          };

          try {
            const func = new Function(userCode);
            func();
            self.postMessage({ type: 'done', exitCode: 0 });
          } catch (err) {
            self.postMessage({ type: 'error', content: err.name + ': ' + err.message });
            self.postMessage({ type: 'done', exitCode: 1, error: err.message });
          }
        };
      `;

      const blob = new Blob([workerCode], { type: 'application/javascript' });
      const workerUrl = URL.createObjectURL(blob);
      const worker = new Worker(workerUrl);

      let isFinished = false;

      const timeout = setTimeout(() => {
        if (!isFinished) {
          isFinished = true;
          worker.terminate();
          URL.revokeObjectURL(workerUrl);
          logs.push({
            type: 'error',
            content: 'Execution timed out (3000ms limit exceeded). Check for infinite loops.',
            timestamp: Date.now()
          });
          resolve({
            status: 'timeout',
            stdout: logs.map(l => l.content).join('\n'),
            stderr: 'Execution timed out',
            logs,
            executionTimeMs: 3000,
            exitCode: 124,
            error: 'Execution timed out'
          });
        }
      }, 3000);

      worker.onmessage = (event) => {
        const msg = event.data;
        if (msg.type === 'done') {
          if (!isFinished) {
            isFinished = true;
            clearTimeout(timeout);
            worker.terminate();
            URL.revokeObjectURL(workerUrl);

            const hasError = msg.exitCode !== 0;
            const stdout = logs.filter(l => l.type !== 'error').map(l => l.content).join('\n');
            const stderr = logs.filter(l => l.type === 'error').map(l => l.content).join('\n');

            resolve({
              status: hasError ? 'error' : 'success',
              stdout,
              stderr,
              logs,
              executionTimeMs: Math.round(performance.now() - startTime),
              exitCode: msg.exitCode,
              error: msg.error || null
            });
          }
        } else {
          logs.push({
            type: msg.type,
            content: msg.content,
            timestamp: Date.now()
          });
        }
      };

      worker.onerror = (err) => {
        if (!isFinished) {
          isFinished = true;
          clearTimeout(timeout);
          worker.terminate();
          URL.revokeObjectURL(workerUrl);
          logs.push({
            type: 'error',
            content: err.message || 'Worker runtime error',
            timestamp: Date.now()
          });
          resolve({
            status: 'error',
            stdout: '',
            stderr: err.message,
            logs,
            executionTimeMs: Math.round(performance.now() - startTime),
            exitCode: 1,
            error: err.message
          });
        }
      };

      worker.postMessage(code);
    });
  },

  async executeSql(query: string): Promise<ExecutionResult> {
    const startTime = performance.now();
    try {
      const db = await getSqlDatabase();
      const results = db.exec(query);

      const executionTimeMs = Math.round(performance.now() - startTime);

      if (results.length === 0) {
        return {
          status: 'success',
          stdout: 'Query executed successfully. 0 rows returned (or DDL statement applied).',
          stderr: '',
          logs: [{ type: 'info', content: 'Query executed successfully', timestamp: Date.now() }],
          executionTimeMs,
          sqlResult: {
            columns: [],
            values: [],
            rowCount: 0,
            executionTimeMs
          }
        };
      }

      const firstResult = results[0];
      const sqlResult: SqlQueryResult = {
        columns: firstResult.columns,
        values: firstResult.values as (string | number | boolean | null)[][],
        rowCount: firstResult.values.length,
        executionTimeMs
      };

      return {
        status: 'success',
        stdout: `Query returned ${firstResult.values.length} row(s).`,
        stderr: '',
        logs: [{
          type: 'info',
          content: `Fetched ${firstResult.values.length} rows in ${executionTimeMs}ms`,
          timestamp: Date.now()
        }],
        executionTimeMs,
        sqlResult
      };
    } catch (err: any) {
      const executionTimeMs = Math.round(performance.now() - startTime);
      return {
        status: 'error',
        stdout: '',
        stderr: err.message || 'SQL Syntax Error',
        logs: [{ type: 'error', content: err.message, timestamp: Date.now() }],
        executionTimeMs,
        exitCode: 1,
        error: err.message
      };
    }
  },

  executeGuidedCommand(commandInput: string): ExecutionResult {
    const startTime = performance.now();
    const lines = commandInput.split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('#'));
    const logs: ConsoleMessage[] = [];
    const outputLines: string[] = [];

    outputLines.push('[Guided Shell Simulation Environment]');

    lines.forEach(cmd => {
      outputLines.push(`$ ${cmd}`);
      if (cmd === 'git init') {
        outputLines.push('Initialized empty Git repository in /workspace/project/.git/');
      } else if (cmd === 'git status') {
        outputLines.push('On branch main');
        outputLines.push('Changes to be committed:');
        outputLines.push('  (use "git rm --cached <file>..." to unstage)');
        outputLines.push('\tnew file:   index.html');
        outputLines.push('\tnew file:   styles.css');
      } else if (cmd.startsWith('git add')) {
        outputLines.push('Changes staged for commit.');
      } else if (cmd.startsWith('git commit')) {
        const msg = cmd.replace(/git commit -m\s*["']?/, '').replace(/["']?$/, '') || 'feat: update code';
        outputLines.push(`[main (root-commit) 7a4e19d] ${msg}`);
        outputLines.push(' 2 files changed, 48 insertions(+)');
        outputLines.push(' create mode 100644 index.html');
        outputLines.push(' create mode 100644 styles.css');
      } else if (cmd === 'git branch') {
        outputLines.push('* main\n  feature/auth\n  dev');
      } else if (cmd.startsWith('git checkout -b') || cmd.startsWith('git switch -c')) {
        const branch = cmd.split(' ').pop();
        outputLines.push(`Switched to a new branch '${branch}'`);
      } else if (cmd === 'git log' || cmd === 'git log --oneline') {
        outputLines.push('7a4e19d (HEAD -> main) feat: update code');
        outputLines.push('3b129a0 feat: initial project scaffolding');
      } else if (cmd === 'npm init -y' || cmd === 'npm init') {
        outputLines.push('Wrote to /workspace/project/package.json:');
        outputLines.push('{\n  "name": "stackforge-project",\n  "version": "1.0.0",\n  "main": "index.js",\n  "scripts": {\n    "start": "node index.js"\n  }\n}');
      } else if (cmd.startsWith('npm install') || cmd.startsWith('npm i')) {
        const pkg = cmd.split(' ').slice(2).join(' ') || 'packages';
        outputLines.push(`added 14 packages in 1.2s for ${pkg}`);
        outputLines.push('0 vulnerabilities found');
      } else if (cmd === 'npm run start' || cmd === 'npm start') {
        outputLines.push('> stackforge-project@1.0.0 start\n> node index.js\nApp listening on http://localhost:3000');
      } else {
        outputLines.push(`Command executed successfully: ${cmd}`);
      }
    });

    const stdout = outputLines.join('\n');
    logs.push({ type: 'log', content: stdout, timestamp: Date.now() });

    return {
      status: 'success',
      stdout,
      stderr: '',
      logs,
      executionTimeMs: Math.round(performance.now() - startTime),
      exitCode: 0
    };
  },

  formatHtmlPreview(code: string, mode: ExecutionMode): string {
    const consoleBridge = `
<script>
  (function() {
    function serialize(val) {
      try {
        if (val === undefined) return 'undefined';
        if (val === null) return 'null';
        if (typeof val === 'object') return JSON.stringify(val);
        return String(val);
      } catch(e) { return String(val); }
    }
    ['log', 'info', 'warn', 'error'].forEach(function(level) {
      var orig = console[level];
      console[level] = function() {
        var args = Array.prototype.slice.call(arguments);
        var msg = args.map(serialize).join(' ');
        if (window.parent && window.parent !== window) {
          window.parent.postMessage({ type: 'stackforge_console', level: level, content: msg }, '*');
        }
        if (orig) orig.apply(console, arguments);
      };
    });
    window.onerror = function(msg, url, line) {
      if (window.parent && window.parent !== window) {
        window.parent.postMessage({ type: 'stackforge_console', level: 'error', content: 'Error on line ' + line + ': ' + msg }, '*');
      }
    };
  })();
</script>`;

    if (mode === 'css_preview') {
      return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  ${consoleBridge}
  <style>
    ${code}
  </style>
</head>
<body>
  <div style="font-family: sans-serif; padding: 20px;">
    ${code.includes('<body') ? '' : '<p>Preview rendered with CSS styles.</p>'}
  </div>
</body>
</html>`;
    }

    // Direct HTML preview
    if (!code.includes('<!DOCTYPE') && !code.includes('<html')) {
      return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  ${consoleBridge}
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; margin: 0; padding: 16px; background: #ffffff; color: #111827; }
  </style>
</head>
<body>
  ${code}
</body>
</html>`;
    }

    // Insert console bridge into existing HTML
    if (code.includes('</head>')) {
      return code.replace('</head>', `${consoleBridge}\n</head>`);
    } else if (code.includes('<body')) {
      return code.replace(/<body[^>]*>/, `$&${consoleBridge}`);
    }

    return `${consoleBridge}\n${code}`;
  },

  formatReactPreview(code: string): string {
    const consoleBridge = `
<script>
  (function() {
    function serialize(val) {
      try {
        if (val === undefined) return 'undefined';
        if (val === null) return 'null';
        if (typeof val === 'object') return JSON.stringify(val);
        return String(val);
      } catch(e) { return String(val); }
    }
    ['log', 'info', 'warn', 'error'].forEach(function(level) {
      var orig = console[level];
      console[level] = function() {
        var args = Array.prototype.slice.call(arguments);
        var msg = args.map(serialize).join(' ');
        if (window.parent && window.parent !== window) {
          window.parent.postMessage({ type: 'stackforge_console', level: level, content: msg }, '*');
        }
        if (orig) orig.apply(console, arguments);
      };
    });
    window.onerror = function(msg, url, line) {
      if (window.parent && window.parent !== window) {
        window.parent.postMessage({ type: 'stackforge_console', level: 'error', content: 'React error on line ' + line + ': ' + msg }, '*');
      }
    };
  })();
</script>`;

    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  ${consoleBridge}
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <style>
    body { font-family: system-ui, sans-serif; padding: 16px; margin: 0; background: #ffffff; color: #0f172a; }
  </style>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel">
    try {
      ${code}
      // Auto-mount App or default export if present
      if (typeof App !== 'undefined') {
        ReactDOM.createRoot(document.getElementById('root')).render(<App />);
      }
    } catch (err) {
      console.error(err.message);
      document.getElementById('root').innerHTML = '<div style="color:#ef4444;font-family:monospace;padding:12px;background:#fef2f2;border:1px solid #fecaca;border-radius:8px;"><strong>React Error:</strong> ' + err.message + '</div>';
    }
  </script>
</body>
</html>`;
  }
};
