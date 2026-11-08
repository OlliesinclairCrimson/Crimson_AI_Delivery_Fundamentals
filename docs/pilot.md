# Compare tools using the delivery standard

This release supplies the procedure and scorecard, not completed pilot results or a declared winner.

## Preparation

Select three representative accepted stories: a Dataverse table set, a cloud flow with a failure path, and a Copilot Studio topic with an evaluation set.

Use identical AGENTS.md, skills, approved scope, acceptance criteria, starting source and synthetic data in both coding tools. Record the actual Copilot surface. Avoid mixing CLI and VS Code outcomes under one unlabeled tool result.

Use the same developer for paired runs; alternate tool order across stories and record prior exposure. Use a consistent human reviewer and severity rubric. This reduces bias but does not eliminate learning effects.

Use isolated DEV environments or an approved, controlled reset to the same starting state. A Git branch does not isolate live Dataverse/flow changes.

## Capture

Use the supplied CSV scorecard. Record accepted outcome, critical/high/other review defects, rework time, elapsed/hands-on time, manual interventions, setup time, standards, DEV/approval boundary compliance and developer preference.

Record tool, host, model/plugin versions and source/evidence references. Capture actual usage units and costs with currency/date; keep allocated subscription cost separate. Do not fabricate per-story cost from a subscription price alone.

## Gate and interpretation

A serious access, approval or data-use breach fails the run and blocks operational adoption until resolved. Escalate the incident; cheap/fast output is not compensation.

Compare only accepted results under the same rubric. Explain missing evidence and failed stories. Identify workload-specific advantages and unresolved gaps; three stories are directional evidence, not a statistically conclusive ranking.

Have the technical lead and engagement owner review the recommendation. Keep the playbook usable whichever adapter is chosen.

## Expanded workloads

The original three stories remain a useful small pilot. Add approved Azure, Foundry, Fabric or Dynamics cases only when relevant, with the same spec, source, data, budgets and reviewer for both tools. Record native-tool versus plugin use and each surface's unsupported capabilities explicitly; do not average an unrun/unsupported route into a claimed success.

Measure accepted results and applicable gate/evaluation evidence, not generated artifact counts. Both agents remain equal choices under the common controls; workload-specific evidence is not a blanket preferred-agent policy.
