# Verification report — <task title>

- **Verification level:** LIGHT | STANDARD | DEEP
- **Why:** <one-line scope/risk reason; note any escalation>
- **Result:** VERIFIED | PARTIAL | BLOCKED
- **Repository / branch / commit:** <current state or 'not available'>
- **Scope:** <which files/features were changed>
- **Verifier:** implementer (self-checked) | independent QA agent | human reviewer
- **Environment:** <local/staging; relevant versions when useful>

| ID | Required acceptance criterion | Result | Evidence |
|---|---|---|---|
| A1 | <observable requirement> | PASS / FAIL / BLOCKED / NOT_APPLICABLE | <path, command, assertion, observation> |

## Executed checks (only actual runs)

| Check | Exact command or method | Exit / outcome | Evidence |
|---|---|---|---|
| Targeted validation | `<command>` | <exit code or BLOCKED> | `<path>` |

- **Visual/reference comparison:** <if required: approved reference, viewport(s), findings; otherwise N/A>
- **Behavior/edge cases:** <positive and failure-case evidence when applicable>
- **Unverified / blocked:** <what could not be proven, why, and whether required>
- **Next action:** <only when necessary>

**Claim boundary:** Only checks actually reported above were verified. No production-readiness or deployment claim is implied.
