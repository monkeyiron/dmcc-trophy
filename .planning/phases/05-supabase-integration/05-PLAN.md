---
wave: 1
depends_on: []
files_modified:
  - "src/lib/supabase.ts"
  - "src/pages/Register.tsx"
autonomous: true
---

# Phase 5 Plan: Supabase Integration

<objective>
Configure Supabase Edge functions/database, implement RLS policies, and wire the Registration multi-step form to persist data.
</objective>

<tasks>

<task>
  <id>database-schema</id>
  <description>Create Supabase tables and RLS.</description>
  <read_first>
    - .env.local
  </read_first>
  <action>
    Apply SQL migration creating `teams` and `players` tables with uuid primary keys. Enable RLS and add anon insert policies. Setup environment variables.
  </action>
  <acceptance_criteria>
    - Tables `teams` and `players` exist.
    - Anon inserts are permitted via RLS.
    - Local `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` configured.
  </acceptance_criteria>
</task>

<task>
  <id>frontend-wiring</id>
  <description>Integrate Supabase client in frontend form.</description>
  <read_first>
    - src/pages/Register.tsx
  </read_first>
  <action>
    Create `src/lib/supabase.ts` with standard client initialized. In `Register.tsx`, replace the fake timeout submit with a dual-insert logic: Insert team metadata first, grab the returned ID, then map and insert all players/substitutes using that `team_id`.
  </action>
  <acceptance_criteria>
    - Submission triggers `supabase.from('teams').insert()`.
    - Submission triggers `supabase.from('players').insert()` with correct foreign keys.
    - Success state properly displays upon successful insertion.
  </acceptance_criteria>
</task>

</tasks>

<must_haves>
- Data is cleanly mapped from React Hook Form to Supabase.
- Foreign keys properly map players to their newly created team row.
</must_haves>
