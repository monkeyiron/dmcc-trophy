# Phase 2: Layout, Routing & Hero Section - Context

**Gathered:** 2026-03-27
**Status:** Ready for planning
**Source:** PRD Express Path

<domain>
## Phase Boundary
App shell with routes, navigation, and the full hero section with macro-typography and CTAs.
</domain>

<decisions>
## Implementation Decisions

### Routing & Shell
- React Router setup: `/` (landing), `/register` (form), `/support` (donation)
- App shell with minimal nav (event name + navigation links)
- Footer with event details

### Hero Section
- Hero section: full-bleed illustration container, macro-typography "3RD MEIRA CHUKATTPA"
- Two CTA buttons: "Register Team" (solid accent), "Support Event" (outline)
- Placeholder for illustration (generated in Phase 6)

### the agent's Discretion
- Brutalist button styling uses Shadcn's button component (which inherits the 0px radius override).
</decisions>
