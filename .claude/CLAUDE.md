# traceyami.github.io

Personal website for Tracey Churray. Single-page portfolio combining a visual bento grid, micro-animations, and editorial project sections.

## Architecture

One HTML file (`index.html`), no build tools, no frameworks. All CSS and JS inline. Deployed via GitHub Pages.

Working copies live as `prototype-v{N}.html`. When ready to ship, copy the current prototype to `index.html` and push.

## Design System

**Fonts:**
- `Fraunces` (variable, optical size 9-144) -- display headings, project names
- `DM Sans` -- body text, descriptions
- `Caveat` -- handwritten accents (location, project tags, labels)

**Colors:**
```
--color-bg:        #F5F1EB   (warm paper)
--color-accent:    #2D5A4A   (deep green, used for emphasis)
--color-text:      #1a1a1a
--color-text-muted: #666
```

**Grid variables:**
```
--gap:    6px   (3px on phone)
--radius: 10px  (6px on phone)
```

## Page Structure

1. **Hero** -- Two-column flex masthead (`max-width: 960px`). Left: name, location, social icons. Right: headline, bio. Stacks to single column at 1024px.

2. **Bento grid** -- 12-column, 2-row CSS grid with full-bleed left/right edges. Height: `clamp(400px, 55vh, 620px)`. Cells: Brooklyn (portrait, left edge), crab illustration, Prospect Park, Premiere timeline, pigeon (portrait, right edge), puffer fish, boobies. Reflows to 2-column at tablet/phone.

3. **Crab animation overlay** -- SVG crab runs across the top of the bento grid on scroll. Full personality arc: walks out, sees big crab, gets startled (jumps LEFT away from it), scurries back, then peeks out from left edge. Hover makes it dart away. Uses `animationend` event filtered for `crab-cross`, class sequence: `.animating` -> `.peeking` + `.interactive`.

4. **Project sections** -- Full-bleed editorial layouts alternating image left/right. Scroll-triggered entrance via IntersectionObserver. Three projects: Bird Playing Cards, Bird in the Hand, Nosy Neighbor.

5. **Footer** -- Minimal, links + tagline.

## Responsive Breakpoints

- **Desktop:** 12-column grid, two-column hero, two-column project sections
- **Tablet (max-width: 1024px):** 2-column grid, stacked hero, stacked project sections
- **Phone (max-width: 600px):** 2-column grid with tighter gaps, smaller type, Brooklyn cell at 1:1 aspect ratio, puffer spans full width

## Crab Animation Details

Do NOT casually modify the crab animation timing or personality arc. It was extensively tuned across multiple sessions. Key implementation notes:
- `animationend` listener filters for `crab-cross` (not leg animations)
- Peek position: `left: -27px` in both keyframes and `.peeking` class (MUST match or you get a visual glitch)
- Class switch uses `requestAnimationFrame` double-buffering to prevent flash
- `.interactive` class added with delay after `.peeking` to enable transitions
- Hover interaction is CSS-only via `.crab-hover-zone` sibling element
- Claw `transform-origin` set on base selector, not state-dependent (prevents pivot jumps)

## Social Icons

LinkedIn, Etsy, YouTube SVGs from Simple Icons (simpleicons.org). Inline SVGs in 26px circles with `rgba(0,0,0,0.06)` background.

## Key Files

| File | Purpose |
|------|---------|
| `index.html` | Live deployed site (copy of current prototype) |
| `prototype-v8.html` | Current working version |
| `prototype-v7.html` | Previous version (reference) |
| `images/` | All image assets |
| `images/SVG/` | SVG source files (crab, puffer, background) |

## Working With This Site

- Always edit `prototype-v8.html` (or current version), then copy to `index.html` when ready to deploy
- Test responsive by resizing browser or Chrome DevTools device mode
- The crab animation only triggers once per page load on scroll into the bento grid
- Full design history and decision log lives in the Second Brain at `Personal/website-redesign-context.md`

## What Still Needs Work

- Copy refinement (Bird Playing Cards description is still placeholder)
- Mobile polish pass (spacing, sizing, touch interactions)
- Crab animation needs touch-friendly behavior on mobile
- Timeline cell may need simplification on phone
- Old prototype and sketch files can be cleaned up
