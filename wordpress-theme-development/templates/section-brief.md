# Single-section Codex task

Use the `$wordpress-theme-development` skill.

**Section:** <name>
**Design reference:** <specific reference image path>
**Source assets:** <existing asset paths or asset map>
**Existing component/location:** <file path or new file>
**Editing requirements:** <core WP / fields / fixed / editable>
**Target viewports:** <matching reference width> desktop; 390px mobile; other widths when relevant

Implement ONLY this section and integrate it into the existing WordPress homepage without altering approved sections. Follow root `AGENTS.md`, the current architecture, design tokens, and the skill's section workflow. Use original assets and semantic, accessible markup. Do not invent fonts, colors, copy, or assets.

1. Inspect the relevant files/reference and briefly state the plan.
2. Implement only the scoped files and required content wiring.
3. Run the project's real build and PHP checks.
4. Render the local WordPress URL, capture desktop/mobile screenshots and compare to the reference.
5. Correct the largest meaningful differences; test keyboard and mobile behavior.
6. Report files changed, tests actually run, remaining discrepancies and next logical task.

Do not install plugins or dependencies unless required and approved. If LocalWP or browser tests are unavailable, state that clearly; do not claim visual verification.
