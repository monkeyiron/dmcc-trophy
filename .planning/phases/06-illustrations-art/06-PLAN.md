---
wave: 1
depends_on: []
files_modified:
  - "src/pages/Home.tsx"
  - "src/components/events/EventGrid.tsx"
  - "src/pages/Support.tsx"
  - "src/pages/Register.tsx"
autonomous: true
---

# Phase 6 Plan: Illustrations & Art Direction

<objective>
Generate 4 key illustrations according to the PRD art direction and integrate them gracefully into the brutalist UI.
</objective>

<tasks>

<task>
  <id>generate-art</id>
  <description>Generate and save illustrations.</description>
  <read_first>
    - .planning/ROADMAP.md
  </read_first>
  <action>
    Use `generate_image` to create Hero (football dawn), Events (tug of war), Support (passing torch), and Register (captain clipboard). Move from Agent outputs to `public/illustrations/`.
  </action>
  <acceptance_criteria>
    - 4 PNG images exist in `public/illustrations/`.
  </acceptance_criteria>
</task>

<task>
  <id>integrate-art</id>
  <description>Implement imagery into React components.</description>
  <read_first>
    - src/pages/Home.tsx
  </read_first>
  <action>
    Update Home Hero section, EventGrid bento box, Support page header, and Register page header to include `<img>` tags pointing to the generated assets. Apply brutalist CSS filters and hover states (`mix-blend`, `object-cover`, borders).
  </action>
  <acceptance_criteria>
    - Images successfully render in both light and dark modes.
    - Hover states (scale) interact cleanly within `overflow-hidden` containers.
  </acceptance_criteria>
</task>

</tasks>

<must_haves>
- Studio Ghibli aesthetic matched.
- UI doesn't break overflow boundaries.
</must_haves>
