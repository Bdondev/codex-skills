# Install and use

Copy the entire `mockup-to-design-spec` folder into your project's `.agents/skills/` for Codex or `.claude/skills/` for Claude Code. For personal use, use the corresponding directory under your home folder. Skill discovery depends on your installed client version; consult its documentation if the skill does not appear.

Codex example: `$mockup-to-design-spec Audit references/desktop.png and references/mobile.png for a WordPress theme. Do not implement yet.`

Claude Code example: `/mockup-to-design-spec Audit references/desktop.png for a Shopify theme. Record missing mobile details.`

The skill is framework-neutral and requires no scripts or external dependencies. Image inspection and optional cropping depend on the agent's available tools. The skill does not generate or reconstruct images.

## v2.0 — Dynamic email
Example: `$mockup-to-design-spec Audit references/email.png for MJML + Klaviyo. Document dynamic content and synthetic portfolio preview requirements. Do not implement yet.`

Supported references: MJML, Klaviyo Django-style, Django, SFMC AMPscript, Liquid, LiquidJS, Handlebars, Jinja2, HubL and FreeMarker/Responsys. The skill generates EMAIL-DESIGN.md, DYNAMIC-CONTENT.md and EMAIL-QA.md alongside the original design files. Only selected platform references are loaded. Replace the old skill folder with this version; preserve any local customizations separately.
