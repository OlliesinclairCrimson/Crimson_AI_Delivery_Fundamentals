# Ownership and maintenance

The publication owner must assign real people to these roles before organization-wide launch. No named person is assumed in this first release.

| Role | Responsibility |
| --- | --- |
| Playbook owner | Scope, clarity, contributor route, versioning and publication approval |
| Technical approver | Standards, adapters, template safety and validation evidence |
| Platform administrator | Environment/client registration, identity, approvals and tenant tests |
| Training owner | Written setup and replacement recordings/captions |
| Engagement lead | Client-specific permission, template completion and adoption |

## Change workflow

1. Raise a concrete issue with section, tool/host/version, observed behavior and sanitized evidence.
2. Update the canonical shared content or the affected adapter, not every tool page.
3. Run npm run check and manually exercise changed browser behavior.
4. For configuration/policy changes, repeat per-tool setup-validation in approved DEV.
5. Obtain human review and record the change in release notes.
6. Publish the built artifact only to the approved host.

## Review triggers

Host, plugin, schema or MCP changes; new licensing/model choices; an access or approval incident; repeated reviewer rework; client policy changes; or a newly supported workload/surface.

Keep a current source/check date and version evidence. Vendor documentation and support status can change faster than the fundamentals. Where documentation conflicts, identify the actual supported host/version and retain conservative controls rather than claiming universal enforcement.

Retrospective updates to AGENTS.md and skills follow the same human review requirement as code. A personal agent memory entry is not a team policy.
