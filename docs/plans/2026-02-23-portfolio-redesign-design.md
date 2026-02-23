# Portfolio Redesign — Design Document
_Date: 2026-02-23_

## Overview

Full redesign of ryanzhou.me from a Vite + React dark-theme portfolio to a Next.js static site with a "Technical OS" aesthetic — light, white, precise, evoking an engineering notebook or desktop IDE.

---

## Aesthetic Direction

**Theme: Technical OS**

- White/off-white background (`#fafafa`) with a subtle dot-grid SVG texture overlay
- Near-black text (`#0d0d0d`) for maximum ink-on-paper contrast
- Muted gray (`#e5e5e5`) for borders, dividers, and panel edges
- No strong accent color — chromatic restraint is the statement
- Every decorative element serves structure (grid, borders, monospace labels)

**Typography**

- `JetBrains Mono` — navigation, section headers, metadata labels, tag pills, timestamps
- `Lora` (serif) — hero tagline, project descriptions, body copy
- The tension between fixed-width technical type and proportional serif creates the editorial-meets-engineering feel

**Motion (Rich)**

- Page load: typewriter effect for name + title in hero, character-by-character reveal
- Section transitions: staggered fade-up on content as sections activate in the sidebar nav
- Sidebar nav: active item animates with a sliding left-border indicator
- Hover states: underline draw animation on links, subtle border-color shift on cards
- Scrolling ticker: skills/tech icons scroll horizontally (preserved from current site)
- Cursor blink on typewriter before it finishes
- `framer-motion` for React animation primitives

---

## Architecture

**Tech Stack**

- **Framework:** Next.js 14 (App Router) with `output: 'export'` for static generation
- **Styling:** Tailwind CSS v3 + CSS variables for theme tokens
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Fonts:** Google Fonts (JetBrains Mono, Lora) via `next/font`
- **Deployment:** GitHub Pages via `gh-pages` npm package (same as current)

**Project Structure**

```
src/
  app/
    layout.tsx         # Root layout: fonts, metadata, dot-grid background
    page.tsx           # Single page: renders all section components
  components/
    layout/
      Sidebar.tsx      # Fixed left sidebar: name, nav tree, social links
      MobileNav.tsx    # Hamburger nav for mobile
    sections/
      Hero.tsx
      About.tsx        # Skills merged into About
      Education.tsx
      Experience.tsx   # New section
      Projects.tsx
      Contact.tsx
    ui/
      Typewriter.tsx   # Typewriter animation component
      SectionHeader.tsx
      Tag.tsx
  lib/
    data.ts            # All content data (projects, education, experience, skills)
  styles/
    globals.css        # Tailwind base, dot-grid background, custom keyframes
```

---

## Layout

**Desktop (≥1024px)**

- Fixed left sidebar: ~240px wide, full viewport height, white background, right border `#e5e5e5`
  - Top: `RYAN ZHOU` in mono, small
  - Middle: nav tree with section links styled like a file tree (`/hero`, `/about`, `/education`, etc.)
  - Active section highlighted with a sliding left-bar indicator
  - Bottom: GitHub, LinkedIn, Email icon links
- Main content area: `ml-60` scrollable, single column, max-width ~720px, centered in remaining space

**Mobile (<1024px)**

- Sticky top bar with name + hamburger menu
- Drawer-style nav panel slides in from left

---

## Sections

### Hero
- Large name in monospace (typewriter reveal on load)
- Tagline in serif: "Computer Science & Economics @ UT Austin"
- Two CTAs: `View Projects` and `Contact Me` (underline-draw buttons)
- Social links in mono style

### About / Skills
- Brief bio paragraph in serif
- Three skill columns (Frontend, Backend, Tools) using monospace type
- Horizontal scrolling tech logo ticker at bottom (preserved)

### Education
- Timeline layout using dot-grid column
- School, degree, GPA, relevant coursework
- UT Austin campus banner image (preserved)

### Experience _(new)_
- Reverse-chronological list of internships/jobs
- Each card: Company, Role, Date range, bullet descriptions
- Placeholder structure ready for real entries

### Projects
- 2-column grid of project cards
- Card: image, title in mono, description in serif, tech tags
- Hover: image un-grayscales, links appear (GitHub / Live)

### Contact
- Minimal — email link, GitHub, LinkedIn
- Short call-to-action paragraph in serif

---

## GitHub Pages Deployment

- `next.config.js`: `output: 'export'`, `basePath: ''`, `images: { unoptimized: true }`
- `package.json` scripts:
  - `"build": "next build"`
  - `"predeploy": "npm run build"`
  - `"deploy": "gh-pages -d out"`
- Static output goes to `/out` instead of `/dist`
- Custom domain: `ryanzhou.me` — `CNAME` file placed in `/public`

---

## Content Preserved From Current Site

- Name, tagline, social links (GitHub, LinkedIn, email)
- All 6 projects with descriptions, tech tags, URLs
- Both education entries with GPA and details
- All skill categories and tech logos
- Profile photo (`public/images/ryan.jpeg`)
- UT Austin banner (`public/images/banner.jpg`)
