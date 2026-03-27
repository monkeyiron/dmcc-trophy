# Phase 8: Premium Redesign (UI/UX Overhaul) - UI-SPEC

## 1. Aesthetic Direction: "Electric Obsidian"
Moving away from standard flat brutalism to an award-winning "Premium 2026" glassmorphic and kinetic typography aesthetic, suitable for high-end sports tournaments.

## 2. Color Palette
- **Base Background:** `#0B0B0C` to `#121212` (Matte Black / Deep Charcoal)
- **Primary Accent:** `oklch(0.85 0.35 130)` (Neon Lime - reminiscent of modern sports cleats)
- **Secondary Accent:** `oklch(0.55 0.25 260)` (Electric Royal Blue)
- **Glass Surfaces:** `rgba(255, 255, 255, 0.03)` with `backdrop-blur-xl`
- **Text Primary:** `#FFFFFF`
- **Text Muted:** `#A1A1A5`

## 3. Typography
- **Headings:** Inter / Noto Sans, but explicitly using `font-black`, `tracking-tighter`, and `uppercase`.
- **Ghost Text (Outlined):** Utilizing `-webkit-text-stroke` for background depth typography.
- **Body:** Inter `font-medium` with `leading-relaxed`.

## 4. UI Shapes & Components
- **Borders:** Ultra-thin `1px` borders using subtle linear gradients (`border-white/10`).
- **Cards (Bento Grid):** Glassmorphic panels built on `bg-white/5 backdrop-blur-2xl border border-white/10`.
- **Shadows:** Dropping standard drop-shadows for "Micro-Glows" (`shadow-[0_0_30px_rgba(204,255,0,0.15)]` on primary buttons).
- **Radius:** Moving from `0px` strict brutalism to a highly premium `rounded-3xl` for outer cards and `rounded-full` for chips/pills.

## 5. Micro-Interactions
- **Hover States:** Magnetic lift (`scale-105`) with intensified micro-glows running via `tw-animate-css` or Tailwind transitions.
- **Backgrounds:** A subtle CSS mesh-gradient or noise overlay to provide texture.
- **Ticker:** A continuous CSS marquee scrolling `<marquee>` or keyframe animation for "LIVE REGISTRATION • 7-A SIDE • DMCC".
