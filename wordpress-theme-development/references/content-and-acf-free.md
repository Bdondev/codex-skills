# Content modelling and ACF Free (no Pro dependency)

Use native WordPress first. Add custom fields only for genuinely structured editorial data. Plan an initial schema before building, but revisit it when actual components reveal better abstractions.

## ACF Free compatibility

Supported approaches include ordinary text, textarea, number, URL, image, link and standard field-group scenarios (check the installed plugin version and supported fields). ACF **Local JSON** permits field-group version control via `acf-json/`.

**Do not use** ACF Repeaters, Flexible Content, ACF Options Pages, ACF Blocks, or Gallery/Clone premium fields in an ACF-Free-only site. Do not install a Pro dependency, paid substitute, or Elementor. Native custom block registration via WordPress `block.json` is distinct from *ACF Blocks*; don't conflate them.

| Content need | Practical free strategy |
|---|---|
| Header + footer | WordPress site identity/logo, menu system, customizer/theme settings where appropriate |
| Hero | Fixed ACF Free fields or controlled core content; image attachment ID; optional CTA link |
| 3 fixed steps, 4 benefits | Fixed fields or locked structured blocks, not a repeater |
| Services / testimonials / FAQs with variable count | Native posts or separate CPT with structured fields; optional menu order |
| Content reused across pages | Post/CPT, patterns, and/or template parts rather than duplicated manual fields |

For a portable CPT, register it with `register_post_type()` on `init` in a small companion plugin when justified. Set `show_in_rest` when Gutenberg/REST support is expected. ACF Local JSON is not a replacement for a data migration or content backup: it saves field *definitions*, not all content values.

## Frontend implementation checks

- Assign a static Home page under Settings → Reading when the design calls for a static homepage. Confirm the actual object ID; never assume one exists.
- Use `get_field()` after checking ACF availability; render sensible fallback/empty states, never undefined indexes. Do not display editorial fields from fake sample content as if saved.
- If ACF image field returns an ID, render `wp_get_attachment_image( $id, $size, false, $attrs )` for responsive `srcset`/sizes support. If returns array/URL, inspect schema first; do not guess its format.
- Use `esc_html()` for plain text, `esc_attr()` for attributes, `esc_url()` for URLs, and `wp_kses_post()` only when approved rich markup is intended. Validate URL schemes and nonces/capabilities for actions.
- Avoid raw `echo get_field('...')` without checking output context.
- Use `acf-json/` for definitions, ensure its files are committed, and sync/import appropriately. When using WP-CLI ACF commands, check actual plugin/CLI versions and available commands.
- Do not disable Gutenberg or install Classic Editor unless explicitly required.

## Content model artifact

Keep a compact matrix, e.g.:

`Section | source (page/CPT/site option) | field name | type | required | fallback | editor rules`

Document whether text length, image focal point, card count, or CTA URL is constrained by the design. Do not hardcode dynamic copy into templates after committing to editable content; keep structural labels or temporary placeholders clearly identified.
