# Mac + LocalWP development workflow

This is the default environment **only when the user chooses LocalWP**. Do not install Docker, `wp-env`, XAMPP, MAMP, or another copy of WordPress to “help.”

## Inspect first

1. Confirm LocalWP application/site exists, the site is started, and identify the actual **Site Folder** in LocalWP. Typically the WordPress root is `app/public` within that site folder, but verify rather than hardcoding it.
2. Identify the live local URL from LocalWP or WordPress settings (no assumptions about `.local` hostname or HTTP port). Confirm the URL loads before browser-based QA.
3. Navigate to the actual `app/public/wp-content/themes/<theme-slug>/`. Open this theme/project in Cursor; avoid Git-ing the entire WordPress installation.
4. If ACF Free is part of the project, confirm it is installed and activated. Do not add Pro. Determine how its fields will be registered/synced.
5. If a command needs WordPress-specific PHP/CLI, use LocalWP's **Open Site Shell** or the appropriate runtime. Don't assume a system `php`/`wp` command points at the LocalWP site.

## Minimal classic scaffold

A valid classic theme begins with a `style.css` theme header and `index.php`; use `functions.php` to enqueue compiled assets and register theme support. Add `front-page.php`, `header.php`, `footer.php`, `template-parts/`, `acf-json/`, `src/`, and `dist/` only as needed. Keep Node dev dependencies in the active Git root. The block-theme scaffold is different; don't mix them accidentally.

For Tailwind, inspect version before choosing setup. Tailwind v4 and v3 pipelines differ. Use the existing bundler or a minimal CLI build; version-lock dependencies and ensure only compiled, necessary production assets are enqueued via `wp_enqueue_style()` / `wp_enqueue_script()`.

## Initial LocalWP verification

- Start LocalWP site (manual if outside agent's control).
- Activate theme under Appearance → Themes.
- If static homepage needed, create Home page and set it in Settings → Reading.
- Confirm frontend and admin render without fatal errors; verify ACF and native content editing.
- Confirm built CSS is loaded and PHP templates are used.
- Run `php -l` via valid PHP runtime for edited PHP files; run project-defined build and tests, not speculative scripts.
- Keep database backups outside the Git repo. Never execute destructive DB commands without explicit consent.

## Common pitfalls

- Editing a similarly named theme directory while WordPress is using another.
- Assuming LocalWP is running because files exist.
- Wrong browser URL, untrusted self-signed certificate, or unverified WordPress redirects.
- Misinterpreting the generated static preview as real WordPress rendering.
- Assuming WP-CLI, Playwright, or screenshot tooling is installed; verify first and report limitations.
