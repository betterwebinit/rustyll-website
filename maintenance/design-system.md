# Rustyll website design system

Reference: Better Web's current dark foundation in the sibling `better-web.org/assets/css/refinement.css` repository, adapted for Rustyll. The original Rustyll rocket wordmark (`img/logo-2x.png`) and orange identity remain visible. The CSS source of truth is `assets/css/site.css`; Tailwind utilities are compiled into `assets/css/generated.css` during the build.

## Semantic tokens

| Role | Value | Use |
| --- | --- | --- |
| Page background | `#080d12` | Shared Better Web foundation |
| Surface | `#0d141b` | Cards and reading surfaces |
| Raised surface | `#111b24` | Overlays and elevated blocks |
| Main text | `#f1f5f7` | Headings and primary copy |
| Muted text | `#9baab8` | Secondary copy |
| Orange text/accent | `#ff9b70` | Links, highlights, focus, buttons |
| Subtle line | `#ffffff18` | Separators and card borders |
| Button text | `#271308` | Text on the orange button |

Calculated contrast: orange against background 9.45:1, orange against surface 8.98:1, button text against orange 8.60:1, muted text against background 8.21:1. Recheck semi-transparent combinations against their actual rendered surface. Automated axe checks cover representative page families.

## Type, width and shape

- Space Grotesk: headings and expressive numbers. Inter: body and controls. JetBrains Mono: labels, paths and commands.
- Main container max width is 1248 px. Long editorial text should stay near 75 characters per line. Code and tables scroll within their own container.
- Buttons are pill-shaped. Feature and editorial cards use radii from 20 to 44 px with restrained variation; hosting choices are compact pills. Use the orange glow to call attention to a real decision or focal point, not on every element.
- The home uses a stronger orange hero and the original rocket. Resource, Team, Philosophy, Showcase and Talks pages each have a distinct content pattern rather than a generic card grid. Docs and tutorials prioritize reading and compact mobile navigation.

## Reusable patterns and states

| Pattern | Classes/components | Interaction |
| --- | --- | --- |
| Primary/secondary action | `.site-button--primary`, `.site-button--secondary` | Hover shade/border and visible focus |
| Shared header | `_includes/components/organisms/header.html` | Better Web dark chrome, Rustyll rocket, orange start action, accessible search and mobile menu |
| Shared footer | `_includes/components/organisms/footer.html` | Better Web update band and three-column layout, with working RSS and release links |
| Editorial cards | `.resource-feature`, `.participation-card`, `.learning-paths a` | Whole card is a link; keyboard focus remains visible |
| Search | `#search-dialog`, `[data-search-surface]` | Cmd/Ctrl+K, Escape, results, empty and error states |
| Documentation | `.docs-grid`, `.mobile-docs`, `.page-toc` | Sidebar on desktop, disclosure on mobile |
| Terminal | `.terminal-window`, `#terminal-playground` | Executable commands visible without JS; simulation explicitly labeled |
| Showcase | `.showcase-invitation`, `.showcase-card` | Publish only verified cases; preserve text when preview fails |

All links and controls need a visible focus ring. Use `prefers-reduced-motion` to remove decorative animation. The site must keep its core content readable without JavaScript. Do not add unverifiable performance numbers or brand endorsements to visual components.

## CSS delivery check

The previous head requested the Tailwind CDN runtime (`cdn.tailwindcss.com?plugins=typography`) and contained 8,618 bytes of inline head source. The current head requests no Tailwind runtime and links two local CSS files: generated.css is 57,072 bytes and site.css is 41,572 bytes in the reviewed build (raw file sizes, before transport compression). This is a delivery comparison, not a load-time benchmark; keep future measurements under matching network and cache conditions.

## Review widths

Check at 320, 390, 768, 1024 and 1440 px, plus 200% browser zoom. `npm test` covers 320, 768 and 1440 px for every published content page; visual review should cover the distinct page families and interactive states.
