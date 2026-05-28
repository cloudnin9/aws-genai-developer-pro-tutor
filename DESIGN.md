# Design

## Theme

Dark-first with light mode support. Dark mode is the primary experience (developers studying at night); light mode is the accessible alternative for daytime/outdoor use. System preference detection with manual override.

## Color Strategy

Restrained: tinted neutrals + one green accent at ~10% surface coverage. Green signals progress, active states, and key interactive elements.

### Palette (OKLCH)

#### Dark mode

| Role | Value | Usage |
|------|-------|-------|
| Surface-0 | oklch(0.15 0.008 155) | Page background |
| Surface-1 | oklch(0.20 0.008 155) | Card/panel background |
| Surface-2 | oklch(0.25 0.008 155) | Hover states, elevated elements |
| Border | oklch(0.30 0.006 155) | Subtle dividers |
| Text-primary | oklch(0.92 0.006 155) | Body text, headings |
| Text-secondary | oklch(0.65 0.005 155) | Labels, metadata |
| Accent | oklch(0.72 0.15 155) | Links, active nav, progress indicators |
| Accent-subtle | oklch(0.30 0.04 155) | Accent backgrounds (tags, badges) |

#### Light mode

| Role | Value | Usage |
|------|-------|-------|
| Surface-0 | oklch(0.98 0.005 155) | Page background |
| Surface-1 | oklch(0.95 0.005 155) | Card/panel background |
| Surface-2 | oklch(0.91 0.006 155) | Hover states |
| Border | oklch(0.85 0.006 155) | Subtle dividers |
| Text-primary | oklch(0.18 0.008 155) | Body text, headings |
| Text-secondary | oklch(0.45 0.006 155) | Labels, metadata |
| Accent | oklch(0.45 0.18 155) | Links, active nav |
| Accent-subtle | oklch(0.92 0.05 155) | Accent backgrounds |

## Typography

| Role | Font | Size | Weight |
|------|------|------|--------|
| Headings | Inter | 1.5rem / 1.25rem / 1.1rem | 600 |
| Body | Inter | 0.9375rem (15px) | 400 |
| Code | JetBrains Mono | 0.875rem | 400 |
| Labels | Inter | 0.8125rem (13px) | 500 |

Line height: 1.6 for body, 1.3 for headings. Max body width: 68ch.

## Spacing Scale

4px base unit. Scale: 4, 8, 12, 16, 24, 32, 48, 64, 96.

## Layout

- Sidebar navigation (collapsible on mobile) showing domain hierarchy
- Content area with max-width 68ch for lectures
- Sticky header with theme toggle and search
- Mobile: bottom tab bar for domain switching, full-width content

## Components

### Navigation
- Collapsible sidebar with domain sections
- Active lecture highlighted with accent left-border (2px, not decorative stripe — functional indicator)
- Expand/collapse per domain

### Lecture content
- Rendered markdown with custom heading styles
- Callout blocks for "Exam Tips", "Gotchas", "Key Points" — differentiated by subtle left icon + background tint
- Mermaid diagrams rendered inline
- Code blocks with syntax highlighting (dark theme always)

### Progress indicators
- Domain completion bars (green fill)
- Lecture checkmarks in sidebar nav

## Motion

- Theme transitions: 200ms ease-out on background-color and color
- Sidebar expand/collapse: 150ms ease-out on height
- No decorative animations. Respect prefers-reduced-motion.

## Tech Stack

- **Astro** — static site generation from markdown content
- **CSS custom properties** — theming via CSS variables, no runtime JS for styles
- **No component framework** — Astro islands only where interactivity is needed (theme toggle, search)
