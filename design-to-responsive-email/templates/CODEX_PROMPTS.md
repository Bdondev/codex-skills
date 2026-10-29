# Reusable Codex prompts — one stage at a time

Call the installed skill as `$design-to-responsive-email`. Replace bracketed values with actual project values; do not inherit Sweetgreen copy/brands into unrelated work. Each prompt scopes work narrowly to reduce needless context, edits and token use.

## 1 — Architecture / design audit (stop before coding)

> Use `$design-to-responsive-email`. First inspect `AGENTS.md`, `[REFERENCE_PATH]`, campaign assets and approved copy/URLs. Choose MJML or table HTML based on project needs; preserve the existing build system (including any ESP or component framework). Create/refresh `docs/CAMPAIGN_BRIEF.md`, `docs/DESIGN_SPEC.md`, `docs/ASSET_MANIFEST.csv`, `docs/SECTION_BUILD_PLAN.md`, `docs/ACCEPTANCE_CRITERIA.md`; set up MJML validate/build scripts when needed. Classify all data as observed, provided, proposed or missing. Identify exact source/asset gaps, button links and inbox QA targets. **Do not build the email yet. Stop after planning. Do not commit.**

## 2 — Image versus HTML slicing plan

> Review `[REFERENCE_PATH]` and assets. For every visual/copy element choose live HTML, separate photo/cutout, optional decorative composite or background with fallback. Keep all headings, product/nutrition information, CTA labels/links, disclaimers and unsubscribes as live HTML wherever practical. Complete `docs/ASSET_SLICING_PLAN.md` with source provenance, required file, dimensions, transparency, mobile role and risks. An overlapping bowl/card may need separate working cutouts **and** an optional decorative composite. Do not edit/export images yet. Stop before code. Do not commit.

## 3 — Audit + prepare supplied assets

> Compare everything in `assets/` with `docs/ASSET_MANIFEST.csv` and the slicing plan. Run the skill's `scripts/audit-assets.mjs` if available. Inspect original width/height/format/alpha and actual crop visually. Flag unusably low-resolution source files; never claim upscale restored detail. Copy/optimize *approved* working assets to `assets/optimized/`; don't overwrite source originals, synthesize brand artwork or upload externally. Update manifest with missing/ready assets and stop without implementing email HTML. Do not commit.

## 4 — Email foundation only (MJML when selected)

> Implement just the foundation in the approved source path (e.g. `src/email.mjml`) using `AGENTS.md`, `docs/DESIGN_SPEC.md` and the asset manifest. Default centered 600px desktop and fluid mobile, section placeholders, suitable preheader, accessible reading order, fallback fonts/colors and conservative Outlook-compatible markup. Keep unapproved URLs/copy as labeled placeholders. Set up `npm run validate` and `npm run build`. Compile once, report errors. Do **not** complete section designs yet. Do not commit.

## 5 — One section at a time

> Implement `[SECTION_NAME]` only in `src/email.mjml`, following the design spec and approved assets. Recreate composition as closely as the actual email-client constraints permit; keep body text, product figures and functional CTA as live HTML, avoid absolute-positioned essential content, use compatible fallbacks. Preserve previously finished sections unchanged. Run validate/build/static checks and capture/inspect 320px, 390px and 600px browser screenshots if supported. Write the section QA findings, discrepancies and possible Outlook issues. **Stop after this section; no commit.**

## 6 — Browser automation and visual QA

> Implement/run a Playwright-based QA pass for `dist/email.html` in this project. Capture full-page 320px, 390px, 600px and 1440px screenshots under `tests/screenshots/`. Report horizontal overflow, broken images, image alt, placeholder links, expected live content and compiled HTML byte size in `docs/QA_REPORT.md`. Use the skill's starter visual QA script when suitable. Do not treat browser screenshots as Gmail/Outlook verification. Do not commit.

## 7 — Fix a screenshot/client-specific defect

> Fix **only** the rendering issue in `[ATTACHED_SCREENSHOT]` for `[CLIENT + VERSION]`. Expected: `[REFERENCE]`; actual: `[SPECIFIC ISSUE]`. Inspect the relevant MJML and compiled HTML, identify the likely client-specific root cause, and apply the smallest compatible correction without modifying unrelated sections. Rebuild and rerun available visual checks. Document what is actually verified versus what still requires a real-inbox check. Do not commit.

## 8 — Export and release report (do not send)

> Validate and compile the final email. Run strict lint, check absolute deliverable HTTPS image URLs, meaningful alt, all approved CTA/social links, hidden preheader, plain-text fallback, user-supplied sender address/legal copy and ESP-specific unsubscribe/merge tags. Record actual HTML byte size and Gmail clipping risk. Document real-client test matrix by client/version (or say NOT TESTED) and unresolved risks. Save final `dist/email.html` and `docs/QA_REPORT.md`. Do not deploy, upload, send or commit. Do not invent approvals or claim production-ready without client QA.

## 9 — Create a reusable module

> Use `$design-to-responsive-email` in `MODULE` stage for `[MODULE]`. Respect existing source framework and module conventions. Define required/optional inputs, spacing/fallback/reading-order rules and reusable CTA implementation. Compile and test short, long and empty content including images disabled and dark mode. Record actual client tests in `docs/CLIENT_MATRIX.md`. Do not rewrite unrelated modules. Do not commit.

## 10 — ESP personalization and post-ESP audit

> Use `$design-to-responsive-email` in `ESP QA` stage. Identify the real ESP, template type and approved official documentation. Do not guess merge-tag, sender-address, tracking or unsubscribe syntax. Complete `docs/ESP_INTEGRATION.md`; test missing and long personalization values. Compare pre-ESP compiled HTML with delivered/test-send HTML when available, check actual links and size. Mark unavailable checks `NOT TESTED`. Do not send real campaign or modify automation. Do not commit.

## 11 — Cross-client defect triage

> Use `$design-to-responsive-email` in `CLIENT DEBUG` stage for `[CLIENT/VERSION]` and screenshot. Complete `docs/DEBUGGING_PLAYBOOK.md`, isolate the smallest failing module, distinguish authoring, compiled and ESP-transformed differences, make a source-only fix, rebuild and retest failing and adjacent clients. Record real tests versus browser simulations. Stop after reporting. Do not commit.
