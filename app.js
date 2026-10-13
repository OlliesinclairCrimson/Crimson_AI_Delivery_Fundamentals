import { families } from "./data.js";
import { adapterLabel, filtersHtml, filteredWorkloads, normalizeSelection, setupHtml, workloadHtml } from "./render.js";

const storageKey = "crimson-playbook-v1";
const status = document.getElementById("interaction-status");
document.body.classList.add("enhanced");
let selection = normalizeSelection(document.body.dataset.tool, document.body.dataset.surface);
let family = "all";
let query = "";
try {
  const saved = localStorage.getItem(storageKey);
  if (saved && (window.location.pathname.endsWith("/index.html") || window.location.pathname.endsWith("/"))) {
    const parsed = JSON.parse(saved);
    selection = normalizeSelection(parsed?.tool, parsed?.surface);
    if (Object.hasOwn(families, parsed?.family)) family = parsed.family;
  }
} catch (error) {
  console.warn("Playbook preferences could not be loaded; using defaults.", error);
  status.textContent = "Preferences could not be loaded. You can still choose a tool for this visit.";
}

function persist() {
  try {
    localStorage.setItem(storageKey, JSON.stringify({ ...selection, family }));
  } catch (error) {
    console.warn("Playbook preferences could not be saved.", error);
    status.textContent = "Your choice applies to this visit but could not be saved in this browser.";
  }
}

function updateControls() {
  document.querySelectorAll("[data-tool]").forEach(button => button.setAttribute("aria-pressed", String(button.dataset.tool === selection.tool)));
  document.querySelectorAll("[data-surface]").forEach(button => button.setAttribute("aria-pressed", String(button.dataset.surface === selection.surface)));
  document.querySelectorAll("[data-surface-control]").forEach(control => { control.hidden = selection.tool !== "copilot"; });
}

function renderWorkloads() {
  document.getElementById("workload-grid").innerHTML = workloadHtml(selection, family, query);
  const count = filteredWorkloads(family, query).length;
  document.getElementById("workload-count").textContent = `${count} ${count === 1 ? "workload" : "workloads"} · ${adapterLabel(selection)}`;
  document.getElementById("no-workloads").hidden = count !== 0;
  document.querySelectorAll("[data-family]").forEach(button => button.setAttribute("aria-pressed", String(button.dataset.family === family)));
}

function renderAdapter() {
  updateControls();
  renderWorkloads();
  document.getElementById("setup-list").innerHTML = setupHtml(selection);
}

document.addEventListener("click", async event => {
  if (!(event.target instanceof Element)) return;
  const button = event.target.closest("button");
  if (!button) return;
  if (button.dataset.tool || button.dataset.surface) {
    selection = normalizeSelection(button.dataset.tool ?? selection.tool, button.dataset.surface ?? selection.surface);
    renderAdapter();
    status.textContent = `Setup and workloads now show ${adapterLabel(selection)}. Shared delivery requirements are unchanged.`;
    persist();
  } else if (button.dataset.family) {
    family = button.dataset.family;
    renderWorkloads();
    persist();
  } else if (button.dataset.copy) {
    const target = document.getElementById(button.dataset.copy);
    if (!target) throw new Error(`Missing copy target: ${button.dataset.copy}`);
    const original = button.textContent;
    button.disabled = true;
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard API is unavailable in this browser or context.");
      await navigator.clipboard.writeText(target.textContent);
      button.textContent = "Copied";
      status.textContent = "Example copied to clipboard. Review placeholders and approval requirements before using it.";
    } catch (error) {
      console.warn("The example could not be copied to the clipboard.", error);
      const range = document.createRange();
      range.selectNodeContents(target);
      const browserSelection = window.getSelection();
      browserSelection?.removeAllRanges();
      browserSelection?.addRange(range);
      button.textContent = "Select & copy";
      status.textContent = "Clipboard access failed. The example is selected; use your browser's Copy command.";
    } finally {
      button.disabled = false;
      window.setTimeout(() => { if (button.isConnected) button.textContent = original; }, 2500);
    }
  }
});

document.getElementById("workload-search").addEventListener("input", event => {
  query = event.target.value;
  renderWorkloads();
});

// Keep print output complete without changing the reader's saved filter.
window.addEventListener("beforeprint", () => {
  document.getElementById("workload-grid").innerHTML = workloadHtml(selection);
  document.getElementById("no-workloads").hidden = true;
  document.getElementById("workload-count").textContent = `13 workloads · ${adapterLabel(selection)}`;
});
window.addEventListener("afterprint", renderWorkloads);

document.getElementById("chips").innerHTML = filtersHtml(family);
renderAdapter();
