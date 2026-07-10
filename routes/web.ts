import type { Router } from "@shaferllc/keel/core";
import { HomeController } from "../app/Controllers/HomeController.js";

/** The marketing site is a single page rendered by HomeController@index. */
export default function routes(router: Router): void {
  router.get("/", [HomeController, "index"]);
}
