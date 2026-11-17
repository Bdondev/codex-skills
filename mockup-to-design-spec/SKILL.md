---
name: mockup-to-design-spec
description: Analyze PNG, JPG, or supplied Figma mockups and produce implementation-ready design specifications for WordPress, Shopify, Astro, static websites, or static and dynamic HTML email (MJML, Klaviyo, AMPscript, Liquid, LiquidJS, Handlebars, Jinja2, HubL, FreeMarker). Use before implementing a design, when auditing visual references, or when resolving design fidelity issues. Do not use to implement code unless separately requested.
---

# Mockup to Design Spec

Version: 2.0

## Goal
Translate visual references into concise, traceable implementation requirements while retaining the original images as the visual source of truth.

## Workflow
1. Inspect the project root, existing AGENTS.md, CLAUDE.md, design documentation, assets, and references. Preserve existing instructions. Do not create or modify agent instructions unless requested.
2. Identify the target platform, supplied desktop/mobile references, image dimensions, and available assets. Ask only for missing information that blocks the audit; otherwise record unknowns.
3. Inventory page sections in visual order. Inspect the original image and, where useful, create lossless section crops under `references/sections/` without modifying originals. Record source coordinates and dimensions. Do not upscale or reconstruct assets as part of this audit.
4. Classify every design detail as measured, observed, estimated, proposed, or unknown. Never claim exact fonts, CSS values, or responsive behavior from a flattened image alone. Distinguish image pixels from CSS pixels.
5. Document global tokens, layout, typography, imagery, components, interactions, responsive behavior, accessibility, and content requirements. Use `references/platforms.md` for the target platform.
6. Generate `docs/DESIGN.md` using `templates/DESIGN.md`. For large designs, create `docs/design/NN-section-name.md` using `templates/SECTION.md`; keep the index concise. Generate `docs/ASSET-INVENTORY.md` and `docs/IMPLEMENTATION.md` using the templates. Reuse existing equivalent files instead of creating duplicates; preserve approved decisions.
7. For email projects, follow the Email audit branch below before final review.
8. Review the specifications against the original references. Check section coverage, asset references, contradictions, missing mobile states, and unsupported assumptions. Report blockers and proposed decisions. Stop before implementation unless explicitly asked to continue.

## Rules
- Original references take visual priority; explicit user-approved changes override them and must be recorded.
- Do not invent copy, images, fonts, colors, breakpoints, animations, or hidden states. Proposed defaults must be labeled and approved when material.
- Do not confuse screenshot text with image assets; identify live text and decorative graphics separately.
- Do not overwrite originals, existing approved specs, or unrelated code.
- Use relative paths that exist; mark missing assets as missing.
- Do not claim visual verification, accessibility compliance, or exact fidelity without evidence.
- For subsequent section builds, read only the global spec, relevant section spec, and corresponding images; avoid loading unrelated sections.

## Acceptance criteria
Every visible section is indexed, each requirement is traceable to a reference or explicit decision, missing information is labeled, platform-specific dynamic fields are proposed, and the implementation plan includes visual checks. Report files created, unresolved questions, and whether the audit is ready for implementation.

## Email audit branch
- Identify layout framework, template engine, ESP, campaign/flow type, data source, and preview runtime independently. Do not infer the ESP from the screenshot. If unknown, produce an engine-neutral specification and record the integration decision as pending.
- Read `references/email/core.md` and only the selected engine/platform reference(s) from `references/email/`. Read `mjml.md` if MJML is selected. Verify platform-specific syntax and feature support against current official documentation before treating it as confirmed; otherwise mark unverified.
- Generate `docs/EMAIL-DESIGN.md`, `docs/DYNAMIC-CONTENT.md`, and `docs/EMAIL-QA.md` from the corresponding templates. Keep visual details in the existing section specs and cross-link rather than duplicating them. Use the existing DESIGN.md as the index.
- Identify static vs dynamic content, data contracts, personalization, conditions, loops, product feeds, locale/currency, fallback states, escaping, URL handling, tracking and required compliance elements. Mark each mapping proposed or verified; never invent actual profile/event fields or use real customer data in fixtures.
- Specify compile/render order, preservation of template tags through compilation, and separate production and portfolio preview outputs. A local emulator is not proof of ESP compatibility. No browser JavaScript in sent email.
- Define test fixtures for populated, missing, empty, long, special-character and unexpected values, and list sizes 0/1/max/over-max. Specify native ESP preview/send checks and client rendering checks. Do not claim tests ran during an audit.
- Stop after documentation; do not implement templates, create ESP campaigns, send email, or deploy unless separately requested.
