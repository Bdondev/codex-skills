---
name: verify-before-done
description: Verify a completed coding change with risk-proportionate evidence before declaring it done. Use when asked to QA, validate, review, prove, or finalize an implemented feature or fix; select LIGHT, STANDARD, or DEEP automatically. Do not use for brainstorming, planning-only requests, or every routine edit without a verification request.
---

# Verify Before Done

**Goal:** Prove the requested outcome with the smallest *sufficient* set of real checks. More checks do not automatically mean better evidence.

## Procedure

1. **Inspect scope:** Read the request, applicable `AGENTS.md`, changed files / `git diff`, existing test commands, and any approved design references. Respect repository-specific requirements; never rewrite `AGENTS.md` by default.
2. **Choose verification level automatically** using [risk-based levels](references/verification-levels.md):
   - **LIGHT** — isolated, low-risk copy/style/config adjustment without changed behavior.
   - **STANDARD** — new/changed component, page, interaction, template, or API behavior.
   - **DEEP** — security, auth, payment/cart integrity, privacy/data, migrations, production-facing configuration, broad refactors, or substantial cross-component regressions.
   - If unclear, start at **STANDARD**. Escalate for actual risk or failures; never downgrade a project-required gate to save tokens. Briefly record the level and why.
3. **Define proof:** For each material acceptance criterion, choose an observable check. Follow [acceptance gates](references/acceptance-gates.md). Do not invent or silently change the user's criteria.
4. **Run only applicable checks** for the chosen level and framework. Prefer existing tools and focused tests; see [platform checks](references/platform-checks.md). Include real browser interactions for behavioral claims, and reference comparisons for visual-fidelity claims: [visual proof](references/visual-proof.md).
5. **Inspect actual results and diff.** Record exit codes, relevant logs, screenshots, and unresolved gaps. `scripts/run_check.py` and `scripts/audit_checks.py` are **optional** for reproducible command evidence. Don't paste huge logs into context: capture files and summarize failures.
6. **Repair and recheck** affected gates when authorized. After two unsuccessful fix/check cycles, stop guessing and report what blocks completion. Never silently update visual baselines or remove failing tests.
7. **Report concisely** using [evidence template](assets/evidence-report.md): selected level, PASS/FAIL/BLOCKED per required criterion, artifact locations, and final **VERIFIED**, **PARTIAL**, or **BLOCKED** status.

## Boundaries

- A command passing does **not** prove the feature correct. A screenshot is not a comparison. Self-review is not independent review.
- Mark an unrun **required** test **BLOCKED**, never PASS. **VERIFIED** requires all required criteria to PASS with no unresolved critical risk.
- Reuse installed tooling; don't install packages, run destructive scripts, push/merge, deploy, publish, or modify live stores without explicit authorization.
- Protect secrets in logs/screenshots; review artifacts before sharing or committing.
- Independent human review remains important for high-risk changes, even if every automated check passes.

## Agent handoff

An implementer hands off `READY_FOR_QA` with changed-file scope and test evidence. An available reviewer independently reproduces essential checks; otherwise label the result **self-checked**. Merge/deploy requires existing branch approvals and separate authorization, not merely this skill's VERIFIED label.

**Usage:** `$verify-before-done` — optionally specify `LIGHT`, `STANDARD`, or `DEEP` to *increase* coverage. Automatic selection is the default.
