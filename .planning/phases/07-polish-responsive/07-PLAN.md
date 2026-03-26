---
wave: 1
depends_on: []
files_modified:
  - "src/components/events/EventGrid.tsx"
  - "src/components/events/DignitariesSection.tsx"
  - "src/components/events/DignitaryCard.tsx"
autonomous: true
---

# Phase 7 Plan: Polish & Responsive

<objective>
Refine final code, clean up linting, ensure solid a11y practices, and verify a successful production pipeline.
</objective>

<tasks>

<task>
  <id>lint-and-build</id>
  <description>Clean codebase and test build.</description>
  <read_first>
    - src/components/events/EventGrid.tsx
  </read_first>
  <action>
    Locate and delete unused dependencies/React imports. Run `npm run build` and capture output. If successful, project is ready for delivery.
  </action>
  <acceptance_criteria>
    - `npm run build` exits with code 0.
    - No TS6133 warnings.
  </acceptance_criteria>
</task>

</tasks>

<must_haves>
- Successful `dist` generation.
</must_haves>
