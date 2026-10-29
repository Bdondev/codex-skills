---
name: design-to-responsive-email
description: Convert email designs into responsive HTML and engineer/debug existing templates with Codex. Use for image slicing strategy, table-based or MJML workflows, reusable modules, real-client QA, ESP integration, accessibility and release audits. Validate the compiled and ESP-processed HTML, not only its source.
---

# Design → Responsive HTML Email

Convert approved email designs into maintainable inbox-oriented HTML. Use an **asset-first, section-by-section** process. Never turn an entire email into a flattened screenshot. Choose MJML, hand-coded presentation tables, or the project’s existing framework based on requirements; **do not force MJML**. The final compiled/ESP-processed HTML is the rendering evidence, while the editable source remains the maintainable source of changes.

**Campaign-specific truth hierarchy:** approved copy and URLs > original high-resolution design/source assets > screenshot evidence > documented proposal. Never infer unseen text, exact colors, working URLs, claims, promotions, dates, legal addresses, or ESP tokens from a fuzzy screenshot. Treat user-provided source artwork as authoritative; AI reconstructions are *new approximations*, not exact extractions.

## On invocation: choose the stage, don't load everything

1. Inspect current project, `AGENTS.md`, reference design(s), assets, approved brief, available platforms and relevant files.
2. Classify the task: `AUDIT`, `SLICE PLAN`, `ASSET AUDIT`, `FOUNDATION`, `ONE SECTION`, `MODULE`, `BUTTON`, `ACCESSIBILITY`, `BROWSER QA`, `CLIENT DEBUG`, `ESP QA`, or `RELEASE`. For an existing template, begin at the requested stage without re-scaffolding.
3. Read only resources needed for that stage (see below); don't re-read all references on every section. Proceed with available inputs, clearly marking missing production blockers.
4. Preserve already-approved sections and working assets; do not overwrite user originals. **No commits, sending, publishing, or ESP automation changes unless requested.**
5. End every stage with changed files, evidence/tests run, observed deviations, remaining risks, and the next logical gate. Never claim 'production-ready' without required real-inbox and ESP checks.

## Gate A — Design audit (stop before coding)

- Inventory designs at all provided breakpoints, approved copy/links, original design layers, source photographs, branding, ESP, target audience/clients. If there is only a low-resolution 225px-wide screenshot, it is a layout reference, not reliable production photography.
- Build a numbered section map: live heading/body, decorative image(s), composition and overlap, desired order on mobile, email-safe layout treatment, images-off behavior, expected interactions, uncertainty.
- Default desktop wrapper **approximately 600px**; responsive/fluid at 390 and 320px. Record as a proposed starting point, not a measured source value.
- Create `docs/CAMPAIGN_BRIEF.md`, `docs/DESIGN_SPEC.md`, `docs/ASSET_MANIFEST.csv`, `docs/ACCEPTANCE_CRITERIA.md`, and `docs/SECTION_BUILD_PLAN.md` from `templates/`. Merge `templates/AGENTS.email.md` into existing project rules rather than replacing them.
- Label findings as `Provided`, `Observed`, `Proposed`, or `Missing/Needs confirmation`. If the task is a planning pass, stop and report blockers. Reference `templates/CODEX_PROMPTS.md` stage 1.

## Gate B — Prepare and slice assets (before build)

For each visual, decide **LIVE HTML**, **SEPARATE IMAGE**, **DECORATIVE COMPOSITE**, or **BACKGROUND WITH FALLBACK** using `references/asset-decisions.md` and `templates/ASSET_SLICING_PLAN.md`.

