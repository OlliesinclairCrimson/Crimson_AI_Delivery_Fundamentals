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
Tool-register entry, policy scope and approval expiry:
Filesystem/network boundary and isolation evidence:
Sanitized audit retention/access:

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
| Each required tool has owner, source/version, approval, data and action scope | | not run |
| Filesystem/network scope and unattended isolation verified | | not run |
| Exact actor/action/target/parameter approval and independent validation tested with harmless fixtures | | not run |
| Sanitized agent/tool/approval/outcome audit is retained without secrets | | not run |
| Administrator evidence of branch protections, independent review, required checks and sensitive-area ownership | | not run |
| Available secret/dependency/code scans or approved equivalents recorded | | not run |

Do not test guardrails with a real import, publication, destructive command or TEST/PROD access attempt. Use a harmless local command/tool fixture to observe host permission handling; administrator evidence establishes actual access boundaries.

Outcome: not validated
Human acceptance, limitations and next review trigger:

For Azure, Foundry, Fabric or Dynamics, record the platform-native identity/resource checks instead of marking Dataverse checks passing. Not applicable requires a rationale. Elevated installation, workspace connection and ERP setup belong to an authorized person, not self-elevation by the agent.
