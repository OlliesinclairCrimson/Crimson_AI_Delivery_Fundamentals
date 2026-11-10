# Azure: controlled development setup

Documentation checked 8 November 2026. No live tenant validation is claimed. Claude Code and GitHub Copilot use the same platform route; approval depends on the engagement, not the coding agent.

## Before installation

Record the Business/Technical Owners, approved tenant, DEV subscription/resource group IDs, data classification, resource/network policy, allowed actions, budget and stop thresholds in the client rules/tool register. An administrator establishes a DEV-only identity and separately controlled deployment/runtime identities. Do not use a shared account, production profile or an Owner role simply to avoid access errors.

Choose the application's SDK and build/test commands in an ADR. Confirm supported service/region, quotas, data residency, private network needs, reliability and recovery. Use supported platform capabilities before bespoke infrastructure.

## Install and inspect context

On an approved Windows workstation, use the official package route, then reopen the terminal:

```powershell
winget install --exact --id Microsoft.AzureCLI
az version
```

A person signs in to the approved tenant and selects DEV. Replace placeholders before running:

```powershell
az login --tenant "<APPROVED-TENANT-ID>"
az account set --subscription "<APPROVED-DEV-SUBSCRIPTION-ID>"
az account show
```

Check the returned tenant/subscription and signed-in user against the approval record. Listing an account is read-only, but selecting it changes local context. Inspect SDK environment credentials, browser sessions and other tooling separately; a successful login does not prove DEV-only authorization. Do not capture access tokens. If consent or role assignment is missing, the administrator resolves it.

## Local infrastructure and application checks

For Bicep, Azure CLI manages its own compiler instance; it is distinct from a standalone installation. After package/network approval:

```powershell
az bicep version
az bicep build --file ".\infrastructure\main.bicep"
```

The file is an engagement-owned input, not supplied by this reference. First compiler use may download tooling; review approved network destinations. Compile a reviewed local fixture, inspect diagnostics/generated JSON and run the application's actual build/unit tests. Compilation is not deployment, a security scan or proof that an Azure resource exists.

For connectivity, a person first verifies the authorized DEV resource in Azure portal. Use the service's documented read-only CLI/SDK operation scoped to that exact ID; record sanitized identity, resource revision and result. Do not enumerate unrelated subscriptions or test guardrails by trying production. Infrastructure validation/what-if calls can require additional remote permissions and remain separately approved.

## Coding harnesses

| Surface | Route and checks |
| --- | --- |
| Claude Code | Follow the Claude adapter; load AGENTS.md and the approved skills. Use reviewed Azure CLI/Bicep shell calls with manual permissions. Native Windows shell execution is not covered by Claude's built-in shell sandbox. |
| Copilot CLI | Follow the Copilot adapter; inspect instructions and normal tool approvals. Use the same CLI/compiler; shell deny rules do not constrain equivalent MCP or API routes. |
| Copilot in VS Code | Use the same CLI and a supported Bicep extension alongside the editor. Confirm the actual local/agent host, installed executable and manual permissions; CLI sign-in is separate from Copilot sign-in. |

No dedicated agent plugin or MCP endpoint is assumed. If adding one, assess/register its publisher, version, scopes and host compatibility first; platform-native CLI/portal remains the documented route.

## Readiness and release

Complete G1/G3/G4: threat/NFR/cost design, approved tools/context, local build/tests, dependency/secret scans and independent PR review. Record identities, resource configuration, telemetry/alerts, usage caps, runbook and recovery for G6/G7. A human deployment operator executes approved pipelines; development agents do not create roles, deploy to TEST/PROD or accept risk.

References: [Windows CLI install](https://learn.microsoft.com/cli/azure/install-azure-cli-windows), [account/sign-in example](https://learn.microsoft.com/industry/nonprofit/azure-landing-zone-cli), [Bicep commands](https://learn.microsoft.com/azure/azure-resource-manager/bicep/bicep-cli). Consult the service-specific reference before each new remote operation.
