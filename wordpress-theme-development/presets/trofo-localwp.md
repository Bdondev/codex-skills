# Confirmed Trofo project profile (from user's shared conversation)

This is a **project-specific preset**. Do not impose it on unrelated WordPress builds. Latest explicit project decisions take precedence over earlier speculative recommendations.

**Goal:** Recreate the supplied Trofo roofing mockup as closely as realistically verifiable, using user's original assets, with Codex working section-by-section.

**Final explicit environment:** macOS + **LocalWP** site, Cursor + Codex, WordPress theme files in active theme directory, Playwright visual verification if available. Don't install Docker, `wp-env`, MAMP or another WordPress instance.

**Final explicit architecture for this project:** custom **classic PHP theme**, **ACF Free only**, Tailwind CSS (use repository's version), vanilla JS only when needed, native WP menus/media, Git. No ACF Pro, no ACF Pro Repeaters, Flexible Content, Options Pages, ACF Blocks, Elementor, or paid page builder. Do not automatically change to a block theme because a general WordPress guide prefers it. A classic theme may still use `theme.json` when valuable and supported.

**Content plan:** fixed ACF Free fields for hero, fixed four benefits and fixed three process steps; CPTs for truly repeatable services, testimonials and FAQs when justified, registered in a companion plugin for portability; native site logo/nav where appropriate. Version-control field definitions in `acf-json/`. Plan fields iteratively; do not build all fields before seeing real components.

**Site setup:** confirm actual site exists and is started in LocalWP. The user stated they use LocalWP but did **not** establish the site is already created. Verify the theme folder and local URL before writing or testing. Avoid assumptions such as `trofo.local`.

**Suggested section map:** 1 Header+Hero; 2 Benefits; 3 Services; 4 Process; 5 Testimonials; 6 FAQ; 7 Closing CTA+Footer. Verify one section at a time and preserve approved earlier sections.

**Reference quality caveat:** an earlier shared reply described a very compressed mockup. Verify current high-resolution references and complete assets in the repository; do not promise literal 1:1 fidelity from an inadequate image.

**First audit deliverables:** concise root `AGENTS.md` created/merged once, asset map, design spec, implementation plan, agreed content/editing plan and next single-section task. Do not force full original 47-page WordPress tutorial into each Codex prompt.

**Notion-guide reconciliation:** The Notion guide favors the native block theme for general new projects and notes classic/hybrid remain valid. That is guidance, not a mandate to override Trofo's explicit final stack.
