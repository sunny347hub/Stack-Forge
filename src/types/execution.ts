import type { ExecutionMode } from './database';

export type ExecutionStatus = 'idle' | 'running' | 'success' | 'error' | 'timeout';

export interface ConsoleMessage {
  type: 'log' | 'info' | 'warn' | 'error';
  content: string;
  timestamp: number;
}

export interface SqlQueryResult {
  columns: string[];
  values: (string | number | boolean | null)[][];
  rowCount: number;
  executionTimeMs: number;
}

export interface ExecutionResult {
  status: ExecutionStatus;
  stdout: string;
  stderr: string;
  logs: ConsoleMessage[];
  executionTimeMs: number;
  exitCode?: number;
  sqlResult?: SqlQueryResult;
  previewHtml?: string;
  error?: string | null;
}

export interface ExecutionContext {
  code: string;
  language: string;
  mode: ExecutionMode;
  lessonId: string;
  expectedOutput?: string | null;
}
