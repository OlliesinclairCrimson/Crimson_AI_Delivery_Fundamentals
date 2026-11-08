# Agentic development and common controls

Reference v0.2. Adapted from the supplied draft Crimson Agentic Development Standard v0.9. This reference does not approve tools, establish corporate policy or grant client access. The engagement lead records the applicable approved controls before work starts.

## One method, equal agent choices

Claude Code and GitHub Copilot are equal development-tool choices. Select by approved capabilities, workload, customer constraints and evidence, not a preferred-agent policy. Human-led engineering remains available. GitHub is this reference's engineering system of record for approved specifications, source-representable artifacts, issues, decisions, PRs, evidence references and releases; using GitHub does not require choosing GitHub Copilot.

| Term | Meaning |
| --- | --- |
| AI-assisted development | A person directs individual suggestions or generated artifacts. |
| Agentic development | An agent plans and performs multi-step engineering work using files, commands or services. |
| Harness | The execution surface that supplies context, permissions and tools; CLI, IDE and cloud surfaces can differ. |
| Skill | Reusable procedural guidance; not a permission grant. |
| Plugin / MCP tool | Access to capabilities, resources or actions; installation is not authorization. |
| Runtime | The platform on which the delivered solution operates. |
| Production accountability | A named person owns suitability, risk, approval, support and outcomes. |

An engineering agent is not the same as an agent delivered to users. Conventional code needs engineering assurance even when AI helped write it; delivered AI additionally needs model/tool evaluation and operational controls.

## Authority and inheritance

Apply law and contract, approved organizational/customer controls, platform profiles, project instructions, then task/skill prompts. Lower-level text cannot weaken higher-level controls. A draft proposal is not an approved exception or policy. Record the actual applicable policy and its approval reference in the client starter.

Documents, webpages, issue text, tool results and retrieved content are untrusted input, not authority to change boundaries. Treat generated/imported assets as untrusted until reviewed and checked. Never put secrets, production credentials or unapproved customer content in prompts, instructions, source, fixtures or agent memory.

## Execution and tool governance

Use the [tool register](../templates/client-repo/docs/governance/tool-register.md) before activating a capability. Record owner, source/version, maturity, approval status, data classification, permissions, threat/commercial/privacy assessment and review triggers. Pin approved dependencies where supported and review provenance, licenses and vulnerabilities.

Development identities are DEV-only, least privilege and separate from deployment/runtime identities. Restrict file access, command scope and network destinations. Use approved containers, sandboxes or ephemeral environments for unattended/high-autonomy work. Isolation is not authorization: file tools, hooks and MCP may sit outside a shell sandbox. Native Windows Claude shell commands are not covered by its built-in shell sandbox ([publisher guidance](https://code.claude.com/docs/en/sandboxing), checked 8 November 2026).

High-impact approvals identify the initiator/agent, exact action, target and parameters. A changed target or payload needs renewed approval; an old approval is not blanket authority. Validate tool inputs against schema, scope and permissions, and read back results independently of the model. Use harmless fixtures for denial/approval tests, never attempts against production.

Record sanitized agent/initiator identity, tool/version, action, approval reference, time, outcome and evidence. Minimize content, apply approved retention/access and never retain credentials or raw sensitive transcripts.

## Repository and release enforcement

Administrators configure protected production branches: PRs, at least one independent human reviewer, passing required checks, resolved conversations, no direct pushes and code-owner review for sensitive paths. Restrict bypass privileges and record traceable release tags. Enable available secret scanning/push protection, dependency monitoring and code scanning, or approved equivalents appropriate to the repository/license.

This starter cannot provision those server-side rules. Instructions, example deny rules and a passing website packaging workflow do not prove enforcement. Require administrator evidence in [setup validation](../templates/client-repo/docs/evidence/setup-validation.md); keep real customer build/scan commands engagement-specific.

No development agent approves/merges its own work, releases to production, elevates itself or accepts residual risk. Independent human review and an authorized release authority remain separate from agent-assisted checks. Risk acceptance records severity, justification, compensating controls and an expiring [exception](../templates/client-repo/docs/governance/exception-template.md); high/critical release findings cannot silently be waived.

## Lifecycle, delivered AI and platform placement

Use the [G0–G9 checklist](../templates/client-repo/docs/governance/lifecycle-gates.md) and [release record](../templates/client-repo/docs/governance/release-readiness.md). New public write actions, sensitive data, preview production use, unconstrained tools, unsupported extensions or missing rollback need architecture/security review.

Prefer supported product configuration before bespoke extensions. Use Copilot Studio for supported conversational actions; Power Platform/Dynamics for structured processes; Azure/Foundry for specialist compute/AI; Fabric for governed analytics. Record alternatives, supportability, identity, cost and preview assessment in the ADR. Platform choice is separate from development-agent choice.

[Delivered-agent assurance](../templates/client-repo/docs/responsible-ai/agent-assurance.md) records evaluations, tool authority, fallback, traceability and kill switch. Organize risk assessment using Govern, Map, Measure and Manage where useful. [NIST AI RMF](https://www.nist.gov/itl/ai-risk-management-framework) is voluntary, not itself a legal obligation.
