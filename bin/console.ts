#!/usr/bin/env tsx
/**
 * The application console. `npm run keel <command>`.
 *
 *   keel serve                 start the HTTP server
 *   keel routes                list registered routes
 *   keel make:controller Foo   generate app/Controllers/FooController.ts
 *   keel make:provider Foo     generate app/Providers/FooServiceProvider.ts
 *   keel make:middleware Foo   generate app/Http/Middleware/foo.ts
 *
 * The console lives in your app (not the framework), so it's yours to extend.
 */

import { mkdir, writeFile, access } from "node:fs/promises";
import { dirname, join } from "node:path";
import { serve } from "@hono/node-server";
import { Command } from "commander";
import { Router } from "@shaferllc/keel/core";

import { createApplication } from "../bootstrap/app.js";
import { Kernel } from "../app/Http/Kernel.js";

const basePath = process.cwd();

async function generate(relPath: string, contents: string, label: string) {
  const full = join(basePath, relPath);
  try {
    await access(full);
    console.error(`✗ ${label} already exists: ${relPath}`);
    process.exitCode = 1;
    return;
  } catch {
    // does not exist — proceed
  }
  await mkdir(dirname(full), { recursive: true });
  await writeFile(full, contents);
  console.log(`✓ Created ${label}: ${relPath}`);
}

function className(name: string, suffix: string): string {
  const base = name.replace(new RegExp(`${suffix}$`, "i"), "");
  const pascal = base.charAt(0).toUpperCase() + base.slice(1);
  return `${pascal}${suffix}`;
}

const controllerStub = (n: string) => `import type { Ctx } from "@shaferllc/keel/core";

export class ${n} {
  index(c: Ctx) {
    return c.json({ controller: "${n}", action: "index" });
  }
}
`;

const providerStub = (n: string) => `import { ServiceProvider } from "@shaferllc/keel/core";

export class ${n} extends ServiceProvider {
  register(): void {
    // Bind services into the container here.
  }

  boot(): void {
    // Resolve and wire things up here.
  }
}
`;

const middlewareStub = (n: string) => {
  const fn = n.charAt(0).toLowerCase() + n.slice(1);
  return `import type { MiddlewareHandler } from "hono";

export const ${fn}: MiddlewareHandler = async (c, next) => {
  // ...before
  await next();
  // ...after
};
`;
};

const program = new Command();
program.name("keel").description("Keel application console").version("0.1.0");

program
  .command("serve")
  .description("Start the HTTP server")
  .option("-p, --port <port>", "port to listen on")
  .action(async (opts) => {
    const app = await createApplication();
    const hono = new Kernel(app).build();
    const port = Number(opts.port ?? app.config().get("app.port", 3000));
    serve({ fetch: hono.fetch, port }, (info) => {
      const name = app.config().get("app.name", "Keel App");
      console.log(`⚓ ${name} listening on http://localhost:${info.port}`);
    });
  });

program
  .command("routes")
  .description("List registered routes")
  .action(async () => {
    const app = await createApplication();
    const rows = app.make(Router).all();
    if (rows.length === 0) return console.log("No routes registered.");
    for (const r of rows) {
      const handler = Array.isArray(r.handler)
        ? `${r.handler[0].name}@${r.handler[1]}`
        : "Closure";
      console.log(`${r.method.padEnd(6)} ${r.path.padEnd(24)} ${handler}`);
    }
  });

program
  .command("make:controller <name>")
  .description("Generate a controller")
  .action(async (name: string) => {
    const cls = className(name, "Controller");
    await generate(`app/Controllers/${cls}.ts`, controllerStub(cls), "Controller");
  });

program
  .command("make:provider <name>")
  .description("Generate a service provider")
  .action(async (name: string) => {
    const cls = className(name, "ServiceProvider");
    await generate(`app/Providers/${cls}.ts`, providerStub(cls), "Provider");
  });

program
  .command("make:middleware <name>")
  .description("Generate an HTTP middleware")
  .action(async (name: string) => {
    const cls = className(name, "Middleware");
    const file = cls.charAt(0).toLowerCase() + cls.slice(1);
    await generate(`app/Http/Middleware/${file}.ts`, middlewareStub(cls), "Middleware");
  });

program.parseAsync(process.argv).catch((err) => {
  console.error(err);
  process.exit(1);
});
