# WordPress implementation and state QA

## Section mapping

For each approved visual section, record:

`Design section | theme architecture target | file/pattern/block | data source | editor controls | fallback | status`

Use the selected architecture without forcing a migration:

- Classic: `front-page.php`, `page-*.php`, `template-parts/`, hooks and native menus.
- Block: `templates/*.html`, `parts/*.html`, patterns and core/registered blocks.
- Hybrid: existing PHP templates plus `theme.json`, patterns or blocks where they add value.

Use a template part for a reusable structural section, a pattern for an editor-insertable composition, and a block when a discrete editor-controlled unit needs its own attributes/rendering. Lock or constrain controls when the approved design requires stable structure.

## Dynamic content mapping

Prefer this order: core page/post/navigation/media data; ordinary post meta; ACF Free fields; a justified CPT or taxonomy for genuinely repeatable/reusable content. Keep portable CPT and taxonomy registration in a companion plugin when appropriate.

ACF Free is limited to supported ordinary fields and field groups. Do not use Repeaters, Flexible Content, Options Pages, Gallery/Clone fields, ACF Blocks or any other Pro-only feature. Use fixed fields or native blocks for fixed-count visual pieces. Document field name, type, required state, fallback, length guidance, image return format, escaping and editor ownership. Verify ACF availability before `get_field()` and never render undefined values.

## Required content-state matrix

Before calling a section verified, exercise as applicable:

| State | What to inspect |
|---|---|
| Populated | Approved copy, asset, links and expected hierarchy |
| Empty | No fatal errors, sensible omission/fallback, no awkward orphan labels |
| Long | Heading/body/button wrapping, overflow, height and neighboring sections |
| Missing image | Alt/placeholder behavior, layout stability, no broken URL or CLS surprise |
| Editor-controlled | Save and reload through the actual editor; confirm field type, permissions and frontend escaping |

Also check a representative special character string and, where relevant, zero/one/many CPT or taxonomy terms. Do not claim editor editability from static markup alone.

## Deviation record

For each mismatch, record `section`, `spec reference`, `observed result`, `reason`, `decision owner`, `impact`, `status` and `evidence path`. Common valid reasons include missing approved asset, source uncertainty, editor constraint, browser support or accessibility correction. Re-run the affected viewport/state after a correction.
