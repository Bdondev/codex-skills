# Approved design handoff

Use this reference when an implementation follows `mockup-to-design-spec` v2.0.

## Required inputs

Read only the global design index, the relevant section specification, the asset inventory, the implementation plan, and the corresponding original references. The handoff is the contract for implementation:

- `docs/DESIGN.md` defines source references, evidence labels, global tokens, section order, responsive strategy, accessibility requirements, and approved decisions.
- `docs/design/NN-section-name.md` (when present) defines the section’s layout, copy, assets, responsive behavior, components, interactions, and acceptance criteria.
- `docs/ASSET-INVENTORY.md` identifies available, missing, and uncertain assets. Missing assets remain explicit blockers or placeholders; do not silently substitute them.
- `docs/IMPLEMENTATION.md` defines prerequisites, build order, section checks, blockers, and validation evidence.

Do not regenerate or weaken an approved handoff. If a material implementation decision is absent, mark it proposed or unknown and ask for approval when it changes composition, content, behavior, or asset identity.

## Approval loop

For each section:

1. Confirm the section spec and original references are available.
2. Map the section to an existing component or create the smallest reusable component needed.
3. Implement and verify desktop/mobile behavior plus the section acceptance criteria.
4. Report evidence, missing assets, and deviations in the implementation notes or the project’s agreed tracking location.
5. Stop at the requested approval boundary. Do not modify already approved sections to solve an unrelated discrepancy without consent.

An approved deviation must state what changed, why, its scope, and who or what approved it. If the reference and the approved spec conflict, follow the approved decision and record the difference.
