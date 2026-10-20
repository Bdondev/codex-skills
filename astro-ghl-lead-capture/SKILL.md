---
name: astro-ghl-lead-capture
description: Add, repair, and document responsive GoHighLevel lead-capture iframe forms in Astro sites while preserving existing layouts, anchors, accessibility, and mobile behavior.
---

# Astro GoHighLevel Lead Capture

Use this skill when an Astro site needs a GoHighLevel form embedded into an existing page or section.

## Outcome

Deliver a reusable, responsive form component and an integrated section that matches the surrounding design, works at desktop and narrow mobile widths, and clearly documents which content is controlled by GoHighLevel.

## Implementation guidance

- Inspect the existing Astro components, design tokens, reference screenshots, and page structure before editing.
- Prefer a small reusable component such as `GHLLeadForm.astro`; pass the form URL or identifier as a prop when the project has multiple forms.
- Embed the official GoHighLevel iframe supplied by the user or project. Never invent a replacement form, fields, testimonials, or business claims.
- Keep iframe sizing responsive. Check parent overflow, fixed heights, margins, and positioning so the form is not clipped and does not cause horizontal scrolling.
- Preserve existing section backgrounds, floating-card layouts, CTA anchors, localization, and meaningful semantic headings.
- Keep GoHighLevel-managed labels, prefilled text, fields, and validation inside the GoHighLevel builder. Do not imply that Astro edits can change them.
- Use accessible names and landmarks around the form, visible keyboard focus, sufficient contrast, and reduced-motion-safe behavior. Do not add unnecessary JavaScript.
- Add concise project documentation when the integration has operational details, including where to change form content and how to replace the iframe identifier.

## Verification

- Run the project build and relevant checks.
- Test the integrated page at the project’s authoritative desktop width and at least one narrow mobile width; use 1440px and roughly 390–428px when no project-specific widths are defined.
- Confirm the iframe loads, the CTA anchor still works, no horizontal overflow is introduced, and the section remains usable with keyboard navigation.
- Report any visual differences, external-form limitations, or checks that could not be performed.

## Boundaries

Do not hard-code a particular client, city, form ID, contact detail, commit hash, deployment action, or repository-specific untracked folder. Treat those as project inputs. Do not push commits or modify the GoHighLevel account unless the user explicitly requests and authorizes it.
