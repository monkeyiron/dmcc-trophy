# Phase 1: Foundation & Design System - Context

**Gathered:** 2026-03-27
**Status:** Ready for planning
**Source:** PRD Express Path

<domain>
## Phase Boundary
Override Shadcn defaults to brutalist design, install missing dependencies, configure accent palette.
</domain>

<decisions>
## Implementation Decisions

### Design System
- Override `--radius: 0px` globally in `index.css`
- Add DMCC accent color tokens (warm orange/yellow) to CSS variables
- Configure Noto Sans as heading font in Tailwind theme
- Add brutalist border utilities

### Dependencies
- Install react-router-dom, react-hook-form, @hookform/resolvers, zod, @supabase/supabase-js

### the agent's Discretion
- Specific shade of warm orange/yellow to use for the DMCC accent
</decisions>
