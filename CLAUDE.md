# Personal Website Project

Tracey's personal portfolio site featuring hand-illustrated art and playful animations.

## Live Site
- **URL**: https://traceyami.github.io
- **Repo**: traceyami/traceyami.github.io

## File Structure
- `index.html` - The live site (copy of latest version)
- `versions/` - Saved checkpoints (v1, v2, etc.)
- `images/` - All images (PNGs and SVGs)
- `images/SVG/` - Inline SVG sources (crab, puffer fish, background)
- `prototypes/` - Working/test files (not pushed to GitHub)
- `archive/` - Old unused files (not pushed)

## Workflow
1. Work in `prototypes/animation-test.html` (the main working file)
2. When happy, save as new version: `cp prototypes/animation-test.html versions/v8.html`
3. Copy to live: `cp prototypes/animation-test.html index.html`
4. Commit and push

## Current Version: v7

### Design
- **Desktop**: 12-column bento grid with 4 rows
- **Mobile**: 2-column Pinterest/masonry style with offset bricks
- **Aesthetic**: Hand-illustrated, warm tones, playful but professional

### Key Animations

**Puffer Fish (cell-card)**
- Bounces around like a DVD screensaver in a fish tank
- Fins flap when hitting walls
- Gentle wobble animation for life-like feel
- Water layers with wavy clip paths, floating bubbles

**Crab (cell-blank-bottom on desktop, inside cell-name on mobile)**
- Desktop: Peeks from left, walks in, stops, raises claws in shock, jumps, scurries out right
- Mobile: Peeks from right (flipped), walks slowly to center, opens arms to peek, jumps, scurries back out right
- Triggered by hover (desktop) or auto-plays then tap to replay (mobile)
- Inline SVG with separate IDs for claws and legs for individual animation

**Card Fan (cell-cards)**
- 5 cards fan out from stacked position on page load
- Middle card (3rd) lifts as a "hint" to show interactivity
- Entire fan shifts down 5% when any card is lifted (centers the composition)
- Hovering/tapping any card removes the hint and shows that card lifted
- Mobile: Triggered by Intersection Observer when scrolled into view

### Technical Patterns

**Touch Detection**
```javascript
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
```

**Mobile Crab Integration**
On mobile, JavaScript moves the crab-scene from its own cell into the name cell:
```javascript
if (isTouchDevice) {
    nameCell.appendChild(crabScene);
    nameCell.classList.add('animating'); // triggers CSS animation
}
```

**Card Fan Centering**
Uses `:has()` selector to shift fan when any card is lifted:
```css
.card-fan:has(.hint-lift),
.card-fan:has(img:hover) {
    transform: translateY(5%);
}
```

**Scroll-Triggered Animation (Mobile Cards)**
```javascript
const cardObserver = new IntersectionObserver((entries) => {
    if (entry.isIntersecting) {
        cardFan.classList.add('ready');
    }
}, { threshold: 0.7, rootMargin: '-20% 0px -20% 0px' });
```

### Mobile Layout (600px breakpoint)
Row-by-row:
1. Name cell (2 cols) - with integrated crab animation
2-3. Goalie photo (1 col, 2 rows tall) | About cell, then Pidge (rows 3-4)
4. Work cell (pulls up with negative margin to align with pidge)
5. Cards (full width)
6. Etsy/Side gig (full width, CTA at top via flex order)
7-8. Brooklyn illustration (2x2)
9-10. Static crab + boobies | Flamingo (tall)
11. Puffer fish (full width)

### CSS Variables
```css
--color-bg: #F5F1EB;
--color-cell: #E8DED1;
--color-accent: #2D5A4A;
--font-body: 'DM Sans';
--font-display: 'Fraunces';
--font-hand: 'Caveat';
```

## Known Issues / Future Ideas
- Footer email is placeholder (tracey@example.com)
- Could add more scroll-triggered animations on mobile
- Owl is hidden on mobile (cell-crab-mid display: none)

## To Resume Work
Say something like: "Let's work on my personal website" and I'll read this file and the prototype to get up to speed. The main working file is `prototypes/animation-test.html`.
