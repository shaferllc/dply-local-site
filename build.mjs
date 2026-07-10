// Renders the Keel-authored landing page to static HTML for Cloudflare.
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync, cpSync, rmSync } from "node:fs";

const srv = spawn("npm", ["run", "serve"], { stdio: "ignore" });
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

try {
  let html = null;
  for (let i = 0; i < 30; i++) {
    try { const r = await fetch("http://localhost:3000/"); if (r.ok) { html = await r.text(); break; } } catch {}
    await wait(500);
  }
  if (!html) throw new Error("Keel server did not come up");
  rmSync("dist", { recursive: true, force: true });
  mkdirSync("dist", { recursive: true });
  writeFileSync("dist/index.html", html);
  cpSync("resources/public/shots", "dist/shots", { recursive: true });
  cpSync("resources/public/logo.svg", "dist/logo.svg");
  writeFileSync("dist/_headers", "/shots/*\n  Cache-Control: public, max-age=31536000, immutable\n");
  console.log("Wrote dist/index.html + dist/shots/");
} finally {
  srv.kill();
}
