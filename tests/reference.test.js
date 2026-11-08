import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { readFile, stat } from "node:fs/promises";
import { join, resolve } from "node:path";
import { unzipSync } from "fflate";
import { families, lifecycleGates, release, setupSteps, sources, stages, workloads } from "../data.js";
import { adapterLabel, escapeHtml, filteredWorkloads, normalizeSelection, setupHtml, sourceLink, workloadHtml } from "../render.js";
import { buildSite, collectFiles, projectRoot, renderPage } from "../scripts/build.mjs";
import { createPreviewServer } from "../scripts/serve.mjs";

const selections = [
  { tool: "claudeCode", surface: "cli" },
  { tool: "copilot", surface: "cli" },
  { tool: "copilot", surface: "vscode" }
];
let directory;
let server;
let baseUrl;

before(async () => {
  directory = await buildSite();
  server = createPreviewServer(directory);
  await new Promise((resolveListen, reject) => { server.once("error", reject); server.listen(0, "127.0.0.1", resolveListen); });
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});
after(async () => { if (server) await new Promise(resolveClose => server.close(resolveClose)); });

test("preserves seven stages and original workloads while adding five platform routes", () => {
  assert.equal(stages.length, 7);
  assert.equal(workloads.length, 18);
  assert.equal(Object.keys(families).length, 6);
  assert.equal(new Set(workloads.map(item => item.id)).size, workloads.length);
  for (const id of ["canvas", "model", "generative", "code", "pages", "mobile", "cloud-flows", "desktop-flows", "studio", "dataverse", "alm", "plugins", "pcf", "azure", "foundry", "fabric", "dynamics-ce", "dynamics-fo"]) assert.ok(workloads.some(item => item.id === id));
  for (const stage of stages) for (const key of ["agent", "human", "output", "gate"]) assert.ok(stage[key]);
});

test("every workload and setup step has all three documented adapter routes", () => {
  assert.equal(setupSteps.length, 7);
  for (const item of [...workloads, ...setupSteps]) {
    assert.ok(item.claudeCode);
    assert.ok(item.copilot.cli);
    assert.ok(item.copilot.vscode);
  }
});

test("normalizes invalid preferences without inventing adapter values", () => {
  assert.deepEqual(normalizeSelection("unknown", "unknown"), { tool: null, surface: "cli" });
  assert.deepEqual(normalizeSelection("copilot", "unknown"), { tool: null, surface: "cli" });
  assert.deepEqual(normalizeSelection("claudeCode", undefined), { tool: null, surface: "cli" });
  assert.deepEqual(normalizeSelection("copilot", "vscode"), selections[2]);
  assert.equal(adapterLabel(selections[1]), "GitHub Copilot CLI");
});

test("rendering escapes markup, quotes and ampersands", () => {
  assert.equal(escapeHtml('<script title="x">&\'</script>'), "&lt;script title=&quot;x&quot;&gt;&amp;&#39;&lt;/script&gt;");
});

test("tool switching keeps all verification requirements identical", () => {
  const extract = html => [...html.matchAll(/<dd data-verification>(.*?)<\/dd>/g)].map(match => match[1]);
  const baseline = extract(workloadHtml(selections[0]));
  assert.equal(baseline.length, workloads.length);
  for (const selection of [...selections.slice(1), { tool: null, surface: "cli" }]) assert.deepEqual(extract(workloadHtml(selection)), baseline);
});

