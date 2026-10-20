---
name: astro-screenshot-to-site
description: Implement and refine responsive Astro pages from supplied visual references while preserving design fidelity, accessibility, localization, and existing project structure.
---

# Astro Screenshot to Site

Use this skill when implementing or refining an Astro website from a screenshot, mockup, or visual reference.

## Outcome

Produce a faithful, responsive, accessible Astro implementation that fits the existing project instead of becoming an unrelated redesign.

## Workflow

- Inspect the reference image, repository structure, existing components, assets, design tokens, and project instructions before editing.
- Identify major regions, alignment, typography hierarchy, color relationships, spacing, imagery, and responsive assumptions.
- Reuse existing components, tokens, fonts, and supplied assets. Do not invent replacement imagery, branding, reviews, or business claims.
- Implement meaningful content as semantic HTML with logical headings, descriptive links, accessible names, and keyboard-visible focus.
- Prefer CSS over unnecessary JavaScript and keep responsive behavior robust at intermediate widths.
- Preserve existing anchors, localization, metadata, and integrations unless the request explicitly changes them.
- Keep changes scoped to the requested page or section; avoid unrelated refactors and dependency additions.

## Visual verification

- Run the project build and relevant checks after implementation.
- Capture or inspect the authoritative desktop viewport and a narrow mobile viewport. If unspecified, use 1440px desktop and about 390–428px mobile.
- Compare hierarchy, proportions, typography, spacing, image cropping, overflow, and responsive breakpoints against the reference.
- Correct the largest discrepancies first, then recheck keyboard usability, contrast, reduced-motion behavior, and horizontal overflow.
- Report remaining visual differences when external assets, fonts, iframes, or unavailable references prevent pixel-level matching.

## Boundaries

Do not hard-code project-specific content, filenames, viewport sizes, or deployment details into reusable guidance. Treat the supplied project and reference as the source of truth. Do not commit, push, deploy, or replace user assets unless explicitly requested.
