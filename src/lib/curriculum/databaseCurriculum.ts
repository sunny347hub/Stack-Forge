import type { CourseModule, Lesson } from '../../types/database';

export const SQL_COURSE_ID = '22222222-2222-2222-2222-222222222210';
export const POSTGRES_COURSE_ID = '22222222-2222-2222-2222-222222222211';
export const MYSQL_COURSE_ID = '22222222-2222-2222-2222-222222222212';

export const DATABASE_MODULES: CourseModule[] = [
  // SQL Modules
  {
    id: '33333333-3333-3333-3333-333333333010',
    course_id: SQL_COURSE_ID,
    title: 'Module 1: Database Concepts & Queries',
    sort_order: 1,
    status: 'published'
  },
  {
    id: '33333333-3333-3333-3333-333333333020',
    course_id: SQL_COURSE_ID,
    title: 'Module 2: Aggregations & Grouping',
    sort_order: 2,
    status: 'published'
  },
  {
    id: '33333333-3333-3333-3333-333333333030',
    course_id: SQL_COURSE_ID,
    title: 'Module 3: Table Relationships & JOINs',
    sort_order: 3,
    status: 'published'
  },

  // PostgreSQL Modules
  {
    id: '33333333-3333-3333-3333-333333333011',
    course_id: POSTGRES_COURSE_ID,
    title: 'Module 1: Postgres Data Types & Tables',
    sort_order: 1,
    status: 'published'
  },
  {
    id: '33333333-3333-3333-3333-333333333021',
    course_id: POSTGRES_COURSE_ID,
    title: 'Module 2: JSONB, Indexing & Transactions',
    sort_order: 2,
    status: 'published'
  },

  // MySQL Modules
  {
    id: '33333333-3333-3333-3333-333333333012',
    course_id: MYSQL_COURSE_ID,
    title: 'Module 1: MySQL Storage & Dialect',
    sort_order: 1,
    status: 'published'
  },
  {
    id: '33333333-3333-3333-3333-333333333022',
    course_id: MYSQL_COURSE_ID,
    title: 'Module 2: Indexing & Relational Constraints',
    sort_order: 2,
    status: 'published'
  }
];

