# Engineering notes for cross-client HTML email

## Architecture

- Separate authoring source (`src/email.mjml` or modular `.html` partials) from final compiled, ESP-ready `dist/email.html`.
- Outer presentation tables or MJML-generated equivalent; center the campaign container and use explicit alignment. Prevent horizontal scrolling rather than hiding overflow.
- Main content typically 600–640px for desktop; stack columns through supported fluid/hybrid patterns. Design may call for another width.
- Source order must be the reading order for assistive tech/mobile. Do not use a mobile CSS-only reordering trick as the primary accessibility strategy.
- All final images must be resolvable by recipients: absolute HTTPS URLs, ESP asset references properly transformed at send time, or deliberately embedded `cid` if the send method supports it. Local `assets/foo.png` paths are preview-only.
- Use presentation semantics on layout tables where reasonable: `role="presentation"`, `cellpadding="0"`, `cellspacing="0"`, `border="0"`.
- Inline critical typography and spacing; keep CSS media queries for enhancements, not readability of critical content.
- Web fonts are progressive enhancements; use web-safe stacks with realistic line heights.

## Outlook-specific decisions

- Desktop classic Outlook versions using Word rendering have materially different CSS support. Test the actual clients selected by the campaign team.
- Use VML only when visually necessary, e.g. background images or certain bulletproof button designs. Every VML region needs a readable non-VML fallback.
- Don't assume rounded corners, CSS gradients, background-size/position, floats, or absolute positioning render consistently.
- Avoid adding VML to every module by default: it raises code complexity and the risk of double-rendering.

## Interaction, content, and accessibility

- Make entire CTA intended tap target a link; preserve short, meaningful button text independent of image loading.
- Ensure image alt matches function; decorative images receive empty alt. Don't replace actual content with alt-only text.
- Hidden preheader should not displace the visible hero. Preview text behavior varies by inbox.
- Avoid using headings only as images; if headings can't be live, document accessibility tradeoffs.
- Dark mode often changes colors in client-specific ways. Check logo contrast, text visibility, transparent image edges, and CTA.
- Keep copy exact to approval. Do not fabricate legal disclaimers, business address, opt-out URLs, or personalization tokens.

## Build / quality gates

For a starter using MJML:

```bash
npm install
npm run build
node PATH_TO_SKILL/scripts/validate-email.mjs dist/email.html --type marketing
node PATH_TO_SKILL/scripts/validate-email.mjs dist/email.html --type marketing --strict
```

The script is intentionally dependency-free and heuristic. It cannot validate responsive rendering, email-client support, or regulatory compliance by itself.

If the project's build output has been inlined/rewritten by an ESP, run the final check on the post-processing artifact as well.