- Headings, descriptions, nutrition/product details, offer terms, CTA text/links, legal/unsubscribe stay live wherever practical. Use a real HTML CTA; never rasterize a button that must be clicked.
- Export photos separately when possible. Export composited *decorative* overlap when fragile negative margins, absolute positioning or layering would otherwise be needed. **Do not bake essential copy into a composite without a visible live-text equivalent.**
- Examples verified in the source Notion guide (illustrative, not generic asset names):
  - Hero: model + green background + 30%-off decoration as source working layers when feasible; one optimized final artwork composite if needed; logo separate; CTA live.
  - Autumn Harvest: bowl and pumpkin as distinct working PNGs, card/heading/description/five nutrition cells/CTA as live HTML. If bowl crosses the white card border, compare an email-safe adjusted layout with an *artwork-only lower-card-plus-bowl composite*, preserving all text in live HTML.
  - Meet the Grower: spinach/bowl/farm-name/top-label/arrow montage may need one decorative composite, with farmer/tractor photograph separate. Retain farm story and required farm identification in live text when possible.
  - Loyalty: phone/hand visual image; live headline and join CTA. Footer: logo/social icon files when supplied; legal/unsubscribe live.
- Prefer JPEG for rectangular photography, PNG for transparent artwork; avoid relying on WebP for broad email support. Suggested source dimensions (e.g. ~1200px for a 600px display) are **guidance, not guaranteed extraction dimensions**; record actual source width/height and never present upscaling as recovered detail.
- Keep originals unchanged; place processed output in `assets/optimized/`. For final sends, image URLs must be accessible over HTTPS (or supported ESP-hosted assets), not local paths.
- Run `node <skill>/scripts/audit-assets.mjs assets/ --out docs/ASSET_AUDIT.md` if Node is available; compare measured dimensions/transparency candidates with manifest. The script inspects files, **not** visual quality or source authenticity.
- Do not start email code until asset choices and missing assets have been documented. See `references/case-study-autumn-harvest.md`, `templates/IMAGE_SLICING_PROMPTS.md`, and prompt stages 2–3.

## Gate C — Foundation (structural pass only)

- Choose MJML (`src/email.mjml` → `dist/email.html`), durable table HTML, or the already-approved project email compiler (e.g. partials/ESP templates). Keep presentation-table layouts with inline critical styles, explicit colors and widths, semantic reading order, preheader, robust font stack, alt text, and a 600px-centered/fluid-mobile design by default.
- Avoid CSS Grid/Flexbox, absolute positioning, unsupported web-only CSS and background images for **essential** content; selectively use tested Outlook conditionals/VML where justified.
- Create placeholders for missing user facts; placeholders block release. Configure `npm run validate` (strict MJML validation, if MJML) and `npm run build`; compile now and stop before styling individual sections. `starter/` is an optional *project* scaffold, not part of the campaign itself.
- Read `references/email-engineering.md` and foundation prompt stage 4.

## Gate D — Build *one* section

- Follow `docs/DESIGN_SPEC.md`, asset manifest, and approved section plan. Preserve the design's hierarchy, crop and spacing as far as verified assets/email-client behavior permit. Keep live copy and real accessible CTA links; use compatible tables and sane fallback colors.
- Implement only the named section, keeping previously completed sections stable. Compile, lint, then visually inspect browser at **320, 390, and 600px** (plus desktop 1440px for full context) if browser tooling exists. Report mismatch with screenshot and expected Outlook risks; **stop** after the named section and don't commit.
- Don't force exact decorative overlap at the expense of real inbox compatibility. Document any intentional visual compromise.
- Use section prompt stage 5 and `templates/SECTION_QA.md`.

## Gate E — Automated browser checks + client QA

