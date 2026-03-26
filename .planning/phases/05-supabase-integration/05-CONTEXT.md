# Phase 5: Supabase Integration - Context

**Gathered:** 2026-03-27
**Status:** Ready for planning
**Source:** PRD Express Path

<domain>
## Phase Boundary
Database schema creation, RLS configuration, and connecting the frontend Registration form to Supabase.
</domain>

<decisions>
## Implementation Decisions

### Database Schema
- `teams`: stores team metadata and boolean agreements.
- `players`: linked to `teams.id` via Foreign Key (`ON DELETE CASCADE`). Stores both regular players and substitutes (distinguished by `is_substitute` boolean).

### Security
- Row Level Security (RLS) enabled on both tables.
- Insert policies created allowing `anon` role to insert rows (since registration is public without login).

### Frontend Client
- `src/lib/supabase.ts` created to initialize client with Edge credentials.
- `Register.tsx` `onSubmit` modified to perform two-step insertion: Team row first, then bulk insert of all Players associated with the returned `team_id`.
</decisions>
