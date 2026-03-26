---
wave: 1
depends_on: []
files_modified:
  - "src/pages/Register.tsx"
autonomous: true
---

# Phase 4 Plan: Registration Form

<objective>
Implement the multi-step team registration form with Zod schema validation and brutalist UI.
</objective>

<tasks>

<task>
  <id>multi-step-form</id>
  <description>Create 4-step registration form.</description>
  <read_first>
    - src/pages/Register.tsx
  </read_first>
  <action>
    Construct `Register.tsx` using `react-hook-form` and `@hookform/resolvers/zod`. Define `STEPS` array and manage step state. Implement field arrays for players and substitutes.
  </action>
  <acceptance_criteria>
    - `Register.tsx` handles 4 distinct form steps.
    - Zod validation prevents advancing to next step if required fields are missing.
    - Step 2 requires exactly 7 players.
    - Step 3 allows up to 5 substitutes with Add/Remove buttons.
  </acceptance_criteria>
</task>

</tasks>

<must_haves>
- Form strictly requires 7 main players.
- Form strictly prevents bypassing agreements checkbox.
</must_haves>
