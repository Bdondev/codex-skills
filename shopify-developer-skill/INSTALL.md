# Shopify Developer — 2026 Codex skill

The archive contains the ready-to-use folder at `.agents/skills/shopify-developer/`.

## Install in one repository

Extract the ZIP in the repository root, preserving the `.agents/` folder. Or copy just `shopify-developer/` to `<repo>/.agents/skills/`.

## Install for every project (macOS/Linux)

Copy the skill directory to `$HOME/.agents/skills/shopify-developer/` instead. Do not install in both locations unless you intend to see duplicate skill names.

## Call it in Codex

Run `/skills` to confirm discovery, then mention `$shopify-developer` in a task:

- `$shopify-developer Audit this Shopify theme architecture and report risky/deprecated patterns before editing.`
- `$shopify-developer Build the product accordion from the supplied design, with editable schema settings. Work section by section and test at 1440px and 390px.`
- `$shopify-developer Fix the cart drawer quantity update bug without breaking selling plans or localization. Run Theme Check and explain what remains untested.`
- `$shopify-developer Determine whether this discount logic belongs in Liquid, Checkout UI, or Shopify Functions. Check plan and API requirements before coding.`

Codex can also select the skill automatically for Shopify tasks based on its `description`. If it is not visible, restart Codex.

## What's included

- `SKILL.md`: routing, 7-step workflow, guardrails, output standard.
- `references/`: scoped guidance for themes, JS/cart, quality, apps/checkout, testing/deployment and official docs.
- `assets/AGENTS.shopify.md`: short project-level AGENTS.md starting template, for intentional project setup only.

## Scope and limitations

Instruction-only: no executable scripts, dependencies, Shopify store access or API keys are bundled. It does not install Shopify CLI or grant production access. Rules were checked against official documentation as of November 11, 2026, but should be rechecked as the platform evolves.
