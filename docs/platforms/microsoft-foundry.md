# Microsoft Foundry: controlled project and SDK setup

Documentation checked 8 November 2026. This is a reference route for both coding agents, not a live tenant validation or approval to operate models/tools.

## Project and identity prerequisites

Use the [Azure context route](azure.md). Record approved tenant/subscription, DEV resource/project, endpoint, region, model deployment/provider/version, data classification, allowed tools, network restrictions, quotas and cost thresholds. A human administrator provisions the project and assigns the minimum roles for the chosen operations; creation/role assignment is not a development-agent permission.

The documented portal route is: sign into Microsoft Foundry, confirm the intended new/classic experience, and select/create the approved project using the project setup reference. Confirm resource/project IDs and copy the actual project endpoint from project details; do not guess it from a display name. New Foundry endpoints have the documented form `https://<account>.services.ai.azure.com/api/projects/<project>`. That is a format example, not an active template connection.

Foundry role names are changing: documentation now uses Foundry User/Owner/Account Owner/Project Manager; tenants may still show Azure AI names. Confirm role IDs and permissions, not just labels. Preview feature support and region availability require per-feature assessment even in a stable SDK.

## Local SDK setup

The documented Python SDK route requires Python 3.10+; use an approved project-specific virtual environment. Replace approved-version placeholders, add dependencies to the engagement manifest and lock them before restoring:

```powershell
python --version
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install "azure-ai-projects==<APPROVED-VERSION>" "azure-identity==<APPROVED-VERSION>"
.\.venv\Scripts\python.exe -m pip show azure-ai-projects azure-identity
```

Do not copy these unresolved placeholders as executable commands. The SDK documentation requires 2.3.0+ for its current general samples; the consulted agent-evaluation guide requires 2.8.0+. Choose a supported approved version covering the exact workflow, not a stale blanket pin.

Set `FOUNDRY_PROJECT_ENDPOINT` to the approved DEV endpoint in the local process/configuration, never credentials in source. Current samples authenticate with Entra ID and `DefaultAzureCredential`. Its credential chain can select environment, managed identity or cached developer accounts; inspect every enabled credential source or choose an explicitly approved credential implementation. `az account show` alone does not establish which identity an SDK used.

Start from the SDK's client construction sample, then exercise a documented read-only deployment-list operation on the approved project. Record identity, project and sanitized outcome without connection secrets. Client construction alone makes no service call and is not authentication evidence. Denied consent/access goes to an administrator, never self-elevation.

Only after approval, run a bounded synthetic model request against the named deployment. It can incur charges and create service records; it is not the initial read-only connectivity test.

## Evaluation and tracing setup

1. Record representative approved test cases, evaluator/model versions, expected outputs, failure scenarios and measurable acceptance thresholds in the delivered-agent assurance record before running.
2. Use the linked agent-targeted evaluation workflow and its matching SDK version. Confirm role/region support and evaluator deployment. Select task/tool, groundedness/quality and safety evaluators relevant to the requirement; include adversarial inputs and unauthorized-action tests.
3. Create/upload test data or execute evaluations only with explicit approval; these are remote writes/consumption, not harmless read-only setup.
4. An authorized person connects approved Application Insights in the project: **Agents > Traces > Connect**, or **Manage > Project details > Connected resources > Add connection > Application Insights**.
5. Verify with a bounded synthetic approved run, then inspect a new trace, duration/status, tool/approval evidence and sanitized usage. Missing traces or unrun evaluations remain blocked/not run.
6. Confirm retention, access, content minimization and budget controls. Tracing can capture prompts and tool arguments. Never enable unredacted sensitive logging as a debugging shortcut.

Server-side tracing and client-side instrumentation have different maturity boundaries; the consulted documentation marks workflow/external-agent and GenAI client instrumentation features as preview. Approve the exact feature, not simply the product name.

## Coding harnesses

| Surface | Route and checks |
| --- | --- |
| Claude Code | Load shared rules/skills; invoke the same approved Python SDK through manually governed shell tools. Keep model/provider processing and shell isolation approvals separate. |
| Copilot CLI | Use identical project data, SDK, evaluation criteria and manual permissions; record actual model/host and tool calls. Coding-agent entitlement does not grant Foundry access. |
| Copilot in VS Code | Use the same interpreter/environment and SDK alongside the editor; validate agent-host credentials separately. Optional Foundry editor tooling requires its own tool-register approval and does not replace runtime checks. |

No dedicated plugin setup is assumed. The native SDK/portal route works independently of a coding-agent marketplace. New tool integrations require reviewed schemas, per-action authority and exact-target approval.

## Completion

G5 requires actual accepted evaluation/control evidence; G6/G7 need release authority, fallback, monitoring, cost/latency thresholds, incident support and kill switch. Version/regression-test model, prompt, tools, knowledge and orchestration changes. Runtime authority is separately assessed; development assistants remain DEV-only.

References: [project creation](https://learn.microsoft.com/azure/foundry/how-to/create-projects), [Python SDK](https://learn.microsoft.com/python/api/overview/azure/ai-projects-readme), [agent evaluation](https://learn.microsoft.com/azure/foundry/observability/how-to/evaluate-agent), [tracing](https://learn.microsoft.com/azure/foundry/observability/how-to/trace-agent-setup).
