# Requirements: DMCC 3rd Meira Chukhattpa Sports Meet

**Defined:** 2026-03-27
**Core Value:** Seamless team registration flow backed by Supabase

## v1 Requirements

### Design System

- [ ] **DSGN-01**: All components use 0px border-radius (rounded-none)
- [ ] **DSGN-02**: Color palette: monochrome base + single DMCC accent (warm orange/yellow)
- [ ] **DSGN-03**: Typography: Inter for UI, Noto Sans for headers/editorial
- [ ] **DSGN-04**: 1px solid borders defining spatial zones
- [ ] **DSGN-05**: CSS Grid layout with asymmetrical balance
- [ ] **DSGN-06**: Dark mode support via theme provider
- [ ] **DSGN-07**: Responsive mobile-first layout

### Hero Section

- [ ] **HERO-01**: Full-bleed Studio Ghibli illustration
- [ ] **HERO-02**: Macro-typography overlay: "3RD MEIRA CHUKATTPA"
- [ ] **HERO-03**: "Register Team" CTA (solid accent)
- [ ] **HERO-04**: "Support Event" CTA (outline/ghost style)

### Event Highlights

- [ ] **EVNT-01**: Bento-box grid layout for event cards
- [ ] **EVNT-02**: Event cards for: Thabal Chongba, Tug of War, Spoon Race, Blind Hit, Track Races
- [ ] **EVNT-03**: Dignitary profile cards with minimalist design
- [ ] **EVNT-04**: Chief Guest: Smt. KH. Tombi Devi
- [ ] **EVNT-05**: President: Prof. Dr. Nongmaithem Manichandra
- [ ] **EVNT-06**: Guests of Honour: Dr. Naorem Bobo, Dr. Seram Rojeshkumar, Hijam Rajen, Hijam Tilotama

### Registration Form

- [ ] **RGST-01**: Step 1 — Team Meta (Team Name, Manager, Coach, Captain, Contact)
- [ ] **RGST-02**: Step 2 — Starting Squad (dynamic array for exactly 7 players: Name + Jersey No)
- [ ] **RGST-03**: Step 3 — Substitutes (dynamic array for up to 5 players)
- [ ] **RGST-04**: Step 4 — Payment declaration (₹500 fee agreement)
- [ ] **RGST-05**: Robertson Oinam sponsorship acknowledgment checkbox
- [ ] **RGST-06**: Rules acceptance checkbox
- [ ] **RGST-07**: Form validation with Zod schemas
- [ ] **RGST-08**: Submit to Supabase with feedback (loading, success, error states)

### Database

- [ ] **DATA-01**: Supabase `teams` table (name, manager, coach, captain, contact, payment_agreed, rules_accepted)
- [ ] **DATA-02**: Supabase `players` table (team_id FK, player_name, jersey_number, is_substitute)
- [ ] **DATA-03**: RLS policies: public insert, admin-only read/update/delete

### Illustrations

- [ ] **ILUS-01**: Hero illustration — football pitch at dawn, players preparing
- [ ] **ILUS-02**: Event highlights — community playing Tug of War
- [ ] **ILUS-03**: Support section — passing the torch between generations
- [ ] **ILUS-04**: Registration section — team captain with tactical clipboard

### Support Section

- [ ] **SUPP-01**: Support/donation information section
- [ ] **SUPP-02**: Community pillar illustration

## v2 Requirements

### Admin

- **ADMN-01**: Admin dashboard for viewing registrations
- **ADMN-02**: Export registrations to CSV
- **ADMN-03**: Admin authentication via Supabase Auth

### Engagement

- **ENGM-01**: Match fixtures and results display
- **ENGM-02**: Photo gallery from event
- **ENGM-03**: Email notifications on registration

## Out of Scope

| Feature | Reason |
|---------|--------|
| Online payment gateway | Fee is agreement-based, not collected online |
| User login/authentication | Public registration only, no user accounts |
| Real-time scores/fixtures | Event management only, not live coverage |
| Mobile native app | Web-first approach, responsive design sufficient |
| Multi-language support | Single language sufficient for target audience |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| DSGN-01–07 | Phase 1 | Pending |
| HERO-01–04 | Phase 2 | Pending |
| EVNT-01–06 | Phase 3 | Pending |
| ILUS-01–04 | Phase 2–4 | Pending |
| RGST-01–08 | Phase 4 | Pending |
| DATA-01–03 | Phase 5 | Pending |
| SUPP-01–02 | Phase 3 | Pending |

**Coverage:**
- v1 requirements: 33 total
- Mapped to phases: 33
- Unmapped: 0 ✓

---
*Requirements defined: 2026-03-27*
*Last updated: 2026-03-27 after initial definition*