- Run the project’s validate/build commands, then `node <skill>/scripts/validate-email.mjs dist/email.html --type marketing --strict` (choose `transactional` for transactional mail); re-run on the ESP-transformed HTML if it can be exported. The HTML validator is heuristic: its pass is **not** an accessibility/compliance or client-compatibility certificate.
- Optional Playwright script (`starter/tests/visual-qa.mjs`): captures 320, 390, 600, and 1440px browser screenshots, basic overflow/image/link diagnostics and `docs/QA_REPORT.md`; requires `playwright` and Chromium to be installed in the *project*. Browsers are not mail clients.
- QA in target real clients (Gmail web/mobile, Apple Mail iOS, relevant classic/new Outlook versions) using Litmus/Email on Acid or actual tests. Include dark mode, images disabled, CTA destinations, alt, footer/legal and ESP merge syntax. Don't silently declare any unchecked item passed.
- Record UTF-8 HTML source bytes: aim for **<80–90 KB before ESP transforms** when practical, warn near **90 KB**, and treat **~102 KB** as a Gmail clipping-risk boundary, **not a universal hard cutoff**. Tracking, personalization and ESP changes can increase size.
- For screenshot/client issue: reproduce, narrow scope, make smallest compatible correction, rerun checks, report tested clients separately. See `references/qa-and-release.md` and stages 6–7 of prompts.

## Specialized passes: module, button, accessibility, compatibility, ESP

- **MODULE:** reuse the existing source framework, create table-based fallback that reads without media queries, test short/normal/long copy and missing values, document tested clients. See `references/module-and-debugging.md`.
- **BUTTON:** start with a live-text link in a presentation table; choose conditional-padding, padding/border or VML only with evidence. **Table-cell padding alone may leave only text clickable in classic Outlook; anchor padding is also inconsistent there.** See `references/button-patterns.md`. Never promise uniform click target or rounded corners without client testing.
- **ACCESSIBILITY:** review lang, reading order, heading/link semantics, alt/decorative `alt=""`, contrast, images-off, font fallback, tap target, plain-text body and screen-reader behavior. Report what was manually inspected versus inferred.
- **CLIENT DEBUG:** identify exact client/version, capture expected/actual with images/dark-mode states, isolate a minimal failing module, change source not dist, rebuild and retest failing **and adjacent** clients. Use `templates/DEBUGGING_PLAYBOOK.md`.
- **ESP QA:** determine ESP and campaign type; use **only verified** syntax for personalization, conditional/loop blocks, unsubscribe and address fields; test empty and long values, tracked links, hosted assets and **post-ESP** HTML. Platform processing may change layout/byte size. See `references/esp-and-compiled-output.md`.

## Gate F — Release preparation (never send automatically)

- Verify approved content and offers; exact links, image hosting, unsubscribe/address and ESP tokens, alt and images-off reading, plain-text version, compiled **and ESP-transformed** HTML byte size, tested clients and limitations. A `.txt` file is not itself a MIME multipart send; the sending platform must supply `text/plain` plus `text/html`.
- Produce editable authoring source + compiled HTML + QA report. Mark `READY` only if required real-client tests and campaign owner approval are documented; otherwise `NEEDS QA` or `BLOCKED`.
- Do not send, deploy, upload or commit unless explicitly requested. Use prompt stage 8 and `references/qa-and-release.md`.

## Load just the reference you need

| Stage | Reference |
|---|---|
| Audit | `templates/CODEX_PROMPTS.md`, `templates/DESIGN_SPEC.md`, `templates/SECTION_BUILD_PLAN.md` |
| Slicing | `references/asset-decisions.md`, `templates/ASSET_SLICING_PLAN.md`, `templates/IMAGE_SLICING_PROMPTS.md` |
| Harvest/grower example | `references/case-study-autumn-harvest.md` |
| Foundation/section | `references/email-engineering.md`, `templates/SECTION_QA.md` |
| QA/export | `references/qa-and-release.md`, `references/client-matrix.md`, `scripts/validate-email.mjs`, `starter/tests/visual-qa.mjs` |
| Modules/client issue | `references/module-and-debugging.md`, `templates/DEBUGGING_PLAYBOOK.md` |
| Buttons | `references/button-patterns.md` |
| ESP/personalization | `references/esp-and-compiled-output.md`, `templates/ESP_INTEGRATION.md` |

Source scope and changes: `references/source-notes.md` and `CHANGELOG.md`.
