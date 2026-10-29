# Reusable modules and targeted failure analysis

## Module design

Keep modules in the framework already used in the project (table HTML, MJML, source partials, ESP templates). Header, footer, CTA, product card, article card and legal regions should be reusable when it improves maintenance. Do not create a custom templating system only for one email. Document module inputs: copy/length limits, image dimensions and fallbacks, links, dynamic values and editing constraints.

Base layout must remain readable if embedded media queries or external font loads fail. Use layout tables, inline critical type and spacing, predictable mobile stacking and images-off fallbacks. Test short/typical/long titles, localized copy, absent values, decorative image absence and dark mode. Document any known unsupported corners, backgrounds, or client-specific compromises.

## Debug sequence

1. Capture failing inbox name, platform/version/rendering engine and screenshot. Clarify dark mode, image blocked/on, text scaling, account type and ESP.
2. Determine whether the defect is present in authoring preview, compiled HTML, or only after ESP transformation / delivered MIME.
3. Reduce to smallest failing module while **preserving** table context and MSO conditional comments.
4. Inspect broken table nesting, width/height attributes, `td` padding, image sizing, inline overrides, media queries, client-specific stripping, VML and tracking rewrites.
5. Make the smallest change **in authoring source**; rebuild, review compiled output, and rerun static/browser tests.
6. Retest the exact failing client and adjacent clients; compare against previous section screenshots to avoid regressions.
7. State what was observed vs suspected, known tradeoffs and open tests. Never mark it fixed solely because a browser shows improvement.

Use `templates/DEBUGGING_PLAYBOOK.md` to record evidence.
