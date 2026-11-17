# Approved design-to-theme implementation

Use this reference only when the user requests implementation or audit of an approved visual design in a Shopify theme. It integrates with `mockup-to-design-spec` v2.0; it is not a replacement for that audit and must not be forced onto unrelated app, API, extension, cart or theme-maintenance work.

## Handoff boundary and source of truth

When present, reuse these approved artifacts without regenerating equivalent documents:

| Approved artifact | Shopify implementation use |
|---|---|
| `docs/DESIGN.md` | Global tokens, section index, responsive strategy, accessibility requirements and approved decisions |
| Relevant `docs/design/NN-*.md` or equivalent section spec | Scoped layout, content, assets, responsive states, interactions and section acceptance criteria |
| `docs/ASSET-INVENTORY.md` | Asset provenance, intrinsic dimensions, status, alt-text notes and missing-asset decisions |
| `docs/IMPLEMENTATION.md` | Ordered build plan, platform constraints, validation evidence and blockers |

The original reference remains the visual source of truth. User-approved decisions override the reference only when recorded. Preserve the v2.0 evidence labels: measured, observed, estimated, proposed and unknown. Missing assets, copy, links, fonts, breakpoints or data stay explicitly missing; do not replace them with invented Shopify values.

If these documents are absent and the requested work depends on unresolved visual, content, asset or responsive decisions, stop and request a design-spec audit or an equivalent approved handoff. If the user provides a complete implementation brief instead, record it as the approved source for that task rather than silently creating a parallel spec.

For a section task, read only the global spec, the relevant section spec, referenced asset rows/images and the applicable implementation-plan steps. Preserve already-approved sections and record deviations with reason, impact, owner/approval and verification evidence.

## Design-to-theme workflow

1. **Confirm scope and architecture.** Identify the target JSON template, section group, section, block, snippet, product/collection template or global theme setting. Inspect the existing theme before choosing a new pattern. Keep app blocks and theme blocks distinct where Shopify requires it.
2. **Build a traceable section map.** For every approved visual section, record the design section, Liquid target, data source, editor controls, fallback/empty state and status. A section may use a section file plus snippets or blocks; do not flatten reusable or editable UI into a single template.
3. **Map content and data.** Separate static decorative content, merchant-editable copy, product attributes, reusable structured content and app-provided content. Choose the least powerful native data model that meets the requirement, and mark any proposed mapping until verified in the running store.
4. **Implement one verified slice.** Work in visual order and only on the requested section. Reuse approved assets and tokens, preserve neighboring sections, use semantic Liquid markup, and support theme-editor reload/select events for interactive code.
5. **Verify editor behavior and states.** Test settings and blocks in the actual theme editor, save/reload, add/remove/reorder where supported, connect dynamic sources, and exercise the content/variant/empty states relevant to the section.
6. **Compare and report.** Compare the rendered implementation with the supplied desktop/mobile references at their actual dimensions, or 1440px and 390px when no dimensions are supplied. Record mismatches and unverified cases; do not claim pixel-perfect fidelity without evidence.

## Required mapping

Record this table in the project implementation plan, section handoff or equivalent existing document. Do not create a duplicate design specification when the approved v2.0 files already provide the information.

| Design requirement | Shopify theme target | Decision and verification notes |
|---|---|---|
| Visual section | Liquid section in `sections/`, section group, or existing section composition | Preserve approved order, hierarchy, responsive behavior and section identity |
| Reusable component | Snippet, section block, theme block in `blocks/`, or app block | Use snippets for non-editor-configurable markup; choose block type by nesting/editor ownership and verify compatibility |
| Editable content | Section schema setting or block setting | Use typed settings, defaults only when approved, translation keys for interface strings, and explicit content length guidance |
| Product attribute | Typed product/variant/collection metafield or native Shopify object | Verify namespace/key, definition type, permissions, dynamic-source support and missing-value behavior |
| Structured content | Metaobject definition/reference, or a justified existing resource | Verify definition fields, publication/reference behavior, ordering and empty state before rendering |
| Design token | CSS custom property plus theme setting when merchant-editable | Keep token names stable, scope variables appropriately, preserve existing settings and avoid editing merchant-managed `settings_data.json` unintentionally |
| Page layout | JSON template and section instances, with section groups where applicable | Preserve merchant reorderability and template compatibility; do not hardcode a page into a Liquid template when JSON configuration is required |

