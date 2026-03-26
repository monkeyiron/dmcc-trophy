# PRD: DMCC 3rd Meira Chukhattpa Annual Sports Meet

## 1. Product Overview
A high-performance, visually avant-garde web application for managing event details and team registrations for the Thajamanbi Trophy 7-A Side Football Tournament. The aesthetic merges 2026 strict Japanese minimalism (sharp geometry, macro-typography, brutalist grids) with warm, organic Studio Ghibli-inspired mixed-media illustrations.

## 2. Technical Stack & Architecture
* **Frontend Framework:** React 19, DOM 19, Vite.
* **Styling:** Tailwind CSS v4, `tw-animate-css` for micro-interactions.
* **Component Library:** Shadcn UI + Radix UI primitives. **Strict UI Override:** All components (buttons, inputs, cards, dialogs) must have `rounded-none` / `border-radius: 0px`.
* **Typography:** Primary: *Inter* (UI/Data), Secondary: *Noto Sans* (Editorial/Headers).
* **Backend/BaaS:** Supabase (PostgreSQL, Edge Functions, Auth).

## 3. Design System & UX Principles
* **Geometry:** Absolute sharp edges. Straight lines only. 1px solid borders (`border-border`) defining spatial zones.
* **Whitespace:** Aggressive use of negative space. Content acts as structural pillars.
* **Color Palette:** Monochrome foundation (Crisp White, Deep Ink/Charcoal) with a single vibrant accent (e.g., DMCC Yellow/Orange) reserved strictly for primary interactive elements and key typography.
* **Layout:** Strict CSS Grid. Asymmetrical balance.

## 4. Core Modules & Specifications

### 4.1. The Hero Section
* **Visual:** Full-bleed or strictly framed hero illustration.
* **Typography:** Macro-typography overlay. "3RD MEIRA CHUKATTPA".
* **CTAs:** Two sharp-edged rectangular buttons: "Register Team" (Solid Accent) and "Support Event" (Outline/Ghost).

### 4.2. Event Highlights & Dignitaries
* **Grid:** Masonry or bento-box grid (with straight lines and borders).
* **Content:** Thabal Chongba, Tug of War, Spoon Race, Blind Hit, Track Races.
* **Dignitaries:** Minimalist profile cards. High-contrast monochromatic portraits or stylized avatars. 
    * Chief Guest: Smt. KH. Tombi Devi
    * President: Prof. Dr. Nongmaithem Manichandra
    * Guests of Honour: Dr. Naorem Bobo, Dr. Seram Rojeshkumar, Hijam Rajen, Hijam Tilotama.

### 4.3. Football Tournament Registration Flow (Supabase Integrated)
* **Multi-step Form Architecture (Shadcn Forms + Zod):**
    * **Step 1:** Team Meta (Team Name, Manager, Coach, Captain, Contact).
    * **Step 2:** Starting Squad (Dynamic field array for exactly 7 players: Name + Jersey No).
    * **Step 3:** Substitutes (Dynamic field array for up to 5 players).
    * **Step 4:** Payment & Declaration (₹500 Fee agreement, Robertson Oinam sponsorship acknowledgment, Checkbox for rules).

## 5. Art Direction & Illustration Prompts
**Style Definition:** 2026 trending aesthetic, Studio Ghibli mixed media animation style, watercolor bases with sharp pencil sketching and torn paper textures. Warm, nostalgic lighting. **Crucial:** All subjects must be of Asian descent, highly expressive, and grounded in a sense of community.

* **Prompt 1 (Hero Section - The Spirit of the Game):**
    > *Studio Ghibli mixed media animation style, a wide shot of a lush, vibrant green football pitch at dawn. A group of young, determined Asian football players in warm-up gear are lacing up their boots and stretching. The sky is a breathtaking watercolor wash of soft peach and dawn blue. Textures of torn paper and sharp, expressive pencil lines overlay the painted background. Nostalgic, energetic, highly detailed, crisp, cinematic lighting, 8k resolution, award-winning illustration.*

* **Prompt 2 (Event Highlights - Traditional Games):**
    > *Studio Ghibli mixed media animation style. A joyful, chaotic scene of an Asian community playing Tug of War. Children and elders pulling a thick rope, laughing and straining. The background suggests an open field with subtle, minimalistic line-art trees. Rich gouache and watercolor textures mixed with fine ink crosshatching. Warm afternoon sunlight, emotional resonance, highly polished, no digital smoothness—must look like tactile, traditional media.*

* **Prompt 3 (Support/Donation Section - Community Pillar):**
    > *Studio Ghibli style, mixed media illustration. A close-up of two Asian hands—one older, one younger—passing a beautifully decorated baton or torch. Soft, glowing light illuminating the hands. The background is a minimalist wash of warm yellow and ink blue. Fine pencil details on the hands, rough watercolor textures on the edges. Conveys passing the torch, empowering youth, and community support.*

* **Prompt 4 (Registration Section - The Tactician):**
    > *Studio Ghibli mixed media animation style. A young Asian football team captain sitting on a wooden bench, intensely focused on a tactical clipboard, writing down a team lineup with a pencil. A football rests under his foot. Soft, dramatic lighting highlighting his concentrated expression. Textural mix of watercolor washes and sharp, sketchy graphite lines. Clean, polished, nostalgic.*

## 6. Supabase Configuration
* **Project URL:** https://oolkvremfjjcuiikykms.supabase.co
* **Database Tables:**
    * `teams` — team metadata (name, manager, coach, captain, contact, payment_agreed, rules_accepted)
    * `players` — player roster (team_id FK, player_name, jersey_number, is_substitute)
* **RLS Policies:** Public insert for registration, admin-only read/update/delete.