test("CLI plugins are not represented as ordinary VS Code slash-command installs", () => {
  assert.match(setupHtml(selections[1]), /Inside Copilot CLI/);
  assert.doesNotMatch(setupHtml(selections[2]), /\/plugin install/);
  assert.doesNotMatch(workloadHtml(selections[2]), /<pre id="install-/);
});

test("permissions guidance distinguishes asking from denying and does not enable bypass", () => {
  const vscode = setupHtml(selections[2]);
  assert.match(vscode, /does not block execution/);
  assert.match(vscode, /Some Agent Host worktree sessions use Allow all/);
  assert.match(setupHtml(selections[1]), /shell\(pac\)/);
  assert.doesNotMatch(setupHtml(selections[1]), /--allow-all-tools/);
  assert.doesNotMatch(setupHtml(selections[0]), /--dangerously-skip-permissions/);
});

test("filtering handles families, case, whitespace and empty matches", () => {
  assert.equal(filteredWorkloads("all").length, workloads.length);
  assert.equal(filteredWorkloads("automation").length, 2);
  assert.equal(filteredWorkloads("all", "  CLOUD FLOWS ").at(0).id, "cloud-flows");
  assert.equal(filteredWorkloads("apps", "cloud flows").length, 0);
  assert.equal(filteredWorkloads("all", "no-such-workload").length, 0);
});

test("all source references resolve to unique HTTPS first-party entries", () => {
  assert.equal(new Set(sources.map(source => source.id)).size, sources.length);
  for (const source of sources) {
    assert.match(source.url, /^https:\/\//);
    assert.ok(source.note);
  }
  for (const workload of workloads) sourceLink(workload.source);
  for (const step of setupSteps) {
    sourceLink(step.claudeCode.source);
    sourceLink(step.copilot.cli.source);
    sourceLink(step.copilot.vscode.source);
  }
  assert.throws(() => sourceLink("missing"), /Unknown source/);
});

test("build refuses missing content markers and unsafe output directories", async () => {
  assert.throws(() => renderPage("<body></body>", selections[0]), /Missing build marker/);
  await assert.rejects(buildSite(projectRoot), /named descendant/);
  await assert.rejects(buildSite(resolve(projectRoot, "docs")), /Only the generated dist/);
});

test("all pre-rendered pages have complete content, unique IDs and valid copy targets", async () => {
  for (const filename of ["index.html", "claude-code.html", "copilot-cli.html", "copilot-vscode.html"]) {
    const html = await readFile(join(directory, filename), "utf8");
    assert.equal([...html.matchAll(/data-workload="/g)].length, workloads.length);
    assert.equal([...html.matchAll(/class="setup-step"/g)].length, 7);
    const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
    assert.equal(ids.length, new Set(ids).size, `${filename}: duplicate id`);
    for (const match of html.matchAll(/data-copy="([^"]+)"/g)) assert.ok(ids.includes(match[1]), `Missing copy target ${match[1]}`);
    for (const match of html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.includes(match[1]), `Missing anchor ${match[1]}`);
    assert.doesNotMatch(html, /<!-- (?:WORKLOADS|SETUP|SOURCES|FILTERS|LIFECYCLE) -->/);
    assert.match(html, /Reference release, not blanket client approval/);
    assert.match(html, /<p>Based on Playbook by Nicholas Rowan<\/p>/);
    assert.match(html, /<img class="wordmark" src="assets\/crimson-wordmark\.svg" alt="Crimson" width="1612" height="254">/);
    assert.doesNotMatch(html, /fonts\.googleapis|<iframe|<video/);
  }
});

test("static Copilot pages contain the correct initial tool and setup route", async () => {
  const cli = await readFile(join(directory, "copilot-cli.html"), "utf8");
  const vscode = await readFile(join(directory, "copilot-vscode.html"), "utf8");
  assert.match(cli, /data-tool="copilot" data-surface="cli"/);
  assert.match(cli, /winget install GitHub.Copilot/);
  assert.match(vscode, /data-tool="copilot" data-surface="vscode"/);
  assert.match(vscode, /false command rule asks for approval/);
});

test("index has no preferred or implicit adapter while explicit routes remain selected", async () => {
  const html = await readFile(join(directory, "index.html"), "utf8");
  assert.match(html, /data-tool="" data-surface="cli"/);
  assert.equal([...html.matchAll(/data-tool="(?:claudeCode|copilot)" aria-pressed="true"/g)].length, 0);
  assert.doesNotMatch(html, /data-adapter|winget install|\/plugin install/);
  assert.match(html, /Neither is preferred/);
  assert.equal([...html.matchAll(/data-verification/g)].length, workloads.length);
  assert.equal([...html.matchAll(/class="setup-step"/g)].length, setupSteps.length);
  const claude = await readFile(join(directory, "claude-code.html"), "utf8");
  assert.match(claude, /data-tool="claudeCode"/);
  assert.match(claude, /winget install Anthropic.ClaudeCode/);
});

test("G0-G9 mapping places readiness before build and operation before production", () => {
  assert.deepEqual(lifecycleGates.map(gate => gate.id), Array.from({ length: 10 }, (_, i) => `G${i}`));
  for (const gate of lifecycleGates) {
    assert.ok(stages.some(stage => stage.title === gate.stage));
    assert.ok(gate.evidence);
  }
  assert.equal(lifecycleGates[3].stage, "Build");
  assert.match(lifecycleGates[3].evidence, /before implementation/);
  assert.equal(lifecycleGates[5].stage, "Verify");
  assert.match(lifecycleGates[5].evidence, /Delivered-AI/);
  assert.equal(lifecycleGates[7].stage, "Release");
  assert.match(lifecycleGates[7].evidence, /before production/);
});

test("new platform guides have all harness routes and truthful native-tool boundaries", async () => {
  for (const guide of new Set(workloads.filter(workload => workload.guide).map(workload => workload.guide))) {
    const content = await readFile(join(projectRoot, ...guide.split("/")), "utf8");
    for (const route of ["Claude Code", "Copilot CLI", "Copilot in VS Code"]) assert.ok(content.includes(route), `${guide}: missing ${route}`);
    assert.match(content, /8 November 2026/);
    assert.match(content, /[Nn]o live|not a live/);
    assert.match(content, /[Hh]uman|[Pp]erson/);
    assert.doesNotMatch(content, /--allow-all|--dangerously-skip|\/yolo/);
  }
  const dynamics = await readFile(join(projectRoot, "docs", "platforms", "dynamics-365.md"), "utf8");
  assert.match(dynamics, /PAC is not an X\+\+ compiler/);
  assert.match(dynamics, /System Administrator/);
  assert.match(dynamics, /not permission to elevate/);
});

test("new assurance records are packaged and require approval and actual evidence", async () => {
  const zip = unzipSync(await readFile(join(directory, "downloads", "crimson-client-template.zip")));
  for (const path of ["governance/tool-register.md", "governance/lifecycle-gates.md", "governance/release-readiness.md", "governance/exception-template.md", "governance/prototype-graduation.md", "responsible-ai/agent-assurance.md"]) {
    assert.ok(zip[`client-repo/docs/${path}`], `Missing ${path}`);
  }
  const decode = path => new TextDecoder().decode(zip[`client-repo/docs/${path}`]);
  const tool = decode("governance/tool-register.md");
  for (const field of ["Accountable owner", "source URL", "Version", "Maturity", "Approval status", "Data classification", "Permission scope", "Threat", "expiry"]) assert.ok(tool.includes(field), `Tool register missing ${field}`);
  assert.match(decode("governance/exception-template.md"), /Expiry/);
  const ai = decode("responsible-ai/agent-assurance.md");
  for (const field of ["Measurable acceptance threshold", "Prompt injection", "exact target and parameters", "Kill switch", "Re-evaluation triggers"]) assert.ok(ai.includes(field));
  assert.match(ai, /not solely because AI helped/);
  assert.match(decode("governance/lifecycle-gates.md"), /Not applicable requires a recorded rationale/);
});

test("all local Markdown links resolve within the packaged documents", async () => {
  const files = await collectFiles(directory);
  for (const [filename, bytes] of Object.entries(files)) {
    if (!filename.endsWith(".md")) continue;
    const content = new TextDecoder().decode(bytes);
    for (const match of content.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) {
      const link = match[1];
      if (/^(?:https?:|#)/.test(link)) continue;
      const target = resolve(directory, ...filename.split("/").slice(0, -1), ...link.split("#")[0].split("/"));
      await assert.doesNotReject(stat(target), `${filename}: missing ${link}`);
    }
  }
});

test("release metadata and source dates do not relabel historical checks", async () => {
  const pkg = JSON.parse(await readFile(join(projectRoot, "package.json"), "utf8"));
  const lock = JSON.parse(await readFile(join(projectRoot, "package-lock.json"), "utf8"));
  assert.equal(pkg.version, release.version);
  assert.equal(lock.version, release.version);
  assert.equal(lock.packages[""].version, release.version);
  const sourceRegister = await readFile(join(directory, "docs", "sources.md"), "utf8");
  assert.match(sourceRegister, /Checked 2026-10-13/);
  assert.match(sourceRegister, /Checked 2026-11-08/);
  const alignment = await readFile(join(projectRoot, "docs", "standard-alignment.md"), "utf8");
  assert.match(alignment, /Deliberately exclude GitHub Copilot preference/);
  assert.match(alignment, /draft v0.9/);
});

test("all local HTML links, script and stylesheet targets are packaged", async () => {
  const files = await collectFiles(directory);
  for (const [filename, bytes] of Object.entries(files)) {
    if (!filename.endsWith(".html")) continue;
    const html = new TextDecoder().decode(bytes);
    for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
      const link = match[1];
      if (/^(?:https:|#)/.test(link)) continue;
      const target = link.split("#")[0];
      assert.ok(Object.hasOwn(files, target), `${filename} links to missing ${target}`);
    }
  }
});

test("template ZIP contains dotfiles, all six portable skills and working docs", async () => {
  const zip = unzipSync(await readFile(join(directory, "downloads", "crimson-client-template.zip")));
  for (const filename of [
    "AGENTS.md", "CLAUDE.md", ".mcp.json", ".claude/settings.json",
    ".github/copilot-instructions.md", ".github/PULL_REQUEST_TEMPLATE.md",
    ".vscode/settings.json", "docs/evidence/pilot-scorecard.csv", "docs/evidence/setup-validation.md"
  ]) assert.ok(zip[`client-repo/${filename}`], `ZIP missing ${filename}`);
  assert.equal(Object.keys(zip).filter(filename => filename.endsWith("/SKILL.md")).length, 6);
  assert.equal(new TextDecoder().decode(zip["client-repo/CLAUDE.md"]).trimEnd(), "@AGENTS.md");
  for (const filename of Object.keys(zip).filter(name => name.endsWith("/SKILL.md"))) {
    const content = new TextDecoder().decode(zip[filename]).replace(/\r\n/g, "\n");
    const skillName = filename.split("/").at(-2);
    assert.match(content, new RegExp(`^---\\nname: ${skillName}\\ndescription: .+\\n---`));
    assert.doesNotMatch(content, /allowed-tools:/);
  }
});

test("client configuration is unconfigured and contains no live tenant or secret", async () => {
  const config = JSON.parse(await readFile(join(projectRoot, "templates", "client-repo", ".mcp.json"), "utf8"));
  assert.deepEqual(Object.keys(config.mcpServers), ["microsoft-learn"]);
  assert.equal(config.mcpServers["microsoft-learn"].url, "https://learn.microsoft.com/api/mcp");
  const agentRules = await readFile(join(projectRoot, "templates", "client-repo", "AGENTS.md"), "utf8");
  assert.match(agentRules, /Configuration status: UNCONFIGURED/);
  assert.match(agentRules, /REPLACE_WITH_APPROVED_DEV_URL/);
  await assert.rejects(stat(join(projectRoot, "templates", "client-repo", ".vscode", "mcp.json")), { code: "ENOENT" });
});

test("active and alternative MCP examples specify the same server in host-specific shapes", async () => {
  const portable = JSON.parse(await readFile(join(projectRoot, "templates", "client-repo", ".mcp.json"), "utf8"));
  const alternative = JSON.parse(await readFile(join(projectRoot, "templates", "client-repo", "examples", "vscode-mcp.json"), "utf8"));
  assert.deepEqual(portable.mcpServers, alternative.servers);
});

test("complete distributable includes the template ZIP and all three adapter routes", async () => {
  const zip = unzipSync(await readFile(join(directory, "downloads", `crimson-reference-v${release.version}.zip`)));
  for (const filename of ["index.html", "copilot-cli.html", "copilot-vscode.html", "claude-code.html", "assets/crimson-wordmark.svg", "README.txt", ".nojekyll", "downloads/crimson-client-template.zip", "docs/publication.md", "docs/review.md", "templates/client-repo/.mcp.json"]) {
    assert.ok(zip[filename], `Reference ZIP missing ${filename}`);
  }
  for (const filename of ["docs/agentic-development.md", "docs/standard-alignment.md", "docs/prototype-graduation.md", "docs/platforms/azure.md", "docs/platforms/microsoft-foundry.md", "docs/platforms/fabric.md", "docs/platforms/dynamics-365.md"]) assert.ok(zip[filename], `Reference ZIP missing ${filename}`);
  assert.match(new TextDecoder().decode(zip["README.txt"]), /pre-built static reference/);
  assert.deepEqual(zip["assets/crimson-wordmark.svg"], new Uint8Array(await readFile(join(projectRoot, "assets", "crimson-wordmark.svg"))));
});

test("preview serves HTML, JavaScript and a downloadable ZIP with correct headers", async () => {
  for (const [path, type] of [["/", "text/html"], ["/app.js", "text/javascript"], ["/assets/crimson-wordmark.svg", "image/svg+xml"], ["/downloads/crimson-client-template.zip", "application/zip"]]) {
    const response = await fetch(baseUrl + path);
    assert.equal(response.status, 200);
    assert.ok(response.headers.get("content-type").startsWith(type));
    if (path.endsWith(".zip")) assert.match(response.headers.get("content-disposition"), /attachment/);
    await response.arrayBuffer();
  }
});

test("preview handles HEAD, missing files, invalid methods and encoded traversal", async () => {
  const head = await fetch(baseUrl + "/", { method: "HEAD" });
  assert.equal(head.status, 200);
  assert.equal(await head.text(), "");
  assert.equal((await fetch(baseUrl + "/missing.html")).status, 404);
  assert.equal((await fetch(baseUrl + "/", { method: "POST" })).status, 405);
  assert.equal((await fetch(baseUrl + "/%2f..%2fpackage.json")).status, 403);
  assert.equal((await fetch(baseUrl + "/%E0%A4%A")).status, 400);
});
