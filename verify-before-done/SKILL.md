---
name: verify-before-done
description: Require evidence-backed completion for coding tasks. Use after implementing or modifying features, fixing bugs, matching mockups, changing Shopify themes, Astro websites, WordPress themes, or responsive HTML emails; also use when asked to validate, QA, review, prove, or finish work. Create acceptance checks, execute relevant tests, inspect results and visual evidence, and report PASS/FAIL/BLOCKED without claiming unverified success. Do not invoke for purely conceptual questions or code-free brainstorming.
---

# Verify Before Done

**Mission:** Replace "it looks done" with reproducible evidence tied to the user's actual acceptance criteria. Do not confuse a passing build with functional correctness, or a screenshot with a visual comparison.

## Operating rules

- Respect the user's scope and existing `AGENTS.md`, project rules, repo conventions, and approval boundaries. This skill adds a *verification gate*; it does not authorize unrelated refactors, installing dependencies, deployments, production writes, commits, pushes, merges, or publishing.
- Verify with real execution on the current implementation; rerun affected checks after code changes. Never invent output, screenshots, pass rates, commands, or links. Distinguish **PASS**, **FAIL**, **BLOCKED**, and **NOT_APPLICABLE** at the check level. A missing tool, inaccessible preview, missing reference, or skipped test is **BLOCKED**, not PASS.
- Keep a concise acceptance matrix. For each material requirement, define an observable result and evidence source **before** deciding completion. Avoid relying only on self-written tests; include negative/edge cases and review the implementation diff.
- Do not install new tooling or alter shared CI/testing configuration merely for verification without appropriate authorization. Reuse what is in the repo. Propose missing coverage and clearly report the limitation.
- Do not expose secrets, personal data, access tokens, or private store content in test logs, screenshots, or reports. Inspect artifacts before sharing or committing them.
- A task is **VERIFIED** only if all applicable required acceptance checks PASS and no unresolved critical risks remain. A **PARTIAL** or **BLOCKED** outcome is not a failure to be honest; state what could and could not be proved.

## Workflow

1. **Audit** — Read task, `AGENTS.md`, existing scripts/tests and config, changed files, project framework, preview availability, and authoritative reference assets. Check `git status` so unrelated changes remain untouched.
2. **Define proof** — Create a short acceptance matrix: `ID | expected behavior | verification method | required? | status | artifact`. Include at least one negative/edge case for interactive behavior. For mockup work, name reference image(s) and viewport(s). See [acceptance matrix](references/acceptance-gates.md).
3. **Choose gates** — Apply only gates relevant to touched code and risk. Minimum normally: static/build or syntax validation, behavioral verification for changed behavior, and diff inspection. Add visual checks when appearance changes, accessibility checks for UI changes, and integration checks when external services are involved. Follow [platform checks](references/platform-checks.md).
4. **Execute and record** — Run real repo commands, capturing exit code and output, e.g. `python3 <skill-root>/scripts/run_check.py --out artifacts/verification/<task-id> --name build -- npm run build`. A zero exit code shows only that *that command* passed; decide whether it tests the acceptance criterion. Attach actual artifacts (screenshots, traces, logs, diff report) and note environment/limitations.
5. **Inspect independently** — Check diff against acceptance criteria; review failure paths, mobile behavior, a11y, data safety, and regressions. For UI compare same viewport with *authoritative* reference, not screenshots of the implementation alone. Use Playwright snapshots/diffs when available; inspect meaningful differences yourself. See [visual proof](references/visual-proof.md).
6. **Repair carefully** — If a gate FAILS, make an in-scope correction and rerun the failed check **and dependent checks**. After two unsuccessful fix/verify cycles or an unknown blocker, stop repeating guesses, report the evidence, and escalate the decision. Don't silently reduce test coverage or update a visual baseline to make a mismatch disappear.
7. **Report** — Fill out [evidence report template](assets/evidence-report.md) or give an equivalent concise final message. State exactly what was tested; provide command exit codes and artifact paths, note anything not tested, and use one of these final states:
   - **VERIFIED**: all required checks actually passed; no unresolved critical blockers.
   - **PARTIAL**: material work exists but at least one requirement is unverified or failing; enumerate blockers/failures.
   - **BLOCKED**: essential verification cannot proceed (environment, permissions, unavailable reference/service).

## Multi-agent handoff (when an agent team exists)

- The implementer supplies the task's acceptance matrix, changed-file scope, reproduction steps, and exact test commands. Status is **READY_FOR_QA**, not VERIFIED.
- An available reviewer/QA agent independently inspects the actual diff, reruns applicable gates on the current changes, and challenges the implementer's assumptions. If no independent reviewer exists, explicitly label the verification **self-checked**; do not claim independent review.
- A merge/deploy agent proceeds only after the required checks pass **and** the normal branch/review approvals are satisfied. This skill never grants merge or deployment permission.

## Proof over ceremony

- For a **tiny non-UI change**, a targeted test plus diff inspection may be enough; don't demand heavyweight screenshot infrastructure.
- For a **UI section**, require desktop/mobile inspection *and* an actual reference comparison if pixel fidelity is an acceptance criterion.
- For **interactive storefront behavior**, verify actions and resulting state (e.g., actual selected variant and cart state), not merely rendered markup.
- For **high-risk or production-impacting changes**, request human approval and additional review even if automated gates pass. Evidence reduces uncertainty; it does **not** guarantee correctness.
- Never state “fully tested,” “pixel-perfect,” “production-ready,” or “accessible” unless the relevant evidence truly supports that exact scope. If no comparison baseline or testing environment exists, say so.

## Integration

Install in `<repo>/.agents/skills/verify-before-done/` for repo scope or `~/.agents/skills/verify-before-done/` for use across projects. Invoke explicitly in Codex with `$verify-before-done` at the end of a feature task. Do **not** rewrite `AGENTS.md` automatically. If the user wants it always applied, propose the one-line snippet in [acceptance gates](references/acceptance-gates.md).
