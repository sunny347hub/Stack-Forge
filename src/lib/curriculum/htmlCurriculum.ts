import type { CourseModule, Lesson } from '../../types/database';

export const HTML_COURSE_ID = '22222222-2222-2222-2222-222222222201';

export const HTML_MODULES: CourseModule[] = [
  {
    id: '33333333-3333-3333-3333-333333333101',
    course_id: HTML_COURSE_ID,
    title: 'Module 1: HTML Tutorial & Core Basics',
    sort_order: 1,
    status: 'published'
  },
  {
    id: '33333333-3333-3333-3333-333333333102',
    course_id: HTML_COURSE_ID,
    title: 'Module 2: HTML Content, Links & Media',
    sort_order: 2,
    status: 'published'
  },
  {
    id: '33333333-3333-3333-3333-333333333103',
    course_id: HTML_COURSE_ID,
    title: 'Module 3: HTML Layout, Head & Semantics',
    sort_order: 3,
    status: 'published'
  },
  {
    id: '33333333-3333-3333-3333-333333333104',
    course_id: HTML_COURSE_ID,
    title: 'Module 4: HTML Forms & User Input',
    sort_order: 4,
    status: 'published'
  },
  {
    id: '33333333-3333-3333-3333-333333333105',
    course_id: HTML_COURSE_ID,
    title: 'Module 5: HTML Advanced, Entities & Graphics',
    sort_order: 5,
    status: 'published'
  }
];

