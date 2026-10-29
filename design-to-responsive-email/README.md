# Design → Responsive HTML Email (Codex skill) v1.2.0

A reusable **asset-first and section-gated** Codex skill for converting approved screenshots, Figma exports or email mockups into responsive, maintainable HTML email. Includes an MJML starter, screenshot/slicing decisions, stage-specific prompts, email-client QA guidance, a source-image metadata audit and optional browser screenshot automation.

Based on the connected Notion guide and the user's **HTML Email Development Agent Instructions — 2026 Edition**. The latter adds modular design, compiled/ESP output review, client-specific debugging and ESP/merge-tag QA. It is campaign-agnostic. Sweetgreen examples are illustrations; no brand-owned original image files or high-resolution crops are bundled.

## Installation or upgrade (macOS, Codex)

Extract the ZIP. Copy its one top-level folder to your Codex skills location:

```bash
mkdir -p "${CODEX_HOME:-$HOME/.codex}/skills"
cp -R design-to-responsive-email "${CODEX_HOME:-$HOME/.codex}/skills/"
```

If the skill is already installed, inspect any local customization **before** replacing files. To compare two directories, use `diff -ru path/to/old/design-to-responsive-email path/to/new/design-to-responsive-email`. Restart/reopen the Codex session if it does not notice the updated skill.

## First prompt

```text
Use $design-to-responsive-email to audit this email mockup and the assets in my repo.
Create the design spec, asset slicing plan, asset manifest and section build plan.
Identify missing high-resolution sources and any copy/link blockers.
Do not implement the email yet. Stop after the planning gate. Do not commit.
```

For subsequent steps see `templates/CODEX_PROMPTS.md` (11 copyable prompts, including modules, ESP audit, and isolated client debugging).

## Recommended workflow

1. **Audit first**: distinguish observed design details, user-approved copy, proposals and unresolved facts.
2. **Plan slices**: keep headline/product/offer/CTA/legal content live; cut photos and art separately. Composite only decorative, overlap-sensitive artwork where necessary.
3. **Audit assets**: inspect actual dimensions, transparency-channel potential and image formats; preserve originals and create optimized copies in a separate directory.
4. **Build foundation**: choose MJML or the existing project email framework, roughly 600px max desktop wrapper, fluid mobile layout, conservative table-based CSS and hidden preheader. No React/Astro/Tailwind runtime in compiled email.
5. **Implement one section per pass**: validate/compile/check at 320, 390 and 600px; preserve completed sections.
6. **Test**: compiled HTML lint + browser screenshots + actual client matrix + ESP post-processing/test-send with personalization edge cases (separate evidence).
7. **Export** source, compiled HTML, plain-text alternative and evidence of ESP test send after appropriate approvals. **Do not send automatically.**

## Optional project starter

`starter/` is a starting campaign **project**, not something to execute inside your installed skill folder. Copy its contents to an empty campaign directory, then run:

```bash
npm install
npm run validate
npm run build
node "${CODEX_HOME:-$HOME/.codex}/skills/design-to-responsive-email/scripts/validate-email.mjs" dist/email.html --type marketing
```

This starter intentionally includes placeholder brand, offer and compliance content. No placeholder is approved for sending. If you want automated browser screenshots:

```bash
npm install --save-dev playwright
npx playwright install chromium
npm run visual:qa
```

The optional browser script captures **320 / 390 / 600 / 1440px** screenshots to `tests/screenshots/` and writes `docs/QA_REPORT.md`. It does **not** simulate Gmail, Apple Mail, or Outlook rendering. Use Litmus, Email on Acid, actual inbox accounts/devices or other appropriate real-client testing.

## Audit image files (zero dependencies)

From inside your campaign repo:

```bash
node "${CODEX_HOME:-$HOME/.codex}/skills/design-to-responsive-email/scripts/audit-assets.mjs" assets/ --out docs/ASSET_AUDIT.md
```

Reports each recognized image's format, intrinsic width/height, bytes and possible alpha channel. It **cannot** evaluate visual sharpness, actual transparent pixels, copyright or authenticity. Compare each dimension against its desired display width (2x only if source pixels actually exist).

## New in v1.2: production engineering gates

- `references/button-patterns.md` — choose between padding, padding+border, conditional-padding and Outlook VML on measured needs (clickable area matters).
- `references/esp-and-compiled-output.md` — authoring, compiled, post-ESP and MIME delivery are four different things.
- `references/client-matrix.md` and `templates/CLIENT_MATRIX.md` — real client/version/state testing with **NOT TESTED** defaults.
- `references/module-and-debugging.md`, `templates/EMAIL_MODULE.md`, `templates/DEBUGGING_PLAYBOOK.md` — reusable modules and localized bug triage.
- `templates/ESP_INTEGRATION.md`, `templates/PLAIN_TEXT.txt` — official-syntax merge tags, post-ESP tracking tests and text/plain preparation.

The 80–90 KB pre-ESP HTML goal is a *budget*. Around 102 KB is a Gmail clipping-risk indicator, not a guarantee. Building `dist/email.html` and passing browser checks do not prove Outlook/Gmail support.

## Why separate bowl/pumpkin and optional composite?

The Sweetgreen Autumn Harvest graphic has a bowl crossing the white text card's border. Working cutouts of bowl/pumpkin preserve flexibility; a decorative lower-card/bowl composite can preserve overlap without brittle absolute positioning. The heading, description, nutrition values and clickable CTA **must still be HTML**. The alternative is to keep the card as HTML and place the bowl in a less visually exact position. Choose after inbox testing and record the compromise.

## What was verified?

- **Verified from page:** current connected Notion guide contains a ten-stage Codex/MJML workflow and appended image slicing discussions. Details/limits captured in `references/source-notes.md`.
- **Verified locally:** the bundled Node unit tests for asset metadata and compiled-email heuristic validation were executed on 2026-10-29.
- **Not verified:** actual Sweetgreen source art or crop fidelity, full MJML compilation against a specific client project, Playwright browser runtime in the user's Mac, real inbox compatibility, ESP setup or any email send.

## Package contents

```text
design-to-responsive-email/
├── SKILL.md
├── README.md
├── CHANGELOG.md
├── references/              # email engineering, slicing, source-notes, QA, case study
├── templates/               # brief, design spec, asset/slicing/section plans, prompts, QA
├── scripts/
│   ├── audit-assets.mjs     # zero-dependency file metadata
│   └── validate-email.mjs   # zero-dependency heuristic HTML lint
├── starter/
│   ├── package.json
│   ├── src/email.mjml
│   ├── scripts/validate-mjml.mjs
│   ├── tests/visual-qa.mjs  # optional Playwright (requires installation)
│   └── assets/README.md
└── tests/                    # Node unit tests for the above auditors
```
