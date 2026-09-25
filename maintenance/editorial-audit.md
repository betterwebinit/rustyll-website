# Editorial source audit

Reviewed 2026-09-25. Keep this file with the website so future work can distinguish verified source information from copy awaiting confirmation. Issue #19 tracks the remaining product documentation audit.

| Content | Status | Primary source / action |
| --- | --- | --- |
| Public release version | Verified: v0.8.4 | [Official release](https://github.com/betterwebinit/rustyll/releases/tag/v0.8.4), published 2025-11-21. `_config.yml`, News and History now agree. Recheck before each publication. |
| Quickstart commands: `cargo install rustyll`, `rustyll new`, `rustyll serve` | Documented upstream; local CLI execution still pending | [Product README](https://github.com/betterwebinit/rustyll#readme). Avoid asserting support for optional flags until run against the published binary. |
| 10–100× speed claims and fixed benchmark table | Unverified for this website | Removed from Quickstart and marketing. A future benchmark needs code, environment, site corpus and repeatable measurements. |
| Universal Jekyll compatibility | Unverified | Removed from Quickstart. Migration guides now call for checking plugins/configuration. |
| Team roster and security owner names | Unverified | Removed from the public Team page. Use the repository contributor graph and security policy. |
| Named Showcase projects | Unverified | Data remains in `_data/showcase.yml`, but public cards require `verified: true` plus a recorded source. The page invites submissions meanwhile. |
| Talks and conference attribution | Unverified | Data remains in `_data/rustyllconf-talks.yml`, but public talks require `verified: true` plus a recorded source. |
| Historical 1.0.0 announcement and timeline | Conflicted with published release history | Removed from public News and History; recover the source from git history if evidence is found. |
| Product license label | Conflicted | Footer no longer says MIT. GitHub metadata reports no detected license while the product README says AGPL-3.0; issue #23 tracks an authoritative license file and label. |
| Inherited Jekyll documentation | Pending review | Nine Jekyll maintainer procedures are now unpublished drafts; the maintenance index links to current contribution and security routes. Other pages still discuss Jekyll-specific behavior. Verify each against Rustyll's released code before treating it as supported behavior. |

Do not mark issue #19 resolved until the pending CLI, compatibility and inherited documentation checks are complete.
