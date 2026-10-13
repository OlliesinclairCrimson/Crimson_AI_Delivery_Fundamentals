import { families, sources, stages, workloads, setupSteps } from "./data.js";

export function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
}

export function normalizeSelection(tool, surface) {
  return { tool: tool === "copilot" ? "copilot" : "claudeCode", surface: surface === "vscode" ? "vscode" : "cli" };
}

export function adapterLabel(selection) {
  return selection.tool === "claudeCode" ? "Claude Code" : selection.surface === "vscode" ? "GitHub Copilot in VS Code" : "GitHub Copilot CLI";
}

export function sourceLink(id, label = "Publisher guidance") {
  const source = sources.find(item => item.id === id);
  if (!source) throw new Error(`Unknown source: ${id}`);
  return `<a href="${escapeHtml(source.url)}">${escapeHtml(label)}</a>`;
}

export function selectors(section, selection) {
  return `<div class="adapter-controls" data-selector="${section}">
    <div class="control"><span class="control-label">Coding tool</span><div class="segmented" role="group" aria-label="Coding tool for ${section}">
      <button type="button" data-tool="claudeCode" aria-pressed="${selection.tool === "claudeCode"}">Claude Code</button>
      <button type="button" data-tool="copilot" aria-pressed="${selection.tool === "copilot"}">GitHub Copilot</button>
    </div></div>
    <div class="control" data-surface-control ${selection.tool === "copilot" ? "" : "hidden"}><span class="control-label">Copilot surface</span><div class="segmented" role="group" aria-label="Copilot surface for ${section}">
      <button type="button" data-surface="cli" aria-pressed="${selection.surface === "cli"}">CLI</button>
      <button type="button" data-surface="vscode" aria-pressed="${selection.surface === "vscode"}">VS Code</button>
    </div></div>
    <p class="adapter-note">Changes the adapter, never the delivery standard.</p>
  </div>`;
}

export function lifecycleHtml() {
  return stages.map((stage, index) => `<li class="stage"><span class="num" aria-hidden="true">${index + 1}</span><div class="body"><h3>${escapeHtml(stage.title)}</h3><div class="grid">
    <div class="cell"><strong>The agent does</strong><p>${escapeHtml(stage.agent)}</p></div>
    <div class="cell"><strong>People own</strong><p>${escapeHtml(stage.human)}</p></div>
    <div class="cell"><strong>Output</strong><p>${escapeHtml(stage.output)}</p></div>
  </div><p class="gatebar"><strong>Sign-off:</strong> ${escapeHtml(stage.gate)}</p></div></li>`).join("");
}

export function filtersHtml(active = "all") {
  return Object.entries(families).map(([id, family]) => `<button type="button" class="chip" data-family="${id}" aria-pressed="${id === active}">${escapeHtml(family.label)}</button>`).join("");
}

export function filteredWorkloads(family, query = "") {
  const search = query.trim().toLocaleLowerCase("en-GB");
  return workloads.filter(workload => (family === "all" || workload.family === family)
    && `${workload.name} ${workload.use} ${families[workload.family].label}`.toLocaleLowerCase("en-GB").includes(search));
}

export function workloadHtml(selection, family = "all", query = "") {
  return filteredWorkloads(family, query).map(workload => {
    const adapter = selection.tool === "claudeCode" ? workload.claudeCode : workload.copilot[selection.surface];
    const install = workload.install && !(selection.tool === "copilot" && selection.surface === "vscode")
      ? `<div class="codebox"><div class="cap"><span>Inside the agent, after marketplace setup</span><button class="copy" type="button" data-copy="install-${workload.id}" aria-label="Copy ${escapeHtml(workload.name)} plugin commands">Copy commands</button></div><pre id="install-${workload.id}">${escapeHtml(workload.install)}</pre></div>` : "";
    return `<article class="wl" data-workload="${workload.id}" style="--hue:${families[workload.family].color}">
      <div class="top"><h3>${escapeHtml(workload.name)}</h3><span class="fam">${escapeHtml(families[workload.family].label)}</span></div>
      <p class="use">${escapeHtml(workload.use)}</p><dl>
        <dt>${escapeHtml(adapterLabel(selection))}</dt><dd data-adapter>${escapeHtml(adapter)}</dd>
        <dt>Platform tools</dt><dd>${escapeHtml(workload.platform)}</dd>
        <dt>Maker alternative</dt><dd>${escapeHtml(workload.alternative)}</dd>
        <dt>Verify</dt><dd data-verification>${escapeHtml(workload.verify)}</dd>
      </dl>${install}<p class="warn"><strong>Watch for:</strong> ${escapeHtml(workload.warning)}</p>
      ${sourceLink(workload.source)}
    </article>`;
  }).join("");
}

export function setupHtml(selection) {
  return setupSteps.map(step => {
    const adapter = selection.tool === "claudeCode" ? step.claudeCode : step.copilot[selection.surface];
    const code = adapter.code ?? step.code;
    const caption = adapter.caption ?? step.caption;
    return `<li class="setup-step" data-step="${step.id}"><h3>${escapeHtml(step.title)}</h3><p>${escapeHtml(step.shared)}</p><p data-adapter>${escapeHtml(adapter.text)}</p>
      ${code ? `<div class="codebox"><div class="cap"><span>${escapeHtml(caption)}</span><button class="copy" type="button" data-copy="setup-${step.id}" aria-label="Copy ${escapeHtml(caption)}">Copy example</button></div><pre id="setup-${step.id}">${escapeHtml(code)}</pre></div>` : ""}
      <p class="check"><strong>Check before continuing:</strong> ${escapeHtml(step.check)}</p>
      ${sourceLink(adapter.source)}
    </li>`;
  }).join("");
}

export function sourcesHtml() {
  return sources.map(source => `<li><a href="${escapeHtml(source.url)}">${escapeHtml(source.title)}</a><small>${escapeHtml(source.note)} Documentation checked: 13 October 2026.</small></li>`).join("");
}
