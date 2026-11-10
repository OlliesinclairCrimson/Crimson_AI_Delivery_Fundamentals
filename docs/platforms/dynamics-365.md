# Dynamics 365: two distinct development routes

Finance and operations tooling documentation checked 8 November 2026; the existing PAC/Dataverse adapter instructions retain their 13 October review date. No live tenant validation is claimed. Neither coding agent is preferred.

Choose the actual application family in the ADR. Dataverse-based customer engagement and Finance/Supply Chain ERP do not share a universal compiler or deployment model. Configure supported product features before writing extensions.

## Customer engagement / Dataverse

1. Confirm application licenses, approved tenant/DEV environment ID, solution ownership/publisher, data/role design, existing product capability and extension justification.
2. Follow the shared [Claude](../adapters/claude-code.md) or [Copilot](../adapters/github-copilot.md) setup and PAC installation route. Agent login does not grant Dynamics licenses or Dataverse access.
3. A person establishes the approved named DEV profile. Inspect existing profiles before adding one:

```powershell
pac --version
pac auth list
pac auth create --name CLIENT-DEV --environment "<APPROVED-DEV-URL>"
pac auth list
pac env who
```

Replace the URL first; creating/selecting a profile changes local context. Confirm exact environment/tenant and identity. Azure CLI, browser and MCP OAuth may select different identities.

4. For an MCP route, use the existing reviewed Dataverse connection procedure and administrator-enabled registered client. Do not invent a new Dynamics MCP endpoint or duplicate marketplace installation.
5. Begin with read-only metadata/solution membership checks. Only after scoped approval, configure solution components or develop documented extensions in DEV. Export/synchronize changes into reviewable source.
6. Use relevant security roles, business scenarios, negative permissions, checker, integration and upgrade-compatibility tests. People approve managed downstream deployments with connection references/environment variables and separate identities.

The documented application/PAC tooling is the native fallback for either coding agent; no separate customer-engagement plugin is assumed.

## Finance / Supply Chain: unified developer experience

An authorized person performs the privileged setup. The consulted Microsoft route requires a provisioned developer-focused sandbox and a System Administrator developer account, Windows 10/11, Visual Studio 2022 with .NET desktop development, Modeling SDK/required components, LocalDB and at least 16 GB free system-drive space. These are real prerequisite constraints, not permission to elevate a development assistant.

If the agent's DEV-only/least-privilege policy cannot coexist with a privileged tool session, separate setup into a human-controlled session and give the agent only approved local source/build access. Block remote work until an approved isolation/identity arrangement is evidenced.

1. The administrator provisions/approves the developer sandbox; record environment/application versions and keep TEST/PROD credentials unavailable.
2. Install **Power Platform Tools for Visual Studio** from the official route, then **Tools > Connect to Dataverse** or **Download Dynamics 365 FinOps assets**. Select the exact approved sandbox and identity; do not rely on automatic selection when only one environment is listed.
3. Download version-matched Finance and operations extension/metadata. Automatic setup is normally enabled; inspect Visual Studio Output for required actions. A person handles installation/elevation prompts.
4. If needed, install the downloaded Finance and operations VSIX and configure **Extensions > Dynamics 365 > Configure Metadata**. Set separate folders for custom X++ metadata and reference packages, plus the local cross-reference database. Never copy customer data/credentials into the generic repository.
5. Confirm the active configuration, restart Visual Studio if required and open **View > Application Explorer**. Capture versions and sanitized configuration evidence; successful setup is not a functional test.
6. Review custom models/dependencies and build locally using the version-matched X++ tooling. Use the product's supported extension techniques; PAC is not an X++ compiler.
7. A person runs approved DEV functional/security/performance checks and records any DBSync/deployment effects. Build/package and release procedures must match the project's supported ERP lifecycle; do not copy a Dataverse import command as an ERP release shortcut.

## Coding harnesses

| Surface | Customer engagement | Finance / Supply Chain |
| --- | --- | --- |
| Claude Code | Approved PAC/Dataverse tools and shared skills | Local source/tests; human Visual Studio setup and approved X++ tools |
| Copilot CLI | Same PAC/Dataverse route and manual tool approvals | Same local source/tests and human-controlled native tooling |
| Copilot in VS Code | Same PAC/source workflow alongside the editor | VS Code is not Visual Studio 2022; use Visual Studio for native setup/compiler/debugging and keep agent session permissions separate |

No dedicated ERP agent plugin is assumed. Missing tooling/permissions return to the responsible administrator; no bypass or agent System Administrator account is supplied.

## Readiness

Record supported extension rationale, licenses, identity/data/security, source/ALM coverage, unit/business tests, compatibility and recovery. G6/G7 require human release authority, environment/configuration evidence, support/runbook and monitoring. Both agent choices use identical acceptance criteria and independent review.

References: [existing PAC introduction](https://learn.microsoft.com/en-us/power-platform/developer/cli/introduction), [PAC authentication](https://learn.microsoft.com/en-us/power-platform/developer/cli/reference/auth), [unified Finance and operations installation/configuration](https://learn.microsoft.com/power-platform/developer/unified-experience/finance-operations-install-config-tools). Use the links in the native installation guide for version-specific components and provisioning.
