# Button selection: keep CTA accessible and honest

A live-text CTA must be a real `<a href>` with approved HTTPS destination. Table structure is broadly useful, but **no single pattern is guaranteed to look or click identically in every email client**.

## Choose consciously

| Pattern | Why choose it | Known caution |
|---|---|---|
| Padding on table cell | Simple, stable colored rectangle | In some classic Outlook implementations **only the linked text** is clickable; visual area ≠ hit area. |
| Padding + border on anchor and background on `<td>` | One link, functional widespread default | Classic Outlook may ignore anchor horizontal padding and rounded corners; actual hit area/client visuals need checks. |
| Conditional-padding | Can enlarge Outlook hit area | More MSO-specific markup; inspect link and text semantics. |
| VML conditional `v:roundrect` | Requested rounded rectangle in classic Word Outlook | Additional implementation complexity and duplicated URL/tracking risk; not required for other Outlook variants. Test ESP rewrite and dark mode. |
| MJML `mj-button` | Convenient with existing MJML project | Inspect **compiled markup** and run Outlook QA. Do not assume generated button is universally bulletproof. |

## Implementation checklist

1. Approved target and action text; don't use `href="#"` or guessed tokens.
2. Default background/text remains legible without advanced CSS and in light/dark themes.
3. If image blocking occurs, button still has actionable live text.
4. Verify click target and dimensions in required clients, especially classic Outlook Windows.
5. Retest after ESP link tracking / personalization. VML and non-VML link destinations must agree.
6. Record if visual corners or precise dimensions differ; correct functional failure before styling difference.

Do not blindly copy the note's table+`<a style="padding:...">` example as universally bulletproof. It is a **starting point**, not a verified Outlook-click-area solution.

Research: Litmus, "A Guide to Bulletproof Buttons in Email Design" (Apr 2025): https://www.litmus.com/blog/a-guide-to-bulletproof-buttons-in-email-design
