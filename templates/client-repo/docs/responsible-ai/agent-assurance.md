# Delivered-agent assurance

Status: not evaluated. Use for AI within delivered solutions, not solely because AI helped write conventional software.

Solution / artifact / requirement:
Applicability / human-approved rationale:
Accountable Business Owner / AI technical owner:
Purpose / prohibited uses / affected users:
Risk tier / privacy and threat assessment:
Model, provider, version, deployment and selection rationale:
Prompt/system instruction, orchestration and safety-policy revisions:
Knowledge sources, permissions, citation/grounding and refresh owner:

## Per-action authority

| Tool / version | Allowed action, target and parameter constraints | Identity / data scope | Human approval / escalation | Failure / fallback |
| --- | --- | --- | --- | --- |
| | | | | |

Validate inputs and results independently of the model. High-impact approval binds actor, action, exact target and parameters; changes require renewal. AI output is not sole authority for access control, legal decisions, financial commitments, safety-critical actions or production approval.

## Evaluation and regression

Dataset/version / approved provenance / representative users and scenarios:
Evaluator/version / reproducible procedure:

| Test | Measurable acceptance threshold agreed before run | Actual result / sanitized evidence | Status |
| --- | --- | --- | --- |
| Accuracy / groundedness / citations | | | not run |
| Safety / prohibited use / privacy | | | not run |
| Prompt injection / adversarial retrieved content | | | not run |
| Tool selection / parameter validation / unauthorized actions | | | not run |
| Exact-action human approval / escalation | | | not run |
| Empty retrieval / outage / malformed response / fallback | | | not run |
| Latency / availability / token-credit and cost limits | | | not run |
| Kill switch / recovery / monitoring alerts | | | not run |

Do not invent thresholds or count missing tests as passing. Use synthetic data unless explicitly approved. Record failures, blocked checks, applicability and independent human acceptance.

## Operations

Privacy, retention, residency and minimized conversation/trace logging:
Agent/initiator, tool-call, approval and outcome trace references:
Latency, usage, budget caps/alerts and stop conditions:
Support owner / feedback / incident response / kill-switch authority:
Fallback and continuity procedure:
Re-evaluation triggers: model, prompt, knowledge, tools, safety policy, orchestration, permissions or significant incidents:
G5 reviewer and decision / approved exceptions / expiry:

Version and regression-test material changes. Runtime actions need their own assessed authority; this record never grants the development assistant TEST/PROD access. NIST AI RMF's Govern/Map/Measure/Manage can structure assessment but is voluntary, not a legal obligation.
