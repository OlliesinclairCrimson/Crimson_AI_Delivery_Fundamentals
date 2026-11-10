# Crimson AI Delivery Fundamentals

A tool-neutral reference for Crimson developers and consultants: delivery fundamentals, human-owned lifecycle gates, Microsoft platform workload guidance, Claude Code and GitHub Copilot adapters, and a downloadable client-repo starter.

**Version 0.2.0** is a reference release. Claude Code and GitHub Copilot are equal choices: first-time readers select a tool before tool-specific guidance is shown. New platform documentation was checked on 8 November 2026; existing adapters retain their 13 October check date. No live tenant validation or completed comparative pilot is claimed. The paper-derived guidance is adapted from a draft, not an assertion of approved Crimson policy.

Read [agentic development](docs/agentic-development.md), [paper alignment](docs/standard-alignment.md) and [prototype graduation](docs/prototype-graduation.md). Detailed shared setup routes cover [Azure](docs/platforms/azure.md), [Microsoft Foundry](docs/platforms/microsoft-foundry.md), [Fabric](docs/platforms/fabric.md) and [Dynamics 365](docs/platforms/dynamics-365.md), with separate harness notes and explicit privilege/support boundaries.

## Read and preview

Requires Node.js 22+ and npm. There are no runtime dependencies or external font/analytics requests.

```powershell
npm ci
npm run dev
```

Open the local URL printed by the server (normally http://127.0.0.1:4173). If the port is occupied, use `$env:PORT = '4174'; npm run dev`.

```powershell
npm run check
```

This runs the automated content/render/build/server tests and produces `dist`. The static site works without a backend; JavaScript enhances adapter selection, search, filters and copying. Pre-rendered tool pages and Markdown guides provide non-JavaScript routes.

## What to publish

Publish the **contents of dist**, not the repository root. It contains the site, all three pre-rendered tool routes, reference documents and `downloads/crimson-client-template.zip`, including hidden instruction and config files.

Use an approved Crimson-access-controlled static host. Do not assume a private Git repository makes GitHub Pages private. [Publication guidance](docs/publication.md) covers packaging, access, review and launch checks. Nothing in this repo automatically publishes publicly or accesses a client tenant.

The validation workflow checks changes and packages a site artifact. Uploading a workflow artifact is not a live-site deployment.

## Maintain

- Shared content and workload/setup data: `data.js` and `index.html`
- Host-independent rendering: `render.js`
- Browser enhancements and preserved preferences: `app.js`
- Existing Crimson visual identity, with local font fallbacks: `styles.css`
- Official [Crimson wordmark](https://crimson.co.uk/hubfs/Crimson%20-%20Wordmark%20-%20Positive%20-%20RGB.svg): bundled unchanged as `assets\crimson-wordmark.svg`, with no external image request
- Short tool guides: [Claude Code](docs/adapters/claude-code.md) and [GitHub Copilot](docs/adapters/github-copilot.md)
- Canonical client template: `templates\client-repo`
- Reusable tool, lifecycle, release, exception and graduation records: `templates\client-repo\docs\governance`; delivered-agent assurance: `templates\client-repo\docs\responsible-ai`
- [Maintenance ownership](docs/maintenance.md), [training refresh](docs/training.md), [pilot procedure](docs/pilot.md) and [release notes](docs/release-notes.md)
- [Completed review and refinement record](docs/review.md), including what remains tenant-specific

The original developer's ZIP is the content/visual baseline. Its Claude-specific recordings are intentionally excluded from current onboarding, not relabelled as tool-neutral videos.
