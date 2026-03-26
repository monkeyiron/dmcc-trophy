---
wave: 1
depends_on: []
files_modified:
  - "src/pages/Home.tsx"
  - "src/pages/Support.tsx"
  - "src/components/events/EventGrid.tsx"
  - "src/components/events/DignitariesSection.tsx"
  - "src/components/events/DignitaryCard.tsx"
autonomous: true
---

# Phase 3 Plan: Event Highlights, Dignitaries & Support

<objective>
Implement the Event bento grid, Dignitaries list, and Support page following the brutalist high-contrast aesthetic.
</objective>

<tasks>

<task>
  <id>event-grid</id>
  <description>Create bento-grid for events.</description>
  <read_first>
    - src/pages/Home.tsx
  </read_first>
  <action>
    Create `EventGrid.tsx` with a grid layout mapping Thabal Chongba (featured), Tug of War, Spoon Race, Blind Hit, and Track Races. Place into `Home.tsx`.
  </action>
  <acceptance_criteria>
    - `EventGrid.tsx` renders 5 events with hard 1px borders.
    - `Home.tsx` includes `<EventGrid />`.
  </acceptance_criteria>
</task>

<task>
  <id>dignitaries</id>
  <description>Create dignitaries section.</description>
  <read_first>
    - src/pages/Home.tsx
  </read_first>
  <action>
    Create `DignitaryCard.tsx` and `DignitariesSection.tsx`. Map the 6 listed VIPs (Chief Guest, President, 4 Guests of Honour). Include in `Home.tsx` below events.
  </action>
  <acceptance_criteria>
    - `DignitariesSection.tsx` mounts 6 `<DignitaryCard />` instances.
    - `Home.tsx` includes `<DignitariesSection />`.
  </acceptance_criteria>
</task>

<task>
  <id>support-page</id>
  <description>Implement standalone support page.</description>
  <read_first>
    - src/pages/Support.tsx
  </read_first>
  <action>
    Update `Support.tsx` to include donation copy, contact CTA, and an empty illustration placeholder block.
  </action>
  <acceptance_criteria>
    - `Support.tsx` has a placeholder marked "Support Illustration Placeholder".
    - `Support.tsx` contains copy detailing how to contribute.
  </acceptance_criteria>
</task>

</tasks>

<must_haves>
- Event grid is fully responsive and adheres to brutalist 1px border aesthetic.
- All 6 dignitaries are displayed with their correct titles/roles.
- Support page clearly communicates how users can contribute.
</must_haves>
