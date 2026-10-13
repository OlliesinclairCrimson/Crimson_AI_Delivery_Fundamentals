import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { projectRoot } from "./build.mjs";

const types = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8", ".svg": "image/svg+xml",
  ".md": "text/plain; charset=utf-8", ".json": "application/json; charset=utf-8",
  ".zip": "application/zip", ".csv": "text/csv; charset=utf-8"
};

export function createPreviewServer(root = resolve(projectRoot, "dist")) {
  const directory = resolve(root);
  return createServer(async (request, response) => {
    response.setHeader("X-Content-Type-Options", "nosniff");
    response.setHeader("Cache-Control", "no-store");
    if (request.method !== "GET" && request.method !== "HEAD") {
      response.writeHead(405, { Allow: "GET, HEAD" }).end("Method not allowed");
      return;
    }
    let pathname;
    try {
      pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
    } catch {
      response.writeHead(400).end("Invalid request path");
      return;
    }
    const filename = resolve(directory, "." + (pathname.endsWith("/") ? pathname + "index.html" : pathname));
    if (!filename.startsWith(directory + sep)) {
      response.writeHead(403).end("Path is outside the preview directory");
      return;
    }
    try {
      const details = await stat(filename);
      if (!details.isFile()) {
        response.writeHead(404).end("File not found");
        return;
      }
      response.setHeader("Content-Type", types[extname(filename)] ?? "application/octet-stream");
      response.setHeader("Content-Length", details.size);
      if (extname(filename) === ".zip") response.setHeader("Content-Disposition", `attachment; filename="${filename.split(sep).at(-1)}"`);
      response.writeHead(200);
      if (request.method === "HEAD") response.end();
      else createReadStream(filename).on("error", error => {
        console.error("Preview file stream failed:", error);
        response.destroy(error);
      }).pipe(response);
    } catch (error) {
      if (error.code === "ENOENT" || error.code === "ENOTDIR") response.writeHead(404).end("File not found");
      else {
        console.error("Preview request failed:", error);
        response.writeHead(500).end("Preview could not read the requested file");
      }
    }
  });
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT ?? 4173);
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error("PORT must be an integer between 1 and 65535");
  const server = createPreviewServer();
  server.listen(port, "127.0.0.1", () => { console.log(`Crimson reference: http://127.0.0.1:${port}`); });
  server.on("error", error => { console.error("Preview server could not start:", error.message); process.exitCode = 1; });
}
