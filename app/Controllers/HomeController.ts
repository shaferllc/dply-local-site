import type { Ctx, Container } from "@shaferllc/keel/core";
import { View, config } from "@shaferllc/keel/core";
import { Landing } from "../../resources/views/landing.js";

export class HomeController {
  constructor(private app: Container) {}

  /** The Dply Local marketing page. */
  index(c: Ctx) {
    const repo = config("app.repo", "https://github.com/shaferllc/dply-local");
    return this.app.make(View).render(
      Landing({
        shot: "/shots/dashboard.png",
        // Always the newest CI-built DMG (published on every version tag).
        dmg: `${repo}/releases/latest/download/DplyLocal.dmg`,
        version: config("app.version", "v0.2.1"),
        repo,
      }),
    );
  }
}
