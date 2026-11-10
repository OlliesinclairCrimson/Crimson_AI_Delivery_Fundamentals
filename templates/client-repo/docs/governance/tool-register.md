# Approved-tool register

Status: UNCONFIGURED. This record does not approve any product. Claude Code and GitHub Copilot are equal options under the same assessment; approval is engagement-specific.

Client / scope:
Register owner:
Applicable approved policy and approval reference:
Last review / next review trigger:

Complete one entry per harness, model/provider, plugin, skill and MCP server before activation.

| Field | Required record |
| --- | --- |
| Capability / type / host surface | |
| Accountable owner | |
| Publisher, source URL and provenance | |
| Version, immutable revision or pinning limitation | |
| Maturity / support boundaries | Stable, experimental or vendor preview; independent of approval status |
| Approval status | Approved / Restricted / Pilot / Preview / Prohibited; blank means not approved |
| Permitted DEV resource IDs / identity | |
| Permission scope / allowed actions | Include read versus write and explicit exclusions |
| Data classification / approved sources | |
| Filesystem paths / network destinations | |
| Threat / supply-chain assessment | Injection, exfiltration, tool abuse, memory poisoning, updates |
| Privacy / retention / residency / telemetry | |
| Commercial / license / provider assessment | |
| Capability / portability evidence | Actual host/version and limitations, not assumed parity |
| Budget / limits / stop threshold | |
| Approval reference / approver / expiry | |
| Setup evidence / audit retention | |
| Update and reassessment triggers | Model, tool/schema, permission, source, incident or expiry |

Installation is not authorization to invoke every bundled operation. Remove or disable unapproved capabilities. A preview's approval requires explicit scope, acceptance and fallback; do not label it generally production-ready.

Store no tokens, secrets, personal data or raw sensitive logs. Reference approved evidence. Expired/missing approvals block affected operations; use the [exception record](exception-template.md) only with authorized human approval.
