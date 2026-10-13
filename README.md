# Crimson AI Delivery Fundamentals

A tool-neutral reference for Crimson developers and consultants: delivery fundamentals, human-owned lifecycle gates, Power Platform workload guidance, Claude Code and GitHub Copilot adapters, and a downloadable client-repo starter.

**Version 0.1.0** is a reference release. Tool instructions were checked against first-party documentation on 13 October 2026; no live client/tenant validation or comparative pilot is claimed. The engagement lead must approve client data, identity, access and tool use.

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
- [Maintenance ownership](docs/maintenance.md), [training refresh](docs/training.md), [pilot procedure](docs/pilot.md) and [release notes](docs/release-notes.md)
- [Completed review and refinement record](docs/review.md), including what remains tenant-specific

The original developer's ZIP is the content/visual baseline. Its Claude-specific recordings are intentionally excluded from current onboarding, not relabelled as tool-neutral videos.
