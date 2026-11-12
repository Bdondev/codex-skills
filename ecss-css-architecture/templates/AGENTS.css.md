## CSS architecture

- Preserve the approved styling stack and canonical design tokens; do not migrate frameworks or add tooling without approval.
- Keep custom component styles and responsive rules with their owner; parent layouts own inter-component spacing.
- Use semantic HTML, purposeful selectors, modest specificity and fluid layout. Fix accidental overflow at its cause.
- Use `$ecss-css-architecture` for substantial CSS architecture work or responsive diagnosis; respect platform skills and formal QA requirements.
- Run applicable project checks and report exceptions and unverified results.

Merge only relevant stable rules into existing AGENTS.md during explicitly approved setup. Remove this instruction line when adopting the snippet.
