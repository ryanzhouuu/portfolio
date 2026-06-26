# Cinematic Product Reveal Portfolio Design
_Date: 2026-06-26_

## Intent

Refactor the portfolio away from the current desktop OS metaphor into a dark, cinematic product reveal experience. The site should make Ryan's work feel like premium software products being revealed through controlled light in a black studio environment.

The new design should be memorable, but still recruiter-readable. Projects, experience, skills, education, and contact should remain easy to scan. The visual drama should clarify hierarchy instead of overwhelming the content.

## Core Theme

**Theme:** Dark cinematic product showroom

The portfolio should feel like a luxury technology exhibition: black space, liquid chrome, reflective surfaces, precise typography, and spotlight-driven reveals. Work is not presented as files, windows, or an operating system. Work is presented as objects under light.

Key phrases:

- Premium products revealed through light
- Black studio set
- Liquid chrome atmosphere
- Gallery spotlight
- Technical luxury
- Product launch page, not desktop UI

## Explicit Direction Change

Scrap the entire OS idea.

Remove the conceptual dependency on:

- Boot screen
- Desktop shell
- Dock
- Menu bar
- Draggable windows
- Desktop icons
- Window manager behavior
- Separate desktop OS experience

The replacement should be one unified responsive web experience. Desktop and mobile should share the same visual language.

## Visual Language

### Backgrounds

Use dark liquid chrome imagery as an atmospheric layer, not as busy wallpaper.

Target composition:

- **70-85% pitch black or near-black negative space**
- **15-30% abstract chrome shape, reflection, or highlight**

The background should feel like something emerging from darkness. Avoid all-over chrome textures that compete with text or project screenshots.

Good background qualities:

- Deep black, graphite, charcoal, or near-black base
- Chrome forms clustered near an edge or corner
- Smooth metallic reflections
- One controlled directional light source
- Large readable dark zones
- Macro product-photography feel
- Minimal color, mostly silver, white, graphite, and occasional oil-slick accents

Avoid:

- Dense chrome patterns covering the whole image
- Bright highlights centered behind text
- Symmetrical wallpaper-style compositions
- Busy rainbow cyberpunk gradients
- High-detail textures behind project screenshots

### Negative Space

Negative space is a primary design material. It should hold the text, controls, and project metadata.

Hero:

- Keep the main readable negative space in the left-center or center.
- Place chrome forms on the right edge, lower-right, or upper-right.
- The name should feel revealed by light, not pasted over a busy background.

Project gallery:

- Keep the selected project's text and controls in the darkest area.
- Chrome can sit below or behind the selected media like a reflective stage.
- The spotlight effect should create focus more than the image itself.

Experience and about:

- Maintain a vertical readable content column.
- Chrome should live in margins or behind inactive areas.
- Do not let reflective shapes cross through dense body text.

### Light

Light is the main interaction metaphor.

Use:

- Narrow spotlights
- Radial glows
- Soft light cones
- Edge highlights
- Subtle sweep effects
- Dim-to-lit reveal states

The selected element should be the brightest object in its local scene. Inactive elements should recede into graphite shadow.

### Color

Primary palette:

- Pitch black: `#030303`
- Near black: `#08090b`
- Graphite: `#121418`
- Dark metal: `#1d2026`
- Chrome white: `#f3f4f6`
- Soft silver: `#b8c0cc`
- Muted steel: `#747d8c`

Accent palette:

- Use small amounts of cool white, pale cyan, or champagne light.
- Accents should look like reflections, not UI decoration.
- Avoid dominant purple, neon blue, or colorful gradients.

### Typography

Typography should feel precise and premium.

Use a sharp display typeface for major names and project titles, paired with a clean readable body face. Avoid generic startup styling.

Recommended tone:

- Large cinematic display titles
- Small uppercase metadata labels
- Tight but readable body copy
- Technical spec-like project details
- Minimal marketing copy

The hero headline should be "Ryan Zhou" or a similarly direct identity signal. Supporting copy can explain CS, economics, software engineering, systems, and ML interests.

## Site Structure

Recommended route structure:

- `/` cinematic scroll portfolio
- `/projects/[slug]` dedicated project product pages

The homepage should be a complete experience, but projects should have enough depth to justify their own pages.

Suggested homepage order:

1. Hero
2. Selected Work / Project Gallery
3. Experience
4. About / Skills
5. Education
6. Contact

Projects should be the centerpiece.

## Section Concepts

### Hero

The hero is the opening frame of the film.

Design:

- Full viewport or near-full viewport dark scene.
- Liquid chrome form placed off-center, preferably right or lower-right.
- A controlled light sweep reveals "Ryan Zhou."
- Short identity line beneath: CS & Economics @ UT Austin.
- One concise positioning line about software engineering, systems, and ML.
- Minimal navigation, likely top-aligned and understated.

Behavior:

- On load, text fades in through a soft light mask.
- Background can have very subtle parallax or slow movement.
- Avoid excessive particle effects.

### Project Gallery

