# Prototype to enterprise

A shared or useful prototype is not automatically production-ready. This applies regardless of which coding agent, discovery assistant or maker tool created it. Keep experiments contained in approved DEV with synthetic data and an owner; do not quietly introduce real users, customer data or operational decisions.

Use the [graduation record](../templates/client-repo/docs/governance/prototype-graduation.md). Reconstruct the requirements and architecture, establish named Business and Technical Owners, move source-representable assets to the approved repository, review dependencies/licenses/provenance, remove embedded credentials and personal connections, and assess identity, privacy, threats and maintainability.

Then collect automated/role-based/user evidence and applicable delivered-AI evaluations. Prepare repeatable deployment, environment configuration, rollback, monitoring, cost thresholds, runbook and support. Obtain independent review, customer acceptance and authorized human release approval before production use.

Git export or a draft PR is a starting point, not proof of readiness. Unsupported export/ALM capabilities are explicit blockers or formally approved constraints, not reasons to bypass review. If graduation is unsuitable, record continued containment or retirement, revoke access and follow lawful data retention/deletion.
