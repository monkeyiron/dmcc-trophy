# Roadmap: DMCC 3rd Meira Chukhattpa Sports Meet

**Created:** 2026-03-27
**Granularity:** Standard (5–8 phases, 3–5 plans each)
**Parallelization:** Enabled

## Phase Overview

| Phase | Name | Dependencies | Status |
|-------|------|-------------|--------|
| 1 | Foundation & Design System | — | Not Started |
| 2 | Layout, Routing & Hero Section | Phase 1 | Not Started |
| 3 | Event Highlights, Dignitaries & Support | Phase 2 | Not Started |
| 4 | Registration Form (Multi-Step) | Phase 2 | Not Started |
| 5 | Supabase Integration | Phase 4 | Not Started |
| 6 | Illustrations & Art Direction | Phase 2 | Not Started |
| 7 | Polish, Responsive & Accessibility | Phase 3, 4, 5 | Not Started |

---

## Phase 1: Foundation & Design System

**Goal:** Override Shadcn defaults to brutalist design, install missing dependencies, configure accent palette.

**Requirements:** DSGN-01 through DSGN-07

**Scope:**
- Override `--radius: 0px` globally in `index.css`
- Add DMCC accent color tokens (warm orange/yellow) to CSS variables
- Install react-router-dom, react-hook-form, @hookform/resolvers, zod, @supabase/supabase-js
- Configure Noto Sans as heading font in Tailwind theme
- Add brutalist border utilities
- Verify dark mode with new tokens

**Exit Criteria:**
- All components render with 0px border-radius
- Accent color visible on interactive elements
- All deps installed and importable
- Dark mode functional

---

## Phase 2: Layout, Routing & Hero Section

**Goal:** App shell with routes, navigation, and the full hero section with macro-typography and CTAs.

**Requirements:** HERO-01 through HERO-04

**Scope:**
- React Router setup: `/` (landing), `/register` (form), `/support` (donation)
- App shell with minimal nav (event name + navigation links)
- Hero section: full-bleed illustration container, macro-typography "3RD MEIRA CHUKATTPA"
- Two CTA buttons: "Register Team" (solid accent), "Support Event" (outline)
- Placeholder for illustration (generated in Phase 6)
- Footer with event details

**Exit Criteria:**
- Routes navigate correctly
- Hero section is visually striking with macro-typography
- CTAs render with brutalist styling
- Mobile responsive

---

## Phase 3: Event Highlights, Dignitaries & Support

**Goal:** Bento-box grid of event cards, dignitary profile cards, and support section.

**Requirements:** EVNT-01 through EVNT-06, SUPP-01, SUPP-02

**Scope:**
- Bento-box grid component with 1px borders
- Event cards for: Thabal Chongba, Tug of War, Spoon Race, Blind Hit, Track Races
- Dignitary profile cards (monochromatic, minimalist)
- Chief Guest, President, 4 Guests of Honour data
- Support/donation section with copy and illustration placeholder
- All cards sharp-edged, brutalist

**Exit Criteria:**
- Grid renders asymmetrically with proper 1px borders
- All 5 events displayed
- All 6 dignitaries displayed
- Support section rendered
- Responsive on mobile

---

## Phase 4: Registration Form (Multi-Step)

**Goal:** Complete 4-step registration form with Zod validation and dynamic field arrays.

**Requirements:** RGST-01 through RGST-08

**Scope:**
- Step indicator/progress component
- Step 1: Team Meta form fields (Team Name, Manager, Coach, Captain, Contact)
- Step 2: Dynamic array for exactly 7 players (Name + Jersey No) with add/remove
- Step 3: Dynamic array for up to 5 substitutes
- Step 4: ₹500 fee agreement checkbox, Robertson Oinam acknowledgment, rules checkbox
- Zod schemas per step
- Form state management with react-hook-form
- Stub submit handler (Supabase in Phase 5)

**Exit Criteria:**
- All 4 steps navigable
- Validation errors display correctly
- Dynamic player arrays work (add/remove players)
- Cannot submit without required fields and checkboxes
- Brutalist form styling (sharp edges, 1px borders)

---

## Phase 5: Supabase Integration

**Goal:** Create database tables, RLS policies, and wire the registration form to Supabase.

**Requirements:** DATA-01 through DATA-03, RGST-08

**Scope:**
- Create `teams` table with columns: id, team_name, manager_name, coach_name, captain_name, contact_phone, payment_agreed, rules_accepted, created_at
- Create `players` table with columns: id, team_id (FK), player_name, jersey_number, is_substitute, created_at
- RLS policies: anon can INSERT teams + players, admin-only SELECT/UPDATE/DELETE
- Supabase client setup in React (env variables)
- Wire form submit to Supabase insert (teams → players)
- Success/error/loading states
- Registration confirmation screen

**Exit Criteria:**
- Tables created with proper schema
- RLS policies enforce access control
- Form submission creates team + players in database
- Success confirmation displayed
- Error states handled gracefully

---

## Phase 6: Illustrations & Art Direction

**Goal:** Generate all 4 Studio Ghibli-style illustrations and integrate into sections.

**Requirements:** ILUS-01 through ILUS-04

**Scope:**
- Generate Hero illustration (football pitch at dawn, players preparing)
- Generate Event Highlights illustration (community Tug of War)
- Generate Support section illustration (passing the torch)
- Generate Registration section illustration (captain with clipboard)
- Save to `public/illustrations/`
- Integrate into respective components
- Ensure illustrations work in both light and dark modes

**Exit Criteria:**
- 4 illustrations generated in Ghibli mixed-media style
- All illustrations integrated into their sections
- Images optimized for web (appropriate dimensions/format)
- Visual cohesion across all illustrations

---

## Phase 7: Polish, Responsive & Accessibility

**Goal:** Final polish — responsive edge cases, accessibility, animations, SEO, performance.

**Requirements:** DSGN-06, DSGN-07 (refinement)

**Scope:**
- Mobile responsive audit and fixes
- tw-animate-css micro-interactions on hover, focus, page transitions
- Accessibility: ARIA labels, keyboard navigation, focus management in multi-step form
- SEO: page titles, meta descriptions, Open Graph tags
- Performance: lazy loading illustrations, code splitting routes
- Cross-browser testing fixes
- Final visual QA

**Exit Criteria:**
- Fully responsive on mobile, tablet, desktop
- Lighthouse accessibility score ≥ 90
- All interactive elements keyboard accessible
- SEO metadata present on all pages
- Page load under 3 seconds
- No visual regressions

---

*Roadmap created: 2026-03-27*
*Total phases: 7 | Total v1 requirements covered: 33*
