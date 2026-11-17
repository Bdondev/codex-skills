---
name: astro-screenshot-to-site
description: Implement or refine responsive Astro sites from approved mockup specifications or supplied visual references, including new builds and existing-project adaptations while preserving architecture, accessibility, SEO, and performance.
---

# Astro Screenshot to Site

Use this skill for new Astro website builds and for changes to an existing Astro starter or site.

For design-driven work, prefer an approved `mockup-to-design-spec` v2.0 handoff. If `docs/DESIGN.md`, the relevant section specs, `docs/ASSET-INVENTORY.md`, and `docs/IMPLEMENTATION.md` are absent, use that skill first when an audit is needed; do not silently turn uncertain visual observations into implementation facts. Read [references/design-handoff.md](references/design-handoff.md) for handoff and approval rules.

## Outcome

Produce a faithful, responsive, accessible Astro implementation that fits the supplied design and the existing project instead of becoming an unrelated redesign.

## Workflow

- Inspect project instructions, package scripts, the Astro version, starter structure, routes, existing components, assets, tokens, integrations, and the approved handoff before editing. For a new build, establish the smallest architecture the design needs; for an existing project, adapt its conventions and preserve working behavior.
- Implement sections in visual order as reusable `.astro` components with typed `Props`; keep page composition, shared layout, and section-specific markup separate. Centralize approved colors, type, spacing, radii, containers, and breakpoints in the project’s existing token mechanism or the smallest suitable CSS-token layer.
- Keep client-specific content, links, asset paths, feature flags, and optional sections in typed configuration/content data rather than duplicating markup. Do not invent replacement imagery, branding, reviews, or business claims.
- Use semantic HTML, logical headings, descriptive links, accessible names, keyboard-visible focus, appropriate image alt text, reduced-motion behavior, and valid metadata/canonical/robots/Open Graph handling for the project.
- Prefer CSS over unnecessary JavaScript, preserve existing anchors/localization/integrations, and avoid dependency additions or architecture rewrites unless the project requires them.
- Work section by section. After each requested section, run the relevant checks, perform desktop and mobile visual verification, record deviations or missing assets, and obtain approval before expanding scope when the user has requested staged approval.

## Visual verification

- Run the project build and relevant lint, type, accessibility, SEO, and performance checks after implementation; use existing scripts and tools before adding anything.
- Capture or inspect the authoritative desktop and narrow mobile viewports from the references. If unspecified, use 1440px desktop and about 390–428px mobile.
- Compare hierarchy, proportions, typography, spacing, image cropping, overflow, and responsive behavior. Correct the largest discrepancies first, then recheck keyboard usability, contrast, reduced motion, metadata, asset loading, and layout shift.
- Record evidence for each completed section, explicit design deviation, unresolved assumption, and missing asset. Never claim exact fidelity or compliance without evidence. Read [references/implementation-and-verification.md](references/implementation-and-verification.md) for the checklist.

## Boundaries

Do not hard-code project-specific content, filenames, viewport sizes, or deployment details into reusable guidance. Treat approved specifications and supplied references as the source of truth; approved deviations supersede the reference. Do not overwrite approved specs, replace user assets, commit, push, or deploy unless explicitly requested.
