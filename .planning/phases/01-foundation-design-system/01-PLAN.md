---
wave: 1
depends_on: []
files_modified:
  - "package.json"
  - "src/index.css"
  - "index.html"
autonomous: true
---

# Phase 1 Plan: Foundation & Design System

<objective>
Install core application dependencies, implement the strict 0px border-radius design system override, and establish the custom warm orange/yellow accent aesthetic required for the DMCC Trophy app.
</objective>

<tasks>

<task>
  <id>install-deps</id>
  <description>Install routing, form, and backend integration packages.</description>
  <read_first>
    - package.json
  </read_first>
  <action>
    Run `npm install react-router-dom react-hook-form @hookform/resolvers zod @supabase/supabase-js`
  </action>
  <acceptance_criteria>
    - `package.json` contains `react-router-dom`, `react-hook-form`, `@hookform/resolvers`, `zod`, and `@supabase/supabase-js` in dependencies.
  </acceptance_criteria>
</task>

<task>
  <id>css-overrides</id>
  <description>Implement brutalist design constraints and accent colors.</description>
  <read_first>
    - src/index.css
  </read_first>
  <action>
    Edit `src/index.css` to:
    1. Set `--radius: 0px;` and `--radius-md: 0px;` and `--radius-lg: 0px;` and `--radius-sm: 0px;` in both `:root` and `.dark` scopes.
    2. Define primary accent colors (warm orange/yellow) replacing the default Shadcn primary colors. Set `--primary: 32 95% 50%;` (hsl(32, 95%, 50%)) and corresponding foreground.
    3. Add Tailwind v4 typography font families `@theme { --font-sans: 'Inter', sans-serif; --font-heading: 'Noto Sans', sans-serif; }`.
    4. Ensure dark mode `--primary` matches or complements.
  </action>
  <acceptance_criteria>
    - `src/index.css` contains `--radius: 0px` globally.
    - `src/index.css` contains warm orange/yellow primary colors.
    - `src/index.css` sets Inter as `--font-sans` and Noto Sans as `--font-heading`.
  </acceptance_criteria>
</task>

<task>
  <id>html-fonts</id>
  <description>Add Inter and Noto Sans fonts.</description>
  <read_first>
    - index.html
  </read_first>
  <action>
    Edit `index.html` to add Google Fonts links for Inter and Noto Sans in the `<head>`.
    `<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans:wght@700;800;900&display=swap" rel="stylesheet">`
  </action>
  <acceptance_criteria>
    - `index.html` contains Google font links for Inter and Noto Sans.
  </acceptance_criteria>
</task>

</tasks>

<must_haves>
- 0px border radius is strictly enforced across the theme.
- The base dependencies for later phases are successfully installed.
- Primary accent color reflects DMCC warm orange.
</must_haves>
