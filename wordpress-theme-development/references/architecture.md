# Choose the WordPress architecture

Use existing site conventions first. A theme's visual fidelity follows the frontend and verification, **not** whether it uses ACF or blocks.

| Choice | Prefer when | Key files | Editing implications |
|---|---|---|---|
| Block theme | New content-oriented site, Site Editor workflows, reusable page layouts | `theme.json`, `templates/*.html`, `parts/*.html`, `patterns/*.php`, `style.css` | Editors can modify much of the layout; consider locking/pattern controls as required. |
| Classic PHP theme | Rigid, art-directed designs; stable PHP templates; tightly scoped content editing | `style.css`, `functions.php`, `index.php`, `front-page.php`, `header.php`, `footer.php`, `template-parts/` | Presentation stays in PHP/CSS; native editing and/or free fields supply content. |
| Hybrid | An existing classic template structure that benefits from `theme.json`, block editor, patterns | Classic files + `theme.json`, optional patterns | Adopts block capabilities without wholesale rewrite. |

`theme.json` v3 is available on supported WordPress versions (verify local version); it is **not exclusive to block themes**. Do not generate block-theme `front-page.html` as a substitute for classic `front-page.php` when the user specifically chose classic.

## Architecture decision note

Record in project docs:

- User requirement and approved theme type; whether existing code already dictates it.
- WordPress/PHP versions actually detected; versions unverified if unavailable.
- Real LocalWP site status and active theme path (if LocalWP).
- Design constraints (reference width, typography, asset inventory, image crops).
- Page sections and reusable parts; what an editor may change vs what is fixed.
- Toolchain used, including **existing Tailwind version** and Playwright availability.
- Data model: built-in pages, navigation, post meta, fields, CPTs, templates.

## Reusable implementation choices

- Use native WP menus/navigation, custom logo, media library, core blocks where adequate.
- Fixed-count visual pieces: fixed fields or carefully locked core blocks/patterns. Avoid an unnecessary CPT.
- Variable repeatable site content (e.g., testimonials, FAQs, service directory): choose native posts or a portable CPT if justified. Keep reusable content types in a companion plugin, rather than tying records to an active theme.
- Use `block.json` and WordPress block registration APIs for custom blocks where appropriate. ACF-specific blocks require **ACF Pro**; core registered blocks are a separate option.
- Avoid blanket “all sections must be custom blocks” and avoid blanket “all sections must have ACF fields.” Choose the lightest structure that meets editing needs.

## Repo boundaries

A Git repository inside the active theme directory is sensible for a single custom theme in LocalWP. If the project includes a companion plugin or tests outside that theme, choose an enclosing project repository intentionally; never commit all of WordPress core or uploads by accident. The skill folder belongs in the **repository that Codex works from**; if the Git root is the theme directory, place `.agents/skills/` there.
