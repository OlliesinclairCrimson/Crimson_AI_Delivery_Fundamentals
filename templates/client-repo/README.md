# Crimson client repo starter

This is a tool-neutral starting point, not a configured client environment. Do not run client operations until the engagement lead has approved the completed rules.

## Before use

1. Replace every REPLACE_WITH field in AGENTS.md. Set its status to CONFIGURED only after human approval.
2. Confirm permitted tools, models, data, client approval, DEV URL/environment ID and least-privilege identity.
3. Add real client conventions and workload-specific validation commands; complete the glossary.
4. Review the skills and remove or adapt any that do not match the engagement.
5. Complete docs/evidence/setup-validation.md for each supported tool surface.
6. Configure branch protections and required human review in the client's Git provider. This template cannot enforce those server-side policies.

## Instructions

AGENTS.md is canonical. CLAUDE.md imports it; the Copilot bridge points to it with a relative Markdown link. Current Copilot CLI also discovers AGENTS.md directly. Confirm loading in each host and resolve conflicts with personal or organization instructions.

The six team skills live in .claude/skills and use the portable SKILL.md format. Discovery does not guarantee invocation. Ask explicitly for a skill and inspect whether its procedure was followed.

## MCP and permissions

The active .mcp.json contains only public Microsoft Learn, with no client identity or secrets. Trust and tool activation remain manual.

Current docs describe portable .mcp.json support in Claude Code, Copilot CLI and VS Code. If your supported VS Code host instead needs its own format, copy examples/vscode-mcp.json to .vscode/mcp.json and arrange configuration so the same server is not registered twice. The example file is outside the active discovery location intentionally.

Add Dataverse through the reviewed connection workflow and an administrator-enabled registered client. Do not put a working client endpoint or credentials in a generic template. Validate tool discovery and a read-only DEV call separately for Claude Code, Copilot CLI and VS Code.

.claude/settings.json contains manual-mode and Bash/PowerShell deny examples for PAC import/pipeline deployment. Verify matching in your actual host. They are not a comprehensive deployment firewall and deliberately do not pre-approve other commands.

.vscode/settings.json disables global and terminal auto-approval. These settings require approvals; they are not deny rules and may be specific to the selected harness. Current Agent Host worktree sessions may use Allow all: choose an appropriate manually controlled session or stop if client policy cannot be met.

For Copilot CLI, use normal approval prompts and reviewed --deny-tool flags. A conservative example denies shell(pac) and shell(git push), but it also blocks legitimate DEV PAC work. Any narrower policy needs technical review and a harmless local test. MCP, scripts and alternative APIs require their own controls.

## Source and evidence

solutions, agents and src hold the appropriate reviewable artifacts. Export/synchronize direct DEV changes before promotion. Git branches alone do not isolate shared live environments.

Story, decision, evidence, setup and pilot templates are under docs. Do not include raw sensitive logs or data; retain approved evidence in the correct client system and reference it.