export const HTML_LESSONS: Lesson[] = [
  // ========================================================
  // MODULE 1: HTML TUTORIAL & CORE BASICS (Lessons 1 - 7)
  // ========================================================
  {
    id: '44444444-4444-4444-4444-444444444101',
    module_id: '33333333-3333-3333-3333-333333333101',
    course_id: HTML_COURSE_ID,
    slug: 'intro-to-html-and-the-web',
    title: 'HTML Introduction',
    sort_order: 1,
    status: 'published',
    estimated_minutes: 15,
    objectives: [
      'Understand what HTML is and what it does in modern web development',
      'Learn the difference between tags, elements, and attributes',
      'Explore how browsers read markup to build the Document Object Model (DOM)'
    ],
    content_md: `## What is HTML?

**HTML** stands for **H**yper**T**ext **M**arkup **L**anguage. It is the standard markup language for creating web pages.

HTML describes the structure of a Web page semantically. Browsers do not display HTML tags directly; instead, they read the tags to determine how to present content to humans and screen readers.

### Why Learn HTML?
- **Universal Standard**: Every website on Earth runs on HTML.
- **Easy to Learn**: HTML is intuitive and human-readable.
- **Foundation of Full-Stack**: CSS styles HTML, and JavaScript programs behavior into HTML.

## HTML Elements and Syntax

An HTML element is everything from the start tag to the end tag:

\`\`\`html
<tagname attribute="value">Content goes here...</tagname>
\`\`\`

### Example Anatomy:
\`\`\`html
<p class="greeting">Hello, world!</p>
\`\`\`
1. \`<p>\` is the **opening tag** (declares a paragraph).
2. \`class="greeting"\` is an **attribute** (adds metadata or styling classes).
3. \`Hello, world!\` is the **content**.
4. \`</p>\` is the **closing tag** (ends with a forward slash).

## Empty (Void) Elements

Some HTML elements have no content and no closing tag. These are called **empty** or **void** elements:
- \`<br>\`: Inserts a line break.
- \`<hr>\`: Draws a horizontal rule (thematic divider).
- \`<img>\`: Embeds an image.
- \`<input>\`: Collects user input in forms.

## How the Browser Renders HTML

When you visit a URL, your browser requests an \`.html\` file from the web server. The browser parses these tags from top to bottom, assembling a tree structure called the **DOM (Document Object Model)**.`,
    key_points_md: `- HTML provides structure and semantic meaning to text and media.
- Tags come in pairs: opening \`<tag>\` and closing \`</tag>\`.
- Void elements like \`<br>\` and \`<img>\` do not have closing tags.`,
    common_mistakes_md: `- Forgetting the forward slash in closing tags (\`<p>text<p>\`), which leads to nesting bugs.
- Using uppercase tag names like \`<P>\` (HTML5 recommends lowercase).`,
    starter_code: `<!DOCTYPE html>
<html>
<head>
  <title>My First HTML Page</title>
</head>
<body>
  <h1>Welcome to StackForge</h1>
  <p>HTML is the backbone of the entire World Wide Web.</p>
</body>
</html>`,
    solution_code: `<!DOCTYPE html>
<html>
<head>
  <title>My First HTML Page</title>
</head>
<body>
  <h1>Welcome to StackForge</h1>
  <p>HTML is the backbone of the entire World Wide Web.</p>
  <p>Explore elements, build pages, and become a developer!</p>
</body>
</html>`,
    execution_mode: 'html_preview',
    language: 'html',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444102',
    module_id: '33333333-3333-3333-3333-333333333101',
    course_id: HTML_COURSE_ID,
    slug: 'html-document-structure',
    title: 'HTML Editors & Basic Structure',
    sort_order: 2,
    status: 'published',
    estimated_minutes: 15,
    objectives: [
      'Learn the standard HTML5 document boilerplate',
      'Understand the role of <!DOCTYPE html>, <html>, <head>, and <body>',
      'Configure viewport and charset metadata for responsive web design'
    ],
    content_md: `## The Standard HTML5 Boilerplate

Every production web document begins with a standardized document structure:

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document Title</title>
</head>
<body>
  <h1>Visible Content</h1>
  <p>Everything inside the body appears on the screen.</p>
</body>
</html>
\`\`\`

## Breakdown of Key Elements

### 1. \`<!DOCTYPE html>\`
Tells the browser that this document is written in modern **HTML5**. It must be the very first line of code. Without it, browsers enter "quirks mode", causing unpredictable CSS rendering.

### 2. \`<html lang="en">\`
The root element that wraps all content. The \`lang\` attribute specifies the primary human language (e.g., \`en\` for English, \`es\` for Spanish) so screen readers and translation tools work accurately.

### 3. \`<head>\`
The container for **metadata**—data about the document that is NOT displayed directly in the browser viewport. It includes character encoding, title, stylesheets, and favicon links.

### 4. \`<body>\`
Contains all the visible content: headings, paragraphs, images, tables, forms, and scripts.`,
    key_points_md: `- Always include \`<!DOCTYPE html>\` on the first line.
- The \`<head>\` holds invisible configuration data; \`<body>\` holds visible content.
- \`<meta name="viewport" content="width=device-width, initial-scale=1.0">\` is required for responsive mobile viewing.`,
    common_mistakes_md: `- Placing visible tags like \`<h1>\` or \`<p>\` inside \`<head>\`.
- Omitting the \`lang\` attribute on \`<html>\`, degrading accessibility.`,
    starter_code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Developer Portfolio</title>
</head>
<body>
  <h1>Jane Developer</h1>
  <p>Full-Stack Engineer building modern web apps.</p>
</body>
</html>`,
    solution_code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Developer Portfolio</title>
</head>
<body>
  <h1>Jane Developer</h1>
  <p>Full-Stack Engineer building modern web apps.</p>
  <hr>
  <p>Currently learning HTML, CSS, JavaScript, and Node.js.</p>
</body>
</html>`,
    execution_mode: 'html_preview',
    language: 'html',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444103',
    module_id: '33333333-3333-3333-3333-333333333101',
    course_id: HTML_COURSE_ID,
    slug: 'html-elements-and-attributes',
    title: 'HTML Elements & Attributes',
    sort_order: 3,
    status: 'published',
    estimated_minutes: 15,
    objectives: [
      'Master HTML attribute syntax: name="value"',
      'Explore core attributes: id, class, title, and style',
      'Learn rules for attribute quotes and boolean attributes'
    ],
    content_md: `## What are HTML Attributes?

**Attributes** provide additional information about HTML elements. They are always specified in the **opening tag** and usually come in name/value pairs:

\`\`\`html
name="value"
\`\`\`

## Essential Global Attributes

Global attributes can be used on **any** HTML element:

| Attribute | Purpose | Example |
| :--- | :--- | :--- |
| \`id\` | Unique identifier for a single element | \`<div id="hero-banner">\` |
| \`class\` | Non-unique identifier for groups of elements | \`<p class="highlight text-center">\` |
| \`title\` | Tooltip text displayed on hover | \`<span title="StackForge Academy">\` |
| \`hidden\` | Boolean attribute that hides the element | \`<p hidden>Secret content</p>\` |
| \`style\` | Inline CSS styles | \`<p style="color: #ff7020;">\` |

## Boolean Attributes

Some attributes do not require a value. Their presence implies true:
\`\`\`html
<input type="text" required disabled>
\`\`\`
Both \`required\` and \`disabled\` are boolean attributes.`,
    key_points_md: `- Attributes always belong inside opening tags.
- The \`id\` attribute must be unique across the entire web page.
- Classes can be reused on multiple elements separated by spaces.`,
    common_mistakes_md: `- Duplicating the same \`id\` on multiple elements on a single page.
- Forgetting quotation marks around attribute values containing spaces.`,
    starter_code: `<!DOCTYPE html>
<html>
<body>
  <h2 title="Hover over me to see the tooltip!">HTML Attributes in Action</h2>
  <p class="announcement" id="main-notice">
    This element uses both id and class attributes.
  </p>
  <button disabled>Disabled Action Button</button>
</body>
</html>`,
    solution_code: `<!DOCTYPE html>
<html>
<body>
  <h2 title="Hover over me to see the tooltip!">HTML Attributes in Action</h2>
  <p class="announcement" id="main-notice" style="color: #ea580c; font-weight: bold;">
    This element uses both id and class attributes.
  </p>
  <button disabled>Disabled Action Button</button>
  <button title="Click to continue">Active Action Button</button>
</body>
</html>`,
    execution_mode: 'html_preview',
    language: 'html',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444104',
    module_id: '33333333-3333-3333-3333-333333333101',
    course_id: HTML_COURSE_ID,
    slug: 'html-headings-and-paragraphs',
    title: 'HTML Headings & Paragraphs',
    sort_order: 4,
    status: 'published',
    estimated_minutes: 15,
    objectives: [
      'Understand the semantic heading hierarchy from <h1> to <h6>',
      'Format running body copy using paragraphs and line breaks',
      'Structure accessible content trees for search engines and screen readers'
    ],
    content_md: `## Headings: \`<h1>\` to \`<h6>\`

HTML headings are defined with the \`<h1>\` to \`<h6>\` tags:
- \`<h1>\` defines the most important, top-level heading.
- \`<h6>\` defines the least important heading.

\`\`\`html
<h1>Document Title (Level 1)</h1>
<h2>Major Topic (Level 2)</h2>
<h3>Sub-topic (Level 3)</h3>
<h4>Detail Section (Level 4)</h4>
<h5>Minor Detail (Level 5)</h5>
<h6>Lowest Level (Level 6)</h6>
\`\`\`

> [!IMPORTANT]
> **Use headings for structure, NOT to make text big or bold.** Search engines use headings to index the structure and content of your web pages. Assistive readers let users jump from heading to heading.

## Paragraphs: \`<p>\`

The \`<p>\` element defines a paragraph. Browsers automatically add a margin before and after every paragraph element.

\`\`\`html
<p>This is the first paragraph of clean, readable text.</p>
<p>This is the second paragraph separated by browser margins.</p>
\`\`\`

## Line Breaks: \`<br>\` & Horizontal Rules: \`<hr>\`

- \`<br>\` inserts an inline line break without creating a new paragraph.
- \`<hr>\` inserts a horizontal thematic break to visually divide sections.`,
    key_points_md: `- Use exactly one \`<h1>\` per page representing the page topic.
- Never skip heading levels (e.g. going from \`<h1>\` directly to \`<h3>\`).
- Use \`<br>\` sparingly (e.g. addresses or poetry); use \`<p>\` for prose.`,
    common_mistakes_md: `- Using multiple \`<h1>\` tags carelessly across a single page.
- Using empty \`<p></p>\` or multiple \`<br><br>\` tags to create vertical space instead of CSS margin.`,
    starter_code: `<!DOCTYPE html>
<html>
<body>
  <h1>The Web Development Roadmap</h1>
  
  <h2>Frontend Engineering</h2>
  <p>Frontend developers create the visual interfaces that users interact with directly.</p>

  <h3>Key Technologies</h3>
  <p>HTML provides structure.<br>CSS provides style.<br>JavaScript provides interactivity.</p>
</body>
</html>`,
    solution_code: `<!DOCTYPE html>
<html>
<body>
  <h1>The Web Development Roadmap</h1>
  
  <h2>Frontend Engineering</h2>
  <p>Frontend developers create the visual interfaces that users interact with directly.</p>

  <h3>Key Technologies</h3>
  <p>HTML provides structure.<br>CSS provides style.<br>JavaScript provides interactivity.</p>

  <hr>

  <h2>Backend Engineering</h2>
  <p>Backend developers build servers, APIs, and databases that power application logic.</p>
</body>
</html>`,
    execution_mode: 'html_preview',
    language: 'html',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444105',
    module_id: '33333333-3333-3333-3333-333333333101',
    course_id: HTML_COURSE_ID,
    slug: 'html-styles-and-formatting',
    title: 'HTML Styles & Text Formatting',
    sort_order: 5,
    status: 'published',
    estimated_minutes: 15,
    objectives: [
      'Learn semantic text formatting: <strong>, <em>, <mark>, <del>, <ins>',
      'Distinguish semantic elements from visual presentation tags (<b> vs <strong>)',
      'Apply basic inline styling using the style attribute'
    ],
    content_md: `## Semantic Text Formatting

HTML provides special elements for defining text with special meaning:

| Tag | Name | Meaning |
| :--- | :--- | :--- |
| \`<strong>\` | Important text | Pronounced with strong vocal emphasis by screen readers |
| \`<em>\` | Emphasized text | Stressed tone (italicized by default) |
| \`<mark>\` | Highlighted text | Yellow background highlight |
| \`<del>\` | Deleted text | Strike-through indicating removed copy |
| \`<ins>\` | Inserted text | Underline indicating added copy |
| \`<sub>\` | Subscript | Lower text (e.g., H<sub>2</sub>O) |
| \`<sup>\` | Superscript | Raised text (e.g., E = mc<sup>2</sup>) |
| \`<small>\` | Side comments | Small print, copyright notices, terms |

## \`<b>\` vs \`<strong>\` and \`<i>\` vs \`<em>\`

- \`<b>\` and \`<i>\` only change visual appearance without conveying importance.
- \`<strong>\` and \`<em>\` convey real semantic weight to search engines and assistive technology.`,
    key_points_md: `- Always prefer \`<strong>\` over \`<b>\` for important text.
- Always prefer \`<em>\` over \`<i>\` for emphasized words.
- Use \`<mark>\` to highlight search terms or key references.`,
    common_mistakes_md: `- Using \`<u>\` (underline) for emphasis; users mistake underlined text for clickable hyperlinks.`,
    starter_code: `<!DOCTYPE html>
<html>
<body>
  <h2>Text Formatting Demonstration</h2>
  <p>This is standard body copy.</p>
  <p>This text is <strong>critically important</strong> for developers.</p>
  <p>This text is <em>spoken with emphasis</em>.</p>
  <p>Water chemical formula is H<sub>2</sub>O.</p>
</body>
</html>`,
    solution_code: `<!DOCTYPE html>
<html>
<body>
  <h2>Text Formatting Demonstration</h2>
  <p>This is standard body copy.</p>
  <p>This text is <strong>critically important</strong> for developers.</p>
  <p>This text is <em>spoken with emphasis</em>.</p>
  <p>Water chemical formula is H<sub>2</sub>O.</p>
  <p>Einstein's equation: E = mc<sup>2</sup>.</p>
  <p>Price: <del>$99</del> <ins>$49</ins> today only!</p>
</body>
</html>`,
    execution_mode: 'html_preview',
    language: 'html',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444106',
    module_id: '33333333-3333-3333-3333-333333333101',
    course_id: HTML_COURSE_ID,
    slug: 'html-quotations-and-comments',
    title: 'HTML Quotations & Comments',
    sort_order: 6,
    status: 'published',
    estimated_minutes: 15,
    objectives: [
      'Format quotations using <blockquote>, <q>, and <cite>',
      'Display abbreviations with hover tooltips using <abbr>',
      'Write informative developer comments using <!-- comment -->'
    ],
    content_md: `## HTML Quotations

When quoting external sources or authorities, use semantic citation elements:

### 1. \`<blockquote>\` for Long Quotations
Indents the quoted block and accepts a \`cite\` URL attribute:

\`\`\`html
<blockquote cite="https://www.w3.org">
  The power of the Web is in its universality. Access by everyone regardless of disability is an essential aspect.
</blockquote>
\`\`\`

### 2. \`<q>\` for Inline Quotations
Browsers automatically insert quotation marks around the text:

\`\`\`html
<p>Tim Berners-Lee said <q>The Web does not just connect machines, it connects people.</q></p>
\`\`\`

### 3. \`<abbr>\` for Abbreviations
Shows the expanded term when hovering over the dotted underline:

\`\`\`html
<p>We are learning <abbr title="HyperText Markup Language">HTML</abbr> today.</p>
\`\`\`

## HTML Comments: \`<!-- ... -->\`

Comments are ignored by the browser and do not render on the screen. They help explain code or temporarily disable elements:

\`\`\`html
<!-- This is an explanatory comment -->
<!-- <p>This element is commented out and won't display</p> -->
\`\`\``,
    key_points_md: `- Use \`<blockquote>\` for multi-line quotes and \`<q>\` for inline quotes.
- HTML comments use syntax \`<!-- comment -->\`.
- Never put sensitive credentials or passwords in HTML comments; users can inspect source.`,
    common_mistakes_md: `- Forgetting to close a comment (\`<!--\`), accidentally hiding the rest of the web page.`,
    starter_code: `<!DOCTYPE html>
<html>
<body>
  <h2>Quotations and Explanations</h2>

  <!-- Primary Quote Section -->
  <blockquote cite="https://en.wikipedia.org/wiki/Tim_Berners-Lee">
    The Web as I envisaged it, we have not seen it yet. The future is still so much bigger than the past.
  </blockquote>
  <p>— Tim Berners-Lee</p>

  <p>Mastering <abbr title="Cascading Style Sheets">CSS</abbr> is our next milestone.</p>
</body>
</html>`,
    solution_code: `<!DOCTYPE html>
<html>
<body>
  <h2>Quotations and Explanations</h2>

  <!-- Primary Quote Section -->
  <blockquote cite="https://en.wikipedia.org/wiki/Tim_Berners-Lee">
    The Web as I envisaged it, we have not seen it yet. The future is still so much bigger than the past.
  </blockquote>
  <p>— Tim Berners-Lee</p>

  <!-- Inline quote example -->
  <p>As the adage goes, <q>Simplicity is the soul of efficiency.</q></p>

  <p>Mastering <abbr title="Cascading Style Sheets">CSS</abbr> is our next milestone.</p>
</body>
</html>`,
    execution_mode: 'html_preview',
    language: 'html',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444107',
    module_id: '33333333-3333-3333-3333-333333333101',
    course_id: HTML_COURSE_ID,
    slug: 'html-colors-and-css',
    title: 'HTML Colors & CSS Integration',
    sort_order: 7,
    status: 'published',
    estimated_minutes: 20,
    objectives: [
      'Understand HTML color formats: Names, HEX, RGB, and HSL',
      'Learn the 3 ways to add CSS to HTML: Inline, Internal, and External',
      'Apply color contrast principles for visual accessibility'
    ],
    content_md: `## HTML Color Formats

HTML supports several color models:

| Format | Syntax Example | Meaning |
| :--- | :--- | :--- |
| **Color Name** | \`Tomato\`, \`SteelBlue\` | 140 standardized browser names |
| **HEX** | \`#ff7020\` | 6 hex digits: Red, Green, Blue |
| **RGB** | \`rgb(255, 112, 32)\` | Red (0-255), Green (0-255), Blue (0-255) |
| **RGBA** | \`rgba(255, 112, 32, 0.8)\` | RGB with alpha transparency (0.0 to 1.0) |
| **HSL** | \`hsl(22, 100%, 56%)\` | Hue (0-360), Saturation (%), Lightness (%) |

## The 3 Ways to Add CSS to HTML

### 1. Inline CSS
Using the \`style\` attribute directly on an element:
\`\`\`html
<h1 style="color: #ff7020; font-family: sans-serif;">StackForge</h1>
\`\`\`

### 2. Internal CSS
Using a \`<style>\` tag inside the \`<head>\` of the document:
\`\`\`html
<head>
  <style>
    body { background-color: #0f172a; color: #f8fafc; }
    h1 { color: #ff7020; }
  </style>
</head>
\`\`\`

### 3. External CSS (Recommended in Production)
Linking a separate \`.css\` stylesheet file via \`<link>\`:
\`\`\`html
<head>
  <link rel="stylesheet" href="styles.css">
</head>
\`\`\``,
    key_points_md: `- External CSS is best for multi-page websites because styles are cached.
- HEX codes like \`#ff7020\` are the most common format in modern web development.
- Always verify high text-to-background contrast for readability.`,
    common_mistakes_md: `- Overusing inline \`style="..."\`, making code repetitive and difficult to maintain.`,
    starter_code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: system-ui, sans-serif;
      background-color: #0f172a;
      color: #f8fafc;
      padding: 24px;
    }
    .card {
      background-color: #1e293b;
      padding: 20px;
      border-radius: 12px;
      border: 1px solid #334155;
    }
    .accent {
      color: #ff7020;
    }
  </style>
</head>
<body>
  <div class="card">
    <h2 class="accent">Modern Dark Interface</h2>
    <p>Styled with internal CSS classes and harmonious HEX palette colors.</p>
  </div>
</body>
</html>`,
    solution_code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: system-ui, sans-serif;
      background-color: #0f172a;
      color: #f8fafc;
      padding: 24px;
    }
    .card {
      background-color: #1e293b;
      padding: 20px;
      border-radius: 12px;
      border: 1px solid #334155;
    }
    .accent {
      color: #ff7020;
    }
    .tag {
      background-color: rgba(255, 112, 32, 0.15);
      color: #ff7020;
      padding: 4px 10px;
      border-radius: 9999px;
      font-size: 12px;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="card">
    <span class="tag">HTML + CSS</span>
    <h2 class="accent">Modern Dark Interface</h2>
    <p>Styled with internal CSS classes and harmonious HEX palette colors.</p>
  </div>
</body>
</html>`,
    execution_mode: 'html_preview',
    language: 'html',
    editor_enabled: true
  },

  // ========================================================
  // MODULE 2: HTML CONTENT, LINKS & MEDIA (Lessons 8 - 13)
  // ========================================================
  {
    id: '44444444-4444-4444-4444-444444444108',
    module_id: '33333333-3333-3333-3333-333333333102',
    course_id: HTML_COURSE_ID,
    slug: 'html-links-and-hyperlinks',
    title: 'HTML Links & Hyperlinks',
    sort_order: 1,
    status: 'published',
    estimated_minutes: 15,
    objectives: [
      'Create hyperlinks with the anchor tag <a> and href attribute',
      'Open links in new tabs safely with target="_blank" and rel="noopener"',
      'Build internal page bookmarks using hash anchors (#section-id)'
    ],
    content_md: `## The Anchor Element: \`<a>\`

Hyperlinks are the foundation of the Web. In HTML, links are created using the \`<a>\` (anchor) tag:

\`\`\`html
<a href="https://stackforge.dev">Visit StackForge</a>
\`\`\`

- \`href\` (hypertext reference): specifies the destination URL.
- The text between \`<a>\` and \`</a>\` is the clickable link text.

## Opening Links in a New Tab

To open a link in a new browser window or tab, set \`target="_blank"\`:

\`\`\`html
<a href="https://developer.mozilla.org" target="_blank" rel="noopener noreferrer">
  MDN Web Docs (Opens in new tab)
</a>
\`\`\`

> [!SECURITY]
> When using \`target="_blank"\`, always include \`rel="noopener noreferrer"\` to prevent reverse tab-nabbing vulnerabilities.

## Internal Bookmarks (Page Jumps)

You can jump to any section on the same page by linking to its \`id\`:

\`\`\`html
<a href="#faq-section">Jump to FAQs</a>

<!-- Further down the page -->
<h2 id="faq-section">Frequently Asked Questions</h2>
\`\`\`

## Email and Phone Links
- **Email**: \`<a href="mailto:support@stackforge.dev">Email Support</a>\`
- **Phone**: \`<a href="tel:+15551234567">Call Us</a>\``,
    key_points_md: `- The \`href\` attribute contains the destination URL.
- Use \`target="_blank"\` and \`rel="noopener noreferrer"\` for external links.
- Use \`#id\` to link to specific sections on the same page.`,
    common_mistakes_md: `- Using generic link text like "Click here"; descriptive text like "Read our privacy policy" is vastly superior for SEO and accessibility.`,
    starter_code: `<!DOCTYPE html>
<html>
<body>
  <h2>Exploring Hyperlinks</h2>
  <p>
    Learn full-stack web development at
    <a href="https://stackforge.dev" target="_blank" rel="noopener noreferrer">StackForge Platform</a>.
  </p>
  <p>Need assistance? Contact our <a href="mailto:team@stackforge.dev">Developer Support Team</a>.</p>
</body>
</html>`,
    solution_code: `<!DOCTYPE html>
<html>
<body>
  <h2>Exploring Hyperlinks</h2>
  <p>
    Learn full-stack web development at
    <a href="https://stackforge.dev" target="_blank" rel="noopener noreferrer">StackForge Platform</a>.
  </p>
  <p>Need assistance? Contact our <a href="mailto:team@stackforge.dev">Developer Support Team</a>.</p>
  <hr>
  <p><a href="#footer-section">Jump to Bottom</a></p>
  <div style="height: 200px;"></div>
  <p id="footer-section"><strong>You reached the bottom!</strong></p>
</body>
</html>`,
    execution_mode: 'html_preview',
    language: 'html',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444109',
    module_id: '33333333-3333-3333-3333-333333333102',
    course_id: HTML_COURSE_ID,
    slug: 'html-images-and-favicons',
    title: 'HTML Images, Favicons & File Paths',
    sort_order: 2,
    status: 'published',
    estimated_minutes: 15,
    objectives: [
      'Embed images with <img>, src, and alt attributes',
      'Understand relative vs absolute file paths',
      'Configure browser tab favicons with <link rel="icon">'
    ],
    content_md: `## Embedding Images with \`<img>\`

The \`<img>\` tag embeds images into web pages. It is an empty (void) element with no closing tag:

\`\`\`html
<img src="avatar.jpg" alt="Jane Developer smiling" width="120" height="120">
\`\`\`

### Attributes:
- \`src\`: The path or URL to the image file.
- \`alt\` (Alternative Text): Describes the image for screen readers and displays when the image fails to load. **Required for accessibility!**
- \`width\` and \`height\`: Reserve aspect ratio space to prevent layout shifts (CLS).

## Relative vs Absolute File Paths

- **Absolute URL**: Points to another website: \`https://example.com/logo.png\`
- **Relative URL**: Points to a file in your project:
  - \`photo.jpg\`: Same folder.
  - \`images/photo.jpg\`: Subfolder named \`images\`.
  - \`../logo.png\`: One folder up.

## Adding a Favicon to the Browser Tab

A **favicon** is the small icon that appears in the browser tab next to your page title. Place this in your \`<head>\`:

\`\`\`html
<head>
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
</head>
\`\`\``,
    key_points_md: `- The \`alt\` attribute is required on every meaningful image.
- Set width and height attributes to stop Cumulative Layout Shift (CLS).
- Favicons belong in the \`<head>\` using \`<link rel="icon">\`.`,
    common_mistakes_md: `- Leaving the \`alt\` attribute empty or writing useless text like \`alt="image"\`.`,
    starter_code: `<!DOCTYPE html>
<html>
<head>
  <link rel="icon" type="image/svg+xml" href="https://api.iconify.design/lucide:code.svg">
  <title>Image Demonstration</title>
</head>
<body>
  <h2>Web Images</h2>
  <img 
    src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&auto=format&fit=crop&q=60" 
    alt="Laptop open on a wooden desk displaying code on screen"
    style="max-width: 100%; border-radius: 8px;"
  >
  <p>Laptops and workstations are standard developer setups.</p>
</body>
</html>`,
    solution_code: `<!DOCTYPE html>
<html>
<head>
  <link rel="icon" type="image/svg+xml" href="https://api.iconify.design/lucide:code.svg">
  <title>Image Demonstration</title>
</head>
<body>
  <h2>Web Images</h2>
  <figure>
    <img 
      src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&auto=format&fit=crop&q=60" 
      alt="Laptop open on a wooden desk displaying code on screen"
      style="max-width: 100%; border-radius: 8px;"
    >
    <figcaption style="font-size: 13px; color: #64748b; margin-top: 6px;">
      Figure 1: Clean developer workspace environment.
    </figcaption>
  </figure>
</body>
</html>`,
    execution_mode: 'html_preview',
    language: 'html',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444110',
    module_id: '33333333-3333-3333-3333-333333333102',
    course_id: HTML_COURSE_ID,
    slug: 'html-tables',
    title: 'HTML Tables & Data Alignment',
    sort_order: 3,
    status: 'published',
    estimated_minutes: 20,
    objectives: [
      'Structure tabular data with <table>, <thead>, <tbody>, <tr>, <th>, and <td>',
      'Merge rows and columns with rowspan and colspan attributes',
      'Style accessible table borders and zebra striping'
    ],
    content_md: `## What are HTML Tables?

HTML tables allow developers to arrange structured data into rows and columns:

\`\`\`html
<table>
  <thead>
    <tr>
      <th>Course</th>
      <th>Duration</th>
      <th>Level</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>HTML Fundamentals</td>
      <td>3 Hours</td>
      <td>Beginner</td>
    </tr>
  </tbody>
</table>
\`\`\`

## Key Table Elements:
- \`<table>\`: The container for table data.
- \`<thead>\`: Groups header content.
- \`<tbody>\`: Groups body rows.
- \`<tr>\`: Defines a table row.
- \`<th>\`: Defines a header cell (bold and centered by default).
- \`<td>\`: Defines a standard data cell.
- \`<caption>\`: Accessible title for the table.

## Merging Cells: \`colspan\` & \`rowspan\`
- \`colspan="2"\`: Causes a cell to span across 2 columns.
- \`rowspan="2"\`: Causes a cell to span across 2 rows.`,
    key_points_md: `- Use tables for tabular data only; NEVER use tables for page layouts.
- Always wrap headers in \`<thead>\` and rows in \`<tbody>\`.
- \`<th>\` cells provide semantic column headers for screen readers.`,
    common_mistakes_md: `- Forgetting \`<tr>\` tags and putting \`<td>\` directly inside \`<table>\`.`,
    starter_code: `<!DOCTYPE html>
<html>
<head>
  <style>
    table { width: 100%; border-collapse: collapse; font-family: sans-serif; }
    th, td { border: 1px solid #cbd5e1; padding: 10px; text-align: left; }
    th { background: #f1f5f9; color: #0f172a; }
  </style>
</head>
<body>
  <h2>Course Schedule</h2>
  <table>
    <thead>
      <tr>
        <th>Technology</th>
        <th>Hours</th>
        <th>Difficulty</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>HTML5</td>
        <td>15 hrs</td>
        <td>Beginner</td>
      </tr>
      <tr>
        <td>CSS3</td>
        <td>20 hrs</td>
        <td>Beginner</td>
      </tr>
    </tbody>
  </table>
</body>
</html>`,
    solution_code: `<!DOCTYPE html>
<html>
<head>
  <style>
    table { width: 100%; border-collapse: collapse; font-family: sans-serif; }
    th, td { border: 1px solid #cbd5e1; padding: 10px; text-align: left; }
    th { background: #f1f5f9; color: #0f172a; }
    tr:nth-child(even) { background-color: #f8fafc; }
  </style>
</head>
<body>
  <h2>Course Schedule</h2>
  <table>
    <caption>StackForge Core Curriculum Overview</caption>
    <thead>
      <tr>
        <th>Technology</th>
        <th>Hours</th>
        <th>Difficulty</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>HTML5</td>
        <td>15 hrs</td>
        <td>Beginner</td>
      </tr>
      <tr>
        <td>CSS3</td>
        <td>20 hrs</td>
        <td>Beginner</td>
      </tr>
      <tr>
        <td>JavaScript</td>
        <td>35 hrs</td>
        <td>Intermediate</td>
      </tr>
    </tbody>
  </table>
</body>
</html>`,
    execution_mode: 'html_preview',
    language: 'html',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444111',
    module_id: '33333333-3333-3333-3333-333333333102',
    course_id: HTML_COURSE_ID,
    slug: 'html-lists',
    title: 'HTML Lists: Ordered, Unordered & Description',
    sort_order: 4,
    status: 'published',
    estimated_minutes: 15,
    objectives: [
      'Build bulleted lists with <ul> and <li>',
      'Build numbered sequences with <ol> and <li>',
      'Format glossary terms using description lists <dl>, <dt>, and <dd>'
    ],
    content_md: `## The 3 Types of HTML Lists

HTML provides 3 distinct list types:

### 1. Unordered Lists: \`<ul>\`
Used when the order of items does NOT matter (rendered with bullet points):

\`\`\`html
<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>JavaScript</li>
</ul>
\`\`\`

### 2. Ordered Lists: \`<ol>\`
Used when sequence matters (rendered with numbers):

\`\`\`html
<ol>
  <li>Write code in your editor</li>
  <li>Test preview in browser</li>
  <li>Commit changes with Git</li>
</ol>
\`\`\`

### 3. Description Lists: \`<dl>\`
Used for glossaries, key-value pairs, or term definitions:
- \`<dl>\`: Description list container.
- \`<dt>\`: Description term.
- \`<dd>\`: Description definition.

\`\`\`html
<dl>
  <dt>HTML</dt>
  <dd>HyperText Markup Language</dd>
  <dt>CSS</dt>
  <dd>Cascading Style Sheets</dd>
</dl>
\`\`\``,
    key_points_md: `- Use \`<ul>\` for non-sequential lists and \`<ol>\` for step-by-step instructions.
- The direct children of \`<ul>\` and \`<ol>\` must ONLY be \`<li>\` elements.
- Use \`<dl>\` for metadata pairs and dictionaries.`,
    common_mistakes_md: `- Placing \`<div>\` or \`<p>\` directly inside \`<ul>\` without wrapping in \`<li>\`.`,
    starter_code: `<!DOCTYPE html>
<html>
<body>
  <h2>Web Development Toolkit</h2>
  
  <h3>Required Languages (Unordered)</h3>
  <ul>
    <li>HTML5</li>
    <li>CSS3</li>
    <li>JavaScript</li>
  </ul>

  <h3>Getting Started (Ordered)</h3>
  <ol>
    <li>Install VS Code</li>
    <li>Create index.html</li>
    <li>Open in Chrome</li>
  </ol>
</body>
</html>`,
    solution_code: `<!DOCTYPE html>
<html>
<body>
  <h2>Web Development Toolkit</h2>
  
  <h3>Required Languages (Unordered)</h3>
  <ul>
    <li>HTML5</li>
    <li>CSS3</li>
    <li>JavaScript</li>
  </ul>

  <h3>Getting Started (Ordered)</h3>
  <ol>
    <li>Install VS Code</li>
    <li>Create index.html</li>
    <li>Open in Chrome</li>
  </ol>

  <h3>Glossary (Description List)</h3>
  <dl>
    <dt>DOM</dt>
    <dd>Document Object Model representation in browser memory.</dd>
    <dt>URL</dt>
    <dd>Uniform Resource Locator address of a web resource.</dd>
  </dl>
</body>
</html>`,
    execution_mode: 'html_preview',
    language: 'html',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444112',
    module_id: '33333333-3333-3333-3333-333333333102',
    course_id: HTML_COURSE_ID,
    slug: 'html-block-inline-div-span',
    title: 'HTML Block, Inline, Div & Span',
    sort_order: 5,
    status: 'published',
    estimated_minutes: 15,
    objectives: [
      'Understand the display difference between block and inline elements',
      'Use <div> as a block-level container for CSS styling',
      'Use <span> as an inline container for specific text targets'
    ],
    content_md: `## Block vs. Inline Elements

Every HTML element has a default display value: **block** or **inline**.

### 1. Block-Level Elements
- Always starts on a **new line**.
- Stretches out to fill the entire width of its container.
- Can have width, height, margin, and padding applied.
- Examples: \`<div>\`, \`<p>\`, \`<h1>\`-\`<h6>\`, \`<ul>\`, \`<li>\`, \`<section>\`, \`<form>\`.

### 2. Inline Elements
- Does **not** start on a new line; flows with adjacent text.
- Only takes up as much width as its content needs.
- Respects horizontal padding and margin, but vertical margin is ignored.
- Examples: \`<span>\`, \`<a>\`, \`<strong>\`, \`<em>\`, \`<img>\`, \`<button>\`.

## The \`<div>\` and \`<span>\` Containers

When no semantic tag is appropriate, developers use \`<div>\` and \`<span>\`:

- **\`<div>\` (Division)**: A generic block container used to group sections for styling or Flexbox/Grid layouts.
- **\`<span>\`**: A generic inline container used to style a specific word or phrase inside a sentence.

\`\`\`html
<div class="card">
  <h3>Hello <span class="highlight">World</span></h3>
</div>
\`\`\``,
    key_points_md: `- Block elements start on a new line; inline elements stay within the line.
- \`<div>\` is block-level; \`<span>\` is inline.
- Use semantic tags (like \`<main>\`, \`<article>\`) whenever possible before falling back to \`<div>\`.`,
    common_mistakes_md: `- Putting a block-level element like \`<p>\` or \`<div>\` inside an inline element like \`<span>\`.`,
    starter_code: `<!DOCTYPE html>
<html>
<head>
  <style>
    .box { background: #e2e8f0; padding: 12px; margin-bottom: 8px; border-radius: 6px; }
    .badge { background: #ff7020; color: white; padding: 2px 8px; border-radius: 4px; font-size: 11px; }
  </style>
</head>
<body>
  <h2>Block vs Inline Elements</h2>
  <div class="box">
    This div is a block element that takes up the entire width.
  </div>
  <p>
    This sentence contains a <span class="badge">NEW</span> badge styled with an inline span.
  </p>
</body>
</html>`,
    solution_code: `<!DOCTYPE html>
<html>
<head>
  <style>
    .box { background: #e2e8f0; padding: 12px; margin-bottom: 8px; border-radius: 6px; }
    .badge { background: #ff7020; color: white; padding: 2px 8px; border-radius: 4px; font-size: 11px; }
    .highlight { background: #fef08a; padding: 2px 4px; border-radius: 3px; }
  </style>
</head>
<body>
  <h2>Block vs Inline Elements</h2>
  <div class="box">
    This div is a block element that takes up the entire width.
  </div>
  <p>
    This sentence contains a <span class="badge">NEW</span> badge and some <span class="highlight">highlighted keywords</span>.
  </p>
</body>
</html>`,
    execution_mode: 'html_preview',
    language: 'html',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444113',
    module_id: '33333333-3333-3333-3333-333333333102',
    course_id: HTML_COURSE_ID,
    slug: 'html-buttons-and-iframes',
    title: 'HTML Buttons & Iframes',
    sort_order: 6,
    status: 'published',
    estimated_minutes: 15,
    objectives: [
      'Create clickable buttons with <button> and type attributes',
      'Embed external web pages securely using <iframe> and sandbox',
      'Distinguish links (<a>) from buttons (<button>)'
    ],
    content_md: `## HTML Buttons: \`<button>\`

The \`<button>\` element represents a clickable button used to submit forms or trigger JavaScript actions:

\`\`\`html
<button type="button" onclick="alert('Hello!')">Click Me</button>
<button type="submit">Submit Form</button>
<button type="reset">Reset Form</button>
\`\`\`

### Rule of Thumb: Link vs. Button
- If it **navigates to a new URL**, use an \`<a>\` link.
- If it **performs an action** (e.g. saves, deletes, toggles modal, submits form), use a \`<button>\`.

## HTML Iframes: \`<iframe>\`

An **iframe** (inline frame) embeds another HTML document inside the current page:

\`\`\`html
<iframe 
  src="https://example.com" 
  title="Example Website"
  width="100%" 
  height="300"
  sandbox="allow-scripts"
></iframe>
\`\`\`

> [!SECURITY]
> Always include \`title\` for accessibility and \`sandbox\` to isolate untrusted third-party iframe content from running malicious scripts.`,
    key_points_md: `- Use \`<a>\` to go somewhere; use \`<button>\` to do something.
- Always provide a descriptive \`title\` on every \`<iframe>\`.
- Use \`sandbox\` attributes on iframes to enforce security restrictions.`,
    common_mistakes_md: `- Using a \`<div>\` with a click handler instead of a real accessible \`<button>\`. Screen reader users cannot tab to generic divs!`,
    starter_code: `<!DOCTYPE html>
<html>
<body>
  <h2>Buttons and Embedded Frames</h2>
  <button type="button" onclick="document.getElementById('msg').textContent = 'Action triggered!'">
    Test Button
  </button>
  <p id="msg" style="color: #ea580c; font-weight: bold;"></p>

  <h3>Embedded Sandbox Frame</h3>
  <iframe 
    title="Example frame"
    srcdoc="<p style='font-family: sans-serif; color: #3b82f6;'>Hello from inside an isolated iframe!</p>"
    style="border: 1px solid #cbd5e1; width: 100%; height: 100px; border-radius: 8px;"
  ></iframe>
</body>
</html>`,
    solution_code: `<!DOCTYPE html>
<html>
<body>
  <h2>Buttons and Embedded Frames</h2>
  <button type="button" onclick="document.getElementById('msg').textContent = 'Action triggered!'">
    Test Button
  </button>
  <button type="button" onclick="document.getElementById('msg').textContent = ''">
    Clear
  </button>
  <p id="msg" style="color: #ea580c; font-weight: bold;"></p>

  <h3>Embedded Sandbox Frame</h3>
  <iframe 
    title="Example frame"
    srcdoc="<p style='font-family: sans-serif; color: #3b82f6;'>Hello from inside an isolated iframe!</p>"
    style="border: 1px solid #cbd5e1; width: 100%; height: 100px; border-radius: 8px;"
  ></iframe>
</body>
</html>`,
    execution_mode: 'html_preview',
    language: 'html',
    editor_enabled: true
  },

  // ========================================================
  // MODULE 3: HTML LAYOUT, HEAD & SEMANTICS (Lessons 14 - 17)
  // ========================================================
  {
    id: '44444444-4444-4444-4444-444444444114',
    module_id: '33333333-3333-3333-3333-333333333103',
    course_id: HTML_COURSE_ID,
    slug: 'html-head-and-meta',
    title: 'HTML Head, Title & Meta Tags',
    sort_order: 1,
    status: 'published',
    estimated_minutes: 15,
    objectives: [
      'Configure essential <meta> tags for charset, viewport, and SEO',
      'Set browser tab titles and Open Graph social sharing tags',
      'Link external stylesheets and Google Fonts in <head>'
    ],
    content_md: `## The Role of \`<head>\`

The \`<head>\` element is a container for metadata. It is executed before the body renders.

### Essential Head Elements:
\`\`\`html
<head>
  <!-- Character Encoding -->
  <meta charset="UTF-8">

  <!-- Responsive Viewport -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- Document Title -->
  <title>StackForge — Modern Developer Academy</title>

  <!-- SEO Meta Description -->
  <meta name="description" content="Learn Full-Stack Development with interactive practice.">

  <!-- External Stylesheet -->
  <link rel="stylesheet" href="styles.css">

  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
</head>
\`\`\`

## Open Graph (Social Sharing) Meta Tags
When users share your page link on LinkedIn, Twitter, or Discord, Open Graph tags control the preview card:
\`\`\`html
<meta property="og:title" content="StackForge Academy">
<meta property="og:description" content="Master HTML, CSS, JavaScript and SQL.">
<meta property="og:image" content="https://stackforge.dev/og-cover.png">
\`\`\``,
    key_points_md: `- The \`<title>\` tag is required and crucial for SEO.
- The \`viewport\` meta tag ensures correct mobile rendering.
- Social sharing cards rely on Open Graph (\`og:\`) metadata tags.`,
    common_mistakes_md: `- Forgetting \`<meta charset="UTF-8">\`, which can cause emojis or foreign characters to display as garbled symbols.`,
    starter_code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Developer Hub</title>
  <meta name="description" content="Learn web development with structured tutorials.">
</head>
<body>
  <h1>Metadata Configuration Verified</h1>
  <p>Inspect the document head to see production-ready meta tags.</p>
</body>
</html>`,
    solution_code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Developer Hub</title>
  <meta name="description" content="Learn web development with structured tutorials.">
  <meta property="og:title" content="Developer Hub">
</head>
<body>
  <h1>Metadata Configuration Verified</h1>
  <p>Inspect the document head to see production-ready meta tags.</p>
</body>
</html>`,
    execution_mode: 'html_preview',
    language: 'html',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444115',
    module_id: '33333333-3333-3333-3333-333333333103',
    course_id: HTML_COURSE_ID,
    slug: 'html-id-and-class',
    title: 'HTML Id & Class Attributes',
    sort_order: 2,
    status: 'published',
    estimated_minutes: 15,
    objectives: [
      'Learn the difference between unique IDs and reusable Classes',
      'Target elements with CSS selectors (#id vs .class)',
      'Select elements in JavaScript with getElementById and querySelector'
    ],
    content_md: `## \`class\` vs \`id\`

Both \`class\` and \`id\` identify elements for CSS styling and JavaScript access, but they have distinct rules:

| Property | \`class\` | \`id\` |
| :--- | :--- | :--- |
| **Uniqueness** | Multiple elements can share the same class | Must be unique on the entire page |
| **Quantity** | An element can have multiple classes: \`class="btn btn-primary"\` | An element has only ONE id: \`id="navbar"\` |
| **CSS Selector** | \`.btn { ... }\` (prefixed with dot) | \`#navbar { ... }\` (prefixed with hash) |
| **JS Method** | \`document.querySelectorAll('.btn')\` | \`document.getElementById('navbar')\` |

## Example Usage:
\`\`\`html
<!-- Single unique navbar -->
<nav id="main-navigation">
  <!-- Multiple reusable buttons sharing classes -->
  <button class="nav-link active">Home</button>
  <button class="nav-link">Courses</button>
</nav>
\`\`\``,
    key_points_md: `- Use classes for reusable styles that apply to multiple elements.
- Use IDs for single unique elements like the navbar, modal, or specific form input.
- CSS selector for class is \`.classname\`; for ID is \`#idname\`.`,
    common_mistakes_md: `- Using the same \`id\` on multiple elements; this breaks HTML validation and JavaScript queries!`,
    starter_code: `<!DOCTYPE html>
<html>
<head>
  <style>
    #featured-card { background: #0f172a; color: white; padding: 20px; border-radius: 8px; }
    .badge { padding: 4px 10px; border-radius: 999px; font-size: 12px; font-weight: bold; }
    .badge-orange { background: #ff7020; color: white; }
    .badge-blue { background: #38bdf8; color: #0f172a; }
  </style>
</head>
<body>
  <div id="featured-card">
    <h2>Full-Stack Certification</h2>
    <span class="badge badge-orange">Hot</span>
    <span class="badge badge-blue">Popular</span>
  </div>
</body>
</html>`,
    solution_code: `<!DOCTYPE html>
<html>
<head>
  <style>
    #featured-card { background: #0f172a; color: white; padding: 20px; border-radius: 8px; }
    .badge { padding: 4px 10px; border-radius: 999px; font-size: 12px; font-weight: bold; }
    .badge-orange { background: #ff7020; color: white; }
    .badge-blue { background: #38bdf8; color: #0f172a; }
  </style>
</head>
<body>
  <div id="featured-card">
    <h2>Full-Stack Certification</h2>
    <span class="badge badge-orange">Hot</span>
    <span class="badge badge-blue">Popular</span>
    <p>Completed by over 10,000 developers worldwide.</p>
  </div>
</body>
</html>`,
    execution_mode: 'html_preview',
    language: 'html',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444116',
    module_id: '33333333-3333-3333-3333-333333333103',
    course_id: HTML_COURSE_ID,
    slug: 'semantic-html-and-forms',
    title: 'HTML5 Semantic Elements & Page Structure',
    sort_order: 3,
    status: 'published',
    estimated_minutes: 20,
    objectives: [
      'Understand semantic HTML vs generic <div> containers',
      'Build standard layouts with <header>, <nav>, <main>, <article>, <aside>, <footer>',
      'Improve SEO rankings and accessibility compliance'
    ],
    content_md: `## What is Semantic HTML?

A **semantic element** clearly describes its meaning to both the browser and the developer.
- **Non-semantic**: \`<div>\` and \`<span>\` (tells nothing about its content).
- **Semantic**: \`<header>\`, \`<nav>\`, \`<main>\`, \`<article>\`, \`<section>\`, \`<aside>\`, \`<footer>\` (accurately defines its purpose).

## Semantic Architecture Map

\`\`\`
+------------------------------------------+
|                 <header>                 |
|  +------------------------------------+  |
|  |                <nav>               |  |
|  +------------------------------------+  |
+------------------------------------------+
|                  <main>                  |
|  +-------------------+  +-------------+  |
|  |     <section>     |  |   <aside>   |  |
|  |  +-------------+  |  |  (Sidebar)  |  |
|  |  |  <article>  |  |  +-------------+  |
|  |  +-------------+  |                   |
|  +-------------------+                   |
+------------------------------------------+
|                 <footer>                 |
+------------------------------------------+
\`\`\`

## Key Landmark Elements
- **\`<header>\`**: Introductory content or navigation banner.
- **\`<nav>\`**: Set of major navigation links.
- **\`<main>\`**: The dominant, unique content of the page (only one per document).
- **\`<article>\`**: Self-contained composition that could be syndicated (e.g. blog post, card).
- **\`<section>\`**: Thematic grouping of content with its own heading.
- **\`<aside>\`**: Secondary content like sidebars, related links, or callouts.
- **\`<footer>\`**: Closing info, copyrights, legal links.`,
    key_points_md: `- Semantic HTML eliminates "div soup".
- Every page must have exactly one \`<main>\` element.
- Search engines rank well-structured semantic HTML significantly higher.`,
    common_mistakes_md: `- Nesting \`<main>\` inside another \`<header>\` or \`<footer>\`.`,
    starter_code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; margin: 0; background: #f8fafc; }
    header, footer { background: #0f172a; color: white; padding: 16px; text-align: center; }
    main { padding: 20px; max-width: 800px; margin: 0 auto; }
    article { background: white; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; }
  </style>
</head>
<body>
  <header>
    <h1>Tech Insights</h1>
    <nav>
      <a href="#" style="color: #ff7020; margin-right: 12px;">Home</a>
      <a href="#" style="color: white;">Articles</a>
    </nav>
  </header>

  <main>
    <article>
      <h2>Why Semantic HTML Matters in 2026</h2>
      <p>Semantic tags make your code accessible, readable, and machine-friendly.</p>
    </article>
  </main>

  <footer>
    <p>&copy; 2026 Tech Insights. Built with StackForge.</p>
  </footer>
</body>
</html>`,
    solution_code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; margin: 0; background: #f8fafc; }
    header, footer { background: #0f172a; color: white; padding: 16px; text-align: center; }
    main { padding: 20px; max-width: 800px; margin: 0 auto; display: flex; gap: 20px; }
    article { background: white; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; flex: 2; }
    aside { background: #f1f5f9; padding: 16px; border-radius: 8px; flex: 1; }
  </style>
</head>
<body>
  <header>
    <h1>Tech Insights</h1>
    <nav>
      <a href="#" style="color: #ff7020; margin-right: 12px;">Home</a>
      <a href="#" style="color: white;">Articles</a>
    </nav>
  </header>

  <main>
    <article>
      <h2>Why Semantic HTML Matters in 2026</h2>
      <p>Semantic tags make your code accessible, readable, and machine-friendly.</p>
    </article>
    <aside>
      <h3>Trending Topics</h3>
      <p>TypeScript 5.5, React 19, CSS Subgrid.</p>
    </aside>
  </main>

  <footer>
    <p>&copy; 2026 Tech Insights. Built with StackForge.</p>
  </footer>
</body>
</html>`,
    execution_mode: 'html_preview',
    language: 'html',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444117',
    module_id: '33333333-3333-3333-3333-333333333103',
    course_id: HTML_COURSE_ID,
    slug: 'html-layout-and-responsive',
    title: 'HTML Layouts & Responsive Viewport',
    sort_order: 4,
    status: 'published',
    estimated_minutes: 20,
    objectives: [
      'Understand how responsive HTML adapts to mobile, tablet, and desktop',
      'Implement fluid percentages and viewport units',
      'Test layouts using responsive viewport controls'
    ],
    content_md: `## What is Responsive Web Design?

Responsive design ensures your website looks great on all devices: desktops, tablets, and phones.

### The Foundation: The Viewport Meta Tag
Without the viewport meta tag, mobile browsers display web pages as tiny shrunk-down desktop pages:

\`\`\`html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
\`\`\`
- \`width=device-width\`: Sets the page width to follow the screen-width of the device.
- \`initial-scale=1.0\`: Sets the initial zoom level when first loaded.

## Fluid Responsive Layouts

Using responsive containers that adapt with percentage and max-width:

\`\`\`html
<div style="max-width: 1200px; width: 90%; margin: 0 auto;">
  <!-- Stretches on small screens, stops expanding past 1200px on desktop -->
</div>
\`\`\`

You can toggle between Desktop and Mobile preview in StackForge's compiler to verify responsiveness!`,
    key_points_md: `- Always include the viewport meta tag.
- Use fluid units like \`%\` or \`max-width\` rather than fixed pixel widths like \`width: 1200px\`.
- Test responsive layouts at mobile and desktop breakpoints.`,
    common_mistakes_md: `- Hardcoding wide pixel widths on images or tables, which causes horizontal scrolling on phones.`,
    starter_code: `<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: sans-serif; margin: 0; padding: 20px; background: #0f172a; color: white; }
    .container { max-width: 600px; margin: 0 auto; background: #1e293b; padding: 20px; border-radius: 12px; }
    img { max-width: 100%; height: auto; border-radius: 8px; }
  </style>
</head>
<body>
  <div class="container">
    <h2>Fluid Mobile-Friendly Layout</h2>
    <p>Resize your browser preview or toggle Mobile Viewport to test fluidity.</p>
    <img src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&auto=format&fit=crop&q=60" alt="Code matrix background">
  </div>
</body>
</html>`,
    solution_code: `<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: sans-serif; margin: 0; padding: 20px; background: #0f172a; color: white; }
    .container { max-width: 600px; margin: 0 auto; background: #1e293b; padding: 20px; border-radius: 12px; }
    img { max-width: 100%; height: auto; border-radius: 8px; }
  </style>
</head>
<body>
  <div class="container">
    <h2>Fluid Mobile-Friendly Layout</h2>
    <p>Resize your browser preview or toggle Mobile Viewport to test fluidity.</p>
    <img src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&auto=format&fit=crop&q=60" alt="Code matrix background">
    <p style="color: #ff7020; font-size: 13px; margin-top: 10px;">✓ Passed responsive layout audit.</p>
  </div>
</body>
</html>`,
    execution_mode: 'html_preview',
    language: 'html',
    editor_enabled: true
  },

  // ========================================================
  // MODULE 4: HTML FORMS & USER INPUT (Lessons 18 - 21)
  // ========================================================
  {
    id: '44444444-4444-4444-4444-444444444118',
    module_id: '33333333-3333-3333-3333-333333333104',
    course_id: HTML_COURSE_ID,
    slug: 'html-forms-and-attributes',
    title: 'HTML Forms & Form Attributes',
    sort_order: 1,
    status: 'published',
    estimated_minutes: 20,
    objectives: [
      'Understand the role of the <form> element and HTTP submission',
      'Learn action and method attributes (GET vs POST)',
      'Manage autocomplete and novalidate form attributes'
    ],
    content_md: `## What is an HTML Form?

An HTML form is used to collect user input. The user input is most often sent to a server for processing.

\`\`\`html
<form action="/api/login" method="POST">
  <label for="username">Username:</label>
  <input type="text" id="username" name="username">
  <button type="submit">Log In</button>
</form>
\`\`\`

## The \`action\` and \`method\` Attributes

- **\`action\`**: The URL where form data is sent when submitted.
- **\`method\`**: The HTTP method used to send data:
  - **\`GET\`**: Appends form data to the URL as query parameters (\`?search=react\`). Best for search queries. Never use for passwords!
  - **\`POST\`**: Sends form data inside the HTTP request body. Required for logins, sensitive data, and modifying database records.

## Form Elements Require the \`name\` Attribute!

> [!WARNING]
> If an \`<input>\` element does NOT have a \`name\` attribute, its value will NOT be submitted to the server at all!`,
    key_points_md: `- Use \`method="POST"\` for forms handling passwords or database changes.
- Use \`method="GET"\` for search filters.
- Every form field sent to the server must have a \`name\` attribute.`,
    common_mistakes_md: `- Using \`GET\` for password forms, exposing passwords in the browser address bar and history.`,
    starter_code: `<!DOCTYPE html>
<html>
<body>
  <h2>Search Documentation</h2>
  <form action="https://www.google.com/search" method="GET" target="_blank">
    <label for="query">Search Query:</label>
    <input type="text" id="query" name="q" placeholder="e.g. HTML5 tutorial">
    <button type="submit">Search</button>
  </form>
</body>
</html>`,
    solution_code: `<!DOCTYPE html>
<html>
<body>
  <h2>Search Documentation</h2>
  <form action="https://www.google.com/search" method="GET" target="_blank">
    <label for="query">Search Query:</label>
    <input type="text" id="query" name="q" placeholder="e.g. HTML5 tutorial" required>
    <button type="submit">Search</button>
  </form>
</body>
</html>`,
    execution_mode: 'html_preview',
    language: 'html',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444119',
    module_id: '33333333-3333-3333-3333-333333333104',
    course_id: HTML_COURSE_ID,
    slug: 'html-form-elements',
    title: 'HTML Form Elements: select, textarea, button',
    sort_order: 2,
    status: 'published',
    estimated_minutes: 20,
    objectives: [
      'Create dropdown menus with <select> and <option>',
      'Collect multi-line feedback with <textarea>',
      'Group related controls with <fieldset> and <legend>'
    ],
    content_md: `## Beyond Basic Inputs

Forms often require dropdowns, multi-line text, and grouped sections:

### 1. Dropdown Selection: \`<select>\` & \`<option>\`
\`\`\`html
<label for="skill">Primary Skill:</label>
<select id="skill" name="skill">
  <option value="frontend">Frontend Development</option>
  <option value="backend">Backend Engineering</option>
  <option value="devops">DevOps & Cloud</option>
</select>
\`\`\`

### 2. Multi-line Text: \`<textarea>\`
Unlike \`<input>\`, a \`<textarea>\` allows users to enter multiple lines of text:
\`\`\`html
<label for="bio">Bio:</label>
<textarea id="bio" name="bio" rows="4" cols="50" placeholder="Tell us about your experience..."></textarea>
\`\`\`

### 3. Grouping Controls: \`<fieldset>\` & \`<legend>\`
Used to visually and semantically group related controls:
\`\`\`html
<fieldset>
  <legend>Notification Preferences</legend>
  <label><input type="checkbox" name="email_notifs"> Email Notifications</label>
</fieldset>
\`\`\``,
    key_points_md: `- Use \`<select>\` for compact dropdown choices.
- Use \`<textarea>\` for long paragraphs or comments.
- \`<fieldset>\` and \`<legend>\` group controls for screen reader users.`,
    common_mistakes_md: `- Trying to close \`<input>\` with \`</input>\`, or forgetting that \`<textarea>\` DOES have a closing tag (\`</textarea>\`).`,
    starter_code: `<!DOCTYPE html>
<html>
<body>
  <h2>Developer Survey</h2>
  <form>
    <label for="track">Choose Path:</label>
    <select id="track" name="track">
      <option value="fullstack">Full-Stack Developer</option>
      <option value="ai">AI Engineer</option>
    </select>
    <br><br>
    <label for="feedback">Your Experience:</label><br>
    <textarea id="feedback" name="feedback" rows="3" placeholder="Share feedback..."></textarea>
  </form>
</body>
</html>`,
    solution_code: `<!DOCTYPE html>
<html>
<body>
  <h2>Developer Survey</h2>
  <form>
    <fieldset style="border: 1px solid #cbd5e1; border-radius: 8px; padding: 16px;">
      <legend><strong>Career Details</strong></legend>
      <label for="track">Choose Path:</label>
      <select id="track" name="track">
        <option value="fullstack">Full-Stack Developer</option>
        <option value="ai">AI Engineer</option>
      </select>
      <br><br>
      <label for="feedback">Your Experience:</label><br>
      <textarea id="feedback" name="feedback" rows="3" placeholder="Share feedback..."></textarea>
    </fieldset>
  </form>
</body>
</html>`,
    execution_mode: 'html_preview',
    language: 'html',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444120',
    module_id: '33333333-3333-3333-3333-333333333104',
    course_id: HTML_COURSE_ID,
    slug: 'html-input-types-and-validation',
    title: 'HTML Input Types & Native Validation',
    sort_order: 3,
    status: 'published',
    estimated_minutes: 20,
    objectives: [
      'Master modern input types: email, password, number, date, checkbox, radio',
      'Enforce native client-side validation: required, min, max, pattern',
      'Understand the user experience advantages of specialized mobile keyboards'
    ],
    content_md: `## Modern HTML5 Input Types

Using the correct \`type\` attribute brings automatic validation and mobile keyboards (e.g. number pad for \`tel\`):

| Type | Purpose | Mobile Keyboard Triggered |
| :--- | :--- | :--- |
| \`text\` | Standard single-line text | Default keyboard |
| \`email\` | Email addresses with \`@\` check | Keyboard with \`@\` and \`.com\` |
| \`password\` | Masked secret characters | Default keyboard with security mask |
| \`number\` | Numeric input with spinners | Numeric keypad |
| \`date\` | Date picker calendar | Native date picker |
| \`checkbox\` | Multiple selections from a list | Square checkbox toggle |
| \`radio\` | Exactly one choice from a group | Circular radio toggle |

## Built-In HTML5 Validation Attributes

- \`required\`: Field cannot be submitted blank.
- \`min\` and \`max\`: Minimum and maximum values for numbers or dates.
- \`minlength\` and \`maxlength\`: Character count constraints.
- \`pattern\`: Regular expression pattern constraint.`,
    key_points_md: `- Native validation requires zero JavaScript; browsers stop invalid submissions automatically.
- Radio buttons in the same group MUST share the exact same \`name\` attribute.
- Specialized input types trigger convenient mobile touch keyboards.`,
    common_mistakes_md: `- Giving radio buttons different names, allowing the user to select all of them instead of only one.`,
    starter_code: `<!DOCTYPE html>
<html>
<body>
  <h2>User Registration</h2>
  <form onsubmit="alert('Validation passed!'); return false;">
    <div>
      <label for="email">Email Address:</label>
      <input type="email" id="email" name="email" required placeholder="user@example.com">
    </div>
    <br>
    <div>
      <label for="age">Age (18-99):</label>
      <input type="number" id="age" name="age" min="18" max="99" required>
    </div>
    <br>
    <button type="submit">Register</button>
  </form>
</body>
</html>`,
    solution_code: `<!DOCTYPE html>
<html>
<body>
  <h2>User Registration</h2>
  <form onsubmit="alert('Validation passed!'); return false;">
    <div>
      <label for="email">Email Address:</label>
      <input type="email" id="email" name="email" required placeholder="user@example.com">
    </div>
    <br>
    <div>
      <label for="age">Age (18-99):</label>
      <input type="number" id="age" name="age" min="18" max="99" required>
    </div>
    <br>
    <div>
      <label><input type="checkbox" name="terms" required> I agree to the terms of service</label>
    </div>
    <br>
    <button type="submit">Register</button>
  </form>
</body>
</html>`,
    execution_mode: 'html_preview',
    language: 'html',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444121',
    module_id: '33333333-3333-3333-3333-333333333104',
    course_id: HTML_COURSE_ID,
    slug: 'html-accessible-forms',
    title: 'HTML Accessible Forms & Labeling',
    sort_order: 4,
    status: 'published',
    estimated_minutes: 20,
    objectives: [
      'Explicitly associate <label> elements with inputs using the for attribute',
      'Increase tap target sizes for mobile accessibility',
      'Provide helper hints and error messages with aria-describedby'
    ],
    content_md: `## The Critical Role of \`<label>\`

Every input must have an accessible label. A placeholder is NOT an acceptable substitute for a label!

### Explicit Association with \`for\` and \`id\`
To associate a label with an input, match the label's \`for\` attribute with the input's \`id\`:

\`\`\`html
<label for="user-email">Work Email</label>
<input type="email" id="user-email" name="email">
\`\`\`

### Why This Matters:
1. **Screen Readers**: When a blind user tabs to the input, the screen reader announces "Work Email, edit text".
2. **Larger Click Target**: Clicking the text of the label automatically focuses or toggles the input—crucial for checkboxes on mobile!

## Supporting Accessible Hints with \`aria-describedby\`

\`\`\`html
<label for="password">Password</label>
<input type="password" id="password" aria-describedby="pass-hint">
<span id="pass-hint">Must be at least 8 characters with 1 number.</span>
\`\`\``,
    key_points_md: `- The \`for\` attribute on \`<label>\` MUST equal the \`id\` on \`<input>\`.
- Placeholders disappear when typing; labels stay visible permanently.
- Connecting labels expands touch targets for mobile accessibility.`,
    common_mistakes_md: `- Relying solely on \`placeholder="..."\` without a \`<label>\`.`,
    starter_code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; padding: 20px; }
    .form-group { margin-bottom: 16px; }
    label { display: block; font-weight: bold; margin-bottom: 4px; }
    input[type="text"] { width: 100%; max-width: 300px; padding: 8px; border: 1px solid #cbd5e1; border-radius: 6px; }
  </style>
</head>
<body>
  <h2>Accessible Account Setup</h2>
  <form>
    <div class="form-group">
      <label for="full-name">Full Name</label>
      <input type="text" id="full-name" name="name" required>
    </div>
  </form>
</body>
</html>`,
    solution_code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; padding: 20px; }
    .form-group { margin-bottom: 16px; }
    label { display: block; font-weight: bold; margin-bottom: 4px; }
    input[type="text"] { width: 100%; max-width: 300px; padding: 8px; border: 1px solid #cbd5e1; border-radius: 6px; }
    .hint { font-size: 12px; color: #64748b; margin-top: 4px; display: block; }
  </style>
</head>
<body>
  <h2>Accessible Account Setup</h2>
  <form>
    <div class="form-group">
      <label for="full-name">Full Name</label>
      <input type="text" id="full-name" name="name" required aria-describedby="name-hint">
      <span id="name-hint" class="hint">Enter your legal name as it appears on official IDs.</span>
    </div>
  </form>
</body>
</html>`,
    execution_mode: 'html_preview',
    language: 'html',
    editor_enabled: true
  },

  // ========================================================
  // MODULE 5: HTML ADVANCED, ENTITIES & GRAPHICS (Lessons 22 - 25)
  // ========================================================
  {
    id: '44444444-4444-4444-4444-444444444122',
    module_id: '33333333-3333-3333-3333-333333333105',
    course_id: HTML_COURSE_ID,
    slug: 'html-entities-and-symbols',
    title: 'HTML Character Entities & Reserved Characters',
    sort_order: 1,
    status: 'published',
    estimated_minutes: 15,
    objectives: [
      'Learn reserved characters in HTML: <, >, &, ", and \'',
      'Use HTML entity names (&lt;) and entity numbers (&#60;)',
      'Render special symbols, copyrights, currencies, and mathematical operators'
    ],
    content_md: `## Reserved Characters in HTML

Some characters are reserved in HTML syntax. For example, if you type the less-than (\`<\`) or greater-than (\`>\`) signs in text, the browser will mistake them for HTML tags!

To safely display reserved characters, you must replace them with **character entities**:

| Character | Description | Entity Name | Entity Number |
| :---: | :--- | :--- | :--- |
| \`<\` | Less than | \`&lt;\` | \`&#60;\` |
| \`>\` | Greater than | \`&gt;\` | \`&#62;\` |
| \`&\` | Ampersand | \`&amp;\` | \`&#38;\` |
| \`"\` | Double quotation | \`&quot;\` | \`&#34;\` |
| \`'\` | Single quotation | \`&apos;\` | \`&#39;\` |
| \` \` | Non-breaking space | \`&nbsp;\` | \`&#160;\` |

## Common Useful Symbols

\`\`\`html
<p>&copy; 2026 StackForge Inc. All Rights Reserved.</p>
<p>Total cost: &euro;49 or &pound;42</p>
<p>Mathematics: 5 &times; 10 &divide; 2 &ne; 100</p>
<p>Direction: Press &rarr; to advance to the next step.</p>
\`\`\`

## Non-Breaking Space: \`&nbsp;\`
Browsers collapse multiple spaces into a single space. To force multiple spaces or prevent two words from breaking across lines, use \`&nbsp;\`:
\`\`\`html
<p>10&nbsp;kilometers (words will never separate)</p>
\`\`\``,
    key_points_md: `- Reserved characters like \`<\` and \`>\` must be written as \`&lt;\` and \`&gt;\`.
- Character entities always start with an ampersand \`&\` and end with a semicolon \`;\`.
- \`&copy;\` prints the copyright symbol &copy;.`,
    common_mistakes_md: `- Forgetting the trailing semicolon (\`&copy\` instead of \`&copy;\`).`,
    starter_code: `<!DOCTYPE html>
<html>
<body>
  <h2>Character Entities in Action</h2>
  <p>To declare a paragraph, write the &lt;p&gt; tag in your HTML file.</p>
  <p>5 &lt; 10 and 100 &gt; 50.</p>
  <p>Smith &amp; Sons Consulting.</p>
</body>
</html>`,
    solution_code: `<!DOCTYPE html>
<html>
<body>
  <h2>Character Entities in Action</h2>
  <p>To declare a paragraph, write the &lt;p&gt; tag in your HTML file.</p>
  <p>5 &lt; 10 and 100 &gt; 50.</p>
  <p>Smith &amp; Sons Consulting.</p>
  <hr>
  <p>&copy; 2026 StackForge. All rights reserved. Price: &euro;99 &times; 2.</p>
</body>
</html>`,
    execution_mode: 'html_preview',
    language: 'html',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444123',
    module_id: '33333333-3333-3333-3333-333333333105',
    course_id: HTML_COURSE_ID,
    slug: 'html-audio-video-multimedia',
    title: 'HTML Audio, Video & Multimedia',
    sort_order: 2,
    status: 'published',
    estimated_minutes: 20,
    objectives: [
      'Embed video with <video>, controls, autoplay, and poster',
      'Embed audio tracks with <audio> and <source> fallbacks',
      'Provide subtitles and closed captions with <track>'
    ],
    content_md: `## HTML Video: \`<video>\`

HTML5 allows direct playback of video files without requiring third-party plugins:

\`\`\`html
<video width="640" height="360" controls poster="cover.jpg">
  <source src="movie.mp4" type="video/mp4">
  <source src="movie.webm" type="video/webm">
  Your browser does not support the video tag.
</video>
\`\`\`

### Attributes:
- \`controls\`: Displays play/pause, volume, and fullscreen buttons.
- \`autoplay\`: Automatically starts playback (requires \`muted\` in modern browsers).
- \`muted\`: Mutes sound output by default.
- \`poster\`: Shows a preview image before playback starts.

## HTML Audio: \`<audio>\`

\`\`\`html
<audio controls>
  <source src="podcast.mp3" type="audio/mpeg">
  Your browser does not support the audio element.
</audio>
\`\`\``,
    key_points_md: `- Always include the \`controls\` attribute so users can manage playback.
- Provide multiple \`<source>\` tags for cross-browser codec compatibility.
- Autoplay requires \`muted\` to respect browser user-experience policies.`,
    common_mistakes_md: `- Attempting unmuted autoplay; modern browsers block it automatically.`,
    starter_code: `<!DOCTYPE html>
<html>
<body>
  <h2>Multimedia Audio Player</h2>
  <audio controls>
    <source src="https://www.w3schools.com/html/horse.mp3" type="audio/mpeg">
    Your browser does not support the audio tag.
  </audio>
  <p>Use the controls above to test audio playback.</p>
</body>
</html>`,
    solution_code: `<!DOCTYPE html>
<html>
<body>
  <h2>Multimedia Audio Player</h2>
  <audio controls>
    <source src="https://www.w3schools.com/html/horse.mp3" type="audio/mpeg">
    Your browser does not support the audio tag.
  </audio>
  <p>Use the controls above to test audio playback.</p>
</body>
</html>`,
    execution_mode: 'html_preview',
    language: 'html',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444124',
    module_id: '33333333-3333-3333-3333-333333333105',
    course_id: HTML_COURSE_ID,
    slug: 'html-canvas-graphics',
    title: 'HTML Canvas & 2D Graphics',
    sort_order: 3,
    status: 'published',
    estimated_minutes: 20,
    objectives: [
      'Define canvas drawing surfaces with <canvas>',
      'Draw shapes, rectangles, paths, and circles using the JavaScript 2D context',
      'Render dynamic charts and animations'
    ],
    content_md: `## What is the HTML \`<canvas>\`?

The \`<canvas>\` tag provides a resolution-dependent bitmap canvas used to draw graphics on the fly via JavaScript:

\`\`\`html
<canvas id="myCanvas" width="300" height="150" style="border: 1px solid #cbd5e1;"></canvas>
\`\`\`

The \`<canvas>\` element is only a container for graphics. You must use JavaScript to draw on it!

## Drawing with the 2D Context

\`\`\`javascript
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Draw a filled orange rectangle
ctx.fillStyle = '#ff7020';
ctx.fillRect(20, 20, 150, 80);

// Draw a blue circle
ctx.beginPath();
ctx.arc(220, 60, 30, 0, 2 * Math.PI);
ctx.fillStyle = '#38bdf8';
ctx.fill();
\`\`\``,
    key_points_md: `- The \`<canvas>\` element is a blank drawing surface.
- Get the drawing context with \`canvas.getContext('2d')\`.
- Canvas coordinates start at \`(0, 0)\` in the top-left corner.`,
    common_mistakes_md: `- Setting canvas dimensions via CSS (\`style="width: 300px"\`) instead of HTML attributes (\`width="300"\`), which causes pixel stretching.`,
    starter_code: `<!DOCTYPE html>
<html>
<body>
  <h2>Canvas 2D Graphics</h2>
  <canvas id="demoCanvas" width="320" height="160" style="border: 1px solid #334155; background: #0f172a; border-radius: 8px;"></canvas>

  <script>
    const canvas = document.getElementById('demoCanvas');
    const ctx = canvas.getContext('2d');

    // Draw orange rectangle
    ctx.fillStyle = '#ff7020';
    ctx.fillRect(30, 30, 100, 60);

    // Draw text
    ctx.fillStyle = '#ffffff';
    ctx.font = '14px sans-serif';
    ctx.fillText('StackForge 2D', 30, 120);
  </script>
</body>
</html>`,
    solution_code: `<!DOCTYPE html>
<html>
<body>
  <h2>Canvas 2D Graphics</h2>
  <canvas id="demoCanvas" width="320" height="160" style="border: 1px solid #334155; background: #0f172a; border-radius: 8px;"></canvas>

  <script>
    const canvas = document.getElementById('demoCanvas');
    const ctx = canvas.getContext('2d');

    // Draw orange rectangle
    ctx.fillStyle = '#ff7020';
    ctx.fillRect(30, 30, 100, 60);

    // Draw cyan circle
    ctx.beginPath();
    ctx.arc(220, 60, 35, 0, 2 * Math.PI);
    ctx.fillStyle = '#38bdf8';
    ctx.fill();

    // Draw text
    ctx.fillStyle = '#ffffff';
    ctx.font = '14px sans-serif';
    ctx.fillText('StackForge 2D Canvas', 30, 130);
  </script>
</body>
</html>`,
    execution_mode: 'html_preview',
    language: 'html',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444125',
    module_id: '33333333-3333-3333-3333-333333333105',
    course_id: HTML_COURSE_ID,
    slug: 'html-best-practices',
    title: 'HTML Best Practices & Accessibility (WCAG)',
    sort_order: 4,
    status: 'published',
    estimated_minutes: 20,
    objectives: [
      'Apply the First Rule of ARIA and native semantic elements',
      'Ensure keyboard focus indicators and logical tab order',
      'Validate markup against W3C standards'
    ],
    content_md: `## The First Rule of ARIA

**Accessible Rich Internet Applications (ARIA)** is a set of attributes that define ways to make web content accessible to individuals with disabilities.

However, the golden rule of ARIA states:
> *"If you can use a native HTML5 element or attribute with the semantics and behavior you require already built in, do so instead of re-purposing an element and adding ARIA."*

\`\`\`html
<!-- ❌ BAD: Fake button using div with ARIA -->
<div role="button" tabindex="0" onclick="save()">Save</div>

<!--  GOOD: Native semantic button -->
<button type="button" onclick="save()">Save</button>
\`\`\`

## 5 Essential Accessibility Checklist Rules:
1. **Always specify \`<html lang="en">\`** on the root tag.
2. **Every image has a meaningful \`alt\`** attribute.
3. **Every form input has a linked \`<label for="id">\`**.
4. **Use exactly one \`<h1>\`** for the main document heading.
5. **Never remove outline focus styles** (\`outline: none\`) unless replacing them with high-contrast custom focus rings.`,
    key_points_md: `- Native HTML5 tags have accessibility built-in for free.
- Keep the keyboard tab order logical and visible.
- High color contrast is mandatory for low-vision users.`,
    common_mistakes_md: `- Hiding keyboard focus rings with CSS \`outline: none\`, making websites impossible to navigate via keyboard.`,
    starter_code: `<!DOCTYPE html>
<html lang="en">
<head>
  <style>
    body { font-family: sans-serif; background: #0f172a; color: #f8fafc; padding: 24px; }
    .btn { display: inline-block; padding: 12px 20px; background: #ff7020; color: white; border-radius: 8px; font-weight: bold; border: none; cursor: pointer; }
    .btn:focus-visible { outline: 3px solid #38bdf8; outline-offset: 2px; }
  </style>
</head>
<body>
  <h2>Accessible Button Focus Test</h2>
  <p>Click below and press Tab to see high-contrast accessibility focus rings in action:</p>
  <button type="button" class="btn">Accessible Action Button</button>
</body>
</html>`,
    solution_code: `<!DOCTYPE html>
<html lang="en">
<head>
  <style>
    body { font-family: sans-serif; background: #0f172a; color: #f8fafc; padding: 24px; }
    .btn { display: inline-block; padding: 12px 20px; background: #ff7020; color: white; border-radius: 8px; font-weight: bold; border: none; cursor: pointer; }
    .btn:focus-visible { outline: 3px solid #38bdf8; outline-offset: 2px; }
  </style>
</head>
<body>
  <h2>Accessible Button Focus Test</h2>
  <p>Click below and press Tab to see high-contrast accessibility focus rings in action:</p>
  <button type="button" class="btn">Accessible Action Button</button>
  <button type="button" class="btn" style="background: #334155; margin-left: 8px;">Secondary Action</button>
</body>
</html>`,
    execution_mode: 'html_preview',
    language: 'html',
    editor_enabled: true
  }
];
