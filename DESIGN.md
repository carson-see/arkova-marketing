# Arkova Marketing — Design Reference

> See the canonical design system at `../docs/reference/BRAND.md` in the main ArkovaCarson repo.

## Quick Reference

- **Design system:** "The Precision Engine"
- **Background:** `#0a0f14` (cyber-bg)
- **Primary accent:** `#00d4ff` (cyber-cyan)
- **Fonts:** DM Sans (body) + JetBrains Mono (data/labels)
- **Max border radius:** 2px (`rounded-sm`) — no exceptions except team headshots (`rounded-full`)
- **Dark mode only** — no light mode toggle
- **Shadows:** Ambient cyan glows, never drop shadows

## Color Tokens (tailwind.config.js)

```
cyber-bg:          #0a0f14
cyber-bg-light:    #0f1a22
cyber-bg-card:     #0d1820
cyber-cyan:        #00d4ff
cyber-cyan-dim:    #00a3cc
cyber-teal:        #00e5c8
cyber-cyan-border: rgba(0, 212, 255, 0.25)
```

## CSS Classes (src/index.css)

- `.cyber-btn` — Primary button (cyan gradient, sharp, glowing)
- `.cyber-input` — Input field (dark bg, cyan focus glow)
- `.cyber-card` — Card container (sharp edges, cyan border, neon hover)
- `.bg-circuit` — Subtle grid background pattern
- `.section-divider` — Gradient horizontal rule
- `.animate-in-view` — Scroll-triggered fade-up

## Anti-Patterns

- No `rounded-2xl` or `rounded-xl`
- No pill badges
- No floating decorative graphics
- No uniform card grids that look like templates
- No light mode
