# Quiet chrome design

Date: 2026-09-26

## Intent

Keep the liquid chrome material and the current motion. Make the page quieter by changing how it is presented: a short masthead instead of a full-screen hero, one soft sans, and open entries instead of sharp hardware panels.

The chrome name and the chrome background forms stay the memorable part. Type, labels, corners, and section furniture get out of the way.

## Decisions

- Chrome background images stay. The metal gradient stays on the name only.
- The opening is a short masthead. The name is smaller and sits just under the nav. There is no full-viewport hero.
- Experience, projects, and education share one open entry pattern: no fill, with a soft light along the left edge.
- About stays a closing block: portrait, heading, bio, links, and the stack.
- Motion timing, blur, stagger, the light sweep, scroll parallax on the chrome form, in-view reveals, and heading splits stay as they are.
- Atmosphere stays: the studio layer, dust, and the cursor light stay. Do not retune them.

## Type

Use Nunito Sans for every piece of text, loaded with `next/font/google` in `src/app/layout.tsx`. Drop Archivo and JetBrains Mono.

Two weights:

- Regular (400) for body, summaries, bullets, dates, and links.
- Medium (500) for the name, section titles, and row titles.

Sentence case. No uppercase tracking, no mono labels, and no numbered eyebrows (`01 — Experience`).

The name uses the existing `.text-chrome-shine` fill at `clamp(2.5rem, 5.5vw, 4rem)`, left aligned. Section titles are about `1.75rem`, medium, in `#f3f4f6`, with no metal fill. Row titles are about `1.125rem`, medium, in `#f3f4f6`. Body and meta stay in the current silver (`#b8c0cc`) and steel (`#747d8c`).

Nav links, the footer, and the “RZ” mark use the same sans. “RZ” is `#f3f4f6`. The footer name is steel. Neither uses the chrome fill.

## Color and shape

Keep the current palette in `tailwind.config.js`: void `#030303`, graphite `#121418`, steel `#747d8c`, silver `#b8c0cc`, chrome `#f3f4f6`, spotlight `#eaf2ff`.

Stop using the champagne accent.

An entry has no fill and no border. A 2px light runs down the left edge, bright through the middle and fading at both ends, with a soft glow. Padding is about 1.35rem, with the light inset from the text.

The portrait radius is 24px. Logos inside experience entries are about 40px with a slight radius and no frame. Compact actions, including “Selected work” and the 404 return link, stay pills (`border-radius: 999px`) with the soft fill and border. No glow shadows on buttons or the portrait.

Focus-visible outlines follow the control’s radius.

## Page structure

Section order stays: masthead, experience, projects, education, about, footer.

The masthead replaces `Hero`’s full-screen stage. It is content-height, with enough top padding to clear the fixed nav (about 5.5rem) and a short bottom padding (about 4rem). Contents, stacked tight and left aligned:

- “Ryan Zhou” with the chrome fill.
- The existing title and positioning line from `personalInfo`.
- A pill link to `#work` labeled “Selected work”, plus the existing GitHub, LinkedIn, and email icons.

The chrome form stays on the right edge of this opening, with the same scroll parallax. There is no eyebrow above the name. The existing hero timeline still runs on the name, the copy, and the actions. Drop the timeline step that targeted the eyebrow, and drop the bottom-of-viewport “Scroll” cue with its timeline step. Leave the timing of the remaining steps as it is.

Each of experience, projects, and education has one plain section title, then a stack of rows. Rows are always open. Nothing expands or collapses.

### Experience row

- Rounded logo, company, and the role with location on one line.
- Dates at the end of that line.
- Bullets visible underneath, in silver.

### Project row

Render the title, the short `summary`, and the links that exist (`GitHub`, `Live site`) in sentence case. Do not render `details`.

### Education row

Render the school, the degree, the period, and the GPA. Do not render coursework, course codes, or the warm banner plate. The high-school entry uses the same row. Its `details` array stays unrendered, as it is today.

### About

Keep the portrait, the heading, the bio, and the contact links. The portrait keeps its rounded frame and drops the sweeping light overlay and the champagne hairline. The stack (languages, frameworks, and tools) becomes a loose wrap of pills: icon, sentence-case name, same soft fill and border. The sharp three-column grids go.

### 404

Use the same type and pill button so the missing page matches the rest of the site. Copy can stay. The heading is plain `#f3f4f6` at the masthead name size, with no metal fill.

## Data

Leave `src/lib/data.ts` as it is. `project.details` and `education.courses` stay in the file and are not shown.

## Motion and atmosphere

Do not change durations, distances, blur amounts, stagger, or easing in:

- `src/components/site/CinematicHeading.tsx`
- `src/components/site/Reveal.tsx`
- `src/components/site/Atmosphere.tsx`
- `src/components/site/CursorLight.tsx`
- `src/components/site/DustMotes.tsx`

The masthead may keep the current hero animation hooks on the elements that remain. Reduced motion still resolves to the settled state.

## Files

- `src/app/layout.tsx` — swap fonts.
- `src/app/globals.css` — type classes and the shared row, pill, and portrait radii. Retire `.label` and the mono uppercase treatments from the UI. Keep `.text-chrome-shine`.
- `tailwind.config.js` — point the sans family at Nunito Sans.
- `src/components/site/Hero.tsx` — masthead layout and the pill action.
- `src/components/site/Experience.tsx` — rim-lit entries, bullets always visible.
- `src/components/site/ProjectGallery.tsx` — rim-lit entries, summary and links only.
- `src/components/site/Education.tsx` — rim-lit entries, no coursework.
- `src/components/site/About.tsx` — pills and the quieter portrait.
- `src/components/site/Nav.tsx` and `src/components/site/Footer.tsx` — sentence-case sans.
- `src/app/not-found.tsx` — matching type and pill.

Share one row treatment (a class or a small component) so the three lists cannot drift apart.

## Out of scope

- Rewriting copy.
- Reordering sections.
- Adding or removing routes.
- Deleting unused data fields.
- A light theme.
- Retuning motion or removing the chrome images, dust, or cursor light.

## Check

On desktop and a narrow viewport:

- The name is the chrome moment, sits under the nav, and the first rows are visible without a full-screen title card.
- Experience, projects, and education are separate headings over the same rim-lit entries.
- A project shows its title, summary, and links, and not the long detail.
- Education shows school, degree, dates, and GPA, and not coursework.
- Experience bullets are visible without a click.
- Corners on the portrait and the pill are visibly soft. Entries have a light on the left edge and no filled box.
- The existing reveals, blur, sweep, and chrome scroll still run. Reduced motion still settles immediately.
- Keyboard focus is visible on the pill, row links, and nav.
