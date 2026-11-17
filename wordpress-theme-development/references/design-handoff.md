# Approved design handoff

`mockup-to-design-spec` v2.0 is the design-audit boundary. When its outputs exist, treat these files as approved inputs, not drafts to rewrite:

| Artifact | Use in WordPress work |
|---|---|
| `docs/DESIGN.md` | Global tokens, section index, responsive and accessibility requirements |
| Relevant `docs/design/NN-*.md` or equivalent section spec | The scoped section's layout, content, assets, responsive states and acceptance criteria |
| `docs/ASSET-INVENTORY.md` | Asset provenance, dimensions, status, alt-text notes and missing-asset decisions |
| `docs/IMPLEMENTATION.md` | Ordered build plan, platform requirements, validation evidence and blockers |

Read only the global spec, relevant section spec, asset rows and implementation steps for a section task. Preserve approved wording and decisions. Do not regenerate an equivalent `design-spec.md`, asset map or implementation plan. If older names exist, map them once in the project docs and retain the approved files.

## Handoff rules

- The original reference remains the visual source of truth; approved user decisions override it and must be recorded.
- Preserve evidence labels: measured, observed, estimated, proposed and unknown.
- Use paths that exist. Missing assets stay explicitly missing; do not create substitutes or claim extraction from a screenshot.
- Convert each visible section into one or more implementation targets: template, template part, pattern, core block composition or registered block. Record the mapping in the implementation plan or section handoff.
- Add WordPress field names and source objects to the section's dynamic-fields table. Mark mappings proposed until verified in the running site.
- Append deviations with reason, impact and verification status. Never silently “correct” the approved specification.

If the v2.0 artifacts are absent, stop before implementation when the missing design decisions would affect layout, assets, content model or responsive behavior. A separate mockup-to-design-spec audit may be requested; this skill does not recreate that audit inside a theme build.
