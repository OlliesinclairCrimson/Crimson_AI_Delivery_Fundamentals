# Lifecycle gate record

Status: UNCONFIGURED. Apply approved engagement controls; this reference does not turn the source paper's draft into organizational policy.

Business Owner:
Technical Owner:
Requirement / issue / artifact revision:
Data classification / risk tier / rationale:
Applicable policy / approval reference:

| Gate | Stage / sequence | Required evidence | Applicability and rationale | Result / evidence / human owner |
| --- | --- | --- | --- | --- |
| G0 Intake | Discover | Problem, users, value, named owners, data scope, risk tier | | not run |
| G1 Architecture | Shape | Placement, context/identity/data/integration design, NFRs, threat, cost, preview assessment | | not run |
| G2 Specification | Design | Versioned requirements, measurable criteria, test strategy, autonomy and delivery scope | | not run |
| G3 Build readiness | Before Build | Approved DEV/repo, instructions, tools, identity, secrets management, branch rules and CI | | not run |
| G4 Engineering assurance | Verify | Independent human PR review, tests, scans, accessibility and architectural conformity | | not run |
| G5 AI assurance | Verify, delivered AI only | Evaluation thresholds/results, model/prompt versions, tool authority, approval/fallback tests | | not run |
| G6 Release | Before production use | Acceptance, artifact, authorized release approval, deployment and tested recovery plan | | not run |
| G7 Operational readiness | Before production use | Support, runbook, telemetry/alerts, capacity/cost limits, incidents and continuity | | not run |
| G8 Post-release | Run and improve | Human-owned smoke tests, telemetry/risk review and customer handover | | not run |
| G9 Retirement | When retiring | Human-owned access revocation, lawful retention/deletion, disabled endpoints and archive | | not run |

Results: pass / fail / blocked / not run / not applicable. Not applicable requires a recorded rationale and human decision. AI-assisted authorship alone does not make G5 applicable; delivered AI does. Applicable missing evidence is not a pass.

Unresolved blockers / defects:
Approved exceptions with owner, approver and expiry:
Material changes requiring earlier gates to repeat:

Use [release readiness](release-readiness.md), [delivered-agent assurance](../responsible-ai/agent-assurance.md) and [verification evidence](../evidence/evidence-template.md). Human owners perform TEST/PROD and retirement operations; development agents do not gain those permissions from this record.
