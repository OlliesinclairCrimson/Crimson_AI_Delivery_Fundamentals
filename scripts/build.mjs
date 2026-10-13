import { cp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { dirname, join, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { zipSync } from "fflate";
import { release, sources } from "../data.js";
import { filtersHtml, lifecycleHtml, selectors, setupHtml, sourcesHtml, workloadHtml } from "../render.js";

export const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

export async function collectFiles(directory, prefix = "") {
  const result = {};
  const entries = await readdir(directory, { withFileTypes: true });
  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    const filename = join(directory, entry.name);
    const archivePath = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) Object.assign(result, await collectFiles(filename, archivePath));
    else if (entry.isFile()) result[archivePath] = new Uint8Array(await readFile(filename));
    else throw new Error(`Unsupported build input: ${filename}`);
  }
  return result;
}

export function renderPage(template, selection) {
  const replacements = {
    LIFECYCLE: lifecycleHtml(),
    WORKLOAD_SELECTORS: selectors("workloads", selection),
    SETUP_SELECTORS: selectors("setup", selection),
    FILTERS: filtersHtml(),
    WORKLOADS: workloadHtml(selection),
    SETUP: setupHtml(selection),
    SOURCES: sourcesHtml()
  };
  let html = template.replace("<body>", `<body data-tool="${selection.tool}" data-surface="${selection.surface}">`);
  for (const [name, content] of Object.entries(replacements)) {
    const marker = `<!-- ${name} -->`;
    if (!html.includes(marker)) throw new Error(`Missing build marker: ${name}`);
    html = html.replace(marker, () => content);
  }
  if (/<!-- (?:LIFECYCLE|WORKLOADS|SETUP|SOURCES|FILTERS|[A-Z]+_SELECTORS) -->/.test(html)) throw new Error("Unresolved content marker");
  return html;
}

export async function buildSite(output = join(projectRoot, "dist")) {
  const destination = resolve(output);
  if (destination === projectRoot || !destination.startsWith(projectRoot + sep)) throw new Error("Build output must be a named descendant of the project root");
  if (destination !== join(projectRoot, "dist")) throw new Error("Only the generated dist directory may be replaced");
  await rm(destination, { recursive: true, force: true });
  await mkdir(join(destination, "downloads"), { recursive: true });
  for (const filename of ["styles.css", "app.js", "data.js", "render.js", "assets", "docs", "templates"]) {
    await cp(join(projectRoot, filename), join(destination, filename), { recursive: true });
  }
  const template = await readFile(join(projectRoot, "index.html"), "utf8");
  const pages = {
    "index.html": { tool: "claudeCode", surface: "cli" },
    "claude-code.html": { tool: "claudeCode", surface: "cli" },
    "copilot-cli.html": { tool: "copilot", surface: "cli" },
    "copilot-vscode.html": { tool: "copilot", surface: "vscode" }
  };
  for (const [filename, selection] of Object.entries(pages)) {
    await writeFile(join(destination, filename), renderPage(template, selection));
  }
  await writeFile(join(destination, ".nojekyll"), "");
  await writeFile(join(destination, "README.txt"), `Crimson AI Delivery Fundamentals v${release.version}\n\nThis is a pre-built static reference. Publish these extracted files to an approved access-controlled Crimson host. No Node/npm backend is needed to serve them.\n\nStart with index.html. JavaScript works when served by an HTTP(S) host; direct file opening may limit enhancements. Pre-rendered tool routes and documents remain available.\n\nSee docs/publication.md and docs/review.md. No live tenant validation, organization approval or hosting deployment is claimed. The client starter is intentionally unconfigured.\n`);
  await writeFile(join(destination, "docs", "sources.md"), `# First-party source register\n\nDocumentation checked ${release.reviewed}. Not a tenant-validation claim.\n\n${sources.map(source => `- [${source.title}](${source.url}): ${source.note}`).join("\n")}\n`);
  const zipOptions = { level: 6, mtime: new Date("2026-10-13T00:00:00Z") };
  const clientFiles = await collectFiles(join(projectRoot, "templates", "client-repo"), "client-repo");
  await writeFile(join(destination, "downloads", "crimson-client-template.zip"), zipSync(clientFiles, zipOptions));
  const siteFiles = await collectFiles(destination);
  await writeFile(join(destination, "downloads", `crimson-reference-v${release.version}.zip`), zipSync(siteFiles, zipOptions));
  return destination;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const output = await buildSite();
  console.log(`Built reference v${release.version} in ${output}`);
}