### Data-model decisions

- Prefer native product, collection, media, localization and theme settings before custom data.
- Use metafields for typed attributes attached to a Shopify resource, such as care instructions, specifications or a product badge.
- Use metaobjects for reusable structured records such as size guides, comparison rows, ingredients, icons, lookbooks or brand content.
- Use section settings/blocks for content the merchant should edit in the theme editor. Do not create metafields or metaobjects merely to avoid schema settings.
- Use snippets for shared markup whose content/configuration belongs to its caller, not as a substitute for editor-controlled blocks.
- Connect dynamic sources only where the setting type and target resource support them. Verify the connected value, unavailable value and editor behavior in the store.

### Tokens and responsive behavior

Translate only approved or explicitly proposed tokens. Prefer a small, named set of CSS variables for color, type, spacing, container width, radius and elevation, with theme settings only for values the merchant is meant to control. Keep token ownership clear between `config/settings_schema.json`, section schema and CSS. Do not infer exact values from a flattened image when v2.0 labels them estimated or unknown.

Implement observed desktop/mobile behavior first. Label newly chosen breakpoints, stacking order, crop rules, overflow behavior and touch targets as proposed until they are approved or verified against the reference. Check long translated content and zoom/reflow in addition to the supplied viewports.

## Acceptance criteria and verification matrix

Before calling a design section verified, reuse the acceptance criteria in its approved section spec and check the applicable rows below. A static HTML render does not prove editor configurability, dynamic-source wiring or Shopify data behavior.

| Area | Required evidence |
|---|---|
| Visual mapping | Every visible design section has a recorded Liquid target and deviations are documented |
| Theme editor | Settings, blocks, presets, add/remove/reorder, save/reload and section/block select behavior work in the actual editor where supported |
| Responsive layout | Reference desktop/mobile viewports compared; no horizontal overflow, clipping, unexpected reordering or broken image crop; proposed behavior is labeled |
| Product variants | Default/first available variant, multiple options, unavailable combination, sold-out state, variant media and selling-plan behavior tested when relevant |
| Dynamic sources | Connected metafields/metaobjects resolve with populated, missing and empty values; type/namespace/key and fallback are verified |
| Accessibility | Semantic landmarks/headings, labels, keyboard/focus order, visible focus, announcements/errors, contrast, alt text and reduced-motion behavior checked as applicable |
| Empty states | Missing image, missing optional content, empty list/metaobject, unavailable product data and zero-result states do not produce broken markup or orphan labels |
| Regression | Existing product forms, accelerated checkout, cart, localization/Markets, analytics and app blocks remain functional where in scope |

Use the state matrix below for relevant sections and record results, not assumptions:

| State | Inspect |
|---|---|
| Populated | Approved copy/assets, expected hierarchy, dynamic values and links |
| Empty/missing | Graceful omission or approved fallback, stable spacing, no broken URL/alt or orphan label |
| Long/special characters | Wrapping, overflow, height, escaping, neighboring sections and localized content |
| Product/variant | Selection, availability, media, price, selling plan, quantity and error recovery |
| Editor-controlled | Change setting/block/dynamic source in the editor, save, reload and preview the same template |

## Deviation record

For each mismatch or implementation decision that differs from the approved handoff, record: `section`, `spec reference`, `observed result`, `reason`, `decision owner`, `impact`, `status`, and `evidence path`. Re-run the affected viewport/state after a correction. Distinguish checked-in source, local/theme-editor verification, development-store verification and production verification.

Do not publish, push, overwrite a live theme, change store data or alter app/checkout configuration without explicit authorization.
