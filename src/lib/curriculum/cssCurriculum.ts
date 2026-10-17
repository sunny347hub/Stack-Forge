import type { CourseModule, Lesson } from '../../types/database';

export const CSS_COURSE_ID = '22222222-2222-2222-2222-222222222202';

export const CSS_MODULES: CourseModule[] = [
  {
    id: '33333333-3333-3333-3333-333333333201',
    course_id: CSS_COURSE_ID,
    title: 'Module 1: CSS Basics & Selectors',
    sort_order: 1,
    status: 'published'
  },
  {
    id: '33333333-3333-3333-3333-333333333202',
    course_id: CSS_COURSE_ID,
    title: 'Module 2: Box Model & Spacing',
    sort_order: 2,
    status: 'published'
  },
  {
    id: '33333333-3333-3333-3333-333333333203',
    course_id: CSS_COURSE_ID,
    title: 'Module 3: Colors, Backgrounds & Typography',
    sort_order: 3,
    status: 'published'
  },
  {
    id: '33333333-3333-3333-3333-333333333204',
    course_id: CSS_COURSE_ID,
    title: 'Module 4: Modern Layouts: Flexbox & Grid',
    sort_order: 4,
    status: 'published'
  },
  {
    id: '33333333-3333-3333-3333-333333333205',
    course_id: CSS_COURSE_ID,
    title: 'Module 5: Responsive Design & Transitions',
    sort_order: 5,
    status: 'published'
  }
];

