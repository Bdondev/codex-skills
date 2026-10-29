# Email-specific rules — merge with existing AGENTS.md

Apply to HTML email tasks, not the site's web UI. Read only the relevant files for the current stage.

- Before implementation inspect visual reference, approved campaign copy/links, `docs/DESIGN_SPEC.md`, `docs/ASSET_MANIFEST.csv`, `docs/ASSET_SLICING_PLAN.md` and `docs/SECTION_BUILD_PLAN.md` when available.
- Never invent discounts, claims, offers, expiry, URL destinations, contact address, legal wording or ESP merge tags. Mark evidence as user-provided, visually observed, proposed or missing.
- Keep important copy, nutrition/feature data, CTA text/links, legal and unsubscribe as functional live HTML. Never flatten the whole email to one image.
- Prepare image slices before building. Separate source artwork from optimized/composite exports, disclose generative re-creations, preserve originals, and avoid claiming genuine pixel recovery from low-res screenshots.
- Preserve existing email compiler where appropriate (MJML or presentation-table HTML); no CSS Grid/Flexbox/absolute positioning for critical layout; fallback colors and Outlook considerations must be documented.
- Build one named section at a time, preserve previously completed work and produce a short report before moving on.
- Validate, compile and browser-screenshot at 320/390/600px; use 1440px for desktop context. Browser preview is not Gmail/Apple Mail/Outlook coverage.
- No sending, uploading assets externally, deploying or committing without explicit approval.
- End every stage with observed outcomes, files touched, remaining blockers and which checks were not performed.

- The source is for maintainable edits; inspect the compiled output and ESP-processed delivered HTML separately when accessible. Never claim all clients validated by compilation.
- Keep official ESP syntax and editable regions intact; no invented merge tags. Report missing/long personalization tests, plain-text MIME alternatives, and actual email client/version.
- Treat <80–90 KB pre-ESP as a recommended byte budget, ~102 KB as Gmail clipping risk; neither is universal.
