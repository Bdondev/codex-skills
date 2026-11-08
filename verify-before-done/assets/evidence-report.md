# Verification report — <task title>

- **Result:** VERIFIED | PARTIAL | BLOCKED
- **Repository / branch / commit:** <record current state or 'not available'>
- **Scope:** <which files/features were changed>
- **Verifier:** implementer (self-checked) | independent QA agent | human reviewer
- **Environment:** <local/staging, commands and versions if relevant>

| ID | Acceptance requirement | Result | Evidence |
|---|---|---|---|
| A1 | <observable behavior> | PASS / FAIL / BLOCKED / NOT_APPLICABLE | <test log / screenshot / trace / observation> |

## Executed checks

| Check | Exact command | Exit | Evidence |
|---|---|---|---|
| Build | `<command>` | <number or BLOCKED> | `<path>` |

## Review notes

- **Visual comparison:** <reference, viewport(s), actual comparison and findings; or BLOCKED>
- **Regression / edge cases:** <tested behavior and observed result; or BLOCKED>
- **Accessibility:** <checks performed and findings; or BLOCKED>
- **Unresolved risk:** <what remains unknown and why>
- **Next action:** <specific action to close a failing/blocked requirement>

**Claim boundary:** Only the checks explicitly recorded above were verified. No deployment or production readiness is implied unless independently authorized and tested.
