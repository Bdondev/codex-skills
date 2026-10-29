# Source scope and evidence log

Primary content used: connected Notion page [Build a responsive HTML email from a design using 100% Codex](https://app.notion.com/p/407eb5e86a9280a390f3f91de61fda2b).

Fetched: 2026-10-29. The page contains the original ten-part Codex/MJML guide and additional appended discussion covering image-slicing decisions, section-specific asset layouts, and the Autumn Harvest overlapping bowl/card tradeoff.

Directly supported workflow details:

- Mac setup with Node/MJML; architecture planning before implementation.
- Design spec + asset manifest + project instructions, then optimization, foundation, section-by-section build.
- Browser screenshots at 320, 390, 600 and 1440px, overflow checks and report; actual Gmail/Apple Mail/Outlook tests separately.
- Hosted HTTPS images for delivery, accurate unsubscribe/footer, and no sending/committing by default.
- Additional chat: hero working artwork, Autumn bowl/pumpkin separate slices, five nutrition values as live HTML, optional lower card/bowl composite, Grower images, phone visual and footer social icons.

New supporting implementation choices in this skill (not content stated to already exist in the user's project):

- A dependency-free local image metadata auditor.
- A Playwright-based browser screenshot/report harness.
- Markdown/CSV planning and stage-gate templates.
- Tests for the asset metadata analyzer and HTML heuristic validator.

Limitations: A Notion narrative page does not include the original layered Sweetgreen image assets, screenshots at production resolution, real inbox results, or verified URLs. Do not infer or claim those deliverables exist. Always distinguish the source page's recommendations from measurements from actual assets and testing.