export const DATABASE_LESSONS: Lesson[] = [
  // ==========================================
  // SQL FUNDAMENTALS (1 - 11)
  // ==========================================
  {
    id: '44444444-4444-4444-4444-444444444001',
    module_id: '33333333-3333-3333-3333-333333333010',
    course_id: SQL_COURSE_ID,
    slug: 'sql-intro-relational-tables',
    title: 'Relational Database Concepts & Tables',
    sort_order: 1,
    status: 'published',
    estimated_minutes: 15,
    objectives: [
      'Understand Relational Database Management Systems (RDBMS)',
      'Learn how tables, rows, columns, and data types represent data',
      'Execute your first SELECT query'
    ],
    content_md: `## What is SQL?

**SQL** stands for **S**tructured **Q**uery **L**anguage. It is the standard language for storing, manipulating, and retrieving data in relational databases.

## Tables, Columns & Rows
A database most often contains one or more tables. Each table is identified by a name (e.g. \`students\`, \`courses\`) and contains rows of data:

\`\`\`sql
SELECT * FROM students;
\`\`\`
- \`SELECT *\`: Selects all columns.
- \`FROM students\`: Specifies the table to query.`,
    key_points_md: `- SQL keywords are case-insensitive, but uppercase is standard convention.
- Statements terminate with a semicolon \`;\`.`,
    common_mistakes_md: `- Misspelling table names or querying tables that do not exist.`,
    starter_code: `SELECT * FROM students;`,
    solution_code: `SELECT * FROM students;`,
    execution_mode: 'sql',
    language: 'sql',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444002',
    module_id: '33333333-3333-3333-3333-333333333010',
    course_id: SQL_COURSE_ID,
    slug: 'sql-select-and-where',
    title: 'The SELECT Statement & Column Aliasing',
    sort_order: 2,
    status: 'published',
    estimated_minutes: 20,
    objectives: [
      'Select specific columns instead of querying all columns with *',
      'Rename output columns with AS aliases',
      'Eliminate duplicates with SELECT DISTINCT'
    ],
    content_md: `## Specific Column Selection

Instead of retrieving all columns with \`SELECT *\`, good database practice queries only the columns you actually need:

\`\`\`sql
SELECT name, role AS job_title 
FROM students;
\`\`\`

## Removing Duplicates with \`DISTINCT\`
\`\`\`sql
SELECT DISTINCT role FROM students;
\`\`\``,
    key_points_md: `- Explicit column selection saves network bandwidth and database memory.
- Use \`AS\` to assign readable aliases.`,
    common_mistakes_md: `- Forgetting commas between column names in the SELECT clause.`,
    starter_code: `SELECT name, role AS current_role FROM students;`,
    solution_code: `SELECT name, role AS current_role FROM students;`,
    execution_mode: 'sql',
    language: 'sql',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444003',
    module_id: '33333333-3333-3333-3333-333333333010',
    course_id: SQL_COURSE_ID,
    slug: 'sql-where-filtering',
    title: 'Filtering Rows with the WHERE Clause',
    sort_order: 3,
    status: 'published',
    estimated_minutes: 20,
    objectives: [
      'Filter table rows using the WHERE clause',
      'Use comparison operators: =, !=, <, >, <=, >=',
      'Handle string literal comparisons with single quotes'
    ],
    content_md: `## The WHERE Clause

The \`WHERE\` clause is used to filter records that fulfill a specified condition:

\`\`\`sql
SELECT * FROM students 
WHERE experience_years >= 3;
\`\`\`

### Note on String Values:
SQL requires single quotes around text values (\`'active'\`), whereas numeric fields do not need quotes (\`3\`).`,
    key_points_md: `- \`WHERE\` filters records before they are returned.
- Use single quotes for text values in SQL.`,
    common_mistakes_md: `- Using double quotes for strings in standard SQL; double quotes represent identifiers in standard SQL!`,
    starter_code: `SELECT name, role, experience_years 
FROM students 
WHERE status = 'active';`,
    solution_code: `SELECT name, role, experience_years 
FROM students 
WHERE status = 'active';`,
    execution_mode: 'sql',
    language: 'sql',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444004',
    module_id: '33333333-3333-3333-3333-333333333010',
    course_id: SQL_COURSE_ID,
    slug: 'sql-logical-operators',
    title: 'Operators: AND, OR, NOT, BETWEEN & IN',
    sort_order: 4,
    status: 'published',
    estimated_minutes: 20,
    objectives: [
      'Combine conditions with AND and OR operators',
      'Test range inclusion with BETWEEN ... AND ...',
      'Match multiple possibilities with the IN operator'
    ],
    content_md: `## Logical Operators in SQL

\`\`\`sql
-- AND: Both conditions must be met
SELECT * FROM students 
WHERE status = 'active' AND experience_years >= 3;

-- IN: Match any value in a list
SELECT * FROM courses 
WHERE category IN ('frontend', 'backend');

-- BETWEEN: Inclusive range test
SELECT * FROM enrollments 
WHERE grade BETWEEN 90 AND 100;
\`\`\``,
    key_points_md: `- Use parentheses to group conditions when combining AND and OR.
- \`IN (...)\` replaces long chains of OR conditions.`,
    common_mistakes_md: `- Confusing operator precedence between AND and OR without parentheses.`,
    starter_code: `SELECT * FROM students 
WHERE status = 'active' AND experience_years >= 2;`,
    solution_code: `SELECT * FROM students 
WHERE status = 'active' AND experience_years >= 2;`,
    execution_mode: 'sql',
    language: 'sql',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444005',
    module_id: '33333333-3333-3333-3333-333333333010',
    course_id: SQL_COURSE_ID,
    slug: 'sql-order-by-limit',
    title: 'Sorting with ORDER BY & Limiting with LIMIT',
    sort_order: 5,
    status: 'published',
    estimated_minutes: 15,
    objectives: [
      'Sort records ascending (ASC) and descending (DESC)',
      'Sort by multiple columns',
      'Paginate results using LIMIT and OFFSET'
    ],
    content_md: `## Sorting and Paginating Results

- **\`ORDER BY column ASC\`**: Ascending order (A-Z, 0-9; default).
- **\`ORDER BY column DESC\`**: Descending order (Z-A, 9-0).
- **\`LIMIT N\`**: Restricts output to at most \`N\` rows.
- **\`OFFSET M\`**: Skips the first \`M\` rows for pagination.

\`\`\`sql
SELECT name, experience_years 
FROM students 
ORDER BY experience_years DESC 
LIMIT 3;
\`\`\``,
    key_points_md: `- \`ORDER BY\` is placed after \`WHERE\`.
- \`LIMIT\` is always placed at the very end of the query.`,
    common_mistakes_md: `- Assuming database results have a default order without \`ORDER BY\`.`,
    starter_code: `SELECT name, experience_years 
FROM students 
ORDER BY experience_years DESC;`,
    solution_code: `SELECT name, experience_years 
FROM students 
ORDER BY experience_years DESC;`,
    execution_mode: 'sql',
    language: 'sql',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444006',
    module_id: '33333333-3333-3333-3333-333333333020',
    course_id: SQL_COURSE_ID,
    slug: 'sql-aggregate-functions',
    title: 'Aggregate Functions: COUNT, SUM, AVG, MIN, MAX',
    sort_order: 1,
    status: 'published',
    estimated_minutes: 20,
    objectives: [
      'Calculate row counts with COUNT(*)',
      'Calculate sums and mathematical averages with SUM and AVG',
      'Find extreme values with MIN and MAX'
    ],
    content_md: `## SQL Aggregate Functions

Aggregate functions calculate a single result from a set of values:

\`\`\`sql
SELECT 
  COUNT(*) AS total_students,
  AVG(experience_years) AS avg_experience,
  MAX(experience_years) AS max_experience
FROM students;
\`\`\``,
    key_points_md: `- \`COUNT(*)\` counts all rows including NULLs.
- \`AVG()\` automatically ignores NULL values.`,
    common_mistakes_md: `- Trying to select individual unaggregated columns alongside aggregate functions without a \`GROUP BY\` clause.`,
    starter_code: `SELECT 
  COUNT(*) AS total_students,
  AVG(experience_years) AS average_years,
  MIN(experience_years) AS minimum_years
FROM students;`,
    solution_code: `SELECT 
  COUNT(*) AS total_students,
  AVG(experience_years) AS average_years,
  MIN(experience_years) AS minimum_years
FROM students;`,
    execution_mode: 'sql',
    language: 'sql',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444007',
    module_id: '33333333-3333-3333-3333-333333333020',
    course_id: SQL_COURSE_ID,
    slug: 'sql-group-by-having',
    title: 'Grouping Data: GROUP BY & HAVING',
    sort_order: 2,
    status: 'published',
    estimated_minutes: 25,
    objectives: [
      'Group rows into summary rows with GROUP BY',
      'Filter grouped aggregations with the HAVING clause',
      'Understand the difference between WHERE (rows) vs HAVING (groups)'
    ],
    content_md: `## The GROUP BY & HAVING Clauses

The \`GROUP BY\` statement groups rows that have the same values into summary rows:

\`\`\`sql
SELECT role, COUNT(*) AS count_per_role 
FROM students 
GROUP BY role;
\`\`\`

## WHERE vs. HAVING
- **\`WHERE\`** filters individual rows **before** aggregation.
- **\`HAVING\`** filters group results **after** aggregation!

\`\`\`sql
SELECT role, AVG(experience_years) AS avg_exp
FROM students 
GROUP BY role 
HAVING AVG(experience_years) > 2;
\`\`\``,
    key_points_md: `- You cannot use aggregate functions inside a \`WHERE\` clause; use \`HAVING\` instead.
- Every non-aggregated column in the \`SELECT\` must be listed in \`GROUP BY\`.`,
    common_mistakes_md: `- Using \`WHERE COUNT(*) > 1\` instead of \`HAVING COUNT(*) > 1\`.`,
    starter_code: `SELECT category, COUNT(*) AS total_courses 
FROM courses 
GROUP BY category;`,
    solution_code: `SELECT category, COUNT(*) AS total_courses 
FROM courses 
GROUP BY category;`,
    execution_mode: 'sql',
    language: 'sql',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444008',
    module_id: '33333333-3333-3333-3333-333333333030',
    course_id: SQL_COURSE_ID,
    slug: 'sql-keys-and-relationships',
    title: 'Primary Keys, Foreign Keys & Schema Links',
    sort_order: 1,
    status: 'published',
    estimated_minutes: 20,
    objectives: [
      'Understand Primary Keys as unique row identifiers',
      'Use Foreign Keys to build relational integrity between tables',
      'Explore one-to-many and many-to-many database relationships'
    ],
    content_md: `## Relational Keys

- **Primary Key (PK)**: A column (or set of columns) that uniquely identifies each row in a table. It cannot be NULL and must be unique.
- **Foreign Key (FK)**: A column in one table that points to the Primary Key of another table.

### Example Relationship:
\`students.id\` (PK) connects to \`enrollments.student_id\` (FK). This prevents orphaned records and enforces relational consistency!`,
    key_points_md: `- Every relational table must have a Primary Key.
- Foreign keys enforce data integrity across tables.`,
    common_mistakes_md: `- Inserting records with foreign keys that do not exist in the referenced parent table.`,
    starter_code: `SELECT * FROM enrollments;`,
    solution_code: `SELECT * FROM enrollments;`,
    execution_mode: 'sql',
    language: 'sql',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444009',
    module_id: '33333333-3333-3333-3333-333333333030',
    course_id: SQL_COURSE_ID,
    slug: 'sql-inner-joins',
    title: 'Combining Tables with INNER JOIN',
    sort_order: 2,
    status: 'published',
    estimated_minutes: 25,
    objectives: [
      'Combine data from two or more tables with INNER JOIN',
      'Specify matching join conditions with ON table1.id = table2.fk_id',
      'Resolve column name collisions using table aliases'
    ],
    content_md: `## What is an INNER JOIN?

An \`INNER JOIN\` selects records that have matching values in both tables:

\`\`\`sql
SELECT 
  s.name AS student_name, 
  c.title AS course_title, 
  e.grade 
FROM enrollments e
INNER JOIN students s ON s.id = e.student_id
INNER JOIN courses c ON c.id = e.course_id;
\`\`\`

If a student has no enrollments, they will NOT appear in the INNER JOIN output.`,
    key_points_md: `- \`INNER JOIN\` only returns rows where the join condition matches in both tables.
- Table aliases like \`s\` and \`c\` keep queries compact and readable.`,
    common_mistakes_md: `- Forgetting the \`ON\` condition, resulting in an accidental Cartesian product (every row paired with every other row!).`,
    starter_code: `SELECT s.name, c.title, e.grade 
FROM enrollments e
JOIN students s ON s.id = e.student_id
JOIN courses c ON c.id = e.course_id;`,
    solution_code: `SELECT s.name, c.title, e.grade 
FROM enrollments e
JOIN students s ON s.id = e.student_id
JOIN courses c ON c.id = e.course_id;`,
    execution_mode: 'sql',
    language: 'sql',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444010',
    module_id: '33333333-3333-3333-3333-333333333030',
    course_id: SQL_COURSE_ID,
    slug: 'sql-left-joins',
    title: 'Handling Missing Data with LEFT JOIN',
    sort_order: 3,
    status: 'published',
    estimated_minutes: 20,
    objectives: [
      'Preserve all rows from the left table with LEFT JOIN',
      'Identify unlinked records where right_table.id IS NULL',
      'Differentiate INNER JOIN vs LEFT JOIN'
    ],
    content_md: `## What is a LEFT JOIN?

The \`LEFT JOIN\` keyword returns all records from the left table, and the matched records from the right table. If there is no match, the right side returns \`NULL\`.

\`\`\`sql
SELECT s.name, e.grade 
FROM students s
LEFT JOIN enrollments e ON e.student_id = s.id;
\`\`\`

Students who haven't enrolled in any courses will still appear in the list with \`grade = NULL\`.`,
    key_points_md: `- \`LEFT JOIN\` guarantees every row from the primary (left) table is preserved.
- Unmatched right table columns evaluate to \`NULL\`.`,
    common_mistakes_md: `- Putting a \`WHERE right_table.col = 'value'\` on a LEFT JOIN, which accidentally converts it into an INNER JOIN!`,
    starter_code: `SELECT s.name, s.role, e.grade 
FROM students s
LEFT JOIN enrollments e ON e.student_id = s.id;`,
    solution_code: `SELECT s.name, s.role, e.grade 
FROM students s
LEFT JOIN enrollments e ON e.student_id = s.id;`,
    execution_mode: 'sql',
    language: 'sql',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444011',
    module_id: '33333333-3333-3333-3333-333333333030',
    course_id: SQL_COURSE_ID,
    slug: 'sql-insert-update-delete',
    title: 'Data Modification: INSERT, UPDATE & DELETE',
    sort_order: 4,
    status: 'published',
    estimated_minutes: 20,
    objectives: [
      'Insert new rows with INSERT INTO ... VALUES (...)',
      'Update existing records safely with UPDATE ... SET ... WHERE',
      'Remove records with DELETE FROM ... WHERE'
    ],
    content_md: `## Modifying Table Data

### 1. INSERT INTO
\`\`\`sql
INSERT INTO students (id, name, role, experience_years, status)
VALUES (6, 'Elena Rostova', 'Security Engineer', 3, 'active');
\`\`\`

### 2. UPDATE
\`\`\`sql
UPDATE students 
SET status = 'inactive' 
WHERE id = 4;
\`\`\`

### 3. DELETE
> [!CAUTION]
> **ALWAYS specify a WHERE clause with UPDATE and DELETE!** If you omit the WHERE clause, ALL records in the table will be updated or deleted!`,
    key_points_md: `- \`INSERT INTO\` adds new rows.
- Always include \`WHERE\` on \`UPDATE\` and \`DELETE\` to prevent accidental data loss.`,
    common_mistakes_md: `- Running \`DELETE FROM students;\` without a \`WHERE\` condition, wiping out all records!`,
    starter_code: `INSERT INTO students (id, name, role, experience_years, status)
VALUES (6, 'Elena Rostova', 'Security Engineer', 3, 'active');

SELECT * FROM students;`,
    solution_code: `INSERT INTO students (id, name, role, experience_years, status)
VALUES (6, 'Elena Rostova', 'Security Engineer', 3, 'active');

SELECT * FROM students;`,
    execution_mode: 'sql',
    language: 'sql',
    editor_enabled: true
  },

  // ==========================================
  // POSTGRESQL FUNDAMENTALS (1 - 5)
  // ==========================================
  {
    id: '44444444-4444-4444-4444-444444444012',
    module_id: '33333333-3333-3333-3333-333333333011',
    course_id: POSTGRES_COURSE_ID,
    slug: 'postgresql-types-and-constraints',
    title: 'Postgres Data Types, SERIAL & UUID',
    sort_order: 1,
    status: 'published',
    estimated_minutes: 20,
    objectives: [
      'Understand PostgreSQL specific data types (VARCHAR, TEXT, TIMESTAMPTZ, UUID)',
      'Use auto-incrementing SERIAL and gen_random_uuid() primary keys',
      'Enforce data validation using CHECK constraints'
    ],
    content_md: `## PostgreSQL Architecture

**PostgreSQL** is a powerful, open-source object-relational database system with over 35 years of active development.

## Special Postgres Types:
- \`UUID\`: 128-bit universally unique identifiers (\`gen_random_uuid()\`).
- \`TIMESTAMPTZ\`: Timestamp with timezone awareness.
- \`TEXT\`: Variable unlimited length text (in Postgres, TEXT has the exact same performance as VARCHAR).
- \`BOOLEAN\`: Native boolean \`TRUE\` / \`FALSE\`.`,
    key_points_md: `- Postgres is renowned for strict standards compliance and reliability.
- Use \`gen_random_uuid()\` for distributed Primary Keys.`,
    common_mistakes_md: `- Storing timestamps without timezone (\`TIMESTAMP\` instead of \`TIMESTAMPTZ\`).`,
    starter_code: `SELECT * FROM students WHERE status = 'active';`,
    solution_code: `SELECT * FROM students WHERE status = 'active';`,
    execution_mode: 'postgresql',
    language: 'sql',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444013',
    module_id: '33333333-3333-3333-3333-333333333011',
    course_id: POSTGRES_COURSE_ID,
    slug: 'postgresql-constraints',
    title: 'Advanced Constraints & Integrity',
    sort_order: 2,
    status: 'published',
    estimated_minutes: 20,
    objectives: [
      'Enforce data rules with CHECK constraints',
      'Guarantee uniqueness across columns with UNIQUE',
      'Configure ON DELETE CASCADE on foreign keys'
    ],
    content_md: `## Postgres Constraints

\`\`\`sql
CREATE TABLE accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  balance NUMERIC(10, 2) CHECK (balance >= 0)
);
\`\`\`

The \`CHECK (balance >= 0)\` constraint guarantees at the database engine level that no account balance can ever become negative!`,
    key_points_md: `- Database constraints enforce invariants regardless of application bugs.
- \`ON DELETE CASCADE\` cleans up related child rows automatically.`,
    common_mistakes_md: `- Relying only on frontend validation for business integrity rules.`,
    starter_code: `SELECT name, role FROM students WHERE experience_years > 2;`,
    solution_code: `SELECT name, role FROM students WHERE experience_years > 2;`,
    execution_mode: 'postgresql',
    language: 'sql',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444014',
    module_id: '33333333-3333-3333-3333-333333333021',
    course_id: POSTGRES_COURSE_ID,
    slug: 'postgresql-jsonb-and-indexing',
    title: 'Semi-Structured Data with JSONB',
    sort_order: 1,
    status: 'published',
    estimated_minutes: 25,
    objectives: [
      'Store semi-structured JSON documents inside relational tables',
      'Query nested JSON attributes with -> and ->> operators',
      'Index JSONB data with GIN (Generalized Inverted Index)'
    ],
    content_md: `## PostgreSQL JSONB Support

PostgreSQL provides first-class support for storing and indexing semi-structured JSON documents via **JSONB** (binary JSON):

\`\`\`sql
-- Retrieve nested property as text with ->>
SELECT name, metadata->>'github_username' AS github 
FROM developers;
\`\`\`
Unlike standard JSON strings, JSONB supports indexing via GIN indexes for sub-millisecond query performance!`,
    key_points_md: `- \`->\` returns JSON object; \`->>\` returns string text.
- JSONB combines the flexibility of NoSQL with the ACID safety of SQL.`,
    common_mistakes_md: `- Using standard \`JSON\` instead of \`JSONB\` in Postgres.`,
    starter_code: `SELECT id, name, role FROM students WHERE experience_years >= 3;`,
    solution_code: `SELECT id, name, role FROM students WHERE experience_years >= 3;`,
    execution_mode: 'postgresql',
    language: 'sql',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444015',
    module_id: '33333333-3333-3333-3333-333333333021',
    course_id: POSTGRES_COURSE_ID,
    slug: 'postgresql-indexes-explain',
    title: 'Database Indexes & EXPLAIN ANALYZE',
    sort_order: 2,
    status: 'published',
    estimated_minutes: 20,
    objectives: [
      'Understand B-Tree indexes and lookup performance',
      'Inspect query execution plans with EXPLAIN',
      'Avoid Seq Scan (Sequential Table Scans) on massive tables'
    ],
    content_md: `## Query Optimization

Without an index, the database must scan every single row on disk (Sequential Scan).
Creating an index speeds up lookups from $O(N)$ to $O(\\log N)$:

\`\`\`sql
CREATE INDEX idx_students_status ON students(status);

-- Inspect execution plan
EXPLAIN SELECT * FROM students WHERE status = 'active';
\`\`\``,
    key_points_md: `- Indexes speed up reads but slightly slow down inserts and updates.
- Primary keys are indexed automatically.`,
    common_mistakes_md: `- Indexing every column indiscriminately, bloating disk size.`,
    starter_code: `SELECT * FROM courses WHERE difficulty = 'beginner';`,
    solution_code: `SELECT * FROM courses WHERE difficulty = 'beginner';`,
    execution_mode: 'postgresql',
    language: 'sql',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444016',
    module_id: '33333333-3333-3333-3333-333333333021',
    course_id: POSTGRES_COURSE_ID,
    slug: 'postgresql-transactions-acid',
    title: 'ACID Transactions: BEGIN, COMMIT & ROLLBACK',
    sort_order: 3,
    status: 'published',
    estimated_minutes: 20,
    objectives: [
      'Understand ACID: Atomicity, Consistency, Isolation, Durability',
      'Group multi-step mutations into transactions with BEGIN and COMMIT',
      'Revert state safely on errors with ROLLBACK'
    ],
    content_md: `## ACID Transactions

A transaction groups multiple SQL statements into a single all-or-nothing atomic unit:

\`\`\`sql
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT; -- Both succeed, or both fail together!
\`\`\`
If any step fails, \`ROLLBACK\` restores the database to its exact previous state.`,
    key_points_md: `- Atomicity guarantees all statements succeed or none do.
- Transactions prevent partial corruption during server crashes.`,
    common_mistakes_md: `- Forgetting to \`COMMIT\`, leaving the transaction open and locking rows.`,
    starter_code: `SELECT COUNT(*) AS total_students FROM students;`,
    solution_code: `SELECT COUNT(*) AS total_students FROM students;`,
    execution_mode: 'postgresql',
    language: 'sql',
    editor_enabled: true
  },

  // ==========================================
  // MYSQL FUNDAMENTALS (1 - 4)
  // ==========================================
  {
    id: '44444444-4444-4444-4444-444444444017',
    module_id: '33333333-3333-3333-3333-333333333012',
    course_id: MYSQL_COURSE_ID,
    slug: 'mysql-innodb-and-engines',
    title: 'MySQL Architecture & Storage Engines (InnoDB)',
    sort_order: 1,
    status: 'published',
    estimated_minutes: 20,
    objectives: [
      'Understand the role of MySQL in web hosting and LAMP/LEMP stacks',
      'Explore storage engines: InnoDB (ACID, foreign keys) vs MyISAM',
      'Configure table storage engines explicitly'
    ],
    content_md: `## What is MySQL?

**MySQL** is the world's most popular open-source relational database management system, powering WordPress, Facebook, and countless web platforms.

## InnoDB Storage Engine
In modern MySQL, **InnoDB** is the default and recommended storage engine:
- Full ACID transaction support.
- Foreign Key constraint support.
- Row-level locking for high concurrency.

\`\`\`sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL
) ENGINE=InnoDB;
\`\`\``,
    key_points_md: `- Always use InnoDB for transactional applications.
- InnoDB supports foreign keys and row-level locking.`,
    common_mistakes_md: `- Using outdated MyISAM engine, which locks entire tables on every write.`,
    starter_code: `SELECT * FROM courses;`,
    solution_code: `SELECT * FROM courses;`,
    execution_mode: 'mysql',
    language: 'sql',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444018',
    module_id: '33333333-3333-3333-3333-333333333012',
    course_id: MYSQL_COURSE_ID,
    slug: 'mysql-autoincrement-types',
    title: 'AUTO_INCREMENT & MySQL Data Types',
    sort_order: 2,
    status: 'published',
    estimated_minutes: 15,
    objectives: [
      'Generate sequential primary keys with AUTO_INCREMENT',
      'Understand INT, BIGINT, VARCHAR, and ENUM types in MySQL',
      'Inspect newly created IDs with LAST_INSERT_ID()'
    ],
    content_md: `## AUTO_INCREMENT in MySQL

\`\`\`sql
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  price DECIMAL(8, 2) NOT NULL
);

INSERT INTO products (title, price) VALUES ('Mechanical Keyboard', 89.99);
SELECT LAST_INSERT_ID(); -- Returns generated ID!
\`\`\``,
    key_points_md: `- \`AUTO_INCREMENT\` generates sequential unique integer keys.
- Use \`DECIMAL\` for monetary prices to avoid floating-point rounding errors.`,
    common_mistakes_md: `- Using \`FLOAT\` or \`DOUBLE\` for financial currency.`,
    starter_code: `SELECT id, name, role FROM students;`,
    solution_code: `SELECT id, name, role FROM students;`,
    execution_mode: 'mysql',
    language: 'sql',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444019',
    module_id: '33333333-3333-3333-3333-333333333022',
    course_id: MYSQL_COURSE_ID,
    slug: 'mysql-foreign-keys-cascades',
    title: 'Foreign Keys & Cascading Actions in MySQL',
    sort_order: 1,
    status: 'published',
    estimated_minutes: 20,
    objectives: [
      'Define FOREIGN KEY constraints in MySQL',
      'Configure ON DELETE CASCADE and ON DELETE SET NULL',
      'Verify relational referential integrity'
    ],
    content_md: `## Foreign Key Constraints in MySQL

\`\`\`sql
CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  amount DECIMAL(10, 2),
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);
\`\`\`

With \`ON DELETE CASCADE\`, deleting a student automatically cleans up all associated order records.`,
    key_points_md: `- Foreign keys require the InnoDB engine in MySQL.
- Foreign key column data types must match the parent primary key exactly.`,
    common_mistakes_md: `- Defining a foreign key on an INT column when the parent is BIGINT.`,
    starter_code: `SELECT s.name, c.title, e.grade 
FROM enrollments e
JOIN students s ON s.id = e.student_id
JOIN courses c ON c.id = e.course_id;`,
    solution_code: `SELECT s.name, c.title, e.grade 
FROM enrollments e
JOIN students s ON s.id = e.student_id
JOIN courses c ON c.id = e.course_id;`,
    execution_mode: 'mysql',
    language: 'sql',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444020',
    module_id: '33333333-3333-3333-3333-333333333022',
    course_id: MYSQL_COURSE_ID,
    slug: 'mysql-explain-query-optimization',
    title: 'Query Optimization with EXPLAIN in MySQL',
    sort_order: 2,
    status: 'published',
    estimated_minutes: 20,
    objectives: [
      'Run EXPLAIN on MySQL SELECT queries',
      'Interpret type column: ALL (full table scan) vs ref / const (indexed)',
      'Optimize slow database queries'
    ],
    content_md: `## MySQL EXPLAIN

The \`EXPLAIN\` statement provides information about how MySQL executes a query:

\`\`\`sql
EXPLAIN SELECT * FROM students WHERE status = 'active';
\`\`\`

### Key Columns in Output:
- **\`type\`**: Look for \`ref\` or \`const\`. If it says \`ALL\`, it's a slow full-table scan!
- **\`possible_keys\`**: Indexes that MySQL could choose.
- **\`key\`**: The index MySQL actually decided to use.
- **\`rows\`**: Number of rows MySQL estimates it must examine.`,
    key_points_md: `- \`EXPLAIN\` is the essential diagnostic tool for identifying slow queries.
- Aim to eliminate \`type: ALL\` on large database tables.`,
    common_mistakes_md: `- Deploying queries to production without checking the execution plan with EXPLAIN.`,
    starter_code: `SELECT * FROM students WHERE experience_years >= 4;`,
    solution_code: `SELECT * FROM students WHERE experience_years >= 4;`,
    execution_mode: 'mysql',
    language: 'sql',
    editor_enabled: true
  }
];
