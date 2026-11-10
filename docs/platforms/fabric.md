# Microsoft Fabric: workspace and source setup

Documentation checked 8 November 2026. Both coding agents use the same approved native Fabric portal/Git route. No live workspace test or universal artifact/CLI/plugin support is claimed.

## Prerequisites and isolation

Record approved tenant, capacity/license, isolated DEV workspace ID, data sources/classification, Git repository/branch/folder, identities, allowed actions, budget and support owner. Fabric capacity is required for the full Git-supported item set; some Power BI capacities support Power BI items only.

An administrator checks the documented tenant switches for creating Fabric items and synchronizing with Git; GitHub users additionally need the GitHub synchronization switch. Workspace-creation permissions are relevant when branching into new workspaces. Record approved scope rather than enabling blanket tenant access.

Use development, test and production workspaces with separate identities and release permissions. A branch or Git connection does not isolate shared live DEV data, nor version the underlying data.

## Human-owned Git connection

Only a workspace administrator connects/disconnects a repository. Follow this sequence with explicit approval:

1. Sign into Fabric using the approved DEV identity; inspect the tenant and workspace ID.
2. Open **Workspace settings > Git integration** and select the supported Git provider. Current documentation supports GitHub and Azure DevOps.
3. For GitHub, use the approved repository URL and repository-scoped token in the secure connection dialog. The guide documents fine-grained Contents read/write or classic repo scope; prefer the minimum permitted route and comply with organization policy. Never place that token in prompts, source or evidence.
4. Select the intended repository, feature branch and source folder. Record all three; only one branch/folder is connected at a time.
5. Inspect both workspace and repository before **Connect and sync**. An empty side receives content from the nonempty side; if both contain content, explicitly agree direction. Sync can change live items or repository state.
6. Review **Source control** status, item list, connected branch and sync time. Confirm the actual supported artifact list and exclusions for this tenant/version.

If the engagement mandates GitHub as its system of record but a workload's supported ALM cannot meet it, document a reviewed architecture decision/exception; do not claim every artifact is covered or silently move the source of truth.

## Local and DEV verification

Clone the approved repository and review exported item definitions with ordinary Git/file tooling. Both coding agents can assist with source diffs, tests and documented SQL/notebook code. There is no dedicated Fabric plugin or universal compiler assumed by this reference.

Use local fixture/schema tests first. A human performs an approved read-only portal inspection of DEV item configuration, permissions and last refresh/run history. Query execution and refreshes can consume capacity or write data even when they look like validation; approve them separately and use synthetic/approved datasets.

Before committing, inspect **Source control > Changes**, select only the intended items and retain a source diff. Before **Updates > Update all**, review incoming changes: update rewrites live workspace state. No agent independently connects, switches branches, undoes items or promotes pipelines. Confirm who may change the branch under current workspace permissions.

## Coding harnesses

| Surface | Route and checks |
| --- | --- |
| Claude Code | Shared instructions/skills and manually approved local Git/file/test tools. Portal credentials and any added MCP service are separate approvals. |
| Copilot CLI | Same repository, source fixtures and evidence. Inspect instructions and shell/tool permissions; do not infer Fabric access from GitHub login. |
| Copilot in VS Code | Open the same trusted repo, review item definitions and run approved local tests. Portal/API identity remains separate from the selected agent host. |

If adding automation through Fabric APIs/CLI, first consult the specific operation's official schema, permissions and maturity and register the capability. This portal route is the supported fallback, not an invented plugin install sequence.

## Release and operations

G4 evidence includes schema/data quality, access/negative-role tests, refresh/error handling, source coverage and capacity/cost results. Human release owners configure/execute approved deployment pipelines, connection/parameter settings and post-release validation. Record unsupported artifacts/manual steps and tested recovery; Git sync is not a complete rollback of data or permissions.

References: [Git setup and prerequisites](https://learn.microsoft.com/fabric/cicd/git-integration/git-get-started). Its linked item-support/permissions guidance is authoritative for the actual workload; recheck after Fabric changes.
