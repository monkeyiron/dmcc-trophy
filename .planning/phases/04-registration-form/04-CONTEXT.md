# Phase 4: Registration Form (Multi-Step) - Context

**Gathered:** 2026-03-27
**Status:** Ready for planning
**Source:** PRD Express Path

<domain>
## Phase Boundary
Complete 4-step registration form with Zod validation and dynamic field arrays.
</domain>

<decisions>
## Implementation Decisions

### Step 1: Team Meta
- Form fields: Team Name, Manager, Coach, Captain, Contact
- All fields required.

### Step 2: Main Squad
- Dynamic array for exactly 7 players (Name + Jersey No).
- Enforced length of 7 via Zod.

### Step 3: Substitutes
- Dynamic array for up to 5 substitutes.
- Add/remove controls.

### Step 4: Agreements
- ₹500 fee agreement checkbox.
- Rules/Terms checkbox acknowledging Robertson Oinam as Chief Referee.

### the agent's Discretion
- Form state managed with react-hook-form using `onTouched` validation mode.
- Fake submission latency added for Phase 4. (Supabase hooked in Phase 5).
</decisions>
