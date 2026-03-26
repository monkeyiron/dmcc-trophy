---
wave: 1
depends_on: []
files_modified:
  - "src/App.tsx"
  - "src/components/layout/AppShell.tsx"
  - "src/components/layout/Navbar.tsx"
  - "src/components/layout/Footer.tsx"
  - "src/pages/Home.tsx"
  - "src/pages/Register.tsx"
  - "src/pages/Support.tsx"
autonomous: true
---

# Phase 2 Plan: Layout, Routing & Hero Section

<objective>
Build the React Router skeleton, common application shell (Navbar/Footer), and the brutalist landing page hero section.
</objective>

<tasks>

<task>
  <id>app-shell</id>
  <description>Create standard routing layout.</description>
  <read_first>
    - src/App.tsx
  </read_first>
  <action>
    Create `Navbar.tsx`, `Footer.tsx` and `AppShell.tsx`. Set up React Router in `App.tsx` with `/`, `/register`, and `/support` routes.
  </action>
  <acceptance_criteria>
    - `src/App.tsx` contains `<BrowserRouter>` and three defined `<Route>` components.
    - `Navbar` contains links for "Register Team" and "Support".
  </acceptance_criteria>
</task>

<task>
  <id>hero-section</id>
  <description>Implement brutalist visual hero.</description>
  <read_first>
    - src/pages/Home.tsx
  </read_first>
  <action>
    Create `Home.tsx` featuring the "3rd Meira Chukhattpa" macro typography and CTA buttons.
  </action>
  <acceptance_criteria>
    - `src/pages/Home.tsx` contains CTAs linked to `/register` and `/support`.
    - Macro typography classes are applied.
  </acceptance_criteria>
</task>

</tasks>

<must_haves>
- Navigation links work between the three primary routes.
- The hero section conveys the scale and excitement of the event using brutalist typography.
</must_haves>