export const CSS_LESSONS: Lesson[] = [
  // Module 1: CSS Basics & Selectors
  {
    id: '44444444-4444-4444-4444-444444444201',
    module_id: '33333333-3333-3333-3333-333333333201',
    course_id: CSS_COURSE_ID,
    slug: 'css-intro-and-syntax',
    title: 'CSS Introduction & Syntax',
    sort_order: 1,
    status: 'published',
    estimated_minutes: 15,
    objectives: [
      'Understand what CSS does and how it attaches to HTML documents',
      'Master the CSS Rule-Set: selector, property, and value',
      'Explore the cascade, inheritance, and declaration syntax'
    ],
    content_md: `## What is CSS?

**CSS** stands for **C**ascading **S**tyle **S**heets. It describes how HTML elements are to be displayed on screen, paper, or in other media.

CSS saves a tremendous amount of work because it can control the layout of multiple web pages all at once.

## CSS Syntax Anatomy

A CSS rule consists of a **selector** and a **declaration block**:

\`\`\`css
selector {
  property: value;
}
\`\`\`

- **Selector**: Points to the HTML element you want to style (e.g. \`h1\`, \`.card\`).
- **Declaration Block**: Contains one or more declarations separated by semicolons.
- **Property**: The style attribute you want to change (e.g. \`color\`, \`font-size\`).
- **Value**: The setting applied to the property (e.g. \`#ff7020\`, \`24px\`).`,
    key_points_md: `- CSS defines presentation; HTML defines structure.
- Always terminate CSS declarations with semicolons \`;\`.
- External stylesheets (\`.css\`) are the gold standard for production websites.`,
    common_mistakes_md: `- Omitting semicolons between declarations, causing subsequent rules to fail silently.`,
    starter_code: `body {
  font-family: system-ui, sans-serif;
  background-color: #0f172a;
  color: #f8fafc;
  padding: 24px;
}

h1 {
  color: #ff7020;
  font-size: 28px;
}

p {
  color: #94a3b8;
  line-height: 1.6;
}`,
    solution_code: `body {
  font-family: system-ui, sans-serif;
  background-color: #0f172a;
  color: #f8fafc;
  padding: 24px;
}

h1 {
  color: #ff7020;
  font-size: 28px;
  border-bottom: 2px solid #334155;
  padding-bottom: 8px;
}

p {
  color: #94a3b8;
  line-height: 1.6;
}`,
    execution_mode: 'css_preview',
    language: 'css',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444202',
    module_id: '33333333-3333-3333-3333-333333333201',
    course_id: CSS_COURSE_ID,
    slug: 'css-selectors',
    title: 'CSS Selectors & Specificity',
    sort_order: 2,
    status: 'published',
    estimated_minutes: 20,
    objectives: [
      'Master element, class, ID, and universal selectors',
      'Learn combinator selectors: descendant, child (>), adjacent (+)',
      'Calculate CSS Specificity weights to resolve style conflicts'
    ],
    content_md: `## CSS Selectors

CSS selectors are used to "find" (or select) the HTML elements you want to style:

| Selector | Example | Description |
| :--- | :--- | :--- |
| **Element** | \`p { ... }\` | Selects all \`<p>\` elements |
| **Class** | \`.btn { ... }\` | Selects all elements with \`class="btn"\` |
| **ID** | \`#hero { ... }\` | Selects the unique element with \`id="hero"\` |
| **Universal** | \`* { ... }\` | Selects every element on the page |
| **Child** | \`ul > li { ... }\` | Selects direct child \`<li>\` inside \`<ul>\` |
| **Pseudo-class** | \`a:hover { ... }\` | Selects link when user hovers mouse |

## The Specificity Hierarchy
When multiple conflicting rules match the same element, specificity determines the winner:
1. **Inline styles** (\`style="..."\`) = 1,000 points
2. **IDs** (\`#nav\`) = 100 points
3. **Classes & Pseudo-classes** (\`.btn\`, \`:hover\`) = 10 points
4. **Element tags** (\`h1\`, \`p\`) = 1 point`,
    key_points_md: `- Class selectors are reusable; ID selectors are unique.
- Specificity is calculated as: \`(inline, IDs, classes, elements)\`.
- Avoid using \`!important\`; structure specific class selectors instead.`,
    common_mistakes_md: `- Over-specifying selectors like \`body div.main ul li a\`, creating unmaintainable specificity wars.`,
    starter_code: `/* Select all headings */
h2 {
  color: #38bdf8;
}

/* Select by class */
.featured {
  background-color: #1e293b;
  border-left: 4px solid #ff7020;
  padding: 12px 16px;
  border-radius: 4px;
}

/* Pseudo-class on hover */
button:hover {
  background-color: #ff7020;
  color: white;
}`,
    solution_code: `h2 {
  color: #38bdf8;
}

.featured {
  background-color: #1e293b;
  border-left: 4px solid #ff7020;
  padding: 12px 16px;
  border-radius: 4px;
}

button {
  background-color: #334155;
  color: #f8fafc;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

button:hover {
  background-color: #ff7020;
  color: white;
  transform: translateY(-1px);
}`,
    execution_mode: 'css_preview',
    language: 'css',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444203',
    module_id: '33333333-3333-3333-3333-333333333201',
    course_id: CSS_COURSE_ID,
    slug: 'css-colors-and-backgrounds',
    title: 'CSS Colors, Backgrounds & Opacity',
    sort_order: 3,
    status: 'published',
    estimated_minutes: 15,
    objectives: [
      'Apply background colors, gradients, and images in CSS',
      'Use background-size: cover and background-position',
      'Control alpha transparency with rgba() and hsla()'
    ],
    content_md: `## CSS Background Properties

CSS background properties are used to add background effects for elements:
- \`background-color\`: Sets solid color or semi-transparent RGBA.
- \`background-image\`: Embeds image or linear gradient.
- \`background-size\`: \`cover\` (fills container), \`contain\` (fits whole image).
- \`background-position\`: Sets anchor point (e.g. \`center center\`).

## Beautiful Linear Gradients
\`\`\`css
.gradient-banner {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #ff7020 100%);
}
\`\`\``,
    key_points_md: `- Use \`linear-gradient\` for modern header backgrounds.
- Set \`background-size: cover\` to prevent background image distortion.`,
    common_mistakes_md: `- Using low contrast text on gradients, reducing readability.`,
    starter_code: `.hero {
  background: linear-gradient(135deg, #0f172a, #1e293b);
  color: white;
  padding: 30px;
  border-radius: 12px;
  border: 1px solid #334155;
}`,
    solution_code: `.hero {
  background: linear-gradient(135deg, #0f172a, #1e293b);
  color: white;
  padding: 30px;
  border-radius: 12px;
  border: 1px solid #334155;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
}`,
    execution_mode: 'css_preview',
    language: 'css',
    editor_enabled: true
  },

  // Module 2: Box Model & Spacing
  {
    id: '44444444-4444-4444-4444-444444444204',
    module_id: '33333333-3333-3333-3333-333333333202',
    course_id: CSS_COURSE_ID,
    slug: 'css-box-model',
    title: 'The CSS Box Model',
    sort_order: 1,
    status: 'published',
    estimated_minutes: 20,
    objectives: [
      'Master the 4 layers: Content, Padding, Border, and Margin',
      'Understand the crucial box-sizing: border-box reset',
      'Diagnose element sizing and layout overflow issues'
    ],
    content_md: `## The CSS Box Model

All HTML elements can be considered as boxes. In CSS, the term **"Box Model"** is used when talking about design and layout.

The CSS box model is essentially a box that wraps around every HTML element:
1. **Content**: The content of the box, where text and images appear.
2. **Padding**: Clears an area around the content. The padding is transparent.
3. **Border**: A border that goes around the padding and content.
4. **Margin**: Clears an area outside the border. The margin is transparent.

## The Universal Reset: \`box-sizing: border-box\`
By default, adding padding or border makes an element wider than its defined \`width\`.
Setting \`box-sizing: border-box\` ensures padding and border are included INSIDE the width:

\`\`\`css
* {
  box-sizing: border-box;
}
\`\`\``,
    key_points_md: `- Padding is INSIDE the border; margin is OUTSIDE the border.
- Always apply \`box-sizing: border-box\` to avoid calculation headaches.
- Collapsing margins occur between adjacent vertical margins.`,
    common_mistakes_md: `- Forgetting \`box-sizing: border-box\`, causing elements with \`width: 100%; padding: 20px\` to overflow the screen!`,
    starter_code: `* {
  box-sizing: border-box;
}

.box {
  width: 250px;
  padding: 20px;
  border: 2px solid #ff7020;
  margin: 20px auto;
  background-color: #1e293b;
  color: white;
  text-align: center;
}`,
    solution_code: `* {
  box-sizing: border-box;
}

.box {
  width: 250px;
  padding: 20px;
  border: 2px solid #ff7020;
  margin: 20px auto;
  background-color: #1e293b;
  color: white;
  text-align: center;
  border-radius: 8px;
}`,
    execution_mode: 'css_preview',
    language: 'css',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444205',
    module_id: '33333333-3333-3333-3333-333333333202',
    course_id: CSS_COURSE_ID,
    slug: 'css-borders-and-outlines',
    title: 'Borders, Outlines & Rounded Corners',
    sort_order: 2,
    status: 'published',
    estimated_minutes: 15,
    objectives: [
      'Style borders with width, style (solid, dashed), and color',
      'Create rounded corners with border-radius and circular avatars (50%)',
      'Use outlines for high-contrast focus rings without affecting layout'
    ],
    content_md: `## Borders vs Outlines

- **\`border\`**: Takes up physical layout space inside the box model.
- **\`outline\`**: Drawn outside the element border and takes up NO layout space. Perfect for accessibility focus rings!

## Rounded Corners with \`border-radius\`
\`\`\`css
.card { border-radius: 12px; }
.avatar { border-radius: 50%; } /* Perfect circle */
\`\`\``,
    key_points_md: `- Outlines do not affect element dimensions or cause layout jumps.
- \`border-radius: 50%\` creates circular images.`,
    common_mistakes_md: `- Removing outlines with \`outline: none\` without providing a visible focus alternative.`,
    starter_code: `.card {
  border: 1px solid #334155;
  border-radius: 12px;
  padding: 20px;
  background: #1e293b;
  color: white;
}

button:focus-visible {
  outline: 3px solid #ff7020;
  outline-offset: 2px;
}`,
    solution_code: `.card {
  border: 1px solid #334155;
  border-radius: 12px;
  padding: 20px;
  background: #1e293b;
  color: white;
}

button:focus-visible {
  outline: 3px solid #ff7020;
  outline-offset: 2px;
}`,
    execution_mode: 'css_preview',
    language: 'css',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444206',
    module_id: '33333333-3333-3333-3333-333333333202',
    course_id: CSS_COURSE_ID,
    slug: 'css-dimensions-box-sizing',
    title: 'Width, Max-Width & Box Sizing',
    sort_order: 3,
    status: 'published',
    estimated_minutes: 15,
    objectives: [
      'Differentiate fixed width vs responsive max-width',
      'Center block elements with margin: 0 auto',
      'Handle content overflow with overflow: auto and hidden'
    ],
    content_md: `## \`width\` vs \`max-width\`

- If you set \`width: 800px\`, the element will stay 800px even on a 375px mobile screen, creating an ugly horizontal scrollbar!
- If you set \`max-width: 800px; width: 100%;\`, the element expands up to 800px on desktop and shrinks fluidly on mobile.

\`\`\`css
.responsive-container {
  max-width: 900px;
  width: 100%;
  margin: 0 auto; /* Horizontally centers the container */
}
\`\`\``,
    key_points_md: `- Always prefer \`max-width\` for responsive layouts.
- \`margin: 0 auto\` centers block elements with a declared width.`,
    common_mistakes_md: `- Setting fixed pixel widths on root layout containers.`,
    starter_code: `.container {
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  background: #1e293b;
  color: white;
  padding: 24px;
  border-radius: 8px;
}`,
    solution_code: `.container {
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  background: #1e293b;
  color: white;
  padding: 24px;
  border-radius: 8px;
}`,
    execution_mode: 'css_preview',
    language: 'css',
    editor_enabled: true
  },

  // Module 3: Typography & Colors
  {
    id: '44444444-4444-4444-4444-444444444207',
    module_id: '33333333-3333-3333-3333-333333333203',
    course_id: CSS_COURSE_ID,
    slug: 'css-fonts-typography',
    title: 'CSS Fonts & Web Typography',
    sort_order: 1,
    status: 'published',
    estimated_minutes: 15,
    objectives: [
      'Configure font-family fallbacks and system font stacks',
      'Import Google Fonts with @import and <link>',
      'Use font-weight, font-style, and rem font sizing'
    ],
    content_md: `## CSS Font Families

In CSS, there are 5 generic font families:
1. **Sans-serif**: Clean lines without strokes (e.g. Inter, Roboto, Arial).
2. **Serif**: Classic letters with decorative strokes (e.g. Times New Roman, Georgia).
3. **Monospace**: Fixed equal width per character (e.g. JetBrains Mono, Courier).
4. **Cursive**: Handwriting styles.
5. **Fantasy**: Decorative styles.

\`\`\`css
body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}
code {
  font-family: 'JetBrains Mono', monospace;
}
\`\`\``,
    key_points_md: `- Always provide generic fallbacks like \`sans-serif\` or \`monospace\`.
- Use \`rem\` units for font sizing so users' browser accessibility preferences are respected.`,
    common_mistakes_md: `- Specifying a single font name without fallback fonts.`,
    starter_code: `body {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: #f8fafc;
  background: #0f172a;
}`,
    solution_code: `body {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  color: #f8fafc;
  background: #0f172a;
}`,
    execution_mode: 'css_preview',
    language: 'css',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444208',
    module_id: '33333333-3333-3333-3333-333333333203',
    course_id: CSS_COURSE_ID,
    slug: 'css-text-styling',
    title: 'Text Alignment, Spacing & Line Height',
    sort_order: 2,
    status: 'published',
    estimated_minutes: 15,
    objectives: [
      'Format text alignment (left, center, right, justify)',
      'Optimize readability with line-height and letter-spacing',
      'Handle text overflow with text-overflow: ellipsis'
    ],
    content_md: `## Readability Best Practices

- **\`line-height\`**: Set between \`1.5\` and \`1.7\` for body paragraphs.
- **\`letter-spacing\`**: Slightly negative for large headings (\`-0.02em\`); slightly positive for small all-caps tags (\`0.05em\`).
- **\`text-transform\`**: \`uppercase\`, \`lowercase\`, \`capitalize\`.`,
    key_points_md: `- Unitless line-height (e.g. \`line-height: 1.5\`) scales proportionally.
- Avoid \`text-align: justify\` on the web; it creates uneven whitespace rivers.`,
    common_mistakes_md: `- Tight line-height (\`line-height: 1.0\`) on body copy, making multi-line text hard to read.`,
    starter_code: `h1 {
  letter-spacing: -0.03em;
  color: #ff7020;
}

p {
  line-height: 1.6;
  color: #cbd5e1;
}`,
    solution_code: `h1 {
  letter-spacing: -0.03em;
  color: #ff7020;
}

p {
  line-height: 1.6;
  color: #cbd5e1;
}`,
    execution_mode: 'css_preview',
    language: 'css',
    editor_enabled: true
  },

  // Module 4: Modern Layouts: Flexbox & Grid
  {
    id: '44444444-4444-4444-4444-444444444209',
    module_id: '33333333-3333-3333-3333-333333333204',
    course_id: CSS_COURSE_ID,
    slug: 'css-display-property',
    title: 'CSS Display: Block, Inline & None',
    sort_order: 1,
    status: 'published',
    estimated_minutes: 15,
    objectives: [
      'Master the display property: block, inline, inline-block, none',
      'Understand display: none vs visibility: hidden',
      'Prepare elements for modern Flexbox and Grid containers'
    ],
    content_md: `## The Display Property

The \`display\` property is the most important CSS property for controlling layout.

- **\`block\`**: Starts on a new line and stretches full width.
- **\`inline\`**: Flows inside text; cannot set width/height.
- **\`inline-block\`**: Flows inline with text, BUT respects width, height, and vertical padding!
- **\`none\`**: Completely removes the element from the document flow.`,
    key_points_md: `- \`display: none\` removes the element completely; \`visibility: hidden\` hides it while keeping its blank space.
- \`inline-block\` is ideal for badges and buttons.`,
    common_mistakes_md: `- Trying to set \`width\` on a \`display: inline\` element.`,
    starter_code: `.badge {
  display: inline-block;
  padding: 4px 10px;
  background: #ff7020;
  color: white;
  border-radius: 4px;
}`,
    solution_code: `.badge {
  display: inline-block;
  padding: 4px 10px;
  background: #ff7020;
  color: white;
  border-radius: 4px;
}`,
    execution_mode: 'css_preview',
    language: 'css',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444210',
    module_id: '33333333-3333-3333-3333-333333333204',
    course_id: CSS_COURSE_ID,
    slug: 'css-positioning',
    title: 'CSS Positioning: Static, Relative, Absolute & Fixed',
    sort_order: 2,
    status: 'published',
    estimated_minutes: 20,
    objectives: [
      'Master the 5 position values: static, relative, absolute, fixed, sticky',
      'Use position: relative on parents and absolute on children',
      'Create sticky navigation headers with position: sticky'
    ],
    content_md: `## The 5 Positioning Models

1. **\`static\`**: Default normal document flow.
2. **\`relative\`**: Positioned relative to its normal position. Can use \`top\`, \`left\`, etc.
3. **\`absolute\`**: Positioned relative to the **nearest positioned ancestor** (anything other than static).
4. **\`fixed\`**: Stays locked in place relative to the browser viewport even when scrolling.
5. **\`sticky\`**: Toggles between relative and fixed based on scroll position!

\`\`\`css
/* Parent container */
.card {
  position: relative;
}

/* Child badge pinned to top-right corner */
.card-badge {
  position: absolute;
  top: 10px;
  right: 10px;
}
\`\`\``,
    key_points_md: `- An absolute element searches up the DOM tree for a non-static parent.
- \`position: sticky; top: 0\` creates modern sticky navigation bars.`,
    common_mistakes_md: `- Using \`position: absolute\` without setting \`position: relative\` on the parent, causing the element to pin to the entire screen body instead.`,
    starter_code: `.card {
  position: relative;
  background: #1e293b;
  padding: 24px;
  border-radius: 8px;
  color: white;
}

.pin-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: #ff7020;
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
}`,
    solution_code: `.card {
  position: relative;
  background: #1e293b;
  padding: 24px;
  border-radius: 8px;
  color: white;
}

.pin-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: #ff7020;
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
}`,
    execution_mode: 'css_preview',
    language: 'css',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444211',
    module_id: '33333333-3333-3333-3333-333333333204',
    course_id: CSS_COURSE_ID,
    slug: 'css-flexbox-layout',
    title: 'CSS Flexbox Layout: Direction, Justify & Align',
    sort_order: 3,
    status: 'published',
    estimated_minutes: 25,
    objectives: [
      'Master the Flexible Box model (1D layouts)',
      'Align items along the main axis with justify-content',
      'Align items along the cross axis with align-items and gap'
    ],
    content_md: `## What is Flexbox?

Flexbox is a 1-dimensional layout method for arranging items in rows OR columns.

\`\`\`css
.flex-container {
  display: flex;
  justify-content: space-between; /* Main axis alignment */
  align-items: center;            /* Cross axis alignment */
  gap: 16px;                      /* Clean spacing between items */
}
\`\`\`

## Key Container Properties
- **\`flex-direction\`**: \`row\` (horizontal) or \`column\` (vertical).
- **\`justify-content\`**: \`flex-start\`, \`center\`, \`flex-end\`, \`space-between\`, \`space-around\`.
- **\`align-items\`**: \`stretch\`, \`center\`, \`flex-start\`, \`flex-end\`.
- **\`gap\`**: Clean gutters between items without messy margins!`,
    key_points_md: `- Flexbox is 1-dimensional (row or column).
- Use \`gap\` to create space between items cleanly.
- Perfect for navbars, card rows, and centering content vertically and horizontally.`,
    common_mistakes_md: `- Applying \`justify-content\` to child items instead of the flex parent container.`,
    starter_code: `.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #0f172a;
  padding: 16px 24px;
  color: white;
}

.nav-links {
  display: flex;
  gap: 16px;
}`,
    solution_code: `.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #0f172a;
  padding: 16px 24px;
  color: white;
}

.nav-links {
  display: flex;
  gap: 16px;
}`,
    execution_mode: 'css_preview',
    language: 'css',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444212',
    module_id: '33333333-3333-3333-3333-333333333204',
    course_id: CSS_COURSE_ID,
    slug: 'css-grid-layout',
    title: 'CSS Grid: Tracks, Columns & Gap',
    sort_order: 4,
    status: 'published',
    estimated_minutes: 25,
    objectives: [
      'Master the 2-dimensional CSS Grid system (rows AND columns simultaneously)',
      'Use the fractional unit (1fr) and repeat() function',
      'Build auto-responsive card grids with auto-fit and minmax()'
    ],
    content_md: `## What is CSS Grid?

CSS Grid is the most powerful 2-dimensional layout system in CSS, handling both rows and columns simultaneously.

\`\`\`css
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
\`\`\`

## The Holy Grail Auto-Responsive Grid
You can create a fully responsive card grid with ZERO media queries:
\`\`\`css
.auto-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
}
\`\`\``,
    key_points_md: `- Flexbox is 1D; CSS Grid is 2D.
- \`1fr\` represents 1 fraction of available space.
- \`repeat(auto-fit, minmax(250px, 1fr))\` handles mobile and desktop responsiveness automatically.`,
    common_mistakes_md: `- Using floats or inline-block hacks when CSS Grid solves multi-column grids in 3 lines of code.`,
    starter_code: `.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.card {
  background: #1e293b;
  color: white;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #334155;
}`,
    solution_code: `.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.card {
  background: #1e293b;
  color: white;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #334155;
}`,
    execution_mode: 'css_preview',
    language: 'css',
    editor_enabled: true
  },

  // Module 5: Responsive Design & Transitions
  {
    id: '44444444-4444-4444-4444-444444444213',
    module_id: '33333333-3333-3333-3333-333333333205',
    course_id: CSS_COURSE_ID,
    slug: 'css-media-queries-responsive',
    title: 'Media Queries & Breakpoints',
    sort_order: 1,
    status: 'published',
    estimated_minutes: 20,
    objectives: [
      'Write @media queries for mobile, tablet, and desktop viewports',
      'Apply mobile-first design principles using min-width',
      'Test layouts across diverse device dimensions'
    ],
    content_md: `## What are Media Queries?

Media queries allow you to apply CSS styles only when certain screen condition criteria are met:

\`\`\`css
/* Mobile styles (Default) */
.sidebar {
  display: none;
}

/* Tablet & Desktop styles (min-width: 768px) */
@media (min-width: 768px) {
  .sidebar {
    display: block;
  }
}
\`\`\`

## Standard Breakpoints
- **Mobile**: \`< 640px\`
- **Tablet**: \`640px - 1024px\`
- **Desktop**: \`> 1024px\``,
    key_points_md: `- Design mobile-first using \`@media (min-width: ...)\`.
- Test designs at varied viewport widths.`,
    common_mistakes_md: `- Creating dozens of arbitrary breakpoints instead of standard responsive ranges.`,
    starter_code: `.hero {
  padding: 16px;
  font-size: 16px;
}

@media (min-width: 768px) {
  .hero {
    padding: 40px;
    font-size: 24px;
  }
}`,
    solution_code: `.hero {
  padding: 16px;
  font-size: 16px;
}

@media (min-width: 768px) {
  .hero {
    padding: 40px;
    font-size: 24px;
  }
}`,
    execution_mode: 'css_preview',
    language: 'css',
    editor_enabled: true
  },

  {
    id: '44444444-4444-4444-4444-444444444214',
    module_id: '33333333-3333-3333-3333-333333333205',
    course_id: CSS_COURSE_ID,
    slug: 'css-transitions-animations',
    title: 'CSS Transitions & Hover Animations',
    sort_order: 2,
    status: 'published',
    estimated_minutes: 20,
    objectives: [
      'Create smooth state transitions with the transition property',
      'Animate transform: translateY and scale for premium button interactions',
      'Define keyframe animations with @keyframes'
    ],
    content_md: `## CSS Transitions

Transitions let you smoothly change property values over a given duration:

\`\`\`css
.btn {
  background-color: #334155;
  transition: background-color 0.25s ease, transform 0.25s ease;
}

.btn:hover {
  background-color: #ff7020;
  transform: translateY(-2px);
}
\`\`\`

Properties to transition: \`opacity\`, \`transform\`, \`background-color\`. Avoid transitioning \`width\` and \`height\` for performance (60fps GPU acceleration).`,
    key_points_md: `- Always declare \`transition\` on the base state, NOT on the \`:hover\` state.
- Use \`transform\` for hardware-accelerated animations.`,
    common_mistakes_md: `- Transitioning \`all\` indiscriminately, which hurts rendering performance.`,
    starter_code: `.card {
  background: #1e293b;
  padding: 24px;
  border-radius: 8px;
  color: white;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px -6px rgba(0,0,0,0.4);
}`,
    solution_code: `.card {
  background: #1e293b;
  padding: 24px;
  border-radius: 8px;
  color: white;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px -6px rgba(0,0,0,0.4);
}`,
    execution_mode: 'css_preview',
    language: 'css',
    editor_enabled: true
  }
];
