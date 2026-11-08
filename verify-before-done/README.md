# Verify Before Done — Codex skill (risk-adaptive edition)

Evidence-backed verification for completed coding tasks. Works with **Astro/static sites, Shopify themes, WordPress, and responsive HTML email**. Chooses **LIGHT / STANDARD / DEEP automatically** based on the changed files, requested behavior, and project-specific rules.

## Installation

Copy the entire `verify-before-done` directory to:

- **Current project:** `<repo>/.agents/skills/verify-before-done/`
- **All your Codex projects:** `~/.agents/skills/verify-before-done/`

If an older copy is installed, replace the **contents of the same skill folder** with this edition, retaining project-specific changes you intentionally made. Restart Codex if the skill isn't detected.

## Use

After an implementation:

> Use $verify-before-done to validate the current changes. Choose LIGHT, STANDARD, or DEEP automatically based on risk; show the level, run the appropriate existing tests, and report only evidence-backed results. Do not deploy, merge, or change unrelated code.

- **LIGHT:** Small content or isolated cosmetic adjustment; targeted checks and scoped diff inspection.
- **STANDARD:** Changed section, template, interaction, or page; relevant build, functional, desktop/mobile and reference checks.
- **DEEP:** Authentication, payments/cart integrity, privacy/data, migrations, global refactors, or production-impacting changes; broader regression and risk review.

The agent may **escalate**, and existing project gates always take precedence. A full test suite after every CSS tweak is *not* the objective. Missing required tooling produces **BLOCKED**, not fabricated success.

## Files and optional scripts

- `SKILL.md` — short routing and execution instructions
- `references/verification-levels.md` — scope/risk rules; examples and cost discipline
- `references/platform-checks.md` — platform-specific checks to load as needed
- `references/visual-proof.md` — mockup and viewport verification
- `references/acceptance-gates.md` — acceptance matrix and status rules
- `assets/evidence-report.md` — concise evidence report
- `scripts/run_check.py` and `scripts/audit_checks.py` — optional command record/audit helpers, **not** a substitute for behavior tests

Command evidence example (runs a real repo command):

```bash
python3 .agents/skills/verify-before-done/scripts/run_check.py \
  --out artifacts/verification/product-card --name build -- npm run build
python3 .agents/skills/verify-before-done/scripts/audit_checks.py \
  --dir artifacts/verification/product-card --require build
```

Logs might contain confidential information; review before uploading, sharing, or committing. A passing command never independently proves the feature correct. The skill does not authorize production operations.
