# Platform-specific requirements

## WordPress
Identify templates, template parts, editable content, native blocks or custom fields. Propose field names, types, defaults and escaping requirements. Respect existing architecture and plugin constraints; do not assume ACF Pro. Distinguish classic and block themes.

## Shopify
Identify Liquid sections, snippets, templates, section settings, blocks, product/collection data and metafields. Propose schema types and merchant-editable controls. Preserve theme editor compatibility. Do not invent store data.

## Astro / static
Identify reusable components, props, content collections or configuration, semantic landmarks and responsive assets. Use the existing stack and design tokens; do not assume Tailwind or a CMS.

## HTML email / MJML
Identify email-safe layout, live text, image assets, alt text, buttons, stacking behavior and email-client fallbacks. Propose ESP-specific dynamic variables only when the ESP is known. Document Outlook, Gmail, Apple Mail, dark mode, unsubscribe and plain-text requirements. Do not assume browser CSS works in email. Use client rendering tests rather than browser screenshots alone for final validation.

For dynamic email, follow the Email audit branch in SKILL.md and read `email/core.md` plus the selected engine references. Do not confuse theme Liquid with email Liquid or local rendering with native ESP support.
