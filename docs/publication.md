# Publish and adopt the reference

Version 0.1.0 is a documentation-checked reference package, not a certification of client-tenant setup or an approved company policy. Publication and client-operation approval are separate decisions.

## Build the distributable

In the source repository, use Node.js 22+:

```powershell
npm ci
npm run check
```

Publish the contents of dist. It includes the pre-rendered site, tool-specific pages, all reference docs, the browsable template and downloads/crimson-client-template.zip. The template ZIP includes dotfiles and skills.

The complete publication archive is dist/downloads/crimson-reference-v0.1.0.zip. It is already built: extract it into the approved static host; Node/npm are not needed to serve those files. Rebuilding and running the bundled local preview commands require the source repository, not just the publication ZIP.

To preview:

```powershell
npm run preview
```

The local server binds to 127.0.0.1, not all interfaces. A GitHub Actions artifact packages the site when the validation workflow runs; this does not deploy it or grant access to Crimson employees.

See review.md for the completed package review, refinements and checks, and the boundaries of that evidence.

## Host and access

Select an approved internal static host that actually serves HTML and JavaScript, such as an authenticated intranet or an appropriately configured static web service. Uploading HTML to a document library may only provide a download/preview, not a functioning website.

Verify Crimson employee access and the host's data handling before sharing. A private repository is not proof that its Pages site is private. Do not enable public hosting merely to make distribution convenient. No client secrets or operational data belong in the published package.

The site has no analytics, remote fonts or embedded third-party resources. External source links contact the publisher only when opened.

## Publication checklist

- [ ] Named playbook owner and technical approver accept the reference wording and scope.
- [ ] Both coding-tool choices and separate Copilot surfaces work on the target host.
- [ ] Internal access restrictions are tested as a Crimson user and an unauthorized user.
- [ ] Template download is a ZIP, opens successfully and includes hidden files.
- [ ] Mobile, keyboard, no-JavaScript and printed reading routes remain usable.
- [ ] Host MIME types serve .js as JavaScript, .css as CSS and .zip as a download.
- [ ] Relative paths work if hosted under a project subpath.
- [ ] Version, checked date, support boundaries and the route for reporting errors are visible.
- [ ] The original videos are not represented as current Copilot or neutral setup.
- [ ] Client setup/pilot evidence is described honestly as not yet completed centrally.

Publish as a reference only with those limitations visible. Before describing an adapter as tenant-validated operating guidance, complete its per-tool DEV setup record and get accountable approval.

## Adoption

Start with one internal or approved client pilot. Have the engagement lead approve the configured template, administrators validate access and the developer collect a complete evidence pack.

Use the three-story comparison in pilot.md before making claims about cost, speed or developer preference. A failed boundary check blocks operational adoption; it must not be hidden in an average score.

## Ongoing approval

Use PRs for playbook and template changes. Recheck affected adapters after host/plugin/MCP updates and after incidents. Publication does not approve future clients, new data sources, new models or new administrator privileges.
