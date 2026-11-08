# Verify Before Done — Codex agent skill

A portable skill to enforce evidence-backed completion for coding tasks. Supports Astro/static sites, Shopify themes, WordPress themes, and responsive HTML email workflows without overriding project-specific rules.

## Install

Copy this entire `verify-before-done` directory to one of:

- **Per repository:** `<repo>/.agents/skills/verify-before-done/`
- **Across all your Codex repositories:** `~/.agents/skills/verify-before-done/`

Then use `$verify-before-done` in Codex (or select it from `/skills`). Codex can also select it based on the description. If the skill is not detected, restart Codex.

## Example prompt

> Use $verify-before-done to verify the product-card changes. Compare the page against the approved desktop/mobile reference; run the project's existing checks and browser interactions. Show the acceptance matrix, evidence files and unresolved failures. Do not change unrelated code, update snapshots, publish, merge or deploy.

## Optional evidence recorder

The included stdlib-only script captures the **real exit status**, command, and log file. It does not claim that a passing command proves the feature correct:

```bash
python3 .agents/skills/verify-before-done/scripts/run_check.py \
  --out artifacts/verification/product-card \
  --name build \
  -- npm run build
```

Results go to `artifacts/verification/product-card/build.json` and `build.log` (review for secrets and decide whether to commit). Replace `npm run build` with an existing command appropriate to the project; do not run deploy/publish commands as verification.

The script is optional: explicit command exit codes and actual artifacts are sufficient if the environment lacks Python.

## Scope of the guarantee

This skill increases evidence quality and reproducibility; it cannot guarantee correctness or remove the need for code review on risky changes. Tool absence and missing baselines must be disclosed as blockers, not masked as success.

To audit a recorded command (not the whole feature):

```bash
python3 .agents/skills/verify-before-done/scripts/audit_checks.py \
  --dir artifacts/verification/product-card \
  --require build
```

A missing/failed check exits nonzero. Log SHA-256 helps detect accidental changes to logs, but is not tamperproof and does not independently prove behavior. Still complete the acceptance matrix and manual review.
