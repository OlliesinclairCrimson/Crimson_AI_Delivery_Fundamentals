---
name: verification-evidence
description: Plan or collect evidence for a story's acceptance criteria; use when running tests, reviewing checker results, testing security roles or preparing a demonstration.
---

# Verification evidence

Read AGENTS.md and the accepted criteria. Confirm approved DEV and identity before environment calls. Do not test by attempting TEST/PROD access or elevate privileges.

1. Map each criterion ID to a command, test, observation or human check.
2. Run only approved checks; capture actual outcome, version and timestamp.
3. Include realistic roles, negative permissions, error paths and relevant workload checks.
4. Record checker severities and unresolved failures without suppressing them.
5. Distinguish pass, fail, blocked and not run. Never convert missing evidence into a pass.
6. Sanitize evidence; reference approved storage rather than committing sensitive logs.

Use docs/evidence/evidence-template.md. Return uncovered criteria, defects and required human acceptance decisions. Release/publish permission is not implied by a test instruction.
