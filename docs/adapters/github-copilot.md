# GitHub Copilot adapter

Reference v0.1. Documentation checked 13 October 2026. Copilot CLI and Copilot in VS Code are distinct supported reference routes, not interchangeable installation targets. Cloud agent, GitHub Copilot app and other IDEs are outside this release's setup scope.

## CLI: install and sign in

Requires an active subscription and organization policy permitting CLI use. On Windows, the publisher lists PowerShell 6+.

```powershell
winget install GitHub.Copilot
copilot --version
copilot
```

Review directory trust and use /login inside the session when prompted. The npm alternative requires Node.js 22+. Launch only from the trusted client repo, not the home directory.

## VS Code: install and sign in

Install the approved VS Code release and GitHub Copilot integration; sign in with the approved GitHub identity. Open Chat in the client workspace and select the intended agent harness.

Local and Agent Host sessions differ. Verify the selected harness, available tool controls and supported plugins. Do not paste CLI /plugin marketplace commands into ordinary VS Code chat and assume they install a plugin.

## Shared instructions and skills

AGENTS.md is canonical; .github/copilot-instructions.md points to it using a Markdown reference. Current CLI also discovers AGENTS.md directly.

CLI checks, run **inside Copilot CLI**:

```text
/instructions
/skills list
/skills info story-readiness
Use the /story-readiness skill on this synthetic story; do not build yet.
```

In VS Code, use Chat: Open Customizations and inspect the chosen harness's Instructions and Skills tabs. The shared .claude/skills folder is documented for both surfaces. Explicitly invoke a skill and verify the output follows the client rules.

Resolve conflicting personal or organization guidance. Restart/reload as documented after instruction/skill changes.

## MCP configuration

| Surface | Project route | Other documented route |
| --- | --- | --- |
| CLI | .mcp.json; current docs also describe .github/mcp.json | ~/.copilot/mcp-config.json (or COPILOT_HOME) |
| VS Code | Portable .mcp.json where supported | .vscode/mcp.json with a top-level servers object |

The template activates only public Learn in .mcp.json. Its examples/vscode-mcp.json is an alternate, not a second active registration. Do not duplicate the same server across formats or assume precedence is identical across hosts.

VS Code Agent Host forwarding has limitations, including interactive input variables. Verify discovery and connectivity in the actual selected host.

For Dataverse, ask the administrator to enable the registered client used by each selected route. Enabling Claude does not enable Copilot. Record actual client names/IDs rather than inventing distinct records for every UI surface.

## Plugins

In Copilot CLI, for cloud flows:

```text
/plugin marketplace add microsoft/power-platform-skills
/plugin install power-automate@power-platform-skills
```

Use the marketplace's current names for other workloads, including dataverse. Do not install duplicate Dataverse skills from multiple marketplaces.

For standard Copilot Studio agents, the publisher documents the same CLI marketplace as Claude:

```text
/plugin marketplace add microsoft/skills-for-copilot-studio
/plugin install copilot-studio@skills-for-copilot-studio
```

In VS Code, the publisher documents @agentPlugins > Skills for Copilot Studio. It is experimental. Its GHCP harness successor, mcs-assistant, is a separate work-in-progress route requiring PAC 2.9.3+; it is not a general replacement for standard-agent YAML.

If a workload's plugin is not available in the chosen VS Code host, use the documented CLI route alongside the editor or an approved maker workflow. Do not silently substitute Claude instructions.

## Approvals and blocking

CLI: retain ordinary approval prompts. --deny-tool blocks matching tools and takes precedence over allow options. A deliberately conservative example:

```powershell
copilot --deny-tool "shell(pac)" --deny-tool "shell(git push)"
```

This denies legitimate DEV PAC shell work too. A narrower policy must be reviewed and tested with a harmless local fixture. Denying a shell command does not deny equivalent MCP/API operations or every wrapper.

VS Code: use Manual permissions in a supported session, disable global/terminal auto-approval and review saved tool approvals.

```json
{
  "chat.tools.global.autoApprove": false,
  "chat.tools.terminal.enableAutoApprove": false
}
```

A false terminal rule requires confirmation; it is not a command block. Local PreToolUse hooks can deny calls but are host-specific/preview. Some Copilot Agent Host worktree sessions use Allow all. If the selected session cannot meet the client's approval policy, change to an appropriate approved session or stop.

Do not use global allow-all, /yolo or autopilot as the default for client operations. Organization MCP policy support is evolving and documentation can differ by surface/version: confirm actual enforcement, not just a configured policy.

## Platform identity and completion evidence

Install PAC using a supported method; record its actual executable/version. Connect only the explicitly approved DEV URL and verify pac auth list and pac env who. Azure CLI, extensions, browsers and MCP OAuth have separate identity paths.

Complete the per-tool setup-validation template: loaded instructions, skill invocation, server discovery, read-only DEV connectivity, approval handling and administrator-confirmed access. This adapter has documentation evidence, not live tenant validation or a tool superiority claim.

## First-party references

[CLI install](https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/install-copilot-cli), [CLI instructions](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-custom-instructions), [CLI skills](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-skills), [CLI MCP](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-mcp-servers), [CLI permissions](https://docs.github.com/en/copilot/concepts/copilot-surfaces/copilot-cli), [VS Code approvals](https://code.visualstudio.com/docs/agents/run/approvals), [VS Code MCP](https://code.visualstudio.com/docs/agent-customization/mcp-servers), [VS Code plugins](https://code.visualstudio.com/docs/agent-customization/agent-plugins).
