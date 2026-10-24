# Visual Identity Transfer — reusable image editing skill

Built from the user's GTA-inspired poster identity-and-outfit-transfer brief.

## Included
- `plugin.json`: portable Agent Plugins manifest; no external app or account required.
- `skills/poster-identity-outfit-transfer/SKILL.md`: executable instruction workflow for hosts supporting Agent Skills.
- `skills/poster-identity-outfit-transfer/templates/chatgpt-images-prompt.md`: copy-and-paste prompt for ChatGPT Images or another editor.
- `skills/poster-identity-outfit-transfer/templates/edit-spec.json`: reusable edit spec for other subject/outfit/poster combinations.
- `skills/poster-identity-outfit-transfer/examples/gta-inspired-poster.md`: user's specific worked GTA-inspired poster example.
- `skills/poster-identity-outfit-transfer/references/quality-checklist.md`: a validation rubric plus localized fixes.

## Use in ChatGPT Images
For accounts that cannot install a skill, attach (1) the original full-resolution poster and (2) the portrait/outfit reference, then paste `templates/chatgpt-images-prompt.md` or the worked example as instructions. A screenshot of a previous Gemini result is not a substitute for both original images.

For accounts eligible to use/install Skills, upload this package through the Skills/Plugins experience when the capability is available. Eligibility and installation vary by plan and product. Merely uploading a ZIP as a chat attachment is not the same as installing it as a skill.

## Use in Codex
Place `skills/poster-identity-outfit-transfer/` in a skills discovery path such as `.agents/skills/poster-identity-outfit-transfer/` for a repo, or `~/.agents/skills/poster-identity-outfit-transfer/` globally. The skill produces better prompts/reviews; it does not create an image editor capability without a compatible tool.

## How to reuse
Supply a new base image (A), subject reference (B), target character, replacement scope, untouched regions, and optional output format. The skill dynamically fills the same edit hierarchy; nothing in the core workflow depends on the Pelle Pelle brand or on GTA artwork.

## Limitations
- Not tested on the original two image sources, which weren't included in this turn.
- Generative image tools cannot be assumed to deliver exact pixel-level preservation or perfect micro-typography.
- The user's screenshot is an example output only.
