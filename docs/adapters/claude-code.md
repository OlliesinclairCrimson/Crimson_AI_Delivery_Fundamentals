# Claude Code adapter

Reference v0.1. Documentation checked 13 October 2026. Validate the actual host, OS, version and client tenant before live work. Shared delivery requirements are in the website and the client's AGENTS.md, not duplicated here.

## Install and sign in

Use an approved Claude subscription and client data-processing agreement. On Windows, the publisher documents:

```powershell
winget install Anthropic.ClaudeCode
claude --version
claude
```

Launch from the trusted client repo and follow sign-in. WinGet installations need deliberate updates. Follow the [publisher setup guide](https://code.claude.com/docs/en/setup) for other platforms or installation routes.

Platform access is separate. Install PAC via a supported method and inspect credentials before creating a DEV profile:

```powershell
pac auth list
pac auth create --name CLIENT-DEV --environment "<APPROVED-DEV-URL>"
pac auth list
pac env who
```

Replace the placeholder first. Verify the exact approved DEV environment ID and identity. Azure CLI, browsers and MCP OAuth may use different accounts; inspect each path.

## Configuration and context

| Concern | Location / check |
| --- | --- |
| Shared client rules | AGENTS.md |
| Claude bridge | CLAUDE.md containing @AGENTS.md |
| Team skills | .claude/skills/<skill-name>/SKILL.md |
| Shared permission examples | .claude/settings.json |
| Project MCP | .mcp.json |
| Loaded rules and tools | /context, /permissions and /mcp inside Claude Code |

Confirm actual instruction loading and explicitly invoke a team skill. Personal memory is not the shared source of truth.

## Plugins

For a cloud-flow example, run **inside Claude Code**:

```text
/plugin marketplace add microsoft/power-platform-skills
/plugin install power-automate@power-platform-skills
```

Use the marketplace's current plugin names for other workloads. The shared marketplace also exposes dataverse; avoid duplicate installations from different marketplaces.

For standard Copilot Studio agents:

```text
/plugin marketplace add microsoft/skills-for-copilot-studio
/plugin install copilot-studio@skills-for-copilot-studio
```

The publisher calls this experimental research, not an officially supported product. The separate [successor](https://github.com/microsoft/copilot-studio-plugin) targets GHCP harness authoring; select by agent type rather than assuming interchangeability.

## Approvals and command blocking

Start with manual/default permissions. Use /permissions and project settings to inspect actual rules. The template denies PAC solution import and pipeline deployment patterns in both Bash and PowerShell.

Deny/ask/allow matching is enforced by the host, not AGENTS.md. Command rules do not cover every wrapper or equivalent MCP/API operation. Verify the installed shell tool names and harmless rule handling; manage identity and environment access separately.

Do not use permission bypass as a workaround. Sandbox support varies by OS; native Windows support differs from WSL. A sandbox is an additional layer, not authorization to use client data or TEST/PROD.

## MCP and admin checks

Trust only reviewed servers. The template's public Learn configuration has no client identity. For Dataverse, use the reviewed connection skill, an explicitly approved DEV endpoint and an administrator-enabled registered client. Enabling the Copilot client does not enable Claude's client.

If consent, registration or access fails, stop and involve the administrator; do not self-elevate.

## Known gaps and completion evidence

- Plugin capabilities, maturity and schemas can change independently of the host.
- Canvas Authoring needs an active session and its .NET 10 prerequisites.
- Instruction/skill discovery is not proof of compliance or invocation.
- The original recordings are not the recommended current setup route.
- No hands-on client-tenant validation is claimed by this adapter.

Complete the client template's docs/evidence/setup-validation.md before a real story. Include versions, loaded instructions, a skill exercise, read-only DEV connectivity and administrator-confirmed boundaries.

## First-party references

[Setup](https://code.claude.com/docs/en/setup), [memory/instructions](https://code.claude.com/docs/en/memory), [permissions](https://code.claude.com/docs/en/permissions), [MCP](https://code.claude.com/docs/en/mcp), [Power Platform skills](https://github.com/microsoft/power-platform-skills), [Dataverse administration](https://learn.microsoft.com/en-us/power-apps/maker/data-platform/data-platform-mcp-disable).
