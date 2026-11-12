# Manual skill evaluation scenarios

Proposed evaluations, not executed tests. Use disposable worktrees and known fixtures. Record selected mode, changed files, commands, screenshots when relevant, and PASS/FAIL/BLOCKED per expected behavior.

| Scenario | Prompt / fixture | Expected behavior |
| --- | --- | --- |
| Audit only | Inspect duplicate tokens and global overrides. | Findings with file evidence; no edits, installs or AGENTS changes. |
| Native card | Build a card using existing tokens and grid. | Native ownership, parent gap, component padding, shallow selectors. |
| Tailwind hero | Fix crop and type in existing Tailwind v4 Astro hero. | Compatible mode; retain utilities/tokens; compare screenshots. |
| Existing Sass | Fix SCSS specificity. | Preserve modules and build; no generated CSS edits. |
| Shopify instances | Vary colors on repeated sections. | Preserve schema/JS hooks; scope instance values. |
| WordPress conflict | Plugin styles override theme card. | Inspect cascade; theme fix; no core/plugin edit. |
| Mobile overflow | Oversized grid child at 390px. | Locate actual cause; no blanket clipping; recheck nearby widths. |
| GHL form | Embedded form clipped on mobile. | Fix wrapper sizing; no cross-origin field claims. |
| First project | CSS audit in new repo. | Defer kickoff and persistent setup; no unsolicited scaffold. |
| HTML email | Convert email mockup to HTML. | Defer to design-to-responsive-email. |
| Formal QA | Verify completed component. | Handoff to verify-before-done; no publish. |
| Missing tools | Build or browser unavailable. | Report blocked/unverified; no invented success or unapproved install. |

Before broad adoption, run applicable scenarios and resolve failures. Do not claim token savings or production readiness without measured evidence.