This is the signature interaction.

Design:

- Gallery or exhibition format.
- One project is selected at a time.
- The selected project is hit by a spotlight.
- Selected project preview is bright, sharp, dimensional, and high contrast.
- Non-selected projects sit in shadow: dimmed, desaturated, slightly smaller, or spatially recessed.
- Metadata appears near the selected project: title, short description, role/category, stack, year, and links.

Interaction:

- Hovering or focusing a project changes the selected spotlight target.
- Clicking the selected project opens its product page.
- On touch devices, tapping a project selects it first; a clear open action should remain accessible.

Layout options:

- Horizontal gallery with project cards arranged like objects on a showroom floor.
- Angled or staggered layout for cinematic depth.
- Selected project can sit center stage while others orbit in dim side positions.

Important:

- Do not make this look like ordinary cards in a grid.
- The selected state should be visually obvious.
- Project screenshots must remain readable.

### Project Product Pages

Each project page should feel like a dark product launch page.

Recommended structure:

1. Full-bleed project hero with screenshot, project title, stack, and primary links.
2. Problem section.
3. Build section.
4. Result or outcome section.
5. Technical specs section.
6. Related or next project navigation.

Tone:

- More detailed than the homepage.
- Still visual and cinematic.
- Use "Problem / Build / Result" rather than generic long descriptions.
- Treat tech stack like a product spec panel.

### Experience

Use a vertical beam timeline.

Design:

- A thin vertical light rail.
- Each role appears as a dark metal plaque or illuminated label along the rail.
- Active or hovered role gets a brighter glow and expanded details.
- Bullets remain readable and practical.

The visual metaphor is "career moments caught by light," not a standard resume timeline.

### About / Skills

Use a technical material/spec surface.

Design:

- Skills grouped into refined panels that feel etched into metal or printed onto control surfaces.
- Categories can be Frontend, Backend, Tools, Languages, or similar.
- Use small labels, crisp dividers, and subtle reflected highlights.
- Keep the content compact and scannable.

Avoid generic skill cards. This section should feel like a product specification table.

### Education

Make this quieter than projects and experience.

Design:

- Credential plate or institutional plaque treatment.
- UT Austin banner image can be reused with dark chrome overlay.
- Use a focused warm-white or champagne light accent to distinguish it from the cooler chrome sections.

Education should support credibility without stealing the spotlight from projects.

### Contact

End with a final signal scene.

Design:

- Mostly dark, clean, and minimal.
- One luminous call-to-action.
- Email, GitHub, and LinkedIn presented as precise controls or signal endpoints.
- No contact form unless explicitly desired later.

The ending should feel calm and intentional, not like a generic footer.

## Motion Principles

Motion should feel expensive and deliberate.

Use:

- Slow spotlight transitions
- Light sweep reveals
- Staggered text fades
- Subtle parallax on chrome backgrounds
- Smooth selected-project transitions
- Hover/focus glow changes

Avoid:

- Bouncy animations
- Busy particle fields
- Fast glitch effects
- Constant movement behind text
- Motion that interferes with reading

Reduced motion:

- Support `prefers-reduced-motion`.
- Keep static spotlight states and simple opacity transitions when reduced motion is enabled.

## Content Model Changes

Expand project data so product pages can be generated cleanly.

Recommended project fields:

- `slug`
- `title`
- `description`
- `shortDescription`
- `image`
- `technologies`
- `githubUrl`
- `liveUrl`
- `year`
- `role`
- `category`
- `problem`
- `build`
- `result`
- `highlights`
- `media`

The current project screenshots can be reused. Additional higher-resolution or more cinematic screenshots would strengthen the product-page effect.

## Image Search Guidance

Useful search phrases:

- `dark liquid chrome abstract background`
- `black chrome macro texture`
- `liquid metal black background`
- `dark metallic fluid wallpaper`
- `black silver abstract 3d render`
- `chrome fabric dark studio lighting`
- `liquid metal product background`

Selection rule:

Choose the image with the calmest negative space as the primary background. Use more dramatic chrome crops only for project/product-detail moments.

## Accessibility And Readability

The design can be cinematic, but it must remain usable.

Requirements:

- Maintain strong text contrast.
- Do not place body text over bright chrome.
- Make gallery selection keyboard-accessible.
- Preserve visible focus states.
- Provide non-hover paths for touch devices.
- Use semantic headings and links.
- Keep project links easy to find.
- Verify mobile layouts carefully.

## Implementation Notes For Handoff

The next implementation agent should:

1. Remove the OS shell from the main user experience.
2. Build a unified responsive homepage.
3. Make the project gallery the centerpiece interaction.
4. Add dynamic project detail pages.
5. Create or source a liquid chrome background asset with high negative space.
6. Preserve existing portfolio content while expanding project metadata.
7. Validate the final experience on desktop and mobile.

The goal is not merely to darken the current site. The goal is a full conceptual refactor from "portfolio as desktop OS" to "portfolio as cinematic product showroom."
