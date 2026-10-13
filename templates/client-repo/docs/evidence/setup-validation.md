# Per-tool setup validation

Complete a separate copy for Claude Code, Copilot CLI and Copilot in VS Code where supported. A documentation check is not a successful live setup.

Date / verifier:
Client approval reference:
Tool, host/harness, OS and versions:
Model and subscription:
Plugin/server versions and approved publishers:
DEV URL, environment ID and tenant:
Least-privilege identity (no tokens):
Dataverse registered client name/ID and admin approval:

| Check | Actual evidence | Status |
| --- | --- | --- |
| Required AGENTS.md fields completed and human-approved | | not run |
| Correct instruction files discovered/loaded | | not run |
| story-readiness explicitly invoked and follows client rules | | not run |
| MCP tools discovered once, no duplicate registrations | | not run |
| Read-only public Learn call works | | not run |
| Read-only Dataverse DEV call uses approved identity | | not run |
| PAC active environment and other credential paths inspected | | not run |
| Identity has no TEST/PROD access; administrator verifies without an attempted remote operation | | not run |
| Approval/deny handling tested using a harmless local fixture | | not run |
| Known host gaps and plugin maturity accepted | | not run |

Do not test guardrails with a real import, publication, destructive command or TEST/PROD access attempt. Use a harmless local command/tool fixture to observe host permission handling; administrator evidence establishes actual access boundaries.

Outcome: not validated
Human acceptance, limitations and next review trigger:
