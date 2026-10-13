---
name: review-readiness
description: Prepare a change for human pull-request review; use before opening a PR or when checking source diffs, dependencies, evidence and release notes.
---

# PR review readiness

Read AGENTS.md and the accepted story. Do not approve, merge or publish your own work.

1. Confirm the change is on the story branch and matches agreed scope.
2. Inspect source diffs, generated artifacts, dependency/config changes and accidental sensitive content.
3. Confirm low-code DEV changes have been exported/synchronized into reviewable source.
4. Check each criterion has evidence; list failures and unrun checks.
5. Describe risk, environment variables, connection references, rollback and support ownership.
6. Prepare the PR using .github/PULL_REQUEST_TEMPLATE.md.

Return ready or blocked, with concrete reasons. An agent review supplements but never substitutes for the named human reviewer.
