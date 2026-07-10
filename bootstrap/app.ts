/**
 * Application bootstrap. Creates the container, boots providers, and loads the
 * route files. Both the server and the console enter through here.
 */

import { Application, Router } from "@shaferllc/keel/core";
import { providers } from "./providers.js";
import registerWebRoutes from "../routes/web.js";

export async function createApplication(): Promise<Application> {
  const app = new Application(process.cwd());

  // Loads .env and every config/*.ts file, then boots providers.
  await app.boot(providers);

  registerWebRoutes(app.make(Router));

  return app;
}
