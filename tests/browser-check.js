async (page) => {
  const base = "http://127.0.0.1:4173";
  const results = [];
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  const check = (condition, name) => {
    if (!condition) throw new Error(name);
    results.push(name);
  };
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(base);
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.waitForSelector("#workload-grid [data-workload]");
  check(await page.locator("[data-workload]").count() === 13, "All 13 workloads render");
  check(await page.locator("#setup-list .setup-step").count() === 7, "All seven setup steps render");
  const evidenceBefore = await page.locator("[data-verification]").allTextContents();
  await page.locator('[data-selector="workloads"] [data-tool="copilot"]').click();
  check(await page.locator('[data-selector="setup"] [data-tool="copilot"]').getAttribute("aria-pressed") === "true", "Tool selectors synchronize");
  check((await page.locator("#setup-list").innerText()).includes("winget install GitHub.Copilot"), "Copilot CLI install command is selected");
  check(JSON.stringify(await page.locator("[data-verification]").allTextContents()) === JSON.stringify(evidenceBefore), "Verification requirements stay invariant");
  await page.locator('[data-selector="setup"] [data-surface="vscode"]').click();
  check(await page.locator('[data-selector="workloads"] [data-surface="vscode"]').getAttribute("aria-pressed") === "true", "Surface selectors synchronize");
  check(!(await page.locator("#setup-list").innerText()).includes("/plugin install"), "VS Code does not receive CLI install commands");
  check((await page.locator("#setup-list").innerText()).includes("does not block execution"), "VS Code approval limitation is visible");
  await page.reload();
  check(await page.locator('[data-selector="setup"] [data-surface="vscode"]').getAttribute("aria-pressed") === "true", "Tool/surface preference survives reload");
  await page.locator('[data-family="automation"]').click();
  check(await page.locator("[data-workload]").count() === 2, "Automation filter returns two workloads");
  await page.locator("#workload-search").fill("cloud");
  check(await page.locator("[data-workload]").count() === 1, "Search combines with family filter");
  await page.locator("#workload-search").fill("not-a-workload");
  check(await page.locator("#no-workloads").isVisible(), "Empty search state is explicit");
  await page.evaluate(() => window.dispatchEvent(new Event("beforeprint")));
  check(await page.locator("[data-workload]").count() === 13, "Print includes every workload despite filters");
  check(!await page.locator("#no-workloads").isVisible(), "Print hides stale empty state");
  check((await page.locator("#workload-count").innerText()).startsWith("13 workloads"), "Print count matches the complete workload list");
  await page.evaluate(() => window.dispatchEvent(new Event("afterprint")));
  check(await page.locator("[data-workload]").count() === 0, "Print restores the reader's search");
  await page.locator("#workload-search").fill("");
  await page.locator('[data-family="all"]').click();
  await page.context().grantPermissions(["clipboard-read", "clipboard-write"], { origin: base });
  await page.locator('[data-copy="repo-layout"]').click();
  check((await page.evaluate(() => navigator.clipboard.readText())).includes("AGENTS.md"), "Copy button copies the current example");
  const download = await page.request.get(base + "/downloads/crimson-client-template.zip");
  check(download.ok() && download.headers()["content-type"] === "application/zip", "Client ZIP download responds correctly");
  await page.setViewportSize({ width: 390, height: 844 });
  check(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), "Mobile has no page-level horizontal overflow");
  await page.goto(base + "/copilot-cli.html");
  check(await page.locator('[data-selector="setup"] [data-surface="cli"]').getAttribute("aria-pressed") === "true", "Explicit pre-rendered route overrides saved surface");
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(base);
  await page.keyboard.press("Tab");
  check(await page.locator(".skip").evaluate(element => element === document.activeElement), "Keyboard can reach skip link first");
  await page.keyboard.press("Enter");
  check(await page.evaluate(() => window.location.hash === "#main"), "Skip link navigates to main content");
  const noJs = await page.context().browser().newContext({ javaScriptEnabled: false });
  try {
    const reader = await noJs.newPage();
    await reader.goto(base + "/copilot-vscode.html");
    check(await reader.locator("[data-workload]").count() === 13, "No-JavaScript route retains all workloads");
    check((await reader.locator("#setup-list").innerText()).includes("does not block execution"), "No-JavaScript route has the correct VS Code setup");
    check(await reader.locator("noscript a").count() >= 3, "No-JavaScript reader can navigate between adapters");
    check(!await reader.locator(".adapter-controls").first().isVisible(), "No-JavaScript route does not advertise nonfunctional switches");
  } finally { await noJs.close(); }
  const blocked = await page.context().browser().newContext();
  try {
    await blocked.addInitScript(() => {
      Object.defineProperty(window, "localStorage", { get() { throw new DOMException("Storage blocked", "SecurityError"); } });
      Object.defineProperty(navigator, "clipboard", { value: { writeText: async () => { throw new Error("Clipboard blocked"); } } });
    });
    const reader = await blocked.newPage();
    reader.on("pageerror", error => errors.push(error.message));
    await reader.goto(base);
    await reader.locator('[data-selector="setup"] [data-tool="copilot"]').click();
    check((await reader.locator("#setup-list").innerText()).includes("winget install GitHub.Copilot"), "Blocked storage does not break tool switching");
    await reader.locator('[data-copy="repo-layout"]').click();
    check((await reader.locator("#interaction-status").innerText()).includes("Clipboard access failed"), "Clipboard failure is reported, not success-shaped");
    check((await reader.evaluate(() => window.getSelection().toString())).includes("AGENTS.md"), "Clipboard fallback selects the real example");
  } finally { await blocked.close(); }
  const invalid = await page.context().browser().newContext();
  try {
    await invalid.addInitScript(() => localStorage.setItem("crimson-playbook-v1", "{invalid"));
    const reader = await invalid.newPage();
    await reader.goto(base);
    check(await reader.locator("[data-workload]").count() === 13, "Malformed preferences recover with complete default content");
  } finally { await invalid.close(); }
  check(errors.length === 0, `No uncaught browser errors: ${errors.join(", ")}`);
  await page.goto(base);
  return { checks: results };
}
