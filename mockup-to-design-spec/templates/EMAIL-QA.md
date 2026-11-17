# Email QA plan
All checks start pending. Record actual evidence and distinguish local preview, ESP preview and delivered-client results.
| Check | Environment / fixture | Expected result | Status / evidence |
|---|---|---|---|
| Visual fidelity and responsive stacking | Reference widths | Matches approved design | Pending |
| Compile and tag preservation | Source and compiled HTML | No lost or malformed tags | Pending |
| Dynamic states | Synthetic fixtures and ESP test data | Correct fallbacks, loops and escaping | Pending |
| Native preview and test send | Target ESP | No unresolved tags; correct data | Pending |
| Client rendering | Outlook desktop, Gmail, Apple Mail, mobile | Readable and usable | Pending |
| Dark mode / images off | Target clients | Readable text and useful alt text | Pending |
| Links / tracking / unsubscribe | Authorized test environment | Correct destinations and native compliance | Pending |
| HTML size / clipping / plain text | Final delivered output | Within project limits; usable text | Pending |
| Portfolio preview | Synthetic data only | No live customer data or production links | Pending |

## Blockers, deviations and approval
