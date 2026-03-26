# Phase 6: Illustrations & Art Direction - Context

**Gathered:** 2026-03-27
**Status:** Ready for planning
**Source:** PRD Express Path

<domain>
## Phase Boundary
Generate and integrate four Studio Ghibli-inspired mixed-media illustrations into the application UI.
</domain>

<decisions>
## Implementation Decisions

### Art Direction
- Style: Studio Ghibli mixed-media, highly detailed, serene, no text, warm lighting.
- Images generated using Agent Image Generation tool.

### Assets Generated
- `hero.png`: Dawn football pitch setup.
- `events.png`: Traditional community tug of war.
- `support.png`: Passing the glowing torch.
- `register.png`: Team captain with clipboard.

### Integration
- **Hero**: Implemented as full-bleed background inside `Home.tsx` with a dark luminance blend mode.
- **Events**: Placed in the bento grid's empty filler spot in `EventGrid.tsx` with a hover zoom effect.
- **Support**: Placed above the contact copy in `Support.tsx` with a subtle hover zoom.
- **Register**: Placed above the multi-step form progress bar in `Register.tsx`.
</decisions>
