# <PROJECT> — WordPress Theme Rules

## Goal
Recreate the project's approved design with a maintainable, editable WordPress theme. Do not change the approved architecture or redesign sections without instruction.

## Stack and environment
- Theme type: <classic | block | hybrid — verified>
- Environment: <LocalWP or existing environment — verified>
- Editor/content approach: <core WordPress / ACF Free / other approved>
- Styling/build pipeline: <current tooling and version>
- Browser QA: <actual test tool, if available>

## Sources of truth
- Design references: <paths>
- Original assets: <paths>
- Design tokens: <path>
- Content model: <path>

## Invariants
- Use provided assets; never invent missing brand assets.
- No WordPress core modification, secrets in Git, or unrelated changes.
- Use WordPress APIs and contextual escaping; follow accessible semantic HTML.
- No unapproved plugins/frameworks or deployment/push.
- Preserve approved sections. Implement and verify one section per task.
- Test actual WordPress rendering and report limitations rather than inventing results.

## Working agreement
- Audit once; preserve and extend this file only when requirements change.
- Inspect relevant files before edits; do not read all unrelated docs each time.
- After changes: run real build/checks, compare relevant screenshots, describe gaps.
