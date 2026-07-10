import type { Ctx, Container } from "@shaferllc/keel/core";
import { View, config } from "@shaferllc/keel/core";
import { Landing } from "../../resources/views/landing.js";

export class HomeController {
  constructor(private app: Container) {}

  /** The Dply Local marketing page. */
  index(c: Ctx) {
    return this.app.make(View).render(
      Landing({
        shot: "/shots/dashboard.png",
        repo: config("app.repo", "https://github.com/shaferllc/dply-local"),
      }),
    );
  }
}
