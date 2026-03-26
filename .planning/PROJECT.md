# DMCC 3rd Meira Chukhattpa Annual Sports Meet

## What This Is

A high-performance, visually avant-garde web application for the DMCC 3rd Meira Chukhattpa Annual Sports Meet — specifically managing event details, dignitary information, and team registrations for the Thajamanbi Trophy 7-A Side Football Tournament. The aesthetic merges 2026 strict Japanese minimalism (sharp geometry, macro-typography, brutalist grids) with warm Studio Ghibli-inspired mixed-media illustrations.

## Core Value

Visitors can browse event details and register their 7-a-side football team through a seamless multi-step form backed by Supabase — this flow must work flawlessly.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Hero section with Ghibli illustration, macro-typography, and dual CTAs
- [ ] Event highlights in bento-box grid (Thabal Chongba, Tug of War, Spoon Race, Blind Hit, Track Races)
- [ ] Dignitary cards (Chief Guest, President, 4 Guests of Honour)
- [ ] Multi-step football registration form (Team Meta → Starting 7 → Substitutes → Payment/Declaration)
- [ ] Supabase teams + players tables with public insert, admin-only reads
- [ ] ₹500 fee agreement, Robertson Oinam sponsorship acknowledgment, rules checkbox
- [ ] Brutalist design system — 0px border-radius on ALL components, 1px borders, monochrome + accent
- [ ] Studio Ghibli mixed-media illustrations (4 prompts: Hero, Events, Support, Registration)
- [ ] Support/donation section with community illustration
- [ ] Responsive mobile layout
- [ ] Dark mode support via theme provider

### Out of Scope

- Admin dashboard — not needed for v1, registrations viewable via Supabase dashboard
- User authentication — public registration only, no login flow
- Payment gateway integration — ₹500 fee is agreed to, not paid online
- Real-time match fixtures/results — event management only
- Email notifications — not required for initial launch

## Context

- **Event:** DMCC 3rd Meira Chukhattpa Annual Sports Meet
- **Tournament:** Thajamanbi Trophy 7-A Side Football Tournament
- **Registration fee:** ₹500 per team (agreement only, not online payment)
- **Sponsor:** Robertson Oinam (acknowledged in registration)
- **Target audience:** Local Manipuri community sports teams
- **Supabase project:** `oolkvremfjjcuiikykms` (https://oolkvremfjjcuiikykms.supabase.co)
- **Existing code:** Fresh Vite + React 19 + Tailwind v4 + Shadcn scaffold. Inter + Noto Sans fonts imported. Theme provider present. No application code.

## Constraints

- **Tech Stack**: React 19, Vite, Tailwind v4, Shadcn/Radix, Supabase — locked by PRD
- **Design**: Absolute 0px border-radius everywhere. Monochrome + single accent. 1px borders.
- **Typography**: Inter (UI/Data), Noto Sans (Headers/Editorial)
- **Illustrations**: Must be Studio Ghibli mixed-media style, Asian subjects, community-grounded

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Supabase for backend | PRD specification, already provisioned | — Pending |
| No online payments | ₹500 fee is agreement-based, not collected online | — Pending |
| Public registration, no auth | Minimize friction for community sports teams | — Pending |
| Shadcn Radix-Lyra style | Already configured in components.json | — Pending |
| YOLO mode, standard granularity | Balance speed and quality for this focused project | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-03-27 after initialization*
