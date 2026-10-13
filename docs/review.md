# v0.1 review and refinement record

Review date: 13 October 2026. This is an engineering/documentation review of the reference package, not an institutional policy sign-off or a client-tenant certification.

## Content review

The supplied HTML playbook was examined directly. The reference retains its 13 workload areas, seven lifecycle stages, human-owned backlog and Crimson visual identity. Claude-specific operating language was separated from shared delivery requirements.

First-party documentation informed the install, instruction, skill, MCP, permission and plugin guidance. The source register records those references and the checked date. Suggested community articles without supplied exact URLs are labelled as research leads, not cited as verified setup instructions.

Specific refinements:

- Distinguished Copilot CLI from VS Code and Local from Agent Host behavior.
- Corrected VS Code false auto-approval rules: confirmation, not command blocking.
- Kept DEV-only identity and environment controls separate from natural-language rules.
- Labelled standard-agent Copilot Studio tooling as experimental and its different-harness successor as work in progress.
- Used portable public Learn-only MCP configuration and an inactive VS Code-format alternative to avoid duplicate registrations.
- Required source export/synchronization for low-code DEV changes before promotion.
- Removed old Claude-only recordings from authoritative onboarding instead of relabelling them.
- Used pac env who, the recommended form, rather than relying on the legacy org alias.

## Verification performed

| Area | Evidence |
| --- | --- |
| Automated checks | npm run check: 19 tests passed; static publication build completed |
| Browser interactions | tests/browser-check.js exercised through a Playwright browser harness: 31 checks passed |
| Adapter consistency | Both selectors synchronize; criteria/verification text remains identical across all three routes |
| Reading routes | Pre-rendered/no-JavaScript pages, blocked storage, malformed preferences and keyboard skip navigation checked |
| Search and print | Family/search combinations, empty state, complete print workload list and restoration checked |
| Downloads | Client ZIP served as a ZIP and inspected for hidden instruction/config files and all six skills |
| Failure behavior | Denied clipboard access reports the problem and selects the actual example for manual copying |
| Responsive review | Desktop and 390px mobile screenshots examined; 320px viewport had no page-level overflow |
| Contrast spot checks | Muted text on paper 6.24:1; red on white 5.46:1; links on paper 7.39:1; white on lightest hero gradient stop 7.84:1 |

The screenshots and detailed browser output were captured in session review artifacts; they contain no client data. The browser check file is a function for a Playwright harness supplying page, not an additional dependency or a claim that browser tests run in the default CI workflow.

The first automated run exposed a Windows CRLF-sensitive fixture expectation. Assertions now accept host line endings; repository attributes define portable text handling.

The first rendered review identified a stale count when printing a filtered list. Print now shows all 13 workloads with a matching count, then restores the reader's filter. Nonfunctional switch/filter/copy controls are hidden on the no-JavaScript route. Repeated VS Code adapter prose was reduced without removing setup warnings.

The design detector flagged the workload cards' coloured top borders with rounded corners. They are retained deliberately from the supplied visual system as workload-family markers, not introduced decoration. No detector suppression was added. This is not a formal WCAG conformance audit.

## Not claimed

No actual Claude/Copilot client configuration test, live Dataverse/MCP tenant call, production-access test, comparative story pilot, replacement recording, organization-wide approval or live hosting deployment was performed.

Those require approved accounts/environments and the named administrator, engagement lead and publication owner. The client template's setup evidence begins as not run/unvalidated. An agent must not infer operational approval from this review.

## Publication position

The built artifact is ready for review and publication as a clearly labelled internal reference. Follow publication.md for access-controlled hosting and accountable sign-off. Complete per-tool client setup validation before using it for real environment operations, and pilot.md before making comparative performance/cost claims.
